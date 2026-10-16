/*
 * Texte révélé mot par mot derrière un masque (animation CSS « word-reveal »,
 * voir globals.css) : elle démarre à l'affichage, sans attendre le
 * JavaScript. Les lecteurs d'écran lisent la phrase entière.
 */
type Segment = { text: string; className?: string };

export default function SplitWords({
  segments,
  startIndex = 0,
  step = 0.055,
  delay = 0.1,
}: {
  segments: Segment[];
  startIndex?: number;
  step?: number;
  delay?: number;
}) {
  let index = startIndex;
  const fullText = segments.map((segment) => segment.text).join(" ");

  return (
    <>
      <span className="sr-only">{fullText}</span>
      <span aria-hidden="true">
        {segments.map((segment, segmentIndex) => (
          <span key={segmentIndex} className={segment.className}>
            {segment.text.split(/\s+/).map((word, wordIndex) => {
              const style = {
                animationDelay: `${delay + index++ * step}s`,
              } as React.CSSProperties;

              return (
                <span key={wordIndex}>
                  <span className="word-mask">
                    <span className="word-reveal" style={style}>
                      {word}
                    </span>
                  </span>{" "}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </>
  );
}
