---
title: Build your first React App
category: React
menu: true
menuTitle: Setup
position: 1
---
This project is to get you started with **React**. 

## Before you start

For the example to work fully, you need to run Internet Identity locally. [Check out the Internet Identity instructions on how to do this](https://smartcontracts.org/docs/quickstart/local-quickstart.html).

Copy `.env.local.template` to `.env.local`. If you have Internet Identity deployed locally and want to use it for authenticated calls, you need to provide the `II_CANISTER_ID` and set `DFX_NETWORK=local`.

Get the II canister id by:

<code-group>
  <code-block label="Shell" active>

  ```bash
  dfx canister id internet_identity
  ```

  </code-block>
</code-group>

```
> Creating a wallet canister on the local network.
> The wallet canister on the "local" network for user "<your_identity>" is "renrk-eyaaa-aaaaa-aaada-cai" 
> rkp4c-7iaaa-aaaaa-aaaca-cai
```

Take the last line and put it into `.env.local`.

`.env.local` should then look something like this:

```javascript[.env.local]
DFX_NETWORK=local
II_CANISTER_ID=qhbym-qaaaa-aaaaa-aaafq-cai
```

Now you can run `yarn ic:deploy` which deploys the example backend canister. When this is successful,
proceed with running `yarn dev`.

Your browser should automatically open [http://localhost:3000](http://localhost:3000).

## Available Commands

In the **examples** directory, you can run the following commands:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best
performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `yarn start`

Requires `yarn build` first and runs the production build.

### `yarn ic:deploy`

Deploys the example backend canisters to your local network
