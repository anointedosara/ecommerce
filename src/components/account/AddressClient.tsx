"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Billing } from "@/lib/store";
import { useStore } from "@/lib/store";

type Draft = Billing;

const empty: Draft = { name: "", street: "", city: "", phone: "", email: "" };

const inputClass =
  "h-[50px] rounded bg-secondary px-4 text-base placeholder:text-black/40 focus:outline-none";

function AddressForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Draft;
  onSave: (draft: Draft) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<Draft>(initial);
  const set =
    (key: keyof Draft) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setDraft((d) => ({ ...d, [key]: e.target.value }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!draft.street.trim()) return;
        onSave(draft);
      }}
      className="flex flex-col gap-4 rounded border border-black/10 p-6 shadow-[0_1px_13px_rgba(0,0,0,0.04)]"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input className={inputClass} placeholder="Full name" value={draft.name} onChange={set("name")} />
        <input className={inputClass} placeholder="Phone number" value={draft.phone} onChange={set("phone")} />
        <input className={inputClass} placeholder="Street address" value={draft.street} onChange={set("street")} />
        <input className={inputClass} placeholder="Town / City" value={draft.city} onChange={set("city")} />
        <input className={inputClass} placeholder="Email" value={draft.email} onChange={set("email")} />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="rounded bg-primary px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Save Address
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded border border-black/30 px-8 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AddressClient() {
  const { addresses, addAddress, updateAddress, removeAddress } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Address Book ({addresses.length})</h2>
        {!adding && (
          <button
            type="button"
            onClick={() => {
              setAdding(true);
              setEditingId(null);
            }}
            className="flex items-center gap-2 rounded bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            <Plus size={18} /> Add Address
          </button>
        )}
      </div>

      {adding && (
        <AddressForm
          initial={empty}
          onSave={(draft) => {
            addAddress(draft);
            setAdding(false);
          }}
          onCancel={() => setAdding(false)}
        />
      )}

      {addresses.length === 0 && !adding ? (
        <div className="rounded bg-secondary py-16 text-center text-base text-black/60">
          No saved addresses yet. Addresses from your orders appear here.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {addresses.map((address) =>
            editingId === address.id ? (
              <AddressForm
                key={address.id}
                initial={address}
                onSave={(draft) => {
                  updateAddress(address.id, draft);
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div
                key={address.id}
                className="flex flex-col gap-1 rounded border border-black/10 p-6 text-sm shadow-[0_1px_13px_rgba(0,0,0,0.04)]"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-base font-medium">
                    {address.name || "Address"}
                  </p>
                  <div className="flex gap-3 text-black/50">
                    <button
                      type="button"
                      aria-label="Edit address"
                      onClick={() => {
                        setEditingId(address.id);
                        setAdding(false);
                      }}
                      className="hover:text-primary"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Delete address"
                      onClick={() => removeAddress(address.id)}
                      className="hover:text-primary"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p>{address.street}</p>
                <p>{address.city}</p>
                {address.phone && <p>{address.phone}</p>}
                {address.email && <p className="text-black/50">{address.email}</p>}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
