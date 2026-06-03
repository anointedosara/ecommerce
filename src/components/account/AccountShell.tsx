"use client";

import Link from "@/components/ui/Link";
import AccountSidebar from "@/components/account/AccountSidebar";
import { useStore } from "@/lib/store";

type AccountShellProps = {
  /** Sidebar link label to highlight. */
  active: string;
  /** Last breadcrumb segment, e.g. "My Account", "My Orders". */
  crumb: string;
  children: React.ReactNode;
};

export default function AccountShell({
  active,
  crumb,
  children,
}: AccountShellProps) {
  const { user } = useStore();

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-6 rounded bg-secondary py-24 text-center">
        <h1 className="text-2xl font-medium">You are not logged in</h1>
        <p className="text-base text-black/60">
          Please log in or create an account to manage your profile.
        </p>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="rounded bg-primary px-10 py-3 text-base font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="rounded border border-black/30 px-10 py-3 text-base font-medium text-black transition-colors hover:bg-white"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/" className="text-black/50 hover:text-black">
            Home
          </Link>
          <span className="text-black/50">/</span>
          <span className="text-black">{crumb}</span>
        </nav>
        <p className="text-base">
          Welcome! <span className="text-primary">{user.name}</span>
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-[230px_1fr] lg:gap-20">
        <AccountSidebar active={active} />
        <div>{children}</div>
      </div>
    </>
  );
}
