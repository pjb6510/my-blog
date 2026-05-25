import Link from "next/link";
import { getSeriesPosts } from "@/lib/posts";

export async function SeriesNav({
  seriesName,
  currentId,
}: {
  seriesName: string;
  currentId: string;
}) {
  const posts = await getSeriesPosts(seriesName);
  if (posts.length < 2) return null;

  return (
    <aside className="my-10 rounded-md border border-border bg-surface/40 px-6 py-5">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-subtle">
          ─ 시리즈
        </span>
        <span className="font-serif text-base text-foreground">
          {seriesName}
        </span>
      </div>
      <ol className="flex flex-col">
        {posts.map((p) => {
          const isCurrent = p.id === currentId;
          const order = String(p.series!.order).padStart(2, "0");
          return (
            <li key={p.id}>
              {isCurrent ? (
                <div
                  aria-current="true"
                  className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 py-1.5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    {order}
                  </span>
                  <span className="font-serif text-[15px] text-foreground">
                    {p.title}
                  </span>
                </div>
              ) : (
                <Link
                  href={`/posts/${p.id}`}
                  className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 py-1.5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
                    {order}
                  </span>
                  <span className="font-serif text-[15px] text-muted transition-colors group-hover:text-accent">
                    {p.title}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
