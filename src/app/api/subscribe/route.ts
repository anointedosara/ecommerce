import { NextResponse } from "next/server";

const FROM = process.env.EMAIL_FROM ?? "Exclusive <onboarding@resend.dev>";
// Owner notification so you also see who subscribed.
const NOTIFY = "anointedosara@gmail.com";

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[subscribe] (simulated, no RESEND_API_KEY)", email);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const send = (to: string, subject: string, html: string) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to: [to], subject, html }),
    });

  try {
    // Confirmation to the subscriber.
    await send(
      email,
      "You're subscribed to Exclusive 🎉",
      `<h2>Welcome to Exclusive!</h2>
       <p>Thanks for subscribing. Here's <strong>10% off</strong> your first order.</p>
       <p>Happy shopping!</p>`,
    );
    // Notify the store owner.
    await send(NOTIFY, "New newsletter subscriber", `<p>${email} just subscribed.</p>`);

    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to subscribe." },
      { status: 500 },
    );
  }
}
