#!/usr/bin/env node
import { readdir, writeFile, access } from "node:fs/promises";
import { join } from "node:path";
import { argv, exit, cwd } from "node:process";

const POSTS_DIR = join(cwd(), "content", "posts");
const FILENAME_RE = /^(\d{4}-\d{2}-\d{2})-(\d+)-(.+)\.mdx$/;

const title = argv.slice(2).join(" ").trim();
if (!title) {
  console.error("사용법: pnpm new-post <제목>");
  console.error('예시: pnpm new-post "권력이란 어디서 오는 걸까"');
  exit(1);
}

const today = new Date().toISOString().slice(0, 10);

const entries = await readdir(POSTS_DIR, { withFileTypes: true });
let maxN = 0;
for (const e of entries) {
  if (!e.isFile()) continue;
  const m = FILENAME_RE.exec(e.name);
  if (!m) continue;
  if (m[1] !== today) continue;
  const n = Number(m[2]);
  if (n > maxN) maxN = n;
}
const nextN = maxN + 1;

const titleSlug = title
  .trim()
  .replace(/\s+/g, "-")
  .replace(/[\\/:*?"<>|]/g, "");

const filename = `${today}-${nextN}-${titleSlug}.mdx`;
const filepath = join(POSTS_DIR, filename);

try {
  await access(filepath);
  console.error(`이미 존재합니다: ${filename}`);
  exit(1);
} catch {
  // ok
}

const titleEscaped = title.replace(/"/g, '\\"');
const body = `export const meta = {
  title: "${titleEscaped}",
  date: "${today}",
  category: "",
  tags: [],
  excerpt: "",
};

`;

await writeFile(filepath, body, "utf8");
console.log(`생성: content/posts/${filename}`);
console.log(`URL : /posts/${today}-${nextN}`);
