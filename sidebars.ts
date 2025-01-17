import {SidebarsConfig} from '@docusaurus/plugin-content-docs';

import {sidebarAdrs} from './sidebarAdrs';
import {sidebarCore} from './sidebarCore';
import {sidebarBuild} from './sidebarBuild';
import {sidebarGeneral} from './sidebarGeneral';
import {sidebarGetInvolved} from './sidebarGetInvolved';
import {sidebarNode} from './sidebarNode';

const sidebars: SidebarsConfig = {
  ...sidebarAdrs,
  ...sidebarCore,
  ...sidebarBuild,
  ...sidebarGeneral,
  ...sidebarGetInvolved,
  ...sidebarNode,
};

export default sidebars;
