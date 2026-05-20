"use client";

import { motion } from "framer-motion";
import { IconArrowDown, IconArrowUpRight } from "@tabler/icons-react";
import { HeroAurora } from "./hero-aurora";
import { HeroMetaStrip } from "./hero-meta-strip";
import { HeroSystemCard } from "./hero-system-card";
import { Button } from "@/app/components/ui/button";

const headline = ["I build", "systems that", "run businesses."];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh items-center overflow-hidden pb-24 pt-36 md:pt-40"
    >
      <HeroAurora />

      <div className="container-edge grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span className="mono-label">[ 00 / index ]</span>
            <span className="h-px w-10 bg-line-strong" />
            <span className="mono-label text-cyan!">
              system.builder.interface
            </span>
          </motion.div>

          <h1 className="mt-7 display text-[clamp(3rem,2rem+5vw,5.25rem)] text-balance">
            {headline.map((line, i) => (
              <span
                key={line}
                className="block overflow-hidden"
                aria-hidden={i > 0 ? undefined : true}
              >
                <motion.span
                  initial={{ y: "110%", filter: "blur(12px)" }}
                  animate={{ y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 1.05,
                    delay: 0.15 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block will-change-transform"
                >
                  {i === 2 ? (
                    <span className="text-cyan-grad">{line}</span>
                  ) : (
                    <span className="text-gradient">{line}</span>
                  )}
                </motion.span>
              </span>
            ))}
            <span aria-hidden className="sr-only">
              I build systems that run businesses.
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-[17px] leading-relaxed text-muted-strong"
          >
            Full Stack Developer crafting SaaS platforms, real-time pipelines,
            and automation engines. I design infrastructure that{" "}
            <span className="text-foreground">compounds</span> — quiet,
            observable, and built to outlast the next refactor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="#work" size="lg">
              View work
              <IconArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Button>
            <Button href="#contact" variant="secondary" size="lg">
              Start a conversation
            </Button>
          </motion.div>

          <div className="mt-12">
            <HeroMetaStrip />
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="absolute -left-10 -top-10 hidden h-32 w-32 rounded-full bg-cyan/10 blur-3xl md:block" />
          <div className="flex justify-center lg:justify-end">
            <HeroSystemCard />
          </div>
        </div>
      </div>

      <a
        href="#work"
        aria-label="Scroll to work"
        data-cursor="hover"
        className="group absolute inset-x-0 bottom-6 mx-auto flex w-fit items-center gap-2 text-muted hover:text-foreground transition-colors"
      >
        <span className="mono-label">scroll</span>
        <span className="grid h-7 w-7 place-items-center rounded-full glass">
          <IconArrowDown size={14} className="animate-bounce" />
        </span>
      </a>
    </section>
  );
}
