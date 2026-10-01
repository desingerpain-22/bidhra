"use client";

import { useActionState } from "react";
import { donatePage } from "@/lib/donate-content";
import { submitPartnerInquiry, type PartnerInquiryState } from "./actions";

const f = donatePage.organizations.form;

const FIELD =
  "w-full rounded-lg border border-foreground/15 bg-background/60 px-3.5 py-2.5 text-[0.9375rem] text-foreground placeholder:text-muted-foreground/70 transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20";

// Partnership enquiry form for organizations.
export function PartnerForm() {
  const [state, formAction, pending] = useActionState<PartnerInquiryState, FormData>(
    submitPartnerInquiry,
    { status: "idle" },
  );

  if (state.status === "success") {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center gap-3 rounded-2xl border border-accent/25 bg-surface/80 p-8 text-center shadow-[0_24px_60px_-44px] shadow-foreground/30">
        <span aria-hidden className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
          ✓
        </span>
        <p role="status" className="max-w-sm text-pretty text-base leading-relaxed text-foreground">
          {f.success}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="grid gap-5 rounded-2xl border border-foreground/10 bg-surface/80 p-6 shadow-[0_24px_60px_-44px] shadow-foreground/30 sm:grid-cols-2 sm:p-8"
    >
      <Field id="partner-name" label={f.name.label}>
        <input id="partner-name" name="name" required autoComplete="name" placeholder={f.name.placeholder} className={FIELD} />
      </Field>
      <Field id="partner-org" label={f.organization.label}>
        <input id="partner-org" name="organization" autoComplete="organization" placeholder={f.organization.placeholder} className={FIELD} />
      </Field>
      <Field id="partner-email" label={f.email.label} wide>
        <input id="partner-email" name="email" type="email" required autoComplete="email" placeholder={f.email.placeholder} className={FIELD} />
      </Field>
      <Field id="partner-message" label={f.message.label} wide>
        <textarea id="partner-message" name="message" required rows={4} placeholder={f.message.placeholder} className={`${FIELD} resize-y`} />
      </Field>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-[var(--highlight)] sm:col-span-2">
          {f.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:opacity-60 sm:col-span-2"
      >
        {pending ? f.submitting : f.submit}
        {!pending && (
          <span aria-hidden className="rtl:-scale-x-100">
            →
          </span>
        )}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  wide = false,
  children,
}: {
  id: string;
  label: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
