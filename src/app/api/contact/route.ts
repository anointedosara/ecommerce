import { NextResponse } from "next/server";

// Where contact messages are delivered.
const CONTACT_TO = "anointedosara@gmail.com";
const FROM = process.env.EMAIL_FROM ?? "Exclusive <onboarding@resend.dev>";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; phone?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { name, email, phone, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  // No provider configured — accept the message so the UI can confirm, but make
  // clear it wasn't actually delivered. Set RESEND_API_KEY to enable delivery.
  if (!apiKey) {
    console.log("[contact] (simulated, no RESEND_API_KEY)", {
      to: CONTACT_TO,
      name,
      email,
      phone,
      message,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [CONTACT_TO],
        reply_to: email,
        subject: `New contact message from ${name}`,
        html: `
          <h2>New message from the Exclusive contact form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone ?? "—"}</p>
          <p><strong>Message:</strong></p>
          <p>${String(message).replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { ok: false, error: "Email provider rejected the request.", detail },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 },
    );
  }
}
