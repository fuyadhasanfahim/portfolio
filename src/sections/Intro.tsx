"use client";

import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scope, entranceAnimation } = useTextRevealAnimation();
  const inView = useInView(scope, {
    once: true,
  });

  useEffect(() => {
    if (inView) {
      entranceAnimation();
    }
  }, [entranceAnimation, inView]);

  return (
    <section
      className="section mt-12 md:mt-16 lg:mt-20"
      id="about"
      ref={sectionRef}
    >
      <div className="container mx-auto">
        <h2
          className="text-4xl md:text-7xl lg:text-8xl lg:w-[80%] mx-auto"
          ref={scope}
        >
          Building beautiful websites with clean code and thoughtful design to
          help your business grow and stand out stand out online.
        </h2>
      </div>
    </section>
  );
}
