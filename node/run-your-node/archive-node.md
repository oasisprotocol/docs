# Archive Node

Source: https://docs.oasis.io/node/run-your-node/archive-node

This guide covers setting up an archive node for the Oasis Network.

An archive node serves historical consensus and runtime state that cannot
normally be accessed through other nodes in the network because the state
has been pruned or removed during dump-and-restore network upgrades.
The node does not actively participate in the consensus protocol and has
most of the node features disabled. Archive node does not need to be
registered neither added to an existing entity.

## Snapshots and Version Compatibility

Running an archive node requires historical consensus and runtime state.

You can download a snapshot of a specific network state from
the [Official Oasis Network Snapshots page][snapshots].
The files should be extracted into the right directories within the
node datadir.

For example, if your datadir is defined as `/node/data`
in your node's configuration, the consensus state should be extracted
into the `consensus` directory of the datadir, and the
[Sapphire] Mainnet runtime state should be extracted into the
`runtimes/000000000000000000000000000000000000000000000000f80306c9858e7279`
directory of the datadir.

[snapshots]: https://snapshots.oasis.io

[Sapphire]: https://docs.oasis.io/build/sapphire.md

The following tables outline the version compatibility matrix for running
archive nodes for different network generations. Select which historical
state you want to serve with archive node and download the correct snapshot
and binaries for that state.

### Testnet

| Network Upgrade | Genesis URL                      | Compatible Versions                                                                     | Snapshot URL        |
| --------------- | -------------------------------- | --------------------------------------------------------------------------------------- | ------------------- |
| a0              | [2020-09-15][testnet-2020-09-15] | [Oasis Core v20.10.2]                                                                   | [20200915-20201104] |
| b0              | [2020-11-04][testnet-2020-11-04] | [Oasis Core v20.12.8]                                                                   | [20201104-20210203] |
| [c0]            | [2021-02-03][testnet-2021-02-03] | [Oasis Core v20.12.8]                                                                   | [20210203-20210324] |
| [c1]            | [2021-03-24][testnet-2021-03-24] | [Oasis Core v21.0.2]                                                                    | [20210324-20210413] |
| [c2]            | [2021-04-13][testnet-2021-04-13] | [Oasis Core v21.3.14]                                                                   | [20210413-20220303] |
| [d0]            | [2022-03-03][testnet-2022-03-03] | [Oasis Core v22.2.13][Cipher 2.6.2][Emerald 10.0.0][Sapphire 0.6.4][Web3 Gateway 3.4.0] | [20220303-20231012] |

### Mainnet

| Network Upgrade | Genesis URL                      | Compatible Versions                                                                     | Snapshot URL        |
| --------------- | -------------------------------- | --------------------------------------------------------------------------------------- | ------------------- |
| [Mainnet Beta]  | [2020-10-01][mainnet-2020-10-01] | [Oasis Core v20.10.2]                                                                   | [20201001-20201118] |
| [Mainnet]       | [2020-11-18][mainnet-2020-11-18] | [Oasis Core v20.12.8]                                                                   | [20201118-20210428] |
| [Cobalt]        | [2021-04-28][mainnet-2021-04-28] | [Oasis Core v21.3.14][Cipher 1.0.0][Emerald 7.1.0][Web3 Gateway 1.7.0]                  | [20210428-20220411] |
| [Damask]        | [2022-04-11][mainnet-2022-04-11] | [Oasis Core v22.2.13][Cipher 2.6.2][Emerald 10.0.0][Sapphire 0.6.4][Web3 Gateway 3.4.0] | [20220411-20231129] |

[c0]: https://docs.oasis.io/node/reference/upgrade-logs/testnet.md#2021-03-24-upgrade

[c1]: https://docs.oasis.io/node/reference/upgrade-logs/testnet.md#2021-04-13-upgrade

[c2]: https://docs.oasis.io/node/reference/upgrade-logs/testnet.md#2021-06-23-upgrade

[d0]: https://docs.oasis.io/node/reference/upgrade-logs/testnet.md#2022-03-03-upgrade

[Damask]: https://docs.oasis.io/node/reference/upgrade-logs/mainnet.md#damask-upgrade

[Cobalt]: https://docs.oasis.io/node/reference/upgrade-logs/mainnet.md#cobalt-upgrade

[Mainnet]: https://docs.oasis.io/node/reference/upgrade-logs/mainnet.md#mainnet-upgrade

[Mainnet Beta]: https://docs.oasis.io/node/reference/upgrade-logs/mainnet.md#mainnet-beta-upgrade

[testnet-2020-09-15]: https://github.com/oasisprotocol/testnet-artifacts/releases/2020-09-15

[testnet-2020-11-04]: https://github.com/oasisprotocol/testnet-artifacts/releases/2020-11-04

[testnet-2021-02-03]: https://github.com/oasisprotocol/testnet-artifacts/releases/2021-02-03

[testnet-2021-03-24]: https://github.com/oasisprotocol/testnet-artifacts/releases/2021-03-24

[testnet-2021-04-13]: https://github.com/oasisprotocol/testnet-artifacts/releases/2021-04-13

[testnet-2022-03-03]: https://github.com/oasisprotocol/testnet-artifacts/releases/2022-03-03

[mainnet-2020-10-01]: https://github.com/oasisprotocol/mainnet-artifacts/releases/2020-10-01

[mainnet-2020-11-18]: https://github.com/oasisprotocol/mainnet-artifacts/releases/2020-11-18

[mainnet-2021-04-28]: https://github.com/oasisprotocol/mainnet-artifacts/releases/2021-04-28

[mainnet-2022-04-11]: https://github.com/oasisprotocol/mainnet-artifacts/releases/2022-04-11

[Oasis Core v20.10.2]: https://github.com/oasisprotocol/oasis-core/releases/tag/v20.10.2

[Oasis Core v20.12.8]: https://github.com/oasisprotocol/oasis-core/releases/tag/v20.12.8

[Oasis Core v21.0.2]: https://github.com/oasisprotocol/oasis-core/releases/tag/v21.0.2

[Oasis Core v21.3.14]: https://github.com/oasisprotocol/oasis-core/releases/tag/v21.3.14

[Oasis Core v22.2.13]: https://github.com/oasisprotocol/oasis-core/releases/tag/v22.2.13

[Cipher 1.0.0]: https://github.com/oasisprotocol/cipher-paratime/releases/tag/v1.0.0

[Cipher 2.6.2]: https://github.com/oasisprotocol/cipher-paratime/releases/tag/v2.6.2

[Emerald 7.1.0]: https://github.com/oasisprotocol/emerald-paratime/releases/tag/v7.1.0

[Emerald 10.0.0]: https://github.com/oasisprotocol/emerald-paratime/releases/tag/v10.0.0

[Sapphire 0.6.4]: https://github.com/oasisprotocol/sapphire-paratime/releases/tag/v0.6.4

[Web3 Gateway 1.7.0]: https://github.com/oasisprotocol/oasis-web3-gateway/releases/tag/1.7.0

[Web3 Gateway 3.4.0]: https://github.com/oasisprotocol/oasis-web3-gateway/releases/tag/3.4.0

[20200915-20201104]: https://snapshots.oasis.io/#node/testnet/20200915-20201104/

[20201104-20210203]: https://snapshots.oasis.io/#node/testnet/20201104-20210203/

[20210203-20210324]: https://snapshots.oasis.io/#node/testnet/20210203-20210324/

[20210324-20210413]: https://snapshots.oasis.io/#node/testnet/20210324-20210413/

[20210413-20220303]: https://snapshots.oasis.io/#node/testnet/20210413-20220303/

[20220303-20231012]: https://snapshots.oasis.io/#node/testnet/20220303-20231012/

[20201001-20201118]: https://snapshots.oasis.io/#node/mainnet/20201001-20201118/

[20201118-20210428]: https://snapshots.oasis.io/#node/mainnet/20201118-20210428/

[20210428-20220411]: https://snapshots.oasis.io/#node/mainnet/20210428-20220411/

[20220411-20231129]: https://snapshots.oasis.io/#node/mainnet/20220411-20231129/

## Prerequisites

Before continuing, make sure you've followed the [Prerequisites](https://docs.oasis.io/node/run-your-node/prerequisites.md)
and [Run a Non-validator Node](https://docs.oasis.io/node/run-your-node/non-validator-node.md) sections and have:

* Oasis Node binary installed and configured on your system.
* The chosen top-level `/node` working directory prepared. In addition to `etc` and `data` directories, also prepare the following directories:
  * `bin`: This will store binaries needed by Oasis Node for running the ParaTimes.
  * `runtimes`: This will store the ParaTime bundles.
* Genesis file copied to `/node/etc/genesis.json`.
* Historical state from the snapshot downloaded and extracted into the right directories within the `/node/data` directory:
  * `consensus` for the consensus state.
  * `runtimes/<runtime_id>` for the runtime state of a specific ParaTime.

## Configuration

Archive nodes can be configured with different historical state
depending on the version of Oasis Core being used.

### Oasis Core 23 and later

Starting from the Oasis Core version 23, the configuration for enabling archive mode has changed.
Use the `mode` setting:

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

Keep all other settings the same as those for a full client node. For example, to serve archived runtime
state, the node needs to have the runtime configured and the state present.

### Oasis Core 22 and earlier

For all pre-Eden networks, such as Damask, the configuration remains the same but requires the
appropriate version of `oasis-node` and the node state.

#### Damask

To run an archive node for Damask, use [Oasis Core v22.2.13] and the following
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

## Starting the Oasis Node

You can start the node by running the following command:

```bash
oasis-node --config /node/etc/config.yml
```

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

[Archive Web3 Gateway](https://docs.oasis.io/node/web3.md#archive-web3-gateway)

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
