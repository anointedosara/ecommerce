"use client";

import { Headset, ShieldCheck, Truck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const services = [
  {
    Icon: Truck,
    titleKey: "services.deliveryTitle",
    descKey: "services.deliveryDesc",
  },
  {
    Icon: Headset,
    titleKey: "services.serviceTitle",
    descKey: "services.serviceDesc",
  },
  {
    Icon: ShieldCheck,
    titleKey: "services.guaranteeTitle",
    descKey: "services.guaranteeDesc",
  },
];

export default function Services() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-[1170px] px-4 py-24">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {services.map(({ Icon, titleKey, descKey }) => (
          <div key={titleKey} className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-black/15">
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black text-white">
                <Icon size={22} />
              </div>
            </div>
            <h3 className="text-xl font-semibold tracking-wide text-black">
              {t(titleKey)}
            </h3>
            <p className="text-sm text-black">{t(descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
