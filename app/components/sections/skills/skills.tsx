"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/app/components/shared/section-header";
import { skillGroups } from "@/app/data/skills";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-28 py-28 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,black_30%,transparent_80%)]"
      >
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/8 blur-3xl" />
      </div>

      <div className="container-edge">
        <SectionHeader
          index="[ 03 / systems ]"
          eyebrow="capability.matrix"
          title={
            <>
              <span className="text-gradient">Not skills.</span>{" "}
              <span className="text-foreground/60">Systems I operate.</span>
            </>
          }
          description="Grouped by problem domain — because problems are how engineers think, not by tool list."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:gap-6">
          {skillGroups.map((g, i) => (
            <motion.article
              key={g.id}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.9,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative grid grid-rows-[auto_auto_1fr_auto] gap-6 overflow-hidden rounded-2xl border border-line bg-surface-1 p-7 transition-colors hover:border-line-strong hover:bg-surface-2 sm:p-8"
              data-cursor="hover"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan/8 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />

              <header className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface-2 text-foreground transition-colors group-hover:border-cyan/30 group-hover:text-cyan">
                    <g.icon size={20} />
                  </span>
                  <div>
                    <p className="mono-label">{g.index}</p>
                    <p className="text-base font-medium tracking-tight">
                      group · {g.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/6 px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
                    {g.signal}
                  </span>
                </div>
              </header>

              <div>
                <h3 className="display text-[clamp(1.5rem,1.2rem+1vw,1.75rem)] tracking-tight text-foreground">
                  {g.title}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-strong">
                  {g.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {g.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[11px] tracking-tight text-muted-strong"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <footer className="flex items-center justify-between border-t border-line pt-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  Domain
                </span>
                <span className="font-mono text-[11px] tracking-tight text-foreground">
                  {g.title.toLowerCase()}
                </span>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
