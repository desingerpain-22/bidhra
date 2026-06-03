import type { Locale } from "@/i18n/routing";

type LocalizedString = Record<Locale, string>;

export type KnowledgeType =
  | "business_strategy"
  | "digital_marketing"
  | "design_branding"
  | "tech_development"
  | "finance_accounting"
  | "legal_licensing";

export type KnowledgeUrgency = "urgent" | "soon" | "flexible";
export type KnowledgeLanguage = "ar" | "en" | "both";

export type KnowledgeRequestSeed = {
  id: string;
  projectSlug: string;
  projectOwner: string;
  projectOwnerPhoto: string;
  location: LocalizedString;
  region: LocalizedString;
  knowledgeTypes: KnowledgeType[];
  description: LocalizedString;
  urgency: KnowledgeUrgency;
  preferredSessions: number;
  languagePreference: KnowledgeLanguage;
  mentorsOffered: number;
};

export const knowledgeRequests: KnowledgeRequestSeed[] = [];
