"use client";

import { useState } from "react";
import { Section } from "./Section";
import { useLocale } from "./LocaleProvider";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "mt-2 w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-ink placeholder:text-muted focus:border-accent focus:outline-none";

export function ContactForm() {
  const { t, locale } = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact" title={t.contact.title} intro={t.contact.intro}>
      <form
        onSubmit={onSubmit}
        className="relative grid max-w-2xl gap-6 rounded-2xl border border-border bg-surface p-6 sm:p-8"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block text-sm font-medium text-ink-2">
            {t.contact.name}
            <input name="name" required maxLength={200} autoComplete="name" className={inputClass} />
          </label>
          <label className="block text-sm font-medium text-ink-2">
            {t.contact.email}
            <input name="email" type="email" required maxLength={320} autoComplete="email" className={inputClass} />
          </label>
        </div>
        <label className="block text-sm font-medium text-ink-2">
          {t.contact.message}
          <textarea name="message" required maxLength={5000} rows={5} className={inputClass} />
        </label>
        {/* Honeypot: invisible to people, often filled in by bots. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-[#2a78d6] disabled:opacity-60"
          >
            {status === "sending" ? t.contact.sending : t.contact.submit}
          </button>
          <p role="status" className="text-sm text-ink-2">
            {status === "success" && t.contact.success}
            {status === "error" && t.contact.error}
          </p>
        </div>
      </form>
    </Section>
  );
}
