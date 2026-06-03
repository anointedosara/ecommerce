"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, CircleCheck } from "lucide-react";
import { useStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";

type FieldKey =
  | "firstName"
  | "company"
  | "street"
  | "apartment"
  | "city"
  | "phone"
  | "email";

type BillingField = {
  key: FieldKey;
  labelKey: string;
  required?: boolean;
  type?: string;
};

const fields: BillingField[] = [
  { key: "firstName", labelKey: "checkout.firstName", required: true },
  { key: "company", labelKey: "checkout.company" },
  { key: "street", labelKey: "checkout.street", required: true },
  { key: "apartment", labelKey: "checkout.apartment" },
  { key: "city", labelKey: "checkout.city", required: true },
  { key: "phone", labelKey: "checkout.phone", required: true, type: "tel" },
  { key: "email", labelKey: "checkout.email", required: true, type: "email" },
];

/** Demo coupons recognised by Apply Coupon. */
const coupons: Record<string, number> = {
  EXCLUSIVE10: 0.1,
  SUMMER50: 0.5,
};

const emptyValues: Record<FieldKey, string> = {
  firstName: "",
  company: "",
  street: "",
  apartment: "",
  city: "",
  phone: "",
  email: "",
};

/** Small stylised stand-ins for the accepted card networks. */
function PaymentLogos() {
  return (
    <div className="flex items-center gap-2">
      <span className="rounded bg-[#e2136e] px-1.5 py-0.5 text-[10px] font-bold italic text-white">
        bKash
      </span>
      <span className="text-sm font-bold italic text-[#1a1f71]">VISA</span>
      <span className="flex items-center">
        <span className="h-4 w-4 rounded-full bg-[#eb001b]" />
        <span className="-ml-2 h-4 w-4 rounded-full bg-[#f79e1b]/90" />
      </span>
      <span className="rounded bg-[#f60] px-1.5 py-0.5 text-[10px] font-bold italic text-white">
        Nagad
      </span>
    </div>
  );
}

function Radio({ selected }: { selected: boolean }) {
  return (
    <span
      className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border ${
        selected ? "border-black" : "border-black/50"
      }`}
    >
      {selected && <span className="h-3 w-3 rounded-full bg-black" />}
    </span>
  );
}

function OrderConfirmation({ total }: { total: number }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center gap-6 rounded border border-black/10 px-6 py-20 text-center shadow-[0_1px_13px_rgba(0,0,0,0.05)]">
      <CircleCheck size={72} className="text-success" />
      <h1 className="text-3xl font-medium tracking-wide">
        {t("checkout.orderPlaced")}
      </h1>
      <p className="max-w-md text-base text-black/60">
        {t("checkout.thankYou")}{" "}
        <span className="font-medium text-primary">${total}</span>.
      </p>
      <Link
        href="/"
        className="mt-2 rounded bg-primary px-12 py-4 text-base font-medium text-white transition-colors hover:bg-primary-hover"
      >
        {t("common.continueShopping")}
      </Link>
    </div>
  );
}

export default function CheckoutClient() {
  const { cart, subtotal, placeOrder: createOrder, addresses } = useStore();
  const { t } = useLanguage();

  const [payment, setPayment] = useState<"bank" | "cash">("cash");
  const [saveInfo, setSaveInfo] = useState(true);
  const [values, setValues] = useState<Record<FieldKey, string>>(emptyValues);
  const prefilled = useRef(false);

  // Auto-fill billing details from the most recently saved address.
  useEffect(() => {
    if (prefilled.current || addresses.length === 0) return;
    const latest = addresses[addresses.length - 1];
    setValues((v) => ({
      ...v,
      firstName: v.firstName || latest.name,
      street: v.street || latest.street,
      city: v.city || latest.city,
      phone: v.phone || latest.phone,
      email: v.email || latest.email,
    }));
    prefilled.current = true;
  }, [addresses]);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [placed, setPlaced] = useState(false);
  const [placedTotal, setPlacedTotal] = useState(0);

  // Coupon
  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [discountRate, setDiscountRate] = useState(0);

  const discount = Math.round(subtotal * discountRate);
  const total = subtotal - discount;

  const update = (key: FieldKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (coupons[code]) {
      setDiscountRate(coupons[code]);
      setCouponMessage(`Coupon applied — ${coupons[code] * 100}% off!`);
    } else {
      setDiscountRate(0);
      setCouponMessage("Invalid coupon code.");
    }
  };

  const placeOrder = () => {
    const nextErrors: Partial<Record<FieldKey, boolean>> = {};
    for (const field of fields) {
      if (field.required && !values[field.key].trim()) {
        nextErrors[field.key] = true;
      }
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    createOrder({
      items: cart.map((l) => ({
        id: l.product.id,
        name: l.product.name,
        emoji: l.product.emoji,
        price: l.product.price,
        qty: l.qty,
      })),
      total,
      address: {
        name: [values.firstName, values.company].filter(Boolean).join(", "),
        street: [values.street, values.apartment].filter(Boolean).join(", "),
        city: values.city,
        phone: values.phone,
        email: values.email,
      },
      payment: payment === "bank" ? "Bank" : "Cash on delivery",
    });

    setPlacedTotal(total);
    setPlaced(true);
  };

  if (placed) return <OrderConfirmation total={placedTotal} />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        placeOrder();
      }}
      noValidate
      className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-24"
    >
      {/* Billing details */}
      <div>
        <h1 className="text-3xl font-medium tracking-wide sm:text-4xl">
          {t("checkout.billing")}
        </h1>

        <div className="mt-12 flex max-w-[470px] flex-col gap-8">
          {fields.map((field) => (
            <label key={field.key} className="flex flex-col gap-2">
              <span className="text-base text-black/40">
                {t(field.labelKey)}
                {field.required && <span className="text-primary"> *</span>}
              </span>
              <input
                type={field.type ?? "text"}
                value={values[field.key]}
                onChange={update(field.key)}
                className={`h-[50px] rounded bg-secondary px-4 focus:outline-none ${
                  errors[field.key] ? "ring-1 ring-primary" : ""
                }`}
              />
              {errors[field.key] && (
                <span className="text-sm text-primary">
                  {t(field.labelKey)} *
                </span>
              )}
            </label>
          ))}

          <label className="mt-2 flex cursor-pointer items-center gap-4">
            <button
              type="button"
              role="checkbox"
              aria-checked={saveInfo}
              onClick={() => setSaveInfo((v) => !v)}
              className={`flex h-6 w-6 items-center justify-center rounded ${
                saveInfo ? "bg-primary text-white" : "border border-black/40"
              }`}
            >
              {saveInfo && <Check size={16} strokeWidth={3} />}
            </button>
            <span className="text-base">{t("checkout.saveInfo")}</span>
          </label>
        </div>
      </div>

      {/* Order summary */}
      <div className="lg:pt-24">
        <div className="flex flex-col gap-8">
          {cart.map((line) => (
            <div
              key={line.product.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <span className="select-none text-3xl" aria-hidden>
                  {line.product.emoji}
                </span>
                <span className="text-base">
                  {line.product.name}
                  {line.qty > 1 && (
                    <span className="text-black/50"> × {line.qty}</span>
                  )}
                </span>
              </div>
              <span className="text-base">${line.product.price * line.qty}</span>
            </div>
          ))}
        </div>

        <dl className="mt-8 flex flex-col text-base">
          <div className="flex justify-between border-b border-black/40 pb-4">
            <dt>{t("checkout.subtotal")}</dt>
            <dd>${subtotal}</dd>
          </div>
          {discount > 0 && (
            <div className="flex justify-between border-b border-black/40 py-4 text-primary">
              <dt>{t("checkout.discount")}</dt>
              <dd>-${discount}</dd>
            </div>
          )}
          <div className="flex justify-between border-b border-black/40 py-4">
            <dt>{t("checkout.shipping")}</dt>
            <dd>{t("cart.free")}</dd>
          </div>
          <div className="flex justify-between pt-4">
            <dt>{t("checkout.total")}</dt>
            <dd>${total}</dd>
          </div>
        </dl>

        {/* Payment methods */}
        <div className="mt-8 flex flex-col gap-6">
          <button
            type="button"
            onClick={() => setPayment("bank")}
            className="flex items-center justify-between"
          >
            <span className="flex items-center gap-4">
              <Radio selected={payment === "bank"} />
              <span className="text-base">{t("checkout.bank")}</span>
            </span>
            <PaymentLogos />
          </button>
          <button
            type="button"
            onClick={() => setPayment("cash")}
            className="flex items-center gap-4"
          >
            <Radio selected={payment === "cash"} />
            <span className="text-base">{t("checkout.cash")}</span>
          </button>
        </div>

        {/* Coupon */}
        <div className="mt-8 flex flex-col gap-2">
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              placeholder={t("cart.couponCode")}
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              className="h-[50px] w-full rounded border border-black/40 px-6 placeholder:text-black/70 focus:outline-none sm:w-[300px]"
            />
            <button
              type="button"
              onClick={applyCoupon}
              className="h-[50px] rounded bg-primary px-10 text-base font-medium text-white transition-colors hover:bg-primary-hover"
            >
              {t("cart.applyCoupon")}
            </button>
          </div>
          {couponMessage && (
            <span
              className={`text-sm ${
                discountRate > 0 ? "text-success" : "text-primary"
              }`}
            >
              {couponMessage}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="mt-8 rounded bg-primary px-12 py-4 text-base font-medium text-white transition-colors hover:bg-primary-hover"
        >
          {t("checkout.placeOrder")}
        </button>
      </div>
    </form>
  );
}
