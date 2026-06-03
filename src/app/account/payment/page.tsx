import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccountShell from "@/components/account/AccountShell";
import PaymentClient from "@/components/account/PaymentClient";

export const metadata: Metadata = {
  title: "My Payment Options — Exclusive",
  description: "Manage your saved payment methods.",
};

export default function PaymentPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1170px] flex-1 px-4 py-20">
        <AccountShell active="My Payment Options" crumb="My Payment Options">
          <PaymentClient />
        </AccountShell>
      </main>
      <Footer />
    </>
  );
}
