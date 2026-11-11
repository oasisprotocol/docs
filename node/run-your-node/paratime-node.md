# ParaTime Node

Source: https://docs.oasis.io/node/run-your-node/paratime-node

**Caution**:

For a production setup, we recommend running the ParaTime compute/storage node separately from the validator node (if you run one).

Running ParaTime and validator nodes as separate Oasis nodes will prevent configuration mistakes and/or (security) issues affecting one node type from affecting the other one.

**Tip**:

If you are looking for some concrete ParaTimes that you can run, see [the list of ParaTimes and their parameters](https://docs.oasis.io/get-involved/run-node/paratime-node.md).

**Tip**:

Oasis Core refers to ParaTimes as runtimes internally, so all configuration options will have runtime in their name.

This guide will cover setting up your ParaTime compute node for the Oasis Network. This guide assumes some basic knowledge on the use of command line tools.

## Prerequisites

Before following this guide, make sure you've followed the [Prerequisites](https://docs.oasis.io/node/run-your-node/prerequisites.md) and [Run a Non-validator Node](https://docs.oasis.io/node/run-your-node/non-validator-node.md) sections and have:

* Oasis Node binary installed and configured on your system.
* The chosen top-level `/node/` working directory prepared. In addition to `etc` and `data` directories, also prepare the following directories:
  * `bin`: This will store binaries needed by Oasis Node for running the ParaTimes.
  * `runtimes`: This will store the ParaTime bundles.

**Tip**:

Feel free to name your working directory as you wish, e.g. `/srv/oasis/`.

Just make sure to use the correct working directory path in the instructions below.

* Genesis file copied to `/node/etc/genesis.json`.

**Tip**:

Reading the rest of the [validator node setup instructions](https://docs.oasis.io/node/run-your-node/validator-node.md) may also be useful.

**Info**:

To speed up bootstrapping your new node, we recommend [copying node's state from your existing node](https://docs.oasis.io/node/run-your-node/advanced/copy-state-from-one-node-to-the-other.md) or [syncing it using state sync](https://docs.oasis.io/node/run-your-node/advanced/sync-node-using-state-sync.md).

### Stake Requirements

To be able to register as a ParaTime node on the Oasis Network, you need to
have enough tokens staked in your entity's escrow account.

Current minimum staking requirements for a specific ParaTime are listed on the
[Stake Requirements] page. Should you want to check the staking requirements
for other node roles and registered ParaTimes manually, use the Oasis CLI tools
as described in [Common Staking Info].

Finally, to stake the tokens, use our [Oasis CLI tools]. If everything was set
up correctly, you should see something like below when running [`oasis account
show`] command for your entity's account (this is an example for
Testnet):

```shell
oasis account show oasis1qrec770vrek0a9a5lcrv0zvt22504k68svq7kzve --show-delegations
```

```
Address: oasis1qrec770vrek0a9a5lcrv0zvt22504k68svq7kzve
Nonce: 33

=== CONSENSUS LAYER (testnet) ===
  Total: 972.898210067 TEST
  Available: 951.169098086 TEST

  Active Delegations from this Account:
    Total: 16.296833986 TEST

    Delegations:
      - To:     oasis1qz2tg4hsatlxfaf8yut9gxgv8990ujaz4sldgmzx
        Amount: 16.296833986 TEST (15000000000 shares)
  Debonding Delegations from this Account:
    Total: 5.432277995 TEST

    Delegations:
      - To:       oasis1qz2tg4hsatlxfaf8yut9gxgv8990ujaz4sldgmzx
        Amount:   5.432277995 TEST (5432277995 shares)
        End Time: epoch 26558

  Allowances for this Account:
    Total: 269.5000002 TEST
    Allowances:
      - Beneficiary: oasis1qqczuf3x6glkgjuf0xgtcpjjw95r3crf7y2323xd
        Amount:      269.5 TEST
      - Beneficiary: oasis1qrydpazemvuwtnp3efm7vmfvg3tde044qg6cxwzx
        Amount:      0.0000002 TEST

=== sapphire PARATIME ===
Balances for all denominations:
  6.9995378 TEST
```

**Caution**:

The stake requirements may differ from ParaTime to ParaTime and are subject to
change in the future.

[Stake Requirements]: https://docs.oasis.io/node/run-your-node/prerequisites/stake-requirements.md

[Common Staking Info]: https://docs.oasis.io/build/tools/cli/network.md#show-native-token

[Oasis CLI tools]: https://docs.oasis.io/build/tools/cli/account.md#delegate

[`oasis account show`]: https://docs.oasis.io/build/tools/cli/account.md#show

### Register a New Entity or Update Your Entity Registration

**Danger**:

Everything in this section should be done on the `localhost` as there are
sensitive items that will be created.

1. If you don't have an entity yet, create a new one by following the
   [Initialize Entity] instructions for validators.

2. If you will be running the ParaTime on a new Oasis node, also initialize a
   new node by following the [Starting the Oasis Node] instructions for
   validators.

3. Now, [list your node ID] in the entity descriptor file `nodes` field.

4. [Register] the updated entity descriptor.

**Tip**:

You will [configure the node](#configuration) to automatically
register for the roles it has enabled (i.e. storage and compute roles) via the
`worker.registration.entity` configuration flag.

No manual node registration is necessary.

**Info**:

ParaTime rewards for running the compute node will be sent to your entity
address **inside the ParaTime**. To access the rewards on the consensus layer,
you will need to withdraw them first. Use the [`oasis account withdraw`]
command, for example:

```shell
oasis account withdraw 10
```

[Initialize Entity]: https://docs.oasis.io/node/run-your-node/validator-node.md#initialize-entity

[Starting the Oasis Node]: https://docs.oasis.io/node/run-your-node/validator-node.md#starting-the-oasis-node

[list your node ID]: https://docs.oasis.io/node/run-your-node/validator-node.md#add-your-node-id-to-the-entity-descriptor

[Register]: https://docs.oasis.io/node/run-your-node/validator-node.md#entity-registration

[`oasis account withdraw`]: https://docs.oasis.io/build/tools/cli/account.md#withdraw

### Install Oasis Core Runtime Loader

For ParaTimes running inside [Intel SGX trusted execution environment](https://docs.oasis.io/node/run-your-node/paratime-node.md#setting-up-trusted-execution-environment-tee), you will need to install the Oasis Core Runtime Loader.

The Oasis Core Runtime Loader binary (`oasis-core-runtime-loader`) is part of Oasis Core binary releases, so make sure you download the appropriate version specified the Network Parameters page ([Mainnet], [Testnet]).

Install it to `bin` subdirectory of your node's working directory, e.g. `/node/bin/oasis-core-runtime-loader`.

[Mainnet]: https://docs.oasis.io/node/network/mainnet.md

[Testnet]: https://docs.oasis.io/node/network/testnet.md

### Install Bubblewrap Sandbox (at least version 0.3.3)

ParaTime compute nodes execute ParaTime binaries inside a sandboxed environment
provided by [Bubblewrap](https://github.com/containers/bubblewrap). In order to
install it, please follow these instructions, depending on your distribution. Also
note that in case your platform is using AppArmor, you may need to update the
policy (see [AppArmor profiles](https://docs.oasis.io/node/run-your-node/prerequisites/system-configuration.md#apparmor-profiles)).

**Tab**: Ubuntu 18.10+

```bash
sudo apt install bubblewrap
```

**Tab**: Fedora

```bash
sudo dnf install bubblewrap
```

**Tab**: Other Distributions

On other systems, you can download the latest [source release provided by the Bubblewrap project](https://github.com/containers/bubblewrap/releases) and build it yourself.

Make sure you have the necessary development tools installed on your system and the `libcap` development headers. On Ubuntu, you can install them with:

```bash
sudo apt install build-essential libcap-dev
```

After obtaining the Bubblewrap source tarball, e.g. [bubblewrap-0.4.1.tar.xz](https://github.com/containers/bubblewrap/releases/download/v0.4.1/bubblewrap-0.4.1.tar.xz), run:

```bash
tar -xf bubblewrap-0.4.1.tar.xz
cd bubblewrap-0.4.1
./configure --prefix=/usr
make
sudo make install
```

**Caution**:

Note that Oasis Node expects Bubblewrap to be installed under `/usr/bin/bwrap` by default.

Ensure you have a new enough version by running:

```
bwrap --version
```

**Caution**:

Ubuntu 18.04 LTS (and earlier) provide overly-old `bubblewrap`. Follow *Other Distributions* section on those systems.

### Setting up Trusted Execution Environment (TEE)

If a ParaTime requires the use of a TEE, then make sure you set up TEE as instructed in the [Set up trusted execution environment (TEE)](https://docs.oasis.io/node/run-your-node/prerequisites/set-up-tee.md) doc.

## Configuration

You can configure a ParaTime in two ways. If the ParaTime supports hot-loading,
use [Hot-loading ParaTime Bundle Installation](#hot-loading). Otherwise, use
[Manual Bundle Installation](#manual-bundle-installation). Sapphire and Cipher
ParaTimes support hot-loading installation, allowing bundles to be dynamically
downloaded using the metadata from the [Oasis Bundle Registry]. For Emerald and
other ParaTimes, that don't support hot-loading you have to configure the node
manually.

### Hot-loading

In order to configure the node with ParaTimes that support hot-loading, create
the `/node/etc/config.yml` file with the following content:

```yaml
mode: compute
common:
    data_dir: /node/data
    log:
        format: JSON
        level:
            cometbft: info
            cometbft/context: error
            default: info

consensus:
    # The external IP that is used when registering this node to the network.
    # NOTE: If you are using the Sentry node setup, this option should be
    # omitted.
    external_address: tcp://{{ external_address }}:26656
    listen_address: tcp://0.0.0.0:26656

genesis:
    file: /node/etc/genesis.json

p2p:
    # External P2P configuration.
    port: 9200
    registration:
        addresses:
            # The external IP that is used when registering this node to the
            # network.
            - {{ external_address }}:9200
    seeds:
        # List of seed nodes to connect to.
        # NOTE: You can add additional seed nodes to this list if you want.
        - {{ seed_node_address }}

registration:
    # In order for the node to register itself, the entity ID must be set.
    entity_id: {{ entity_id }}

runtime:
    # Configuration for all ParaTimes with hot-loading support
    # (e.g., Sapphire, Cipher)
    runtimes:
        - id: {{ runtime_identifier }}
        # List additional ParaTimes here.
    # The following section is required if at least one ParaTime is running
    # inside the Intel SGX Trusted Execution Environment.
    sgx_loader: /node/bin/oasis-core-runtime-loader
```

Before using the configuration, replace the following variables:

* `{{ external_address }}`: The external IP you used when registering this node.
* `{{ seed_node_address }}`: The seed node address in the form `ID@IP:port`.
  * You can find the current Oasis Seed Node address in the Network Parameters page ([Mainnet], [Testnet]).
* `{{ entity_id }}`: The node's entity ID from the `entity.json` file.
* `{{ runtime_identifier }}`: You can find the runtime identifier in the Network Parameters page ([Mainnet], [Testnet]).

**Caution**:

Make sure the `consensus` port (default: `26656`) and `p2p.port` (default: `9200`) are exposed and publicly
accessible on the internet (for `TCP` and `UDP` traffic).

#### Custom Bundle Registry

If you want to download bundles using a registry other than the
[Oasis Bundle Registry], add the URL of your desired registry to the runtime
configuration.

```
# ... sections not relevant are omitted ...
runtime:
    runtimes:
        - id: {{ runtime_identifier }}
        # Custom registries for all ParaTimes
        registries:
            - {{ url_to_registry }}
```

Before using the configuration, replace the following variables:

* `{{ runtime_identifier }}`: You can find the runtime identifier in the Network
  Parameters page ([Mainnet], [Testnet]).
* `{{ url_to_registry }}`: Url to your custom registry. The registry must ensure
  that all metadata files are accessible through a bundle registry URL, as
  metadata URLs are formed by appending the metadata file name, i.e. the bundle
  checksum, to this URL. Therefore, the bundle registry URL doesn't need to be
  valid endpoint, only the constructed metadata URLs need to be valid.
  For more information, see [ADR-25].

[ADR-25]: https://docs.oasis.io/adrs/0025-bundle_hot_loading.md

[Oasis Bundle Registry]: https://github.com/oasisprotocol/bundle-registry

## Starting the Oasis Node

You can start the node by running the following command:

```bash
oasis-node --config /node/etc/config.yml
```

## Checking Node Status

To ensure that your node is properly connected with the network, you can run the following command after the node has started:

```bash
oasis-node control status -a unix:/node/data/internal.sock
```

## Troubleshooting

See the general [Node troubleshooting](https://docs.oasis.io/node/run-your-node/troubleshooting.md) and [Set up TEE troubleshooting](https://docs.oasis.io/node/run-your-node/prerequisites/set-up-tee.md#troubleshooting) sections before proceeding with ParaTime node-specific troubleshooting.

### Too Old Bubblewrap Version

Double check your installed `bubblewrap` version, and ensure is at least of version **0.3.3**. For details see the [Install Bubblewrap Sandbox](#install-bubblewrap-sandbox-at-least-version-033) section.

### Bubblewrap Sandbox Fails to Start

If the environment in which you are running the ParaTime node applies too restricted Seccomp or AppArmor profiles, the Bubblewrap sandbox that isolates each runtime may fail to start. In the logs you will see how the runtime attempts to restart, but fails with an `bwrap` error, like:

```json
{"level":"warn","module":"runtime","msg":"bwrap: Failed to mount tmpfs: Permission denied","runtime_id":"000000000000000000000000000000000000000000000000f80306c9858e7279","runtime_name":"sapphire-paratime","ts":"2023-03-06T10:08:51.983330021Z"}
```

or a sandbox error, like:

```json
{"caller":"host.go:495","err":"failed to spawn sandbox: sandbox: failed to copy bound data to sandbox: write |1: i/o timeout","level":"error","module":"runtime/host/sgx","msg":"failed to start runtime","runtime_id":"000000000000000000000000000000000000000000000000f80306c9858e7279","ts":"2025-12-16T22:40:58.109093494Z"}
```

In case of `bwrap` issues you need to adjust your Seccomp or AppArmor profiles to support Bubblewrap sandboxes. In Docker you can set or disable Seccomp and AppArmor profiles with parameters:

```
  --security-opt apparmor=unconfined \
  --security-opt seccomp=unconfined \
```

You can also configure an [AppArmor profile for Bubblewrap](https://docs.oasis.io/node/run-your-node/prerequisites/system-configuration.md#apparmor-profiles).

### Bubblewrap Fails to Create Temporary Directory

If the `/tmp` directory is not writable by the user running the node, the
Bubblewrap sandbox may fail to start the ParaTimes. In the logs you will see
errors about creating a temporary directory, like:

```json
{"caller":"sandbox.go:546","err":"failed to create temporary directory: mkdir /tmp/oasis-runtime1152692396: read-only file system","level":"error","module":"runtime/host/sandbox","msg":"failed to start runtime","runtime_id":"000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c","ts":"2023-11-09T14:08:50.554629545Z"}
```

The node might report in the status field that a runtime has not been
provisioned yet, like:

```
oasis-node control status -a unix:/node/data/internal.sock | grep status
        "status": "waiting for hosted runtime provision",
```

This can happen, for example, in Kubernetes, when the `readOnlyRootFilesystem`
setting in a Pod or container security context is set to `true`.

To resolve the issue, please make sure that the `/tmp` directory is writable by
the user running the node. If you are running the node in Kubernetes, you can
set the `readOnlyRootFilesystem` setting to `false`, or better yet, mount a
dedicated volume into `/tmp`. It can be very small in size, e.g., `1 MiB` is
enough.

### Stake Requirement

Double check your node entity satisfies the staking requirements for a ParaTime node. For details see the [Stake Requirements](https://docs.oasis.io/node/run-your-node/paratime-node.md#stake-requirements) section.

### Enclave panicked

If there is a misconfiguration in the prerequisite [BIOS settings], you can see an error in the logs reporting a
problem when running SGX enclaves.

```json
{"component":"ronl","level":"warn","module":"runtime","msg":"runtime execution failed: Enclave panicked: Enclave triggered exception: SgxEnclaveRun { function: EResume, exception_vector: 6, exception_error_code: 0, exception_addr: 0x0 }","runtime_id":"000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c","runtime_name":"sapphire-paratime","ts":"2024-06-03T11:00:43.417403299Z"}
```

For example, this can happen if you forget to configure AES instruction set (i.e. the `CPU AES: ENABLE` BIOS setting).
To see if your system supports AES instruction set in the CPU run:

```bash
 cpuid -1  | grep "AES"
```

and look for the following line:

```
AES instruction                         = true
```

If the AES instruction is set to `false`, you need to reconfigure you BIOS and set it to `true`.
You can do similar inspection for other [BIOS settings].

**Tip**:

You can use the [attestation tool] (at least version 0.3.4) that also checks if the AES instruction set is available.

[BIOS settings]: https://docs.oasis.io/node/run-your-node/prerequisites/set-up-tee.md#sgx-bios-configuration

[attestation tool]: https://github.com/oasisprotocol/tools/tree/main/attestation-tool#readme

## Advanced

### Manual Bundle Installation

The ParaTime bundle needs to be obtained from a trusted source. The bundle
(usually with an `.orc` extension that stands for Oasis Runtime Container)
contains all the needed ParaTime binaries together with the identifier and
version metadata to ease deployment.

When the ParaTime is running in a trusted execution environment (TEE) the bundle
will also contain all the required artifacts (e.g. SGXS version of the binary
and any enclave signatures).

**Caution**:

#### **Compiling the ParaTime Binary from Source Code**

In case you decide to build the ParaTime binary from source yourself, make sure
that you follow our [guidelines for deterministic compilation](https://docs.oasis.io/build/tools/build-paratime/reproducibility.md)
to ensure that you receive the exact same binary.

When the ParaTime is running in a TEE, a different binary to what is registered
in the consensus layer will not work and will be rejected by the network.

#### Install ParaTime Bundle

For Emerald ParaTime, you need to obtain its bundle and install it to the
`runtimes` subdirectory of your node's working directory.

**Info**:

For example, for the [Sapphire ParaTime](https://docs.oasis.io/node/network/mainnet.md#sapphire),
you would have to obtain the `sapphire-paratime.orc` bundle and install it to
`/node/runtimes/sapphire-paratime.orc`.

```yaml
mode: compute
common:
    data_dir: /node/data
    log:
        format: JSON
        level:
            cometbft: info
            cometbft/context: error
            default: info

consensus:
    # The external IP that is used when registering this node to the network.
    # NOTE: If you are using the Sentry node setup, this option should be
    # omitted.
    external_address: tcp://{{ external_address }}:26656
    listen_address: tcp://0.0.0.0:26656

genesis:
    file: /node/etc/genesis.json

p2p:
    # External P2P configuration.
    port: 9200
    registration:
        addresses:
            # The external IP that is used when registering this node to the
            # network.
            - {{ external_address }}:9200
    seeds:
        # List of seed nodes to connect to.
        # NOTE: You can add additional seed nodes to this list if you want.
        - {{ seed_node_address }}

registration:
    # In order for the node to register itself, the entity ID must be set.
    entity_id: {{ entity_id }}

runtime:
    paths:
        # Paths to bundles for ParaTimes without hot-loading support (e.g., Emerald)
        - {{ runtime_orc_path }}
```

Before using the configuration, replace the following variables:

* `{{ external_address }}`: The external IP you used when registering this node.
* `{{ seed_node_address }}`: The seed node address in the form `ID@IP:port`.
  * You can find the current Oasis Seed Node address in the Network Parameters page ([Mainnet], [Testnet]).
* `{{ entity_id }}`: The node's entity ID from the `entity.json` file.
* `{{ runtime_orc_path }}`: Path to the [ParaTime bundle](https://docs.oasis.io/node/run-your-node/paratime-node.md#manual-bundle-installation) of the form
  `/node/runtimes/foo-paratime.orc`.
  * You can find the current Oasis-supported ParaTimes in the Network Parameters page ([Mainnet], [Testnet]).

## See also

* [Oasis Web3 Gateway for your EVM ParaTime](https://docs.oasis.io/node/web3.md)

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
