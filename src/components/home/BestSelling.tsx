"use client";

import Link from "@/components/ui/Link";
import { bestSelling } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import { useLanguage } from "@/lib/i18n";

export default function BestSelling() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-[1170px] px-4 pt-16">
      <SectionHeading
        label={t("section.thisMonth")}
        title={t("section.bestSelling")}
      >
        <Link
          href="/shop"
          className="rounded bg-primary px-12 py-4 text-base font-medium text-white transition-colors hover:bg-primary-hover"
        >
          {t("section.viewAll")}
        </Link>
      </SectionHeading>

      <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {bestSelling.map((product) => (
          <ProductCard key={product.id} product={product} showDiscount />
        ))}
      </div>
    </section>
  );
}
