import type { PostMeta as PostMetaType } from "@/lib/posts";

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function PostDate({ date }: { date: string }) {
  return (
    <time
      dateTime={date}
      className="font-mono text-xs uppercase tracking-[0.18em] text-subtle"
    >
      {formatDate(date)}
    </time>
  );
}

export function CategoryTag({ name }: { name: string }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
      ◦ {name}
    </span>
  );
}

export function Tags({ tags }: { tags?: PostMetaType["tags"] }) {
  if (!tags?.length) return null;
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-subtle">
      {tags.map((t) => (
        <li key={t}>#{t}</li>
      ))}
    </ul>
  );
}
