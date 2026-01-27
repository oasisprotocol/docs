# Hello World

Source: https://docs.oasis.io/build/tools/other-paratimes/cipher/hello-world

This chapter will show you how to quickly create, build and test a minimal
Oasis WebAssembly smart contract.

## Repository Structure and Dependencies

First we create the basic directory structure for the hello world contract using
Rust's [`cargo`]:

```bash
cargo init --lib hello-world
```

This will create the `hello-world` directory and populate it with some
boilerplate needed to describe a Rust application. It will also set up the
directory for version control using Git. The rest of the guide assumes that you
are executing commands from within this directory.

Since the Contract SDK requires a nightly version of the Rust toolchain, you
need to specify a version to use by creating a special file called
`rust-toolchain` containing the following information:

```
[toolchain]
channel = "nightly-2025-05-09"
components = ["rustfmt", "clippy"]
targets = ["x86_64-fortanix-unknown-sgx", "wasm32-unknown-unknown"]
profile = "minimal"
```

After you complete this guide, the minimal runtime directory structure will look
as follows:

```
hello-world
├── Cargo.lock           # Dependency tree checksums (generated on first compilation).
├── Cargo.toml           # Rust crate definition.
├── rust-toolchain.toml  # Rust toolchain version configuration.
└── src
    └── lib.rs           # Smart contract source code.
```

[`cargo`]: https://doc.rust-lang.org/cargo

## Smart Contract Definition

First you need to declare some dependencies in order to be able to use the smart
contract SDK. Additionally, you will want to specify some optimization flags in
order to make the compiled smart contract as small as possible. To do this, edit
your `Cargo.toml` to look like the following:

```toml title="Cargo.toml"
[package]
name = "hello-world"
version = "0.0.0"
edition = "2021"
license = "Apache-2.0"

[lib]
crate-type = ["cdylib"]

[dependencies]
cbor = { version = "0.5.1", package = "oasis-cbor" }
oasis-contract-sdk = { git = "https://github.com/oasisprotocol/oasis-sdk", tag = "contract-sdk/v0.4.1" }
oasis-contract-sdk-storage = { git = "https://github.com/oasisprotocol/oasis-sdk", tag = "contract-sdk/v0.4.1" }

# Third party.
thiserror = "1.0.30"

[profile.release]
opt-level = 3
debug = false
rpath = false
lto = true
debug-assertions = false
codegen-units = 1
panic = "abort"
incremental = false
overflow-checks = true
strip = true
```

**Info**:

We are using Git tags for releases instead of releasing Rust packages on
crates.io.

After you have updated your `Cargo.toml` the next thing is to define the hello
world smart contract. To do this, edit `src/lib.rs` with the following
content:

```rust title="src/lib.rs"
//! A minimal hello world smart contract.
extern crate alloc;

use oasis_contract_sdk as sdk;
use oasis_contract_sdk_storage::cell::PublicCell;

/// All possible errors that can be returned by the contract.
///
/// Each error is a triplet of (module, code, message) which allows it to be both easily
/// human readable and also identifyable programmatically.
#[derive(Debug, thiserror::Error, sdk::Error)]
pub enum Error {
    #[error("bad request")]
    #[sdk_error(code = 1)]
    BadRequest,
}

/// All possible requests that the contract can handle.
///
/// This includes both calls and queries.
#[derive(Clone, Debug, cbor::Encode, cbor::Decode)]
pub enum Request {
    #[cbor(rename = "instantiate")]
    Instantiate { initial_counter: u64 },

    #[cbor(rename = "say_hello")]
    SayHello { who: String },
}

/// All possible responses that the contract can return.
///
/// This includes both calls and queries.
#[derive(Clone, Debug, Eq, PartialEq, cbor::Encode, cbor::Decode)]
pub enum Response {
    #[cbor(rename = "hello")]
    Hello { greeting: String },

    #[cbor(rename = "empty")]
    Empty,
}

/// The contract type.
pub struct HelloWorld;

/// Storage cell for the counter.
const COUNTER: PublicCell<u64> = PublicCell::new(b"counter");

impl HelloWorld {
    /// Increment the counter and return the previous value.
    fn increment_counter<C: sdk::Context>(ctx: &mut C) -> u64 {
        let counter = COUNTER.get(ctx.public_store()).unwrap_or_default();
        COUNTER.set(ctx.public_store(), counter + 1);

        counter
    }
}

// Implementation of the sdk::Contract trait is required in order for the type to be a contract.
impl sdk::Contract for HelloWorld {
    type Request = Request;
    type Response = Response;
    type Error = Error;

    fn instantiate<C: sdk::Context>(ctx: &mut C, request: Request) -> Result<(), Error> {
        // This method is called during the contracts.Instantiate call when the contract is first
        // instantiated. It can be used to initialize the contract state.
        match request {
            // We require the caller to always pass the Instantiate request.
            Request::Instantiate { initial_counter } => {
                // Initialize counter to specified value.
                COUNTER.set(ctx.public_store(), initial_counter);

                Ok(())
            }
            _ => Err(Error::BadRequest),
        }
    }

    fn call<C: sdk::Context>(ctx: &mut C, request: Request) -> Result<Response, Error> {
        // This method is called for each contracts.Call call. It is supposed to handle the request
        // and return a response.
        match request {
            Request::SayHello { who } => {
                // Increment the counter and retrieve the previous value.
                let counter = Self::increment_counter(ctx);

                // Return the greeting as a response.
                Ok(Response::Hello {
                    greeting: format!("hello {who} ({counter})"),
                })
            }
            _ => Err(Error::BadRequest),
        }
    }

    fn query<C: sdk::Context>(_ctx: &mut C, _request: Request) -> Result<Response, Error> {
        // This method is called for each contracts.Query query. It is supposed to handle the
        // request and return a response.
        Err(Error::BadRequest)
    }
}

// Create the required Wasm exports required for the contract to be runnable.
sdk::create_contract!(HelloWorld);

// We define some simple contract tests below.
#[cfg(test)]
mod test {
    use oasis_contract_sdk::{testing::MockContext, types::ExecutionContext, Contract};

    use super::*;

    #[test]
    fn test_hello() {
        // Create a mock execution context with default values.
        let mut ctx: MockContext = ExecutionContext::default().into();

        // Instantiate the contract.
        HelloWorld::instantiate(
            &mut ctx,
            Request::Instantiate {
                initial_counter: 11,
            },
        )
        .expect("instantiation should work");

        // Dispatch the SayHello message.
        let rsp = HelloWorld::call(
            &mut ctx,
            Request::SayHello {
                who: "unit test".to_string(),
            },
        )
        .expect("SayHello call should work");

        // Make sure the greeting is correct.
        assert_eq!(
            rsp,
            Response::Hello {
                greeting: "hello unit test (11)".to_string()
            }
        );

        // Dispatch another SayHello message.
        let rsp = HelloWorld::call(
            &mut ctx,
            Request::SayHello {
                who: "second call".to_string(),
            },
        )
        .expect("SayHello call should work");

        // Make sure the greeting is correct.
        assert_eq!(
            rsp,
            Response::Hello {
                greeting: "hello second call (12)".to_string()
            }
        );
    }
}
```

This is it! You now have a simple hello world smart contract with included unit
tests for its functionality. You can also look at other smart contract handles
supported by the [Oasis Contract SDK].

**Tip**: PublicCell object

`PublicCell<T>` can use any type `T` which implements `oasis_cbor::Encode` and
`oasis_cbor::Decode`.

**Tip**: Context object

The `ctx` argument contains the contract context analogous to `msg` and `this`
in the EVM world. To learn more head to the [Context] trait in our Rust API.

[Oasis Contract SDK]: https://github.com/oasisprotocol/oasis-sdk/blob/main/contract-sdk/src/contract.rs

[Context]: https://api.docs.oasis.io/oasis-sdk/oasis_contract_sdk/context/trait.Context.html

## Testing

To run unit tests type:

```sh
RUSTFLAGS="-C target-feature=+aes,+ssse3" cargo test
```

**Info**:

Running unit tests locally requires a physical or virtualized Intel-compatible
CPU with AES and SSSE3 instruction sets.

## Building for Deployment

In order to build the smart contract before it can be uploaded to the target
chain, run:

```bash
cargo build --target wasm32-unknown-unknown --release
```

This will generate a binary file called `hello_world.wasm` under
`target/wasm32-unknown-unknown/release` which contains the smart contract
compiled into WebAssembly. This file can be directly deployed on chain.

## Deploying the Contract

Deploying the contract we just built is simple using the Oasis CLI. This section
assumes that you already have an instance of the CLI set up and that you will
be deploying contracts on the existing Testnet where you already have some
TEST tokens to cover transaction fees.

First, switch the default network to Cipher Testnet to avoid the need to pass
it to every following invocation.

```
oasis network set-default testnet
oasis paratime set-default testnet cipher
```

The first deployment step that needs to be performed only once for the given
binary is uploading the Wasm binary.

```
oasis contract upload hello_world.wasm
```

After successful execution it will show the code ID that you need to use for any
subsequent instantiation of the same contract. Next, create an instance of the
contract by loading the code and calling its constructor with some dummy
arguments. Note that the arguments depend on the contract that is being deployed
and in our hello world case we are simply taking the initial counter value.

```
oasis contract instantiate CODEID '{instantiate: {initial_counter: 42}}'
```

After successful execution it shows the instance ID that you need for calling
the instantiated contract. Next, you can test calling the contract.

```
oasis contract call INSTANCEID '{say_hello: {who: "me"}}'
```

**Info**: Example

You can view and download a [complete example] from the Oasis SDK repository.

[complete example]: https://github.com/oasisprotocol/oasis-sdk/tree/main/examples/contract-sdk/hello-world

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
