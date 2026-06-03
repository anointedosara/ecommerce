"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleIcon from "@/components/ui/GoogleIcon";
import { useStore } from "@/lib/store";

const fields = [
  { name: "name", type: "text", placeholder: "Name" },
  { name: "contact", type: "text", placeholder: "Email or Phone Number" },
  { name: "password", type: "password", placeholder: "Password" },
];

export default function SignUpForm() {
  const router = useRouter();
  const { signUp } = useStore();
  const [values, setValues] = useState({ name: "", contact: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = signUp(values.name, values.contact, values.password);
    if (result.ok) {
      router.push("/account");
    } else {
      setError(result.error ?? "Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[370px] flex-col gap-8"
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-medium tracking-[0.04em] text-black sm:text-4xl">
          Create an account
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

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          className="rounded bg-primary py-4 text-base font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Create Account
        </button>
        <button
          type="button"
          onClick={() => setError("Google sign-up isn't available in this demo.")}
          className="flex items-center justify-center gap-4 rounded border border-black/30 py-4 text-base font-normal text-black transition-colors hover:bg-secondary"
        >
          <GoogleIcon size={24} />
          Sign up with Google
        </button>
      </div>

      <p className="flex items-center justify-center gap-4 text-base text-black/70">
        Already have account?
        <Link
          href="/login"
          className="border-b border-black/40 pb-0.5 font-medium text-black"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
