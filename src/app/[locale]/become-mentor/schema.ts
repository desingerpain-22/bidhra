import { z } from "zod";

export const expertiseOptions = [
  "business_strategy",
  "digital_marketing",
  "design_branding",
  "tech_development",
  "finance_accounting",
  "legal_licensing",
] as const;

export const languageOptions = ["ar", "en", "both"] as const;

export const mentorProfileSchema = z.object({
  bioAr: z.string().min(20),
  bioEn: z.string().min(20),
  expertiseAreas: z.array(z.enum(expertiseOptions)).min(1),
  yearsOfExperience: z.coerce.number().int().min(0).max(70),
  currentRole: z.string().min(2),
  currentCompany: z.string().min(2),
  hoursPerWeekAvailable: z.coerce.number().int().min(1).max(40),
  weeksCommitted: z.coerce.number().int().min(1).max(52),
  responseTimeHours: z.coerce.number().int().min(1).max(168),
  languages: z.array(z.enum(languageOptions)).min(1),
  linkedinUrl: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || "")
    .refine((v) => !v || /^https?:\/\/.+/i.test(v), "invalid_url"),
  portfolioUrl: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || "")
    .refine((v) => !v || /^https?:\/\/.+/i.test(v), "invalid_url"),
});

export type MentorProfileInput = z.input<typeof mentorProfileSchema>;
export type MentorProfileOutput = z.output<typeof mentorProfileSchema>;
