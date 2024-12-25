import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default async function Button(
  props: {
    variant: "primary" | "secondary" | "text";
    iconAfter?: ReactNode;
  } & ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { className, children, variant, iconAfter, ...rest } = props;

  return (
    <button
      className={twMerge(
        "h-11 px-6 rounded-xl border uppercase inline-flex items-center gap-2",
        variant === "primary" && "bg-red-orange-500 text-white",
        variant === "secondary" && "border-red-orange-500",
        variant === "text" && "h-auto px-0 border-transparent",
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      {iconAfter && <span>{iconAfter}</span>}
    </button>
  );
}
