---
title: SDK Iframe
position: 25
category: Developer guides
description: "The complete guide to NFID: the identity layer for the internet."
---

Some intro text

## Client Example

### 1\. Install the iframe-auth package

```sh
npm i @nfid/iframe-auth
```

### 2\. Prepare container for iframe

**`const container = document.querySelector('.form-container') as HTMLElement;`**

You can get the HTMLElement by any other way, like React.useRef,

### 3\. Call the IFrameAuthClient

Here is the types of IFrameAuthClient method

```typescript
/**
 * Render authentication iframe, based on @dfinity/auth-client
 * @param iframeElement HTMLElement where iframe should be rendered
 * @param provider url string
 * @param onSuccess success callback
 * @param onError error callback
 * @param iframeStyleQueries PREMIUM FEATURE | Custom iframe styling
 * @return void
 */
const IFrameAuthClient;
```

**Integration**
At the end the code should look smth like this:

```typescript
const container = document.querySelector(".form-container") as HTMLElement;
const host = "https://nfid.one";

const handleSuccess = (i: Identity) => {
  container.innerHTML = `<h3>Authenticated as: <br/> ${i
    .getPrincipal()
    .toString()}</h3>`;
};

IFrameAuthClient(container, host, handleSuccess);
```

As the result you should get iframe inside your container and you can handle authentication by passing success callback
