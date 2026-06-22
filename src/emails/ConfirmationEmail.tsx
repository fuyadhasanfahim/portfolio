import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import { EmailShell } from "./EmailShell";
import { brand, site } from "./theme";

/** Warm auto-reply sent to the person who submitted the form. */
export default function ConfirmationEmail({
  name,
  projectType,
}: {
  name: string;
  projectType: string;
}) {
  const firstName = name.trim().split(/\s+/)[0];

  return (
    <EmailShell preview="Thanks for reaching out. Your message is with me.">
      <Section style={{ padding: "24px 36px 4px" }}>
        <Heading
          style={{
            margin: 0,
            fontSize: "24px",
            lineHeight: "30px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: brand.ink,
          }}
        >
          Thanks, {firstName}. Your message is with me.
        </Heading>
      </Section>

      <Section style={{ padding: "16px 36px 8px" }}>
        <Text
          style={{
            margin: "0 0 16px",
            fontSize: "15px",
            lineHeight: "24px",
            color: brand.muted,
          }}
        >
          I got your note about your {projectType.toLowerCase()} and I read every
          message myself. Expect a real reply from me within a day, not an
          autoresponder loop.
        </Text>
        <Text
          style={{
            margin: "0 0 16px",
            fontSize: "15px",
            lineHeight: "24px",
            color: brand.muted,
          }}
        >
          If anything urgent comes up in the meantime, you can reply straight to
          this email and it will reach me.
        </Text>

        {/* Subtle, on-brand CTA into the portfolio */}
        <Section style={{ margin: "8px 0 4px" }}>
          <Button
            href={site.projects}
            style={{
              display: "inline-block",
              backgroundColor: brand.acc,
              color: "#0a0b0d",
              fontSize: "14px",
              fontWeight: 600,
              padding: "11px 20px",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            View my work →
          </Button>
        </Section>

        <div
          style={{
            margin: "24px 0 4px",
            paddingLeft: "16px",
            borderLeft: `3px solid ${brand.acc}`,
          }}
        >
          <Text
            style={{
              margin: 0,
              fontSize: "15px",
              lineHeight: "22px",
              color: brand.muted,
            }}
          >
            Talk soon,
          </Text>
          <Text
            style={{
              margin: "2px 0 0",
              fontSize: "15px",
              fontWeight: 600,
              color: brand.ink,
            }}
          >
            Fuyad Hasan Fahim
          </Text>
        </div>
      </Section>
    </EmailShell>
  );
}
