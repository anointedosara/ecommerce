import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WishlistClient from "@/components/wishlist/WishlistClient";

export const metadata: Metadata = {
  title: "Wishlist — Exclusive",
  description: "Your saved Exclusive products.",
};

export default function WishlistPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1170px] flex-1 px-4 py-20">
        <WishlistClient />
      </main>
      <Footer />
    </>
  );
}
