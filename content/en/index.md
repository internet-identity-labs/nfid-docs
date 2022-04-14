---
title: Introduction
subtitle: User authentication that is effortless to integrate, implement, and test.
position: 1
category: Getting Started
features:
  - Decentralized, self-sovereign identity provider
  - No usernames or passwords
  - Biometric login on any device, platform, or channel
  - Proof of humanity
  - Privacy-preserving wallet (in development)
  - Instant, gas-less swaps (in development)
  - One-click checkout (in development)
---

# TODO - make Getting Started the first section

<alert type="info">
Follow our latest updates <a href="https://twitter.com/@IdentityMaxis" target="_blank">@IdentityMaxis</a>
</alert>

## What is NFID?
NFID is an app-less, strong portable authenticator built by Internet Identity Labs, built on Dfinity Foundation's Internet Computer, and leverages Dfinity's Internet Identity, the strongest trustless cryptographic delegation system on the Internet.
NFID uses FIDO-based biometrics for secure, frictionless, and consistent customer authentication. With one click to create new accounts or sign into existing ones, NFID eliminates passwords and the inconveniences of traditional credential-based logins.

NFID is a great solution for various use cases, including:

- Passwordless authentication for web and mobile applications.
- User authentication for call centers, IVR, and voice assistance.
- Frictionless new account opening.
- Secure verification for infrequent users.
- Applications selling goods or services denominated in ICP.
- Applications requiring proof of humanity with or without zero-knowledge.
- Applications requiring KYC/AML with or without zero-knowledge.
- Applications requiring identities prove ownership of some digital asset, with or without zero-knowledge.

## Features
<list :items="features"></list>

## Authentication and Trust
NFID uses device-based FIDO biometrics to provide a secure and easy-to-deploy authentication process that can be used for any app, in any channel.

Here's how it works:

- User performs an action that requires authentication (such as login).
- User executes an authentication process with NFID, which may also include registering to NFID and registering a strong authenticator (e.g., FIDO2 biometrics).
- Upon successful authentication, you receive an identity delegate, which preserves the user's privacy and provides nothing but a principal identifier to index the user on.
- If needed, you request more information from the user whenever you need (e.g. proof of a unique, verified carrier phone number or proof of ownership of an NFT in some collection). You may request this information as gated entry to some portion of your app.
- In the future, we would like to work with you on how to report additional information on the user back to NFID (e.g. username registration for new users).

## Online playground
To experiment with the registration flows for NFID, use our demo sandbox environment <a href="https://wzkxy-vyaaa-aaaaj-qab3q-cai.ic0.app/" target="_blank">here</a>
