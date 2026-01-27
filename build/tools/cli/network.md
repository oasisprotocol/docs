# Network

Source: https://docs.oasis.io/build/tools/cli/network

## Manage Your Oasis Networks

The `network` command is used to manage the Mainnet, Testnet or Localnet
endpoints Oasis CLI will be connecting to.

The `network` command is commonly used:

* on network upgrades, because the chain domain separation context is changed
  due to a new [genesis document],
* when setting up a local `oasis-node` instance instead of relying on public
  gRPC endpoints,
* when running a private Localnet with `oasis-net-runner`,
* when examining network properties such as the native token, the network
  registry, the validator set and others.

Oasis CLI supports both **remote endpoints via the secure gRPC protocol** and
**local Unix socket endpoints**.

**Tip**:

When running the Oasis CLI for the first time, it will automatically configure
the current Mainnet and Testnet endpoints.

[genesis document]: https://docs.oasis.io/core/consensus/genesis.md#genesis-documents-hash

### Add a Network

Invoke `network add <name> <rpc-endpoint> [chain-context]` to add a new
endpoint with a specific chain domain separation context and a gRPC address.
This command is useful, if you want to connect to your own instance of the Oasis
node instead of relying on the public gRPC endpoints.

For TCP/IP endpoints, run:

```shell
oasis network add testnet_alt testnet2.grpc.oasis.io:443 0b91b8e4e44b2003a7c5e23ddadb5e14ef5345c0ebcb3ddcae07fa2f244cab76
```

```
? Description: Testnet alternative
? Denomination symbol: TEST
? Denomination decimal places: (9)
```

For Unix sockets, use:

```shell
oasis network add testnet_local unix:/node_testnet/data/internal.sock 0b91b8e4e44b2003a7c5e23ddadb5e14ef5345c0ebcb3ddcae07fa2f244cab76
```

```
? Description: Testnet network, local node
? Denomination symbol: TEST
? Denomination decimal places: (9)
```

To automatically detect the chain context, simply omit the `[chain-context]`
argument:

```shell
oasis network add testnet_alt testnet2.grpc.oasis.io:443
```

```
? Description: Testnet alternative
? Denomination symbol: TEST
? Denomination decimal places: (9)
```

### Add a Local Network

`network add-local <name> <rpc-endpoint>` command can be used if you are
running `oasis-node` on your local machine. In this case, Oasis CLI will
autodetect the chain domain separation context. For the Oasis Mainnet and
Testnet chains, the native token symbol, the number of decimal places and
registered ParaTimes will automatically be predefined. Otherwise, the Oasis CLI
will ask you to enter them.

```shell
oasis network add-local testnet_local unix:/node_testnet/data/internal.sock
```

To override the defaults, you can pass `--num-decimals`, `--symbol` and
`--description` parameters. This is especially useful, if you are running the
command in a [non-interactive mode](https://docs.oasis.io/build/tools/cli/account.md#y):

```shell
oasis network add-local testnet_local unix:/node_testnet/data/internal.sock --num-decimals 9 --symbol TEST --description "Work machine - Localnet" -y
```

### List Networks

Invoke `network list` to list all configured networks.

```shell
oasis network list
```

```
NAME         	CHAIN CONTEXT                                                   	RPC                           
mainnet (*)  	bb3d748def55bdfb797a2ac53ee6ee141e54cd2ab2dc2375f4a0703a178e6e55	grpc.oasis.io:443            	
mainnet_local	b11b369e0da5bb230b220127f5e7b242d385ef8c6f54906243f30af63c815535	unix:/node/data/internal.sock	
testnet      	0b91b8e4e44b2003a7c5e23ddadb5e14ef5345c0ebcb3ddcae07fa2f244cab76	testnet.grpc.oasis.io:443    	
testnet_alt  	50304f98ddb656620ea817cc1446c401752a05a249b36c9b90dba4616829977a	testnet2.grpc.oasis.io:443   	
```

The [default network](#set-default) is marked with the `(*)` sign.

### Remove a Network

Use `network remove <name>` to remove the given network configuration including
all dependant ParaTimes.

```shell
oasis network remove testnet_alt
```

You can also delete network in non-interactive mode format by passing the
`-y` parameter:

```shell
oasis network remove testnet -y
```

### Set Network Chain Context

To change the chain context of a network, use
`network set-chain-context <name> [chain-context]`.

**Caution**:

Chain contexts represent a root of trust in the network, so before changing them
for production networks make sure you have verified them against a trusted
source like the [Mainnet] and [Testnet] chapters in the official Oasis
documentation.

```shell
oasis network list
```

```shell
NAME             	CHAIN CONTEXT                                                   	RPC                           
mainnet          	bb3d748def55bdfb797a2ac53ee6ee141e54cd2ab2dc2375f4a0703a178e6e55	grpc.oasis.io:443            	
mainnet_local (*)	b11b369e0da5bb230b220127f5e7b242d385ef8c6f54906243f30af63c815535	unix:/node/data/internal.sock	
testnet          	0b91b8e4e44b2003a7c5e23ddadb5e14ef5345c0ebcb3ddcae07fa2f244cab76	testnet.grpc.oasis.io:443    	
```

```shell
oasis network set-chain-context mainnet_local 01234513331133a715c7a150313877dF1d33e77a715c7a150313877dF1d33e77
```

```shell
oasis network list
```

```shell
NAME             	CHAIN CONTEXT                                                   	RPC                           
mainnet          	bb3d748def55bdfb797a2ac53ee6ee141e54cd2ab2dc2375f4a0703a178e6e55	grpc.oasis.io:443            	
mainnet_local (*)	01234513331133a715c7a150313877dF1d33e77a715c7a150313877dF1d33e77	unix:/node/data/internal.sock	
testnet          	0b91b8e4e44b2003a7c5e23ddadb5e14ef5345c0ebcb3ddcae07fa2f244cab76	testnet.grpc.oasis.io:443    	
```

To automatically detect the chain context, simply omit the `[chain-context]`
argument. This is especially useful for Localnet, where the chain context
changes each time you restart the `oasis-net-runner`:

```shell
oasis network set-chain-context mainnet_local
```

[Mainnet]: https://github.com/oasisprotocol/docs/blob/main/docs/node/network/mainnet

[Testnet]: https://github.com/oasisprotocol/docs/blob/main/docs/node/network/testnet

### Set Default Network

To change the default network for future Oasis CLI operations, use
`network set-default <name>`.

```shell
oasis network list
```

```
NAME         	CHAIN CONTEXT                                                   	RPC                           
mainnet (*)  	bb3d748def55bdfb797a2ac53ee6ee141e54cd2ab2dc2375f4a0703a178e6e55	grpc.oasis.io:443            	
mainnet_local	b11b369e0da5bb230b220127f5e7b242d385ef8c6f54906243f30af63c815535	unix:/node/data/internal.sock	
testnet      	0b91b8e4e44b2003a7c5e23ddadb5e14ef5345c0ebcb3ddcae07fa2f244cab76	testnet.grpc.oasis.io:443    	
```

```shell
oasis network set-default mainnet_local
```

```shell
oasis network list
```

```
NAME             	CHAIN CONTEXT                                                   	RPC                           
mainnet          	bb3d748def55bdfb797a2ac53ee6ee141e54cd2ab2dc2375f4a0703a178e6e55	grpc.oasis.io:443            	
mainnet_local (*)	b11b369e0da5bb230b220127f5e7b242d385ef8c6f54906243f30af63c815535	unix:/node/data/internal.sock	
testnet          	0b91b8e4e44b2003a7c5e23ddadb5e14ef5345c0ebcb3ddcae07fa2f244cab76	testnet.grpc.oasis.io:443    	
```

### Change a Network's RPC Endpoint

To change the RPC address of the already configured network, run
`network set-rpc <name> <new_endpoint>`:

```shell
oasis network list
```

```
NAME         	CHAIN CONTEXT                                                   	RPC                           
mainnet (*)  	bb3d748def55bdfb797a2ac53ee6ee141e54cd2ab2dc2375f4a0703a178e6e55	grpc.oasis.io:443            	
mainnet_local	b11b369e0da5bb230b220127f5e7b242d385ef8c6f54906243f30af63c815535	unix:/node/data/internal.sock	
testnet      	0b91b8e4e44b2003a7c5e23ddadb5e14ef5345c0ebcb3ddcae07fa2f244cab76	testnet.grpc.oasis.io:443    	
testnet_alt  	50304f98ddb656620ea817cc1446c401752a05a249b36c9b90dba4616829977a	testnet2.grpc.oasis.io:443   	
```

```shell
oasis network set-rpc testnet_alt testnet3.grpc.oasis.io:443
```

```shell
oasis network list
```

```
NAME         	CHAIN CONTEXT                                                   	RPC                           
mainnet (*)  	bb3d748def55bdfb797a2ac53ee6ee141e54cd2ab2dc2375f4a0703a178e6e55	grpc.oasis.io:443            	
mainnet_local	b11b369e0da5bb230b220127f5e7b242d385ef8c6f54906243f30af63c815535	unix:/node/data/internal.sock	
testnet      	0b91b8e4e44b2003a7c5e23ddadb5e14ef5345c0ebcb3ddcae07fa2f244cab76	testnet.grpc.oasis.io:443    	
testnet_alt  	50304f98ddb656620ea817cc1446c401752a05a249b36c9b90dba4616829977a	testnet3.grpc.oasis.io:443   	
```

### Advanced

#### Governance Operations

`network governance` command is aimed towards validators for proposing
or voting on-chain for network upgrades or changes to other crucial network
parameters.

##### `list`

Use `network list` to view all past and still active governance proposals.
Each proposal has its unique subsequent ID, a submitter, an epoch when the
proposal was created and when it closes and a state.

```shell
oasis network governance list --network testnet
```

```
ID	KIND                          	SUBMITTER                                     	CREATED AT	CLOSES AT	STATE  
1 	upgrade                       	oasis1qrs2dl6nz6fcxxr3tq37laxlz6hxk6kuscnr6rxj	5633      	5645     	passed	
2 	upgrade                       	oasis1qrs2dl6nz6fcxxr3tq37laxlz6hxk6kuscnr6rxj	7525      	7537     	passed	
3 	upgrade                       	oasis1qrs2dl6nz6fcxxr3tq37laxlz6hxk6kuscnr6rxj	8817      	8829     	passed	
4 	upgrade                       	oasis1qrs2dl6nz6fcxxr3tq37laxlz6hxk6kuscnr6rxj	14183     	14195    	passed	
5 	upgrade                       	oasis1qrs2dl6nz6fcxxr3tq37laxlz6hxk6kuscnr6rxj	14869     	14881    	passed	
6 	cancel upgrade 5              	oasis1qrs2dl6nz6fcxxr3tq37laxlz6hxk6kuscnr6rxj	14895     	14907    	passed	
7 	upgrade                       	oasis1qrs2dl6nz6fcxxr3tq37laxlz6hxk6kuscnr6rxj	14982     	14994    	passed	
8 	upgrade                       	oasis1qpwaggvmhwq5uk40clase3knt655nn2tdy39nz2f	29493     	29505    	passed	
9 	change parameters (governance)	oasis1qrx85mv85k708ylww597rd42enlzhdmeu56wqj72	30693     	30705    	passed	
10	change parameters (staking)   	oasis1qqxxut9x74dutu587f9nj8787qz4dm0ueu05l88c	33059     	33071    	passed	
11	upgrade                       	oasis1qqxxut9x74dutu587f9nj8787qz4dm0ueu05l88c	35915     	35927    	passed	
```

**Info**:

[Network](https://docs.oasis.io/build/tools/cli/account.md#npa) selector is available for the
`governance list` command.

##### `show`

`network governance show <proposal-id>` shows detailed information on
past or opened governance proposals on the consensus layer.

```shell
oasis network governance show 9 --network testnet
```

```
=== PROPOSAL STATUS ===
Network:         testnet
Proposal ID:     9
Status:          passed
Submitted By:    oasis1qrx85mv85k708ylww597rd42enlzhdmeu56wqj72
Created At:      epoch 30693
Results:
  - yes: 43494459676132712
  - no: 0
  - abstain: 0

=== PROPOSAL CONTENT ===
Change Parameters:
  Module: governance
  Changes: 
    - Parameter: upgrade_cancel_min_epoch_diff
      Value: 15

=== VOTED STAKE ===
Total voting stake: 43777341677851724
Voted stake:        43494459676132712 (99.35%)
Voted yes stake:    43494459676132712 (100.00%)
Threshold:          68%
```

You can also view individual validator votes by passing the `--show-votes`
parameter:

```shell
oasis network governance show 9 --show-votes --network testnet
```

```
=== PROPOSAL STATUS ===
Network:         testnet
Proposal ID:     9
Status:          passed
Submitted By:    oasis1qrx85mv85k708ylww597rd42enlzhdmeu56wqj72
Created At:      epoch 30693
Results:
  - yes: 43494459676132712
  - no: 0
  - abstain: 0

=== PROPOSAL CONTENT ===
Change Parameters:
  Module: governance
  Changes: 
    - Parameter: upgrade_cancel_min_epoch_diff
      Value: 15

=== VOTED STAKE ===
Total voting stake: 43777341677851724
Voted stake:        43494459676132712 (99.35%)
Voted yes stake:    43494459676132712 (100.00%)
Threshold:          68%

=== VALIDATORS VOTED ===
  1. oasis1qqv25adrld8jjquzxzg769689lgf9jxvwgjs8tha,<none>,11072533240458237 (25.29%): yes
  2. oasis1qz2tg4hsatlxfaf8yut9gxgv8990ujaz4sldgmzx,<none>,10922431911536365 (24.95%): yes
  3. oasis1qz424yg28jqmgfq3xvly6ky64jqnmlylfc27d7cp,<none>,10786148310722167 (24.64%): yes
  4. oasis1qq2vzcvxn0js5unsch5me2xz4kr43vcasv0d5eq4,<none>,10713346213415943 (24.47%): yes

=== VALIDATORS NOT VOTED ===
  1. oasis1qrwncs459lauc77zw23efdn9dmfcp23cxv095l5z,GateOmega,43681995855414 (0.10%)
  2. oasis1qq60zmsfca0gvmm3v8906pn5zqtt4ee2ssexramg,Validatrium,37519643115923 (0.09%)
  3. oasis1qrkwv688m3naejcy8rhycls8r78ga0th4qaun90k,Tuzem,13051121909522 (0.03%)
  4. oasis1qrg430wr84xqh2pm6hv609v7jx9j3gt7xykmjl65,cherkes,12829194880949 (0.03%)
  5. oasis1qzjm0zwfg4egs9kk4d9rkujudzk8pjp5rvxyr3ag,Munay Network,12777089617060 (0.03%)
  6. oasis1qqsxhxedvzt0et3sahcqcjw02p4kcz92dqtjuzwh,BroMyb,12062754356510 (0.03%)
  7. oasis1qpq97fm6lf87jzms9agd6z902nh7axtxvus6m352,LDV,11442842011460 (0.03%)
  8. oasis1qpz97gfrvj5xzx8jx7x9zweeq0rcf2q6jg4a09qz,Stardust,11304018972474 (0.03%)
  9. oasis1qrkf98prkpf05kd6he7wcvpzr9sd6gs2jvrn5keh,glebanyy,10964792231490 (0.03%)
  10. oasis1qzxtc82d7gmcr5yazlu786gkwcvukz3zvu9ph5la,ushakov,10954729838903 (0.03%)
  11. oasis1qpgg65qg7r7yy2a0qp2yufvcsyl2lm46lg03g6cp,Breathe and Stake,10942254111385 (0.02%)
  12. oasis1qrruwg0y4au55efu0pcgl0nanaq6p3sdwv0jhzv5,Dobrynya Hukutu4,10753083746804 (0.02%)
  13. oasis1qq6k7q4uukpucz322m8dhy0pt0gvfdgrvcvrx2rm,Spectrum Staking,10724618200610 (0.02%)
  14. oasis1qr2jxg57ch6p3787t2a8973v8zn8g82nxuex0773,Doorgod,9959349109598 (0.02%)
  15. oasis1qrp0cgv0u5mxm7l3ruzqyk57g6ntz6f8muymfe4p,ELYSIUM,9536638984147 (0.02%)
  16. oasis1qrfeessnrnyaggvyvne52aple2f8vaw93vt608sz,Julia-Ju,7765469996624 (0.02%)
  17. oasis1qz9x0zpja6n25hc5242k2e60l6a7ke2zsq9cqrqz,SerGo,5553178612897 (0.01%)
  18. oasis1qq4fj0fdydz83zvcgt4kn38ea7ncm3dj8qkcfnm4,Wanderer Staking,5471851136155 (0.01%)
  19. oasis1qzcemlzf7zv2jxsufex4h9mjaqwy4upnzy7qrl7x,Making.Cash Validator,5461635837440 (0.01%)
  20. oasis1qrq7hgvv26003hy89klcmy3mnedrmyd7lvf0k6qn,Perfect Stake,4040750411525 (0.01%)
  21. oasis1qqxxut9x74dutu587f9nj8787qz4dm0ueu05l88c,Princess Stake,3406051188880 (0.01%)
  22. oasis1qq45am6gzaur2rxhk26av9qf7ryhgca6ecg28clu,Jr,2201101606599 (0.01%)
  23. oasis1qz7rce6dmnh9qtr9nltsyy69d69j3a95rqm3jmxw,Everstake,2171181028607 (0.00%)
  24. oasis1qz8w4erh0kkwpmdtwd3dt9ueaz9hmzfpecjhd7t4,Chloris Network,2011713919098 (0.00%)
  25. oasis1qzlzczsdme4scprjjh4h4vtljnmx3ag4vgpdnqln,Alexander (aka Bambarello) Validator,1757051650379 (0.00%)
  26. oasis1qzwe6xywazp29tp20974wgxhdcpdf6yxfcn2jxvv,Simply Staking,1388519563110 (0.00%)
  27. oasis1qq2vdcvkyzdghcrrdhvujk3tvva84wd9yvt68zyx,Lusia,1300150706950 (0.00%)
  28. oasis1qphcvmsh6mw98vtg0cg4dvdsen5tm0g3e58eqpnp,Appload,1221281508316 (0.00%)
  29. oasis1qpc66dgff4wrkj8kac4njrl2uvww3c9m5ycjwar2,Forbole-Testnet,1112551173826 (0.00%)
  30. oasis1qzz9wdgt4hxfmcelfgyg8ne827a47pvh4g4jamtu,max999,1096825296654 (0.00%)
  31. oasis1qz5zfcaqqud75naqln92ez7czjxf0dpyj5rmtfls,alexandr0,1096729833573 (0.00%)
  32. oasis1qz4532s3lhkpju7fd3mxqfvaw98pjq5htss4g4w0,RedHead,1096422596648 (0.00%)
  33. oasis1qphhz4u08xgt4wk85x4t8xv6g3nxy8fq5ue4htxr,Kumaji,1042663336329 (0.00%)
  34. oasis1qrrggkf3jxa3mqjj0uzfpn8wg5hpsn5hdvusqspc,Bit Cat😻 ,959384168121 (0.00%)
  35. oasis1qz6tqn2ktffz2jjlj2fwqlhw7f2rwwud5ghh54yv,WeHaveServers.com,933754283937 (0.00%)
  36. oasis1qpswaz4djukz0zanquyh2vswk59up22emysq5am9,StakeService,879748845930 (0.00%)
  37. oasis1qq87z733lxx87zyuutee5xpxcksqk3mj9uq3xvaq,w3coins,819152557031 (0.00%)
  38. oasis1qrcf5mwjyu7hahwfjgwmywhy9cjyaqdd5vkj7ah3,ou812,418376899484 (0.00%)
  39. oasis1qpxaq8thpx3y8wumn6hmfx70rvk0j9cxrgz9h27k,Colossus,410141268162 (0.00%)
  40. oasis1qr4vsan850vmztuy9r2pex4fj4wxnmhvlgclg500,<none>,327983310482 (0.00%)
  41. oasis1qqgvqelw8kmcd8k4cqypcsyajkl3gq6ppc4t34n2,AnkaStake,220810245010 (0.00%)
  42. oasis1qrpp8h9wl3wtqn04nvyx4dcrlz3jzqazugec7pxz,CryptoSJ.net,213393794996 (0.00%)
```

**Info**:

Governance proposals are not indexed and an endpoint may take some time to
respond. If you encounter timeouts, consider setting up your own gRPC endpoint!

**Info**:

[Network](https://docs.oasis.io/build/tools/cli/account.md#npa) selector is available for the
`governance show` command.

##### `cast-vote`

`network governance cast-vote <proposal-id> { yes | no | abstain }` is used
to submit your vote on the governance proposal. The vote can either be `yes`,
`no` or `abstein`.

```shell
oasis network governance cast-vote 5 yes
```

```
Unlock your account.
? Passphrase:
You are about to sign the following transaction:
Method: governance.CastVote
Body:
  Proposal ID: 5
  Vote:        yes
Nonce:  7
Fee:
  Amount: 0.0 TEST
  Gas limit: 1240
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
Account:  test
```

**Info**:

[Network and account](https://docs.oasis.io/build/tools/cli/account.md#npa) selectors are available for the
`governance cast-vote` command.

##### `create-proposal`

To submit a new governance proposal use `network governance create-proposal`.
The following proposal types are currently supported:

* `cancel-upgrade <proposal-id>`: Cancel network proposed upgrade. Provide the
  ID of the network upgrade proposal you wish to cancel.
* `parameter-change <module-name> <changes.json>`: Network parameter change
  proposal. Provide the consensus module name and the parameter changes JSON.
  Valid module names are: `staking`, `governance`, `keymanager`, `scheduler`,
  `registry`, and `roothash`
* `upgrade <descriptor.json>`: Network upgrade proposal. Provide a JSON file
  containing the upgrade descriptor.

**Info**:

[Network and account](https://docs.oasis.io/build/tools/cli/account.md#npa) selectors are available for all
`governance create-proposal` subcommands.

#### Show Network Properties

`network show` shows the network property stored in the registry, scheduler,
genesis document or on chain.

By passing `--height <block_number>` with a block number, you can obtain a
historic value of the property.

**Info**:

[Network](https://docs.oasis.io/build/tools/cli/account.md#npa) selector is available for the
`network show` command.

The command expects one of the following parameters:

##### `entities`

Shows all registered entities in the network registry. See the
[`account entity`] command, if you want to register or update your own entity.

[`account entity`]: https://docs.oasis.io/build/tools/cli/account.md#entity

**Info**:

This call is not enabled on public Oasis gRPC endpoints. You will have to run
your own client node to enable this functionality.

##### `nodes`

Shows all registered nodes in the network registry. See the [`account entity`],
to add a node to your entity.

**Info**:

This call is not enabled on public Oasis gRPC endpoints. You will have to run
your own client node to enable this functionality.

##### `parameters`

Shows all consensus parameters for the following modules: consensus,
key manager, registry, roothash, staking, scheduler, beacon, and governance.

```shell
oasis network show parameters
```

```
=== CONSENSUS PARAMETERS ===
  backend: tendermint
  params:
    timeout_commit: 5000000000
    skip_timeout_commit: false
    empty_block_interval: 0
    max_tx_size: 32768
    max_block_size: 1048576
    max_block_gas: 0
    max_evidence_size: 51200
    state_checkpoint_interval: 100000
    state_checkpoint_num_kept: 2
    state_checkpoint_chunk_size: 8388608
    gas_costs:
      tx_byte: 1

=== KEYMANAGER PARAMETERS ===
  params:
    gas_costs:
      publish_ephemeral_secret: 1000
      publish_master_secret: 1000
      update_policy: 1000
  statuses:
      id: 4000000000000000000000000000000000000000000000008c5ea5e49b4bc9ac
      is_initialized: true
      is_secure: true
      checksum: Wd1+cYi5c2iXynGezp3ObZYY4/SHVT3MvGAbqEi2XZw=
      nodes: null
      policy:
        policy:
          serial: 8
          id: 4000000000000000000000000000000000000000000000008c5ea5e49b4bc9ac
          enclaves:
            oAcyPVTJyxSpDBpV2R+AseNuqpe4oy0OaP9Gf2dpL6pAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ==:
              may_query:
                000000000000000000000000000000000000000000000000e199119c992377cb:
                  yJORh2eP/BKGIVTGWwyQowE65kx2EdME5DtKjbMcPxFAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ==
                000000000000000000000000000000000000000000000000f80306c9858e7279:
                  imO1np4RCgLOJauA/bz6x5aeGvcGPVJlDb44+xLt77xAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ==
              may_replicate:
                xfkp0XL+FcyMHjS2TAq8BYkOtzfvLnBN2nqNGus/58pAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ==
            xfkp0XL+FcyMHjS2TAq8BYkOtzfvLnBN2nqNGus/58pAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ==:
              may_query:
                000000000000000000000000000000000000000000000000e199119c992377cb:
                  yJORh2eP/BKGIVTGWwyQowE65kx2EdME5DtKjbMcPxFAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ==
                000000000000000000000000000000000000000000000000f80306c9858e7279:
                  imO1np4RCgLOJauA/bz6x5aeGvcGPVJlDb44+xLt77xAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ==
              may_replicate:
        signatures:
            public_key: 723UDX3qFpiFwAKVey/G0pvEdP8821k2Dxb5C/bdHHE=
            signature: Cpy8gT2cMZkKwWlCiYlVmSvxgPg+wDghPAswIqd9CNm4v8hVpcYbG2eM6PQ65722v5w6vPpy0/NM6UPLqC4qDw==
            public_key: JnaLeRjP7xDPJlnD2mv3+PduIWJXqwjpZsaYuV0B5A0=
            signature: grn2xoLMMouPJOfRMeDs0psfUN3SQmK01MMPcuRXuwWr9ZA3by7p0IgJzJb8E8jaU67ejaBxbxRoaoNGHrf4Bg==
            public_key: K51hXrPo8spG6QhXW/5rqw2fmq3UevBsQKnRlcTEGkU=
            signature: 6AOtus3hSZSkeOUGix1TZh2QfMZWaTy3UI35m5mfbSL+u7JSGquBfIHDvD2eFRFoqxzx7Jn9gS91zEf1hiBmAA==

=== REGISTRY PARAMETERS ===
  enable_km_churp: true
  gas_costs:
    deregister_entity: 1000
    prove_freshness: 1000
    register_entity: 1000
    register_node: 1000
    register_runtime: 1000
    runtime_epoch_maintenance: 1000
    unfreeze_node: 1000
  max_node_expiration: 2
  enable_runtime_governance_models:
    entity: true
    runtime: true
  tee_features:
    sgx:
      pcs: true
      signed_attestations: true
      max_attestation_age: 1200
    freshness_proofs: true
  max_runtime_deployments: 5

=== ROOTHASH PARAMETERS ===
  gas_costs:
    compute_commit: 10000
    evidence: 5000
    merge_commit: 10000
    proposer_timeout: 5000
    submit_msg: 1000
  max_runtime_messages: 256
  max_in_runtime_messages: 128
  max_evidence_age: 100
  max_past_roots_stored: 1200

=== STAKING PARAMETERS ===
  thresholds:
    entity: 100000000000
    keymanager-churp: 10000000000000
    node-compute: 100000000000
    node-keymanager: 100000000000
    node-observer: 100000000000
    node-validator: 100000000000
    runtime-compute: 50000000000000
    runtime-keymanager: 50000000000000
  debonding_interval: 336
  reward_schedule:
      until: 90000
      scale: 283
  signing_reward_threshold_numerator: 3
  signing_reward_threshold_denominator: 4
  commission_schedule_rules:
    rate_change_interval: 1
    rate_bound_lead: 336
    max_rate_steps: 10
    max_bound_steps: 10
    min_commission_rate: 0
  slashing:
    consensus-equivocation:
      amount: 100000000000
      freeze_interval: 18446744073709551615
    consensus-light-client-attack:
      amount: 100000000000
      freeze_interval: 18446744073709551615
  gas_costs:
    add_escrow: 1000
    allow: 1000
    amend_commission_schedule: 1000
    burn: 1000
    reclaim_escrow: 1000
    transfer: 1000
    withdraw: 1000
  min_delegation: 100000000000
  min_transfer: 10000000
  min_transact_balance: 0
  allow_escrow_messages: true
  max_allowances: 16
  fee_split_weight_propose: 2
  fee_split_weight_vote: 1
  fee_split_weight_next_propose: 1
  reward_factor_epoch_signed: 1
  reward_factor_block_proposed: 0

=== SCHEDULER PARAMETERS ===
  min_validators: 30
  max_validators: 120
  max_validators_per_entity: 1
  reward_factor_epoch_election_any: 0

=== BEACON PARAMETERS ===
  backend: vrf
  vrf_parameters:
    alpha_hq_threshold: 20
    interval: 600
    proof_delay: 400
    gas_costs:
      vrf_prove: 1000

=== GOVERNANCE PARAMETERS ===
  gas_costs:
    cast_vote: 1000
    submit_proposal: 1000
  min_proposal_deposit: 10000000000000
  voting_period: 168
  stake_threshold: 68
  upgrade_min_epoch_diff: 336
  upgrade_cancel_min_epoch_diff: 192
  enable_change_parameters_proposal: true
  allow_vote_without_entity: true
  allow_proposal_metadata: true

```

By passing `--format json`, the output is formatted as JSON.

##### `paratimes`

Shows all registered ParaTimes in the network registry.

##### `validators`

Shows all IDs of the nodes in the validator set.

##### `native-token`

Shows information of the network's native tokens such as its symbol, the number
of decimal points, total supply, debonding period and staking thresholds.

```shell
oasis network show native-token
```

```
Network:                  mainnet
Token's ticker symbol:    ROSE
Token's base-10 exponent: 9
Total supply:             10000000000.0 ROSE
Common pool:              853509298.875305407 ROSE
Last block fees:          0.0 ROSE
Governance deposits:      0.0 ROSE
Debonding interval:       336 epoch(s)

=== STAKING THRESHOLDS ===
  entity:             100.0 ROSE
  node-validator:     100.0 ROSE
  node-compute:       100.0 ROSE
  node-keymanager:    100.0 ROSE
  runtime-compute:    50000.0 ROSE
  runtime-keymanager: 50000.0 ROSE
```

We can see that the token's name is ROSE and that 1 token corresponds to 10^9
(i.e. one billion) base units.

Next, we can observe that the **total supply** is 10 billion tokens and that
about 1.3 billion tokens are in the **common pool**.

The **staking thresholds** fields are the following:

* `entity`: The amount needed to be staked when registering an entity.
* `node-validator`, `node-compute`, `node-keymanager`: The amount needed to be
  staked to the corresponding entity for a node to run as a validator, a compute
  node or a key manager. This is the amount that will be slashed in case of
  inappropriate node behavior.
* `runtime-compute`, `runtime-keymanager`: The amount needed to be staked to an
  entity for [registering a new ParaTime or a key manager].
  Keep in mind that a ParaTime cannot be unregistered and there is no way of
  getting the staked assets back.

For example, if you wanted to register an entity running a validator and a
compute node, you would need to stake (i.e. *escrow*) at least 300 tokens.

**Info**:

Apart from the `node-compute` threshold above, a ParaTime may require additional
**ParaTime-specific escrow** for running a compute node. Use the
[`network show id`](#show-id) command to see it.

[registering a new ParaTime or a key manager]: https://docs.oasis.io/build/tools/cli/paratime.md#register

##### `gas-costs`

Shows minimum gas costs for each consensus transaction.

```shell
oasis network show gas-costs
```

```
Gas costs for network mainnet:
  - add_escrow:                1000
  - allow:                     1000
  - amend_commission_schedule: 1000
  - burn:                      1000
  - reclaim_escrow:            1000
  - transfer:                  1000
  - withdraw:                  1000
```

Above, we can see that the [maximum amount of gas](https://docs.oasis.io/build/tools/cli/account.md#gas-limit) our
transaction can spend must be set to at least 1000 **gas units**, otherwise it
will be rejected by the network.

##### `committees`

Shows runtime committees.

```shell
oasis network show committees
```

```
=== COMMITTEE ===
Paratime: sapphire(000000000000000000000000000000000000000000000000f80306c9858e7279)
Height:   19241881

ENTITY ID                                       NODE ID                                         ROLE          
T5k7PtOR01oZrdnZveDpO9AFpMUhEREZk7WSSfm8Gtg=    RT7JKF5T1hlKXTYZsp4SL07f4IHG6O0SQppf8wnfr+Y=    worker       
oOVxTw2hEYgYvSrTjjKODCt/Soy3OLcQV9YBy/PF/xY=    Io86AKuu7YDnya+fVnldHBybFggwCoXeQPu3Wj8kHW4=    worker       
sDi9ZxHYB+rHTpVh4abNFXDMRSecfGe4QzbyGK8ZgQg=    FEMUVK91HEULeQpMZj07jN2giNKjd6HPK3VdjsIQcjY=    worker       
RMa2ER0wvraR+4u5QOGOrRTwmMVOYNcOot7sFppPRP0=    DW4/7kVEumpZV1CmntaQBncSV36t6QoE0QwQd5pLIZU=    worker       
21+iPu/omYBN7X5cUY4QnD4b9VVuAiW/u8uABqt2VjM=    x8DFPc8E9BZxLJKbh51xj41es3R53AkJERfMEyRCrbk=    worker       
7nCBfl1vRS4kn7G2yJZeZdwE8OFA4avUphWdCRrFhJM=    drsZxbpqG5h+4tq/JKWqmoVGXmQUirVCjD8GLBuNj9M=    worker       
iGs5cCGos/I5KQv82MwgGMNENaxy3bhuWdFXtINcu0U=    HH/jnBO0AqHocNg4aS7MiMjiKmta1VP0ceRc0iILMAw=    worker       
ko5wr5SMqhKb+P1kimM1EF/T4SqvW/WjSOwPHigQl+k=    aJFHeID4Q7qUfMa42dRwaa9PQrZ/cVDiE3WNt4bQjo0=    worker       
UDV5FoaIkssdSFWC4asZtxvsyagoyrIS5rPX8p/np2U=    86y1tHzH9GlxvS0Bneh5l2AUDXYO6VMrzx75JvJViNE=    worker       
BdSzNycR8Y3MdHooxU0vtOEPr3ZG9KD5p8wxHtvueUU=    +JOOp6OMmzldm9Dy7Cnbl/FE66bNkU0TJquOYnQIv7s=    worker       
nw+8VTk+LbrZ4mSmeKYuQGu/swFgAOpPB5ls4STzh1g=    XCiPWblWT3n1aN2NI0vslmlfV9GOkxE2Ih2SI66ZR38=    backup-worker
J2nwlXuYEPNZ0mMH2Phg5RofbZzj65xDvQMNdy9Ji0E=    ITrwEekdZNqXrEzvw3GT6Q3AtHDd51f19nD2nVU/f0c=    backup-worker
sDi9ZxHYB+rHTpVh4abNFXDMRSecfGe4QzbyGK8ZgQg=    FEMUVK91HEULeQpMZj07jN2giNKjd6HPK3VdjsIQcjY=    backup-worker
6XvrCu3wqMKYc5a0d5UZzG7ZGeb3j//MzcqUMUHkMCk=    C+AWG4iXz590kCdbO/DAb4sBZr+umjyp683ucmawdM4=    backup-worker
T5k7PtOR01oZrdnZveDpO9AFpMUhEREZk7WSSfm8Gtg=    RT7JKF5T1hlKXTYZsp4SL07f4IHG6O0SQppf8wnfr+Y=    backup-worker
RFpWeibJDHnfgoq9mO1BJcxyDbIstDi22ZBhvgXvE1Y=    YTHRajyCrIwOiys1ktOarSUyV1NVolvAw6DQqhaXg6w=    backup-worker
LQaKibf9tD8KXO210NhiDUHzXTsRIeK5l/3ITmfg118=    7/WyW54TO+31VkXZcj4xIAgv5kWxR6azSEjwrSAte3Y=    backup-worker
hNBVs2ay1IWvufQwX0TbYA6X4ocKaMpzpyaMTHggi6Q=    bKvnByvx8qwF41EqOG6wdmatGzz/qT2nbHC8i8VM65k=    backup-worker
UDV5FoaIkssdSFWC4asZtxvsyagoyrIS5rPX8p/np2U=    86y1tHzH9GlxvS0Bneh5l2AUDXYO6VMrzx75JvJViNE=    backup-worker
9yOiPY3NnNMpEzB+6XS/OqahzFwwX8mFhmT2fvbxlVI=    mIKW8IEDWZZxCRtDTvWQLpslvfUBwWxVAxLakwq25C8=    backup-worker
nZoBfua/odt7fZThkfzGQo2oBp8UnEj+VpG52SB8onM=    70ibfZrA3+d9O4qNnecsXceTCvsLTywOjNQfN83MYQQ=    backup-worker
1JttHp0rBBBHDOpPl8fAiLTcN9tUzxJGjk7llFcvhZQ=    rK6mrmCRi2dYPNraNwqg2jgEVi4sd6hi53JmT2HVGxQ=    backup-worker
4gbOOU09bcyvM53Up1lTnP+sLb0feniJu0OcUUPCBSs=    +zVbgQqOdY90Z2NQKXFByNT0OwLxj/Ho4j4qT5u2yKM=    backup-worker
fhXoWYc8Ml153jBBvFrQ4CRY7vnbCk9j269rVLeg7cE=    NM/XberrrMrvavGDCYc9CX8HPT1TPz1YHWuBaDArDHc=    backup-worker
WXs7ElBlm30la2fG4oZDpubeFu5sKkjDVeflWo+YuIA=    ST2B7aeKSspiFNy325rIh8alQIRVCDyZ5t8f2NKN3PU=    backup-worker

=== COMMITTEE ===
Paratime: emerald(000000000000000000000000000000000000000000000000e2eaa99fc008f87f)
Height:   19241881

ENTITY ID                                       NODE ID                                         ROLE          
L4OY/0mNEduAS9z6jh2xLp72b8gZURgcrd76AOiRIXk=    fGqOEIbBxaM2YmMcKq4PbpUOd9+s3TcS4AxaTChGuz0=    worker       
g9UqzvW6JvfKrflRKbCPBpm41rH/O+4apCK+KkD2tG4=    4wqhqp5wDAfvQxNZUUSDmM2fVYrkxKq/tqjnnCe72Uw=    worker       
PrCDIA3uyoLqNOZJ1PrRWdyviFn6K0PWFz91qQ9QyTw=    o8p0FlVg1Wlv+ZLKojWS7c0P4xZHklFt9frLW4B4QlE=    worker       
bTok0el8GbmUzTAAgcQ78uww/TsgeWwXpM3N2S49qBQ=    cb/avZHoAQkZiHGzkjJxEkVsqiiiJzL/5fHp1TsDTdY=    worker       
BTAJNDyd6/UQ+pfhTDdPGsothzJ+C5/C/g52a3DIlMw=    RV/KmNN7oWH7qDjx/7kn+o9nsyd52CPUauF9MGvxl70=    worker       
4gbOOU09bcyvM53Up1lTnP+sLb0feniJu0OcUUPCBSs=    +zVbgQqOdY90Z2NQKXFByNT0OwLxj/Ho4j4qT5u2yKM=    worker       
RMa2ER0wvraR+4u5QOGOrRTwmMVOYNcOot7sFppPRP0=    4mcgJKfEa6RqWh9NqSJ+/yfs6X8dU0tG1dI1L0lFNzM=    worker       
6XvrCu3wqMKYc5a0d5UZzG7ZGeb3j//MzcqUMUHkMCk=    VtP8ubAEY1p8iOshGDUqxrZGstnswozt7h1wlMAvba8=    worker       
1YeMK0NAZtE1ZK8u6KWddkKGZoD5VLfG9EAZI3b8HzE=    bhVU8RdrUXE7XgI7hIIdMFOhsomBFmPEnNU9zFPTHzY=    worker       
cVGc1fI6xu0WeI2GUrLIwDpH/JtBE3PwD+P66YkSKg8=    giemTZIHjRmBA3FzYMK01eokfs8L/VmusK3M5+lUdGc=    worker       
4gbOOU09bcyvM53Up1lTnP+sLb0feniJu0OcUUPCBSs=    +zVbgQqOdY90Z2NQKXFByNT0OwLxj/Ho4j4qT5u2yKM=    backup-worker
p1VsfSsedbKn/5GzkPsr15XD+/AOIfbPda1/2yT84N4=    S2eoEMq6Qzms5Yd/fIOhSEacHp7Pym0BfgBEmsijEDw=    backup-worker
bTok0el8GbmUzTAAgcQ78uww/TsgeWwXpM3N2S49qBQ=    cb/avZHoAQkZiHGzkjJxEkVsqiiiJzL/5fHp1TsDTdY=    backup-worker
sDi9ZxHYB+rHTpVh4abNFXDMRSecfGe4QzbyGK8ZgQg=    Dpj1ibIMtTHMh/i5qh0eZcGGmOVODELSHvg/ZFBIPbY=    backup-worker
UFXCpcvXBOHbxtObG4psGcn+LgZOedvDDUAqVengpPk=    rczLI7bYocBYyQ+bsnHPNPKc+SJpunQiuxip/tNlolw=    backup-worker
RMa2ER0wvraR+4u5QOGOrRTwmMVOYNcOot7sFppPRP0=    4mcgJKfEa6RqWh9NqSJ+/yfs6X8dU0tG1dI1L0lFNzM=    backup-worker
kupW3Pt0XMeERSkdDWyZMU4oZrk0wGysVXVyqX3rylc=    BZvhmvc1YZpXteI2nPhBDyC2jxi04MHEbKXB1DpTM1w=    backup-worker
6XvrCu3wqMKYc5a0d5UZzG7ZGeb3j//MzcqUMUHkMCk=    VtP8ubAEY1p8iOshGDUqxrZGstnswozt7h1wlMAvba8=    backup-worker
TWLcdgEfahwyFPTC7nN3rZacPO2aXlLfZIDt7uXbzEI=    5uD3zbTZGhivYt1ZQw/Yr/Bcg2t6zEdyR9Ogg5ipkho=    backup-worker
oOVxTw2hEYgYvSrTjjKODCt/Soy3OLcQV9YBy/PF/xY=    jVPUq8aUDKe9jawIs7wPB4NBml27ft5kICIY7SBh/yQ=    backup-worker
WXs7ElBlm30la2fG4oZDpubeFu5sKkjDVeflWo+YuIA=    RzMsfs49HQDT5fIVKQ+flR/sCJjrkKDPsc5ZS6O7VdM=    backup-worker
1YeMK0NAZtE1ZK8u6KWddkKGZoD5VLfG9EAZI3b8HzE=    bhVU8RdrUXE7XgI7hIIdMFOhsomBFmPEnNU9zFPTHzY=    backup-worker
cVGc1fI6xu0WeI2GUrLIwDpH/JtBE3PwD+P66YkSKg8=    giemTZIHjRmBA3FzYMK01eokfs8L/VmusK3M5+lUdGc=    backup-worker
nZoBfua/odt7fZThkfzGQo2oBp8UnEj+VpG52SB8onM=    urRVg0K+6UhuxOnRE1/wIiPuuTu188orpsLDTz5NFTw=    backup-worker
UkwjS1YvEfHx9b6MMT5Q1WvCY3aWn2lxRDsB/Pw+zGk=    CdkWAAnsdYg0g6yl90Eiqdwqer6NK9yIxWWvPR3fwD8=    backup-worker
PrCDIA3uyoLqNOZJ1PrRWdyviFn6K0PWFz91qQ9QyTw=    o8p0FlVg1Wlv+ZLKojWS7c0P4xZHklFt9frLW4B4QlE=    backup-worker
nw+8VTk+LbrZ4mSmeKYuQGu/swFgAOpPB5ls4STzh1g=    XCiPWblWT3n1aN2NI0vslmlfV9GOkxE2Ih2SI66ZR38=    backup-worker
BTAJNDyd6/UQ+pfhTDdPGsothzJ+C5/C/g52a3DIlMw=    RV/KmNN7oWH7qDjx/7kn+o9nsyd52CPUauF9MGvxl70=    backup-worker
1JttHp0rBBBHDOpPl8fAiLTcN9tUzxJGjk7llFcvhZQ=    dN/aIe69HWFUHtOy/oqWdp1jw4fzOIljXLbMI79ilTo=    backup-worker
uxSkvFu6x4MIYV+M1VrDu3m/qbADs/1Ae3mWAcEmnaQ=    0qOmNfZvPDnjyzPU/97x1FWsl0d3UsImNiSNXd7lE/0=    backup-worker
21+iPu/omYBN7X5cUY4QnD4b9VVuAiW/u8uABqt2VjM=    x8DFPc8E9BZxLJKbh51xj41es3R53AkJERfMEyRCrbk=    backup-worker
BdSzNycR8Y3MdHooxU0vtOEPr3ZG9KD5p8wxHtvueUU=    CZgE+WU9T8YpTnPRosJYFqos9S8W53jGQKeRrRxMeQc=    backup-worker
FDqRmM1FyhaGas+lquWmGAKgMsU2rj7UESAlnOHtxco=    qnRAoObwndP/P9otTzQ/9Z2+vmSQ1Pch7G4tGBSTxCo=    backup-worker
ko5wr5SMqhKb+P1kimM1EF/T4SqvW/WjSOwPHigQl+k=    aJFHeID4Q7qUfMa42dRwaa9PQrZ/cVDiE3WNt4bQjo0=    backup-worker
AX8zJsi0DnrrdwCi/8JJptXSy62kZgQcAYKlCYD4oN8=    BqCqG8wuMVdnONN5bysITf0mYQD5FD+TEF5wrJttsSQ=    backup-worker
aiTgGyYB2l4uAMG93Ajq5S4EXPIRkYDg1ICLjWD45Ck=    pGkBYly79y2gJUEOau8XN04ErcfwrObO+W5+CYXJW5k=    backup-worker
kfr2A6K6TlvhQm4nz88Hczzkd2Aq5PlkxSpnmUUBAFs=    KUjJArjDn1TtZOi6AgYki1fUTC2PrU0LJFJ4ppHt3NQ=    backup-worker
cgXH87+sYoe2mXsdDKWCyRvWZ8JqnVnxJkCq09LlBoI=    6ioksdd5uKtlNnPmCpu1NYohfamlb/QHiD8EhMuTbfw=    backup-worker
N+3/m12DoAqzFS0yF3R/kXSkSj7pZnWhq8nRCo/MKwk=    zibJtnvTpDotvOK3a3nNYmlYwg/K4TdZB781TQCEAT4=    backup-worker
/ylWdaid2DDlI4BMVkX6gAR6eaBYlLolHbjCmHitrzc=    9sk2Nq2DFGv932dnavOIr02RnfQUOngggsn2HUEEfRg=    backup-worker

=== COMMITTEE ===
Paratime: cipher(000000000000000000000000000000000000000000000000e199119c992377cb)
Height:   19241881

ENTITY ID                                       NODE ID                                         ROLE          
bTok0el8GbmUzTAAgcQ78uww/TsgeWwXpM3N2S49qBQ=    LI48Ol5Is045ijOAjiCiKFHKOyzwuGL6mMTr3F5cMdM=    worker       
1YeMK0NAZtE1ZK8u6KWddkKGZoD5VLfG9EAZI3b8HzE=    /dBEDGDBCu6TF5w9crktZ9aloTBpOGGSa6A8uVNunAo=    worker       
sDi9ZxHYB+rHTpVh4abNFXDMRSecfGe4QzbyGK8ZgQg=    FEMUVK91HEULeQpMZj07jN2giNKjd6HPK3VdjsIQcjY=    worker       
ko5wr5SMqhKb+P1kimM1EF/T4SqvW/WjSOwPHigQl+k=    aJFHeID4Q7qUfMa42dRwaa9PQrZ/cVDiE3WNt4bQjo0=    worker       
1JttHp0rBBBHDOpPl8fAiLTcN9tUzxJGjk7llFcvhZQ=    kgTUu0eXQWfPaE8Li8NgXf0bsjXdupxIfM8moGrTMK4=    worker       
UDV5FoaIkssdSFWC4asZtxvsyagoyrIS5rPX8p/np2U=    VonN99SPIvJ6Aq8dS5JQG9g50svyuLwMHjXZYAAtLKo=    backup-worker
RMa2ER0wvraR+4u5QOGOrRTwmMVOYNcOot7sFppPRP0=    k0g6YN7CFSgjaPU1EjVWXhzPVmEset+3sQ3c3NJ8Ys4=    backup-worker
cgXH87+sYoe2mXsdDKWCyRvWZ8JqnVnxJkCq09LlBoI=    6ioksdd5uKtlNnPmCpu1NYohfamlb/QHiD8EhMuTbfw=    backup-worker
nw+8VTk+LbrZ4mSmeKYuQGu/swFgAOpPB5ls4STzh1g=    XCiPWblWT3n1aN2NI0vslmlfV9GOkxE2Ih2SI66ZR38=    backup-worker
WazI78lMcmjyCH5+5RKkkfOTUR+XheHIohlqMu+a9As=    uvPTOOyC+Kb+Hl3Pw34S3/YC9IerAdZncyW08LIaTtw=    backup-worker
PrCDIA3uyoLqNOZJ1PrRWdyviFn6K0PWFz91qQ9QyTw=    vI2QpEG/5LYwU+Fp52QsYxdRMRoy9j+pdJSb23tW3ng=    backup-worker
YDHYz/R+Y7pCodhmgkCqzoqqN54gzRfVE5fjZriX+RI=    7Rz1yAFZcAD06OOTZxx5LLDg2L5+1Me4304xZB8cgxU=    backup-worker
zAhtGrpk1L3bBLaP5enm3natUTCoj7MEFryq9+MG4tE=    PsfFUQrXqGoFtowWZcoc8ilh8xHP94LvNYHvqQHpw1E=    backup-worker
wCGlLKUiTNr9Ba49YA6dDuqm9rdtPcKKsKzHqMBn+rc=    vlG7mUtP7s2PsnARfyrI3mW/q4pcqRi3SHk2GxmQ2NM=    backup-worker
J2nwlXuYEPNZ0mMH2Phg5RofbZzj65xDvQMNdy9Ji0E=    ITrwEekdZNqXrEzvw3GT6Q3AtHDd51f19nD2nVU/f0c=    backup-worker
oOVxTw2hEYgYvSrTjjKODCt/Soy3OLcQV9YBy/PF/xY=    Io86AKuu7YDnya+fVnldHBybFggwCoXeQPu3Wj8kHW4=    backup-worker

```

##### `<id>`

The provided ID can be one of the following:

* If the [ParaTime ID] is provided, Oasis CLI shows ParaTime information stored
  in the network's registry.

  For example, at time of writing information on Sapphire stored in the Mainnet
  registry were as follows:

  ```shell
  oasis network show 000000000000000000000000000000000000000000000000f80306c9858e7279
  ```

  ```json
  {
    "v": 3,
    "id": "000000000000000000000000000000000000000000000000f80306c9858e7279",
    "entity_id": "TAv9qXjV4yBphnKLJcNkzois1TLoYUjaRPrMfY58Apo=",
    "genesis": {
      "state_root": "c672b8d1ef56ed28ab87c3622c5114069bdd3ad7b8f9737498d0c01ecef0967a",
      "round": 0
    },
    "kind": 1,
    "tee_hardware": 1,
    "key_manager": "4000000000000000000000000000000000000000000000008c5ea5e49b4bc9ac",
    "executor": {
      "group_size": 5,
      "group_backup_size": 7,
      "allowed_stragglers": 1,
      "round_timeout": 2,
      "max_messages": 256,
      "min_live_rounds_percent": 90,
      "min_live_rounds_eval": 20,
      "max_liveness_fails": 4
    },
    "txn_scheduler": {
      "batch_flush_timeout": 1000000000,
      "max_batch_size": 1000,
      "max_batch_size_bytes": 1048576,
      "propose_batch_timeout": 2
    },
    "storage": {
      "checkpoint_interval": 100000,
      "checkpoint_num_kept": 2,
      "checkpoint_chunk_size": 8388608
    },
    "admission_policy": {
      "any_node": {}
    },
    "constraints": {
      "executor": {
        "backup-worker": {
          "validator_set": {},
          "max_nodes": {
            "limit": 1
          },
          "min_pool_size": {
            "limit": 7
          }
        },
        "worker": {
          "validator_set": {},
          "max_nodes": {
            "limit": 1
          },
          "min_pool_size": {
            "limit": 7
          }
        }
      }
    },
    "staking": {
      "thresholds": {
        "node-compute": "5000000000000000"
      },
      "min_in_message_fee": "0"
    },
    "governance_model": "entity",
    "deployments": [
      {
        "version": {
          "minor": 4
        },
        "valid_from": 20944,
        "tee": "oWhlbmNsYXZlc4GiaW1yX3NpZ25lclggQCXat+vaH77MTjY3YG4CEhTQ9BxtBCL9N4sqi4iBhFlqbXJfZW5jbGF2ZVgg3mqV02+CDfyth1fNyaR8jo3rVp024JOBkBGnjtLPypM="
      },
      {
        "version": {
          "minor": 5,
          "patch": 2
        },
        "valid_from": 23476,
        "tee": "oWhlbmNsYXZlc4GiaW1yX3NpZ25lclggQCXat+vaH77MTjY3YG4CEhTQ9BxtBCL9N4sqi4iBhFlqbXJfZW5jbGF2ZVggMBEUvUKRVLByqR+3a/KVNkkMjorOJLTw2Znb36baBQY="
      }
    ]
  }
  ```

  Network validators may be interested in the **ParaTime staking threshold**
  stored inside the `thresholds` field:

  ```shell
  oasis network show 000000000000000000000000000000000000000000000000f80306c9858e7279 | jq '.staking.thresholds."node-compute"'
  ```

  ```
  "5000000000000000"
  ```

  In the example above, the amount to run a Sapphire compute node on the Mainnet
  is 5,000,000 tokens and should be considered on top of the consensus-layer
  validator staking thresholds obtained by the
  [`network show native-token`](#show-native-token) command.

* If the entity ID is provided, Oasis CLI shows information on the entity and
  its corresponding nodes in the network registry. For example:

  ```shell
  oasis network show xQN6ffLSdc51EfEQ2BzltK1iWYAw6Y1CkBAbFzlhhEQ=
  ```

  ```json
  === ENTITY ===
  Entity Address: oasis1qzp84num6xgspdst65yv7yqegln6ndcxmuuq8s9w
  Entity ID:      xQN6ffLSdc51EfEQ2BzltK1iWYAw6Y1CkBAbFzlhhEQ=
  Stake:          11504987.432765658 ROSE
  Commission:     20.0%

  === NODES ===
  Node Address: oasis1qqzjrsadvr2q5qq5ev6xyspjses8cjxxdcrth0g7
  Node ID:      Kb6opWKGbJHL0LK2Lto+m5ROIAXLhIr1lxQz0/kAOUM=
    Node Roles:       validator
    Software Version: 24.1
    Node Status:
      Expiration Processed:    false
      Freeze End Time:         0
      Election Eligible After: 38659
  ```

  By passing `--format json`, the output is formatted as JSON.

* If the node ID is provided, Oasis CLI shows detailed information of the node
  such as the Oasis Core software version, the node's role, supported
  ParaTimes, trusted execution environment support and more. For example:

  ```shell
  oasis network show Kb6opWKGbJHL0LK2Lto+m5ROIAXLhIr1lxQz0/kAOUM=
  ```

  ```json
  {
    "v": 2,
    "id": "Kb6opWKGbJHL0LK2Lto+m5ROIAXLhIr1lxQz0/kAOUM=",
    "entity_id": "xQN6ffLSdc51EfEQ2BzltK1iWYAw6Y1CkBAbFzlhhEQ=",
    "expiration": 23482,
    "tls": {
      "pub_key": "SslsTv8Cq/UvKHPk8w1S/Ag/wwsscqSa05bqDAVOR1I=",
      "next_pub_key": "js0fhS02f+G3kW7uu+N47lzcfxjbBEPkPibTfeQrJTA=",
      "addresses": null
    },
    "p2p": {
      "id": "e9fyvK+2FwU805dag81qOsrKHaO5b+nQnHyzEySi258=",
      "addresses": null
    },
    "consensus": {
      "id": "3K2Vx3gTop+/GoM9Zh+ZSGPwVb2BRTFtcAo6xPo4pb4=",
      "addresses": [
        "e9fyvK+2FwU805dag81qOsrKHaO5b+nQnHyzEySi258=@125.122.166.210:26656"
      ]
    },
    "vrf": {
      "id": "3z85R+Rdud27NUTMFf4gO4NBQbMEnWqnhHhI6AtNx74="
    },
    "runtimes": null,
    "roles": "validator",
    "software_version": "22.2.7"
  }
  ```

[ParaTime ID]: https://docs.oasis.io/core/runtime/identifiers.md

#### Status of the Network's Endpoint

`network status` will connect to the gRPC endpoint and request extensive status
report from the Oasis Core node. Node operators will find important information
in the report such as:

* the last proposed consensus block,
* whether the node's storage is synchronized with the network,
* the Oasis Core software version,
* connected peers,
* similar information as above for each ParaTime, if the node is running it.

At time of writing, the following status of the official gRPC endpoint for
Mainnet was reported:

```shell
oasis network status
```

```json
=== NETWORK STATUS ===
Network:      mainnet
Node's ID:    mVyn1iZkOAlP7AQRuhYHahAkUEGJmywY1G8raR5u/3I=
Core version: 23.0.9

==== Consensus ====
Status:               ready
Version:              7.0.0
Chain context:        bb3d748def55bdfb797a2ac53ee6ee141e54cd2ab2dc2375f4a0703a178e6e55
Latest height:        18458209 (2024-03-21 10:47:52 +0100 CET)
Latest block hash:    eb3fbe258b3066935de32158ac1b0cf2d3f79f5558682eee8f04f3afc80374ae
Latest epoch:         30750
Is validator:         false
Registration:         false

==== ParaTimes ====
cipher (000000000000000000000000000000000000000000000000e199119c992377cb):
  Kind:                 compute
  Is confidential:      true
  Status:               ready
  Latest round:         1612018 (2024-03-21 10:47:52 +0100 CET)
  Last finalized round: 1612018
  Storage status:       syncing rounds
  Active version:       3.0.2
  Available version(s): 2.6.2, 3.0.2
  Number of peers:      30
emerald (000000000000000000000000000000000000000000000000e2eaa99fc008f87f):
  Kind:                 compute
  Is confidential:      false
  Status:               ready
  Latest round:         9509250 (2024-03-21 10:47:52 +0100 CET)
  Last finalized round: 9509250
  Storage status:       syncing rounds
  Active version:       11.0.0
  Available version(s): 10.0.0, 11.0.0
  Number of peers:      29
sapphire (000000000000000000000000000000000000000000000000f80306c9858e7279):
  Kind:                 compute
  Is confidential:      true
  Status:               ready
  Latest round:         2958958 (2024-03-21 10:47:52 +0100 CET)
  Last finalized round: 2958958
  Storage status:       syncing rounds
  Active version:       0.7.0
  Available version(s): 0.7.0
  Number of peers:      39
```

By passing `--format json`, the output is formatted as JSON.

**Info**:

[Network](https://docs.oasis.io/build/tools/cli/account.md#npa) selector is available for the
`network status` command.

#### State Sync Trust

`network trust` will show suggested trust for the consensus [state sync].

For example:

```shell
./oasis network trust --network testnet
```

```json
Trust period:  240h0m0s
Trust height:  29103886
Trust hash:  ecff618ed2e8991e3e81eb37b2b61cb6990104c170f0fe34b4b2268b70f98fb5

WARNING: Cannot be trusted unless the CLI is connected to the RPC endpoint you control.
```

[state sync]: https://docs.oasis.io/node/run-your-node/advanced/sync-node-using-state-sync.md

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
