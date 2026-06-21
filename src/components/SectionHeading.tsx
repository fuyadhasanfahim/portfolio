"use client";

import { motion, useReducedMotion } from "motion/react";
import Reveal from "./motion/Reveal";

type Props = {
  kicker: string;
  /** plain text before the serif accent */
  lead?: string;
  /** italic serif accent word(s) */
  accent?: string;
  /** plain text after the serif accent */
  trail?: string;
  className?: string;
  /** show the left-drawing divider rule above the heading */
  rule?: boolean;
};

/**
 * Standard section header: small-caps kicker + a mixed heavy-sans / italic-serif
 * title, with an optional divider rule that draws in from the left on enter.
 */
export default function SectionHeading({
  kicker,
  lead,
  accent,
  trail,
  className = "",
  rule = true,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <div className={className}>
      {rule && (
        <motion.div
          aria-hidden
          className="mb-8 h-px w-full origin-left bg-line"
          initial={reduce ? undefined : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      <Reveal>
        <span className="kicker">{kicker}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-4 max-w-3xl text-[clamp(32px,5vw,60px)] font-semibold leading-[1.02] tracking-tight">
          {lead && <span>{lead} </span>}
          {accent && (
            <span className="font-serif-accent font-normal text-acc">
              {accent}
            </span>
          )}
          {trail && <span> {trail}</span>}
        </h2>
      </Reveal>
    </div>
  );
}
