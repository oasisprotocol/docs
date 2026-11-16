# OPL SDK

Source: https://docs.oasis.io/build/opl/opl-sdk/

The OPL SDK is available in our [Solidity library][sapphire-contracts].
The SDK wraps the Celer Inter-Chain Message (IM) and makes it easy and straight
forward to integrate [Sapphire] and its privacy features into your existing or
future Web3 applications.

[sapphire-contracts]: https://www.npmjs.com/package/@oasisprotocol/sapphire-contracts

[Sapphire]: https://oasis.net/sapphire

## Overview

Image: Transaction Flow

1. The **user** submits a transaction on the Home network to a contract which uses
   `postMessage` to emit an event about a the cross-chain message.
2. The **Celer *State Guardian Network* (SGN)** monitors for transactions which
   trigger a cross-chain message event and create attestation.
3. The **Executor** waits, when the SGN approves the message the Executor submits a
   transaction to the target contract on Sapphire.

## Fees

The Home Contract pays the SGN to watch and approve the message, but the
Executor needs to be run by somebody willing to pay for the gas to submit
transactions to the destination chain.

More details to the Celer Executor you can find [here][celer-executor].

## Quickstart

A pair of contracts are linked bidirectionally 1-1 to each other across chains,
with one end on Sapphire and the other on a supported EVM-compatible chain (the
Home Network). They can post and receive messages to & from each other using the
message-passing bridge, but must register endpoints to define which messages
they handle from each other.

### Setup

Start by adding the [`@oasisprotocol/sapphire-contracts`] NPM package to your
Hardhat project so you can import `OPL.sol`:

**Tab**: npm

```shell
npm install @oasisprotocol/sapphire-contracts
```

**Tab**: pnpm

```shell
pnpm add @oasisprotocol/sapphire-contracts
```

**Tab**: Yarn

```shell
yarn add @oasisprotocol/sapphire-contracts
```

[`@oasisprotocol/sapphire-contracts`]: http://npmjs.com/package/@oasisprotocol/sapphire-contracts

Now define the two contracts:

* A contract on **Sapphire** which runs inside the confidential `enclave`
* A contract on the **home chain** as a `host` which triggers the example

### Sapphire Contract

On Sapphire use the constructor to provide the Sapphire contract with the
location (address and chain) of the contract on the Home chain and register an
endpoint called `secretExample`.

```solidity
import {Enclave, Result, autoswitch} from "@oasisprotocol/sapphire-contracts/contracts/OPL.sol";

contract SapphireContract is Enclave {
    constructor(address otherEnd, string chain) Enclave(otherEnd, autoswitch(chain)) {
        registerEndpoint("secretExample", on_example);
    }
    function on_example(bytes calldata _args) internal returns (Result) {
        (uint256 a, bool b) = abi.decode(args, (uint256, bool));
        // TODO: do confidential things here
        return Result.Success;
    }
}
```

### Home Contract

On the other chain, define your contract which can be called via
`triggerExample` to send a message to the contract on Sapphire using the
`postMessage` interface.

```solidity
import {Host, Result} from "@oasisprotocol/sapphire-contracts/contracts/OPL.sol";

contract HomeContract is Host {
    constructor(address otherEnd) Host(otherEnd) {
    }
    function triggerExample (uint256 a, bool b) external payable {
        postMessage("secretExample", abi.encode(a, b));
    }
}
```

After a few minutes the bridge will detect and then the executor will invoke the
`SapphireContract.on_example` method.

**Info**:

As noted in the [fees](#fees) section, an executor needs to relay your messages.
Please refer to the Celer [Executor][celer-executor] section on how to get on
the shared Message Executor or how to set up your own executor.

[celer-executor]: https://docs.oasis.io/build/opl/celer.md#executor

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
