import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/PostList";

export const metadata: Metadata = {
  title: "전체 글",
  description: "전체 글 아카이브",
  alternates: { canonical: "/posts" },
};

export default async function AllPostsPage() {
  const posts = await getAllPosts();
  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-subtle">
          ─ archive
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-tight text-foreground">
          전체 글
        </h1>
        <p className="mt-3 font-mono text-xs text-subtle">
          총 {String(posts.length).padStart(2, "0")}편
        </p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
