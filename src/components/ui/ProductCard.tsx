"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Heart, ShoppingCart, Trash2 } from "lucide-react";
import type { Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import Rating from "./Rating";

type ProductCardProps = {
  product: Product;
  /** Show the discount badge + strikethrough old price (Flash Sales / Best Selling). */
  showDiscount?: boolean;
  /** Hide the star rating row (used by the Wishlist items). */
  showRating?: boolean;
  /** Which top-right action icon(s) to render. */
  topAction?: "wishlist" | "trash" | "eye";
  /** "hover" slides the cart button up on hover; "static" keeps it pinned with a cart icon. */
  cartMode?: "hover" | "static";
};

function IconButton({
  children,
  onClick,
  active = false,
  label,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-primary hover:text-white ${
        active ? "bg-primary text-white" : "bg-white text-black"
      }`}
    >
      {children}
    </button>
  );
}

export default function ProductCard({
  product,
  showDiscount = true,
  showRating = true,
  topAction = "wishlist",
  cartMode = "hover",
}: ProductCardProps) {
  const {
    addToCart,
    toggleWishlist,
    removeFromWishlist,
    isInWishlist,
    user,
  } = useStore();
  const { t } = useLanguage();
  const router = useRouter();
  const wished = isInWishlist(product.id);

  // Guests must sign up before they can add to cart or wishlist.
  const handleAddToCart = () => {
    if (!user) return router.push("/signup");
    addToCart(product);
  };
  const handleWishlist = () => {
    if (!user) return router.push("/signup");
    toggleWishlist(product);
  };

  return (
    <div className="group flex flex-col gap-4">
      {/* Image area */}
      <div className="relative flex h-[250px] items-center justify-center overflow-hidden rounded bg-secondary">
        {/* Whole-image link to the detail page (sits beneath the action buttons) */}
        <Link
          href={`/product/${product.id}`}
          aria-label={product.name}
          className="absolute inset-0 z-0"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          {showDiscount && product.discount && (
            <span className="rounded bg-primary px-3 py-1 text-xs font-normal text-white">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="rounded bg-success px-3 py-1 text-xs font-normal text-white">
              NEW
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          {topAction === "trash" && (
            <IconButton
              label="Remove from wishlist"
              onClick={() => removeFromWishlist(product.id)}
            >
              <Trash2 size={18} />
            </IconButton>
          )}
          {topAction === "eye" && (
            <Link href={`/product/${product.id}`} aria-label="View product">
              <IconButton label="View product">
                <Eye size={18} />
              </IconButton>
            </Link>
          )}
          {topAction === "wishlist" && (
            <>
              <IconButton
                label="Toggle wishlist"
                active={wished}
                onClick={handleWishlist}
              >
                <Heart size={18} className={wished ? "fill-current" : ""} />
              </IconButton>
              <Link href={`/product/${product.id}`} aria-label="View product">
                <IconButton label="View product">
                  <Eye size={18} />
                </IconButton>
              </Link>
            </>
          )}
        </div>

        {/* Product photo, with emoji fallback when none is set. */}
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="270px"
            className="pointer-events-none object-contain p-6"
          />
        ) : (
          <span className="select-none text-7xl" aria-hidden>
            {product.emoji}
          </span>
        )}

        {/* Add to cart — slides up on hover, or stays pinned with a cart icon. */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-2 bg-black py-2.5 text-base font-medium text-white transition-transform duration-300 ${
            cartMode === "hover"
              ? "translate-y-full group-hover:translate-y-0"
              : "translate-y-0"
          }`}
        >
          {cartMode === "static" && <ShoppingCart size={20} />}
          {t("common.addToCart")}
        </button>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-medium text-black">
          <Link href={`/product/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-base font-medium text-primary">
            ${product.price}
          </span>
          {showDiscount && product.oldPrice && (
            <span className="text-base font-medium text-black/50 line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>
        {showRating && (
          <Rating rating={product.rating} reviews={product.reviews} />
        )}

        {product.colors && (
          <div className="mt-1 flex items-center gap-2">
            {product.colors.map((color, i) => (
              <span
                key={color}
                className={`h-5 w-5 rounded-full border ${
                  i === 0
                    ? "border-black/40 ring-2 ring-black ring-offset-1"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
