---
title: Overview
position: 40
description: "The complete guide to NFID: the identity layer for the internet."
category: How It Works
features:
  - Decentralized, self-sovereign identity provider
  - No usernames or passwords
  - No app downloads
  - Biometric login on any device, platform, or channel
---

NFID Wallet is a multi-chain smart contract wallet that lets users self custody with as little as an email address. Users are encouraged to enable MFA with webauthn credentials (i.e. passkeys), which provides some of the strongest authentication technology available on the internet today.

To achieve this level of UX, NFID would needed to have been built on a decentralized web hosting service that could compete with AWS and Google Cloud. We found such a service with the Internet Computer and are using its cryptographic primitives to securely protect cryptographic material and ensure access to it remains exclusively with the owner.

## Key abstraction with NFID
Seed phrases have become the standard for key management, using 12 or 24 words to represent keys that can be written and stored in various ways. While technically simple, this approach has several issues: onboarding new users can take up to 15 minutes and losses are common due to misplaced or compromised seed phrases.

With NFID, users associate their OAuth tokens, WebAuthn public keys, and other authentication factors to their NFID number, an on-chain identifier. When a user authenticates with one of those methods, the Internet Computer creates a delegation identity that lives for the duration of the session. NFID uses that delegation identity to decrypt ECDSA keys to generate signatures, or request a threshold ECDSA signature directly from the Internet Computer. This architecture allows users to self-custody their ECDSA keys but feel like a traditional multi-factor account.

### NFID in a 3rd party context
When users authenticate to a 3rd party app, NFID Wallet returns either a delegation identity or a `provider` depending on the configuration. ETH and MATIC devs will use a `provider` to view balances and request signatures, whereas an ICP dev will use a delegation.

Delegations are strictly scoped such that it only has permission to call smart contracts (canisters) owned by the application. Calls to other smart contracts will result in a wallet prompt.

> **NOTE:** Read more on [NFID's key management infrastructure](key-management).

## High level architecture
The NFID Wallet SDK handles the interactions between OAuth token / public key providers, NFID smart contracts, and the signing protocol.

This diagram below describes the relationship between the NFID iframe and integrating application:

<img src="../nfid-authentication-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

> **NOTE:** Each user can request ECDSA signatures without any party's involvement.

[Integrating the NFID Wallet SDSK](../wallet-sdk/quickstart) is simple for developers. Simply initialize the SDK with a `chainId` and authenticate users by calling the `signIn()` function with a simple login button.

### NFID Wallet user flow with your application
Users authenticate using email (or FIDO-based device biometrics for returning users with 2FA enabled).

1. User initiates login on your site.
2. User authenticates to their NFID Wallet and provides a network address (or delegation identity in the case of ICP)
3. When your application requests a signature, the NFID Wallet iframe reappears for user approval.

<img src="../nfid-embed-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>
