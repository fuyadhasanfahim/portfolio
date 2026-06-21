import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/motion/Reveal";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${profile.name}'s website.`,
};

const sections = [
  {
    h: "1. Overview",
    p: "This privacy policy explains how this personal portfolio website handles information. The site is intentionally minimal and does not run advertising, tracking pixels, or third-party analytics profiles.",
  },
  {
    h: "2. Information collected",
    p: "The site does not require an account and does not collect personal data as you browse. If you use the contact form, the details you submit (name, email, subject, and message) are used only to respond to your enquiry. The contact form is currently presentation-only and does not transmit or store data.",
  },
  {
    h: "3. Cookies",
    p: "This site does not set tracking or advertising cookies and does not show a cookie banner because none are required for browsing.",
  },
  {
    h: "4. Third-party services",
    p: "The site is hosted on Vercel and may link out to external project deployments and social profiles. Those external services have their own privacy policies, which govern any data you share with them.",
  },
  {
    h: "5. Data security",
    p: "Any information you choose to send by email is handled with reasonable care and is not shared with third parties for marketing.",
  },
  {
    h: "6. Your choices",
    p: "Because the site does not build a profile of you, there is nothing to opt out of. You can contact me at any time to ask about information you have sent directly.",
  },
  {
    h: "7. Changes",
    p: "This policy may be updated over time. The latest version will always be available on this page.",
  },
  {
    h: "8. Contact",
    p: `Questions about privacy can be sent to ${profile.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        kicker="Legal"
        lead="Privacy"
        accent="policy."
        description="How this website handles your information."
      />
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
    </>
  );
}
