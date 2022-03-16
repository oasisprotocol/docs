# Hardware Requirements

The Oasis Network is composed of multiple classes of nodes that participate in
different committees.

This page describes the **minimum** and **recommended** system hardware
requirements for running different types of nodes on the Oasis Network.

:::caution

If you configure a system with less resources than the recommended values, you
run the risk of being underprovisioned and causing proposer node timeouts.
This could result in losing stake.

:::

## Consensus Nodes <a id="suggested-minimum-configurations"></a>

To run a non-validator or a validator consensus node, your system should meet
the following requirements:

### CPU

* Minimum: 2.0 GHz x86-64 CPU with [AES instruction set] support
* Recommended: 2.0 GHz+ x86-64 CPU with 2 cores or 2 such virtual CPUs with
  [AES instruction set] and [AVX2] support

:::caution

The [AES instruction set] support is required by [Deoxys-II-256-128], a
Misuse-Resistant Authenticated Encryption (MRAE) algorithm, which is used for
encrypting ParaTime's state.

:::

:::info

The [Advanced Vector Extensions 2 (AVX2)][AVX2] support enables faster Ed25519
signature verification which in turn makes a node sync faster.

:::

[AES instruction set]: https://en.wikipedia.org/wiki/AES_instruction_set
[Deoxys-II-256-128]: https://sites.google.com/view/deoxyscipher
[AVX2]:
  https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#Advanced_Vector_Extensions_2

### Memory

* Minimum: 4 GB of ECC RAM
* Recommended: 8 GB of ECC RAM

:::info

Ordinary node operation can work with less memory, e.g. 4 GB of RAM.

However, at certain time points, the node will absolutely require more memory.
Examples of such more resource intensive time points are the initial state sync,
BadgerDB migration when upgrading a node to Oasis Core 21.2.x, generating
storage checkpoints with BadgerDB, periodic BadgerDB compactions...

If the system will not have enough memory, that will result in the Oasis node
process being killed forcefully by the OOM process.
Oasis node being killed forcefully could lead to BadgerDB state corruption
and/or losing stake.

:::

### Storage

* Minimum: 300+ GB of SSD or NVMe fast storage
* Recommended: 500+ GB of SSD or NVMe fast storage

:::caution

Consensus state is stored in an embedded [BadgerDB](https://dgraph.io/docs/badger/)
database which was [designed to run on SSDs](https://dgraph.io/docs/badger/design/).

Hence, we **strongly discourage** trying to run a node that stores data
**on classical HDDs**.

:::

:::info

The network accumulates state over time. The speed at which the state grows depends on the network's usage.

For example, the Mainnet accumulated over 250 GB of state in ~11 months between
the [Cobalt upgrade](../../mainnet/cobalt-upgrade.md) (Apr 28, 2021) and Mar 15, 2022.

:::

:::info

Node doesn't need to keep the state from before the latest dump & restore upgrade (e.g. before the [Cobalt upgrade](../../mainnet/cobalt-upgrade.md)). Historical state can be archived separately.

:::

:::info

It is also possible to configure the Node to _not_ keep all the state from the genesis onward, reducing the amount of storage needed to keep the network's state.

To do that, set the **`consensus.tendermint.abci.prune.strategy`** and **`consensus.tendermint.abci.prune.num_kept`** parameters appropriately in your [Node's configuration](../set-up-your-node/run-validator.md#configuring-the-oasis-node).

:::

## ParaTime Nodes

To run a ParaTime node, your system should meet the following requirements:

### CPU

* Minimum: 2.0 GHz x86-64 CPU with [AES instruction set] support
* Recommended: 2.0 GHz+ x86-64 CPU with 2 cores or 2 such virtual CPUs with
  [AES instruction set] and [AVX2] support

:::caution

The [AES instruction set] support is required by [Deoxys-II-256-128], a
Misuse-Resistant Authenticated Encryption (MRAE) algorithm, which is used for
encrypting ParaTime's state.

:::

:::info

The [Advanced Vector Extensions 2 (AVX2)][AVX2] support enables faster Ed25519
signature verification which in turn makes a node sync faster.

:::

[AES instruction set]: https://en.wikipedia.org/wiki/AES_instruction_set
[Deoxys-II-256-128]: https://sites.google.com/view/deoxyscipher
[AVX2]:
  https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#Advanced_Vector_Extensions_2

:::info

If you want to run ParaTimes which require the use of a Trusted Execution
Environment (TEE), the CPU also needs to support [Intel SGX].

:::

[Intel SGX]:
  https://www.intel.com/content/www/us/en/architecture-and-technology/software-guard-extensions.html

### Memory

* Minimum: 8 GB of ECC RAM
* Recommended: 16 GB of ECC RAM

:::info

Ordinary node operation can work with less memory, e.g. 8 GB of RAM.

However, at certain time points, the node will absolutely require more memory.
Examples of such more resource intensive time points are the initial state sync,
generating storage checkpoints with BadgerDB, periodic BadgerDB compactions...

If the system will not have enough memory, that will result in the Oasis node
process being killed forcefully by the OOM process.
Oasis node being killed forcefully could lead to BadgerDB state corruption
and/or losing stake.

:::

### Storage

* Minimum: 500+ GB of SSD or NVMe fast storage
* Recommended: 800+ GB of SSD or NVMe fast storage

:::caution

Consensus state is stored in an embedded [BadgerDB](https://dgraph.io/docs/badger/)
database which was [designed to run on SSDs](https://dgraph.io/docs/badger/design/).

Hence, we **strongly discourage** trying to run a node that stores data
**on classical HDDs**.

:::

:::info

The consensus layer and the ParaTimes accumulate state over time.
The speed at which the state grows depends on the network's and ParaTimes' usage.

For example, a node running the Emerald ParaTime on the Mainnet would currently
(Mar 15, 2022)
need to store:

- over 250 GBs of consensus state accumulated in ~11 months since the
[Cobalt upgrade](../../mainnet/cobalt-upgrade.md) (Apr 28, 2021).
- over 125 GBs of Emerald ParaTime state accumulated in ~4 months since the
[Emerald Mainnet launch](https://medium.com/oasis-protocol-project/oasis-emerald-evm-paratime-is-live-on-mainnet-13afe953a4c9) (Nov 18, 2021).

:::

:::info

It is also possible to configure the Node to _not_ keep all the state from the genesis onward, reducing the amount of storage needed to keep the network's state.

To do that, set the **`consensus.tendermint.abci.prune.strategy`** and **`consensus.tendermint.abci.prune.num_kept`** parameters appropriately in your [Node's configuration](../set-up-your-node/run-validator.md#configuring-the-oasis-node).

:::
