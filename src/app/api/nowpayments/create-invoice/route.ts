import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const NOWPAYMENTS_INVOICE_URL = "https://api.nowpayments.io/v1/invoice";

const requestSchema = z.object({
  amount: z.number().positive(),
  projectSlug: z.string().min(1),
  projectTitle: z.string().min(1),
  locale: z.string().min(2),
  donorName: z.string().min(1).max(120).optional(),
  donorEmail: z.string().email().optional(),
  isPublic: z.boolean().optional(),
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

  const { amount, projectSlug, projectTitle, locale, donorName, donorEmail, isPublic } = parsed.data;
  const projectUrl = new URL(`/${locale}/projects/${projectSlug}`, request.url).toString();
  const ipnCallbackUrl = new URL("/api/nowpayments/ipn", request.url).toString();
  const orderId = `${projectSlug}-${Date.now()}`;

  const response = await fetch(NOWPAYMENTS_INVOICE_URL, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: amount,
      price_currency: "usd",
      pay_currency: "usdttrc20",
      order_id: orderId,
      order_description: `Donation to ${projectTitle}`,
      success_url: projectUrl,
      cancel_url: projectUrl,
      ipn_callback_url: ipnCallbackUrl,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to create NOWPayments invoice" },
      { status: 502 },
    );
  }

  const data = (await response.json()) as { id?: string; invoice_url?: string };
  if (!data.invoice_url) {
    return NextResponse.json(
      { error: "NOWPayments did not return an invoice URL" },
      { status: 502 },
    );
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("donations").insert({
      project_slug: projectSlug,
      order_id: orderId,
      invoice_id: data.id ?? null,
      pay_currency: "usdttrc20",
      price_amount: amount,
      status: "waiting",
      donor_name: donorName ?? null,
      donor_email: donorEmail ?? null,
      is_public: isPublic ?? true,
    });
    if (error) {
      console.error("Failed to record pending donation:", error.message);
    }
  }

  return NextResponse.json({ invoiceUrl: data.invoice_url });
}
