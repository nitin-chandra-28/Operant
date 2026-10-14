import fs from 'node:fs';
import path from 'node:path';
import { homedir } from 'node:os';
import { spawnSync } from 'node:child_process';
import type { AgentConfig, ActionLog } from './types';
import { ActionTracker } from './action-traker';

const TEXT_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".mdx",
  ".css",
  ".html",
  ".yml",
  ".yaml",
  ".toml",
  ".txt",
]);

function isProbablyTextFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return TEXT_EXT.has(ext) || ext === "";
}

export class ToolExecutor {
  private overlay = new Map<string, string>();
  private deleted = new Set<string>();
  private readonly norm = (rel: string) =>
    path.posix.normalize(rel.split(path.sep).join("/")).replace(/^\.\//, "");

  constructor(
    private readonly tracker: ActionTracker,
    private readonly config: AgentConfig,
  ) {}
}