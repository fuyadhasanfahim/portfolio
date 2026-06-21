"use client";

import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/lib/data";
import { ButtonLink } from "./ui/button";
import AuroraBg from "./AuroraBg";
import GlowOrb from "./GlowOrb";

const LINE_EASE = [0.22, 1, 0.36, 1] as const;

function MaskLine({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={`block ${className}`}>{children}</span>;
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay, ease: LINE_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <AuroraBg fadeBottom />
      {/* soft violet glow sitting directly behind the headline */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <GlowOrb
          color="violet"
          size={640}
          opacity={0.18}
          blur={130}
          className="left-[2%] top-1/3"
          duration={15}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="kicker">
            {profile.role} · {profile.focus}
          </span>
        </motion.div>

        <h1 className="font-display mt-7 text-[clamp(48px,9vw,130px)] font-bold leading-[0.9] tracking-[-0.03em]">
          <MaskLine delay={0.1} className="font-serif-accent font-normal text-muted">
            I build
          </MaskLine>
          <MaskLine delay={0.2}>
            SYSTEMS THAT
          </MaskLine>
          <MaskLine delay={0.3}>
            <span className="text-acc">THINK.</span>
          </MaskLine>
        </h1>

        <motion.p
          className="mt-9 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: LINE_EASE }}
        >
          {profile.blurb}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62, ease: LINE_EASE }}
        >
          <ButtonLink href="/projects">View selected work</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Start a project
          </ButtonLink>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex"
        initial={reduce ? undefined : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-acc to-transparent" />
      </motion.div>
    </section>
  );
}
