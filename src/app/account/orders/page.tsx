import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccountShell from "@/components/account/AccountShell";
import OrdersClient from "@/components/account/OrdersClient";

export const metadata: Metadata = {
  title: "My Orders — Exclusive",
  description: "Track your Exclusive orders.",
};

export default function OrdersPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1170px] flex-1 px-4 py-20">
        <AccountShell active="My Orders" crumb="My Orders">
          <OrdersClient />
        </AccountShell>
      </main>
      <Footer />
    </>
  );
}
