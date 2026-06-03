"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Minus, Plus, RotateCcw, Truck } from "lucide-react";
import type { Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import Rating from "@/components/ui/Rating";

const defaultColors = ["#a0bce0", "#db4444"];
const defaultSizes = ["XS", "S", "M", "L", "XL"];

export default function ProductDetails({ product }: { product: Product }) {
  const colors = product.colors ?? defaultColors;
  const sizes = product.sizes ?? defaultSizes;

  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, user } = useStore();
  const wished = isInWishlist(product.id);

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(sizes.includes("M") ? "M" : sizes[0]);
  const [qty, setQty] = useState(2);

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
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveImage(i)}
              aria-label={`View image ${i + 1}`}
              className={`flex h-[110px] w-full min-w-[120px] items-center justify-center rounded bg-secondary text-4xl transition-shadow sm:w-[170px] ${
                activeImage === i ? "ring-2 ring-primary" : ""
              }`}
            >
              <span aria-hidden>{product.emoji}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-center rounded bg-secondary py-16">
          <span className="select-none text-[160px]" aria-hidden>
            {product.emoji}
          </span>
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
            {colors.map((c, i) => (
              <button
                key={c}
                type="button"
                aria-label={`Colour ${i + 1}`}
                onClick={() => setColor(i)}
                className={`h-5 w-5 rounded-full ${
                  color === i ? "ring-2 ring-black ring-offset-2" : ""
                }`}
                style={{ backgroundColor: c }}
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
