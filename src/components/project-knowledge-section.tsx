"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { KnowledgeRequestSeed } from "@/lib/knowledge-requests";
import { OfferMentorshipModal } from "./offer-mentorship-modal";

export function ProjectKnowledgeSection(props: {
  locale: Locale;
  projectSlug: string;
  projectTitle: string;
  request: KnowledgeRequestSeed;
}) {
  return (
    <Suspense fallback={null}>
      <ProjectKnowledgeSectionInner {...props} />
    </Suspense>
  );
}

function ProjectKnowledgeSectionInner({
  locale,
  projectSlug,
  projectTitle,
  request,
}: {
  locale: Locale;
  projectSlug: string;
  projectTitle: string;
  request: KnowledgeRequestSeed;
}) {
  const t = useTranslations("ProjectKnowledge");
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("offer") === "1") setOpen(true);
  }, [searchParams]);

  return (
    <>
      <section className="rounded-xl border border-border bg-background p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{request.description[locale]}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {request.knowledgeTypes.map((value) => (
            <span
              key={value}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
            >
              {t(`knowledgeOptions.${value}`)}
            </span>
          ))}
        </div>

        <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
          <p className="text-muted-foreground">
            {t("sessions")}:{" "}
            <span className="font-medium text-foreground">{request.preferredSessions}</span>
          </p>
          <p className="text-muted-foreground">
            {t("language")}:{" "}
            <span className="font-medium text-foreground">
              {t(`languageOptions.${request.languagePreference}`)}
            </span>
          </p>
          <p className="text-muted-foreground">
            {t("offers")}:{" "}
            <span className="font-medium text-foreground">{request.mentorsOffered}</span>
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            {t("offer")}
          </button>
        </div>
      </section>

      <OfferMentorshipModal
        open={open}
        onOpenChange={setOpen}
        projectSlug={projectSlug}
        projectTitle={projectTitle}
      />
    </>
  );
}
