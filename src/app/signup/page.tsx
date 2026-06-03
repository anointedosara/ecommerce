import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthArtwork from "@/components/auth/AuthArtwork";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up — Exclusive",
  description: "Create your Exclusive account.",
};

export default function SignUpPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-20">
          {/* Illustration panel — bleeds to the left screen edge */}
          <AuthArtwork />

          {/* Form panel */}
          <div className="flex justify-center px-4 lg:justify-start lg:pr-8">
            <SignUpForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
