# Oasis Docs

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

Docusaurus already checks all internal links if they are broken.

To check all the links, including the external ones, using a local Oasis Docs
deployment, do the following:

1. Set `config.url` parameter in `docusaurus.config.js` to
   `'http://localhost:3000/'`.

2. Generate the static site using:

   ```
   yarn build
   ```

3. Serve the static site in the `build` directory locally using:

   ```
   yarn serve
   ```

4. Run broken link checker in a new terminal with:

   ```
   yarn blc
   ```

_NOTE: Some external URLs appear to be receiving wrong 200-ish HTTP code despite
opening correctly in the browser. Exclude those links manually from the broken
link checker in `package.json`._
