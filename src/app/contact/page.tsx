import type { Metadata } from "next";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMail,
  IconMapPin,
  IconClock,
  type Icon,
} from "@tabler/icons-react";
import PageIntro from "@/components/PageIntro";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/motion/Reveal";
import GlowOrb from "@/components/GlowOrb";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${profile.name}.`,
};

const SOCIAL_ICONS: Record<string, Icon> = {
  GitHub: IconBrandGithub,
  LinkedIn: IconBrandLinkedin,
  "X / Twitter": IconBrandX,
  Facebook: IconBrandFacebook,
  Instagram: IconBrandInstagram,
  Email: IconMail,
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        kicker="Contact"
        lead="Let's"
        accent="build."
        description="Tell me what you're working on. Whether it's a live AI feature, internal tooling, or a platform that needs to scale, I'd love to hear about it."
      />

      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
          {/* glowing info panel */}
          <Reveal>
            <div className="glass-strong relative h-full overflow-hidden rounded-[1.75rem] p-8 shadow-[0_0_60px_-30px_var(--acc-glow)]">
              <div className="pointer-events-none absolute inset-0 -z-10">
                <GlowOrb
                  color="violet"
                  size={360}
                  opacity={0.22}
                  blur={120}
                  className="-right-16 -top-16"
                  duration={14}
                />
                <GlowOrb
                  color="indigo"
                  size={300}
                  opacity={0.16}
                  blur={120}
                  className="-bottom-16 -left-10"
                  duration={17}
                  delay={1}
                />
              </div>

              <span className="kicker">Reach out</span>
              <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight">
                Start a project
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                I usually reply within a day. Prefer email? Reach me directly at
                the address below.
              </p>

              <dl className="mt-9 space-y-5">
                <InfoRow icon={IconMail} label="Email">
                  <a
                    href={`mailto:${profile.email}`}
                    className="link-underline text-acc"
                  >
                    {profile.email}
                  </a>
                </InfoRow>
                <InfoRow icon={IconMapPin} label="Location">
                  <span className="text-ink">{profile.location}</span>
                </InfoRow>
                <InfoRow icon={IconClock} label="Availability">
                  <span className="text-ink">
                    Open to freelance and full-time
                  </span>
                </InfoRow>
              </dl>

              <div className="mt-9 border-t border-line pt-7">
                <span className="text-xs uppercase tracking-[0.18em] text-muted/70">
                  Elsewhere
                </span>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {profile.socials
                    .filter((s) => s.label !== "Email")
                    .map((s) => {
                      const Ico = SOCIAL_ICONS[s.label] ?? IconMail;
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="glass grid h-10 w-10 place-items-center rounded-full text-muted transition-all duration-300 hover:border-acc/60 hover:text-acc hover:shadow-[0_0_22px_-8px_var(--acc-glow)]"
                        >
                          <Ico size={18} stroke={1.6} />
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon: Ico,
  label,
  children,
}: {
  icon: Icon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="glass mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-acc">
        <Ico size={17} stroke={1.6} />
      </span>
      <div>
        <dt className="text-xs uppercase tracking-[0.18em] text-muted/70">
          {label}
        </dt>
        <dd className="mt-1 text-sm">{children}</dd>
      </div>
    </div>
  );
}
