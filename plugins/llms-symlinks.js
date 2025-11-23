/**
 * Docusaurus LLMs plugin wrapper that adds symlink support and better content cleaning.
 *
 * This wraps the published docusaurus-plugin-llms to:
 * - Follow symlinks when discovering markdown files (for external doc repos)
 * - Clean MDX/JSX components from generated output
 * - Inline code snippets referenced via ![code](...) syntax
 * - Extract better descriptions for the TOC
 */

const path = require('path');
const fs = require('fs/promises');
const fsSync = require('fs');

const llmsPlugin = require('docusaurus-plugin-llms').default;
const llmsUtils = require('docusaurus-plugin-llms/lib/utils');
const llmsProcessor = require('docusaurus-plugin-llms/lib/processor');
const llmsGenerator = require('docusaurus-plugin-llms/lib/generator');

// Global State

let currentMarkdownFilePath = null;
const externalBaseDir = path.resolve(process.cwd(), 'external');
let externalRoots = null;

// Pre-compiled Patterns

const PATTERNS = {
  // Content cleaning
  codeFence: /^```/,
  importStatement: /^\s*import\s+.+$/,
  mdxOpenTag: /^<([A-Z][A-Za-z0-9]*)\b/,
  mdxCloseTag: /^\s*<\/[A-Z][A-Za-z0-9]*>\s*$/,
  admonition: /^(\s*):::[\w-]*(?:\[.*?\])?(?:\s+(.*))?$/,
  htmlTags:
    /<\/?(?:div|span|p|br|hr|img|a|strong|em|b|i|u|h[1-6]|ul|ol|li|table|tr|td|th|thead|tbody|iframe|details|summary)\b[^>]*>/gi,
  anchorId: /\s*\{#[\w-]+\}/g,
  imageLink: /!\[([^\]]*)\]\([^)]+\)/g,
  heading: /^\s*(#+)\s+(.+)$/,
  multipleNewlines: /\n{3,}/g,

  // Description extraction
  headingLine: /^#+\s+/,
  jsxTag: /^<[A-Za-z/]/,
  admonitionStart: /^:::/,
  refLink: /^\[.*\]:/,
  horizontalRule: /^[-*_]{3,}\s*$/,
  listItem: /^[-*+]\s+/,
  orderedListItem: /^\d+\.\s+/,
  imagePlaceholder: /^\[Image:/,

  // Markdown cleanup
  mdLink: /\[([^\]]+)\]\([^)]+\)/g,
  refStyleLink: /\[([^\]]+)\]\[[^\]]*\]/g,
  bold: /\*\*([^*]+)\*\*/g,
  italicAsterisk: /(?<!\*)\*([^*]+)\*(?!\*)/g,
  italicUnderscore: /(?<!_)_([^_]+)_(?!_)/g,
  inlineCode: /`([^`]+)`/g,
  imagePlaceholderGlobal: /\[Image:[^\]]*\]/g,

  // Code snippets
  codeImage: /!\[([^\]]*?)\]\(([\s\S]*?)\)/g,
  titleInUrl: /^(.*?)[ \t]+"([^"]+)"$/,
  lineRange: /^L(\d+)(?:-L(\d+))?$/,
  // Inline MDX components embedded inside markdown (e.g., tables)
  mdxInlineComponent: /<([A-Z][A-Za-z0-9]*)\b[^>]*\/>/g,
};

// Helper Functions

function getExternalRoots() {
  if (externalRoots !== null) return externalRoots;
  try {
    externalRoots = fsSync
      .readdirSync(externalBaseDir, {withFileTypes: true})
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(externalBaseDir, entry.name));
  } catch {
    externalRoots = [];
  }
  return externalRoots;
}

function resolveSnippetPath(relPath, baseDir) {
  const primary = path.resolve(baseDir, relPath);
  if (fsSync.existsSync(primary)) return primary;

  const normalized = path.normalize(relPath).replace(/^(\.\.[/\\])+/, '');
  if (normalized && normalized !== relPath) {
    for (const root of getExternalRoots()) {
      const candidate = path.join(root, normalized);
      if (fsSync.existsSync(candidate)) {
        return candidate;
      }
    }
  }
  return null;
}

function shouldSkipLine(trimmed, inParagraph) {
  // Returns: true to skip entirely, 'break' to end paragraph, false to include
  if (PATTERNS.headingLine.test(trimmed)) return inParagraph ? 'break' : true;
  if (/^import\s+/.test(trimmed)) return true;
  if (PATTERNS.jsxTag.test(trimmed)) return inParagraph ? 'break' : true;
  if (PATTERNS.admonitionStart.test(trimmed))
    return inParagraph ? 'break' : true;
  if (PATTERNS.refLink.test(trimmed)) return true;
  if (PATTERNS.horizontalRule.test(trimmed))
    return inParagraph ? 'break' : true;
  if (PATTERNS.imagePlaceholder.test(trimmed)) return true;
  if (
    PATTERNS.listItem.test(trimmed) ||
    PATTERNS.orderedListItem.test(trimmed)
  ) {
    return inParagraph ? 'break' : true;
  }
  return false;
}

function cleanMarkdownSyntax(text) {
  return text
    .replace(PATTERNS.mdLink, '$1')
    .replace(PATTERNS.refStyleLink, '$1')
    .replace(PATTERNS.bold, '$1')
    .replace(PATTERNS.italicAsterisk, '$1')
    .replace(PATTERNS.italicUnderscore, '$1')
    .replace(PATTERNS.inlineCode, '$1')
    .replace(PATTERNS.imagePlaceholderGlobal, '')
    .trim();
}

function truncateDescription(description, maxLength = 200) {
  if (description.length <= maxLength) return description;

  const truncated = description.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('. ');
  const lastExclaim = truncated.lastIndexOf('! ');
  const lastQuestion = truncated.lastIndexOf('? ');
  const lastSentenceEnd = Math.max(lastPeriod, lastExclaim, lastQuestion);

  if (lastSentenceEnd > maxLength * 0.4) {
    return description.substring(0, lastSentenceEnd + 1);
  }

  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.5) {
    return truncated.substring(0, lastSpace) + '...';
  }
  return truncated + '...';
}

// Description Extraction

function deriveDescription(doc) {
  if (doc?.frontMatter?.description) {
    return String(doc.frontMatter.description).trim();
  }

  const source = doc?.content || doc?.description || '';
  const lines = source.split('\n');
  const paragraphLines = [];
  let inParagraph = false;
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (PATTERNS.codeFence.test(trimmed)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    if (!trimmed) {
      if (inParagraph && paragraphLines.length > 0) break;
      continue;
    }

    const skipResult = shouldSkipLine(trimmed, inParagraph);
    if (skipResult === 'break') break;
    if (skipResult === true) continue;

    inParagraph = true;
    paragraphLines.push(trimmed);

    if (paragraphLines.join(' ').length > 400) break;
  }

  if (paragraphLines.length === 0) return '';

  let description = paragraphLines.join(' ').replace(/\s+/g, ' ').trim();
  description = cleanMarkdownSyntax(description);

  return description || '';
}

// Code Snippet Inlining

function inlineCodeSnippets(content, filePath) {
  if (!filePath) return content;

  const baseDir = path.dirname(filePath);

  return content.replace(PATTERNS.codeImage, (match, alt, url) => {
    if (!alt?.trim().startsWith('code')) return match;

    let urlPart = url.trim().replace(/\s*\n\s*/g, ' ');
    let title = '';
    const titleMatch = urlPart.match(PATTERNS.titleInUrl);
    if (titleMatch) {
      urlPart = titleMatch[1];
      title = titleMatch[2];
    }

    let relPath = urlPart;
    let fragment = '';
    const hashIndex = urlPart.indexOf('#');
    if (hashIndex !== -1) {
      relPath = urlPart.slice(0, hashIndex);
      fragment = urlPart.slice(hashIndex + 1);
    }

    const resolvedPath = resolveSnippetPath(relPath, baseDir);
    if (!resolvedPath) {
      console.warn(
        `llms-symlinks: snippet "${relPath}" not found (from ${filePath})`,
      );
      return match;
    }

    let snippet = fsSync
      .readFileSync(resolvedPath, 'utf8')
      .replace(/\r\n/g, '\n')
      .replace(/\n$/, '');

    if (fragment) {
      const lines = snippet.split('\n');
      const lineRange = fragment.match(PATTERNS.lineRange);

      if (lineRange) {
        const start = parseInt(lineRange[1], 10);
        const end = parseInt(lineRange[2] || lineRange[1], 10);
        if (start < 1 || end > lines.length || start > end) {
          console.warn(
            `llms-symlinks: line range ${fragment} out of bounds in ${resolvedPath}`,
          );
          return match;
        }
        snippet = lines.slice(start - 1, end).join('\n');
      } else {
        const regionStart = lines.findIndex((l) =>
          l.trimEnd().endsWith(`#region ${fragment}`),
        );
        const regionEnd = lines.findIndex((l) =>
          l.trimEnd().endsWith(`#endregion ${fragment}`),
        );
        if (
          regionStart === -1 ||
          regionEnd === -1 ||
          regionStart >= regionEnd
        ) {
          console.warn(
            `llms-symlinks: region ${fragment} not found in ${resolvedPath}`,
          );
          return match;
        }
        snippet = lines.slice(regionStart + 1, regionEnd).join('\n');
      }
    }

    const tokens = alt.trim().split(/\s+/);
    const lang = tokens[1] || '';
    const meta = title ? ` title="${title}"` : '';
    const info = [lang, meta.trim()].filter(Boolean).join(' ').trim();

    return `${info ? `\`\`\`${info}` : '```'}\n${snippet}\n\`\`\``;
  });
}

// Content Cleaning

function cleanMarkdownContent(
  content,
  excludeImports = false,
  removeDuplicateHeadings = false,
) {
  const contentWithSnippets = inlineCodeSnippets(
    content,
    currentMarkdownFilePath,
  );

  const lines = contentWithSnippets.split('\n');
  const processedLines = [];
  let inFence = false;
  let inMdxOpeningTag = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (PATTERNS.codeFence.test(trimmed)) {
      inFence = !inFence;
      processedLines.push(line);
      continue;
    }

    if (inFence) {
      processedLines.push(line);
      continue;
    }

    if (excludeImports && PATTERNS.importStatement.test(line)) continue;

    if (inMdxOpeningTag) {
      if (trimmed.endsWith('>') || trimmed.endsWith('/>'))
        inMdxOpeningTag = false;
      continue;
    }

    const mdxOpenMatch = trimmed.match(PATTERNS.mdxOpenTag);
    if (mdxOpenMatch) {
      if (!trimmed.endsWith('/>') && !trimmed.endsWith('>'))
        inMdxOpeningTag = true;
      continue;
    }

    if (PATTERNS.mdxCloseTag.test(line)) continue;

    const admonitionMatch = line.match(PATTERNS.admonition);
    if (admonitionMatch) {
      if (admonitionMatch[2])
        processedLines.push(admonitionMatch[1] + admonitionMatch[2]);
      continue;
    }

    let cleaned = line
      .replace(PATTERNS.htmlTags, '')
      .replace(PATTERNS.anchorId, '')
      .replace(PATTERNS.mdxInlineComponent, '');
    processedLines.push(cleaned);
  }

  let cleaned = processedLines.join('\n');

  if (removeDuplicateHeadings) {
    const resultLines = [];
    const splitLines = cleaned.split('\n');
    let i = 0;

    while (i < splitLines.length) {
      const currentLine = splitLines[i];
      const headingMatch = currentLine.match(PATTERNS.heading);

      if (headingMatch) {
        const headingText = headingMatch[2].trim();
        resultLines.push(currentLine);
        i++;

        while (i < splitLines.length && splitLines[i].trim() === '') {
          resultLines.push(splitLines[i]);
          i++;
        }

        if (i < splitLines.length) {
          const nextLine = splitLines[i].trim();
          if (nextLine === headingText && !PATTERNS.headingLine.test(nextLine))
            i++;
        }
      } else {
        resultLines.push(currentLine);
        i++;
      }
    }
    cleaned = resultLines.join('\n');
  }

  cleaned = cleaned.replace(PATTERNS.imageLink, (_, alt) =>
    alt.trim() ? `[Image: ${alt.trim()}]` : '',
  );

  return cleaned
    .replace(/\r\n/g, '\n')
    .replace(PATTERNS.multipleNewlines, '\n\n')
    .trim();
}

// Symlink-Aware File Reader

function createSymlinkAwareReader() {
  const readMarkdownFiles = async (
    dir,
    baseDir,
    ignorePatterns = [],
    visited = new Set(),
  ) => {
    let realPath;
    try {
      realPath = await fs.realpath(dir);
    } catch {
      return [];
    }

    if (visited.has(realPath)) return [];
    visited.add(realPath);

    let entries;
    try {
      entries = await fs.readdir(dir, {withFileTypes: true});
    } catch (error) {
      console.warn(`Skipping unreadable directory "${dir}": ${error.message}`);
      return [];
    }

    const files = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (llmsUtils.shouldIgnoreFile(fullPath, baseDir, ignorePatterns))
        continue;

      let isDirectory = entry.isDirectory();
      let isFile = entry.isFile();

      if (entry.isSymbolicLink()) {
        try {
          const stats = await fs.stat(fullPath);
          isDirectory = stats.isDirectory();
          isFile = stats.isFile();
        } catch (error) {
          console.warn(
            `Skipping unreadable symlink "${fullPath}": ${error.message}`,
          );
          continue;
        }
      }

      if (isDirectory) {
        files.push(
          ...(await readMarkdownFiles(
            fullPath,
            baseDir,
            ignorePatterns,
            visited,
          )),
        );
      } else if (
        isFile &&
        /\.mdx?$/.test(entry.name) &&
        !entry.name.startsWith('_')
      ) {
        files.push(fullPath);
      }
    }

    return files;
  };

  readMarkdownFiles.__symlinkPatched = true;
  return readMarkdownFiles;
}

// Plugin Patches (applied once at module load)

if (!llmsUtils.resolvePartialImports?.__axPatched) {
  const original = llmsUtils.resolvePartialImports;
  llmsUtils.resolvePartialImports = async (...args) => {
    currentMarkdownFilePath = args[1];
    return original(...args);
  };
  llmsUtils.resolvePartialImports.__axPatched = true;
}

// Plugin Export

module.exports = function llmsSymlinksPlugin(context, options) {
  if (!llmsUtils.readMarkdownFiles?.__symlinkPatched) {
    llmsUtils.readMarkdownFiles = createSymlinkAwareReader();
  }

  if (!llmsProcessor.processFilesWithPatterns?.__axPatched) {
    const original = llmsProcessor.processFilesWithPatterns;
    llmsProcessor.processFilesWithPatterns = async (...args) => {
      const docs = await original(...args);
      return docs.map((doc) =>
        doc ? {...doc, description: deriveDescription(doc)} : doc,
      );
    };
    llmsProcessor.processFilesWithPatterns.__axPatched = true;
  }

  if (!llmsUtils.cleanMarkdownContent?.__axPatched) {
    llmsUtils.cleanMarkdownContent = cleanMarkdownContent;
    llmsUtils.cleanMarkdownContent.__axPatched = true;
  }

  if (!llmsGenerator.generateStandardLLMFiles?.__axPatched) {
    const originalProcessFilesWithPatterns =
      llmsProcessor.processFilesWithPatterns;

    llmsGenerator.generateStandardLLMFiles = async (context, allDocFiles) => {
      const {outDir, siteUrl, docTitle, docDescription, options} = context;
      const {
        generateLLMsTxt,
        generateLLMsFullTxt,
        llmsTxtFilename = 'llms.txt',
        llmsFullTxtFilename = 'llms-full.txt',
        includeOrder = [],
        includeUnmatchedLast = true,
        version,
        generateMarkdownFiles = false,
        rootContent,
        fullRootContent,
      } = options;

      if (!generateLLMsTxt && !generateLLMsFullTxt) return;

      // Process files using the (already patched) processor so descriptions are clean.
      let processedDocs = await originalProcessFilesWithPatterns(
        context,
        allDocFiles,
        [], // include all
        [], // no extra ignore patterns
        includeOrder,
        includeUnmatchedLast,
      );

      console.log(
        `Processed ${processedDocs.length} documentation files for standard LLM files`,
      );

      // Preserve optional per-doc markdown generation behavior.
      if (generateMarkdownFiles && processedDocs.length > 0) {
        console.log('Generating individual markdown files...');
        processedDocs = await llmsGenerator.generateIndividualMarkdownFiles(
          processedDocs,
          outDir,
          siteUrl,
          context.docsDir,
          context.options.keepFrontMatter || [],
        );
      }

      // Custom llms.txt generation with sentence/word-aware truncation.
      if (generateLLMsTxt) {
        const llmsTxtPath = path.join(outDir, llmsTxtFilename);
        const versionInfo = version ? `\n\nVersion: ${version}` : '';
        const effectiveRootContent =
          rootContent ||
          'This file contains links to documentation sections following the llmstxt.org standard.';

        const tocItems = processedDocs.map((doc) => {
          const baseDescription = (doc.description || '').trim();
          const short = baseDescription
            ? truncateDescription(baseDescription, 200)
            : '';

          return `- [${doc.title}](${doc.url})${short ? `: ${short}` : ''}`;
        });

        const llmFileContent = llmsUtils.createMarkdownContent(
          docTitle,
          `${docDescription}${versionInfo}`,
          `${effectiveRootContent}\n\n## Table of Contents\n\n${tocItems.join(
            '\n',
          )}`,
          true,
        );

        await llmsUtils.writeFile(llmsTxtPath, llmFileContent);
        console.log(`Generated: ${llmsTxtPath}`);
      }

      // Delegate llms-full.txt generation to the original helper.
      if (generateLLMsFullTxt) {
        const llmsFullTxtPath = path.join(outDir, llmsFullTxtFilename);
        await llmsGenerator.generateLLMFile(
          processedDocs,
          llmsFullTxtPath,
          docTitle,
          docDescription,
          true, // full content
          version,
          fullRootContent,
        );
        console.log(`Generated: ${llmsFullTxtPath}`);
      }
    };

    llmsGenerator.generateStandardLLMFiles.__axPatched = true;
  }

  return llmsPlugin(context, options);
};
