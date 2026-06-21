"use client";

import { motion, useReducedMotion } from "motion/react";

type OrbColor = "violet" | "indigo" | "lime";

// Desaturated, dark mood colours. Cores are low-ish alpha and fade fully to
// transparent so glows are "felt, not stared at". Lime stays an accent only.
const COLORS: Record<OrbColor, { core: string; mid: string }> = {
  violet: { core: "rgba(99,84,168,0.55)", mid: "rgba(64,54,118,0.22)" },
  indigo: { core: "rgba(72,66,138,0.5)", mid: "rgba(44,40,90,0.2)" },
  lime: { core: "rgba(163,230,53,0.42)", mid: "rgba(120,170,40,0.12)" },
};

type Props = {
  color?: OrbColor;
  size?: number;
  className?: string;
  /** drift distance in px */
  drift?: number;
  /** seconds for one full breathing cycle */
  duration?: number;
  delay?: number;
  opacity?: number;
  /** blur radius in px */
  blur?: number;
};

/**
 * Soft CSS "planet" — a blurred radial-gradient circle with a colored halo that
 * slowly drifts on x/y and breathes in scale. No images, no WebGL.
 */
export default function GlowOrb({
  color = "lime",
  size = 420,
  className = "",
  drift = 30,
  duration = 14,
  delay = 0,
  opacity = 0.22,
  blur = 100,
}: Props) {
  const reduce = useReducedMotion();
  const { core, mid } = COLORS[color];

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        // soft, gradual fade all the way to fully transparent — no hard edges
        background: `radial-gradient(circle at 50% 50%, ${core} 0%, ${mid} 34%, transparent 72%)`,
        filter: `blur(${blur}px)`,
        willChange: "transform",
      }}
      animate={
        reduce
          ? undefined
          : {
              x: [0, drift * 0.6, 0, -drift * 0.5, 0],
              y: [0, -drift, 0, drift * 0.7, 0],
              scale: [1, 1.12, 1, 0.95, 1],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
