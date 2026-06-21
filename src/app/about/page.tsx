import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import ContactCTA from "@/components/ContactCTA";
import TechStack from "@/components/TechStack";
import Reveal from "@/components/motion/Reveal";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: profile.blurb,
};

const journey = [
  {
    year: "2023",
    title: "Went full stack, freelance",
    body: "Started partnering with founders and agencies, taking products from blank repo to shipped.",
  },
  {
    year: "2024",
    title: "Joined WebBriks as a Backend Developer",
    body: "Focused on internal tools, AI support systems, and durable infrastructure for production teams.",
  },
  {
    year: "Now",
    title: "Building systems that think",
    body: "Live AI, queue-based engines, and multi-tenant platforms — with an eye for the story behind the product.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        kicker="About"
        lead="Developer,"
        accent="and storyteller."
        description={profile.blurb}
      />

      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6 text-base leading-relaxed text-muted">
            <Reveal>
              <p>
                I&apos;m {profile.name}, a full stack developer based in{" "}
                {profile.location}. I care about systems that hold up — the kind
                that keep working when traffic spikes, edge cases pile up, and
                the demo is long over.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p>
                Most of my work lives in the backend and the unglamorous middle:
                intent routing, conversation memory, job queues, retries,
                tenant isolation. The plumbing that makes a product feel
                effortless from the outside.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>
                What sets my work apart is a background in{" "}
                <span className="text-acc">photography and videography</span>.
                I see products as stories — how something feels to use is as
                real to me as how it&apos;s wired. That lens shapes everything
                from UI rhythm to how I present a case study.
              </p>
            </Reveal>
          </div>

          {/* journey timeline */}
          <div>
            <h3 className="mb-7 text-xs uppercase tracking-[0.18em] text-muted/70">
              The path
            </h3>
            <ol className="relative ml-2 border-l border-line">
              {journey.map((j, i) => (
                <li key={j.year} className="relative pb-10 pl-7 last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-acc shadow-[0_0_12px_var(--acc-glow)]" />
                  <Reveal delay={i * 0.05}>
                    <div className="font-display text-sm text-acc">
                      {j.year}
                    </div>
                    <div className="font-display mt-1 text-lg font-semibold">
                      {j.title}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {j.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* tech stack */}
      <section className="border-t border-line section-pad">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <span className="kicker">Toolkit</span>
            <h2 className="font-display mt-4 text-[clamp(28px,4vw,48px)] font-semibold tracking-tight">
              The stack I{" "}
              <span className="font-serif-accent font-normal text-acc">
                reach for.
              </span>
            </h2>
          </Reveal>

          <div className="mt-12">
            <TechStack />
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
