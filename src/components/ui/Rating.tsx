import { Star } from "lucide-react";

type RatingProps = {
  rating: number;
  reviews?: number;
};

export default function Rating({ rating, reviews }: RatingProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              size={16}
              className={
                filled ? "fill-[#ffad33] text-[#ffad33]" : "fill-[#d1d5db] text-[#d1d5db]"
              }
            />
          );
        })}
      </div>
      {reviews !== undefined && (
        <span className="text-sm font-semibold text-black/50">({reviews})</span>
      )}
    </div>
  );
}
