"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Premium, agency-style loading layer.
 *
 *  • First load  → IntroLoader: a weighty 0→100 counter, the wordmark fading
 *    in with a staggered clip, a thin lime progress line, and a clean panel
 *    that wipes upward to reveal the page.
 *  • Navigation  → RouteWipe: a slim lime progress sliver + a quick soft veil
 *    (~600ms). It is always pointer-events-none, so it can never block clicks.
 *
 * Reduced motion gets a static wordmark and an instant, very brief fade.
 */

// Module-level latch: once the intro has fully played, later client-side
// navigations use the slim wipe instead of replaying the whole count-up.
let introPlayed = false;

const WORDMARK = "Fuyad Hasan Fahim";
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function PageTransition() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [showIntro, setShowIntro] = useState(!introPlayed);

  return (
    <>
      {showIntro && (
        <IntroLoader
          reduce={!!reduce}
          onDone={() => {
            introPlayed = true;
            setShowIntro(false);
          }}
        />
      )}

      {/* Slim navigation transition — only after the intro, never on reduce. */}
      {!showIntro && !reduce && <RouteWipe pathname={pathname} />}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Intro loader (first load)                                          */
/* ------------------------------------------------------------------ */

function IntroLoader({
  reduce,
  onDone,
}: {
  reduce: boolean;
  onDone: () => void;
}) {
  const [pct, setPct] = useState(0);
  const [wipe, setWipe] = useState(false); // true → overlay slides away
  const ready = pct >= 100;
  const WIPE_MS = reduce ? 360 : 900;

  // Drive the counter, then wipe away. Dismissal is handled with CSS
  // transitions + timers (never RAF), so the overlay can never get stuck —
  // even in a backgrounded tab where requestAnimationFrame is paused.
  useEffect(() => {
    let raf = 0;
    let finished = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const finish = () => {
      if (finished) return;
      finished = true;
      setPct(100);
      // brief beat on 100, then the panel wipe, then unmount
      timers.push(setTimeout(() => setWipe(true), reduce ? 200 : 420));
      timers.push(setTimeout(onDone, (reduce ? 200 : 420) + WIPE_MS));
    };

    if (reduce) {
      finish();
      return () => timers.forEach(clearTimeout);
    }

    let progress = 0;
    let target = 0.9; // park near the end until the page is ready
    const start = performance.now();
    const minTime = 1500; // floor — keeps the count weighty, not flickery
    const maxTime = 2800; // hard cap — counter can never stall

    const tick = (now: number) => {
      if (finished) return;
      const elapsed = now - start;
      const pageReady = document.readyState === "complete";
      if (elapsed > minTime && (pageReady || elapsed > maxTime)) target = 1;

      progress += (target - progress) * 0.05; // smooth ease-out lerp
      if (target === 1 && progress > 0.995) progress = 1;

      setPct(Math.round(progress * 100));

      if (progress >= 1) return finish();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // Timer-based hard stop in case RAF is throttled/paused.
    timers.push(setTimeout(finish, maxTime + 700));

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [reduce, onDone, WIPE_MS]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col overflow-hidden"
      style={{
        background: "#06070a",
        transform: reduce ? undefined : wipe ? "translateY(-100%)" : "none",
        opacity: reduce && wipe ? 0 : 1,
        transition: reduce
          ? `opacity ${WIPE_MS}ms ease-out`
          : `transform ${WIPE_MS}ms cubic-bezier(0.76,0,0.24,1)`,
        pointerEvents: wipe ? "none" : "auto",
      }}
    >
      {/* subtle violet atmosphere, consistent with the site */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 60% at 50% 32%, rgba(70,52,140,0.28), transparent 72%)",
        }}
      />

      {/* wordmark — dead center, elegant, staggered clip-in */}
      <div className="relative flex flex-1 items-center justify-center px-6">
        <h1
          className="font-display text-center text-3xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl"
          aria-label={WORDMARK}
        >
          {reduce ? (
            <>
              {WORDMARK}
              <span className="text-acc">.</span>
            </>
          ) : (
            <motion.span
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.045, delayChildren: 0.15 }}
              className="inline-flex flex-wrap justify-center"
            >
              {WORDMARK.split(" ").map((word, wi) => (
                <span key={wi} className="inline-flex whitespace-nowrap">
                  {word.split("").map((ch, ci) => (
                    <Letter key={ci}>{ch}</Letter>
                  ))}
                  {wi < WORDMARK.split(" ").length - 1 && (
                    <span className="inline-block">&nbsp;</span>
                  )}
                </span>
              ))}
              <Letter className="text-acc">.</Letter>
            </motion.span>
          )}
        </h1>
      </div>

      {/* bottom block — big counter, status, progress hairline */}
      <div className="relative px-6 pb-8 sm:px-10 sm:pb-10">
        <div className="flex items-end justify-between gap-6">
          {/* weighty percentage counter, bottom-left */}
          <div className="flex items-baseline leading-none">
            <span className="font-display font-bold tabular-nums tracking-tighter text-ink text-[clamp(3.5rem,15vw,11rem)]">
              {pct}
            </span>
            <span className="ml-1 font-display text-acc text-[clamp(0.9rem,2.5vw,1.6rem)] font-semibold">
              %
            </span>
          </div>

          {/* understated status that swaps Loading → Ready */}
          <div className="pb-3 font-display text-[10px] uppercase tracking-[0.42em] text-muted sm:text-[11px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={ready ? "ready" : "loading"}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="inline-block"
              >
                {ready ? "Ready" : "Loading"}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* thin lime progress line, fills left → right in sync */}
        <div className="mt-5 h-px w-full overflow-hidden bg-line">
          <div
            className="h-full origin-left bg-acc"
            style={{
              transform: `scaleX(${pct / 100})`,
              transition: reduce ? "none" : "transform 120ms linear",
              boxShadow: "0 0 12px var(--acc-glow), 0 0 4px var(--acc-glow)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Letter({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      variants={{
        hidden: { y: "0.9em", opacity: 0, filter: "blur(4px)" },
        show: {
          y: "0em",
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: EASE_OUT },
        },
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Route wipe (subsequent navigations)                               */
/* ------------------------------------------------------------------ */

function RouteWipe({ pathname }: { pathname: string }) {
  const first = useRef(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return; // don't fire on the initial render after the intro
    }
    setTick((t) => t + 1);
  }, [pathname]);

  if (tick === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
      {/* quick soft veil */}
      <motion.div
        key={`veil-${tick}`}
        className="fixed inset-0"
        style={{ background: "#06070a" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.32, 0] }}
        transition={{ duration: 0.6, ease: "easeInOut", times: [0, 0.4, 1] }}
      />
      {/* slim lime progress sliver */}
      <motion.div
        key={`bar-${tick}`}
        className="h-[2px] origin-left bg-acc"
        style={{ boxShadow: "0 0 12px var(--acc-glow)" }}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: [0, 0.7, 1], opacity: [1, 1, 0] }}
        transition={{ duration: 0.62, ease: EASE_OUT, times: [0, 0.55, 1] }}
      />
    </div>
  );
}
