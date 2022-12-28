---
title: Sybil resistance
position: 23
category: Developer guides
description: "The complete guide to NFID: the identity layer for the internet."
---

As an application developer, you may need to identify unique humans for airdrops, token allocations, governance, etc. NFID supports a proof that the authenticated identity has or has not yet created an account with your application using the mobile phone number associated with their NFID.

## How the phone credential provides sybil-resitance

- Each NFID can only have one non-removable mobile phone number
- Each phone number goes through two layers of carrier status verification that checks against VOIP, scam, and risky numbers
- Phone numbers are unique in NFID, guaranteeing no two NFIDs can ever have the same verified number
- If an NFID has already proven their credential to your application from one identifier, any subsequent attempts to verify the same phone number from other identifiers will result in the `"REJECTED"` status

## Client Example

### 1\. Install the credentials package

```sh
npm i @nfid/credentials
```

### 2\. Request the credential of an [authenticated NFID delegationIdentity](../basics/basic-integration)

**`requestPhoneNumberCredential(identity: DelegationIdentity)`**

This step verifies that the user has a verified phone number associated with their NFID and that it hasn't already been requested to use on a different identifier with your application.

**Params**

- `identity: DelegationIdentity` is a delegation identity retrieved from NFID via [the auth client](../basics/basic-integration).

```typescript
import { requestPhoneNumberCredential } from "@nfid/credentials";

const result = await requestPhoneNumberCredential(identity);
```

**Returns**

- `result`
  - `status: "SUCCESS" | "REJECTED" | "ERROR"` indicates the result of the credential request. `SUCCESS` indicates the credential exists and that it hasn't already been requested from a different identifier with your application. `REJECTED` indicates that the user has declined the request for a credential. `ERROR` indicates that something went wrong.
  - `message?: string` In the case of a rejection or an error, additional details will be provided here.

> **_NOTE:_** The credential can be validated with our blackhole canister for additional verification.

### 3\. (Optional) Validate the credential with our blackhole canister for additional verification

Since it is possible for a bad actor to attempt to manipulate a credential, we've provided an additional trustable method for verifying the user's credential. This is provided by the `is_phone_number_approved` method on our blackholed "verifier" canister, which is tamper proof and keeps hashed records of all phone number credentials. With this verification step, the complete flow would look like this:

<img src="../../phone-credential-sequence-diagram.png"></img>

The full interface for this method is </br>
`is_phone_number_approved(principal: string) : bool`</br>
and the canister id on mainnet is `gzqxf-kqaaa-aaaak-qakba-cai`.

```sh
dfx canister --network ic call gzqxf-kqaaa-aaaak-qakba-cai is_phone_number_approved '("principal-as-string")'
```

Or a simple implementation from our SDK:

```typescript
import { verifyPhoneNumberCredential } from "@nfid/credentials";

const verificationResult = verifyPhoneNumberCredential(
  identity.getPrincipal().toText()
);
```

**Returns**

- `verificationResult`
  - `boolean: "TRUE" | "FALSE"` indicates the result of the verification request. `TRUE` indicates the credential was not tampered with. `FALSE` indicates that the credential may have been tampered with or that the credential expired and you should try again.
