# Oasis Core Developer Documentation

Source: https://docs.oasis.io/core/

Image: Architecture

## Development Setup

Here are instructions on how to set up the local build environment, run the
tests and some examples on how to prepare test networks for local development of
Oasis Core components.

* Build Environment Setup and Building
  * [Prerequisites](https://docs.oasis.io/core/development-setup/prerequisites.md)
  * [Building](https://docs.oasis.io/core/development-setup/building.md)
* Running Tests and Development Networks
  * [Running Tests](https://docs.oasis.io/core/development-setup/running-tests.md)
  * [Local Network Runner With a Simple Runtime](https://docs.oasis.io/core/development-setup/oasis-net-runner.md)
  * [Single Validator Node Network](https://docs.oasis.io/core/development-setup/single-validator-node-network.md)
  * [Deploying a Runtime](https://docs.oasis.io/core/development-setup/deploying-a-runtime.md)

## High-Level Components

At the highest level, Oasis Core is divided into two major layers: the
*consensus layer* and the *runtime layer* as shown on the figure above.

The idea behind the consensus layer is to provide a minimal set of features
required to securely operate independent runtimes running in the runtime layer.
It provides the following services:

* Epoch-based time keeping and a random beacon.
* Basic staking operations required to operate a PoS blockchain.
* An entity, node and runtime registry that distributes public keys and
  metadata.
* Runtime committee scheduling, commitment processing and minimal state keeping.

On the other side, each runtime defines its own state and state transitions
independent from the consensus layer, submitting only short proofs that
computations were performed and results were stored. This means that runtime
state and logic are completely decoupled from the consensus layer, and the
consensus layer only provides information on what state (summarized by a
cryptographic hash of a Merklized data structure) is considered canonical at any
given point in time.

See the following chapters for more details on specific components and their
implementations.

* [Consensus Layer](https://docs.oasis.io/core/consensus.md)
  * [Transactions](https://docs.oasis.io/core/consensus/transactions.md)
  * Services
    * [Epoch Time](https://docs.oasis.io/core/consensus/services/epochtime.md)
    * [Random Beacon](https://docs.oasis.io/core/consensus/services/beacon.md)
    * [Staking](https://docs.oasis.io/core/consensus/services/staking.md)
    * [Registry](https://docs.oasis.io/core/consensus/services/registry.md)
    * [Committee Scheduler](https://docs.oasis.io/core/consensus/services/scheduler.md)
    * [Governance](https://docs.oasis.io/core/consensus/services/governance.md)
    * [Root Hash](https://docs.oasis.io/core/consensus/services/roothash.md)
    * [Key Manager](https://docs.oasis.io/core/consensus/services/keymanager.md)
  * [Genesis Document](https://docs.oasis.io/core/consensus/genesis.md)
  * [Transaction Test Vectors](https://docs.oasis.io/core/consensus/test-vectors.md)
* [Runtime Layer](https://docs.oasis.io/core/runtime.md)
  * [Operation Model](https://docs.oasis.io/core/runtime.md#operation-model)
  * [Runtime Host Protocol](https://docs.oasis.io/core/runtime/runtime-host-protocol.md)
  * [Identifiers](https://docs.oasis.io/core/runtime/identifiers.md)
  * [Messages](https://docs.oasis.io/core/runtime/messages.md)
* Oasis Node (`oasis-node`)
  * [RPC](https://docs.oasis.io/core/oasis-node/rpc.md)
  * [Metrics](https://docs.oasis.io/core/oasis-node/metrics.md)
  * [CLI](https://docs.oasis.io/core/oasis-node/cli.md)

## Common Functionality

* [Serialization](https://docs.oasis.io/core/encoding.md)
* [Cryptography](https://docs.oasis.io/core/crypto.md)
* Protocols
  * [Authenticated gRPC](https://docs.oasis.io/core/authenticated-grpc.md)
* [Merklized Key-Value Store (MKVS)](https://docs.oasis.io/core/mkvs.md)

## Processes

* [Architectural Decision Records](https://github.com/oasisprotocol/adrs)
* [Release Process](https://docs.oasis.io/core/release-process.md)
* [Versioning](https://docs.oasis.io/core/versioning.md)
* [Security](https://docs.oasis.io/core/SECURITY.md)

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
