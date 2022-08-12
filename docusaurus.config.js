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
        id: 'operators',
        path: 'docs/operators',
        breadcrumbs: false,
        showLastUpdateTime: true,
        routeBasePath: 'operators',
        sidebarPath: require.resolve('./sidebarsOperators.js'),
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
        redirects: [
          {
            to: '/operators/',
            from: '/general/run-a-node/node-operator-overview',
          },
        ],
        createRedirects(existingPath) {
          if (existingPath.includes('/adrs')) {
            return [existingPath.replace('/adrs', '/oasis-core/adr')];
          }
          if (existingPath.includes('/operators')) {
            return [existingPath.replace('/operators', '/general/run-a-node')];
          }
          const roseToEvm = '/general/manage-tokens/how-to-transfer-rose-into-evm-paratime';
          if (existingPath.includes(roseToEvm)) {
            return [existingPath.replace(roseToEvm, roseToEvm.replace('evm', 'emerald'))];
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
            label: 'General',
            type: 'doc',
            position: 'left',
            docId: 'README',
          },
          {
            label: 'Node Operators',
            to: '/operators/',
            activeBaseRegex: '/operators/',
            position: 'left',
          },
          {
            label: 'Developers', // dApps, ParaTimes
            to: '/general/developer-resources/overview',
            activeBaseRegex: '/general/developer-resources/',
            position: 'left',
          },
          {
            label: 'Core', // oasis-core, ADRs
            to: '/oasis-core/',
            position: 'left',
            activeBaseRegex: `/oasis-core/`,
          },
          {
            href: 'https://github.com/oasisprotocol',
            position: 'right',
            className: 'header-github-link',
            title: 'GitHub repository',
            'aria-label': 'GitHub repository',
          },
          {
            href: 'https://oasisprotocol.org/',
            position: 'right',
            className: 'header-www-link',
            title: 'Oasis Protocol Foundation website',
            'aria-label': 'Oasis Protocol Foundation website',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Support',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/pJdWeVtmHT',
              },
            ],
          },
          {
            title: 'Watch us',
            items: [
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/channel/UC35UFPcZ2F1wjPxhPrSsESQ',
              },
            ],
          },
        ],
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
