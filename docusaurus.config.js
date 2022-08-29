// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const editUrlFunction = require('./src/editUrl.js')
const crossRepoLinksPlugin = require('./src/remark/cross-repo-links');

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
          remarkPlugins: [crossRepoLinksPlugin],
          routeBasePath: 'general',
          sidebarPath: require.resolve('./sidebarsGeneral.js'),
          editUrl: editUrlFunction,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    function (context, options) {
      return {
        name: 'webpack-configuration-plugin',
        configureWebpack(config, isServer, utils) {
          return {
            resolve: {
              symlinks: false,
            }
          };
        }
      };
    },
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */
      ({
        id: 'operators',
        path: 'docs/operators',
        breadcrumbs: false,
        showLastUpdateTime: true,
        remarkPlugins: [crossRepoLinksPlugin],
        routeBasePath: 'operators',
        sidebarPath: require.resolve('./sidebarsOperators.js'),
        editUrl: editUrlFunction,
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */
      ({
        id: 'developers',
        path: 'docs/developers',
        breadcrumbs: false,
        showLastUpdateTime: true,
        remarkPlugins: [crossRepoLinksPlugin],
        routeBasePath: 'developers',
        sidebarPath: require.resolve('./sidebarsDevelopers.js'),
        editUrl: editUrlFunction,
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */
      ({
        id: 'core',
        path: 'docs/core',
        breadcrumbs: false,
        showLastUpdateTime: true,
        remarkPlugins: [crossRepoLinksPlugin],
        routeBasePath: 'core',
        sidebarPath: require.resolve('./sidebarsCore.js'),
        editUrl: editUrlFunction,
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */
      ({
        id: 'oasis-core-ledger',
        path: 'docs/oasis-core-ledger',
        breadcrumbs: false,
        showLastUpdateTime: true,
        remarkPlugins: [crossRepoLinksPlugin],
        routeBasePath: 'oasis-core-ledger',
        sidebarPath: require.resolve('./sidebarsOasisCoreLedger.js'),
        editUrl: editUrlFunction,
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'adrs',
        path: 'docs/adrs',
        exclude: ['README.md', '0000-architectural-decision-records.md', 'template.md'],
        breadcrumbs: false,
        showLastUpdateTime: true,
        remarkPlugins: [crossRepoLinksPlugin],
        routeBasePath: 'adrs',
        sidebarPath: require.resolve('./sidebarsAdrs.js'),
        numberPrefixParser: false,
        editUrl: editUrlFunction,
      }),
    ],
    [
      '@docusaurus/plugin-client-redirects',
      /** @type {import('@docusaurus/plugin-client-redirects').PluginOptions} */
      ({
        redirects: [
          // #171 Add sapphire docs
          {
            to: '/general/manage-tokens/how-to-transfer-rose-into-evm-paratime',
            from: '/general/manage-tokens/how-to-transfer-rose-into-emerald-paratime',
          },
          // #200 Restructure docs
          {
            to: '/operators/',
            from: '/general/run-a-node/node-operator-overview',
          },
          {
            to: '/general/contribute-to-the-network/delegation-policy',
            from: '/general/foundation/delegation-policy'
          },
          {
            to: '/general/oasis-network/faq',
            from: '/general/faq/oasis-network-faq',
          },
          {
            to: '/general/manage-tokens/',
            from: '/general/manage-tokens/overview',
          },
          {
            to: '/general/oasis-network/',
            from: '/general/oasis-network/overview',
          },
          {
            to: '/general/oasis-network/why-oasis',
            from: '/oasis-network-primer/',
          },
          {
            to: '/general/oasis-network/token-metrics-and-distribution',
            from: '/oasis-network-primer/token-metrics-and-distribution',
          },
          {
            to: '/operators/mainnet/',
            from: '/general/oasis-network/network-parameters'
          },
          {
            to: '/operators/mainnet/upgrade-log',
            from: '/general/run-a-node/upgrade-log'
          },
          {
            to: '/operators/set-up-your-node/troubleshooting',
            from: '/general/run-a-node/troubleshooting'
          },
          {
            to: '/operators/testnet/',
            from: '/general/foundation/testnet/'
          },          {
            to: '/operators/testnet/upgrade-log',
            from: '/general/foundation/testnet/upgrade-log'
          },
        ],
        createRedirects(existingPath) {
          // #119 Add /oasis-core/adr/* -> /adrs/* redirection
          if (existingPath.includes('/adrs')) {
            return [existingPath.replace('/adrs', '/oasis-core/adr')];
          }
          // #200 Restructure docs
          if (existingPath.includes('/operators/mainnet')) {
            return [existingPath.replace('/operators/mainnet', '/general/mainnet')];
          }
          if (existingPath.includes('/operators/set-up-your-node/advanced')) {
            return [existingPath.replace('/operators/set-up-your-node/advanced', '/general/run-a-node/advanced')];
          }
          if (existingPath.includes('/operators/set-up-your-node/prerequisites')) {
            return [existingPath.replace('/operators/set-up-your-node/prerequisites', '/general/run-a-node/prerequisites')];
          }
          if (existingPath.includes('/operators/set-up-your-node/maintenance')) {
            return [existingPath.replace('/operators/set-up-your-node/maintenance', '/general/run-a-node/maintenance-guides')];
          }
          if (existingPath.includes('/operators')) {
            return [existingPath.replace('/operators', '/general/run-a-node')];
          }
          if (existingPath.includes('/developers/sdk')) {
            return [existingPath.replace('/developers/sdk', '/oasis-sdk')];
          }
          if (existingPath.includes('/developers')) {
            return [existingPath.replace('/developers', '/general/developer-resources')];
          }
          if (existingPath.includes('/core')) {
            return [existingPath.replace('/core', '/oasis-core')];
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
            to: '/developers/',
            activeBaseRegex: '/developers/',
            position: 'left',
          },
          {
            label: 'Core', // oasis-core, ADRs
            to: '/core/',
            position: 'left',
            activeBaseRegex: `/core/`,
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
