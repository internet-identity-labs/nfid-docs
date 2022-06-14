---
title: NFID Concepts 101
subtitle: Learn more about NFID from the key concepts below.
position: 2
category: Overview
description: "The complete guide to NFID: the easy to implement, decentralized one-touch MFA and authorization platform."
---

## Authentication
NFID provides a secure, frictionless authentication experience across all end-user devices and use cases—whether they are logging into your website or mobile app, confirming a transaction, performing a step-up authentication, or contacting your Call Center for support.

With NFID, users authenticate using FIDO-based device biometrics (or native biometrics for mobile apps). These biometric authenticators, such as fingerprint scanners, are already built into the desktop or mobile device. If their desktop device doesn’t support FIDO2, they can authenticate using a mobile device that does. For mobile devices that don’t support FIDO2, we are building alternative authentication methods like email verification code or verification link, though those are fundamentally less secure and we are working with Dfinity/you to find the right trade-off. Ultimately, users will authenticate using the strongest authentication method available for their device.

The authentication experience itself is branded to the look and feel of NFID at the moment, but we are working on how to let you easily customize the logo, company name, colors, primary message, email templates, and more. An app banner can even be added to mobile-web authentication screens to encourage usage of your native mobile app.

## User Registration
With NFID, you don’t need to manage the registration status of users or devices, and explicitly request registration. All you need to do is request user authentication, and NFID will handle all the logic to determine whether to initiate a registration, authentication, or account recovery flow.

When a user authenticates with NFID for the first time, a registration process automatically takes place to register the user, along with their device. No personally identifiable information is collected, since NFID is explicitly built as a permissionless identity layer for the internet, and instead relies on the cryptographic guarantees of the Internet Computer and Internet Identity service to bind a user's NFID account across all their devices and application/web services.

When a user authenticates to your application for the first time, you will use the returned delegate's caller's principal ID as the user's identifier in your system. This principal ID is different for every account on every website, which prevents applications from tracking a user's global internet activity.

When a user authenticates to your application after the first time, you will look up the delegate's caller's principal ID to retrieve the right profile.

## Account Recovery
NFID allows users to securely regain access to their account from a new device. An account recovery flow automatically begins any time an existing NFID user (identified by their anchor number) tries to authenticate using a new device. This flow is used to securely register the new device to the existing account by first requiring authorization from a previously registered device.

This can be done in one of two ways right now, but more recovery methods will be added towards the end of 2022/2023. A device-based recovery flow allows the user to register their new device only once they authorize recovery using a device they previously registered. A recovery-code-based recovery flow allows them to get this authorization from their recovery code—the phrase they were given when they registered their NFID. In the first case, authorization must be provided using a device that was registered with biometrics since account recovery is a sensitive operation that requires strong authentication. In the second case, NFID relies on the security and careful custody with which users save their recovery codes.

Note: Aside from recovery flows, users can link additional authenticator devices to their account.

## Registered Devices
A user can have multiple devices that are bound to their account. This list includes any device that they used to authenticate, which is not necessarily the device they used to access their account. For example, a user can log into your website from their desktop device after using their mobile device to authenticate.

For web applications, each browser represents a different device, and is registered separately. In addition, devices may vary in their support for FIDO2 biometrics (based on device model, device OS, browser, etc.). Therefore, the authentication experience may vary across devices.