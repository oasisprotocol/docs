# Hyperlane Protocol

Source: https://docs.oasis.io/build/opl/hyperlane/

[Hyperlane] is a permissionless interoperability protocol that enables seamless
cross-chain communication for developers. Its unique design allows deployment
across various blockchain environments, including layer 1 chains, rollups, and
app-chains, without the need for approvals or intermediaries. This
[permissionless design] empowers developers to build cross-chain applications
with full control over their operations in a multi-chain ecosystem.

[Hyperlane]: https://hyperlane.xyz/

[permissionless design]: https://docs.hyperlane.xyz/docs/intro

### Architecture

Image: Hyperlane Messaging Flow

*Basic Hyperlane cross-chain messaging flow[^1]*

[^1]: Architecture diagram is courtesy of [Hyperlane documentation][hyperlane-architecture]

[hyperlane-architecture]: https://docs.hyperlane.xyz/docs/protocol/protocol-overview

Hyperlane's architecture consists of four key components:

* **[Mailboxes]**: Core messaging contracts deployed on each chain that handle message sending/receiving
* **[Interchain Security Modules (ISMs)][ism]**: Custom security logic that determines how messages are verified
* **[Relayers]**: Off-chain agents that transport messages between chains
* **[Validators]**: Fulfilling the security layer of the Hyperlane protocol

[Mailboxes]: https://docs.hyperlane.xyz/docs/protocol/core/mailbox

[ism]: https://docs.hyperlane.xyz/docs/protocol/ISM/modular-security

[Relayers]: https://docs.hyperlane.xyz/docs/protocol/agents/relayer

[Validators]: https://docs.hyperlane.xyz/docs/protocol/agents/validators

## Fees

Hyperlane fees are called **Interchain Gas Payments** and are payed by the
*message sender* to the *relayer*.

For more info about the Interchain Gas Payments, consult the [Hyperlane documentation][igp]

[igp]: https://docs.hyperlane.xyz/docs/protocol/core/interchain-gas-payment

## Hyperlane CLI

The [Hyperlane CLI][cli] is the official command-line tool for deploying and
managing Hyperlane infrastructure. It provides a comprehensive set of utilities
for:

* **Chain Configuration**: Set up and register new chains with the Hyperlane
  network
* **Core Contract Deployment**: Deploy Hyperlane's core contracts (Mailbox,
  ISM, etc.) to new chains
* **Warp Route Management**: Configure and deploy token bridges between chains
* **Message Testing**: Send test messages across chains to verify connectivity
* **Registry Management**: Interact with chain metadata and contract addresses

The CLI streamlines the process of connecting new chains to the Hyperlane
network, making cross-chain communication accessible to developers and chain
operators.

[cli]: https://docs.hyperlane.xyz/docs/reference/developer-tools/cli

## Hyperlane Core Deployment

For guidance on how to deploy the Hyperlane Core on Sapphire, refer to the
[official deploy documentation][hyperlane-deploy].

[hyperlane-deploy]: https://docs.hyperlane.xyz/docs/get-started-building#step-2%3A-deploy-hyperlane-core-infrastructure

## See also

* [Relayer](https://docs.oasis.io/build/opl/hyperlane/relayer.md)

* [Ping Pong Example](https://docs.oasis.io/build/opl/hyperlane/pingpong-example.md)

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
