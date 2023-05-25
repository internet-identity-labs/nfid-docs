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

NFID Wallet is a multi-chain smart contract wallet that lets users self custody with as little as an email address. As an embedded component on your website and with support for Web2 logins and passkeys, NFID is the easiest way for new crypto users to onboard to your dapps.

To achieve this, NFID could either have been built on a centralized web hosting service like AWS, or a competitive decentralized web hosting service like the Internet Computer. We chose the latter so that identity-based encryption can be used to encrypt private keys in wasm containers protected by the network.

## Achieving global account abstraction with NFID
Seed phrases have become the standard for key management, using 12 or 24 words to represent keys that can be written and stored in various ways. While technically simple, this approach has several issues: onboarding new users can take up to 15 minutes and losses are common due to misplaced or compromised seed phrases.

With NFID, users associate their OAuth tokens, WebAuthn public keys, and other authentication factors to their NFID number, an on-chain identifier that can request the generation of ECDSA signatures. This architecture allows users to self-custody their encrypted ECDSA keys like a traditional multi-factor account.

> **NOTE:** Read more on [NFID's key management infrastructure](key-management).

## High level architecture
The NFID SDK handles the interactions between OAuth token / public key providers, NFID smart contracts, and the signing protocol.

This diagram below describes the relationship between the NFID iframe and integrating application:

<img src="../nfid-authentication-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

> **NOTE:** Each user can request ECDSA signatures without any party's involvement.

[Integrating the NFID SDK](../EVM/evm-quickstart) is a breeze for developers. Simply initialize the SDK, set up the required configuration, and embed the login functionality in your website. From there, you can authenticate users by calling the "connect" function with a simple login button or another user action.

### NFID Wallet user flow with your application
With NFID, users authenticate using Google, FIDO-based device biometrics (or native biometrics for mobile apps), or other Web3 wallets. These biometric authenticators, such as fingerprint scanners, are already built into the desktop or mobile device. If their desktop device doesn’t support FIDO2, they can authenticate using a mobile device that does, Google, or another Web3 wallet. Ultimately users have the flexibility to authenticate using their preferred method, though NFID will continue to encourage progressive security thresholds for higher sensitivity transactions.

1. User initiates login on your site.
2. User authenticates to their NFID Wallet and provides a network address or delegation identity (in the case of ICP)
3. When your application requests a signature, the NFID Wallet iframe reappears for user approval.

<img src="../nfid-embed-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>
