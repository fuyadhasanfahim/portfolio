"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

// Deterministic pseudo-random so server and client render identical markup.
function seeded(i: number) {
  const x = Math.sin(i * 91.7) * 43758.5453;
  return x - Math.floor(x);
}

const COLS = 22;
const ROWS = 30; // visible chars per loop; rendered twice for a seamless scroll
const TRAIL = 8; // length of the glowing tail behind each falling head

// Pre-compute the columns once. Each column is a vertical strip of 0/1 with
// periodic bright "heads" (matrix-style drops). The strip content is doubled
// so a -50% → 0% translate loops seamlessly.
const COLUMNS = Array.from({ length: COLS }, (_, c) => {
  const headGap = 9 + Math.floor(seeded(c + 7) * 7); // 9–15 chars between heads
  const headOffset = Math.floor(seeded(c + 13) * headGap);

  const cells = Array.from({ length: ROWS }, (_, r) => {
    const ch = seeded(c * 31 + r * 7) > 0.5 ? "1" : "0";
    // distance upward to the next head at/below this row (tail trails upward)
    const mod = ((r - headOffset) % headGap + headGap) % headGap;
    const dist = (headGap - mod) % headGap; // 0 = head, grows up the tail
    return { ch, dist };
  });

  return {
    cells,
    left: (c / COLS) * 100,
    size: (0.85 + seeded(c + 3) * 1.5).toFixed(2), // rem, varied weight/size
    dur: (3.6 + seeded(c + 21) * 4).toFixed(2), // fall duration
    delay: (-seeded(c + 41) * 6).toFixed(2), // desync columns
    dim: (0.35 + seeded(c + 60) * 0.35).toFixed(2), // base column brightness
  };
});

function cellStyle(dist: number): React.CSSProperties {
  // Head = bright lime with glow; tail fades upward; everything else is dim.
  if (dist === 0) {
    return {
      color: "#d4ff70",
      opacity: 1,
      textShadow:
        "0 0 8px var(--acc-glow), 0 0 18px rgba(163,230,53,0.55), 0 0 2px #fff",
    };
  }
  if (dist <= 3) {
    const o = 1 - dist * 0.22;
    return { color: "var(--acc)", opacity: o, textShadow: "0 0 6px var(--acc-glow)" };
  }
  if (dist <= TRAIL) {
    return { color: "#5f7a3a", opacity: 0.45 - (dist - 3) * 0.05 };
  }
  return { color: "#2b3142", opacity: 0.5 };
}

export default function BinaryLoader({ reduce }: { reduce: boolean }) {
  const [pct, setPct] = useState(0);
  const raf = useRef(0);

  // Smooth eased 0→100 counter (purely cosmetic; the overlay fades on its own).
  useEffect(() => {
    if (reduce) {
      setPct(100);
      return;
    }
    const start = performance.now();
    const span = 750; // completes ~as the brief overlay fades out
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / span);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [reduce]);

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: "#06070a" }}
    >
      {/* subtle violet atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 38%, rgba(70,52,140,0.30), transparent 72%)",
        }}
      />

      {/* falling binary code-rain */}
      <div
        className={`absolute inset-0 select-none font-mono font-semibold leading-[1.18] ${
          reduce ? "" : "blur-[0.4px]"
        }`}
      >
        {COLUMNS.map((col, i) => (
          <div
            key={i}
            className="absolute top-0 flex flex-col items-center text-center"
            style={
              {
                left: `${col.left}%`,
                width: `${100 / COLS}%`,
                height: "200%",
                fontSize: `${col.size}rem`,
                opacity: reduce ? Number(col.dim) * 0.5 : col.dim,
                animation: reduce
                  ? "none"
                  : `bin-rain ${col.dur}s linear ${col.delay}s infinite`,
                willChange: "transform",
              } as React.CSSProperties
            }
          >
            {/* doubled content for a seamless scroll loop */}
            {[0, 1].map((dup) =>
              col.cells.map((cell, r) => (
                <span key={`${dup}-${r}`} style={cellStyle(cell.dist)}>
                  {cell.ch}
                </span>
              ))
            )}
          </div>
        ))}
      </div>

      {/* radial vignette: keeps the rain at the edges, center clean & readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 42% at 50% 50%, #06070a 18%, rgba(6,7,10,0.86) 42%, rgba(6,7,10,0.18) 72%, transparent 100%)",
        }}
      />

      {/* center focal point: wordmark + progress */}
      <div className="relative flex flex-col items-center gap-6 px-6">
        <motion.div
          initial={reduce ? false : { scale: 0.94, opacity: 0, filter: "blur(6px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Fuyad Hasan Fahim<span className="text-acc">.</span>
          </h1>
        </motion.div>

        {/* thin lime progress line */}
        <div className="h-px w-48 overflow-hidden rounded-full bg-line sm:w-60">
          <div
            className="h-full rounded-full bg-acc transition-[width] duration-150 ease-out"
            style={{
              width: `${pct}%`,
              boxShadow: "0 0 12px var(--acc-glow), 0 0 4px var(--acc-glow)",
            }}
          />
        </div>

        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
          <span>Initializing</span>
          <span className="tabular-nums text-acc/80">
            {String(pct).padStart(3, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}
