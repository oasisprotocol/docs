# Pruning State

Source: https://docs.oasis.io/node/run-your-node/advanced/pruning

To reduce hardware requirements and improve the overall latency of the node,
operators are encouraged to prune their state (unless also serving historical
state).

As will be explained in the following sections, pruning should be configured from
the start, i.e. late changes to the pruning configuration may not be optimal for
the node's health.

## Consensus Pruning

To configure pruning of the consensus data amend your node's configuration with:

```yaml
# ... sections not relevant are omitted ...
consensus:
    # ... sections not relevant are omitted ...
    prune:
        strategy: "keep_n"
        num_kept:  <n>
```

where `<n>` is the number of blocks and state versions that will be kept.

### Suggested Pruning Configuration

For normal node operation, the minimum requirements is `n=250_000`. However,
it is recommended to set it to `n=400_000`. Assuming blocks are produced every 6
seconds, the latter corresponds to preserving 1 month of the consensus data.

Operators that are not resource-restrained and want to contribute to the overall
network health are encouraged to set `n=5_000_000` (approximately 1 year of data).

### Late Pruning

Due to the [LSM Tree][] design of the underlying databases, enabling pruning after
your node has been running for a while, or changing configuration to retain less data,
may not work as expected.

To change pruning configuration operators must follow this steps:

1. Gracefuly shutdown the node (validators should take [special care][graceful shutdown]).
2. Configure pruning as described in the [Consensus Pruning](#consensus-pruning) section above.
3. Run offline [pruning command].
4. Run the [compaction command].
5. Start the node again.

[LSM tree]: https://en.wikipedia.org/wiki/Log-structured_merge-tree

[graceful shutdown]: https://docs.oasis.io/node/run-your-node/maintenance/shutting-down-a-node.md

[pruning command]: https://docs.oasis.io/core/oasis-node/cli.md#prune-experimental

[compaction command]: https://docs.oasis.io/core/oasis-node/cli.md#compact-experimental

## ParaTime Pruning

To configure pruning of the ParaTime data amend your node's configuration with:

```yaml
# ... sections not relevant are omitted ...
runtime:
    # ... sections not relevant are omitted ...
    prune:
        strategy: "keep_last"
        num_kept:  <n>
```

where `<n>` is the number of ParaTime's state versions that will be kept.

### Suggested Pruning Configuration

ParaTime state is much larger than the consensus state. As a consequence, as the
number of versions in the state database grows, pruning becomes slower and slower.
For this reason **ParaTime state pruning must be configured
from the start or not configured at all**.

To configure ParaTime pruning it is recommended to set `n=250_000`. The maximum value is
`n=400_000`. If you need to preserve more data (e.g. nodes serving historical
state) you will have to keep the entire ParaTime's state from the genesis.

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
