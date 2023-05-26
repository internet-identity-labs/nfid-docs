---
title: ICP usage
position: 11
category: Wallet Kit
description: "The complete guide to NFID: the identity layer for the internet."
---

NFID returns delegation identity to your application, which is able to sign all messages without wallet prompts.

If you own multiple domains and want to ensure the same identifiers are generated across them, follow these instructions for [generating the same identifier across your multiple domains](#generating-the-same-user-identifier-across-multiple-domains).

## Prerequisites
When submitting the request for a delegation identity, you need to provide the canister IDs that this delegation will have permission to call. To protect user assets in other canisters that aren't yours, we require you add a `get_whitelisted_frontends` method to each of the canisters you wish to add to the delegation. NFID will ensure the `event.origin` (the origin that's requesting a delegation) is in the returned array from this method for each canister in the `targets` array.

```
consider how to keep node providers from learning about the canister ids

# Rust implementation

# Motoko implementation
```

## Usage
This guide assumes familiarity with building on the IC. More information can be found [here](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove). Your environment will need:
- dfx SDK
- node
- @dfinity/agent, @dfinity/identity, and @dfinity/auth-client node packages >v0.11.0

### The authentication client
For a basic typescript integration inclusive of how to make authenticated calls locally in your development environment, follow along with our fork of Kyle Peacock's repository [here for typescript](https://github.com/internet-identity-labs/nfid-auth-client-demo/tree/feature/nfid-auth-client-demo).
