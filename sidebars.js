// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  ...require('./sidebarGeneral.js'),
  ...require('./sidebarNode.js'),
  ...require('./sidebarDapp.js'),
  ...require('./sidebarParatime.js'),
  ...require('./sidebarCore.js'),
  ...require('./sidebarOasisCoreLedger.js'),
  ...require('./sidebarAdrs.js'),
  ...require('./sidebarGetInvolved.js'),
};

module.exports = sidebars;
