---
title: Authentication
position: 40
category: Delegation keys
description: "The complete guide to NFID: the identity layer for the internet."
---

NFID can return delegation identities to your application for signing transaction messages without wallet prompts. Each delegation identity is scoped to a `user account <> domain` pair, meaning the user's identifier will be different if they're signing in to `example.com` and `example-2.com`, or on `example.com` with account `1` or `2`, but NFID can still provide interactivity between them all. If you own multiple domains and want to ensure the same identifiers are generated across them, follow these instructions for [generating the same identifier across multiple domains](#generating-the-same-user-identifier-across-multiple-domains).

## Usage
This guide assumes familiarity with building on the IC. More information can be found [here](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove). Your environment will need:
- dfx SDK
- node
- @dfinity/agent, @dfinity/identity, and @dfinity/auth-client node packages >v0.11.0

### The authentication client
For a basic typescript integration inclusive of how to make authenticated calls locally in your development environment, follow along with our fork of Kyle Peacock's repository [here for typescript](https://github.com/internet-identity-labs/nfid-auth-client-demo/tree/feature/nfid-auth-client-demo).

### Replacing existing identity provider
If you already have Internet Identity authentication set up, simply change the existing `identityProvider` URL in your `authClient.login({})` and customize with your application's name and logo:
```js
  // Your application's name (URI encoded)
  const APPLICATION_NAME = "Your%20Application%20Name";

  // URL to 37x37px logo of your application (URI encoded)
  const APPLICATION_LOGO_URL = "https://nfid.one/icons/favicon-96x96.png";

  const AUTH_PATH = "/authenticate/?applicationName="+APPLICATION_NAME+"&applicationLogo="+APPLICATION_LOGO_URL+"#authorize";

  // Replace https://identity.ic0.app with NFID_AUTH_URL
  // as the identityProvider for authClient.login({}) 
  const NFID_AUTH_URL = "https://nfid.one" + AUTH_PATH;
``` 

### Generating the same user identifier across multiple domains
NFID is an anonymizing identity protocol that generates new identifiers for each `user account <> domain` pair. If developers want to ensure the same identifiers are generated across different domains, follow these instructions.

<ol>
  <li>
    
Ensure you have `agent-js`, `auth-client`, `authentication`, `candid`, `identity`, and `principal` >= v0.12.1
    
  </li>
    
  <li>
    
Ensure your canister implements the `https_request` query call like [this](https://github.com/dfinity/interface-spec/blob/master/spec/index.adoc#the-http-gateway-protocol)
    
  </li>
  <li>
    
Set the CORS response header [Access-Control-Allow-Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) to allow the NFID origin `https://nfid.one`
    
  </li>
  <li>
    
Add the `alternativeOrigins` json to `https://<YOUR-CANISTER-ID>.ic0.app/.well-known/ii-alternative-origins`
```js
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "II Alternative Origins Principal Derivation Origins",
  "description": "An object containing the alternative frontend origins of the given canister, which are allowed to use a canonical canister URL (https://<canister_id>.ic0.app or https://<canister_id>.raw.ic0.app) for principal derivation.",
  "type": "object",
  "properties": {
    "alternativeOrigins": {
      "description": "List of allowed alternative frontend origins",
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 0,
      "uniqueItems": true
    }
  },
  "required": [ "alternativeOrigins" ]
}
```
Example
```js
{
  "alternativeOrigins": [
    "https://alternative-1.com",
    "https://www.nice-frontend-name.org"
  ]
}
```
    
  </li>
  <li>
    
Add the `derivationOrigin` key and your frontend's canister URL as the value to the NFID configuration parameters:
```js
  loginButton.onclick = async () => {
    await authClient.login({
      onSuccess: async () => {
        handleAuthenticated(authClient);
      },
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://nfid.one" + AUTH_PATH
          : process.env.LOCAL_NFID_CANISTER + AUTH_PATH,
      // Maximum authorization expiration is 30 days
      maxTimeToLive: days * hours * nanosecondsPerHour,
      windowOpenerFeatures: 
        `left=${window.screen.width / 2 - 525 / 2}, `+
        `top=${window.screen.height / 2 - 705 / 2},` +
        `toolbar=0,location=0,menubar=0,width=525,height=705`,
      derivationOrigin: "https://<YOUR-CANISTER-ID>.ic0.app"
    });
  };
```
    
  </li>
</ol>

> **_NOTE:_** To prevent misuse of this feature, the number of alternative origins _must not_ be greater than 10.

View the [Internet Identity specification](https://github.com/dfinity/internet-identity/blob/main/docs/internet-identity-spec.adoc#alternative-frontend-origins) for more information.

#### Doesn't this violate user privacy?
When an alternative origin assigns a canister as its derivation origin, that alternative origin effectively delegates administrative control of the application to the derivation origin. This feature is also impossible without consent from the derivation origin (via the `.well-known` json) and from the alternative origin (via the `derivationOrigin` parameter). If one of either the alternative or derivation origins drop their side of the consent, NFID will immediately begin generating new identifiers for an application's users. All of this together makes it exceptionally unlikely that any developer would willingly accept such an existential risk of the future success of their application to a third party.

Here's a [forum post](https://forum.dfinity.org/t/user-privacy-concerns-with-the-new-canister-chosen-alternative-origins-feature/14353/10?u=dostro) where someone brought this up as a concern and Dfinity's Frederik Rothenberger responded, along with a significant amount of context:
> Developers (as others have already pointed out) should hopefully realize that giving up control that way is a **terrible** idea.

#### Should I use another application's Derivation Origin?
No. Adding another application as your derivation origin places an existential risk of the future success of your application on theirs. **Just don't do it**.

## Configuration
### Open auth in new window instead of new tab
We've added an option to open authentication windows in a new window instead of the default new tab opener. Just pass the variable `windowOpenerFeatures` with html options (like these default options we recommend passing) in your `authClient.login({})`:

```js
windowOpenerFeatures: 
  `left=${window.screen.width / 2 - 525 / 2}, `+ 
  `top=${window.screen.height / 2 - 705 / 2},` + 
  `toolbar=0,location=0,menubar=0,width=525,height=705`
```

<img src="../../account_selection_screen.png" style="width:200px;margin:auto;"></img>

### Limiting the number of delegation identities each NFID can create
By default, NFID allows users to create up to 5 unique delegation identities with your application.

If you'd like to change that number, reach out to gm@identitylabs.ooo with the following:
</br></br>*Subject:* 
>Request to restrict number of NFID accounts with my application 
*Body:* 
>My application's derivation origin is: {derivationOrigin}</br>The amount of accounts I'd like to limit each NFID to is: {accountLimit}

`derivationOrigin` is the originating domain that the principal ID is derived from.
`accountLimit` is a number between 1 and 5 inclusive. Your users will see two different screens depending on if you limit the number of accounts each NFID can create to 1 or more than 1.

### NFID Wallet+
Learn how to inject this experience on your site and brand it with your own logo and colors in the [customization section](ui-customization).