import {SidebarsConfig} from '@docusaurus/plugin-content-docs';

import {sidebarAdrs} from './sidebarAdrs';
import {sidebarCore} from './sidebarCore';
import {sidebarDapp} from './sidebarDapp';
import {sidebarGeneral} from './sidebarGeneral';
import {sidebarGetInvolved} from './sidebarGetInvolved';
import {sidebarNode} from './sidebarNode';
import {sidebarParaTime} from './sidebarParatime';

const sidebars: SidebarsConfig = {
  ...sidebarAdrs,
  ...sidebarCore,
  ...sidebarDapp,
  ...sidebarGeneral,
  ...sidebarGetInvolved,
  ...sidebarNode,
  ...sidebarParaTime,
};

export default sidebars;
