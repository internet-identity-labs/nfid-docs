---
title: ICP
position: 11
category: Integration
description: "The complete guide to NFID: the identity layer for the internet."
---

NFID returns a delegation identity to your application, which is able to call your application specific canisters without wallet prompts. If you want to call any other canisters, it will require the user's approval in a wallet prompt.

NFID gives you access to the Internet Computer. You're interacting with the Internet Computer by using our `IC Blockchain Provider`.

### Get the delegation identity and use to do queries to the IC

```typescript
const identity = await nfidCore.ic.getDelegation();
```

### Get account balance of native token (ICP)

```typescript
import { principalToAddress } from "ictool";

const principal = identity.getPrincipal();
const balance = await nfidCore.ic.getBalance(principalToAddress(principal));
```

### Request native token transfer (ICP)

```typescript
import { E8S } from "@nfid/core";

// FIXME: use correct IC Address
const destination = "rrkah-fqaaa-aaaaa-aaaaq-cai";
const amount = BigInt(1 * E8S); // 1 ICP

nfidCore.ic.sendTransaction({
  from: address,
  to: destination,
  value: amount,
});
```

### Get token balance of ICRC-1 tokens

```typescript
const CKBTC_CANISTER_ID = "mxzaz-hqaaa-aaaar-qaada-cai";

// SmartContract interface (idl: interface definition language)
const idlFactory = ({ IDL }) => {
  const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  return IDL.Service({
    // ... other methods
    icrc1_balance_of: IDL.Func([Account], [IDL.Nat], ["query"]),
    // ... other methods
  });
};

const ckBtcContract = actor(CKBTC_CANISTER_ID, idlFactory);

const balance = await ckBtcContract.icrc1_balance_of({
  owner: identity.getPrincipal(),
  subaccount: [],
});
```

### Request standard token (e.g ICRC-1 | ICRC-7) transfer

```typescript
const CKBTC_CANISTER_ID = "mxzaz-hqaaa-aaaar-qaada-cai";

// FIXME: use correct IC Address
const destination = "rrkah-fqaaa-aaaaa-aaaaq-cai";

const response = await nfidCore.request({
  method: "ic_callCanister",
  args: {
    canisterId: CKBTC_CANISTER_ID,
    method: "icrc1_transfer",
    args: [{
      from_subaccount: identity.getPrincipal(),
      from_subaccount: [],
      to: destination,
      amount: BigInt(1 * E8S); // 1 ICP;
    }],
  },
}); // returns the response from the canister
```

### How to use NFID in local development

```typescript
import {getMockIdentity} from '@nfid/core';

const configuration: NFIDConfiguration = {
  // Configure the chains you want to support
  providers: [
    {
      ...NFIDProvider.IC,  // Internet Computer
      // The identity is now working on your local replica without certificate issues
      // It won't open NFID and the provider will directly respond with that mocked identity
      mockIdentity: getMockIdentity(0), // 1, 2, 3, 4, 5 are also available
    }
  ],
  // Configure the network stage
  environment: 'local' // 'testnet' | 'production' | 'local'
  // Configure your application metadata
  appConfig: {
    // The name of your application
    name: "appName",
    // Your logo displayed within NFID for transaction approval and other interactions
    icon: "url/to/application-icon.png",
  },
};
```

### Configure multi canister applications

By default, NFID creates a delegation only for the canisterId derived from the request origin or the derivationOrigin.
If you want to call multiple canisterId, you need to configure your application to allow this. And provide a list of allowed canisterIds within the request.

```typescript
const identity = await nfidCore.ic.getDelegation({
  targets: ["canister_id_1", "canister_id_2", "canister_id_3"],
});
```

To allow this, you have to provide a list of allowed canister on your FE Canister (e.g. `canister_id_1`) or configured DerivationOrigin as a file `.well-known/multi-canister-application`.

```json
{
  "multiCanisterApplication": ["canister_id_2", "canister_id_3"]
}
```

Each of those canister needs to host a file `.well-known/white-listed-domain` with the white listed delegation scopes.

```json
{
  "whiteListedScopes": ["https://<canister_id_1>.ic0.app"]
}
```

NFID fetches these files and if valid, will add those canisterIds to the target prop to create the delegation.

#### Constraints

Currently, a maximum of 10 additional canisterIds at the same time.
