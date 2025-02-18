import {useDocsVersion} from "@docusaurus/plugin-content-docs/client";
import {PropSidebar} from "@docusaurus/plugin-content-docs";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * Builds an index of href => sidebar item.
 * Indexed sidebar items are doc, category (with defined link) and link.
 */
function reindex(sidebarItems: PropSidebar) {
    for (const item of sidebarItems) {
        const key = item.href;
        if (key && globalThis.sidebarItemsMap[key] === undefined) {
            globalThis.sidebarItemsMap[key] = item;
        }

        if (item.type === 'category') {
            reindex(item.items)
        }
    }
}

/**
 * Finds sidebar item object in the sidebars given the item's href.
 */
export function findSidebarItem(href: string) {
    const {siteConfig, siteMetadata} = useDocusaurusContext();
    const docsVersion = useDocsVersion();

    if (!docsVersion) {
        throw new Error('Unexpected: cant find docsVersion in current context');
    }

    // Build the index on the first sidebar call.
    if (globalThis.sidebarItemsMap === undefined) {
        globalThis.sidebarItemsMap = {};
        for (const s in docsVersion.docsSidebars) {
            reindex(docsVersion.docsSidebars[s]);
        }
    }

    // Throw error, if the sidebar item is still not found.
    if (globalThis.sidebarItemsMap[href] === undefined) {
        console.log(`Item ${href} not found. Registered sidebar items:`);
        console.log(globalThis.sidebarItemsMap);
        if (siteConfig.onBrokenMarkdownLinks == 'throw') {
            throw new Error(`Unexpected: sidebar item with href ${href} does not exist.`);
        } else {
            return globalThis.sidebarItemsMap['/general/']; // TODO: route to 404
        }
    }

    return globalThis.sidebarItemsMap[href];
}
