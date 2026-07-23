# Pruning State

To reduce hardware requirements and improve the overall latency of the node,
operators are encouraged to prune their state (unless also serving historical
state).

As explained in the [Late Pruning](#late-pruning) section, ideally pruning
should be configured from the start, i.e. late changes to the pruning configuration
may not be optimal for the node's health.

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

## Suggested Pruning Configuration


For normal node operation, for both consensus and ParaTime pruning, the minimum is
`n=250_000`. However, it is recommended to set it to `n=400_000`. Assuming blocks
are produced every 6 seconds, the latter corresponds to preserving 1 month of the data.

Operators that are not resource-restrained and want to contribute to the overall
network health are encouraged to set `n=5_000_000` (approximately 1 year of data).


## Late Pruning

Due to the [LSM Tree][] design of the underlying databases, enabling pruning after
your node has been running for a while, or changing configuration to retain less data,
may not work as expected.

To change pruning configuration operators must follow this steps:

1. Gracefuly shutdown the node (validators should take [special care][graceful shutdown]).
2. Configure pruning as described in the [Consensus Pruning](#consensus-pruning)
   or [ParaTime Pruning](#paratime-pruning) section above.
3. Run offline [pruning command].
4. Run the [compaction command].
5. Start the node again.

[LSM tree]: https://en.wikipedia.org/wiki/Log-structured_merge-tree
[graceful shutdown]: ../maintenance/shutting-down-a-node.md
[pruning command]: https://github.com/oasisprotocol/oasis-core/blob/master/docs/oasis-node/cli.md#prune
[compaction command]: https://github.com/oasisprotocol/oasis-core/blob/master/docs/oasis-node/cli.md#compact
