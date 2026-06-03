import Image from "next/image";
import { footage, type FootageKey } from "@/lib/footage";

type CommonProps = {
  slot: FootageKey;
  className?: string;
  rounded?: boolean;
  priority?: boolean;
  sizes?: string;
};

type ImageProps = CommonProps & {
  kind?: "image";
  fit?: "cover" | "contain";
};

type VideoProps = CommonProps & {
  kind: "video";
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
};

type Props = ImageProps | VideoProps;

export function FootageMedia(props: Props) {
  const slot = footage[props.slot];
  const aspectStyle = { aspectRatio: slot.aspect } as React.CSSProperties;
  const wrapperClass = [
    "relative w-full overflow-hidden bg-muted",
    props.rounded === false ? "" : "rounded-2xl",
    props.className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (props.kind === "video") {
    const hasVideo = !!slot.src;
    return (
      <div className={wrapperClass} style={aspectStyle}>
        {hasVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={slot.src ?? undefined}
            poster={slot.poster ?? undefined}
            autoPlay={props.autoPlay ?? true}
            loop={props.loop ?? true}
            muted={props.muted ?? true}
            playsInline
            preload="metadata"
            aria-label={slot.alt}
          />
        ) : slot.poster ? (
          <Image
            src={slot.poster}
            alt={slot.alt}
            fill
            sizes={props.sizes ?? "100vw"}
            priority={props.priority}
            className="object-cover"
          />
        ) : (
          <FootagePlaceholderTile label={props.slot} />
        )}
      </div>
    );
  }

  const fit = props.fit ?? "cover";
  return (
    <div className={wrapperClass} style={aspectStyle}>
      {slot.src ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={props.sizes ?? "100vw"}
          priority={props.priority}
          className={fit === "contain" ? "object-contain" : "object-cover"}
        />
      ) : (
        <FootagePlaceholderTile label={props.slot} />
      )}
    </div>
  );
}

function FootagePlaceholderTile({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/40">
      <span className="rounded-full border border-border bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
