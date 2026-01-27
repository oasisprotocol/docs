# Minimal Runtime

Source: https://docs.oasis.io/build/tools/build-paratime/minimal-runtime

This chapter will show you how to quickly create, build and test a minimal
runtime that allows transfers between accounts by using the `accounts` module
provided by the Runtime SDK.

## Repository Structure and Dependencies

First we create the basic directory structure for the minimal runtime using
Rust's [`cargo`]:

```bash
cargo init minimal-runtime
```

This will create the `minimal-runtime` directory and populate it with some
boilerplate needed to describe a Rust application. It will also set up the
directory for version control using Git. The rest of the guide assumes that you
are executing commands from within this directory.

Since the Runtime SDK requires a nightly version of the Rust toolchain, you need
to specify a version to use by creating a special file called
`rust-toolchain.toml` containing the following information:

```toml title="rust-toolchain.toml"
[toolchain]
channel = "nightly-2025-05-09"
components = ["rustfmt", "clippy"]
targets = ["x86_64-fortanix-unknown-sgx", "wasm32-unknown-unknown"]
profile = "minimal"
```

Additionally, due to the requirements of some upstream dependencies, you need to
configure Cargo to always build with specific target CPU platform features
(namely AES-NI and SSE3) by creating a `.cargo/config.toml` file with the
following content:

```toml title=".cargo/config.toml"
[build]
rustflags = ["-C", "target-feature=+aes,+ssse3"]
rustdocflags = ["-C", "target-feature=+aes,+ssse3"]

[test]
rustflags = ["-C", "target-feature=+aes,+ssse3"]
rustdocflags = ["-C", "target-feature=+aes,+ssse3"]
```

After you complete this guide, the minimal runtime directory structure will look
as follows:

```
minimal-runtime
├── .cargo
│   └── config.toml      # Cargo configuration.
├── Cargo.lock           # Rust dependency tree checksums.
├── Cargo.toml           # Rust crate defintion.
├── rust-toolchain.toml  # Rust toolchain version configuration.
├── src
│   ├── lib.rs           # The runtime definition.
│   └── main.rs          # Some boilerplate for building the runtime.
└── test
    ├── go.mod           # Go module definition
    ├── go.sum           # Go dependency tree checksums.
    └── test.go          # Test client implementation.
```

[`cargo`]: https://doc.rust-lang.org/cargo

## Runtime Definition

First you need to declare the `oasis-runtime-sdk` as a dependency in order to be
able to use its features. To do this, edit the `[dependencies]` section in your
`Cargo.toml` to look like the following:

```toml title="Cargo.toml"
[package]
name = "minimal-runtime"
version = "0.1.0"
edition = "2021"

[dependencies]
oasis-runtime-sdk = { path = "../../../runtime-sdk" }
```

**Info**:

We are using the Git repository directly instead of releasing Rust packages on
crates.io.

After you have declared the dependency on the Runtime SDK the next thing is to
define the minimal runtime. To do this, create `src/lib.rs` with the following
content:

```rust title="src/lib.rs"
//! Minimal runtime.
use std::collections::BTreeMap;

use oasis_runtime_sdk::{self as sdk, modules, types::token::Denomination, Version};

/// Configuration of the various modules.
pub struct Config;

// The base runtime type.
//
// Note that everything is statically defined, so the runtime has no state.
pub struct Runtime;

impl modules::core::Config for Config {}

impl sdk::Runtime for Runtime {
    // Use the crate version from Cargo.toml as the runtime version.
    const VERSION: Version = sdk::version_from_cargo!();

    // Define the module that provides the core API.
    type Core = modules::core::Module<Config>;

    // Define the module that provides the accounts API.
    type Accounts = modules::accounts::Module;

    // Define the modules that the runtime will be composed of. Here we just use
    // the core and accounts modules from the SDK. Later on we will go into
    // detail on how to create your own modules.
    type Modules = (modules::core::Module<Config>, modules::accounts::Module);

    // Define the genesis (initial) state for all of the specified modules. This
    // state is used when the runtime is first initialized.
    //
    // The return value is a tuple of states in the same order as the modules
    // are defined above.
    fn genesis_state() -> <Self::Modules as sdk::module::MigrationHandler>::Genesis {
        (
            // Core module.
            modules::core::Genesis {
                parameters: modules::core::Parameters {
                    max_batch_gas: 10_000,
                    max_tx_signers: 8,
                    max_tx_size: 10_000,
                    max_multisig_signers: 8,
                    min_gas_price: BTreeMap::from([(Denomination::NATIVE, 0)]),
                    ..Default::default()
                },
            },
            // Accounts module.
            modules::accounts::Genesis {
                parameters: modules::accounts::Parameters {
                    gas_costs: modules::accounts::GasCosts { tx_transfer: 100 },
                    ..Default::default()
                },
                balances: BTreeMap::from([
                    (
                        sdk::testing::keys::alice::address(),
                        BTreeMap::from([(Denomination::NATIVE, 1_000_000_000)]),
                    ),
                    (
                        sdk::testing::keys::bob::address(),
                        BTreeMap::from([(Denomination::NATIVE, 2_000_000_000)]),
                    ),
                ]),
                total_supplies: BTreeMap::from([(Denomination::NATIVE, 3_000_000_000)]),
                ..Default::default()
            },
        )
    }
}
```

This defines the behavior (state transition function) and the initial state of
the runtime. We are populating the state with some initial accounts so that we
will be able to test things later. The accounts use test keys provided by the
SDK.

**Danger**:

While the test keys are nice for testing they **should never be used in
production** versions of the runtimes as the private keys are generated from
publicly known seeds!

In order to be able to build a runtime binary that can be loaded by an Oasis
Node, we need to add some boilerplate into `src/main.rs` as follows:

```rust title="src/main.rs"
use oasis_runtime_sdk::Runtime;

fn main() {
    minimal_runtime::Runtime::start();
}
```

## Building and Running

In order to build the runtime you can use the regular Cargo build process by
running:

```bash
cargo build
```

This will generate a binary under `target/debug/minimal-runtime` which will
contain the runtime.

**Info**:

For simplicity, we are building a non-confidential runtime which results in a
regular ELF binary. In order to build a runtime that requires the use of a TEE
like Intel SGX you need to perform some additional steps which are described in
later sections of the guide.

You can also try to run your runtime using:

```bash
cargo run
```

However, this will result in the startup process failing similar to the
following:

```
    Finished dev [unoptimized + debuginfo] target(s) in 0.08s
     Running `target/debug/minimal-runtime`
{"msg":"Runtime is starting","level":"INFO","ts":"2021-06-09T10:35:10.913154095+02:00","module":"runtime"}
{"msg":"Establishing connection with the worker host","level":"INFO","ts":"2021-06-09T10:35:10.913654559+02:00","module":"runtime"}
{"msg":"Failed to connect with the worker host","level":"ERRO","ts":"2021-06-09T10:35:10.913723541+02:00","module":"runtime","err":"Invalid argument (os error 22)"}
```

The reason is that the built runtime binary is designed to be run by Oasis Node
inside a specific sandbox environment. We will see how to deploy the runtime in
a local test environment in the next section.

## Deploying Locally

In order to deploy the newly developed runtime in a local development network,
you can use the `oasis-net-runner` provided in Oasis Core. This will set up a
small network of local nodes that will run the runtime.

```bash
rm -rf /tmp/minimal-runtime-test; mkdir -p /tmp/minimal-runtime-test
${OASIS_CORE_PATH}/oasis-net-runner \
    --fixture.default.node.binary ${OASIS_CORE_PATH}/oasis-node \
    --fixture.default.runtime.binary target/debug/minimal-runtime \
    --fixture.default.runtime.loader ${OASIS_CORE_PATH}/oasis-core-runtime-loader \
    --fixture.default.runtime.provisioner unconfined \
    --fixture.default.keymanager.binary '' \
    --basedir /tmp/minimal-runtime-test \
    --basedir.no_temp_dir
```

After successful startup this should result in the following message being
displayed:

```
level=info module=net-runner caller=root.go:152 ts=2021-06-14T08:42:47.219513806Z msg="client node socket available" path=/tmp/minimal-runtime-test/net-runner/network/client-0/internal.sock
```

**Tip**:

The local network runner will take control of the current terminal until you
terminate it via Ctrl+C. For the rest of the guide keep the local network
running and use a separate terminal to run the client.

## Testing From Oasis CLI

After you have the runtime running in your local network, the next step is to
test that it actually works. First, let's add a new `localhost` network to the
Oasis CLI and provide the path to the local socket file reported above:

```bash
oasis network add-local localhost unix:/tmp/minimal-runtime-test/net-runner/network/client-0/internal.sock
? Description: localhost
? Denomination symbol: TEST
? Denomination decimal places: 9
```

Now, let's see, if the local network was correctly initialized and the runtime
is ready:

```bash
oasis network status --network localhost
```

If everything is working correctly, you should see the `"status": "ready"`
under the runtime's `"committee"` field after a while and an increasing
`"latest_round"` value:

```
      "committee": {
        "status": "ready",
        "active_version": {
          "minor": 1
        },
        "latest_round": 19,
        "latest_height": 302,
        "executor_roles": null,
```

**Info**:

When you restart `oasis-net-runner`, a new [chain context] will be generated
and you will have to remove the `localhost` network and add it again to Oasis
CLI.

Now, let's add `minimal` runtime to the wallet. By default, `oasis-net-runner`
assigns ID `8000000000000000000000000000000000000000000000000000000000000000`
to the first provided runtime.

```shell
oasis paratime add localhost minimal 8000000000000000000000000000000000000000000000000000000000000000
```

```
? Description: minimal
? Denomination symbol: TEST
? Denomination decimal places: 9
```

If the Oasis CLI was configured correctly, you should see the balance of Alice's
account in the runtime. Oasis CLI comes with hidden accounts for Alice, Bob and
other test users (check the [oasis-sdk testing source] for a complete list).
You can access the accounts by prepending `test:` literal in front of the test
user's name, for example `test:alice`.

```shell
oasis account show test:alice --network localhost
```

```
Address: oasis1qrec770vrek0a9a5lcrv0zvt22504k68svq7kzve
Nonce: 0

=== CONSENSUS LAYER (localhost) ===
  Total: 0.0 TEST
  Available: 0.0 TEST



=== minimal PARATIME ===
Balances for all denominations:
  1.0 TEST
```

Sending some TEST in your runtime should also work. Let's send 0.1 TEST to
Bob's address.

```shell
oasis account transfer 0.1 test:bob --network localhost --account test:alice 
```

```
Unlock your account.
? Passphrase: 
You are about to sign the following transaction:
{
  "v": 1,
  "call": {
    "method": "accounts.Transfer",
    "body": "omJ0b1UAyND0Wds45cwxynfmbSxEVty+tQJmYW1vdW50gkQF9eEAQA=="
  },
  "ai": {
    "si": [
      {
        "address_spec": {
          "signature": {
            "ed25519": "NcPzNW3YU2T+ugNUtUWtoQnRvbOL9dYSaBfbjHLP1pE="
          }
        },
        "nonce": 0
      }
    ],
    "fee": {
      "amount": {
        "Amount": "0",
        "Denomination": ""
      },
      "gas": 100
    }
  }
}

Account:  test:alice
Network:  localhost (localhost)
Paratime: minimal (minimal)
? Sign this transaction? Yes
(In case you are using a hardware-based signer you may need to confirm on device.)
Broadcasting transaction...
Transaction included in block successfully.
Round:            14
Transaction hash: 03a73bd08fb23472673ea45938b0871edd9ecd2cd02b3061d49c0906a772348a
Execution successful.
```

[chain context]: https://docs.oasis.io/core/crypto.md#chain-domain-separation

[oasis-sdk testing source]: https://github.com/oasisprotocol/oasis-sdk/blob/main/client-sdk/go/testing/testing.go

## Testing From a Client

While the Oasis CLI is useful to quickly get your hands dirty, a more convenient
way for writing end-to-end tests for your runtime once it grows is to create a
Go client. Let's see how to use Go bindings for Oasis Runtime SDK in practice
to submit some transactions and perform queries.

First, create a `tests` directory and move into it, creating a Go module:

```shell
go mod init example.com/oasisprotocol/minimal-runtime-client
go mod tidy
```

Then create a `test.go` file with the following content:

```go title="test.go"
// Package main provides a test for token transfers.
package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"github.com/oasisprotocol/oasis-core/go/common"
	cmnGrpc "github.com/oasisprotocol/oasis-core/go/common/grpc"
	"github.com/oasisprotocol/oasis-core/go/common/logging"
	"github.com/oasisprotocol/oasis-core/go/common/quantity"

	"github.com/oasisprotocol/oasis-sdk/client-sdk/go/client"
	"github.com/oasisprotocol/oasis-sdk/client-sdk/go/modules/accounts"
	"github.com/oasisprotocol/oasis-sdk/client-sdk/go/testing"
	"github.com/oasisprotocol/oasis-sdk/client-sdk/go/types"
)

// In reality these would come from command-line arguments, the environment
// or a configuration file.
const (
	// This is the default runtime ID as used in oasis-net-runner. It can
	// be changed by using its --fixture.default.runtime.id argument.
	runtimeIDHex = "8000000000000000000000000000000000000000000000000000000000000000"
	// This is the default client node address as set in oasis-net-runner.
	nodeAddress = "unix:/tmp/minimal-runtime-test/net-runner/network/client-0/internal.sock"
)

// The global logger.
var logger = logging.GetLogger("minimal-runtime-client")

// Client contains the client helpers for communicating with the runtime. This is a simple wrapper
// used for convenience.
type Client struct {
	client.RuntimeClient

	// Accounts are the accounts module helpers.
	Accounts accounts.V1
}

// showBalances is a simple helper for displaying account balances.
func showBalances(ctx context.Context, rc *Client, address types.Address) error {
	// Query the runtime, specifically the accounts module, for the given address' balances.
	rsp, err := rc.Accounts.Balances(ctx, client.RoundLatest, address)
	if err != nil {
		return fmt.Errorf("failed to fetch account balances: %w", err)
	}

	fmt.Printf("=== Balances for %s ===\n", address)
	for denom, balance := range rsp.Balances {
		fmt.Printf("%s: %s\n", denom, balance)
	}
	fmt.Printf("\n")

	return nil
}

func tokenTransfer() error {
	// Initialize logging.
	if err := logging.Initialize(os.Stdout, logging.FmtLogfmt, logging.LevelDebug, nil); err != nil {
		return fmt.Errorf("unable to initialize logging: %w", err)
	}

	// Decode hex runtime ID into something we can use.
	var runtimeID common.Namespace
	if err := runtimeID.UnmarshalHex(runtimeIDHex); err != nil {
		return fmt.Errorf("malformed runtime ID: %w", err)
	}

	// Establish a gRPC connection with the client node.
	logger.Info("connecting to local node")
	conn, err := cmnGrpc.Dial(nodeAddress, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return fmt.Errorf("failed to establish connection to %s: %w", nodeAddress, err)
	}
	defer func() {
		_ = conn.Close()
	}()

	// Create the runtime client with account module query helpers.
	c := client.New(conn, runtimeID)
	rc := &Client{
		RuntimeClient: c,
		Accounts:      accounts.NewV1(c),
	}

	ctx, cancelFn := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancelFn()

	// Show initial balances for Alice's and Bob's accounts.
	logger.Info("dumping initial balances")
	if err = showBalances(ctx, rc, testing.Alice.Address); err != nil {
		return err
	}
	if err = showBalances(ctx, rc, testing.Bob.Address); err != nil {
		return err
	}

	// Get current nonce for Alice's account.
	nonce, err := rc.Accounts.Nonce(ctx, client.RoundLatest, testing.Alice.Address)
	if err != nil {
		return fmt.Errorf("failed to fetch account nonce: %w", err)
	}

	// Perform a transfer from Alice to Bob.
	logger.Info("performing transfer", "nonce", nonce)
	// Create a transfer transaction with Bob's address as the destination and 10 native base units
	// as the amount.
	tb := rc.Accounts.Transfer(
		testing.Bob.Address,
		types.NewBaseUnits(*quantity.NewFromUint64(10), types.NativeDenomination),
	).
		// Configure gas as set in genesis parameters. We could also estimate it instead.
		SetFeeGas(100).
		// Append transaction authentication information using a single signature variant.
		AppendAuthSignature(testing.Alice.SigSpec, nonce)
	// Sign the transaction using the signer. Before a transaction can be submitted it must be
	// signed by all configured signers. This will automatically fetch the corresponding chain
	// domain separation context for the runtime.
	if err = tb.AppendSign(ctx, testing.Alice.Signer); err != nil {
		return fmt.Errorf("failed to sign transfer transaction: %w", err)
	}
	// Submit the transaction and wait for it to be included and a runtime block.
	if err = tb.SubmitTx(ctx, nil); err != nil {
		return fmt.Errorf("failed to submit transfer transaction: %w", err)
	}

	// Show final balances for Alice's and Bob's accounts.
	logger.Info("dumping final balances")
	if err = showBalances(ctx, rc, testing.Alice.Address); err != nil {
		return err
	}
	return showBalances(ctx, rc, testing.Bob.Address)
}

func main() {
	if err := tokenTransfer(); err != nil {
		panic(err)
	}
}
```

Fetch the dependencies:

```shell
go get
```

And build it:

```shell
go build
```

The example client will connect to one of the nodes in the network (the *client*
node), query the runtime for initial balances of two accounts (Alice and Bob as
specified above in the genesis state), then proceed to issue a transfer
transaction that will transfer 10 native base units from Alice to Bob. At the
end it will again query and display the final balances of both accounts.

To run the built client do:

```shell
./minimal-runtime-client
```

The output should be something like the following:

```
level=info ts=2022-06-28T14:08:02.834961397Z caller=test.go:81 module=minimal-runtime-client msg="connecting to local node"
level=info ts=2022-06-28T14:08:02.836059713Z caller=test.go:103 module=minimal-runtime-client msg="dumping initial balances"
=== Balances for oasis1qrec770vrek0a9a5lcrv0zvt22504k68svq7kzve ===
<native>: 1000000000

=== Balances for oasis1qrydpazemvuwtnp3efm7vmfvg3tde044qg6cxwzx ===
<native>: 2000000000

level=info ts=2022-06-28T14:08:02.864348758Z caller=test.go:117 module=minimal-runtime-client msg="performing transfer" nonce=0
level=info ts=2022-06-28T14:08:18.515842571Z caller=test.go:146 module=minimal-runtime-client msg="dumping final balances"
=== Balances for oasis1qrec770vrek0a9a5lcrv0zvt22504k68svq7kzve ===
<native>: 999999990

=== Balances for oasis1qrydpazemvuwtnp3efm7vmfvg3tde044qg6cxwzx ===
<native>: 2000000010

```

You can try running the client multiple times and it should transfer the given
amount each time. As long as the local network is running the state will be
preserved.

Congratulations, you have successfully built and deployed your first runtime!

**Info**: Example

You can view and download complete [runtime example] and [client code in Go]
from the Oasis SDK repository.

[runtime example]: https://github.com/oasisprotocol/oasis-sdk/tree/main/examples/runtime-sdk/minimal-runtime

[client code in Go]: https://github.com/oasisprotocol/oasis-sdk/tree/main/examples/client-sdk/go/minimal-runtime-client

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
