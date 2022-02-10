# Delegate/Stake Tokens

{% hint style="info" %}
This example assumes you have read and followed the instructions in the [Prerequisites](prerequisites.md) and [Setup](setup.md) sections.
{% endhint %}

Let's assume:

* we want to stake \(i.e. self-delegate\) 208 tokens,
* `oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw` is our staking account address.

{% hint style="info" %}
Minimum delegation amount is specified by the `staking.params.min_delegation` consensus parameter.

To obtain its value from the genesis file, run:

```bash
cat $GENESIS_FILE | \
  python3 -c 'import sys, json; \
  print(json.dumps(json.load(sys.stdin)["staking"]["params"]["min_delegation"], indent=4))'
```

Note that this value is in base units. E.g., a value of `"10000000000"` would correspond to 10 tokens.
{% endhint %}

To achieve this we need to put 208 tokens to our own escrow account.

## Query Our Account's Info

To query our staking account's information, use the following command:

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.address oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6
```

{% hint style="info" %}
For a detailed explanation on querying account information, see [t](get-account-info.md)he [Get Info](get-account-info.md) section.
{% endhint %}

Before the transaction, this outputs:

```javascript
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

We can observe that:

* General account's balance is ~431 tokens.
* Account's nonce is 8.
* ~11242 tokens are actively bounded to the escrow account.
* The amount of tokens that are currently debonding is 0.

## Generate an Escrow Transaction

Let's generate an escrow transaction of 208 tokens \(i.e. 208 \* 10^9 base units\) to our own escrow account and store it to `tx_escrow.json`:

```bash
oasis-node stake account gen_escrow \
  "${TX_FLAGS[@]}" \
  --stake.amount 208000000000 \
  --stake.escrow.account oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6 \
  --transaction.file tx_escrow.json \
  --transaction.nonce 8 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 2000
```

This will output a preview of the generated transaction:

```javascript
You are about to sign the following transaction:
  Nonce:  8
  Fee:
    Amount: ROSE 0.000002
    Gas limit: 1000
    (gas price: ROSE 0.000000002 per gas unit)
  Method: staking.AddEscrow
  Body:
    Account: oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6
    Amount:  ROSE 208.0
Other info:
  Genesis document's hash: 976c302f696e417bd861b599e79261244f4391f3887a488212ee122ca7bbf0a8
```

and ask you for confirmation.

## Submit the Transaction

To submit the generated transaction, we need to copy `tx_escrow.json` to the online Oasis node \(i.e. the `server`\) and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_escrow.json
```

## Query Our Account's Info Again

Let's check [our account's info](delegate-tokens.md#query-our-accounts-info) again:

```javascript
General Account:
  Balance: ROSE 223.492486765
  Nonce:   9
Escrow Account:
  Active:
    Balance:      ROSE 11450.38481664
    Total Shares: 10185014125910
  Debonding:
    Balance:      ROSE 0.0
    Total Shares: 0
  ...
```

We can observe that:

* Our general account's balance decreased for 208.000002 tokens. The 0.000002 token corresponds to the fee that we specified we will pay for this transaction.
* Our account's nonce increased to 9.
* Our escrow account's active balance increased for 208 tokens.
* The total number of shares in our escrow account's active part

  increased from 10,000,000,000,000 to 10,185,014,125,910.

### Computation of Shares

When a delegator delegates some amount of tokens to a staking account, the delegator receives the number of shares proportional to the current **share price** \(in tokens\) calculated from the total number of tokens delegated to a staking account so far and the number of shares issued so far:

```text
shares_per_token = account_issued_shares / account_delegated_tokens
```

In our case, the current share price \(i.e. `shares_per_token`\) is 10,000,000,000,000 / 11242.384816640 which is 889,490,989.9542729 shares per token.

For 208 tokens, the amount of newly issued shares is thus 208 \* 889,490,989.9542729 which is 185,014,125,910.48877 shares \(rounded to 185,014,125,910 shares\).

Hence, the escrow account's total number of shares increased for 185,014,125,910 shares.

