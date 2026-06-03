import { ArrowLeft, ArrowRight } from "lucide-react";

type CarouselArrowsProps = {
  onPrev?: () => void;
  onNext?: () => void;
};

/** The paired left/right circular arrows shown in several section headers. */
export default function CarouselArrows({ onPrev, onNext }: CarouselArrowsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Previous"
        onClick={onPrev}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-black transition-colors hover:bg-zinc-200"
      >
        <ArrowLeft size={22} />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={onNext}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-black transition-colors hover:bg-zinc-200"
      >
        <ArrowRight size={22} />
      </button>
    </div>
  );
}
