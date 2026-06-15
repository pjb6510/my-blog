import { getAllPosts, loadPost } from "@/lib/posts";
import { site } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = site.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Prerender one image per post at build time (so the font is fetched at build,
// not on every request) and 404 anything that isn't a real post.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ id: p.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const { meta } = await loadPost(id);
    return renderOgImage({
      eyebrow: `${meta.category} · ${meta.date}`,
      title: meta.title,
    });
  } catch {
    return renderOgImage({ eyebrow: "POST", title: site.title });
  }
}
