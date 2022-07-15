// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Oasis Network Documentation',
  tagline: '',
  url: process.env.URL ?? 'https://docs.oasis.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',

  organizationName: 'oasisprotocol', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs/general',
          breadcrumbs: false,
          showLastUpdateTime: true,
          routeBasePath: 'general',
          sidebarPath: require.resolve('./sidebarsGeneral.js'),
          editUrl: 'https://github.com/oasisprotocol/docs.oasis.dev/edit/main',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */
      ({
        id: 'oasis-network-primer',
        path: 'docs/oasis-network-primer',
        breadcrumbs: false,
        showLastUpdateTime: true,
        routeBasePath: 'oasis-network-primer',
        sidebarPath: require.resolve('./sidebarsOasisNetworkPrimer.js'),
        editUrl: 'https://github.com/oasisprotocol/docs.oasis.dev/edit/main',
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */
      ({
        id: 'oasis-core',
        path: 'external/oasis-core/docs',
        breadcrumbs: false,
        showLastUpdateTime: true,
        routeBasePath: 'oasis-core',
        sidebarPath: require.resolve('./sidebarsOasisCore.js'),
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */
      ({
        id: 'oasis-sdk',
        path: 'external/oasis-sdk/docs',
        breadcrumbs: false,
        showLastUpdateTime: true,
        routeBasePath: 'oasis-sdk',
        sidebarPath: require.resolve('./sidebarsOasisSdk.js'),
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */
      ({
        id: 'oasis-core-ledger',
        path: 'external/oasis-core-ledger/docs',
        breadcrumbs: false,
        showLastUpdateTime: true,
        routeBasePath: 'oasis-core-ledger',
        sidebarPath: require.resolve('./sidebarsOasisCoreLedger.js'),
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'adrs',
        path: 'external/adrs',
        breadcrumbs: false,
        showLastUpdateTime: true,
        routeBasePath: 'adrs',
        sidebarPath: require.resolve('./sidebarsAdrs.js'),
        numberPrefixParser: false,
      }),
    ],
    [
      '@docusaurus/plugin-client-redirects',
      /** @type {import('@docusaurus/plugin-client-redirects').PluginOptions} */
      ({
        createRedirects(existingPath) {
          if (existingPath.includes('/adrs')) {
            return [existingPath.replace('/adrs', '/oasis-core/adr')];
          }
          return undefined;
        },
      }),
    ],
  ],
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexBlog: false,
        docsRouteBasePath: '/',
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Oasis Docs',
        logo: {
          alt: 'OPF Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            href: 'https://oasisprotocol.org/',
            label: 'Home',
            position: 'left',
          },
          {
            href: 'https://discord.gg/RwNTK8t',
            label: 'Support',
            position: 'left',
          },
          {
            href: 'https://github.com/oasisprotocol',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Oasis Protocol Foundation. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['rust', 'toml'],
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
