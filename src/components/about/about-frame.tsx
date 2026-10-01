import Image from "next/image";

const BRANCH = "/hero/olive-branch.webp";

// The home hero's atmosphere behind the top of every Who We Are page: the
// warm surface glow, olive branches at the outer corners and a few small
// diamonds and dots. It runs up behind the transparent site header and
// fades out before the page content below the hero.
export function AboutAtmosphere() {
  const diamond = "absolute hidden rotate-45 border md:block";
  const dot = "absolute hidden rounded-full md:block";

  return (
    <div
      aria-hidden
      className="about-atmosphere pointer-events-none absolute inset-x-0 top-[calc(-1*var(--site-header-h))] -z-10 h-[46rem] overflow-hidden sm:h-[52rem]"
    >
      <Image
        src={BRANCH}
        alt=""
        width={900}
        height={1125}
        sizes="(min-width: 768px) 15rem, 9rem"
        className="absolute -left-12 -top-12 h-auto w-32 -rotate-6 opacity-90 sm:w-44 md:-left-14 md:-top-14 md:w-[clamp(9rem,13vw,15rem)] md:opacity-80"
      />
      <Image
        src={BRANCH}
        alt=""
        width={900}
        height={1125}
        sizes="(min-width: 768px) 14rem, 8rem"
        className="absolute -right-12 -top-14 h-auto w-28 -scale-x-100 rotate-6 opacity-90 sm:w-40 md:-right-14 md:-top-16 md:w-[clamp(8.5rem,12vw,14rem)] md:opacity-80"
      />
      <span className={`${diamond} left-[30%] top-[7.5rem] h-2 w-2 border-accent/40`} />
      <span className={`${diamond} right-[34%] top-[9rem] h-1.5 w-1.5 border-foreground/25`} />
      <span className={`${diamond} left-[6%] top-[27rem] h-1.5 w-1.5 border-accent/30`} />
      <span className={`${diamond} right-[5%] top-[24rem] h-2 w-2 border-foreground/20`} />
      <span className={`${dot} left-[22%] top-[10rem] h-1.5 w-1.5 bg-accent/30`} />
      <span className={`${dot} right-[20%] top-[6.5rem] h-1 w-1 bg-accent/40`} />
      <span className={`${dot} left-[9%] top-[19rem] h-1 w-1 bg-foreground/20`} />
    </div>
  );
}
