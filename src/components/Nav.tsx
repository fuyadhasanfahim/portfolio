"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { nav } from "@/lib/data";
import { ButtonLink } from "./ui/button";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-all duration-500 ${
        scrolled ? "pt-2" : "pt-4"
      }`}
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full transition-all duration-500 sm:px-5 ${
          scrolled ? "px-4 py-1.5 glass-strong" : "px-4 py-2.5 border border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center pl-1">
          <span
            className={`font-display whitespace-nowrap font-semibold tracking-tight text-ink transition-all duration-500 ${
              scrolled ? "text-[13px] sm:text-sm" : "text-sm sm:text-[15px]"
            }`}
          >
            Fuyad Hasan Fahim<span className="text-acc">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline text-sm transition-colors ${
                  active ? "text-acc" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/contact"
            className="hidden px-5 py-2 text-[13px] sm:inline-flex"
          >
            Start a project
          </ButtonLink>
          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="glass grid h-9 w-9 place-items-center rounded-full text-ink md:hidden"
          >
            <IconMenu2 size={18} stroke={1.8} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex flex-col md:hidden"
            style={{
              background: "rgba(10,11,13,0.98)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* overlay header: single logo + close button */}
            <div className="flex items-center justify-between px-6 pt-6">
              <Link href="/" className="flex items-center">
                <span className="font-display whitespace-nowrap text-sm font-semibold tracking-tight text-ink">
                  Fuyad Hasan Fahim<span className="text-acc">.</span>
                </span>
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="glass grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:text-acc"
              >
                <IconX size={20} stroke={1.8} />
              </button>
            </div>

            {/* stacked links */}
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
              {nav.map((item, i) => {
                const active = pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`font-display block border-b border-line py-4 text-3xl font-semibold tracking-tight transition-colors ${
                        active ? "text-acc" : "text-ink hover:text-acc"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA pinned to the bottom */}
            <div className="px-6 pb-10">
              <ButtonLink
                href="/contact"
                onClick={() => setOpen(false)}
                className="w-full"
              >
                Start a project
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
