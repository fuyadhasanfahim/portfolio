"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringOuterRef = useRef<HTMLDivElement | null>(null);
  const ringInnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const t = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (dotRef.current) dotRef.current.style.transform = t;
      if (ringOuterRef.current) ringOuterRef.current.style.transform = t;
    };

    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-cursor='hover']")) {
        ringInnerRef.current?.classList.add("scale-[1.6]", "opacity-100");
        ringInnerRef.current?.classList.remove("opacity-60");
      }
    };
    const onLeave = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-cursor='hover']")) {
        ringInnerRef.current?.classList.remove("scale-[1.6]", "opacity-100");
        ringInnerRef.current?.classList.add("opacity-60");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter, true);
    document.addEventListener("mouseout", onLeave, true);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter, true);
      document.removeEventListener("mouseout", onLeave, true);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        ref={ringOuterRef}
        className="pointer-events-none fixed left-0 top-0 z-170 hidden h-9 w-9 will-change-transform md:block"
        style={{ transform: "translate3d(0,0,0) translate(-50%, -50%)" }}
      >
        <div
          ref={ringInnerRef}
          className="h-full w-full rounded-full border border-cyan/40 opacity-60 transition-[transform,opacity] duration-200 ease-out"
          style={{ mixBlendMode: "screen" }}
        />
      </div>
      <div
        aria-hidden
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-170 hidden h-1 w-1 rounded-full bg-cyan will-change-transform md:block"
        style={{
          mixBlendMode: "screen",
          transform: "translate3d(0,0,0) translate(-50%, -50%)",
        }}
      />
    </>
  );
}
