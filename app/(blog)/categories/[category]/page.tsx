import { notFound } from "next/navigation";
import { getCategorySlugs, getPostsByCategory } from "@/lib/posts";
import { PostList } from "@/components/PostList";

export const dynamicParams = false;

export async function generateStaticParams() {
  const cats = await getCategorySlugs();
  return cats.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return { title: `${category}` };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);
  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-subtle">
          ─ category
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-tight text-foreground">
          {category}
        </h1>
        <p className="mt-3 font-mono text-xs text-subtle">
          {String(posts.length).padStart(2, "0")}편
        </p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
