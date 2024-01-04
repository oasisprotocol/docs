import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import {editLinkUrl as editUrlFunction} from './src/editUrl';
import crossRepoLinksPlugin from './src/remark/cross-repo-links';
import {plugin as codeBlockSnippetsPlugin} from './src/remark/code-block-snippets';
import {redirectsOptions} from './redirects';

const config: Config = {
  title: 'Oasis Documentation',
  tagline: '',
  url: process.env.URL ?? 'https://docs.oasis.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',

  organizationName: 'oasisprotocol', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
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
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
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
      redirectsOptions,
    ],
  ],
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexBlog: false,
        docsRouteBasePath: '/',
      } satisfies import('@easyops-cn/docusaurus-search-local').PluginOptions,
    ],
  ],
  themeConfig:
    {
      navbar: {
        title: 'Oasis Docs',
        logo: {
          alt: 'OPF Logo',
          src: 'img/logo.png',
          // Uncomment src and style below to enable christmas mode ;)
          //src: 'img/logo_christmas.png',
          //style: {height: '48px', 'max-width': '58px', 'margin-top': '-15px', 'margin-left': '-15px'},
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
        links: [
          {
            title: 'General',
            items: [
              {
                label: 'Explorer',
                to: 'https://explorer.oasis.io',
              },
              {
                label: 'Wallet',
                to: 'https://wallet.oasis.io',
              },
              {
                label: 'CLI',
                to: 'https://github.com/oasisprotocol/cli',
              },
              {
                label: 'Status',
                to: 'https://status.oasis.io',
              },
            ],
          },
          {
            title: 'dApp',
            items: [
              {
                label: 'Testnet Faucet',
                to: 'https://faucet.testnet.oasis.dev/',
              },
              {
                label: 'Playground',
                to: 'https://playground.oasis.io/',
              },
              {
                label: 'API',
                to: 'https://api.docs.oasis.io/',
              },
            ],
          },
          {
            title: 'Node',
            items: [
              {
                label: 'Mainnet',
                to: 'node/mainnet/',
              },
              {
                label: 'Testnet',
                to: 'node/testnet/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                to: 'https://oasis.io/discord',
              },
              {
                label: 'Youtube',
                to: 'https://www.youtube.com/channel/UC35UFPcZ2F1wjPxhPrSsESQ',
              },
              {
                label: 'GitHub',
                to: 'https://github.com/oasisprotocol',
              },
            ],
          },
        ],
        copyright: `
<p xmlns:cc="http://creativecommons.org/ns#" >Copyright © ${new Date().getFullYear()}
by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://oasisprotocol.org">
Oasis Protocol Foundation</a>.
Unless otherwise specified, all text and images on this website are licensed
under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
target="_blank" rel="license noopener noreferrer" style="display:inline-block;">
CC BY 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
src="/img/cc.svg"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
src="/img/by.svg"></a>.
This does not include the Oasis software and the code examples, both of which are
licensed under <a href="https://www.apache.org/licenses/LICENSE-2.0"
target="_blank" rel="license noopener noreferrer" style="display:inline-block;">
Apache 2.0</a>. Built with &#x2665; and Docusaurus.</p>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['diff', 'rust', 'solidity', 'toml'],
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
    } satisfies Preset.ThemeConfig,
};

module.exports = config;
