---
title: EVM
position: 11
category: NFID Wallet SDK
description: "The complete guide to NFID: the identity layer for the internet."
---

NFID gives you access to the most popular EVM compatible chains like Ethereum and Polygon. You're interacting with those chains by using our `EVM Blockchain Provider`.

## What you'll learn in this guide

1. [Connect user and get the address](/wallet/evm#connect-user-and-get-the-address)
2. [Get account balance of native token (ETH | MATIC)](/wallet/evm#get-account-balance-of-native-token-eth--matic)
3. [Request native token transfer](/wallet/evm#request-native-token-transfer)
4. [Get token balance of ERC-20 tokens](/wallet/evm#get-token-balance-of-erc-20-tokens)
5. Request standard token (e.g ERC-20 | ERC-721 | ERC-1155) transfer

6. Low level smart contract methods calls

### Connect user and get the address

```typescript
import Web3 from "web3";

const web3 = new Web3(nfidWallet.evm.getProvider(NFIDProvider.EVM.ETH_MAINNET));
const address = (await web3.eth.getAccounts())[0];
```

### Get account balance of native token

Each EVM compatible chain has its own native token. For example, Ethereum has ETH and Polygon has MATIC. You can get the balance of the native token by using the `getBalance` method on the corresponding `web3` instance.

### Ethereum

```typescript
const web3Ethereum = new Web3(
  nfidWallet.evm.getProvider(NFIDProvider.EVM.ETHEREUM_MAINNET)
);

var ethBalance = web3Eth.eth.getBalance(address);
```

### Matic

```typescript
// TODO: figure out how to talk to matic network
const web3Matic = new Web3(
  nfidWallet.evm.getProvider(NFIDProvider.EVM.POLYGON_MAINNET)
);

var maticBalance = web3Mat.eth.getBalance(address);
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
