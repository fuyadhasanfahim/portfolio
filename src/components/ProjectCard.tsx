"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { FeaturedProject } from "@/lib/data";

const COVER: Record<FeaturedProject["accent"], string> = {
  lime: "radial-gradient(120% 120% at 80% 0%, rgba(163,230,53,0.22), transparent 55%), linear-gradient(160deg, #14171c, #0c0e12)",
  violet:
    "radial-gradient(120% 120% at 80% 0%, rgba(124,58,237,0.28), transparent 55%), linear-gradient(160deg, #14141c, #0c0e12)",
  teal: "radial-gradient(120% 120% at 80% 0%, rgba(13,148,136,0.26), transparent 55%), linear-gradient(160deg, #0f1719, #0c0e12)",
};

type Props = {
  project: FeaturedProject;
  /** when used inside a drag row, draggable images should not start a drag */
  draggable?: boolean;
  className?: string;
};

export default function ProjectCard({
  project,
  draggable = false,
  className = "",
}: Props) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={`group relative h-full ${className}`}
    >
      <Link
        href={`/projects/${project.slug}`}
        draggable={false}
        className="glass relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-300 group-hover:border-acc/60 group-hover:shadow-[0_0_50px_-12px_var(--acc-glow)]"
      >
        {/* lime edge glow on hover */}
        <span className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-inset ring-acc/40 transition-opacity duration-300 group-hover:opacity-100" />

        {/* image-less gradient cover */}
        <div
          className="relative aspect-[16/10] w-full overflow-hidden"
          style={{ background: COVER[project.accent] }}
        >
          <div className="absolute inset-0 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
          <div className="absolute left-5 top-5">
            <span className="glass rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted">
              {project.category}
            </span>
          </div>
          {project.metric && (
            <div className="absolute bottom-5 left-5">
              <div className="font-display text-4xl font-bold leading-none text-acc sm:text-5xl">
                {project.metric.value}
              </div>
              <div className="mt-1.5 text-xs text-muted">
                {project.metric.label}
              </div>
            </div>
          )}
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-semibold tracking-tight">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            {project.summary}
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-ink">
            View project
            <span className="text-acc transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
