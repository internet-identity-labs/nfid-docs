---
title: Key management
subtitle: Technical descriptions for NFID's key infrastructure
position: 41
category: How It Works
description: "The complete guide to NFID: the identity layer for the internet."
---

## NFID's ECDSA abstraction protocol

The NFID protocol leverages a powerful toolkit of advanced cryptographic mechanisms, collectively referred to as chain-key cryptography. This approach enables NFID to achieve unparalleled self-custodial convenience.

At the heart of this cutting-edge technology is a threshold signature scheme, similar to a traditional digital signature scheme, but with a distributed secret signing key. This novel approach ensures that the key cannot be compromised by any one node, or even a significant fraction of the nodes in a subnet.

This technology provides the NFID smart contracts with the means to request ECDSA signatures for messages and transactions in such a way that only the user can use and approve. You can read more about the core of how this will work by learning about the core threshold signature scheme:

- Read the [threshold ECDSA-signing whitepaper](https://eprint.iacr.org/2022/506) and [proofs of its key security elements](https://eprint.iacr.org/2021/1330) by [Victor Shoup](https://en.wikipedia.org/wiki/Victor_Shoup) (author of the [Cramer-Shoup cryptosystem](https://en.wikipedia.org/wiki/Cramer%E2%80%93Shoup_cryptosystem) asymmetric encryption algorithm, editor for [ISO 18033-2: A Standard for Public-Key Encryption](https://www.shoup.net/iso/std6.pdf)) and [Jens Groth](http://www0.cs.ucl.ac.uk/staff/j.groth/) (inventor of [pairing-based NIZK proofs](https://link.springer.com/chapter/10.1007%2F11761679_21), [pairing-based SNARKs](https://link.springer.com/chapter/10.1007%2F978-3-642-17373-8_19), and [logarithmic size proof systems](https://link.springer.com/chapter/10.1007%2F978-3-642-17373-8_19) underpinning Bulletproofs)
- Watch Victor Shoup's [technical presentation](https://youtu.be/MulbKPwv6_s?t=114) on threshold ECDSA-signing
- Read more about [identity-based on-chain encryption with vetkd](https://eprint.iacr.org/2023/616.pdf)

### Technical user journey

<img src="../nfid-signatures.png" style="width:60%;margin:auto;padding-bottom:20px;"></img>

Users handle keys similar to a multi-factor account, where they use their OAuth login, devices and other factors to manage their key pairs. These factors authenticate users to an identifier in one of NFID's wasm smart contracts: The NFID Identity Manager. Here's the step-by-step flow of how a user creates an NFID:
1. The NFID Frontend submits a request to the NFID Identity Manager for the next index with the authentication factor in payload.
2. NFID allocates an index and stores the authentication factor's public key or key-equivalent.
3. NFID Identity Manager responds to NFID Frontend with the index (the NFID number or more simply the NFID, short for non-fungible identifier) that the user now owns, along with a delegation identity that can make authenticated calls back to the network.
4. The user's delegation identity requests a blockchain address (for the developer-requested network) to the NFID Identity Manager
5. The blockchain address is returned back to the NFID Frontend and finally delivered to the dapp via RPC endpoint.
6. When a signature is requested, steps 4-5 are executed with the one difference being the NFID Identity Manager will request the NFID ECDSA Signer for a signature.

<img src="../ecdsa-abstraction.jpg" style="width:100%;margin:auto;padding-bottom:20px;"></img>

### Self-custodial
The user is always in control of ownership and access to their cryptographic keys with NFID. Users will set up authentication and transfer policy controls inside NFID Identity Manager for full control of signature approvals.

### Feels like Web 2.0 login flows
NFID provides users with seamless access to their key pair through login flows that are as effortless and familiar as those used in Web2 applications. This not only simplifies the user experience and onboarding, but also enhances the overall accessibility and convenience of Web3.

### No need for key recovery
NFID allows users to set up their own MFA policies in the NFID Identity Manager smart contract, which is the abstraction for their ECDSA key. As a result, users will never "lose their key" or need to recover it because they have so many options to authenticate themselves to their NFID.

Read about how to [enable 2FA](https://learn.nfid.one/enable-2fa-for-enterprise-grade-security).

### Chain/platform agnostic via native signatures
Users with an NFID own native cryptographic key pairs, making NFID compatible with all cryptographic constructs on various platforms and elliptic curves.

### Censorship resistant
Using a threshold signature also prevents censorship by the nodes because the protocol assumes up to 1/3 of all subnet nodes to be malicious.

## The node network
As of February 2023, the base protocol consists of [865 nodes](https://dashboard.internetcomputer.org/nodes) run by [82 node providers](https://dashboard.internetcomputer.org/providers) across [69 geographically distributed data centers](https://dashboard.internetcomputer.org/centers), and the threshold cryptography native to the protocol ensure none can access any data or keys.