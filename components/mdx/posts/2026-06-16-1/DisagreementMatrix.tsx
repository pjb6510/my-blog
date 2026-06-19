// 지표가 "엇갈리는" 조합이 곧 진단이 된다는 매트릭스.
// 사람·키워드·LLM 채점관의 높음/낮음 조합마다 무엇이 잘못됐는지가 드러난다.
// MDX 인라인 SVG는 포매터 줄바꿈에 <p>로 감싸져 깨지므로 컴포넌트로 분리한다.
// 헤더/진단 텍스트는 fill="currentColor"로 본문 글자색을 따라가고,
// 높음(초록)·낮음(빨강) 색칩은 고정 라이트 색이라 두 테마에서 동일하게 읽힌다.
export function DisagreementMatrix() {
  return (
    <svg
      viewBox="0 0 760 296"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="사람·키워드·LLM 채점관 점수가 엇갈리는 조합마다 키워드 한계, 할루시네이션, 채점관 사각지대라는 진단이 드러난다"
      className="my-8 h-auto w-full"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif',
      }}
    >
      <text x="24" y="26" fontSize="16" fontWeight="700" fill="currentColor">엇갈림이 곧 진단이다</text>
      <text x="24" y="46" fontSize="11.5" fill="currentColor" opacity="0.55">지표가 일치할 때가 아니라 엇갈릴 때, 무엇이 잘못됐는지가 드러난다.</text>

      {/* 헤더 */}
      <text x="84" y="86" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">사람</text>
      <text x="230" y="86" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">키워드 포함율</text>
      <text x="390" y="86" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">LLM 채점관</text>
      <text x="486" y="86" fontSize="12" fontWeight="700" fill="currentColor">이게 말해 주는 것</text>
      <line x1="24" y1="100" x2="736" y2="100" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="158" y1="100" x2="158" y2="274" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
      <line x1="302" y1="100" x2="302" y2="274" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
      <line x1="462" y1="100" x2="462" y2="274" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />

      {/* row 1: 사람 높음 / 키워드 낮음 → 키워드가 의미를 못 따라감 */}
      <rect x="56" y="115.5" width="56" height="27" rx="7" fill="#e9f2eb" stroke="#4a7c59" strokeWidth="1.4" />
      <text x="84" y="133" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4a7c59">높음</text>
      <rect x="202" y="115.5" width="56" height="27" rx="7" fill="#f4e7e4" stroke="#b0584f" strokeWidth="1.4" />
      <text x="230" y="133" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b0584f">낮음</text>
      <text x="390" y="134" textAnchor="middle" fontSize="14" fill="currentColor" opacity="0.3">—</text>
      <text x="474" y="133" fontSize="13" fontWeight="700" fill="#a5783a">→</text>
      <text x="492" y="133" fontSize="12.5" fill="currentColor">키워드 목록이 의미를 못 따라간다</text>
      <line x1="24" y1="158" x2="736" y2="158" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />

      {/* row 2: 사람 낮음 / 키워드 높음 → 할루시네이션 */}
      <rect x="56" y="173.5" width="56" height="27" rx="7" fill="#f4e7e4" stroke="#b0584f" strokeWidth="1.4" />
      <text x="84" y="191" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b0584f">낮음</text>
      <rect x="202" y="173.5" width="56" height="27" rx="7" fill="#e9f2eb" stroke="#4a7c59" strokeWidth="1.4" />
      <text x="230" y="191" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4a7c59">높음</text>
      <text x="390" y="192" textAnchor="middle" fontSize="14" fill="currentColor" opacity="0.3">—</text>
      <text x="474" y="191" fontSize="13" fontWeight="700" fill="#a5783a">→</text>
      <text x="492" y="191" fontSize="12.5" fill="currentColor">할루시네이션을 의심</text>
      <line x1="24" y1="216" x2="736" y2="216" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />

      {/* row 3: 사람·키워드 낮음 / LLM 후함 → 채점관 사각지대 */}
      <rect x="56" y="231.5" width="56" height="27" rx="7" fill="#f4e7e4" stroke="#b0584f" strokeWidth="1.4" />
      <text x="84" y="249" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b0584f">낮음</text>
      <rect x="202" y="231.5" width="56" height="27" rx="7" fill="#f4e7e4" stroke="#b0584f" strokeWidth="1.4" />
      <text x="230" y="249" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b0584f">낮음</text>
      <rect x="362" y="231.5" width="56" height="27" rx="7" fill="#e9f2eb" stroke="#4a7c59" strokeWidth="1.4" />
      <text x="390" y="249" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4a7c59">후함</text>
      <text x="474" y="249" fontSize="13" fontWeight="700" fill="#a5783a">→</text>
      <text x="492" y="249" fontSize="12.5" fill="currentColor">채점관이 못 보던 사각지대</text>
    </svg>
  );
}
