# Wiping Node State

In certain situations, you may need to do a complete node redeployment with a
clean state. Two common scenarios for this are during a breaking network upgrade
or in cases of severe data corruption. If you need to wipe your node due to
severe corruption, it's important to note that your node will need some time to
catch up with the rest of the network.

The following instructions are based on the assumption that you have defined
your `datadir` as `/node/data` in your node's configuration.

## State Wipe and Keep Node Identity

:::info

Note that by default, the `--preserve.mkvs_database` flag is set to true,
preserving the runtime/paratime state.

:::

To wipe consensus state while preserving the runtime/paratime state follow
these instructions:

1. Stop the `oasis-node` server process (this will depend on your own deployment
setup).
2. Remove consensus state using the `oasis-node unsafe-reset` command:

    ```bash
    # Do a dry run first to see which files will get deleted.
    oasis-node unsafe-reset \
      --datadir=/node/data \
      --dry_run
      
    # Delete.
    oasis-node unsafe-reset \
      --datadir /node/data
    ```
3. Start the `oasis-node` server process.

:::info

`oasis-node` is very strict regarding the ownership of the files. If you
encounter the following error:

```
common/Mkdir: path '/node/data' has invalid owner: 1000. Expected owner: 0
```

you need to run the `oasis-node` command as the exact user that owns the files,
e.g.:

```
sudo --user=#1000 -- oasis-node unsafe-reset --datadir=/node/data --dry_run --log.level info
```

:::

## Full State Wipe

:::danger

This is likely not what you want to do. This is destructive and will result in
losing private state required to operate the given node. **USE AT YOUR OWN
RISK.** A full state wipe will also mean that you'll need to generate a new node
identity (or copy the old one).

:::

To perform a full state wipe follow these steps:

1. Stop the `oasis-node` server process (this will depend on your own deployment
setup)
2. Remove the `/node/data` directory.
3. Redeploy your node. You'll need to copy your Node artifacts or create brand
new ones.
