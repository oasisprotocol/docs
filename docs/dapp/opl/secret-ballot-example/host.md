# DAO Contract

Let's start with a smart contract that describes a basic DAO, `DAOV1.sol`, with a
mapping of proposals before we consider the OPL differences.

## Base Contract

Inside your `contracts/` directory, create a `DAOV1.sol` file. You may have
already deployed a similar contract to your home network such as BNB or
Polygon.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

type ProposalId is bytes32;

struct ProposalParams {
    string ipfsHash;
    uint16 numChoices;
    bool publishVotes;
}

contract DAOV1 {
    using EnumerableSet for EnumerableSet.Bytes32Set;

    error AlreadyExists();
    error NoChoices();
    error TooManyChoices();

    event ProposalClosed(ProposalId id, uint256 topChoice);

    struct Proposal {
        bool active;
        uint16 topChoice;
        ProposalParams params;
    }

    struct ProposalWithId {
        ProposalId id;
        Proposal proposal;
    }

    mapping(ProposalId => Proposal) public proposals;
    EnumerableSet.Bytes32Set private activeProposals;
    ProposalId[] private pastProposals;

    constructor() {}

    function createProposal(ProposalParams calldata _params) external payable returns (ProposalId) {
        bytes32 proposalHash = keccak256(abi.encode(msg.sender, _params));
        ProposalId proposalId = ProposalId.wrap(proposalHash);
        if (_params.numChoices == 0) revert NoChoices();
        if (_params.numChoices > type(uint16).max) revert TooManyChoices();
        if (proposals[proposalId].active) revert AlreadyExists();
        Proposal storage proposal = proposals[proposalId];
        proposal.params = _params;
        proposal.active = true;
        activeProposals.add(proposalHash);
        return proposalId;
    }

    function getActiveProposals(
        uint256 _offset,
        uint256 _count
    ) external view returns (ProposalWithId[] memory _proposals) {
        if (_offset + _count > activeProposals.length()) {
            _count = activeProposals.length() - _offset;
        }
        _proposals = new ProposalWithId[](_count);
        for (uint256 i; i < _count; ++i) {
            ProposalId id = ProposalId.wrap(activeProposals.at(_offset + i));
            _proposals[i] = ProposalWithId({id: id, proposal: proposals[id]});
        }
    }

    function getPastProposals(
        uint256 _offset,
        uint256 _count
    ) external view returns (ProposalWithId[] memory _proposals) {
        if (_offset + _count > pastProposals.length) {
            _count = pastProposals.length - _offset;
        }
        _proposals = new ProposalWithId[](_count);
        for (uint256 i; i < _count; ++i) {
            ProposalId id = pastProposals[_offset + i];
            _proposals[i] = ProposalWithId({id: id, proposal: proposals[id]});
        }
    }
}
```

Instead of storing complete ballot proposals on the network, we will use
[IPFS](https://ipfs.tech). Our smart contract will refer to a pinned
[IPFS file] by its [hash](https://docs.ipfs.tech/concepts/hashing/).

```solidity
struct ProposalParams {
    string ipfsHash;
    uint16 numChoices;
    bool publishVotes;
}
```

Our very simple DAO contract creates proposals and manages them, allowing
both active and past proposals to be queried externally through methods
`getActiveProposals` and `getPastProposals`. This would be sufficient on a
single chain, and it is possible to develop confidential applications without
bridges, relying solely on [Sapphire](../../sapphire/README.mdx). However, we will proceed
to demonstrate the cross-chain capabilities of OPL.

## What is different with OPL?

OPL leverages [Celer](https://celer.network)'s inter-chain [messaging]
capabilities in order to connect smart contracts deployed on a home network
such as Polygon, or BNB, with the privacy preserving smart contracts deployed
on Sapphire.

You will not need to learn how Celer Inter-chain Message (IM) works in order to
use OPL, but if you would like to learn more, you can see that OPL realizes
the Celer IM interface through the abstraction of an [Endpoint]:

```solidity
interface ICelerMessageBus {
    function feeBase() external view returns (uint256);

    function feePerByte() external view returns (uint256);

    function sendMessage(
        address _host,
        uint256 _hostChainId,
        bytes calldata _message
    ) external payable;
}
```

which allows us to use this bridge [function]:

```solidity
function sendMessage(
    address _receiver,
    uint64 _dstChainId,
    bytes memory _message,
    uint256 _fee
) internal
```

In production, you can see the deployed [cBridge contract] and
[MessageBus contract].

### How does OPL do this?

We can [register] functions with endpoints in order to simplify our code.
Endpoints are effectively callbacks which listen to messages from the enclaved
smart contract.

```solidity
function registerEndpoint(
    bytes memory _method,
    function(bytes calldata) returns (Result) _cb
) internal {
    // This is a waste of an SLOAD, but the alternative before immutable arrays
    // (https://github.com/ethereum/solidity/issues/12587) land is terribly verbose.
    // This can be fixed once gas usage becomes a problem.
    endpoints[bytes4(keccak256(_method))] = _cb;
}
```

Under the hood, a `postMessage` function [sends] the message using the Celer
Message Bus. If you would prefer using a different bridging partner, this
pattern will provide you a place to start that integration.

```solidity
    ICelerMessageBus(messageBus).sendMessage{value: fee}(
        remote,
        remoteChainId,
        envelope
    );
```

### Endpoints? Why not Solidity events?

Events in Solidity are non-confidential and do not allow cross-chain
communication. For this reason, OPL uses *endpoints* for passing messages
cross-chain. For example, this function below will listen to such a message and
 close the proposal.

```solidity
    function _oplBallotClosed(bytes calldata _args) internal returns (Result) {
        (ProposalId proposalId, uint16 topChoice) = abi.decode(_args, (ProposalId, uint16));
        proposals[proposalId].topChoice = topChoice;
        proposals[proposalId].active = false;
        activeProposals.remove(ProposalId.unwrap(proposalId));
        pastProposals.push(proposalId);
        emit ProposalClosed(proposalId, topChoice);
        return Result.Success;
    }
```

### Let's see the code

Let's see OPL at work. We can add our own implementation of event handling to
process cross-chain messages. Let's make the following changes to `DAOV1.sol`.

```diff
diff --git a/backend/contracts/DAOV1.sol b/backend/contracts/DAOV1.sol
index 21ea93e..827d80a 100644
--- a/backend/contracts/DAOV1.sol
+++ b/backend/contracts/DAOV1.sol
@@ -1,6 +1,7 @@
 // SPDX-License-Identifier: MIT
 pragma solidity ^0.8.0;
 
+import {Host, Result} from "@oasisprotocol/sapphire-contracts/contracts/OPL.sol";
 import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
 
 type ProposalId is bytes32;
@@ -11,7 +12,7 @@ struct ProposalParams {
     bool publishVotes;
 }

-contract DAOV1 {
+contract DAOV1 is Host {
     using EnumerableSet for EnumerableSet.Bytes32Set;
 
     error AlreadyExists();
@@ -35,7 +36,9 @@ contract DAOV1 {
     EnumerableSet.Bytes32Set private activeProposals;
     ProposalId[] private pastProposals;
 
-    constructor() {}
+    constructor(address _ballotBox) Host(_ballotBox) {
+        registerEndpoint("ballotClosed", _oplBallotClosed);
+    }
 
     function createProposal(ProposalParams calldata _params) external payable returns (ProposalId) {
         bytes32 proposalHash = keccak256(abi.encode(msg.sender, _params));
@@ -47,6 +50,7 @@ contract DAOV1 {
         proposal.params = _params;
         proposal.active = true;
         activeProposals.add(proposalHash);
+        postMessage("createBallot", abi.encode(proposalId, _params));
         return proposalId;
     }
 
@@ -77,4 +81,14 @@ contract DAOV1 {
             _proposals[i] = ProposalWithId({id: id, proposal: proposals[id]});
         }
     }
+
+    function _oplBallotClosed(bytes calldata _args) internal returns (Result) {
+        (ProposalId proposalId, uint16 topChoice) = abi.decode(_args, (ProposalId, uint16));
+        proposals[proposalId].topChoice = topChoice;
+        proposals[proposalId].active = false;
+        activeProposals.remove(ProposalId.unwrap(proposalId));
+        pastProposals.push(proposalId);
+        emit ProposalClosed(proposalId, topChoice);
+        return Result.Success;
+    }
 }
```

#### Host

A _host_ contract in our terminology is just a smart contract that extends the
`Host` contract [provided] and deployed on a home network such as BNB or
Polygon with a reference to the Sapphire network where our _enclave_
(privacy-preserving) smart contract will reside.

#### Constructor

We provide the address of the confidential (also known as *enclave*) smart
contract deployed on the Oasis Sapphire as a constructor parameter to the
*host* smart contract.

```solidity
    constructor(address _ballotBox) Host(_ballotBox) {
        registerEndpoint("ballotClosed", _oplBallotClosed);
    }
```

[messaging]: https://im-docs.celer.network/developer/celer-im-overview
[IPFS file]: https://docs.ipfs.tech/concepts/lifecycle/#_1-content-addressable-representation
[function]: https://im-docs.celer.network/developer/development-guide/contract-framework#send-message
[cBridge contract]: https://explorer.sapphire.oasis.io/address/0x9B36f165baB9ebe611d491180418d8De4b8f3a1f/transactions
[MessageBus contract]: https://explorer.sapphire.oasis.io/address/0x9Bb46D5100d2Db4608112026951c9C965b233f4D/transactions
[register]: https://github.com/oasisprotocol/sapphire-paratime/blob/9a74e57e72b06ba86ec8454062b8c0a5281edb97/contracts/contracts/opl/Endpoint.sol#L76-L84
[sends]: https://github.com/oasisprotocol/sapphire-paratime/blob/9a74e57e72b06ba86ec8454062b8c0a5281edb97/contracts/contracts/opl/Endpoint.sol#L91-L119
[provided]: https://github.com/oasisprotocol/sapphire-paratime/blob/main/contracts/contracts/opl/Host.sol
[Endpoint]: https://github.com/oasisprotocol/sapphire-paratime/blob/9a74e57e72b06ba86ec8454062b8c0a5281edb97/contracts/contracts/opl/Endpoint.sol#L35-L45