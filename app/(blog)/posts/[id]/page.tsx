import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, loadPost } from "@/lib/posts";
import { site } from "@/lib/site";
import { PostDate, Tags } from "@/components/PostMeta";
import { Comments } from "@/components/Comments";
import { SeriesNav } from "@/components/SeriesNav";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const { meta } = await loadPost(id);
    const url = `${site.url}/posts/${id}`;
    return {
      title: meta.title,
      description: meta.excerpt,
      alternates: { canonical: `/posts/${id}` },
      openGraph: {
        type: "article",
        url,
        title: meta.title,
        description: meta.excerpt,
        publishedTime: meta.date,
        authors: [site.author],
        tags: meta.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.excerpt,
      },
    };
  } catch {
    return {};
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let Post: React.ComponentType;
  let meta: Awaited<ReturnType<typeof loadPost>>["meta"];
  try {
    const loaded = await loadPost(id);
    Post = loaded.Post;
    meta = loaded.meta;
  } catch {
    notFound();
  }

  const url = `${site.url}/posts/${id}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: meta.title,
      description: meta.excerpt,
      datePublished: meta.date,
      dateModified: meta.date,
      inLanguage: site.lang,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      articleSection: meta.category,
      keywords: meta.tags?.join(", "),
      author: { "@type": "Person", name: site.author, url: site.gitUrl },
      publisher: { "@type": "Person", name: site.author, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.title, item: site.url },
        {
          "@type": "ListItem",
          position: 2,
          name: meta.category,
          item: `${site.url}/categories/${encodeURIComponent(meta.category)}`,
        },
        { "@type": "ListItem", position: 3, name: meta.title, item: url },
      ],
    },
  ];

  return (
    <article className="mx-auto max-w-2xl">
      <JsonLd data={jsonLd} />
      <Link
        href="/posts"
        className="font-mono text-[10px] uppercase tracking-[0.32em] text-subtle transition-colors hover:text-accent"
      >
        ← back to archive
      </Link>

      <header className="mt-10 mb-12 flex flex-col gap-4 border-b border-border pb-10">
        <div className="flex items-center gap-4">
          <Link
            href={`/categories/${meta.category}`}
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent transition-colors hover:text-accent-soft"
          >
            ◦ {meta.category}
          </Link>
          <span aria-hidden className="text-subtle">·</span>
          <PostDate date={meta.date} />
        </div>

        {meta.series ? (
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            ─ {meta.series.name} · {String(meta.series.order).padStart(2, "0")}
          </div>
        ) : null}

        <h1 className="font-serif text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
          {meta.title}
        </h1>

        {meta.excerpt ? (
          <p className="font-serif text-lg italic leading-relaxed text-muted">
            {meta.excerpt}
          </p>
        ) : null}

        <Tags tags={meta.tags} />
      </header>

      {meta.series ? (
        <SeriesNav seriesName={meta.series.name} currentId={meta.id} />
      ) : null}

      {meta.cover ? (
        <div className="mb-12 -mx-6 overflow-hidden md:mx-0 md:rounded-md">
          <Image
            src={meta.cover}
            alt=""
            width={1280}
            height={720}
            className="w-full object-cover"
            priority
          />
        </div>
      ) : null}

      <div className="prose prose-invert max-w-none">
        <Post />
      </div>

      <section className="mt-20 border-t border-border pt-10">
        <Comments />
      </section>

      <footer className="mt-20 border-t border-border pt-10">
        <Link
          href="/posts"
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-muted transition-colors hover:text-accent"
        >
          ─ all posts →
        </Link>
      </footer>
    </article>
  );
}
