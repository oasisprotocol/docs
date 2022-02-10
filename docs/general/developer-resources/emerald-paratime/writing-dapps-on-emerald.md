---
description: How to write and deploy a dApp to Oasis Emerald
---

# Writing dApps on Emerald

This tutorial will show you how to set up a dApp development environment using Hardhat and Truffle deployment tools or the Remix IDE. Oasis Emerald exposes an EVM-compatible interface, so writing dApps isn't much different compared to the original Ethereum network. However, there are still some important differences which this guide will walk you through.

## Testnet and Mainnet

The Oasis network currently has, similar to some other blockchains, two major public deployments: the [Mainnet](../../oasis-network/network-parameters) and the [Testnet](../../foundation/testnet/). The native tokens for the networks are called ROSE and TEST respectively. Each deployment has its own state, a different set of validators and ParaTimes. The state of the Mainnet is considered immutable for indefinite time, while the data on the Testnet can be subject to wipe in the future.

Emerald is deployed similarly: the [Emerald Mainnet](./#mainnet) is deployed on the Oasis Mainnet network, and the [Emerald Testnet](./#testnet) on the Oasis Testnet network. The Emerald state on the Mainnet is stable. Testnet, apart from running the unstable version of the code and being prone to bugs, can have the state deliberately wiped either on the Emerald ParaTime layer or on the Oasis Testnet network level, so you should **never deploy a production service on the Testnet**!

## Oasis consensus network vs Emerald

Emerald is running inside the Oasis ParaTime. While the Emerald's blockchain is separated from the Oasis network consensus layer, they share two important keypoints. Both have synchronized blocks with a common block time (around 6 seconds) which means that Emerald transactions will require at least this amount of time to be confirmed. Secondly, they share the same native token - ROSE on Mainnet and TEST on Testnet. This means that the gas fees will be paid in ROSE/TEST.

On the other hand, the Oasis addresses are bech32-encoded (e.g. `oasis1qpupfu7e2n6pkezeaw0yhj8mcem8anj64ytrayne`) while Emerald uses the Ethereum-compatible hex-encoded addresses (e.g. `0x90adE3B7065fa715c7a150313877dF1d33e777D5`). This is not just a stylistic change - the underlying algorithm for signing the transactions is [ed25519](https://en.wikipedia.org/wiki/EdDSA#Ed25519) on Oasis and [ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) on Emerald (the same as on the Ethereum network). For this reason we cannot use Oasis accounts directly in Emerald, but we need to use a special mechanism described in the [How to transfer ROSE into Emerald ParaTime](../../manage-tokens/how-to-transfer-rose-into-emerald-paratime) chapter. To deploy your smart contract on the Emerald Mainnet, you will have to perform this step.

:::tip

For testing purposes, do not hesitate to ask us for TEST which you can then use on the Emerald Testnet to pay for gas fees. Contact us at [#testnet Oasis Community Slack channel](https://oasiscommunity.slack.com/messages/testnet), send us your Ethereum-compatible address and we will send you TEST directly into your Emerald Testnet wallet.

:::

:::info

Are Ethereum and Oasis wallets that different? I can use the same mnemonics with both, right?

Yes, both Oasis and Ethereum wallets make use of the mnemonics as defined in [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) and they even use the same wordlist to derive the keypairs for your wallet. However, they use a different signature scheme and a derivation path, so the addresses and the private keys are incompatible.

Here's a task for you:

1. Visit [https://iancoleman.io/bip39/](https://iancoleman.io/bip39/) to generate a BIP39 mnemonic.
2. Select ETH token and copy the hex-encoded private key of the first derived account, for example `0xab2c4f3bc70d40f12f6030750fe452448b5464114cbfc46704edeef2cd06da74.`
3. Import the Ethereum-compatible account with the private key obtained above to your Oasis Wallet Browser Extension.
4. Notice the Ethereum address of the account, for example `0x58c72Eb040Dd0DF10882aA87a39851c21Ae5F331.`
5. Now in the Account management screen, select this account and click on the "Export private key" button. Confirm the risk warning.
6. You will notice the private key of the Ethereum-compatible account, the hex-encoded address and the very same address encoded in the Oasis bech32 format, in our case`oasis1qpaj6hznytpvyvalmsdg8vw5fzlpftpw7g7ku0h0.`
7. Now let's use the private key from step 2 to import the Oasis wallet with. First, convert the hex-encoded key to base64 format, for example by using [this service](https://base64.guru/converter/encode/hex). In our example, that would be `qyxPO8cNQPEvYDB1D+RSRItUZBFMv8RnBO3u8s0G2nQ=.`
8. Next, import this base64-encoded private key to the Oasis Wallet Browser Extension.
9. You should see your newly imported account and the Oasis address. In our case `oasis1qzaf9zd8rlmchywmkkqmy00wrczstugfxu9q09ng.`
10. Observe that this account address is different than the bech32-encoded version of the Ethereum-compatible address despite using the same private key to import the wallet with, because of a different _signature scheme_.

As an additional exercise, you can also create an Oasis wallet using the BIP39 mnemonic from the step 1 above. You will notice that the imported account's base64-encoded private key in the account details screen is different from the one in step 7 above. That's because Oasis uses a different _path derivation_ than Ethereum.

:::

## Create dApp on Emerald with Hardhat

We will use Hardhat to manage our modern dApp including TypeScript bindings for smart contract tests and later for the frontend application. Make sure you installed [Node.js](https://nodejs.org) and that you have `npm` and `npx` readily available.

Run:

```
npx hardhat init
```

Now select the `Create an advanced sample project that uses TypeScript` option and enter the root directory for your project. You can leave other options as default. After a while Hardhat will finish downloading the dependencies and create a simple greeter dApp.

To compile, deploy and test the smart contract of your sample project locally, move to your project directory and type:

```
$ npx hardhat compile
Compiling 2 files with 0.8.4
Generating typings for: 2 artifacts in dir: typechain for target: ethers-v5
Successfully generated 5 typings!
Compilation finished successfully

$ npx hardhat test
No need to generate any newer typings.


  Greeter
Deploying an Emerald Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to 'Hola, mundo!'
    ✓ Should return the new greeting once it's changed (613ms)


  1 passing (614ms)
```

Hardhat already comes with a built-in EVM which is spun up from scratch each time we call `hardhat test` without parameters. It populates 20 accounts with ETH and registers them to the [ethers.js](https://docs.ethers.io/v5/) instance used by tests.

Now, let's look at how to configure Hardhat for the Emerald Testnet and Mainnet networks. Open `hardhat.config.ts` and replace the `networks` field to match the ones from the [Network parameters](../../oasis-network/network-parameters) page:

```
networks: {
    emerald_testnet: {
      url: "https://testnet.emerald.oasis.dev",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    emerald_mainnet: {
      url: "https://emerald.oasis.dev",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
```

In addition we will increase the default timeout for mocha tests from 20 seconds to 60 seconds. This is because the block time is at least 6 seconds and there are three transactions in our tests that need to be confirmed: deploying a contract, setting a greeter value and calling the greeting method. Append the following block to the `config` object:

```
mocha: {
  timeout: 60000
}
```

You probably noticed the `PRIVATE_KEY` environment variable used in the config above. We assign it the hex-encoded private key of your Emerald wallet containing some TEST to pay for gas fees:

```
export PRIVATE_KEY="0xYOUR_TESTNET_PRIVATE_KEY"
```

Now deploy the contract on `emerald_testnet` network by running:

```
$ npx hardhat run scripts/deploy.ts --network emerald_testnet
No need to generate any newer typings.
Greeter deployed to: 0x735df9F166a2715bCA3D3A66B119CBef95a0D129
```

Congratulations, you have just deployed your first smart contract to the Emerald Testnet network! If you are unsure, whether your contract was successfully deployed, you can always monitor the transactions on the Emerald block explorer ([Mainnet](https://explorer.emerald.oasis.dev), [Testnet](https://testnet.explorer.emerald.oasis.dev)). This tool indexes all Emerald accounts, blocks, transactions and even offers a neat user interface for browsing ETH-specifics like the ERC20 tokens and ERC721 NFTs.

![Emerald Block Explorer showing the latest transactions](<../../images/emerald/block_explorer1.png>)

![Emerald Block Explorer showing our account 0x90adE3B7065fa715c7a150313877dF1d33e777D5 used for deploying the smart contract](<../../images/emerald/block_explorer2.png>)

Now that we deployed the contract on Testnet we can also run the tests against the Testnet deployment to check, if it works there:

```
$ npx hardhat test --network emerald_testnet
No need to generate any newer typings.


  Greeter
    ✓ Should return the new greeting once it's changed (21017ms)


  1 passing (21s)
```

Finally, to deploy the contract on the Mainnet, simply use your Mainnet's private key and replace the network name with `emerald_mainnet`:

```
$ PRIVATE_KEY="0xYOUR_MAINNET_PRIVATE_KEY" npx hardhat run scripts/deploy.ts --network emerald_mainnet
No need to generate any newer typings.
Greeter deployed to: 0x6e8e9e0DBCa4EF4a65eBCBe4032e7C2a6fb7C623
```

## Create dApp on Emerald with Truffle

An alternative, yet widely used development tool, is Truffle and its accompanying [web3.js](https://web3js.readthedocs.io/en/v1.5.2/) library. Let's follow [the official Truffle's quickstart guide](https://trufflesuite.com/docs/truffle/quickstart.html) and unbox the MetaCoin example:

```
$ mkdir MetaCoin
$ cd MetaCoin
$ npx truffle unbox metacoin

Starting unbox...
=================

✔ Preparing to download box
✔ Downloading
✔ Cleaning up temporary files
✔ Setting up box

Unbox successful, sweet!

Commands:

  Compile contracts: truffle compile
  Migrate contracts: truffle migrate
  Test contracts:    truffle test
```

To compile and test the contract type:

```
$ npx truffle test
Using network 'test'.


Compiling your contracts...
===========================
> Compiling ./test/TestMetaCoin.sol
> Artifacts written to /tmp/test--1052348-l4q3zOSy9nRA
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang



  TestMetaCoin
    ✓ testInitialBalanceUsingDeployedContract (112ms)
    ✓ testInitialBalanceWithNewMetaCoin (106ms)

  Contract: MetaCoin
    ✓ should put 10000 MetaCoin in the first account (59ms)
    ✓ should call a function that depends on a linked library (78ms)
    ✓ should send coin correctly (185ms)


  5 passing (6s)
```

This spawns an instance of Truffle Develop blockchain in the background with a number of prepopulated ETH accounts and runs the tests.

Next, configure Truffle to use the private key in a similar way as we used it in Hardhat. We need to add the `@truffle/hdwallet-provider` package:

```
$ npm i @truffle/hdwallet-provider --save-dev
```

Add this line at the beginning of your `truffle-config.js`:

`const HDWalletProvider = require("@truffle/hdwallet-provider");`

And finally configure the `emerald_testnet` and `emerald_mainnet` networks in`truffle-config.js` and use the private key stored in the environment variable:

```
emerald_testnet: {
  url: "https://testnet.emerald.oasis.dev:8545",
  provider: function() {
    return new HDWalletProvider(process.env.PRIVATE_KEYS.split(","), "https://testnet.emerald.oasis.dev");
  },
  network_id: "*"
},
emerald_mainnet: {
  url: "https://emerald.oasis.dev:8545",
  provider: function() {
    return new HDWalletProvider(process.env.PRIVATE_KEY, "https://emerald.oasis.dev");
  },
  network_id: "*"
}
```

The MetaCoin example is somewhat specific in that it expects at least two private keys for running the token transfer test. That's why we use the `.split(",")` above in the Testnet configuration which splits the comma-separated hex-encoded keys in the `PRIVATE_KEYS` environment variable. Consequently, we need to set the environment variable as follows:

```
export PRIVATE_KEYS="0xYOUR_FIRST_TESTNET_PRIVATE_KEY,0xYOUR_SECOND_TESTNET_PRIVATE_KEY"
```

When we run the tests Truffle will deploy the contract with its dependencies and call the contract numerous times so it might take a few minutes to complete.

```
$ truffle test --network emerald_testnet
Using network 'emerald_testnet'.


Compiling your contracts...
===========================
> Compiling ./test/TestMetaCoin.sol
> Artifacts written to /tmp/test--1083354-x87wt3FdmfDE
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang



  TestMetaCoin
    ✓ testInitialBalanceUsingDeployedContract (6091ms)
    ✓ testInitialBalanceWithNewMetaCoin (5113ms)

  Contract: MetaCoin
    ✓ should put 10000 MetaCoin in the first account (349ms)
    ✓ should call a function that depends on a linked library (677ms)
account one: 0x90adE3B7065fa715c7a150313877dF1d33e777D5
account two: 0x33a8Ba274FEdFeed6A08d09eC524a1E1A6Da8262
    ✓ should send coin correctly (9795ms)


  5 passing (2m)
```

Finally, we deploy the contract to Mainnet by running the `migrate` Truffle command and setting the network to `emerald_mainnet`. In a few rounds, depending on the network congestion, the contracts will be deployed:

```
$ PRIVATE_KEY=0xYOUR_MAINNET_PRIVATE_KEY truffle migrate --network emerald_mainnet

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'emerald_mainnet'
> Network id:      42262
> Block gas limit: 21000000 (0x1406f40)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x1630945ac8abfe6395a2e2627bd0acfffcf4bda9e107943cb3e4d6ef1d0905d4
   > Blocks: 1            Seconds: 44
   > contract address:    0xFaeA7eda8Be7AC83f811019094D0065D28F52c7c
   > block number:        93914
   > block timestamp:     1642176860
   > account:             0x90adE3B7065fa715c7a150313877dF1d33e777D5
   > balance:             0
   > gas used:            209087 (0x330bf)
   > gas price:           0 gwei
   > value sent:          0 ETH
   > total cost:          0 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:                   0 ETH


2_deploy_contracts.js
=====================

   Deploying 'ConvertLib'
   ----------------------
   > transaction hash:    0xf2c53938773c316051f4ce98395e5df21cfcf0c686f634c1079725e04b9c556c
   > Blocks: 2            Seconds: 80
   > contract address:    0xA0FB05d6Ce497beb162C4EbA4F203544B18A3f31
   > block number:        93918
   > block timestamp:     1642177009
   > account:             0x90adE3B7065fa715c7a150313877dF1d33e777D5
   > balance:             0
   > gas used:            121235 (0x1d993)
   > gas price:           0 gwei
   > value sent:          0 ETH
   > total cost:          0 ETH


   Linking
   -------
   * Contract: MetaCoin <--> Library: ConvertLib (at address: 0xA0FB05d6Ce497beb162C4EbA4F203544B18A3f31)

   Deploying 'MetaCoin'
   --------------------
   > transaction hash:    0x2c5e8177df03d643e56a37b64cbe660420b114ffec097dc5d793bfc666af8e16
   > Blocks: 2            Seconds: 60
   > contract address:    0x5a1C04012bc233c898aebb8BB4353F80D96f3dD2
   > block number:        93920
   > block timestamp:     1642177073
   > account:             0x90adE3B7065fa715c7a150313877dF1d33e777D5
   > balance:             0
   > gas used:            361168 (0x582d0)
   > gas price:           0 gwei
   > value sent:          0 ETH
   > total cost:          0 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:                   0 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0 ETH
```

In our example, the MetaCoin cotract has been successfully deployed to address `0x5a1C04012bc233c898aebb8BB4353F80D96f3dD2` on the Mainnet.

## Create dApp on Emerald with Remix - Ethereum IDE

[Remix](writing-dapps-on-emerald#testnet-and-mainnet) is a popular web IDE for swift development, deployment and testing smart contracts on the Ethereum network. When you open Remix for the first time, it automatically creates an example project. Open one of the contracts and compile it in the "Solidity compiler" tab.

![The initial example project in Remix - Ethereum IDE](<../../images/emerald/remix1.png>)

If you haven't done it yet, you will need to install the [MetaMask](../../manage-tokens/how-to-transfer-rose-into-emerald-paratime#verifying-rose-balance-on-emerald-paratime) extension for your browser in order to deploy the contract with Remix. Import your wallet and configure it for the Emerald network.

Next, in the "Deploy and Run Transactions" tab, select the "Injected Web3" environment. A MetaMask popup will appear and you will have to connect one or more accounts with Remix. Once the connection succeeds, click on the "Deploy" button. The MetaMask popup appears again and you will have to review the transaction, the gas options and finally confirm the transaction.

![Metamask transaction confirmation](<../../images/emerald/remix2.png>)

If everything goes well, your transaction will be deployed using the account and the Emerald network as configured in MetaMask.

![Successful contract deployment on Emerald Testnet with Remix](<../../images/emerald/remix3.png>)

:::info

Sometimes the gas limit estimation function might compute a slightly lower value from the required one. In this case, try increasing the gas limit manually by 10% or 20%.

:::

Congratulations! Now you can start developing your own smart contracts on the Oasis Emerald blockchain! Should you have any questions, do not hesitate to share them with us at [#dev-support on our Community Slack channel](https://oasiscommunity.slack.com/messages/dev-support).

## Troubleshooting

### Deployment of my contract timed out

### Deployment of my contract timed out

Emerald validators, similar to Ethereum ones, order the execution of transactions by gas price. When deploying a contract and the deployment times out, first wait another few rounds to make sure that the contract will not be deployed eventually.

Emerald validators, similar to Ethereum ones, order the execution of transactions by gas price. When deploying a contract and the deployment times out, first wait another few rounds to make sure that the contract will not be deployed eventually.

Next, check that your `gasPrice` **is at least 10 nROSE** which is a minimum required gas price on Emerald. This value should already be propagated automatically by the web3 endpoint, but your deployment configuration might have ignored it.

Next, check that your `gasPrice` **is at least 10 nROSE** which is a minimum required gas price on Emerald. This value should already be propagated automatically by the web3 endpoint, but your deployment configuration might have ignored it.

Finally, consider increasing the `gasPrice` parameter in Hardhat/Truffle config files by a fraction (e.g. 10% or 20%). This will require more ROSE from your wallet to deploy the contract, but you will also increase the chance of your transaction being included in the block.

Finally, consider increasing the `gasPrice` parameter in Hardhat/Truffle config files by a fraction (e.g. 10% or 20%). This will require more ROSE from your wallet to deploy the contract, but you will also increase the chance of your transaction being included in the block.

### Deployment of my contract failed. How do I debug what went wrong?

First, try to debug your transaction by finding it on the Emerald block explorer ([Mainnet](https://explorer.emerald.oasis.dev), [Testnet](https://testnet.explorer.emerald.oasis.dev)):

![Emerald block explorer showing a failed transaction](<../../images/emerald/oasisscan1.png>)

In some cases, the transaction result on Emerald block explorer might be stuck at `Error: (Awaiting internal transactions for reason)`. In this case or in case of other consensus layer <-> ParaTime issues, try to find your Emerald transaction on the Oasis Scan explorer ([Mainnet](https://oasisscan.com), [Testnet](https://testnet.oasisscan.com)) which is primarily a consensus-layer explorer, but offers some introspection of ParaTimes as well. Once you find your failed Emerald transaction, the `Status` field should contain a more verbose error description.

![Oasis Scan showing the Out of gas error for a transaction on Emerald](<../../images/emerald/oasisscan2.png>)
