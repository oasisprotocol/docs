import {SidebarsConfig} from '@docusaurus/plugin-content-docs';

import {sidebarAdrs} from './sidebarAdrs';
import {sidebarCore} from './sidebarCore';
import {sidebarDapp} from './sidebarDapp';
import {sidebarGeneral} from './sidebarGeneral';
import {sidebarGetInvolved} from './sidebarGetInvolved';
import {sidebarNode} from './sidebarNode';
import {sidebarParaTime} from './sidebarParatime';
import {sidebarROFL} from './sidebarRofl';

const sidebars: SidebarsConfig = {
  ...sidebarAdrs,
  ...sidebarCore,
  ...sidebarDapp,
  ...sidebarGeneral,
  ...sidebarGetInvolved,
  ...sidebarNode,
  ...sidebarParaTime,
  ...sidebarROFL,
};

export default sidebars;
