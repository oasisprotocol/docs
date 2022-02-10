# Self-Custody With Ledger

## Install Oasis App

To use your [Ledger](https://www.ledger.com) wallet to hold your ROSE tokens, install the [Oasis app](https://github.com/Zondax/ledger-oasis) on your Ledger wallet via [Ledger Live](https://www.ledger.com/ledger-live/)'s Manager.

{% hint style="info" %}
Currently, you will have enable _Developer mode_ by going to _Settings -> Experimental features_, to be able to find the Oasis app in Ledger Live's Manager.
{% endhint %}

{% hint style="warning" %}
The Oasis app requires an up-to-date firmware on your Ledger wallet:

* At least [version 1.6.1](https://support.ledger.com/hc/en-us/articles/360010446000-Ledger-Nano-S-firmware-release-notes) released on Aug 11, 2020 on a Nano S device.
* At least [version 1.2.4-4](https://support.ledger.com/hc/en-us/articles/360014980580-Ledger-Nano-X-firmware-release-notes) released on Aug 4, 2020 on a Nano X device.

Follow Ledger's instructions for updating the firmware on your Ledger wallet:

* [Nano S](https://support.ledger.com/hc/en-us/articles/360002731113-Update-Ledger-Nano-S-firmware)
* [Nano X](https://support.ledger.com/hc/en-us/articles/360013349800)
{% endhint %}

To find the Oasis app in the Ledger Live app store, go to the App catalog's search bar and type in _Oasis:_

![](<../../.gitbook/assets/image (2).png>)

{% hint style="warning" %}
Make sure you install at least version 1.8.1 of the Oasis app.
{% endhint %}

{% hint style="info" %}
You may see both the _Oasis_ app and the _OasisVal_ app come up in the search results. You need to use the standard _Oasis_ app.
{% endhint %}

Once installed, the Oasis app will use the [BIP 39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) mnemonic seed stored on your Ledger wallet to generate the private & public key pairs for your accounts.

## Manage Your Tokens

### Using Oasis Wallets

This is a simpler option since it allows you to connect to your Ledger wallet via a web browser app or a web browser extension.

Follow the instructions in the [Oasis Wallets](../oasis-wallets/) doc.

### Using Oasis CLI Tools

This is the most powerful option that allows performing any token-related management task.

Follow the instructions in the [Oasis CLI Tools](../advanced/oasis-cli-tools/) doc.
