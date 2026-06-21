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
    return {
      ok: false,
      code: "validation",
      error: "Some fields need a second look. Please check and try again.",
    };
  }
  const data = parsed.data;
  const ip = await clientIp();

  // 2. Rate limit by IP.
  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return {
      ok: false,
      code: "rate_limit",
      error:
        "You have sent a few messages already. Please try again in a little while.",
    };
  }

  // 3. Verify the Turnstile token server-side.
  const human = await verifyTurnstile(data.turnstileToken, ip);
  if (!human) {
    return {
      ok: false,
      code: "captcha",
      error: "Verification failed. Please complete the check and try again.",
    };
  }

  // 4. Send the emails.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error(
      "Missing email env (RESEND_API_KEY, CONTACT_TO_EMAIL, RESEND_FROM_EMAIL)"
    );
    return {
      ok: false,
      code: "server",
      error: "Something went wrong on my end. Please try again shortly.",
    };
  }

  const resend = new Resend(apiKey);

  try {
    // Notification to me. replyTo is set to the sender so I can reply directly.
    const { error: inquiryError } = await resend.emails.send({
      from,
      to,
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
      console.error("Resend inquiry error", inquiryError);
      return {
        ok: false,
        code: "server",
        error: "I could not send your message just now. Please try again.",
      };
    }

    // Warm confirmation to the sender. A failure here should not fail the
    // whole submission, since the inquiry already reached me.
    const { error: confirmError } = await resend.emails.send({
      from,
      to: data.email,
      subject: "Thanks for reaching out — Fuyad Hasan Fahim",
      react: (
        <ConfirmationEmail name={data.name} projectType={data.projectType} />
      ),
    });
    if (confirmError) {
      console.error("Resend confirmation error", confirmError);
    }

    return { ok: true };
  } catch (err) {
    console.error("Contact submission failed", err);
    return {
      ok: false,
      code: "server",
      error: "Something went wrong while sending. Please try again shortly.",
    };
  }
}
