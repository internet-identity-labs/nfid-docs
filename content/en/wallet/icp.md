---
title: ICP usage
position: 11
category: NFID Wallet SDK
description: "The complete guide to NFID: the identity layer for the internet."
---

NFID returns a delegation identity to your application, which is able to sign messages without wallet prompts. Support is currently limited to scoping the delegation's permissions for canisters you own. This means if you want to call any other canisters, it will require the user's approval in a wallet prompt.

## Prerequisites
When submitting the request for a delegation identity, you need to provide the canister IDs that this delegation will have permission to call. To protect user assets and data in other canisters that aren't yours, you are required add a `get_whitelisted_frontends` method to each of the canisters you wish the delegation to have permission for. NFID will ensure the `event.origin` (the origin that's requesting a delegation) is in the returned array from this method for each canister in the `targets` array.

```
# Rust implementation

# Motoko implementation
```

## Install
This guide assumes familiarity with building on the IC. More information can be found [here](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove). Your environment will need:
- dfx SDK
- node
- @dfinity/agent, @dfinity/identity, and @dfinity/auth-client node packages >v0.11.0

Create an instance of the NFIDWalletSDK by providing the SDK configuration NFIDWalletConfig.

```javascript
import { NFIDWalletSDK, NFIDAuthOptions } from '@nfid/wallet';

// Set up the NFID Wallet SDK
const options: NFIDAuthOptions = {
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x5',
    // https://chainlist.org/
    rpcTarget: `https://rpc.ankr.com/eth_goerli`
  },
  // icConfig is only for Internet Computer developers
  // see [here](icp)
  icConfig: {
    targets: [canisterIDs],
    derivationOrigin: derivationOrigin
  }
  appConfig: {
    icon: 'url/to/icon.png',
    name: 'appName'
  }
}

const nfidWalletSDK = await NFIDWalletSDK.init(options)
```

## Connect Accounts

NOTE: The available provider has to be inferred by the provided configuration

```javascript
# EVM chains
await nfidWallet.provider.ethereum.connect();
// or shorthand?
await nfidWallet.connect();

# IC
await nfidWallet.provider.ic.getDelegation();
// or shorthand?
const delegationIdentity = await nfidWallet.getDelegation();

const agent = new HttpAgent({ identity: delegationIdentity });

```

## Switch Accounts

```javascript
await nfidWallet.disconnect();
await nfidWallet.connect();
```


## Events
```javascript
import type { NFIDEvents } from '@nfid/wallet';
// Subscribe to events
nfidWalletSDK.subscribe(NFIDEvents.CONNECTED, () => {
  console.log('User is authenticated');
});

nfidWalletSDK.subscribe(NFIDEvents.DISCONNECTED, () => {
  console.log('User is not authenticated');
});

// Connect the user's NFID Wallet
// The signIn method will return the user's address for the selected network
// The await will last until the user is authenticated so while the UI modal is displayed
// authClient is the returned delegation identity
const authClient = await nfidWalletSDK.signIn();

// Once the user has been authenticated, set up an agent and an actor
const identity = authClient.getIdentity();
// Using the identity obtained from the auth client, create an agent to interact with the IC
const agent = new HttpAgent({ identity });
// Using the interface description of your webapp, create an Actor to call its service methods
const webapp = Actor.createActor(webapp_idl, {
  agent,
  canisterId: webapp_id,
});

// The signOut method will remove the current session
await nfidWalletSDK.signOut();
```

## Sign transactions
```javascript
await nfidWalletSDK.sendTransaction(tx);
```