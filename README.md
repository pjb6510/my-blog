# my-blog

MDX로 쓰고, Next.js로 정적 빌드하는 개인 블로그.

## 스택

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** — `@theme inline` + `@custom-variant dark`
- **@next/mdx** + **shiki** / **rehype-pretty-code** (빌드 타임 코드 하이라이팅)
- TypeScript strict, 패키지 매니저는 **pnpm**

## 시작하기

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # 모든 포스트/카테고리 페이지를 정적 생성
pnpm start        # 빌드 결과물 서빙
pnpm lint
```

테스트 러너는 없습니다. 타입 체크가 필요하면 `pnpm exec tsc --noEmit`.

## 글 추가하기

`content/posts/` 아래에 `.mdx` 파일을 하나 만들고, `meta`를 export 하면 끝입니다. 별도 매니페스트나 인덱스를 갱신할 필요 없이 `lib/posts.ts`가 글 목록과 카테고리를 모두 추론합니다.

```mdx
export const meta = {
  title: "글 제목",
  date: "2026-05-04",
  category: "dev",         // /categories/<name>
  tags: ["next", "mdx"],   // optional
  excerpt: "한 줄 요약",     // optional
  cover: "/images/...",    // optional
};

## 본문 시작
...
```

빌드 시점에 `/posts/[slug]`와 `/categories/[category]`가 `generateStaticParams` 기반으로 정적 생성됩니다. 두 라우트 모두 `dynamicParams = false`라, 등록되지 않은 slug/category는 빌드를 깨뜨립니다 — 의도된 가드입니다.

## 구조

```
app/
  (landing)/           /  랜딩 페이지 (사이드바 없음)
  (blog)/              TopBar + Sidebar 셸로 감싼 블로그
    posts/             /posts 아카이브, /posts/[slug] 개별 포스트
    categories/        /categories/[category]
content/posts/         .mdx 글 (소스 오브 트루스)
lib/posts.ts           콘텐츠 접근 단일 진입점 (server-only, React.cache)
components/            TopBar / Sidebar / PostList / PostMeta / ThemeToggle ...
mdx-components.tsx     MDX 엘리먼트 오버라이드 (Next.js 컨벤션)
```

자세한 아키텍처 노트는 [`CLAUDE.md`](./CLAUDE.md) / [`AGENTS.md`](./AGENTS.md)를 참고하세요.

## 테마

다크 기본, 페이퍼-크림 라이트. `<html>`의 `.dark` 클래스 토글로 전환되며, `localStorage.theme`을 동기로 읽는 인라인 `ThemeScript`가 FOUC를 막습니다. 코드 블록도 같은 클래스로 분기되어 라이트/다크 테마가 따라옵니다. 색상은 `app/globals.css`의 CSS 변수에서 단일 관리합니다 — Tailwind 유틸리티 클래스를 직접 고치지 말고 변수에서 바꾸세요.

## 경로 별칭

`@/*` → 저장소 루트. 예: `@/lib/posts`, `@/components/TopBar`, `@/content/posts/${slug}.mdx`.

## 배포

[Vercel](https://vercel.com/new)이 가장 간단합니다. 모든 라우트가 정적이라 어떤 정적 호스팅으로도 배포할 수 있습니다.
