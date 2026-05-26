import Link from "next/link";
import { FaGithub, FaRss } from "react-icons/fa";
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

        <nav className="flex items-center gap-4">
          <a
            href="/rss.xml"
            aria-label="RSS 피드"
            className="text-muted transition-colors hover:text-accent"
          >
            <FaRss size={15} />
          </a>
          <a
            href={site.gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent"
          >
            <FaGithub size={17} />
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
