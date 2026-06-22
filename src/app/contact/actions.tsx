"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import {
  contactSchema,
  type ContactResult,
} from "@/lib/contact-schema";
import { checkRateLimit } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";
import InquiryEmail from "@/emails/InquiryEmail";
import ConfirmationEmail from "@/emails/ConfirmationEmail";

const IS_DEV = process.env.NODE_ENV !== "production";

/**
 * Documented dev escape hatch. When CONTACT_DEV_BYPASS="true" *and* we are not
 * in production, Turnstile verification is skipped so Resend can be tested in
 * isolation without a working captcha. It is a no-op in production builds.
 */
const DEV_BYPASS_TURNSTILE =
  IS_DEV && process.env.CONTACT_DEV_BYPASS === "true";

/** Only leak the verbose reason to the client while developing. */
function withDetail(reason: string): { detail?: string } {
  return IS_DEV ? { detail: reason } : {};
}

async function clientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

export async function submitContact(input: unknown): Promise<ContactResult> {
  // 1. Validate with the same schema the client uses.
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const reason = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    console.error(`[contact] Validation failed — ${reason}`);
    return {
      ok: false,
      code: "validation",
      error: "Some fields need a second look. Please check and try again.",
      ...withDetail(reason),
    };
  }
  const data = parsed.data;
  const ip = await clientIp();

  // 2. Rate limit by IP. (Falls back to in-memory when Upstash isn't set.)
  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    console.error(`[contact] Rate limit exceeded for ip=${ip}`);
    return {
      ok: false,
      code: "rate_limit",
      error:
        "You have sent a few messages already. Please try again in a little while.",
    };
  }

  // 3. Verify the Turnstile token server-side (unless dev-bypassed).
  if (DEV_BYPASS_TURNSTILE) {
    console.warn(
      "[contact] CONTACT_DEV_BYPASS=true — skipping Turnstile verification (dev only)"
    );
  } else {
    const verified = await verifyTurnstile(data.turnstileToken, ip);
    if (!verified.ok) {
      return {
        ok: false,
        code: "captcha",
        error: "Verification failed. Please complete the check and try again.",
        ...withDetail(verified.reason),
      };
    }
  }

  // 4. Check email configuration up front, with a specific message per gap.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  const missing = [
    !apiKey && "RESEND_API_KEY",
    !to && "CONTACT_TO_EMAIL",
    !from && "RESEND_FROM_EMAIL",
  ].filter(Boolean);
  if (missing.length) {
    const reason = `Missing email env: ${missing.join(", ")}`;
    console.error(`[contact] ${reason}`);
    return {
      ok: false,
      code: "config",
      error: "Email isn't configured yet. Please reach out by email directly.",
      ...withDetail(reason),
    };
  }

  const resend = new Resend(apiKey);

  try {
    // Notification to me. replyTo is set to the sender so I can reply directly.
    const { error: inquiryError } = await resend.emails.send({
      from: from!,
      to: to!,
      replyTo: data.email,
      subject: `New project inquiry — ${data.name} (${data.projectType})`,
      react: (
        <InquiryEmail
          name={data.name}
          email={data.email}
          projectType={data.projectType}
          source={data.source}
          message={data.message}
        />
      ),
    });

    if (inquiryError) {
      // Resend returns a structured error object (does not throw) for things
      // like an unverified sender domain or an invalid API key.
      const reason = `Resend error — ${inquiryError.name}: ${inquiryError.message}`;
      console.error(`[contact] ${reason}`);

      const unverifiedDomain =
        /domain/i.test(inquiryError.message) ||
        inquiryError.name === "validation_error";
      const badKey =
        /api key/i.test(inquiryError.message) ||
        inquiryError.name === "invalid_api_key";

      return {
        ok: false,
        code: "server",
        error: unverifiedDomain
          ? "Email sender isn't verified yet. Please email me directly for now."
          : badKey
            ? "Email service isn't configured correctly. Please email me directly."
            : "I could not send your message just now. Please try again.",
        ...withDetail(reason),
      };
    }

    // Warm confirmation to the sender. A failure here should not fail the
    // whole submission, since the inquiry already reached me.
    const { error: confirmError } = await resend.emails.send({
      from: from!,
      to: data.email,
      subject: "Thanks for reaching out — Fuyad Hasan Fahim",
      react: (
        <ConfirmationEmail name={data.name} projectType={data.projectType} />
      ),
    });
    if (confirmError) {
      console.error(
        `[contact] Confirmation email failed (non-fatal) — ${confirmError.name}: ${confirmError.message}`
      );
    }

    return { ok: true };
  } catch (err) {
    const reason =
      err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    console.error(`[contact] Submission threw — ${reason}`, err);
    return {
      ok: false,
      code: "server",
      error: "Something went wrong while sending. Please try again shortly.",
      ...withDetail(reason),
    };
  }
}
