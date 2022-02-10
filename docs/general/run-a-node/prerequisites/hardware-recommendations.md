# Hardware Requirements

:::info

The hardware requirements listed on this page are the suggested **minimum requirements**. It might be possible to configure a system with less resources, but you run the risk of being underprovisioned and thereby prone to loss of stake.

:::

The Oasis Network is composed of multiple classes of nodes that participate in different committees. The majority of committees have common system configurations for the participant nodes.

## Consensus Nodes <a id="suggested-minimum-configurations"></a>

To run a non-validator or a validator consensus node, your system should meet the following minimum system requirements:

* 2.0 GHz x86-64 CPU

:::caution

The CPU must have [AES-NI](https://en.wikipedia.org/wiki/AES_instruction_set) support.

:::

* 4 GB ECC RAM

:::info

Ordinary node operation can work with 2 GB of RAM.

However, at certain time points, it absolutely requires at least 4 GB of RAM. Examples of such more resource intensive time points are the initial state sync, BadgerDB migration when upgrading a node to Oasis Core 21.2.x, ...

If you can dynamically change the amount of RAM a node is provisioned, then feel free to downscale/upscale it as you see fit.

:::



* 100+ GB High Speed Storage

:::info

The network accumulates state over time. The speed at which the state grows depends on the network's usage.

For example, the Mainnet accumulated over 80 GB of state in 5+ months between [Mainnet launch](../../mainnet/previous-upgrades/mainnet-upgrade) (Nov 18, 2020) and [Cobalt upgrade](../../mainnet/cobalt-upgrade) (Apr 28, 2021).

:::

:::info

Node doesn't need to keep the state from before the latest dump & restore upgrade (e.g. before the [Cobalt upgrade](../../mainnet/cobalt-upgrade)). Historical state can be archived separately.

:::

:::info

It is also possible to configure the Node to _not_ keep all the state from the genesis onward, reducing the amount of storage needed to keep the network's state.

To do that, set the **`consensus.tendermint.abci.prune.strategy`** and **`consensus.tendermint.abci.prune.num_kept`** parameters appropriately in your [Node's configuration](../set-up-your-node/run-validator#configuring-the-oasis-node).

:::

## ParaTime Nodes

To run a ParaTime node, your system should meet the following minimum system requirements:

* 2.0 GHz x86-64 CPU

:::caution

The CPU must have [AES-NI](https://en.wikipedia.org/wiki/AES_instruction_set) support.

:::

:::caution

If you want to be able to run ParaTimes which require the use of a Trusted Execution Environment (TEE), the CPU needs to support Intel SGX.

:::

* 8 GB ECC RAM
* 100+ GB High Speed Storage

