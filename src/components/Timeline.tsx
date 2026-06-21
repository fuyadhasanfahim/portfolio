"use client";

import { experiences } from "@/lib/data";
import Reveal from "./motion/Reveal";

export default function Timeline() {
  return (
    <ol className="relative ml-3 border-l border-line">
      {experiences.map((exp, i) => (
        <li key={exp.company + exp.role} className="relative pb-14 pl-8 last:pb-0">
          {/* node */}
          <span className="absolute -left-[7px] top-1.5 grid place-items-center">
            <span
              className={`h-3.5 w-3.5 rounded-full ${
                exp.current
                  ? "bg-acc shadow-[0_0_16px_var(--acc-glow)]"
                  : "border border-line bg-bg-2"
              }`}
            />
          </span>

          <Reveal delay={i * 0.05}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {exp.role}{" "}
                <span className="text-acc">· {exp.company}</span>
              </h3>
              <span className="text-xs uppercase tracking-[0.16em] text-muted">
                {exp.period}
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {exp.description}
            </p>
            <ul className="mt-4 space-y-2">
              {exp.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-3 text-sm text-muted/90"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-acc" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
