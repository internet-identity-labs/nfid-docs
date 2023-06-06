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
  environment: 'testnet' // 'testnet' | 'production' | 'local'
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

[Proceed with EVM usage](/wallet/evm)

[Proceed with ICP usage](/wallet/icp)
