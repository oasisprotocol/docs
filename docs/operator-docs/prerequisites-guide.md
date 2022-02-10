# Prerequisites Guide

## Installing/Using oasis-node

Any time the `oasis-node` binary is referenced, we are referring to the binary that is created from the [Oasis Core](https://github.com/oasisprotocol/oasis-core) repository's `go/` path. This binary contains both the logic for running an Oasis node and also provides a CLI for handling registry and staking operations.

### Downloading the binary

{% hint style="success" %}
We suggest that you build `oasis-node` from source yourself for a production deployment.
{% endhint %}

For convenience, we provide binaries that have been built by the Oasis Protocol Foundation. Links to the binaries are provided in the [Current Testnet Parameters](../networks/amber-network/current-parameters.md) page.

### Building from source

Although highly suggested, building from source is currently beyond the scope of this documentation. See Oasis Core's building instructions for details.

{% hint style="danger" %}
The code in the [`master` branch](https://github.com/oasisprotocol/oasis-core/tree/master/) might be incompatible with the code used by other nodes in the Public Testnet.

Make sure to use the version specified in the [Current Testnet Parameters](../networks/amber-network/current-parameters.md).
{% endhint %}

