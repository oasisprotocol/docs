// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  oasisSdk: [
    {
      type: 'doc',
      label: 'Introduction to Oasis Core Ledger',
      id: 'oasis-core-ledger/README',
    },
    {
      type: 'category',
      label: 'Usage',
      collapsible: false,
      items: [
        'oasis-core-ledger/usage/setup',
        'oasis-core-ledger/usage/address',
        'oasis-core-ledger/usage/entity',
        'oasis-core-ledger/usage/transactions',
        'oasis-core-ledger/usage/wallets',
      ],
    },
    {
      type: 'category',
      label: 'Processes',
      collapsible: false,
      items: [
        'oasis-core-ledger/versioning',
        'oasis-core-ledger/release-process',
      ],
    },
  ],
};

module.exports = sidebars;
