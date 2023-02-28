---
title: Personal Signatures
position: 24
category: Features
description: "The complete guide to NFID: the identity layer for the internet."
---

NFID offers out-of-the-box UI when the user is prompted to sign a personal or typed message for the following EVM RPC methods:
- ⁠personal_sign
- signTypedData_v4

These methods allow dapps to verfiably prove the ownership of the user's account through getting a signature from their private key and using it to sign arbitrary and/or typed data.

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

## Configuration
### The NFIDWallet object
[NFIDWallet](../getting-started/quickstart#create) instantiates an instance of the NFID Wallet and sets configuration properties that appear in the user's UI for:
- Your application name
- Your application logo
- The chain for which you're requesting connections and signatures
NFID currently supports EVM and ICP chains.

### NFID Wallet+
Learn how to inject this experience on your site and brand it with your own logo and colors in the [customization section](ui-customization).