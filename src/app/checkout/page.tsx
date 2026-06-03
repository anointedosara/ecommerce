import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — Exclusive",
  description: "Complete your purchase.",
};

const crumbs = [
  { label: "Account", href: "/account" },
  { label: "My Account", href: "/account" },
  { label: "Product", href: "/" },
  { label: "View Cart", href: "/cart" },
  { label: "CheckOut", href: "/checkout" },
];

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1170px] flex-1 px-4 py-20">
        {/* Breadcrumb */}
        <nav className="mb-20 flex flex-wrap items-center gap-3 text-sm">
          {crumbs.map((crumb, i) => {
            const last = i === crumbs.length - 1;
            return (
              <span key={crumb.label} className="flex items-center gap-3">
                <Link
                  href={crumb.href}
                  className={last ? "text-black" : "text-black/50 hover:text-black"}
                >
                  {crumb.label}
                </Link>
                {!last && <span className="text-black/50">/</span>}
              </span>
            );
          })}
        </nav>

        <CheckoutClient />
      </main>
      <Footer />
    </>
  );
}
