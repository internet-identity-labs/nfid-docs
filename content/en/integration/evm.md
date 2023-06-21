---
title: EVM
position: 11
category: Integration
description: "The complete guide to NFID: the identity layer for the internet."
---

NFID gives you access to the most popular EVM compatible chains like Ethereum and Polygon. You're interacting with those chains by using our `EVM Blockchain Provider`.

### Get account balance of native token

Each EVM compatible chain has its own native token. For example, Ethereum has ETH and Polygon has MATIC. You can get the balance of the native token by using the `getBalance` method on the corresponding `web3` instance.

### Ethereum

```typescript
const web3Ethereum = new Web3(
  nfidWallet.evm.getProvider(NFIDProvider.EVM.ETHEREUM_MAINNET)
);

const addresses = await nfidWallet.getAddresses(); // { evm: '0x...', ic: '...', btc: '...' }

var ethBalance = web3Eth.eth.getBalance(addresses.evm);
```

### Matic

additional packages:

```bash
npm install @maticnetwork/maticjs @maticnetwork/maticjs-web3
```

```typescript
import { POSClient, use } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-web3";
import HDWalletProvider from "@truffle/hdwallet-provider";

// install web3 plugin
use(Web3ClientPlugin);

const web3 = new Web3(
  nfidWallet.evm.getProvider(NFIDProvider.EVM.POLYGON_MAINNET)
);

const posClient = new POSClient();

await posClient.init({
  log: true,
  network: "testnet",
  version: "mumbai",
  parent: {
    provider: web3.currentProvider,
    defaultConfig: {
      from: address,
    },
  },
  child: {
    provider: web3.currentProvider,
    defaultConfig: {
      from: address,
    },
  },
});

const tokenAddress = "0x655f2166b0709cd575202630952d71e2bb0d61af";

const erc20Token = posClient.erc20(tokenAddress, true);
const balance = await erc20Token.getBalance(address);
```

### Request native token transfer

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

### Get token balance of ERC-20 tokens

```typescript
// The minimum ABI required to get the ERC20 Token balance
const minABI = [
  // balanceOf
  {
    name: "balanceOf",
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];
const tokenAddress = "0x0d8775f648430679a709e98d2b0cb6250d2887ef";

const contract = new web3.eth.Contract(minABI, tokenAddress);
const result = await contract.methods.balanceOf(address).call();
const format = web3.utils.fromWei(result);
```
