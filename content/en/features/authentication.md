---
title: Authentication
position: 20
category: Features
description: "The complete guide to NFID: the identity layer for the internet."
---

NFID's key abstraction architecture eliminates the need for seed phrases, enabling seamless passwordless Web3 onboarding using a variety of methods. Each of these methods creates a private key and data storage container for the user, which they self-custody with the chosen authentication method.

NFID streamlines this entire process, providing an out-of-the-box user interface without requiring any additional work from the integrating app.

Currently the supported authentication methods are:
- Google
- WebAuthn
- Third-party wallets

<img src="../register.png" style="100%;margin:auto;padding-bottom:20px;"></img>

## Authentication methods
### Google
NFID simplifies the entire authentication flow with Google, enabling a hassle-free experience for your users with no setup required on your part.

### WebAuthn
Widely regarded by security experts as the future of internet authentication, WebAuthn is the API that enables users to sign in with the biometrics of their devices or a separate USB security key. Users can create an NFID using WebAuthn directly, or as a 2nd factor after Google authentication.

### Third-party wallets
Users can connect with existing third-party wallets (e.g. MetaMask) and in so doing, take custody of an NFID. When a user connects with a third-party wallet to your app, all further RPC calls will be forwarded to the selected wallet.

Currently, MetaMask, WalletConnect, and ICP's Internet Identity are shown by default.

Learn more about NFID's [supported authentication methods](../tips-and-tricks/creating-your-nfid).

## Configuration
### The NFIDWallet object
[NFIDWallet](../getting-started/quickstart#create) instantiates an instance of the NFID Wallet and sets configuration properties that appear in the user's UI for:
- Your application name
- Your application logo
- The chain for which you're requesting connections and signatures
NFID currently supports EVM and ICP chains.

### NFID Wallet+
Learn how to inject this experience on your site and brand it with your own logo and colors in the [customization section](ui-customization).