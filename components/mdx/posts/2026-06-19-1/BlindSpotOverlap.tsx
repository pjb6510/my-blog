// 지표 3개를 겹쳐 사각지대를 덮는 도식 (벤다이어그램 풍).
// 바깥 테두리 = "측정하려는 진짜 품질" 전체. 세 원이 겹칠수록 덮이는
// 영역은 넓어지지만, 끝내 안 덮이는 구석(셋이 함께 못 보는 자리)이 남는다.
// MDX 인라인 SVG는 포매터 줄바꿈에 <p>로 감싸져 깨지므로 컴포넌트로 분리한다.
// 텍스트/선은 fill="currentColor"로 본문 글자색을 따라가 다크/라이트 모두에서
// 보이고, 색칩은 고정 라이트 색이라 두 테마에서 동일하게 읽힌다.
export function BlindSpotOverlap() {
  return (
    <svg
      viewBox="0 0 760 452"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="키워드 포함율·사람 평가·LLM 채점관 세 지표를 겹치면 덮이는 영역이 넓어지지만 셋이 함께 못 보는 자리가 남는다"
      className="my-8 h-auto w-full"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif',
      }}
    >
      <text x="24" y="26" fontSize="16" fontWeight="700" fill="currentColor">겹쳐서 빈자리를 줄인다</text>
      <text x="24" y="46" fontSize="11.5" fill="currentColor" opacity="0.55">바깥 테두리가 ‘측정하려는 진짜 품질’ 전체.</text>
      <text x="24" y="63" fontSize="11.5" fill="currentColor" opacity="0.55">겹칠수록 덮이는 영역은 넓어지지만, 끝내 안 덮이는 구석이 남는다.</text>

      {/* 측정하려는 진짜 품질 전체 */}
      <rect x="150" y="80" width="472" height="322" rx="16" fill="none" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1.5" strokeDasharray="5 5" />

      {/* 세 지표가 덮는 영역 */}
      <circle cx="318" cy="198" r="106" fill="#3a6ea5" fillOpacity="0.16" stroke="#3a6ea5" strokeOpacity="0.8" strokeWidth="1.5" />
      <circle cx="448" cy="190" r="106" fill="#4a7c59" fillOpacity="0.16" stroke="#4a7c59" strokeOpacity="0.8" strokeWidth="1.5" />
      <circle cx="388" cy="278" r="104" fill="#a5783a" fillOpacity="0.16" stroke="#a5783a" strokeOpacity="0.8" strokeWidth="1.5" />

      <text x="386" y="222" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.5">셋 다 보는 곳</text>

      {/* 라벨: 각 원의 겹치지 않는 바깥 자락 */}
      <text x="245" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3a6ea5">키워드 포함율</text>
      <text x="245" y="206" textAnchor="middle" fontSize="10.5" fill="currentColor" opacity="0.6">글자만 본다</text>

      <text x="500" y="152" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4a7c59">사람 평가</text>
      <text x="500" y="168" textAnchor="middle" fontSize="10.5" fill="currentColor" opacity="0.6">의미를 본다</text>

      <text x="388" y="338" textAnchor="middle" fontSize="12" fontWeight="700" fill="#a5783a">LLM 채점관</text>
      <text x="388" y="354" textAnchor="middle" fontSize="10.5" fill="currentColor" opacity="0.6">빠르지만 결함이 숨음</text>

      {/* 셋이 함께 못 보는 자리 */}
      <circle cx="566" cy="350" r="24" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.4" strokeDasharray="3 3" />
      <text x="536" y="345" textAnchor="end" fontSize="11" fontWeight="600" fill="currentColor">셋이 함께</text>
      <text x="536" y="360" textAnchor="end" fontSize="11" fontWeight="600" fill="currentColor">못 보는 자리</text>

      <text x="24" y="438" fontSize="11" fill="currentColor" opacity="0.5">어느 하나도 혼자선 충분하지 않지만, 사각지대가 서로 다른 지표를 겹치면 빈자리가 줄어든다.</text>
    </svg>
  );
}
