---
title: Key management
subtitle: Technical descriptions for NFID's key infrastructure
position: 5
category: Overview
description: "The complete guide to NFID: the identity layer for the internet."
---

## NFID's ECDSA abstraction protocol

With NFID, users handle keys similar to a multi-factor account, where they use their OAuth login, devices and other factors to manage their key pairs. These factors authenticate users to an identifier in one of NFID's wasm smart contracts: The NFID Identity Manager. Here's the step-by-step flow of how a user creates an NFID:
> **NOTE:** Remember that the frontend is served from the NFID Frontend wasm smart contract. Therefore we can assume the NFID Frontend is synonymous with `user`.
1. The NFID Frontend submits a request to the NFID Identity Manager for the next index with the authentication factor in payload.
2. NFID allocates an index and stores the authentication factor's public key or key-equivalent.
3. NFID Identity Manager responds to NFID Frontend wasm smart contract with the index (the NFID number or more simply the NFID, short for non-fungible identifier) that the user now owns, along with a delegation identity that can make authenticated calls back to the network.
4. The user's delegation identity requests a blockchain address (for the developer-requested network) to the NFID Identity Manager
5. The blockchain address is returned back to the NFID Frontend and finally delivered to the dapp via RPC endpoint.
6. When a signature is requested, steps 4-5 are executed with the one difference being the NFID Identity Manager will request the NFID ECDSA Signer for a signature from the Internet Computer Protocol.

<img src="../ecdsa-abstraction.jpg" style="width:100%;margin:auto;padding-bottom:20px;"></img>

### Self-custodial
The user is always in control of ownership and access to their cryptographic keys with NFID. Users will set up authentication and transfer policy controls inside NFID Identity Manager for full control of signature approvals.

### Feels like Web 2.0 login flows
NFID provides users with seamless access to their key pair through login flows that are as effortless and familiar as those used in Web2 applications. This not only simplifies the user experience and onboarding, but also enhances the overall accessibility and convenience of Web3.

### No need for key recovery
NFID allows users to set up their own MFA policies in the NFID Identity Manager smart contract, which is the abstraction for their ECDSA key. As a result, users will never "lose their key" or need to recover it because they have so many options to authenticate themselves to their NFID.

Read more on ways to [recover your account](../tips-and-tricks/recover-your-account).

### Chain/platform agnostic via native signatures
Users with an NFID own a native cryptographic key pair, making NFID compatible with all cryptographic constructs on various platforms and elliptic curves.

### Censorship resistant
Using a 2/3 threshold also prevents censorship by the Torus nodes. In the case that the nodes refuse to return the share of the user's private key even after the user has authenticated successfully, the user can still reconstruct their private key using ShareA (device share) and ShareC (recovery share).

## Powered by the Internet Computer Protocol
NFID is powered by the Internet Computer, an open-source protocol with multiple breakthroughs in cryptography that allow threshold ECDSA signatures such that the ECDSA key never exists on one node - only its shares. Check out more about the tech [here](https://internetcomputer.org/how-it-works).

As of February 2023, the Internet Computer Protocol consists of [865 nodes](https://dashboard.internetcomputer.org/nodes) run by [82 node providers](https://dashboard.internetcomputer.org/providers) across [69 geographically distributed data centers](https://dashboard.internetcomputer.org/centers), and the threshold cryptography native to the protocol ensure none can access any data or keys.