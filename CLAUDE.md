@AGENTS.md

# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 스택

Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + `@next/mdx`. TypeScript strict. 패키지 매니저: **pnpm**. Next.js API는 기억에 의존하지 말고 `node_modules/next/dist/docs/`를 먼저 읽을 것 — AGENTS.md 참고.

## 명령어

- `pnpm dev` — 개발 서버 (http://localhost:3000)
- `pnpm build` — 프로덕션 빌드 (모든 포스트/카테고리 페이지를 정적 생성)
- `pnpm start` — 빌드 결과물 서빙
- `pnpm lint` — flat-config ESLint (`eslint.config.mjs`, `eslint-config-next` 확장)
- `pnpm new-post <제목>` — 새 포스트 파일 생성 (자세한 규칙은 아래 "새 글 추가" 참고)

테스트 러너는 설정되어 있지 않음. 타입 체크가 필요하면 `pnpm exec tsc --noEmit`.

## 아키텍처

### MDX를 소스로 쓰는 콘텐츠 파이프라인

포스트는 `content/posts/` 아래 `.mdx` 파일로 존재하며, 런타임에 파싱하지 않고 **모듈로 import**된다. 각 MDX 파일은 다음을 export 한다:
- `default` — 렌더된 MDX 컴포넌트
- `meta` — frontmatter 역할 객체 (`title`, `date`, `category`, optional `tags`, `cover`, `excerpt`)

**파일명 규칙**: `YYYY-MM-DD-N-제목.mdx`. 앞 부분 `YYYY-MM-DD-N`이 포스트의 영구 **id**이자 URL slug (`/posts/<id>`)다. `N`은 그 날짜 내 순번(1부터). 파일명은 `lib/posts.ts`의 `FILENAME_RE = /^(\d{4}-\d{2}-\d{2}-\d+)-(.+)\.mdx$/`로 파싱되며, 이 패턴에 맞지 않는 파일은 무시된다. id는 한 번 정하면 절대 바꾸지 않음 — 제목/내용은 자유롭게 수정해도 URL 안 깨짐. 제목 부분(파일명 뒷부분)은 한글 자유.

`lib/posts.ts`가 콘텐츠 접근의 단일 진입점이다. `"server-only"`이며 요청 단위 중복 호출을 막기 위해 `React.cache`를 사용한다. `loadModule`은 `await import(\`@/content/posts/${filename}.mdx\`)`로 동적 import 하고 (`filename`은 확장자 제외 전체 파일명), Next.js MDX 로더(`next.config.mjs`의 `@next/mdx`)가 빌드 시점에 각 파일을 컴파일한다. `loadPost(id)`는 파일 목록을 스캔해서 id로 파일을 찾은 뒤 동적 import 한다.

**새 글 추가**: `pnpm new-post "<제목>"` 실행 → `scripts/new-post.mjs`가 오늘 날짜 + 다음 `N`을 계산해 frontmatter 스캐폴드 파일을 생성. 수동으로 만들 거면 `ls content/posts | sort -r | head`로 마지막 id 보고 `YYYY-MM-DD-N` 규칙 따라 새 파일 추가. 별도 매니페스트/인덱스 파일을 갱신할 필요 없음.

`next.config.mjs`의 `pageExtensions`에 `md`/`mdx`가 포함되어 있어 `app/` 아래 둔 MDX는 라우트가 되지만, 이 저장소는 콘텐츠는 `content/`, 라우트는 `app/`로 분리하고 그 사이를 `lib/posts.ts`가 잇는 구조다.

### 라우트

App Router에 라우트 그룹 두 개 (괄호 = URL 세그먼트 없음):
- `app/(landing)/page.tsx` — `/` 랜딩 페이지 (사이드바 없음)
- `app/(blog)/layout.tsx` — 블로그 페이지를 `TopBar` + `Sidebar` 셸로 감쌈
  - `posts/page.tsx` — `/posts` 아카이브
  - `posts/[id]/page.tsx` — 개별 포스트 (URL은 `YYYY-MM-DD-N` 형태의 id); `dynamicParams = false` + `getAllPosts()` 기반 `generateStaticParams`
  - `categories/[category]/page.tsx` — `/categories/<name>`; `getCategorySlugs()` 기반 동일 SSG 패턴

두 다이내믹 라우트 모두 `dynamicParams = false`로 두어, 생성되지 않은 포스트/카테고리가 요청되면 빌드가 실패하도록 한다.

### MDX 렌더링

저장소 루트의 `mdx-components.tsx`가 `useMDXComponents`를 제공한다 (Next.js 컨벤션 — 이름이나 위치를 바꾸지 말 것). 현재는 `<img>` → `next/image`로 치환하는 역할만 한다. MDX 엘리먼트 커스텀 오버라이드는 여기에 추가.

### 테마

다크 모드 기본, 페이퍼-크림 라이트 모드. 테마 토글은 `<html>`의 `.dark` 클래스 추가/제거로 동작한다. `app/layout.tsx`의 `<head>`에 들어가는 인라인 `ThemeScript`가 `localStorage.theme`을 동기적으로 읽어 FOUC를 방지한다. CSS는 Tailwind v4의 `@theme inline` + `@custom-variant dark` 조합이라 유틸리티 클래스가 `app/globals.css`에 정의된 CSS 변수로 풀린다. 색상 변경은 Tailwind 클래스가 아니라 **`globals.css`의 CSS 변수에서** 할 것.

### 경로 별칭

`@/*` → 저장소 루트 (`tsconfig.json`). 전반적으로 사용됨 — `@/lib/posts`, `@/components/...`, `@/content/posts/${filename}.mdx`.
