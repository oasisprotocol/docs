// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  oasisSdk: [
    {
      type: 'doc',
      label: 'Introduction to Oasis SDK',
      id: 'index',
    },
    {
      type: 'category',
      label: 'Smart Contracts',
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'contract/getting-started',
          label: 'Build a Smart Contract',
        },
        'contract/hello-world',
      ],
    },
    {
      type: 'category',
      label: 'Runtimes',
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'runtime/getting-started',
          label: 'Build a Runtime',
        },
        'runtime/minimal-runtime',
        'runtime/modules',
        'runtime/reproducibility',
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
};

module.exports = sidebars;
