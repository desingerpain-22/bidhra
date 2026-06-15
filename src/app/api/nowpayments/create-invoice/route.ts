import { NextResponse } from "next/server";
import { z } from "zod";

const NOWPAYMENTS_INVOICE_URL = "https://api.nowpayments.io/v1/invoice";

const requestSchema = z.object({
  amount: z.number().positive(),
  projectSlug: z.string().min(1),
  projectTitle: z.string().min(1),
  locale: z.string().min(2),
});

export async function POST(request: Request) {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "NOWPayments is not configured" },
      { status: 503 },
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { amount, projectSlug, projectTitle, locale } = parsed.data;
  const projectUrl = new URL(`/${locale}/projects/${projectSlug}`, request.url).toString();

  const response = await fetch(NOWPAYMENTS_INVOICE_URL, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: amount,
      price_currency: "usd",
      order_id: `${projectSlug}-${Date.now()}`,
      order_description: `Donation to ${projectTitle}`,
      success_url: projectUrl,
      cancel_url: projectUrl,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to create NOWPayments invoice" },
      { status: 502 },
    );
  }

  const data = (await response.json()) as { invoice_url?: string };
  if (!data.invoice_url) {
    return NextResponse.json(
      { error: "NOWPayments did not return an invoice URL" },
      { status: 502 },
    );
  }

  return NextResponse.json({ invoiceUrl: data.invoice_url });
}
