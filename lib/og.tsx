import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Shared config for every opengraph-image route.
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

// Brand palette (mirrors --background / --foreground / --accent in globals.css).
const BG = "#222831";
const FG = "#eeeeee";
const MUTED = "#b8bec6";
const SUBTLE = "#7a828d";
const ACCENT = "#00adb5";

const FONT_FAMILY = "Gothic A1";

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 800;
  style: "normal";
};

// next/og (satori) only ships a Latin default font, so Hangul renders as tofu
// unless we supply a Korean font. We fetch only the glyphs that appear in this
// image via Google Fonts' `text=` subsetting — the download is a few KB even for
// Korean. Requested without a modern UA so Google returns TTF (satori needs TTF,
// not woff2). Failure degrades to the default font rather than breaking the build.
async function loadFont(weight: 400 | 800, text: string): Promise<OgFont | null> {
  try {
    const url =
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(FONT_FAMILY)}:wght@${weight}` +
      `&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src:\s*url\((.+?)\)\s*format\('(?:opentype|truetype)'\)/);
    if (!src) return null;
    const res = await fetch(src[1]);
    if (!res.ok) return null;
    return { name: FONT_FAMILY, data: await res.arrayBuffer(), weight, style: "normal" };
  } catch {
    return null;
  }
}

export async function renderOgImage({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  // Glyphs that must exist in the subset: everything we draw, plus the brand line.
  const text = `${eyebrow}${title}${site.title}${site.tagline} ·—`;
  const [regular, bold] = await Promise.all([loadFont(400, text), loadFont(800, text)]);
  const fonts = [regular, bold].filter((f): f is OgFont => f !== null);

  // Long titles get a smaller size so they stay within the card.
  const titleSize = title.length > 22 ? 58 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          borderTop: `10px solid ${ACCENT}`,
          padding: "76px 80px",
          fontFamily: FONT_FAMILY,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 4,
            color: ACCENT,
            fontWeight: 400,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            lineHeight: 1.18,
            fontWeight: 800,
            color: FG,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            fontSize: 30,
            fontWeight: 400,
          }}
        >
          <span style={{ color: MUTED, fontWeight: 800 }}>{site.title}</span>
          <span style={{ color: SUBTLE }}>· {site.tagline}</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, ...(fonts.length ? { fonts } : {}) }
  );
}
