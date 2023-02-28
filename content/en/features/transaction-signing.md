---
title: Transaction Signing
position: 23
category: Features
description: "The complete guide to NFID: the identity layer for the internet."
---

NFID provides a seamless UI experience by default, triggered whenever the `sendTransaction` RPC method is executed using the NFID SDK or web3 provider libraries such as web3.js or ethers.js. This interface is designed to provide the user with pertinent information related to the transaction, such as the transaction details and associated costs, including estimated gas fees.</br>

[Custom transaction previews]() to increase trust with your users are available as part of NFID Wallet+.

<img src="../../buy.png" style="width:500px;margin:auto;"></img>

## Usage
After following the quickstart and creating a [WalletLink object](../getting-started/quickstart#create), request a transaction approval:

```javascript
// Request a transaction approval from the user's wallet
async function requestTransactionApproval() {
  const walletAccounts = await walletLink.getAccounts();
  if (walletAccounts.length > 0) {
    const account = walletAccounts[0];
    const transaction = {
      from: account,
      to: '0x0123456789abcdef0123456789abcdef01234567',
      value: '0x100000000000000000',
      gas: '0x5208',
      gasPrice: '0x4a817c800',
      nonce: '0x0',
      data: '',
    };
    const signedTransaction = await walletLink.signTransaction(account, transaction);
    return signedTransaction;
  } else {
    throw new Error('User is not connected to NFID');
  }
}

// Call the requestTransactionApproval function to request a transaction approval from the user
requestTransactionApproval().then((signedTransaction) => {
  console.log('Signed transaction:', signedTransaction);
}).catch((error) => {
  console.error('Failed to request transaction approval:', error);
});
```

## Configuration
### The NFIDWallet object
[NFIDWallet](../getting-started/quickstart#create) instantiates an instance of the NFID Wallet and sets configuration properties that appear in the user's UI for:
- Your application name
- Your application logo
- The chain for which you're requesting connections and signatures
NFID currently supports EVM and ICP chains.

### NFID Wallet+
Learn how to inject this experience on your site and brand it with your own logo and colors in the [customization section](ui-customization).