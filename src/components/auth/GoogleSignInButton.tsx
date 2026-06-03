"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import GoogleIcon from "@/components/ui/GoogleIcon";
import { useStore } from "@/lib/store";

type GoogleSignInButtonProps = {
  label: string;
  redirect?: string;
};

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

/** Sample accounts shown in the demo account picker. */
const demoAccounts = [
  { name: "Md Rimel", email: "rimel@gmail.com", emoji: "🧑" },
  { name: "Sara Khan", email: "sara.khan@gmail.com", emoji: "👩" },
];

/** Decode the `name`/`email` claims out of a Google ID-token JWT. */
function decodeJwt(token: string): { name?: string; email?: string } {
  try {
    const part = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(atob(part))));
  } catch {
    return {};
  }
}

export default function GoogleSignInButton({
  label,
  redirect = "/account",
}: GoogleSignInButtonProps) {
  const router = useRouter();
  const { signInWithGoogle } = useStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const gsiReady = useRef(false);

  const finish = (n: string, e: string) => {
    const result = signInWithGoogle(n, e);
    if (result.ok) router.push(redirect);
  };

  // Real Google Identity Services — only active when a client ID is configured.
  useEffect(() => {
    if (!CLIENT_ID || gsiReady.current) return;
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      const google = (window as unknown as { google?: any }).google;
      if (!google) return;
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response: { credential: string }) => {
          const { name: n, email: e } = decodeJwt(response.credential);
          if (n && e) finish(n, e);
        },
      });
      gsiReady.current = true;
    };
    document.body.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    const google = (window as unknown as { google?: any }).google;
    if (CLIENT_ID && google && gsiReady.current) {
      google.accounts.id.prompt(); // real Google One Tap / popup
      return;
    }
    setOpen(true); // demo account picker
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center justify-center gap-4 rounded border border-black/30 py-4 text-base font-normal text-black transition-colors hover:bg-secondary"
      >
        <GoogleIcon size={24} />
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-[400px] overflow-hidden rounded-lg bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
              <span className="flex items-center gap-3">
                <GoogleIcon size={22} />
                <span className="text-sm font-medium">Sign in with Google</span>
              </span>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="text-black/50 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-5">
              <p className="text-lg font-medium">Choose an account</p>
              <p className="mt-1 text-sm text-black/60">
                to continue to <span className="font-medium">Exclusive</span>
              </p>

              <div className="mt-4 flex flex-col">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => finish(acc.name, acc.email)}
                    className="flex items-center gap-3 rounded px-2 py-3 text-left transition-colors hover:bg-secondary"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-lg">
                      {acc.emoji}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium">{acc.name}</span>
                      <span className="text-xs text-black/60">{acc.email}</span>
                    </span>
                  </button>
                ))}
              </div>

              {/* Use another account */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (name.trim() && email.trim()) finish(name, email);
                }}
                className="mt-4 flex flex-col gap-3 border-t border-black/10 pt-4"
              >
                <p className="text-sm font-medium">Use another account</p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="h-11 rounded border border-black/20 px-3 text-sm focus:border-black focus:outline-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="h-11 rounded border border-black/20 px-3 text-sm focus:border-black focus:outline-none"
                />
                <button
                  type="submit"
                  className="ml-auto rounded bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
