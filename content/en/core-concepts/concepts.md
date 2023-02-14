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

With NFID, users associate their OAuth tokens, WebAuthn public keys, and other authentication factors to their NFID number, an on-chain identifier that can request threshold ECDSA signatures from an Internet Computer subnet. This architecture allows users to self-custody their ECDSA key like a traditional multi-factor account, without ever storing full cryptographic private keys anywhere, not even on node machines.

> **NOTE:** More info on managing keys

## High level architecture
The NFID SDK handles the interactions between OAuth token / public key providers, NFID smart contracts, and the Internet Computer threshold signing protocol.

This diagram below describes the relationship between the NFID iframe and integrating application:

<img src="../nfid-authentication-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

> **NOTE:** As you can see, the first critical component to the seamlessness of this UX is that the entire NFID website is served from smart contracts.

<img src="../nfid-authentication-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

> **NOTE:** Secondly, each user can permissionlessly request threshold ECDSA signatures from the Intenet Computer without any person, code, or node having access to the full cryptographic material.

### NFID Embed user flow with your application
1. User initiates login as if native to your application.
2. User carries out the authentication process with respect to their auth provider.
3. User selects the account to connect with your application.
4. When your application requests a signature, user approves it

With NFID, users authenticate using Google, FIDO-based device biometrics (or native biometrics for mobile apps), or other Web3 wallets. These biometric authenticators, such as fingerprint scanners, are already built into the desktop or mobile device. If their desktop device doesn’t support FIDO2, they can authenticate using a mobile device that does, Google, or another Web3 wallet. Ultimately users have the flexibility to authenticate using their preferred method, though we will continue to encourage progressive security thresholds for higher sensitivity transactions.

The authentication experience itself is branded to the look and feel of NFID with easy customization options for your logo and company name.

## User Registration
With NFID, you don’t need to manage the registration status of users or devices, or explicitly request registration. All you need to do is request user authentication, and NFID will handle all the logic to determine whether to initiate a registration, authentication, or account recovery flow.

When a user authenticates with NFID for the first time, a registration process automatically takes place to register the user. No personally identifiable information is collected, since NFID is explicitly built as a permissionless identity layer for the internet, and instead relies on the cryptographic guarantees of the Internet Computer and Internet Identity service to bind a user's NFID account across all their devices and application/web services.

When a user authenticates to your application for the first time, you will use the returned delegate caller's principal ID as the user's identifier in your system. This principal ID is different for every account on every website, which prevents applications from tracking a user's global internet activity.

When a user authenticates to your application after the first time, you will look up the delegate's caller's principal ID to retrieve the corresponding profile.

## Account Recovery
NFID allows users to securely regain access to their account from recovery phrases, other Web3 wallets, or FIDO-based devices. An account recovery flow automatically begins any time an existing NFID user (identified by their NFID number) tries to authenticate using a new device.

### Recovery phrase
A [recovery-code-based recovery flow](../tips-and-tricks/recover-your-account#recovery-with-recovery-phrase) allows users to get this authorization from their recovery code—the phrase they must have created beforehand from their NFID profile.

### Web3 wallet
A Web3 wallet recovery flow allows users to recover their NFID using a previously-registered Web3 wallet.

### Device-based
A [device-based recovery flow](../tips-and-tricks/recover-your-account#recover-with-nfid-number-and-biometric-unlock-or-security-key) allows the user to recover their NFID from any of their previously-registered FIDO-based devices, including security keys.

## Registered Devices
A user can have multiple devices that are bound to their account. This list includes any device that they used to authenticate, which is not necessarily the device they used to access their account. For example, a user can log into your website from their desktop device after using their mobile device to authenticate. Learn more about this flow [here](../create/passkey-registration#starting-on-a-desktop-computer).

For web applications, each browser represents a different device, and is registered separately. In addition, devices may vary in their support for FIDO2 biometrics (based on device model, device OS, browser, etc.). Therefore, the authentication experience may vary across devices.