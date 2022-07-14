# Transfer Tokens

:::info

This example assumes you have read and followed the instructions in the [Prerequisites](prerequisites.md) and [Setup](setup.md) sections.

:::

Let's assume:

* `oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6` is our staking account address,
* `oasis1qr3jc2yfhszpyy0daha2l9xjlkrxnzas0uaje4t3` is the destination's staking account address.

:::info

To convert your entity's ID to a staking account address, see the [Obtain Account Address From Entity's ID](address.md#obtain-account-address-from-entitys-id) section.

:::

## Query Our Account's Info

To query our staking account's information, use the following command:

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.address oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6
```

:::info

For a detailed explanation on querying account information, see the [Get Info](get-account-info.md) section.

:::

Before the transaction, this outputs:

```
General Account:
  Balance: ROSE 601.492492765
  Nonce:   7
Escrow Account:
  Active:
    Balance:      ROSE 11242.38481664
    Total Shares: 10000000000000
  Debonding:
    Balance:      ROSE 0.0
    Total Shares: 0
  ...
```

We can observe that:

* General account's balance is ~601 tokens.
* Account's nonce is 7.
* ~11242 tokens are actively bounded to the escrow account.
* The amount of tokens that are currently debonding is 0.

## Query Destination Account's Info

To query the destination account's information, use the following command:

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.address oasis1qr3jc2yfhszpyy0daha2l9xjlkrxnzas0uaje4t3
```

Before the transaction, this outputs:

```
General Account:
  Balance: ROSE 0.0
  Nonce:   1030
Escrow Account:
  Active:
    Balance:      ROSE 0.0
    Total Shares: 0
  Debonding:
    Balance:      ROSE 0.0
    Total Shares: 0
  ...
```

We can observe that both, the general account and the escrow account (actively bounded and debonding), have a balance of 0 tokens.

## Generate a Transfer Transaction

Let's generate a transfer transaction of 170 tokens, (i.e. 170 * 10^9 base units), from our account to the chosen destination account and store it to `tx_transfer.json`:

```bash
oasis-node stake account gen_transfer \
  "${TX_FLAGS[@]}" \
  --stake.amount 170000000000 \
  --stake.transfer.destination oasis1qr3jc2yfhszpyy0daha2l9xjlkrxnzas0uaje4t3 \
  --transaction.file tx_transfer.json \
  --transaction.nonce 7 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 2000
```

This will output a preview of the generated transaction:

```
You are about to sign the following transaction:
  Nonce:  7
  Fee:
    Amount: ROSE 0.000002
    Gas limit: 1000
    (gas price: ROSE 0.000000002 per gas unit)
  Method: staking.Transfer
  Body:
    To:     oasis1qr3jc2yfhszpyy0daha2l9xjlkrxnzas0uaje4t3
    Amount: ROSE 170.0
Other info:
  Genesis document's hash: 976c302f696e417bd861b599e79261244f4391f3887a488212ee122ca7bbf0a8
```

and ask you for confirmation.

## Submit the Transaction

To submit the generated transaction, we need to copy `tx_transfer.json` to the online Oasis node (i.e. the `server`) and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_transfer.json
```

## Query Both Accounts' Info

Let's check both accounts' info, [first ours](transfer-tokens.md#query-our-accounts-info):

```
General Account:
  Balance: ROSE 431.492490765
  Nonce:   8
Escrow Account:
  Active:
    Balance:      ROSE 11242.38481664
    Total Shares: 10000000000000
  Debonding:
    Balance:      ROSE 0.0
    Total Shares: 0
  ...
```

and then the [destination's](transfer-tokens.md#query-destination-accounts-info):

```
General Account:
  Balance: ROSE 170.0
  Nonce:   1030
Escrow Account:
  Active:
    Balance:      ROSE 0.0
    Total Shares: 0
  Debonding:
    Balance:      ROSE 0.0
    Total Shares: 0
  ...
```

We can observe that:

* Our general balance decreased by 170.000002 tokens. The 0.000002 token corresponds to the fee that we specified we will pay for this transaction.
* Our account's nonce increased to 8.
* Destination account's general balance increased by 170 tokens.

