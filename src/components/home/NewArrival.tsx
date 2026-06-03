"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/lib/i18n";

type ArrivalCardProps = {
  title: string;
  description: string;
  image: string;
  className?: string;
  imageClass?: string;
};

function ArrivalCard({
  title,
  description,
  image,
  className = "",
  imageClass = "",
}: ArrivalCardProps) {
  return (
    <div
      className={`group relative flex items-end overflow-hidden rounded bg-black p-6 text-white sm:p-8 ${className}`}
    >
      <Image
        src={image}
        alt={title}
        width={520}
        height={420}
        className={`pointer-events-none absolute select-none object-contain ${imageClass}`}
      />
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
          image="/new-arrival/ps5.svg"
          imageClass="bottom-0 left-1/2 w-[90%] max-w-[510px] -translate-x-1/2"
          className="min-h-[300px] lg:row-span-2 lg:min-h-[600px]"
        />
        <ArrivalCard
          title="Women's Collections"
          description="Featured woman collections that give you another vibe."
          image="/new-arrival/women.svg"
          imageClass="right-0 top-0 h-full w-auto"
          className="min-h-[284px]"
        />
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          <ArrivalCard
            title="Speakers"
            description="Amazon wireless speakers"
            image="/new-arrival/speakers.svg"
            imageClass="right-2 top-1/2 h-[80%] w-auto -translate-y-1/2"
            className="min-h-[284px]"
          />
          <ArrivalCard
            title="Perfume"
            description="GUCCI INTENSE OUD EDP"
            image="/new-arrival/perfume.svg"
            imageClass="right-2 top-1/2 h-[80%] w-auto -translate-y-1/2"
            className="min-h-[284px]"
          />
        </div>
      </div>
    </section>
  );
}
