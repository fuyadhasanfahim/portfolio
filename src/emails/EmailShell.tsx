import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { brand, site, socials } from "./theme";

/**
 * Shared dark, on-brand wrapper for every transactional email: deep-dark
 * background, the "Fuyad Hasan Fahim" wordmark, and a full signature footer.
 * Both the inquiry and the confirmation email render their content inside this
 * shell. Layout is table-based (Row/Column) so Gmail — which strips flexbox and
 * most CSS — renders it consistently in both light and dark themes.
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
          padding: "40px 0",
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
          {/* Header / wordmark — generous top breathing room */}
          <Section style={{ padding: "40px 36px 0" }}>
            <Text
              style={{
                margin: 0,
                fontSize: "22px",
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
                height: "3px",
                width: "52px",
                marginTop: "14px",
                backgroundColor: brand.acc,
                borderRadius: "2px",
              }}
            />
          </Section>

          {children}

          {/* Footer / signature */}
          <Hr
            style={{
              borderColor: brand.border,
              borderTop: `1px solid ${brand.border}`,
              margin: "12px 36px 0",
              width: "auto",
            }}
          />
          <Section style={{ padding: "22px 36px 36px" }}>
            <Text
              style={{
                margin: "0 0 10px",
                fontSize: "13px",
                fontWeight: 600,
                color: brand.ink,
              }}
            >
              Fuyad Hasan Fahim
              <span style={{ color: brand.acc }}>.</span>
            </Text>
            <Text
              style={{
                margin: "0 0 14px",
                fontSize: "12px",
                lineHeight: "18px",
                color: brand.muted,
              }}
            >
              Full Stack Developer · AI Integration · Internal Tools
            </Text>

            {/* Social links — small, tasteful text links */}
            <Row>
              {socials.map((s, i) => (
                <Column key={s.label} style={{ width: "auto" }}>
                  <Link
                    href={s.href}
                    style={{
                      fontSize: "12px",
                      color: brand.ink,
                      textDecoration: "none",
                      paddingRight: i < socials.length - 1 ? "14px" : 0,
                    }}
                  >
                    {s.label}
                  </Link>
                </Column>
              ))}
            </Row>

            <Text
              style={{
                margin: "16px 0 0",
                fontSize: "12px",
                lineHeight: "18px",
                color: brand.muted,
              }}
            >
              <Link
                href={site.url}
                style={{ color: brand.acc, textDecoration: "none" }}
              >
                {site.domain}
              </Link>
              <span style={{ color: brand.border }}> · </span>
              {site.location}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
