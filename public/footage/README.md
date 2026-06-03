# Footage assets — Moamen's Woodworking Shop

This folder holds the documentary footage that drives the project detail page for **Moamen's Woodworking Shop in Deir Al-Balah** (`/projects/moamen-woodworking-deir-al-balah`).

## How it works

All footage paths are centralized in `src/lib/footage.ts`. The project page renders every still and clip through the `<FootageMedia slot="…" />` component, so you don't need to touch the JSX to swap assets.

The `placeholders/` subfolder contains labeled SVG stand-ins so the layout renders cleanly before real assets are dropped in.

## How to add your real footage

1. Drop your **compressed** files into `public/footage/` (not the placeholders folder). Suggested formats:
   - **Stills**: `.jpg` or `.webp`, max ~250 KB each, longest edge ≤ 1600 px.
   - **Videos**: `.mp4` (H.264, AAC), max ~2–4 MB each, 1080p, ≤ 10 s loop, no audio.
   - For each video, also export a poster `.jpg` (same dimensions, first frame).
2. Open `src/lib/footage.ts` and replace the placeholder path with your real one, e.g.
   ```ts
   hero: {
     src: "/footage/hero.mp4",
     poster: "/footage/hero.jpg",
     // ...
   },
   ```
3. For larger payloads (>4 MB each, or many videos), move them off `/public` and host on Vercel Blob — point `src` at the Blob URL.

## Slots and expected aspect ratios

| Slot           | Aspect | Where it appears                                              |
| -------------- | ------ | ------------------------------------------------------------- |
| `hero`         | 21:9   | Full-bleed cinematic hero (video preferred, image fallback)   |
| `displacement` | 4:3    | Strip beside the "Displacement" chapter of the story          |
| `workshop`     | 4:3    | Strip beside the workshop chapter                             |
| `hands`        | 1:1    | Detail tile (hands on wood) in the story column               |
| `portrait`     | 4:5    | Moamen's portrait in the story column                         |
| `clip`         | 4:5    | Looping clip in the "From the workshop" gallery               |
| `piece-01..04` | mixed  | Finished pieces — tent furniture, fixtures, repairs, weddings |
