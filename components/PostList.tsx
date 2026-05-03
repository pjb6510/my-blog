import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { CategoryTag, PostDate } from "@/components/PostMeta";

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return <p className="text-muted">아직 글이 없습니다.</p>;
  }
  return (
    <ul className="divide-y divide-border">
      {posts.map((post, i) => (
        <li key={post.slug}>
          <Link
            href={`/posts/${post.slug}`}
            className="group grid grid-cols-[auto_1fr] gap-x-8 py-7 transition-colors md:grid-cols-[110px_1fr_auto] md:gap-x-10"
          >
            <span
              aria-hidden
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle md:pt-1"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="flex flex-col gap-2">
              <CategoryTag name={post.category} />
              <h3 className="font-serif text-2xl leading-tight text-foreground transition-colors group-hover:text-accent md:text-[28px]">
                {post.title}
              </h3>
              {post.excerpt ? (
                <p className="line-clamp-2 max-w-xl text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
              ) : null}
            </div>

            <div className="col-span-2 mt-2 md:col-span-1 md:mt-0 md:self-start md:pt-2 md:text-right">
              <PostDate date={post.date} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
