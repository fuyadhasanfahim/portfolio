"use client";

import { motion } from "framer-motion";
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconCopy,
  IconMail,
  IconMapPin,
} from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { GlassCard } from "@/app/components/ui/glass-card";
import { Reveal } from "@/app/components/animations/reveal";
import { site } from "@/app/lib/site";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-28 overflow-hidden py-28 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_60%_70%_at_50%_60%,black_30%,transparent_80%)]"
      >
        <div className="absolute left-1/2 top-1/2 h-[460px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-3xl" />
      </div>

      <div className="container-edge">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="mono-label">[ 05 / contact ]</span>
            <span className="h-px w-10 bg-line-strong" />
            <span className="mono-label text-cyan!">open.channel</span>
          </div>
        </Reveal>

        <div className="mt-8 grid items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={0.05}>
            <h2 className="display text-balance text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] leading-[1.05] tracking-tight">
              <span className="text-cyan-grad">Let&apos;s build something</span>
              <br />
              <span className="text-foreground">powerful together.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted-strong sm:text-[17px]">
              I&apos;m taking on a small number of long-term engagements where
              system thinking matters. SaaS platforms, internal tools, real-time
              products — I work as a lead engineer and architect.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <GlassCard className="p-6 sm:p-7" hairline>
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
                </span>
                <p className="mono-label text-cyan!">currently available</p>
              </div>

              <p className="mt-3 text-[15px] text-muted-strong">
                Replies within 24 hours. Best for product engineering &amp;
                infrastructure work.
              </p>

              <div className="mt-6 flex flex-col gap-2.5">
                <a
                  href={`mailto:${site.email}`}
                  data-cursor="hover"
                  className="group flex items-center justify-between rounded-xl border border-line bg-surface-1 px-4 py-3 transition-[border-color,background-color] duration-200 ease-out hover:border-line-strong hover:bg-surface-2"
                >
                  <span className="flex items-center gap-3">
                    <IconMail size={16} className="text-cyan" />
                    <span className="font-mono text-[13px] tracking-tight text-foreground">
                      {site.email}
                    </span>
                  </span>
                  <IconArrowUpRight
                    size={14}
                    className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </a>

                <button
                  type="button"
                  onClick={onCopy}
                  data-cursor="hover"
                  className="group flex items-center justify-between rounded-xl border border-line bg-surface-1 px-4 py-3 text-left transition-[border-color,background-color] duration-200 ease-out hover:border-line-strong hover:bg-surface-2"
                >
                  <span className="flex items-center gap-3">
                    <IconCopy size={16} className="text-muted-strong" />
                    <span className="font-mono text-[13px] tracking-tight text-muted-strong">
                      {copied ? "copied" : "copy email"}
                    </span>
                  </span>
                  {copied ? (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-cyan"
                    >
                      ack
                    </motion.span>
                  ) : (
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                      ⌘C
                    </span>
                  )}
                </button>
              </div>

              <div className="mt-6 flex items-center gap-2 text-muted-strong">
                <IconMapPin size={14} />
                <span className="font-mono text-[12px] tracking-tight">
                  {site.location}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <Socials />
              </div>
            </GlassCard>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface-1 font-display text-sm">
                F
              </span>
              <div>
                <p className="text-[14px] font-medium tracking-tight">
                  {site.shortName}
                </p>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                  © {new Date().getFullYear()} · system builder interface
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button href={`mailto:${site.email}`} size="md">
                Start the conversation
                <IconArrowUpRight size={16} />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Socials() {
  const items = [
    { href: site.socials.github, Icon: IconBrandGithub, label: "GitHub" },
    { href: site.socials.linkedin, Icon: IconBrandLinkedin, label: "LinkedIn" },
    {
      href: site.socials.instagram,
      Icon: IconBrandInstagram,
      label: "Instagram",
    },
  ];
  return (
    <>
      {items.map((s) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
          className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface-1 text-muted-strong transition-[border-color,color,background-color] duration-200 ease-out hover:border-cyan/40 hover:bg-background/90 hover:text-cyan"
        >
          <s.Icon size={14} />
        </a>
      ))}
    </>
  );
}
