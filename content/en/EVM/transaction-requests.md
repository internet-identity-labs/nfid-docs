---
title: Transaction requests
position: 13
category: EVM
description: "The complete guide to NFID: the identity layer for the internet."
---

Example requesting a transaction be signed:

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