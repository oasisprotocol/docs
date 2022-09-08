# Copy State from One Node to the Other

A network that's been running for some time can accrue significant amount of state. This means  bootstraping a new Oasis Node would take quite some time and resources (bandwidth, CPU) since it would need to fetch (download) and validate (replay) all the blocks from the genesis height onwards.

If one has access to an Oasis Node that is synced with the latest height, he could just copy Oasis Node's state from the synced node to an unsynced node.

:::info

Another way to speed up bootstraping an Oasis Node is to sync the node using [State Sync](sync-node-using-state-sync.md).

:::

To bootstrap a new Oasis Node by copying state from a synced Oasis Node, first set up your new Oasis Node as a [Validator Node](../validator-node/README.md), a [Non-validator Node](../non-validator-node.md) or a [ParaTime Node](../paratime-node.mdx).

:::caution

Make sure you use the **exact same version of Oasis Core** on both the synced Oasis Node and your new Oasis Node to prevent **issues or state corruption** if an Oasis Node's state is opened **with** an **incompatible version** of Oasis Core.

:::

Before starting your new Oasis Node, do the following:

* Stop the synced Oasis Node.

:::danger

If an Oasis Node is **not stopped** before its state is copied, its on-disk state might not be consistent and up-to-date. This can lead to **state corruption** and inability to use the state with your new Oasis Node.

:::

* Copy the following directories from your synced Oasis Node's working directory (e.g. `/node/`, `/srv/oasis/node`, `/serverdir/node`) to your new Oasis Node's working directory:
  * `tendermint/abci-state`
  * `tendermint/data`

:::caution

You could also copy the whole `tendermint` directory from your synced Oasis Node's working directory. In that case, you must **omit** the **`oasis_priv_validator.json` file**, otherwise starting your new Oasis Node with fail with something like:

```
{"caller":"node.go:696","err":"tendermint/crypto: public key mismatch, state corruption?: %!w(<nil>)","level":"error","module":"oasis-node","msg":"failed to initialize tendermint service","ts":"2021-09-25T14:13:17.919296668Z"}
```

:::

* Start back the synced Oasis Node.

Finally, start your new Oasis Node for the first time.
