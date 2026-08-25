const CHUFFED_URL =
  "https://chuffed.org/donate/bidhra-project-turning-aid-into-palestinian-businesses-for-economic-recovery";

export function StickySupportCta({ label }: { label: string }) {
  return (
    <a
      href={CHUFFED_URL}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 left-4 z-40 inline-flex h-12 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:left-6"
    >
      {label}
    </a>
  );
}
