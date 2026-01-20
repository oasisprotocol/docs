import {joinUrl} from './markdown';
import {type DocInfo, type SidebarItem, generateLlmsExports} from './generator';
import type {DocusaurusContext, DocsVersion, DocMetadata} from './types';

type Options = {
  llmsTxtFilename?: string;
  llmsFullTxtFilename?: string;
  maxDescriptionLength?: number;
  sidebarOrder?: string[];
  sidebarTitles?: Record<string, string>;
  optionalSidebars?: string[];
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

// Default configuration (can be overridden via options)
const DEFAULT_SIDEBAR_ORDER = [
  'developers',
  'general',
  'getInvolved',
  'operators',
  'oasisCore',
  'adrs',
];

const DEFAULT_SIDEBAR_TITLES: Record<string, string> = {
  developers: 'Build',
  general: 'Learn',
  getInvolved: 'Get Involved',
  operators: 'Run Node',
  oasisCore: 'Develop Core',
  adrs: 'Architectural Decision Records',
};

const DEFAULT_OPTIONAL_SIDEBARS = ['adrs'];

function getVersion(allContent: unknown): DocsVersion | null {
  if (!isObject(allContent)) return null;

  const plugins = allContent as Record<string, {default?: DocsVersion}>;
  const docsPlugin =
    plugins['docusaurus-plugin-content-docs']?.default ??
    plugins['@docusaurus/plugin-content-docs']?.default;

  const versions = docsPlugin?.loadedVersions;
  if (!Array.isArray(versions) || versions.length === 0) return null;

  return versions[0];
}

function extractDocId(metadata: DocMetadata): string {
  if (typeof metadata.unversionedId === 'string') return metadata.unversionedId;
  if (typeof metadata.id === 'string') return metadata.id;
  return '';
}

function extractDocs(version: DocsVersion): DocMetadata[] {
  if (Array.isArray(version.docs)) return version.docs;
  if (Array.isArray(version.loadedContent?.docs)) {
    return version.loadedContent.docs;
  }
  return [];
}

function getFrontMatterDescription(metadata: DocMetadata): string {
  if (!isObject(metadata.frontMatter)) return '';
  const desc = metadata.frontMatter.description;
  return typeof desc === 'string' ? desc.trim() : '';
}

function extractDescription(metadata: DocMetadata): {
  description: string;
  fromFrontMatter: boolean;
} {
  const frontMatterDesc = getFrontMatterDescription(metadata);
  if (frontMatterDesc) {
    return {description: frontMatterDesc, fromFrontMatter: true};
  }

  const metadataDesc =
    typeof metadata.description === 'string' ? metadata.description.trim() : '';
  return {description: metadataDesc, fromFrontMatter: false};
}

export default function llmsPlugin(
  ctx: DocusaurusContext,
  opts: unknown,
): {name: string; allContentLoaded: Function; postBuild: Function} {
  const options = (isObject(opts) ? opts : {}) as Options;
  const docsById = new Map<string, DocInfo>();
  const docsByPermalink = new Map<string, DocInfo>();
  let sidebars: Record<string, SidebarItem[]> = {};

  const deployUrl =
    process.env.DEPLOY_PRIME_URL ||
    process.env.DEPLOY_URL ||
    ctx.siteConfig?.url ||
    '';
  const normalizedUrl = String(deployUrl).replace(/\/$/, '');
  const siteBase = joinUrl(
    normalizedUrl + '/',
    String(ctx.siteConfig?.baseUrl ?? '/'),
  );

  return {
    name: 'llms-export-plugin',
    async allContentLoaded({allContent}: {allContent: unknown}) {
      const version = getVersion(allContent);
      if (!version) {
        throw new Error('llms-export: failed to locate docs plugin content');
      }

      sidebars = (version.docsSidebars ?? version.sidebars ?? {}) as Record<
        string,
        SidebarItem[]
      >;
      if (Object.keys(sidebars).length === 0) {
        console.warn('llms-export: docs sidebars not found or empty');
      }

      const docs = extractDocs(version);
      for (const rawDoc of docs) {
        const metadata: DocMetadata | undefined =
          isObject(rawDoc) && isObject(rawDoc.metadata)
            ? rawDoc.metadata
            : rawDoc;

        if (!isObject(metadata)) continue;

        const id = extractDocId(metadata);
        const title = typeof metadata.title === 'string' ? metadata.title : '';
        const permalink =
          typeof metadata.permalink === 'string' ? metadata.permalink : '';

        if (!id || !title || !permalink) continue;

        const {description, fromFrontMatter} = extractDescription(metadata);
        const source =
          typeof metadata.source === 'string' ? metadata.source : undefined;

        const info: DocInfo = {
          id,
          title,
          description: description || undefined,
          descriptionFromFrontMatter: fromFrontMatter,
          permalink,
          source,
          unlisted: Boolean(metadata.unlisted),
          draft: Boolean(metadata.draft),
        };

        docsById.set(id, info);
        docsByPermalink.set(permalink, info);
      }
    },
    async postBuild({outDir}: {outDir: string}) {
      const title =
        String(ctx.siteConfig?.title ?? 'Documentation').trim() ||
        'Documentation';
      const tagline = String(ctx.siteConfig?.tagline ?? '').trim();
      const defaultSummary =
        '> Oasis Protocol developer documentation for Sapphire, ROFL, node operation, and Oasis Core.';
      const summary = tagline ? `> ${tagline}` : defaultSummary;

      // Use configured options with defaults
      const sidebarOrder = options.sidebarOrder ?? DEFAULT_SIDEBAR_ORDER;
      const sidebarTitles = {
        ...DEFAULT_SIDEBAR_TITLES,
        ...options.sidebarTitles,
      };
      const optionalSidebars =
        options.optionalSidebars ?? DEFAULT_OPTIONAL_SIDEBARS;

      const sidebarNames = Object.keys(sidebars ?? {});
      const orderedSidebars = [
        ...sidebarOrder.filter((name) => sidebarNames.includes(name)),
        ...sidebarNames.filter((name) => !sidebarOrder.includes(name)),
      ];

      await generateLlmsExports({
        siteDir: ctx.siteDir,
        outDir,
        siteBase,
        title,
        summary,
        docsById,
        docsByPermalink,
        docsSidebars: sidebars,
        orderedSidebars,
        optionalSidebars,
        sectionTitleForSidebar: (name) => sidebarTitles[name] ?? name,
        llmsTxtFilename: options.llmsTxtFilename ?? 'llms.txt',
        llmsFullTxtFilename: options.llmsFullTxtFilename ?? 'llms-full.txt',
        maxDescriptionLength: options.maxDescriptionLength ?? 200,
      });
    },
  };
}
