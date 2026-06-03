"use client";

import AccountShell from "@/components/account/AccountShell";
import EditProfileForm from "@/components/account/EditProfileForm";

export default function AccountClient() {
  return (
    <AccountShell active="My Profile" crumb="My Account">
      <EditProfileForm />
    </AccountShell>
  );
}
