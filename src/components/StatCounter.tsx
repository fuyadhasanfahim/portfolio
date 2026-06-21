"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useReducedMotion,
} from "motion/react";

type Props = {
  value: number;
  suffix?: string;
  label: string;
};

/** Big stat that counts up from 0 the first time it scrolls into view. */
export default function StatCounter({ value, suffix = "", label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="font-display text-[clamp(44px,7vw,76px)] font-bold leading-none tracking-tight">
        {display}
        <span className="text-acc">{suffix}</span>
      </div>
      <div className="mt-3 text-sm text-muted">{label}</div>
    </div>
  );
}
