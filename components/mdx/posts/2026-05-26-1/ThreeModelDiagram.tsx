// BoW → 임베딩 → Self-Attention 세 모델을, "단어가 다른 단어와 맺는 관계"를
// 시각적 변수로 삼아 한 줄에 나란히 놓은 비교 도식. 본문 §3 "세 모델을 나란히
// 놓고 보면" 단락에 대응한다.
//
// MDX 인라인 SVG는 포매터가 텍스트를 줄바꿈하면 <p>로 감싸 깨지므로, 진짜 JSX인
// 이 컴포넌트로 분리해 둔다 (DataBehaviorDiagram과 같은 이유).
// 본문 글자색을 따라가는 요소는 fill="currentColor", 강조(accent)는 그룹에
// style={{ color: "var(--accent)" }} 를 주고 그 안에서 currentColor를 쓴다 —
// --accent 가 다크/라이트에서 각각 풀리므로 두 테마 모두 자연스럽다.
export function ThreeModelDiagram() {
  return (
    <svg
      viewBox="0 0 760 332"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="세 모델 비교 — BoW는 단어 사이에 관계가 없이 그냥 더하고, 임베딩은 단어마다 고정된 한 점이며, self-attention은 문맥에 따라 단어 표현을 매번 다시 계산한다"
      className="my-8 h-auto w-full"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif',
      }}
    >
      <line x1="253" y1="58" x2="253" y2="270" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="507" y1="58" x2="507" y2="270" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="4 4" />

      {/* ── Column 1: BoW — 관계 없음 ── */}
      <text x="16" y="28" fontSize="15" fontWeight="700" fill="currentColor">BoW</text>
      <text x="16" y="47" fontSize="11" fill="currentColor" opacity="0.5">단어를 세기만 한다</text>

      <rect x="30" y="70" width="196" height="92" rx="16" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.3" />
      <rect x="44" y="84" width="66" height="24" rx="12" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.32" />
      <text x="77" y="100" fontSize="11" fill="currentColor" textAnchor="middle">tasty</text>
      <rect x="120" y="84" width="50" height="24" rx="12" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.32" />
      <text x="145" y="100" fontSize="11" fill="currentColor" textAnchor="middle">but</text>
      <rect x="70" y="120" width="104" height="24" rx="12" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.32" />
      <text x="122" y="136" fontSize="11" fill="currentColor" textAnchor="middle">expensive</text>

      <text x="128" y="184" fontSize="10" fill="currentColor" opacity="0.5" textAnchor="middle">↓ 더하면 순서가 사라진다</text>
      <rect x="76" y="196" width="104" height="28" rx="7" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.3" />
      <text x="128" y="214" fontSize="12" fill="currentColor" textAnchor="middle">[1, 1, 1]</text>

      {/* ── Column 2: 임베딩 — 고정된 점 ── */}
      <text x="268" y="28" fontSize="15" fontWeight="700" fill="currentColor">임베딩</text>
      <text x="268" y="47" fontSize="11" fill="currentColor" opacity="0.5">단어마다 벡터 한 개</text>

      <rect x="292" y="70" width="176" height="154" rx="8" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.2" />
      <line x1="306" y1="200" x2="454" y2="200" stroke="currentColor" strokeOpacity="0.13" strokeWidth="1" />
      <line x1="318" y1="86" x2="318" y2="210" stroke="currentColor" strokeOpacity="0.13" strokeWidth="1" />

      <line x1="352" y1="108" x2="366" y2="130" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="3 3" />
      <circle cx="352" cy="108" r="3.5" fill="currentColor" />
      <text x="360" y="111" fontSize="9.5" fill="currentColor" opacity="0.8">tasty</text>
      <circle cx="366" cy="130" r="3.5" fill="currentColor" />
      <text x="374" y="133" fontSize="9.5" fill="currentColor" opacity="0.8">delicious</text>

      <line x1="430" y1="176" x2="444" y2="158" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="3 3" />
      <circle cx="430" cy="176" r="3.5" fill="currentColor" />
      <text x="424" y="179" fontSize="9.5" fill="currentColor" opacity="0.8" textAnchor="end">expensive</text>
      <circle cx="444" cy="158" r="3.5" fill="currentColor" />
      <text x="438" y="149" fontSize="9.5" fill="currentColor" opacity="0.8" textAnchor="end">pricey</text>

      {/* ── Column 3: Self-Attention — 문맥마다 재구성 ── */}
      <text x="520" y="28" fontSize="15" fontWeight="700" fill="currentColor">Self-Attention</text>
      <text x="520" y="47" fontSize="11" fill="currentColor" opacity="0.5">문맥에서 매번 새로</text>

      <rect x="545" y="86" width="30" height="24" rx="12" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" />
      <text x="560" y="102" fontSize="11" fill="currentColor" textAnchor="middle">is</text>
      <rect x="610" y="86" width="44" height="24" rx="12" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" />
      <text x="632" y="102" fontSize="11" fill="currentColor" textAnchor="middle">best</text>
      <rect x="681" y="86" width="46" height="24" rx="12" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" />
      <text x="704" y="102" fontSize="11" fill="currentColor" textAnchor="middle">meal</text>

      <text x="632" y="224" fontSize="9.5" fill="currentColor" opacity="0.6" textAnchor="middle">best · meal 옆 → 좋은 뜻</text>

      {/* attention 가중치(화살표 굵기)와 focus 단어는 accent 색으로 */}
      <g style={{ color: "var(--accent)" }}>
        <line x1="560" y1="110" x2="614" y2="174" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
        <line x1="632" y1="110" x2="632" y2="174" stroke="currentColor" strokeWidth="3.4" />
        <line x1="704" y1="110" x2="650" y2="174" stroke="currentColor" strokeWidth="2.8" />
        <polygon points="614,176 610,169 618,169" fill="currentColor" fillOpacity="0.4" />
        <polygon points="632,176 628,169 636,169" fill="currentColor" />
        <polygon points="650,176 646,169 654,169" fill="currentColor" />

        <rect x="600" y="176" width="64" height="30" rx="14" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.7" />
        <text x="632" y="196" fontSize="13" fontWeight="700" fill="currentColor" textAnchor="middle">sick</text>

        <text x="128" y="256" fontSize="11" fontWeight="700" fill="currentColor" textAnchor="middle">관계 없음 — 그냥 더한다</text>
        <text x="380" y="256" fontSize="11" fontWeight="700" fill="currentColor" textAnchor="middle">고정된 점 — 문맥 무관</text>
        <text x="632" y="256" fontSize="11" fontWeight="700" fill="currentColor" textAnchor="middle">옆 단어가 의미를 정한다</text>
      </g>

      {/* 왼쪽 → 오른쪽: 관계가 의미를 만드는 정도가 커진다 */}
      <line x1="44" y1="294" x2="700" y2="294" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.3" />
      <polygon points="712,294 700,289 700,299" fill="currentColor" fillOpacity="0.25" />
      <text x="372" y="318" fontSize="11" fill="currentColor" opacity="0.5" textAnchor="middle">오른쪽으로 갈수록, 관계가 의미를 더 많이 만든다</text>
    </svg>
  );
}
