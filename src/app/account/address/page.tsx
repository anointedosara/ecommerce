import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccountShell from "@/components/account/AccountShell";
import AddressClient from "@/components/account/AddressClient";

export const metadata: Metadata = {
  title: "Address Book — Exclusive",
  description: "Manage your saved delivery addresses.",
};

export default function AddressPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1170px] flex-1 px-4 py-20">
        <AccountShell active="Address Book" crumb="Address Book">
          <AddressClient />
        </AccountShell>
      </main>
      <Footer />
    </>
  );
}
