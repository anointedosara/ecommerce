import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "404 Not Found — Exclusive",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1170px] flex-1 px-4 py-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/" className="text-black/50 hover:text-black">
            Home
          </Link>
          <span className="text-black/50">/</span>
          <span className="text-black">404 Error</span>
        </nav>

        <div className="flex flex-col items-center gap-10 py-20 text-center sm:py-32">
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-6xl font-medium tracking-tight sm:text-[110px] sm:leading-none">
              404 Not Found
            </h1>
            <p className="text-base text-black">
              Your visited page not found. You may go home page.
            </p>
          </div>

          <Link
            href="/"
            className="rounded bg-primary px-12 py-4 text-base font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Back to home page
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
