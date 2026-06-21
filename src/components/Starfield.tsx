/**
 * Sparse twinkling starfield. Deterministic positions (seeded) so server and
 * client render identical markup — no hydration mismatch. CSS-only twinkle.
 */
function seeded(i: number) {
  // cheap deterministic pseudo-random in [0,1)
  const x = Math.sin(i * 999.13) * 43758.5453;
  return x - Math.floor(x);
}

export default function Starfield({ count = 60 }: { count?: number }) {
  // Round to fixed precision so server and client emit byte-identical inline
  // styles (avoids React hydration mismatches on float→string formatting).
  const stars = Array.from({ length: count }, (_, i) => {
    const top = (seeded(i) * 100).toFixed(3);
    const left = (seeded(i + 100) * 100).toFixed(3);
    const size = (0.5 + seeded(i + 200) * 1.6).toFixed(2);
    const dur = (3 + seeded(i + 300) * 5).toFixed(2);
    const delay = (seeded(i + 400) * 5).toFixed(2);
    return { top, left, size, dur, delay, i };
  });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.i}
          className="twinkle absolute rounded-full bg-white"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              "--dur": `${s.dur}s`,
              "--delay": `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
