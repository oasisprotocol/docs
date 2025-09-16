---
description: Oasis Node Troubleshooting for Node Operators and Hackers
---

# Troubleshooting

:::info **BEFORE YOU BEGIN TROUBLESHOOTING**

Before you begin troubleshooting your Oasis Node we suggest you check all of the
following:

* Check that your current binary version matches the version listed on the Network Parameters page ([Mainnet](../network/mainnet.md), [Testnet](../network/testnet.md))
  * Check the version on your localhost using `oasis-node --version`
  * Check the version on your server using `oasis-node --version`
* If upgrading, make sure that you've wiped state (unless that is explicitly not required)

* If you're doing anything with the entity:
  * Do you have the latest genesis?
  * Do you have the correct private key (or Ledger device).
  * If you're signing a transaction:
    * Check your account balance and nonce using the [`oasis account show`](https://github.com/oasisprotocol/cli/blob/master/docs/account.md#show) command.
* If you're generating a transaction:
  * Do you have the latest genesis?
* If you're submitting a transaction:
  * Do you have the latest genesis?
  * Is your node synced? If not, the transaction will fail to run properly

:::

## Starting a Node

### Invalid Permissions

#### Permissions for node and entity

Error Message:

```text
common/Mkdir: path '/node/data' has invalid permissions: -rwxr-xr-x
```

The `entity` and `node` directories both need to have permissions `rwx------`. Make sure you initialize the directory with correct permissions or change them using `chmod`:

```bash
mkdir --mode 700 --parents {entity,node}
```

```bash
chmod 700 /node/data
chmod 700 /node/etc
```

#### Permissions for .pem files

Error Message example:

```text
signature/signer/file: invalid PEM file permissions 700 on /node/data/identity.pem
```

All `.pem` files should have the permissions `600`. You can set the permissions for all `.pem` files in a directory using the following command:

```bash
chmod -R 600 /path/*.pem
```

#### Node directory Ownership

Another possible cause of permission issues is not giving ownership of your `node/` to the user running the node (e.g. `docker-host` or replace with your user):

```bash
chown -R docker-host:docker-host /node
```

In general, to avoid problems when running docker, specify the user when running `docker` commands by adding the flag `--user $(id -u):$(id -g)`.

### Cannot Find File

Error Message examples:

```text
no such file or directory
```

```text
file does not exist
```

```json
{
  "ts":"2019-11-17T03:42:09.778647033Z",
  "level":"error",
  "module":"cmd/registry/node",
  "caller":"node.go:127",
  "msg":"failed to load entity",
  "err":"file does not exist"
}
```

More often than you'd expect, this error is the result of setting the path incorrectly. You may have left something like `--genesis.file $GENESIS_FILE_PATH` in the command without setting `$GENESIS_FILE_PATH` first, or set the path incorrectly. Check that `echo $GENESIS_FILE_PATH` matches your expectation or provide a path in the command.

Another possible cause: the files in your localhost directory cannot be read from the container. Make sure to run commands in the same session within the container.

## Staking and Registering

### Transaction Out of Gas

Error message:

```text
module=cmd/stake caller=stake.go:70 msg="failed to submit transaction" err="rpc error: code = Unknown desc = staking: add escrow transaction failed: out of gas" attempt=1
```

The docs are now updated to show that you need to add `--stake.transaction.fee.gas` and `--stake.transaction.fee.amount` flags when generating your transaction. Note that if you're re-generating a transaction, you will need to increment the `--nonce` flag.

## Trusted Execution Environment (TEE) {#tee}

### AESM could not be contacted

If running `sgx-detect --verbose` reports:

```
🕮  SGX system software > AESM service
AESM could not be contacted. AESM is needed for launching enclaves and generating attestations.

Please check your AESM installation.

debug: error communicating with aesm
debug: cause: Connection refused (os error 111)

More information: https://edp.fortanix.com/docs/installation/help/#aesm-service
```

Ensure  you have completed all the necessary installation steps outlined in
[DCAP Attestation][tee-dcap-attestation] section.

[tee-dcap-attestation]: prerequisites/set-up-tee.mdx#dcap-attestation

### AESM: error 30

If you are encountering the following error message in your node's logs:

```
failed to initialize TEE: error while getting quote info from AESMD: aesm: error 30
```

Ensure you have all required SGX driver libraries installed as listed in
[DCAP Attestation][tee-dcap-attestation] section.

### Permission Denied When Accessing SGX Kernel Device

If running `sgx-detect --verbose` reports:

```
🕮  SGX system software > SGX kernel device
Permission denied while opening the SGX device (/dev/sgx/enclave, /dev/sgx or
/dev/isgx). Make sure you have the necessary permissions to create SGX enclaves.
If you are running in a container, make sure the device permissions are
correctly set on the container.

debug: Error opening device: Permission denied (os error 13)
debug: cause: Permission denied (os error 13)
```

Ensure you are running the `sgx-detect` tool as `root` via:

```
sudo $(which sgx-detect) --verbose
```

### Error Opening SGX Kernel Device

If running `sgx-detect --verbose` reports:

```
🕮  SGX system software > SGX kernel device
The SGX device (/dev/sgx/enclave, /dev/sgx or /dev/isgx) could not be opened:
"/dev" mounted with `noexec` option.

debug: Error opening device: "/dev" mounted with `noexec` option
debug: cause: "/dev" mounted with `noexec` option
```

#### Ensure `/dev` is NOT Mounted with the `noexec` Option

Some Linux distributions mount `/dev` with the `noexec` mount option. If that is
the case, it will prevent the enclave loader from mapping executable pages.

Ensure your `/dev` (i.e. `devtmpfs`) is not mounted with the `noexec` option.
To check that, use:

```
cat /proc/mounts | grep devtmpfs
```

To temporarily remove the `noexec` mount option for `/dev`, run:

```
sudo mount -o remount,exec /dev
```

To permanently remove the `noexec` mount option for `/dev`, add the following to
the system's `/etc/fstab` file:

```
devtmpfs        /dev        devtmpfs    defaults,exec 0 0
```

:::info

This is the recommended way to modify mount options for virtual (i.e. API) file
system as described in [systemd's API File Systems](https://www.freedesktop.org/wiki/Software/systemd/APIFileSystems/)
documentation.

:::


### Unable to Launch Enclaves: Operation not permitted

If running `sgx-detect --verbose` reports:

```
🕮  SGX system software > Able to launch enclaves > Debug mode
The enclave could not be launched.

debug: failed to load report enclave
debug: cause: failed to load report enclave
debug: cause: Failed to map enclave into memory.
debug: cause: Operation not permitted (os error 1)
```

Ensure your system's [`/dev` is NOT mounted with the `noexec` mount option][tee-dev-noexec].

[tee-dev-noexec]: #ensure-dev-is-not-mounted-with-the-noexec-option

### Unable to Launch Enclaves: Invalid argument

If running `sgx-detect --verbose` reports:

```
🕮  SGX system software > Able to launch enclaves > Debug mode
The enclave could not be launched.

debug: failed to load report enclave
debug: cause: Failed to call EINIT.
debug: cause: I/O ctl failed.
debug: cause: Invalid argument (os error 22)
```

This may be related to a bug in the Linux kernel when attempting to run enclaves
on certain hardware configurations. Upgrading the Linux kernel to a version
equal to or greater than 6.5.0 may solve the issue.

### Unable to Launch Enclaves: Input/output error

If running `sgx-detect --verbose` reports:

```
🕮 SGX system software > Able to launch enclaves > Debug mode
The enclave could not be launched.

debug: failed to load report enclave
debug: cause: Failed to call ECREATE.
debug: cause: I/O ctl failed.
debug: cause: Input/output error (os error 5)
```

This may be related to a bug in the [`rust-sgx`](https://github.com/fortanix/rust-sgx/issues/565)
library causing `sgx-detect` (and `attestation-tool`) to fail and report that
debug enclaves cannot be launched. This is a known issue and is being worked on.
If the `sgx-detect` is reporting that production enclaves can be launched, you
can ignore this error when setting up the Oasis node.

### Couldn't find the platform library

If AESMD service log reports:

```
[read_persistent_data ../qe_logic.cpp:1084] Couldn't find the platform library. (null)
[get_platform_quote_cert_data ../qe_logic.cpp:438] Couldn't load the platform library. (null)
```

It may be that the [DCAP quote provider][tee-dcap-quote-provider] is
misconfigured or the configuration file is not a valid JSON file but is
malformed. Double-check that its configuration file (e.g.
`/etc/sgx_default_qcnl.conf`) is correct.

[tee-dcap-quote-provider]: prerequisites/set-up-tee.mdx#configuring-the-quote-provider

### [QPL] Failed to get quote config. Error code is 0xb011

The following error appears in the QGS daemon logs leaving ROFL runtime
inoperable:

```
qgsd[1412990]: [QPL] Failed to get quote config. Error code is 0xb011
qgsd[1412990]: [get_platform_quote_cert_data ../td_ql_logic.cpp:302] Error returned from the p_sgx_get_quote_config API. 0xe044
qgsd[1412990]: tee_att_get_quote_size return 0x11001
```

This is a known bug, which hasn't been fixed yet at time of writing this section
https://github.com/intel/SGXDataCenterAttestationPrimitives/issues/450.

The current workaround is to restart the QGS daemon, for example
`sudo service qgsd restart`.

If you are managing your QGS daemon with Docker compose, you can configure it as
follows:

```yaml title="docker-compose.yaml"
  command: ["/opt/intel/tdx-qgs/qgs", "--no-daemon"]
  entrypoint: ["/bin/bash", "-c", "exec \"$0\" \"$@\" &> >(tee -a /tmp/qgsd.log)"]
  init: true
  healthcheck:
    test: ["CMD", "/bin/bash", "-c", "grep 'Error code is 0xb011' /tmp/qgsd.log && (: > /tmp/qgsd.log && kill -SIGTERM 1 && exit -1) || (: > /tmp/qgsd.log && exit 0)"]
    interval: 60s
    timeout: 2s
    retries: 0
```

### [QPL] No certificate data for this platform.

The following error is reported on a multi-CPU systems if the user forgot to
install and configure MPA:

```
May 09 13:24:16 oasis-node-1 qgsd[6732]: call tee_att_init_quote
May 09 13:24:16 oasis-node-1 qgsd[6732]: [QPL] No certificate data for this platform.
May 09 13:24:16 oasis-node-1 qgsd[6732]: [get_platform_quote_cert_data ../td_ql_logic.cpp:302] Error returned from the p_sgx_get_quote_config API. 0xe011
May 09 13:24:16 oasis-node-1 qgsd[6732]: tee_att_init_quote return 0x11001
May 09 13:24:16 oasis-node-1 qgsd[6732]: tee_att_get_quote_size return 0x1100f
```

Correctly configure your TEE by following the [Set up TEE - Multi-socket
system][tee-multi-socket-systems] section.

[tee-multi-socket-systems]: ./prerequisites/set-up-tee.mdx#multi-socket-systems

## ROFL

The following errors appear in the ROFL node logs.

### Unknown enclave

This error is reported when the enclave ID of the ROFL provided in the .orc file
mismatches the currently registered enclave ID of the on-chain ROFL app.

```json
{
  "component":"rofl.rofl1qrtetspnld9efpeasxmryl6nw9mgllr0euls3dwn",
  "err":"call failed: module=rofl code=5: unknown enclave",
  "level":"error",
  "module":"runtime/modules/rofl/app/registration",
  "msg":"failed to refresh registration",
  "provisioner":"tdx-qemu",
  "runtime_id":"000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c",
  "runtime_name":"",
  "ts":"2025-02-21T08:10:10.012956311Z"
}
```

Update the on-chain enclave ID by running `oasis rofl update` on the machine
where ROFL is being compiled and deployed.

### Root not found

This error is reported, when the node hasn't been fully synced yet. This
includes both the consensus and the ParaTime blocks.

```json
{
  "component":"rofl.rofl1qrtetspnld9efpeasxmryl6nw9mgllr0euls3dwn",
  "err":"call failed: root not found",
  "level":"error",
  "module":"runtime/modules/rofl/app/registration",
  "msg":"failed to refresh registration",
  "provisioner":"tdx-qemu",
  "runtime_id":"000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c",
  "runtime_name":"",
  "ts":"2025-04-17T05:40:24.305875715Z"
}
```

Wait for the node to sync.

### Failed to resize persistent overlay image

The following error is reported on the ROFL node, if there was an error during
the persistent storage resize operation. Most commonly this happens during ROFL
upgrade if [persistent storage size][rofl-yaml-storage] was decreased below the
actually occupied storage.

```json
{
  "caller":"host.go:486",
  "err":"failed to configure process: failed to resize persistent overlay image: qemu-img: Use the --shrink option to perform a shrink operation.\nqemu-img: warning: Shrinking an image will delete all data beyond the shrunken image's end. Before performing such an operation, make sure there is no important data there.\n\nexit status 1",
  "level":"error",
  "module":"runtime/host/tdx/qemu",
  "msg":"failed to start runtime",
  "runtime_id":"000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c",
  "ts":"2025-04-17T09:56:36.321911319Z"
}
```

Similarly, if the persistent storage is corrupted in any way, a message like
this may appear in the logs:

```json
{
  "component":"rofl.rofl1qrtetspnld9efpeasxmryl6nw9mgllr0euls3dwn",
  "level":"info",
  "module":"runtime/global",
  "msg":"Error: writing blob: adding layer with blob \"sha256:9f202d637e1bbe0e48c7855d7872fa4ab33af88b61ef10d4cb6dd7caba0e2c8a\"/\"\"/\"sha256:b240b4f256e7bd304b5a1335b4bc73b47ce21aaf31bb1107452a89a101f50054\": readlink /storage/containers/graph/overlay/l: invalid argument",
  "provisioner":"tdx-qemu",
  "runtime_id":"000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c",
  "runtime_name":"",
  "ts":"2025-02-25T13:44:47.05176383Z"
}
```

ROFL admin user should run `oasis rofl machine restart --wipe-storage` to clear
persistent storage and recreate the volume of the ROFL app.

Alternatively, you can remove the persistent storage folder manually located at
`/node/data/runtimes/volumes/<rofl_app_volume_id>` and restart the ROFL app.

:::warning

Both options will permanently delete persistent storage of this ROFL app on the
ROFL node.

:::

[rofl-yaml-storage]: https://github.com/oasisprotocol/oasis-sdk/blob/main/docs/rofl/features/manifest.md#resources-storage

### Offer not acceptable for this instance

The following error occurs, if your ROFL node Scheduler configuration is not
configured to accept the offer names of the selected provider.

```json
{
  "component":"rofl.rofl1qrqw99h0f7az3hwt2cl7yeew3wtz0fxunu7luyfg",
  "id":"0000000000000005",
  "level":"info",
  "module":"runtime/scheduler/manager",
  "msg":"offer not acceptable for this instance",
  "offer":"0000000000000002",
  "provisioner":"tdx-qemu",
  "runtime_id":"000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c",
  "runtime_name":"",
  "ts":"2025-04-25T09:25:57.726444176Z"
}
```

Update your node's `runtime.runtimes.sapphire_id.components.scheduler_id.config.rofl_scheduler.offers`
in your `config.yml` and include the valid offer name.

### Image platform (linux/arm64/v8) does not match the expected platform (linux/amd64)

This error occurs, if the Docker container to be executed inside the ROFL TDX
was not compiled for the `linux/amd64` platform.

```json
{
  "component":"rofl.rofl1qpdzzm4h73gtes04xjn4whan84s3k33l5gx787l2",
  "level":"info",
  "module":"runtime/global",
  "msg":"WARNING: image platform (linux/arm64/v8) does not match the expected platform (linux/amd64)",
  "provisioner":"tdx-qemu",
  "runtime_id":"000000000000000000000000000000000000000000000000f80306c9858e7279",
  "runtime_name":"",
  "ts":"2025-04-28T06:16:24.20330395Z"
}
```

Always compile your Docker container for ROFL with the `--platform linux/amd64`
parameter or put the `platform: linux/amd64` line inside your `compose.yaml`.
Then recompile and push the container to the OCI repository.

