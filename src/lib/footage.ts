export type FootageSlot = {
  src: string | null;
  poster: string | null;
  alt: string;
  aspect: string;
};

const placeholder = (slot: string) => `/footage/placeholders/${slot}.svg`;

export const footage = {
  portrait: {
    src: "/footage/portrait.jpg",
    poster: null,
    alt: "Moamen, portrait close-up",
    aspect: "4/5",
  },
  chapter1: {
    src: "/footage/chapter-1.mp4",
    poster: "/footage/chapter-1.jpg",
    alt: "Tent in Deir Al-Balah, walking through rubble",
    aspect: "9/16",
  },
  chapter2: {
    src: null,
    poster: "/footage/chapter-2.jpg",
    alt: "Classroom door, old ID photo",
    aspect: "16/9",
  },
  chapter3: {
    src: null,
    poster: "/footage/chapter-3.jpg",
    alt: "Tools, wood pallets, sketches of the shop",
    aspect: "3/4",
  },
  fullBleed: {
    src: null,
    poster: placeholder("full-bleed"),
    alt: "Moamen at work: hands, sawdust, wood",
    aspect: "16/9",
  },
  clip01: {
    src: null,
    poster: placeholder("clip-01"),
    alt: "Workshop wide shot",
    aspect: "16/10",
  },
  clip02: {
    src: null,
    poster: placeholder("clip-02"),
    alt: "Hands at work",
    aspect: "4/5",
  },
  clip03: {
    src: null,
    poster: placeholder("clip-03"),
    alt: "Detail shot",
    aspect: "4/5",
  },
  clip04: {
    src: null,
    poster: placeholder("clip-04"),
    alt: "Tools",
    aspect: "4/5",
  },
  clip05: {
    src: null,
    poster: placeholder("clip-05"),
    alt: "Moamen speaks",
    aspect: "16/10",
  },
} satisfies Record<string, FootageSlot>;

export type FootageKey = keyof typeof footage;
