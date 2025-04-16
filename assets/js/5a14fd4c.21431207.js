"use strict";(self.webpackChunkdocs_oasis_io=self.webpackChunkdocs_oasis_io||[]).push([[9555],{34802:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>i,toc:()=>h});const i=JSON.parse('{"id":"adrs/0010-vrf-elections","title":"ADR 0010: VRF-based Committee Elections","description":"Component","source":"@site/docs/adrs/0010-vrf-elections.md","sourceDirName":"adrs","slug":"/adrs/0010-vrf-elections","permalink":"/adrs/0010-vrf-elections","draft":false,"unlisted":false,"editUrl":"https://github.com/oasisprotocol/adrs/edit/main/0010-vrf-elections.md","tags":[],"version":"current","lastUpdatedAt":1736244914000,"frontMatter":{},"sidebar":"adrs","previous":{"title":"ADR 0009: Ed25519 Signature Verification Semantics","permalink":"/adrs/0009-ed25519-semantics"},"next":{"title":"ADR 0011: Incoming Runtime Messages","permalink":"/adrs/0011-incoming-runtime-messages"}}');var s=t(74848),o=t(28453);const r={},a="ADR 0010: VRF-based Committee Elections",l={},h=[{value:"Component",id:"component",level:2},{value:"Changelog",id:"changelog",level:2},{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Decision",id:"decision",level:2},{value:"Cryptographic Primitives",id:"cryptographic-primitives",level:3},{value:"Node Descriptor Changes",id:"node-descriptor-changes",level:3},{value:"Consensus Parameters",id:"consensus-parameters",level:3},{value:"Consensus State, Events, and Transactions",id:"consensus-state-events-and-transactions",level:3},{value:"VRF Operation",id:"vrf-operation",level:3},{value:"VRF Committee Elections",id:"vrf-committee-elections",level:3},{value:"VRF Validator Elections",id:"vrf-validator-elections",level:3},{value:"Timekeeping Changes",id:"timekeeping-changes",level:3},{value:"Consequences",id:"consequences",level:2},{value:"Positive",id:"positive",level:3},{value:"Negative",id:"negative",level:3},{value:"Neutral",id:"neutral",level:3},{value:"References",id:"references",level:2}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"adr-0010-vrf-based-committee-elections",children:"ADR 0010: VRF-based Committee Elections"})}),"\n",(0,s.jsx)(n.h2,{id:"component",children:"Component"}),"\n",(0,s.jsx)(n.p,{children:"Oasis Core"}),"\n",(0,s.jsx)(n.h2,{id:"changelog",children:"Changelog"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"2021-05-10: Initial version"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"status",children:"Status"}),"\n",(0,s.jsx)(n.p,{children:"Accepted"}),"\n",(0,s.jsx)(n.h2,{id:"context",children:"Context"}),"\n",(0,s.jsx)(n.p,{children:"While functional, the current PVSS-based random beacon is neither all that\nperformant, nor all that scalable.  To address both concerns, this ADR\nproposes transitioning the election procedure to one that is based on\ncryptographic sortition of Verifiable Random Function (VRF) outputs."}),"\n",(0,s.jsx)(n.h2,{id:"decision",children:"Decision"}),"\n",(0,s.jsx)(n.h3,{id:"cryptographic-primitives",children:"Cryptographic Primitives"}),"\n",(0,s.jsxs)(n.p,{children:["Let the VRF to be used across the system be ECVRF-EDWARDS25519-SHA512-ELL2\nfrom the ",(0,s.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/draft-irtf-cfrg-vrf/",children:"Verifiable Random Functions (VRFs) draft (v10)"}),", with the\nfollowing additions and extra clarifications:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:'All public keys MUST be validated via the "ECVRF Validate Key" procedure\nas specified in section 5.6.1 (Small order public keys MUST be\nrejected).'}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"The string_to_point routine MUST reject non-canonically encoded points\nas specified in RFC 8032.  Many ed25519 implementations are lax about\nenforcing this when decoding."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"When decoding s in the ECVRF_verify routine, the s scalar MUST fall\nwithin the range 0 \u2264 i < L.  This change will make proofs\nnon-malleable.  Note that this check is unneeded for the c scalar\nas it is 128-bits, and thus will always lie within the valid range.\nThis check was not present in the IETF draft prior to version 10."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Implementations MAY choose to incorporate additional randomness into\nthe ECVRF_nonce_generation_RFC8032 function.  Note that proofs (pi_string)\nare not guaranteed to be unique or deterministic even without this\nextension (the signer can use any arbitrary value for the nonce and\nproduce a valid proof, without altering beta_string)."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Let the tuple oriented cryptographic hash function be TupleHash256 from\n",(0,s.jsx)(n.a,{href:"https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-185.pdf",children:"NIST SP 800-185"}),"."]}),"\n",(0,s.jsx)(n.h3,{id:"node-descriptor-changes",children:"Node Descriptor Changes"}),"\n",(0,s.jsx)(n.p,{children:"The node descriptor of each node will be extended to include the following\ndatastructure."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-golang",children:'type Node struct {\n  // ... existing fields omitted ...\n\n  // VRF is the public key used by the node to generate VRF proofs.\n  VRF *VRFInfo `json:"vrf,omitempty"`\n}\n\ntype VRFInfo struct {\n  // ID is the unique identifier of the node used to generate VRF proofs.\n  ID signature.PublicKey `json:"id"`\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"The VRF public key shall be a long-term Ed25519 public key, that is distinct\nfrom every other key used by the node.  The key MUST not be small order."}),"\n",(0,s.jsxs)(n.p,{children:["The existing ",(0,s.jsx)(n.code,{children:"Beacon"})," member of the node descriptor is considered deprecated\nand will first be ignored by the consensus layer, and then removed in a\nsubsequent version following a transitionary period."]}),"\n",(0,s.jsx)(n.h3,{id:"consensus-parameters",children:"Consensus Parameters"}),"\n",(0,s.jsx)(n.p,{children:"The scheduler module will have the following additional consensus parameters\nthat control behavior."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-golang",children:'type ConsensusParameters struct {\n  // ... existing fields omitted ...\n\n  // VRFParameters is the paramenters for the VRF-based cryptographic\n  // sortition based election system.\n  VRFParameters *VRFParameters `json:"vrf_params"`\n}\n\n// VRFParameters are the VRF scheduler parameters.\ntype VRFParameters struct {\n  // AlphaHighQualityThreshold is the minimum number of proofs (Pi)\n  // that must be received for the next input (Alpha) to be considered\n  // high quality.  If the VRF input is not high quality, runtimes will\n  // be disabled for the next epoch.\n  AlphaHighQualityThreshold uint64 `json:"alpha_hq_threshold,omitempty"`\n\n  // Interval is the epoch interval (in blocks).\n  Interval int64 `json:"interval,omitempty"`\n\n  // ProofSubmissionDelay is the wait peroid in blocks after an epoch\n  // transition that nodes MUST wait before attempting to submit a\n  // VRF proof for the next epoch\'s elections.\n  ProofSubmissionDelay int64 `json:"proof_delay,omitempty"`\n\n  // PrevState is the VRF state from the previous epoch, for the\n  // current epoch\'s elections.\n  PrevState *PrevVRFState `json:"prev_state,omitempty"`\n}\n\n// PrevVRFState is the previous epoch\'s VRF state that is to be used for\n// elections.\ntype PrevVRFState struct {\n  // Pi is the accumulated pi_string (VRF proof) outputs for the\n  // previous epoch.\n  Pi map[signature.PublicKey]*signature.Proof `json:"pi.omitempty"`\n\n  // CanElectCommittees is true iff the previous alpha was generated\n  // from high quality input such that committee elections are possible.\n  CanElectCommittees bool `json:"can_elect,omitempty"`\n}\n\n'})}),"\n",(0,s.jsx)(n.h3,{id:"consensus-state-events-and-transactions",children:"Consensus State, Events, and Transactions"}),"\n",(0,s.jsx)(n.p,{children:"The scheduler component will maintain and make available the following additonal\nconsensus state."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-golang",children:'// VRFState is the VRF scheduler state.\ntype VRFState struct {\n  // Epoch is the epoch for which this alpha is valid.\n  Epoch EpochTime `json:"epoch"`\n\n  // Alpha is the active VRF alpha_string input.\n  Alpha []byte `json:"alpha"`\n\n  // Pi is the accumulated pi_string (VRF proof) outputs.\n  Pi map[signature.PublicKey]*signature.Proof `json:"pi,omitempty"`\n\n  // AlphaIsHighQuality is true iff the alpha was generated from\n  // high quality input such that elections will be possible.\n  AlphaIsHighQuality bool `json:"alpha_hq"`\n\n  // SubmitAfter is the block height after which nodes may submit\n  // VRF proofs for the current epoch.\n  SubmitAfter int64 `json:"submit_after"`\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"Implementations MAY cache the beta_string values that are generated from valid\npi_strings for performance reasons, however as this is trivial to recalculate,\nit does not need to be explicitly exposed."}),"\n",(0,s.jsx)(n.p,{children:"Upon epoch transition, the scheduler will emit the following event."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-golang",children:'// VRFEvent is the VRF scheduler event.\ntype VRFEvent struct {\n  // Epoch is the epoch that Alpha is valid for.\n  Epoch EpochTime `json:"epoch,omitempty"`\n\n  // Alpha is the active VRF alpha_string input.\n  Alpha []byte `json:"alpha,omitempty"`\n\n  // SubmitAfter is the block height after which nodes may submit\n  // VRF proofs for the current epoch.\n  SubmitAfter int64 `json:"submit_after"`\n}\n\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-golang",children:'type VRFProve struct {\n  // Epoch is the epoch that this VRF proof is for.\n  Epoch epochtime.EpochTime `json:"epoch"`\n\n  // Pi is the VRF proof for the current epoch.\n  Pi     []byte              `json:"pi"`\n}\n'})}),"\n",(0,s.jsx)(n.h3,{id:"vrf-operation",children:"VRF Operation"}),"\n",(0,s.jsx)(n.p,{children:"For the genesis epoch, let the VRF alpha_string input be derived as:"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:'TupleHash256((chain_context, I2OSP(epoch,8)), 256, "oasis-core:vrf/alpha")'})}),"\n",(0,s.jsx)(n.p,{children:"For every subsequent epoch, let alpha_string be derived as:"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:'TupleHash256((chain_context, I2OSP(epoch, 8), beta_0, ... beta_n), 256, "oasis-core:vrf/alpha")'})}),"\n",(0,s.jsx)(n.p,{children:'where beta_0 through beta_n are the beta_string outputs gathered from\nall valid pi_strings submitted during the previous epoch (after the\non-transition culling is complete), in ascending lexographic order by\nVRF key.  If the number of beta values incorporated into the TupleHash\ncomputation is greater than or equal to AlphaHighQuality threshold,\nthe alpha is considered "strong", and committee elections are allowed\nbased on the proofs generated with this alpha.  If the alpha value is\nweak (insufficient nodes submitted proofs), only validator elections\nare allowed.'}),"\n",(0,s.jsxs)(n.p,{children:["Upon receiving a VRFEvent, all eligible nodes MUST wait a minimum of\nProofSubmissionDelay blocks, and then submit a VRFProve transaction,\nwith the Proof field set to the output of\n",(0,s.jsx)(n.code,{children:"ECVRF_prove(VRFKey_private, alpha_string)"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Upon receiving a VRFProve transaction, the scheduler does the following:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Rejects the transaction if less than ProofSubmissionDelay blocks\nhave elapsed since the transition into the current epoch."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Checks to see if the node tentatively eligible to be included in\nthe next election according to the following criteria:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Not frozen."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Has registered the VRF.ID used to generate the proof prior\nto the transition into the current epoch (May slash)."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Has not already submitted a proof for the current epoch\n(May slash if proof is different)."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Validates the proof, and if valid, stores the VRF.ID + pi_string\nin the consensus state."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"vrf-committee-elections",children:"VRF Committee Elections"}),"\n",(0,s.jsx)(n.p,{children:"The following changes are made to the committee election process."}),"\n",(0,s.jsx)(n.p,{children:"On epoch transition, as long as the alpha used to generate the proofs\nis considered strong re-validate node eligibility for all nodes that\nsubmitted a VRF proof (Not frozen, VRF.ID has not changed), and cull\nproofs from nodes that are now ineligible."}),"\n",(0,s.jsx)(n.p,{children:"If the alpha value is considered weak, no commitee elections are allowed."}),"\n",(0,s.jsx)(n.p,{children:"For each committee:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Filter the node list based on the current stake/eligibility criteria,\nand additionally filter out nodes that have not submitted a valid\nVRF proof."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"For each eligible (node, commitee kind, committe role) tuple, derive\na sortition string as:"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:'s_n = TupleHash256((chain_context, I2OSP(epoch, 8), runtime_id, I2OSP(kind, 1), I2OSP(role, 1), beta_n), 256, "oasis-core:vrf/committee")'})}),"\n",(0,s.jsxs)(n.ol,{start:"3",children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Sort s_0 ... s_n in ascending lexographical order."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Select the requisite nodes that produced the sortition strings\nstarting from the head of the sorted list as the committee."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Committee elections MUST be skipped for the genesis and subsequent epoch,\nas the genesis epoch has no VRF proofs, and proofs submitted during the\ngenesis epoch are based on the bootstrap alpha_string."}),"\n",(0,s.jsx)(n.h3,{id:"vrf-validator-elections",children:"VRF Validator Elections"}),"\n",(0,s.jsx)(n.p,{children:"The only place where the beacon is currently used in the validator selection\nprocess is to pick a single node out of multiple eligible nodes controlled by\nthe same entity to become a validator."}),"\n",(0,s.jsx)(n.p,{children:"When this situation occurs the validator is selected as follows:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"For all validator-eligible nodes controlled by the given entity,\nderive a sortition string as:"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:'s_n = TupleHash256((chain_context, I2OSP(epoch, 8), beta_n), 256, "oasis-core:vrf/validator")'})}),"\n",(0,s.jsxs)(n.ol,{start:"2",children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Sort s_0 ... s_n, in ascending lexographic order."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Select the node that produced the 0th sortition string in the sorted\nlist as the validator."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"This is safe to do with beta values generated via the bootstrap alpha string\nas it is up to the entity running the nodes in question as to which ones\nare a validator anyway."}),"\n",(0,s.jsx)(n.p,{children:"As a concession for the transition process, if the number of validators\nthat submit proofs is less than the minimum number of validators configured\nin the scheduler, validator tie-breaks (and only validator tie-breaks)\nwill be done by permuting the node list (as in the current PVSS beacon),\nusing entropy from the block hash."}),"\n",(0,s.jsx)(n.p,{children:"As nodes are required to submit a VRF public key as part of non-genesis\nregistrations, and each node will attempt to submit a VRF proof, this\nbackward compatibility hack should only be triggered on the genesis\nepoch, and can be removed on the next major upgrade."}),"\n",(0,s.jsx)(n.h3,{id:"timekeeping-changes",children:"Timekeeping Changes"}),"\n",(0,s.jsx)(n.p,{children:"Timekeeping will go back to a fixed-interval epoch transition mechanism, with\nall of the beacon related facilities removed.  As this is primarily a module\nrename and code removal, the exact details are left unspecified."}),"\n",(0,s.jsx)(n.h2,{id:"consequences",children:"Consequences"}),"\n",(0,s.jsx)(n.h3,{id:"positive",children:"Positive"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"This is significantly simpler from a design standpoint."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"This is significantly faster and scales significantly better."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"It is possible to go back to fixed-length epochs again."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"negative",children:"Negative"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"The system loses a way to generate entropy at the consensus layer."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"The simple design involves an additional 1-epoch period after network\ninitialization where elections are not available."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"neutral",children:"Neutral"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"I need to implement TupleHash256."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"references",children:"References"})]})}function d(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var i=t(96540);const s={},o=i.createContext(s);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);