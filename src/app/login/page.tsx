import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthArtwork from "@/components/auth/AuthArtwork";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log In — Exclusive",
  description: "Log in to your Exclusive account.",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-20">
          <AuthArtwork />
          <div className="flex justify-center px-4 lg:justify-start lg:pr-8">
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
