# DAO Contract

Let's start with a simple smart contract `DAOV1.sol` that describes a basic DAO
with a mapping of proposals.
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

struct Outcome {
    address payable payee;
    uint128 payment;
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

Note that every proposal here contains an [IPFS](https://ipfs.tech) [hash](https://docs.ipfs.tech/concepts/hashing/)
to a pinned IPFS [file](https://docs.ipfs.tech/concepts/lifecycle/#_1-content-addressable-representation).

```solidity
struct ProposalParams {
    string ipfsHash;
    uint16 numChoices;
    bool publishVotes;
}
```

Our very simple DAO contract creates proposals and manages them, allowing
both active (`getActiveProposals`) and past proposals (`getPastProposals`) to
be queried externally.

### OPL Differences

What OPL refers to as a ***host*** contract is just a smart contract that sits
on a "host" network such as BNB or Polygon. We instantiate a `Host` and add
our event handling to cross-chain messages. Let's make the following changes to
our existing `DAOV1.sol`.

```diff
diff --git a/backend/contracts/DAOV1.sol b/backend/contracts/DAOV1.sol
index 9af584d..bc6405a 100644
--- a/backend/contracts/DAOV1.sol
+++ b/backend/contracts/DAOV1.sol
@@ -1,6 +1,7 @@
 // SPDX-License-Identifier: MIT
 pragma solidity ^0.8.0;
 
+import {Host, Result} from "@oasisprotocol/sapphire-contracts/contracts/OPL.sol";
 import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
 
 type ProposalId is bytes32;
@@ -16,7 +17,22 @@ struct Outcome {
     uint128 payment;
 }
 
-contract DAOV1 {
+contract DAOV1 is Host {
     using EnumerableSet for EnumerableSet.Bytes32Set;
 
     error AlreadyExists();
@@ -40,7 +56,9 @@ contract DAOV1 {
     EnumerableSet.Bytes32Set private activeProposals;
     ProposalId[] private pastProposals;
 
-    constructor() {}
+    constructor(address _ballotBox) Host(_ballotBox) {
+        registerEndpoint("ballotClosed", _oplBallotClosed);
+    }
 
     function createProposal(ProposalParams calldata _params) external payable returns (ProposalId) {
         bytes32 proposalHash = keccak256(abi.encode(msg.sender, _params));
@@ -52,6 +70,7 @@ contract DAOV1 {
         proposal.params = _params;
         proposal.active = true;
         activeProposals.add(proposalHash);
+        postMessage("createBallot", abi.encode(proposalId, _params));
         return proposalId;
     }
 
@@ -82,4 +101,14 @@ contract DAOV1 {
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

#### Constructor

This smart contract will need to know the address of the Enclave smart contract.

```solidity
    constructor(address _ballotBox) Host(_ballotBox) {
        registerEndpoint("ballotClosed", _oplBallotClosed);
    }
```

#### Endpoints

Registering an endpoint allows access to functions are effectively callbacks
which listen to messages from the Enclaved smart contract. This function allows
the host contract to listen and close the proposal.

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