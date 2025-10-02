---
description: Detailed information for the consensus layer about RPCs, block explorers and indexers
---

# Consensus network information

## RPC Endpoints

:::danger

The RPC endpoint is a **point of trust**. Beside rate limiting, it can also
perform censorship or even man-in-the-middle attack. If you have security
considerations, we strongly recommend that you [run your own client
node][non-validator-node],

:::

[non-validator-node]: ../../../node/run-your-node/non-validator-node.mdx

Most dApp developers will build dApps on the ParaTime layer (the *compute*
layer). For Sapphire and Emerald which are EVM-compatible chains,
those dApps connect directly to an [EVM-compatible Web3 endpoint][web3].
However, if you are building a dApp for Cipher or the one that needs to
perform consensus operations such as the consensus-layer token transfers,
governance transactions, cross-chain ParaTime deposits and withdrawals and
similar, you will need to connect to the one of the endpoints speaking
[Oasis gRPC][grpc].

Public gRPC endpoints (in alphabetic order):

| Provider | Mainnet URL         | Testnet URL                 |
|----------|---------------------|-----------------------------|
| [Oasis]  | `grpc.oasis.io:443` | `testnet.grpc.oasis.io:443` |

[Oasis]: https://oasis.net
[web3]: ../../../node/web3.mdx
[grpc]: ../../../node/grpc.mdx

## Block Explorers

| Name (Provider)          | Mainnet URL                                   | Testnet URL                                 |
|--------------------------|-----------------------------------------------|---------------------------------------------|
| Oasis Explorer ([Oasis]) | https://explorer.oasis.io/mainnet/consensus   | https://explorer.oasis.io/testnet/consensus |
| Oasis Scan ([Bit Cat])   | https://www.oasisscan.com                     | https://testnet.oasisscan.com               |

[Bit Cat]: https://www.bitcat365.com/

## Indexers

| Name (Provider)        | Mainnet URL                            | Testnet URL                            | Documentation                              |
|------------------------|----------------------------------------|----------------------------------------|--------------------------------------------|
| Oasis Nexus ([Oasis])  | `https://nexus.oasis.io/v1`            | `https://testnet.nexus.oasis.io/v1`    | [API][Nexus-docs]                          |
| Oasis Scan ([Bit Cat]) | `https://api.oasisscan.com/v2/mainnet` | `https://api.oasisscan.com/v2/testnet` | [API][OasisScan-docs]                      |

[Nexus-docs]: https://nexus.oasis.io/v1/spec/v1.html
[OasisScan-docs]: https://api.oasisscan.com/v2/swagger/

## Rosetta Endpoints

| Provider | Mainnet URL                               | Testnet URL                               |
|----------|-------------------------------------------|-------------------------------------------|
| [Oasis]  | `https://rosetta.oasis.io/api/mainnet/v1` | `https://rosetta.oasis.io/api/testnet/v1` |

:::note

If you are running your own Oasis client node endpoint, a block explorer, an
indexer, or the Rosetta gateway and wish to be added to these docs, open an
issue at [github.com/oasisprotocol/docs].

:::

[github.com/oasisprotocol/docs]: https://github.com/oasisprotocol/docs/issues