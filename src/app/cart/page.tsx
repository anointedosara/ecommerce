import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartClient from "@/components/cart/CartClient";

export const metadata: Metadata = {
  title: "Cart — Exclusive",
  description: "Review the items in your cart.",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1170px] flex-1 px-4 py-20">
        {/* Breadcrumb */}
        <nav className="mb-20 flex items-center gap-3 text-sm">
          <Link href="/" className="text-black/50 hover:text-black">
            Home
          </Link>
          <span className="text-black/50">/</span>
          <span className="text-black">Cart</span>
        </nav>

        <CartClient />
      </main>
      <Footer />
    </>
  );
}
