# Account

A **staking account** is an entry in the staking ledger.

It has two \(sub\)accounts:

* **General account.**

  It is used to keep the funds that are freely available to the account owner to transfer, delegate/stake, pay gas fees, ...

* **Escrow account**.

  It are used to keep the funds needed for specific consensus-layer operations \(e.g. registering and running nodes, staking and delegation of tokens, ...\).



  To simplify accounting, each escrow results in the source account being issued shares which can be converted back into staking tokens during the reclaim escrow operation. Reclaiming escrow does not complete immediately, but may be subject to a debonding period during which the tokens still remain escrowed.

Each staking account has an **address**. For more information, see:

{% page-ref page="address.md" %}



