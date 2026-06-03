import type { Metadata } from "next";
import Link from "next/link";
import {
  CircleDollarSign,
  ShoppingBag,
  Store,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Services from "@/components/home/Services";
import TeamCarousel from "@/components/about/TeamCarousel";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About — Exclusive",
  description: "The story behind Exclusive, South Asia's premier online marketplace.",
};

const stats: { value: string; label: string; Icon: LucideIcon }[] = [
  { value: "10.5k", label: "Sallers active our site", Icon: Store },
  { value: "33k", label: "Mopnthly Produduct Sale", Icon: CircleDollarSign },
  { value: "45.5k", label: "Customer active in our site", Icon: ShoppingBag },
  { value: "25k", label: "Anual gross sale in our site", Icon: Wallet },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1170px] px-4 py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/" className="text-black/50 hover:text-black">
              Home
            </Link>
            <span className="text-black/50">/</span>
            <span className="text-black">About</span>
          </nav>

          {/* Our Story */}
          <section className="mt-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="flex flex-col gap-10">
              <h1 className="text-4xl font-semibold tracking-wider sm:text-5xl">
                Our Story
              </h1>
              <div className="flex flex-col gap-6 text-base leading-7 text-black">
                <p>
                  Launced in 2015, Exclusive is South Asia&apos;s premier online
                  shopping makterplace with an active presense in Bangladesh.
                  Supported by wide range of tailored marketing, data and service
                  solutions, Exclusive has 10,500 sallers and 300 brands and serves
                  3 millioons customers across the region.
                </p>
                <p>
                  Exclusive has more than 1 Million products to offer, growing at a
                  very fast. Exclusive offers a diverse assotment in categories
                  ranging from consumer.
                </p>
              </div>
            </div>
            <div className="flex min-h-[400px] items-center justify-center overflow-hidden rounded bg-[#eb7aa9] lg:min-h-[470px]">
              <span className="select-none text-[180px]" aria-hidden>
                🛍️
              </span>
            </div>
          </section>

          {/* Stats — red only on hover */}
          <Reveal>
          <section className="mt-24 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ value, label, Icon }) => (
              <div
                key={label}
                className="group flex flex-col items-center gap-4 rounded border border-black/15 py-8 text-center text-black transition-colors hover:border-primary hover:bg-primary hover:text-white"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-black/15 group-hover:bg-white/30">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white group-hover:bg-white group-hover:text-primary">
                    <Icon size={28} />
                  </span>
                </span>
                <span className="text-3xl font-bold tracking-wide">{value}</span>
                <span className="text-base">{label}</span>
              </div>
            ))}
          </section>
          </Reveal>

          {/* Team carousel */}
          <Reveal>
            <TeamCarousel />
          </Reveal>
        </div>

        <Reveal>
          <Services />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
