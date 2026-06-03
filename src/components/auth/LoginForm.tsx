"use client";

import { useState } from "react";
import Link from "@/components/ui/Link";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { useStore } from "@/lib/store";

const fields = [
  { name: "contact", type: "text", placeholder: "Email or Phone Number" },
  { name: "password", type: "password", placeholder: "Password" },
];

export default function LoginForm() {
  const router = useRouter();
  const { logIn } = useStore();
  const [values, setValues] = useState({ contact: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = logIn(values.contact, values.password);
    if (result.ok) {
      router.push("/account");
    } else {
      setError(result.error ?? "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[370px] flex-col gap-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-medium tracking-[0.04em] text-black sm:text-4xl">
          Log in to Exclusive
        </h1>
        <p className="text-base text-black">Enter your details below</p>
      </div>

      <div className="flex flex-col gap-10">
        {fields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={values[field.name as keyof typeof values]}
            onChange={(e) => {
              setValues((v) => ({ ...v, [field.name]: e.target.value }));
              if (error) setError(null);
            }}
            className="border-b border-black/40 pb-2 text-base placeholder:text-black/40 focus:border-black focus:outline-none"
          />
        ))}
      </div>

      {error && <p className="-mt-4 text-sm text-primary">{error}</p>}

      <div className="flex items-center justify-between gap-4">
        <button
          type="submit"
          className="rounded bg-primary px-12 py-4 text-base font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Log In
        </button>
        <Link
          href="/forgot-password"
          className="text-base text-primary hover:underline"
        >
          Forget Password?
        </Link>
      </div>

      <GoogleSignInButton label="Sign in with Google" redirect="/account" />

      <p className="text-sm text-black/60">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-black underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
