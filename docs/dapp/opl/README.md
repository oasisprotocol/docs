# Oasis Privacy Layer

The Oasis Privacy Layer (OPL) is an EVM-compatible privacy solution that opens
new frontiers for confidential smart contracts in Web3 applications on the
most popular EVM networks like Ethereum, BNB Chain, and Polygon.

## DApp Development

The Oasis Privacy Layer contains a set of [smart contracts](https://github.com/oasisprotocol/sapphire-paratime/tree/main/contracts/contracts/opl)
that integrate [Sapphire](../sapphire/README.mdx) into your existing and future
Web3 applications and introduce confidentiality.

Application developers on [any supported network](https://im-docs.celer.network/developer/contract-addresses-and-rpc-info) can add confidential state
and selective disclosures to their applications through the usage of a smart
contract deployed on OPL without leaving their existing networks.

For more information about OPL and to catch the latest news, please visit the
official [page](https://oasisprotocol.org/opl).

![Oasis Privacy Layer diagram](../images/opl/privacy-layer-diagram.png)

## Quickstart

A pair of contracts are linked bidirectionally to each other across chains, with one end on Sapphire and the other on a supported EVM compatible chain (the Home Network). They can post and receive messages to & from each other using the message-passing bridge, but must register endpoints to define which messages they handle.

Start by adding the `sapphire-contracts` package to your project so you can import `OPL.sol`:

    pnpm add @oasisprotocol/sapphire-contracts

Then define the two contracts, starting with a contract on Sapphire which runs inside the confidential enclave and can be called via the `secretExample` handler. It is provided with the address of the other contract and the network it exists on via the constructor:

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

Then on the other chain, define your contract which can be called via `triggerExample` to send a message to the contract on Sapphire using the `postMessage` interface.

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

After a few minutes the bridge will detect and then execute the `SapphireContract.on_example` method.

## Monitoring

The Celer IM Scan API can be used to retrieve status and message details by providing the globally unique transaction ID from the chain which originated the message.

    https://api.celerscan.com/scan/searchByTxHash?tx=0x...

For details of the response format, see the [Query IM Tx Status](https://im-docs.celer.network/developer/development-guide/query-im-tx-status) page of the Celer Inter-Chain Message (IM) documentation.
