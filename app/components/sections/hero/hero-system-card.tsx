"use client";

import { motion } from "framer-motion";
import { IconActivityHeartbeat, IconCircleCheckFilled } from "@tabler/icons-react";

const lines = [
  { k: "module", v: "core/system.ts" },
  { k: "build", v: "passing" },
  { k: "uptime", v: "99.98%" },
  { k: "queue", v: "12,840 jobs/d" },
];

export function HeroSystemCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-md rounded-2xl glass hairline-grad p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-surface-2">
            <IconActivityHeartbeat size={14} className="text-cyan" />
          </span>
          <div>
            <p className="text-[13px] font-medium tracking-tight">
              system.status
            </p>
            <p className="mono-label text-[10px]!">runtime · live</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/6 px-2 py-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-cyan">
            online
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {lines.map((l, i) => (
          <motion.div
            key={l.k}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.8 + i * 0.08,
              ease: "easeOut",
            }}
            className="flex items-center justify-between rounded-lg border border-line bg-surface-1 px-3 py-2"
          >
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
              {l.k}
            </span>
            <span className="flex items-center gap-2 font-mono text-[12px] text-foreground">
              <IconCircleCheckFilled size={12} className="text-cyan" />
              {l.v}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-3">
        <span className="mono-label">last deploy</span>
        <span className="font-mono text-[11px] text-muted-strong">
          12 min ago<span className="ml-1 text-cyan animate-caret">_</span>
        </span>
      </div>
    </motion.div>
  );
}
