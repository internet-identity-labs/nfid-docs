---
title: Quickstart
position: 10
category: Wallet Kit
description: Developer tools
---

The Wallet kit displays an NFID Wallet onboarding flow for users to authenticate with an email address or passkey. A `provider` object is returned for you to use.

The quick start guide below shows you how to display the flow and interact with the `provider`.

## Install dependencies
```bash
npm install --save nfid-wallet-kit
```

## Create an NFIDWalletKit instance
Create an instance of the NFIDWalletKit by providing the kit configuration NFIDWalletConfig.
With the NFID Wallet Kit added, you can now use web3.js or ethers.js for ETH and MATIC, or the `@nfid/wallet-kit` helper package for ICP.

```javascript
import { NFIDWalletKit, NFIDAuthOptions } from '@nfid/wallet-kit';

// Set up the NFID Wallet Kit
const options: NFIDAuthOptions = {
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x5',
    // https://chainlist.org/
    rpcTarget: `https://rpc.ankr.com/eth_goerli`
  },
  // icConfig is only for Internet Computer developers
  // see [here](icp)
  icConfig: {
    targets: [canisterIDs],
    derivationOrigin: derivationOrigin
  }
  appConfig: {
    icon: 'url/to/icon.png',
    name: 'appName'
  }
}

const nfidWalletKit = await NFIDWalletKit.init(options)
```

## Connect and getProvider()
```javascript
// Subscribe to events
nfidWalletKit.subscribe(ADAPTER_EVENTS.CONNECTED, () => {
  console.log('User is authenticated');
});

nfidWalletKit.subscribe(ADAPTER_EVENTS.DISCONNECTED, () => {
  console.log('User is not authenticated');
});

// Connect the user's NFID Wallet
// The signIn method will return the user's address for the selected network
// The await will last until the user is authenticated so while the UI modal is displayed
await nfidWalletKit.signIn();

// Call getProvider() to get the provider instance
nfidWalletKit.getProvider();

// The signOut method will remove the current session
await nfidWalletKit.signOut();
```

## Sign transactions
```javascript
// Using web3
const web3 = new Web3(nfidWalletKit.getProvider());

await web3.eth.sendTransaction(tx);
await web3.eth.signTransaction(tx);
const message = 'hello world';
const address = '0x...';
await web3.eth.personal.sign(message, address);

// Using ethers
const provider = new ethers.providers.Web3Provider(nfidWalletKit.getProvider());
const signer = provider.getSigner();

await signer.sendTransaction(tx);
await signer.signTransaction(tx);
await signer.signMessage(message);
```