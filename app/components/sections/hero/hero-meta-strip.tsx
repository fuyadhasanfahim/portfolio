"use client";

import { motion } from "framer-motion";
import { IconBolt, IconBrain, IconBrandGithub } from "@tabler/icons-react";

const items = [
  { icon: IconBrain, label: "System thinking" },
  { icon: IconBolt, label: "Real-time pipelines" },
  { icon: IconBrandGithub, label: "Shipped, in production" },
];

export function HeroMetaStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-wrap items-center gap-x-6 gap-y-3 text-muted"
    >
      {items.map(({ icon: Icon, label }, i) => (
        <div key={label} className="flex items-center gap-2">
          {i > 0 ? (
            <span aria-hidden className="h-1 w-1 rounded-full bg-line-strong" />
          ) : null}
          <Icon size={14} className="text-muted-strong" />
          <span className="mono-label text-muted-strong!">{label}</span>
        </div>
      ))}
    </motion.div>
  );
}
