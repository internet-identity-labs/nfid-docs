---
title: Quickstart
position: 10
category: NFID Wallet SDK
description: Developer tools
---

The @nfid/wallet npm package is a TypeScript SDK that easily integrates the NFID Wallet UI into your application. It allows you to display the NFID Wallet in a modal for user authentication, registration, and transaction signatures.

The quick start guide below shows you how to display the flow and interact with the chain-specific providers.

## Install dependencies

```bash
# NPM
npm install --save @nfid/wallet

# Yarn
yarn add @nfid/wallet
```

## Create an NFIDWallet instance

To interact with the NFID wallet, we need to configure with which chains we want to interact. And how NFID should display your application:

```typescript
import { NFIDWallet, NFIDProvider } from "@nfid/wallet";
import type { NFIDConfiguration } from "@nfid/wallet";


// Set up the NFID Wallet SDK
const configuration: NFIDConfiguration = {
  // Configure the chains you want to support
  providers: [
    NFIDProvider.EVM, // Ethereum, Polygon, Binance Smart Chain, Fantom, Avalanche, and many more
    NFIDProvider.BTC, // Bitcoin
    NFIDProvider.IC,  // Internet Computer
  ],
  // Configure the network stage
  environment: 'testnet' // 'testnet' | 'production'
  // Configure your application metadata
  appConfig: {
    // The name of your application
    name: "appName",
    // Your logo displayed within NFID Wallet for transaction approval and other interactions
    icon: "url/to/application-icon.png",
  },
};


const nfidWallet = await NFIDWallet.init(configuration);
```

## What can you do with the created `nfidWallet` instance?

The `nfidWallet` instance is your preconfigured multi chain provider interface and makes it easy to interact with the NFID Wallet UI.

The most important features are:

- Requesting the account your users want to connect to your app
- Let your users approve any transactions like buying NFTs, sending tokens or interacting with arbitrary smart contracts methods

## EVM compatible chains

NFID gives you access to the most popular EVM compatible chains like Ethereum, Polygon, Binance Smart Chain, Fantom, Avalanche, and many more. You're interacting with those chains by using our `EVM Blockchain Provider`.

### Requesting the account your users want to connect to your app

```typescript
import Web3 from "web3";

const web3 = new Web3(nfidWallet.evm.getProvider(NFIDProvider.EVM.ETH_MAINNET));
const address = (await web3.eth.getAccounts())[0];
```

### Sending transactions

```typescript
const destination = "0xE0cef4417a772512E6C95cEf366403839b0D6D6D";
const amount = web3.utils.toWei(1); // Convert 1 ether to wei

// Submit transaction to the blockchain and wait for it to be mined
const receipt = await web3.eth.sendTransaction({
  from: address,
  to: destination,
  value: amount,
});
```

## Internet Computer

NFID gives you access to the Internet Computer. You're interacting with the Internet Computer by using our `IC Blockchain Provider`.

### Requesting the account your users want to connect to your app

```typescript
const identity = await nfidWallet.ic.getDelegation();
const address = identity.getPrincipal().toText();
```

### Sending transactions

```typescript
import { E8S } from "@nfid/wallet";

const destination = "rrkah-fqaaa-aaaaa-aaaaq-cai";
const amount = BigInt(1 * E8S); // 1 ICP

nfidWallet.ic.sendTransaction({
  from: address,
  to: destination,
  value: amount,
});
```