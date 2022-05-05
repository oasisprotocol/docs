# Hardware Requirements

The Oasis Network is composed of multiple classes of nodes and services, such
as:

* Consensus Validator/Non-validator Node
* Emerald ParaTime Compute/Client Node
* Emerald Web3 Gateway with PostgreSQL
* Cipher ParaTime Compute/Client Node

This page describes the **minimum** and **recommended** system hardware
requirements for running different types of nodes on the Oasis Network.

:::caution

If you configure a system with slower resources than the recommended values, you
run the risk of being underprovisioned, causing proposer node timeouts and
synchronization delays. This could result in losing stake and not participating
in committees.

If the system will not have enough memory or storage, that will result in the
Oasis node process being forcefully killed. This could lead to BadgerDB state
corruption, losing stake and not participating in committees.

:::


### CPU <a id="suggested-minimum-configurations"></a>

* Consensus Validator/Non-validator Node:
  * Minimum: 2.0 GHz x86-64 CPU with [AES instruction set] support
  * Recommended: 2.0+ GH+ x86-64 CPU with 2 cores/vCPUs with
    [AES instruction set] and [AVX2] support
 
* Emerald ParaTime Compute Node and all ParaTime Client Nodes:
  * Minimum: 2.0 GHz x86-64 CPU with [AES instruction set] support
  * Recommended: 2.0+ GHz x86-64 CPU with 4+ cores/vCPUs with
    [AES instruction set] and [AVX2] support

* Emerald Web3 Gateway with PostgreSQL:
  * Minimum: 2.0 GHz x86-64 CPU
  * Recommended: 2.0+ GHz x86-64 CPU with 2 cores/vCPUs

* Cipher ParaTime Compute Node:
  * Minimum: 2.0 GHz x86-64 CPU with [AES instruction set] and [Intel SGX] support
  * Recommended: 2.0+ GHz x86-64 CPU with 2+ cores/vCPUs with
    [AES instruction set], [Intel SGX] and [AVX2] support

:::info

During ordinary operation nodes can work with the minimal CPU resources.
However, if put under heavy load they might require more cores/vCPUs (e.g. an
Emerald ParaTime Client Node behind a public Emerald Web3 Gateway).

The [AES instruction set] support is required by [Deoxys-II-256-128], a
Misuse-Resistant Authenticated Encryption (MRAE) algorithm, which is used for
encrypting ParaTime's state.

The [Advanced Vector Extensions 2 (AVX2)][AVX2] support enables faster Ed25519
signature verification which in turn makes a node sync faster.

The [Intel SGX] support is required if you want to run Paratime Compute Nodes
that use a Trusted Execution Environment (TEE).

:::

[AES instruction set]: https://en.wikipedia.org/wiki/AES_instruction_set
[Deoxys-II-256-128]: https://sites.google.com/view/deoxyscipher
[AVX2]:
  https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#Advanced_Vector_Extensions_2
[Intel SGX]:
  https://www.intel.com/content/www/us/en/architecture-and-technology/software-guard-extensions.html


### Memory

* Consensus Validator/Non-validator Node:
  * Minimum: 4 GB of ECC RAM
  * Recommended: 8 GB of ECC RAM

* All ParaTime Compute/Client Nodes:
  * Minimum: 8 GB of ECC RAM
  * Recommended: 16 GB of ECC RAM

* Emerald Web3 Gateway with PostgreSQL:
  * Minimum: 4 GB of ECC RAM
  * Recommended: 8 GB of ECC RAM

:::info

During ordinary operation nodes can work with less than the minimum amount of
memory. However, at certain time points, the node will absolutely require more
memory. Examples of such more resource intensive time points are the initial
state sync, BadgerDB migration when upgrading a node to Oasis Core 21.2.x,
generating storage checkpoints with BadgerDB, periodic BadgerDB compactions...

:::


### Storage

* Consensus Validator/Non-validator Node:
  * Minimum: 400+ GB of SSD or NVMe fast storage
  * Recommended: 700+ GB of SSD or NVMe fast storage

* Emerald ParaTime Compute/Client Node:
  * Add these to the Consensus layer storage requirements
  * Minimum: 400+ GB of SSD or NVMe fast storage
  * Recommended: 700+ GB of SSD or NVMe fast storage

* Emerald Web3 Gateway with PostgreSQL:
  * Minimum: 300+ GB of SSD or NVMe fast storage
  * Recommended: 500+ GB of SSD or NVMe fast storage

* Cipher ParaTime Compute/Client Node:
  * Add these to the Consensus layer storage requirements
  * Minimum: 200+ GB of SSD or NVMe fast storage
  * Recommended: 300+ GB of SSD or NVMe fast storage

:::caution

Consensus and ParaTime state is stored in an embedded [BadgerDB] database which
was [designed to run on SSDs][badgerdb-ssds]. Hence, we **strongly discourage**
trying to run a node that stores data **on classical HDDs**.

:::

:::info

The Consensus layer and ParaTime layers accumulate state over time. The speed at
which the state grows depends on the network's and ParaTimes' usage.

For example, a Consensus Non-validator Node on the Mainnet accumulated:

* 280 GB of Consensus state in ~1 year between Apr 28, 2021 and Apr 11, 2022 (since the [Cobalt upgrade])
* 32 GB of Consensus state in ~1 month since the [Damask upgrade]

For example, an Emerald Client Node on the Mainnet additionally accumulated:

* 260 GB of Emerald ParaTime state in ~5 months between Nov 18, 2021 and Apr 11, 2022 (since the [Emerald Mainnet launch])
* 25 GB of Emerald ParaTime state in ~1 month since the [Damask upgrade]

For example, an Emerald Web3 Gateway with PostgreSQL accumulated:

* 210 GB of database growth in ~5 months between Nov 18, 2021 and Apr 11, 2022 (since the [Emerald Mainnet launch])

:::

:::info

Node doesn't need to keep the state from _before_ the latest dump & restore
upgrade (e.g. before the [Cobalt upgrade]). Historical state can be archived
separately.

:::

:::info

It is also possible to configure the node to _not_ keep all the state from the
genesis onward, reducing the amount of storage needed to keep the Consensus
layer's and ParaTime layers' state.

To enable prunning of the Consensus state set the
`consensus.tendermint.abci.prune.strategy` and
`consensus.tendermint.abci.prune.num_kept` parameters appropriately in your
[node's configuration].

To enable prunning for the ParaTime state set the
`runtime.history.pruner.strategy` and `runtime.history.pruner.num_kept`
parameters appropriately in your [node's configuration].

:::

[BadgerDB]: https://dgraph.io/docs/badger/
[badgerdb-ssds]: https://dgraph.io/docs/badger/design/
[Cobalt upgrade]: ../../mainnet/previous-upgrades/cobalt-upgrade.md
[Damask upgrade]: ../../mainnet/damask-upgrade
[Emerald Mainnet launch]:
  https://medium.com/oasis-protocol-project/oasis-emerald-evm-paratime-is-live-on-mainnet-13afe953a4c9
[node's configuration]: ../set-up-your-node/run-validator.md#configuring-the-oasis-node
