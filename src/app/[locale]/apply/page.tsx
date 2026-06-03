"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  location: z.string().min(2),
  projectTitle: z.string().min(3),
  category: z.string().min(2),
  summary: z.string().min(10).max(160),
  story: z.string().min(40),
  supportTypes: z.array(z.enum(["money", "knowledge"])).min(1),
  fundingGoal: z.coerce.number().positive().optional(),
  skillsNeeded: z.string().optional(),
  knowledgeTypes: z
    .array(
      z.enum([
        "business_strategy",
        "digital_marketing",
        "design_branding",
        "tech_development",
        "finance_accounting",
        "legal_licensing",
      ]),
    )
    .optional(),
  knowledgeDescriptionAr: z.string().optional(),
  knowledgeDescriptionEn: z.string().optional(),
  urgency: z.enum(["urgent", "soon", "flexible"]).optional(),
  preferredSessions: z.coerce.number().int().positive().optional(),
  preferredHoursPerSession: z.coerce.number().int().positive().optional(),
  languagePreference: z.enum(["ar", "en", "both"]).optional(),
});

const formSchema = schema.superRefine((data, ctx) => {
  const needsMoney = data.supportTypes.includes("money");
  const needsKnowledge = data.supportTypes.includes("knowledge");

  if (needsMoney && (!data.fundingGoal || data.fundingGoal <= 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["fundingGoal"],
      message: "required_for_money",
    });
  }

  if (needsKnowledge) {
    if (!data.knowledgeTypes || data.knowledgeTypes.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["knowledgeTypes"],
        message: "required_for_knowledge",
      });
    }
    if (!data.knowledgeDescriptionAr || data.knowledgeDescriptionAr.trim().length < 20) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["knowledgeDescriptionAr"],
        message: "description_too_short",
      });
    }
    if (!data.knowledgeDescriptionEn || data.knowledgeDescriptionEn.trim().length < 20) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["knowledgeDescriptionEn"],
        message: "description_too_short",
      });
    }
  }
});

type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

export default function ApplyPage() {
  const t = useTranslations("Apply");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supportTypes: ["money"],
      preferredSessions: 4,
      preferredHoursPerSession: 1,
      urgency: "flexible",
      languagePreference: "ar",
      knowledgeTypes: [],
    },
  });

  const supportTypes = watch("supportTypes");
  const needsMoney = supportTypes?.includes("money");
  const needsKnowledge = supportTypes?.includes("knowledge");

  async function onSubmit(values: FormOutput) {
    await new Promise((r) => setTimeout(r, 600));
    console.log("Bidhra application submitted", values);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-start gap-6 px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          ✓
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("successTitle")}
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">{t("success")}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            {t("successBrowse")}
          </Link>
          <Link
            href="/dashboard/offers"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            {t("successDashboard")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-16">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">{t("subtitle")}</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Field label={t("name")} error={errors.name && t("errors.required")}>
          <input
            type="text"
            {...register("name")}
            className="input"
            autoComplete="name"
          />
        </Field>

        <Field
          label={t("email")}
          error={
            errors.email
              ? errors.email.message === "Invalid email"
                ? t("errors.email")
                : t("errors.required")
              : undefined
          }
        >
          <input
            type="email"
            {...register("email")}
            className="input"
            autoComplete="email"
          />
        </Field>

        <Field
          label={t("location")}
          error={errors.location && t("errors.required")}
        >
          <input type="text" {...register("location")} className="input" />
        </Field>

        <Field
          label={t("projectTitle")}
          error={errors.projectTitle && t("errors.required")}
        >
          <input type="text" {...register("projectTitle")} className="input" />
        </Field>

        <Field
          label={t("category")}
          error={errors.category && t("errors.required")}
        >
          <input type="text" {...register("category")} className="input" />
        </Field>

        <Field
          label={t("summary")}
          help={t("summaryHelp")}
          error={errors.summary && t("errors.min")}
        >
          <textarea
            rows={2}
            {...register("summary")}
            className="input resize-none"
          />
        </Field>

        <Field
          label={t("story")}
          help={t("storyHelp")}
          error={errors.story && t("errors.min")}
        >
          <textarea
            rows={6}
            {...register("story")}
            className="input resize-none"
          />
        </Field>

        <Field
          label={t("supportType")}
          help={t("supportTypeHelp")}
          error={errors.supportTypes && t("errors.pickOne")}
        >
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
              <input
                type="checkbox"
                value="money"
                {...register("supportTypes")}
                className="accent-[var(--color-accent)]"
              />
              {t("supportOptions.money")}
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
              <input
                type="checkbox"
                value="knowledge"
                {...register("supportTypes")}
                className="accent-[var(--color-accent)]"
              />
              {t("supportOptions.knowledge")}
            </label>
          </div>
        </Field>

        {needsMoney && (
          <Field
            label={t("fundingGoal")}
            error={errors.fundingGoal && t("errors.positive")}
          >
            <input
              type="number"
              inputMode="numeric"
              min={1}
              {...register("fundingGoal")}
              className="input"
            />
          </Field>
        )}

        <Field label={t("skillsNeeded")} help={t("skillsNeededHelp")}>
          <input type="text" {...register("skillsNeeded")} className="input" />
        </Field>

        {needsKnowledge && (
          <>
            <Field
              label={t("knowledgeType")}
              help={t("knowledgeTypeHelp")}
              error={errors.knowledgeTypes && t("errors.pickOne")}
            >
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  "business_strategy",
                  "digital_marketing",
                  "design_branding",
                  "tech_development",
                  "finance_accounting",
                  "legal_licensing",
                ].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      value={type}
                      {...register("knowledgeTypes")}
                      className="accent-[var(--color-accent)]"
                    />
                    {t(`knowledgeOptions.${type}`)}
                  </label>
                ))}
              </div>
            </Field>

            <Field
              label={t("knowledgeDescriptionAr")}
              help={t("knowledgeDescriptionArHelp")}
              error={errors.knowledgeDescriptionAr && t("errors.min")}
            >
              <textarea
                rows={4}
                {...register("knowledgeDescriptionAr")}
                className="input resize-none"
              />
            </Field>

            <Field
              label={t("knowledgeDescriptionEn")}
              help={t("knowledgeDescriptionEnHelp")}
              error={errors.knowledgeDescriptionEn && t("errors.min")}
            >
              <textarea
                rows={4}
                {...register("knowledgeDescriptionEn")}
                className="input resize-none"
              />
            </Field>

            <Field label={t("urgency")} error={errors.urgency && t("errors.required")}>
              <div className="grid gap-2 sm:grid-cols-3">
                {["urgent", "soon", "flexible"].map((value) => (
                  <label
                    key={value}
                    className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
                  >
                    <input
                      type="radio"
                      value={value}
                      {...register("urgency")}
                      className="accent-[var(--color-accent)]"
                    />
                    {t(`urgencyOptions.${value}`)}
                  </label>
                ))}
              </div>
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label={t("preferredSessions")}
                error={errors.preferredSessions && t("errors.positive")}
              >
                <input
                  type="number"
                  min={1}
                  className="input"
                  {...register("preferredSessions")}
                />
              </Field>
              <Field
                label={t("preferredHoursPerSession")}
                error={errors.preferredHoursPerSession && t("errors.positive")}
              >
                <input
                  type="number"
                  min={1}
                  className="input"
                  {...register("preferredHoursPerSession")}
                />
              </Field>
            </div>

            <Field
              label={t("languagePreference")}
              error={errors.languagePreference && t("errors.required")}
            >
              <div className="grid gap-2 sm:grid-cols-3">
                {["ar", "en", "both"].map((value) => (
                  <label
                    key={value}
                    className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
                  >
                    <input
                      type="radio"
                      value={value}
                      {...register("languagePreference")}
                      className="accent-[var(--color-accent)]"
                    />
                    {t(`languageOptions.${value}`)}
                  </label>
                ))}
              </div>
            </Field>
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </form>

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
        textarea.input { height: auto; padding: 0.625rem 0.875rem; line-height: 1.5; }
        .input:focus { border-color: var(--color-accent); }
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
      {help && !error && (
        <span className="text-xs text-muted-foreground">{help}</span>
      )}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
