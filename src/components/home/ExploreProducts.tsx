"use client";

import Link from "next/link";
import { exploreProducts } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import CarouselArrows from "@/components/ui/CarouselArrows";
import ProductCard from "@/components/ui/ProductCard";
import { useLanguage } from "@/lib/i18n";

export default function ExploreProducts() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-[1170px] px-4 pt-16">
      <SectionHeading
        label={t("section.ourProducts")}
        title={t("section.exploreProducts")}
      >
        <CarouselArrows />
      </SectionHeading>

      <div className="mt-12 grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {exploreProducts.map((product) => (
          <ProductCard key={product.id} product={product} showDiscount={false} />
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
