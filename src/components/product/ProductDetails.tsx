"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Minus, Plus, RotateCcw, Truck } from "lucide-react";
import type { Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import Rating from "@/components/ui/Rating";

const defaultSizes = ["XS", "S", "M", "L", "XL"];

// CSS tints used to fake colour variants from a single product photo.
const variantFilters = [
  "none",
  "hue-rotate(320deg) saturate(1.5)",
  "hue-rotate(200deg) saturate(1.4)",
  "hue-rotate(90deg) saturate(1.3)",
];
const palette = ["#2b2b2b", "#db4444", "#2563eb", "#16a34a"];

export default function ProductDetails({ product }: { product: Product }) {
  const sizes = product.sizes ?? defaultSizes;

  // One colour variant per swatch — the product's own colours come first,
  // padded from a default palette so there are always a few to choose from.
  const variants = [...(product.colors ?? []), ...palette]
    .slice(0, 4)
    .map((swatch, i) => ({ swatch, filter: variantFilters[i] }));

  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, user } = useStore();
  const wished = isInWishlist(product.id);

  const [variant, setVariant] = useState(0);
  const [size, setSize] = useState(sizes.includes("M") ? "M" : sizes[0]);
  const [qty, setQty] = useState(2);
  const activeFilter = variants[variant]?.filter ?? "none";

  // Guests must sign up before buying or saving to wishlist.
  const buyNow = () => {
    if (!user) return router.push("/signup");
    addToCart(product, qty, size);
    router.push("/cart");
  };
  const handleWishlist = () => {
    if (!user) return router.push("/signup");
    toggleWishlist(product);
  };

  const description =
    product.description ??
    "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.";

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
      {/* Gallery */}
      <div className="flex flex-col-reverse gap-4 sm:flex-row">
        <div className="flex gap-4 sm:flex-col">
          {variants.map((v, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setVariant(i)}
              aria-label={`Colour variant ${i + 1}`}
              className={`relative flex h-[110px] w-full min-w-[120px] items-center justify-center rounded bg-secondary text-4xl transition-shadow sm:w-[170px] ${
                variant === i ? "ring-2 ring-primary" : ""
              }`}
            >
              {product.image ? (
                <Image
                  src={product.image}
                  alt={`${product.name} variant ${i + 1}`}
                  fill
                  sizes="170px"
                  className="object-contain p-4"
                  style={{ filter: v.filter }}
                />
              ) : (
                <span aria-hidden style={{ filter: v.filter }}>
                  {product.emoji}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="relative flex flex-1 items-center justify-center rounded bg-secondary p-8">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={510}
              height={330}
              className="h-[330px] w-auto max-w-[510px] object-contain transition-[filter] duration-300"
              style={{ filter: activeFilter }}
            />
          ) : (
            <span
              className="select-none text-[200px]"
              aria-hidden
              style={{ filter: activeFilter }}
            >
              {product.emoji}
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold tracking-wide">{product.name}</h1>

        <div className="flex items-center gap-4">
          <Rating rating={product.rating} reviews={product.reviews} />
          <span className="text-sm text-black/50">Reviews</span>
          <span className="text-black/30">|</span>
          <span className="text-sm text-success">
            {product.inStock === false ? "Out of Stock" : "In Stock"}
          </span>
        </div>

        <p className="text-2xl">${product.price.toFixed(2)}</p>

        <p className="text-sm leading-6">{description}</p>

        <div className="border-t border-black/30" />

        {/* Colours */}
        <div className="flex items-center gap-6">
          <span className="text-xl">Colours:</span>
          <div className="flex items-center gap-2">
            {variants.map((v, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Colour ${i + 1}`}
                onClick={() => setVariant(i)}
                className={`h-5 w-5 rounded-full ${
                  variant === i ? "ring-2 ring-black ring-offset-2" : ""
                }`}
                style={{ backgroundColor: v.swatch }}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="flex items-center gap-6">
          <span className="text-xl">Size:</span>
          <div className="flex items-center gap-4">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`flex h-8 w-8 items-center justify-center rounded text-sm font-medium transition-colors ${
                  size === s
                    ? "bg-primary text-white"
                    : "border border-black/30 text-black hover:border-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + buy */}
        <div className="flex items-center gap-4">
          <div className="flex items-stretch overflow-hidden rounded border border-black/40">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex w-10 items-center justify-center hover:bg-primary hover:text-white"
            >
              <Minus size={18} />
            </button>
            <span className="flex w-14 items-center justify-center border-x border-black/40 text-xl font-medium">
              {qty}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => q + 1)}
              className="flex w-10 items-center justify-center bg-primary text-white hover:bg-primary-hover"
            >
              <Plus size={18} />
            </button>
          </div>

          <button
            type="button"
            onClick={buyNow}
            className="rounded bg-primary px-10 py-2.5 text-base font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Buy Now
          </button>

          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={handleWishlist}
            className={`flex h-10 w-10 items-center justify-center rounded border transition-colors ${
              wished
                ? "border-primary bg-primary text-white"
                : "border-black/30 hover:bg-secondary"
            }`}
          >
            <Heart size={20} className={wished ? "fill-current" : ""} />
          </button>
        </div>

        {/* Delivery info */}
        <div className="mt-2 rounded border border-black/40">
          <div className="flex items-center gap-4 px-6 py-4">
            <Truck size={28} />
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium">Free Delivery</span>
              <a href="#" className="text-xs font-medium underline">
                Enter your postal code for Delivery Availability
              </a>
            </div>
          </div>
          <div className="border-t border-black/40" />
          <div className="flex items-center gap-4 px-6 py-4">
            <RotateCcw size={28} />
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium">Return Delivery</span>
              <span className="text-xs font-medium">
                Free 30 Days Delivery Returns.{" "}
                <a href="#" className="underline">
                  Details
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
