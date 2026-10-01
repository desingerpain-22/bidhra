import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import type { ProjectMedia } from "@/lib/projects";

// Photos and videos on a standard project page, from the Supabase
// project_media table: uploaded photos and videos, plus YouTube / Vimeo
// links. The first item spans the full width; the rest sit two per row.
export function ProjectMediaGallery({
  media,
  locale,
  eyebrow,
}: {
  media: ProjectMedia[];
  locale: Locale;
  eyebrow: string;
}) {
  const items = media.filter((item) => item.kind !== "embed" || toEmbedUrl(item.url));
  if (items.length === 0) return null;

  return (
    <section className="flex flex-col gap-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {eyebrow}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <figure
            key={item.id}
            className={`flex flex-col gap-2 ${i === 0 ? "sm:col-span-2" : ""}`}
          >
            <div
              className={`relative overflow-hidden rounded-xl bg-muted ${i === 0 ? "aspect-video" : "aspect-[4/3]"}`}
            >
              <MediaItem item={item} alt={item.caption[locale]} wide={i === 0} />
            </div>
            {item.caption[locale] && (
              <figcaption className="text-sm leading-relaxed text-muted-foreground">
                {item.caption[locale]}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}

function MediaItem({
  item,
  alt,
  wide,
}: {
  item: ProjectMedia;
  alt: string;
  wide: boolean;
}) {
  if (item.kind === "video") {
    return (
      <video
        src={item.url}
        poster={item.poster}
        controls
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full bg-foreground object-contain"
      />
    );
  }

  if (item.kind === "embed") {
    return (
      <iframe
        src={toEmbedUrl(item.url)!}
        title={alt || "Video"}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    );
  }

  return (
    <Image
      src={item.url}
      alt={alt}
      fill
      sizes={wide ? "(min-width: 896px) 56rem, 100vw" : "(min-width: 896px) 28rem, (min-width: 640px) 50vw, 100vw"}
      unoptimized={!isOptimizable(item.url)}
      className="object-cover"
    />
  );
}

// YouTube / Vimeo page link → embed player URL; null for anything else, so
// only those two players can be embedded.
function toEmbedUrl(link: string): string | null {
  let url: URL;
  try {
    url = new URL(link);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\.|^m\./, "");
  let youtubeId: string | null = null;
  if (host === "youtu.be") youtubeId = url.pathname.slice(1);
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    youtubeId =
      url.searchParams.get("v") ??
      url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ??
      null;
  }
  if (youtubeId && /^[\w-]{6,20}$/.test(youtubeId)) {
    return `https://www.youtube-nocookie.com/embed/${youtubeId}`;
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const vimeoId = url.pathname.match(/(\d{6,})/)?.[1];
    if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}`;
  }
  return null;
}

// next/image can resize files from the site itself and from this project's
// Supabase storage (see next.config.ts); anything else is shown as is.
function isOptimizable(src: string): boolean {
  if (src.startsWith("/")) return true;
  const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(
    supabase && src.startsWith(`${supabase}/storage/v1/object/public/`),
  );
}
