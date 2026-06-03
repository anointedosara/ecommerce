"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/ui/Link";
import { useRouter } from "next/navigation";
import {
  CircleX,
  LogOut,
  ShoppingBag,
  Star,
  User,
  type LucideIcon,
} from "lucide-react";
import { useStore } from "@/lib/store";

const items: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "Manage My Account", href: "/account", Icon: User },
  { label: "My Order", href: "/account/orders", Icon: ShoppingBag },
  { label: "My Cancellations", href: "/account/cancellations", Icon: CircleX },
  { label: "My Reviews", href: "/account/reviews", Icon: Star },
];

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logOut } = useStore();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
          open ? "bg-primary text-white" : "bg-primary/90 text-white hover:bg-primary"
        }`}
      >
        <User size={20} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-12 z-50 w-[224px] overflow-hidden rounded-md border border-white/10 bg-gradient-to-br from-[#5a3d7a]/80 via-[#3f3257]/70 to-[#2a2438]/80 py-2 shadow-xl backdrop-blur-md"
        >
          {items.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10"
            >
              <Icon size={20} className="shrink-0" />
              {label}
            </Link>
          ))}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              logOut();
              router.push("/");
            }}
            className="flex w-full items-center gap-4 px-4 py-2.5 text-left text-sm text-white/90 transition-colors hover:bg-white/10"
          >
            <LogOut size={20} className="shrink-0" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
