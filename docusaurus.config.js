// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const editUrlFunction = require('./src/editUrl.js').editLinkUrl
const crossRepoLinksPlugin = require('./src/remark/cross-repo-links');
const codeBlockSnippetsPlugin = require('./src/remark/code-block-snippets').plugin;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Oasis Documentation',
  tagline: '',
  url: process.env.URL ?? 'https://docs.oasis.io',
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
          beforeDefaultRemarkPlugins: [codeBlockSnippetsPlugin],
          remarkPlugins: [
            crossRepoLinksPlugin,
            [
              require('@docusaurus/remark-plugin-npm2yarn'),
              {
                sync: true,                 // Sync the tab page across the whole docs website.
                converters:['pnpm','yarn'], // Package managers to use.
              },
            ],
          ],
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
      require('./redirects.js'),
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
            label: 'Use Oasis',
            to: '/general/',
            activeBaseRegex: '/general/',
            position: 'left',
          },
          {
            label: 'Create dApp',
            to: '/dapp/',
            activeBaseRegex: '/dapp/',
            position: 'left',
          },
          {
            label: 'Get Involved',
            to: '/get-involved/',
            position: 'left',
            activeBaseRegex: `/get-involved/`,
          },
          {
            label: 'Run Node',
            to: '/node/',
            activeBaseRegex: '/node/',
            position: 'left',
          },
          {
            label: 'Build ParaTime',
            to: '/paratime/',
            activeBaseRegex: '/paratime/',
            position: 'left',
          },
          {
            label: 'Develop Core',
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
                href: 'https://oasis.io/discord',
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
        additionalLanguages: ['rust', 'toml', 'solidity'],
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
