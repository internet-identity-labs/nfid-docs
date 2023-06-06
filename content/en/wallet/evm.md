---
title: EVM
position: 11
category: NFID Wallet SDK
description: "The complete guide to NFID: the identity layer for the internet."
---

NFID gives you access to the most popular EVM compatible chains like Ethereum and Polygon. You're interacting with those chains by using our `EVM Blockchain Provider`.

## What you'll learn in this guide

1. [Connect user and get the address](/wallet/evm#connect-user-and-get-the-address)
2. Get account balance of native token (ETH | MATIC)
3. Get token balance of ERC-20 tokens
4. Request native token transfer
5. Request standard token (e.g ERC-20 | ERC-721 | ERC-1155) transfer

6. Low level smart contract methods calls

### Connect user and get the address

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

## More Examples to build
