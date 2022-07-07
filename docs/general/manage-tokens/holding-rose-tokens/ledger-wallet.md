# Self-Custody With Ledger Hardware Wallet

This is a general documentation that will help users setup [Ledger] hadware
wallets with Oasis Network. Ledger Live software doesn't support Oasis (ROSE)
tokens natively yet. In this guide we will install Oasis app via Ledger Live to
open and access wallet with one or multiple accounts via our official
[Oasis Wallet - Web].


## Setup your Ledger device and Install Oasis App

1. To use your [Ledger] wallet to hold your ROSE tokens, you will have to
install [Oasis app] on your Ledger wallet via [Ledger Live]'s Manager. You need
to connect your Ledger to your device and unlock it with your PIN code first.

![Unlock ledger](<../../images/wallet/ledger/1_unlock_ledger.png>)

2. Currently, you will have to enable _Developer mode_ by going to _Settings →
Experimental features_ → enable _Developer mode_ toggle, to be able to find
the Oasis app in Ledger Live's Manager.

![Ledger Live -> Experimental features -> Developer Mode](<../../images/wallet/ledger/2_ledger_live_experimental_developer_mode.png>)

:::caution

The Oasis app requires an up-to-date firmware on your Ledger wallet:

* At least [version 2.1.0] released on Nov 30, 2021 on a Nano S device.
* At least [version 2.0.0] released on Oct 21, 2021 on a Nano X device.

Follow Ledger's instructions for updating the firmware on your Ledger wallet:

* [Nano S]
* [Nano X]

:::

3. To find the Oasis app in the Ledger Live App catalog, you need to Allow
Ledger Manager on your Ledger device first, then you will be able to click App
catalog and search for _Oasis_:

![Allow Ledger Manager](<../../images/wallet/ledger/3_allow_ledger_manager.png>)
![Search app in catalog..](<../../images/wallet/ledger/4_search_apps.png>)


4. Install _Oasis_ app

![Install Oasis app](<../../images/wallet/ledger/6_search_results_oasis_install.png>)

:::info

You may see both the _Oasis_ app and the _OasisVal_ app come up in the search
results. You need to use the standard _Oasis_ app.

:::

5. After the installation is completed, take your Ledger device, navigate to _Oasis_
app and use both buttons to open the app. A message _"Pending Ledger review"_
will appear which you confirm by holding both buttons. Your Ledger device is ready
when you will see _"Oasis Ready"_ message.
![Oasis Ready](<../../images/wallet/ledger/6b_ledger_oasis_ready.jpg>)

:::caution

Make sure you install at least version 2.3.2 of the Oasis app.

:::

The Oasis app will use the [BIP 39] mnemonic seed stored on your Ledger wallet
to generate the private & public key pairs for your accounts.

## Manage Your Tokens

### Using Oasis Wallets

This is a simpler option since it allows you to connect to your Ledger wallet
via a web application or a browser extension.

In the example below we will use Oasis Wallet - Web. To learn more about other
features of the Oasis Wallets, please read the [Oasis Wallets] doc.

1. Navigate to [wallet.oasisprotocol.org] and click on the _Open wallet_ button.
Then, click on _Ledger_ when asked how to open your wallet.

![Oasis Wallet - Web -> Open wallet -> Ledger](<../../images/wallet/ledger/7_oasis_wallet_web_open_ledger.png>)

2. In the next step, click on the _Select accounts to open_ button. Your
browser will open a pop-up window where you will have to select your Ledger
device. Finally, click on _Connect_.

![Oasis Wallet - Web -> Select Ledger device and Connect](<../../images/wallet/ledger/8b_oasis_wallet_web_select_ledger_device_connect.png>)

:::caution

This step requires that your Ledger shows the _Oasis Ready_ message. After a
while your device may lock for safety reasons and you will need to unlock it to
perform this and subsequent steps.

:::

3. After connecting your Ledger to Oasis Wallet - Web another pop-up will appear
where you can choose to open one or more `oasis1` accounts derived from the seed
stored on your Ledger.

![Oasis Wallet - Web -> Select one or more accounts](<../../images/wallet/ledger/9_oasis_wallet_web_select_accounts_to_open.png>)

4. The account from your Ledger device is now opened. If you import multiple
accounts, you can switch between them by clicking on the account address in
the top-right corner.
Our demo account is empty.

![Oasis Wallet - Web -> Selected accounts are opened](<../../images/wallet/ledger/10_oasis_wallet_web_opene_ledger_account.png>)

5. Now you can use your Ledger to receive, send or delegate ROSE.
In this example, we have received 111 ROSE to our Ledger account.

![Oasis Wallet - Web -> Exploring transactions](<../../images/wallet/ledger/11_oasis_wallet_web_received_rose_on_ledger_account.png>)

### Using Oasis CLI Tools

This is the most powerful option that allows performing not just token-related
tasks (sending, staking, ParaTime deposits and withdrawals), but also generating
and/or signing raw transactions, multi-signatures, network governance operations
and so on.

Follow the instructions in the [Oasis CLI Tools] doc.

[Ledger]: https://www.ledger.com
[Oasis Wallet - Web]: https://www.ledger.com
[Oasis app]: https://github.com/Zondax/ledger-oasis
[Ledger Live]: https://www.ledger.com/ledger-live/
[wallet.oasisprotocol.org]: https://wallet.oasisprotocol.org
[version 2.1.0]: https://support.ledger.com/hc/en-us/articles/360010446000-Ledger-Nano-S-firmware-release-notes
[version 2.0.0]: https://support.ledger.com/hc/en-us/articles/360014980580-Ledger-Nano-X-firmware-release-notes
[Nano S]: https://support.ledger.com/hc/en-us/articles/360002731113-Update-Ledger-Nano-S-firmware
[Nano X]: https://support.ledger.com/hc/en-us/articles/360013349800
[BIP 39]: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
[Oasis Wallets]: ../oasis-wallets/README.mdx
[Oasis CLI Tools]: ../advanced/oasis-cli-tools/README.md
