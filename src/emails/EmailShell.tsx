import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { brand } from "./theme";

/**
 * Shared dark, on-brand wrapper for every transactional email: deep-dark
 * background, the "Fuyad Hasan Fahim" wordmark, and a quiet footer. Both the
 * inquiry and the confirmation email render their content inside this shell.
 */
export function EmailShell({
  preview,
  children,
}: {
  preview: string;
  children: React.ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: brand.bg,
          margin: 0,
          padding: "32px 0",
          fontFamily: brand.fontSans,
        }}
      >
        <Container
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: brand.panel,
            border: `1px solid ${brand.border}`,
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {/* Header / wordmark */}
          <Section style={{ padding: "28px 32px 0" }}>
            <Text
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: brand.ink,
              }}
            >
              Fuyad Hasan Fahim
              <span style={{ color: brand.acc }}>.</span>
            </Text>
            <div
              style={{
                height: "2px",
                width: "40px",
                marginTop: "12px",
                backgroundColor: brand.acc,
                borderRadius: "2px",
              }}
            />
          </Section>

          {children}

          <Hr style={{ borderColor: brand.border, margin: "8px 32px" }} />
          <Section style={{ padding: "8px 32px 28px" }}>
            <Text
              style={{
                margin: 0,
                fontSize: "12px",
                lineHeight: "18px",
                color: brand.muted,
              }}
            >
              Full Stack Developer · AI Integration · Internal Tools
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
