---
title: NFID Embed
subtitle: 10x your user and transaction volume by eliminating onboarding friction
position: 25
category: Developer guides
description: "The complete guide to NFID: the identity layer for the internet."
---

<img src="../../nfid-embed-connect-screen.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

NFID Embed is NFID Wallet embedded on your page as an iframe. With just a few lines of code, you can eliminate all user onboarding friction to maximize your application's growth and transaction volume.

If you'd like to add NFID Embed in your application, please email gm@identitylabs.ooo

## Client Example

### 1\. Install the iframe-auth package

```sh
npm i @nfid/iframe-auth
```

### 2\. Set iframe properties

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

### 3\. Initialize the IFrameAuthClient

Now just call the `IFrameAuthClient` with your callbacks and configuration:

```typescript
IFrameAuthClient(container, host, handleSuccess, handleError, iframeStyleQueries);
```