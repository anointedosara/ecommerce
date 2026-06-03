import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/** Lightweight content scaffold for the legal / informational footer pages. */
export default function InfoPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[800px] flex-1 px-4 py-20">
        <nav className="mb-12 flex items-center gap-3 text-sm">
          <Link href="/" className="text-black/50 hover:text-black">
            Home
          </Link>
          <span className="text-black/50">/</span>
          <span className="text-black">{title}</span>
        </nav>
        <h1 className="text-3xl font-semibold tracking-wide sm:text-4xl">
          {title}
        </h1>
        <div className="mt-8 flex flex-col gap-6 text-base leading-7 text-black/80">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
