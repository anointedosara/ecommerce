"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useStore } from "@/lib/store";
import Rating from "@/components/ui/Rating";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
        >
          <Star
            size={24}
            className={
              n <= (hover || value)
                ? "fill-[#ffad33] text-[#ffad33]"
                : "fill-[#d1d5db] text-[#d1d5db]"
            }
          />
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews({ productId }: { productId: string }) {
  const { user, getReviews, addReview } = useStore();
  const reviews = getReviews(productId);

  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = addReview(productId, rating, text, name);
    if (result.ok) {
      setText("");
      setName("");
      setRating(5);
      setError(null);
    } else {
      setError(result.error ?? "Could not submit review.");
    }
  };

  return (
    <section className="mt-24">
      <div className="flex items-center gap-4">
        <span className="h-8 w-4 rounded bg-primary" />
        <h2 className="text-2xl font-semibold">Reviews ({reviews.length})</h2>
        {reviews.length > 0 && (
          <span className="flex items-center gap-2 text-sm text-black/60">
            <Rating rating={Math.round(average)} /> {average.toFixed(1)} out of 5
          </span>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
        {/* Reviews list */}
        <div className="flex flex-col gap-6">
          {reviews.length === 0 ? (
            <p className="text-base text-black/50">
              No reviews yet. Be the first to review this product.
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col gap-2 border-b border-black/10 pb-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-medium">
                    {review.author.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm text-black/50">
                    {formatDate(review.date)}
                  </span>
                </div>
                <p className="text-base font-medium">{review.author}</p>
                <Rating rating={review.rating} />
                <p className="text-sm leading-6 text-black/80">{review.text}</p>
              </div>
            ))
          )}
        </div>

        {/* Write a review */}
        <div className="h-fit rounded border border-black/10 p-6 shadow-[0_1px_13px_rgba(0,0,0,0.04)]">
          <h3 className="text-lg font-medium">Write a Review</h3>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm">Your rating</span>
              <StarPicker value={rating} onChange={setRating} />
            </div>
            {!user && (
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Your name"
                className="rounded bg-secondary px-4 py-3 text-sm placeholder:text-black/40 focus:outline-none"
              />
            )}
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Share your thoughts about this product…"
              className="min-h-[120px] resize-none rounded bg-secondary px-4 py-3 text-sm placeholder:text-black/40 focus:outline-none"
            />
            {error && <p className="text-sm text-primary">{error}</p>}
            <button
              type="submit"
              className="rounded bg-primary px-8 py-3 text-base font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Submit Review
            </button>
          </form>
          {user && (
            <p className="mt-3 text-xs text-black/50">
              Posting as <span className="font-medium">{user.name}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
