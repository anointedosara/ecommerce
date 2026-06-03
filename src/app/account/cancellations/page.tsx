import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccountShell from "@/components/account/AccountShell";
import CancellationsClient from "@/components/account/CancellationsClient";

export const metadata: Metadata = {
  title: "My Cancellations — Exclusive",
  description: "Your cancelled Exclusive orders.",
};

export default function CancellationsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1170px] flex-1 px-4 py-20">
        <AccountShell active="My Cancellations" crumb="My Cancellations">
          <CancellationsClient />
        </AccountShell>
      </main>
      <Footer />
    </>
  );
}
