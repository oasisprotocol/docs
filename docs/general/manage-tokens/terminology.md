# Terminology

## Account

A staking **account** is an entry in the staking ledger.

It has two (sub)accounts:

- **General account**
  
  It is used to keep the funds that are freely available to the account owner
  to transfer, delegate/stake, pay gas fees, etc.

- **Escrow account**

  It is used to keep the funds needed for specific consensus-layer operations
  (e.g. registering and running nodes, staking and delegation of tokens, ...).
  
  To simplify accounting, each escrow results in the source account being
  issued shares which can be converted back into staking tokens during the
  reclaim escrow operation. Reclaiming escrow does not complete immediately,
  but may be subject to a debonding period during which the tokens still remain
  escrowed.

## Address

A staking account **address** is represented by a truncated hash of a
corresponding entity's public key, prefixed by a 1 byte address version.

It uses [Bech32 encoding] for text serialization with `oasis` as its human
readable part (HRP) prefix.

EVM-compatible ParaTimes running on the Oasis compute layer **may use**
EVM-compatible 20-byte addresses in hex format (starting with `0x`).

## Delegation

You can **delegate** your tokens by submitting an **escrow** transaction that
deposits a specific number of tokens into someone else’s escrow account (as
opposed to **staking** tokens, which usually refers to depositing tokens into
your own escrow account).

In other words, delegating your tokens is equivalent to staking your tokens in
someone else's validator node. Delegating your tokens can give you the
opportunity to participate in the Oasis Network's proof-of-stake consensus
system and earn rewards via someone else's validator node.

## Staking

You can stake your tokens by submitting an **escrow** transaction that deposits
a specific number of tokens into your escrow account.

## Rewards

By delegating your tokens to someone else's node, you can earn a portion of the
rewards earned by that node through its participation in the Oasis Network.

## Commission

Node operators collect **commissions** when their node earns a
**staking reward** for delegators. A validator node earns a staking reward for
participating in the consensus protocol each epoch. The **commission rate** is
a fraction of the staking reward.

For example, if our validator node earns a reward of 0.007 tokens, 0.0035
tokens are added to the escrow pool (increasing the value of our escrow pool
shares uniformly), and 0.0035 tokens are given to us (issuing us new shares as
if we manually deposited them).

## Slashing

A portion of your delegated tokens can be **slashed** (seized) by the network,
if the node that you delegated your tokens to gets slashed, e.g. as a penalty
for equivocating in the protocol by signing diverging blocks for the same
height.

[Bech32 encoding]:
  https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#bech32
