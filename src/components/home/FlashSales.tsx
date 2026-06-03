"use client";

import { useRef } from "react";
import Link from "@/components/ui/Link";
import { flashSales } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Countdown from "@/components/ui/Countdown";
import CarouselArrows from "@/components/ui/CarouselArrows";
import ProductCard from "@/components/ui/ProductCard";
import { useLanguage } from "@/lib/i18n";

export default function FlashSales() {
  const { t } = useLanguage();
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    // Scroll by roughly one card width (incl. gap) so the row advances/rewinds.
    row.scrollBy({ left: direction * 297, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1170px] px-4 pt-16">
      <SectionHeading label={t("section.today")}>
        <div className="flex flex-wrap items-end gap-8 sm:gap-20">
          <h2 className="text-2xl font-semibold tracking-[0.04em] text-black sm:text-4xl">
            {t("section.flashSales")}
          </h2>
          <Countdown days={3} hours={23} />
        </div>
        <CarouselArrows onPrev={() => scroll(-1)} onNext={() => scroll(1)} />
      </SectionHeading>

      {/* Horizontally scrollable product row */}
      <div
        ref={rowRef}
        className="no-scrollbar mt-10 flex scroll-px-4 gap-7 overflow-x-auto scroll-smooth pb-2"
      >
        {flashSales.map((product) => (
          <div key={product.id} className="w-[270px] shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/shop"
          className="rounded bg-primary px-12 py-4 text-base font-medium text-white transition-colors hover:bg-primary-hover"
        >
          {t("section.viewAllProducts")}
        </Link>
      </div>

      <div className="mt-16 border-b border-black/10" />
    </section>
  );
}
