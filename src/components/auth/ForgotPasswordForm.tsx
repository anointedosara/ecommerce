"use client";

import { useState } from "react";
import Link from "@/components/ui/Link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { accountExists, resetPassword } = useStore();

  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const inputClass =
    "border-b border-black/40 pb-2 text-base placeholder:text-black/40 focus:border-black focus:outline-none";

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountExists(email)) {
      setError("No account found with that email.");
      return;
    }
    setError(null);
    setStep("reset");
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    const result = resetPassword(email, password);
    if (result.ok) {
      router.push("/login");
    } else {
      setError(result.error ?? "Could not reset password.");
    }
  };

  return (
    <div className="flex w-full max-w-[370px] flex-col gap-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-medium tracking-[0.04em] text-black sm:text-4xl">
          Reset your password
        </h1>
        <p className="text-base text-black">
          {step === "email"
            ? "Enter the email linked to your account."
            : "Choose a new password for your account."}
        </p>
      </div>

      {step === "email" ? (
        <form onSubmit={handleEmail} className="flex flex-col gap-10">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            className={inputClass}
          />
          {error && <p className="-mt-6 text-sm text-primary">{error}</p>}
          <button
            type="submit"
            className="rounded bg-primary px-12 py-4 text-base font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Continue
          </button>
        </form>
      ) : (
        <form onSubmit={handleReset} className="flex flex-col gap-10">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(null);
            }}
            className={inputClass}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              if (error) setError(null);
            }}
            className={inputClass}
          />
          {error && <p className="-mt-6 text-sm text-primary">{error}</p>}
          <button
            type="submit"
            className="rounded bg-primary px-12 py-4 text-base font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Reset Password
          </button>
        </form>
      )}

      <p className="text-sm text-black/60">
        Remembered it?{" "}
        <Link href="/login" className="font-medium text-black underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
