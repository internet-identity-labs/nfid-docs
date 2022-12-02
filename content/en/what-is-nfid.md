---
title: What is NFID?
subtitle: You are unique, just like your NFID.
position: 100
description: "The complete guide to NFID: the identity layer for the internet."
category: Overview
features:
  - Decentralized, self-sovereign identity provider
  - No usernames or passwords
  - No app downloads
  - Biometric login on any device, platform, or channel
---

NFID means something different depending on whether you're an application developer looking to establish a trustworthy relationship with your users, or you're the user looking to establish a trustworthy relationship with an application.

As an application developer, you want to know the information you're getting from your users is honest.

As a user, you want to be anonymous by default and share only the necessary information about yourself that the application is requesting.

## Non-fungible identity
An identity is a composite of all the things that make you *you*. You likely have citizenship status with at least one country, you may have a license to operate vehicles, you have a social media profile, you have relationships with your friends and family that you share certain aspects of your life with, you have money in a bank or in a crypto wallet, you own assets, you have preferences, likes, dislikes, good and bad reputation, and so on. 

There's no replacement for you because you're unique.

That's NFID - it's your identity on the internet and it keeps you anonymous by default.

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
