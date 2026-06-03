"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { OfferMentorshipModal } from "./offer-mentorship-modal";

export function ScholarshipGuidance({
  slug,
  studentName,
  ask,
}: {
  slug: string;
  studentName: string;
  ask: string;
}) {
  const t = useTranslations("Scholarship");
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="rounded-xl border border-border bg-background p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {t("guidanceTitle")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{ask}</p>
        <div className="mt-5">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            {t("offerGuidance")}
          </button>
        </div>
      </section>

      <OfferMentorshipModal
        open={open}
        onOpenChange={setOpen}
        projectSlug={`scholarship:${slug}`}
        projectTitle={studentName}
      />
    </>
  );
}
