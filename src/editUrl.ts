import * as path from "path";
import * as fs from "fs";
import type { EditUrlFunction } from '@docusaurus/plugin-content-docs'

const gitModules = {
    'external/adrs/': 'https://github.com/oasisprotocol/adrs/{mode}/main/',
    'external/cli/': 'https://github.com/oasisprotocol/cli/{mode}/master/',
    'external/oasis-core/': 'https://github.com/oasisprotocol/oasis-core/{mode}/stable/24.2.x/',
    'external/oasis-sdk/': 'https://github.com/oasisprotocol/oasis-sdk/{mode}/main/',
    'external/sapphire-paratime/': 'https://github.com/oasisprotocol/sapphire-paratime/{mode}/main/',
};

/**
 * Generates cross-repo edit URL link.
 */
export const editLinkUrl: EditUrlFunction = (params) => {
    const relFilepath = path.join(params.versionDocsDirPath, params.docPath);
    return linkUrl(relFilepath, 'edit');
}

/**
 * Generates cross-repo view URL link (e.g. for viewing example sources).
 */
export function viewLinkUrl(relFilePath: string) {
    return linkUrl(relFilePath, 'blob');
}

function linkUrl(filename: string, mode: string) {
    // Resolve composed paths and symlinks, if needed.
    filename = fs.realpathSync(filename);

    // Obtain relative filename to project root.
    filename = path.relative(process.cwd(), filename)

    let r: keyof typeof gitModules
    for (r in gitModules) {
        if (filename.startsWith(r)) {
            // Extract relative filename inside the git submodule.
            return filename.replace(r, gitModules[r]).replace("{mode}", mode);
        }
    }

    return `https://github.com/oasisprotocol/docs/{mode}/main/${filename}`.replace("{mode}", mode);

}
