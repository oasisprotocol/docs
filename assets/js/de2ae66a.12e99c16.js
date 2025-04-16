"use strict";(self.webpackChunkdocs_oasis_io=self.webpackChunkdocs_oasis_io||[]).push([[55],{87169:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>l,frontMatter:()=>c,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"core/consensus/genesis","title":"Genesis Document","description":"The genesis document contains a set of parameters that outline the initial state","source":"@site/docs/core/consensus/genesis.md","sourceDirName":"core/consensus","slug":"/core/consensus/genesis","permalink":"/core/consensus/genesis","draft":false,"unlisted":false,"editUrl":"https://github.com/oasisprotocol/oasis-core/edit/stable/24.2.x/docs/consensus/genesis.md","tags":[],"version":"current","lastUpdatedAt":1734693498000,"frontMatter":{},"sidebar":"oasisCore","previous":{"title":"Key Manager","permalink":"/core/consensus/services/keymanager"},"next":{"title":"Transaction Test Vectors","permalink":"/core/consensus/test-vectors"}}');var o=s(74848),t=s(28453);const c={},r="Genesis Document",a={},d=[{value:"Genesis Document&#39;s Hash",id:"genesis-documents-hash",level:2},{value:"Genesis File",id:"genesis-file",level:2},{value:"Canonical Form",id:"canonical-form",level:3}];function h(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"genesis-document",children:"Genesis Document"})}),"\n",(0,o.jsxs)(n.p,{children:["The genesis document contains a set of parameters that outline the initial state\nof the ",(0,o.jsx)(n.a,{href:"/core/consensus/",children:"consensus layer"})," and its services."]}),"\n",(0,o.jsxs)(n.p,{children:["For more details about the actual genesis document's API, see\n",(0,o.jsx)(n.a,{href:"https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/genesis/api",children:"genesis API documentation"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"genesis-documents-hash",children:"Genesis Document's Hash"}),"\n",(0,o.jsx)(n.p,{children:"The genesis document's hash is computed as:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"Base16(SHA512-256(CBOR(<genesis-document>)))\n"})}),"\n",(0,o.jsx)(n.p,{children:"where:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"Base16()"})," represents the hex encoding function,"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"SHA512-256()"})," represents the SHA-512/256 hash function as described in\n",(0,o.jsx)(n.a,{href:"/core/crypto#hash-functions",children:"Cryptography"})," documentation,"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"CBOR()"})," represents the ",(0,o.jsx)(n.em,{children:"canonical"})," CBOR encoding function as described in\n",(0,o.jsx)(n.a,{href:"/core/encoding",children:"Serialization"})," documentation, and"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"<genesis-document>"})," represents a given genesis document."]}),"\n"]}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:["This should not be confused with a SHA-1 or a SHA-256 checksum of a\n",(0,o.jsx)(n.a,{href:"#genesis-file",children:"genesis file"})," that is used to check if the downloaded genesis file is correct."]})}),"\n",(0,o.jsxs)(n.p,{children:["This hash is also used for ",(0,o.jsx)(n.a,{href:"/core/crypto#chain-domain-separation",children:"chain domain separation"})," as the last\npart of the ",(0,o.jsx)(n.a,{href:"/core/crypto#domain-separation",children:"domain separation"})," context."]}),"\n",(0,o.jsx)(n.h2,{id:"genesis-file",children:"Genesis File"}),"\n",(0,o.jsx)(n.p,{children:"A genesis file is a JSON file corresponding to a serialized genesis document."}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:["For a high-level overview of the genesis file, its sections, parameters and\nthe parameter values that are used for the Oasis Network, see:\n",(0,o.jsx)(n.a,{href:"/node/genesis-doc",children:"Genesis File Overview"}),"."]})}),"\n",(0,o.jsx)(n.h3,{id:"canonical-form",children:"Canonical Form"}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.em,{children:"canonical"})," form of a genesis file is the pretty-printed JSON file with\n2-space indents ending with a newline, where:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Struct fields are encoded in the order in which they are defined in the\ncorresponding struct definitions."}),"\n",(0,o.jsxs)(n.p,{children:["The genesis document is defined by the ",(0,o.jsx)(n.a,{href:"https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/genesis/api#Document",children:(0,o.jsx)(n.code,{children:"genesis/api.Document"})})," struct which\ncontains pointers to other structs defining the genesis state of all\n",(0,o.jsx)(n.a,{href:"/core/consensus/",children:"consensus layer"})," services."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Maps have their keys converted to strings which are then encoded in\nlexicographical order."}),"\n",(0,o.jsxs)(n.p,{children:["This is Go's default behavior. For more details, see\n",(0,o.jsx)(n.a,{href:"https://golang.org/pkg/encoding/json/#Marshal",children:(0,o.jsx)(n.code,{children:"encoding/json.Marshal()"})}),"'s documentation."]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:["This should not be confused with the ",(0,o.jsx)(n.em,{children:"canonical"})," CBOR encoding of the genesis\ndocument that is used to derive the domain separation context as described\nin the ",(0,o.jsx)(n.a,{href:"#genesis-documents-hash",children:"Genesis Document's Hash"})," section."]})}),"\n",(0,o.jsxs)(n.p,{children:["This form is used to enable simple diffing/patching with the standard Unix tools\n(i.e. ",(0,o.jsx)(n.code,{children:"diff"}),"/",(0,o.jsx)(n.code,{children:"patch"}),")."]})]})}function l(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>c,x:()=>r});var i=s(96540);const o={},t=i.createContext(o);function c(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);