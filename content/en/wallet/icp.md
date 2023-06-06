---
title: ICP
position: 11
category: NFID Wallet SDK
description: "The complete guide to NFID: the identity layer for the internet."
---

NFID returns a delegation identity to your application, which is able to call your application specific canisters without wallet prompts. If you want to call any other canisters, it will require the user's approval in a wallet prompt.

NFID gives you access to the Internet Computer. You're interacting with the Internet Computer by using our `IC Blockchain Provider`.

## What you'll learn in this guide

1. [Get the delegation identity and use to do queries to the IC](/wallet/icp#get-the-delegation-identity-and-use-to-do-queries-to-the-ic)
2. [Get account balance of native token (ICP)](/wallet/icp#get-account-balance-of-native-token-icp)
3. [Request native token transfer (ICP)](/wallet/icp#request-icp-transfer)
4. [Get token balance of ICRC-1 tokens](/wallet/icp#get-token-balance-of-icrc-1-tokens)
5. Request standard token (e.g ICRC-1 | ICRC-7) transfer

6. Low level smart contract (canister) methods calls
7. Configure using a derivation origin
8. Configure multi canister applications
9. How to use NFID in local development

### Get the delegation identity and use to do queries to the IC

```typescript
const identity = await nfidWallet.ic.getDelegation();
```

### Get account balance of native token (ICP)

```typescript
import { principalToAddress } from "ictool";

const principal = identity.getPrincipal();
const balance = await nfidWallet.ic.getBalance(principalToAddress(principal));
```

### Request native token transfer (ICP)

```typescript
import { E8S } from "@nfid/wallet";

// FIXME: use correct IC Address
const destination = "rrkah-fqaaa-aaaaa-aaaaq-cai";
const amount = BigInt(1 * E8S); // 1 ICP

nfidWallet.ic.sendTransaction({
  from: address,
  to: destination,
  value: amount,
});
```

### Get token balance of ICRC-1 tokens

```typescript
const CHBTC_CANISTER_ID = "mxzaz-hqaaa-aaaar-qaada-cai";

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

const chBtcContract = actor(CHBTC_CANISTER_ID, idlFactory);

const balance = await chBtcContract.icrc1_balance_of({
  owner: identity.getPrincipal(),
  subaccount: [],
});
```

### How to use NFID in local development

```typescript
import {getMockIdentity} from '@nfid/wallet';

const configuration: NFIDConfiguration = {
  // Configure the chains you want to support
  providers: [
    {
      ...NFIDProvider.IC,  // Internet Computer
      // The identity is now working on your local replica without certificate issues
      // It won't open NFID wallet and the provider will directly respond with that mocked identity
      mockIdentity: getMockIdentity(0), // 1, 2, 3, 4, 5 are also available
    }
  ],
  // Configure the network stage
  environment: 'local' // 'testnet' | 'production' | 'local'
  // Configure your application metadata
  appConfig: {
    // The name of your application
    name: "appName",
    // Your logo displayed within NFID Wallet for transaction approval and other interactions
    icon: "url/to/application-icon.png",
  },
};
```

### Configure multi canister applications

To connect multiple canister to your app, you need provide a list of allowed canister on your FE Canister or configured DerivationOrigin as a file `.well-known/multi-canister-application`. Each of those canister needs to have a file `.well-known/white-listed-domain` which links back to the FE Canister who can request a delegation for this canister.

NFID will internally query these files and if valid, will add those canisterIds to the target prop to create the delegation.

## Switch Accounts

```javascript
await nfidWallet.disconnect();
await nfidWallet.connect();
```
