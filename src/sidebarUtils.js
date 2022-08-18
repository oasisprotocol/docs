// @ts-check
import {useDocsSidebar} from "@docusaurus/theme-common";

/**
 * Builds an index of document id => sidebar item.
 * If the item is external link, href is used as document id.
 * For category item with associated document, trailing slashes are trimmed.
 * For category item without associated document, the label is taken as document id.
 *
 *  @param {import('@docusaurus/plugin-content-docs').PropSidebar} sidebarItems
 */
function reindex(sidebarItems) {
    for (const item of sidebarItems) {
        globalThis.sidebarItemsMap[item.docId ?? (item.href ? item.href.replace(/\/$/g, '') : item.label)] = item;
        if (item.type === 'category') {
            reindex(item.items)
        }
    }
}

/**
 * Finds sidebar item object in the general sidebar given the document id, href
 * or label.
 */
export function findGeneralSidebarItem(docId) {
    const sidebar = useDocsSidebar();
    if (!sidebar) {
        throw new Error('Unexpected: cant find current sidebar in context');
    }
    if (globalThis.sidebarItemsMap === undefined) {
        globalThis.sidebarItemsMap = {};
        reindex(sidebar.items);
    }
    if (globalThis.sidebarItemsMap[docId] === undefined) {
        console.log('Registered sidebar items:');
        console.log(globalThis.sidebarItemsMap);
        throw new Error('Unexpected: document with id '+docId+' does not exist.');
    }
    return globalThis.sidebarItemsMap[docId];
}

/**
 * Returns link to external plugin-content-docs module for the given href and label.
 *
 * @param label DocCard label
 * @param href Link
 * @returns {import('@docusaurus/plugin-content-docs').PropSidebarItemLink}
 */
export function newItem(label, href) {
    return {
      type: 'link',
      label: label,
      href: href,
    };
}
