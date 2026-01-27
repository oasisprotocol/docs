# ParaTime

Source: https://docs.oasis.io/build/tools/cli/paratime

## Managing Your ParaTimes

The `paratime` command lets you manage your ParaTime configurations bound to a
specific [network]. If you are a ParaTime developer, the command allows you to
register a new ParaTime into the public network's registry. The command
also supports examining specific block and a transaction inside the ParaTime
and printing different validator-related statistics.

**Tip**:

When running the Oasis CLI for the first time, it will automatically configure
official Oasis ParaTimes running on the [Mainnet] and [Testnet] networks.

### Add a ParaTime

Invoke `paratime add <network> <name> <id>` to add a new ParaTime to your Oasis
CLI configuration. Beside the name of the corresponding network and the unique
ParaTime name inside that network, you will also need to provide the
[ParaTime ID]. This is a unique identifier of the ParaTime on the network, and
it remains the same even when the network and ParaTime upgrades occur. You can
always check the IDs of the official Oasis ParaTimes on the respective
[Mainnet] and [Testnet] pages.

Each ParaTime also has a native token denomination symbol defined with specific
number of decimal places which you will need to specify.

```shell
oasis paratime add testnet sapphire2 000000000000000000000000000000000000000000000000a6d1e3ebf60dff6d
```

```
? Description:
? Denomination symbol: TEST
? Denomination decimal places: 18
```

You can also enable [non-interactive mode](https://docs.oasis.io/build/tools/cli/account.md#y) and pass
`--num-decimals`, `--symbol` and `--description` parameters directly:

```shell
oasis paratime add testnet sapphire2 000000000000000000000000000000000000000000000000a6d1e3ebf60dff6d --num-decimals 18 --symbol TEST --description "Testnet Sapphire 2" -y
```

**Danger**: Decimal places of the native and ParaTime token may differ!

Emerald and Sapphire use **18 decimals** for compatibility with
Ethereum tooling. The Oasis Mainnet and Testnet consensus layer tokens and the
token native to Cipher have **9 decimals**.

Configuring the wrong number of decimal places will lead to incorrect amount
of tokens to be deposited, withdrawn or transferred from or into the ParaTime!

**Tip**:

If you configured your network with the [`network add-local`] command, then all
registered ParaTimes of that network will be detected and added to your Oasis
CLI config automatically.

[network]: https://docs.oasis.io/build/tools/cli/network.md

[`network add-local`]: https://docs.oasis.io/build/tools/cli/network.md#add-local

[ParaTime ID]: https://docs.oasis.io/core/runtime/identifiers.md

[Mainnet]: https://github.com/oasisprotocol/docs/blob/main/docs/node/network/mainnet

[Testnet]: https://github.com/oasisprotocol/docs/blob/main/docs/node/network/testnet

### List ParaTimes

Invoke `paratime list` to list all configured ParaTimes across the networks.

For example, at time of writing this section the following ParaTimes were
preconfigured by the Oasis CLI:

```shell
oasis paratime list
```

```
NETWORK	PARATIME    	ID                                                              	DENOMINATION(S) 
mainnet	cipher      	000000000000000000000000000000000000000000000000e199119c992377cb	ROSE[9] (*)    	
mainnet	emerald     	000000000000000000000000000000000000000000000000e2eaa99fc008f87f	ROSE[18] (*)   	
mainnet	sapphire (*)	000000000000000000000000000000000000000000000000f80306c9858e7279	ROSE[18] (*)   	
testnet	cipher      	0000000000000000000000000000000000000000000000000000000000000000	TEST[9] (*)    	
testnet	emerald     	00000000000000000000000000000000000000000000000072c8215e60d5bca7	TEST[18] (*)   	
testnet	pontusx_dev 	0000000000000000000000000000000000000000000000004febe52eb412b421	EUROe[18] (*)  	
       	            	                                                                	TEST[18]       	
testnet	pontusx_test	00000000000000000000000000000000000000000000000004a6f9071c007069	EUROe[18] (*)  	
       	            	                                                                	TEST[18]       	
testnet	sapphire (*)	000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c	TEST[18] (*)   	
```

The [default ParaTime](#set-default) for each network is marked with the `(*)`
sign.

**Info**:

ParaTimes on this list are configured inside your Oasis CLI instance. They
may not actually exist on the network.

### Remove a ParaTime

To remove a configuration of a ParaTime for a specific network, use
`paratime remove <network> <name>`. For example, let's remove the
[previously added](#add) ParaTime:

```shell
oasis paratime list
```

```
NETWORK	PARATIME    	ID                                                              	DENOMINATION(S) 
mainnet	cipher      	000000000000000000000000000000000000000000000000e199119c992377cb	ROSE[9] (*)    	
mainnet	emerald (*) 	000000000000000000000000000000000000000000000000e2eaa99fc008f87f	ROSE[18] (*)   	
mainnet	sapphire    	000000000000000000000000000000000000000000000000f80306c9858e7279	ROSE[18] (*)   	
testnet	cipher      	0000000000000000000000000000000000000000000000000000000000000000	TEST[9] (*)    	
testnet	emerald (*) 	00000000000000000000000000000000000000000000000072c8215e60d5bca7	TEST[18] (*)   	
testnet	pontusx_dev 	0000000000000000000000000000000000000000000000004febe52eb412b421	EUROe[18] (*)  	
       	            	                                                                	TEST[18]       	
testnet	pontusx_test	00000000000000000000000000000000000000000000000004a6f9071c007069	EUROe[18] (*)  	
       	            	                                                                	TEST[18]       	
testnet	sapphire    	000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c	TEST[18] (*)   	
testnet	sapphire2   	000000000000000000000000000000000000000000000000a6d1e3ebf60dff6d	TEST[18] (*)   	
```

```shell
oasis paratime remove testnet sapphire2
```

```shell
oasis paratime list
```

```
NETWORK	PARATIME    	ID                                                              	DENOMINATION(S) 
mainnet	cipher      	000000000000000000000000000000000000000000000000e199119c992377cb	ROSE[9] (*)    	
mainnet	emerald (*) 	000000000000000000000000000000000000000000000000e2eaa99fc008f87f	ROSE[18] (*)   	
mainnet	sapphire    	000000000000000000000000000000000000000000000000f80306c9858e7279	ROSE[18] (*)   	
testnet	cipher      	0000000000000000000000000000000000000000000000000000000000000000	TEST[9] (*)    	
testnet	emerald (*) 	00000000000000000000000000000000000000000000000072c8215e60d5bca7	TEST[18] (*)   	
testnet	pontusx_dev 	0000000000000000000000000000000000000000000000004febe52eb412b421	EUROe[18] (*)  	
       	            	                                                                	TEST[18]       	
testnet	pontusx_test	00000000000000000000000000000000000000000000000004a6f9071c007069	EUROe[18] (*)  	
       	            	                                                                	TEST[18]       	
testnet	sapphire    	000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c	TEST[18] (*)   	
```

### Set Default ParaTime

To change the default ParaTime for Oasis CLI transactions on the specific
network, use `paratime set-default <network> <name>`.

For example, to set the Cipher ParaTime default on the Testnet, run:

```shell
oasis paratime set-default testnet cipher
```

```shell
oasis paratime list
```

```
NETWORK	PARATIME    	ID                                                              	DENOMINATION(S) 
mainnet	cipher      	000000000000000000000000000000000000000000000000e199119c992377cb	ROSE[9] (*)    	
mainnet	emerald     	000000000000000000000000000000000000000000000000e2eaa99fc008f87f	ROSE[18] (*)   	
mainnet	sapphire (*)	000000000000000000000000000000000000000000000000f80306c9858e7279	ROSE[18] (*)   	
testnet	cipher (*)  	0000000000000000000000000000000000000000000000000000000000000000	TEST[9] (*)    	
testnet	emerald     	00000000000000000000000000000000000000000000000072c8215e60d5bca7	TEST[18] (*)   	
testnet	pontusx_dev 	0000000000000000000000000000000000000000000000004febe52eb412b421	EUROe[18] (*)  	
       	            	                                                                	TEST[18]       	
testnet	pontusx_test	00000000000000000000000000000000000000000000000004a6f9071c007069	EUROe[18] (*)  	
       	            	                                                                	TEST[18]       	
testnet	sapphire    	000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c	TEST[18] (*)   	
```

### Show

Use `paratime show` to investigate a specific ParaTime block or other
parameters.

#### `<round>`

Providing the block round or `latest` literal will print its header and other
information.

```shell
oasis paratime show 5850612
```

```
Network:        mainnet
ParaTime:       emerald
Round:          5850612
Version:        0
Namespace:      000000000000000000000000000000000000000000000000e2eaa99fc008f87f
Timestamp:      2023-05-29T11:21:20Z
Type:           1
Previous:       3e91bd4fc60d8a2cc03dc50c87ff532bef5703fedc35bba8aed4d8980526bb51
I/O root:       d16db82426c93e2671b8fbe74db56d17fbc88800e93490dd0a6feae11d35a9a8
State root:     2c1bc5c89c59bee77511e7a58e7494bb815ab73bb63333da1c15d171e48b79b8
Messages (out): c672b8d1ef56ed28ab87c3622c5114069bdd3ad7b8f9737498d0c01ecef0967a
Messages (in):  c672b8d1ef56ed28ab87c3622c5114069bdd3ad7b8f9737498d0c01ecef0967a
Transactions:   1
```

To show the details of the transaction stored inside the block including the
transaction status and any emitted events, pass the transaction index in the
block or its hash:

```shell
oasis paratime show 5850612 0
```

```
Network:        mainnet
ParaTime:       emerald
Round:          5850612
Version:        0
Namespace:      000000000000000000000000000000000000000000000000e2eaa99fc008f87f
Timestamp:      2023-05-29T11:21:20Z
Type:           1
Previous:       3e91bd4fc60d8a2cc03dc50c87ff532bef5703fedc35bba8aed4d8980526bb51
I/O root:       d16db82426c93e2671b8fbe74db56d17fbc88800e93490dd0a6feae11d35a9a8
State root:     2c1bc5c89c59bee77511e7a58e7494bb815ab73bb63333da1c15d171e48b79b8
Messages (out): c672b8d1ef56ed28ab87c3622c5114069bdd3ad7b8f9737498d0c01ecef0967a
Messages (in):  c672b8d1ef56ed28ab87c3622c5114069bdd3ad7b8f9737498d0c01ecef0967a
Transactions:   1

=== Transaction 0 ===
Kind:      evm.ethereum.v0
Hash:      4fc2907da5f73599519ed120916b7a9073a433b23b7ae65747e24fe75ebba832
Eth hash:  0x9cc12c960004b724356000d1d9af0ca3a092951d759590748a98431eb49c8d10
Chain ID:  42262
Nonce:     1976
Type:      0
To:        0x47DAcE3BDcc877f77fB92925ea55e25c792Bf265
Value:     0
Gas limit: 900000
Gas price: 100000000000
Data:
  2ee6f87400000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000008d03941494a56164ea04d79f9867dddb0dd754a625cc21085e9307a7ec5206ca17db95be9eba7c71362e238396d4d01ba5621e66894a0228f6b3651f15660000008606060000000000066a7c4e95a979400021c718c22d52d0f3a789b752d4c2fd5908a8a733f02b3e437304892105992512539f769423a515cba1e73c01e0cf7930f5e91cb291031739fe5ad6c20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

=== Result of transaction 0 ===
Status: ok
Data:
  "0000000000000000000000000000000000000000000000000000000000000000"

=== Events emitted by transaction 0 ===
Events: 1

  --- Event 0 ---
  Module: core
  Code:   1
  Data:
    [
      {
        "amount": 48219
      }
    ]

```

Encrypted transactions can also be examined, although the data chunk will be
encrypted:

```shell
oasis paratime show 1078544 0 --network testnet --paratime sapphire
```

```
Network:        testnet
ParaTime:       sapphire
Round:          1078544
Version:        0
Namespace:      000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c
Timestamp:      2023-05-03T15:06:19Z
Type:           1
Previous:       1e239120b149d02e04778affbfc126cebfe5c758c953b015ab8cef876bd5f702
I/O root:       498269b1f1607ac35f8860437d2e9648994263f865905a4551174cf6e0fce52f
State root:     9c2abe9051842cfa8d4b0981cfc9a08e55d13e516811ec20147e8a58c0b85c08
Messages (out): c672b8d1ef56ed28ab87c3622c5114069bdd3ad7b8f9737498d0c01ecef0967a
Messages (in):  c672b8d1ef56ed28ab87c3622c5114069bdd3ad7b8f9737498d0c01ecef0967a
Transactions:   1

=== Transaction 0 ===
Kind:      evm.ethereum.v0
Hash:      41cc58c02147b7728c9dfcf528cfa71c6f4c04fc98fe33c5b2b9811e0379fa82
Eth hash:  0x970a642de01cffdcdd9e75d288d912b96c48bd29e14f2ad2b572770647ac97d4
Chain ID:  23295
Nonce:     1185
Type:      0
To:        0x8c064bCf7C0DA3B3b090BAbFE8f3323534D84d68
Value:     0
Gas limit: 1000000
Gas price: 100000000000
Data:
  a264626f6479a362706b5820051201801dd7c98d4b5b195344146ce425cc01f12912e37cbd2fd92d5654354c646461746159015d6c56384c75f48ba3e3ca53607969ae6d9d44e2b6921e7fd34ee5aee8da5a1b519709bf4778a725048552e6b3520281285969cae0169adfd6d5792847bc37439d89c4b9dbbf2cf3c22e305c9a3a3d5b61026831c8f672b49e565cdc6eda81a55492262a0ede45742020efdca28f9d53ec928c1ac5171345d956bdda31971eafc90892f8fdaf75587358db0c2cd20f182b34b9d11e98958fb2320f0b62a4061bca65ca529dcd51ced9b8f1d8ca45d4c3be642000324b176077fec82bbc7770ca670f5fa73a397871e4940fef662654c70aebeac53424f42a5a6b90792db90807912f8a491a2d5ea141dddf03cb8061c8cbedef1d847779792d6ccc679a64adf7961e793c0a9314c74e151e938d111186d0c47a265f390e482edc37ce53a49f7e319bcaa395c882cf5778c7c8245828db199000ae494c66f9f6dd7159116417d2671dd99c4e00683e42e53700014b3e71f9b752579fdb499eddbf83a71333656e6f6e63654f914e6a1dcbf430c9de867ed8534ec266666f726d617401

=== Result of transaction 0 ===
Status: ok
Data:
  "a1626f6ba264646174615561a6f942703204748459335a5d50058ebe8bf6cc5c656e6f6e63654f000000000010750f00000000000000"

=== Events emitted by transaction 0 ===
Events: 1

  --- Event 0 ---
  Module: core
  Code:   1
  Data:
    [
      {
        "amount": 31451
      }
    ]

```

#### `parameters`

This will print various ParaTime-specific parameters such as the ROFL stake
thresholds.

```shell
oasis paratime show parameters
```

```
Network:        testnet
ParaTime:       sapphire

=== ROFL PARAMETERS ===
  Stake thresholds:
    App create: 100.0 TEST


=== ROFL MARKET PARAMETERS ===
  Stake thresholds:
    Provider create: 100.0 TEST

```

By passing `--format json`, the output is formatted as JSON.

#### `events`

This will return all Paratime events emitted in the block.

Use `--round <round>` to specify the round number.

```shell
oasis paratime show events --round 9399871 --format json
```

```
[
  {
    "code": 1,
    "data": "gaNidG9VAGIz3RCYb9ltIk8706by6j2XkXGmZGZyb21VAJZQKbOBY+XnA5YUaDhZkNc3y+nsZmFtb3VudIJHCxBZMMJwAEA=",
    "module": "accounts",
    "parsed": [
      {
        "Transfer": {
          "from": "oasis1qzt9q2dns937tecrjc2xswzejrtn0jlfas40j7sz",
          "to": "oasis1qp3r8hgsnphajmfzfuaa8fhjag7e0yt35cjxq0u4",
          "amount": {
            "Amount": "3114200000000000",
            "Denomination": ""
          }
        },
        "Burn": null,
        "Mint": null
      }
    ],
    "tx_hash": "c586f05e2103adb953d2287ef22dad0532540bd02481184b5477ba8c38894e62"
  },
  {
    "code": 1,
    "data": "gqNidG9VAIyCi8jiQIOmvod+yJYxN0GhktyEZGZyb21VACg9qHdJLY0x3unzFR/SHF3dLD+oZmFtb3VudIJIAWNFeMTiZV9Ao2J0b1UAYjPdEJhv2W0iTzvTpvLqPZeRcaZkZnJvbVUAKD2od0ktjTHe6fMVH9IcXd0sP6hmYW1vdW50gkcH3eTk7RgAQA==",
    "module": "accounts",
    "parsed": [
      {
        "Transfer": {
          "from": "oasis1qq5rm2rhfykc6vw7a8e3287jr3wa6tpl4qv49gzh",
          "to": "oasis1qzxg9z7gufqg8f47salv3933xaq6rykusslsq4k7",
          "amount": {
            "Amount": "100000001733846367",
            "Denomination": ""
          }
        },
        "Burn": null,
        "Mint": null
      },
      {
        "Transfer": {
          "from": "oasis1qq5rm2rhfykc6vw7a8e3287jr3wa6tpl4qv49gzh",
          "to": "oasis1qp3r8hgsnphajmfzfuaa8fhjag7e0yt35cjxq0u4",
          "amount": {
            "Amount": "2214300000000000",
            "Denomination": ""
          }
        },
        "Burn": null,
        "Mint": null
      }
    ],
    "tx_hash": "de7e52e94f4614ec0b0de47971abc12d5070278e9401c2466ec5664a71bdc57d"
  },
  {
    "code": 1,
    "data": "gaFmYW1vdW50GXmm",
    "module": "core",
    "parsed": [
      {
        "GasUsed": {
          "amount": 31142
        }
      }
    ],
    "tx_hash": "c586f05e2103adb953d2287ef22dad0532540bd02481184b5477ba8c38894e62"
  },
  {
    "code": 1,
    "data": "gaFmYW1vdW50GVZ/",
    "module": "core",
    "parsed": [
      {
        "GasUsed": {
          "amount": 22143
        }
      }
    ],
    "tx_hash": "de7e52e94f4614ec0b0de47971abc12d5070278e9401c2466ec5664a71bdc57d"
  }
]
```

By passing `--format json`, the output is formatted as JSON.

### Set information about a denomination

To set information about a denomination on the specific network and paratime use
`paratime denom set <network> <paratime> <denomination> <number_of_decimals> --symbol <symbol>`. To use this command a denomination must already exist in the
actual paratime.

```shell
oasis paratime denom set mainnet sapphire TESTTEST 16
```

### Set information about the native denomination

To set information about the native denomination on the specific network and
paratime use `paratime denom set-native <network> <paratime> <denomination> <number_of_decimals>`.

The native denomination is already mandatory in the [`paratime add`](#add)
command.

```shell
oasis paratime denom set-native testnet cipher TEST 9
```

### Remove denomination

To remove an existing denomination on the specific network and paratime use
`paratime denom remove <network> <paratime> <denomination>`.

The native denomination cannot be removed.

```shell
oasis paratime denom remove mainnet sapphire TESTTEST
```

### Advanced

#### Register a New ParaTime

ParaTime developers may add a new ParaTime to the network's registry by
invoking the `paratime register <desc.json>` command and providing a JSON file
with the ParaTime descriptor. You can use the
[`network show`][network-show-id] command passing the ParaTime ID to
see how descriptors of the currently registered ParaTimes look like.

To learn more about registering your own ParaTime, check the
[Oasis Core Registry service].

[network-show-id]: https://docs.oasis.io/build/tools/cli/network.md#show-id

[Oasis Core Registry service]: https://docs.oasis.io/core/consensus/services/registry.md#register-runtime

#### Statistics

`paratime statistics [<start-round> [<end-round>]]` will examine the voting
details for a range of blocks. First, it will print you aggregated statistics
showing you the number of successful rounds in that range, epoch transitions
and also anomalies such as the proposer timeouts, failed rounds and
discrepancies. Then, it will print out detailed validator per-entity
statistics for that range of blocks.

The passed block number should be enumerated based on the round
inside the ParaTime. The start round can be one of the following:

* If no round given, the validation of the last block will be examined.
* If a negative round number `N` is passed, the last `N` blocks will be
  examined.
* If `0` is given, the oldest block available to the Oasis endpoint will be
  considered as a starting block.
* A positive number will be considered as a start round.

At time of writing, the following statistics was available:

```shell
oasis paratime statistics
```

```
=== PARATIME STATISTICS ===
Network:                   mainnet
ParaTime ID:               000000000000000000000000000000000000000000000000e2eaa99fc008f87f
Start height:              14097886
End height:                14097887
ParaTime rounds:           1
Successful rounds:         1
Epoch transition rounds:   0
Proposer timed out rounds: 0
Failed rounds:             0
Discrepancies:             0
Discrepancies (timeout):   0
Suspended:                 0

=== ENTITY STATISTICS ===
|                  ENTITY ADDR                   |          ENTITY NAME           | ELECTED | PRIMARY | BACKUP | PROPOSER | PRIMARY INVOKED | PRIMARY GOOD COMMIT | PRIM BAD COMMMIT | BCKP INVOKED | BCKP GOOD COMMIT | BCKP BAD COMMIT | PRIMARY MISSED | BCKP MISSED | PROPOSER MISSED | PROPOSED TIMEOUT |
|------------------------------------------------|--------------------------------|---------|---------|--------|----------|-----------------|---------------------|------------------|--------------|------------------|-----------------|----------------|-------------|-----------------|------------------|
| oasis1qpxpnxxk4qcgl7n55tx0yuqmrcw5cy2u5vzjq5u4 | Perfect Stake                  |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qpavd66xsezz8s4wjw2fyycxw8jm2nlpnuejlg2g | Spherical One                  |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qz72lvk2jchk0fjrz7u2swpazj3t5p0edsdv7sf8 | Ocean Stake                    |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qz0ea28d8p4xk8xztems60wq22f9pm2yyyd82tmt | Simply Staking                 |       1 |       1 |      0 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qzl99wft8jtt7ppprk7ce7s079z3r3t77s6pf3dd | DCC Capital                    |       1 |       1 |      0 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qps9drw07z0gmh5z2pn7zwl3z53ate2yvqf3uzq5 | cherkes                        |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qpjuke27se2wnmvx6e8uc4l5h44yjp9h7g2clqfq | RockX                          |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qz8vfnkcc48grazt83gstfm6yjwyptalny8cywtp | Kumaji                         |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qzt4fvcc6cw9af69tek9p3mfjwn3a5e5vcyrw7ac | StakeService                   |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qz0pvg26eudajp60835wl3jxhdxqz03q5qt9us34 | AnkaStake                      |       1 |       1 |      0 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qrs8zlh0mj37ug0jzlcykz808ylw93xwkvknm7yc | Bitoven                        |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qr0jwz65c29l044a204e3cllvumdg8cmsgt2k3ql | Staking Fund                   |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qpntrlgxp5tt36pkdezdjt5d27fzkvp22y46qura | Chloris Network                |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qzf03q57jdgdwp2w7y6a8yww6mak9khuag9qt0kd | Spectrum Staking               |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qq7vyz4ewrdh00yujw0mgkf459et306xmvh2h3zg | P2P.ORG - P2P Validator        |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qzugextrcdueshq63w7l9x4xglnusznsgqa95w7e | Alexander (aka Bambarello)     |       1 |       1 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
|                                                | Validator                      |         |         |        |          |                 |                     |                  |              |                  |                 |                |             |                 |                  |
| oasis1qrugz89g5esmhs0ezer0plsfvmcgctge35n32vmr | Validatrium                    |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qrdx0n7lgheek24t24vejdks9uqmfldtmgdv7jzz | Bit Cat🐱                      |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qp9xlxurlcx3k5h3pkays56mp48zfv9nmcf982kn | ELYSIUM                        |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qp4f47plgld98n5g2ltalalnndnzz96euv9n89lz | Julia-Ju                       |       1 |       1 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qqf6wmc0ax3mykd028ltgtqr49h3qffcm50gwag3 | ou812                          |       1 |       1 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qq0xmq7r0z9sdv02t5j9zs7en3n6574gtg8v9fyt | Mars Staking | Long term fee   |       1 |       1 |      1 |        2 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
|                                                | 1%                             |         |         |        |          |                 |                     |                  |              |                  |                 |                |             |                 |                  |
| oasis1qqewwznmvwfvee0dyq9g48acy0wcw890g549pukz | Wanderer Staking               |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qqx820g2geqzeyeyfnm5hgz72eaj9emajgqmscy0 | max999                         |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qp60saapdcrhe5zp3c3zk52r4dcfkr2uyuc5qjxp | Tessellated Geometry           |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qpaygvzwd5ffh2f5p4qdqylymgqcvl7sp5gxyrl3 | Appload                        |       1 |       1 |      0 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qrgxl0ylc7lvkj0akv6s32rj4k98nr0f7smf6m4k | itokenpool                     |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qram2p9w3yxm4px5nth8n7ugggk5rr6ay5d284at | Realizable                     |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qz22xm9vyg0uqxncc667m4j4p5mrsj455c743lfn | S5                             |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qppctxzn8djkqfvrxugak9v7dp25vddq7sxqhkry | Tuzem                          |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qqrv4g5wu543wa7fcae76eucqfn2uc77zgqw8fxk | Lusia                          |       1 |       1 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qrtq873ddwnnjqyv66ezdc9ql2a07l37d5vae9k0 | Forbole                        |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qp53ud2pcmm73mlf4qywnrr245222mvlz5a2e5ty | SerGo                          |       1 |       1 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qrmexg6kh67xvnp7k42sx482nja5760stcrcdkhm | ushakov                        |       1 |       0 |      1 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
```

To extend statistics to, say 5 last blocks, you can run:

```shell
oasis paratime statistics -- -5
```

```
=== PARATIME STATISTICS ===
Network:                   mainnet
ParaTime ID:               000000000000000000000000000000000000000000000000e2eaa99fc008f87f
Start height:              14097903
End height:                14097908
ParaTime rounds:           4
Successful rounds:         4
Epoch transition rounds:   0
Proposer timed out rounds: 0
Failed rounds:             0
Discrepancies:             0
Discrepancies (timeout):   0
Suspended:                 0

=== ENTITY STATISTICS ===
|                  ENTITY ADDR                   |          ENTITY NAME           | ELECTED | PRIMARY | BACKUP | PROPOSER | PRIMARY INVOKED | PRIMARY GOOD COMMIT | PRIM BAD COMMMIT | BCKP INVOKED | BCKP GOOD COMMIT | BCKP BAD COMMIT | PRIMARY MISSED | BCKP MISSED | PROPOSER MISSED | PROPOSED TIMEOUT |
|------------------------------------------------|--------------------------------|---------|---------|--------|----------|-----------------|---------------------|------------------|--------------|------------------|-----------------|----------------|-------------|-----------------|------------------|
| oasis1qrmexg6kh67xvnp7k42sx482nja5760stcrcdkhm | ushakov                        |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qzt4fvcc6cw9af69tek9p3mfjwn3a5e5vcyrw7ac | StakeService                   |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qq7vyz4ewrdh00yujw0mgkf459et306xmvh2h3zg | P2P.ORG - P2P Validator        |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qqx820g2geqzeyeyfnm5hgz72eaj9emajgqmscy0 | max999                         |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qz22xm9vyg0uqxncc667m4j4p5mrsj455c743lfn | S5                             |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qqewwznmvwfvee0dyq9g48acy0wcw890g549pukz | Wanderer Staking               |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qp60saapdcrhe5zp3c3zk52r4dcfkr2uyuc5qjxp | Tessellated Geometry           |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qrs8zlh0mj37ug0jzlcykz808ylw93xwkvknm7yc | Bitoven                        |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qzf03q57jdgdwp2w7y6a8yww6mak9khuag9qt0kd | Spectrum Staking               |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qpjuke27se2wnmvx6e8uc4l5h44yjp9h7g2clqfq | RockX                          |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qpxpnxxk4qcgl7n55tx0yuqmrcw5cy2u5vzjq5u4 | Perfect Stake                  |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qqrv4g5wu543wa7fcae76eucqfn2uc77zgqw8fxk | Lusia                          |       4 |       4 |      4 |        0 |               3 |                   3 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qqf6wmc0ax3mykd028ltgtqr49h3qffcm50gwag3 | ou812                          |       4 |       4 |      4 |        0 |               3 |                   3 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qps9drw07z0gmh5z2pn7zwl3z53ate2yvqf3uzq5 | cherkes                        |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qr0jwz65c29l044a204e3cllvumdg8cmsgt2k3ql | Staking Fund                   |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qq0xmq7r0z9sdv02t5j9zs7en3n6574gtg8v9fyt | Mars Staking | Long term fee   |       4 |       4 |      4 |        0 |               3 |                   3 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
|                                                | 1%                             |         |         |        |          |                 |                     |                  |              |                  |                 |                |             |                 |                  |
| oasis1qrdx0n7lgheek24t24vejdks9uqmfldtmgdv7jzz | Bit Cat🐱                      |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qpntrlgxp5tt36pkdezdjt5d27fzkvp22y46qura | Chloris Network                |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qrtq873ddwnnjqyv66ezdc9ql2a07l37d5vae9k0 | Forbole                        |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qp9xlxurlcx3k5h3pkays56mp48zfv9nmcf982kn | ELYSIUM                        |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qpavd66xsezz8s4wjw2fyycxw8jm2nlpnuejlg2g | Spherical One                  |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qz8vfnkcc48grazt83gstfm6yjwyptalny8cywtp | Kumaji                         |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qppctxzn8djkqfvrxugak9v7dp25vddq7sxqhkry | Tuzem                          |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qp4f47plgld98n5g2ltalalnndnzz96euv9n89lz | Julia-Ju                       |       4 |       4 |      4 |        0 |               3 |                   3 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qzl99wft8jtt7ppprk7ce7s079z3r3t77s6pf3dd | DCC Capital                    |       4 |       4 |      0 |        1 |               3 |                   3 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qz0pvg26eudajp60835wl3jxhdxqz03q5qt9us34 | AnkaStake                      |       4 |       4 |      0 |        1 |               3 |                   3 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qrgxl0ylc7lvkj0akv6s32rj4k98nr0f7smf6m4k | itokenpool                     |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qrugz89g5esmhs0ezer0plsfvmcgctge35n32vmr | Validatrium                    |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qram2p9w3yxm4px5nth8n7ugggk5rr6ay5d284at | Realizable                     |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qz72lvk2jchk0fjrz7u2swpazj3t5p0edsdv7sf8 | Ocean Stake                    |       4 |       0 |      4 |        0 |               0 |                   0 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qp53ud2pcmm73mlf4qywnrr245222mvlz5a2e5ty | SerGo                          |       4 |       4 |      4 |        0 |               3 |                   3 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qz0ea28d8p4xk8xztems60wq22f9pm2yyyd82tmt | Simply Staking                 |       4 |       4 |      0 |        1 |               3 |                   3 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qpaygvzwd5ffh2f5p4qdqylymgqcvl7sp5gxyrl3 | Appload                        |       4 |       4 |      0 |        1 |               3 |                   3 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
| oasis1qzugextrcdueshq63w7l9x4xglnusznsgqa95w7e | Alexander (aka Bambarello)     |       4 |       4 |      4 |        0 |               3 |                   3 |                0 |            0 |                0 |               0 |              0 |           0 |               0 |                0 |
|                                                | Validator                      |         |         |        |          |                 |                     |                  |              |                  |                 |                |             |                 |                  |
```

For further analysis, you can easily export entity statistics to a CSV file by
passing the `--output-file` parameter and the file name:

```shell
oasis paratime statistics -o stats.csv
```

**Info**:

The analysis of the range of blocks may require some time or even occasionally
fail due to denial-of-service protection. If you encounter such issues,
consider setting up your own gRPC endpoint!

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
