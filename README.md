# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

This page will automatically be deployed once you commit your changes to the `main` branch.

### Broken Link Checker

Docusaurus already checks for any broken internal link. To check all the links
of the site running locally including the external ones:

1. configure page url in docusaurus.config.js to http://localhost
2. ```yarn build```
3. spin up a web server and host the static site at http://localhost
4. ```yarn blc```

Some external URLs appear to be receiving wrong 200-ish HTTP code despite
opening correctly in the browser. Exclude those links manually from the broken
link checker in `package.json`.
