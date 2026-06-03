import Link from "next/link";
import Countdown from "@/components/ui/Countdown";

export default function MusicBanner() {
  return (
    <section className="mx-auto max-w-[1170px] px-4 pt-16">
      <div className="relative flex flex-col items-start gap-8 overflow-hidden rounded bg-black px-8 py-12 text-white sm:px-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="z-10 flex max-w-md flex-col gap-8">
          <span className="text-base font-semibold text-success">Categories</span>
          <h2 className="text-3xl font-semibold leading-tight tracking-wide sm:text-5xl sm:leading-[1.2]">
            Enhance Your Music Experience
          </h2>
          <Countdown days={5} hours={23} variant="circles" />
          <Link
            href="/shop"
            className="w-fit rounded bg-success px-12 py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            Buy Now!
          </Link>
        </div>

        {/* Product visual placeholder with radial glow */}
        <div className="relative flex w-full items-center justify-center lg:w-auto">
          <div className="absolute h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <span className="z-10 select-none text-[160px]" aria-hidden>
            🔊
          </span>
        </div>
      </div>
    </section>
  );
}
