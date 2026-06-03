"use client";

import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/lib/i18n";

type ArrivalCardProps = {
  title: string;
  description: string;
  emoji: string;
  className?: string;
  emojiSize?: string;
};

function ArrivalCard({
  title,
  description,
  emoji,
  className = "",
  emojiSize = "text-[120px]",
}: ArrivalCardProps) {
  return (
    <div
      className={`group relative flex items-end overflow-hidden rounded bg-black p-6 text-white sm:p-8 ${className}`}
    >
      <span
        className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none opacity-90 ${emojiSize}`}
        aria-hidden
      >
        {emoji}
      </span>
      <div className="z-10 flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="max-w-[250px] text-sm text-white/80">{description}</p>
        <Link
          href="/shop"
          className="mt-2 w-fit border-b border-white pb-1 text-base font-medium transition-opacity hover:opacity-80"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default function NewArrival() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-[1170px] px-4 pt-20">
      <SectionHeading
        label={t("section.featured")}
        title={t("section.newArrival")}
      />

      <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-2 lg:grid-rows-2">
        <ArrivalCard
          title="PlayStation 5"
          description="Black and White version of the PS5 coming out on sale."
          emoji="🎮"
          emojiSize="text-[200px]"
          className="min-h-[300px] lg:row-span-2 lg:min-h-[600px]"
        />
        <ArrivalCard
          title="Women's Collections"
          description="Featured woman collections that give you another vibe."
          emoji="👗"
          className="min-h-[284px]"
        />
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          <ArrivalCard
            title="Speakers"
            description="Amazon wireless speakers"
            emoji="🔊"
            emojiSize="text-[90px]"
            className="min-h-[284px]"
          />
          <ArrivalCard
            title="Perfume"
            description="GUCCI INTENSE OUD EDP"
            emoji="🧴"
            emojiSize="text-[90px]"
            className="min-h-[284px]"
          />
        </div>
      </div>
    </section>
  );
}
