---
description: A message bridge by Celer
---

# Celer Inter-Chain Messaging (IM)

**Celer Inter-Chain Messaging (IM)** is a versatile solution for enabling cross-chain communication between different blockchain networks. It allows developers to transfer arbitrary messages, such as data or function calls, between smart contracts deployed on distinct chains. 

**Celer IM** offer two design pattern:

- Cross-chain logic execution without fund transfer
- Cross-chain logic execution with accompanying fund transfer

This documentation focuses on cross-chain logic execution **without** fund transfer.
If you`re interested to use Celer IM with fundtransfer, please consult the
[Celer IM documentation].

[Celer IM documentation]: https://im-docs.celer.network/

## Architecture

![Celer IM Architecture](../../images/opl/celer-e2e.png)
*Architecture diagram for Celer IM[^1]*

[^1]: The Celer IM architecture diagram is courtesy of [Celer documentation][celer-architecture].

[celer-architecture]: https://im-docs.celer.network/developer/architecture-walkthrough/end-to-end-workflow

Celer IM’s architecture is composed of several core components that work together to facilitate secure and reliable cross-chain messaging:

- **MessageBus**: The MessageBus is the primary component that manages message transmission between source and destination blockchains. It ensures that messages are properly formatted and routed through the Celer network.
- **State Guardian Network (SGN)**: SGN is a decentralized network of validators responsible for managing the state of cross-chain messages. Validators in the SGN sign off on messages and coordinate their secure delivery, providing both a layer of security and availability for cross-chain interactions.
- **[Executor](#executor)**: The Message Executor is an off-chain component that listens to the SGN for new messages that have been validated and need to be executed on the destination chain. Once a message is verified, the Message Executor sends transactions to the MessageBus on the destination chain, triggering the execution of the specified logic as defined by the original message. This design ensures that message delivery remains secure and synchronized with the validators' consensus.

## Executor

The Executor is an essential part of the Celer IM framework. The Executor monitors the Celer *State Guardian Network*(SGN) for messages ready to be submitted (with enough validator signatures) and submits the message execution transactions to the MessageBus contract.

It is necessary to run a [Message Executor] which monitors the Celer SGN for cross-chain messages and then submits the proof on-chain to deliver them to the target contract.

To set up an executor, you can either follow this [documentation] to set up your own, or fill out this [form][celer-form] for Celer to set up a hosted executor service for you.

If you are participating in a Hackathon or Grant, [please fill out the relay
request form][celer-form] to be allowed to use the shared Message Executor.

In most cases, we recommend dApp developers use the shared executor services provided by the Celer Network team so that you do not need to worry about the executor server configuration and operation.

[Message Executor]: https://im-docs.celer.network/developer/development-guide/message-executor
[documentation]: https://im-docs.celer.network/developer/development-guide/message-executor/integration-guide
[celer-form]:https://form.typeform.com/to/RsiUR9Xz

## Fees

Fees in the cross-chain messaging process are paid to two parties:

- **SGN Fee**: paid as `msg.value` to the *MessageBus* contract by whoever
  calls `sendMessge`.
- **Executor Fee**: Executor charges fees to submit execute message transactions.

## Monitoring

The Celer IM Scan API can be used to retrieve status and message details by
providing the globally unique transaction ID from the chain which originated the
message.

    https://api.celerscan.com/scan/searchByTxHash?tx=0x...

For details of the response format, see the [Query IM Tx Status] page of the
Celer-IM documentation. Using this API lets you to check if messages have been
delivered.

[Query IM Tx Status]: https://im-docs.celer.network/developer/development-guide/query-im-tx-status
