---
description: This page describes how to run an archive node on the Oasis Network.
---

# Archive Node

This guide will cover setting up an archive node for the Oasis Network. Node
started in archive mode only serves existing consensus and runtime states.
The node has all unneeded consensus and P2P functionality disabled, therefore
it will not participate in the network. Archive nodes can be used to access
historic state which is pruned in dump-restore network upgrades.

## Prerequisites

Running an archive node requires a pre-existing `oasis-node` state. If you don't have one,
you can download a snapshot of a specific network state [here][snapshots].

[snapshots]: https://snapshots.oasis.io

## Configuration (Oasis Core 23 and later)

Starting from the Oasis Core version 23, the configuration for enabling archive mode has changed.
Use the `mode` setting:

:::info

This setting configures the node to act as an archive node.

:::

```yaml
mode: archive
common:
    data_dir: /node/data
    log:
        format: JSON
        level:
            cometbft: info
            cometbft/context: error
            default: info
genesis:
    file: /node/etc/genesis.json
runtime:
    # Paths to ParaTime bundles for all of the supported ParaTimes.
    paths:
        - {{ runtime_orc_path }}
```

:::info

Keep all other settings the same as those for a full client node. For example, to serve archived runtime
state, the node needs to have the runtime configured and the state present.

:::

## Configuration (Oasis Core 22 and earlier)

For all pre-Eden networks, such as Damask, the configuration remains the same but requires the
appropriate version of `oasis-node` and the node state.

#### Damask

To run an archive node for Damask, use [Oasis Core v22.2.12] and the following
configuration:

```yaml
datadir: /node/data

log:
  level:
    default: info
    tendermint: info
    tendermint/context: error
  format: JSON

genesis:
  file: /node/etc/genesis.json

consensus:
  tendermint:
    mode: archive

runtime:
  mode: client
  paths:
    # Paths to ParaTime bundles for all of the supported ParaTimes.
    - "{{ runtime_orc_path }}"
```

#### Cobalt

To run an archive node for Cobalt, use [Oasis Core v21.3.14] and the following configuration:

```yaml
datadir: /node/data

log:
  level:
    default: info
    tendermint: info
    tendermint/context: error
  format: JSON

genesis:
  file: /node/etc/genesis.json

consensus:
  tendermint:
    mode: archive

runtime:
  supported:
    - "{{ runtime_id }}"

  paths:
    "{{ runtime_id }}": {{ paratime_binary_path }}

worker:
  storage:
    enabled: true
```

:::warning

Ensure you are using the correct version of oasis-node and the pre-existing state for your specific pre-Eden network.

:::

## Starting the Oasis Node

You can start the node by running the following command:

```bash
oasis-node --config /node/etc/config.yml
```

### Archive node status

:::info

The mode field is currently unavailable in the control status output. It will
be included in an upcoming release.

:::

To ensure the node is running in archive mode, run the following command:

```bash
oasis-node control status -a unix:/node/data/internal.sock
```

Output should report `archive` consensus mode status:

```json
{
  // other fields omitted ...
  "mode": "archive",
  // ...
}
```

## See also

[Archive Web3 Gateway](../web3.mdx#archive-web3-gateway)

[Oasis Core v22.2.12]: https://github.com/oasisprotocol/oasis-core/releases/tag/v22.2.12
[Oasis Core v21.3.14]: https://github.com/oasisprotocol/oasis-core/releases/tag/v21.3.14
