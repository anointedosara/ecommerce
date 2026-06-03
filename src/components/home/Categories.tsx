"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Activity,
  Baby,
  BookOpen,
  Camera,
  Dumbbell,
  Gamepad2,
  Headphones,
  Monitor,
  Shirt,
  Smartphone,
  Sofa,
  Watch,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CarouselArrows from "@/components/ui/CarouselArrows";
import { useLanguage } from "@/lib/i18n";

const categories = [
  { label: "Phones", Icon: Smartphone },
  { label: "Computers", Icon: Monitor },
  { label: "SmartWatch", Icon: Watch },
  { label: "Camera", Icon: Camera },
  { label: "HeadPhones", Icon: Headphones },
  { label: "Gaming", Icon: Gamepad2 },
  { label: "Furniture", Icon: Sofa },
  { label: "Books", Icon: BookOpen },
  { label: "Fashion", Icon: Shirt },
  { label: "Health", Icon: Activity },
  { label: "Sports", Icon: Dumbbell },
  { label: "Baby & Toys", Icon: Baby },
];

export default function Categories() {
  const { t } = useLanguage();
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    rowRef.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1170px] px-4 pt-16">
      <SectionHeading
        label={t("section.categories")}
        title={t("section.browseByCategory")}
      >
        <CarouselArrows onPrev={() => scroll(-1)} onNext={() => scroll(1)} />
      </SectionHeading>

      <div
        ref={rowRef}
        className="no-scrollbar mt-12 flex gap-7 overflow-x-auto scroll-smooth pb-2"
      >
        {categories.map(({ label, Icon }) => (
          <Link
            key={label}
            href="/shop"
            className="group flex h-[145px] w-[170px] shrink-0 flex-col items-center justify-center gap-4 rounded border border-black/30 text-black transition-colors hover:border-primary hover:bg-primary hover:text-white"
          >
            <Icon size={48} strokeWidth={1.2} />
            <span className="text-base">{label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-16 border-b border-black/10" />
    </section>
  );
}
