# Oasis Docs

![CI tests status](https://github.com/oasisprotocol/docs/actions/workflows/ci-test.yml/badge.svg)
![CI links status](https://github.com/oasisprotocol/docs/actions/workflows/ci-links.yml/badge.svg)
![Deployment status](https://github.com/oasisprotocol/docs/actions/workflows/deploy-main.yml/badge.svg)

This repository contains Oasis Docs deployed at <https://docs.oasis.dev/>.

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
represents one of the top-level chapter (general, node, dapp, paratime, core
etc.).

Some top-level chapter may contain markdown files or folders hosted and
maintained in other Oasis repositories (e.g. oasis-sdk, oasis-core). In this
case, a complete git submodule for the repository is cloned inside `external`
folder. Then, symbolic links to specific markdown files or folders are added
inside `docs` accordingly.

While all markdown files inside `docs` are compiled, not all files may be
reachable via sidebars directly. Each top-level chapter defines own
sidebar structure inside their `sidebarChapterName.js` file.

### index.md, README.md, overview.md

Please use `README.md` as the filename for introductory category chapter.

Introductory chapters should not have a separate entry in the sidebar, but
should be accessible by clicking on the category link directly.

### Referencing documents between the top-level chapters

Markdown files hosted by this repository should:

- reference markdown files in the same or any other chapter by a relative
  path e.g.
  `../howto-use-wallet.md`.
  `../../../operators/set-up-your-node.md`

Markdown files hosted by other Oasis repositories should:

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

### Backward compatibility

When you move, rename or delete previously published content, make sure that
**any previously valid URL will always point to the new valid location**. Set
up redirects in `redirects.js` accordingly and leave the pull request
number in the comment which added this redirection for future reference, if
major rewrite is to happen and the developers would need more context around
the redirection.
