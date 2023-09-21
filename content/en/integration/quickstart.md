---
title: Quickstart
position: 10
category: Integration
description: The complete guide to NFID
---

## Installation

to setup the NFID SDK, you need to install the `@nfid/embed` package from npm:

```bash
# npm
npm install @nfid/embed

# yarn
yarn add @nfid/embed
```

## Usage

To use the SDK, you need to import the `NFID` class from the package:

```ts
import { NFID } from "@nfid/embed";
```

Then, you can init a new instance of the `NFID`. The static `NFID.init()` method returns a promise which resolves as soon as the mounted NFID iframe is ready to use. You can use the `await` keyword to wait for the promise to resolve:

```ts
const nfid = await NFID.init();
```

### Authentication

when the sdk is initiated, you can check if the user is authenticated or not by using the `nfid.isAuthenticated` property. If the user is not authenticated, you can use the `nfid.getDelegation()` method to open the NFID login modal:

```ts
import { Identity } from "@dfinity/agent";

const delegationIdentity: Identity = await nfid.getDelegation({
  targets: ["YOUR_CANISTER_ID_1", "YOUR_CANISTER_ID_2"],
});
```

The targets property is `optional` but required to request a `global` delegation.

### Update global delegation

In case you have user specific backend canisters, it might be required to update the global delegation to include the user specific canisters. To do so, you can use the `nfid.updateGlobalDelegation()` method:

```ts
import { Identity } from "@dfinity/agent";

const delegationIdentity: Identity = await nfid.updateGlobalDelegation({
  targets: [
    "YOUR_CANISTER_ID_1",
    "YOUR_CANISTER_ID_2",
    "YOUR_CANISTER_ID_USER_SPECIFIC",
  ],
});
```

### Request Fungible Token transfer

The `nfid.requestTransferFT()` method requests approval to transfer the given amount of ICP from the user to the designated address.

```ts
type Response = {
  hash: string; // the transaction hash
};

const response: Response = await nfid.requestTransferFT({
  receiver, // the receiver address
  amount, // the amount to transfer
});
```

### Request NFT transfer

The `nfid.requestTransferNFT()` method request approval to transfer an EXT NFT from the user to a designated address.

```ts
type Response = {
  hash: string; // the transaction hash
};

const response: Response = await nfid.requestTransferFT({
  receiver, // the receiver address
  amount, // the amount to transfer
});
```

### Request canister call

The `nfid.requestCanisterCall()` method request approval to call another canister with the given `canisterId`, `method`, and `parameters` and return the response data.

```ts
type Response = unknown; // whatever the canister method returns

const response: Response = await nfid.requestCanisterCall({
  canisterId, // the canister id which will be called
  method, // the method on the canister which will be called
  parameters, // the parameters passed to the method on the canister
});
```
