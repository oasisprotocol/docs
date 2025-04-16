"use strict";(self.webpackChunkdocs_oasis_io=self.webpackChunkdocs_oasis_io||[]).push([[319],{93638:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"node/mainnet/previous-upgrades/damask-upgrade","title":"Damask Upgrade","description":"This document provides an overview of the changes for the Damask Mainnet","source":"@site/docs/node/mainnet/previous-upgrades/damask-upgrade.md","sourceDirName":"node/mainnet/previous-upgrades","slug":"/node/mainnet/previous-upgrades/damask-upgrade","permalink":"/node/mainnet/previous-upgrades/damask-upgrade","draft":false,"unlisted":false,"editUrl":"https://github.com/oasisprotocol/docs/edit/main/docs/node/mainnet/previous-upgrades/damask-upgrade.md","tags":[],"version":"current","lastUpdatedAt":1744824929000,"frontMatter":{},"sidebar":"operators","previous":{"title":"Previous Upgrades","permalink":"/node/mainnet/previous-upgrades"},"next":{"title":"Cobalt Upgrade","permalink":"/node/mainnet/previous-upgrades/cobalt-upgrade"}}');var r=s(74848),o=s(28453);const t={},a="Damask Upgrade",d={},l=[{value:"Major Features",id:"major-features",level:2},{value:"Mechanics of the Upgrade",id:"mechanics-of-the-upgrade",level:2},{value:"Proposed State Changes",id:"proposed-state-changes",level:2},{value:"<strong>General</strong>",id:"general",level:3},{value:"<strong>Registry</strong>",id:"registry",level:3},{value:"<strong>Root Hash</strong>",id:"root-hash",level:3},{value:"<strong>Staking</strong>",id:"staking",level:3},{value:"<strong>Committee Scheduler</strong>",id:"committee-scheduler",level:3},{value:"<strong>Random Beacon</strong>",id:"random-beacon",level:3},{value:"<strong>Governance</strong>",id:"governance",level:3},{value:"<strong>Consensus</strong>",id:"consensus",level:3},{value:"Other",id:"other",level:3},{value:"Launch Support",id:"launch-support",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"damask-upgrade",children:"Damask Upgrade"})}),"\n",(0,r.jsx)(n.p,{children:"This document provides an overview of the changes for the Damask Mainnet\nupgrade."}),"\n",(0,r.jsx)(n.admonition,{type:"caution",children:(0,r.jsxs)(n.p,{children:["The Damask upgrade on Mainnet is scheduled at epoch ",(0,r.jsx)(n.strong,{children:"13402"})," which will happen\naround ",(0,r.jsx)(n.strong,{children:"Apr 11, 2022 at 8:30 UTC"}),"."]})}),"\n",(0,r.jsx)(n.h2,{id:"major-features",children:"Major Features"}),"\n",(0,r.jsxs)(n.p,{children:["All features for the Damask upgrade are implemented as part of\n",(0,r.jsx)(n.strong,{children:"Oasis Core 22.1.x"})," release series which is a consensus protocol-breaking\nrelease."]}),"\n",(0,r.jsx)(n.p,{children:"Summary of the major features is as follows:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Random Beacon"}),": The random beacon is used by the consensus layer for\nParaTime committee elections and is a critical component in providing\nsecurity for ParaTimes with an open admission policy.\nTo make the random beacon more performant and scalable, the upgrade\ntransitions the election procedure to one that is based on cryptographic\nsortition of Verifiable Random Function (VRF) outputs.\nFor more details, see ",(0,r.jsx)(n.a,{href:"/adrs/0010-vrf-elections",children:"ADR 0010"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"On-Chain Governance"}),": The upgrade simplifies the governance by replacing\nseparate quorum and threshold parameters with a single unified stake threshold\nparameter that represents the percentage of ",(0,r.jsx)(n.em,{children:"yes"})," votes in terms of total\nvoting power for a governance proposal to pass."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"ParaTime Performance"}),": By simplifying the protocol (executor and storage\ncommittees are merged into a single committee) the upgrade improves ParaTime\ncommittee performance and opens the way for even more improvements on the\nParaTime side. It also leads to simplified configuration of ParaTime nodes."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"ParaTime Upgrades"}),": After the Damask upgrade, runtime descriptors will\ninclude information regarding supported versions, and the epoch from which\nthey are valid, which will allow ParaTime upgrades to happen without incurring\ndowntime by having upgrades and the descriptor changes pre-staged well in\nadvance of the upgrade epoch.\nFor more details, see ",(0,r.jsx)(n.a,{href:"/adrs/0013-runtime-upgrades",children:"ADR 0013"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"ParaTime Packaging"}),": This upgrade changes runtime bundles to be unified\nacross all supported TEE types and self describing so that configuring\nParaTimes is only a matter of passing in the runtime bundle file."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Consensus and ParaTime Communication"}),": The upgrade adds support for\nincoming runtime messages where consensus layer transactions can trigger\nactions inside ParaTimes.\nFor more details, see ",(0,r.jsx)(n.a,{href:"/adrs/0011-incoming-runtime-messages",children:"ADR 0011"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["The upgrade also adds support for runtime message results which extends the\nresults of the emitted runtime messages with relevant information beyond\nindicating whether the message execution was successful or not.\nFor more details, see ",(0,r.jsx)(n.a,{href:"/adrs/0012-runtime-message-results",children:"ADR 0012"}),"."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["In addition to the specified additional features, we also propose the\n",(0,r.jsx)(n.strong,{children:"validator set size"})," to be ",(0,r.jsx)(n.strong,{children:"increased from"})," the current ",(0,r.jsx)(n.strong,{children:"110 to 120"})," as\ndiscussed in the\n",(0,r.jsx)(n.a,{href:"https://oasiscommunity.slack.com/archives/CMUSJCRFA/p1647881564057319?thread_ts=1647448573.197229&cid=CMUSJCRFA",children:"Oasis Community Slack #nodeoperators channel"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"This upgrade marks an important milestone for the Oasis Network, as it sets the\nfoundation for unlocking the network's full capabilities."}),"\n",(0,r.jsx)(n.h2,{id:"mechanics-of-the-upgrade",children:"Mechanics of the Upgrade"}),"\n",(0,r.jsxs)(n.p,{children:["On Mar 24, 2022, the Oasis Protocol Foundation submitted the upgrade governance\nproposal with id of ",(0,r.jsx)(n.code,{children:"2"})," which proposed upgrading the network at epoch 13402."]}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsxs)(n.p,{children:["In addition to submitting the actual governance proposal to the network, Oasis\nProtocol Foundation also published the ",(0,r.jsx)(n.a,{href:"https://github.com/oasisprotocol/community/discussions/30",children:"Damask Upgrade Proposal discussion"})," to\nthe ",(0,r.jsx)(n.a,{href:"https://github.com/oasisprotocol/community",children:"Oasis Community Forum on GitHub"}),"."]})}),"\n",(0,r.jsx)(n.p,{children:"Node operators which had an active validator node in the validator set had 1\nweek to cast their vote."}),"\n",(0,r.jsxs)(n.p,{children:["Validators representing more than 88% of the total stake in the consensus\ncommittee participated in the vote, and 100% of them voted ",(0,r.jsx)(n.em,{children:"yes"})," for the proposal."]}),"\n",(0,r.jsxs)(n.p,{children:["The upgrade will be performed by exporting the network's state at the upgrade\nepoch, updating the ",(0,r.jsx)(n.a,{href:"/node/genesis-doc#parameters",children:"genesis document"}),", upgrading the Oasis Node\nand the ParaTime binaries and starting a new network from the new genesis file."]}),"\n",(0,r.jsx)(n.p,{children:"This will require coordination between node operators and the Oasis Protocol\nFoundation.\nAll nodes will need to configure the new genesis file that they can generate or\nverify independently and reset/archive any existing state from Mainnet."}),"\n",(0,r.jsx)(n.p,{children:"Once enough nodes (representing 2/3+ of stake) have taken this step, the\nupgraded network will start."}),"\n",(0,r.jsxs)(n.p,{children:["For the actual steps that node operators need to make on their nodes, see the\n",(0,r.jsx)(n.a,{href:"/node/mainnet/upgrade-log#damask-upgrade",children:"Upgrade Log"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"proposed-state-changes",children:"Proposed State Changes"}),"\n",(0,r.jsx)(n.p,{children:"The following parts of the genesis document will be updated:"}),"\n",(0,r.jsx)(n.admonition,{type:"caution",children:(0,r.jsx)(n.p,{children:"This section will be updated with the exact details as we get closer to the\nupgrade."})}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["For a more detailed explanation of the parameters below, see the\n",(0,r.jsx)(n.a,{href:"/node/genesis-doc#parameters",children:"Genesis Document"})," docs."]})}),"\n",(0,r.jsx)(n.h3,{id:"general",children:(0,r.jsx)(n.strong,{children:"General"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"height"})})," will be set to the height of the Mainnet state dump + 1,\n",(0,r.jsx)(n.code,{children:"8048956"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"genesis_time"})})," will be set to",(0,r.jsx)(n.code,{children:"2022-04-11T09:30:00Z"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"chain_id"})})," will be set to ",(0,r.jsx)(n.code,{children:"oasis-3"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"halt_epoch"})})," will be bumped by ",(0,r.jsx)(n.code,{children:"10000"})," (a little more than a year) to\n",(0,r.jsx)(n.code,{children:"23807"}),"."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"registry",children:(0,r.jsx)(n.strong,{children:"Registry"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"registry.runtimes"})})," list contains the registered runtimes' descriptors.\nIn this upgrade, all runtime descriptors will be migrated from version ",(0,r.jsx)(n.code,{children:"2"})," to\nversion ",(0,r.jsx)(n.code,{children:"3"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["The migration will be done automatically with the\n",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"})," command."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"registry.runtimes.[id=000000000000000000000000000000000000000000000000e2eaa99fc008f87f].deployments.version"})}),"\nspecifies Emerald ParaTime's version on Mainnet."]}),"\n",(0,r.jsx)(n.p,{children:"It will be upgraded from version 7.1.0 to 8.2.0 and hence the configuration\nneeds to be manually updated to:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'"version": {\n  "major": 8,\n  "minor": 2\n},\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"registry.runtimes.[id=000000000000000000000000000000000000000000000000e199119c992377cb].deployments"})}),"\nspecifies Cipher ParaTime's version and TEE identity on Mainnet."]}),"\n",(0,r.jsx)(n.p,{children:"It will be upgraded from version 1.0.0 to 1.1.0 and hence the configuration\nneeds to be manually updated to:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'"version": {\n  "major": 1,\n  "minor": 1\n},\n"valid_from": 0,\n"tee": "oWhlbmNsYXZlc4GiaW1yX3NpZ25lclggQCXat+vaH77MTjY3YG4CEhTQ9BxtBCL9N4sqi4iBhFlqbXJfZW5jbGF2ZVggoiJgre0cDF5arUk9wh0X9eGWr5cHb8LY0A3/msmznHc="\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"registry.suspended_runtimes"})})," list contains the suspended registered\nruntimes' descriptors. In this upgrade, all runtime descriptors for suspended\nruntimes will be migrated from version ",(0,r.jsx)(n.code,{children:"2"})," to version ",(0,r.jsx)(n.code,{children:"3"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["The migration will be done automatically with the\n",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"})," command."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Inactive registered entities in ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"registry.entities"})})," (and their\ncorresponding nodes in ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"registry.nodes"})}),") that don't pass the\n",(0,r.jsx)(n.a,{href:"/node/genesis-doc#staking-thresholds",children:"minimum staking thresholds"})," will be removed."]}),"\n",(0,r.jsxs)(n.p,{children:["The removal will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"root-hash",children:(0,r.jsx)(n.strong,{children:"Root Hash"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"roothash.params.gas_costs.submit_msg"})})," is a new parameter that specifies\nthe cost for a submit message transaction. It will be set to ",(0,r.jsx)(n.code,{children:"1000"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["This will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"roothash.params.max_in_runtime_messages"})})," is a new parameter that\nspecifies the maximum number of incoming messages that can be queued for\nprocessing by a runtime. It will be set to ",(0,r.jsx)(n.code,{children:"128"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["This will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"roothash.runtime_state"})})," contains the state roots of the runtimes.\nEmpty fields will be omitted."]}),"\n",(0,r.jsxs)(n.p,{children:["This will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"staking",children:(0,r.jsx)(n.strong,{children:"Staking"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"staking.params.thresholds"})})," specifies the minimum number of tokens that\nneed to be staked in order for a particular entity or a particular type of\nnode to participate in the network."]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"node-storage"})," key is removed since Oasis Core 22.0+ removes separate\nstorage nodes.\nFor more details, see: ",(0,r.jsx)(n.a,{href:"https://github.com/oasisprotocol/oasis-core/pull/4308",children:"Oasis Core #4308"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["This will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"staking.params.min_transfer"})})," is a new parameter that specifies the\nminimum number of tokens one can transfer.\nIt will be set to 10,000,000 base units, or 0.01 ROSE tokens."]}),"\n",(0,r.jsxs)(n.p,{children:["This will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"staking.params.min_transact_balance"})})," is a new parameter that specifies\nthe minimum general balance an account must have to be able to perform\ntransactions on the network.\nIt will be set to 0 base units, meaning this requirement is currently not\nenforced."]}),"\n",(0,r.jsxs)(n.p,{children:["This will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"committee-scheduler",children:(0,r.jsx)(n.strong,{children:"Committee Scheduler"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"scheduler.params.min_validators"})})," is the minimum size of the consensus\ncommittee (i.e. the validator set). It will be increased from ",(0,r.jsx)(n.code,{children:"15"})," to ",(0,r.jsx)(n.code,{children:"30"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"scheduler.params.max_validators"})})," is the maximum size of the consensus\ncommittee (i.e. the validator set). It will be increased from ",(0,r.jsx)(n.code,{children:"110"})," to ",(0,r.jsx)(n.code,{children:"120"}),"."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"random-beacon",children:(0,r.jsx)(n.strong,{children:"Random Beacon"})}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"beacon"})})," object contains parameters controlling the new\n",(0,r.jsx)(n.a,{href:"/adrs/0010-vrf-elections",children:"improved VRF-based random beacon"})," introduced in the Damask upgrade."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"beacon.base"})})," is the network's starting epoch. It will be set to the epoch\nof Mainnet's state dump + 1, ",(0,r.jsx)(n.code,{children:"13402"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"beacon.params.backend"})})," configures the random beacon backend to use.\nIt will be set to ",(0,r.jsx)(n.code,{children:'"vrf"'})," indicating that the beacon implementing\n",(0,r.jsx)(n.a,{href:"/adrs/0010-vrf-elections",children:"VRF-based random beacon"})," should be used."]}),"\n",(0,r.jsxs)(n.p,{children:["This will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"beacon.params.vrf_parameters"})})," control the behavior of the new\n",(0,r.jsx)(n.a,{href:"/adrs/0010-vrf-elections",children:"VRF-based random beacon"}),":"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"beacon.params.vrf_parameters.alpha_hq_threshold"})})," is minimal number of\nnodes that need to contribute a VRF proof for the beacon's output to be valid.\nIt will be set to ",(0,r.jsx)(n.code,{children:"20"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["This will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"beacon.params.vrf_parameters.interval"})})," is the duration of an epoch.\nIt will be set to ",(0,r.jsx)(n.code,{children:"600"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["This will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"beacon.params.vrf_parameters.proof_delay"})})," is number of blocks since the\nbeginning of an epoch after a node can still submit its VRF proof.\nIt will be set to ",(0,r.jsx)(n.code,{children:"400"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["This will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"beacon.params.vrf_parameters.gas_costs.vrf_prove"})})," specifies the cost for\na VRF prove transaction.\nIt will be set to ",(0,r.jsx)(n.code,{children:"1000"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["This will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"beacon.params.pvss_parameters"})})," control the behavior of the\n",(0,r.jsx)(n.a,{href:"/adrs/0007-improved-random-beacon",children:"previous random beacon implementing a PVSS scheme"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Since PVSS is no longer supported, all its configuration options are removed\nas well."}),"\n",(0,r.jsx)(n.h3,{id:"governance",children:(0,r.jsx)(n.strong,{children:"Governance"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"governance.params.stake_threshold"})})," is a new parameter specifying the\nsingle unified stake threshold representing the percentage of ",(0,r.jsx)(n.code,{children:"VoteYes"})," votes\nin terms of total voting power for a governance proposal to pass.\nIt will be set to ",(0,r.jsx)(n.code,{children:"68"})," (i.e. 68%)."]}),"\n",(0,r.jsxs)(n.p,{children:["This will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"governance.params.quorum"})})," is the minimum percentage of voting power that\nneeds to be cast on a proposal for the result to be valid."]}),"\n",(0,r.jsxs)(n.p,{children:["It will be removed since it is being replaced by the single\n",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"governance.params.staking_threshold"})})," parameter."]}),"\n",(0,r.jsxs)(n.p,{children:["This will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"governance.params.threshold"})})," is the minimum percentage of ",(0,r.jsx)(n.code,{children:"VoteYes"})," votes\nin order for a proposal to be accepted."]}),"\n",(0,r.jsxs)(n.p,{children:["It will be removed since it is being replaced by the single\n",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"governance.params.staking_threshold"})})," parameter."]}),"\n",(0,r.jsxs)(n.p,{children:["This will be done automatically with the ",(0,r.jsx)(n.code,{children:"oasis-node debug fix-genesis"}),"\ncommand."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"consensus",children:(0,r.jsx)(n.strong,{children:"Consensus"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"consensus.params.state_checkpoint_interval"})})," parameter controls the\ninterval (in blocks) on which state checkpoints should be taken. It will be\nincreased from ",(0,r.jsx)(n.code,{children:"10000"})," to ",(0,r.jsx)(n.code,{children:"100000"})," to improve nodes' performance since\ncomputing checkpoints is I/O intensive."]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"other",children:"Other"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"extra_data"})})," will be set back to the value in the ",(0,r.jsx)(n.a,{href:"https://github.com/oasisprotocol/mainnet-artifacts/releases/tag/2020-11-18",children:"Mainnet genesis file"}),"\nto include the Oasis Network's genesis quote:"]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.em,{children:"\u201d"}),(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Quis_custodiet_ipsos_custodes%3F",children:(0,r.jsx)(n.em,{children:"Quis custodiet ipsos custodes?"})}),(0,r.jsx)(n.em,{children:"\u201d [submitted by Oasis\nCommunity Member Daniyar Borangaziyev]:"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'"extra_data": {\n  "quote": "UXVpcyBjdXN0b2RpZXQgaXBzb3MgY3VzdG9kZXM/IFtzdWJtaXR0ZWQgYnkgT2FzaXMgQ29tbXVuaXR5IE1lbWJlciBEYW5peWFyIEJvcmFuZ2F6aXlldl0="\n}\n'})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"launch-support",children:"Launch Support"}),"\n",(0,r.jsx)(n.p,{children:"The Oasis team will be offering live video support during the Damask upgrade.\nVideo call link and calendar details will be shared with node operators via\nemail and Slack."}),"\n",(0,r.jsxs)(n.p,{children:["For any additional support, please reach out via the\n",(0,r.jsxs)(n.a,{href:"/get-involved/",children:[(0,r.jsx)(n.strong,{children:"#nodeoperators"})," Oasis Community Slack channel"]})," with\nyour questions, comments, and feedback related to Damask upgrade."]}),"\n",(0,r.jsxs)(n.p,{children:["To follow the network, please use one of the many\n",(0,r.jsx)(n.a,{href:"https://github.com/oasisprotocol/docs/blob/0aeeb93a6e7c9001925923661e4eb3340ec4fb4b/docs/general/community-resources/community-made-resources.md#block-explorers--validator-leaderboards-block-explorers-validator-leaderboards",children:"community block explorers"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>a});var i=s(96540);const r={},o=i.createContext(r);function t(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);