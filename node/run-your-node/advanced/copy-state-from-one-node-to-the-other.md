# Copy State from One Node to the Other

Source: https://docs.oasis.io/node/run-your-node/advanced/copy-state-from-one-node-to-the-other

A network that's been running for some time can accrue significant amount of
state. This means  bootstrapping a new Oasis node would take quite some time and
resources (bandwidth, CPU) since it would need to fetch (download) and validate
(replay) all the blocks from the genesis height onwards.

If one has access to an Oasis node that is synced with the latest height, he
could just copy Oasis node's state from the synced node to an unsynced node.

**Info**:

Another way to speed up bootstrapping an Oasis node is to sync the node using
the [State Sync](https://docs.oasis.io/node/run-your-node/advanced/sync-node-using-state-sync.md).

To bootstrap a new Oasis node by copying state from a synced Oasis node, first
set up your new Oasis node as a [Validator Node](https://docs.oasis.io/node/run-your-node/validator-node.md), a
[Non-validator Node](https://docs.oasis.io/node/run-your-node/non-validator-node.md) or a
[ParaTime Node](https://docs.oasis.io/node/run-your-node/paratime-node.md).

**Caution**:

Make sure you use the **exact same version of Oasis Core** on both the synced
Oasis node and your new Oasis node to prevent **issues or state corruption** if
an Oasis node's state is opened **with an incompatible version** of Oasis
Core.

Before starting your new Oasis node, do the following:

1. Stop the synced Oasis node.

   **Danger**:

   If an Oasis node is **not stopped** before its state is copied, its on-disk
   state might not be consistent and up-to-date. This can lead to **state
   corruption** and inability to use the state with your new Oasis node.

2. Copy the following directories from your synced Oasis node's **data
   directory** (e.g. `/node/data`) to your new Oasis node's data directory:

   * `consensus/state`
   * `consensus/data`

   **Caution**:

   You could also copy the whole `consensus` directory from your synced Oasis
   node's working directory. In that case, you must **omit** the
   **`oasis_priv_validator.json` file**, otherwise starting your new Oasis node
   with fail with something like:

   ```json
   {"caller":"node.go:541","err":"cometbft/crypto: public key mismatch, state corruption?: %!w(<nil>)","level":"error","module":"oasis-node","msg":"failed to initialize cometbft service","ts":"2023-11-25T14:13:17.919296668Z"}
   ```

   **Caution**:

   If you are copying data from a node that is running [TEE-enabled ParaTimes],
   you must make sure to **remove** the `runtimes/*/worker-local-storage.badger.db`
   as otherwise the ParaTime binary may fail to start on a different node since
   it contains data sealed to the source CPU.

3. Start back the synced Oasis node.

Finally, you can start your new Oasis node for the first time.

[TEE-enabled ParaTimes]: https://docs.oasis.io/node/run-your-node/prerequisites/set-up-tee.md

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
