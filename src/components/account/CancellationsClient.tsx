"use client";

import Image from "next/image";
import Link from "@/components/ui/Link";
import type { OrderItem } from "@/lib/store";
import { useStore } from "@/lib/store";
import { getProductById } from "@/lib/data";

/** Item thumbnail — uses the stored photo, falling back to a product lookup. */
function ItemThumb({ item }: { item: OrderItem }) {
  const image = item.image ?? getProductById(item.id)?.image;
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded bg-secondary">
      {image ? (
        <Image
          src={image}
          alt={item.name}
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      ) : (
        <span className="text-2xl" aria-hidden>
          {item.emoji}
        </span>
      )}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function CancellationsClient() {
  const { orders } = useStore();
  const cancelled = orders.filter((o) => o.status === "Cancelled");

  if (cancelled.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 rounded bg-secondary py-20 text-center">
        <p className="text-base text-black/60">You have no cancelled orders.</p>
        <Link
          href="/account/orders"
          className="rounded bg-primary px-12 py-3 text-base font-medium text-white transition-colors hover:bg-primary-hover"
        >
          View My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-medium">My Cancellations ({cancelled.length})</h2>
      {cancelled.map((order) => (
        <div
          key={order.id}
          className="rounded border border-black/10 p-6 shadow-[0_1px_13px_rgba(0,0,0,0.04)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
            <div>
              <p className="text-base font-medium">Order {order.id}</p>
              <p className="text-sm text-black/50">
                Placed on {formatDate(order.date)}
              </p>
            </div>
            <span className="rounded-full bg-primary/15 px-4 py-1 text-sm font-medium text-primary">
              {order.status}
            </span>
          </div>

          <div className="flex flex-col gap-3 py-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-3">
                  <ItemThumb item={item} />
                  {item.name} <span className="text-black/50">× {item.qty}</span>
                </span>
                <span>${item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <p className="border-t border-black/10 pt-4 text-base font-medium">
            Total: <span className="text-primary">${order.total}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
