import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthArtwork from "@/components/auth/AuthArtwork";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password — Exclusive",
  description: "Reset your Exclusive account password.",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-20">
          <AuthArtwork />
          <div className="flex justify-center px-4 lg:justify-start lg:pr-8">
            <ForgotPasswordForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
