"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import type { Order } from "@/lib/store";
import { useStore } from "@/lib/store";

const trackingStages = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];
// How far along a "Processing" order is shown to be.
const currentStage = 2;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Tracking() {
  return (
    <div className="mt-2">
      <div className="flex items-center">
        {trackingStages.map((stage, i) => {
          const done = i < currentStage;
          const current = i === currentStage;
          return (
            <div key={stage} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                    done
                      ? "bg-success text-white"
                      : current
                        ? "border-2 border-primary bg-white text-primary"
                        : "border border-black/20 bg-white text-black/30"
                  }`}
                >
                  {done ? <Check size={14} strokeWidth={3} /> : i + 1}
                </span>
              </div>
              {i < trackingStages.length - 1 && (
                <span
                  className={`h-0.5 flex-1 ${
                    done ? "bg-success" : "bg-black/15"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-black/60">
        {trackingStages.map((stage) => (
          <span key={stage} className="flex-1 text-center first:text-left last:text-right">
            {stage}
          </span>
        ))}
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const { cancelOrder } = useStore();

  return (
    <div className="rounded border border-black/10 p-6 shadow-[0_1px_13px_rgba(0,0,0,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
        <div>
          <p className="text-base font-medium">Order {order.id}</p>
          <p className="text-sm text-black/50">Placed on {formatDate(order.date)}</p>
        </div>
        <span className="rounded-full bg-success/15 px-4 py-1 text-sm font-medium text-success">
          {order.status}
        </span>
      </div>

      <div className="flex flex-col gap-3 py-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden>
                {item.emoji}
              </span>
              {item.name} <span className="text-black/50">× {item.qty}</span>
            </span>
            <span>${item.price * item.qty}</span>
          </div>
        ))}
      </div>

      <Tracking />

      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
        <p className="text-base font-medium">
          Total: <span className="text-primary">${order.total}</span>
        </p>
        <button
          type="button"
          onClick={() => cancelOrder(order.id)}
          className="rounded border border-black/30 px-6 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
}

export default function OrdersClient() {
  const { orders } = useStore();
  const active = orders.filter((o) => o.status === "Processing");

  if (active.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 rounded bg-secondary py-20 text-center">
        <p className="text-base text-black/60">You have no active orders yet.</p>
        <Link
          href="/shop"
          className="rounded bg-primary px-12 py-3 text-base font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-medium">My Orders ({active.length})</h2>
      {active.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
