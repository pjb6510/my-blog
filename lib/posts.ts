import "server-only";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type { ComponentType } from "react";

export type PostMeta = {
  id: string;
  title: string;
  date: string;
  category: string;
  tags?: string[];
  cover?: string;
  excerpt?: string;
  isHidden: boolean;
};

type RawMeta = Omit<PostMeta, "id" | "isHidden"> & { isHidden?: boolean };

type LoadedPost = {
  default: ComponentType;
  meta: RawMeta;
};

function normalizeMeta(id: string, raw: RawMeta): PostMeta {
  return { id, ...raw, isHidden: raw.isHidden ?? false };
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const FILENAME_RE = /^(\d{4}-\d{2}-\d{2}-\d+)-(.+)\.mdx$/;

type FileEntry = { id: string; filename: string };

const listFiles = cache(async (): Promise<FileEntry[]> => {
  const entries = await readdir(POSTS_DIR, { withFileTypes: true });
  const files: FileEntry[] = [];
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith(".mdx")) continue;
    const m = FILENAME_RE.exec(e.name);
    if (!m) continue;
    files.push({ id: m[1], filename: e.name.slice(0, -4) });
  }
  return files;
});

async function loadModule(filename: string): Promise<LoadedPost> {
  return (await import(`@/content/posts/${filename}.mdx`)) as LoadedPost;
}

export const loadPost = cache(async (id: string) => {
  const files = await listFiles();
  const file = files.find((f) => f.id === id);
  if (!file) throw new Error(`Post not found: ${id}`);
  const mod = await loadModule(file.filename);
  const meta = normalizeMeta(id, mod.meta);
  return { Post: mod.default, meta };
});

export const getAllPosts = cache(async (): Promise<PostMeta[]> => {
  const files = await listFiles();
  const all = await Promise.all(
    files.map(async ({ id, filename }) => {
      const { meta } = await loadModule(filename);
      return normalizeMeta(id, meta);
    })
  );
  return all
    .filter((p) => !p.isHidden)
    .sort((a, b) => (a.id < b.id ? 1 : -1));
});

export const getCategories = cache(async () => {
  const posts = await getAllPosts();
  const map = new Map<string, PostMeta[]>();
  for (const post of posts) {
    const list = map.get(post.category) ?? [];
    list.push(post);
    map.set(post.category, list);
  }
  return Array.from(map, ([name, posts]) => ({ name, posts })).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
});

export async function getPostsByCategory(category: string) {
  const posts = await getAllPosts();
  return posts.filter((p) => p.category === category);
}

export async function getCategorySlugs() {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.map((p) => p.category)));
}
