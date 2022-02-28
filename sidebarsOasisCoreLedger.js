// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  oasisSdk: [
    {
      type: 'doc',
      label: 'Introduction to Oasis Core Ledger',
      id: 'README',
    },
    {
      type: 'category',
      label: 'Usage',
      collapsible: false,
      items: [
        'usage/setup',
        'usage/address',
        'usage/entity',
        'usage/transactions',
        'usage/wallets',
      ],
    },
    {
      type: 'category',
      label: 'Processes',
      collapsible: false,
      items: [
        'versioning',
        'release-process',
      ],
    },
  ],
};

module.exports = sidebars;
