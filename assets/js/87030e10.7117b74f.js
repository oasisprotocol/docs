"use strict";(self.webpackChunkdocs_oasis_io=self.webpackChunkdocs_oasis_io||[]).push([[9673],{49403:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"adrs/0024-off-chain-runtime-logic","title":"ADR 0024: Runtime Off-chain Logic (ROFL)","description":"Component","source":"@site/docs/adrs/0024-off-chain-runtime-logic.md","sourceDirName":"adrs","slug":"/adrs/0024-off-chain-runtime-logic","permalink":"/adrs/0024-off-chain-runtime-logic","draft":false,"unlisted":false,"editUrl":"https://github.com/oasisprotocol/adrs/edit/main/0024-off-chain-runtime-logic.md","tags":[],"version":"current","lastUpdatedAt":1736244914000,"frontMatter":{},"sidebar":"adrs","previous":{"title":"ADR 0022: Forward-Secret Master Secrets","permalink":"/adrs/0022-keymanager-master-secrets"}}');var s=t(74848),o=t(28453);const a={},r="ADR 0024: Runtime Off-chain Logic (ROFL)",d={},l=[{value:"Component",id:"component",level:2},{value:"Changelog",id:"changelog",level:2},{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Decision",id:"decision",level:2},{value:"Attestation",id:"attestation",level:3},{value:"Updates to the ORC Manifest",id:"updates-to-the-orc-manifest",level:3},{value:"Updates to the Runtime Host Protocol",id:"updates-to-the-runtime-host-protocol",level:3},{value:"Updates to EnclaveRPC RAK Binding",id:"updates-to-enclaverpc-rak-binding",level:3},{value:"Updates to the Runtime Host Sandbox",id:"updates-to-the-runtime-host-sandbox",level:3},{value:"Configuration",id:"configuration",level:3},{value:"Untrusted Local Storage",id:"untrusted-local-storage",level:3},{value:"Updates to the Oasis SDK",id:"updates-to-the-oasis-sdk",level:3},{value:"Consequences",id:"consequences",level:2},{value:"Positive",id:"positive",level:3},{value:"Negative",id:"negative",level:3},{value:"Neutral",id:"neutral",level:3},{value:"References",id:"references",level:2}];function c(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"adr-0024-runtime-off-chain-logic-rofl",children:"ADR 0024: Runtime Off-chain Logic (ROFL)"})}),"\n",(0,s.jsx)(n.h2,{id:"component",children:"Component"}),"\n",(0,s.jsx)(n.p,{children:"Oasis Core, Oasis SDK"}),"\n",(0,s.jsx)(n.h2,{id:"changelog",children:"Changelog"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"2024-02-26: Notifications"}),"\n",(0,s.jsx)(n.li,{children:"2023-11-27: Initial draft"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"status",children:"Status"}),"\n",(0,s.jsx)(n.p,{children:"Proposed"}),"\n",(0,s.jsx)(n.h2,{id:"context",children:"Context"}),"\n",(0,s.jsx)(n.p,{children:"Sometimes we may want the runtime compute nodes to run additional off-chain\nlogic that communicates with the on-chain state securely (e.g. ensuring that the\noff-chain logic is being run by the same node operator, is properly attested\nwhen running in a TEE, etc.)."}),"\n",(0,s.jsx)(n.p,{children:"The off-chain logic may then perform non-deterministic and potentially expensive\nthings (like remote HTTPS requests or complex local computation) and securely\ninteract with the on-chain logic via transactions."}),"\n",(0,s.jsx)(n.p,{children:"The main use case driving this proposal is support for running attested light\nclient committees that read and verify information from other chains, then make\nthis information available to Oasis runtimes with no additional trust\nassumptions."}),"\n",(0,s.jsx)(n.h2,{id:"decision",children:"Decision"}),"\n",(0,s.jsx)(n.p,{children:"While similar functionality can be implemented entirely independently on the\napplication layer (and such solutions already exist), this proposal attempts to\nreuse the same security and attestation infrastructure that is already available\nfor on-chain parts of the runtimes, specifically:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Compute nodes and runtime binary distribution and execution can stay the same\nas it has been for existing node operators that run the runtimes. Handling of\nthe off-chain logic part should be done transparently if the runtime provides\nit."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Existing attestation, consensus and freshness proof flows can be leveraged for\nensuring that the off-chain logic is running in a secure environment."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"One important consideration is also whether to have the off-chain logic part of\nthe same runtime binary or have it as a completely separate binary running in\nits own process. This proposal decides on the latter to ensure that the\noff-chain TCB is completely separate from the on-chain TCB. Given that the logic\nrunning off-chain can be much more complex and can interact with untrusted\nexternal services, ensuring this separation is important as a defense-in-depth\nmeasure."}),"\n",(0,s.jsx)(n.p,{children:"The proposed architecture extends the composition of the runtime so that it now\ncontains the following components:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Runtime On-chain Logic (RONL)"})," is what has existed as the sole runtime\ncomponent before this proposal. It contains the logic (and TCB) that is\nresponsible for executing the deterministic on-chain logic of the runtime."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Runtime Off-chain Logic (ROFL)"})," is an optional runtime component that may\nrun in parallel with RONL and is part of its own TCB. It also uses the same\ngeneral runtime framework and RHP, but instead of implementing the on-chain\nbatch scheduling, execution and query methods, it only implements specific\nnotification hooks that can trigger arbitrary actions."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Both RONL and ROFL are managed as independent runtimes by the Oasis Node as\nhost, using the existing runtime host architecture. Failure of ROFL does not\naffect RONL which can proceed to run as usual."}),"\n",(0,s.jsx)(n.h3,{id:"attestation",children:"Attestation"}),"\n",(0,s.jsx)(n.p,{children:"An assumption made in this proposal is that both RONL and ROFL components are\ndeveloped and built together, by the same entity, and are part of the same\nrelease. This means that we can simplify attestation by making RONL being able\nto attest ROFL by being aware of its exact identity."}),"\n",(0,s.jsx)(n.p,{children:"The idea is that during the release build process, ROFL is built first, its\nsigner-independent identity (e.g. MRENCLAVE) is measured and included during\ncompilation of RONL. The signer-dependent part of identity (e.g. MRSIGNER) is\nassumed to be the same for both and can be read from trusted CPU state (since it\nmay not be available during the build process due to offline signing)."}),"\n",(0,s.jsx)(n.p,{children:"Alternatively, one can imagine a proposal where the ROFL identity is backed by\nsome sort of on-chain governance process defined in the RONL component. Defining\nsuch a mechanism is outside the scope of this proposal."}),"\n",(0,s.jsx)(n.p,{children:"The process for ROFL attestation proceeds as follows:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Remote Attestation."})," The normal runtime attestation flow is initiated by\nthe host. As a result of this flow, the ",(0,s.jsx)(n.code,{children:"node.CapabilityTEE"})," structure is\ngenerated which includes the remote attestation quote and additional data."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Node Endorsement."})," The host verifies the ",(0,s.jsx)(n.code,{children:"node.CapabilityTEE"})," structure\nand if deemed correct, it signs it using the node's identity key and the\nfollowing domain separation context:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"oasis-core/node: endorse TEE capability\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The signature is stored in a new structure ",(0,s.jsx)(n.code,{children:"EndorsedCapabilityTEE"})," which is\ndefined as follows:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'type EndorsedCapabilityTEE struct {\n   // CapabilityTEE is the TEE capability structure to be endorsed.\n   CapabilityTEE CapabilityTEE `json:"capability_tee"`\n\n   // NodeEndorsement is the node endorsement signature.\n   NodeEndorsement signature.Signature `json:"node_endorsement"`\n}\n'})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Updating Node-Endorsed CapabilityTEE in ROFL."})," The ",(0,s.jsx)(n.code,{children:"EndorsedCapabilityTEE"}),"\nis sent to ROFL to be stored and available for establishing secure EnclaveRPC\nsessions."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"RONL Verification."})," When establishing a new session with RONL, the\nendorsed TEE capability is presented during session establishment. RONL\nverifies the quote, ensures the enclave identity is one of the known\nidentities set at compile-time and verifies the node endorsement against the\nlocally known node identity (both RONL and ROFL must be from the same node)."]}),"\n",(0,s.jsx)(n.p,{children:"If all the checks pass, a secure EnclaveRPC session is established."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"This flow needs to be repeated whenever RAK changes for any reason and also\nperiodically to ensure freshness (consistent with the quote policy configured\nfor the runtime in the consensus layer)."}),"\n",(0,s.jsx)(n.h3,{id:"updates-to-the-orc-manifest",children:"Updates to the ORC Manifest"}),"\n",(0,s.jsx)(n.p,{children:"The ORC manifest is extended with a field that can specify extra components\nwhich currently include ROFL binaries in a similar way as we already support\nregular runtime binaries (e.g. specifying the executable and SGX metadata)."}),"\n",(0,s.jsx)(n.p,{children:"The manifest is updated as follows:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'// Manifest is a deserialized runtime bundle manifest.\ntype Manifest struct {\n    // ... existing fields omitted ...\n\n    // Components are the additional runtime components.\n    Components []*Component `json:"components,omitempty"`\n}\n\n// ComponentKind is the kind of a component.\ntype ComponentKind string\n\nconst (\n  // ComponentInvalid is an invalid component.\n  ComponentInvalid ComponentKind = ""\n  // ComponentRONL is the on-chain logic component.\n  ComponentRONL ComponentKind = "ronl"\n  // ComponentROFL is the off-chain logic component.\n  ComponentROFL ComponentKind = "rofl"\n)\n\n// Component is a runtime component.\ntype Component struct {\n  // Kind is the component kind.\n  Kind ComponentKind `json:"kind"`\n\n  // Name is the name of the component that can be used to filter components\n  // when multiple are provided by a runtime.\n  Name string `json:"name,omitempty"`\n\n  // Executable is the name of the runtime ELF executable file.\n  Executable string `json:"executable"`\n\n  // SGX is the SGX specific manifest metadata if any.\n  SGX *SGXMetadata `json:"sgx,omitempty"`\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["The top-level ",(0,s.jsx)(n.code,{children:"executable"})," and ",(0,s.jsx)(n.code,{children:"sgx"})," fields are supported for backwards\ncompatibility and implicitly define a new ",(0,s.jsx)(n.code,{children:"Component"})," of kind ",(0,s.jsx)(n.code,{children:"ComponentRONL"}),"."]}),"\n",(0,s.jsx)(n.h3,{id:"updates-to-the-runtime-host-protocol",children:"Updates to the Runtime Host Protocol"}),"\n",(0,s.jsx)(n.p,{children:"This proposal includes some non-breaking updates to the Runtime Host Protocol in\norder to support the ROFL component, as follows:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Consensus Block Notification."})," No updates are required to facilitate\nnotifications about consensus layer blocks as this is already handled as part\nof the existing RHP flow. The only change is that for ROFL, these\nnotifications invoke a hook that can be implemented by the runtime."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Runtime Transaction Submission."})," A new method ",(0,s.jsx)(n.code,{children:"HostSubmitTx"})," is introduced\nwhich allows ROFL to submit transactions to the runtime. It works by queueing\nthe transaction in the transaction pool (local queue) for later scheduling."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'type HostSubmitTxRequest struct {\n    // RuntimeID is the identifier of the target runtime.\n    RuntimeID common.Namespace `json:"runtime_id"`\n    // Data is the raw transaction data.\n    Data []byte `json:"data"`\n    // Wait specifies whether the call should wait until the transaction is\n    // included in a block.\n    Wait bool `json:"wait,omitempty"`\n    // Prove specifies whether the response should include a proof of\n    // transaction being included in a block.\n    Prove bool `json:"prove,omitempty"`\n}\n'})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Notify Registration."})," A new method ",(0,s.jsx)(n.code,{children:"HostRegisterNotify"})," is introduced which\nallows ROFL to register to be notified by the host when specific events occur.\nNote that delivery of these notifications is best effort as a dishonest host\nmay withold notification delivery or generate spurious notifications."]}),"\n",(0,s.jsx)(n.p,{children:"Registering for notifications overwrites any previous configuration."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'type HostRegisterNotifyRequest struct {\n    // RuntimeBlock subscribes to runtime block notifications.\n    RuntimeBlock bool `json:"runtime_block,omitempty"`\n    // RuntimeEvent subscribes to runtime event emission notifications.\n    RuntimeEvent *struct {\n        // Tags specifies which event tags to subscribe to.\n        Tags [][]byte `json:"tags,omitempty"`\n    } `json:"runtime_event,omitempty"`\n}\n'})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Notification Delivery."})," A new method ",(0,s.jsx)(n.code,{children:"RuntimeNotify"})," is introduced which\nallows the host to deliver event notifications based on previously registered\nnotifiers."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'type RuntimeNotifyRequest struct {\n    // RuntimeBlock notifies about a new runtime block.\n    RuntimeBlock *roothash.AnnotatedBlock `json:"runtime_block,omitempty"`\n    // RuntimeEvent notifies about a specific runtime event being emitted.\n    RuntimeEvent *struct {\n        // Block is the block header of the block that emitted the event.\n        Block *roothash.AnnotatedBlock `json:"block"`\n        // Tags are the matching tags that were emitted.\n        Tags [][]byte `json:"tags"`\n    } `json:"runtime_event,omitempty"`\n}\n'})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"RONL-ROFL Communication."})," The existing EnclaveRPC is reused to facilitate\nthe communication between the two components if/when needed. For this purpose\nthe endpoint identifier ",(0,s.jsx)(n.code,{children:"ronl"})," is made available in the ROFL host method\nhandler to address the RONL component."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Updating Node-Endorsed CapabilityTEE in ROFL."})," A new method\n",(0,s.jsx)(n.code,{children:"RuntimeCapabilityTEEUpdateEndorsementRequest"})," is introduced which allows the\nnode to refresh the ",(0,s.jsx)(n.code,{children:"EndorsedCapabilityTEE"})," for ROFL."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'type RuntimeCapabilityTEEUpdateEndorsementRequest struct {\n    // EndorsedCapabilityTEE is an endorsed TEE capability.\n    EndorsedCapabilityTEE node.EndorsedCapabilityTEE `json:"ect"`\n}\n'})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"updates-to-enclaverpc-rak-binding",children:"Updates to EnclaveRPC RAK Binding"}),"\n",(0,s.jsxs)(n.p,{children:["Version 2 of the ",(0,s.jsx)(n.code,{children:"RAKBinding"})," structure is introduced for establishment of\nEnclaveRPC sessions, as follows:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-rust",children:"pub enum RAKBinding {\n    // ... previous versions omitted ...\n\n    /// V2 format which supports endorsed CapabilityTEE structures.\n    #[cbor(rename = 2)]\n    V2 {\n        ect: EndorsedCapabilityTEE,\n        binding: Signature,\n    },\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:"Additionally, the relevant EnclaveRPC session implementation is updated to\nfacilitate thew new authentication mechanism via endorsed TEE capabilities and\nthe session demultiplexer is updated to support authentication policies on\nincoming connections."}),"\n",(0,s.jsx)(n.h3,{id:"updates-to-the-runtime-host-sandbox",children:"Updates to the Runtime Host Sandbox"}),"\n",(0,s.jsx)(n.p,{children:"This proposal updates the runtime host sandbox to support optionally allowing\nexternal network requests. These are then allowed only for the ROFL component\n(if any is available for a runtime)."}),"\n",(0,s.jsx)(n.p,{children:"The following modifications are required:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["When setting up the Bubblewrap sandbox, ",(0,s.jsx)(n.code,{children:"--share-net"})," is passed to share the\nnetwork namespace with the sandboxed runtime. All other namespaces are still\nunshared."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["The runtime loader is modified to accept an additional argument\n",(0,s.jsx)(n.code,{children:"--allow-network"})," which then changes the usercall extension to pass through\nany address passed in the ",(0,s.jsx)(n.code,{children:"connect_stream"})," handler."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"configuration",children:"Configuration"}),"\n",(0,s.jsx)(n.p,{children:"ROFL may require additional configuration which it may do through one of several\nways:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"On-chain Configuration."})," Configuration for the ROFL component may be stored\nin on-chain state. ROFL would then query the current configuration and apply\nit locally."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Local Per-Node Configuration."})," In case some per-node configuration is\nrequired (e.g. to allow the node operator to override a default), the existing\nruntime local configuration mechanism can be used where configuration is\nprovided as part of the RHP handshake. All configuration for ROFL should be\ncontained under the ",(0,s.jsx)(n.code,{children:"rofl"})," configuration key."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"untrusted-local-storage",children:"Untrusted Local Storage"}),"\n",(0,s.jsxs)(n.p,{children:["ROFL may utilize the existing untrusted node-local storage to store things like\nsealed data local to the node. This store is shared between RONL and ROFL, but\nall ROFL keys are transparently prefixed by ",(0,s.jsx)(n.code,{children:"rofl."})," on the host such that only\nRONL can see (but not necessarily read) ROFL's keys but not vice versa."]}),"\n",(0,s.jsx)(n.h3,{id:"updates-to-the-oasis-sdk",children:"Updates to the Oasis SDK"}),"\n",(0,s.jsx)(n.p,{children:"A convenient way to develop ROFL modules alongside the on-chain support\nfunctionality should be implemented in the Oasis SDK, including a convenient way\nfor ROFL to submit runtime transactions in a way that can be verified on-chain\nas coming from a specific node/runtime instance."}),"\n",(0,s.jsx)(n.h2,{id:"consequences",children:"Consequences"}),"\n",(0,s.jsx)(n.h3,{id:"positive",children:"Positive"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Oasis runtimes can easily be extended with arbitrary off-chain logic that can\nsecurely interact with on-chain functionality."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Node operators do not need to perform much additional configuration in order\nto support the new off-chain logic."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"negative",children:"Negative"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Additional complexity is introduced to the Runtime Host Protocol and to the\nnode binary."}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"neutral",children:"Neutral"}),"\n",(0,s.jsx)(n.h2,{id:"references",children:"References"})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>r});var i=t(96540);const s={},o=i.createContext(s);function a(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);