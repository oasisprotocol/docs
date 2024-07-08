import {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export const sidebarDapp: SidebarsConfig = {
  developers: [
    {
      type: 'doc',
      label: 'Overview',
      id: 'dapp/README',
    },
    {
      type: 'category',
      label: 'Sapphire',
      link: {
        type: 'doc',
        id: 'dapp/sapphire/README',
      },
      items: [
        'dapp/sapphire/quickstart',
        'dapp/sapphire/guide',
        'dapp/sapphire/browser',
        'dapp/sapphire/authentication',
        'dapp/sapphire/gasless',
        'dapp/sapphire/addresses',
        'dapp/sapphire/deployment',
        'dapp/sapphire/security',
        {
          type: 'link',
          label: 'TypeScript API',
          href: 'https://api.docs.oasis.io/js/sapphire-paratime',
        },
        {
          type: 'link',
          label: 'Solidity API',
          href: 'https://api.docs.oasis.io/sol/sapphire-contracts',
        },
      ],
    },
    {
      type: 'category',
      label: 'Oasis Privacy Layer',
      link: {
        type: 'doc',
        id: 'dapp/opl/README',
      },
      items: [
        'dapp/opl/introduction',
        'dapp/opl/setup',
        'dapp/opl/host',
        'dapp/opl/enclave',
        'dapp/opl/build',
        'dapp/opl/frontend',
      ],
    },
    {
      type: 'category',
      label: 'Cipher',
      link: {
        type: 'doc',
        id: 'dapp/cipher/README',
      },
      items: [
        'dapp/cipher/prerequisites',
        'dapp/cipher/hello-world',
        'dapp/cipher/confidential-smart-contract',
        {
          type: 'link',
          label: 'Rust API',
          href: 'https://api.docs.oasis.io/rust/oasis_contract_sdk',
        },
      ],
    },
    {
      type: 'category',
      label: 'Emerald',
      link: {
        type: 'doc',
        id: 'dapp/emerald/README',
      },
      items: [
        'dapp/emerald/writing-dapps-on-emerald',
        'dapp/emerald/integrating-band-oracle-smart-contract',
      ],
    },
  ],
};
