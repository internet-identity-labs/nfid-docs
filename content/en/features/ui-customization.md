---
title: UI Customization
position: 27
category: Features
description: "The complete guide to NFID: the identity layer for the internet."
---

When the NFID Wallet is shown for [authentication](authentication), [data collection](data-collection), [sybil resistance](sybil-resistance), [transaction signing](transaction-signing), or [personal signatures](personal-signatures), you have the ability to configure some UI options to reflect your brand. The level of customization depends on the pricing tier you have selected.

## Pricing
### Included with all plans
Add your app name and logo
<img src="../../authenticate.png" style="width:90%;margin:auto;"></img>

### With NFID Wallet+
Inject the iframe anywhere on your site.
<img src="../../nfid-embed-connect-screen.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

And change the brand colors.
<img src="../../authenticate-custom.png" style="width:90%;margin:auto;"></img>

## Usage
### The NFIDWallet object
[NFIDWallet](../getting-started/quickstart#create) instantiates an instance of the NFID Wallet and sets configuration properties that appear in the user's UI for:
- Your application name
- Your application logo
- The chain for which you're requesting connections and signatures
NFID currently supports EVM and ICP chains.

### NFID Wallet+
Contact gm@identitylabs.ooo for pricing.

#### 1\. Install the iframe-auth package

```sh
npm i @nfid/iframe-auth
```

#### 2\. Set iframe properties

Although a container element of type `HTMLElement` and the NFID provider URL of type `string` are the only *required* options, the handlers are strongly recommended since you're unlikely to have a properly functioning application without them.

The full interface looks like this:

```typescript
export interface IIFrameAuthClient {
  iframeElement: HTMLElement;
  provider: string;
  onSuccess?: (identity: Identity) => void;
  onError?: (error?: string) => void;
  iframeStyleQueries?: string;
}
```

The `iframeStyleQueries` are a concatenation of string or hex colors as URL parameters. The full list of customization options are:
```typescript
export interface ScreenStyleParams {
  frameBgColor?: string | null
  frameBorderColor?: string | null
  primaryButtonColor?: string | null
  secondaryButtonColor?: string | null
  buttonBorderColor?: string | null
  mainTextColor?: string | null
  secondaryTextColor?: string | null
  linkColor?: string | null
}

// Encode them all as a URI component:
const colorCustomization = encodeURIComponent('frameBgColor=red&frameBorderColor=#000000&primaryButtonColor=blue&etc');
```

The full configuration for NFID Embed looks like this:
```typescript
const container = document.querySelector(".form-container") as HTMLElement;
const host = "https://nfid.one";

const handleSuccess = (i: Identity) => {
  container.innerHTML = `<h3>Authenticated as: <br/> ${i
    .getPrincipal()
    .toString()}</h3>`;
};

const handleError = (e: string) => {
  container.innerHTML = `<h3>Something went wrong: <br/> ${e}</h3>`;
};

const colorCustomization = encodeURIComponent('frameBgColor=red&frameBorderColor=#000000&primaryButtonColor=blue');
```

Visit our [demo page](https://wzkxy-vyaaa-aaaaj-qab3q-cai.ic0.app/authentication-iframe) to see how the iframe looks with configurable color combinations.

#### 3\. Initialize the IFrameAuthClient

Now just call the `IFrameAuthClient` with your callbacks and configuration:

```typescript
IFrameAuthClient(container, host, handleSuccess, handleError, iframeStyleQueries);
```