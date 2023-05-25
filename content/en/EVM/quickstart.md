---
title: EVM Quickstart
position: 10
category: EVM
description: Developer tools
---

This section is for Ethereum developers.

NFID Wallet is served in an iframe on your site and triggered whenever the `signTransaction`, `signTypedData`, or `personalSign` RPC methods are executed using the NFID SDK or web3 provider libraries like web3.js or ethers.js.

Below is a sample implementation for adding the iframe to your site:

## Install
Install the NFID SDK - all you need to embed the NFID Wallet as an iframe on your page.
```bash
npm install --save nfid-sdk
```

## Create
With the NFID sdk package added, you can now use web3.js, ethers.js, or the `@nfid/wallet` helper package to create an instance of `walletLink`.

```javascript
// Set up the NFID Wallet SDK
const NFIDWallet = require('@nfid/wallet').default;

// Create a new WalletLink instance
const walletLink = new NFIDWallet({
  appName: 'Your App Name',
  appLogoUrl: 'https://yourapp.com/logo.png',
  chainType: 'EVM',
  chainId: 1, // Ethereum mainnet
  // chainId: 5, // Goerli testnet
  // chainId: 137, // Polygon mainnet
  // chainId: 80001, // Mumbai (Polygon testnet)
});
```

## Connect
Use `walletLink` to connect, request signatures, and call any supported EVM RPC Methods.
```javascript
// Connect the user's NFID Wallet
async function connectToNFIDWallet() {
  const walletAccounts = await walletLink.getAccounts();
  if (walletAccounts.length > 0) {
    // User is already connected to NFID Wallet
    return walletAccounts[0];
  } else {
    // Wait for the user to approve the connection in the NFID Wallet
    const { accounts } = await walletLink.waitForAccount();
    return accounts[0];
  }
}

// Call the connectToNFIDWallet function to connect the user
connectToNFIDWallet().then((account) => {
  console.log('Connected to NFID Wallet with account:', account);
}).catch((error) => {
  console.error('Failed to connect to NFID Wallet:', error);
});
```