import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, loadPost } from "@/lib/posts";
import { PostDate, Tags } from "@/components/PostMeta";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { meta } = await loadPost(slug);
    return {
      title: meta.title,
      description: meta.excerpt,
      openGraph: {
        title: meta.title,
        description: meta.excerpt,
        images: meta.cover ? [meta.cover] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let Post: React.ComponentType;
  let meta: Awaited<ReturnType<typeof loadPost>>["meta"];
  try {
    const loaded = await loadPost(slug);
    Post = loaded.Post;
    meta = loaded.meta;
  } catch {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl">
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
