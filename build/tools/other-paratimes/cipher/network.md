# Network Information

Source: https://docs.oasis.io/build/tools/other-paratimes/cipher/network

## RPC Endpoints

**Danger**:

The RPC endpoint is a *point of trust*. Beside traffic rate limiting, it can
also perform censorship or even a man-in-the-middle attack. If you have security
considerations, we strongly recommend that you set up your own [ParaTime client
node][paratime-client-node].

Cipher endpoints share the gRPC protocol with the Oasis Core. You can connect to
one of the public endpoints below (in alphabetic order):

[paratime-client-node]: https://docs.oasis.io/node/run-your-node/paratime-client-node.md

| Provider | Mainnet RPC URLs    | Testnet RPC URLs            |
| -------- | ------------------- | --------------------------- |
| [Oasis]  | `grpc.oasis.io:443` | `testnet.grpc.oasis.io:443` |

[Oasis]: https://oasis.net

## Block Explorers

| Name/Provider          | Mainnet URL                                                                                                                                         | Testnet URL                                                                                                                                                 | EIP-3091 compatible |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Oasis Scan ([Bit Cat]) | [https://www.oasisscan.com/paratimes/000…7cb](https://www.oasisscan.com/paratimes/000000000000000000000000000000000000000000000000e199119c992377cb) | [https://testnet.oasisscan.com/paratimes/000…000](https://testnet.oasisscan.com/paratimes/0000000000000000000000000000000000000000000000000000000000000000) | No                  |

[Bit Cat]: https://www.bitcat365.com/

**Tip**:

Only rudimentary block explorer features exist for Cipher. Consider debugging
Cipher transactions with the [`oasis paratime show`] command using the
[Oasis CLI].

[`oasis paratime show`]: https://docs.oasis.io/build/tools/cli/paratime.md#show

[Oasis CLI]: https://docs.oasis.io/build/tools/cli.md

## Indexers

| Name (Provider)        | Mainnet URL                            | Testnet URL                            | Documentation                 |
| ---------------------- | -------------------------------------- | -------------------------------------- | ----------------------------- |
| Oasis Scan ([Bit Cat]) | `https://api.oasisscan.com/v2/mainnet` | `https://api.oasisscan.com/v2/testnet` | [Runtime API][OasisScan-docs] |

[OasisScan-docs]: https://api.oasisscan.com/v2/swagger/#/runtime

**Note**:

If you are running your own Cipher endpoint, a block explorer, or an indexer
and wish to be added to these docs, open an issue at
[github.com/oasisprotocol/docs].

[github.com/oasisprotocol/docs]: https://github.com/oasisprotocol/docs

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
