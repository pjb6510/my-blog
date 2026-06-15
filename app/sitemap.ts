import type { MetadataRoute } from "next";
import { getAllPosts, getCategorySlugs } from "@/lib/posts";
import { site } from "@/lib/site";

// Served at /sitemap.xml. Statically generated at build time (no request-time APIs).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const categories = await getCategorySlugs();

  const newest = posts[0]?.date ?? "2026-01-01";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified: newest,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/posts`,
      lastModified: newest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${site.url}/categories/${encodeURIComponent(category)}`,
    lastModified: newest,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/posts/${post.id}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
