// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  developers: [
    'dapp/README',
    {
      type: 'category',
      label: 'Emerald ParaTime',
      link: {
        type: 'doc',
        id: 'dapp/emerald/README',
      },
      items: [
        'dapp/emerald/writing-dapps-on-emerald',
        'dapp/emerald/integrating-band-oracle-smart-contract',
      ],
    },
    {
      type: 'category',
      label: 'Sapphire ParaTime',
      link: {
        type: 'doc',
        id: 'dapp/sapphire/README',
      },
      items: [
        'dapp/sapphire/writing-dapps-on-sapphire',
      ],
    },
    {
      type: 'category',
      label: 'Cipher ParaTime',
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
          href: 'https://api.docs.oasis.dev/oasis-sdk/oasis_contract_sdk',
        },
        {
          type: 'link',
          label: 'Go API',
          href: 'https://pkg.go.dev/github.com/oasisprotocol/oasis-sdk/client-sdk/go/client',
        }
      ],
    },
  ],
};

module.exports = sidebars;
