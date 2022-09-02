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
          breadcrumbs: false,
          editUrl: editUrlFunction,
          exclude: ['adrs/README.md', 'adrs/0000-architectural-decision-records.md', 'adrs/template.md'],
          numberPrefixParser: false,
          path: 'docs',
          remarkPlugins: [crossRepoLinksPlugin],
          routeBasePath: '/',
          showLastUpdateTime: true,
          sidebarPath: require.resolve('./sidebars.js'),
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
      '@docusaurus/plugin-client-redirects',
      /** @type {import('@docusaurus/plugin-client-redirects').PluginOptions} */
      ({
        redirects: [
          {
            to: '/general/manage-tokens/how-to-transfer-rose-into-paratime',
            from: [
              '/general/manage-tokens/how-to-transfer-rose-into-emerald-paratime', // #171 Add sapphire docs
              '/general/manage-tokens/how-to-transfer-rose-into-evm-paratime', // #200 Restructure docs
            ],
          },
          // #200 Restructure docs
          {
            to: '/core/development-setup/',
            from: ['/oasis-core/development-setup/build-environment-setup-and-building', '/oasis-core/development-setup/running-tests-and-development-networks']
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
            to: '/operators/',
            from: '/general/run-a-node/node-operator-overview',
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
            to: '/operators/run-your-node/archive-node',
            from: '/general/set-up-your-node/run-archive-node'
          },
          {
            to: '/operators/run-your-node/ias-proxy',
            from: '/general/set-up-your-node/run-an-ias-proxy'
          },
          {
            to: '/operators/run-your-node/non-validator-node',
            from: '/general/set-up-your-node/run-non-validator'
          },
          {
            to: '/operators/run-your-node/paratime-client-node',
            from: '/general/set-up-your-node/run-a-paratime-client-node'
          },
          {
            to: '/operators/run-your-node/paratime-node',
            from: '/general/set-up-your-node/run-a-paratime-node'
          },
          {
            to: '/operators/run-your-node/seed-node',
            from: '/general/set-up-your-node/run-seed-node'
          },
          {
            to: '/operators/run-your-node/sentry-node',
            from: '/general/set-up-your-node/sentry-node-architecture'
          },
          {
            to: '/operators/run-your-node/validator-node/',
            from: ['/general/set-up-your-node/run-validator', '/general/set-up-your-node/creating-an-entity-package']
          },
          {
            to: '/operators/run-your-node/validator-node/amend-commission-schedule',
            from: '/general/set-up-your-node/amend-commission-schedule'
          },
          {
            to: '/operators/run-your-node/validator-node/governance',
            from: '/general/set-up-your-node/governance'
          },
          {
            to: '/operators/run-your-node/troubleshooting',
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
          if (existingPath.includes('/operators/run-your-node/advanced')) {
            return [existingPath.replace('/operators/run-your-node/advanced', '/general/run-a-node/advanced')];
          }
          if (existingPath.includes('/operators/run-your-node/prerequisites')) {
            return [existingPath.replace('/operators/run-your-node/prerequisites', '/general/run-a-node/prerequisites')];
          }
          if (existingPath.includes('/operators/run-your-node/maintenance')) {
            return [existingPath.replace('/operators/run-your-node/maintenance', '/general/run-a-node/maintenance-guides')];
          }
          if (existingPath.includes('/developers/emerald')) {
            return [existingPath.replace('/developers/emerald', '/general/developer-resources/emerald-paratime')];
          }
          if (existingPath.includes('/developers/sapphire')) {
            return [existingPath.replace('/developers/sapphire', '/general/developer-resources/sapphire-paratime')];
          }
          if (existingPath.includes('/developers/sdk')) {
            return [existingPath.replace('/developers/sdk', '/oasis-sdk')];
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
            to: '/general/',
            activeBaseRegex: '/general/',
            position: 'left',
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
