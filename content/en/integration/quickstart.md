---
title: Quickstart
position: 10
category: Integration
description: The complete guide to NFID
---

Sample implementation to demonstrate how this could look in your app: https://hvn26-aiaaa-aaaak-aaa2a-cai.ic0.app/

## Installation

Add the `@nfid/embed` package:

```bash
# npm
npm install @nfid/embed

# yarn
yarn add @nfid/embed
```

## Setup

Import the `NFID` class:

```ts
import { NFID } from "@nfid/embed";
```

The static `NFID.init()` method returns a promise that resolves as soon as the mounted NFID iframe is ready to use. You can use the `await` keyword to wait for the promise to resolve:

```ts
const nfid = await NFID.init();
```

You're now ready to onboard users and request approvals without interrupting your dapp UX.
