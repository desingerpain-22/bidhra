import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// NOWPayments signs the payload as JSON with keys sorted recursively,
// then HMAC-SHA512 with the IPN secret.
function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value !== null && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sortKeys((value as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }
  return value;
}

export async function POST(request: Request) {
  const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;
  if (!ipnSecret) {
    return NextResponse.json({ error: "IPN is not configured" }, { status: 503 });
  }

  const signature = request.headers.get("x-nowpayments-sig");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();
  const payload = JSON.parse(rawBody) as {
    order_id?: string;
    payment_id?: string | number;
    payment_status?: string;
    actually_paid?: number;
  };

  const expectedSignature = createHmac("sha512", ipnSecret)
    .update(JSON.stringify(sortKeys(payload)))
    .digest("hex");

  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");
  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const { order_id, payment_id, payment_status, actually_paid } = payload;
  if (!order_id || !payment_status) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("donations")
    .update({
      status: payment_status,
      payment_id: payment_id != null ? String(payment_id) : undefined,
      actually_paid: actually_paid ?? undefined,
      updated_at: new Date().toISOString(),
    })
    .eq("order_id", order_id);

  if (error) {
    console.error("Failed to update donation from IPN:", error.message);
    return NextResponse.json({ error: "Failed to update donation" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
