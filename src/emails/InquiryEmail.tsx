import { Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import { EmailShell } from "./EmailShell";
import { brand } from "./theme";
import type { ContactInput } from "@/lib/contact-schema";

type Props = Omit<ContactInput, "turnstileToken">;

/** Inquiry notification sent to Fuyad with every form submission. */
export default function InquiryEmail({
  name,
  email,
  projectType,
  source,
  message,
}: Props) {
  return (
    <EmailShell preview={`New project inquiry from ${name} (${projectType})`}>
      <Section style={{ padding: "20px 32px 4px" }}>
        <Text
          style={{
            margin: 0,
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: brand.acc,
          }}
        >
          New project inquiry
        </Text>
        <Heading
          style={{
            margin: "8px 0 0",
            fontSize: "24px",
            lineHeight: "30px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: brand.ink,
          }}
        >
          {name} wants to build a {projectType.toLowerCase()}.
        </Heading>
      </Section>

      <Section style={{ padding: "20px 32px 8px" }}>
        <Field label="Name" value={name} />
        <Field label="Email" value={email} isEmail />
        <Field label="Project type" value={projectType} />
        <Field label="How they found me" value={source} accent />
        <MessageBlock message={message} />
      </Section>
    </EmailShell>
  );
}

function Field({
  label,
  value,
  isEmail,
  accent,
}: {
  label: string;
  value: string;
  isEmail?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        padding: "12px 0",
        borderBottom: `1px solid ${brand.border}`,
      }}
    >
      <Text
        style={{
          margin: 0,
          fontSize: "11px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: brand.muted,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          margin: "4px 0 0",
          fontSize: "15px",
          color: accent ? brand.acc : brand.ink,
          fontWeight: accent ? 600 : 400,
        }}
      >
        {isEmail ? (
          <a href={`mailto:${value}`} style={{ color: brand.acc }}>
            {value}
          </a>
        ) : (
          value
        )}
      </Text>
    </div>
  );
}

function MessageBlock({ message }: { message: string }) {
  return (
    <div style={{ padding: "16px 0 4px" }}>
      <Text
        style={{
          margin: 0,
          fontSize: "11px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: brand.muted,
        }}
      >
        Message
      </Text>
      <div
        style={{
          marginTop: "8px",
          padding: "16px",
          backgroundColor: brand.panelSoft,
          border: `1px solid ${brand.border}`,
          borderLeft: `3px solid ${brand.acc}`,
          borderRadius: "10px",
        }}
      >
        <Text
          style={{
            margin: 0,
            fontSize: "15px",
            lineHeight: "24px",
            color: brand.ink,
            whiteSpace: "pre-wrap",
          }}
        >
          {message}
        </Text>
      </div>
    </div>
  );
}
