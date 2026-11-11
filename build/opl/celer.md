# Celer Inter-Chain Messaging (IM)

Source: https://docs.oasis.io/build/opl/celer/

**Celer Inter-Chain Messaging (IM)** is a message passing protocol that
facilitates the seamless transfer of any type of generic message, including
function calls, across multiple blockchains via a single source-chain
transaction. Celer IM currently supports message passing between Oasis Sapphire
and all other IM-supported chains. The message-passing support enables
developers to build entirely new privacy-centric dApps or add confidentiality
to existing dApps on popular EVM networks using Sapphire as a privacy layer.

**Celer IM** offers two design patterns:

* Cross-chain logic execution without fund transfer
* Cross-chain logic execution with accompanying fund transfer

This documentation focuses on cross-chain logic execution **without** fund
transfer. For information on using Celer IM with fund transfer, please refer
to the [Celer IM documentation].

[Celer IM documentation]: https://im-docs.celer.network/

## Architecture

Image: Celer IM Architecture
*Architecture diagram for Celer IM[^1]*

[^1]: The Celer IM architecture diagram is courtesy of [Celer documentation][celer-architecture].

[celer-architecture]: https://im-docs.celer.network/developer/architecture-walkthrough/end-to-end-workflow

Celer IM’s architecture is composed of several core components that work
together to facilitate secure and reliable cross-chain messaging:

* **MessageBus**: The primary component managing message transmission between
  source and destination blockchains. It ensures proper formatting and routing
  of messages through the Celer network.
* **State Guardian Network (SGN)**: A decentralized network of validators that
  manage the state of cross-chain messages. SGN validators sign off on messages
  and coordinate their secure delivery, providing security and availability for
  cross-chain interactions.
* **[Executor](#executor)**: An off-chain component that listens to the SGN for
  validated messages ready for execution on the destination chain. Once a
  message is verified, the Executor sends transactions to the MessageBus on the
  destination chain, triggering the execution of the specified logic.

## Executor

The [Executor][Message Executor] is a crucial part of the Celer IM framework.
It performs two main functions:

* Monitors the Celer State Guardian Network (SGN) for messages ready to be
  submitted (with sufficient validator signatures).
* Submits message execution transactions to the MessageBus contract on the
  destination chain.

It is necessary a [Message Executor] runs for you dapp. To set up an executor,
you have two options:

* Follow the [documentation] to set up your own executor.
* Fill out this [form][celer-form] for Celer to set up a hosted executor
  service for you.

For Hackathon or Grant participants, we recommend filling out the
[relay request form][celer-form] to use the shared Message Executor.

In most cases, Celer advises dApp developers to use the shared executor
services provided by the Celer Network team to avoid server configuration and
operation concerns.

**Info**:

Oasis is running an executor for the Sapphire Testnet, which is okay to rely on
for a test, for a faster execution it's recommended to run your own or use the
hosted service.

[Message Executor]: https://im-docs.celer.network/developer/development-guide/message-executor

[documentation]: https://im-docs.celer.network/developer/development-guide/message-executor/integration-guide

[celer-form]: https://form.typeform.com/to/RsiUR9Xz

## Fees

The cross-chain messaging process involves fees paid to two parties:

* **SGN Fee**: Paid as `msg.value` to the *MessageBus* contract by
  the entity calling `sendMessge`.
* **Executor Fee**: Charged by the Executor for submitting execute message
  transactions.

## Monitoring

The Celer IM Scan API can be used to retrieve status and message details by
providing the globally unique transaction ID from the chain which originated the
message.

<https://api.celerscan.com/scan/searchByTxHash?tx=0x>...

For details of the response format, see the [Query IM Tx Status] page of the
Celer-IM documentation. Using this API lets you to check if messages have been
delivered.

[Query IM Tx Status]: https://im-docs.celer.network/developer/development-guide/query-im-tx-status

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
