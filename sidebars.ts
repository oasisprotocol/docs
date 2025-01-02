import {SidebarsConfig} from '@docusaurus/plugin-content-docs';

import {sidebarAdrs} from './sidebarAdrs';
import {sidebarCore} from './sidebarCore';
import {sidebarBuild} from './sidebarBuild';
import {sidebarGeneral} from './sidebarGeneral';
import {sidebarGetInvolved} from './sidebarGetInvolved';
import {sidebarNode} from './sidebarNode';
import {sidebarParaTime} from './sidebarParatime';

const sidebars: SidebarsConfig = {
  ...sidebarAdrs,
  ...sidebarCore,
  ...sidebarBuild,
  ...sidebarGeneral,
  ...sidebarGetInvolved,
  ...sidebarNode,
  ...sidebarParaTime,
};

export default sidebars;
