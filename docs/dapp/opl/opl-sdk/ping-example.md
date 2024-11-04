---
description: Ping example with OPL SDK
---

# Ping Example

This tutorial demonstrates how to send a cross-chain message using
[Oasis OPL].

[Oasis OPL]: ./README.md

You'll learn how to:

 - Deploy a Host contract
 - Deploy a Enclave contract
 - Send a cross-chain message

We recommend using [Remix] for an easy-to-follow experience.
The only prerequisite is a set-up Metamask account.

:::info

If you're new to Remix, follow our basic guide for using Remix
[here][dapp-remix].

[dapp-remix]: /dapp/tools/remix.md

:::

## Overview Ping

In this example, you'll deploy a `host` contract on *BSC Testnet* and a `enclave`
contract on *Sapphire Testnet*.
You'll then send a `ping` from the host contract to the enclave contract,
facilitated by the OPL SDK.
The enclave contract will receive the `ping` and emits an event with the
message which was received.

## Contract Setup

1. Open [Remix] and create a new file called `Ping.sol`
2. Paste the following Ping host contract into it:

 <details>
    <summary> Ping.sol Contract </summary>

    ```solidity title="Ping.sol" showLineNumbers
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import {Host, Result} from "@oasisprotocol/sapphire-contracts/contracts/OPL.sol";

    contract Ping is Host {
        event MessageReceived(bytes message);

        constructor(address pong) Host(pong) {
            registerEndpoint("pongMessage", _pongMessage);
        }

        function startPing (bytes calldata _message) external payable {
            postMessage("ping", abi.encode(_message));
        }

        function _pongMessage(bytes calldata _args) internal returns (Result) {
            (bytes memory message) = abi.decode((_args), (bytes));
            emit MessageReceived(message);
            return Result.Success;
        }
    }
    ```
</details>

3. Create a new file called `Pong.sol`
4. Paste the following Pong enclave contract into it:

 <details>
    <summary> Pong.sol Contract </summary>

    ```solidity title="Pong.sol" showLineNumbers
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import {Enclave, Result, autoswitch} from "@oasisprotocol/sapphire-contracts/contracts/OPL.sol";

    contract Pong is Enclave {
        event MessageReceived(bytes message);

        constructor(uint nonce, bytes32 chain) Enclave(computeAddress(msg.sender, nonce), autoswitch(chain)) {
            registerEndpoint("ping", _pingMessage);
        }

        function _pingMessage(bytes calldata _args) internal returns (Result) {
            (bytes memory message) = abi.decode((_args), (bytes));
            emit MessageReceived(message);
            return Result.Success;
        }

        function computeAddress(address _origin, uint _nonce) public pure returns (address) {
            if (_nonce == 0x00) {
                return address(uint160(uint256(keccak256(abi.encodePacked(
                    bytes1(0xd6), bytes1(0x94), _origin, bytes1(0x80)
                )))));
            }
            if (_nonce <= 0x7f) {
                return address(uint160(uint256(keccak256(abi.encodePacked(
                    bytes1(0xd6), bytes1(0x94), _origin, bytes1(uint8(_nonce))
                )))));
            }
            if (_nonce <= 0xff) {
                return address(uint160(uint256(keccak256(abi.encodePacked(
                    bytes1(0xd7), bytes1(0x94), _origin, bytes1(0x81), uint8(_nonce)
                )))));
            }
            if (_nonce <= 0xffff) {
                return address(uint160(uint256(keccak256(abi.encodePacked(
                    bytes1(0xd8), bytes1(0x94), _origin, bytes1(0x82), uint16(_nonce)
                )))));
            }
            if (_nonce <= 0xffffff) {
                return address(uint160(uint256(keccak256(abi.encodePacked(
                    bytes1(0xd9), bytes1(0x94), _origin, bytes1(0x83), uint24(_nonce)
                )))));
            }
            return address(uint160(uint256(keccak256(abi.encodePacked(
                bytes1(0xda), bytes1(0x94), _origin, bytes1(0x84), uint32(_nonce)
            )))));
        }
    }
    ```
</details>

### Key points

- `Host`: OPL wrapper for outside contract.
- `Enclave`: OPL wrapper for the contract on Sapphire side.
- `registerEndpoint`: Registers endpoints in an OPL managed map.
- `postMessage`: Call registered endpoints.
- `autoswitch`: Finds correct MessageBus address via chain name.

## Compiling the Contract

For compatibility with Sapphire, compile the contract using compiler version
**`0.8.24`** and evm version **`paris`** (under advanced configuration).

## Deploying the Contract

Deploy the Ping contract on `BSC Testnet` and the Pong.sol contract on
`Sapphire Testnet`.

### Deploying Pong.sol on Sapphire Testnet

You'll deploy the contract on `Sapphire Testnet` first to avoid switching chains
back and forth.

1. Obtain TEST tokens for `Sapphire Testnet` from the [Oasis faucet].
2. Get next nonce of your account from `BSC Testnet`
   1. If you didn't do anything on *BSC Testnet* yet this will `0`.
   2. Else you need to get your last nonce, e.g. by checking your account
address on [bscscan](https://testnet.bscscan.com/) and and inspect the details
of your latest transaction, and then add 1.
3. In Metamask, switch to the `Sapphire Testnet` network and select
   `Injected Provider - MetaMask` as the environment in Remix.
4. Select the `Pong.sol` contract.
5. Fill in the deployment parameters:

- **`nonce`**: `0` (or next nonce as written above)
- **`chain`**: `0x6273630000000000000000000000000000000000000000000000000000000000`
  (bytes encoded `"bsc"`)

6. Deploy the contract on `Sapphire Testnet`

:::info

Copy the address of the deployed contract, you'll need it for the next step as
Remix will remove the contract from the UI if you change the chain.

:::

[Oasis Faucet]: https://faucet.testnet.oasis.io/

### Deploying Ping.sol on BSC Testnet

1. Obtain BNB test token for `BSC Testnet` from the [BNB faucet] or their
   discord.
2. In MetaMask, switch to the `BSC Testnet` network and select
   `Injected Provider - MetaMask` as the environment in Remix.
3. Select the `Ping.sol` contract.
4. Fill in the contract addess you just have deployed on `Sapphire Testnet`.
5. Deploy the contract on `BSC Testnet`.

[BNB faucet]: https://www.bnbchain.org/en/testnet-faucet

## Executing Ping

Now that you've deployed the contacts, you can send the ping message
cross-chain.

You'll need the following parameter for `startPing`:

- `_message`: The encoded message. e.g. "Hello from BSC" -
  `0x48656c6c6f2066726f6d20425343000000000000000000000000000000000000`.

Additionally you'll have to pay a fee which you send as `value`. For sending the
ping 0.001 tBNB (1000000 gwei) will be enough.

Finally execute the function `startPing`.

:::info

For the `Sapphire Testnet` an executor is running to relay the messages every
few mintues. If you deploy on mainnet please refer to the [Executor chapter].
:::

[Executor chapter]:  ../celer/README.md#executor

## Checking execution

To see if you successfully send a ping message cross-chain you can watch for
new transactions at the [MessageBus address] from Celer or your deployed
contract on `Sapphire Testnet`.

[MessageBus address]: https://explorer.oasis.io/testnet/sapphire/address/0x9Bb46D5100d2Db4608112026951c9C965b233f4D

[Remix]: https://remix.ethereum.org/
