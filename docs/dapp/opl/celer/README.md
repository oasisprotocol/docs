---
description: A message bridge by Celer
---

# Celer Inter-Chain Messaging (IM)


## Monitoring

The Celer IM Scan API can be used to retrieve status and message details by
providing the globally unique transaction ID from the chain which originated the
message.

    https://api.celerscan.com/scan/searchByTxHash?tx=0x...

For details of the response format, see the [Query IM Tx Status] page of the
Celer-IM documentation. Using this API lets you to check if messages have been
delivered.

[Query IM Tx Status]: https://im-docs.celer.network/developer/development-guide/query-im-tx-status

## Executor

The Executor is an essential part of the Celer IM framework. The Executor monitors the Celer *State Guardian Network*(SGN) for messages ready to be submitted (with enough validator signatures) and submits the message execution transactions to the MessageBus contract.

It is necessary to run a [Message Executor] which monitors the Celer SGN for cross-chain messages and then submits the proof on-chain to deliver them to the target contract.

To set up an executor, you can either follow this [documentation] to set up your own, or fill out this [form][celer-form] for Celer to set up a hosted executor service for you.

If you are participating in a Hackathon or Grant, [please fill out the relay
request form](https://form.typeform.com/to/RsiUR9Xz) to be allowed to use the
shared Message Executor.

In most cases, we recommend dApp developers use the shared executor services provided by the Celer Network team so that you do not need to worry about the executor server configuration and operation.

[Message Executor]: https://im-docs.celer.network/developer/development-guide/message-executor
[documentation]: https://im-docs.celer.network/developer/development-guide/message-executor/integration-guide
[celer-form]:https://form.typeform.com/to/RsiUR9Xz

## Supported Networks

### Mainnets

| Name | Int ID | Hex ID | autoswitch name |
| ---- | ------ | ------ | --------------- |
| Ape | 16350 | 0x3fde | ape |
| Arbitrum Nova | 42170 | 0xa4ba | arbitrum-nova |
| Arbitrum One | 42161 | a4b1 | arbitrum-one |
| Astar | 592 | 0x250 | astar |
| Aurora | 1313161554 | 0x4e454152 | aurora |
| Avalanche | 43114 | 0xa86a | avalanche |
| Binance Smart Chain | 56 | 0x38 | bsc |
| Ethereum | 1 | 0x1 | ethereum |
| Fantom | 250 | 0xfa | fantom |
| Filecoin | 314 | 0x13a | filecoin |
| Milkomeda C1 | 2001 | 0x7d1 | milkomeda |
| Moonriver | 1285 | 0x505 | moonriver |
| Polygon | 137 | 0x89 | polygon |
| Sapphire | 23294 | 0x5afe | sapphire |
| Syscoin | 57 | 0x39 | syscoin |
| Polygon zkEVM | 1101 | 0x44d | polygon-zkevm |
| Optimism | 10 | 0xa | optimism |
| zkSync Era | 324 | 0x144 | zksync-era |

### Testnets

| Name | Int ID | Hex ID | autoswitch name |
| ---- | ------ | ------ | --------------- |
| Arbitrum Testnet | 421611 | 0x66eeb | arbitrum-testnet |
| Avalanche C-Chain Fuji Testnet | 43113 | 0xa869 | avalanche-fuji |
| BSC Testnet | 97 | 0x61 | bsc-testnet |
| ConsenSys zkEVM Testnet | 59140 | 0xe704 | zkevm-testnet |
| Dexalot Testnet | 432201 | 0x69849 | dexalot-testnet |
| Fantom Testnet | 4002 | 0xfa2 | fantom-testnet |
| Filecoin Hyperspace Testnet | 3141 | 0xc45 | filecoin-testnet |
| FNCY Testnet | 923018 | 0xe158a | fncy-testnet |
| Godwoken Testnet | 71401 | 0x116e9 | godwoken-testnet |
| Goerli Testnet | 5 | 0x5 | goerli |
| Polygon Mumbai Testnet | 80001 | 0x13881 | polygon-mumbai |
| Polygon zkEVM Testnet | 1442 | 0x5a2 | zkevm-testnet |
| Sapphire Testnet | 23295 | 0x5aff | sapphire-testnet |
| Scroll Alpha Testnet | 534353 | 0x82751 | scroll-testnet |
| Shibuya Testnet | 81 | 0x51 | shibuya-testnet |

In the following sections we will look at a concrete example on how to build a
confidential, cross-chain DAO-voting dApp from scratch using the Oasis Privacy Layer!



