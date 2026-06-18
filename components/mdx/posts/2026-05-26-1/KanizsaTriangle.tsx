// 카니자(Kanizsa) 삼각형 — 게슈탈트 §4용 도식.
// 똑같은 "한 입 베어 문 동그라미" 세 개를, 왼쪽은 입을 안쪽으로 모아(→ 선이
// 하나도 없는데 삼각형이 보임), 오른쪽은 바깥으로 돌려(→ 아무 형태도 안 보임)
// 나란히 놓는다. "같은 부분, 배치가 전체를 만든다"를 한 컷으로 — 세 모델 도식의
// "같은 요소, 다른 관계" 모티프와 같은 자리.
//
// 인듀서(동그라미)는 fill="currentColor" 라 본문 글자색을 따라간다: 다크에서는
// 밝은 조각/어두운 배경, 라이트에서는 그 반대 — 어느 쪽이든 대비가 유지돼
// 주관적 윤곽(없는 삼각형의 경계)이 떠오른다. 삼각형 영역은 일부러 비워 둔다
// (선을 그리는 순간 착시가 아니게 되므로). 강조 텍스트만 --accent.
//
// pac-man 경로: 중심에서 두 입가 점으로 그은 뒤, 입(60° 쐐기)을 뺀 바깥쪽
// 300° 호(largeArc=1, sweep=0)로 두 점을 잇는다.
export function KanizsaTriangle() {
  return (
    <svg
      viewBox="0 0 760 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="카니자 삼각형 — 똑같은 조각 세 개를 안쪽으로 모으면 선이 하나도 없는데 삼각형이 보이고, 바깥으로 돌려놓으면 아무것도 보이지 않는다. 부분이 아니라 배치가 전체를 만든다는 것"
      className="my-8 h-auto w-full"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif',
      }}
    >
      <text x="16" y="26" fontSize="14" fontWeight="700" fill="currentColor">전체는 부분의 합 이상</text>

      <line x1="380" y1="44" x2="380" y2="232" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="4 4" />

      {/* ── 왼쪽: 안쪽으로 모으면 삼각형이 보인다 ── */}
      <path d="M 190 72 L 205 98 A 30 30 0 1 0 175 98 Z" fill="currentColor" fillOpacity="0.9" />
      <path d="M 122.5 189 L 137.5 163 A 30 30 0 1 0 152.5 189 Z" fill="currentColor" fillOpacity="0.9" />
      <path d="M 257.5 189 L 227.5 189 A 30 30 0 1 0 242.5 163 Z" fill="currentColor" fillOpacity="0.9" />

      {/* ── 오른쪽: 같은 조각을 바깥으로 돌리면 아무것도 없다 ── */}
      <path d="M 572 72 L 557 46 A 30 30 0 1 0 587 46 Z" fill="currentColor" fillOpacity="0.9" />
      <path d="M 504.5 189 L 489.5 215 A 30 30 0 1 0 474.5 189 Z" fill="currentColor" fillOpacity="0.9" />
      <path d="M 639.5 189 L 669.5 189 A 30 30 0 1 0 654.5 215 Z" fill="currentColor" fillOpacity="0.9" />

      <text x="572" y="251" fontSize="11.5" fontWeight="700" fill="currentColor" opacity="0.65" textAnchor="middle">아무것도 안 보인다</text>
      <text x="572" y="269" fontSize="9.5" fill="currentColor" opacity="0.5" textAnchor="middle">조각을 바깥으로 돌리면</text>

      <g style={{ color: "var(--accent)" }}>
        <text x="190" y="251" fontSize="11.5" fontWeight="700" fill="currentColor" textAnchor="middle">삼각형이 보인다</text>
        <text x="190" y="269" fontSize="9.5" fill="currentColor" opacity="0.85" textAnchor="middle">선은 한 번도 그려진 적 없는데</text>
      </g>
    </svg>
  );
}
