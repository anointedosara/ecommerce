"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const inputClass =
  "h-[50px] rounded bg-secondary px-4 text-base text-black/70 placeholder:text-black/40 focus:outline-none";

export default function EditProfileForm() {
  const { user, updateProfile } = useStore();

  const [firstName, ...rest] = (user?.name ?? "").split(" ");
  const initial: Values = {
    firstName,
    lastName: rest.join(" "),
    email: user?.email ?? "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [values, setValues] = useState<Values>(initial);

  const update =
    (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${values.firstName} ${values.lastName}`.trim();
    updateProfile(fullName, values.email);
  };

  return (
    <form
      onSubmit={handleSave}
      className="rounded bg-white px-6 py-8 shadow-[0_1px_13px_rgba(0,0,0,0.05)] sm:px-20 sm:py-10"
    >
      <h2 className="text-xl font-medium text-primary">Edit Your Profile</h2>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-base">First Name</span>
          <input
            className={inputClass}
            value={values.firstName}
            onChange={update("firstName")}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-base">Last Name</span>
          <input
            className={inputClass}
            value={values.lastName}
            onChange={update("lastName")}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-base">Email</span>
          <input
            type="email"
            className={inputClass}
            value={values.email}
            onChange={update("email")}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-base">Address</span>
          <input
            className={inputClass}
            value={values.address}
            onChange={update("address")}
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <span className="text-base">Password Changes</span>
        <div className="flex flex-col gap-6">
          <input
            type="password"
            placeholder="Current Passwod"
            className={inputClass}
            value={values.currentPassword}
            onChange={update("currentPassword")}
          />
          <input
            type="password"
            placeholder="New Passwod"
            className={inputClass}
            value={values.newPassword}
            onChange={update("newPassword")}
          />
          <input
            type="password"
            placeholder="Confirm New Passwod"
            className={inputClass}
            value={values.confirmPassword}
            onChange={update("confirmPassword")}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-8">
        <button
          type="button"
          onClick={() => setValues(initial)}
          className="text-base text-black"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded bg-primary px-12 py-4 text-base font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
