import Image from "next/image";
import type { ReactNode } from "react";

// Wraps the content below a Who We Are page's hero and places the Palestine
// map in tatreez embroidery once against its outer edge: partly off-canvas,
// faint and multiplied into the cream, so it reads as a quiet identity
// mark. Hidden below lg, where the text needs the width.
export function WithTatreezMap({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute -end-16 top-24 -z-10 hidden w-[clamp(11rem,15vw,15rem)] opacity-[0.16] mix-blend-multiply lg:block xl:-end-10"
      >
        <Image
          src="/about/tatreez-map.webp"
          alt=""
          width={640}
          height={2045}
          sizes="15rem"
          className="h-auto w-full"
        />
      </div>
      {children}
    </div>
  );
}
