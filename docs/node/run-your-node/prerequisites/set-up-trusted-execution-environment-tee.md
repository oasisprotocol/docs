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

To test if your settings are correct, you may use the [attestation tool] 
([binary]) for testing remote attestation against Intel SGX's 
development server.

[attestation tool]: https://github.com/oasisprotocol/tools/tree/main/attestation-tool#readme
[binary]: https://github.com/oasisprotocol/tools/releases

## Ensure Clock Synchronization

Due to additional sanity checks within runtime enclaves, you should ensure that
the node's local clock is synchronized (e.g. using NTP). If it is off by more
than half a second you may experience unexpected runtime aborts.

## Install SGX Linux Driver

:::info

In case you are running Linux kernel version 5.11 or higher, the required SGX
driver is already included and no additional installation is needed so you may
skip this section.

:::

On older distributions see below for instructions on how to install the
[legacy (out-of-tree) driver].

[legacy (out-of-tree) driver]: https://github.com/intel/linux-sgx-driver

### Ubuntu 18.04/16.04

A convenient way to install the SGX Linux driver on Ubuntu 18.04/16.04 systems
is to use the [Fortanix](https://edp.fortanix.com/docs/installation/guide/)'s
APT repository and its [DKMS](https://en.wikipedia.org/wiki/Dynamic_Kernel_Module_Support)
package.

First add Fortanix's APT repository to your system:

```bash
echo "deb https://download.fortanix.com/linux/apt xenial main" | sudo tee /etc/apt/sources.list.d/fortanix.list >/dev/null
curl -sSL "https://download.fortanix.com/linux/apt/fortanix.gpg" | sudo -E apt-key add -
```

And then install the `intel-sgx-dkms` package:

```bash
sudo apt update
sudo apt install intel-sgx-dkms
```

:::caution

Some [Azure Confidential Computing instances](https://docs.microsoft.com/en-us/azure/confidential-computing/quick-create-portal)
have the [Intel SGX DCAP driver](https://github.com/intel/SGXDataCenterAttestationPrimitives/tree/master/driver/linux)
pre-installed.

To determine that, run `dmesg | grep -i sgx` and observe if a line like the
following is shown:

```
[    4.991649] sgx: intel_sgx: Intel SGX DCAP Driver v1.33
```

If that is the case, you need to blacklist the Intel SGX DCAP driver's module by
running:

```
echo "blacklist intel_sgx" | sudo tee -a /etc/modprobe.d/blacklist-intel_sgx.conf >/dev/null
```

:::

### Fedora 34/33

A convenient way to install the SGX Linux driver on Fedora 34/33 systems is to
use the Oasis-provided [Fedora Package for the Legacy Intel SGX Linux Driver](https://github.com/oasisprotocol/sgx-driver-kmod).

### Other Distributions

Go to [Intel SGX Downloads](https://01.org/intel-software-guard-extensions/downloads)
page and find the latest "Intel SGX Linux Release" (_not_ "Intel SGX DCAP
Release") and download the "Intel (R) SGX Installers" for your distribution. The
package will have `driver` in the name (e.g., `sgx_linux_x64_driver_2.11.0_2d2b795.bin`).

### Verification

After installing the driver and restarting your system, make sure that the one
of the SGX devices exists (the exact device name depends on which driver is
being used):

* `/dev/sgx_enclave` (since Linux kernel 5.11)
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

## Ensure `/dev` is NOT Mounted with the `noexec` Option

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

## Install AESM Service

To allow execution of SGX enclaves, several **Architectural Enclaves (AE)** are
involved (i.e. Launch Enclave, Provisioning Enclave, Provisioning Certificate
Enclave, Quoting Enclave, Platform Services Enclaves).

Communication between application-spawned SGX enclaves and Intel-provided
Architectural Enclaves is through **Application Enclave Service Manager
(AESM)**. AESM runs as a daemon and provides a socket through which applications
can facilitate various SGX services such as launch approval, remote attestation
quote signing, etc.

### Ubuntu 22.04/20.04/18.04

A convenient way to install the AESM service on Ubuntu 22.04/20.04/18.04 systems
is to use the Intel's [official Intel SGX APT repository](https://download.01.org/intel-sgx/sgx_repo/).

First add Intel SGX APT repository to your system:

```bash
echo "deb https://download.01.org/intel-sgx/sgx_repo/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/intel-sgx.list >/dev/null
curl -sSL "https://download.01.org/intel-sgx/sgx_repo/ubuntu/intel-sgx-deb.key" | sudo -E apt-key add -
```

And then install the `sgx-aesm-service`,  `libsgx-aesm-launch-plugin` and
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
  ghcr.io/oasisprotocol/aesmd:master
```

:::tip

Make sure to use the correct devices based on your [kernel version](set-up-trusted-execution-environment-tee.md#verification).
The example above assumes the use of the newer driver which uses two devices.
For the legacy driver you need to specify `--device /dev/isgx` instead.

:::

### Podman-enabled System

Similarly to Docker-enabled systems, an easy way to install and run the AESM
service on a [Podman](https://podman.io)-enabled system is to use
[our AESM container image](https://github.com/oasisprotocol/oasis-core/pkgs/container/aesmd).

First, create the container with:

```bash
sudo podman create \
  --pull always \
  --device /dev/sgx_enclave \
  --device /dev/sgx_provision \
  --volume /var/run/aesmd:/var/run/aesmd:Z \
  --name aesmd \
  ghcr.io/oasisprotocol/aesmd:master
```

:::tip

Make sure to use the correct devices based on your [kernel version](set-up-trusted-execution-environment-tee.md#verification).
The example above assumes the use of the newer driver which uses two devices.
For the legacy driver you need to specify `--device /dev/isgx` instead.

:::

Then generate the `container-aesmd.service` systemd unit file for it with:

```bash
sudo podman generate systemd --restart-policy=always --time 10 --name aesmd | \
  sed "/\[Service\]/a RuntimeDirectory=aesmd" | \
  sudo tee /etc/systemd/system/container-aesmd.service
```

Finally, enable and start the `container-aesmd.service` with:

```bash
sudo systemctl enable container-aesmd.service
sudo systemctl start container-aesmd.service
```

The AESM service should be up and running. To confirm that, use:

```bash
sudo systemctl status container-aesmd.service
```

To see the logs of the AESM service, use:

```
sudo podman logs -t -f aesmd
```

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
  ✔  SGX kernel device (/dev/isgx)
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

## Troubleshooting

See  [the general troubleshooting section](../troubleshooting.md), before
proceeding with ParaTime node-specific troubleshooting.

### Missing `libsgx-aesm-epid-plugin`

If you are encountering the following error message in your node's logs:

```
failed to initialize TEE: error while getting quote info from AESMD: aesm: error 30
```

Ensure you have all required SGX driver libraries installed as listed in
[Install SGX Linux Driver section](../paratime-node.mdx#install-sgx-linux-driver).
Previous versions of this guide were missing the `libsgx-aesm-epid-plugin`.

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

Ensure your system's [`/dev` is NOT mounted with the `noexec` mount option][dev-noexec].

### Unable to Launch Enclaves

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
