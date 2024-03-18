# Install the Oasis Node

The Oasis node is a binary that is created from the [Oasis Core] repository's
[`go/`] directory. It is a single executable that contains the logic for running
your node in various [roles]. 

:::caution

The Oasis Node is currently only supported on x86_64 Linux systems.

:::

[Oasis Core]: https://github.com/oasisprotocol/oasis-core
[`go/`]: https://github.com/oasisprotocol/oasis-core/tree/master/go
[roles]: ../../README.mdx#validator-and-paratime-nodes

## Set up the Oasis Node's Working Directory

Before we install the Oasis node we need to ensure that we have a place to
store necessary files.

:::info

We will reference the working directory on the server as `/node`
throughout the documentation.

:::

### Setting Up the `/node` Directory

In the `/node` directory, create the following subdirectories:

* `etc/`: this is to store the configuration and `entity.json`
* `data/`: this is to store the node's data
* `bin/`: this is to store the `oasis-node` binary
* `runtimes/`: this is to store the ParaTime `.orc` bundles

You can make this directory structure with the **corresponding permissions** by
executing the following command:

```shell
mkdir -m700 -p /node/{etc,bin,runtimes,data}
```

### Copying the Genesis File to the server

The latest Genesis file can be found in the Network Parameters page ([Mainnet],
[Testnet]). You should download the latest `genesis.json` file and
copy it to `/node/etc/genesis.json` on the `server`.

[Mainnet]: ../../mainnet/README.md
[Testnet]: ../../testnet/README.md

## Obtain the `oasis-node` Binary

### Downloading a Binary Release

For convenience, we provide binaries that have been built by the Oasis Protocol
Foundation. Links to the binaries are provided in the Network Parameters page
([Mainnet], [Testnet]).

[Mainnet]: ../../mainnet/README.md
[Testnet]: ../../testnet/README.md

### Building From Source

Although highly suggested, building from source is currently beyond the scope of
this documentation.

See [Oasis Core's Build Environment Setup and Building][oasis-core-build]
documentation for more details.

:::caution

The code in the current [`master`] branch may be incompatible with the code used
by other nodes on the network. Make sure to use the version specified on the
Network Parameters page ([Mainnet], [Testnet]).

:::

[oasis-core-build]: ../../../core/development-setup/build-environment-setup-and-building
[`master`]: https://github.com/oasisprotocol/oasis-core/tree/master/

### Adding `oasis-node` Binary to `PATH`

To install the `oasis-node` binary next to your Oasis node data directory,
copy/symlink it to e.g. `/node/bin`.

To install the `oasis-node` binary for the current user, copy/symlink it to
`~/.local/bin`.

To install the `oasis-node` binary for all users of the system, copy it to
`/usr/local/bin`.

## Running ParaTimes

If you intend to [run a ParaTime node](../paratime-node.mdx) you will need to
additionally install the following software packages:

* [Bubblewrap](https://github.com/projectatomic/bubblewrap) 0.4.1+, needed for
  creating process sandboxes.

  On Ubuntu 20.04+, you can install it with:

  ```shell
  sudo apt install bubblewrap
  ```

  On Fedora, you can install it with:

  ```shell
  sudo dnf install bubblewrap
  ```

