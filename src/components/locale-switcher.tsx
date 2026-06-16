export function LocaleSwitcher() {
  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-background/60 p-0.5 text-xs backdrop-blur sm:gap-1 sm:p-1 sm:text-sm"
    >
      <span className="rounded-full bg-primary px-2 py-1 font-medium text-primary-foreground transition sm:px-3">
        English
      </span>
    </div>
  );
}
