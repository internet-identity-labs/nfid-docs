---
title: Auth protocol
position: 41
category: How It Works
description: "The complete guide to NFID: the identity layer for the internet."
---

## Introduction
When an ICP client wants to authenticate a user, it uses a *session key* (e.g., Ed25519 or ECDSA), and by way of the authentication flow (details below) obtains a [delegation chain](https://internetcomputer.org/docs/current/references/ic-interface-spec#authentication) that allows the session key to sign for the user's main identity.

The delegation chain consists of one delegation, called the *client delegation*, that delegates from the user identity to the session key. This delegation is created by the NFID Delegator smart contract, and signed using a [smart contract (canister) signature](https://hydra.dfinity.systems/latest/dfinity-ci-build/ic-ref.pr-319/interface-spec/1/index.html#canister-signatures). This delegation is scoped to the client's canisters and has a maximum lifetime of 30 days, with a default of 30 minutes.

The NFID client also manages an *NFID delegation*, delegating from the passkey's public key to a session key managed by this frontend, so that it can interact with its smart contracts without having to invoke the passkey for each signature.

When non-ICP clients want to authenticate a user, it receives a `provider`, which is constructed on the frontend by the *NFID delegation*.

### From the point of view of a client ICP application:
1. The application frontend creates a session key pair (e.g., Ed25519).
2. It installs a `message` event handler on its own `window`.
3. It loads the url https://nfid.one/#authorize in an `iframe`. Let `nfidWindow` be the `Window` object returned from this.
4. In the nfidWindow, the user logs in, and the nfidWindow invokes
    ```
    window.opener.postMessage(msg, "*")
    ```
    where `msg` is
    ```
    interface NFIDReady {
      kind: "authorize-ready"
    }
    ```
5. The client application, after receiving the NFIDReady msg, invokes
    ```
    nfidWindow.postMessage(msg, "https://nfid.one")
    ```
    where `msg` is a value of type
    ```
    interface NFIDAuthRequest {
      kind: "authorize-client";
      sessionPublicKey: Uint8Array;
      maxTimeToLive?: bigint;
      derivationOrigin?: string;
    }
    ```
    where
    - the sessionPublicKey contains the public key of the session key pair.
    - the maxTimeToLive, if present, indicates the desired time span (in nanoseconds) until the requested delegation should expire.
    - the derivationOrigin, if present, indicates an origin that should be used for principal derivation instead of the client origin. Values must match the following regular expression: ^https:\/\/[\w-]+(\.raw)?\.(ic0\.app|icp0\.io)$. NFID will only accept values that are also listed in the HTTP resource https://<canister_id>.ic0.app/.well-known/ii-alternative-origins of the corresponding canister (see [Alternative Frontend Origins](https://internetcomputer.org/docs/current/references/ii-spec#alternative-frontend-origins)).
6. Now the client application window expects a message back, with data `event`.
7. If `event.origin` is not "https://nfid.one", ignore this message.
8. The `event.data` value is a JS object with the following type:
    ```
    interface NFIDAuthResponse {
      kind: "authorize-client-success";
      delegations: [{
        delegation: {
          pubkey: Uint8Array;
          expiration: bigint;
          targets?: Principal[];
        };
        signature: Uint8Array;
      }];
      userPublicKey: Uint8Array;
    }
    ```
    where the userPublicKey is the user's Identity and delegations corresponds to the CBOR-encoded delegation chain as used for [authentication on the IC](https://internetcomputer.org/docs/current/references/ic-interface-spec#authentication).
9. It could also receive a failure message of the following type
    ```
    interface NFIDAuthResponse {
      kind: "authorize-client-failure";
      text: string;
    }
    ```
    The client application frontend needs to be able to detect when any of the delegations in the chain has expired, and re-authorize the user in that case.

The [NFID SDK](../integration/quickstart) is a helpful package for developers to quickly get this set up.