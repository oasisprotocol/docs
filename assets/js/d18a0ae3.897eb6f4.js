"use strict";(self.webpackChunkdocs_oasis_io=self.webpackChunkdocs_oasis_io||[]).push([[6650],{23337:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"node/run-your-node/maintenance/handling-network-upgrades","title":"Handling Network Upgrades","description":"Changes between the major consensus network versions are backward and forward","source":"@site/docs/node/run-your-node/maintenance/handling-network-upgrades.md","sourceDirName":"node/run-your-node/maintenance","slug":"/node/run-your-node/maintenance/handling-network-upgrades","permalink":"/node/run-your-node/maintenance/handling-network-upgrades","draft":false,"unlisted":false,"editUrl":"https://github.com/oasisprotocol/docs/edit/main/docs/node/run-your-node/maintenance/handling-network-upgrades.md","tags":[],"version":"current","lastUpdatedAt":1744824929000,"frontMatter":{},"sidebar":"operators","previous":{"title":"Wiping Node State","permalink":"/node/run-your-node/maintenance/wiping-node-state"},"next":{"title":"Adding or Removing Nodes","permalink":"/node/run-your-node/maintenance/adding-or-removing-nodes"}}');var t=s(74848),a=s(28453);const r={},o="Handling Network Upgrades",d={},l=[{value:"Reaching Upgrade Epoch",id:"reaching-upgrade-epoch",level:2},{value:"Preparing New Genesis File and Wiping State",id:"preparing-new-genesis-file-and-wiping-state",level:2},{value:"Patching Dumped State",id:"patching-dumped-state",level:3},{value:"Download and Verify the Provided Genesis File",id:"verify-genesis",level:3},{value:"Example diff for Mainnet Beta to Mainnet network upgrade",id:"example-diff-for-mainnet-beta-to-mainnet-network-upgrade",level:4},{value:"Wiping State",id:"wiping-state",level:3},{value:"Updating ParaTimes",id:"updating-paratimes",level:2},{value:"Start Your Node",id:"start-your-node",level:2},{value:"Clean Up",id:"clean-up",level:2}];function h(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"handling-network-upgrades",children:"Handling Network Upgrades"})}),"\n",(0,t.jsxs)(n.p,{children:["Changes between the major consensus network versions are backward and forward\nbreaking. You have to always run ",(0,t.jsx)(n.strong,{children:"a specific version of the Oasis Core to\nfetch and validate the blocks matching the specific consensus network version"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"There are two kinds of consensus network upgrades that can occur:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.em,{children:"Seamless upgrade"}),": on-chain upgrade without resetting the consensus state or\nchanging the genesis document (e.g. ",(0,t.jsx)(n.a,{href:"/node/testnet/upgrade-log#2022-04-04-upgrade",children:"Testnet upgrade 2022-04-04"}),", ",(0,t.jsx)(n.a,{href:"/node/mainnet/upgrade-log#2021-08-31-upgrade",children:"Mainnet\nupgrade 2021-08-31"}),")."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.em,{children:"Dump & restore upgrade"}),": requires wiping state and starting the upgraded\nnetwork from a fresh genesis document (e.g. ",(0,t.jsx)(n.a,{href:"/node/mainnet/upgrade-log#damask-upgrade",children:"Mainnet upgrade 2022-04-11\n(Damask)"}),", ",(0,t.jsx)(n.a,{href:"/node/testnet/upgrade-log#2022-03-03-upgrade",children:"Testnet upgrade 2022-03-03"}),")."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["The specific Oasis Core version requirements also impact the way how you\n",(0,t.jsx)(n.strong,{children:"initially sync your node with the network"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"If the last network upgrade was a dump & restore one, then your node will\ncomplete the synchronization automatically by fetching and validating all\nblocks following the state in the genesis document."}),"\n",(0,t.jsx)(n.li,{children:"If the last network upgrade was a seamless one, you will first need to\ndownload the older version of the Oasis Core to sync the initial blocks\nand then sequentially perform seamless upgrade(s)."}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["For example, at time of writing this guide in order to sync your node from\nscratch on the ",(0,t.jsx)(n.a,{href:"/node/testnet/",children:"Testnet Network Parameters"})," you needed to do the\nfollowing:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Download the genesis document and run Oasis Core 22.0.x which synced\nblocks from epoch 14209 through (excluding) upgrade epoch 15056."}),"\n",(0,t.jsx)(n.li,{children:"Wait until the node automatically stopped, then upgrade to Oasis Core\n22.2.x which synced the blocks from epoch 15056 onwards."}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["The expected versions of the Oasis Core to sync your node from the latest\ngenesis document on the Mainnet and Testnet are always published on the\nNetwork Parameters page (",(0,t.jsx)(n.a,{href:"/node/mainnet/",children:"Mainnet"}),", ",(0,t.jsx)(n.a,{href:"/node/testnet/",children:"Testnet"}),")."]}),"\n",(0,t.jsx)(n.h2,{id:"reaching-upgrade-epoch",children:"Reaching Upgrade Epoch"}),"\n",(0,t.jsxs)(n.p,{children:["Once a ",(0,t.jsx)(n.a,{href:"/general/manage-tokens/cli/network#governance-cast-vote",children:"governance proposal"})," is accepted the node will automatically stop when\nreaching the ",(0,t.jsx)(n.strong,{children:"upgrade epoch"})," specified in the proposal. The node will\nwrite something like this in the log:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{"caller":"mux.go:426","level":"debug","module":"abci-mux","msg":"dispatching halt hooks for upgrade","ts":"2022-05-06T13:11:41.721994647Z"}\n'})}),"\n",(0,t.jsx)(n.p,{children:"and on the error output:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"panic: upgrade: reached upgrade epoch\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The state of the network at the upgrade epoch height will be automatically\nexported into a genesis file located in\n",(0,t.jsx)(n.code,{children:"<NODE-DATADIR>/exports/genesis-<CHAIN_ID>-at-<UPGRADE_HEIGHT>.json"}),",\nwhere ",(0,t.jsx)(n.code,{children:"CHAIN_ID"})," is the chain ID of the network and ",(0,t.jsx)(n.code,{children:"LATEST_HEIGHT"})," is the\nheight of the last consensus block before the upgrade epoch. This command,\ndepending on the size of the state, may take some time to finish."]}),"\n",(0,t.jsxs)(n.admonition,{type:"tip",children:[(0,t.jsx)(n.p,{children:"While waiting for the network upgrade epoch, you can check the current height\nand epoch by running:"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"oasis-node control status -a unix:/node/data/internal.sock\n"})}),(0,t.jsxs)(n.p,{children:["and observe the value of the ",(0,t.jsx)(n.code,{children:"consensus.latest_height"})," and\n",(0,t.jsx)(n.code,{children:"consensus.latest_epoch"})," fields respectively."]})]}),"\n",(0,t.jsxs)(n.p,{children:["Once the upgrade epoch is reached, follow the instructions in the corresponding\n",(0,t.jsx)(n.a,{href:"/node/mainnet/upgrade-log",children:"upgrade log"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"preparing-new-genesis-file-and-wiping-state",children:"Preparing New Genesis File and Wiping State"}),"\n",(0,t.jsx)(n.p,{children:"For dump & restore upgrades, the exported genesis file needs to be patched and\nverified accordingly. Then, we wipe the existing consensus state including the\nhistory of all transactions and let the node reload the state from the genesis\nfile."}),"\n",(0,t.jsx)(n.h3,{id:"patching-dumped-state",children:"Patching Dumped State"}),"\n",(0,t.jsxs)(n.p,{children:["First, let's run a built-in helper which migrates and updates parts of the\ngenesis file which changed in the new version of Oasis Core. We will provide\nthe dumped genesis file as the input and write the new version of the genesis\nfile into ",(0,t.jsx)(n.code,{children:"genesis_dump.json"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"oasis-node debug fix-genesis --genesis.file genesis-<CHAIN_ID>-at-<LATEST_HEIGHT>.json --genesis.new_file genesis_dump.json\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Other parts of the genesis need to be updated manually, as described in each\nupgrade's ",(0,t.jsx)(n.em,{children:"Proposed State Changes"})," section (e.g. ",(0,t.jsx)(n.a,{href:"/node/mainnet/previous-upgrades/damask-upgrade#proposed-state-changes",children:"Damask upgrade's Proposed\nState Changes"}),", ",(0,t.jsx)(n.a,{href:"/node/mainnet/previous-upgrades/cobalt-upgrade#proposed-state-changes",children:"Cobalt upgrade's Proposed State Changes"}),")."]}),"\n",(0,t.jsx)(n.h3,{id:"verify-genesis",children:"Download and Verify the Provided Genesis File"}),"\n",(0,t.jsxs)(n.p,{children:["In addition, download the new genesis file linked in the Network Parameters\npage (",(0,t.jsx)(n.a,{href:"/node/mainnet/",children:"Mainnet"}),", ",(0,t.jsx)(n.a,{href:"/node/testnet/",children:"Testnet"}),") and save it as ",(0,t.jsx)(n.code,{children:"/node/etc/genesis.json"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"Compare the dumped state with the downloaded genesis file:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"diff --unified=3 genesis_dump.json genesis.json\n"})}),"\n",(0,t.jsx)(n.p,{children:"If you obtain the same result, then you have successfully verified the provided\ngenesis file!"}),"\n",(0,t.jsx)(n.h4,{id:"example-diff-for-mainnet-beta-to-mainnet-network-upgrade",children:"Example diff for Mainnet Beta to Mainnet network upgrade"}),"\n",(0,t.jsxs)(n.p,{children:["Let's look at what ",(0,t.jsx)(n.code,{children:"diff"})," returned before performing manual changes to the\ngenesis file for the Mainnet network upgrade:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'--- genesis_dump.json    2020-11-16 17:49:46.864554271 +0100\n+++ genesis.json    2020-11-16 17:49:40.353496022 +0100\n@@ -1,7 +1,7 @@\n {\n   "height": 702000,\n-  "genesis_time": "2020-11-18T13:38:00Z",\n-  "chain_id": "mainnet-beta-2020-10-01-1601568000",\n+  "genesis_time": "2020-11-18T16:00:00Z",\n+  "chain_id": "oasis-1",\n   "epochtime": {\n     "params": {\n       "interval": 600\n@@ -2506,1563 +2506,1779 @@\n       "debonding_interval": 336,\n       "reward_schedule": [\n         {\n-          "until": 3696,\n-          "scale": "1595"\n+          "until": 4842,\n+          "scale": "2081"\n         },\n         {\n-          "until": 3720,\n-          "scale": "1594"\n+          "until": 4866,\n+          "scale": "2080"\n         },\n\n        ... trimmed ...\n\n         {\n-          "until": 35712,\n+          "until": 36882,\n           "scale": "2"\n         },\n         {\n-          "until": 35760,\n+          "until": 36930,\n           "scale": "1"\n         }\n       ],\n@@ -4087,7 +4303,6 @@\n         "transfer": 1000\n       },\n       "min_delegation": "100000000000",\n-      "disable_transfers": true,\n       "fee_split_weight_propose": "2",\n       "fee_split_weight_vote": "1",\n       "fee_split_weight_next_propose": "1",\n@@ -4097,7 +4312,7 @@\n     "token_symbol": "ROSE",\n     "token_value_exponent": 9,\n     "total_supply": "10000000000000000000",\n-    "common_pool": "1835039672187348312",\n+    "common_pool": "2285039672187348312",\n     "last_block_fees": "0",\n     "ledger": {\n       "oasis1qp0l8r2s3076n4xrq8av0uuqegj7z9kq55gu5exy": {\n@@ -6419,7 +6634,7 @@\n       },\n       "oasis1qrad7s7nqm4gvyzr8yt2rdk0ref489rn3vn400d6": {\n         "general": {\n-          "balance": "1633038701000000000"\n+          "balance": "1183038701000000000"\n         },\n         "escrow": {\n           "active": {\n@@ -9862,6 +10077,8 @@\n       }\n     }\n   },\n-  "halt_epoch": 1440,\n-  "extra_data": null\n+  "halt_epoch": 9940,\n+  "extra_data": {\n+    "quote": "UXVpcyBjdXN0b2RpZXQgaXBzb3MgY3VzdG9kZXM/IFtzdWJtaXR0ZWQgYnkgT2FzaXMgQ29tbXVuaXR5IE1lbWJlciBEYW5peWFyIEJvcmFuZ2F6aXlldl0="\n+  }\n }\n'})}),"\n",(0,t.jsx)(n.p,{children:"We can observe that the provided genesis file mostly updates some particular\nnetwork parameters. In addition, some ROSE tokens were transferred from an\naccount to the Common Pool. All other things remained unchanged."}),"\n",(0,t.jsx)(n.p,{children:"Let's break down the diff and explain what has changed."}),"\n",(0,t.jsx)(n.p,{children:"The following genesis file fields will always change on a network upgrade:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"chain_id"}),": A unique ID of the network. Mainnet upgrades follow a pattern ",(0,t.jsx)(n.code,{children:"oasis-1"}),", ",(0,t.jsx)(n.code,{children:"oasis-2"}),", ..."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"genesis_time"}),": Time from which the genesis file is valid."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"halt_epoch"}),": The epoch when the node will stop functioning. We set this to\nintentionally force an upgrade."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"The following fields were a particular change in this upgrade:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"staking.params.reward_schedule"}),": This field describes the staking reward\nmodel. It was changed to start at 20% (annualized) and range from 20% to 2%\nover the first 4 years of the network. For more details, see the ",(0,t.jsx)(n.a,{href:"/general/oasis-network/token-metrics-and-distribution",children:"Token\nMetrics and Distribution"})," doc."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"staking.params.disable_transfers"}),": This field was removed to enable token\ntransfers."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"staking.common_pool"}),": This field represents the Common Pool. Its balance was\nincreased by 450M ROSE to fund increased staking rewards."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"staking.ledger.oasis1qrad7s7nqm4gvyzr8yt2rdk0ref489rn3vn400d6"}),": This field\ncorresponds to the Community and Ecosystem Wallet. Its ",(0,t.jsx)(n.code,{children:"general.balance"})," was\nreduced by 450M ROSE and transferred to the Common Pool to fund increased\nstaking rewards."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"extra_data"}),": This field can hold network's extra data, but is currently\nignored everywhere. For this upgrade, we changed it back to the value in the\nMainnet Beta genesis file to include the Oasis network's genesis quote:\n",(0,t.jsx)(n.em,{children:"\u201d"}),(0,t.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Quis_custodiet_ipsos_custodes%3F",children:(0,t.jsx)(n.em,{children:"Quis custodiet ipsos custodes?"})}),(0,t.jsx)(n.em,{children:"\u201d [submitted by Oasis Community Member Daniyar Borangaziyev]."})]}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsxs)(n.p,{children:["The balances in the genesis file are enumerated in base units with 1 ROSE token\nequaling 10^9 (i.e. billion) base units. For more details, see the\n",(0,t.jsx)(n.a,{href:"/node/genesis-doc#parameters",children:"Genesis Document"}),"."]})}),"\n",(0,t.jsx)(n.h3,{id:"wiping-state",children:"Wiping State"}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsxs)(n.p,{children:["We do not suggest that you wipe ",(0,t.jsx)(n.em,{children:"all"})," state. You might lose node identities and\nkeys if you do it this way."]})}),"\n",(0,t.jsxs)(n.p,{children:["The process is described in the\n",(0,t.jsx)(n.a,{href:"/node/run-your-node/maintenance/wiping-node-state#state-wipe-and-keep-node-identity",children:"Wiping Node State"}),"\ndocument."]}),"\n",(0,t.jsx)(n.h2,{id:"updating-paratimes",children:"Updating ParaTimes"}),"\n",(0,t.jsxs)(n.p,{children:["If you are running a compute or a client ParaTime node, you will often need to\nupgrade the ParaTime. The required ParaTime versions are stored in the network\nregistry. The ",(0,t.jsx)(n.a,{href:"/general/manage-tokens/cli/network#show-paratimes",children:(0,t.jsx)(n.code,{children:"oasis network show paratimes"})})," command below queries the\nregistry and extracts the version information for the Paratime\n",(0,t.jsx)(n.code,{children:"00000000000000000000000000000000000000000000000072c8215e60d5bca7"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"oasis network show paratimes \\| \njq 'select(.id==\"00000000000000000000000000000000000000000000000072c8215e60d5bca7\") | .deployments'\n"})}),"\n",(0,t.jsx)(n.p,{children:"At time of writing the Emerald ParaTime on Testnet has the following record:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'[\n  {\n    "version": {\n      "major": 7,\n      "minor": 1\n    },\n    "valid_from": 14320\n  },\n  {\n    "version": {\n      "major": 8\n    },\n    "valid_from": 15056\n  }\n]\n'})}),"\n",(0,t.jsxs)(n.p,{children:["The record above specifies that after epoch 14320, Emerald version 7.1.0 is\nrequired and from epoch 15056, Emerald 8.0.0. If you are running a compute\nnode, ",(0,t.jsx)(n.strong,{children:"the installed ParaTime version must match exactly the ParaTime version\nin the registry"}),"! If you are running a client node, ParaTime state syncing\nwill be performed regardless of the version installed."]}),"\n",(0,t.jsx)(n.p,{children:"Oasis node supports configuring multiple versions of ParaTime bundles, for\nexample:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"runtime:\n  paths:\n    - /path/to/emerald-paratime-7.1.0-testnet.orc\n    - /path/to/emerald-paratime-8.0.0-testnet.orc\n"})}),"\n",(0,t.jsx)(n.p,{children:"The node will then automatically run the correct version of the ParaTime as\nspecified in the registry."}),"\n",(0,t.jsx)(n.h2,{id:"start-your-node",children:"Start Your Node"}),"\n",(0,t.jsxs)(n.p,{children:["This will depend on your process manager. If you don't have a process manager,\nyou should use one. However, to start the node without a process manager you\ncan start the ",(0,t.jsx)(n.a,{href:"/node/run-your-node/prerequisites/oasis-node",children:"Oasis Node"})," like this:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"oasis-node --config /node/etc/config.yml\n"})}),"\n",(0,t.jsx)(n.h2,{id:"clean-up",children:"Clean Up"}),"\n",(0,t.jsxs)(n.p,{children:["After you're comfortable with your node deployment, you can remove the old\nOasis Core version and the intermediate\n",(0,t.jsx)(n.code,{children:"genesis-<CHAIN_ID>-at-<LATEST_HEIGHT>.json"})," and ",(0,t.jsx)(n.code,{children:"genesis_dump.json"})," files."]})]})}function c(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>o});var i=s(96540);const t={},a=i.createContext(t);function r(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);