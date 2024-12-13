# Oasis Docs

![CI tests status](https://github.com/oasisprotocol/docs/actions/workflows/ci-test.yml/badge.svg)
![CI links status](https://github.com/oasisprotocol/docs/actions/workflows/ci-links.yml/badge.svg)
![Deployment status](https://github.com/oasisprotocol/docs/actions/workflows/deploy-main.yml/badge.svg)

This repository contains Oasis Docs deployed at <https://docs.oasis.io/>.

They are built using [Docusaurus 2](https://docusaurus.io/), a modern static
website generator.

## Installation

Install Node packages with:

```
yarn
```

Checkout all Git submodules with:

```
git submodule update --init
```

## Local Development

To start the local development server, use:

```
yarn start
```

This command will start a local development server. Open your browser at
<http://localhost:3000/> to load the site.

Most changes will be reflected live without having to restart the server.

## Build

To generate the static site, use:

```
yarn build
```

This will generate the static content in the `build` directory. Its contents
can be served using any static content hosting service.

## Deployment

Docs will be automatically re-generated and re-deployed once a pull request is
merged into the `main` branch.

## Broken Link Checker

Docusaurus already checks all internal links when running `yarn build`.

To also check all external links using a local Oasis Docs instance, do the
following:

1. Specify URL env variable and generate the static site:

   ```
   URL=http://localhost:3000/ yarn build
   ```

2. Serve the static site locally:

   ```
   yarn serve --no-open
   ```

3. Run broken link checker in a new terminal with:

   ```
   yarn blc
   ```

_NOTE: Some external URLs appear to be receiving wrong 200-ish HTTP code despite
opening correctly in the browser. Exclude those links manually from the broken
link checker in `package.json`._

## Guidelines for writing Oasis docs

### Documentation structure

`docs` folder contains markdown files of the documentation. Each subfolder
represents a documentation **part** (general, node, build, paratime, core etc.).
Each markdown file inside a part corresponds to a **chapter** (subchapter for a
markdown file inside a subfolder) and each subtitle of a chapter is called a
**section** (subsection etc.).

Some parts may contain markdown files or folders hosted and maintained in other
Oasis repositories (e.g. oasis-sdk, oasis-core). In this case, a complete git
submodule for the repository is cloned inside `external` folder. Then, symbolic
links to specific markdown files or folders are added inside `docs`
accordingly.

While all markdown files inside `docs` are compiled, not all files may be
reachable via sidebars directly. Each top-level chapter defines own
sidebar structure inside their `sidebarChapterName.ts` file.

Nouns, adjectives and verbs in the titles should be capitalized.

### index.md, README.md, overview.md

Please use `README.md` as the filename for introductory chapters.

Introductory chapters should not have a separate entry in the sidebar, but
should be accessible by clicking on the category link directly.

### Referencing documents between the top-level chapters

Markdown files hosted by this repository should:

- reference markdown files in the same or any other chapter by a relative
  path e.g.
  `../howto-use-wallet.md`.
  `../../../operators/set-up-your-node.md`

Symlinked Markdown files hosted by other Oasis repositories should:

- reference markdown files in the same repository by a relative path e.g.
  `../howto-write-contract.md`.
- reference markdown files in other repositories by using github.com URL e.g.
  `https://github.com/oasisprotocol/docs/blob/main/docs/general/mainnet/damask-upgrade.md`

This way, the documentation of each external repository is self-contained and no
broken links should exist. When the submodules are wrapped inside the Oasis
docs and compiled, the github.com URLs will be rewritten into the corresponding
documentation links by the markdown preprocessor (remark plugin).

### DocCards

DocCards are attractive elements commonly used in the introductory
chapters and *See also* or *Read more* sections. Apart from the built-in
docusaurus `<DocCardList />` helper which prints all items in the category, you
can also list specific items by calling our `findSidebarItem()` helper passing
the href of the target page.

`DocCardList` will show two DocCards per row while the `DocCard` component
will span horizontally over the whole site resembling page links in gitbook.

Please fill the `description:` frontmanner for chapters which are referenced in
the DocCards.

### Code snippets from files

You can make code blocks show a code stored in external files, by using the
`code` literal as the first word inside the image alt field. For example:

```markdown
![code](../../examples/somefile.go)
```

`code-block-snippets` remark plugin will replace the image syntax above with
the code block syntax and import the referenced file.

Additionally, you can specify the language, code title and lines of code or the
region name:

```markdown
![code go](../../examples/somefile.go "Some external file")
![code go](../../examples/somefile.go#L14 "Line 14 in the file")
![code go](../../examples/somefile.go#L14-L16 "Lines 14-16 in the file")
![code go](../../examples/somefile.go#some-region "Some external file region")
```

To define the region in the referenced file put `#region some-region-name` and
`#endregion some-region-name` as a comment line.

Highlighting specific lines also work by passing the list of lines and/or line
ranges as a third parameter:

```markdown
![code go {5-8,13,21}](../../examples/somefile.go)
```

### Backward compatibility

When you move, rename or delete previously published content, make sure that
**any previously valid URL will always point to the new valid location**. Set
up redirects in `redirects.ts` accordingly and leave the pull request
number in the comment which added this redirection for future reference, if
major rewrite is to happen and the developers would need more context around
the redirection.

### Images

There are three kinds of image assets used in the docs.

1. Screenshots, photos, non-technical figures go into `images/` folder
   on the part-level (i.e. `docs/build/images`). External repositories may use
   own images in their respective folder.
2. [Mermaid](https://mermaid-js.github.io) diagrams (preferred tool for
   sequence diagrams, flowcharts and other technical material) live in
   `diagrams/` folder of the respective part or the external repository. Diagram
   sources reside in the .mmd files. To generate .svg which can be used in the
   markdown run `yarn diagrams`. Both .svg and .mmd files should be stored in
   git. CI will check that they are always in sync.
3. Other diagrams which cannot be designed with Mermaid are drawn in
   [diagrams.net](https://diagrams.net) and then stored locally inside
   `images/` folder along other images. When exporting the diagram, don't
   forget to tick the "Include a copy of my diagram" checkbox so that the
   diagram source will be stored along in the .svg file and you will
   be able to edit it in the future.

## Vocabulary

The following is a consistent case-sensitive collection of Oasis-related terms,
and their usage including the articles:

- Bech32
- c10l
  Check out the c10l-hello-world folder for the confidential version of the
  original example.
- c13y
  EVM with added c13y.
- CBOR
- Cipher
- consensus layer
  The consensus layer makes sure that the ParaTimes tick.
- Ed25519
  The consensus layer only supports the Ed25519 signature scheme.
- Emerald
- dApp
  Sapphire supports writing dApps. DApp is a modern distributed application.
- key manager
- key manager node
- Mainnet
  This feature is also enabled on Mainnet.
- Testnet
  This only runs on Testnet.
- Oasis CLI
  You can use the Oasis CLI to set up your wallet.
- Oasis Core
- Oasis Network
  The Oasis Network is a proof-of-stake network.
- OPL
  Oasis Privacy Layer supports privacy of dApps on all EVM chains.
- ParaTime
  Each ParaTime stores its own state separate from the consensus state.
- ParaTime layer
  The ParaTime layer supports up to a thousand runtimes running in parallel.
- ROSE
  Please send 10.00000000 ROSE to the address above.
- ROSE Wallet
  Since this is not supported by MetaMask, please use the ROSE Wallet instead.
- runtime
- Sapphire
- secp256k1
  The Koblitz curve secp256k1 parameters are deterministic.
- Sr25519
- TEST
  Please send 10.00000000 TEST to the address above.
- trusted execution environment
- validator
- validator node
- Wasm
- Web3 gateway
  We strongly suggest that you set up your own Web3 gateway for your Sapphire
  endpoint.

## License

The Oasis documentation software and code snippets inside the documentation are
licensed under [Apache 2.0](./LICENSE).

The content of the documentation (the `/docs` folder) including the media (e.g.
images and diagrams) is licensed under [Creative Commons Attribution 4.0
International](./LICENSE-docs).
