import { z } from "zod";

// "Partner with Bidhra" form on the How to Donate page.
//
// Each submission is validated, rate-limited per IP (5 an hour), saved to
// the Supabase partnership_inquiries table, then emailed to Bidhra through
// Resend with Reply-To set to the sender. The row is saved before the email
// is sent, so a submission is never lost: if Resend fails, the error is
// recorded on the row and the visitor still sees the thank-you message.

const NOTIFY_TO = "mohammedhosni001@gmail.com";
const NOTIFY_FROM = "Bidhra Partnerships <partnerships@bidhra.org>";
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(200),
  organization: z.string().trim().max(200).optional().default(""),
  email: z.email().max(320),
  message: z.string().trim().min(1).max(5000),
  // Honeypot: hidden from people, filled in by bots.
  website: z.string().max(0).optional().default(""),
});

type Row = { id: string; created_at: string };

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error("Partnership form: Supabase is not configured.");
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
  const db = (path: string, init: RequestInit = {}) =>
    fetch(`${supabaseUrl}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
      cache: "no-store",
    });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot means a bot: answer as if it worked, store nothing.
    if ((body as { website?: string })?.website) return Response.json({ ok: true });
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  const { name, organization, email, message } = parsed.data;
  const ip = clientIp(request);

  // Rate limit: count this IP's submissions in the last hour.
  if (ip) {
    const since = new Date(Date.now() - RATE_WINDOW_MS).toISOString();
    const count = await db(
      `partnership_inquiries?select=id&ip_address=eq.${encodeURIComponent(ip)}&created_at=gte.${encodeURIComponent(since)}`,
      { method: "HEAD", headers: { Prefer: "count=exact" } },
    );
    const total = Number(count.headers.get("content-range")?.split("/")[1] ?? 0);
    if (total >= RATE_LIMIT) {
      return Response.json({ error: "rate_limited" }, { status: 429 });
    }
  }

  // Save first, so the submission survives any email failure.
  const insert = await db("partnership_inquiries?select=id,created_at", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      name,
      organization: organization || null,
      email,
      message,
      ip_address: ip,
    }),
  });
  if (!insert.ok) {
    console.error("Partnership form: saving failed.", insert.status, await insert.text());
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
  const [row] = (await insert.json()) as Row[];

  const result = await sendNotification({ name, organization, email, message, submittedAt: row.created_at });
  await db(`partnership_inquiries?id=eq.${row.id}`, {
    method: "PATCH",
    body: JSON.stringify(
      result.ok
        ? { email_sent: true, email_id: result.id }
        : { email_sent: false, email_error: result.error },
    ),
  });
  if (!result.ok) console.error("Partnership form: email failed.", result.error);

  return Response.json({ ok: true });
}

// The visitor's IP as Vercel (or a proxy) reports it.
function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim() || null;
  return request.headers.get("x-real-ip");
}

async function sendNotification(inquiry: {
  name: string;
  organization: string;
  email: string;
  message: string;
  submittedAt: string;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY ?? process.env.MESSAGING_RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY is not set" };

  const when = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Gaza",
  }).format(new Date(inquiry.submittedAt));
  const subject = inquiry.organization
    ? `New Partnership Inquiry from ${inquiry.name} at ${inquiry.organization}`
    : `New Partnership Inquiry from ${inquiry.name}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [NOTIFY_TO],
        reply_to: inquiry.email,
        subject,
        html: emailHtml({ ...inquiry, when }),
        text: emailText({ ...inquiry, when }),
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { id?: string; message?: string; name?: string };
    if (!res.ok || !data.id) {
      return { ok: false, error: `Resend ${res.status}: ${data.message ?? data.name ?? "unknown error"}` };
    }
    return { ok: true, id: data.id };
  } catch (error) {
    return { ok: false, error: `Resend request failed: ${(error as Error).message}` };
  }
}

type EmailFields = { name: string; organization: string; email: string; message: string; when: string };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function emailHtml({ name, organization, email, message, when }: EmailFields): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 16px 8px 0;color:#6b6b6b;font-size:14px;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:8px 0;color:#1b1b1b;font-size:15px">${value}</td></tr>`;
  const safeEmail = escapeHtml(email);
  return `<!doctype html><html><body style="margin:0;background:#f5f4ef;font-family:Arial,Helvetica,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:32px 20px">
  <div style="background:#ffffff;border:1px solid #e6e4dc;border-radius:12px;padding:28px">
    <p style="margin:0 0 6px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#1f5d3c;font-weight:bold">Partner with Bidhra</p>
    <h1 style="margin:0 0 16px;font-size:22px;color:#1b1b1b">New partnership inquiry</h1>
    <p style="margin:0 0 20px;font-size:15px;color:#1b1b1b;line-height:1.5">Hi Mohammed, someone has reached out through the website. Reply to this email to answer them directly.</p>
    <table style="border-collapse:collapse;width:100%">
      ${row("Name", escapeHtml(name))}
      ${row("Organization", organization ? escapeHtml(organization) : "—")}
      ${row("Email", `<a href="mailto:${safeEmail}" style="color:#1f5d3c">${safeEmail}</a>`)}
      ${row("Submitted", escapeHtml(when))}
    </table>
    <p style="margin:24px 0 8px;font-size:14px;color:#6b6b6b">Message</p>
    <div style="font-size:15px;line-height:1.6;color:#1b1b1b;background:#f8f7f2;border-radius:8px;padding:16px;white-space:pre-wrap">${escapeHtml(message).replace(/\r?\n/g, "<br>")}</div>
  </div>
  <p style="margin:16px 0 0;font-size:12px;color:#8a8a8a;text-align:center">Sent from the How to Donate page on bidhra.org</p>
</div></body></html>`;
}

function emailText({ name, organization, email, message, when }: EmailFields): string {
  return `New partnership inquiry\n\nName: ${name}\nOrganization: ${organization || "—"}\nEmail: ${email}\nSubmitted: ${when}\n\nMessage:\n${message}\n`;
}
