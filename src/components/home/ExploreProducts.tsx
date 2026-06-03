"use client";

import { useRef } from "react";
import Link from "@/components/ui/Link";
import { exploreProducts } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import CarouselArrows from "@/components/ui/CarouselArrows";
import ProductCard from "@/components/ui/ProductCard";
import { useLanguage } from "@/lib/i18n";

export default function ExploreProducts() {
  const { t } = useLanguage();
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    rowRef.current?.scrollBy({ left: direction * 297, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1170px] px-4 pt-16">
      <SectionHeading
        label={t("section.ourProducts")}
        title={t("section.exploreProducts")}
      >
        <CarouselArrows onPrev={() => scroll(-1)} onNext={() => scroll(1)} />
      </SectionHeading>

      {/* Single horizontally scrollable row, like Flash Sales */}
      <div
        ref={rowRef}
        className="no-scrollbar mt-12 flex gap-7 overflow-x-auto scroll-smooth pb-2"
      >
        {exploreProducts.map((product) => (
          <div key={product.id} className="w-[270px] shrink-0">
            <ProductCard product={product} showDiscount={false} />
          </div>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Link
          href="/shop"
          className="rounded bg-primary px-12 py-4 text-base font-medium text-white transition-colors hover:bg-primary-hover"
        >
          {t("section.viewAllProducts")}
        </Link>
      </div>
    </section>
  );
}
