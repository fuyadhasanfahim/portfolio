import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/motion/Reveal";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${profile.name}'s website.`,
};

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-acc underline-offset-4 hover:underline"
    >
      {children}
    </a>
  );
}

const sections: { h: string; body: ReactNode }[] = [
  {
    h: "1. Overview",
    body: "This privacy policy explains how this personal portfolio website handles information. The site is intentionally minimal: no accounts, no advertising on the page itself. It does use a small set of analytics tools to understand traffic and measure outreach, which are described in full below.",
  },
  {
    h: "2. Information collected",
    body: "The site does not require an account and does not ask you to identify yourself to browse. If you use the contact form, the details you submit (name, email, project type, how you found me, and your message) are sent to me by email so I can respond to your enquiry. They are not used for anything else and are not sold.",
  },
  {
    h: "3. Analytics and tracking",
    body: (
      <div className="mt-3 space-y-5 text-base leading-relaxed text-muted">
        <p>
          This site uses a couple of third-party tools to understand how it is
          used and to measure outreach. Here is exactly what each one does.
        </p>
        <div>
          <h3 className="font-medium text-ink">Meta Pixel (Facebook)</h3>
          <p className="mt-2">
            The site uses the Meta Pixel for analytics, measuring ad
            performance, and retargeting. Limited information, such as the pages
            you visit and hashed contact details (like your email and name when
            you submit the contact form, via Meta&apos;s automatic advanced
            matching), may be shared with Meta to match visitors with Meta
            accounts. That contact data is hashed before it is sent, so it is
            not transmitted in plain text. Sensitive data, such as financial,
            health, or government ID information, is never sent. You can read how
            Meta handles this in its{" "}
            <ExtLink href="https://www.facebook.com/privacy/policy/">
              data policy
            </ExtLink>
            .
          </p>
        </div>
        <div>
          <h3 className="font-medium text-ink">Google Analytics</h3>
          <p className="mt-2">
            The site uses Google Analytics to understand traffic and usage
            patterns, such as which pages are viewed, your approximate location,
            device and browser information, and the referral source that brought
            you here. It may use cookies or similar technologies, and your IP
            data may be processed by Google. See Google&apos;s{" "}
            <ExtLink href="https://policies.google.com/privacy">
              privacy policy
            </ExtLink>{" "}
            for details on how that data is handled.
          </p>
        </div>
        <div>
          <h3 className="font-medium text-ink">Cookies and your control</h3>
          <p className="mt-2">
            These tools may set cookies or use similar technologies in your
            browser. You can control or clear cookies at any time through your
            browser settings, and you can opt out of third-party tracking using
            your browser&apos;s privacy tools or the opt-out mechanisms each
            provider offers.
          </p>
        </div>
      </div>
    ),
  },
  {
    h: "4. Third-party services",
    body: "The site is hosted on Vercel, sends contact-form messages through Resend, and uses Cloudflare Turnstile to check that the form is submitted by a person. It may also link out to external project deployments and social profiles. Those external services have their own privacy policies, which govern any data you share with them.",
  },
  {
    h: "5. Data security",
    body: "Any information you choose to send through the contact form or by email is handled with reasonable care and is not shared with third parties for marketing.",
  },
  {
    h: "6. Your choices",
    body: "You can opt out of the analytics tools described above using your browser settings or the providers' opt-out mechanisms, and you can reach me at any time to ask about information you have sent directly.",
  },
  {
    h: "7. Changes",
    body: "This policy may be updated over time. The latest version will always be available on this page, with the date below reflecting the most recent change.",
  },
  {
    h: "8. Contact",
    body: `Questions about privacy can be sent to ${profile.email}.`,
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
              Last updated: June 22, 2026
            </p>
          </Reveal>
          <div className="space-y-10">
            {sections.map((s) => (
              <Reveal key={s.h}>
                <div className="border-t border-line pt-8">
                  <h2 className="font-display text-xl font-semibold tracking-tight">
                    {s.h}
                  </h2>
                  {typeof s.body === "string" ? (
                    <p className="mt-3 text-base leading-relaxed text-muted">
                      {s.body}
                    </p>
                  ) : (
                    s.body
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
