"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Apple, ArrowRight, ChevronRight } from "lucide-react";
import { sidebarCategories } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const slides = [
  { tag: "iPhone 14 Series", headline: "Up to 10%\noff Voucher" },
  { tag: "Galaxy Z Fold", headline: "Up to 15%\noff Voucher" },
  { tag: "MacBook Pro", headline: "Up to 20%\noff Voucher" },
  { tag: "Sony Headphones", headline: "Up to 25%\noff Voucher" },
  { tag: "Smart Watch", headline: "Up to 30%\noff Voucher" },
];

export default function Hero() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % slides.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  const slide = slides[active];

  return (
    <section className="mx-auto max-w-[1170px] px-4">
      <div className="flex gap-0 pt-10 lg:gap-0">
        {/* Sidebar */}
        <aside className="hidden w-[217px] shrink-0 border-r border-black/10 pr-4 lg:block">
          <ul className="flex flex-col gap-4 pt-2">
            {sidebarCategories.map((cat) => (
              <li key={cat.label}>
                <Link
                  href="/shop"
                  className="flex items-center justify-between text-base text-black transition-colors hover:text-primary"
                >
                  {cat.label}
                  {cat.hasChildren && <ChevronRight size={18} />}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Promo banner */}
        <div className="w-full lg:pl-11">
          <div className="relative flex min-h-[280px] items-center overflow-hidden rounded bg-black px-8 py-8 text-white sm:min-h-[344px] sm:px-16">
            <div className="z-10 flex max-w-sm flex-col gap-5">
              <div className="flex items-center gap-6">
                <Apple size={40} className="text-white" />
                <span className="text-base">{slide.tag}</span>
              </div>
              <h1 className="whitespace-pre-line text-4xl font-semibold leading-tight tracking-wide sm:text-5xl">
                {slide.headline}
              </h1>
              <Link
                href="/shop"
                className="group flex w-fit items-center gap-2 border-b border-white pb-1 text-base font-medium"
              >
                {t("hero.shopNow")}
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Product visual */}
            <Image
              src="/hero/iphone.png"
              alt="iPhone 14 Series"
              width={420}
              height={320}
              priority
              className="pointer-events-none absolute right-4 top-1/2 hidden max-h-[80%] w-auto -translate-y-1/2 select-none object-contain sm:block"
            />

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-3 w-3 rounded-full border-2 border-white transition-colors ${
                    i === active ? "bg-primary ring-2 ring-white/40" : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
