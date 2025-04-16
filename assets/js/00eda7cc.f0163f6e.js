"use strict";(self.webpackChunkdocs_oasis_io=self.webpackChunkdocs_oasis_io||[]).push([[4754],{28899:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>d,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"core/development-setup/deploying-a-runtime","title":"Deploying a Runtime","description":"Before proceeding, make sure to look at the [prerequisites] required for running","source":"@site/docs/core/development-setup/deploying-a-runtime.md","sourceDirName":"core/development-setup","slug":"/core/development-setup/deploying-a-runtime","permalink":"/core/development-setup/deploying-a-runtime","draft":false,"unlisted":false,"editUrl":"https://github.com/oasisprotocol/oasis-core/edit/stable/24.2.x/docs/development-setup/deploying-a-runtime.md","tags":[],"version":"current","lastUpdatedAt":1734693498000,"frontMatter":{},"sidebar":"oasisCore","previous":{"title":"Single Validator Node Network","permalink":"/core/development-setup/single-validator-node-network"},"next":{"title":"High-Level Components","permalink":"/core/high-level-components"}}');var r=t(74848),s=t(28453);const o={},d="Deploying a Runtime",a={},l=[{value:"Provision a Single Validator Node Network",id:"provision-a-single-validator-node-network",level:2},{value:"Initializing a Runtime",id:"initializing-a-runtime",level:2},{value:"Submitting the Runtime Register Transaction",id:"submitting-the-runtime-register-transaction",level:2},{value:"Confirm Runtime is Registered",id:"confirm-runtime-is-registered",level:2},{value:"Running a Runtime Node",id:"running-a-runtime-node",level:2},{value:"Updating Entity Nodes",id:"updating-entity-nodes",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"deploying-a-runtime",children:"Deploying a Runtime"})}),"\n",(0,r.jsxs)(n.p,{children:["Before proceeding, make sure to look at the ",(0,r.jsx)(n.a,{href:"/core/development-setup/prerequisites",children:"prerequisites"})," required for running\nan Oasis Core environment followed by ",(0,r.jsx)(n.a,{href:"/core/development-setup/building",children:"build instructions"})," for the respective\nenvironment (non-SGX or SGX), using the ",(0,r.jsx)(n.a,{href:"/core/development-setup/oasis-net-runner",children:(0,r.jsx)(n.code,{children:"oasis-net-runner"})})," and see ",(0,r.jsx)(n.a,{href:"/core/runtime/",children:"runtime\ndocumentation"})," for a general documentation on runtimes."]}),"\n",(0,r.jsx)(n.p,{children:"These instructions will show how to register and deploy a runtime node on a\nlocal development network."}),"\n",(0,r.jsx)(n.h2,{id:"provision-a-single-validator-node-network",children:"Provision a Single Validator Node Network"}),"\n",(0,r.jsxs)(n.p,{children:["Use the ",(0,r.jsx)(n.a,{href:"/core/development-setup/oasis-net-runner",children:(0,r.jsx)(n.code,{children:"oasis-net-runner"})})," to provision a validator node network without any\nregistered runtimes."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"mkdir /tmp/runtime-example\n\noasis-net-runner \\\n  --basedir.no_temp_dir \\\n  --basedir /tmp/runtime-example \\\n  --fixture.default.node.binary go/oasis-node/oasis-node \\\n  --fixture.default.setup_runtimes=false \\\n  --fixture.default.deterministic_entities \\\n  --fixture.default.fund_entities \\\n  --fixture.default.num_entities 2\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The following steps should be run in a separate terminal window. To simplify the\ninstructions set up an ",(0,r.jsx)(n.code,{children:"ADDR"})," environment variable pointing to the UNIX socket\nexposed by the started node:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"export ADDR=unix:/tmp/runtime-example/net-runner/network/validator-0/internal.sock\n"})}),"\n",(0,r.jsx)(n.p,{children:"Confirm the network is running by listing all registered entities:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"oasis-node registry entity list -a $ADDR -v\n"})}),"\n",(0,r.jsx)(n.p,{children:"Should give output similar to:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'{"v":2,"id":"JTUtHd4XYQjh//e6eYU7Pa/XMFG88WE+jixvceIfWrk=","nodes":["LQu4ZtFg8OJ0MC4M4QMeUR7Is6Xt4A/CW+PK/7TPiH0="]}\n{"v":2,"id":"+MJpnSTzc11dNI5emMa+asCJH5cxBiBCcpbYE4XBdso="}\n{"v":2,"id":"TqUyj5Q+9vZtqu10yw6Zw7HEX3Ywe0JQA9vHyzY47TU="}\n'})}),"\n",(0,r.jsxs)(n.p,{children:["In following steps we will register and run the ",(0,r.jsx)(n.a,{href:"https://github.com/oasisprotocol/oasis-core/tree/master/tests/runtimes/simple-keyvalue",children:"simple-keyvalue"})," runtime on the\nnetwork."]}),"\n",(0,r.jsx)(n.h2,{id:"initializing-a-runtime",children:"Initializing a Runtime"}),"\n",(0,r.jsxs)(n.p,{children:["To generate and sign a runtime registration transaction that will initialize and\nregister the runtime we will use the ",(0,r.jsx)(n.code,{children:"registry runtime gen_register"})," command.\nWhen initializing a runtime we need to provide the runtime descriptor."]}),"\n",(0,r.jsxs)(n.p,{children:["For additional information about runtimes and parameters see the ",(0,r.jsx)(n.a,{href:"/core/runtime/",children:"runtime\ndocumentation"})," and ",(0,r.jsx)(n.a,{href:"https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/registry/api?tab=doc#Runtime",children:"code reference"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Before generating the registration transaction, gather the following data and\nset up environment variables to simplify instructions."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"ENTITY_DIR"})," - Path to the entity directory created when starting the\ndevelopment network. This entity will be the runtime owner. The genesis used\nin the provisioning initial network step funds the all entities in entities.\nIn the following instructions we will be using the ",(0,r.jsx)(n.code,{children:"entity-2"})," entity (located\nin ",(0,r.jsx)(n.code,{children:"/tmp/runtime-example/net-runner/network/entity-2/"})," directory)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"ENTITY_ID"})," - ID of the entity that will be the owner of the runtime. You can\nget the entity ID from ",(0,r.jsx)(n.code,{children:"$ENTITY_DIR/entity.json"})," file."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"GENESIS_JSON"})," - Path to the genesis.json file used in the development\nnetwork. (defaults to:\n",(0,r.jsx)(n.code,{children:"/tmp/runtime-example/net-runner/network/genesis.json"}),")."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"RUNTIME_ID"})," - See ",(0,r.jsx)(n.a,{href:"/core/runtime/identifiers",children:"runtime identifiers"})," on how to choose a runtime\nidentifier. In this example we use\n",(0,r.jsx)(n.code,{children:"8000000000000000000000000000000000000000000000000000000001234567"})," which is a\ntest identifier that will not work outside local tests."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"RUNTIME_GENESIS_JSON"})," - Path to the runtime genesis state file. The runtime\nused in this example does not use a genesis file."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"NONCE"})," - Entity account nonce. If you followed the guide, nonce ",(0,r.jsx)(n.code,{children:"0"})," would be\nthe initial nonce to use for the entity. Note: make sure to keep updating the\nnonce when generating new transactions. To query for current account nonce\nvalue use ",(0,r.jsx)(n.a,{href:"/core/oasis-node/cli#info",children:"stake account info"})," CLI."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"export ENTITY_DIR=/tmp/runtime-example/net-runner/network/entity-2/\nexport ENTITY_ID=+MJpnSTzc11dNI5emMa+asCJH5cxBiBCcpbYE4XBdso=\nexport GENESIS_JSON=/tmp/runtime-example/net-runner/network/genesis.json\nexport RUNTIME_ID=8000000000000000000000000000000000000000000000000000000001234567\nexport RUNTIME_DESCRIPTOR=/tmp/runtime-example/runtime_descriptor.json\nexport NONCE=0\n"})}),"\n",(0,r.jsx)(n.p,{children:"Prepare a runtime descriptor:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'cat << EOF > "${RUNTIME_DESCRIPTOR}"\n{\n  "v": 2,\n  "id": "${RUNTIME_ID}",\n  "entity_id": "${ENTITY_ID}",\n  "genesis": {\n    "state_root": "c672b8d1ef56ed28ab87c3622c5114069bdd3ad7b8f9737498d0c01ecef0967a",\n    "state": null,\n    "storage_receipts": null,\n    "round": 0\n  },\n  "kind": 1,\n  "tee_hardware": 0,\n  "versions": {\n    "version": {}\n  },\n  "executor": {\n    "group_size": 1,\n    "group_backup_size": 0,\n    "allowed_stragglers": 0,\n    "round_timeout": 5,\n    "max_messages": 32\n  },\n  "txn_scheduler": {\n    "algorithm": "simple",\n    "batch_flush_timeout": 1000000000,\n    "max_batch_size": 1000,\n    "max_batch_size_bytes": 16777216,\n    "propose_batch_timeout": 5\n  },\n  "storage": {\n    "group_size": 1,\n    "min_write_replication": 1,\n    "max_apply_write_log_entries": 100000,\n    "max_apply_ops": 2,\n    "checkpoint_interval": 10000,\n    "checkpoint_num_kept": 2,\n    "checkpoint_chunk_size": 8388608\n  },\n  "admission_policy": {\n    "entity_whitelist": {\n      "entities": {\n        "${ENTITY_ID}": {}\n      }\n    }\n  },\n  "staking": {},\n  "governance_model": "entity"\n}\nEOF\n'})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"oasis-node registry runtime gen_register \\\n  --transaction.fee.gas 1000 \\\n  --transaction.fee.amount 0 \\\n  --transaction.file /tmp/runtime-example/register_runtime.tx \\\n  --transaction.nonce $NONCE \\\n  --genesis.file $GENESIS_JSON \\\n  --signer.backend file \\\n  --signer.dir $ENTITY_DIR \\\n  --runtime.descriptor /tmp/runtime-example/runtime-descriptor.json\n  --debug.dont_blame_oasis \\\n  --debug.allow_test_keys\n"})}),"\n",(0,r.jsxs)(n.p,{children:["After confirmation, this command outputs a signed transaction in the\n",(0,r.jsx)(n.code,{children:"/tmp/runtime-example/register_runtime.tx"})," file. In the next step we will submit\nthe transaction to complete the runtime registration."]}),"\n",(0,r.jsx)(n.admonition,{type:"caution",children:(0,r.jsxs)(n.p,{children:["When registering a runtime on a ",(0,r.jsx)(n.em,{children:"non-development"})," network you will likely want\nto modify default parameters. Additionally, since we are running this on a debug\nnetwork, we had to enable the ",(0,r.jsx)(n.code,{children:"debug.dont_blame_oasis"})," and\n",(0,r.jsx)(n.code,{children:"debug.allow_test_keys"})," flags."]})}),"\n",(0,r.jsx)(n.h2,{id:"submitting-the-runtime-register-transaction",children:"Submitting the Runtime Register Transaction"}),"\n",(0,r.jsx)(n.p,{children:"To register the runtime, submit the generated transaction."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"oasis-node consensus submit_tx \\\n    --transaction.file /tmp/runtime-example/register_runtime.tx \\\n    --address $ADDR\n"})}),"\n",(0,r.jsx)(n.h2,{id:"confirm-runtime-is-registered",children:"Confirm Runtime is Registered"}),"\n",(0,r.jsxs)(n.p,{children:["To confirm the runtime is registered use the ",(0,r.jsx)(n.code,{children:"registry runtime list"})," command."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"oasis-node registry runtime list \\\n  --verbose \\\n  --include_suspended \\\n  --address $ADDR\n"})}),"\n",(0,r.jsx)(n.p,{children:"Should give output similar to"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'{\n  "v": 2,\n  "id": "8000000000000000000000000000000000000000000000000000000001234567",\n  "entity_id": "+MJpnSTzc11dNI5emMa+asCJH5cxBiBCcpbYE4XBdso=",\n  "genesis": {\n    "state_root": "c672b8d1ef56ed28ab87c3622c5114069bdd3ad7b8f9737498d0c01ecef0967a",\n    "state": null,\n    "storage_receipts": null,\n    "round": 0\n  },\n  "kind": 1,\n  "tee_hardware": 0,\n  "versions": {\n    "version": {}\n  },\n  "executor": {\n    "group_size": 1,\n    "group_backup_size": 0,\n    "allowed_stragglers": 0,\n    "round_timeout": 5,\n    "max_messages": 32\n  },\n  "txn_scheduler": {\n    "algorithm": "simple",\n    "batch_flush_timeout": 1000000000,\n    "max_batch_size": 1000,\n    "max_batch_size_bytes": 16777216,\n    "propose_batch_timeout": 5\n  },\n  "storage": {\n    "group_size": 1,\n    "min_write_replication": 1,\n    "max_apply_write_log_entries": 100000,\n    "max_apply_ops": 2,\n    "checkpoint_interval": 10000,\n    "checkpoint_num_kept": 2,\n    "checkpoint_chunk_size": 8388608\n  },\n  "admission_policy": {\n    "entity_whitelist": {\n      "entities": {\n        "+MJpnSTzc11dNI5emMa+asCJH5cxBiBCcpbYE4XBdso=": {}\n      }\n    }\n  },\n  "staking": {},\n  "governance_model": "entity"\n}\n'})}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["Since we did not setup any runtime nodes, the runtime\nwill get ",(0,r.jsx)(n.a,{href:"/core/runtime/#suspending-runtimes",children:"suspended"})," until nodes for the runtime register."]})}),"\n",(0,r.jsx)(n.p,{children:"In the next step we will setup and run a runtime node."}),"\n",(0,r.jsx)(n.h2,{id:"running-a-runtime-node",children:"Running a Runtime Node"}),"\n",(0,r.jsx)(n.p,{children:"We will now run a node that will act as a compute, storage and client node for\nthe runtime."}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsx)(n.p,{children:"In a real word scenario there would be multiple nodes\nrunning the runtime, each likely serving as a single type only."})}),"\n",(0,r.jsx)(n.p,{children:"Before running the node, gather the following data parameters and set up\nenvironment variables to simplify instructions."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"RUNTIME_BINARY"})," - Path to the runtime binary that will be run on the node. We\nwill use the ",(0,r.jsx)(n.a,{href:"https://github.com/oasisprotocol/oasis-core/tree/master/tests/runtimes/simple-keyvalue",children:"simple-keyvalue"})," runtime. If you followed the ",(0,r.jsx)(n.a,{href:"/core/development-setup/building",children:"build\ninstructions"})," the built binary is available at\n",(0,r.jsx)(n.code,{children:"./target/default/release/simple-keyvalue"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"SEED_NODE_ADDRESS"})," - Address of the seed node in the development network.\nSeed node address can be seen in the ",(0,r.jsx)(n.code,{children:"oasis-net-runner"})," logs, when the network\nis initially provisioned."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"export RUNTIME_BINARY=/workdir/target/default/release/simple-keyvalue\nexport SEED_NODE_ADDRESS=<seed-node-cometbft-addr>@127.0.0.1:20000\n\n# Runtime node data dir.\nmkdir -m 0700 /tmp/runtime-example/runtime-node\n\n# Start runtime node.\noasis-node \\\n  --datadir /tmp/runtime-example/runtime-node \\\n  --log.level debug \\\n  --log.format json \\\n  --log.file /tmp/runtime-example/runtime-node/node.log \\\n  --grpc.log.debug \\\n  --worker.registration.entity $ENTITY_DIR/entity.json \\\n  --genesis.file $GENESIS_JSON \\\n  --worker.storage.enabled \\\n  --worker.compute.enabled \\\n  --runtime.provisioner unconfined \\\n  --runtime.supported $RUNTIME_ID \\\n  --runtime.paths $RUNTIME_ID=$RUNTIME_BINARY \\\n  --consensus.cometbft.debug.addr_book_lenient \\\n  --consensus.cometbft.debug.allow_duplicate_ip \\\n  --consensus.cometbft.p2p.seed $SEED_NODE_ADDRESS \\\n  --debug.dont_blame_oasis \\\n  --debug.allow_test_keys\n"})}),"\n",(0,r.jsx)(n.admonition,{type:"danger",children:(0,r.jsx)(n.p,{children:"This also enables unsafe debug-only flags which must never be used in a\nproduction setting as they may result in node compromise."})}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["When running a runtime node in a production setting, the ",(0,r.jsx)(n.code,{children:"p2p.addresses"})," flag\nneeds to be configured as well."]})}),"\n",(0,r.jsx)(n.p,{children:"Following steps should be run in a new terminal window."}),"\n",(0,r.jsx)(n.h2,{id:"updating-entity-nodes",children:"Updating Entity Nodes"}),"\n",(0,r.jsx)(n.p,{children:"Before the newly started runtime node can register itself as a runtime node, we\nneed to update the entity information in registry, to include the started node."}),"\n",(0,r.jsxs)(n.p,{children:["Before proceeding, gather the runtime node id and store it in a variable. If you\nfollowed above instructions, the node id can be seen in\n",(0,r.jsx)(n.code,{children:"/tmp/runtime-example/runtime-node/identity_pub.pem"})," (or using the ",(0,r.jsx)(n.a,{href:"/core/oasis-node/cli#status",children:"node control\nstatus command"}),")."]}),"\n",(0,r.jsx)(n.p,{children:"Update the entity and generate a transaction that will update the registry\nstate."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"# NOTE: this ID is not generated deterministically make sure to change the ID\n# with your node id.\nexport NODE_ID=NOPhD7UlMZBO8fNyo2xLFanlmvl+EmZ5s4mM2z9nEBg=\n\noasis-node registry entity update \\\n  --signer.dir $ENTITY_DIR  \\\n  --entity.node.id $NODE_ID\n\noasis-node registry entity gen_register \\\n  --genesis.file $GENESIS_JSON \\\n  --signer.backend file \\\n  --signer.dir $ENTITY_DIR \\\n  --transaction.file /tmp/runtime-example/update_entity.tx \\\n  --transaction.fee.gas 2000 \\\n  --transaction.fee.amount 0 \\\n  --transaction.nonce $NONCE \\\n  --debug.dont_blame_oasis \\\n  --debug.allow_test_keys\n"})}),"\n",(0,r.jsx)(n.p,{children:"Submit the generated transaction:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"oasis-node consensus submit_tx \\\n    --transaction.file /tmp/runtime-example/update_entity.tx \\\n    --address $ADDR\n"})}),"\n",(0,r.jsx)(n.p,{children:"Confirm the entity in the registry has been updated by querying the registry\nstate:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'oasis-node registry entity list -a $ADDR -v\n\n{"v":1,"id":"JTUtHd4XYQjh//e6eYU7Pa/XMFG88WE+jixvceIfWrk=","nodes":["LQu4ZtFg8OJ0MC4M4QMeUR7Is6Xt4A/CW+PK/7TPiH0="]}\n{"v":1,"id":"+MJpnSTzc11dNI5emMa+asCJH5cxBiBCcpbYE4XBdso=","nodes":["vWUfSmjrHSlN5tSSO3/Qynzx+R/UlwPV9u+lnodQ00c="]}\n{"v":1,"id":"TqUyj5Q+9vZtqu10yw6Zw7HEX3Ywe0JQA9vHyzY47TU=","allow_entity_signed_nodes":true}\n'})}),"\n",(0,r.jsx)(n.p,{children:"Node is now able to register and the runtime should get resumed, make sure this\nhappens by querying the registry for runtimes:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'# Ensure node is registered\noasis-node registry node list -a $ADDR -v | grep "$NODE_ID"\n\n# Ensure runtime is resumed.\noasis-node registry runtime list -a $ADDR -v\n'})}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsx)(n.p,{children:"You might need to wait few seconds for an epoch\ntransition so that the node is registered and runtime gets resumed."})})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>d});var i=t(96540);const r={},s=i.createContext(r);function o(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);