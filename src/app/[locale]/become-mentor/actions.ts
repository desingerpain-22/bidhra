"use server";

import { mentorProfileSchema, type MentorProfileInput } from "./schema";

export type SubmitMentorProfileResult = {
  ok: boolean;
  error?: string;
};

export async function submitMentorProfile(
  values: MentorProfileInput,
): Promise<SubmitMentorProfileResult> {
  const parsed = mentorProfileSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "validation" };
  }
  return { ok: true };
}
