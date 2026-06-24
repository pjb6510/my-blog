// PreToolUse(Bash) 훅 — git commit 직전, 윤문 안 된 신규 포스트가 커밋에 들어가려 하면
// 커밋을 거부하고 Claude에게 humanize-korean 윤문을 지시한다.
//
// 이 커밋이 history에 새로 들이는 content/posts/*.mdx 를 두 경로로 모은다:
//   (a) 이미 staged-added 된 신규 포스트 (git diff --cached --diff-filter=A)
//   (b) 명령어가 content/posts 를 git add (또는 git add . / -A / --all) 하는 경우,
//       아직 untracked 인 신규 포스트 — `git add X && git commit` 한 줄 호출을 커버한다.
//       (훅은 git add 실행 전에 명령어 전체를 가로채므로, (a)만 보면 이 패턴이 빠져나간다.)
// 통과 조건: 대상 신규 포스트 없음 / 'AI와 대화하기' 카테고리뿐 / .git/humanize-ok 센티널이 신선(TTL 내)할 때(1회용).
// 센티널은 커밋 명령과 다른 단계에서 미리 touch 해야 한다(같은 줄에 && 로 묶으면 훅 평가 시점엔 아직 없다).
// 단, touch 후 SENTINEL_TTL_MS 안에 신규 포스트 커밋으로 소비해야 한다 — 그보다 오래되면 무효(stale)로 보고 거부한다.
// 또한 신규 포스트가 없는 커밋이 들어오면, 남아 있던 센티널은 쓰일 곳이 없으므로 그 자리에서 정리한다.
// (이 두 장치가 없으면 이전 세션에서 남은 센티널이 나중의 윤문 안 된 신규 포스트 커밋을 통과시킨다.)
// 실행: node (v24 네이티브 TypeScript) — 별도 빌드·tsx 불필요

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, unlinkSync, statSync } from "node:fs";

type HookInput = {
  tool_input?: { command?: string };
};

const EXCLUDED_CATEGORY = /category:\s*"AI와 대화하기"/;
const SENTINEL = ".git/humanize-ok";
// 센티널 유효 시간(10분). 정상 흐름의 touch→commit 은 수 초이므로 넉넉하고,
// 이전 세션에서 남은 오래된 센티널이 엉뚱한 신규 포스트 커밋을 통과시키는 것을 막는다.
const SENTINEL_TTL_MS = 10 * 60_000;
const POSTS_GLOB = "content/posts/*.mdx";

function git(args: string[]): string {
  return execFileSync("git", ["-c", "core.quotepath=off", ...args], {
    encoding: "utf8",
  });
}

function lines(out: string): string[] {
  return out.split("\n").filter(Boolean);
}

// 센티널이 TTL 안에 만들어진 신선한 것인지. 없거나 stat 실패 시 false.
function sentinelIsFresh(): boolean {
  try {
    return Date.now() - statSync(SENTINEL).mtimeMs <= SENTINEL_TTL_MS;
  } catch {
    return false;
  }
}

function deny(reason: string): never {
  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: reason,
      },
    })
  );
  process.exit(0);
}

let command = "";
try {
  const input: HookInput = JSON.parse(readFileSync(0, "utf8"));
  command = input.tool_input?.command ?? "";
} catch {
  process.exit(0);
}

if (!command.includes("git commit")) process.exit(0);

// 이 명령이 content/posts 를 스테이징하는가 — untracked 신규 포스트를 후보에 넣을지 판단.
// content/posts 경로를 직접 add 하거나, git add . / -A / --all 처럼 광범위하게 add 할 때만 true.
// (무관한 git add src/foo.ts 커밋이 떠도는 draft 포스트 때문에 오탐 거부되는 것을 막는다.)
const addsContentPosts =
  /\bgit\s+add\b/.test(command) &&
  (command.includes("content/posts") ||
    /\bgit\s+add\s+(?:-A\b|--all\b|\.(?:\s|$))/.test(command));

const candidates = new Set<string>();
try {
  // (a) 이미 staged-added 된 신규 포스트
  for (const f of lines(
    git(["diff", "--cached", "--name-only", "--diff-filter=A", "--", POSTS_GLOB])
  )) {
    candidates.add(f);
  }
  // (b) git add 로 곧 스테이징될 untracked 신규 포스트
  if (addsContentPosts) {
    for (const f of lines(
      git(["ls-files", "--others", "--exclude-standard", "--", POSTS_GLOB])
    )) {
      candidates.add(f);
    }
  }
} catch {
  process.exit(0); // git 저장소가 아니거나 git 실패 — 커밋을 막지 않는다
}

const targets = [...candidates].filter(
  (f) => existsSync(f) && !EXCLUDED_CATEGORY.test(readFileSync(f, "utf8"))
);

if (targets.length === 0) {
  // 이 커밋엔 윤문 대상 신규 포스트가 없다. 남아 있는 센티널은 쓰일 곳이 없는 stale 이므로
  // 정리만 하고 통과한다(이전 세션의 잔존 센티널이 나중 커밋을 통과시키는 것을 막는다).
  if (existsSync(SENTINEL)) unlinkSync(SENTINEL);
  process.exit(0);
}

// 윤문 완료 표시(센티널) 처리. 일회용이라 존재하면 무조건 소비(삭제)하되,
// TTL 안에 만들어진 신선한 센티널일 때만 통과시킨다. 오래된(stale) 센티널은 삭제만 하고 거부로 떨어진다.
if (existsSync(SENTINEL)) {
  const fresh = sentinelIsFresh();
  unlinkSync(SENTINEL);
  if (fresh) process.exit(0);
}

deny(`커밋 보류 — 윤문되지 않은 신규 포스트가 이 커밋에 포함됩니다:
${targets.map((f) => `- ${f}`).join("\n")}

다음 절차를 수행한 뒤 커밋을 재시도하세요:
1. humanize-korean 스킬의 quick-rules 룰북으로 위 파일의 본문 산문에서 AI 티를 윤문한다.
   제약: export const meta 블록·import·JSX 컴포넌트·코드 블록·인라인 코드 수정 금지, HTML 주석은 MDX 파싱 에러라 추가 금지, 의미·수치·고유명사·직접 인용 불변, register(격식) 보존, 변경률 30% 이하, AI 티가 없으면 고치지 않는다.
2. 수정된 파일을 git add 로 재스테이징한다.
3. touch .git/humanize-ok 를 실행한 뒤, 별도 단계에서 git commit 을 다시 실행한다.
   (add·touch·commit 을 && 로 한 줄에 묶으면 훅이 커밋 전 상태를 보므로 통과되지 않는다 — 센티널은 커밋 명령보다 먼저 만들어져 있어야 한다.)`);
