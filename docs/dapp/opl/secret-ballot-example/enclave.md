# Ballot Contract

Next, we will write a smart contract that holds private data. This smart
contract will run inside a trusted execution environment (TEE) on the Oasis
Sapphire ParaTime, which why we refer to these as an *enclave* smart contract.

Create a new Solidity contract named `BallotBoxV1.sol`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Enclave, Result, autoswitch} from "@oasisprotocol/sapphire-contracts/contracts/OPL.sol";

error NotActive();

type ProposalId is bytes32;

struct ProposalParams {
    string ipfsHash;
    uint16 numChoices;
    bool publishVotes;
}

contract BallotBoxV1 is Enclave {
    error NotPublishingVotes();
    error AlreadyVoted();
    error UnknownChoice();

    struct Ballot {
        bool active;
        ProposalParams params;
        /// voter -> choice id
        mapping(address => Choice) votes;
        /// choice id -> vote
        uint256[32] voteCounts;
    }

    struct Choice {
        bool exists;
        uint8 choice;
    }

    event BallotClosed(ProposalId indexed id, uint256 topChoice);

    mapping(ProposalId => Ballot) private _ballots;

    constructor(address dao) Enclave(dao, autoswitch("bsc")) {
        registerEndpoint("createBallot", _oplCreateBallot);
    }

    function castVote(
        ProposalId proposalId,
        uint256 choiceIdBig
    ) external payable {
        Ballot storage ballot = _ballots[proposalId];
        if (!ballot.active) revert NotActive();
        uint8 choiceId = uint8(choiceIdBig & 0xff);
        if (choiceId >= ballot.params.numChoices) revert UnknownChoice();
        Choice memory existingVote = ballot.votes[_msgSender()];
        // 1 click 1 vote
        for (uint256 i; i < ballot.params.numChoices; ++i) {
            // read-modify-write all counts to make it harder to determine which one is chosen.
            ballot.voteCounts[i] ^= 1 << 255; // flip the top bit to constify gas usage a bit
            // Arithmetic is not guaranteed to be constant time, so this might still leak the choice to a highly motivated observer.
            ballot.voteCounts[i] += i == choiceId ? 1 : 0;
            ballot.voteCounts[i] -= existingVote.exists && existingVote.choice == i
                ? 1
                : 0;
        }
        ballot.votes[_msgSender()].exists = true;
        ballot.votes[_msgSender()].choice = choiceId;
    }

    function closeBallot(ProposalId proposalId) external payable {
        Ballot storage ballot = _ballots[proposalId];
        if (!ballot.active) revert NotActive();
        _closeBallot(proposalId, ballot);
    }

    function getVoteOf(ProposalId proposalId, address voter) external view returns (Choice memory) {
        Ballot storage ballot = _ballots[proposalId];
        if (voter == msg.sender) return ballot.votes[msg.sender];
        if (!ballot.params.publishVotes) revert NotPublishingVotes();
        return ballot.votes[voter];
    }

    function ballotIsActive(ProposalId id) external view returns (bool) {
        return _ballots[id].active;
    }

    function _oplCreateBallot(bytes calldata args) internal returns (Result) {
        (ProposalId id, ProposalParams memory params) = abi.decode(
            args,
            (ProposalId, ProposalParams)
        );
        Ballot storage ballot = _ballots[id];
        ballot.params = params;
        ballot.active = true;
        for (uint256 i; i < params.numChoices; ++i) ballot.voteCounts[i] = 1 << 255; // gas usage side-channel resistance.
        return Result.Success;
    }

    function _closeBallot(ProposalId _proposalId, Ballot storage _ballot) internal {
        uint256 topChoice;
        uint256 topChoiceCount;
        for (uint8 i; i < _ballot.params.numChoices; ++i) {
            uint256 choiceVoteCount = _ballot.voteCounts[i] & (type(uint256).max >> 1);
            if (choiceVoteCount > topChoiceCount) {
                topChoice = i;
                topChoiceCount = choiceVoteCount;
            }
        }
        postMessage("ballotClosed", abi.encode(_proposalId, topChoice));
        emit BallotClosed(_proposalId, topChoice);
        delete _ballots[_proposalId];
    }
}
```

#### Autoswitch

In this tutorial, the *enclave* smart contract will talk to the *host* smart
contract deployed on the Binance Smart Chain (`bsc`).

:::tip

Autoswitch will automatically pick the Testnet host network if the enclave network is also Testnet.

:::

Autoswitch supports the following networks:
- `ethereum`
- `goerli`
- `optimism`
- `bsc`
- `bsc-testnet`
- `polygon`
- `fantom`
- `fantom-testnet`
- `moonriver`
- `arbitrum-one`
- `arbitrum-nova`
- `sapphire`
- `sapphire-testnet`
- `polygon-mumbai`
- `avalanche`
- `avalanche-fuji`
- `arbitrum-testnet`

```solidity
    constructor(address dao) Enclave(dao, autoswitch("bsc")) {
        registerEndpoint("createBallot", _oplCreateBallot);
    }
```

#### Event

Closing a ballot has an effect on the host chain network (`postMessage()`):

```solidity
    function _closeBallot(ProposalId _proposalId, Ballot storage _ballot) internal {
        uint256 topChoice;
        uint256 topChoiceCount;
        for (uint8 i; i < _ballot.params.numChoices; ++i) {
            uint256 choiceVoteCount = _ballot.voteCounts[i] & (type(uint256).max >> 1);
            if (choiceVoteCount > topChoiceCount) {
                topChoice = i;
                topChoiceCount = choiceVoteCount;
            }
        }
        postMessage("ballotClosed", abi.encode(_proposalId, topChoice));
        emit BallotClosed(_proposalId, topChoice);
        delete _ballots[_proposalId];
    }
```

#### Private

The private variable `_ballots` is encrypted on Sapphire.

```solidity
    mapping(ProposalId => Ballot) private _ballots;
```
