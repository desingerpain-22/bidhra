"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  expertiseOptions,
  languageOptions,
  mentorProfileSchema,
  type MentorProfileInput,
  type MentorProfileOutput,
} from "./schema";
import { submitMentorProfile } from "./actions";
import { Link } from "@/i18n/navigation";

const totalSteps = 6;

export default function BecomeMentorPage() {
  const t = useTranslations("BecomeMentor");
  const [step, setStep] = useState(1);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MentorProfileInput, unknown, MentorProfileOutput>({
    resolver: zodResolver(mentorProfileSchema),
    defaultValues: {
      expertiseAreas: [],
      languages: ["ar"],
      weeksCommitted: 4,
      hoursPerWeekAvailable: 2,
      responseTimeHours: 48,
      yearsOfExperience: 0,
    },
  });

  const expertiseSelected = watch("expertiseAreas");
  const languagesSelected = watch("languages");

  const expertiseLabels = useMemo(
    () =>
      Object.fromEntries(
        expertiseOptions.map((value) => [value, t(`expertiseOptions.${value}`)]),
      ),
    [t],
  );

  const stepFields: Record<number, Array<keyof MentorProfileInput>> = {
    1: ["bioAr", "bioEn"],
    2: ["expertiseAreas"],
    3: ["yearsOfExperience", "currentRole", "currentCompany"],
    4: ["hoursPerWeekAvailable", "weeksCommitted", "responseTimeHours"],
    5: ["languages", "linkedinUrl", "portfolioUrl"],
    6: [],
  };

  async function nextStep() {
    const fields = stepFields[step];
    if (fields.length > 0) {
      const ok = await trigger(fields);
      if (!ok) return;
    }
    setStep((s) => Math.min(totalSteps, s + 1));
  }

  function prevStep() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function onSubmit(values: MentorProfileOutput) {
    setServerError(null);
    const result = await submitMentorProfile(values);
    if (!result.ok) {
      if (result.error === "auth") {
        setServerError(t("errors.auth"));
        return;
      }
      setServerError(t("errors.submit"));
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-5 px-4 py-10 sm:px-6 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">✓</p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("successTitle")}
        </h1>
        <p className="text-muted-foreground">{t("successBody")}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            href="/knowledge"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            {t("successBrowseKnowledge")}
          </Link>
          <Link
            href="/projects"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            {t("successBrowseProjects")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">{t("subtitle")}</p>
      </header>

      <section className="rounded-xl border border-border bg-background p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <p className="text-sm text-muted-foreground">
            {t("stepLabel", { current: step, total: totalSteps })}
          </p>
          <div className="h-2 w-32 overflow-hidden rounded-full bg-muted sm:w-40">
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${Math.round((step / totalSteps) * 100)}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {step === 1 && (
            <>
              <Field
                label={t("fields.bioAr")}
                help={t("fields.bioArHelp")}
                error={errors.bioAr && t("errors.requiredLong")}
              >
                <textarea rows={5} className="input resize-none" {...register("bioAr")} />
              </Field>
              <Field
                label={t("fields.bioEn")}
                help={t("fields.bioEnHelp")}
                error={errors.bioEn && t("errors.requiredLong")}
              >
                <textarea rows={5} className="input resize-none" {...register("bioEn")} />
              </Field>
            </>
          )}

          {step === 2 && (
            <Field
              label={t("fields.expertiseAreas")}
              help={t("fields.expertiseHelp")}
              error={errors.expertiseAreas && t("errors.pickOne")}
            >
              <div className="grid gap-2 sm:grid-cols-2">
                {expertiseOptions.map((value) => (
                  <label
                    key={value}
                    className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      value={value}
                      {...register("expertiseAreas")}
                      className="accent-[var(--color-accent)]"
                    />
                    <span>{expertiseLabels[value]}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {t("selectedCount", { count: expertiseSelected?.length ?? 0 })}
              </p>
            </Field>
          )}

          {step === 3 && (
            <>
              <Field
                label={t("fields.yearsOfExperience")}
                error={errors.yearsOfExperience && t("errors.number")}
              >
                <input type="number" min={0} className="input" {...register("yearsOfExperience")} />
              </Field>
              <Field
                label={t("fields.currentRole")}
                error={errors.currentRole && t("errors.required")}
              >
                <input type="text" className="input" {...register("currentRole")} />
              </Field>
              <Field
                label={t("fields.currentCompany")}
                error={errors.currentCompany && t("errors.required")}
              >
                <input type="text" className="input" {...register("currentCompany")} />
              </Field>
            </>
          )}

          {step === 4 && (
            <>
              <Field
                label={t("fields.hoursPerWeekAvailable")}
                error={errors.hoursPerWeekAvailable && t("errors.number")}
              >
                <input
                  type="number"
                  min={1}
                  className="input"
                  {...register("hoursPerWeekAvailable")}
                />
              </Field>
              <Field
                label={t("fields.weeksCommitted")}
                error={errors.weeksCommitted && t("errors.number")}
              >
                <input type="number" min={1} className="input" {...register("weeksCommitted")} />
              </Field>
              <Field
                label={t("fields.responseTimeHours")}
                error={errors.responseTimeHours && t("errors.number")}
              >
                <input type="number" min={1} className="input" {...register("responseTimeHours")} />
              </Field>
            </>
          )}

          {step === 5 && (
            <>
              <Field
                label={t("fields.languages")}
                error={errors.languages && t("errors.pickOne")}
              >
                <div className="grid gap-2 sm:grid-cols-3">
                  {languageOptions.map((value) => (
                    <label
                      key={value}
                      className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        value={value}
                        {...register("languages")}
                        className="accent-[var(--color-accent)]"
                      />
                      <span>{t(`languageOptions.${value}`)}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("selectedCount", { count: languagesSelected?.length ?? 0 })}
                </p>
              </Field>
              <Field
                label={t("fields.linkedinUrl")}
                error={errors.linkedinUrl && t("errors.url")}
              >
                <input
                  type="url"
                  placeholder="https://www.linkedin.com/in/..."
                  className="input"
                  {...register("linkedinUrl")}
                />
              </Field>
              <Field
                label={t("fields.portfolioUrl")}
                error={errors.portfolioUrl && t("errors.url")}
              >
                <input
                  type="url"
                  placeholder="https://your-portfolio.com"
                  className="input"
                  {...register("portfolioUrl")}
                />
              </Field>
            </>
          )}

          {step === 6 && (
            <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
              {t("confirmation")}
            </div>
          )}

          {serverError && (
            <p className="rounded-md border border-red-400/40 bg-red-50 px-3 py-2 text-sm text-red-700">
              {serverError}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                {t("actions.back")}
              </button>
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                {t("actions.next")}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
              >
                {isSubmitting ? t("actions.submitting") : t("actions.submit")}
              </button>
            )}
          </div>
        </form>
      </section>

      <style>{`
        .input {
          width: 100%;
          height: 2.75rem;
          padding: 0 0.875rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          background: var(--color-background);
          color: var(--color-foreground);
          font: inherit;
          outline: none;
          transition: border-color 120ms;
        }
        textarea.input {
          height: auto;
          padding: 0.625rem 0.875rem;
          line-height: 1.5;
        }
        .input:focus {
          border-color: var(--color-accent);
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  help,
  error,
  children,
}: {
  label: string;
  help?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
      {help && !error ? <span className="text-xs text-muted-foreground">{help}</span> : null}
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
