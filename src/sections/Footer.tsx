"use client";

import Button from "@/components/Button";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
import { useInView } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";

const navItems = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    label: "FAQ's",
    href: "#faqs",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function Footer() {
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
    <footer className="bg-stone-900 text-white" id="contact">
      <div className="container mx-auto">
        <div className="section">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-green-400 animate-pulse" />
            <span className="uppercase">One spot available for next month</span>
          </div>

          <div className="grid md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h2
                className="text-4xl md:text-7xl lg:text-8xl mt-8 font-extralight"
                ref={scope}
              >
                Enough talk. Let&apos;s make something great together.
              </h2>
              <Button
                variant="secondary"
                iconAfter={
                  <div className="size-6 overflow-hidden">
                    <div className="h-6 w-12 flex group-hover/button:-translate-x-1/2 transition-transform duration-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </div>
                  </div>
                }
                className="mt-8 text-sm"
              >
                fuyadhasanfahim0@gmail.com
              </Button>
            </div>

            <div>
              <nav className="flex flex-col md:items-end gap-8 mt-16 md:mt-0">
                {navItems.map(({ href, label }) => (
                  <Link key={label} href={href}>
                    <Button variant="text" className="text-lg">
                      {label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <p className="py-16 text-white/30 text-sm">
          Copyright &copy; Fuyad Hasan Fahim &bull; All rights reserved.
        </p>
      </div>
    </footer>
  );
}
