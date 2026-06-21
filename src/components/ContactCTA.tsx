"use client";

import { profile } from "@/lib/data";
import { ButtonLink } from "./ui/button";
import GlowOrb from "./GlowOrb";
import Reveal from "./motion/Reveal";

/**
 * Big closing call-to-action: mixed serif-outline / heavy-sans headline with a
 * central glow and a lime pill.
 */
export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden section-pad">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <GlowOrb
          color="violet"
          size={580}
          opacity={0.22}
          blur={130}
          className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          duration={17}
        />
        {/* one small, faint lime accent low behind the CTA buttons */}
        <GlowOrb
          color="lime"
          size={260}
          opacity={0.14}
          blur={110}
          className="bottom-[18%] left-1/2 -translate-x-1/2"
          duration={14}
          delay={1}
        />
      </div>

      <div className="glass-strong relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-5 py-[clamp(48px,7vw,88px)] text-center shadow-[0_0_80px_-40px_var(--acc-glow)] sm:px-8">
        <Reveal>
          <span className="kicker justify-center">Let&apos;s talk</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mx-auto mt-6 max-w-3xl text-[clamp(40px,9vw,110px)] font-bold leading-[0.92] tracking-[-0.03em]">
            <span className="serif-outline font-serif-accent text-[0.92em] font-normal">
              Let&apos;s build
            </span>
            <br />
            <span>
              SOMETHING <span className="text-acc">REAL.</span>
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-muted">
            Have a system that needs to think, scale, or just finally get
            shipped? Let&apos;s make it happen.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="/contact">Start a project</ButtonLink>
            <ButtonLink href={`mailto:${profile.email}`} variant="ghost">
              {profile.email}
            </ButtonLink>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted/70">
            Based in {profile.location} · Available worldwide
          </p>
        </Reveal>
      </div>
    </section>
  );
}
