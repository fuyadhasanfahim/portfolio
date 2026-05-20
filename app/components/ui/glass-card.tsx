import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/app/lib/cn";

type Props = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  hairline?: boolean;
  hover?: boolean;
};

export function GlassCard({
  className,
  children,
  hairline = false,
  hover = true,
  ...rest
}: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "glass",
        hover && "glass-hover",
        hairline && "hairline-grad",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
