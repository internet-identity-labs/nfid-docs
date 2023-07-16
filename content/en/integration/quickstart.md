---
title: Quickstart
position: 10
category: Integration
description: Developer tools
---

The @nfid/core npm package is a TypeScript SDK that easily integrates the NFID UI into your application. It allows you to display NFID in a modal for user authentication, registration, and transaction signatures.

The quick start guide below shows you how to display the flow and interact with the chain-specific providers.

## Install dependencies

```bash
# NPM
npm install --save @nfid/core

# Yarn
yarn add @nfid/core
```

## Create an NFIDCore instance

To interact with NFID, we need to configure with which chains we want to interact. And how NFID should display your application:

```typescript
import { NFIDCore } from "@nfid/core";
import type { NFIDConfiguration } from "@nfid/core";


// Set up the NFID Core SDK
const configuration: NFIDConfiguration = {
  // Configure the network stage
  environment: 'testnet' // 'testnet' | 'production' | 'local'
  // Configure your application metadata
  appConfig: {
    // The name of your application
    name: "appName",
    // Your logo displayed within NFID for transaction approval and other interactions
    icon: "url/to/application-icon.png",
  },
};


const nfidCore = await NFIDCore.init(configuration);

// Request authentication from NFID UI
await nfidCore.connect();

// get an object with all the connected addresses
await nfidCore.getAddresses(); // { evm: '0x...', ic: '...', btc: '...' }
```

## What can you do with the created `nfidCore` instance?

The `nfidCore` instance is your preconfigured multi chain provider interface and makes it easy to interact with the NFID UI.

The most important features are:

- Requesting the account your users want to connect to your app
- Let your users approve any transactions like buying NFTs, sending tokens or interacting with arbitrary smart contracts methods

[Proceed with EVM usage](/integration/evm)

[Proceed with ICP usage](/integration/icp)
