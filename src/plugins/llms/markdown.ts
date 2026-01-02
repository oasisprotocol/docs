import * as fs from 'fs';
import * as path from 'path';
import {toMarkdown as mdastToMarkdown} from 'mdast-util-to-markdown';
import {gfmToMarkdown} from 'mdast-util-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import {
  admonitionTitleToDirectiveLabel,
  escapeMarkdownHeadingIds,
} from '@docusaurus/utils/lib/markdownUtils';
import {unified} from 'unified';
import {visit} from 'unist-util-visit';
import {
  capturedTreePathForSource,
  unwrapCapturedTree,
  wrapCapturedTree,
} from './capture';
import type {MdastNode} from './types';
import {isMdastNode, PHRASING_NODE_TYPES} from './types';

// Types
export interface PermalinkDoc {
  permalink: string;
  title?: string;
  unlisted?: boolean;
  draft?: boolean;
}

type LinkTarget = 'html' | 'md';

// URL Utilities
export function normalizeTitle(value: string): string {
  return value.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function isExternalUrl(href: string): boolean {
  return href.startsWith('//') || /^[a-z][a-z0-9+.-]*:/i.test(href);
}

export function joinUrl(base: string, href: string): string {
  try {
    return new URL(href, base).toString();
  } catch {
    return href;
  }
}

export function urlForPermalink(permalink: string, siteBase?: string): string {
  const normalized = permalink.startsWith('/') ? permalink : `/${permalink}`;
  return siteBase ? joinUrl(siteBase, normalized) : normalized;
}

/**
 * Determine if a pathname should be converted to .md extension.
 * Returns true for doc-like paths, false for assets with file extensions.
 */
function shouldConvertToMarkdown(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, '');
  if (!normalized) return true;
  if (/\.(md|mdx)$/i.test(normalized)) return true;

  const lastSegment = normalized.split('/').pop() ?? '';
  // If last segment has a file extension, it's an asset - don't convert
  return !/\.[a-z0-9]+$/i.test(lastSegment);
}

/**
 * Convert a pathname to its .md equivalent.
 */
function toMarkdownPathname(pathname: string): string {
  const normalized = pathname.replace(/\/+$/, '');
  if (!normalized) return '/index.md';

  const withoutExtension = normalized.replace(/\.(md|mdx)$/i, '');

  // Handle /foo/index -> /foo.md
  if (withoutExtension.endsWith('/index')) {
    const parent = withoutExtension.slice(0, -'/index'.length) || '/';
    return parent === '/' ? '/index.md' : `${parent}.md`;
  }

  // Handle /foo/README -> /foo.md (common Docusaurus pattern)
  if (/\/readme$/i.test(withoutExtension)) {
    const parent = withoutExtension.slice(0, -'/README'.length) || '/';
    return parent === '/' ? '/index.md' : `${parent}.md`;
  }

  return `${withoutExtension}.md`;
}

/**
 * Convert a URL to its markdown mirror equivalent.
 * Handles both relative URLs and absolute URLs with siteBase.
 */
export function toMarkdownUrl(url: string, siteBase?: string): string {
  if (!url) return url;

  if (!siteBase) {
    if (isExternalUrl(url)) return url;
    try {
      const parsed = new URL(url, 'https://_/');
      if (!shouldConvertToMarkdown(parsed.pathname)) {
        return parsed.pathname + parsed.search + parsed.hash;
      }
      parsed.pathname = toMarkdownPathname(parsed.pathname);
      return parsed.pathname + parsed.search + parsed.hash;
    } catch {
      return url;
    }
  }

  try {
    const baseUrl = new URL(siteBase);
    const targetUrl = new URL(url, baseUrl);

    // Don't convert URLs on different hosts
    if (isExternalUrl(url) && targetUrl.host !== baseUrl.host) {
      return url;
    }

    if (!shouldConvertToMarkdown(targetUrl.pathname)) {
      return targetUrl.toString();
    }

    targetUrl.pathname = toMarkdownPathname(targetUrl.pathname);
    return targetUrl.toString();
  } catch {
    return url;
  }
}

/**
 * Truncate text to maxLength, preferring sentence boundaries.
 */
export function truncate(text: string, maxLength: number): string {
  const cleaned = text.trim().replace(/\s+/g, ' ');
  if (!cleaned || maxLength <= 0) return '';
  if (cleaned.length <= maxLength) return cleaned;

  const clipped = cleaned.slice(0, maxLength);

  // Try to break at sentence boundary
  const sentenceEnds = [
    clipped.lastIndexOf('. '),
    clipped.lastIndexOf('! '),
    clipped.lastIndexOf('? '),
  ];
  const lastSentenceEnd = Math.max(...sentenceEnds);

  if (lastSentenceEnd > maxLength * 0.4) {
    return cleaned.slice(0, lastSentenceEnd + 1).trim();
  }

  // Fall back to word boundary with ellipsis
  if (maxLength <= 3) return clipped.trim();

  const forEllipsis = cleaned.slice(0, maxLength - 3);
  const lastSpace = forEllipsis.lastIndexOf(' ');

  // Prefer breaking at word boundary if we're past halfway point
  const breakAtWord = lastSpace > forEllipsis.length * 0.5;
  const truncated = breakAtWord ? forEllipsis.slice(0, lastSpace) : forEllipsis;

  return truncated.trimEnd() + '...';
}

// Tree Loading
let hasLoggedFallbackParse = false;

const ADMONITION_CONTAINER_DIRECTIVES = [
  'note',
  'tip',
  'info',
  'warning',
  'danger',
  'caution',
  'example',
];

function preprocessForDocusaurusMdx(content: string): string {
  // Ensure Docusaurus custom heading IDs like `## Title {#id}` don't break MDX 2
  // parsing ("Could not parse expression with acorn").
  let processed = escapeMarkdownHeadingIds(content);

  // Add support for legacy Docusaurus admonition titles like `:::tip Title`.
  // remark-directive expects `:::tip[Title]`.
  processed = admonitionTitleToDirectiveLabel(
    processed,
    ADMONITION_CONTAINER_DIRECTIVES,
  );

  return processed;
}

function atomicWriteJson(filename: string, payload: unknown): void {
  const dir = path.dirname(filename);
  const base = path.basename(filename);
  const tempFile = path.join(dir, `.${base}.${process.pid}.${Date.now()}.tmp`);

  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(tempFile, JSON.stringify(payload), 'utf8');

  try {
    fs.renameSync(tempFile, filename);
  } catch (error) {
    // Retry with force removal on Windows or other systems with file locking
    try {
      fs.rmSync(filename, {force: true});
      fs.renameSync(tempFile, filename);
    } catch {
      try {
        fs.rmSync(tempFile, {force: true});
      } catch {
        // Ignore cleanup failures
      }
      throw error;
    }
  }
}

function parseSourceTree(sourceAbsPath: string): MdastNode | null {
  let content: string;
  try {
    content = fs.readFileSync(sourceAbsPath, 'utf8');
  } catch {
    return null;
  }

  const parse = (input: string, {mdx}: {mdx: boolean}): MdastNode | null => {
    try {
      const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkDirective)
        .use(remarkFrontmatter, ['yaml']);

      if (mdx) processor.use(remarkMdx);

      const tree = processor.parse(input) as unknown as MdastNode;
      return tree && typeof tree === 'object' ? tree : null;
    } catch {
      return null;
    }
  };

  // Try full MDX parsing first.
  const mdxTree = parse(preprocessForDocusaurusMdx(content), {mdx: true});
  if (mdxTree) return mdxTree;

  // Some docs include HTML comments like `<!-- markdownlint-disable -->` which
  // are not valid JSX and can make MDX parsing fail. Strip them and retry.
  const withoutHtmlComments = content.replace(/<!--[^]*?-->/g, '');
  const strippedMdxTree = parse(
    preprocessForDocusaurusMdx(withoutHtmlComments),
    {mdx: true},
  );
  if (strippedMdxTree) return strippedMdxTree;

  // Final fallback: parse as plain Markdown.
  return parse(preprocessForDocusaurusMdx(withoutHtmlComments), {mdx: false});
}

export function loadCapturedTree(
  sourceAbsPath: string,
  siteDir: string,
): MdastNode | null {
  const treePath = capturedTreePathForSource(sourceAbsPath, siteDir);

  try {
    if (fs.existsSync(treePath)) {
      const content = fs.readFileSync(treePath, 'utf8');
      return unwrapCapturedTree(JSON.parse(content)) ?? null;
    }
  } catch {
    // Fall through to source parsing
  }

  // Fallback: parse the markdown source directly. This guards against builds
  // where Webpack persistent cache skips running remark plugins, so capture
  // files aren't produced.
  const parsedTree = parseSourceTree(sourceAbsPath);
  if (!parsedTree) return null;

  if (!hasLoggedFallbackParse) {
    console.warn(
      'llms-export: warning: captured trees missing; falling back to parsing source files (webpack cache may have skipped remark plugins)',
    );
    hasLoggedFallbackParse = true;
  }

  // Best-effort write-through so future cached builds can reuse the parsed tree.
  try {
    atomicWriteJson(treePath, wrapCapturedTree(parsedTree));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    console.warn(
      `llms-export: warning: failed to write fallback tree: ${message}`,
    );
  }

  return parsedTree;
}

// AST Text Extraction
function extractNodeText(node: unknown): string {
  if (!isMdastNode(node)) return '';
  if (typeof node.value === 'string') return node.value;
  if (!Array.isArray(node.children)) return '';

  return node.children
    .map(extractNodeText)
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripHeadingId(text: string): string {
  return text.replace(/\s*\{#[^}]+\}\s*$/, '').trim();
}

// Description Derivation
const IGNORED_SECTIONS = new Set(['component', 'status', 'changelog']);

/**
 * Extract a description from a document tree.
 * Skips metadata sections, single-word paragraphs, and image placeholders.
 */
export function deriveDescriptionFromTree(tree: MdastNode | unknown): string {
  if (!isMdastNode(tree) || !Array.isArray(tree.children)) return '';

  let currentSection = '';

  for (const child of tree.children) {
    if (!child || typeof child !== 'object') continue;

    // Track current section for filtering
    if (child.type === 'heading') {
      currentSection = stripHeadingId(extractNodeText(child));
      continue;
    }

    // Look for paragraphs (directly or in lists)
    if (child.type === 'paragraph' || child.type === 'list') {
      const paragraphs =
        child.type === 'paragraph'
          ? [child]
          : (child.children ?? []).flatMap((listItem: MdastNode) =>
              (listItem?.children ?? []).filter(
                (c: MdastNode) => c?.type === 'paragraph',
              ),
            );

      for (const paragraph of paragraphs) {
        // Skip ignored sections (like ADR metadata)
        if (IGNORED_SECTIONS.has(normalizeTitle(currentSection))) continue;

        const text = extractNodeText(paragraph)
          .replace(/\s+([,.;:!?\)\]\}])/g, '$1')
          .replace(/([\(\[\{])\s+/g, '$1')
          .replace(/\s+/g, ' ')
          .trim();

        // Skip empty, image placeholders, or admonition labels
        if (!text) continue;
        if (/^image:/i.test(text)) continue;
        if (/^(Tip|Note|Info|Warning|Caution|Danger):$/i.test(text)) continue;

        // Require at least 2 words
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        if (wordCount > 1) return text;
      }
    }
  }

  return '';
}

/**
 * Find the canonical permalink for a given pathname.
 * Handles trailing slashes, .md/.mdx extensions, and /index paths.
 */
function findCanonicalPermalink(
  docs: ReadonlyMap<string, PermalinkDoc>,
  pathname: string,
): string | null {
  function checkPermalink(path: string): string | null {
    const doc = docs.get(path);
    if (!doc || doc.unlisted || doc.draft) return null;
    return doc.permalink;
  }

  // Try direct match first
  let result = checkPermalink(pathname);
  if (result) return result;

  // Try with trailing slash
  result = checkPermalink(pathname.endsWith('/') ? pathname : pathname + '/');
  if (result) return result;

  // Try without trailing slash (if applicable)
  if (pathname.endsWith('/') && pathname !== '/') {
    result = checkPermalink(pathname.slice(0, -1));
    if (result) return result;
  }

  // Try without .md/.mdx extension
  const withoutExtension = pathname.replace(/\.(md|mdx)$/i, '');
  if (withoutExtension !== pathname) {
    const stripped =
      checkPermalink(withoutExtension) ??
      checkPermalink(withoutExtension + '/');
    if (stripped) return stripped;

    // Handle /foo/index.md -> /foo
    if (withoutExtension.endsWith('/index')) {
      const parent = withoutExtension.slice(0, -'/index'.length) || '/';
      const indexed = checkPermalink(parent) ?? checkPermalink(parent + '/');
      if (indexed) return indexed;
    }

    // Handle /foo/README.md -> /foo (common Docusaurus pattern)
    if (/\/readme$/i.test(withoutExtension)) {
      const parent = withoutExtension.slice(0, -'/README'.length) || '/';
      const readmed = checkPermalink(parent) ?? checkPermalink(parent + '/');
      if (readmed) return readmed;
    }
  }

  return null;
}

// Link Rewriting
interface LinkRewriteOptions {
  docsByPermalink: ReadonlyMap<string, PermalinkDoc>;
  currentPermalink?: string;
  siteBase?: string;
  linkTarget?: LinkTarget;
}

function rewriteLinks(tree: MdastNode, options: LinkRewriteOptions): void {
  const {
    docsByPermalink,
    currentPermalink,
    siteBase,
    linkTarget = 'html',
  } = options;

  function ensureLeadingSlash(path?: string): string {
    if (!path) return '';
    return path.startsWith('/') ? path : `/${path}`;
  }

  function applyLinkTarget(url: string): string {
    return linkTarget === 'md' ? toMarkdownUrl(url, siteBase) : url;
  }

  function rewriteUrl(url: string): string | null {
    if (!url || url.startsWith('#') || isExternalUrl(url)) return null;

    // Parse URL components
    const hashIndex = url.indexOf('#');
    const beforeHash = hashIndex === -1 ? url : url.slice(0, hashIndex);
    const hash = hashIndex === -1 ? '' : url.slice(hashIndex);

    const queryIndex = beforeHash.indexOf('?');
    const path =
      queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex);
    const query = queryIndex === -1 ? '' : beforeHash.slice(queryIndex);

    // Handle absolute paths
    if (path.startsWith('/')) {
      const canonical = findCanonicalPermalink(docsByPermalink, path);
      if (canonical) {
        return applyLinkTarget(
          urlForPermalink(canonical, siteBase) + query + hash,
        );
      }
      const absoluteUrl = siteBase
        ? joinUrl(siteBase, path) + query + hash
        : path + query + hash;
      return applyLinkTarget(absoluteUrl);
    }

    // Handle relative paths
    const basePath = ensureLeadingSlash(currentPermalink);
    if (!basePath) return null;

    try {
      const resolved = new URL(
        url,
        'https://_/' + basePath.replace(/^\/+/, ''),
      );
      const canonical = findCanonicalPermalink(
        docsByPermalink,
        resolved.pathname,
      );
      if (canonical) {
        return applyLinkTarget(
          urlForPermalink(canonical, siteBase) +
            resolved.search +
            resolved.hash,
        );
      }
      const relativeUrl = siteBase
        ? joinUrl(siteBase, resolved.pathname) + resolved.search + resolved.hash
        : resolved.pathname + resolved.search + resolved.hash;
      return applyLinkTarget(relativeUrl);
    } catch {
      return null;
    }
  }

  /**
   * Resolve a link text that looks like a path to its doc title.
   */
  function resolveLinkTitle(text: string): string | null {
    if (!text) return null;

    const hashIndex = text.indexOf('#');
    const beforeHash = hashIndex === -1 ? text : text.slice(0, hashIndex);
    const queryIndex = beforeHash.indexOf('?');
    const path = (
      queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex)
    ).trim();

    if (!path) return null;

    let resolvedPath = path;
    const isRelativePath =
      !path.startsWith('/') &&
      currentPermalink &&
      (path.startsWith('./') || path.startsWith('../'));

    if (isRelativePath) {
      try {
        resolvedPath = new URL(
          path,
          'https://_/' +
            ensureLeadingSlash(currentPermalink).replace(/^\/+/, ''),
        ).pathname;
      } catch {
        return null;
      }
    } else if (!path.startsWith('/')) {
      return null;
    }

    const canonical = findCanonicalPermalink(docsByPermalink, resolvedPath);
    if (!canonical) return null;
    return docsByPermalink.get(canonical)?.title ?? null;
  }

  visit(tree, ['link', 'definition'], (node) => {
    const mdastNode = node as MdastNode;
    const url = typeof mdastNode.url === 'string' ? mdastNode.url : '';

    if (url) {
      const rewritten = rewriteUrl(url);
      if (rewritten) mdastNode.url = rewritten;
    }

    // Try to resolve link text that looks like a path
    const children = Array.isArray(mdastNode.children)
      ? mdastNode.children
      : [];
    if (children.length === 1 && children[0]?.type === 'text') {
      const linkText = String(children[0].value ?? '').trim();
      if (linkText && !linkText.includes(' ')) {
        const title = resolveLinkTitle(linkText);
        if (title) children[0].value = title;
      }
    }
  });
}

// Markdown Rendering
interface RenderOptions {
  docsByPermalink: ReadonlyMap<string, PermalinkDoc>;
  currentPermalink?: string;
  siteBase?: string;
  titleToStrip?: string;
  baseHeadingLevel?: number;
  linkTarget?: LinkTarget;
}

export function renderMarkdownFromCapturedTree(
  tree: MdastNode,
  options: RenderOptions,
): string {
  const cloned: MdastNode = structuredClone(tree);

  // Strip leading title if it matches titleToStrip
  if (
    options.titleToStrip &&
    Array.isArray(cloned.children) &&
    cloned.children[0]?.type === 'heading'
  ) {
    const headingText = stripHeadingId(extractNodeText(cloned.children[0]));
    if (normalizeTitle(headingText) === normalizeTitle(options.titleToStrip)) {
      cloned.children.shift();
    }
  }

  // Adjust heading levels
  if (typeof options.baseHeadingLevel === 'number') {
    let minDepth = Infinity;

    visit(cloned, ['heading'], (node) => {
      const depth = Number((node as MdastNode).depth);
      if (Number.isFinite(depth)) {
        minDepth = Math.min(minDepth, depth);
      }
    });

    if (Number.isFinite(minDepth)) {
      const offset = Math.min(6, options.baseHeadingLevel + 1) - minDepth;
      if (offset) {
        visit(cloned, ['heading'], (node) => {
          const mdastNode = node as MdastNode;
          mdastNode.depth = Math.max(
            1,
            Math.min(6, Number(mdastNode.depth) + offset),
          );
        });
      }
    }
  }

  // Strip custom heading IDs like `{#envoy}` from rendered markdown.
  // Docusaurus keeps heading IDs in `data.hProperties.id`, but the clean markdown
  // export should not include the raw `{#...}` suffix.
  visit(cloned, ['heading'], (node) => {
    const heading = node as MdastNode;
    if (!Array.isArray(heading.children) || heading.children.length === 0)
      return;

    const last = heading.children[heading.children.length - 1];
    if (last?.type !== 'text' || typeof last.value !== 'string') return;

    const stripped = last.value.replace(/\s*\{#[^}]+\}\s*$/, '');
    if (stripped === last.value) return;

    const trimmed = stripped.trimEnd();
    if (trimmed) {
      last.value = trimmed;
    } else {
      heading.children.pop();
    }
  });

  // Rewrite links
  rewriteLinks(cloned, options);

  // Normalize block children (wrap stray inline nodes in paragraphs)
  normalizeBlockChildren(cloned);

  try {
    return mdastToMarkdown(cloned as any, {
      extensions: [gfmToMarkdown()],
    }).trim();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    console.warn(`llms-export: markdown serialize error: ${message}`);
    return extractNodeText(cloned).trim();
  }
}

function normalizeBlockChildren(node: unknown): void {
  if (!isMdastNode(node) || !Array.isArray(node.children)) return;

  if (
    node.type === 'root' ||
    node.type === 'blockquote' ||
    node.type === 'listItem'
  ) {
    const newChildren: MdastNode[] = [];
    const pendingInline: MdastNode[] = [];

    const flushPending = () => {
      if (pendingInline.length) {
        newChildren.push({type: 'paragraph', children: [...pendingInline]});
        pendingInline.length = 0;
      }
    };

    for (const child of node.children) {
      if (isMdastNode(child) && PHRASING_NODE_TYPES.has(child.type ?? '')) {
        pendingInline.push(child);
      } else {
        flushPending();
        if (isMdastNode(child)) newChildren.push(child);
      }
    }

    flushPending();
    node.children = newChildren;
  }

  for (const child of node.children) {
    normalizeBlockChildren(child);
  }
}

// MDX/HTML Processing
function getMdxAttribute(node: MdastNode, name: string): string {
  const attributes = (node.attributes ?? []) as Array<{
    type?: string;
    name?: string;
    value?: string | {value?: string} | null;
  }>;

  for (const attr of attributes) {
    if (attr?.type !== 'mdxJsxAttribute' || attr?.name !== name) continue;
    const value = attr.value;
    if (typeof value === 'string') return value.trim();
    if (typeof value?.value === 'string') return String(value.value).trim();
  }

  return '';
}

// HTML entity decoding
const HTML_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  copy: '©',
  reg: '®',
  hellip: '…',
  mdash: '—',
  ndash: '–',
};

function decodeHtmlEntities(text: string): string {
  if (!text) return text;

  return text.replace(
    /&(#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z][a-zA-Z0-9]+);/g,
    (match, entity: string) => {
      // Hex numeric entity: &#x...;
      if (entity.startsWith('#x') || entity.startsWith('#X')) {
        try {
          const codePoint = parseInt(entity.slice(2), 16);
          return codePoint === 160 ? ' ' : String.fromCodePoint(codePoint);
        } catch {
          return match;
        }
      }

      // Decimal numeric entity: &#...;
      if (entity.startsWith('#')) {
        try {
          const codePoint = parseInt(entity.slice(1), 10);
          return codePoint === 160 ? ' ' : String.fromCodePoint(codePoint);
        } catch {
          return match;
        }
      }

      // Named entity
      return HTML_ENTITIES[entity.toLowerCase()] ?? match;
    },
  );
}

function stripHtmlTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '');
}

function parseHtmlToNodes(html: string): MdastNode[] | null {
  if (!html) return null;

  // Convert <a> tags to markdown link syntax
  const withMarkdownLinks = html.replace(
    /<a\b[^>]*href=(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi,
    (_, _quote, href, content) => {
      const cleanHref = String(href ?? '').trim();
      const cleanText = decodeHtmlEntities(stripHtmlTags(content ?? ''))
        .replace(/\s+/g, ' ')
        .trim();

      if (cleanHref && cleanText) {
        return `[${cleanText}](${cleanHref})`;
      }
      if (cleanHref) {
        return cleanHref;
      }
      return cleanText;
    },
  );

  // Split on <br> tags
  const parts = withMarkdownLinks.split(/<br\s*\/?>/gi);
  const nodes: MdastNode[] = [];

  for (let i = 0; i < parts.length; i++) {
    const text = decodeHtmlEntities(stripHtmlTags(parts[i]))
      .replace(/\s+/g, ' ')
      .trim();

    if (text) {
      nodes.push({type: 'text', value: text});
    }
    if (i < parts.length - 1) {
      nodes.push({type: 'break'});
    }
  }

  // Remove trailing breaks
  while (nodes.length && nodes[nodes.length - 1].type === 'break') {
    nodes.pop();
  }

  return nodes.length ? nodes : null;
}

// Node types to completely drop
const DROP_NODE_TYPES = new Set([
  'mdxjsEsm',
  'mdxFlowExpression',
  'mdxTextExpression',
  'yaml',
  'toml',
  'jsx',
]);

// Helper functions for building AST nodes
const createTextNode = (value: string): MdastNode => ({type: 'text', value});
const createParagraph = (children: MdastNode[]): MdastNode => ({
  type: 'paragraph',
  children,
});
const createStrong = (text: string): MdastNode => ({
  type: 'strong',
  children: [createTextNode(text)],
});
const createLink = (url: string, text: string): MdastNode => ({
  type: 'link',
  url,
  children: [createTextNode(text)],
});
const createListItem = (children: MdastNode[]): MdastNode => ({
  type: 'listItem',
  children,
});
const createList = (items: MdastNode[]): MdastNode => ({
  type: 'list',
  children: items,
});

type MdxHandler = (
  node: MdastNode,
  isFlowElement: boolean,
) => MdastNode[] | null;

const MDX_HANDLERS: Record<string, MdxHandler> = {
  img: (node) => {
    const alt = getMdxAttribute(node, 'alt');
    return alt ? [createTextNode(`Image: ${alt}`)] : [];
  },

  DocCard: (node) => {
    const itemAttr = getMdxAttribute(node, 'item');
    const match = itemAttr.match(/findSidebarItem\(\s*['"]([^'"]+)['"]\s*\)/);
    if (!match) return [];

    const path = match[1];
    return [
      createList([createListItem([createParagraph([createLink(path, path)])])]),
    ];
  },

  DocCardList: (node) => {
    const itemsAttr = getMdxAttribute(node, 'items');
    if (!itemsAttr) return [];

    const matches = Array.from(
      itemsAttr.matchAll(/findSidebarItem\(\s*['"]([^'"]+)['"]\s*\)/g),
    );
    const paths = matches.map((m) => m[1]).filter(Boolean);
    if (!paths.length) return [];

    const uniquePaths = Array.from(new Set(paths));
    const items = uniquePaths.map((p) =>
      createListItem([createParagraph([createLink(p, p)])]),
    );

    return [createList(items)];
  },

  TabItem: (node, isFlowElement) => {
    if (!isFlowElement) return null;
    const label =
      getMdxAttribute(node, 'label') || getMdxAttribute(node, 'value');
    return label
      ? [createParagraph([createStrong('Tab'), createTextNode(`: ${label}`)])]
      : [];
  },
};

export function stripNoisyNodes(tree: MdastNode): MdastNode {
  processNode(tree);
  return tree;
}

function processNode(node: MdastNode): void {
  if (!node || typeof node !== 'object') return;

  // Remove position and data for cleaner output
  delete node.position;
  delete node.data;

  if (!Array.isArray(node.children)) return;

  const newChildren: MdastNode[] = [];
  for (const child of node.children) {
    if (child && typeof child === 'object') {
      newChildren.push(...transformChild(child));
    }
  }
  node.children = newChildren;
}

function transformChild(child: MdastNode): MdastNode[] {
  const nodeType = String(child.type ?? '');

  // Handle standard image nodes
  if (nodeType === 'image') {
    const alt = typeof child.alt === 'string' ? child.alt.trim() : '';
    return alt ? [createTextNode(`Image: ${alt}`)] : [];
  }

  // Handle raw HTML
  if (nodeType === 'html') {
    return parseHtmlToNodes(child.value ?? '') ?? [];
  }

  // Handle MDX JSX elements
  if (nodeType === 'mdxJsxFlowElement' || nodeType === 'mdxJsxTextElement') {
    const elementName = typeof child.name === 'string' ? child.name.trim() : '';
    const handler = elementName ? MDX_HANDLERS[elementName] : undefined;
    const isFlowElement = nodeType === 'mdxJsxFlowElement';

    if (handler) {
      const result = handler(child, isFlowElement);
      if (result?.length) {
        processNode(child);
        return [...result, ...(child.children ?? [])];
      }
      return result ?? [];
    }

    // Unknown MDX element - unwrap children
    processNode(child);
    return child.children ?? [];
  }

  // Handle directives (admonitions, etc.)
  if (
    nodeType === 'containerDirective' ||
    nodeType === 'leafDirective' ||
    nodeType === 'textDirective'
  ) {
    const directiveName =
      typeof (child as any).name === 'string' ? (child as any).name.trim() : '';
    const dataTitle =
      typeof (child as any).data?.hProperties?.title === 'string'
        ? (child as any).data.hProperties.title
        : undefined;

    let directiveLabelTitle: string | undefined;
    if (Array.isArray(child.children) && child.children.length) {
      const first = child.children[0];
      if (
        first?.type === 'paragraph' &&
        typeof (first as any).data?.directiveLabel === 'boolean' &&
        (first as any).data.directiveLabel
      ) {
        directiveLabelTitle = extractNodeText(first) || undefined;
        child.children = child.children.slice(1);
      }
    }

    const title =
      (child as any).attributes?.title ??
      dataTitle ??
      directiveLabelTitle ??
      (child as any).label ??
      '';

    processNode(child);

    const prefix: MdastNode[] = directiveName
      ? [
          createParagraph([
            createStrong(
              directiveName.charAt(0).toUpperCase() + directiveName.slice(1),
            ),
            createTextNode(title ? `: ${title}` : ':'),
          ]),
        ]
      : [];

    return [...prefix, ...(child.children ?? [])];
  }

  // Drop known noisy node types
  if (DROP_NODE_TYPES.has(nodeType) || nodeType.startsWith('mdx')) {
    return [];
  }

  // Keep other nodes, processing their children
  processNode(child);
  return [child];
}
