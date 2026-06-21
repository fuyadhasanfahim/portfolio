"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";

type Props = {
  options: readonly string[];
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  id?: string;
  ariaLabel?: string;
  invalid?: boolean;
  /** Links the trigger to an external error message for screen readers. */
  describedBy?: string;
};

/**
 * Fully on-brand dark dropdown (custom listbox, never the native white menu).
 * Keyboard accessible (arrows / enter / escape / home / end), closes on
 * outside click, animated with Framer Motion, and reduced-motion aware.
 * Controlled, so it drops straight into a React Hook Form Controller.
 */
export default function Select({
  options,
  value,
  onChange,
  onBlur,
  placeholder = "Select an option",
  id,
  ariaLabel,
  invalid,
  describedBy,
}: Props) {
  const reduce = useReducedMotion();
  const autoId = useId();
  const baseId = id ?? autoId;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() =>
    value ? options.indexOf(value) : -1
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onBlur]);

  // Keep the active option scrolled into view while navigating.
  useEffect(() => {
    if (!open || active < 0) return;
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function openMenu() {
    setActive(value ? options.indexOf(value) : 0);
    setOpen(true);
  }

  function closeMenu(focusButton = true) {
    setOpen(false);
    if (focusButton) buttonRef.current?.focus();
    onBlur?.();
  }

  function choose(i: number) {
    const next = options[i];
    if (next) onChange(next);
    closeMenu();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => (i - 1 + options.length) % options.length);
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (active >= 0) choose(active);
        break;
      case "Tab":
        closeMenu(false);
        break;
    }
  }

  const hasValue = !!value;

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        id={baseId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${baseId}-listbox`}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onKeyDown}
        onBlur={(e) => {
          // Only fire blur when focus leaves the whole widget.
          if (!rootRef.current?.contains(e.relatedTarget as Node)) onBlur?.();
        }}
        className={`flex w-full items-center justify-between rounded-xl border bg-bg-2/60 px-4 py-3 text-left text-sm backdrop-blur-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-acc/20 ${
          invalid
            ? "border-red-500/60 focus:border-red-500/70"
            : "border-line focus:border-acc/60"
        } ${open ? "border-acc/60" : ""}`}
      >
        <span className={hasValue ? "text-ink" : "text-muted/70"}>
          {value || placeholder}
        </span>
        <IconChevronDown
          size={18}
          stroke={1.8}
          className={`shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-acc" : "text-muted"
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={`${baseId}-listbox`}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={
              active >= 0 ? `${baseId}-opt-${active}` : undefined
            }
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-glass-brd p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]"
          >
            {options.map((opt, i) => {
              const selected = opt === value;
              const isActive = i === active;
              return (
                <li
                  key={opt}
                  id={`${baseId}-opt-${i}`}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(i)}
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-acc/10 text-ink"
                      : "text-muted hover:bg-white/5"
                  } ${selected ? "text-acc" : ""}`}
                >
                  <span>{opt}</span>
                  {selected && (
                    <IconCheck size={16} stroke={2} className="text-acc" />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
