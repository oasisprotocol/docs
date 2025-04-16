"use strict";(self.webpackChunkdocs_oasis_io=self.webpackChunkdocs_oasis_io||[]).push([[5592],{47981:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>l,frontMatter:()=>r,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"core/crypto","title":"Cryptography","description":"Hash Functions","source":"@site/docs/core/crypto.md","sourceDirName":"core","slug":"/core/crypto","permalink":"/core/crypto","draft":false,"unlisted":false,"editUrl":"https://github.com/oasisprotocol/oasis-core/edit/stable/24.2.x/docs/crypto.md","tags":[],"version":"current","lastUpdatedAt":1734693498000,"frontMatter":{},"sidebar":"oasisCore","previous":{"title":"Encoding","permalink":"/core/encoding"},"next":{"title":"Authenticated gRPC","permalink":"/core/authenticated-grpc"}}');var t=s(74848),o=s(28453);const r={},a="Cryptography",c={},d=[{value:"Hash Functions",id:"hash-functions",level:2},{value:"Signatures",id:"signatures",level:2},{value:"Domain Separation",id:"domain-separation",level:3},{value:"Contexts",id:"contexts",level:4},{value:"Chain Domain Separation",id:"chain-domain-separation",level:4},{value:"Envelopes",id:"envelopes",level:3},{value:"Standard Account Key Generation",id:"standard-account-key-generation",level:2}];function h(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"cryptography",children:"Cryptography"})}),"\n",(0,t.jsx)(n.h2,{id:"hash-functions",children:"Hash Functions"}),"\n",(0,t.jsxs)(n.p,{children:["In most places where cryptographic hashes are required, we use the SHA-512/256\nhash function as specified in ",(0,t.jsx)(n.a,{href:"https://csrc.nist.gov/publications/detail/fips/180/4/final",children:"FIPS 180-4"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"signatures",children:"Signatures"}),"\n",(0,t.jsxs)(n.p,{children:["All cryptographic signatures are made using the Ed25519 (pure) scheme specified\nin ",(0,t.jsx)(n.a,{href:"https://tools.ietf.org/html/rfc8032",children:"RFC 8032"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"domain-separation",children:"Domain Separation"}),"\n",(0,t.jsx)(n.p,{children:"When signing messages and verifying signatures we require the use of a domain\nseparation context in order to make sure the messages cannot be repurposed in\na different protocol."}),"\n",(0,t.jsx)(n.p,{children:"The domain separation scheme adds a preprocessing step to any signing and\nverification operation. The step computes the value that is then signed/verified\nusing Ed25519 as usual."}),"\n",(0,t.jsx)(n.p,{children:"The message to be signed is computed as follows:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"M := H(Context || Message)\n"})}),"\n",(0,t.jsx)(n.p,{children:"Where:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"H"})," is the SHA-512/256 cryptographic hash function."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"Context"})," is the domain separation context string."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"Message"})," is the original message."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["The Ed25519 signature is then computed over ",(0,t.jsx)(n.code,{children:"M"}),"."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsxs)(n.em,{children:["NOTE: While using something like Ed25519ph/ctx as specified by ",(0,t.jsx)(n.a,{href:"https://tools.ietf.org/html/rfc8032",children:"RFC 8032"})," would\nbe ideal, unfortunately these schemes are not supported in many hardware\nsecurity modules which is why we are using an ad-hoc scheme."]})}),"\n",(0,t.jsx)(n.h4,{id:"contexts",children:"Contexts"}),"\n",(0,t.jsx)(n.p,{children:"All of the domain separation contexts used in Oasis Core use the following\nconvention:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["They start with the string ",(0,t.jsx)(n.code,{children:"oasis-core/"}),","]}),"\n",(0,t.jsx)(n.li,{children:"followed by the general module name,"}),"\n",(0,t.jsxs)(n.li,{children:["followed by the string ",(0,t.jsx)(n.code,{children:": "}),","]}),"\n",(0,t.jsx)(n.li,{children:"followed by a use case description."}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["The maximum length of a domain separation context is 255 bytes to be compatible\nwith the length defined in ",(0,t.jsx)(n.a,{href:"https://tools.ietf.org/html/rfc8032",children:"RFC 8032"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"The Go implementation maintains a registry of all used contexts to make sure\nthey are not reused incorrectly."}),"\n",(0,t.jsx)(n.h4,{id:"chain-domain-separation",children:"Chain Domain Separation"}),"\n",(0,t.jsx)(n.p,{children:"For some signatures, we must ensure that the domain separation context is tied\nto the given network instance as defined by the genesis document. This ensures\nthat such messages cannot be replayed on a different network."}),"\n",(0,t.jsx)(n.p,{children:"For all domain separation contexts where chain domain separation is required,\nwe use the following additional convention:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The context is as specified by the convention in the section above,"}),"\n",(0,t.jsxs)(n.li,{children:["followed by the string ",(0,t.jsx)(n.code,{children:"for chain"}),","]}),"\n",(0,t.jsxs)(n.li,{children:["followed by the ",(0,t.jsx)(n.a,{href:"/core/consensus/genesis#genesis-documents-hash",children:"genesis document's hash"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"envelopes",children:"Envelopes"}),"\n",(0,t.jsx)(n.p,{children:"There are currently two kinds of envelopes that are used when signing CBOR\nmessages:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsxs)(n.a,{href:"https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/common/crypto/signature?tab=doc#Signed",children:["Single signature envelope (",(0,t.jsx)(n.code,{children:"Signed"}),")"]})," contains the CBOR-serialized blob in\nthe ",(0,t.jsx)(n.code,{children:"untrusted_raw_value"})," field and a single ",(0,t.jsx)(n.code,{children:"signature"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsxs)(n.a,{href:"https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/common/crypto/signature?tab=doc#MultiSigned",children:["Multiple signature envelope (",(0,t.jsx)(n.code,{children:"MultiSigned"}),")"]})," contains the CBOR-serialized\nblob in the ",(0,t.jsx)(n.code,{children:"untrusted_raw_value"})," field and multiple signatures in the\n",(0,t.jsx)(n.code,{children:"signatures"})," field."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["The envelopes are themselves CBOR-encoded. While no separate test vectors are\nprovided, ",(0,t.jsx)(n.a,{href:"/core/consensus/test-vectors",children:"those used for transactions"})," can be used as a reference."]}),"\n",(0,t.jsx)(n.h2,{id:"standard-account-key-generation",children:"Standard Account Key Generation"}),"\n",(0,t.jsxs)(n.p,{children:["When generating an ",(0,t.jsx)(n.a,{href:"/core/consensus/services/staking#accounts",children:"account"}),"'s private/public key pair, follow ",(0,t.jsx)(n.a,{href:"https://github.com/oasisprotocol/adrs/blob/master/0008-standard-account-key-generation.md",children:"ADR 0008:\nStandard Account Key Generation"}),"."]})]})}function l(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>a});var i=s(96540);const t={},o=i.createContext(t);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);