import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccountShell from "@/components/account/AccountShell";
import ReviewsClient from "@/components/account/ReviewsClient";

export const metadata: Metadata = {
  title: "My Reviews — Exclusive",
  description: "Reviews you have written on Exclusive.",
};

export default function ReviewsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1170px] flex-1 px-4 py-20">
        <AccountShell active="My Reviews" crumb="My Reviews">
          <ReviewsClient />
        </AccountShell>
      </main>
      <Footer />
    </>
  );
}
