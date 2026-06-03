"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { useStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";

export default function NewsletterForm() {
  const { notify } = useStore();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        notify(
          data.delivered
            ? "Subscribed! A confirmation email is on its way."
            : "Subscribed! Check your inbox for 10% off.",
        );
        setEmail("");
      } else {
        notify(data.error ?? "Could not subscribe.");
      }
    } catch {
      notify("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-2 rounded border border-white px-4 py-2.5"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("footer.enterEmail")}
        className="w-full bg-transparent text-sm placeholder:text-white/70 focus:outline-none"
      />
      <button type="submit" aria-label="Subscribe" className="hover:opacity-70">
        <SendHorizontal size={22} />
      </button>
    </form>
  );
}
