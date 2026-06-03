"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { projects } from "@/lib/projects";
import {
  knowledgeRequests,
  type KnowledgeLanguage,
  type KnowledgeType,
  type KnowledgeUrgency,
} from "@/lib/knowledge-requests";
import type { Locale } from "@/i18n/routing";

const knowledgeTypes: KnowledgeType[] = [
  "business_strategy",
  "digital_marketing",
  "design_branding",
  "tech_development",
  "finance_accounting",
  "legal_licensing",
];

const urgencyOptions: KnowledgeUrgency[] = ["urgent", "soon", "flexible"];
const languageOptions: KnowledgeLanguage[] = ["ar", "en", "both"];

export default function KnowledgePage({
}: Record<string, never>) {
  const [knowledgeType, setKnowledgeType] = useState<string>("all");
  const [urgency, setUrgency] = useState<string>("all");
  const [language, setLanguage] = useState<string>("all");
  const [region, setRegion] = useState<string>("all");
  const t = useTranslations("Knowledge");
  const params = useParams<{ locale: string }>();
  const locale = (params.locale ?? "en") as Locale;

  const regionOptions = useMemo(() => {
    const values = new Set(knowledgeRequests.map((item) => item.region[locale]));
    return Array.from(values);
  }, [locale]);

  const filtered = useMemo(() => {
    return knowledgeRequests.filter((item) => {
      if (knowledgeType !== "all" && !item.knowledgeTypes.includes(knowledgeType as KnowledgeType)) {
        return false;
      }
      if (urgency !== "all" && item.urgency !== urgency) return false;
      if (language !== "all" && item.languagePreference !== language) return false;
      if (region !== "all" && item.region[locale] !== region) return false;
      return true;
    });
  }, [knowledgeType, urgency, language, region, locale]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">{t("subtitle")}</p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
        <aside className="h-fit rounded-xl border border-border bg-background p-4">
          <p className="mb-4 text-sm font-semibold text-foreground">{t("filters.title")}</p>

          <div className="grid grid-cols-2 gap-x-3 sm:grid-cols-4 lg:grid-cols-1 lg:gap-x-0">
            <FilterSelect
              label={t("filters.knowledgeType")}
              value={knowledgeType}
              onChange={setKnowledgeType}
              options={[
                { value: "all", label: t("filters.all") },
                ...knowledgeTypes.map((value) => ({
                  value,
                  label: t(`knowledgeOptions.${value}`),
                })),
              ]}
            />

            <FilterSelect
              label={t("filters.urgency")}
              value={urgency}
              onChange={setUrgency}
              options={[
                { value: "all", label: t("filters.all") },
                ...urgencyOptions.map((value) => ({
                  value,
                  label: t(`urgencyOptions.${value}`),
                })),
              ]}
            />

            <FilterSelect
              label={t("filters.language")}
              value={language}
              onChange={setLanguage}
              options={[
                { value: "all", label: t("filters.all") },
                ...languageOptions.map((value) => ({
                  value,
                  label: t(`languageOptions.${value}`),
                })),
              ]}
            />

            <FilterSelect
              label={t("filters.region")}
              value={region}
              onChange={setRegion}
              options={[
                { value: "all", label: t("filters.all") },
                ...regionOptions.map((value) => ({ value, label: value })),
              ]}
            />
          </div>
        </aside>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-border bg-background p-6 text-sm text-muted-foreground sm:col-span-2">
              {t("filters.none")}
            </p>
          ) : (
            filtered.map((item) => {
              const project = projects.find((p) => p.slug === item.projectSlug);
              if (!project) return null;
              return (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 sm:p-5"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.projectOwnerPhoto}
                      alt={item.projectOwner}
                      className="h-9 w-9 rounded-full border border-border bg-muted p-1"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.projectOwner}</p>
                      <p className="text-xs text-muted-foreground">{item.location[locale]}</p>
                    </div>
                  </div>

                  <h2 className="text-lg font-semibold text-foreground">
                    {project.title[locale]}
                  </h2>
                  <p className="text-sm text-muted-foreground">{project.summary[locale]}</p>
                  <p className="text-sm text-muted-foreground">{item.description[locale]}</p>

                  <div className="flex flex-wrap gap-2">
                    {item.knowledgeTypes.map((value) => (
                      <span
                        key={value}
                        className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {t(`knowledgeOptions.${value}`)}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-foreground">
                    {t("card.lookingFor")}: {t("card.sessions", { count: item.preferredSessions })}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                      {t(`urgencyOptions.${item.urgency}`)}
                    </span>
                    <Link
                      href={{
                        pathname: `/projects/${item.projectSlug}`,
                        query: { offer: "1" },
                        hash: "project-knowledge",
                      }}
                      className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                      {t("card.offer")}
                    </Link>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="mb-3 flex flex-col gap-1.5 last:mb-0 lg:last:mb-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-md border border-border bg-background px-2 text-sm text-foreground"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
