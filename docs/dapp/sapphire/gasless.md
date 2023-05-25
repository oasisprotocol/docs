---
description: Submitting transactions without paying for fees
---

# Gasless Transactions

## On-Chain Signer

## Gas Station Network

[Gas Station Network](https://docs.opengsn.org) (GSN) is very useful for improving
the user experience of many dApps by making their users send transactions
without having native tokens for gas. We make GSN functionalities available on
Sapphire ParaTime.

### Package Install

Starting with an empty folder, let us install the
[Oasis fork of the GSN command line tool](https://github.com/oasislabs/gsn) by
using the following commands:

```shell
pnpm init
pnpm install -D @oasislabs/opengsn-cli
```

Next, we will export our hex-encoded private key (**without** the leading `0x`)
for deploying the gas station network as an environment variable:

```shell
export PRIVATE_KEY=...
```

### Deploy GSN

We will deploy GSN relaying contracts along with the test paymaster using a
test token. Use the address of your account as `--burnAddress` and
`--devAddress` parameters:

```shell
npx gsn deploy --network sapphire_testnet --burnAddress 0xfA3AC9f65C9D75EE3978ab76c6a1105f03156204 --devAddress 0xfA3AC9f65C9D75EE3978ab76c6a1105f03156204 --testToken true --testPaymaster true --yes --privateKeyHex $PRIVATE_KEY
```

After the command finishes successfully, you should find the addreses of
deployed contracts at the end:

```
  Deployed TestRecipient at address 0x594cd6354b23A5200a57355072E2A5B15354ee21
  
  RelayHub: 0xc4423AB6133B06e4e60D594Ac49abE53374124b3 
  RelayRegistrar: 0x196036FBeC1dA841C60145Ce12b0c66078e141E6
  StakeManager: 0x6763c3fede9EBBCFbE4FEe6a4DE6C326ECCdacFc
  Penalizer: 0xA58A0D302e470490c064EEd5f752Df4095d3A002
  Forwarder: 0x59001d07a1Cd4836D22868fcc0dAf3732E93be81
  TestToken (test only): 0x6Ed21672c0c26Daa32943F7b1cA1f1d0ABdbac66
  Paymaster (Default): 0x8C06261f58a024C958d42df89be7195c8690008d
```


### Start GSN Relay Server

Now we are ready to start our own relay server by using the following command.
Use the newly deployed:

- `RelayHub` address for `--relayHubAddress`,
- `TestToken` address for `--managerStakeTokenAddress`,
- address of your account for `--owner-address`

```shell
npx gsn relayer-run --relayHubAddress 0xc4423AB6133B06e4e60D594Ac49abE53374124b3 --managerStakeTokenAddress  0x6Ed21672c0c26Daa32943F7b1cA1f1d0ABdbac66 --ownerAddress '0xfA3AC9f65C9D75EE3978ab76c6a1105f03156204' --ethereumNodeUrl 'https://testnet.sapphire.oasis.dev' --workdir .
```

### Fund and Register GSN Relay Server

The first thing is to fund your relay server so that it has enough native
tokens to pay for others' transactions. Let's fund the paymaster with
**5 tokens**. Use the `RelayHub` and `Paymaster` addresses for `--hub`
and `--paymaster` values:

```shell
npx gsn paymaster-fund --network sapphire_testnet --hub 0xc4423AB6133B06e4e60D594Ac49abE53374124b3 --paymaster 0x8C06261f58a024C958d42df89be7195c8690008d --privateKeyHex $PRIVATE_KEY --amount 5000000000000000000
```

You can check the balance of the paymaster by running:

```shell
npx gsn paymaster-balance --network sapphire_testnet --hub 0xc4423AB6133B06e4e60D594Ac49abE53374124b3  --paymaster 0x8C06261f58a024C958d42df89be7195c8690008d
```

Next, we need to register the relay server with the your desired `relayUrl` by
staking the `token` the relayHub requires.

```shell
npx gsn relayer-register --network sapphire_testnet --relayUrl 'http://localhost:8090' --token 0x6Ed21672c0c26Daa32943F7b1cA1f1d0ABdbac66 --wrap true --privateKeyHex $PRIVATE_KEY
```

After this step, your relay server should be ready to take incoming relay
requests and forward them to the relay hub on Sapphire Testnet.

### Send Testing Relayed Requests:

We can test whether a relayed request can be forwarded and processed correctly.
Scroll up to find the GSN deployment response and use the following parameters:
- `Forwarder` as `--to`,
- `Paymaster` as `--paymaster`,
- your account address as `--from`

Parameters matching our deployment would be:

```shell
npx gsn send-request --network sapphire_testnet --abiFile 'node_modules/@oasislabs/opengsn-cli/dist/compiled/TestRecipient.json' --method emitMessage --methodParams 'hello world!' --to 0x594cd6354b23A5200a57355072E2A5B15354ee21 --paymaster 0x8C06261f58a024C958d42df89be7195c8690008d --privateKeyHex $PRIVATE_KEY --from 0xfA3AC9f65C9D75EE3978ab76c6a1105f03156204 --gasLimit 150000 --gasPrice 100
```

:::info

More detailed explanations of these GSN commands and parameters can be found on
the [upstream OpenGSN website](https://docs.opengsn.org/javascript-client/gsn-helpers.html).

:::

## Writing a GSN-enabled Smart Contract

First, install the OpenGSN contracts package:

```shell
pnpm install -D @opengsn/contracts@3.0.0-beta.2
```

Then follow the remainder of the steps from the
[upstream OpenGSN docs](https://docs.opengsn.org/contracts/#receiving-a-relayed-call).
