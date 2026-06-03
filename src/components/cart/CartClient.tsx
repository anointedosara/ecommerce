"use client";

import Link from "next/link";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";

const pad = (n: number) => String(n).padStart(2, "0");

const outlineButton =
  "rounded border border-black/40 px-8 py-3.5 text-base font-medium text-black transition-colors hover:bg-secondary";

function QuantityStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="flex h-11 w-[72px] items-center justify-between rounded border border-black/40 px-3">
      <span className="text-base font-medium">{pad(value)}</span>
      <div className="flex flex-col">
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => onChange(value + 1)}
          className="text-black/70 hover:text-black"
        >
          <ChevronUp size={16} />
        </button>
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => onChange(Math.max(1, value - 1))}
          className="text-black/70 hover:text-black"
        >
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}

export default function CartClient() {
  const { cart, setQty, removeFromCart, subtotal, notify } = useStore();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-10">
      {/* Table */}
      <div className="flex flex-col gap-10">
        {/* Header row */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center rounded bg-white px-10 py-6 text-base shadow-[0_1px_13px_rgba(0,0,0,0.05)]">
          <span>{t("cart.product")}</span>
          <span>{t("cart.price")}</span>
          <span>{t("cart.quantity")}</span>
          <span className="text-right">{t("cart.subtotal")}</span>
        </div>

        {/* Item rows */}
        {cart.map((line) => (
          <div
            key={line.product.id}
            className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center rounded bg-white px-10 py-6 text-base shadow-[0_1px_13px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center gap-5">
              <div className="relative">
                <Link
                  href={`/product/${line.product.id}`}
                  className="select-none text-3xl"
                  aria-hidden
                >
                  {line.product.emoji}
                </Link>
                <button
                  type="button"
                  aria-label={`Remove ${line.product.name}`}
                  onClick={() => removeFromCart(line.product.id)}
                  className="absolute -left-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white"
                >
                  <X size={11} strokeWidth={3} />
                </button>
              </div>
              <Link
                href={`/product/${line.product.id}`}
                className="hover:text-primary"
              >
                {line.product.name}
              </Link>
            </div>
            <span>${line.product.price}</span>
            <QuantityStepper
              value={line.qty}
              onChange={(qty) => setQty(line.product.id, qty)}
            />
            <span className="text-right">${line.product.price * line.qty}</span>
          </div>
        ))}

        {cart.length === 0 && (
          <div className="flex flex-col items-center gap-6 rounded bg-white px-10 py-16 text-center shadow-[0_1px_13px_rgba(0,0,0,0.05)]">
            <p className="text-base text-black/60">{t("cart.empty")}</p>
            <Link
              href="/shop"
              className="rounded bg-primary px-12 py-3 text-base font-medium text-white transition-colors hover:bg-primary-hover"
            >
              {t("common.continueShopping")}
            </Link>
          </div>
        )}
      </div>

      {/* Return / Update */}
      <div className="flex items-center justify-between">
        <Link href="/shop" className={outlineButton}>
          {t("cart.returnToShop")}
        </Link>
        <button
          type="button"
          onClick={() => notify(t("cart.updateCart"))}
          className={outlineButton}
        >
          {t("cart.updateCart")}
        </button>
      </div>

      {/* Coupon + totals */}
      <div className="mt-6 flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex h-fit flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder={t("cart.couponCode")}
            className="w-full rounded border border-black/50 px-6 py-3.5 text-base placeholder:text-black/70 focus:outline-none sm:w-[300px]"
          />
          <button
            type="button"
            onClick={() => notify(t("cart.applyCoupon"))}
            className="rounded bg-primary px-12 py-3.5 text-base font-medium text-white transition-colors hover:bg-primary-hover"
          >
            {t("cart.applyCoupon")}
          </button>
        </div>

        <div className="w-full rounded border-[1.5px] border-black px-8 py-8 lg:w-[470px]">
          <h2 className="text-xl font-medium">{t("cart.cartTotal")}</h2>
          <dl className="mt-6 flex flex-col text-base">
            <div className="flex justify-between border-b border-black/30 pb-4">
              <dt>{t("cart.subtotal")}:</dt>
              <dd>${subtotal}</dd>
            </div>
            <div className="flex justify-between border-b border-black/30 py-4">
              <dt>{t("cart.shipping")}:</dt>
              <dd>{t("cart.free")}</dd>
            </div>
            <div className="flex justify-between pt-4">
              <dt>{t("cart.total")}:</dt>
              <dd>${subtotal}</dd>
            </div>
          </dl>
          <div className="mt-6 flex justify-center">
            <Link
              href="/checkout"
              className={`rounded px-12 py-4 text-base font-medium text-white transition-colors ${
                cart.length === 0
                  ? "pointer-events-none bg-primary/50"
                  : "bg-primary hover:bg-primary-hover"
              }`}
            >
              {t("cart.checkout")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
