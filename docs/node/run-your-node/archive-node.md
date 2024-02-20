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

Archive node requires a pre-existing oasis-node state.

## Configuration

Archive mode can be enabled by using the `mode` setting.

:::info

This will configure the given node to act as an archive node.

:::

```yaml
# other settings omitted ...
mode: archive
```

:::info

Keep other settings unchanged from the full-node. For example in order to
serve archived runtime state, the node needs to have the runtime configured
and have the state present.

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
