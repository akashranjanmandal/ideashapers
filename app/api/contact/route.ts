import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, service, msg } = await req.json();

  if (!name || !email || !msg) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"IdeaShapers Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service || "Not specified"}\n\nMessage:\n${msg}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${msg.replace(/\n/g, "<br/>")}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form email error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
