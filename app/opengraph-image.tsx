import { site } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

// Default share image for the landing page, archive, and category pages.
// Per-post pages override this with their own opengraph-image.
export const alt = `${site.title} — ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({ eyebrow: "BLOG", title: site.description });
}
