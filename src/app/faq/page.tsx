import type { Metadata } from "next";
import InfoPage from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "FAQ — Exclusive",
  description: "Frequently asked questions about shopping with Exclusive.",
};

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Orders are processed within 24 hours and typically delivered in 2–5 business days. Delivery is free on all orders over $140.",
  },
  {
    q: "Can I return an item?",
    a: "Yes. We offer free 30-day returns on all products. Items must be unused and in their original packaging.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major cards, bank transfer, and cash on delivery in supported regions.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order ships you'll receive an email with a tracking link. You can also view orders from your account page.",
  },
];

export default function FaqPage() {
  return (
    <InfoPage title="FAQ">
      {faqs.map((item) => (
        <div key={item.q} className="flex flex-col gap-2">
          <h2 className="text-lg font-medium text-black">{item.q}</h2>
          <p>{item.a}</p>
        </div>
      ))}
    </InfoPage>
  );
}
