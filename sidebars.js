// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  ...require('./sidebarGeneral.js'),
  ...require('./sidebarOperators.js'),
  ...require('./sidebarDevelopers.js'),
  ...require('./sidebarCore.js'),
  ...require('./sidebarOasisCoreLedger.js'),
  ...require('./sidebarAdrs.js'),
};

module.exports = sidebars;
