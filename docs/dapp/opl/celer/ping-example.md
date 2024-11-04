---
description: Ping example with Celer IM
---

# Ping Example

This tutorial demonstrates how to send a cross-chain message using
[Celer's Inter-Chain Messaging (IM)].

[Celer's Inter-Chain Messaging (IM)]: https://im-docs.celer.network/

You'll learn how to:

 - Deploy MessageBus-compatible contracts
 - Send cross-chain messages

We recommend using [Remix] for an easy-to-follow experience.
The only prerequisite is a set-up Metamask account.

:::info

If you're new to Remix, follow our basic guide for using Remix
[here][dapp-remix].

[dapp-remix]: /dapp/tools/remix.md

:::

## Overview Ping

In this example, you'll deploy the same contract on two different chains.
You'll then send a `ping` from *BSC Testnet* to *Saphhire Testnet*, facilitated
by Celer-IM.
The contract on *Sapphire Testnet* will receive the `ping` and emits an event
with the message which was received.

## Contract Setup

1. Open [Remix] and create a new file called `Ping.sol`
2. Paste the following contract and interface into it:

 <details>
    <summary> Ping.sol Contract </summary>

    ```solidity title="Ping.sol" showLineNumbers
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    interface IMessageBus {
            function sendMessage(
            address _receiver,
            uint256 _dstChainId,
            bytes calldata _message
        ) external payable;
    }


    contract Ping  {
        address public messageBus;

        event MessageReceived(
            address srcContract,
            uint64 srcChainId,
            address sender,
            bytes message
        );


        enum ExecutionStatus {
            Fail, // execution failed, finalized
            Success, // execution succeeded, finalized
            Retry // execution rejected, can retry later
        }

        constructor(address _messageBus) {
            messageBus = _messageBus;
        }

        modifier onlyMessageBus() {
            require(msg.sender == messageBus, "caller is not message bus");
            _;
        }


        function sendPing(
            address _dstContract,
            uint64 _dstChainId,
            bytes calldata _message
        ) external payable {
            bytes memory message = abi.encode(msg.sender, _message);
            IMessageBus(messageBus).sendMessage{value: msg.value}(_dstContract, _dstChainId, message);
        }

        function executeMessage(
            address _srcContract,
            uint64 _srcChainId,
            bytes calldata _message,
            address // executor
        ) external payable onlyMessageBus returns (ExecutionStatus) {
            (address sender, bytes memory message) = abi.decode(
                (_message),
                (address, bytes)
            );
            emit MessageReceived(_srcContract, _srcChainId, sender, message);
            return ExecutionStatus.Success;
        }
    }
    ```
</details>

### Key points

- `messageBus`: Celer's MessageBus contract on the respective chain.
- `sendPing`: Initiates the cross-chain my calling Celers MessageBus.
- `executeMessage`: Called by Celer's MessageBus on the destination chian.

## Compiling the Contract

For compatibility with Sapphire, compile the contract using compiler version
**`0.8.24`** and evm version **`paris`** (under advanced configuration).

:::info

You can also use Celer's framework contracts and interfaces by importing them

    ```solidity
    import "sgn-v2-contracts/contracts/message/framework/MessageBusAddress.sol";
    import "sgn-v2-contracts/contracts/message/framework/MessageReceiverApp.sol";
    import "sgn-v2-contracts/contracts/message/interfaces/IMessageBus.sol";
    ```

but this will limit you to use only Solidity version **`0.8.9`**.

:::

## Deploying the Contract

Deploy the Ping contract on two different chains: `BSC Testnet` and
`Sapphire Testnet`.

### Deploying on BSC Testnet

1. Obtain BNB test token for `BSC Testnet` from the [BNB faucet] or their
   discord.
2. In MetaMask, switch to the `BSC Testnet` network and select
   `Injected Provider - MetaMask` as the environment in Remix.
3. Fill in the messageBus address for BSC Testnet:
   `0xAd204986D6cB67A5Bc76a3CB8974823F43Cb9AAA`.
4. Deploy the contract on `BSC Testnet`.


[BNB faucet]: https://www.bnbchain.org/en/testnet-faucet

### Deploying on Sapphire Testnet

1. Obtain TEST tokens for `Sapphire Testnet` from the [Oasis faucet].
2. In Metamask, switch to the `Sapphire Testnet` network and select
   `Injected Provider - MetaMask` as the environment in Remix
3. Fill in the messageBus address for BSC Testnet:
   `0x9Bb46D5100d2Db4608112026951c9C965b233f4D`.  
4. Deploy the contract on Sapphire Testnet

[Oasis Faucet]: https://faucet.testnet.oasis.io/

## Executing Ping

Now that you've deployed the contacts, you can send the ping message
cross-chain.

You'll need the following three parameters:

- `_dstContract`: The contract address of the reveiving contract on the
  destination chain which you just deployed.
- `_dstChainId`: The chain id of the the destination chain. Which is in our
  example `Sapphire Testnet` - `23295`.
- `message`: The encoded message. e.g. "Hello from BSC" -
  `0x48656c6c6f2066726f6d20425343000000000000000000000000000000000000`.

Additionally you'll have to pay a fee which you send as value. For sending the
ping 0.001 tBNB (1000000 gwei) will be enough.

:::info

For the `Sapphire Testnet` an executor is running to relay the messages every
few mintues. If you deploy on mainnet please refer to the [Executor chapter].

:::

[Executor chapter]: ./README.md#executor

## Checking execution

To see if you successfully send a ping message cross-chain you can watch for
new transactions at the [MessageBus address] from Celer or your deployed
contract Sapphire Testnet.

[MessageBus address]: https://explorer.oasis.io/testnet/sapphire/address/0x9Bb46D5100d2Db4608112026951c9C965b233f4D

[Remix]: https://remix.ethereum.org/
