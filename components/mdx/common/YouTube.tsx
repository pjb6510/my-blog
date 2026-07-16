// 유튜브 영상을 16:9 반응형으로 임베드한다. 본문에서
// <YouTube id="UR87F83_zY4" /> 처럼 영상 id 로 사용하고, 전체 URL
// (watch / youtu.be / embed 형태)을 그대로 넣어도 id 를 뽑아낸다.
// title 은 스크린리더용 라벨.
//
// 쿠키를 덜 심는 youtube-nocookie 도메인으로 임베드하고, loading="lazy"
// 로 화면에 들어올 때 로드한다.

// 영상 id 만 넣었으면 그대로, URL 을 넣었으면 거기서 11자리 id 를 뽑는다.
function extractId(input: string): string {
  const url = input.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=|v\/))([\w-]{11})/,
  );
  if (url) return url[1];
  return input.trim();
}

export function YouTube({
  id,
  title = "YouTube video player",
}: {
  id: string;
  title?: string;
}) {
  const videoId = extractId(id);

  return (
    <div className="not-prose my-8 overflow-hidden rounded-lg border border-border bg-surface">
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}
