"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/app/components/shared/section-header";
import { Reveal } from "@/app/components/animations/reveal";
import { ProjectCard } from "./project-card";
import { projects } from "@/app/data/projects";

export function Projects() {
  return (
    <section
      id="work"
      className="relative scroll-mt-28 py-28 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-line-strong to-transparent"
      />

      <div className="container-edge">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <SectionHeader
            index="[ 02 / work ]"
            eyebrow="case.studies"
            title={
              <>
                <span className="text-gradient">Selected systems,</span>
                <br />
                <span className="text-foreground/60">running in production.</span>
              </>
            }
            description="Each one is a mini product. Designed, architected, shipped — and still in service. Click any card for the full case study."
          />

          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 rounded-full border border-line bg-surface-1 px-4 py-2.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-strong">
                {projects.length} active products · 2024 — 2025
              </span>
            </div>
          </Reveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-16 grid gap-5 md:grid-cols-2 lg:gap-6"
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className={
                i === 0
                  ? "md:col-span-2"
                  : i === projects.length - 1
                  ? "md:col-span-2"
                  : ""
              }
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
