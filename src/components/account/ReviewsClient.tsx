"use client";

import Image from "next/image";
import Link from "@/components/ui/Link";
import { getProductById } from "@/lib/data";
import { useStore } from "@/lib/store";
import Rating from "@/components/ui/Rating";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ReviewsClient() {
  const { user, reviews } = useStore();

  // Reviews are attributed by display name in this demo.
  const mine = reviews.filter((r) => r.author === user?.name);

  if (mine.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 rounded bg-secondary py-20 text-center">
        <p className="text-base text-black/60">
          You haven&apos;t written any reviews yet.
        </p>
        <Link
          href="/shop"
          className="rounded bg-primary px-12 py-3 text-base font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-medium">My Reviews ({mine.length})</h2>

      <div className="flex flex-col gap-6">
        {mine.map((review) => {
          const product = getProductById(review.productId);
          return (
            <div
              key={review.id}
              className="flex gap-5 rounded border border-black/10 p-6 shadow-[0_1px_13px_rgba(0,0,0,0.04)]"
            >
              <Link
                href={`/product/${review.productId}`}
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded bg-secondary"
              >
                {product?.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                ) : (
                  <span className="text-3xl" aria-hidden>
                    {product?.emoji ?? "🛍️"}
                  </span>
                )}
              </Link>

              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Link
                    href={`/product/${review.productId}`}
                    className="text-base font-medium hover:text-primary"
                  >
                    {product?.name ?? "Product"}
                  </Link>
                  <span className="text-sm text-black/50">
                    {formatDate(review.date)}
                  </span>
                </div>
                <Rating rating={review.rating} />
                <p className="text-sm leading-6 text-black/80">{review.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
