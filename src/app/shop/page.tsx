import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { catalog } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shop — Exclusive",
  description: "Browse all products available on Exclusive.",
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1170px] flex-1 px-4 py-20">
        {/* Breadcrumb */}
        <nav className="mb-16 flex items-center gap-3 text-sm">
          <Link href="/" className="text-black/50 hover:text-black">
            Home
          </Link>
          <span className="text-black/50">/</span>
          <span className="text-black">Shop</span>
        </nav>

        <SectionHeading label="Our Products" title="Explore Our Products" />

        <div className="mt-12 grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {catalog.map((product) => (
            <ProductCard key={product.id} product={product} showDiscount />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
