---
description: >-
  Transferring ROSE from Oasis Consensus to Emerald ParaTime using the Oasis
  Wallet Browser Extension.
---

# How to Transfer ROSE into Emerald ParaTime

## About

[Emerald](../developer-resources/emerald-paratime/) is an EVM-compatible blockchain running inside the Oasis ParaTime. Because the balance of your ROSE wallet is stored on the consensus layer - outside of ParaTime's reach - there are special mechanisms for Emerald to access your tokens (formally defined in [ADR 0003](https://github.com/oasisprotocol/oasis-core/blob/master/docs/adr/0003-consensus-runtime-token-transfer.md)).

The _Deposit_ procedure will first create the allowance policy for the provided ParaTime (in our case Emerald) to access a specific amount of your ROSE. Then, the `Deposit` transaction will be executed inside the ParaTime and tokens will be implicitly transferred on the consensus layer from your account to the ParaTime. Finally, if that transaction succeeds, Emerald will mint the same amount of ROSE on its blockchain and fill the provided Ethereum-compatible account address.

The _Withdrawal_ procedure executes the `Withdraw` transaction inside the ParaTime which locks your ROSE and implicitly transfers the same amount of ROSE on the consensus layer from the ParaTime to the provided Oasis address. If the transaction succeeds, Emerald will then burn the locked tokens inside the ParaTime.

Currently, only the Oasis Wallet Browser Extension supports a graphical user interface to perform deposits and withdrawals to and from ParaTimes.

## Managing your Emerald account with Oasis Wallet Browser Extension

Firstly, install the Oasis Wallet Browser extension, restore your existing or create a new Oasis wallet as described in the [Oasis Wallet Browser Extension chapter](oasis-wallets/browser-extension.md#create-a-new-wallet).

![Oasis Wallet Extension - chrome web store](<../.gitbook/assets/Adding Extension>)



Once done, you will see your balance on the **Oasis consensus layer**. Next, we will import your Ethereum wallet to be used in Emerald.

### Importing Ethereum wallet account

In the top-right corner, click your account icon to open the Account management menu.

![Account Management - Importing Accounts](<../.gitbook/assets/Screenshot 2022-01-12 at 18.00.26.png>)

Click "Import" and select "Ethereum-compatible Private Key" to import your existing Ethereum Account address.

{% hint style="info" %}
We assume that you already have your Ethereum keypair. If you don’t have one yet, please go and create one. Store your Private Key, because you will need it in the Oasis Wallet Browser Extension.
{% endhint %}

![Importing Ethereum-compatible Account with Private Key](https://lh6.googleusercontent.com/6LGsO6X02pPFmFrTPHhqpim83dg9cDjXfFMmkjcV5zKYdNNbn\_FLZ4iqJ4izsQ89esPZhOJ8ZgMTaQf9VkhkZ\_ZH6oc8yQOzFz3TGiVjStqnNdg-0YcIOy17TfZ5MvJGemlhx1tM)

Fill in the "Account name" that will appear later in the Account Management screen.

![Imported Account Name](https://lh5.googleusercontent.com/f91N0Jk0kpFw7926QJD9lPKax5RxkSW7ZlisYO4R7d12Artmh2o77lJiIZZnj0825xXA-DUdyK3SYfnUhLR3KI9TYL4Ji6eeTOLt2MTuqUVIZ3LH5pGoE05AnWty4k9HUqOlBcR8)

Next, paste your hex-encoded Ethereum private key.

{% hint style="warning" %}
You will need to import **the** **private key and** **not the mnemonics**. You can derive a private key from the mnemonics with BIP39->BIP44 converter. For example by using the [Ian Cole's tool](https://github.com/iancoleman/bip39/releases) offline.
{% endhint %}

![Entering Ethereum address Private Key (BIP44)](https://lh4.googleusercontent.com/qt5Yh\_a5RYCycInUxrCOQaeK1\_ETGejjTtGzuOSExt2BuRJo3hlPQerUIPEdGpt6RwofBtc-M1wbG3HR\_lCpvPbYTiaMRqn01y63sjxy77adwa9MzkEqlp258tSgLhRfePBaujZ7)



Your newly imported Ethereum account will appear under the "Ethereum-compatible Account" section in the Account Management screen. Check that the Ethereum address shown at the bottom matches the address that was shown to you when you generated the Ethereum key.

{% hint style="danger" %}
In older versions of the Oasis Wallet Browser Extension there was also a bech32-encoded version of the Ethereum address shown in the Ethereum-compatible wallet. This address is only used internally for setting the allowance policy on the Oasis network. **If you encounter this, you should immediately update your Wallet Extension! The bech32-encoded address of the Ethereum-compatible account must never be used for transferring ROSE to. The signature schemes are incompatible (ECDSA versus ed25519) and those tokens would not be accessible anymore!**
{% endhint %}

![Account Management - Accounts Overview](<../.gitbook/assets/Screenshot 2022-01-12 at 18.00.58.png>)

### Depositing ROSE To Emerald ParaTime

Now, you can transfer your ROSE to Emerald ParaTime. Navigate to the "ParaTimes" tab. Notice two ParaTimes: Emerald and Cipher with the corresponding ParaTime IDs. Under Emerald click on the "To ParaTime" button.

![ParaTimes - Transfer ROSE To Emerald](https://lh3.googleusercontent.com/W6XzBahPj7V5gRlS8UT4pKb3gJiga6cvr-MBb-Sqe95eK2V3R1SmQlemNW38a\_B2MaQFYi0MHR\_MrWA9GZdS2KNA6dX1TjFly6U1ACYMEpklNlhGloUh6ghQ3f-bPtnS81Igzo0n)

****

Fill in the the "Amount" of ROSE that you want to transfer to Emerald ParaTime and your **Ethereum-compatible address** in **** the "To" field you imported/created before. Then, click "Next", review and confirm the transaction.

![Sending ROSE to Emerald](https://lh4.googleusercontent.com/OBY\_BDOLg4xDbUU-fMYbwg8ISvrzEb3hOx30H-7gKwCQsJY7AamdQK-6USopJHqvq2y8JYpKgSUQ3khCjalj2pxHmZ\_Z6xZB7F8YNns813VvqDaGa2UbzS7TnffVI5aGfR1LrQxU)

{% hint style="info" %}
At the time of writing, depositing and withdrawing ROSE to and from ParaTimes works for Oasis wallets **imported from the private key or the mnemonic only**. Support for the Ledger hardware wallet is not implemented yet.
{% endhint %}

### Verifying ROSE balance on Emerald ParaTime

If everything went well, your entered amount of ROSE was sent to the Ethereum-compatible address in Emerald. Let's verify that your ROSE safely arrived on your Emerald Ethereum wallet.

#### Wallet Browser Extension

You can check the balance in the Oasis Wallet extension by opening the "Account Management" tab and selecting your Ethereum-compatible account which you used to send ROSE to. Then click on the back arrow and navigate to the "ParaTimes" tab. Under Emerald you will notice the available amount of your ROSE.

![ROSE balance in Emerald](<../.gitbook/assets/Screenshot 2021-12-23 at 18.16.48.png>)

#### Metamask

You can verify your balance in [Metamask](https://metamask.io) (or a built-in wallet in the Brave browser). First, install the extension in your favorite browser and add the Emerald Network (refer to the Web3 gateway parameters [here](https://docs.oasis.dev/general/developer-resources/emerald-paratime#web3-gateway) for either Emerald Mainnet or Testnet). Then, import your Ethereum keypair and your balance should immediately be visible.

{% hint style="info" %}
Brave wallet network configuration requires you to enter Chain's currency decimals for ROSE: 18)
{% endhint %}

![Metamask - Adding Emerald Mainnet Network Configuration](https://lh4.googleusercontent.com/whia70hFB8EYjLx9M8S5l2A38HemYCFDqaeczkjJVOkYwhutMcyfqGAiobsgX\_NgfAbkbUdSU3czDrqHooEdq5Lt4uKYmiqfBECF4zkFzXXiz1ML7172hpnyscRW0CA-FTnAWR5n)

![Brave Wallet - Received ROSE](<../.gitbook/assets/Screenshot 2021-12-23 at 15.46.09.png>)

### Withdrawing ROSE from Emerald ParaTime

You can withdraw your ROSE from Emerald back to your Oasis wallet by first selecting your Ethereum-compatible account in the Account Management screen. Next, switch to ParaTimes tab and click on the "To Consensus" button near the Emerald entry. Fill in the "Amount" and your bech32-encoded Oasis wallet address and confirm the withdrawal. In a few moments you will have your ROSE accessible on the consensus layer.

{% hint style="danger" %}
If you want to transfer ROSE to an exchange and you currently have them deposited on Emerald ParaTime, **we strongly recommend that you withdraw ROSE to your Oasis wallet first and then perform a regular token transfer to your Oasis address on the exchange!** The ParaTime's withdrawal procedure involves a number of steps as described in the introduction and some exchanges may not recognize this transaction as a valid transaction for funding your account on the exchange.
{% endhint %}

{% hint style="info" %}
Advanced users (e.g. those running Emerald ParaTime [compute nodes](../run-a-node/set-up-your-node/run-a-paratime-node.md)) may need to withdraw ROSE stored in their `oasis1` Emerald account. Oasis Wallet Browser Extension does not support such withdrawals. Read the [Oasis CLI Deposit/Withdraw Tokens to/from ParaTime chapter](advanced/oasis-cli-tools/deposit-withdraw-tokens-to-from-paratime.md) to learn how to use Oasis CLI instead.
{% endhint %}

### Verifying Emerald ParaTime deposits and withdrawals

To verify and validate your transactions (deposits, withdrawals) on Emerald you can use our official [Oasis Scan](https://www.oasisscan.com) block explorer. Enter your oasis1 address and press Search. Then navigate to Transactions section and press "ParaTime" button next to Consensus. You will be able to see all transactions made from Ethereum compatible address (`0x`) you used in Emerald to your Consensus (`oasis1`) address where you sent your ROSE to.

![Search result of oasis1 address - Account details](<../.gitbook/assets/Screenshot 2022-01-13 at 16.07.03.png>)

Furthermore, you can click on Tx Hash of any transaction you see on the list. You will find your **from** Ethereum-compatible address, your **to** destination Consensus address, and **amount** of ROSE transferred.

![Tx Hash - Transaction details](<../.gitbook/assets/Screenshot 2022-01-13 at 16.12.21.png>)

{% hint style="info" %}
Be aware that the [Oasis Scan Blockchain Explorer](https://www.oasisscan.com) is built for Consensus layer. If you want to explore Emerald ParaTime (0x addresses, Token Transfers, Contract Calls, etc.), you have to use [Emerald Blockchain Explorer](https://explorer.emerald.oasis.dev).
{% endhint %}

{% content-ref url="../developer-resources/emerald-paratime/writing-dapps-on-emerald.md" %}
[writing-dapps-on-emerald.md](../developer-resources/emerald-paratime/writing-dapps-on-emerald.md)
{% endcontent-ref %}
