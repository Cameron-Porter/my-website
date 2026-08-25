import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Required Vercel env vars:
//   SMTP_HOST  — smtp-relay.brevo.com
//   SMTP_PORT  — 587
//   SMTP_USER  — Brevo SMTP login (used for auth only)
//   SMTP_PASS  — Brevo SMTP key (Brevo dashboard → SMTP & API → SMTP Keys)
//   SMTP_FROM  — verified sender on a domain you control, e.g. contact@cameron-porter.com
//                (must be a Brevo-verified domain/sender — a personal @gmail.com
//                address cannot be DKIM/SPF-authenticated through a relay)
//   SMTP_TO    — destination address (info@cameron-porter.com)

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp-relay.brevo.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false, // STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { name, email, subject, message, website } = body as Record<string, string>;

  // Honeypot — silently succeed so bots don't retry
  if (website) {
    return NextResponse.json({ success: true });
  }

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  if (message.trim().length < 10) {
    return NextResponse.json({ error: 'Message is too short.' }, { status: 400 });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('[contact] SMTP credentials are not configured');
    return NextResponse.json(
      { error: 'Email service is not configured.' },
      { status: 503 },
    );
  }

  const to = process.env.SMTP_TO ?? 'info@cameron-porter.com';
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;

  try {
    const transporter = createTransport();
    await transporter.sendMail({
      from: `"G.R.I.T. Contact Form" <${from}>`,
      to,
      replyTo: email,
      subject: `[G.R.I.T.] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
        <p><strong>Subject:</strong> ${esc(subject)}</p>
        <hr>
        <p style="white-space:pre-wrap">${esc(message)}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] send failed:', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 },
    );
  }
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
