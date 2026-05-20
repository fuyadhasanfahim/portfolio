"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconBriefcase,
  IconSchool,
  IconPoint,
} from "@tabler/icons-react";
import { SectionHeader } from "@/app/components/shared/section-header";
import { timeline } from "@/app/data/timeline";
import { cn } from "@/app/lib/cn";

export function Timeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!trackRef.current) return;
      gsap.fromTo(
        trackRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );

      const items = gsap.utils.toArray<HTMLElement>("[data-tl-item]");
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative scroll-mt-28 py-28 md:py-36"
    >
      <div className="container-edge">
        <SectionHeader
          index="[ 04 / path ]"
          eyebrow="trajectory.log"
          title={
            <>
              <span className="text-gradient">A path</span>{" "}
              <span className="text-foreground/60">
                from curiosity to system.
              </span>
            </>
          }
          description="Education and career, time-series ordered. The same obsession running underneath every node."
        />

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-line md:left-1/2 md:block"
          />
          <div
            ref={trackRef}
            aria-hidden
            className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-linear-to-b from-cyan via-electric to-violet md:left-1/2 md:block"
          />

          <ol className="space-y-10 md:space-y-14">
            {timeline.map((item, i) => {
              const isCareer = item.kind === "career";
              const Icon = isCareer ? IconBriefcase : IconSchool;
              const onLeft = i % 2 === 0;

              return (
                <li
                  key={item.id}
                  data-tl-item
                  className="relative grid items-center gap-6 md:grid-cols-2 md:gap-12"
                >
                  <div
                    aria-hidden
                    className="absolute left-4 top-3 hidden h-3 w-3 -translate-x-1/2 md:left-1/2 md:block"
                  >
                    <span className="absolute inset-0 rounded-full bg-background" />
                    <span
                      className={cn(
                        "absolute inset-0 rounded-full border",
                        isCareer
                          ? "border-cyan bg-cyan/30"
                          : "border-line-strong bg-surface-2"
                      )}
                    />
                    {isCareer ? (
                      <span className="absolute -inset-2 rounded-full bg-cyan/20 animate-ping" />
                    ) : null}
                  </div>

                  <div
                    className={cn(
                      "md:hidden",
                      "absolute left-4 top-3 grid h-3 w-3 -translate-x-1/2 place-items-center"
                    )}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                  </div>

                  <div
                    className={cn(
                      "pl-10 md:pl-0",
                      onLeft ? "md:pr-12 md:text-right" : "md:order-2 md:pl-12"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-2",
                        onLeft ? "md:justify-end" : ""
                      )}
                    >
                      <Icon
                        size={14}
                        className={cn(
                          isCareer ? "text-cyan" : "text-muted-strong"
                        )}
                      />
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                        {isCareer ? "career" : "education"}
                      </span>
                    </div>
                    <h3 className="mt-3 display text-[clamp(1.25rem,1.05rem+0.6vw,1.5rem)] tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] text-muted-strong">
                      {item.org}
                    </p>
                    <p className="mt-1 font-mono text-[11px] tracking-tight text-muted">
                      {item.period}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "pl-10 md:pl-0",
                      onLeft ? "md:pl-12" : "md:order-1 md:pr-12 md:text-right"
                    )}
                  >
                    <p className="text-[15px] leading-relaxed text-muted-strong">
                      {item.description}
                    </p>
                    {item.tags ? (
                      <div
                        className={cn(
                          "mt-3 flex flex-wrap gap-1.5",
                          !onLeft && "md:justify-end"
                        )}
                      >
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[10.5px] tracking-tight text-muted-strong"
                          >
                            <IconPoint size={10} className="text-cyan" />
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
