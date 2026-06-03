"use client";

import Link from "@/components/ui/Link";
import ProductCard from "@/components/ui/ProductCard";
import { justForYou } from "@/lib/data";
import { useStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";

const outlineButton =
  "rounded border border-black/30 px-8 py-3 text-base font-medium text-black transition-colors hover:bg-secondary";

export default function WishlistClient() {
  const { wishlist, moveAllToBag } = useStore();
  const { t } = useLanguage();

  return (
    <>
      {/* Wishlist */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-normal text-black">
          {t("wishlist.title")} ({wishlist.length})
        </h1>
        {wishlist.length > 0 && (
          <button type="button" onClick={moveAllToBag} className={outlineButton}>
            {t("wishlist.moveAll")}
          </button>
        )}
      </div>

      {wishlist.length > 0 ? (
        <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showDiscount
              showRating={false}
              topAction="trash"
              cartMode="static"
            />
          ))}
        </div>
      ) : (
        <div className="mt-14 flex flex-col items-center gap-6 rounded bg-secondary py-16 text-center">
          <p className="text-base text-black/60">{t("wishlist.empty")}</p>
          <Link
            href="/shop"
            className="rounded bg-primary px-12 py-3 text-base font-medium text-white transition-colors hover:bg-primary-hover"
          >
            {t("wishlist.explore")}
          </Link>
        </div>
      )}

      {/* Just For You */}
      <div className="mt-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="h-10 w-5 rounded bg-primary" />
          <h2 className="text-xl font-normal text-black">
            {t("wishlist.justForYou")}
          </h2>
        </div>
        <Link href="/shop" className={outlineButton}>
          {t("wishlist.seeAll")}
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {justForYou.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showDiscount
            topAction="eye"
            cartMode="static"
          />
        ))}
      </div>
    </>
  );
}
