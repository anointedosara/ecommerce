"use client";

import Link from "@/components/ui/Link";
import { useLanguage } from "@/lib/i18n";

type Crumb = { key: string; href?: string };

/** Translated breadcrumb trail. The last crumb renders as plain (current) text. */
export default function Breadcrumb({
  items,
  className = "",
}: {
  items: Crumb[];
  className?: string;
}) {
  const { t } = useLanguage();
  return (
    <nav className={`flex flex-wrap items-center gap-3 text-sm ${className}`}>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.key} className="flex items-center gap-3">
            {item.href && !last ? (
              <Link href={item.href} className="text-black/50 hover:text-black">
                {t(item.key)}
              </Link>
            ) : (
              <span className={last ? "text-black" : "text-black/50"}>
                {t(item.key)}
              </span>
            )}
            {!last && <span className="text-black/50">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
