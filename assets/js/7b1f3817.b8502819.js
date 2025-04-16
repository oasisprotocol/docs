"use strict";(self.webpackChunkdocs_oasis_io=self.webpackChunkdocs_oasis_io||[]).push([[7532],{58601:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>d,default:()=>a,frontMatter:()=>l,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"adrs/0002-go-modules-compatible-git-tags","title":"ADR 0002: Go Modules Compatible Git Tags","description":"Component","source":"@site/docs/adrs/0002-go-modules-compatible-git-tags.md","sourceDirName":"adrs","slug":"/adrs/0002-go-modules-compatible-git-tags","permalink":"/adrs/0002-go-modules-compatible-git-tags","draft":false,"unlisted":false,"editUrl":"https://github.com/oasisprotocol/adrs/edit/main/0002-go-modules-compatible-git-tags.md","tags":[],"version":"current","lastUpdatedAt":1736244914000,"frontMatter":{},"sidebar":"adrs","previous":{"title":"ADR 0001: Multiple Roots Under the Tendermint Application Hash","permalink":"/adrs/0001-tm-multi-root-apphash"},"next":{"title":"ADR 0003: Consensus/Runtime Token Transfer","permalink":"/adrs/0003-consensus-runtime-token-transfer"}}');var i=s(74848),r=s(28453);const l={},d="ADR 0002: Go Modules Compatible Git Tags",o={},c=[{value:"Component",id:"component",level:2},{value:"Changelog",id:"changelog",level:2},{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Decision",id:"decision",level:2},{value:"Alternatives",id:"alternatives",level:2},{value:"Consequences",id:"consequences",level:2},{value:"Positive",id:"positive",level:3},{value:"Negative",id:"negative",level:3},{value:"References",id:"references",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"adr-0002-go-modules-compatible-git-tags",children:"ADR 0002: Go Modules Compatible Git Tags"})}),"\n",(0,i.jsx)(n.h2,{id:"component",children:"Component"}),"\n",(0,i.jsx)(n.p,{children:"Oasis Core"}),"\n",(0,i.jsx)(n.h2,{id:"changelog",children:"Changelog"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"2020-09-04: Initial version"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"status",children:"Status"}),"\n",(0,i.jsx)(n.p,{children:"Accepted"}),"\n",(0,i.jsx)(n.h2,{id:"context",children:"Context"}),"\n",(0,i.jsxs)(n.p,{children:["Projects that depend on ",(0,i.jsx)(n.a,{href:"https://pkg.go.dev/mod/github.com/oasisprotocol/oasis-core/go",children:"Oasis Core's Go module"}),", i.e.\n",(0,i.jsx)(n.code,{children:"github.com/oasisprotocol/oasis-core/go"}),", need a way to depend on its particular\nversion."]}),"\n",(0,i.jsxs)(n.p,{children:["Go Modules only allow ",(0,i.jsx)(n.a,{href:"https://semver.org/spec/v2.0.0.html",children:"Semantic Versioning 2.0.0"})," for\n",(0,i.jsx)(n.a,{href:"https://golang.org/ref/mod#versions",children:"versioning of the modules"})," which makes it hard to work\nwith ",(0,i.jsx)(n.a,{href:"/core/versioning",children:"Oasis Core's CalVer (calendar versioning) scheme"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"The currently used scheme for Go Modules compatible Git tags is:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"go/v0.YY.MINOR[.MICRO]\n"})}),"\n",(0,i.jsx)(n.p,{children:"where:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"YY"})," represents the short year (e.g. ",(0,i.jsx)(n.code,{children:"19"}),", ",(0,i.jsx)(n.code,{children:"20"}),", ",(0,i.jsx)(n.code,{children:"21"}),", ...),"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"MINOR"})," represents the minor version starting with zero (e.g. ",(0,i.jsx)(n.code,{children:"0"}),", ",(0,i.jsx)(n.code,{children:"1"}),", ",(0,i.jsx)(n.code,{children:"2"}),",\n",(0,i.jsx)(n.code,{children:"3"}),", ...),"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"MICRO"}),' represents the final number in the version (sometimes referred to as\nthe "patch" segment) (e.g. ',(0,i.jsx)(n.code,{children:"0"}),", ",(0,i.jsx)(n.code,{children:"1"}),", ",(0,i.jsx)(n.code,{children:"2"}),", ",(0,i.jsx)(n.code,{children:"3"}),", ...)."]}),"\n",(0,i.jsxs)(n.p,{children:["If the ",(0,i.jsx)(n.code,{children:"MICRO"})," version is ",(0,i.jsx)(n.code,{children:"0"}),", it is omitted."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["It turns out this only works for Oasis Core versions with the ",(0,i.jsx)(n.code,{children:"MICRO"})," version\nof ",(0,i.jsx)(n.code,{children:"0"})," since the Go Modules compatible Git tag omits the ",(0,i.jsx)(n.code,{children:".MICRO"})," part and is\nthus compatible with ",(0,i.jsx)(n.a,{href:"https://golang.org/ref/mod#versions",children:"Go Modules versioning requirements"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"decision",children:"Decision"}),"\n",(0,i.jsx)(n.p,{children:"The proposed design is to tag Oasis Core releases with the following Go Modules\ncompatible Git tags (in addition to the ordinary Git tags):"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"go/v0.YY0MINOR.MICRO\n"})}),"\n",(0,i.jsx)(n.p,{children:"where:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"YY"})," represents the short year (e.g. ",(0,i.jsx)(n.code,{children:"19"}),", ",(0,i.jsx)(n.code,{children:"20"}),", ",(0,i.jsx)(n.code,{children:"21"}),", ...),"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"0MINOR"})," represents the zero-padded minor version starting with zero (e.g.\n",(0,i.jsx)(n.code,{children:"00"}),", ",(0,i.jsx)(n.code,{children:"01"}),", ",(0,i.jsx)(n.code,{children:"02"}),", ..., ",(0,i.jsx)(n.code,{children:"10"}),", ",(0,i.jsx)(n.code,{children:"11"}),", ...),"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"MICRO"}),' represents the final number in the version (sometimes referred to as\nthe "patch" segment) (e.g. ',(0,i.jsx)(n.code,{children:"0"}),", ",(0,i.jsx)(n.code,{children:"1"}),", ",(0,i.jsx)(n.code,{children:"2"}),", ",(0,i.jsx)(n.code,{children:"3"}),", ...)."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Here are some examples of how the ordinary and the corresponding Go Modules\ncompatible Git tags would look like:"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"center"},children:"Version"}),(0,i.jsx)(n.th,{style:{textAlign:"center"},children:"Ordinary Git tag"}),(0,i.jsx)(n.th,{style:{textAlign:"center"},children:"Go Modules compatible Git tag"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"20.9"}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"v20.9"})}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"go/v0.2009.0"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"20.9.1"}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"v20.9.1"})}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"go/v0.2009.1"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"20.9.2"}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"v20.9.2"})}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"go/v0.2009.2"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"20.10"}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"v20.10"})}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"go/v0.2010.0"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"20.10.1"}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"v20.10.1"})}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"go/v0.2010.1"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"20.10.2"}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"v20.10.2"})}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"go/v0.2010.2"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"..."}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"..."}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"..."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"21.0"}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"v21.0"})}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"go/v0.2100.0"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"21.0.1"}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"v21.0.1"})}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"go/v0.2100.1"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"21.0.2"}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"v21.0.2"})}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"go/v0.2100.2"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"21.1"}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"v21.1"})}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"go/v0.2101.0"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"21.1.1"}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"v21.1.1"})}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"go/v0.2101.1"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"21.1.2"}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"v21.1.2"})}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.code,{children:"go/v0.2101.2"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"..."}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"..."}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:"..."})]})]})]}),"\n",(0,i.jsxs)(n.p,{children:["Using such a scheme makes the version of the Oasis Core Go module fully\ncompatible with the ",(0,i.jsx)(n.a,{href:"https://golang.org/ref/mod#versions",children:"Go Modules versioning requirements"})," and thus\nenables users to use the familiar Go tools to check for new module versions,\ni.e. ",(0,i.jsx)(n.code,{children:"go list -m -u all"}),", or to obtain and require a module, i.e.\n",(0,i.jsx)(n.code,{children:"go get github.com/oasisprotocol/oasis-core/go@latest"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"alternatives",children:"Alternatives"}),"\n",(0,i.jsx)(n.p,{children:"An alternative scheme would be to use the following Go Modules compatible Git\ntags:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"go/v0.YY.MINOR-MICRO\n"})}),"\n",(0,i.jsx)(n.p,{children:"where:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"YY"})," represents the short year (e.g. ",(0,i.jsx)(n.code,{children:"19"}),", ",(0,i.jsx)(n.code,{children:"20"}),", ",(0,i.jsx)(n.code,{children:"21"}),", ...),"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"MINOR"})," represents the minor version starting with zero (e.g. ",(0,i.jsx)(n.code,{children:"0"}),", ",(0,i.jsx)(n.code,{children:"1"}),", ",(0,i.jsx)(n.code,{children:"2"}),",\n",(0,i.jsx)(n.code,{children:"3"}),", ...),"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"MICRO"}),' represents the final number in the version (sometimes referred to as\nthe "patch" segment) (e.g. ',(0,i.jsx)(n.code,{children:"0"}),", ",(0,i.jsx)(n.code,{children:"1"}),", ",(0,i.jsx)(n.code,{children:"2"}),", ",(0,i.jsx)(n.code,{children:"3"}),", ...)."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Using the ",(0,i.jsx)(n.code,{children:"-MICRO"})," suffix would make Go treat all such versions as a\n",(0,i.jsx)(n.a,{href:"https://golang.org/ref/mod#glos-pre-release-version",children:"Go Modules pre-release version"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"The consequence of that would be that all Go tools would treat such versions as\npre-releases."}),"\n",(0,i.jsx)(n.p,{children:"For example, let's say the Oasis Core Go module would have the following Go\nversion tags:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"go/v0.20.9"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"go/v0.20.10-0"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"go/v0.20.10-1"})}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["and a module that depends on the Oasis Core Go module would currently require\nversion ",(0,i.jsx)(n.code,{children:"v0.20.9"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["One downside would be that the ",(0,i.jsx)(n.code,{children:"go list -m -u all"})," command would not notify a\nuser that an update, i.e. version ",(0,i.jsx)(n.code,{children:"v0.20.10-1"}),", is available."]}),"\n",(0,i.jsxs)(n.p,{children:["The second downside would be that using the\n",(0,i.jsx)(n.code,{children:"go get github.com/oasisprotocol/oasis-core/go@latest"})," command would treat\nversion ",(0,i.jsx)(n.code,{children:"v0.20.9"})," as the latest version and download and require this version of\nthe Oasis Core Go module instead of the real latest version,  ",(0,i.jsx)(n.code,{children:"v0.20.10-1"})," in\nthis example."]}),"\n",(0,i.jsx)(n.h2,{id:"consequences",children:"Consequences"}),"\n",(0,i.jsx)(n.h3,{id:"positive",children:"Positive"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["This allow users to depend on a bugfix/patch release of the Oasis Core Go\nmodule in a ",(0,i.jsx)(n.a,{href:"https://golang.org/ref/mod#versions",children:"Go Modules versioning requirements"})," compatible way,\ni.e. without having to resort to pinning the requirement to a particular\nOasis Core commit."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"negative",children:"Negative"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"The connection between an ordinary Git tag and a Go Modules compatible Git tag\nis not very obvious."}),"\n",(0,i.jsxs)(n.p,{children:["For example, it might not be immediately obvious that ",(0,i.jsx)(n.code,{children:"v21.0"})," and\n",(0,i.jsx)(n.code,{children:"go/v0.2100.0"})," refer to the same thing."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Using a zero-padded minor version fixed to two characters would limit the\nnumber of releases in a year to 100 releases."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"references",children:"References"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/dgraph-io/badger",children:"BadgerDB"})," uses a ",(0,i.jsx)(n.a,{href:"https://github.com/dgraph-io/badger/releases",children:"similar scheme for tagging Go Modules compatible Git tags"}),"\nfor their CalVer versioning scheme."]}),"\n"]})]})}function a(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>d});var t=s(96540);const i={},r=t.createContext(i);function l(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);