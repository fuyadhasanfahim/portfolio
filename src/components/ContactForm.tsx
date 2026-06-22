"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  IconAlertTriangle,
  IconArrowRight,
  IconCheck,
  IconLoader2,
} from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Input, Label, Textarea } from "./ui/input";
import Select from "./ui/Select";
import {
  PROJECT_TYPES,
  SOURCES,
  contactSchema,
  type ContactInput,
} from "@/lib/contact-schema";
import { submitContact } from "@/app/contact/actions";

// Falls back to Cloudflare's always-passes test key so the widget renders in
// local dev; production uses the real NEXT_PUBLIC_TURNSTILE_SITE_KEY.
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

export default function ContactForm() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [serverDetail, setServerDetail] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", message: "", turnstileToken: "" },
  });

  async function onValid(values: ContactInput) {
    setServerError("");
    setServerDetail("");
    const res = await submitContact(values);
    if (res.ok) {
      setStatus("success");
      return;
    }
    if (res.code === "captcha") {
      setError("turnstileToken", { message: res.error });
      setTurnstileKey((k) => k + 1); // force a fresh challenge
    }
    setServerError(res.error);
    // `detail` is only sent in development; surface it so the exact failing
    // piece (Resend / Turnstile / rate limit / config) is visible.
    if (res.detail) {
      setServerDetail(res.detail);
      console.error("[contact] submit failed:", res.detail);
    }
    setStatus("error");
  }

  function sendAnother() {
    reset();
    setStatus("idle");
    setServerError("");
    setServerDetail("");
    setTurnstileKey((k) => k + 1);
  }

  if (status === "success") {
    return <SuccessPanel reduce={!!reduce} onReset={sendAnother} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      noValidate
      className="glass rounded-3xl p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Jane Doe"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@company.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="projectType">Project type</Label>
          <Controller
            control={control}
            name="projectType"
            render={({ field, fieldState }) => (
              <Select
                id="projectType"
                options={PROJECT_TYPES}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="What are we building?"
                ariaLabel="Project type"
                invalid={!!fieldState.error}
                describedBy={
                  fieldState.error ? "projectType-error" : undefined
                }
              />
            )}
          />
          <FieldError
            id="projectType-error"
            message={errors.projectType?.message}
          />
        </div>
        <div>
          <Label htmlFor="source">How did you find me?</Label>
          <Controller
            control={control}
            name="source"
            render={({ field, fieldState }) => (
              <Select
                id="source"
                options={SOURCES}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Pick a channel"
                ariaLabel="How did you find me?"
                invalid={!!fieldState.error}
                describedBy={fieldState.error ? "source-error" : undefined}
              />
            )}
          />
          <FieldError id="source-error" message={errors.source?.message} />
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder="Tell me about the project, timeline, and what success looks like."
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      {/* Cloudflare Turnstile (dark theme) */}
      <div className="mt-6">
        <Controller
          control={control}
          name="turnstileToken"
          render={({ field }) => (
            <Turnstile
              key={turnstileKey}
              siteKey={TURNSTILE_SITE_KEY}
              options={{ theme: "dark" }}
              onSuccess={(token) => field.onChange(token)}
              onExpire={() => field.onChange("")}
              onError={() => field.onChange("")}
            />
          )}
        />
        <FieldError
          id="turnstile-error"
          message={errors.turnstileToken?.message}
        />
      </div>

      {/* Server / network error banner with retry */}
      <AnimatePresence>
        {status === "error" && serverError && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            <IconAlertTriangle size={18} className="mt-0.5 shrink-0" />
            <div className="space-y-1">
              <span>{serverError}</span>
              {serverDetail && (
                <p className="font-mono text-[11px] leading-relaxed text-red-300/80">
                  dev: {serverDetail}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <IconLoader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : status === "error" ? (
          <>
            Try again
            <IconArrowRight size={18} />
          </>
        ) : (
          <>
            Send message
            <IconArrowRight size={18} />
          </>
        )}
      </Button>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.18 }}
          className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
        >
          <IconAlertTriangle size={13} stroke={2} />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function SuccessPanel({
  reduce,
  onReset,
}: {
  reduce: boolean;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass relative flex min-h-[460px] flex-col items-center justify-center overflow-hidden rounded-3xl p-10 text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(163,230,53,0.10), transparent 70%)",
        }}
      />
      <motion.div
        initial={reduce ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={
          reduce
            ? { duration: 0.2 }
            : { delay: 0.12, type: "spring", stiffness: 220, damping: 16 }
        }
        className="grid h-16 w-16 place-items-center rounded-full bg-acc text-[#0a0b0d] shadow-[0_0_40px_-6px_var(--acc-glow)]"
      >
        <IconCheck size={32} stroke={2.5} />
      </motion.div>

      <h3 className="font-display mt-7 text-2xl font-semibold tracking-tight sm:text-3xl">
        Your message is on its way.
      </h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
        Thanks for reaching out. I read every message myself and will get back to
        you as soon as possible, usually within a day. A confirmation is in your
        inbox now.
      </p>
      <button
        onClick={onReset}
        className="link-underline mt-7 text-sm text-acc"
      >
        Send another message
      </button>
    </motion.div>
  );
}
