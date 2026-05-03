import "server-only";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type { ComponentType } from "react";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags?: string[];
  cover?: string;
  excerpt?: string;
};

type LoadedPost = {
  default: ComponentType;
  meta: Omit<PostMeta, "slug">;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

async function listSlugs(): Promise<string[]> {
  const entries = await readdir(POSTS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => e.name.replace(/\.mdx$/, ""));
}

async function loadModule(slug: string): Promise<LoadedPost> {
  return (await import(`@/content/posts/${slug}.mdx`)) as LoadedPost;
}

export const loadPost = cache(async (slug: string) => {
  const mod = await loadModule(slug);
  const meta: PostMeta = { slug, ...mod.meta };
  return { Post: mod.default, meta };
});

export const getAllPosts = cache(async (): Promise<PostMeta[]> => {
  const slugs = await listSlugs();
  const all = await Promise.all(
    slugs.map(async (slug) => {
      const { meta } = await loadModule(slug);
      return { slug, ...meta };
    })
  );
  return all.sort((a, b) => (a.date < b.date ? 1 : -1));
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
