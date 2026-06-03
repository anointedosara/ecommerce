"use client";

import { useRef } from "react";
import CarouselArrows from "@/components/ui/CarouselArrows";
import { SocialLinks } from "@/components/ui/SocialLinks";

const team = [
  { name: "Tom Cruise", role: "Founder & Chairman", emoji: "🧑‍💼" },
  { name: "Emma Watson", role: "Managing Director", emoji: "👩‍💼" },
  { name: "Will Smith", role: "Product Designer", emoji: "👨‍💼" },
  { name: "Sophia Chen", role: "Head of Marketing", emoji: "👩‍💻" },
  { name: "James Carter", role: "Lead Engineer", emoji: "👨‍🔧" },
  { name: "Olivia Brown", role: "UX Researcher", emoji: "👩‍🎨" },
  { name: "Daniel Kim", role: "Operations Manager", emoji: "🧑‍✈️" },
];

export default function TeamCarousel() {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    rowRef.current?.scrollBy({ left: direction * 400, behavior: "smooth" });
  };

  return (
    <section className="mt-28">
      <div className="mb-8 flex justify-end">
        <CarouselArrows onPrev={() => scroll(-1)} onNext={() => scroll(1)} />
      </div>

      <div
        ref={rowRef}
        className="no-scrollbar flex gap-8 overflow-x-auto scroll-smooth pb-2"
      >
        {team.map((member) => (
          <div
            key={member.name}
            className="flex w-[280px] shrink-0 flex-col gap-6"
          >
            <div className="flex h-[340px] items-end justify-center overflow-hidden rounded bg-secondary">
              <span className="select-none text-[180px]" aria-hidden>
                {member.emoji}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-3xl font-medium">{member.name}</h3>
              <p className="text-base">{member.role}</p>
              <SocialLinks
                size={20}
                gap="gap-4"
                className="mt-2 text-black"
                only={["Twitter", "Instagram", "LinkedIn"]}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
