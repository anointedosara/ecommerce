"use client";

import { useState } from "react";
import Link from "@/components/ui/Link";
import { useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import AccountMenu from "./AccountMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { catalog } from "@/lib/data";
import { useStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";

const baseNavLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.contact", href: "/contact" },
  { key: "nav.about", href: "/about" },
];

function TopBar() {
  const { t } = useLanguage();
  return (
    <div className="bg-black text-white">
      <div className="mx-auto flex max-w-[1170px] items-center justify-center gap-2 px-4 py-2.5 text-sm font-normal sm:justify-between">
        <p className="text-center text-white/90">
          {t("announce.text")}{" "}
          <Link href="/shop" className="font-semibold underline">
            {t("announce.shopNow")}
          </Link>
        </p>
        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-2 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-medium text-white">
      {count}
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { cartCount, wishlistCount, notify, user } = useStore();
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const match = catalog.find((p) => p.name.toLowerCase().includes(q));
    if (match) {
      router.push(`/product/${match.id}`);
      setQuery("");
      setOpen(false);
    } else {
      notify(`No products found for "${query.trim()}"`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <TopBar />
      <div className="border-b border-black/10">
        <div className="mx-auto flex max-w-[1170px] items-center justify-between gap-6 px-4 py-5 lg:py-6">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link
            href="/"
            className="font-inter text-2xl font-bold tracking-[0.05em] text-black"
          >
            Exclusive
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-12 lg:flex">
            {baseNavLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="border-b border-transparent pb-1 text-base text-black transition-colors hover:border-black/30"
              >
                {t(link.key)}
              </Link>
            ))}
            {!user && (
              <Link
                href="/signup"
                className="border-b border-transparent pb-1 text-base text-black transition-colors hover:border-black/30"
              >
                {t("nav.signup")}
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("search.placeholder")}
                className="w-[200px] rounded bg-secondary py-2 pl-4 pr-10 text-xs placeholder:text-black/50 focus:outline-none lg:w-[243px]"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-primary"
              >
                <Search size={20} />
              </button>
            </form>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative hover:text-primary"
            >
              <Heart size={24} />
              <CountBadge count={wishlistCount} />
            </Link>
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative hover:text-primary"
            >
              <ShoppingCart size={26} />
              <CountBadge count={cartCount} />
            </Link>
            {user && <AccountMenu />}
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="flex flex-col gap-1 border-t border-black/10 px-4 pb-4 pt-2 lg:hidden">
            {baseNavLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="py-2 text-base text-black"
                onClick={() => setOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
            {user ? (
              <Link
                href="/account"
                className="py-2 text-base text-black"
                onClick={() => setOpen(false)}
              >
                {t("nav.myAccount")}
              </Link>
            ) : (
              <Link
                href="/signup"
                className="py-2 text-base text-black"
                onClick={() => setOpen(false)}
              >
                {t("nav.signup")}
              </Link>
            )}
            <form onSubmit={handleSearch} className="relative mt-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("search.placeholder")}
                className="w-full rounded bg-secondary py-2 pl-4 pr-10 text-xs placeholder:text-black/50 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
              >
                <Search size={20} />
              </button>
            </form>
          </nav>
        )}
      </div>
    </header>
  );
}
