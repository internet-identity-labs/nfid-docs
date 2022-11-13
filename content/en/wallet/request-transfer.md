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
