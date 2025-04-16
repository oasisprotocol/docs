"use strict";(self.webpackChunkdocs_oasis_io=self.webpackChunkdocs_oasis_io||[]).push([[8600],{25685:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"core/consensus/services/keymanager","title":"Key Manager","description":"The key manager service is responsible for coordinating the SGX-based key","source":"@site/docs/core/consensus/services/keymanager.md","sourceDirName":"core/consensus/services","slug":"/core/consensus/services/keymanager","permalink":"/core/consensus/services/keymanager","draft":false,"unlisted":false,"editUrl":"https://github.com/oasisprotocol/oasis-core/edit/stable/24.2.x/docs/consensus/services/keymanager.md","tags":[],"version":"current","lastUpdatedAt":1734693498000,"frontMatter":{},"sidebar":"oasisCore","previous":{"title":"Root Hash","permalink":"/core/consensus/services/roothash"},"next":{"title":"Genesis Document","permalink":"/core/consensus/genesis"}}');var o=s(74848),i=s(28453);const a={},r="Key Manager",c={},d=[{value:"Policies",id:"policies",level:2},{value:"Methods",id:"methods",level:2},{value:"Update Policy",id:"update-policy",level:3},{value:"Events",id:"events",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"key-manager",children:"Key Manager"})}),"\n",(0,o.jsx)(n.p,{children:"The key manager service is responsible for coordinating the SGX-based key\nmanager runtimes. It stores and publishes policy documents and status updates\nrequired for key manager replication."}),"\n",(0,o.jsxs)(n.p,{children:["The service interface definition lives in ",(0,o.jsx)(n.a,{href:"https://github.com/oasisprotocol/oasis-core/tree/master/go/keymanager/api",children:(0,o.jsx)(n.code,{children:"go/keymanager/api"})}),". It defines the\nsupported queries and transactions. For more information you can also check out\nthe ",(0,o.jsx)(n.a,{href:"https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/keymanager/api?tab=doc",children:"consensus service API documentation"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"policies",children:"Policies"}),"\n",(0,o.jsx)(n.p,{children:"A key manager policy document defines the policy that key manager\nimplementations use to enforce access control to key material. At this point the\npolicy document is specifically designed to work with our Intel SGX-based key\nmanager runtime."}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.a,{href:"https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/keymanager/api?tab=doc#PolicySGX",children:"policy document"})," specifies the following access control policies that are\nenforced by the key manager runtime based on the calling enclave identity:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Enclaves that may query private keys."})," These are usually enclave identities\nof confidential runtimes that need access to per-runtime private keys to\ndecrypt state."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Enclaves that may replicate the master secret."})," These are usually enclave\nidentities of new key manager enclave versions, to support upgrades. Own\nenclave identity is implied (to allow key manager replication) and does not\nneed to be explicitly specified."]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"In order for the policy to be valid and accepted by a key manager enclave it\nmust be signed by a configured threshold of keys. Both the threshold and the\nauthorized public keys that can sign the policy are hardcoded in the key manager\nenclave."}),"\n",(0,o.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,o.jsx)(n.h3,{id:"update-policy",children:"Update Policy"}),"\n",(0,o.jsxs)(n.p,{children:["Policy update enables the key manager runtime owning entity to update the\ncurrent key manager policy. A new update policy transaction can be generated\nusing ",(0,o.jsx)(n.a,{href:"https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/keymanager/api?tab=doc#NewUpdatePolicyTx",children:(0,o.jsx)(n.code,{children:"NewUpdatePolicyTx"})}),"."]}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"Method name:"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"keymanager.UpdatePolicy\n"})}),"\n",(0,o.jsxs)(n.p,{children:["The body of an update policy transaction must be a ",(0,o.jsx)(n.a,{href:"https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/keymanager/api?tab=doc#SignedPolicySGX",children:(0,o.jsx)(n.code,{children:"SignedPolicySGX"})})," which is\na signed key manager access control policy. The signer of the transaction must\nbe the key manager runtime's owning entity."]}),"\n",(0,o.jsx)(n.h2,{id:"events",children:"Events"})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>r});var t=s(96540);const o={},i=t.createContext(o);function a(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);