---
title: Request accounts
position: 62
category: Wallet SDK
description: Learn how to request accounts with NFID wallet sdk
---

## Installation

```sh
npm i @nfid/wallet
```

## Signature and types

`requestAccounts` is an asynchronous method which opens the NFID window and asks the user to select accounts he wants to share.

```typescript
requestAccounts(options?: NFIDProviderConf): Promise<RequestAccountsResult>
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
import { requestAccounts } from "@nfid/wallet";

const APPLICATION_LOGO_URL = "https://nfid.one/icons/favicon-96x96.png";
const APP_META = `applicationName=RequestAccountsDemo&applicationLogo=${APPLICATION_LOGO_URL}`;
const NFID_ORIGIN = "https://nfid.one";
const REQ_ACCOUNTS = "wallet/request-accounts";

const PROVIDER_URL = new URL(`${NFID_ORIGIN}/${REQ_ACCOUNTS}?${APP_META}`);

const result = await requestAccounts({
  provider: PROVIDER_URL,
});
```

## Return types

```typescript
export declare type RequestAccountsResult =
  | {
      status: "SUCCESS";
      accounts: string[];
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
