import Link from "next/link";
import { getCategories, getAllPosts } from "@/lib/posts";

export async function Sidebar() {
  const [categories, all] = await Promise.all([getCategories(), getAllPosts()]);

  return (
    <aside className="border-b border-border md:sticky md:top-14 md:h-[calc(100dvh-3.5rem)] md:overflow-y-auto md:border-b-0 md:border-r">
      <nav className="px-6 py-8 md:px-8">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
          ─ index
        </p>

        <ul className="space-y-1">
          <li>
            <Link
              href="/posts"
              className="group flex items-baseline justify-between py-1.5 text-foreground transition-colors hover:text-accent"
            >
              <span className="font-serif text-base">전체보기</span>
              <span className="font-mono text-[11px] text-subtle group-hover:text-accent">
                {String(all.length).padStart(2, "0")}
              </span>
            </Link>
          </li>
        </ul>

        <p className="mb-3 mt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
          ─ categories
        </p>

        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.name}>
              <details className="group" open>
                <summary className="flex cursor-pointer list-none items-baseline justify-between py-1.5 text-foreground transition-colors hover:text-accent">
                  <span className="flex items-baseline gap-2">
                    <span
                      aria-hidden
                      className="font-mono text-[10px] text-subtle transition-transform group-open:rotate-90"
                    >
                      ▸
                    </span>
                    <span className="font-serif text-base">{cat.name}</span>
                  </span>
                  <span className="font-mono text-[11px] text-subtle">
                    {String(cat.posts.length).padStart(2, "0")}
                  </span>
                </summary>
                <ul className="mt-1 ml-4 border-l border-border pl-4">
                  {cat.posts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/posts/${post.slug}`}
                        className="block py-1 text-sm text-muted transition-colors hover:text-accent"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
