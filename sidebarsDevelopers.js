// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  developers: [
    'README',
    {
      type: 'category',
      label: 'Emerald ParaTime',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'emerald-paratime/README',
      },
      items: [
        'emerald-paratime/writing-dapps-on-emerald',
        'emerald-paratime/integrating-band-oracle-smart-contract',
      ],
    },
    {
      type: 'category',
      label: 'Sapphire ParaTime',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'sapphire-paratime/README',
      },
      items: [
        'sapphire-paratime/writing-dapps-on-sapphire',
      ],
    },
    {
      type: 'category',
      label: 'Oasis SDK',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'sdk/index',
      },
      items: [
        {
          type: 'category',
          label: 'Smart Contracts',
          collapsible: false,
          items: [
            'sdk/contract/getting-started',
            'sdk/contract/hello-world',
            'sdk/contract/confidential-smart-contract',
          ],
        },
        {
          type: 'category',
          label: 'Runtimes',
          collapsible: false,
          items: [
            'sdk/runtime/getting-started',
            'sdk/runtime/minimal-runtime',
            'sdk/runtime/modules',
            'sdk/runtime/reproducibility',
          ],
        },
        {
          type: 'category',
          label: 'Reference',
          collapsible: false,
          items: [
            {
              type: 'link',
              label: 'Runtime SDK',
              href: 'https://api.docs.oasis.dev/oasis-sdk/oasis_runtime_sdk',
            },
            {
              type: 'link',
              label: 'Contract SDK',
              href: 'https://api.docs.oasis.dev/oasis-sdk/oasis_contract_sdk',
            },
            {
              type: 'category',
              label: 'Client SDK',
              items: [
                {
                  type: 'link',
                  label: 'Go',
                  href: 'https://pkg.go.dev/github.com/oasisprotocol/oasis-sdk/client-sdk/go/client',
                }
              ]
            }
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
