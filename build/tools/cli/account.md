# Account

Source: https://docs.oasis.io/build/tools/cli/account

## Account-related Tasks

The `account` command is the home for most consensus and ParaTime-layer
on-chain transactions that are signed with one of your accounts such as:

* getting the account balance including delegated assets,
* sending tokens,
* delegating or undelegating tokens to or from validators (*staking*),
* depositing and withdrawing tokens to or from a ParaTime,
* managing withdrawal beneficiaries of your accounts,
* validator utils such as entity registration, setting the commission schedule,
  unfreezing your node and similar.

### Network, ParaTime and Account Selectors

Before we dig into `account` subcommands, let's look at the three most common
selectors.

#### Network

The `--network <network_name>` parameter specifies the [network] which the
Oasis CLI should connect to.

For example:

```shell
oasis account show oasis1qzzd6khm3acqskpxlk9vd5044cmmcce78y5l6000 --network testnet
```

```
Name:             test:cory
Native address:   oasis1qzzd6khm3acqskpxlk9vd5044cmmcce78y5l6000

=== CONSENSUS LAYER (testnet) ===
  Nonce: 0

  Total: 1.0 TEST
  Available: 1.0 TEST

```

```shell
oasis account show oasis1qzzd6khm3acqskpxlk9vd5044cmmcce78y5l6000 --network mainnet
```

```
Name:             test:cory
Native address:   oasis1qzzd6khm3acqskpxlk9vd5044cmmcce78y5l6000

=== CONSENSUS LAYER (mainnet) ===
  Nonce: 0

  Total: 0.0 ROSE
  Available: 0.0 ROSE

```

#### ParaTime

The `--paratime <paratime_name>` sets which [ParaTime] Oasis CLI should use.
If you do not want to use any ParaTime, for example to perform a consensus
layer operation, pass the `--no-paratime` flag explicitly.

```shell
oasis account show eric --no-paratime
```

```
Name:             eric
Native address:   oasis1qzplmfaeywvtc2qnylyhk0uzcxr4y5s3euhaug7q

=== CONSENSUS LAYER (testnet) ===
  Nonce: 0

  Total: 0.0 TEST
  Available: 0.0 TEST

```

#### Account

The `--account <account_name>` specifies which account in your wallet the
Oasis CLI should use to sign the transaction with.

```shell
oasis account transfer 1.5 0xDce075E1C39b1ae0b75D554558b6451A226ffe00 --account orlando
```

```
You are about to sign the following transaction:
Format: plain
Method: accounts.Transfer
Body:
  To: test:dave (oasis1qrk58a6j2qn065m6p06jgjyt032f7qucy5wqeqpt)
  Amount: 1.5 TEST
Authorized signer(s):
  1. cb+NHKt7JT4fumy0wQdkiBwO3P+DUh8ylozMpsu1xH4= (ed25519)
     Nonce: 0
Fee:
  Amount: 0.0002772 TEST
  Gas limit: 2772
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  orlando
(In case you are using a hardware-based signer you may need to confirm on device.)
```

```shell
oasis account transfer 1.5 0xDce075E1C39b1ae0b75D554558b6451A226ffe00 --account eric
```

```
You are about to sign the following transaction:
Format: plain
Method: accounts.Transfer
Body:
  To: test:dave (oasis1qrk58a6j2qn065m6p06jgjyt032f7qucy5wqeqpt)
  Amount: 1.5 TEST
Authorized signer(s):
  1. A1ik9X/7X/eGSoSYOKSIJqM7pZ5It/gHbF+wraxi33u3 (secp256k1eth)
     Nonce: 0
Fee:
  Amount: 0.0002779 TEST
  Gas limit: 2779
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  eric
(In case you are using a hardware-based signer you may need to confirm on device.)
```

**Tip**:

You can also set **the default [network][network-set-default],
[ParaTime][paratime-set-default] or [account][wallet-set-default] to use**, if
no network, ParaTime or account selectors are provided.

[network]: https://docs.oasis.io/build/tools/cli/network.md

[paratime]: https://docs.oasis.io/build/tools/cli/paratime.md

[network-set-default]: https://docs.oasis.io/build/tools/cli/network.md#set-default

[paratime-set-default]: https://docs.oasis.io/build/tools/cli/paratime.md#set-default

[wallet-set-default]: https://docs.oasis.io/build/tools/cli/wallet.md#set-default

### Show the Balance of an Account

The `account show [address]` command prints the balance, delegated assets
and other validator information corresponding to:

* a given address,
* the name of the [address book entry] or
* the name of one of the accounts in your wallet.

The address is looked up both on the consensus layer and the ParaTime, if
selected.

Running the command without arguments will show you the balance
of your default account on the default network and ParaTime:

```shell
oasis account show
```

```
Name:             oscar
Native address:   oasis1qp87hflmelnpqhzcqcw8rhzakq4elj7jzv090p3e

=== CONSENSUS LAYER (testnet) ===
  Nonce: 2

  Total: 0.0 TEST
  Available: 0.0 TEST

```

You can also pass the name of the account in your wallet or address book, or one
of the [built-in named addresses](#reserved-addresses):

```shell
oasis account show orlando
```

```
Name:             orlando
Native address:   oasis1qq84sc4q0shp5c5klwklqu59evz2mg59hveg7dqx

=== CONSENSUS LAYER (testnet) ===
  Nonce: 0

  Total: 10.0 TEST
  Available: 10.0 TEST

```

```shell
oasis acc show pool:consensus:fee-accumulator
```

```
Native address:   oasis1qqnv3peudzvekhulf8v3ht29z4cthkhy7gkxmph5

=== CONSENSUS LAYER (testnet) ===
  Nonce: 0

  Total: 0.0 TEST
  Available: 0.0 TEST

```

Or, you can check the balance of an arbitrary account address by passing the
native or Ethereum-compatible addresses.

```shell
oasis account show oasis1qzzd6khm3acqskpxlk9vd5044cmmcce78y5l6000
```

```
Name:             test:cory
Native address:   oasis1qzzd6khm3acqskpxlk9vd5044cmmcce78y5l6000

=== CONSENSUS LAYER (testnet) ===
  Nonce: 0

  Total: 1.0 TEST
  Available: 1.0 TEST

```

```shell
oasis account show 0xA3243B310CfA8D4b008780BC87E0bb9f6d4FDA06
```

```
Name:             eric
Ethereum address: 0xA3243B310CfA8D4b008780BC87E0bb9f6d4FDA06
Native address:   oasis1qzplmfaeywvtc2qnylyhk0uzcxr4y5s3euhaug7q

=== CONSENSUS LAYER (testnet) ===
  Nonce: 0

  Total: 0.0 TEST
  Available: 0.0 TEST

=== sapphire PARATIME ===
  Nonce: 0

  Balances for all denominations:
  - Amount: 10.0
    Symbol: TEST

```

To also include any staked assets in the balance, pass the `--show-delegations`
flag. For example:

```shell
oasis account show oasis1qrec770vrek0a9a5lcrv0zvt22504k68svq7kzve --show-delegations
```

```
Address: oasis1qrec770vrek0a9a5lcrv0zvt22504k68svq7kzve
Nonce: 33

=== CONSENSUS LAYER (testnet) ===
  Total: 972.898210067 TEST
  Available: 951.169098086 TEST

  Active Delegations from this Account:
    Total: 16.296833986 TEST

    Delegations:
      - To:     oasis1qz2tg4hsatlxfaf8yut9gxgv8990ujaz4sldgmzx
        Amount: 16.296833986 TEST (15000000000 shares)
  Debonding Delegations from this Account:
    Total: 5.432277995 TEST

    Delegations:
      - To:       oasis1qz2tg4hsatlxfaf8yut9gxgv8990ujaz4sldgmzx
        Amount:   5.432277995 TEST (5432277995 shares)
        End Time: epoch 26558

  Allowances for this Account:
    Total: 269.5000002 TEST
    Allowances:
      - Beneficiary: oasis1qqczuf3x6glkgjuf0xgtcpjjw95r3crf7y2323xd
        Amount:      269.5 TEST
      - Beneficiary: oasis1qrydpazemvuwtnp3efm7vmfvg3tde044qg6cxwzx
        Amount:      0.0000002 TEST

=== sapphire PARATIME ===
Balances for all denominations:
  6.9995378 TEST
```

Let's look more closely at the figures above. The account's **nonce** is the
incremental number starting from 0 that must be unique for each account's
transaction. In our case, the nonce is 32. This means there have been that many
transactions made with this account as the source. The next transaction should
have nonce equal to 32.

We can see that the total account's **balance** on the consensus layer is \~973
tokens:

* \~951 tokens can immediately be transferred.
* \~16.3 tokens (15,000,000,0000 shares) are staked (delegated).
* \~5.4 tokens are debonding and will be available for spending in the epoch
  26558\.
* up to \~270 tokens are [allowed](#allow) to be transferred to accounts
  `oasis1qqczuf3x6glkgjuf0xgtcpjjw95r3crf7y2323xd` and
  `oasis1qrydpazemvuwtnp3efm7vmfvg3tde044qg6cxwzx` without the signature of the
  account above.

Separately, you can notice there are \~7 tokens currently [deposited](#deposit)
in Sapphire.

**Info**:

The `--show-delegations` flag is not enabled by default, because account
delegations are not indexed on-chain. This means that the endpoint needs
to scan block by block to retrieve this information and takes some time
often leading to the timeout on public endpoints due to denial-of-service
protection.

Next, let's look at how the account of a validator typically looks like. For
example:

```shell
oasis account show oasis1qz8w4erh0kkwpmdtwd3dt9ueaz9hmzfpecjhd7t4 --show-delegations
```

```
Address: oasis1qz8w4erh0kkwpmdtwd3dt9ueaz9hmzfpecjhd7t4
Nonce: 17

=== CONSENSUS LAYER (testnet) ===
  Total: 1300.598418401 TEST
  Available: 52.73923316 TEST

  Active Delegations from this Account:
    Total: 1247.859185241 TEST

    Delegations:
      - To:     oasis1qz8w4erh0kkwpmdtwd3dt9ueaz9hmzfpecjhd7t4 (self)
        Amount: 1247.859185241 TEST (1167021437369 shares)

  Active Delegations to this Account:
    Total: 1833.451690691 TEST
 (1714678589317 shares)

    Delegations:
      - From:   oasis1qz8w4erh0kkwpmdtwd3dt9ueaz9hmzfpecjhd7t4 (self)
        Amount: 1247.859185241 TEST (1167021437369 shares)
      - From:   oasis1qztnau4t75cf8wh3truwtl7awvnkwe4st5l25yfn
        Amount: 148.289115949 TEST (138682777102 shares)
      - From:   oasis1qrvguq055xh42yjl84yn2h5dhm59fkzg9st0mu90
        Amount: 116.290596782 TEST (108757158672 shares)
      - From:   oasis1qzhulmesqkcu23r0h5hfslwelud46mkm25zh7uqq
        Amount: 111.30081746 TEST (104090622972 shares)
      - From:   oasis1qq05qnywdzz3m45dzqxuek0p4a5dxr86rgxlxc58
        Amount: 104.855987628 TEST (98063296601 shares)
      - From:   oasis1qzpvsgt56jxz324dxjv5272mz4j6kfadd5ur7f98
        Amount: 104.855987628 TEST (98063296601 shares)

  Commission Schedule:
    Rates:
      (1) start: epoch 15883
          rate:  7.0%
      (2) start: epoch 15994
          rate:  11.0%
      (3) start: epoch 16000
          rate:  14.0%
      (4) start: epoch 16134
          rate:  18.0%
    Rate Bounds:
      (1) start:        epoch 15883
          minimum rate: 0.0%
          maximum rate: 10.0%
      (2) start:        epoch 15993
          minimum rate: 0.0%
          maximum rate: 20.0%

  Stake Accumulator:
    Claims:
      - Name: registry.RegisterEntity
        Staking Thresholds:
          - Global: entity
      - Name: registry.RegisterNode.LAdHWnCkjFR5NUkFHVpfGuKFfZW1Cqjzu6wTFY6v2JI=
        Staking Thresholds:
          - Global: node-validator
      - Name: registry.RegisterNode.xk58fx5ys6CSO33ngMQkgOL5UUHSgOSt0QbqWGGuEF8=
        Staking Thresholds:
          - Global: node-compute
        Staking Thresholds:
          - Global: node-compute
        Staking Thresholds:
          - Global: node-compute
```

We can see there is a total of \~1833 tokens delegated to this validator. One
delegation was done by the account itself and then there are five more
delegators. Sometimes, we also refer to accounts with delegated assets to it as
*escrow accounts*.

Next, we can see a *commission schedule*. A validator can charge commission for
tokens that are delegated to it in form of the commission schedule **rate
steps** (7%, 11%, 14% and 18% activated on epochs 15883, 15994, 16000 and 16134
respectively) and the commission schedule **rate bound steps** (0-10% on
epoch 15883 and then 0-20% activated on epoch 15993). For more details, see the
[account amend-commission-schedule](https://docs.oasis.io/build/tools/cli/account.md#amend-commission-schedule)
command.

An escrow account may also accumulate one or more **stake claims** as seen
above. The network ensures that all claims are satisfied at any given point.
Adding a new claim is only possible if **all of the existing claims plus the
new claim can be satisfied**.

We can observe that the stake accumulator currently has the following claims:

* The `registry.RegisterEntity` claim is for registering an entity. It needs to
  satisfy the global threshold for
  [registering the `entity`][show-native-token].

* The `registry.RegisterNode.LAdHWnCkjFR5NUkFHVpfGuKFfZW1Cqjzu6wTFY6v2JI=`
  claim is for registering the validator node with the public key
  `LAdHWnCkjFR5NUkFHVpfGuKFfZW1Cqjzu6wTFY6v2JI=`. The claim needs to satisfy the
  [`node-validator`][show-native-token] global staking threshold parameter.

* The `registry.RegisterNode.xk58fx5ys6CSO33ngMQkgOL5UUHSgOSt0QbqWGGuEF8=`
  claim is for registering the three compute nodes with the public key
  `xk58fx5ys6CSO33ngMQkgOL5UUHSgOSt0QbqWGGuEF8==`. The claim needs to satisfy
  three [`node-compute`][show-native-token] global staking threshold parameters.

For more details on registering entities, nodes and ParaTimes, see the
[Oasis Core Registry service][oasis-core-registry].

[address book entry]: https://docs.oasis.io/build/tools/cli/addressbook.md

[show-native-token]: https://docs.oasis.io/build/tools/cli/network.md#show-native-token

**Info**:

[Network and ParaTime](#npa) selectors are available for the
`account show` command.

### Transfer

Use `account transfer <amount> <to>` command to transfer funds between two
accounts on the consensus layer or between two accounts inside the same
ParaTime.

The following command will perform a token transfer inside default ParaTime:

```shell
oasis account transfer 2.5 oscar --account orlando
```

```
You are about to sign the following transaction:
Format: plain
Method: accounts.Transfer
Body:
  To: oscar (oasis1qp87hflmelnpqhzcqcw8rhzakq4elj7jzv090p3e)
  Amount: 2.5 TEST
Authorized signer(s):
  1. cb+NHKt7JT4fumy0wQdkiBwO3P+DUh8ylozMpsu1xH4= (ed25519)
     Nonce: 0
Fee:
  Amount: 0.0002772 TEST
  Gas limit: 2772
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  orlando
(In case you are using a hardware-based signer you may need to confirm on device.)
```

Consensus layer token transfers:

```shell
oasis account transfer 2.5 oscar --account orlando --no-paratime
```

```
You are about to sign the following transaction:
Method: staking.Transfer
Body:
  To:     oasis1qp87hflmelnpqhzcqcw8rhzakq4elj7jzv090p3e
  Amount: 2.5 TEST
Nonce:  0
Fee:
  Amount: 0.0 TEST
  Gas limit: 1272
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
Account:  orlando
(In case you are using a hardware-based signer you may need to confirm on device.)
```

**Info**:

[Network, ParaTime and account](#npa) selectors are available for the
`account transfer` command.

**Info**:

The [`--subtract-fee`](#subtract-fee) flag is available both for consensus
and ParaTime transfers.

### Allowance

`account allow <beneficiary> <amount>` command makes your funds withdrawable by
a 3rd party beneficiary at consensus layer. For example, instead of paying your
partner for a service directly, you can ask for their address and enable
**them** to withdraw the amount which you agreed on from your account. This is a
similar mechanism to how payment checks were used in the past.

```shell
oasis account allow logan 10
```

```
You are about to sign the following transaction:
Method: staking.Allow
Body:
  Beneficiary:   oasis1qpl4axynedmdrrgrg7dpw3yxc4a8crevr5dkuksl
  Amount change: +10.0 TEST
Nonce:  2
Fee:
  Amount: 0.0 TEST
  Gas limit: 1286
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

The allowance command uses relative amount. For example, if your run the
above command 3 times, Logan will be allowed to withdraw 30 ROSE.

**Tip**:

To reduce the allowed amount or completely **disallow** the withdrawal, use the
negative amount. To avoid flag ambiguity in the shell, you will first need to
pass all desired flags and parameters except the negative amount, then append
`--` to mark the end of options, and finally append the negative amount.

```shell
oasis account allow logan -- -10
```

```
You are about to sign the following transaction:
Method: staking.Allow
Body:
  Beneficiary:   oasis1qpl4axynedmdrrgrg7dpw3yxc4a8crevr5dkuksl
  Amount change: -10.0 TEST
Nonce:  0
Fee:
  Amount: 0.0 TEST
  Gas limit: 1288
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
Account:  oscar
```

The allowance transaction is also required if you want to deposit funds from
your consensus account to a ParaTime. The ParaTime will **withdraw** the amount
from your consensus account and fund your ParaTime account with the same
amount deducted by the deposit fee. Oasis CLI can derive the address of the
ParaTime beneficiary, if you use `paratime:<paratime name>` as the beneficiary
address.

```shell
oasis account allow paratime:sapphire 10
```

```
You are about to sign the following transaction:
Method: staking.Allow
Body:
  Beneficiary:   oasis1qqczuf3x6glkgjuf0xgtcpjjw95r3crf7y2323xd
  Amount change: +10.0 TEST
Nonce:  2
Fee:
  Amount: 0.0 TEST
  Gas limit: 1286
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

**Info**:

[Network and account](#npa) selectors are available for the `account allow`
command.

### Deposit Tokens to a ParaTime

`account deposit <amount> [address]` will deposit funds from your consensus
account to the target address inside the selected ParaTime.

```shell
oasis accounts deposit 10 eugene --gas-price 0
```

```
You are about to sign the following transaction:
Format: plain
Method: consensus.Deposit
Body:
  To: eugene (oasis1qrvzxld9rz83wv92lvnkpmr30c77kj2tvg0pednz)
  Amount: 10.0 TEST
Authorized signer(s):
  1. Bx6gOixnxy15tCs09ua5DcKyX9uo2Forb32O6Hyjoc8= (ed25519)
     Nonce: 0
Fee:
  Amount: 0.0 TEST
  Gas limit: 73572
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

If no address is provided, the deposit will be made to the address
corresponding to your consensus account inside the ParaTime.

```shell
oasis accounts deposit 10 --gas-price 0
```

```
You are about to sign the following transaction:
Format: plain
Method: consensus.Deposit
Body:
  To: Self
  Amount: 10.0 TEST
Authorized signer(s):
  1. Bx6gOixnxy15tCs09ua5DcKyX9uo2Forb32O6Hyjoc8= (ed25519)
     Nonce: 0
Fee:
  Amount: 0.0 TEST
  Gas limit: 73542
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

Currently, deposit transactions are free of charge, hence the `--gas-price 0`
parameter to avoid spending unnecessary gas fees. Also, keep in
mind that **deposit and withdrawal fees are always paid by your ParaTime
account.** If it doesn't contain any ROSE, you will not able to cover the fees.

You can also make a deposit to an account with arbitrary address inside a
ParaTime. For example, let's deposit to some native address inside the
ParaTime:

```shell
oasis account deposit 10 oasis1qpxhsf7xnm007csw2acaa7mta2krzpwex5c90qu6 --gas-price 0
```

```
You are about to sign the following transaction:
Format: plain
Method: consensus.Deposit
Body:
  To: oasis1qpxhsf7xnm007csw2acaa7mta2krzpwex5c90qu6
  Amount: 10.0 TEST
Authorized signer(s):
  1. Bx6gOixnxy15tCs09ua5DcKyX9uo2Forb32O6Hyjoc8= (ed25519)
     Nonce: 0
Fee:
  Amount: 0.0 TEST
  Gas limit: 73572
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

Or to some address in the Ethereum format:

```shell
oasis accounts deposit 10 0x90adE3B7065fa715c7a150313877dF1d33e777D5 --gas-price 0
```

```
You are about to sign the following transaction:
Format: plain
Method: consensus.Deposit
Body:
  To: oasis1qpupfu7e2n6pkezeaw0yhj8mcem8anj64ytrayne
  Amount: 10.0 TEST
Authorized signer(s):
  1. Bx6gOixnxy15tCs09ua5DcKyX9uo2Forb32O6Hyjoc8= (ed25519)
     Nonce: 0
Fee:
  Amount: 0.0 TEST
  Gas limit: 73572
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

**Info**:

[Network, ParaTime and account](#npa) selectors are available for the
`account deposit` command.

### Withdraw Tokens from the ParaTime

`account withdraw <amount> [to]` will withdraw funds from your ParaTime account
to a consensus address:

```shell
oasis account withdraw 10 orlando
```

```
You are about to sign the following transaction:
Format: plain
Method: consensus.Withdraw
Body:
  To: orlando (oasis1qq84sc4q0shp5c5klwklqu59evz2mg59hveg7dqx)
  Amount: 10.0 TEST
Authorized signer(s):
  1. Bx6gOixnxy15tCs09ua5DcKyX9uo2Forb32O6Hyjoc8= (ed25519)
     Nonce: 0
Fee:
  Amount: 0.0073573 TEST
  Gas limit: 73573
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

If the address is not provided, the address of the account inside ParaTime will
be used as a consensus address:

```shell
oasis account withdraw 10
```

```
You are about to sign the following transaction:
Format: plain
Method: consensus.Withdraw
Body:
  To: Self
  Amount: 10.0 TEST
Authorized signer(s):
  1. Bx6gOixnxy15tCs09ua5DcKyX9uo2Forb32O6Hyjoc8= (ed25519)
     Nonce: 0
Fee:
  Amount: 0.0073543 TEST
  Gas limit: 73543
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

**Caution**:

Withdrawal transactions are not free of charge and the fee will be deducted
**from your ParaTime balance**.

Similar to the [`account deposit`](#deposit) command, you can also specify an
arbitrary Oasis address which you want to withdraw your tokens to.

```shell
oasis accounts withdraw 10 oasis1qpxhsf7xnm007csw2acaa7mta2krzpwex5c90qu6
```

```
You are about to sign the following transaction:
Format: plain
Method: consensus.Withdraw
Body:
  To: oasis1qpxhsf7xnm007csw2acaa7mta2krzpwex5c90qu6
  Amount: 10.0 TEST
Authorized signer(s):
  1. Bx6gOixnxy15tCs09ua5DcKyX9uo2Forb32O6Hyjoc8= (ed25519)
     Nonce: 0
Fee:
  Amount: 0.0073573 TEST
  Gas limit: 73573
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

**Caution**:

You cannot use the destination address of your `secp256k1` account or any other
Ethereum-formatted address for the withdrawal, because this signature scheme is
not supported on the consensus layer!

**Info**:

[Network, ParaTime and account](#npa) selectors are available for the
`account withdraw` command.

**Info**:

The [`--subtract-fee`](#subtract-fee) flag is available for withdrawal
transactions.

### Delegate Tokens to a Validator

To stake your tokens on the consensus layer, run
`account delegate <amount> <to>`. This will delegate the specified amount of
tokens to a validator.

You can either delegate directly on the consensus layer:

```shell
oasis account delegate 20 oasis1qpkl3vykn9mf4xcq9eevmey4ffrzf0ajtcpvd7sk --no-paratime
```

```
You are about to sign the following transaction:
Method: staking.AddEscrow
Body:
  To:     oasis1qpkl3vykn9mf4xcq9eevmey4ffrzf0ajtcpvd7sk
  Amount: 20.0 TEST
Nonce:  2
Fee:
  Amount: 0.0 TEST
  Gas limit: 1279
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

Or you can delegate from inside a ParaTime that supports delegations:

```shell
oasis account delegate 20 oasis1qpkl3vykn9mf4xcq9eevmey4ffrzf0ajtcpvd7sk
```

```
You are about to sign the following transaction:
Format: plain
Method: consensus.Delegate
Body:
  To: oasis1qpkl3vykn9mf4xcq9eevmey4ffrzf0ajtcpvd7sk
  Amount: 20.0 TEST
Authorized signer(s):
  1. Bx6gOixnxy15tCs09ua5DcKyX9uo2Forb32O6Hyjoc8= (ed25519)
     Nonce: 0
Fee:
  Amount: 0.0073574 TEST
  Gas limit: 73574
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

Once your tokens are staked, they are converted into *shares* since the number
of tokens may change over time based on the
[staking reward schedule][token-metrics] or if your validator is subject to
[slashing]. The number of shares on the other hand will remain constant. Also,
shares are always interpreted as a whole number, whereas the amount of tokens is
usually a rational number and may lead to rounding errors when managing your
delegations.

To find out how many shares did you delegate, run [`account show`](#show) and
look for the `shares` under the active delegations section.

**Info**:

[Network, ParaTime and account](#npa) selectors are available for the
`account delegate` command.

[token-metrics]: https://docs.oasis.io/general/oasis-network/token-metrics-and-distribution.md#staking-incentives

[slashing]: https://docs.oasis.io/general/manage-tokens/terminology.md#slashing

### Undelegate Tokens from the Validator

To reclaim your delegated assets, use `account undelegate <shares> <from>`. You
will need to specify the **number of shares instead of tokens** and the
validator address you want to reclaim your assets from.

Depending on where the tokens have been delegated from, you can either reclaim
delegated tokens directly on the consensus layer:

```shell
oasis account undelegate 20000000000 oasis1qpkl3vykn9mf4xcq9eevmey4ffrzf0ajtcpvd7sk --no-paratime
```

```
You are about to sign the following transaction:
Method: staking.ReclaimEscrow
Body:
  From:   oasis1qpkl3vykn9mf4xcq9eevmey4ffrzf0ajtcpvd7sk
  Shares: 20000000000
Nonce:  2
Fee:
  Amount: 0.0 TEST
  Gas limit: 1283
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

Or you can reclaim from inside a ParaTime that supports delegations:

```shell
oasis account undelegate 20000000000 oasis1qpkl3vykn9mf4xcq9eevmey4ffrzf0ajtcpvd7sk
```

```
You are about to sign the following transaction:
Format: plain
Method: consensus.Undelegate
Body:
  From: oasis1qpkl3vykn9mf4xcq9eevmey4ffrzf0ajtcpvd7sk
  Shares: 20000000000
Authorized signer(s):
  1. Bx6gOixnxy15tCs09ua5DcKyX9uo2Forb32O6Hyjoc8= (ed25519)
     Nonce: 0
Fee:
  Amount: 0.0145572 TEST
  Gas limit: 145572
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

After submitting the transaction, a [debonding period] will
commence. After the period has passed, the network will automatically move your
assets back to your account. Note that during the debonding period, your
assets may still be [slashed][slashing].

**Info**:

[Network, ParaTime and account](#npa) selectors are available for the
`account undelegate` command.

[debonding period]: https://docs.oasis.io/build/tools/cli/network.md#show

### Advanced

#### Public Key to Address

`account from-public-key <public_key>` converts the Base64-encoded public key
to the [Oasis native address].

```shell
oasis account from-public-key NcPzNW3YU2T+ugNUtUWtoQnRvbOL9dYSaBfbjHLP1pE=
```

```
oasis1qrec770vrek0a9a5lcrv0zvt22504k68svq7kzve
```

This command is most often used by the network validators for converting the
public key of their entity to a corresponding address. You can find your
entity's ID in the `id` field of the `entity.json` file.

**Tip**:

Oasis consensus transactions hold the public key of the signer instead of their
*from* address. This command can be used for debugging to determine the
signer's staking address on the network.

[Oasis native address]: https://docs.oasis.io/general/manage-tokens/terminology.md#address

#### Non-Interactive Mode

Add `-y` flag to any operation, if you want to use Oasis CLI in
non-interactive mode. This will answer "yes to all" for yes/no questions
and for all other prompts it will keep the proposed default values.

#### Output Transaction to File

Use `--output-file <filename>` parameter to save the resulting transaction to a
file instead of broadcasting it to the network. You can then use the
[`transaction`] command to verify and submit it.

Check out the [`--unsigned`] flag, if you wish to store the unsigned version of
the transaction and the [`--format`] parameter for a different transaction
encoding.

[`transaction`]: https://docs.oasis.io/build/tools/cli/transaction.md

[`--unsigned`]: #unsigned

[`--format`]: #format

#### Do Not Sign the Transaction

If you wish to *prepare* a transaction to be signed by a specific account in
the future, use the `--unsigned` flag. This will cause Oasis CLI to skip the
signing and broadcasting steps. The transaction will be printed to the
standard output instead.

You can also use [`--output-file`] to store the transaction to a file. This
setup is ideal when you want to sign a transaction with the
[offline/air-gapped machine] machine:

1. First, generate an unsigned transaction on a networked machine,
2. copy it over to an air-gapped machine,
3. [sign it][transaction-sign] on the air-gapped machine,
4. copy it over to the networked machine,
5. [broadcast the transaction][transaction-submit] on the networked machine.

Use the CBOR format, if you are using a 3rd party tool in step 3 to sign the
transaction content directly. Check out the [`--format`] parameter to learn
more.

[`--output-file`]: #output-file

[transaction-sign]: https://docs.oasis.io/build/tools/cli/transaction.md#sign

[transaction-submit]: https://docs.oasis.io/build/tools/cli/transaction.md#submit

[offline/air-gapped machine]: https://en.wikipedia.org/wiki/Air_gap_\(networking\)

#### Output format

Use `--format json` or `--format cbor` to select the output file
format. By default the JSON encoding is selected so that the file is
human-readable and that 3rd party applications can easily manage it. If you want
to output the transaction in the same format that will be stored on-chain or you
are using a 3rd party tool for signing the content of the transaction file
directly use the CBOR encoding.

This parameter only works together with [`--unsigned`] and/or
[`--output-file`] parameters.

#### Offline Mode

To generate a transaction without accessing the network and also without
broadcasting it, add `--offline` flag. In this case Oasis CLI will require that
you provide all necessary transaction details (e.g. [account nonce](#nonce),
[gas limit](#gas-limit), [gas price](#gas-price)) which would otherwise be
automatically obtained from the network. Oasis CLI will print the transaction to
the standard output for you to examine. Use [`--output-file`](#output-file), if
you wish to save the transaction to the file and submit it to the network
afterwards by using the [`transaction submit`][transaction-submit] command.

#### Subtract fee

To include the transaction fee inside the given amount, pass the
`--subtract-fee` flag. This comes handy, if you want to drain the account or
keep it rounded to some specific number.

```shell
oasis account transfer 1.0 0xDce075E1C39b1ae0b75D554558b6451A226ffe00 --account orlando --subtract-fee
```

```shell
You are about to sign the following transaction:
Format: plain
Method: accounts.Transfer
Body:
  To: test:dave (oasis1qrk58a6j2qn065m6p06jgjyt032f7qucy5wqeqpt)
  Amount: 0.9997228 TEST
Authorized signer(s):
  1. cb+NHKt7JT4fumy0wQdkiBwO3P+DUh8ylozMpsu1xH4= (ed25519)
     Nonce: 0
Fee:
  Amount: 0.0002772 TEST
  Gas limit: 2772
  (gas price: 0.0000001 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
Account:  orlando
(In case you are using a hardware-based signer you may need to confirm on device.)
```

#### Account's Nonce

`--nonce <nonce_number>` will override the detection of the account's nonce used
to sign the transaction with the specified one.

#### Gas Price

`--gas-price <price_in_base_units>` sets the transaction's price per gas unit in
base units.

#### Gas Limit

`--gas-limit <limit>` sets the maximum amount of gas that can be spend by the
transaction.

#### Entity Management

##### Initialize Entity

When setting up a validator node for the first time, you will need to provide
the path to the file containing your entity descriptor as well as register it in
the network registry. Use `account entity init` to generate the entity
descriptor file containing the public key of the selected account.

```shell
oasis account entity init
```

```json
{
  "id": "Bx6gOixnxy15tCs09ua5DcKyX9uo2Forb32O6Hyjoc8=",
  "nodes": [],
  "v": 2
}
```

By default, the file content will be printed to the standard output. You can use
`-o` parameter to store it to a file, for example:

```shell
oasis account entity init -o entity.json
```

**Info**:

[Account](#account) selector is available for the
`account entity init` command.

##### Register your Entity

In order for validators to become part of the validator set and/or the compute
committee, they first need to register as an entity inside the network's
registry. Use the `account entity register <entity.json>` command to register
your entity and provide a JSON file with the Entity descriptor. You can use the
[`network show`][network-show] command to see existing entities and
then examine specific ones to see how entity descriptors of the currently
registered entities look like.

[network-show]: https://docs.oasis.io/build/tools/cli/network.md#show

[oasis-core-registry]: https://docs.oasis.io/core/consensus/services/registry.md#entities-and-nodes

```shell
oasis account entity register entity.json
```

```
Signing the entity descriptor...
(In case you are using a hardware-based signer you may need to confirm on device.)
You are about to sign the following transaction:
Method: registry.RegisterEntity
Body:
  {
    "untrusted_raw_value": {
      "v": 2,
      "id": "Bx6gOixnxy15tCs09ua5DcKyX9uo2Forb32O6Hyjoc8=",
      "nodes": [
        "nshzFvqLNNLN+HS0id5XmXrVMhIgFV456i4VQicWgjk="
      ]
    },
    "signature": {
      "public_key": "Bx6gOixnxy15tCs09ua5DcKyX9uo2Forb32O6Hyjoc8=",
      "signature": "DAwn+N8hKmQMbZda/fFJSEgErDAAdebXLfIPOpqUkJowJLUAL+nfrUMz5SVkKc0TnqQOavoSAVFz1yoRJ3QuBA=="
    }
  }
Nonce:  2
Fee:
  Amount: 0.0 TEST
  Gas limit: 2479
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

**Info**:

[Network and account](#npa) selectors are available for the
`account entity register` command.

##### Deregister Your Entity

To remove an entity from the network's registry, invoke
`account entity deregister`. No additional arguments are required since each
account can only deregister their own entity, if one exists in the registry.

```shell
oasis account entity deregister
```

```
You are about to sign the following transaction:
Method: registry.DeregisterEntity
Body:
  {}
Nonce:  2
Fee:
  Amount: 0.0 TEST
  Gas limit: 1239
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

**Info**:

[Network and account](#npa) selectors are available for the
`account entity deregister` command.

#### Change Your Commission Schedule

Validators can use `account amend-commission-schedule` to add or remove
their commission bounds and rates at consensus layer. Rate bounds can be
defined by using the `--bounds <epoch>/<min_rate>/<max_rate>` parameter.
Actual rates which can be subject to change every epoch can be defined with the
`--rates <epoch>/<rate>` parameter. Rates are specified in milipercents
(100% = 100000m%). The new commission schedule will replace any previous
schedules.

```shell
oasis account amend-commission-schedule --bounds 329000/1000/2000,335000/900/1900 --rates 329000/1500
```

```
You are about to sign the following transaction:
Method: staking.AmendCommissionSchedule
Body:
  Amendment:
    Rates:
      (1) start: epoch 329000
          rate:  1.5%
    Rate Bounds:
      (1) start:        epoch 329000
          minimum rate: 1.0%
          maximum rate: 2.0%
      (2) start:        epoch 335000
          minimum rate: 0.9%
          maximum rate: 1.9%
Nonce:  2
Fee:
  Amount: 0.0 TEST
  Gas limit: 1369
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

To learn more on commission rates read the  section inside the Oasis Core
[Staking service][staking-service-commission-schedule] chapter.

**Info**:

[Network and account](#npa) selectors are available for the
`account amend-commission-schedule` command.

[staking-service-commission-schedule]: https://docs.oasis.io/core/consensus/services/staking.md#amend-commission-schedule

#### Unfreeze Your Node

Once the validators, based on their stake, get elected into the validator set,
it is important that their nodes are actively participating in proposing new
blocks and submitting votes for other proposed blocks. For regular node
upgrades and maintenance, the validators should follow the
[Shutting Down a Node] instructions. Nevertheless, if the network froze your
node, the only way to unfreeze it is to execute the `account node-unfreeze`

```shell
oasis account node-unfreeze fasTG3pMOwLfFA7JX3R8Kxw1zFflqeY6NP/cpjcFu5I=
```

```
You are about to sign the following transaction:
Method: registry.UnfreezeNode
Body:
  {
    "node_id": "fasTG3pMOwLfFA7JX3R8Kxw1zFflqeY6NP/cpjcFu5I="
  }
Nonce:  2
Fee:
  Amount: 0.0 TEST
  Gas limit: 1282
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

**Info**:

[Network and account](#npa) selectors are available for the
`account node-unfreeze` command.

[Shutting Down a Node]: https://docs.oasis.io/node/run-your-node/maintenance/shutting-down-a-node.md

#### Burn Tokens

`account burn <amount>` command will permanently destroy the amount of tokens
in your account and remove them from circulation. This command should not be
used on public networks since not only no one will be able to access burnt
assets anymore, but will also permanently remove the tokens from circulation.

```shell
oasis account burn 2.5
```

```
You are about to sign the following transaction:
Method: staking.Burn
Body:
  Amount: 2.5 TEST
Nonce:  2
Fee:
  Amount: 0.0 TEST
  Gas limit: 1243
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
Account:  oscar
(In case you are using a hardware-based signer you may need to confirm on device.)
```

**Info**:

[Network and account](#npa) selectors are available for the `account burn`
command.

#### Pools and Reserved Addresses

The following literals are used in the Oasis CLI to denote special reserved
addresses which cannot be directly used in the ledger:

##### Consensus layer

* `pool:consensus:burn`: The token burn address.
* `pool:consensus:common`: The common pool address.
* `pool:consensus:fee-accumulator`: The per-block fee accumulator address.
* `pool:consensus:governance-deposits`: The governance deposits address.

##### ParaTime layer

* `pool:paratime:common`: The common pool address.
* `pool:paratime:fee-accumulator`: The per-block fee accumulator address.
* `pool:paratime:pending-withdrawal`: The internal pending withdrawal address.
* `pool:paratime:pending-delegation`: The internal pending delegation address.
* `pool:paratime:rewards`: The reward pool address.

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
