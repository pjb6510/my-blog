// PreToolUse(Bash) 훅 — git commit 직전, 윤문 안 된 신규 포스트가 스테이징돼 있으면
// 커밋을 거부하고 Claude에게 humanize-korean 윤문을 지시한다.
// 통과 조건: 신규 포스트 없음 / 'AI와 대화하기' 카테고리뿐 / .git/humanize-ok 센티널 존재(1회용)
// 실행: node (v24 네이티브 TypeScript) — 별도 빌드·tsx 불필요

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, unlinkSync } from "node:fs";

type HookInput = {
  tool_input?: { command?: string };
};

const EXCLUDED_CATEGORY = /category:\s*"AI와 대화하기"/;
const SENTINEL = ".git/humanize-ok";

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

let staged = "";
try {
  staged = execFileSync(
    "git",
    ["-c", "core.quotepath=off", "diff", "--cached", "--name-only", "--diff-filter=A", "--", "content/posts/*.mdx"],
    { encoding: "utf8" }
  );
} catch {
  process.exit(0); // git 저장소가 아니거나 git 실패 — 커밋을 막지 않는다
}

const targets = staged
  .split("\n")
  .filter(Boolean)
  .filter((f) => existsSync(f) && !EXCLUDED_CATEGORY.test(readFileSync(f, "utf8")));

if (targets.length === 0) process.exit(0);

// 윤문 완료 표시(센티널): 있으면 소비하고 통과
if (existsSync(SENTINEL)) {
  unlinkSync(SENTINEL);
  process.exit(0);
}

deny(`커밋 보류 — 윤문되지 않은 신규 포스트가 스테이징되어 있습니다:
${targets.map((f) => `- ${f}`).join("\n")}

다음 절차를 수행한 뒤 커밋을 재시도하세요:
1. humanize-korean 스킬의 quick-rules 룰북으로 위 파일의 본문 산문에서 AI 티를 윤문한다.
   제약: export const meta 블록·import·JSX 컴포넌트·코드 블록·인라인 코드 수정 금지, HTML 주석은 MDX 파싱 에러라 추가 금지, 의미·수치·고유명사·직접 인용 불변, register(격식) 보존, 변경률 30% 이하, AI 티가 없으면 고치지 않는다.
2. 수정된 파일을 git add로 재스테이징한다.
3. touch .git/humanize-ok 실행 후 동일한 git commit을 다시 실행한다.`);
