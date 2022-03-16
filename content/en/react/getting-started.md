---
title: Getting started with NFID
description: React components to use DFINITY Internet Identity Authentication
category: React
menuTitle: Getting Started
position: 2
---
<alert type="info">
  Make sure you have gone through the <span class="font-bold">Setup</span> section first before you continue.
</alert> 

## Usage and limitations
We provide two samples on how to integrate II into your app. The first one and most commonly used is, open II within a new browser tab. The second one is open II within an iFrame. This is our preferred integration. But there are some limitations to it:

1. Safari currently prevents the iFrame to load properly because of an issue with the boundary nodes (out of our control).
2. First time authentication doesn't work as the iFrame fails to trigger the secure device selection (No further information so far).

**We ship an example with this repo [check the example/README.md](./example/README.md) to run this locally**

## Install within your own project
<code-group>
  <code-block label="Shell" active>

  ```bash
  npm install --save @identity-labs/react-ic-ii-auth
  ```

  </code-block>
</code-group>


### Setup React IC II Auth to open auth flow within new tab

```tsx
import React from 'react'

import {
  InternetIdentityProvider,
  useInternetIdentity
} from '@identity-labs/react-ic-ii-auth'

const AuthButthon = () => {
  const { authenticate, signout, isAuthenticated, identity } = useInternetIdentity()
  console.log('>> initialize your actors with', { identity })
  return (
    <button onClick={isAuthenticated ? authenticate : signout}>
      {isAuthenticated ? 'Logout' : 'Login'}
    </button>
  )
}

const App = () => {
  return (
    <InternetIdentityProvider
      authClientOptions={{
        onSuccess: (identity) => console.log(
          ">> initialize your actors with", {identity}
        )
        // NOTE: Overwrite identityProvider in dev mode
        // defaults to "https://identity.ic0.app/#authorize"
        identityProvider: `http://${process.env.II_CANISTER_ID}.localhost:8000/#authorize`
      }}
    >
      <AuthButthon />
    </InternetIdentityProvider>
  )
}

export default App
```

### Open II within iFrame

```tsx
import React from 'react'

import {
  InternetIdentityProvider,
  useInternetIdentity,
  AuthIframe
} from '@identity-labs/react-ic-ii-auth'

const AuthButthon = () => {
  const [showModal, setShowModal] = React.useState(false)
  const { authenticate, isAuthenticated, identity, identityProvider } = useInternetIdentity()

  // THE IFRAME CURRENTLY IS NOT SUPPORTED ON SAFARI
  const isSafari = navigator.userAgent.match(/(Safari)/)

  console.log('>> initialize your actors with', { identity })

  const handleAuthButtonClick = React.useCallback(() => {
    setShowModal(true)
  }, [])

  const handleAuth = React.useCallback(async () => {
    try {
      await authenticate()
    } catch (e) {
      console.error(e)
      setShowModal(false)
    }
  }, [authenticate])

  return (
    <>
    <button onClick={isSafari ? handleAuth : authenticate}>
      {isAuthenticated ? 'Logout' : 'Login'}
    </button>
    {/* THE IFRAME CURRENTLY IS NOT SUPPORTED ON SAFARI */}
    {!isSafari && showModal && (
      <div className="yourModalClass">
        <AuthIframe src={identityProvider} onLoad={handleAuth} />
      </div>
    )}
    </>
  )
}

const App = () => {
  return (
    <InternetIdentityProvider
      authClientOptions={{
        onSuccess: (identity) => console.log(
          ">> initialize your actors with", {identity}
        )
        // NOTE: Overwrite identityProvider in dev mode
        // defaults to "https://identity.ic0.app/#authorize"
        identityProvider: `http://${process.env.II_CANISTER_ID}.localhost:8000/#authorize`
      }}
    >
      <AuthButthon />
    </InternetIdentityProvider>
  )
}

export default App
```

### Run Internet Identity locally to use authenticated calls

In order to do authenticated calls against your local IC replica you need to run II locally.

[Read more how to setup II locally](./docs/setup-internet-identity.md)

## Inspiration
- https://github.com/dfinity/cancan/blob/031f31c0f45af72e42416043e1a2415642844d4e/src/utils/auth.tsx
- https://github.com/krpeacock/ic-avatar/blob/main/src/avatar_assets/src/hooks.ts
