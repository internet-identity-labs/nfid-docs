---
title: Multiple domains
position: 21
category: Get Started
description: "The complete guide to NFID: the identity layer for the internet."
---

## Generating the same user identifier across multiple domains
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

**Note:** To prevent misuse of this feature, the number of alternative origins _must not_ be greater than 10.

**Note:** To prevent misuse of this feature, the number of alternative origins _must not_ be greater than 10.

View the [Internet Identity specification](https://github.com/dfinity/internet-identity/blob/main/docs/internet-identity-spec.adoc#alternative-frontend-origins) for more information.

## Doesn't this violate user privacy?
When an alternative origin assigns a canister as its derivation origin, that alternative origin effectively delegates administrative control of the application to the derivation origin. This feature is also impossible without consent from the derivation origin (via the `.well-known` json) and from the alternative origin (via the `derivationOrigin` parameter). If one of either the alternative or derivation origins drop their side of the consent, NFID will immediately begin generating new identifiers for an application's users. All of this together makes it exceptionally unlikely that any developer would willingly accept such an existential risk of the future success of their application to a third party.

Here's a [forum post](https://forum.dfinity.org/t/user-privacy-concerns-with-the-new-canister-chosen-alternative-origins-feature/14353/10?u=dostro) where someone brought this up as a concern and Dfinity's Frederik Rothenberger responded, along with a significant amount of context:
> Developers (as others have already pointed out) should hopefully realize that giving up control that way is a **terrible** idea.

## Should I use another application's Derivation Origin?
No. Adding another application as your derivation origin places an existential risk of the future success of your application on theirs. **Just don't do it**.
