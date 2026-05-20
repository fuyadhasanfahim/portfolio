import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";

type Tone = "cyan" | "electric" | "violet" | "neutral";

const tones: Record<Tone, string> = {
  cyan: "border-cyan/25 bg-cyan/[0.06] text-cyan",
  electric: "border-electric/25 bg-electric/[0.06] text-electric",
  violet: "border-violet/25 bg-violet/[0.06] text-violet",
  neutral: "border-line-strong bg-surface-1 text-muted-strong",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        "font-mono text-[10.5px] uppercase tracking-[0.18em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
