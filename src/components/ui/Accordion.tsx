"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type AccordionItem = {
  q: string;
  a: string;
};

function Item({
  item,
  open,
  onToggle,
}: {
  item: AccordionItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-black/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-medium transition-colors ${
          open ? "text-primary" : "text-black hover:text-primary"
        }`}
      >
        <span>{item.q}</span>
        <ChevronDown
          size={22}
          className={`shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-primary" : "text-black/60"
          }`}
        />
      </button>

      {/* Animated height: grid-rows 0fr -> 1fr transitions smoothly to content height. */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-base leading-7 text-black/70">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <Item
          key={item.q}
          item={item}
          open={openIndex === i}
          onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
        />
      ))}
    </div>
  );
}
