"use server";

import { z } from "zod";

const partnerInquirySchema = z.object({
  name: z.string().trim().min(1).max(200),
  organization: z.string().trim().max(200).optional().default(""),
  email: z.email().max(320),
  message: z.string().trim().min(1).max(5000),
});

export type PartnerInquiryState = {
  status: "idle" | "success" | "error";
};

// Partnership enquiries from the How to Donate page.
// PLACEHOLDER: the enquiry is validated but not yet stored or sent anywhere.
// Connect it (e.g. a Supabase table or an email service) before launch.
export async function submitPartnerInquiry(
  _previous: PartnerInquiryState,
  formData: FormData,
): Promise<PartnerInquiryState> {
  const parsed = partnerInquirySchema.safeParse({
    name: formData.get("name"),
    organization: formData.get("organization") ?? "",
    email: formData.get("email"),
    message: formData.get("message"),
  });
  if (!parsed.success) return { status: "error" };
  return { status: "success" };
}
