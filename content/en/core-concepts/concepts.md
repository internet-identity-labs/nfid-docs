---
title: How NFID works
subtitle: Learn more about NFID.
position: 3
category: Overview
description: "The complete guide to NFID: the identity layer for the internet."
---

This page provides comprehensive coverage of the various aspects involved in using NFID. From the user's and developer's perspectives, this document delves into the architectural aspect of NFID.

## The NFID number - your Web3 identifier
Seed phrases have become the standard for key management, using 12 or 24 words to represent keys that can be written and stored in various ways. While technically simple, this approach has several issues: onboarding new users can take up to 15 minutes and losses are common due to misplaced or compromised seed phrases.

With NFID, users associate their OAuth tokens, WebAuthn public keys, and other authentication factors to their NFID number, an on-chain identifier that can request threshold ECDSA signatures from the Internet Computer. This architecture allows users to self-custody their ECDSA key like a traditional multi-factor account, without ever storing full cryptographic private keys anywhere, not even on node machines.

> **NOTE:** More info on [NFID's key management infrastructure](key-management)

## High level architecture
The NFID SDK handles the interactions between OAuth token / public key providers, NFID smart contracts, and the Internet Computer threshold signing protocol.

This diagram below describes the relationship between the NFID iframe and integrating application:

<img src="../nfid-authentication-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

> **NOTE:** As you can see, the first critical component to the seamlessness of this UX is that the entire NFID website is served from smart contracts.

<img src="../nfid-authentication-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

> **NOTE:** Secondly, each user can permissionlessly request threshold ECDSA signatures from the Intenet Computer without any person, code, or node having access to the full cryptographic material.

Integrating the NFID SDK is a breeze for developers. Simply initialize the SDK, set up the required configuration, and embed the login functionality in your website. From there, you can authenticate users by calling the "connect" function with a simple login button or another user action.

### NFID Embed user flow with your application
For the premium experience and to further increase registration / transaction rates with your application, you may add all NFID user flows as iframe components on your site.

With NFID, users authenticate using Google, FIDO-based device biometrics (or native biometrics for mobile apps), or other Web3 wallets. These biometric authenticators, such as fingerprint scanners, are already built into the desktop or mobile device. If their desktop device doesn’t support FIDO2, they can authenticate using a mobile device that does, Google, or another Web3 wallet. Ultimately users have the flexibility to authenticate using their preferred method, though we will continue to encourage progressive security thresholds for higher sensitivity transactions.

The authentication experience itself is branded to the look and feel of NFID with easy customization options for your logo and company name.

1. User initiates login on your site.
2. User authenticates to their NFID and chooses the account they want to connect with.
3. When your application requests a signature, the NFID Wallet transaction is displayed in the iframe on your site requesting user approval.

<img src="../nfid-embed-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

### NFID Wallet user flow with your application
1. User initiates login by clicking on a "Connect NFID" button on your site.
2. User authenticates to their NFID and chooses the account they want to connect with.
3. When your application requests a signature, the NFID Wallet page opens in a new tab or window requesting user approval.

<img src="../nfid-wallet-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

## How NFID ECDSA signatures work

The NFID protocol leverages a powerful toolkit of advanced cryptographic mechanisms, collectively referred to as chain-key cryptography, built into the Internet Computer Protocol. This approach enables NFID to achieve unparalleled functionality and scalability, setting it apart from other protocols.

At the heart of this cutting-edge technology is a threshold signature scheme, similar to a traditional digital signature scheme, but with a distributed secret signing key. This novel approach ensures that the key cannot be compromised by any one replica, or even a significant fraction of the replicas in a subnet.

This technology provides NFID with the means to request ECDSA signatures for messages and transactions in such a way that only the user can use and approve.

<img src="../nfid-signatures.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>