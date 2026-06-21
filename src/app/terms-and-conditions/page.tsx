import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/motion/Reveal";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for ${profile.name}'s website.`,
};

const sections = [
  {
    h: "1. Acceptance of terms",
    p: "By accessing and using this website you accept these terms in full. If you disagree with any part of these terms, please do not use the site.",
  },
  {
    h: "2. Use of the site",
    p: "This is a personal portfolio website. You may view and reference its content for personal, non-commercial purposes. You may not republish, sell, or redistribute the content as your own.",
  },
  {
    h: "3. Intellectual property",
    p: "Unless stated otherwise, the design, text, and original code samples on this site are the work of Fuyad Hasan Fahim. Project names, logos, and trademarks belong to their respective owners. Case studies describe work delivered for clients and employers and are shared for portfolio purposes.",
  },
  {
    h: "4. Project information",
    p: "Project descriptions, metrics, and technical details are provided in good faith to illustrate the work. Some internal projects are described at a high level to respect client and employer confidentiality.",
  },
  {
    h: "5. External links",
    p: "This site links to external websites and live project deployments that are not under its control. It is not responsible for the content or availability of those external sites.",
  },
  {
    h: "6. Limitation of liability",
    p: "The site is provided on an as-is basis without warranties of any kind. Fuyad Hasan Fahim is not liable for any loss or damage arising from the use of this site.",
  },
  {
    h: "7. Changes",
    p: "These terms may be updated from time to time. Continued use of the site after changes constitutes acceptance of the revised terms.",
  },
  {
    h: "8. Contact",
    p: `Questions about these terms can be sent to ${profile.email}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageIntro
        kicker="Legal"
        lead="Terms &"
        accent="conditions."
        description="The terms that govern your use of this website."
      />
      <LegalBody sections={sections} />
    </>
  );
}

function LegalBody({
  sections,
}: {
  sections: { h: string; p: string }[];
}) {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-12 text-sm text-muted/70">
            Last updated: June 2026
          </p>
        </Reveal>
        <div className="space-y-10">
          {sections.map((s) => (
            <Reveal key={s.h}>
              <div className="border-t border-line pt-8">
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  {s.h}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {s.p}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
