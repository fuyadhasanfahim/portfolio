"use client";

import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMail,
  IconArrowUp,
  type Icon,
} from "@tabler/icons-react";
import { nav, profile } from "@/lib/data";

const SOCIAL_ICONS: Record<string, Icon> = {
  GitHub: IconBrandGithub,
  LinkedIn: IconBrandLinkedin,
  "X / Twitter": IconBrandX,
  Facebook: IconBrandFacebook,
  Instagram: IconBrandInstagram,
  Email: IconMail,
};

const company = [
  { label: "Work", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legal = [
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const services = [
  "AI Integration",
  "Internal Tools",
  "Backend Systems",
  "Full Stack Apps",
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg-2/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* brand */}
          <div>
            <Link href="/" className="flex items-center">
              <span className="font-display text-lg font-semibold tracking-tight text-ink">
                Fuyad Hasan Fahim<span className="text-acc">.</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {profile.blurb}
            </p>

            {/* social icons */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {profile.socials.map((s) => {
                const Ico = SOCIAL_ICONS[s.label] ?? IconMail;
                const external = s.href.startsWith("http");
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={external ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="glass grid h-9 w-9 place-items-center rounded-full text-muted transition-all duration-300 hover:border-acc/60 hover:text-acc hover:shadow-[0_0_20px_-8px_var(--acc-glow)]"
                  >
                    <Ico size={17} stroke={1.6} />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterCol
            title="Services"
            items={services.map((s) => ({ label: s }))}
          />
          <FooterCol title="Company" items={company} />
          <FooterCol title="Legal" items={legal} />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>{profile.location}</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="link-underline flex items-center gap-1 text-ink"
            >
              Back to top
              <IconArrowUp size={14} stroke={1.8} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href?: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-xs uppercase tracking-[0.18em] text-muted/70">
        {title}
      </h4>
      <ul className="space-y-3 text-sm">
        {items.map((item) =>
          item.href ? (
            <li key={item.label}>
              <Link
                href={item.href}
                className="link-underline text-muted hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ) : (
            <li key={item.label} className="text-muted">
              {item.label}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
