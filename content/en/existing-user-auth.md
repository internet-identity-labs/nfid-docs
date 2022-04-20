---
title: Existing user authentication
position: 5
category: User Flows
---

## Users with NFID
When a new user comes to your application on a device that has already registered with NFID, users have a much more streamlined experience.

As the application developer, you can configure how many accounts each NFID can create with you. If you allow just one, users will see the screen below when they click on Sign in with NFID on your site.
<img src="single-persona-login.png" style="width:200px;margin:auto;"></img>

If you allow more than one, users will need to unlock their NFID first and select the account with which they want to continue.
<img src="unlock-nfid.png" style="width:200px;margin:auto;"></img>
<img src="account-selection.png" style="width:200px;margin:auto;"></img>

Once an account is selected, you will receive the delegate identity with its principal ID.