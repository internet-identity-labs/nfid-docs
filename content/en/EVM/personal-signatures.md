---
title: Personal Signatures
position: 14
category: EVM
description: "The complete guide to NFID: the identity layer for the internet."
---

Example implementation requesting `⁠personal_sign` and `signTypedData_v4` messages be signed:

<img src="../../sign.png" style="width:90%;margin:auto;"></img>

## Usage
After following the quickstart and creating an [NFIDWallet object](../getting-started/quickstart#create)...

### Request a personal signature
```javascript
// Request a signature
async function requestSignature() {
  const walletAccounts = await walletLink.getAccounts();
  if (walletAccounts.length > 0) {
    const account = walletAccounts[0];
    const message = 'Sign this message to prove ownership of your NFID account';
    const signature = await walletLink.signPersonalMessage(account, message);
    return signature;
  } else {
    throw new Error('User is not connected to NFID');
  }
}

// Call the requestSignature function to request a signature from the user
requestSignature().then((signature) => {
  console.log('Signature:', signature);
}).catch((error) => {
  console.error('Failed to request signature:', error);
});
```

### Request a typed data signature
```javascript
// Request a signTypedData signature
async function requestSignTypedData() {
  const walletAccounts = await walletLink.getAccounts();
  if (walletAccounts.length > 0) {
    const account = walletAccounts[0];
    const typedData = [
      {
        type: 'string',
        name: 'Message',
        value: 'Sign this message to prove ownership of your NFID account'
      }
    ];
    const signature = await walletLink.signTypedData(account, typedData);
    return signature;
  } else {
    throw new Error('User is not connected to NFID');
  }
}

// Call the requestSignTypedData function to request a signTypedData signature from the user
requestSignTypedData().then((signature) => {
  console.log('Signature:', signature);
}).catch((error) => {
  console.error('Failed to request signTypedData signature:', error);
});
```
