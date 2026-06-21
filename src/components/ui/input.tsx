import type { ComponentProps } from "react";

const fieldBase =
  "w-full rounded-xl border border-line bg-bg-2/60 px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors duration-300 focus:border-acc/60 focus:outline-none focus:ring-2 focus:ring-acc/20";

export function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted"
    >
      {children}
    </label>
  );
}

export function Input({ className = "", ...rest }: ComponentProps<"input">) {
  return <input className={`${fieldBase} ${className}`} {...rest} />;
}

export function Textarea({
  className = "",
  ...rest
}: ComponentProps<"textarea">) {
  return (
    <textarea className={`${fieldBase} resize-none ${className}`} {...rest} />
  );
}
