"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_THEME, type Theme } from "@/lib/theme";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const cls = document.documentElement.classList;
    if (next === "dark") {
      cls.add("dark");
    } else {
      cls.remove("dark");
    }
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="group relative h-8 w-8 rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <span aria-hidden className="absolute inset-0 grid place-items-center text-[14px]">
        {theme === "dark" ? "☼" : "☾"}
      </span>
    </button>
  );
}
