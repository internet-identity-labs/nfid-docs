---
title: Quick start
position: 10
category: Getting started
description: Developer tools
---

NFID uses RPC endpoints for all chains except ICP (in the process of migration). Use the [ICP guide](../ic-features/authentication) if you're an ICP developer.

## Install

**NPM:**
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

## Next steps
- Dive into a React [demo application](https://hvn26-aiaaa-aaaak-aaa2a-cai.ic0.app/authentication) and try out NFID Wallet's functionality
- Learn how to request [wallet signatures](), [proof of uniqueness](), and other [personal data]()
- Check out our [SDK reference]()
- Acquire more users with [NFID Wallet+]()