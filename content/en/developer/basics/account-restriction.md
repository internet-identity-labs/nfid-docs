---
title: Limit user accounts
position: 22
category: Developer guides
description: "The complete guide to NFID: the identity layer for the internet."
---

By default, NFID allows users to create up to 5 accounts with your application.

If you'd like to change that number, simply reach out to hello@identitylabs.ooo with the following:
</br></br>*Subject:* 
>Request to restrict number of NFID accounts with my application 
*Body:* 
>My application's derivation origin is: {derivationOrigin}</br>The amount of accounts I'd like to limit each NFID to is: {accountLimit}

`derivationOrigin` is the originating domain that the principal ID is derived from.
`accountLimit` is a number between 1 and 5 inclusive. Your users will see two different screens depending on if you limit the number of accounts each NFID can create to 1 or more than 1.

Once we set up the configuration, we'll respond with love that you're all set!

Of course this process will be self-serve in the future, as will be all other features given that NFID will be a tokenized protocol, but we have limited resources and wanted to get this out to you as quickly as possible.

## Users with NFID
When a new user comes to your application on a device that has already registered with NFID, users have a much more streamlined experience.

As the application developer, you can configure how many accounts each NFID can create with you. If you allow just one, users will see the screen below when they click on Sign in with NFID on your site.
<img src="../../single-persona-login.png" style="width:200px;margin:auto;"></img>

If you allow more than one, users will need to unlock their NFID first and select the account with which they want to continue.
<img src="../../unlock-nfid.png" style="width:200px;margin:auto;"></img>
<img src="../../account_selection_screen.png" style="width:200px;margin:auto;"></img>

Once an account is selected, you will receive the delegate identity with its principal ID.
