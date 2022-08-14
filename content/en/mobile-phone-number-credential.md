---
title: Mobile Phone Number Credential
position: 51
category: Credentials SDK
description: "The complete guide to NFID: the identity layer for the internet."
---

As an application developer, you may need to identify unique humans for airdrops, token allocations, governance, etc. NFID now supports a proof that the authenticated identity has or has not yet created an account with your application using the mobile phone number associated with their NFID. 

## How the phone credential provides sybil-resitance

- Each NFID can only have one non-removable mobile phone number
- Each phone number goes through two layers of carrier status verification that checks against VOIP, scam, and risky numbers
- Phone numbers are unique in NFID, guaranteeing no two NFIDs can ever have the same verified number
- If an NFID has already proven their credential to your application from one principal ID, any subsequent attempt will fail (ensuring users can't sybil attack your application with the same phone number)

## Requesting the phone credential

**`requestPhoneNumberCredential (conf?: CredentialProviderConf) : Promise<CredentialResult>`**

Verify that the user has a phone number associated with their account.

**Params**

`CredentialProviderConf`

-   `provider?: URL` url of the credential provider, defaults to `https://nfid.one/credential`
-   `windowFeatures` string or object describing the popup window for the provider

**Returns**

`CredentialResult`

-   `phoneNumber: string`
-   `client: Principal`
-   `domain: string`
-   `createdDate: Date`

The `result` can come back as the following:
If `true`, the phone number has not yet been registered with your app 
If `false`, it has been registered 
If `undefined`, the user declined to share the proof

**Note**

The credential should be validated with our blackhole canister for additional verification.

## Client Example

### Requesting a Credential

```typescript
npm i @nfid/credentials;

import { requestPhoneNumberCredential } from '@nfid/credentials';

const { credential, result } = await requestPhoneNumberCredential({
    windowFeatures: {
        height: 705,
        width: 525,
        top: window.screen.height / 2 - 705 / 2,
        left: window.screen.width / 2 - 525 / 2,
        toolbar: false,
        location: false,
        menubar: false,
    },
});
// See complete list of window features: https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters
```

### Verifying a Credential

It is possible for a bad actor to attempt to manipulate a credential, and this necessitates a trustable method for verifying a credential. This is provided by the `is_phone_number_approved` method on our blackholed "verifier" canister, which is tamper proof and keeps hashed records of all phone number credentials. With this verification step, the complete flow would look like this:

<img src="phone-credential-sequence-diagram.png" style="margin:auto;"></img>

The full interface for this method is </br>
`is_phone_number_approved(principal: string, phone_hash: string) : bool`</br>
and the canister id on mainnet is `gzqxf-kqaaa-aaaak-qakba-cai`.

```
dfx canister --network ic call gzqxf-kqaaa-aaaak-qakba-cai is_phone_number_approved '("principal-as-string", "phone-number-hash")'
```

## Provider Example

The SDK provides a hook for providers to handle credential requests, keeping the implementation details of returning data to the client out of provider implementations.

```typescript
import { registerPhoneNumberCredentialHandler } from '@nfid/credentials';

async function handler(): Promise<CredentialResult> {
    return new Promise(resolve =>
        setTimeout(() => resolve({ result: true, credential: 'abcdefg' }), 3000)
    );
}

registerPhoneNumberCredentialHandler(handler);
```