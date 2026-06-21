"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Forces the viewport to the top on every route change. Next.js does this by
 * default, but Lenis smooth scroll can retain position, so we reset both the
 * Lenis instance and the native scroll whenever the pathname changes.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } })
      .__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
