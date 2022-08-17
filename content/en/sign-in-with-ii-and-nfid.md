---
title: Sign in with Internet Identity and NFID
position: 72
category: User Flows
description: "The complete guide to NFID: the easy to implement, decentralized one-touch MFA and authorization platform."
---

For those of us with an existing Internet Identity anchor that also want to sign in to applications with NFID, follow these three steps (*you'll be able to more easily add the rest of your devices if you complete them on your mobile phone*):
- Navigate to https://nfid.one/recover-nfid/enter-recovery-phrase
- Recover with your **Internet Identity recovery phrase**
- Assuming your device has biometric unlock, elect to **Trust this device** and complete the challenge (if it doesn't, we suggest adding a security key)

Congratulations, you may now Sign in With NFID and retrieve your existing profiles on applications where you've already created accounts! As of today, that would be on [DSCVR](https://dscvr.one), [ICME](https://sygsn-caaaa-aaaaf-qaahq-cai.raw.ic0.app/login), [Kinic](https://74iy7-xqaaa-aaaaf-qagra-cai.raw.ic0.app/), [UserGeek](https://fbbjb-oyaaa-aaaah-qaojq-cai.raw.ic0.app/), and many others.

**Note** You will be able to sign in with Internet Identity or NFID from any of up to 10 authorized devices.

## How does this work?
NFID is built on top of Internet Identity and extends its infrastructure with additional functionality. All public keys you create with NFID are stored in the Internet Identity canister, and generally means you can authenticate to that anchor with any of those keys from anywhere.

The keys you generate with WebAuthn (i.e. Touch ID, Face ID, Windows Hello, security key, etc) are intrinsically tied to the domain on which they were created, meaning that if you created them on https://identity.ic0.app, you'll only be able to use them on that domain. Vice versa the keys you created on https://nfid.one are only available to use there. The ability to safeguard a non-exportable key inside the secure enclave of your devices without needing protection from a phishable password is an *incredible* (and often understated) security feature that isn't available on any identity protocol anywhere else, only on the Internet Computer.

The one exception is the recovery phrase. This key isn't scoped to any domain and can be used to authenticate you to your anchor from any website. Generally speaking, this makes the recovery phrase the least secure of all your keys because, as we like to say, *what can be shared can be stolen*.

## When can I use a different method besides my recovery phrase?
While we are actively working on building secure and privacy-preserving meta-wallet support, social key recovery, multi-sig web2 authentication, cross-application data sharing/proofs, and other important identity features, we don't yet have an estimate for building an alternative migration flow. However, if you feel we should reprioritize, please drop us a note!