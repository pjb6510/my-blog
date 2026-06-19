// 브랜드 마크 — app/icon.svg와 동일한 글리프(리드 대시 + 본문 2줄)에서
// 다크 타일만 걷어낸 인라인 버전. 헤더처럼 배경 위에 직접 얹는 자리에 쓴다.
// 본문 두 줄은 currentColor라 전경색을 따라가고(테마 적응·호버 시 부모와 함께
// 틸로 전환), 리드 대시만 항상 액센트(틸)로 고정된다.
type Props = { className?: string };

export function BrandMark({ className }: Props) {
  return (
    <svg
      viewBox="24 25 52 50"
      fill="none"
      role="img"
      aria-hidden
      className={className}
    >
      <rect x="28" y="29" width="30" height="9" rx="4.5" style={{ fill: "var(--accent)" }} />
      <rect x="28" y="47" width="44" height="9" rx="4.5" fill="currentColor" />
      <rect x="28" y="62" width="32" height="9" rx="4.5" fill="currentColor" />
    </svg>
  );
}
