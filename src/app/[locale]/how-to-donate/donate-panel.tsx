"use client";

import { useId, useState } from "react";
import { CHUFFED_URL, donatePage } from "@/lib/donate-content";

const p = donatePage.ways.panel;

type Frequency = "once" | "monthly";

// Donation panel shaped like the first step of Chuffed's form. Chuffed's
// own form can't be embedded reliably (its Cloudflare challenge page refuses
// to be framed), and Chuffed takes no amount in the link, so choosing here
// only prepares the donor: the amount and frequency are confirmed again on
// Chuffed, which the panel says plainly. Styled in Chuffed's own form
// colours (sampled from its donation page) so the hand-off feels continuous.
export function DonatePanel() {
  const [preset, setPreset] = useState<number | null>(p.amounts[1]);
  const [custom, setCustom] = useState("");
  // Monthly first: ongoing support is what lets Bidhra plan ahead.
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const customId = useId();

  const customValue = Number(custom);
  const amount = custom && customValue > 0 ? customValue : preset;
  const summary =
    amount === null
      ? p.summaryEmpty
      : (frequency === "monthly" ? p.summaryMonthly : p.summaryOnce).replace(
          "{amount}",
          `$${amount.toLocaleString("en-US")}`,
        );

  return (
    <div className="rounded-2xl border border-[#e3e3e3] bg-white p-5 text-[#333] shadow-[0_24px_60px_-40px] shadow-foreground/35 sm:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#333]">{p.step}</p>

      <fieldset className="mt-5 overflow-hidden rounded-lg border border-[#ccc] bg-white">
        <legend className="sr-only">{p.amountLegend}</legend>
        <div className="flex items-center justify-between border-b border-[#ccc] px-4 py-3 text-sm">
          <span className="font-semibold text-[#555]">{p.currencyLabel}</span>
          <span className="font-bold text-[#333]">USD</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {p.amounts.map((value, i) => {
            const active = !custom && preset === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setPreset(value);
                  setCustom("");
                }}
                className={`border-[#ccc] py-3.5 text-[0.9375rem] font-bold transition focus-visible:relative focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1fa8df] ${
                  i % 2 ? "border-s" : ""
                } ${i > 1 ? "max-sm:border-t" : ""} sm:border-s sm:first:border-s-0 ${
                  active ? "bg-[#1fa8df] text-white" : "text-[#333] hover:bg-[#e8f6fc]"
                }`}
              >
                ${value.toLocaleString("en-US")}
              </button>
            );
          })}
        </div>
        <label
          htmlFor={customId}
          className="flex items-center gap-2 border-t border-[#ccc] px-4 py-3 focus-within:bg-[#e8f6fc]"
        >
          <span className="font-bold text-[#333]">$</span>
          <input
            id={customId}
            type="number"
            inputMode="decimal"
            min={1}
            step="any"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder={p.customPlaceholder}
            aria-label={p.customLabel}
            className="w-full bg-transparent text-[0.9375rem] font-semibold text-[#333] placeholder:text-[#bbb] focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </label>
      </fieldset>

      <div
        role="radiogroup"
        aria-label={p.frequencyLegend}
        className="mt-4 grid grid-cols-2 overflow-hidden rounded-lg border border-[#ccc]"
      >
        {(["once", "monthly"] as const).map((value) => {
          const active = frequency === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setFrequency(value)}
              className={`py-3.5 text-[0.9375rem] font-bold transition focus-visible:relative focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1fa8df] ${
                active ? "bg-[#1fa8df] text-white" : "bg-white text-[#333] hover:bg-[#e8f6fc]"
              }`}
            >
              {value === "once" ? p.once : p.monthly}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4 rounded-lg bg-[#e8f6fc] px-4 py-3 text-center text-[0.9375rem] font-semibold text-[#333]">
        {summary}
      </p>

      <a
        href={CHUFFED_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-4 flex min-h-13 w-full items-center justify-center gap-2 rounded-lg bg-[#1fa8df] px-7 py-3.5 text-base font-bold text-white transition hover:bg-[#1896c8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1fa8df]"
      >
        {p.continue}
        <span aria-hidden className="rtl:-scale-x-100">
          →
        </span>
      </a>

      <p className="mt-4 text-center text-sm leading-relaxed text-[#666]">{p.confirmNote}</p>
    </div>
  );
}
