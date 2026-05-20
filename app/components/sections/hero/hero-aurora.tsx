"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroAurora() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0 grid-bg mask-[radial-gradient(ellipse_60%_70%_at_50%_30%,black_30%,transparent_75%)]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.55, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-[18%] h-[640px] w-[860px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(34,211,238,0.45), rgba(59,130,246,0.18) 40%, rgba(11,11,15,0) 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 1.8, delay: 0.2 }}
        className="absolute left-[8%] top-[55%] h-[420px] w-[420px] rounded-full animate-float-y"
        style={{
          background:
            "radial-gradient(closest-side, rgba(139,92,246,0.45), rgba(11,11,15,0) 70%)",
          filter: "blur(40px)",
          animationDelay: reduce ? undefined : "-3s",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.8, delay: 0.35 }}
        className="absolute right-[6%] top-[12%] h-[360px] w-[360px] rounded-full animate-float-y"
        style={{
          background:
            "radial-gradient(closest-side, rgba(34,211,238,0.4), rgba(11,11,15,0) 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
    </div>
  );
}
