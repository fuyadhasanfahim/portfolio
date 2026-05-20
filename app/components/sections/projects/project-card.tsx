"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconArrowUpRight,
  IconCircleDot,
  IconStack2,
} from "@tabler/icons-react";
import type { Project } from "@/app/data/projects";
import { cn } from "@/app/lib/cn";

const accentRing = {
  cyan: "from-cyan/40 via-transparent to-electric/30",
  electric: "from-electric/40 via-transparent to-violet/30",
  violet: "from-violet/40 via-transparent to-cyan/30",
} as const;

const accentText = {
  cyan: "text-cyan",
  electric: "text-electric",
  violet: "text-violet",
} as const;

const accentDot = {
  cyan: "bg-cyan",
  electric: "bg-electric",
  violet: "bg-violet",
} as const;

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor="hover"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="group relative isolate grid w-full grid-rows-[auto_1fr_auto] gap-7 overflow-hidden rounded-2xl border border-line bg-surface-1 p-7 text-left transition-[border-color,background-color] duration-200 ease-out hover:border-line-strong hover:bg-surface-2 sm:p-8"
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100",
            "bg-linear-to-br",
            accentRing[project.accent]
          )}
          style={{ filter: "blur(60px)" }}
        />

        <div className="relative z-0 flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
                {project.index}
              </span>
              <span className="h-px w-6 bg-line-strong" />
              <span
                className={cn(
                  "font-mono text-[10.5px] tracking-[0.2em] uppercase",
                  accentText[project.accent]
                )}
              >
                {project.category}
              </span>
            </div>
            <h3 className="mt-4 display text-[clamp(1.5rem,1.2rem+1vw,1.875rem)] tracking-tight text-foreground">
              {project.name}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1.5">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                accentDot[project.accent]
              )}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-strong">
              {project.status}
            </span>
          </div>
        </div>

        <p className="relative z-0 text-[15px] leading-relaxed text-muted-strong">
          {project.summary}
        </p>

        <div className="relative z-0 space-y-5">
          <div className="grid grid-cols-3 divide-x divide-line border-y border-line py-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="px-3 first:pl-0 last:pr-0">
                <p className="display text-xl text-foreground sm:text-[1.4rem]">
                  {m.value}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {project.stack.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[10.5px] tracking-tight text-muted-strong"
                >
                  {s}
                </span>
              ))}
              {project.stack.length > 4 ? (
                <span className="font-mono text-[10.5px] tracking-tight text-muted">
                  +{project.stack.length - 4}
                </span>
              ) : null}
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-strong transition-colors duration-200 ease-out group-hover:text-foreground">
              <span className="font-medium">Read case</span>
              <IconArrowUpRight
                size={16}
                className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </motion.button>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <ProjectModal
                  key={project.id}
                  project={project}
                  onClose={() => setOpen(false)}
                />
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 z-200 isolate flex items-end justify-center sm:items-center"
    >
      {/* Backdrop: solid stack below dialog */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute inset-0 z-40 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog rail */}
      <div className="pointer-events-none relative z-50 flex min-h-0 w-full flex-1 items-end justify-center p-4 sm:items-center sm:p-6">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`project-${project.id}-title`}
          initial={{ y: 48, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 32, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "pointer-events-auto relative z-50 max-h-[88vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-t-2xl p-8 sm:rounded-2xl sm:p-10",
            "isolate border border-white/10 bg-background/95 shadow-[0_40px_120px_-24px_rgba(0,0,0,0.85)]",
            "backdrop-blur-xl"
          )}
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 40%)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            data-cursor="hover"
            className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-background/90 text-muted transition-[border-color,background-color,color] duration-200 ease-out hover:border-white/16 hover:bg-background hover:text-foreground"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path
                d="M2 2l10 10M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
              {project.index}
            </span>
            <span className="h-px w-6 bg-line-strong" />
            <span
              className={cn(
                "font-mono text-[10.5px] tracking-[0.2em] uppercase",
                accentText[project.accent]
              )}
            >
              {project.category}
            </span>
            <span className="h-px w-6 bg-line-strong" />
            <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-muted">
              {project.year}
            </span>
          </div>

          <h3
            id={`project-${project.id}-title`}
            className="mt-5 display text-3xl text-foreground sm:text-4xl"
          >
            {project.name}
          </h3>
          <p className="mt-3 text-[15px] text-muted-strong">{project.summary}</p>

          <div className="mt-6 rounded-xl border border-white/10 bg-background/90 p-5 text-[15px] leading-relaxed text-muted-strong backdrop-blur-sm">
            {project.description}
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-2">
                <IconCircleDot size={14} className={accentText[project.accent]} />
                <p className="mono-label">impact</p>
              </div>
              <ul className="mt-3 space-y-2.5">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-2.5 text-[14px] leading-relaxed text-muted-strong"
                  >
                    <span
                      className={cn(
                        "mt-1.5 h-1 w-1 shrink-0 rounded-full",
                        accentDot[project.accent]
                      )}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <IconStack2 size={14} className="text-muted-strong" />
                <p className="mono-label">stack</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/10 bg-background/80 px-2 py-1 font-mono text-[11px] tracking-tight text-muted-strong"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 divide-x divide-line border-t border-line pt-5">
                {project.metrics.map((m) => (
                  <div key={m.label} className="px-3 first:pl-0 last:pr-0">
                    <p className="display text-xl text-foreground">{m.value}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
