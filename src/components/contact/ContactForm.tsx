"use client";

import { useState } from "react";

const inputClass =
  "rounded bg-secondary px-6 py-4 text-base placeholder:text-black/50 focus:outline-none";

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const update =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (sent) setSent(false);
      if (error) setError(null);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.ok) {
        setSent(true);
        setValues({ name: "", email: "", phone: "", message: "" });
      } else {
        setError(data.error ?? "Could not send your message.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col gap-8 rounded bg-white px-8 py-10 shadow-[0_1px_13px_rgba(0,0,0,0.05)]"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <input
          className={inputClass}
          placeholder="Your Name *"
          required
          value={values.name}
          onChange={update("name")}
        />
        <input
          className={inputClass}
          type="email"
          placeholder="Your Email *"
          required
          value={values.email}
          onChange={update("email")}
        />
        <input
          className={inputClass}
          type="tel"
          placeholder="Your Phone *"
          required
          value={values.phone}
          onChange={update("phone")}
        />
      </div>

      <textarea
        className={`${inputClass} min-h-[200px] resize-none`}
        placeholder="Your Massage"
        value={values.message}
        onChange={update("message")}
      />

      <div className="flex items-center justify-end gap-6">
        {sent && (
          <span className="text-base text-success">
            Thanks! Your message was sent. We&apos;ll reply within 24 hours.
          </span>
        )}
        {error && <span className="text-base text-primary">{error}</span>}
        <button
          type="submit"
          disabled={sending}
          className="rounded bg-primary px-8 py-4 text-base font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send Massage"}
        </button>
      </div>
    </form>
  );
}
