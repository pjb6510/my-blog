"use client";

import Giscus from "@giscus/react";
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

export function Comments() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <Giscus
      id="comments"
      repo="pjb6510/my-blog"
      repoId="R_kgDOSTdxAw"
      category="Announcements"
      categoryId="DIC_kwDOSTdxA84C9yyg"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme}
      lang="ko"
      loading="lazy"
    />
  );
}
