import { getAllPosts, getPostBodyPreview } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRFC822(date: string): string {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

export async function GET() {
  const posts = await getAllPosts();
  const feedUrl = `${site.url}/rss.xml`;

  const items = await Promise.all(
    posts.map(async (post) => {
      const link = `${site.url}/posts/${post.id}`;
      const preview = await getPostBodyPreview(post.id, 200);
      const excerpt = post.excerpt ?? "";
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="false">${escapeXml(post.id)}</guid>
      <pubDate>${toRFC822(post.date)}</pubDate>
      <description>${escapeXml(excerpt)}</description>
      <content:encoded>${escapeXml(preview)}</content:encoded>
    </item>`;
    })
  );

  const lastBuildDate =
    posts.length > 0 ? toRFC822(posts[0].date) : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <link>${escapeXml(site.url)}</link>
    <description>${escapeXml(site.description)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
