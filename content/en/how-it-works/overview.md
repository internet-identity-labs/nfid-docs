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

NFID is a set of smart contracts on the Internet Computer that users can create identities with and store GBs of tamper-resistent, encrypted data in, including private keys. The current development focus is on making self-sovereign private key management feel like a web2 experience. NFID achieves this with the Internet Computer's smart contracts and native chain-key cryptography, allowing the generation of `delegation identities` that can make authenticated smart contract calls without user approval prompts, and encrypt/decrypt its own data (like private keys). Even if private keys were stored unencrypted, the Internet Computer's design makes it extremely difficult for node providers to read them (and even more difficult with the introduction of node shuffling, hardware encryption, and other protocol-level upgrades).

## The NFID identity (NFIDentity)
Users create an NFIDentity when they open the magic link sent to their email address or authenticate with Google. At a high level:
- The user is assigned an on-chain identifier - an NFIDentity - an incrementing unique number
- The user's email authentication token generates a `delegation identity` - an actor capable of making authenticated smart contract calls and encrypting/decrypting its own data
- The user's `delegation identity` generates, encrypts, splits, and stores private keys to different networks (Ethereum, Polygon, Bitcoin, and Internet Computer as of July 2023)

## Passkey delegations
Users can remove their email as a point of attack by opting in to passkey authentication and signing (2FA). When 2FA is enabled, `delegation identities` can only be generated when a passkey signs a frontend challenge to delegate authority to a session key. Given the strength and security of passkeys, this makes user's blockchain keys completely inaccessible to anyone but the device owners. Biometric auth simultaneously simplifies the UX by removing password requirements.

Users can have multiple passkeys in case they have multiple devices from which they want to authenticate. Having multiple further simplifies the experience and reduces the risk of identity loss, especially when using hybrid keys (those secured in the "cloud" by Apple, Google, and Microsoft). Our research gives us no reason to doubt the security models of hybrid passkey storage, but having a USB stick (i.e. Yubikey or other FIDO-cabable hardware wallet) is always a good backup.

## NFID in a 3rd party context
When users authenticate to a 3rd party app, NFID returns either a `delegation identity` or a `provider` depending on the SDK configuration. ETH and MATIC devs will be familiar with the `provider` to view balances and request signatures, whereas an ICP dev will use a `delegation identity`.

Delegations are strictly scoped such that it only has permission to call smart contracts (canisters) owned by the application. Calls to other smart contracts will result in a wallet prompt.

## High level architecture
The NFID SDK handles the interactions between OAuth token / public key providers, NFID smart contracts, and the signing protocol.

This diagram below describes the relationship between the NFID iframe and integrating application:

<img src="../nfid-authentication-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

> **NOTE:** Each user can request ECDSA signatures without any party's involvement.

[Integrating the NFID SDK](../integration/quickstart) is simple for developers. Simply initialize the SDK with a `chainId` and authenticate users by calling the `signIn()` function with a simple login button.

## NFID user flow with your application
Users authenticate using email (or FIDO-based device biometrics for returning users with 2FA enabled).

1. User initiates login on your site.
2. User authenticates to their NFID and provides a network address (or delegation identity in the case of ICP)
3. When your application requests a signature, the NFID iframe reappears for user approval.

<img src="../nfid-embed-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>
