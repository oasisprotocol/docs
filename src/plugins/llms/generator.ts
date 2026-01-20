import * as fsp from 'fs/promises';
import * as path from 'path';
import {
  deriveDescriptionFromTree,
  joinUrl,
  loadCapturedTree,
  renderMarkdownFromCapturedTree,
  stripNoisyNodes,
  toMarkdownUrl,
  truncate,
  urlForPermalink,
} from './markdown';
import type {MdastNode, SidebarItemType, SidebarCategoryItem} from './types';

// Types
export interface DocInfo {
  id: string;
  title: string;
  description?: string;
  descriptionFromFrontMatter?: boolean;
  permalink: string;
  source?: string;
  unlisted?: boolean;
  draft?: boolean;
}

export type SidebarItem = SidebarItemType;

interface GeneratorParams {
  siteDir: string;
  outDir: string;
  siteBase: string;
  title: string;
  summary: string;
  docsById: Map<string, DocInfo>;
  docsByPermalink: Map<string, DocInfo>;
  docsSidebars: Record<string, SidebarItem[]>;
  orderedSidebars: string[];
  optionalSidebars: string[];
  sectionTitleForSidebar: (name: string) => string;
  llmsTxtFilename: string;
  llmsFullTxtFilename: string;
  maxDescriptionLength: number;
}

interface NormalizedItem {
  type: string;
  id?: string;
  docId?: string;
  label?: string;
  href?: string;
  items?: SidebarItem[];
  link?: SidebarCategoryItem['link'];
  description?: string;
}

const treeCache = new Map<string, MdastNode | null>();

function getSourcePath(doc: DocInfo, siteDir: string): string {
  if (!doc.source) return '';
  if (doc.source.startsWith('@site/')) {
    return path.join(siteDir, doc.source.slice(6));
  }
  if (path.isAbsolute(doc.source)) {
    return doc.source;
  }
  return path.join(siteDir, doc.source);
}

function getCachedTree(doc: DocInfo, siteDir: string): MdastNode | null {
  if (!doc.source) return null;

  const sourcePath = getSourcePath(doc, siteDir);
  const cacheKey = `${siteDir}::${sourcePath}`;

  if (treeCache.has(cacheKey)) {
    return treeCache.get(cacheKey) ?? null;
  }

  const rawTree = loadCapturedTree(sourcePath, siteDir);
  if (!rawTree) {
    treeCache.set(cacheKey, null);
    return null;
  }

  const cleanedTree = stripNoisyNodes(structuredClone(rawTree));
  treeCache.set(cacheKey, cleanedTree);
  return cleanedTree;
}

// Sidebar Item Helpers
function normalizeItem(item: SidebarItem): NormalizedItem | null {
  if (typeof item === 'string') {
    return {type: 'doc', id: item};
  }
  if (typeof item === 'object' && item !== null) {
    return item as NormalizedItem;
  }
  return null;
}

function getLinkedDoc(
  item: SidebarItem,
  docsById: Map<string, DocInfo>,
): DocInfo | undefined {
  const category = item as SidebarCategoryItem;
  if (category?.link?.type !== 'doc') return undefined;
  const docId = category.link.id ?? category.link.docId ?? '';
  return docsById.get(docId);
}

function getCategoryDescription(
  item: SidebarItem,
  linkedDoc?: DocInfo,
): string {
  const category = item as SidebarCategoryItem;
  return (
    category?.description ??
    category?.link?.description ??
    linkedDoc?.description ??
    ''
  );
}

function getGeneratedIndexSlug(item: SidebarItem): string | undefined {
  const category = item as SidebarCategoryItem;
  if (category?.link?.type !== 'generated-index') return undefined;
  const slug = String(category.link.slug ?? '').trim();
  if (!slug) return undefined;
  return slug.startsWith('/') ? slug : `/${slug}`;
}

/** Check if a doc is visible (not unlisted and not a draft) */
function isVisibleDoc(doc?: DocInfo): doc is DocInfo {
  return Boolean(doc && !doc.unlisted && !doc.draft);
}

/** Remove trailing colon from descriptions */
function sanitizeDescription(desc: string): string {
  return desc.replace(/:\s*$/, '').trim();
}

/** Check if description contains JSX/MDX noise that shouldn't be shown */
function isNoisyDescription(desc: string): boolean {
  return /[<{]|^import\s/i.test(desc);
}

/** Join lines, removing consecutive blank lines */
function joinLines(lines: string[]): string {
  return (
    lines
      .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
      .join('\n')
      .trim() + '\n'
  );
}

/** Filter out linked doc from items to avoid duplication */
function filterOutLinkedDoc(
  items: SidebarItem[],
  linkedDoc?: DocInfo,
): SidebarItem[] {
  if (!linkedDoc) return items ?? [];
  return (items ?? []).filter((item) => {
    const normalized = normalizeItem(item);
    if (!normalized || normalized.type !== 'doc') return true;
    const itemId = normalized.id ?? normalized.docId;
    return itemId !== linkedDoc.id;
  });
}

// ID Collection (for "Other" section)
function collectDocIds(
  items: SidebarItem[],
  docsById: Map<string, DocInfo>,
  ids: Set<string>,
): void {
  for (const item of items) {
    const normalized = normalizeItem(item);
    if (!normalized) continue;

    if (normalized.type === 'doc') {
      const docId = normalized.id ?? normalized.docId;
      if (docId) ids.add(docId);
    } else if (normalized.type === 'category') {
      const linkedDoc = getLinkedDoc(item, docsById);
      if (linkedDoc) ids.add(linkedDoc.id);
      if (Array.isArray(normalized.items)) {
        collectDocIds(normalized.items, docsById, ids);
      }
    }
  }
}

// Flat list building for llms.txt and llms-full.txt
interface FlatDocEntry {
  breadcrumb: string[];
  doc: DocInfo;
  labelOverride?: string;
}

function collectFlatDocEntries(
  items: SidebarItem[],
  docsById: Map<string, DocInfo>,
  breadcrumb: string[] = [],
): FlatDocEntry[] {
  const entries: FlatDocEntry[] = [];

  for (const item of items) {
    const normalized = normalizeItem(item);
    if (!normalized) continue;

    if (normalized.type === 'doc') {
      const doc = docsById.get(normalized.id ?? normalized.docId ?? '');
      if (isVisibleDoc(doc)) {
        entries.push({
          breadcrumb,
          doc,
          labelOverride: normalized.label,
        });
      }
    } else if (normalized.type === 'category') {
      const label = String(normalized.label ?? '').trim();
      const linkedDoc = getLinkedDoc(item, docsById);

      // Add linked doc for category (if exists)
      if (isVisibleDoc(linkedDoc)) {
        entries.push({
          breadcrumb,
          doc: linkedDoc,
          labelOverride: label || undefined,
        });
      }

      // Recurse into children with updated breadcrumb
      const childBreadcrumb = label ? [...breadcrumb, label] : breadcrumb;
      const childItems = filterOutLinkedDoc(normalized.items ?? [], linkedDoc);
      entries.push(
        ...collectFlatDocEntries(childItems, docsById, childBreadcrumb),
      );
    }
    // Note: 'link' type items are skipped in flat mode (external links have no doc)
  }

  return entries;
}

function buildFlatDocLine(
  entry: FlatDocEntry,
  siteBase: string | undefined,
  maxDescriptionLength: number,
): string {
  const {breadcrumb, doc, labelOverride} = entry;

  const url = urlForPermalink(doc.permalink, siteBase);
  const baseTitle = labelOverride ?? doc.title;

  // Prepend breadcrumb to title if present
  const title = breadcrumb.length
    ? `${breadcrumb.join(' / ')}: ${baseTitle}`
    : baseTitle;

  const desc =
    doc.description && !isNoisyDescription(doc.description)
      ? `: ${sanitizeDescription(
          truncate(doc.description, maxDescriptionLength),
        )}`
      : '';

  return `- [${title}](${toMarkdownUrl(url, siteBase)})${desc}`;
}

// File Generation
async function writeLlmsTxt(params: GeneratorParams): Promise<void> {
  const lines = [`# ${params.title}`, params.summary, ''];
  const optionalSet = new Set(params.optionalSidebars);

  // Regular sidebars (non-optional)
  for (const sidebarName of params.orderedSidebars) {
    if (optionalSet.has(sidebarName)) continue;

    const items = params.docsSidebars[sidebarName];
    if (!Array.isArray(items) || !items.length) continue;

    lines.push(`## ${params.sectionTitleForSidebar(sidebarName)}`, '');

    // Collect all docs as flat entries with breadcrumbs
    const flatEntries = collectFlatDocEntries(items, params.docsById);

    for (const entry of flatEntries) {
      lines.push(
        buildFlatDocLine(entry, params.siteBase, params.maxDescriptionLength),
      );
    }
    lines.push('');
  }

  // "Other" section for docs not in any sidebar
  const sidebarDocIds = new Set<string>();
  for (const sidebarName of params.orderedSidebars) {
    const items = params.docsSidebars[sidebarName];
    if (Array.isArray(items)) {
      collectDocIds(items, params.docsById, sidebarDocIds);
    }
  }

  const otherDocs = Array.from(params.docsById.values())
    .filter((d) => isVisibleDoc(d) && !sidebarDocIds.has(d.id))
    .sort((a, b) => a.permalink.localeCompare(b.permalink));

  if (otherDocs.length) {
    lines.push('## Other', '');
    for (const doc of otherDocs) {
      lines.push(
        buildFlatDocLine(
          {breadcrumb: [], doc},
          params.siteBase,
          params.maxDescriptionLength,
        ),
      );
    }
    lines.push('');
  }

  // "Optional" section for less critical content (per llmstxt.org spec)
  const optionalSidebars = params.orderedSidebars.filter((name) =>
    optionalSet.has(name),
  );

  // Always include Optional section with llms-full.txt reference (like ElizaOS)
  lines.push('## Optional', '');
  if (params.siteBase) {
    const llmsFullUrl = joinUrl(params.siteBase, params.llmsFullTxtFilename);
    lines.push(`- [Docs for LLMs](${llmsFullUrl})`);
  } else {
    lines.push(`- [Docs for LLMs](/${params.llmsFullTxtFilename})`);
  }

  for (const sidebarName of optionalSidebars) {
    const items = params.docsSidebars[sidebarName];
    if (!Array.isArray(items) || !items.length) continue;

    const flatEntries = collectFlatDocEntries(items, params.docsById);
    for (const entry of flatEntries) {
      lines.push(
        buildFlatDocLine(entry, params.siteBase, params.maxDescriptionLength),
      );
    }
  }
  lines.push('');

  await fsp.writeFile(
    path.join(params.outDir, params.llmsTxtFilename),
    joinLines(lines),
    'utf8',
  );
}

async function writeLlmsFullTxt(params: GeneratorParams): Promise<void> {
  const lines: string[] = [];
  const processedDocIds = new Set<string>();

  // Helper to render a single doc in flat format (H1 title, natural heading levels)
  function renderFlatDoc(doc: DocInfo): string[] {
    const docLines: string[] = [];
    const tree = getCachedTree(doc, params.siteDir);
    if (!tree) return docLines;

    // H1 title for each doc (flat approach like ElizaOS/Coinbase)
    docLines.push(`# ${doc.title}`);

    // Source URL
    if (params.siteBase) {
      docLines.push('', `Source: ${joinUrl(params.siteBase, doc.permalink)}`);
    }

    // Render body with baseHeadingLevel: 1 (in-doc H1 stays H1, H2 stays H2, etc.)
    const body = renderMarkdownFromCapturedTree(tree, {
      docsByPermalink: params.docsByPermalink,
      currentPermalink: doc.permalink,
      siteBase: params.siteBase,
      titleToStrip: doc.title,
      baseHeadingLevel: 1,
    });

    if (body.trim()) {
      docLines.push('', body.trim());
    }

    return docLines;
  }

  // Process docs in sidebar order
  for (const sidebarName of params.orderedSidebars) {
    const items = params.docsSidebars[sidebarName];
    if (!Array.isArray(items) || !items.length) continue;

    const flatEntries = collectFlatDocEntries(items, params.docsById);

    for (const entry of flatEntries) {
      const doc = entry.doc;
      if (processedDocIds.has(doc.id)) continue;
      processedDocIds.add(doc.id);

      const docLines = renderFlatDoc(doc);
      if (docLines.length) {
        if (lines.length > 0) lines.push('');
        lines.push(...docLines);
      }
    }
  }

  // "Other" section for docs not in any sidebar
  const sidebarDocIds = new Set<string>();
  for (const sidebarName of params.orderedSidebars) {
    const items = params.docsSidebars[sidebarName];
    if (Array.isArray(items)) {
      collectDocIds(items, params.docsById, sidebarDocIds);
    }
  }

  const otherDocs = Array.from(params.docsById.values())
    .filter((d) => isVisibleDoc(d) && !sidebarDocIds.has(d.id))
    .sort((a, b) => a.permalink.localeCompare(b.permalink));

  for (const doc of otherDocs) {
    if (processedDocIds.has(doc.id)) continue;
    processedDocIds.add(doc.id);

    const docLines = renderFlatDoc(doc);
    if (docLines.length) {
      if (lines.length > 0) lines.push('');
      lines.push(...docLines);
    }
  }

  await fsp.writeFile(
    path.join(params.outDir, params.llmsFullTxtFilename),
    joinLines(lines),
    'utf8',
  );
}

async function writePerPageMarkdown(params: GeneratorParams): Promise<number> {
  const docs = Array.from(params.docsById.values())
    .filter(isVisibleDoc)
    .sort((a, b) => a.permalink.localeCompare(b.permalink));

  let count = 0;
  for (const doc of docs) {
    const tree = getCachedTree(doc, params.siteDir);
    if (!tree) continue;

    const body = renderMarkdownFromCapturedTree(tree, {
      docsByPermalink: params.docsByPermalink,
      currentPermalink: doc.permalink,
      siteBase: params.siteBase,
      baseHeadingLevel: 1,
      titleToStrip: doc.title,
      linkTarget: 'md',
    });

    const slug = doc.permalink.replace(/^\//, '').replace(/\/$/, '') || 'index';
    const filePath = path.join(params.outDir, `${slug}.md`);

    await fsp.mkdir(path.dirname(filePath), {recursive: true});

    const source = params.siteBase
      ? `Source: ${joinUrl(params.siteBase, doc.permalink)}`
      : '';
    const llmsTxtUrl = params.siteBase
      ? joinUrl(params.siteBase, params.llmsTxtFilename)
      : '';
    const footer = llmsTxtUrl
      ? `---\n\n*To find navigation and other pages in this documentation, fetch the llms.txt file at: ${llmsTxtUrl}*`
      : '';
    const content = joinLines([
      `# ${doc.title}`,
      '',
      source,
      source ? '' : '',
      body.trim(),
      '',
      footer,
    ]);

    await fsp.writeFile(filePath, content, 'utf8');
    count++;
  }

  return count;
}

interface GeneratedIndexPage {
  slug: string;
  title: string;
  description?: string;
  childPermalinks: string[];
}

async function writeGeneratedIndexPages(
  params: GeneratorParams,
): Promise<number> {
  const docs = Array.from(params.docsById.values()).filter(isVisibleDoc);
  const existingPermalinks = new Set(
    docs.map((d) => d.permalink.replace(/\/+$/, '') || '/'),
  );
  const coveredSlugs = new Set<string>();
  const pages: GeneratedIndexPage[] = [];

  function collectGeneratedIndexes(
    items: SidebarItem[],
    activePage?: GeneratedIndexPage,
  ): void {
    for (const item of items) {
      const normalized = normalizeItem(item);
      if (!normalized) continue;

      if (normalized.type === 'doc') {
        const doc = params.docsById.get(
          normalized.id ?? normalized.docId ?? '',
        );
        if (isVisibleDoc(doc) && activePage) {
          const permalink = doc.permalink.replace(/\/+$/, '') || '/';
          if (!activePage.childPermalinks.includes(permalink)) {
            activePage.childPermalinks.push(permalink);
          }
        }
      } else if (normalized.type === 'category') {
        const linkedDoc = getLinkedDoc(item, params.docsById);
        if (isVisibleDoc(linkedDoc) && activePage) {
          const permalink = linkedDoc.permalink.replace(/\/+$/, '') || '/';
          if (!activePage.childPermalinks.includes(permalink)) {
            activePage.childPermalinks.push(permalink);
          }
        }

        const generatedSlug = getGeneratedIndexSlug(item);
        let newPage: GeneratedIndexPage | undefined;

        if (generatedSlug) {
          const normalizedSlug = generatedSlug.replace(/\/+$/, '') || '/';
          if (
            !existingPermalinks.has(normalizedSlug) &&
            !coveredSlugs.has(normalizedSlug)
          ) {
            coveredSlugs.add(normalizedSlug);
            newPage = {
              slug: normalizedSlug,
              title: String(normalized.label ?? '').trim() || normalizedSlug,
              description:
                getCategoryDescription(item, linkedDoc).trim() || undefined,
              childPermalinks: [],
            };
            pages.push(newPage);
          }
        }

        collectGeneratedIndexes(normalized.items ?? [], newPage ?? activePage);
      }
    }
  }

  for (const sidebarName of params.orderedSidebars) {
    const items = params.docsSidebars[sidebarName];
    if (Array.isArray(items)) {
      collectGeneratedIndexes(items);
    }
  }

  let count = 0;
  for (const page of pages) {
    const slug = page.slug === '/' ? 'index' : page.slug.replace(/^\//, '');
    const filePath = path.join(params.outDir, `${slug}.md`);

    await fsp.mkdir(path.dirname(filePath), {recursive: true});

    const childLinks = page.childPermalinks.map((permalink) => {
      const doc =
        params.docsByPermalink.get(permalink) ??
        params.docsByPermalink.get(permalink + '/');
      const title = doc?.title ?? permalink;
      const url = toMarkdownUrl(
        urlForPermalink(permalink, params.siteBase),
        params.siteBase,
      );
      return `- [${title}](${url})`;
    });

    const content = joinLines([
      `# ${page.title}`,
      '',
      page.description ?? '',
      page.description ? '' : '',
      '## Pages',
      '',
      ...childLinks,
      '',
    ]);

    await fsp.writeFile(filePath, content, 'utf8');
    count++;
  }

  return count;
}

// Main Export
export async function generateLlmsExports(
  params: GeneratorParams,
): Promise<void> {
  // Get all visible docs
  const allDocs = Array.from(params.docsById.values())
    .filter(isVisibleDoc)
    .sort((a, b) => a.permalink.localeCompare(b.permalink));

  // Check for missing trees and log warnings (graceful handling)
  const skippedDocs: DocInfo[] = [];
  const docs: DocInfo[] = [];

  for (const doc of allDocs) {
    if (!doc.source || !getCachedTree(doc, params.siteDir)) {
      skippedDocs.push(doc);
    } else {
      docs.push(doc);
    }
  }

  if (skippedDocs.length) {
    console.warn(
      `llms-export: warning: skipping ${skippedDocs.length} docs without captured trees`,
    );
    for (const doc of skippedDocs) {
      console.warn(`  - ${doc.id} (${doc.permalink})`);
    }
  }

  // Derive descriptions for docs without frontmatter descriptions
  for (const doc of docs) {
    if (doc.descriptionFromFrontMatter) continue;
    const tree = getCachedTree(doc, params.siteDir);
    if (tree) {
      const derived = deriveDescriptionFromTree(tree);
      if (derived) doc.description = derived;
    }
  }

  // Generate all outputs
  await writeLlmsTxt(params);
  await writeLlmsFullTxt(params);

  const perPageCount = await writePerPageMarkdown(params);
  console.info(`llms-export: generated ${perPageCount} per-page .md files`);

  const generatedIndexCount = await writeGeneratedIndexPages(params);
  if (generatedIndexCount) {
    console.info(
      `llms-export: generated ${generatedIndexCount} generated-index .md files`,
    );
  }

  // Final summary
  if (skippedDocs.length) {
    console.warn(
      `llms-export: completed with ${skippedDocs.length} skipped docs (missing trees)`,
    );
  }

  // Clear cache to free memory
  treeCache.clear();
}
