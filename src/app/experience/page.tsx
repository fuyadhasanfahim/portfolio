import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Timeline from "@/components/Timeline";
import ContactCTA from "@/components/ContactCTA";
import { stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "Experience",
  description: "Where I've worked and what I've built.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        kicker="Experience"
        lead="The"
        accent="journey"
        trail="so far."
        description="Three-plus years building backend systems, internal tools, and AI-powered platforms — in-house and freelance."
      />

      <section className="section-pad">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Timeline />
        </div>
      </section>

      <section className="border-y border-line bg-bg-2/30">
        <div className="section-pad mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="font-display text-[clamp(40px,6vw,64px)] font-bold leading-none">
                  {s.value}
                  <span className="text-acc">{s.suffix}</span>
                </div>
                <div className="mt-3 text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
