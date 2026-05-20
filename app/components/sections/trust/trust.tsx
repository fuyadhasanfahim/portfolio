"use client";

import { motion } from "framer-motion";
import {
  IconBriefcase,
  IconCertificate,
  IconShieldCheck,
} from "@tabler/icons-react";
import { SectionHeader } from "@/app/components/shared/section-header";
import { GlassCard } from "@/app/components/ui/glass-card";
import { Reveal, Stagger, staggerItem } from "@/app/components/animations/reveal";
import { certificates } from "@/app/data/certificates";
import { cn } from "@/app/lib/cn";

const accentMap = {
  cyan: "text-cyan border-cyan/30 bg-cyan/[0.06]",
  electric: "text-electric border-electric/30 bg-electric/[0.06]",
  violet: "text-violet border-violet/30 bg-violet/[0.06]",
  white: "text-foreground border-line-strong bg-surface-2",
} as const;

export function Trust() {
  return (
    <section
      id="trust"
      className="relative scroll-mt-28 py-28 md:py-36"
    >
      <div className="container-edge">
        <SectionHeader
          index="[ 01 / trust ]"
          eyebrow="proof.of.craft"
          title={
            <>
              <span className="text-gradient">Real work,</span>{" "}
              <span className="text-foreground/60">production-graded.</span>
            </>
          }
          description="Verified credentials and active engineering work that has shipped, scaled, and stayed online."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={0.05}>
            <GlassCard hairline className="relative h-full p-7 sm:p-8">
              <div className="absolute right-7 top-7 hidden items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/6 px-2.5 py-1 sm:flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-cyan">
                  active engagement
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2">
                  <IconBriefcase size={18} className="text-foreground" />
                </span>
                <div>
                  <p className="mono-label">current role</p>
                  <p className="text-base font-medium tracking-tight">
                    Web Briks LLC
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
                  Position
                </p>
                <h3 className="mt-2 display text-[clamp(1.5rem,1.1rem+1.5vw,2rem)] text-foreground">
                  Full Stack Developer
                </h3>
                <p className="mt-1.5 font-mono text-[12.5px] tracking-tight text-muted-strong">
                  Oct 2024 — Present · Remote
                </p>
              </div>

              <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted-strong">
                Lead engineer on internal SaaS platforms and external products.
                Architecting backend systems, real-time pipelines, and developer
                tooling that compounds across the organization.
              </p>

              <div className="mt-7 grid grid-cols-3 divide-x divide-line border-t border-line pt-6">
                {[
                  { k: "products shipped", v: "5+" },
                  { k: "uptime SLA", v: "99.98%" },
                  { k: "lines / week", v: "20k+" },
                ].map((m) => (
                  <div key={m.k} className="px-4 first:pl-0 last:pr-0">
                    <p className="display text-2xl text-foreground sm:text-[1.65rem]">
                      {m.v}
                    </p>
                    <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                      {m.k}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.15}>
            <GlassCard className="h-full p-7 sm:p-8" hairline>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2">
                  <IconShieldCheck size={18} className="text-cyan" />
                </span>
                <div>
                  <p className="mono-label">verified</p>
                  <p className="text-base font-medium tracking-tight">
                    HackerRank Certifications
                  </p>
                </div>
              </div>

              <div className="mt-7 flex items-center gap-2">
                <IconCertificate size={14} className="text-muted" />
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  4 active credentials
                </p>
              </div>

              <Stagger className="mt-5 grid gap-2.5">
                {certificates.map((c) => (
                  <motion.div
                    variants={staggerItem}
                    key={c.id}
                    className="group flex items-center gap-3 rounded-xl border border-line bg-surface-1 px-4 py-3 transition-colors hover:border-line-strong hover:bg-surface-2"
                    data-cursor="hover"
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-lg border",
                        accentMap[c.accent]
                      )}
                    >
                      <c.icon size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14.5px] font-medium tracking-tight text-foreground">
                        {c.name}
                      </p>
                      <p className="mt-0.5 truncate font-mono text-[11px] tracking-tight text-muted">
                        {c.issuer} · {c.level}
                      </p>
                    </div>
                    <span className="grid h-6 w-6 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-cyan/40 group-hover:text-cyan">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M2 8 8 2M8 2H3M8 2V7"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </motion.div>
                ))}
              </Stagger>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
