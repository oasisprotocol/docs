// @ts-check
import type {Transformer} from 'unified';
import {viewLinkUrl} from '../editUrl';
import * as fs from "fs";
import * as path from "path";
import type mdast from 'mdast'
import {visit} from 'unist-util-visit';

// File name of the markdown file which references external code snippet.
let mdFilePath = "";

/**
 * This plugin searches for ![code](source-file) pattern and replaces it with the code block
 * containing the content of the source-file. It also supports importing specific lines of code or
 * regions inside the source file defined by #region and #endregion literals.
 *
 * Examples:
 * ![code](../examples/my-example/shell-dump.txt)
 * ![code go](../examples/my-example/src/main.go)
 * ![code go](../examples/my-example/src/server.go "src/server.go")
 * ![code go](../examples/my-example/src/server.go#L3)
 * ![code go](../examples/my-example/src/server.go#L5-L11 "src/server.go")
 * ![code go](../examples/my-example/src/account.go#native-account "Structure of the Native account")
 */
export function plugin(): Transformer {
    function transform(tree: mdast.Node) {
        visit(tree, ['paragraph'], visitor);
    }

    return (root, vfile) => {
        mdFilePath = vfile.history[0];
        transform(root);
    }
}

/**
 * Find paragraph -> image pattern and perform the replacement.
 */
export function visitor(untypedNode: mdast.Node): asserts untypedNode is mdast.Code {
    const node = untypedNode as Omit<mdast.Paragraph, 'type'> & mdast.Code
    if (!node.children || node.children.length != 1 || node.children[0].type != 'image') return;
    const imgNode = node.children[0];
    if (!imgNode?.alt?.startsWith("code")) return;

    // Move code block in place of the paragraph node.
    // @ts-expect-error Ignore that field is typed as required.
    delete node.children;

    node.type = 'code';

    // Check for language as the second argument. e.g. ![code rust](some-file.rs)
    node.lang = imgNode.alt.split(" ")[1];

    // Use image title for the code block title.
    if (imgNode.title) {
        node.meta = `title="${imgNode.title}"`;
    }

    // Highlight line numbers, if {some-range,and,some,more,lines} syntax used.
    const lineNumber = imgNode.alt.match(/(\{.*\})/g);
    if (lineNumber) {
        node.meta = lineNumber[0] + (node.meta?" "+node.meta:"");
    }

    // Source filename can have fragment symbol # followed by the line number(s) or region name.
    const [relSrcFilePath, fragment] = imgNode.url.split("#");

    // Resolve symlink (if any) and use that as the base for the source file path.
    // This is useful when the markdown file is in external submodule and so should be the source.
    let srcFilePath = relSrcFilePath;
    if (mdFilePath) {
        srcFilePath = path.join(path.dirname(fs.realpathSync(mdFilePath)), relSrcFilePath);
    }

    const code = fs.readFileSync(srcFilePath, 'utf-8');
    // @ts-expect-error TODO: code block can't link to source
    node.url = viewLinkUrl(srcFilePath);

    // Remove trailing newline, if any.
    let snippet = code.replace(/\n$/, "");

    // Check, if fragment matches line number or region name inside the file.
    if (fragment) {
        // From-to range of line numbers.
        let range;
        const linesParts = /L(\d+)(-L(\d+))?/.exec(fragment);
        if (linesParts) {
            // Fragment contains either single line number (e.g. L14) or the range (e.g. L10-L23).
            range = [
                parseInt(linesParts[1]),
                parseInt(linesParts[3] ?? linesParts[1]),
            ];
        } else {
            // Fragment references region with #region and #endregion literals.
            range = [
                code.split('\n').findIndex((line) => line.endsWith(`#region ${fragment}`)) + 2,
                code.split('\n').findIndex((line) => line.endsWith(`#endregion ${fragment}`)),
            ];
            if (range[0] == 1) throw new ReferenceError(`"#region ${fragment}" not found`);
            if (range[1] == -1) throw new ReferenceError(`"#endregion ${fragment}" not found`);
            if (range[0] > range[1]) throw new ReferenceError(`"#region ${fragment}" appears after "#endregion ${fragment}"`);
        }

        // Append line numbers to source URL (even if region was initially provided).
        // @ts-expect-error TODO: code block can't link to source
        node.url += `#L${range[0]}-L${range[1]}`;

        const snippetLines = snippet.split('\n');
        if (snippetLines.length < range[1]) {
            throw new ReferenceError(`lines ${range[0]}:${range[1]} out of range in file ${srcFilePath}`);
        }

        // -1 for 1-based numbering.
        snippet = snippetLines.slice(range[0] - 1, range[1]).join('\n');
    }

    node.value = snippet;
}
