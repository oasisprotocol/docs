# ROFL

Source: https://docs.oasis.io/build/tools/cli/rofl

## Manage ROFL Apps

The `rofl` command combines a series of actions for managing the [Runtime
OFfchain Logic (ROFL)][rofl] apps:

* build ROFL locally,
* verify the ROFL bundle,
* register, deregister and update ROFL apps on the network,
* show information about the registered ROFL apps,
* other convenient tooling for ROFL app developers.

[rofl]: https://docs.oasis.io/build/rofl.md

### Initialize a new ROFL app manifest

The `rofl init` command will prepare a new ROFL manifest in the given directory
(defaults to the current directory). The manifest is a YAML file named
`rofl.yaml` which defines the versions of all components, upgrade policies, etc.
needed to manage, build and deploy the ROFL app.

```shell
oasis rofl init
```

```
Creating a new ROFL app with default policy...
Name:     myapp
Version:  0.1.0
TEE:      tdx
Kind:     container
Created manifest in 'rofl.yaml'.
Run `oasis rofl create` to register your ROFL app and configure an app ID.
```

You can create a new ROFL manifest file based on the existing one by passing
`--reset` flag. This is useful if you want to make your own deployment of
the existing ROFL project. It will remove information on previous user-specific
deployments but keep information such as the minimum CPU, memory and storage
requirements.

### Create a new ROFL app on the network

Use `rofl create` to register a new ROFL app on the network using an existing
manifest.

You can also define specific [Network, ParaTime and Account][npa] parameters
as those get recorded into the manfiest so you don't need to specify them on
each invocation:

```shell
oasis rofl create --network testnet --account my_rofl_acc
```

```
You are about to sign the following transaction:
Format: plain
Method: rofl.Create
Body:
  {
    "policy": {
      "quotes": {
        "pcs": {
          "tcb_validity_period": 30,
          "min_tcb_evaluation_data_number": 17,
          "tdx": {}
        }
      },
      "enclaves": [],
      "endorsements": [
        {
          "any": {}
        }
      ],
      "fees": 2,
      "max_expiration": 3
    },
    "scheme": 1
  }
Authorized signer(s):
  1. sk5kvBHaZ/si0xXRdjllIOxOgr7o2d1K+ckVaU3ndG4= (ed25519)
     Nonce: 319
Fee:
  Amount: 0.0101405 TEST
  Gas limit: 101405
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire (Sapphire Testnet)
Account:  test:dave
```

Returned is the unique ROFL app ID starting with `rofl1` and which you
will refer to for managing your ROFL app in the future. The manifest is
automatically updated with the newly assigned app identifier.

**Info**:

In order to prevent spam attacks registering a ROFL app requires a
certain amount to be deposited from your account until you decide to
[remove it](#remove). The deposit remains locked for the lifetime of the app.
Check out the [Stake Requirements] chapter for more information.

With the `--scheme` parameter, you can select one of the following ROFL app ID
derivation schemes:

* `cn` for the ROFL app creator address (the account you're using to sign the
  transaction) combined with the account's nonce (default). This behavior is
  similar to the one of the Ethereum [smart contract address derivation] and is
  deterministic.
* `cri` uses the ROFL app creator address combined with the block round the
  transaction will be validated in and its position inside that block.

[Stake Requirements]: https://docs.oasis.io/node/run-your-node/prerequisites/stake-requirements.md

[smart contract address derivation]: https://ethereum.org/en/developers/docs/accounts/#contract-accounts

### Build ROFL

The `rofl build` command will execute a series of build commands depending on
the target Trusted Execution Environment (TEE) and produce the Oasis Runtime
Container (ORC) bundle.

Additionally, the following flags are available:

* `--output` the filename of the output ORC bundle. Defaults to the pattern
  `<name>.<deployment>.orc` where `<name>` is the app name from the manifest and
  `<deployment>` is the deployment name from the manifest.

* `--verify` also verifies the locally built enclave identity against the
  identity that is currently defined in the manifest and also against the
  identity that is currently set in the on-chain policy. It does not update the
  manifest file with new entity id(s).

* `--no-update-manifest` do not update the enclave identity stored in the app
  manifest.

**Info**:

Building ROFL apps does not require a working TEE on your machine. However, you
do need to install all corresponding tools. Check out the [ROFL Prerequisites]
chapter for details.

[ROFL Prerequisites]: https://docs.oasis.io/build/rofl/workflow/prerequisites.md

[npa]: https://docs.oasis.io/build/tools/cli/account.md#npa

### Secrets management

#### Set secret

Run `rofl secret set <secret_name> <filename>|-` command to end-to-end encrypt a
secret with a key derived from the selected deployment network and store it to
the manifest file.

If you have your secret in a file, run:

```shell
oasis rofl secret set MY_SECRET mysecret.txt
```

You can also feed the secret from a standard input like this:

```shell
echo -n "this-is-a-very-secret-value-here" | oasis rofl secret set MY_SECRET -
```

Once the secret is encrypted and stored, **there is no way of obtaining the
unencrypted value back again apart from within the TEE on the designated ROFL
deployment**.

Additionally, the following flags are available:

* `--force` replaces an existing secret.
* `--public-name <public-name>` defines the name of the secret that will be
  publicly exposed e.g. in the Oasis Explorer. By default, the public name is
  the same as the name of the secret.

**Danger**: Shells store history

Passing secrets as a command line argument will store them in your shell history
file as well! Use this approach only for testing. In production, always use
file-based secrets.

#### Import secrets from `.env` files

Run `rofl secret import <dot-env-file>|-` to bulk-import secrets from a
[dotenv](https://github.com/motdotla/dotenv) compatible file (key=value with
`#` comments). This is handy for files like `.env`, `.env.production`,
`.env.testnet`, or symlinks such as `.env → .env.production`. You can also
pass `-` to read from standard input.

Each `KEY=VALUE` pair becomes a separate secret entry in your manifest.
Quoted values may span multiple physical lines;
newline characters are preserved.
Double-quoted values also support common escapes (`\n`, `\r`, `\t`, `\"`, `\\`).
Lines starting with `#` are ignored. Unquoted values stop at an unquoted `#`
comment.

```shell
oasis rofl secret import .env.production
```

```bash
oasis rofl secret import .env
```

By default, if a secret with the same name already exists,
the command will
fail. Use `--force` to replace existing secrets.

After importing, **run**:

```bash
oasis rofl update
```

to push the updated secrets on-chain.

#### Get secret info

Run `rofl secret get <secret-name>` to check whether the secret exists in your
manifest file.

```shell
oasis rofl secret get MY_SECRET
```

```
Name:        MY_SECRET
Size:        156 bytes
```

#### Remove secret

Run `rofl secret rm <secret-name>` to remove the secret from your manifest file.

```shell
oasis rofl secret rm MY_SECRET
```

### Update ROFL app config on-chain

Use `rofl update` command to push the ROFL app's configuration to the chain:

```shell
oasis rofl update
```

```shell
You are about to sign the following transaction:
Format: plain
Method: rofl.Update
Body:
  {
    "id": "rofl1qzd82n99vtwesvcqjfyur4tcm45varz2due7s635",
    "policy": {
      "quotes": {
        "pcs": {
          "tcb_validity_period": 30,
          "min_tcb_evaluation_data_number": 17,
          "tdx": {}
        }
      },
      "enclaves": [],
      "endorsements": [
        {
          "any": {}
        }
      ],
      "fees": 2,
      "max_expiration": 3
    },
    "admin": "oasis1qrk58a6j2qn065m6p06jgjyt032f7qucy5wqeqpt"
  }
Authorized signer(s):
  1. sk5kvBHaZ/si0xXRdjllIOxOgr7o2d1K+ckVaU3ndG4= (ed25519)
     Nonce: 320
Fee:
  Amount: 0.010145 TEST
  Gas limit: 101450
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire (Sapphire Testnet)
Account:  test:dave
```

The current on-chain policy, metadata and secrets will be replaced with the ones
in the manifest file. Keep in mind that ROFL replicas need to be restarted in
order for changes to take effect.

### Show ROFL information

Run `rofl show` to obtain the information from the network on the ROFL admin
account, staked amount, current ROFL policy and running instances:

```shell
oasis rofl show
```

```
App ID:        rofl1qzd82n99vtwesvcqjfyur4tcm45varz2due7s635
Admin:         oasis1qrk58a6j2qn065m6p06jgjyt032f7qucy5wqeqpt
Staked amount: 10000.0
Policy:
  {
    "quotes": {
      "pcs": {
        "tcb_validity_period": 30,
        "min_tcb_evaluation_data_number": 17,
        "tdx": {}
      }
    },
    "enclaves": [
      "z+StFagJfBOdGlUGDMH7RlcNUm1uqYDUZDG+g3z2ik8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
      "6KfY4DqD1Vi+H7aUn5FwwLobEzERHoOit7xsrPNz3eUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
    ],
    "endorsements": [
      {
        "any": {}
      }
    ],
    "fees": 2,
    "max_expiration": 3
  }

=== Instances ===
- RAK:        UwuhJrOYX6FDOc27NilQSrcVEtWD9voq+ST+ohsaRTI=
  Node ID:    DbeoxcRwDO4Wh8bwq5rAR7wzhiB+LeYn+y7lFSGAZ7I=
  Expiration: 7
```

### Deploy ROFL app

Run `rofl deploy` to automatically deploy your app to a machine obtained from
the [ROFL marketplace]. If a machine is already configured in your manifest file
a new version of your ROFL app will be deployed there. If no machines are rented
yet, you can use the following arguments to select a specific provider and
offer:

* `--provider <address>` specifies the provider to rent the machine from. On
  Sapphire Testnet, the Oasis-managed provider will be selected by default.
* `--offer <offer_name>` specifies the offer of the machine to rent. By default
  it takes the most recent offer. Run `--show-offers` to list offers and
  specifications.
* `--term <hour|month|year>` specifies the base rent period. It takes the first
  available provider term by default.
* `--term-count <number>` specifies the multiplier. Default is `1`.

```shell
oasis rofl deploy --deployment mainnet --provider oasis1qzc8pldvm8vm3duvdrj63wgvkw34y9ucfcxzetqr --offer small --term hour --term-count 24
```

```
Using provider: oasis1qzc8pldvm8vm3duvdrj63wgvkw34y9ucfcxzetqr
Pushing ROFL app to OCI repository 'rofl.sh/7aaddbd5-d782-430f-9362-f0107aa109d2:1750242297'...
No pre-existing machine configured, creating a new one...
Taking offer: small [0000000000000000]
WARNING: Machine rental is non-refundable. You will not get a refund for the already paid term if you cancel.
Unlock your account.
? Passphrase: 
You are about to sign the following transaction:
Format: plain
Method: roflmarket.InstanceCreate
Body:
  {
    "provider": "oasis1qzc8pldvm8vm3duvdrj63wgvkw34y9ucfcxzetqr",
    "offer": "0000000000000000",
    "deployment": {
      "app_id": "rofl1qpw7gxp7dqq72sdtpv4jrmdfys9nsp73wysglhue",
      "manifest_hash": "c2bc74e68cbb5b9a70a2c7a378f79158e2c5975eca6bd4cbbeff602a1a12b311",
      "metadata": {
        "net.oasis.deployment.orc.ref": "rofl.sh/7aaddbd5-d782-430f-9362-f0107aa109d2:1750242297@sha256:ee206f123b395c630e6b52ff779c0cd63eb5ea99ba97275559558e340647ccb2"
      }
    },
    "term": 1,
    "term_count": 24
  }
Authorized signer(s):
  1. Amc63/tU+uNrYi7OID2a5a/hHbsbGTtAolnlyA+MF5g5 (secp256k1eth)
     Nonce: 6
Fee:
  Amount: 0.0121926 ROSE
  Gas limit: 121926
  (gas price: 0.0000001 ROSE per gas unit)

Network:  mainnet
ParaTime: sapphire
Account:  test:dave
? Sign this transaction? Yes
(In case you are using a hardware-based signer you may need to confirm on device.)
Broadcasting transaction...
Transaction included in block successfully.
Round:            9356523
Transaction hash: bce96976f38485546b5950f8b2a7f9b7c43b9656935cc472a90680187469f4dd
Execution successful.
Created machine: 0000000000000000
Deployment into machine scheduled.
This machine expires on 2025-08-07 12:35:47 +0200 CEST. Use `oasis rofl machine top-up` to extend it.
Use `oasis rofl machine show` to check status.
```

[ROFL marketplace]: https://docs.oasis.io/build/rofl/features/marketplace.md

### Manage a deployed ROFL machine

Once a ROFL app is deployed, you can manage the machine it's running on using
the `oasis rofl machine` subcommands.

#### Show machine information

To view details about a deployed machine, including its status, expiration,
and any proxy URLs, run `oasis rofl machine show`:

```shell
oasis rofl machine show
```

```
Name:       default
Provider:   oasis1qp2ens0hsp7gh23wajxa4hpetkdek3swyyulyrmz
ID:         000000000000025a
Offer:      0000000000000001
Status:     accepted
Creator:    oasis1qzvxd8vjgp2y0tjx229420tva822mdk2wxpx0vws
Admin:      oasis1qzvxd8vjgp2y0tjx229420tva822mdk2wxpx0vws
Node ID:    DbeoxcRwDO4Wh8bwq5rAR7wzhiB+LeYn+y7lFSGAZ7I=
Created at: 2025-08-25 10:00:00 +0000 UTC
Updated at: 2025-08-25 10:00:10 +0000 UTC
Paid until: 2025-08-26 10:00:00 +0000 UTC
Proxy:
  Domain: m602.test-proxy-b.rofl.app
  Ports from compose file:
    8080 (http-echo): https://p8080.m602.test-proxy-b.rofl.app
Resources:
  TEE:     Intel TDX
  Memory:  4096 MiB
  vCPUs:   2
  Storage: 20000 MiB
Deployment:
  App ID: rofl1qrqw99h0f7az3hwt2cl7yeew3wtz0fxunu7luyfg
  Metadata:
    net.oasis.deployment.orc.ref: rofl.sh/0ba0712d-114c-4e39-ac8e-b28edffcada8:1747909776@sha256:77ff0dc76adf957a4a089cf7cb584aa7788fef027c7180ceb73a662ede87a217
Commands:
  <no queued commands>
```

If you have published ports in your `compose.yaml`, the output will include
a `Proxy` section with public URLs to access your services. For more details on
how to configure the proxy and for troubleshooting, see the [ROFL Proxy]
feature page.

[ROFL Proxy]: https://docs.oasis.io/build/rofl/features/proxy.md

#### Top-up payment for the machine

Run `rofl machine top-up` to extend the rental of the machine obtained from
the [ROFL marketplace]. You can check the current expiration date of your
machine in the `Paid until` field from
the [`oasis rofl machine show` output](#machine-show).
The rental is extended under the terms of the original
offer. Specify the extension period with [`--term`][term-flags] and
[`--term-count`][term-flags] parameters.

```shell
oasis rofl machine top-up --term hour --term-count 12
```

```
Using provider:     oasis1qp2ens0hsp7gh23wajxa4hpetkdek3swyyulyrmz (oasis1qp2ens0hsp7gh23wajxa4hpetkdek3swyyulyrmz)
Top-up machine:     default [000000000000022a]
Top-up term:        12 x hour
WARNING: Machine rental is non-refundable. You will not get a refund for the already paid term if you cancel.
Unlock your account.
? Passphrase: 
You are about to sign the following transaction:
Format: plain
Method: roflmarket.InstanceTopUp
Body:
  {
    "provider": "oasis1qp2ens0hsp7gh23wajxa4hpetkdek3swyyulyrmz",
    "id": "000000000000022a",
    "term": 1,
    "term_count": 12
  }
Authorized signer(s):
  1. AyZKkxNFeyqLI5HGTYqEmCcYxKGo/kueOzSHzdnrSePO (secp256k1eth)
     Nonce: 996
Fee:
  Amount: 0.0013614 TEST
  Gas limit: 13614
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  dave
? Sign this transaction? Yes
(In case you are using a hardware-based signer you may need to confirm on device.)
Broadcasting transaction...
Transaction included in block successfully.
Round:            12917124
Transaction hash: 094ddc21c39acd96789153003016bda5d2a0077e7be11635bb755b6c49c287ac
Execution successful.
Machine topped up.
```

[term-flags]: #deploy

#### Show machine logs

You can fetch logs from your running ROFL app using `oasis rofl machine logs`.

```shell
oasis rofl machine logs
```

**Danger**: Logs are not encrypted!

While only the app admin can access the logs, they are stored
**unencrypted on the ROFL node**. In production, make sure
you never print any confidential data to the standard or error outputs!

#### Restart a machine

To restart a running machine, use `oasis rofl machine restart`.

If you wish to clear the machine's persistent storage,
pass the [`--wipe-storage`] flag.

[`--wipe-storage`]: #deploy

#### Stop a machine

To stop a machine, use `oasis rofl machine stop`.
To start it back again, use [`oasis rofl machine restart`].

[`oasis rofl machine restart`]: #machine-restart

#### Remove a machine

To cancel the rental and permanently remove a machine,
including its persistent storage, use `oasis rofl machine remove`.

**Info**:

Canceling a machine rental will not refund any payment for the already paid
term.

### Advanced

#### Upgrade ROFL app dependencies

Run `rofl upgrade` to bump ROFL bundle TDX artifacts in your manifest file to
their latest versions. This includes:

* the firmware
* the kernel
* stage two boot
* ROFL containers middleware (for TDX containers kind only)

```shell
oasis rofl upgrade
```

#### Remove ROFL app from the network

Run `rofl remove` to deregister your ROFL app:

```shell
oasis rofl remove
```

```
WARNING: Removing this ROFL app will DEREGISTER it, ERASE any on-chain secrets and local configuration!
WARNING: THIS ACTION IS IRREVERSIBLE!
? Remove ROFL app 'rofl1qzd82n99vtwesvcqjfyur4tcm45varz2due7s635' deployed on network 'testnet' Yes
Unlock your account.
? Passphrase:
You are about to sign the following transaction:
Format: plain
Method: rofl.Remove
Body:
  {
    "id": "rofl1qzd82n99vtwesvcqjfyur4tcm45varz2due7s635"
  }
Authorized signer(s):
  1. sk5kvBHaZ/si0xXRdjllIOxOgr7o2d1K+ckVaU3ndG4= (ed25519)
     Nonce: 321
Fee:
  Amount: 0.0011288 TEST
  Gas limit: 11288
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire (Sapphire Testnet)
Account:  test:dave
```

The deposit required to register the ROFL app will be returned to the current
administrator account.

**Danger**: Secrets will be permanently lost

All secrets stored on-chain will be permanently lost when the ROFL app is
deregistered! If you backed up your manifest file, those secrets will also be
unretrievable since they were encrypted with a ROFL deployment-specific keypair.

#### ROFL provider tooling

The `rofl provider` commands offers tools for managing your on-chain provider
information and your offers.

An example provider configuration file looks like this:

```yaml title="rofl-provider.yaml"
# Network name in your Oasis CLI
network: testnet
# ParaTime name in your Oasis CLI
paratime: sapphire
# Account name in your Oasis CLI
provider: rofl_provider
# List of Base64-encoded node IDs allowed to execute ROFL apps
nodes:
  -
# Address of the scheduler app
scheduler_app: rofl1qrqw99h0f7az3hwt2cl7yeew3wtz0fxunu7luyfg 
# Account name or address of who receives ROFL machine rental payments
payment_address: rofl_provider
offers:
  - id: small # Short human-readable name
    resources:
      tee: tdx # Possible values: sgx, tdx
      memory: 4096 # In MiB
      cpus: 2
      storage: 20000 # In MiB
    payment:
      native: # Possible keys: native, evm
        terms:
          hourly: 10 # Possible keys: hourly, monthly, yearly
    capacity: 50 # Max number of actively rented machines
```

##### Initialize a ROFL provider

The `rofl provider init` initializes a new provider configuration file.

**Info**:

[Network and ParaTime](https://docs.oasis.io/build/tools/cli/account.md#npa) selectors are available for the
`rofl provider init` command.

##### Create a ROFL provider on-chain

Run `rofl provider create` to register your account as a provider on the
configured network and ParaTime.

```shell
oasis rofl provider create
```

```
Unlock your account.
? Passphrase: 
You are about to sign the following transaction:
Format: plain
Method: roflmarket.ProviderCreate
Body:
  {
    "nodes": [],
    "scheduler_app": "rofl1qrqw99h0f7az3hwt2cl7yeew3wtz0fxunu7luyfg",
    "payment_address": {
      "native": "oasis1qrk58a6j2qn065m6p06jgjyt032f7qucy5wqeqpt"
    },
    "offers": null,
    "metadata": {}
  }
Authorized signer(s):
  1. AyZKkxNFeyqLI5HGTYqEmCcYxKGo/kueOzSHzdnrSePO (secp256k1eth)
     Nonce: 858
Fee:
  Amount: 0.012167 TEST
  Gas limit: 121670
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  test:dave
```

**Info**:

In order to prevent spam attacks registering a ROFL provider requires a
certain amount to be deposited from your account until you decide to
[remove it](#provider-remove). The deposit remains locked for the lifetime of
the provider entity. Check out the [Stake Requirements] chapter for more
information.

##### Update ROFL provider policies

Use `rofl provider update` to update the list of endorsed nodes, the scheduler
app address, the payment recipient address and other provider settings.

```shell
oasis rofl provider update
```

```
Unlock your account.
? Passphrase: 
You are about to sign the following transaction:
Format: plain
Method: roflmarket.ProviderUpdate
Body:
  {
    "provider": "oasis1qrk58a6j2qn065m6p06jgjyt032f7qucy5wqeqpt",
    "nodes": [],
    "scheduler_app": "rofl1qrqw99h0f7az3hwt2cl7yeew3wtz0fxunu7luyfg",
    "payment_address": {
      "native": "oasis1qrk58a6j2qn065m6p06jgjyt032f7qucy5wqeqpt"
    },
    "metadata": {}
  }
Authorized signer(s):
  1. AyZKkxNFeyqLI5HGTYqEmCcYxKGo/kueOzSHzdnrSePO (secp256k1eth)
     Nonce: 860
Fee:
  Amount: 0.0121698 TEST
  Gas limit: 121698
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  test:dave
```

To update your offers, run
[`rofl provider update-offers`](#provider-update-offers) instead.

##### Update ROFL provider offers

Use `rofl provider update-offers` to replace the on-chain offers with the ones
in your provider manifest file.

```shell
oasis rofl provider update-offers
```

```
$ oasis rofl provider update-offers 
Unlock your account.
? Passphrase: 
Going to perform the following updates:
Add offers:
  - small
Update offers:
  <none>
Remove offers:
  <none>
You are about to sign the following transaction:
Format: plain
Method: roflmarket.ProviderUpdateOffers
Body:
  {
    "provider": "oasis1qrk58a6j2qn065m6p06jgjyt032f7qucy5wqeqpt",
    "add": [
      {
        "id": "0000000000000000",
        "resources": {
          "tee": 2,
          "memory": 4096,
          "cpus": 2,
          "storage": 20000
        },
        "payment": {
          "native": {
            "denomination": "",
            "terms": {
              "1": "10000000000000000000"
            }
          }
        },
        "capacity": 50,
        "metadata": {
          "net.oasis.scheduler.offer": "small"
        }
      }
    ]
  }
Authorized signer(s):
  1. AyZKkxNFeyqLI5HGTYqEmCcYxKGo/kueOzSHzdnrSePO (secp256k1eth)
     Nonce: 860
Fee:
  Amount: 0.0133782 TEST
  Gas limit: 133782
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  test:dave
```

To update your provider policies, run [`rofl provider update`](#provider-update)
instead.

##### List ROFL providers

Use `rofl provider list` to display all ROFL providers registered on the
selected ParaTime:

```shell
oasis rofl provider list
```

```
PROVIDER ADDRESS                              	SCHEDULER APP                                	NODES	OFFERS	INSTANCES
oasis1qp2ens0hsp7gh23wajxa4hpetkdek3swyyulyrmz	rofl1qrqw99h0f7az3hwt2cl7yeew3wtz0fxunu7luyfg	2    	1     	12
oasis1qqw74ezqygseg32e7jq9tl637q7aa4h7qsssmwp3	rofl1qrqw99h0f7az3hwt2cl7yeew3wtz0fxunu7luyfg	1    	3     	0
oasis1qrcxr6lh03xyazkg7ad7q2dqs94kj0arusmyzq8g	rofl1qrqw99h0f7az3hwt2cl7yeew3wtz0fxunu7luyfg	0    	0     	0
oasis1qrfeadn03ljm0kfx8wx0d5zf6kj79pxqvv0dukdm	rofl1qrqw99h0f7az3hwt2cl7yeew3wtz0fxunu7luyfg	1    	1     	2
oasis1qrjprejadvxjwj3m3mj8xurt0mvafw4jhymmmtlj	rofl1qrqw99h0f7az3hwt2cl7yeew3wtz0fxunu7luyfg	0    	0     	0
oasis1qrpptdcpsxvxn3re0cg3f6hfy0kyfujnz5ex7vgn	rofl1qr95suussttd2g9ehu3zcpgx8ewtwgayyuzsl0x2	0    	2     	2
oasis1qrxhk2aqwq7g5fq85a89yv2khdgn2wzccqhg2sal	rofl1qrqw99h0f7az3hwt2cl7yeew3wtz0fxunu7luyfg	1    	4     	0
```

The command displays provider addresses, scheduler app IDs, node counts, and
offer/instance counts for each provider.

To see detailed information about all offers from each provider, use the
`--show-offers` flag:

```shell
oasis rofl provider list --show-offers
```

##### Show ROFL provider details

Use `rofl provider show <address>` to display detailed information about a
specific ROFL provider, including all their offers:

```shell
oasis rofl provider show oasis1qqw74ezqygseg32e7jq9tl637q7aa4h7qsssmwp3
```

```
Provider: oasis1qqw74ezqygseg32e7jq9tl637q7aa4h7qsssmwp3

=== Basic Information ===
Scheduler App:    rofl1qrqw99h0f7az3hwt2cl7yeew3wtz0fxunu7luyfg
Payment Address:  oasis1qqw74ezqygseg32e7jq9tl637q7aa4h7qsssmwp3
Nodes:            1
  1. mXsy6XlJlEK5vJwEfyqRWZLVN5Ss4QpwI6h124IDjjw=
Stake:            100.0 TEST
Offers:           3
Instances:        0
Created At:       2025-11-15T21:40:22Z
Updated At:       2025-11-15T21:40:22Z

=== Offers ===
  - small [0000000000000000]
    TEE: tdx | Memory: 8192 MiB | vCPUs: 2 | Storage: 39.06 GiB
    Capacity: 10
    Note: Small instance - ideal for lightweight ROFL applications
    Description:
      Small compute instance with 2 vCPUs, 8GB RAM, and 40GB storage.
      Perfect for testing and lightweight ROFL applications.
      Hosted on Akash decentralized cloud infrastructure.
    Payment: monthly: 150.0 TEST
  - medium [0000000000000001]
    TEE: tdx | Memory: 16384 MiB | vCPUs: 4 | Storage: 78.12 GiB
    Capacity: 5
    Note: Medium instance - balanced compute and memory
    Description:
      Medium compute instance with 4 vCPUs, 16GB RAM, and 80GB storage.
      Great for standard ROFL applications with moderate resource needs.
      Hosted on Akash decentralized cloud infrastructure.
    Payment: monthly: 300.0 TEST
  - large [0000000000000002]
    TEE: tdx | Memory: 28672 MiB | vCPUs: 8 | Storage: 175.78 GiB
    Capacity: 1
    Note: Large instance - high-performance computing
    Description:
      Large compute instance with 8 vCPUs, 28GB RAM, and 180GB storage.
      Designed for resource-intensive ROFL applications.
      Hosted on Akash decentralized cloud infrastructure.
    Payment: monthly: 600.0 TEST
```

This command provides comprehensive information including:

* Basic provider information (address, scheduler app, payment address)
* List of endorsed nodes
* Stake amount
* Detailed information about all offers (resources, pricing terms, capacity)

Use `--format json` to get the full provider metadata in machine-readable
format.

##### Remove ROFL provider from the network

Run `rofl provider remove` to deregister your ROFL provider account:

```shell
oasis rofl provider remove
```

```
Unlock your account.
? Passphrase: 
You are about to sign the following transaction:
Format: plain
Method: roflmarket.ProviderRemove
Body:
  {
    "provider": "oasis1qrk58a6j2qn065m6p06jgjyt032f7qucy5wqeqpt"
  }
Authorized signer(s):
  1. AyZKkxNFeyqLI5HGTYqEmCcYxKGo/kueOzSHzdnrSePO (secp256k1eth)
     Nonce: 859
Fee:
  Amount: 0.0121578 TEST
  Gas limit: 121578
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  test:dave
```

The deposit required to register the ROFL provider will be returned to its
address.

#### Show ROFL identity

Run `rofl identity` to compute the **cryptographic identity** of the ROFL app:

```shell
oasis rofl identity rofl-oracle.orc
```

```
wzwUd5Ym/e5OO87pGVk2yWL4v0x12U3Zx/48Vdoe1PyTBkRbZbh9kPyqgY1RsvenXEIHQA0c2nR/WlmvS1vbcg==
```

The output above is Base64-encoded enclave identity which depends on the ROFL
source code and the build environment. Enclave identities should be reproducible
on any computer and are used to prove and verify the integrity of ROFL binaries
on the network. See the [Reproducibility] chapter to learn more.

[Reproducibility]: https://docs.oasis.io/build/tools/build-paratime/reproducibility.md

#### Show the current trust-root

In order the ROFL app can trust the environment it is executed in, it
needs to have a hardcoded *trust root*. Typically, it consists of:

* the [ParaTime ID],
* the [chain domain separation context],
* the specific consensus block hash and its height.

To obtain the latest trust root in rust programming language, run
`oasis rofl trust-root`:

```shell
oasis rofl trust-root
```

```
TrustRoot {
    height: 1022,
    hash: "bb3e63d729dd568ce07b37eea33eddf8082ed4cacbd64097aad32168a4a4fc9a".into(),
    runtime_id: "8000000000000000000000000000000000000000000000000000000000000000".into(),
    chain_context: "074f5ba071c4385a7ad24aea0a3a7b137901395e8f3b35479c1cce87d3170f4e".to_string(),
}
```

You can also define specific [Network and ParaTime][npa] parameters:

```shell
oasis rofl trust-root --network testnet --paratime sapphire
```

[ParaTime ID]: https://docs.oasis.io/core/runtime/identifiers.md

[chain domain separation context]: https://docs.oasis.io/core/crypto.md#chain-domain-separation

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
