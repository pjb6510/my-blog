import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="group flex items-baseline gap-2 text-foreground"
          aria-label={`${site.title} — 홈`}
        >
          <span className="font-serif text-lg tracking-tight transition-colors group-hover:text-accent">
            {site.title}
          </span>
          <span
            aria-hidden
            className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-subtle md:inline"
          >
            ─ {site.tagline}
          </span>
        </Link>

        <nav className="flex items-center gap-3">
          <a
            href={site.gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-accent"
          >
            Git ↗
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
