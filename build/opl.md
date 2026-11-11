# Oasis Privacy Layer (OPL)

Source: https://docs.oasis.io/build/opl/

The Oasis Privacy Layer (OPL) is a powerful solution that enables developers
to integrate privacy features into their decentralized applications (dApps)
across multiple EVM-compatible networks.

* **Privacy-First**: OPL leverages the [Sapphire]'s privacy features to ensure
  that contract data and computation remains confidential.
* **Cross-Chain Compatibility**: OPL is compatible with multiple blockchains
  through message bridging protocols, making it easy to integrate privacy
  regardless of the chain your dApp is built on.

For more information about OPL and to catch the latest news, please visit the
[official OPL page].

[official OPL page]: https://oasis.net/opl

[Sapphire]: https://docs.oasis.io/build/sapphire.md

## How OPL Works

The OPL is made possible through message bridges, which enable secure
communication between OPL-enabled contracts on Sapphire and smart contracts on
other chains. This allows dApps to access privacy-preserving capabilities while
keeping their main logic on their primary chain.

Image: Oasis Privacy Layer diagram

**Info**:

For how to use use signed messages with the GSN to trigger a cross-chain
messages, please visit our [Gasless Transactions chapter].

[Gasless Transactions chapter]: https://docs.oasis.io/build/sapphire/develop/gasless.md

## Message Bridges

You can integrate messaging bridges into your dApps using one of these four
methods:

* **[Hyperlane Protocol][hyperlane]**: A permissionless interoperability
  protocol that enables seamless cross-chain communication for developers.
* **[Router Protocol CrossTalk][router]**: An extensible cross-chain framework
  that enables seamless state transitions across multiple chains.
* **[OPL SDK]**: A wrapper provided by the Oasis Protocol that simplifies the
  integration of message bridging with Oasis’s privacy features.
* **[Celer Inter-Chain Messaging (IM)][celer]**: A generalized message bridging
  solution by Celer, which lets you build more complex solutions.

### Comparison

| Protocol                      | Validator Network              | Relayer                                           | Fees                                                                              |
| ----------------------------- | ------------------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------- |
| **[Hyperlane][hyperlane]**    | Self-hosted orrun by Hyperlane | Self-hosted or run by Hyperlane                   | Interchain Gas Payments on origin chain                                           |
| **[Router Protocol][router]** | Orchestrators (Router Chain)   | Relayer (run by 3rd party)                        | Paid by the approved feepayer on the Routerchain                                  |
| **[OPL SDK]**                 | SGN (Celer)                    | Executor (self-hosted or hosted service by Celer) | SGN Fee: Paid via `msg.value`  Executor Fee: Charged externally (Free on testnet) |
| **[Celer IM][celer]**         | SGN (Celer)                    | Executor (self-hosted or hosted service by Celer) | SGN Fee: Paid via `msg.value`  Executor Fee: Charged externally (Free on testnet) |

### Recommendation

#### Development & Testing

**[Hyperlane][hyperlane]**: Due to its permissionless nature, Hyperlane
integrates well with other testnets, and you can easily run your own Relayer.
Hyperlane's flexibility is great for hackathons, early-stage development and
testing environments.

#### Production

**[Router Protocol][router]**: Battle-tested by ecosystem dApps like Neby and
features the most active token pairs. Router provides a highly reliable,
solution for cross-chain communication, making it a top recommendation
for production-ready environments.

## Examples

* [Ping Example](https://docs.oasis.io/build/opl/opl-sdk/ping-example.md)

* [Ping Example](https://docs.oasis.io/build/opl/celer/ping-example.md)

* [Ping Pong Example](https://docs.oasis.io/build/opl/hyperlane/pingpong-example.md)

* [PingPong Example](https://docs.oasis.io/build/opl/router-protocol/pingpong-example.md)

[OPL SDK]: https://docs.oasis.io/build/opl/opl-sdk.md

[celer]: https://docs.oasis.io/build/opl/celer.md

[router]: https://docs.oasis.io/build/opl/router-protocol.md

[hyperlane]: https://docs.oasis.io/build/opl/hyperlane.md

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
