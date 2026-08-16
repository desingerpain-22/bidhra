export type AboutChapter = {
  id: string;
  numeral: string;
  navLabel: string;
  heading: string;
  lede?: string;
  paragraphs: string[];
  image?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  quote?: { body: string; attribution: string };
};

export const aboutChapters: AboutChapter[] = [
  {
    id: "trust",
    numeral: "01",
    navLabel: "Trust & Sponsorship",
    heading: "Trust and Sponsorship",
    imageSrc: "/about/t4p-bidhra.png",
    imageAlt: "Tech for Palestine and Bidhra",
    paragraphs: [
      "Bidhra is a Tech for Palestine Project, sponsored by Tech for Palestine.",
      "This sponsorship helps provide structure, accountability, and a trusted fundraising path for supporters who want to contribute to Bidhra's work.",
      "Funds raised through Bidhra are used to support approved Palestinian business projects. Each project is selected, followed, and documented so supporters can see how their donations are being turned into real business activity on the ground.",
    ],
  },
  {
    id: "mission",
    numeral: "02",
    navLabel: "Our Mission",
    heading: "Our Mission",
    lede: "To change the way the world supports Palestinians: from survival-based aid to opportunity-based rebuilding.",
    paragraphs: [
      "Bidhra's mission is to turn aid and donations into real Palestinian businesses that can create income, jobs, dignity, and long-term economic recovery.",
    ],
  },
  {
    id: "vision",
    numeral: "03",
    navLabel: "Our Vision",
    heading: "Our Vision",
    lede: "A future where Palestinians support Palestinians through businesses, jobs, and reinvestment.",
    paragraphs: [
      "Bidhra's long-term vision is to build a sustainable Palestinian economic engine where one supported business can help fund the next, and where every donation becomes a seed for future growth.",
    ],
  },
  {
    id: "story",
    numeral: "04",
    navLabel: "Why Bidhra Exists",
    heading: "Why Bidhra Exists",
    image: true,
    paragraphs: [
      "Bidhra did not start from an idea. It started from people I lost, and from the dreams that remained alive in other Palestinian families.",
      "As a Palestinian living in Gaza, I know aid is necessary. But I also know that survival is not the same as rebuilding.",
    ],
    quote: {
      body: "Bidhra exists because Palestinians need more than temporary support. They need the chance to rebuild their lives, their work, their businesses, and their future — with dignity.",
      attribution: "— Mohammed Hosni, Founder",
    },
  },
];

export const aboutNavItems: Array<{ id: string; label: string }> = [
  ...aboutChapters.map((c) => ({ id: c.id, label: c.navLabel })),
  { id: "values", label: "Our Values" },
];

export const aboutValues: Array<{
  word: string;
  body: string;
  spanFull?: boolean;
}> = [
  {
    word: "Humanity",
    body: "Bidhra starts with people, not numbers. Every project begins with a real person, a real family, and a real need to rebuild.",
  },
  {
    word: "Dignity",
    body: "We do not believe Palestinians should be seen only as people waiting for aid. Bidhra exists to support work, independence, production, and the ability to stand again.",
  },
  {
    word: "Proof",
    body: "Trust is not built by words. Trust is built by proof. Every supported project should be documented through updates, photos, videos, receipts, and progress reports.",
  },
  {
    word: "Responsibility",
    body: "Every donation is a responsibility. Bidhra treats every contribution as something that must be protected, documented, and turned into real impact.",
  },
  {
    word: "Sustainability",
    body: "The goal is not temporary relief only. The goal is long-term recovery: businesses that create income, jobs, and future reinvestment.",
    spanFull: true,
  },
];
