import type { Metadata } from "next";
import InfoPage from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Terms Of Use — Exclusive",
  description: "The terms and conditions for using Exclusive.",
};

export default function TermsPage() {
  return (
    <InfoPage title="Terms Of Use">
      <p>
        Welcome to Exclusive. By accessing or using our website you agree to be
        bound by these terms. Please read them carefully before placing an
        order.
      </p>
      <p>
        All products are subject to availability. Prices and promotions may
        change without notice. We reserve the right to refuse or cancel any
        order at our discretion.
      </p>
      <p>
        Content on this site is for your personal, non-commercial use. You may
        not reproduce, distribute, or modify any part of the site without prior
        written consent.
      </p>
    </InfoPage>
  );
}
