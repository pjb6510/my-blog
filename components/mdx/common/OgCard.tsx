import { cache } from "react";

// 외부 링크의 Open Graph 메타데이터를 빌드 시점에 가져와 링크 미리보기 카드로
// 렌더한다. 본문에서 <OgCard url="https://..." /> 로 사용하고, 필요하면
// title/description/siteName/image prop 으로 가져온 값을 덮어쓸 수 있다.
//
// fetch 가 실패하면 도메인만 보여주는 최소 카드로 graceful degrade 한다 —
// lib/og.tsx 의 폰트 로더와 같은 "실패해도 빌드는 산다" 원칙.

type OgData = {
  title: string;
  description?: string;
  siteName?: string;
  image?: string;
  favicon?: string;
};

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(s: string): string {
  return s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, code: string) => {
    if (code[0] === "#") {
      const cp =
        code[1] === "x" || code[1] === "X"
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : m;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? m;
  });
}

// 속성 순서·따옴표 종류와 무관하게 한 태그에서 attr 값을 뽑는다.
function attr(tag: string, name: string): string | undefined {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  if (!m) return undefined;
  return decodeEntities(m[2] ?? m[3] ?? "");
}

function safeHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function parseOg(html: string, baseUrl: string): OgData {
  const tags: Record<string, string> = {};
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const key = (attr(tag, "property") ?? attr(tag, "name"))?.toLowerCase();
    const content = attr(tag, "content");
    if (key && content && !(key in tags)) tags[key] = content; // 첫 값 우선
  }

  const titleTag = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const docTitle = titleTag ? decodeEntities(titleTag[1].trim()) : undefined;

  let favicon: string | undefined;
  for (const link of html.match(/<link\b[^>]*>/gi) ?? []) {
    if ((attr(link, "rel")?.toLowerCase() ?? "").includes("icon")) {
      favicon = attr(link, "href");
      if (favicon) break;
    }
  }

  const resolve = (u?: string) => {
    if (!u) return undefined;
    try {
      return new URL(u, baseUrl).toString();
    } catch {
      return undefined;
    }
  };

  return {
    title:
      tags["og:title"] ??
      tags["twitter:title"] ??
      docTitle ??
      safeHostname(baseUrl),
    description:
      tags["og:description"] ??
      tags["twitter:description"] ??
      tags["description"],
    siteName: tags["og:site_name"],
    image: resolve(tags["og:image"] ?? tags["twitter:image"]),
    favicon: resolve(favicon) ?? `${new URL(baseUrl).origin}/favicon.ico`,
  };
}

// React.cache 로 같은 빌드 안의 중복 fetch(여러 포스트가 같은 URL을 카드로 쓸 때)를 막는다.
const fetchOg = cache(async (url: string): Promise<OgData> => {
  try {
    const res = await fetch(url, {
      headers: {
        // 일부 사이트가 봇 UA에 빈 페이지를 주므로 일반 데스크톱 UA로 요청한다.
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      },
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return parseOg(await res.text(), res.url || url);
  } catch {
    return { title: safeHostname(url) };
  }
});

export async function OgCard({
  url,
  title,
  description,
  siteName,
  image,
}: {
  url: string;
  title?: string;
  description?: string;
  siteName?: string;
  image?: string;
}) {
  const data = await fetchOg(url);
  const cardTitle = title ?? data.title;
  const cardDesc = description ?? data.description;
  const cardSite = siteName ?? data.siteName ?? safeHostname(url);
  const cardImage = image ?? data.image;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose group my-8 flex overflow-hidden rounded-lg border border-border bg-surface no-underline transition-colors hover:border-accent"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 px-5 py-4">
        <div className="line-clamp-2 font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
          {cardTitle}
        </div>
        {cardDesc ? (
          <div className="line-clamp-2 text-sm leading-relaxed text-muted">
            {cardDesc}
          </div>
        ) : null}
        <div className="mt-1 flex items-center gap-2 text-subtle">
          {data.favicon ? (
            // eslint-disable-next-line @next/next/no-img-element -- 외부 파비콘, 최적화 불필요
            <img
              src={data.favicon}
              alt=""
              width={16}
              height={16}
              className="h-4 w-4 rounded-sm"
            />
          ) : null}
          <span className="truncate font-mono text-[11px] tracking-wide">
            {cardSite}
          </span>
        </div>
      </div>
      {cardImage ? (
        <div className="relative hidden w-40 shrink-0 self-stretch sm:block">
          {/* eslint-disable-next-line @next/next/no-img-element -- 외부 OG 이미지, 원격 도메인 가변 */}
          <img
            src={cardImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ) : null}
    </a>
  );
}
