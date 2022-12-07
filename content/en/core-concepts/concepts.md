---
title: NFID Concepts 101
subtitle: Learn more about NFID.
position: 3
category: Overview
description: "The complete guide to NFID: the identity layer for the internet."
---

## Authentication
NFID provides a secure, frictionless authentication experience across all end-user devices and use cases—whether they are logging into your website or mobile app, confirming a transaction, performing a step-up authentication, or contacting your Call Center for support.

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
A user can have multiple devices that are bound to their account. This list includes any device that they used to authenticate, which is not necessarily the device they used to access their account. For example, a user can log into your website from their desktop device after using their mobile device to authenticate. Learn more about this flow [here](../create/device-registration#starting-on-a-desktop-computer).

For web applications, each browser represents a different device, and is registered separately. In addition, devices may vary in their support for FIDO2 biometrics (based on device model, device OS, browser, etc.). Therefore, the authentication experience may vary across devices.