"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input, Label, Textarea } from "./ui/input";

/** UI-only contact form — no backend wired up. */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="glass flex min-h-[420px] flex-col items-center justify-center rounded-3xl p-10 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-acc text-2xl text-[#0a0b0d]">
          ✓
        </div>
        <h3 className="font-display mt-6 text-2xl font-semibold">
          Message sent
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Thanks for reaching out — this is a demo form, but in a real build
          your message would be on its way. I&apos;ll get back to you shortly.
        </p>
        <button
          onClick={() => setSent(false)}
          className="link-underline mt-6 text-sm text-acc"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Jane Doe" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jane@company.com"
            required
          />
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="What are we building?"
          required
        />
      </div>

      <div className="mt-5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell me about the project, timeline, and what success looks like."
          required
        />
      </div>

      <Button type="submit" className="mt-7 w-full sm:w-auto">
        Send message →
      </Button>
    </form>
  );
}
