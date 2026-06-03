// 데이터·동작 "묶으면 vs 가르면" 대비 도식.
// MDX 인라인 SVG는 포매터가 텍스트를 줄바꿈하면 MDX가 <p>로 감싸 깨지므로,
// 진짜 JSX인 이 컴포넌트로 분리해 둔다. fill="currentColor"는 본문 글자색을
// 따라가 다크/라이트 테마 모두에서 텍스트가 보인다.
export function DataBehaviorDiagram() {
  return (
    <svg
      viewBox="0 0 760 366"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="묶으면 조합의 양상이 많아진다 대 가르면 축마다 따로 관계를 맺는다"
      className="my-8 h-auto w-full"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif',
      }}
    >
      <line x1="380" y1="34" x2="380" y2="332" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 4" />

      {/* LEFT: 묶으면 */}
      <text x="34" y="42" fontSize="16" fontWeight="700" fill="currentColor">묶으면: 조합의 양상이 많아진다</text>
      <text x="34" y="60" fontSize="11.5" fill="currentColor" opacity="0.55">같은 객체끼리도 엮는 방식이 여럿 — 상속·합성·의존…</text>

      <line x1="131" y1="168" x2="131" y2="130" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <polygon points="131,126 126,136 136,136" fill="currentColor" />
      <text x="139" y="152" fontSize="11" fontWeight="600" fill="currentColor">상속</text>
      <line x1="172" y1="195" x2="248" y2="195" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <polygon points="182,189 189,195 182,201 175,195" fill="currentColor" />
      <polygon points="250,195 242,190 242,200" fill="currentColor" />
      <text x="198" y="188" fontSize="11" fontWeight="600" fill="currentColor">합성</text>
      <line x1="140" y1="222" x2="184" y2="268" stroke="currentColor" strokeWidth="1.6" fill="none" strokeDasharray="5 4" />
      <polygon points="188,272 177,267 183,260" fill="currentColor" />
      <text x="146" y="252" fontSize="11" fontWeight="600" fill="currentColor">의존</text>

      <rect x="90" y="72" width="82" height="54" rx="9" fill="#e9f2eb" stroke="#4a7c59" strokeWidth="1.5" />
      <rect x="90" y="72" width="82" height="20" rx="9" fill="#e8f0f9" stroke="#3a6ea5" strokeWidth="1.5" />
      <rect x="90" y="83" width="82" height="9" fill="#e8f0f9" />
      <rect x="90" y="168" width="82" height="54" rx="9" fill="#e9f2eb" stroke="#4a7c59" strokeWidth="1.5" />
      <rect x="90" y="168" width="82" height="20" rx="9" fill="#e8f0f9" stroke="#3a6ea5" strokeWidth="1.5" />
      <rect x="90" y="179" width="82" height="9" fill="#e8f0f9" />
      <text x="131" y="182" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#3a6ea5">데이터</text>
      <text x="131" y="210" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#4a7c59">동작</text>
      <rect x="250" y="168" width="82" height="54" rx="9" fill="#e9f2eb" stroke="#4a7c59" strokeWidth="1.5" />
      <rect x="250" y="168" width="82" height="20" rx="9" fill="#e8f0f9" stroke="#3a6ea5" strokeWidth="1.5" />
      <rect x="250" y="179" width="82" height="9" fill="#e8f0f9" />
      <rect x="150" y="272" width="82" height="54" rx="9" fill="#e9f2eb" stroke="#4a7c59" strokeWidth="1.5" />
      <rect x="150" y="272" width="82" height="20" rx="9" fill="#e8f0f9" stroke="#3a6ea5" strokeWidth="1.5" />
      <rect x="150" y="283" width="82" height="9" fill="#e8f0f9" />

      {/* RIGHT: 가르면 */}
      <text x="416" y="42" fontSize="16" fontWeight="700" fill="currentColor">가르면: 축마다 따로 관계를 맺는다</text>
      <text x="416" y="60" fontSize="11.5" fill="currentColor" opacity="0.55">데이터는 데이터끼리, 동작은 동작끼리</text>

      <text x="470" y="148" textAnchor="end" fontSize="12" fontWeight="700" fill="#3a6ea5">데이터</text>
      <text x="566" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor" opacity="0.55">데이터 합성</text>
      <rect x="486" y="128" width="56" height="32" rx="7" fill="#e8f0f9" stroke="#3a6ea5" strokeWidth="1.5" />
      <rect x="576" y="128" width="56" height="32" rx="7" fill="#e8f0f9" stroke="#3a6ea5" strokeWidth="1.5" />
      <rect x="666" y="128" width="56" height="32" rx="7" fill="#e8f0f9" stroke="#3a6ea5" strokeWidth="1.5" />
      <line x1="542" y1="144" x2="574" y2="144" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <polygon points="576,144 568,139 568,149" fill="currentColor" />
      <line x1="632" y1="144" x2="664" y2="144" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <polygon points="666,144 658,139 658,149" fill="currentColor" />

      <text x="470" y="258" textAnchor="end" fontSize="12" fontWeight="700" fill="#4a7c59">동작</text>
      <text x="566" y="222" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor" opacity="0.55">함수 합성</text>
      <rect x="486" y="238" width="56" height="32" rx="16" fill="#e9f2eb" stroke="#4a7c59" strokeWidth="1.5" />
      <rect x="576" y="238" width="56" height="32" rx="16" fill="#e9f2eb" stroke="#4a7c59" strokeWidth="1.5" />
      <rect x="666" y="238" width="56" height="32" rx="16" fill="#e9f2eb" stroke="#4a7c59" strokeWidth="1.5" />
      <line x1="542" y1="254" x2="574" y2="254" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <polygon points="576,254 568,249 568,259" fill="currentColor" />
      <line x1="632" y1="254" x2="664" y2="254" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <polygon points="666,254 658,249 658,259" fill="currentColor" />

      <text x="566" y="306" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.55">데이터·동작이 각자 따로 관계를 맺는다</text>
    </svg>
  );
}
