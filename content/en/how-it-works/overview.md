---
title: Overview
position: 30
description: "The complete guide to NFID: the identity layer for the internet."
category: How It Works
features:
  - Decentralized, self-sovereign identity provider
  - No usernames or passwords
  - No app downloads
  - Biometric login on any device, platform, or channel
---

NFID is a chain-agnostic, key-abstracted smart contract wallet that lets users self custody with as little as an email address. Onboarding of both mainstream and crypto native users is streamlined to under 30 seconds by providing experiences they're most comfortable with. With support for social logins, web native platforms, and other wallets, NFID results in the easiest way for users to manage their Web3 data and for developers to interact with users.

NFID is built on a decentralized network with very different properties:
- Smart contracts serve entire web-apps (html, js, css, assets, and 32 GB of stable memory) for direct, permissionless user access
- Smart contracts can request threshold ECDSA signatures, where at least two-thirds of the nodes in a subnet must agree on its generation

This means that, unlike "non-custodial" login providers, access of a user's private key through NFID is permissionless and secured by a decentralized, globally-distributed network of nodes rather than Amazon or a small handful of US companies.

## Achieving global account abstraction with NFID
Seed phrases have become the standard for key management, using 12 or 24 words to represent keys that can be written and stored in various ways. While technically simple, this approach has several issues: onboarding new users can take up to 15 minutes and losses are common due to misplaced or compromised seed phrases.

With NFID, users associate their OAuth tokens, WebAuthn public keys, and other authentication factors to their NFID number, an on-chain identifier that can request the generation of threshold ECDSA signatures. This architecture allows users to self-custody their ECDSA key like a traditional multi-factor account, without ever storing full cryptographic private keys anywhere, not even on node machines.

> **NOTE:** Read more on [NFID's key management infrastructure](key-management).

## High level architecture
The NFID SDK handles the interactions between OAuth token / public key providers, NFID smart contracts, and the threshold signing protocol.

This diagram below describes the relationship between the NFID iframe and integrating application:

<img src="../nfid-authentication-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

> **NOTE:** As you can see, the first critical self-custodial touchpoint is serving the entire NFID website from smart contracts.

<img src="../nfid-authentication-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

> **NOTE:** Secondly, each user can permissionlessly request threshold ECDSA signatures without any person, code, or node having access to the full cryptographic material.

[Integrating the NFID SDK](../getting-started/quickstart) is a breeze for developers. Simply initialize the SDK, set up the required configuration, and embed the login functionality in your website. From there, you can authenticate users by calling the "connect" function with a simple login button or another user action.

### NFID Wallet+ user flow with your application
For the premium experience and to further increase registration / transaction rates with your application, you may add all NFID user flows as branded iframe components on your site with NFID Wallet+.

With NFID, users authenticate using Google, FIDO-based device biometrics (or native biometrics for mobile apps), or other Web3 wallets. These biometric authenticators, such as fingerprint scanners, are already built into the desktop or mobile device. If their desktop device doesn’t support FIDO2, they can authenticate using a mobile device that does, Google, or another Web3 wallet. Ultimately users have the flexibility to authenticate using their preferred method, though NFID will continue to encourage progressive security thresholds for higher sensitivity transactions.

The authentication experience itself is branded to the look and feel of NFID with [easy customization options](../features/ui-customization) for your logo and company name.

1. User initiates login on your site.
2. User authenticates to their NFID and chooses the account they want to connect with.
3. When your application requests a signature, the NFID Wallet transaction is displayed in the iframe on your site requesting user approval.

<img src="../nfid-embed-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

### NFID Wallet user flow with your application
1. User initiates login by clicking on a "Connect NFID" button on your site.
2. User authenticates to their NFID and chooses the account they want to connect with.
3. When your application requests a signature, the NFID Wallet page opens in a new tab or window requesting user approval.

<img src="../nfid-wallet-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>


---- 
The difference between "non-custodial" login providers and NFID is that the former requires permission for the user to access their key and the latter does not.

- HTTP query calls to smart contracts *don't* go through consensus and return in ~100ms
- HTTP update calls to smart contracts *do* go through consensus and settle in ~2s
- Smart contracts can make HTTP calls to the outside world, removing the need for oracles
----