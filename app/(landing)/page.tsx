import Link from "next/link";
import { FaGithub, FaRss } from "react-icons/fa";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { CategoryTag, PostDate } from "@/components/PostMeta";
import { JsonLd } from "@/components/JsonLd";

export default async function Landing() {
  const posts = (await getAllPosts()).slice(0, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.title,
    alternateName: site.tagline,
    url: site.url,
    description: site.description,
    inLanguage: site.lang,
    author: { "@type": "Person", name: site.author, url: site.gitUrl },
  };

  return (
    <main className="relative mx-auto flex min-h-dvh max-w-6xl flex-col px-6 pb-20 pt-16 md:px-12 md:pt-24">
      <JsonLd data={jsonLd} />
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-subtle">
        ─ a personal log, est. 2026
      </p>

      <div className="mt-10 grid gap-x-16 md:grid-cols-[1.1fr_1fr] md:gap-x-20 md:items-end">
        <div>
          <h1 className="break-keep font-serif text-[clamp(3.5rem,11vw,9rem)] leading-[0.9] tracking-[-0.04em] text-foreground">
            {site.title}.
          </h1>
        </div>
      </div>

      <hr className="my-16 border-0 border-t border-border md:my-20" />

      <section>
        <header className="mb-10 flex items-baseline justify-between">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.32em] text-subtle">
            ─ recent ({String(posts.length).padStart(2, "0")})
          </h2>
          <Link
            href="/posts"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-accent"
          >
            전체 보기 →
          </Link>
        </header>

        <ul className="divide-y divide-border">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/posts/${post.id}`}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 py-6 md:grid-cols-[120px_1fr_auto] md:gap-x-10"
              >
                <PostDate date={post.date} />
                <div className="flex flex-col gap-1">
                  <CategoryTag name={post.category} />
                  <h3 className="font-serif text-xl leading-snug text-foreground transition-colors group-hover:text-accent md:text-2xl">
                    {post.title}
                  </h3>
                </div>
                <span
                  aria-hidden
                  className="col-span-2 mt-1 font-mono text-xs text-subtle transition-colors group-hover:text-accent md:col-span-1 md:mt-0 md:self-start md:pt-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-auto flex items-baseline justify-between gap-6 pt-20 font-mono text-[10px] uppercase tracking-[0.32em] text-subtle">
        <span>
          © {new Date().getFullYear()} {site.author}
        </span>
        <nav className="flex items-center gap-5">
          <a
            href="/rss.xml"
            aria-label="RSS 피드"
            className="transition-colors hover:text-accent"
          >
            <FaRss size={15} />
          </a>
          <a
            href={site.gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-accent"
          >
            <FaGithub size={17} />
          </a>
        </nav>
      </footer>
    </main>
  );
}
