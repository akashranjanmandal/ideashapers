import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ── limits ── */
const MAX = { name: 100, email: 200, service: 100, msg: 5000 };
const MIN_FILL_MS = 2000; // humans take longer than this to fill the form
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3; // submissions per IP per window

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

/* Best-effort in-memory limiter: per server instance, resets on cold start. */
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every(t => now - t >= RATE_WINDOW_MS)) hits.delete(k);
  }
  return false;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* Strip CR/LF so values can't inject extra email headers. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

const str = (v: unknown) => (typeof v === "string" ? v : "");

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = oneLine(str(body.name));
  const email = oneLine(str(body.email));
  const service = oneLine(str(body.service));
  const msg = str(body.msg).trim();
  const honeypot = str(body.website);
  const startedAt = Number(body.t);

  // Honeypot filled or no timestamp: bot. Pretend success so it doesn't retry, send nothing.
  if (honeypot || !Number.isFinite(startedAt)) {
    console.warn("Contact form: dropped as bot", honeypot ? "(honeypot filled)" : "(no timestamp)");
    return NextResponse.json({ ok: true });
  }
  // Too fast to be human (or autofill + instant click): ask the visitor to retry rather than lose the message.
  if (Date.now() - startedAt < MIN_FILL_MS) {
    console.warn("Contact form: rejected as too fast");
    return NextResponse.json({ error: "Please wait a moment and press Send again." }, { status: 400 });
  }

  if (!name || !email || !msg) {
    return NextResponse.json({ error: "Please fill in your name, email and message." }, { status: 400 });
  }
  if (name.length > MAX.name || email.length > MAX.email || service.length > MAX.service || msg.length > MAX.msg) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages. Please try again later or email us directly." }, { status: 429 });
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO_EMAIL } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !CONTACT_TO_EMAIL) {
    console.error("Contact form: GMAIL_USER, GMAIL_APP_PASSWORD or CONTACT_TO_EMAIL is not set");
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  const svc = service || "Not specified";

  try {
    await transporter.sendMail({
      from: `"IdeaShapers Website" <${GMAIL_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: { name, address: email },
      subject: `New project inquiry from ${name.slice(0, 60)}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${svc}\n\nMessage:\n${msg}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Service:</strong> ${escapeHtml(svc)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(msg).replace(/\n/g, "<br/>")}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form email error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
