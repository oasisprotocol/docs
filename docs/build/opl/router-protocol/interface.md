---
description: Router Protocol Interfaces
---
 
# Router Interfaces

Router Protocol provides the `evm-gateway-contracts` library to facilitate the
development of cross-chain dApps.

## Installation

### Using Remix

If you're using [Remix], you can import the contracts directly as shown in the
examples below.

[Remix]: https://remix.ethereum.org/

### Using Hardhat

For Hardhat projects, install the package via npm, yarn or pnpm:

```shell npm2yarn
npm install @routerprotocol/evm-gateway-contracts
```

## Gateway

The Router Gateway is deployed on all chains supported by Router Protocol and
serves as the central communication point between chains.

### IGateway

```solidity
import "@routerprotocol/evm-gateway-contracts/contracts/IGateway.sol";
```
To develop cross-chain contracts, you should generally:

1. Import the `IGateway.sol` interface into all cross-chain contracts
2. Create a variable to store the Gateway contract address
3. Initialize it with the corresponding Gateway address of the given chain

This setup will be used later to call the `iSend` function.

### iSend()

```solidity
function iSend(
  uint256 version,
  uint256 routeAmount,
  string calldata routeRecipient,
  string calldata destChainId,
  bytes calldata requestMetadata,
  bytes calldata requestPacket
) external payable returns (uint256);
```

`iSend` is the function you'll call on the Gateway of the source chain to
initiate a cross-chain message. Every contract that wants to make a cross-chain
call needs to call it.

For a detailed description of each parameter, refer to the Router Protocol
[iSend documentation].

[iSend documentation]: https://docs.routerprotocol.com/develop/message-transfer-via-crosstalk/evm-guides/iDapp-functions/iSend

### getRequestMetaData()

```solidity
    function getRequestMetadata(
    uint64 destGasLimit,
    uint64 destGasPrice,
    uint64 ackGasLimit,
    uint64 ackGasPrice,
    uint128 relayerFees,
    uint8 ackType,
    bool isReadCall,
    string memory asmAddress
) public pure returns (bytes memory) {
    bytes memory requestMetadata = abi.encodePacked(
    destGasLimit,
    destGasPrice,
    ackGasLimit,
    ackGasPrice,
    relayerFees,
    ackType,
    isReadCall,
    asmAddress
    );
    return requestMetadata;
}
```
The `getRequestMetadata` function helps create the `requestMetadata` bytes
object required for the `iSend` function call.

Here's an overview of the arguments:

| Argument     | Example Value | Description                                |
| ------------ | ------------- | ------------------------------------------ |
| destGasLimit | 300000        | Gas limit on destination chain             |
| destGasPrice | 100000000000  | Gas price on destination chain             |
| ackGasLimit  | 300000        | Gas limit on source chain for ack          |
| ackGasPrice  | 100000000000  | Gas price on source chain for ack          |
| relayerFees  | 10000000000   | Relayer fees on Router chain               |
| ackType      | 3             | Acknowledge type                           |
| isReadCall   | false         | If the call is read-only                   |
| asmAddress   | "0x"          | Address for the additional security module |

Alternatively, you can use `ethers.js` to encode the metadata:
```js
const metadata = ethers.utils.solidityPack(
    ['uint64', 'uint64', 'uint64', 'uint64', 'uint128', 'uint8', 'bool', 'string'],
    [destGasLimit, destGasPrice, ackGasLimit, ackGasPrice, relayerFees, ackType, isReadCall, asmAddress]
);
```

For more information about encoding and the request metadata, see the Router
[metadata documentation].

[metadata documentation]: https://docs.routerprotocol.com/develop/message-transfer-via-crosstalk/evm-guides/iDapp-functions/iSend#5-requestmetadata

## IDapp

```solidity
import "@routerprotocol/evm-gateway-contracts/contracts/IDapp.sol";
```

The IDapp interface consists of two main functions:

1. `iReceive`: The entry point for the cross-chain message on the destination
   chain
2. `iAck`: The entry point on the source chain to receive the acknowledgment

### iReceive()

```solidity
function iReceive(
    string memory requestSender,
    bytes memory packet,
    string memory srcChainId
  ) external returns (bytes memory)
```

`iReceive` is called by the Gateway on the destination chain.

For more information about `iReceive`, see the Router [iReceive documentation].

[iReceive documentation]: https://docs.routerprotocol.com/develop/message-transfer-via-crosstalk/evm-guides/iDapp-functions/iReceive

### iAck()

```solidity
function iAck(
    uint256 requestIdentifier,
    bool execFlag,
    bytes memory execData
  ) external
```

`iAck` is called by the Gateway on the source chain.

For more information about `iAck`, see the Router [iAck documentation].

[iAck documentation]: https://docs.routerprotocol.com/develop/message-transfer-via-crosstalk/evm-guides/iDapp-functions/iAck
