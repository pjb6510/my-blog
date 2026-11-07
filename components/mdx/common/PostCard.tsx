import Link from "next/link";
import { loadPost } from "@/lib/posts";
import { site } from "@/lib/site";
import { formatDate } from "@/components/PostMeta";

// 이 블로그의 다른 포스트를 본문에서 카드로 소개한다. 본문에서
// <PostCard id="2026-07-16-1" /> 처럼 포스트 id 로 사용하고, 제목·요약·날짜는
// 그 포스트의 meta 에서 가져온다.
//
// 생김새는 OgCard 와 맞추되, 외부 fetch 없이 빌드 시점에 meta 를 읽고 같은 탭에서
// 이동한다. 없는 id 를 넣으면 loadPost 가 던져 빌드가 실패한다 — 깨진 내부 링크를
// 배포하지 않으려는 의도로, dynamicParams = false 와 같은 원칙.

const host = new URL(site.url).hostname;

export async function PostCard({ id }: { id: string }) {
  const { meta } = await loadPost(id);

  return (
    <Link
      href={`/posts/${id}`}
      className="not-prose group my-8 flex flex-col gap-1.5 rounded-lg border border-border bg-surface px-5 py-4 no-underline transition-colors hover:border-accent"
    >
      <div className="line-clamp-2 font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
        {meta.title}
      </div>
      {meta.excerpt ? (
        <div className="line-clamp-2 text-sm leading-relaxed text-muted">
          {meta.excerpt}
        </div>
      ) : null}
      <div className="mt-1 truncate font-mono text-[11px] tracking-wide text-subtle">
        {host} · {formatDate(meta.date)}
      </div>
    </Link>
  );
}
