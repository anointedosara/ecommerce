import type { Metadata } from "next";
import Link from "@/components/ui/Link";
import { Mail, Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Exclusive",
  description: "Get in touch with the Exclusive team.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1170px] flex-1 px-4 py-20">
        {/* Breadcrumb */}
        <nav className="mb-20 flex items-center gap-3 text-sm">
          <Link href="/" className="text-black/50 hover:text-black">
            Home
          </Link>
          <span className="text-black/50">/</span>
          <span className="text-black">Contact</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[340px_1fr]">
          {/* Contact info */}
          <div className="flex flex-col gap-8 rounded bg-white px-8 py-10 shadow-[0_1px_13px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                  <Phone size={18} />
                </span>
                <h2 className="text-base font-medium">Call To Us</h2>
              </div>
              <p className="text-sm">We are available 24/7, 7 days a week.</p>
              <p className="text-sm">Phone: +8801611112222</p>
            </div>

            <div className="border-t border-black/25" />

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                  <Mail size={18} />
                </span>
                <h2 className="text-base font-medium">Write To US</h2>
              </div>
              <p className="text-sm leading-6">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="text-sm">Emails: customer@exclusive.com</p>
              <p className="text-sm">Emails: support@exclusive.com</p>
            </div>
          </div>

          {/* Message form */}
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
