# Set up Trusted Execution Environment (TEE)

:::info

In case the ParaTime you want to run does not require the use of a TEE (e.g. Intel SGX), you can skip setting up a TEE.

:::

If the ParaTime is configured to run in a TEE (currently only [Intel SGX](https://www.intel.com/content/www/us/en/architecture-and-technology/software-guard-extensions.html)), you must make sure that your system supports running SGX enclaves. This requires that your hardware has SGX support, that SGX support is enabled and that the additional driver and software components are properly installed and running.

## Install SGX Linux Driver

Oasis Core currently only supports the legacy (out-of-tree) [Intel SGX Linux driver](https://github.com/intel/linux-sgx-driver).

:::info

Support for the new Intel SGX support in mainline Linux kernels since version 5.11 is being tracked in [oasis-core#3651](https://github.com/oasisprotocol/oasis-core/issues/3651).

:::

### Ubuntu 18.04/16.04

A convenient way to install the SGX Linux driver on Ubuntu 18.04/16.04 systems is to use the [Fortanix](https://edp.fortanix.com/docs/installation/guide/)'s APT repository and its [DKMS](https://en.wikipedia.org/wiki/Dynamic_Kernel_Module_Support) package.

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

Some [Azure Confidential Computing instances](https://docs.microsoft.com/en-us/azure/confidential-computing/quick-create-portal) have the [Intel SGX DCAP driver](https://github.com/intel/SGXDataCenterAttestationPrimitives/tree/master/driver/linux) pre-installed.

To determine that, run `dmesg | grep -i sgx` and observe if a line like the following is shown:

```
[    4.991649] sgx: intel_sgx: Intel SGX DCAP Driver v1.33
```

If that is the case, you need to blacklist the Intel SGX DCAP driver's module by running:

```
echo "blacklist intel_sgx" | sudo tee -a /etc/modprobe.d/blacklist-intel_sgx.conf >/dev/null
```

:::

### Fedora 34/33

A convenient way to install the SGX Linux driver on Fedora 34/33 systems is to use the Oasis-provided [Fedora Package for the Legacy Intel SGX Linux Driver](https://github.com/oasisprotocol/sgx-driver-kmod).

### Other Distributions

Go to [Intel SGX Downloads](https://01.org/intel-software-guard-extensions/downloads) page and find the latest "Intel SGX Linux Release" (_not_ "Intel SGX DCAP Release") and download the "Intel (R) SGX Installers" for your distribution. The package will have `driver` in the name (e.g., `sgx_linux_x64_driver_2.11.0_2d2b795.bin`).

### Verification

After installing the driver and restarting your system, make sure that the `/dev/isgx` device exists.

## Ensure `/dev` is NOT Mounted with the `noexec` Option

Newer Linux distributions usually mount `/dev` with the `noexec` mount option. If that is the case, it will prevent the enclave loader from mapping executable pages.

Ensure your `/dev` (i.e. `devtmpfs`) is not mounted with the `noexec` option. To check that, use:

```
cat /proc/mounts | grep devtmpfs
```

To temporarily remove the `noexec` mount option for `/dev`, run:

```
sudo mount -o remount,exec /dev
```

To permanently remove the `noexec` mount option for `/dev`, add the following to the system's `/etc/fstab` file:

```
devtmpfs        /dev        devtmpfs    defaults,exec 0 0
```

:::info

This is the recommended way to modify mount options for virtual (i.e. API) file system as described in [systemd's API File Systems](https://www.freedesktop.org/wiki/Software/systemd/APIFileSystems/) documentation.

:::

## Install AESM Service

To allow execution of SGX enclaves, several **Architectural Enclaves (AE)** are involved (i.e. Launch Enclave, Provisioning Enclave, Provisioning Certificate Enclave, Quoting Enclave, Platform Services Enclaves).

Communication between application-spawned SGX enclaves and Intel-provided Architectural Enclaves is through **Application Enclave Service Manager (AESM)**. AESM runs as a daemon and provides a socket through which applications can facilitate various SGX services such as launch approval, remote attestation quote signing, etc.

### Ubuntu 20.04/18.04/16.04

A convenient way to install the AESM service on Ubuntu 20.04/18.04/16.04 systems is to use the Intel's [official Intel SGX APT repository](https://download.01.org/intel-sgx/sgx_repo/).

First add Intel SGX APT repository to your system:

```bash
echo "deb https://download.01.org/intel-sgx/sgx_repo/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/intel-sgx.list >/dev/null
curl -sSL "https://download.01.org/intel-sgx/sgx_repo/ubuntu/intel-sgx-deb.key" | sudo -E apt-key add -
```

And then install the `sgx-aesm-service`,  `libsgx-aesm-launch-plugin` and `libsgx-aesm-epid-plugin` packages:

```bash
sudo apt update
sudo apt install sgx-aesm-service libsgx-aesm-launch-plugin libsgx-aesm-epid-plugin
```

The AESM service should be up and running. To confirm that, use:

```bash
sudo systemctl status aesmd.service
```

### Docker-enabled System

An easy way to install and run the AESM service on a [Docker](https://docs.docker.com/engine/)-enabled system is to use [Fortanix's AESM container image](https://hub.docker.com/r/fortanix/aesmd/).

Executing the following command should (always) pull the latest version of Fortanix's AESM Docker container, map the `/dev/isgx` device and `/var/run/aesmd` directory and ensure AESM is running in the background (also automatically started on boot):

```bash
docker run \
  --pull always \
  --detach \
  --restart always \
  --device /dev/isgx \
  --volume /var/run/aesmd:/var/run/aesmd \
  --name aesmd \
  fortanix/aesmd
```

### Podman-enabled System

Similarly to Docker-enabled systems, an easy way to install and run the AESM service on a [Podman](https://podman.io)-enabled system is to use [Fortanix's AESM container image](https://hub.docker.com/r/fortanix/aesmd/).

First, create the container with:

```bash
sudo podman create \
  --pull always \
  --device /dev/isgx \
  --volume /var/run/aesmd:/var/run/aesmd:Z \
  --name aesmd \
  docker.io/fortanix/aesmd
```

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

In order to make sure that your SGX setup is working, you can use the `sgx-detect` tool from the [sgxs-tools](https://lib.rs/crates/sgxs-tools) Rust package.

There are no pre-built packages for it, so you will need to compile it yourself.

:::info

sgxs-tools must be compiled with a nightly version of the Rust toolchain since they use the `#![feature]` macro.

:::

### Install Dependencies

Make sure you have the following installed on your system:

* [GCC](http://gcc.gnu.org).
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

### Install [Rust](https://www.rust-lang.org) Nightly

We follow [Rust upstream's recommendation](https://www.rust-lang.org/tools/install) on using [rustup](https://rustup.rs) to install and manage Rust versions.

:::caution

rustup cannot be installed alongside a distribution packaged Rust version. You will need to remove it (if it's present) before you can start using rustup.

:::

Install rustup by running:

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

:::tip

If you want to avoid directly executing a shell script fetched the internet, you can also [download `rustup-init` executable for your platform](https://rust-lang.github.io/rustup/installation/other.html) and run it manually. This will run `rustup-init` which will download and install the latest stable version of Rust on your system.

:::

Install Rust nightly with:

```
rustup install nightly
```

### Build and Install sgxs-tools

```bash
cargo +nightly install sgxs-tools
```

### Run `sgx-detect` Tool

After the installation completes, run `sgx-detect` to make sure that everything is set up correctly.

When everything works, you should get output similar to the following (some things depend on hardware features so your output may differ):

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

The important part is the checkbox under _Able to launch enclaves_ in both _Debug mode_ and _Production mode (Intel whitelisted)_.

In case you encounter errors, see the [list of common SGX installation issues](https://edp.fortanix.com/docs/installation/help/) for help.

## Troubleshooting

See  [the general troubleshooting section](../troubleshooting), before proceeding with ParaTime node-specific troubleshooting.

### Missing `libsgx-aesm-epid-plugin`

If you are encountering the following error message in your node's logs:

```
failed to initialize TEE: error while getting quote info from AESMD: aesm: error 30
```

Ensure you have all required SGX driver libraries installed as listed in [Install SGX Linux Driver section](../set-up-your-node/run-a-paratime-node#install-sgx-linux-driver). Previous versions of this guide were missing the `libsgx-aesm-epid-plugin`.

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

Ensure your system's [`/dev` is NOT mounted with the `noexec` mount option](set-up-trusted-execution-environment-tee#ensure-dev-is-not-mounted-with-the-noexec-option).
