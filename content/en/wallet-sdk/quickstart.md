---
title: Quickstart
position: 10
category: Wallet SDK
description: Developer tools
---

The NFID Wallet SDK is a javascript toolSDK that displays the NFID Wallet authentication/registration flow in a modal and returns a `provider` for the specified chain.

The quick start guide below shows you how to display the flow and interact with the `provider`.

## Install dependencies
```bash
npm install --save nfid-wallet-sdk
```

## Create an NFIDWalletSDK instance
Create an instance of the NFIDWalletSDK by providing the SDK configuration NFIDWalletConfig.
With the NFID Wallet SDK added, you can now use web3.js or ethers.js for ETH and MATIC, or the `@nfid/wallet-SDK` helper package for ICP.

```javascript
import { NFIDWalletSDK, NFIDAuthOptions } from '@nfid/wallet-sdk';

// Set up the NFID Wallet SDK
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

const nfidWalletSDK = await NFIDWalletSDK.init(options)
```

## Connect and getProvider()
```javascript
// Subscribe to events
nfidWalletSDK.subscribe(ADAPTER_EVENTS.CONNECTED, () => {
  console.log('User is authenticated');
});

nfidWalletSDK.subscribe(ADAPTER_EVENTS.DISCONNECTED, () => {
  console.log('User is not authenticated');
});

// Connect the user's NFID Wallet
// The signIn method will return the user's address for the selected network
// The await will last until the user is authenticated so while the UI modal is displayed
await nfidWalletSDK.signIn();

// Call getProvider() to get the provider instance
nfidWalletSDK.getProvider();

// The signOut method will remove the current session
await nfidWalletSDK.signOut();
```

## Sign transactions
```javascript
// Using web3
const web3 = new Web3(nfidWalletSDK.getProvider());

await web3.eth.sendTransaction(tx);
await web3.eth.signTransaction(tx);
const message = 'hello world';
const address = '0x...';
await web3.eth.personal.sign(message, address);

// Using ethers
const provider = new ethers.providers.Web3Provider(nfidWalletSDK.getProvider());
const signer = provider.getSigner();

await signer.sendTransaction(tx);
await signer.signTransaction(tx);
await signer.signMessage(message);
```