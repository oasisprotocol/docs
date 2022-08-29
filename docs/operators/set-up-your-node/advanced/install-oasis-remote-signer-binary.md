# Install Oasis Remote Signer Binary

:::info

You only need to install the Oasis Remote Signer binary if you intend to configure your Oasis node with a remote signer setup.

An example of such a setup is described in [Using Ledger-backed Consensus Key with a Remote Signer](using-ledger-backed-consensus-key-with-a-remote-signer.md).

:::

The Oasis Remote Signer is a binary that is created from the [Oasis Core](https://github.com/oasisprotocol/oasis-core) repository's [`go/oasis-remote-signer` path](https://github.com/oasisprotocol/oasis-core/tree/master/go/oasis-remote-signer).

It contains the logic for implementing various Oasis Core signers (i.e. Ledger-based signer, file-based signer or a combination of both via composite signer) and a gRPC service through which an Oasis node can connect to it and request signatures from it.

:::caution

The Oasis Remote Signer is currently only supported on x86_64 Linux systems.

:::

## Downloading a Binary Release

:::tip

We suggest that you build Oasis Remote Signer from source yourself for a production deployment of an Oasis node with a remote signer setup.

:::

For convenience, we provide binaries that have been built by the Oasis Protocol Foundation. Links to the binaries are provided in the [Network Parameters](../../mainnet/README.md) page.

## Building From Source

Although highly suggested, building from source is currently beyond the scope of this documentation.

See [Oasis Core's Build Environment Setup and Building](/core/development-setup/build-environment-setup-and-building) documentation for more details.

:::danger

The code in the [`master` branch](https://github.com/oasisprotocol/oasis-core/tree/master/) might be incompatible with the code used by other nodes in the Mainnet.

Make sure to use the version specified in the [Network Parameters](../../mainnet/README.md).

:::

## Adding `oasis-remote-signer` Binary to `PATH`

To install the `oasis-remote-signer` binary for the current user, copy/symlink it to `~/.local/bin`.

To install the `oasis-remote-signer` binary for all users of the system, copy it to `/usr/local/bin`.

