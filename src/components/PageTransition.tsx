"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import BinaryLoader from "./BinaryLoader";

type Phase = "show" | "hide" | "gone";

/**
 * Brief binary loading overlay shown on first load and on every route change.
 * Uses a plain timer + CSS opacity fade and then fully unmounts, so it can
 * never get stuck or block interaction. Reduced motion shortens it further.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("show");

  useEffect(() => {
    const hold = reduce ? 200 : 600;
    setPhase("show");
    const t1 = setTimeout(() => setPhase("hide"), hold);
    const t2 = setTimeout(() => setPhase("gone"), hold + 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, reduce]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] transition-opacity duration-500 ease-out ${
        phase === "hide" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <BinaryLoader reduce={!!reduce} />
    </div>
  );
}
