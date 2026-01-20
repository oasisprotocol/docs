import * as fs from 'fs';
import * as path from 'path';

import type {Transformer} from 'unified';

import {
  captureDirForSite,
  capturedTreePathForSource,
  wrapCapturedTree,
} from '../plugins/llms/capture';

interface Options {
  siteDir?: string;
}

let hasLoggedCaptureDir = false;

function cleanupTempFile(tempFile: string): void {
  try {
    fs.rmSync(tempFile, {force: true});
  } catch {
    // Ignore cleanup failures
  }
}

function atomicWriteJson(filename: string, payload: unknown): void {
  const dir = path.dirname(filename);
  const base = path.basename(filename);
  const tempFile = path.join(dir, `.${base}.${process.pid}.${Date.now()}.tmp`);

  fs.writeFileSync(tempFile, JSON.stringify(payload), 'utf8');

  try {
    fs.renameSync(tempFile, filename);
  } catch (error) {
    // Retry with force removal on Windows or other systems with file locking
    try {
      fs.rmSync(filename, {force: true});
      fs.renameSync(tempFile, filename);
    } catch {
      cleanupTempFile(tempFile);
      throw error;
    }
  }
}

export default function remarkLlmsCapture(options: Options = {}): Transformer {
  const siteDir =
    typeof options.siteDir === 'string' && options.siteDir.trim()
      ? options.siteDir
      : process.cwd();

  return (tree, vfile) => {
    const sourcePath = vfile.history?.[0] ?? vfile.path;
    if (!sourcePath) return;

    try {
      const resolvedSource = path.isAbsolute(sourcePath)
        ? sourcePath
        : path.join(siteDir, sourcePath);

      const captureDir = captureDirForSite(siteDir);
      fs.mkdirSync(captureDir, {recursive: true});

      if (!hasLoggedCaptureDir) {
        console.info(`llms-export: capturing mdx trees to ${captureDir}`);
        hasLoggedCaptureDir = true;
      }

      const outputPath = capturedTreePathForSource(resolvedSource, siteDir);
      atomicWriteJson(outputPath, wrapCapturedTree(tree));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown error';
      const location = sourcePath ? ` (${sourcePath})` : '';
      // Log warning instead of throwing to allow build to continue
      console.warn(
        `llms-export: warning: failed to capture mdx tree${location}: ${message}`,
      );
    }
  };
}
