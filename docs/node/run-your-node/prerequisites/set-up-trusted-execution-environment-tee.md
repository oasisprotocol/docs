# Set up Trusted Execution Environment (TEE)

:::info

In case the ParaTime you want to run does not require the use of a TEE (e.g.
Intel SGX), you can skip setting up a TEE.

:::

If the ParaTime is configured to run in a TEE (currently only [Intel SGX]), you
must make sure that your system supports running SGX enclaves. This requires
that your hardware has SGX support, that SGX support is enabled and that the
additional driver and software components are properly installed and running.

[Intel SGX]: https://www.intel.com/content/www/us/en/architecture-and-technology/software-guard-extensions.html

## BIOS Configuration

To enable Intel SGX on your hardware, you also need to configure the BIOS.
First, **update the BIOS to the latest version with the latest microcode** and
then proceed with BIOS configuration as shown below. Note that some settings may
not apply to your BIOS. In that case, configure only the relevant ones. Please
set the BIOS settings as follows:

- **SGX**: ENABLE
- **Hyper-Threading**: DISABLE
- **Intel SpeedStep**: DISABLE
- **SecureBoot**: DISABLE  (not necessary for recent kernels)
- **All Internal Graphics**: DISABLE
- **Turbo Mode**: DISABLE
- **CPU AES**: ENABLE

## Ensure Clock Synchronization

Due to additional sanity checks within runtime enclaves, you should ensure that
the node's local clock is synchronized (e.g. using NTP). If it is off by more
than half a second you may experience unexpected runtime aborts.

## Install SGX Linux Driver

In case you are running Linux kernel version 5.11 or higher, the required SGX
driver is already included and no additional installation is needed. We
recommend you to update your kernel. If unable, you need to manually
install a compatible SGX driver.

### Verification

Make sure that one of the following SGX devices exists (the exact device name
depends on which driver is being used):

* `/dev/sgx_enclave` (since Linux kernel 5.11)
* `/dev/sgx/enclave` (legacy driver)
* `/dev/sgx` (legacy driver)
* `/dev/isgx` (legacy driver)

## Ensure Proper SGX Device Permissions

Make sure that the user that is running the Oasis Node binary has access to the
SGX device (e.g. `/dev/sgx_enclave`). This can usually be achieved by adding
the user into the right group, for example in case the permissions of the SGX
device are as follows:

```
crw-rw---- 1 root sgx 10, 125 Oct 28 09:28 /dev/sgx_enclave
```

and the user running Oasis Node is `oasis`, you can do:

```bash
sudo adduser oasis sgx
```

Failure to do so may result in permission denied errors during runtime startup.

## AESM Service

To allow execution of SGX enclaves, several **Architectural Enclaves (AE)** are
involved (i.e. Launch Enclave, Provisioning Enclave, Provisioning Certificate
Enclave, Quoting Enclave, Platform Services Enclaves).

Communication between application-spawned SGX enclaves and Intel-provided
Architectural Enclaves is through **Application Enclave Service Manager
(AESM)**. AESM runs as a daemon and provides a socket through which applications
can facilitate various SGX services such as launch approval, remote attestation
quote signing, etc.

Oasis node supports the (legacy) EPID and (newer) DCAP attestation methods.
Following instructions differ depending on the attestation method used.

To see if your system supports DCAP attestation run the following:

```bash
 cpuid -1  | grep "SGX"
 ```

and look for the following line:
```
      SGX_LC: SGX launch config supported      = true
```

If your system doesn't support the "SGX_LC: SGX launch config supported", skip to the [EPID attestation](#legacy-epid-attestation) section.

## DCAP Attestation

### Ubuntu 22.04

A convenient way to install the AESM service on Ubuntu 22.04 systems
is to use the Intel's [official Intel SGX APT repository](https://download.01.org/intel-sgx/sgx_repo/).

First add Intel SGX APT repository to your system:

```bash
curl -fsSL https://download.01.org/intel-sgx/sgx_repo/ubuntu/intel-sgx-deb.key | sudo gpg --dearmor -o /usr/share/keyrings/intel-sgx-deb.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/intel-sgx-deb.gpg] https://download.01.org/intel-sgx/sgx_repo/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/intel-sgx.list > /dev/null
```

And then install the `sgx-aesm-service`, `libsgx-aesm-ecdsa-plugin`, `libsgx-aesm-quote-ex-plugin` and `libsgx-dcap-default-qpl` packages:

```bash
sudo apt update
sudo apt install sgx-aesm-service libsgx-aesm-ecdsa-plugin libsgx-aesm-quote-ex-plugin libsgx-dcap-default-qpl
```

The AESM service should be up and running. To confirm that, use:

```bash
sudo systemctl status aesmd.service
```

### Configuring the Quote Provider

The Intel Quote Provider (`libsgx-dcap-default-qpl`) needs to be configured in
order to use either the Intel PCS, the PCCS of your cloud service provider, or
your own PCCS. The configuration file is located at `/etc/sgx_default_qcnl.conf`.

Make sure to always restart the `aesmd.service` after updating the
configuration, via:

```bash
sudo systemctl restart aesmd.service
```

#### Intel PCS

Using the Intel PCS is the simplest and most generic way, but it may be less
reliable than using your own PCCS. Some cloud providers (see the [following section](#cloud-service-providers-pccs))
also require you to use their PCCS.

To use Intel PCS update the `pccs_url` value in `/etc/sgx_default_qcnl.conf`
to the Intel PCS API URL:

```json
  //PCCS server address
  "pccs_url": "https://api.trustedservices.intel.com/sgx/certification/v4/"
```

:::tip

In case there is an error in the QPL configuration file, attestation will refuse
to work and the AESM service may produce unhelpful errors like the following:

```
Couldn't find the platform library. (null)
```

The only thing that needs to be changed is the `pccs_url` value above.

:::

#### Cloud Service Provider's PCCS

Some cloud providers require you to use their PCCS.

- Azure: See the [Azure documentation] for details on configuring the quote provider. The documentation
  contains an example of an Intel QPL configuration file that can be used.

- Alibaba Cloud: See the [Alibaba Cloud documentation] for details on configuring the quote provider. The
  documentation shows the required `sgx_default_qcnl.conf` changes.

- Other cloud providers: If you are using a different cloud service provider, consult their
specific documentation for the appropriate PCCS configuration and guidance on configuring the quote provider, or
use one of the other PCCS options.

[Azure documentation]: https://learn.microsoft.com/en-us/azure/security/fundamentals/trusted-hardware-identity-management#how-do-i-use-intel-qpl-with-trusted-hardware-identity-management
[Alibaba Cloud documentation]: https://www.alibabacloud.com/help/en/ecs/user-guide/build-an-sgx-encrypted-computing-environment

#### Own PCCS

It is also possible to run PCCS yourself. Follow [official Intel instructions] on how to setup your own PCCS.

[official Intel Instructions]: https://www.intel.com/content/www/us/en/developer/articles/guide/intel-software-guard-extensions-data-center-attestation-primitives-quick-install-guide.html

### DCAP Attestation Docker

Alternatively, an easy way to install and run the AESM service on a [Docker](https://docs.docker.com/engine/)-enabled
system is to use [our AESM container image](https://github.com/oasisprotocol/oasis-core/pkgs/container/aesmd).

Executing the following command should (always) pull the latest version of our
AESMD Docker container, map the SGX devices and `/var/run/aesmd` directory
and ensure AESM is running in the background (also automatically started on boot):

```bash
docker run \
  --pull always \
  --detach \
  --restart always \
  --device /dev/sgx_enclave \
  --device /dev/sgx_provision \
  --volume /var/run/aesmd:/var/run/aesmd \
  --name aesmd \
  ghcr.io/oasisprotocol/aesmd-dcap:master
```

:::tip

Make sure to use the correct SGX devices based on your [SGX driver](set-up-trusted-execution-environment-tee.md#verification).
The example above assumes the use of the newer driver which uses two devices.
For the legacy driver you need to specify `--device /dev/isgx` instead.

:::

:::tip

Make sure to use the correct docker image based on your attestation method.
For DCAP use the `ghcr.io/oasisprotocol/aesmd-dcap:master` and for EPID use the
`ghcr.io/oasisprotocol/aesmd-epid:master` image.

:::

By default, the Intel Quote Provider in the docker container is configured to use the Intel PCS endpoint.
To override the Intel Quote Provider configuration within the container mount your own custom configuration using
the `volume` flag.

```bash
docker run \
  --pull always \
  --detach \
  --restart always \
  --device /dev/sgx_enclave \
  --device /dev/sgx_provision \
  --volume /var/run/aesmd:/var/run/aesmd \
  --volume /etc/sgx_default_qcnl.conf:/etc/sgx_default_qcnl.conf \
  --name aesmd \
  ghcr.io/oasisprotocol/aesmd-dcap:master
```

The default Intel Quote Provider config is available in [Intel SGX Github repository](https://github.com/intel/SGXDataCenterAttestationPrimitives/blob/master/QuoteGeneration/qcnl/linux/sgx_default_qcnl.conf).

### Multi-socket Systems

Note that platform provisioning for multi-socket systems (e.g. systems with
multiple CPUs) is more complex, especially if one is using a hypervisor and
running SGX workloads inside guest VMs. In this case additional provisioning may
be required to be performed on the host.

Note that the system must be booted in UEFI mode for provisioning to work as the
provisioning process uses UEFI variables to communicate with the BIOS.

#### Ubuntu 22.04

To provision and register your multi-socket system you need to install the Intel
SGX Multi-Package Registration Agent Service as follows (assuming Intel's SGX
apt repository has been added as discussed above):

```shell
sudo apt install sgx-ra-service
```

#### VMware vSphere 8.0+

In order to enable SGX remote attestation on VMware vSphere-based systems,
please follow [the vSphere guide].

[the vSphere guide]: https://docs.vmware.com/en/VMware-vSphere/8.0/vsphere-vcenter-esxi-management/GUID-F16476FD-3B66-462F-B7FB-A456BEDC3549.html

## Migrate from EPID Attestation to DCAP Attestation

EPID attestation will be discontinued in 2025 and will no longer be available on
any processors. All nodes using EPID attestation should migrate to DCAP
attestation.

:::info

Compute node operators, please hold for further instructions. We will coordinate
the migration in phases to ensure that during the migration the network remains
operational.

:::

For transitioning to the DCAP attestation, follow these steps:
1. See if your system [supports DCAP attestation]. If your hardware does not
support DCAP attestation, you'll need to migrate your node to newer hardware.
2. [Gracefully shutdown] your compute nodes (Sapphire and Cipher).
3. Transition to DCAP attestation:
  - In case you are running AESM service on Docker follow [these instructions].
  - Otherwise manually configure AESM service to use DCAP attestation:
    1. Remove any leftover EPID attestation packages. If running on Ubuntu 22.04 run
      the following command:
      ```bash
        sudo apt remove libsgx-aesm-launch-plugin libsgx-aesm-epid-plugin
      ```
    2. Configure AESM service to use [DCAP attestation]
    3. Restart the AESM service. If running on Ubuntu 22.04 run the following
      command:
      ```bash
      sudo systemctl restart aesmd.service
      ```
4. [Configure the Quote Provider].
5. Use the [attestation tool] to test if your settings are correct.
6. Start your compute node.

[these instructions]: #dcap-attestation-docker
[supports DCAP attestation]: #aesm-service
[Gracefully shutdown]: ../maintenance/shutting-down-a-node.md
[DCAP attestation]: #dcap-attestation
[Configure the Quote Provider]: #configuring-the-quote-provider
[attestation tool]: #oasis-attestation-tool

## (Legacy) EPID Attestation

:::tip

Skip this section if you already configured AESM with DCAP Attestation.

:::

:::info

EPID attestation support has been discontinued in newer processors (Intel Xeon 3rd generation onwards).
Please refer to the [DCAP attestation](#dcap-attestation) section on newer systems.

:::

### Ubuntu 22.04

A convenient way to install the AESM service on Ubuntu 22.04 systems
is to use the Intel's [official Intel SGX APT repository](https://download.01.org/intel-sgx/sgx_repo/).

First add Intel SGX APT repository to your system:

```bash
curl -fsSL https://download.01.org/intel-sgx/sgx_repo/ubuntu/intel-sgx-deb.key | sudo gpg --dearmor -o /usr/share/keyrings/intel-sgx-deb.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/intel-sgx-deb.gpg] https://download.01.org/intel-sgx/sgx_repo/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/intel-sgx.list > /dev/null
```

And then install the `sgx-aesm-service`, `libsgx-aesm-launch-plugin` and
`libsgx-aesm-epid-plugin` packages:

```bash
sudo apt update
sudo apt install sgx-aesm-service libsgx-aesm-launch-plugin libsgx-aesm-epid-plugin
```

The AESM service should be up and running. To confirm that, use:

```bash
sudo systemctl status aesmd.service
```

### Docker-enabled System

An easy way to install and run the AESM service on a [Docker](https://docs.docker.com/engine/)-enabled
system is to use [our AESM container image](https://github.com/oasisprotocol/oasis-core/pkgs/container/aesmd).

Executing the following command should (always) pull the latest version of our
AESM Docker container, map the SGX devices and `/var/run/aesmd` directory and
ensure AESM is running in the background (also automatically started on boot):

```bash
docker run \
  --pull always \
  --detach \
  --restart always \
  --device /dev/sgx_enclave \
  --device /dev/sgx_provision \
  --volume /var/run/aesmd:/var/run/aesmd \
  --name aesmd \
  ghcr.io/oasisprotocol/aesmd-epid:master
```

:::tip

Make sure to use the correct devices based on your [kernel version](set-up-trusted-execution-environment-tee.md#verification).
The example above assumes the use of the newer driver which uses two devices.
For the legacy driver you need to specify `--device /dev/isgx` instead.

Make sure to use the correct docker image based on your attestation method.
For DCAP use the `ghcr.io/oasisprotocol/aesmd-dcap:master` and for EPID use the
`ghcr.io/oasisprotocol/aesmd-epid:master` image.
:::

## Check SGX Setup

In order to make sure that your SGX setup is working, you can use the
`sgx-detect` tool from the [sgxs-tools](https://lib.rs/crates/sgxs-tools) Rust
package.

There are no pre-built packages for it, so you will need to compile it yourself.

### Install Dependencies

Make sure you have the following installed on your system:

* [GCC](https://gcc.gnu.org).
* [Protobuf](https://github.com/protocolbuffers/protobuf) compiler.
* [pkg-config](https://www.freedesktop.org/wiki/Software/pkg-config).
* [OpenSSL](https://www.openssl.org) development package.

On Fedora, you can install all the above with:

```
sudo dnf install gcc protobuf-compiler pkg-config openssl-devel
```

On Ubuntu, you can install all the above with:

```
sudo apt install gcc protobuf-compiler pkg-config libssl-dev
```

### Install [Rust](https://www.rust-lang.org)

We follow [Rust upstream's recommendation](https://www.rust-lang.org/tools/install)
on using [rustup](https://rustup.rs) to install and manage Rust versions.

:::caution

rustup cannot be installed alongside a distribution packaged Rust version. You
will need to remove it (if it's present) before you can start using rustup.

:::

Install rustup by running:

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

:::tip

If you want to avoid directly executing a shell script fetched the internet, you
can also [download `rustup-init` executable for your platform](https://rust-lang.github.io/rustup/installation/other.html)
and run it manually. This will run `rustup-init` which will download and install
the latest stable version of Rust on your system.

:::

### Build and Install sgxs-tools

```bash
cargo install sgxs-tools
```

### Run `sgx-detect` Tool

After the installation completes, run `sgx-detect` to make sure that everything
is set up correctly:

```
sudo $(which sgx-detect)
```

:::tip

If you don't run the `sgx-detect` tool as `root`, it might not have the
necessary permissions to access the SGX kernel device.

:::

When everything works, you should get output similar to the following (some
things depend on hardware features so your output may differ):

```
Detecting SGX, this may take a minute...
✔  SGX instruction set
  ✔  CPU support
  ✔  CPU configuration
  ✔  Enclave attributes
  ✔  Enclave Page Cache
  SGX features
    ✔  SGX2  ✔  EXINFO  ✔  ENCLV  ✔  OVERSUB  ✔  KSS
    Total EPC size: 92.8MiB
✘  Flexible launch control
  ✔  CPU support
  ？ CPU configuration
  ✘  Able to launch production mode enclave
✔  SGX system software
  ✔  SGX kernel device (/dev/sgx_enclave)
  ✘  libsgx_enclave_common
  ✔  AESM service
  ✔  Able to launch enclaves
    ✔  Debug mode
    ✘  Production mode
    ✔  Production mode (Intel whitelisted)
```

The important part is the checkbox under _Able to launch enclaves_ in both
_Debug mode_ and _Production mode (Intel whitelisted)_.

In case you encounter errors, see the [list of common SGX installation issues](https://edp.fortanix.com/docs/installation/help/)
for help.

### Oasis Attestation tool

To test if your settings are correct, you may use the [attestation tool]
([binary]) for testing remote attestation against Intel SGX's
development server.

[attestation tool]: https://github.com/oasisprotocol/tools/tree/main/attestation-tool#readme
[binary]: https://github.com/oasisprotocol/tools/releases

## Troubleshooting

See  [the general troubleshooting section](../troubleshooting.md), before
proceeding with ParaTime node-specific troubleshooting.

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

Ensure  you have completed all the necessary installation steps outlined in either
[DCAP Attestation](#dcap-attestation) or [EPID attestation](#legacy-epid-attestation)
sections.

### AESM: error 30

If you are encountering the following error message in your node's logs:

```
failed to initialize TEE: error while getting quote info from AESMD: aesm: error 30
```

Ensure you have all required SGX driver libraries installed as listed in either
[DCAP Attestation](#dcap-attestation) or [EPID attestation](#legacy-epid-attestation)
sections.

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

Ensure your system's [`/dev` is NOT mounted with the `noexec` mount option][dev-noexec].

[dev-noexec]: #ensure-dev-is-not-mounted-with-the-noexec-option

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

### Couldn't find the platform library

If AESMD service log reports:

```
[read_persistent_data ../qe_logic.cpp:1084] Couldn't find the platform library. (null)
[get_platform_quote_cert_data ../qe_logic.cpp:438] Couldn't load the platform library. (null)
```

It may be that the [DCAP quote provider] is misconfigured or the configuration
file is not a valid JSON file but is malformed. Double-check that its
configuration file (e.g. `/etc/sgx_default_qcnl.conf`) is correct.

[DCAP quote provider]: #configuring-the-quote-provider
