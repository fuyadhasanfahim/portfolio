"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconArrowUpRight, IconCommand } from "@tabler/icons-react";
import { cn } from "@/app/lib/cn";
import { site } from "@/app/lib/site";

const links = [
  { href: "#work", label: "Work", index: "01" },
  { href: "#skills", label: "Systems", index: "02" },
  { href: "#timeline", label: "Path", index: "03" },
  { href: "#contact", label: "Contact", index: "04" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const fmt = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Dhaka",
      }).format(d);
      setTime(fmt);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "border-b border-white/10 backdrop-blur-xl transition-[padding,background] duration-200 ease-out",
        scrolled
          ? "bg-background/95 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]"
          : "bg-background/80"
      )}
      style={{
        backgroundImage: scrolled
          ? "linear-gradient(to bottom, rgba(11,11,15,0.96), rgba(11,11,15,0.88))"
          : "linear-gradient(to bottom, rgba(11,11,15,0.92), rgba(11,11,15,0.72))",
      }}
    >
      <div
        className={cn(
          "container-edge flex w-full items-center gap-3 py-3 sm:gap-4 sm:py-3.5",
          "transition-[padding] duration-200 ease-out"
        )}
      >
        <a
          href="#top"
          className={cn(
            "group relative flex items-center gap-2.5 rounded-full border border-white/10 px-3 py-2",
            "bg-background/85 backdrop-blur-xl transition-[border-color,background-color] duration-200 ease-out",
            "hover:border-white/14 hover:bg-background/92"
          )}
          data-cursor="hover"
          aria-label="Home"
        >
          <span className="relative grid h-6 w-6 place-items-center">
            <span className="absolute inset-0 rounded-full bg-linear-to-br from-cyan to-electric blur-[6px] opacity-70" />
            <span className="relative grid h-6 w-6 place-items-center rounded-full bg-background text-[11px] font-display font-semibold tracking-tight text-foreground">
              F
            </span>
          </span>
          <span className="hidden max-w-[200px] truncate text-sm font-medium tracking-tight sm:block">
            {site.shortName}
          </span>
          <span className="mono-label hidden text-[10px] sm:block">v.04</span>
        </a>

        <nav
          className={cn(
            "ml-auto hidden items-center gap-1 rounded-full border border-white/10 px-1.5 py-1.5 md:flex",
            "bg-background/85 backdrop-blur-xl transition-[border-color,background-color] duration-200 ease-out",
            "hover:border-white/14 hover:bg-background/92"
          )}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="hover"
              className={cn(
                "group relative flex items-center gap-2 rounded-full px-3.5 py-1.5",
                "text-sm text-muted-strong transition-colors duration-200 ease-out hover:text-foreground"
              )}
            >
              <span className="font-mono text-[10px] tracking-widest text-muted/70 transition-colors duration-200 ease-out group-hover:text-cyan/80">
                {l.index}
              </span>
              <span>{l.label}</span>
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <div
            className={cn(
              "hidden items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 lg:flex",
              "bg-background/85 backdrop-blur-xl"
            )}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span className="mono-label text-[10px] text-muted-strong!">
              Available · {time} BDT
            </span>
          </div>

          <a
            href="#contact"
            data-cursor="hover"
            className={cn(
              "group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
              "bg-foreground text-background transition-[background-color,transform] duration-200 ease-out",
              "hover:bg-foreground/90"
            )}
          >
            <span>Hire me</span>
            <IconArrowUpRight
              size={16}
              className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          <button
            type="button"
            className={cn(
              "hidden h-9 w-9 place-items-center rounded-full border border-white/10 lg:grid",
              "bg-background/85 backdrop-blur-xl transition-[border-color,background-color] duration-200 ease-out",
              "hover:border-white/14 hover:bg-background/92"
            )}
            aria-label="Quick command"
            data-cursor="hover"
          >
            <IconCommand size={14} className="text-muted-strong" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
