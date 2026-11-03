"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { profile } from "@/content";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const fieldClass =
  "mt-2 w-full rounded-xl border-2 border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-amber focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // Wake the API early in case the free host has put it to sleep.
  useEffect(() => {
    if (API_URL) fetch(`${API_URL}/health`).catch(() => {});
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!API_URL) {
      const body = `${data.message}\n\n${data.name}${data.company ? `, ${data.company}` : ""}\n${data.email}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        `Project enquiry from ${data.name}`,
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        form.reset();
        setStatus({ kind: "sent" });
        return;
      }
      const payload = await res.json().catch(() => null);
      const message =
        res.status === 422
          ? "Check that your email address is valid and your message is at least 10 characters."
          : res.status === 429
            ? "Too many messages from this connection. Try again in an hour, or email me directly."
            : (payload?.detail as string) ?? "The message could not be sent. Email me directly instead.";
      setStatus({ kind: "error", message });
    } catch {
      setStatus({
        kind: "error",
        message: "The message could not reach the server. Check your connection, or email me directly.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <motion.div
        role="status"
        className="rounded-2xl border-2 border-amber p-8"
        initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.7 }}
      >
        <motion.span
          aria-hidden="true"
          className="mb-4 grid size-14 place-items-center rounded-full bg-amber text-2xl text-ink"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
        >
          ✓
        </motion.span>
        <p className="font-display text-2xl font-bold">Message sent.</p>
        <p className="mt-3 text-white/80">
          Thanks for getting in touch. I reply within one working day, usually sooner.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 font-semibold text-amber underline underline-offset-4"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[0.95rem] font-medium">
          Name
          <input name="name" required minLength={2} maxLength={100} autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-[0.95rem] font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="block text-[0.95rem] font-medium">
        Company <span className="text-white/50">(optional)</span>
        <input name="company" maxLength={120} autoComplete="organization" className={fieldClass} />
      </label>
      <label className="block text-[0.95rem] font-medium">
        What do you need?
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="A new module, an Odoo upgrade, a dashboard, a full-time role..."
          className={fieldClass}
        />
      </label>
      {/* Hidden from people; bots tend to fill it in. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {status.kind === "error" && (
        <motion.p
          role="alert"
          className="rounded-xl bg-[#ff5a6e]/15 px-4 py-3 text-[#ffc2ca]"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: [0, -10, 10, -6, 6, 0] }}
          transition={{ duration: 0.5 }}
        >
          {status.message}
        </motion.p>
      )}

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="justify-self-start rounded-full bg-amber px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70"
      >
        {status.kind === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
