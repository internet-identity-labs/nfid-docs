---
title: What is NFID?
subtitle: A "wallet" is a single key. NFID manages hundreds of keys automatically.
position: 1
description: "The complete guide to NFID: the easy to implement, decentralized one-touch MFA and authorization platform."
category: Overview
features:
  - Decentralized, self-sovereign identity provider
  - No usernames or passwords
  - No app downloads
  - Biometric login on any device, platform, or channel
---

## NFID in more detail
NFID is an app-less portable authenticator built by Internet Identity Labs, built on Dfinity Foundation's Internet Computer, and leverages Dfinity's Internet Identity, the strongest trustless cryptographic delegation system on the Internet.
NFID uses FIDO-based biometrics for secure, frictionless, and consistent customer authentication. With one click to create new accounts or sign into existing ones, NFID eliminates passwords and the inconveniences of traditional credential-based logins.

## Features
<list :items="features"></list>

## Authentication and Trust
NFID uses device-based FIDO biometrics to provide a secure and easy-to-deploy authentication process that can be used for any app, in any channel.

Here's how it works:

- User performs an action that requires authentication (such as login).
- User executes an authentication process with NFID, which may also include registering to NFID.
- Upon successful authentication, you receive an identity delegate, which preserves the user's privacy and provides nothing but a principal identifier to index the user on.
- If needed, you request more information from the user whenever you need (e.g. proof of a unique, verified carrier phone number or proof of ownership of an NFT in some collection). You may request this information as gated entry to some portion of your app.

## Online playground
To experiment with the registration flows for NFID, check out our integration in <a href="https://kinic.io/" target="_blank">Kinic</a>
