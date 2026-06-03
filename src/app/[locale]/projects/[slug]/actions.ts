"use server";

export type OfferMentorshipResult = { ok: true } | { ok: false; error: "noop" };

export async function offerMentorship(): Promise<OfferMentorshipResult> {
  return { ok: true };
}
