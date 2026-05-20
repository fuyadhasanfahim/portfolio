import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/app/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type AsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & {
    href?: undefined;
  };

type AsAnchor = BaseProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof BaseProps> & {
    href: string;
  };

type Props = AsButton | AsAnchor;

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 hover:shadow-[0_8px_40px_-8px_rgba(255,255,255,0.18)]",
  secondary:
    "glass glass-hover text-foreground hover:bg-surface-2",
  ghost: "text-muted-strong hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function Button(props: Props) {
  const { variant = "primary", size = "md", className, children } = props;

  const base = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight",
    "transition-[background,transform,box-shadow,color,border-color] duration-200 ease-out",
    "focus-visible:outline-none",
    sizes[size],
    variants[variant],
    className
  );

  if ("href" in props && props.href) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    void _v;
    void _s;
    void _c;
    void _ch;
    return (
      <a href={href} className={base} data-cursor="hover" {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as AsButton;
  void _v;
  void _s;
  void _c;
  void _ch;

  return (
    <button className={base} data-cursor="hover" {...rest}>
      {children}
    </button>
  );
}
