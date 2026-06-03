import type { Metadata } from "next";
import InfoPage from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Exclusive",
  description: "How Exclusive collects, uses and protects your data.",
};

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy Policy">
      <p>
        Your privacy is important to us. This policy explains what information
        Exclusive collects, how we use it, and the choices you have. We only
        collect the data needed to process your orders and improve your
        shopping experience.
      </p>
      <p>
        We never sell your personal information. Payment details are processed
        securely and are not stored on our servers. You may request access to,
        or deletion of, your data at any time by contacting our support team.
      </p>
      <p>
        By using Exclusive you consent to the collection and use of information
        in accordance with this policy.
      </p>
    </InfoPage>
  );
}
