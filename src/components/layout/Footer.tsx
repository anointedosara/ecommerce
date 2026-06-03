"use client";

import Link from "next/link";
import { QrCode } from "lucide-react";
import { SocialLinks } from "@/components/ui/SocialLinks";
import NewsletterForm from "./NewsletterForm";
import { useLanguage } from "@/lib/i18n";

const columns = [
  {
    titleKey: "footer.account",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Login / Register", href: "/login" },
      { label: "Cart", href: "/cart" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shop", href: "/shop" },
    ],
  },
  {
    titleKey: "footer.quickLink",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms Of Use", href: "/terms" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid max-w-[1170px] grid-cols-1 gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-5">
        {/* Subscribe */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="font-inter text-2xl font-bold tracking-wide">
            Exclusive
          </Link>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-medium">{t("footer.subscribe")}</p>
            <p className="text-base">{t("footer.subscribeDesc")}</p>
            <NewsletterForm />
          </div>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-6">
          <p className="text-xl font-medium">{t("footer.support")}</p>
          <address className="flex flex-col gap-4 text-base not-italic leading-7">
            <span>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</span>
            <a href="mailto:exclusive@gmail.com">exclusive@gmail.com</a>
            <a href="tel:+88015888889999">+88015-88888-9999</a>
          </address>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <div key={col.titleKey} className="flex flex-col gap-6">
            <p className="text-xl font-medium">{t(col.titleKey)}</p>
            <ul className="flex flex-col gap-4 text-base">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white/70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Download App */}
        <div className="flex flex-col gap-6">
          <p className="text-xl font-medium">{t("footer.downloadApp")}</p>
          <p className="text-xs font-medium text-white/70">
            Save $3 with App New User Only
          </p>
          <div className="flex items-center gap-2">
            <div className="flex h-[76px] w-[76px] items-center justify-center rounded bg-white text-black">
              <QrCode size={64} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex h-[38px] w-[110px] items-center justify-center rounded border border-white/40 bg-black text-[10px]">
                Google Play
              </div>
              <div className="flex h-[38px] w-[110px] items-center justify-center rounded border border-white/40 bg-black text-[10px]">
                App Store
              </div>
            </div>
          </div>
          <SocialLinks />
        </div>
      </div>

      <div className="border-t border-white/20 py-6 text-center text-base text-white/40">
        © Copyright Rimel 2022. All right reserved
      </div>
    </footer>
  );
}
