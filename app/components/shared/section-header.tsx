import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";
import { Reveal } from "@/app/components/animations/reveal";

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="mono-label">{index}</span>
          <span className="h-px w-10 bg-line-strong" />
          <span className="mono-label text-cyan!">{eyebrow}</span>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="h-section text-balance text-foreground">{title}</h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base text-muted-strong/90 leading-relaxed sm:text-[17px]",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
