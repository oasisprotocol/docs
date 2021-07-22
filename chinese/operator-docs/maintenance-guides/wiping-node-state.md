# Wiping Node State

In some cases you might want \(or need\) to do a full redeploy with clean state before deploying a new version of the network. This should never actually be used during a Mainnet unless there is some serious corruption, but your node will have to spend time catching up to the rest of the network.

The following instructions assume that your `datadir` is defined as `/serverdir/node` in your node's config.

## State Wipe and Keep Node Identity

1. Stop the `oasis-node` server process \(this will depend on your own deployment setup\).
2. Remove blockchain state using the `oasis-node unsafe-reset` command:

   ```bash
   # Do a dry run first to see which files will get deleted.
   oasis-node unsafe-reset --datadir=/serverdir/node --dry_run --log.level info
   # Delete.
   oasis-node unsafe-reset --datadir /serverdir/node --log.level info
   ```

3. Start the oasis-node server process.

{% hint style="info" %}
`oasis-node` is very strict regarding the ownership of the files. If you encounter the following error:

```text
common/Mkdir: path '/serverdir/node' has invalid owner: 1000. Expected owner: 0
```

you need to run the `oasis-node` command as the exact user that owns the files, e.g.:

```text
sudo --user=#1000 -- oasis-node unsafe-reset --datadir=/serverdir/node --dry_run --log.level info
```
{% endhint %}

## Full State Wipe

{% hint style="danger" %}
This is likely not what you want to do. This is destructive and might result in losing private state required to operate the given node. **USE AT YOUR OWN RISK.**
{% endhint %}

A full state wipe will also mean that you'll need to generate a new node identity \(or copy the old one\).

1. Stop the `oasis-node` server process \(this will depend on your own deployment setup\)
2. Remove the the `/serverdir/node` directory.
3. Redeploy your node. You'll need to copy your Node artifacts or create brand new ones.

