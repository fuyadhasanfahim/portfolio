"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { featuredProjects as projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";

const GAP = 24; // matches gap-6

/**
 * Horizontal row of project cards. Supports real drag AND prev/next arrows,
 * with a progress indicator. Constraints are measured so the LAST card scrolls
 * fully into view (with a trailing gutter), not clipped.
 */
export default function DragRow() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [bound, setBound] = useState(0);
  const [progress, setProgress] = useState(0);

  // Measure how far the track can travel. scrollWidth includes the trailing
  // padding, so dragging to -bound reveals the final card with a gutter.
  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return;
      const diff = track.current.scrollWidth - viewport.current.clientWidth;
      setBound(diff > 0 ? diff : 0);
    };
    measure();

    const ro = new ResizeObserver(measure);
    if (viewport.current) ro.observe(viewport.current);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    // re-measure once fonts/layout settle
    const t = setTimeout(measure, 300);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const unsub = x.on("change", (v) => {
      setProgress(bound <= 0 ? 0 : Math.min(1, Math.max(0, -v / bound)));
    });
    return () => unsub();
  }, [x, bound]);

  const step = useCallback(() => {
    const first = track.current?.children[0] as HTMLElement | undefined;
    return (first?.offsetWidth ?? 380) + GAP;
  }, []);

  const scrollBy = useCallback(
    (dir: 1 | -1) => {
      const target = Math.min(0, Math.max(-bound, x.get() - dir * step()));
      animate(x, target, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
    },
    [bound, step, x]
  );

  const atStart = progress <= 0.001;
  const atEnd = progress >= 0.999 || bound <= 0;

  const segments = projects.length;
  const activeDot = Math.round(progress * (segments - 1));

  return (
    <div>
      <div ref={viewport} className="overflow-hidden">
        <motion.div
          ref={track}
          className="flex cursor-grab gap-6 pb-2 active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -bound, right: 0 }}
          dragElastic={0.08}
          style={{ x }}
        >
          {projects.map((p) => (
            <div key={p.slug} className="w-[78vw] shrink-0 sm:w-[420px]">
              <ProjectCard project={p} draggable />
            </div>
          ))}
          {/* trailing gutter spacer — counted in scrollWidth (unlike flex
              container padding-right), so the last card isn't flush at the end */}
          <div aria-hidden className="w-2 shrink-0 sm:w-8" />
        </motion.div>
      </div>

      {/* hint · progress dots · arrows */}
      <div className="mt-7 flex items-center justify-between gap-4">
        <span className="kicker text-[0.68rem]">Drag to explore</span>

        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-2 sm:flex">
            {projects.map((p, i) => (
              <span
                key={p.slug}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeDot ? "w-6 bg-acc" : "w-1.5 bg-line"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ArrowButton
              dir="prev"
              disabled={atStart}
              onClick={() => scrollBy(-1)}
            />
            <ArrowButton
              dir="next"
              disabled={atEnd}
              onClick={() => scrollBy(1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowButton({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous projects" : "Next projects"}
      disabled={disabled}
      onClick={onClick}
      className="glass grid h-10 w-10 place-items-center rounded-full text-ink transition-all duration-300 hover:border-acc/50 hover:text-acc hover:shadow-[0_0_24px_-8px_var(--acc-glow)] disabled:pointer-events-none disabled:opacity-30"
    >
      {dir === "prev" ? (
        <IconArrowLeft size={18} stroke={1.8} />
      ) : (
        <IconArrowRight size={18} stroke={1.8} />
      )}
    </button>
  );
}
