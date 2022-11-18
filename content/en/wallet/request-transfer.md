---
title: Request transfer
position: 61
category: Wallet SDK
description: Learn how to request token transfer with NFID wallet sdk
---

## Installation

```sh
npm i @nfid/wallet
```

## Signature and types

`requestTransfer` is an asynchronous method which opens the NFID window and asks the user to approve a token transfer.

```typescript
requestTransfer(params: RequestTransferParams, options?: NFIDProviderConf): Promise<RequestTransferResult>
```

**RequestTransferParams**

```typescript
interface RequestTransferParams {
  to: string; // wallet address to transfer to
  amount: number; // amount of tokens to transfer
}
```

**Optional: NFIDProviderConf**

```typescript
interface NFIDProviderConf {
  windowFeatures?: WindowFeatures;
  provider?: URL;
}
```

## Client example

```typescript
import { requestTransfer, RequestTransferParams } from "@nfid/wallet";

const APPLICATION_LOGO_URL = "https://nfid.one/icons/favicon-96x96.png";
const APP_META = `applicationName=RequestTransfer&applicationLogo=${APPLICATION_LOGO_URL}`;
const NFID_ORIGIN = "https://nfid.one";
const REQ_TRANSFER = "wallet/request-transfer";

const PROVIDER_URL = new URL(`${NFID_ORIGIN}/${REQ_TRANSFER}?${APP_META}`);

const result = await requestTransfer(
  { to, amount },
  {
    provider: PROVIDER_URL,
  }
);
```

## Return types

```typescript
export declare type RequestTransferResult =
  | {
      status: "SUCCESS";
      height: number;
    }
  | {
      status: "REJECTED";
      message: string;
    }
  | {
      status: "ERROR";
      message: string;
    };
```

## Verifying the new balance

To verify the transaction you can use Internet Computer [rosetta-api](https://internetcomputer.org/docs/current/developer-docs/integrations/rosetta/):

```typescript
fetch("https://rosetta-api.internetcomputer.org/account/balance", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    network_identifier: {
      blockchain: "Internet Computer",
      network: "00000000000000020101",
    },
    account_identifier: {
      address: address,
    },
  }),
}).then((response: RosettaBalance) => {
  // verify => response.balances[0].value
});
```

**Return Types:**

```typescript
export interface RosettaBalance {
  block_identifier: {
    index: number;
    hash: string;
  };
  balances: [Balance];
  metadata: {
    sequence_number: number;
  };
}

export interface Balance {
  value: string;
  currency: {
    symbol: string;
    decimals: number;
    metadata: {
      Issuer: string;
    };
  };
  metadata: object;
}
```

Find details about the rosetta [AccountBalanceResponse at the rosetta docs](https://www.rosetta-api.org/docs/models/AccountBalanceResponse.html)
