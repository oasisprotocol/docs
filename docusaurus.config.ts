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
  favicon: 'img/favicon.svg',

  // Tailwind from CDN + classnames like shadcn
  // TODO: try https://github.com/namnguyenthanhwork/docusaurus-tailwind-shadcn-template/blob/main/src/plugins/tailwind-config.js#L5
  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.1.11/dist/index.global.min.js',
      integrity: 'sha384-A1XhMANHciQ8ED89Ap5K0zOdmQKiEeXSjaN0sakNxIzq9Z2YfXV/BwHp7oP3z5ip',
      crossorigin: 'anonymous',
      async: true,
    },
  ],
  headTags: [
    {
      tagName: 'style',
      attributes: {
        type: 'text/tailwindcss',
      },
      innerHTML: `
        /* From https://github.com/oasisprotocol/ui-library/blob/master/src/styles/global.css */
        @import "tailwindcss";

        @custom-variant dark (&:is(.dark *));

        :root {
          --background: hsl(0 0% 100%);
          --foreground: hsl(240 6% 10%);
          --card: hsl(0 0% 98%);
          --card-foreground: hsl(240 10% 4%);
          --popover: hsl(0 0% 100%);
          --popover-foreground: hsl(240 10% 4%);
          --primary: hsl(241 100% 44%);
          --primary-foreground: hsl(0 0% 98%);
          --secondary: hsl(240 5% 96%);
          --secondary-foreground: hsl(240 6% 10%);
          --muted: hsl(240 5% 96%);
          --muted-foreground: hsl(240 4% 46%);
          --accent: hsl(240 5% 96%);
          --accent-foreground: hsl(240 6% 10%);
          --destructive: hsl(0 84% 60%);
          --destructive-foreground: hsl(0 86% 97%);
          --border: hsl(240 6% 90%);
          --input: hsl(240 6% 90%);
          --ring: hsl(240 6% 10%);
          --chart-1: hsl(209 100% 81%);
          --chart-2: hsl(217 100% 72%);
          --chart-3: hsl(211 100% 50%);
          --chart-4: hsl(233 100% 54%);
          --chart-5: hsl(241 100% 44%);
          --sidebar: hsl(0 0% 100%);
          --sidebar-background: hsl(0 0% 100%);
          --sidebar-foreground: hsl(240 5% 26%);
          --sidebar-primary: hsl(240 6% 10%);
          --sidebar-primary-foreground: hsl(0 0% 98%);
          --sidebar-accent: hsl(240 5% 96%);
          --sidebar-accent-foreground: hsl(240 6% 10%);
          --sidebar-border: hsl(220 13% 91%);
          --sidebar-ring: hsl(240 5% 65%);
          --success: hsl(161 94% 30%);
          --error: hsl(0 72% 51%);
          --warning: hsl(21 90% 48%);

          --radius: 0.5rem;
        }

        .dark {
          --background: hsl(240 10% 4%);
          --foreground: hsl(0 0% 98%);
          --card: hsl(240 6% 10%);
          --card-foreground: hsl(0 0% 98%);
          --popover: hsl(240 10% 4%);
          --popover-foreground: hsl(0 0% 98%);
          --primary: hsl(209 100% 81%);
          --primary-foreground: hsl(240 10% 4%);
          --secondary: hsl(240 4% 16%);
          --secondary-foreground: hsl(0 0% 98%);
          --muted: hsl(240 4% 16%);
          --muted-foreground: hsl(240 5% 65%);
          --accent: hsl(240 4% 16%);
          --accent-foreground: hsl(0 0% 98%);
          --destructive: hsl(0 74% 42%);
          --destructive-foreground: hsl(0 86% 97%);
          --border: hsl(240 4% 16%);
          --input: hsl(240 4% 16%);
          --ring: hsl(240 5% 84%);
          --chart-1: hsl(241 100% 44%);
          --chart-2: hsl(233 100% 54%);
          --chart-3: hsl(211 100% 50%);
          --chart-4: hsl(217 100% 72%);
          --chart-5: hsl(209 100% 81%);
          --sidebar: hsl(240 10% 4%);
          --sidebar-background: hsl(240 10% 4%);
          --sidebar-foreground: hsl(240 5% 96%);
          --sidebar-primary: hsl(224 76% 48%);
          --sidebar-primary-foreground: hsl(0 0% 100%);
          --sidebar-accent: hsl(240 4% 16%);
          --sidebar-accent-foreground: hsl(240 5% 96%);
          --sidebar-border: hsl(240 4% 16%);
          --sidebar-ring: hsl(240 5% 84%);
          --success: hsl(158 64% 52%);
          --error: hsl(0 91% 71%);
          --warning: hsl(27 96% 61%);

          --radius: 0.5rem;
        }

        @theme inline {
          --color-background: var(--background);
          --color-foreground: var(--foreground);
          --color-card: var(--card);
          --color-card-foreground: var(--card-foreground);
          --color-popover: var(--popover);
          --color-popover-foreground: var(--popover-foreground);
          --color-primary: var(--primary);
          --color-primary-foreground: var(--primary-foreground);
          --color-secondary: var(--secondary);
          --color-secondary-foreground: var(--secondary-foreground);
          --color-muted: var(--muted);
          --color-muted-foreground: var(--muted-foreground);
          --color-accent: var(--accent);
          --color-accent-foreground: var(--accent-foreground);
          --color-destructive: var(--destructive);
          --color-destructive-foreground: var(--destructive-foreground);
          --color-border: var(--border);
          --color-input: var(--input);
          --color-ring: var(--ring);
          --color-chart-1: var(--chart-1);
          --color-chart-2: var(--chart-2);
          --color-chart-3: var(--chart-3);
          --color-chart-4: var(--chart-4);
          --color-chart-5: var(--chart-5);
          --color-sidebar: var(--sidebar);
          --color-sidebar-background: var(--sidebar-background);
          --color-sidebar-foreground: var(--sidebar-foreground);
          --color-sidebar-primary: var(--sidebar-primary);
          --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
          --color-sidebar-accent: var(--sidebar-accent);
          --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
          --color-sidebar-border: var(--sidebar-border);
          --color-sidebar-ring: var(--sidebar-ring);
          --color-success: var(--success);
          --color-error: var(--error);
          --color-warning: var(--warning);

          --radius-sm: calc(var(--radius) - 4px);
          --radius-md: calc(var(--radius) - 2px);
          --radius-lg: var(--radius);
          --radius-xl: calc(var(--radius) + 4px);
        }

        @layer base {
          * {
            @apply border-border outline-ring/50;
          }

          body {
            @apply bg-background text-foreground;
          }

          button:not([disabled]),
          [role="button"]:not([disabled]) {
            cursor: pointer;
          }
        }

        /* Based on https://github.com/oasisprotocol/ui-library/blob/master/src/components/ui/card.tsx */
        .card {
          @apply bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm;
        }
        .card-header {
          @apply @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6;
        }
        .card-title {
          @apply leading-none font-semibold;
        }
        .card-description {
          @apply text-muted-foreground text-sm;
        }
        .card-action {
          @apply col-start-2 row-span-2 row-start-1 self-start justify-self-end;
        }
        .card-content {
          @apply px-6;
        }
        .card-footer {
          @apply flex items-center px-6 [.border-t]:pt-6;
        }
      `,
    },
  ],


  organizationName: 'oasisprotocol', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  onBrokenLinks: process.env.NETLIFY ? 'warn' : 'throw',
  onBrokenAnchors: process.env.NETLIFY ? 'warn' : 'throw',
  onBrokenMarkdownLinks: process.env.NETLIFY ? 'warn' : 'throw',

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
        logo: {
          alt: 'Oasis Docs',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg', // Workaround for browsers that don't support @media (prefers-color-scheme: dark) in external SVGs.
          // Uncomment src and style below to enable christmas mode ;)
          //src: 'img/logo_christmas.svg',
          //srcDark: 'img/logo_christmas_dark.svg',
          //style: {marginTop: '-13px', marginLeft: '-10px', height: '3rem'},
        },
        items: [
          {
            label: 'Use Oasis',
            to: '/general/',
            activeBaseRegex: '/general/',
            position: 'left',
          },
          {
            label: 'Build',
            to: '/build/',
            activeBaseRegex: '/build/',
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
            href: 'https://oasis.net/',
            position: 'right',
            className: 'header-www-link',
            title: 'Oasis website',
            'aria-label': 'Oasis website',
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
            title: 'Build',
            items: [
              {
                label: 'Testnet Faucet',
                to: 'https://faucet.testnet.oasis.io/',
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
                label: 'Telegram',
                to: 'https://t.me/oasisprotocolcommunity',
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
by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://oasis.net">
Oasis Protocol Foundation</a>. We <a href="https://oasisprotocol.org/privacy-policy" target="_blank" rel="noopener noreferrer">respect your privacy</a>.
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
        additionalLanguages: ['diff', 'rust', 'solidity', 'toml', 'ini'],
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
    } satisfies Preset.ThemeConfig,
    customFields: {
      NODE_ENV: process.env.NODE_ENV,
      REACT_APP_FATHOM_SITE_ID: process.env.REACT_APP_FATHOM_SITE_ID,
    }
};

module.exports = config;
