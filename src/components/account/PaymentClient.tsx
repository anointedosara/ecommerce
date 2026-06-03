"use client";

import { useState } from "react";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";

const presets = ["Bank", "Cash on delivery", "Visa", "Mastercard", "bKash", "Nagad"];

export default function PaymentClient() {
  const { paymentMethods, addPayment, removePayment } = useStore();
  const [custom, setCustom] = useState("");

  const available = presets.filter((p) => !paymentMethods.includes(p));

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-medium">
        My Payment Options ({paymentMethods.length})
      </h2>

      {paymentMethods.length === 0 ? (
        <div className="rounded bg-secondary py-16 text-center text-base text-black/60">
          No payment methods yet. Methods you use at checkout appear here.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {paymentMethods.map((method) => (
            <div
              key={method}
              className="flex items-center justify-between rounded border border-black/10 px-6 py-4 shadow-[0_1px_13px_rgba(0,0,0,0.04)]"
            >
              <span className="flex items-center gap-3 text-base">
                <CreditCard size={20} className="text-black/60" />
                {method}
              </span>
              <button
                type="button"
                aria-label={`Remove ${method}`}
                onClick={() => removePayment(method)}
                className="text-black/50 hover:text-primary"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add a method */}
      <div className="flex flex-col gap-4 rounded border border-black/10 p-6 shadow-[0_1px_13px_rgba(0,0,0,0.04)]">
        <p className="text-base font-medium">Add a payment method</p>

        {available.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {available.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => addPayment(p)}
                className="flex items-center gap-2 rounded border border-black/30 px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                <Plus size={16} /> {p}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addPayment(custom);
            setCustom("");
          }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <input
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Other (e.g. PayPal)"
            className="h-[50px] flex-1 rounded bg-secondary px-4 text-base placeholder:text-black/40 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded bg-primary px-10 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Add Method
          </button>
        </form>
      </div>
    </div>
  );
}
