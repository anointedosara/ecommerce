import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccountClient from "@/components/account/AccountClient";

export const metadata: Metadata = {
  title: "My Account — Exclusive",
  description: "Manage your Exclusive account.",
};

export default function AccountPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1170px] flex-1 px-4 py-20">
        <AccountClient />
      </main>
      <Footer />
    </>
  );
}
