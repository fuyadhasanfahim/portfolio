import { z } from "zod";

/**
 * Single source of truth for the contact form. The schema is imported by both
 * the client (React Hook Form resolver) and the server action, so validation
 * rules can never drift between the two.
 */

export const PROJECT_TYPES = [
  "Internal Tool",
  "Dashboard",
  "SaaS Platform",
  "AI Integration",
  "Full Stack App",
  "Other",
] as const;

export const SOURCES = [
  "Marketplace",
  "LinkedIn",
  "Referral",
  "Google",
  "X (Twitter)",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "That name is a little long"),
  email: z.email("Enter a valid email address").max(160),
  projectType: z.enum(PROJECT_TYPES, { error: "Select a project type" }),
  source: z.enum(SOURCES, { error: "Let me know how you found me" }),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two helps me prepare")
    .max(4000, "That message is too long"),
  turnstileToken: z.string().min(1, "Please complete the verification"),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** The shape returned by the contact server action. */
export type ContactResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      code?: "rate_limit" | "captcha" | "validation" | "config" | "server";
      /** Verbose reason, only populated in development to aid debugging. */
      detail?: string;
    };
