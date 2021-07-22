# Wallet Tester Program for Node Operators

The Oasis Network’s Wallet Tester Program makes it easy for Node Operators to get early access to the Oasis wallet app built on top of the Ledger hardware wallet platform. More info on the program below.

### Goal of the program

The Oasis Protocol Foundation set up this program in order to give Node Operators the opportunity to try out transferring AMBER tokens and to provide valuable feedback that will help drive forward development for the Oasis Ledger wallet.

### Who is eligible

The Wallet Tester Program is currently available to Node Operators who:

1. Currently run a node on the Amber Network
2. Have a balance of AMBER tokens in their account
3. Have a Ledger hardware wallet

{% hint style="info" %}
We hope to expand this program beyond Node Operators in coming weeks. Check back for more information.
{% endhint %}

### How the program works

The program is pretty simple:

1. Sign up for the Wallet Tester Program by [filling out this form](https://oasisfoundation.typeform.com/to/NW4RuTQR).
2. Join the \#wallet-tester-program channel on our [Oasis Community Slack](http://www.oasisprotocol.org/slack) to troubleshoot and get any of your questions answered.
3. [Follow the instructions here](https://docs.oasis.dev/oasis-core-ledger/) to download the Oasis wallet app via the Ledger Live app store and set up your Ledger hardware.
4. Verify your Oasis general account has a positive token balance. Instructions for [viewing your account info are here](https://docs.oasis.dev/general/operator-docs/stake-management#account-info). As part of the testing process, you will be sending and delegating some of your existing tokens to other accounts on the network.
5. Complete the following steps to test that the Oasis wallet is working as intended:
   * Use the `escrow` transaction to send some AMBER tokens from your own account’s general subaccount to your escrow subaccount. This helps us verify that staking is working correctly. [See here](https://docs.oasis.dev/general/operator-docs/stake-management#escrowing-tokens) for instructions on how to generate an `escrow`transaction.
   * Delegate some AMBER tokens to at least 2 other entities on the network. Delegation is equivalent to using an `escrow` transaction to send tokens from your own general subaccount to someone else’s escrow subaccount. [See here](https://docs.oasis.dev/general/operator-docs/stake-management#escrowing-tokens) for instructions on how to generate an `escrow` transaction.
   * Send some AMBER tokens to at least 2 other accounts on the network. This can be done by using a `transfer` transaction, [as described here](https://docs.oasis.dev/general/operator-docs/stake-management#transferring-tokens).
   * Confirm all of these actions have been completed successfully \(or identify any problems that arise\) via [this feedback form](https://oasisfoundation.typeform.com/to/gzezJNFB).
6. [File issues](https://github.com/oasisprotocol/oasis-core/issues/new/choose) and help improve the Oasis wallet experience.

{% hint style="danger" %}
Throughout the process, please keep a record of each address you send or delegate tokens to, as well as the number of tokens that you transmit. Since the wallet app is still in beta and some errors could arise, please only send a small number of tokens per transaction \(1 or 2 tokens per transaction should be enough for testing purposes\).
{% endhint %}

{% hint style="warning" %}
The Oasis wallet app on the Ledger hardware wallet platform and all associated activities and rewards, including the Wallet Tester Program, are not available to all participants, and eligibility requirements apply. For additional details, [see the Amber Network Terms available here](https://docsend.com/view/zv5cfia). This article does not guarantee anyone the right to participate in the Wallet Tester Program or to receive rewards. The Wallet Tester Program is currently only available to select Node Operators. Details about a Wallet Tester Program available to a broader range of Oasis Network community members will be shared at a later date.
{% endhint %}

