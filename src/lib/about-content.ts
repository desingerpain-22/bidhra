// Copy for the Who We Are pages (/about, /about/our-story, /about/team,
// /about/transparency). Statements about sponsorship, verification and fund
// use mirror the FAQ (src/lib/faq.ts); keep the two in step.

export type AboutHeroImage = {
  src: string;
  alt: string;
  // CSS object-position for the crop.
  position?: string;
  // Frame aspect class for the hero photo (default aspect-[5/4]).
  aspect?: string;
};

export const DONATE_URL =
  "https://chuffed.org/donate/bidhra-project-turning-aid-into-palestinian-businesses-for-economic-recovery";

export const FUND_CTA = "Fund a Palestinian Business";

// About Bidhra ---------------------------------------------------------------

export const aboutPage = {
  eyebrow: "About Bidhra",
  titleLines: ["What was lost", "was not the ability", "to work."],
  intro:
    "Palestinians still have the skills, experience, and determination to build. What many have lost are the tools, materials, equipment, and businesses that made that work possible.",
  image: {
    src: "/about/tatreez-hands.png",
    alt: "Hands resting on a Palestinian dress embroidered with red tatreez",
    position: "45% 50%",
  } satisfies AboutHeroImage,
  // A square detail of the same photo, pre-cropped so the small card stays
  // sharp.
  secondaryImage: {
    src: "/about/tatreez-hands-detail.jpg",
    alt: "Close-up of a hand holding hand-stitched tatreez embroidery",
  } satisfies AboutHeroImage,
  note: "Real businesses. Stronger futures.",
  principles: [
    {
      icon: "people",
      title: "A practical approach",
      body: "We help provide the means to start again.",
    },
    {
      icon: "local",
      title: "Led by Palestinians",
      body: "Built with and for Palestinian communities.",
    },
    {
      icon: "sprout",
      title: "A stronger tomorrow",
      body: "One business becomes another.",
    },
    {
      icon: "loop",
      title: "Long-term impact",
      body: "Businesses, jobs, and stronger communities.",
    },
  ],
  mission: {
    label: "Our mission",
    lede: "To change the way the world supports Palestinians: from survival-based aid to opportunity-based rebuilding.",
    body: "Bidhra's mission is to turn aid and donations into real Palestinian businesses that can create income, jobs, dignity, and long-term economic recovery.",
  },
  vision: {
    label: "Our vision",
    lede: "A future where Palestinians support Palestinians through businesses, jobs, and reinvestment.",
    body: "Bidhra's long-term vision is to build a sustainable Palestinian economic engine where one supported business can help fund the next, and where every donation becomes a seed for future growth.",
  },
  valuesLabel: "Our values",
  values: [
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
    },
  ],
};

// Our Story -------------------------------------------------------------------

export const storyPage = {
  eyebrow: "Our Story",
  titleLines: ["Bidhra started", "with people, not", "a business plan."],
  intro:
    "This is the story of what I experienced, the people who shaped this idea, and why I believe Palestinians need the means to work and build again.",
  image: {
    src: "/about/our-story-photos.png",
    alt: "Hands holding up family photographs over the ruins of Gaza at sunset",
    position: "50% 45%",
    aspect: "aspect-[16/10]",
  } satisfies AboutHeroImage,
  // The founder's account, in order. Each chapter is one step of the story.
  chapters: [
    {
      id: "lost",
      marker: "September 2025",
      heading: "It started from people I lost.",
      paragraphs: [
        "Bidhra did not start from an idea. It started from people I lost.",
        "In September 2025, I lost the Al-Husari family — a family full of ambition, kindness, and life. They were bombed in the late hours of the night while sleeping in their multi-floor home. Among them were Yara, a doctor, and Ahmad, an engineer. I had sat with them and listened to their goals and dreams — where they wanted to take their lives once the war ended. I saw myself in them: in their ambition, their passion, their hope. Ahmad remained under the rubble for two days. He called for help from his phone, but help arrived too late.",
      ],
    },
    {
      id: "question",
      marker: "The question",
      heading: "How do dreams continue?",
      paragraphs: [
        "The dreams of the Al-Husari family left with them. But thousands of dreams remain alive in other Palestinian families. So how can those dreams continue, when the people carrying them have lost everything they need to start again?",
      ],
    },
    {
      id: "broken",
      marker: "What the war broke",
      heading: "They lost the means, not the will.",
      paragraphs: [
        "Before the war, the path was clear for many Palestinians: study, learn a craft, or start working early, and slowly turn that effort into something real — a piece of land, a home, a shop, tools, or a small business. But the war broke that path. Many Palestinians didn't only lose their homes. They lost the land, the tools, the business, and the income they'd spent years building.",
        "The problem today isn't that Palestinians don't want to work. It's that many of them no longer have what they need to start again. So how can they start again when everything they built is gone?",
      ],
      image: {
        src: "/footage/portrait-4.jpg",
        alt: "Moamen with his students in Gaza, during his sixteen years as a teacher",
        caption:
          "Moamen, Bidhra's first project, taught for sixteen years before the war forced him to rebuild with his hands.",
      },
    },
    {
      id: "why",
      marker: "Why Bidhra exists",
      heading: "Turning donations into an economic engine.",
      paragraphs: [
        "This is why I built Bidhra: to turn donations into a sustainable economic engine for Palestinians. Part of the funding goes directly to real Palestinian businesses on the ground, and when a supported business succeeds, it shares a percentage of its profits to help the next business that needs it — building sustainable solutions, creating jobs, and reducing dependence on aid.",
        "Bidhra is not against aid or donations — they matter for the child left alone, for the elderly person left alone. But I believe aid alone isn't effective for most Palestinians in the way it's being used now.",
      ],
    },
  ],
  quote: {
    body: "Bidhra exists because Palestinians need more than temporary support. They need the chance to rebuild their lives, their work, their businesses, and their future — with dignity.",
    name: "Mohammed Hosni",
    role: "Founder & CEO",
    image: {
      // Pre-cropped to the portrait frames: cropping the wide original in
      // the browser made next/image fetch too small a file, so it looked soft.
      src: "/about/mohammed-hosni-portrait.jpg",
      alt: "Mohammed Hosni, founder of Bidhra",
    } satisfies AboutHeroImage,
  },
  presentation: {
    href: "/about/bidhra-presentation.pdf",
    label: "Read the Bidhra presentation",
  },
};

// Our Team --------------------------------------------------------------------

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image?: AboutHeroImage;
  link?: { href: string; label: string };
};

// Add people here as the team grows; the grid lays itself out.
export const teamMembers: TeamMember[] = [
  {
    name: "Mohammed Hosni",
    role: "Founder & CEO",
    bio: "Mohammed founded Bidhra in April 2026. He leads the project and oversees its work, finances, and reporting to T4P.",
    image: {
      // Pre-cropped to the portrait frames: cropping the wide original in
      // the browser made next/image fetch too small a file, so it looked soft.
      src: "/about/mohammed-hosni-portrait.jpg",
      alt: "Mohammed Hosni, founder of Bidhra",
    },
    link: {
      href: "https://calendly.com/mohammedhosni/mohammedhosnichat",
      label: "Book a call with Mohammed",
    },
  },
];

// Advisors, shown on the Our Team page below the team. Add people here;
// each gets one wide profile.
export type Advisor = {
  name: string;
  role: string;
  bio: string;
  image: AboutHeroImage;
  linkedin?: string;
};

export const advisors: Advisor[] = [
  {
    name: "Walaa Hamdan",
    role: "Advisor · Entrepreneurship",
    bio: "Walaa brings extensive experience supporting founders, startups, and entrepreneurship programs across the region. She advises Bidhra on business readiness, strategy, and building stronger pathways for Palestinian entrepreneurs.",
    image: {
      src: "/about/walaa-hamdan.jpg",
      alt: "Walaa Hamdan",
      position: "50% 30%",
    },
    linkedin: "https://www.linkedin.com/in/walaahamdan/",
  },
];

export const teamPage = {
  eyebrow: "Our Team",
  titleLines: ["The people behind", "Bidhra."],
  intro:
    "Bidhra is built by people who believe Palestinians should have the chance to work, build, and create a future in Palestine.",
  gridLabel: "Meet the team",
  advisors: {
    eyebrow: "Advisors",
    titleLines: ["Guidance from people", "who believe in the work."],
    intro:
      "Our advisors bring experience, perspective, and honest guidance as Bidhra grows.",
    linkLabel: "View on LinkedIn",
  },
};

// Trust & Transparency -----------------------------------------------------------

export const transparencyPage = {
  eyebrow: "Trust & Transparency",
  titleLines: ["Trust should be", "something you can see."],
  intro:
    "We work with Tech for Palestine (T4P), which acts as Bidhra's fiscal sponsor and provides financial oversight. Every project is verified before it is funded and documented after, so you can follow what your donation becomes.",
  areas: [
    {
      icon: "shield",
      id: "sponsorship",
      title: "Fiscal sponsorship",
      points: [
        "Bidhra runs as a Tech for Palestine project. Tech for Palestine, a California nonprofit public benefit corporation recognized under IRC Section 501(c)(3) as a public charity, receives all donations to this campaign.",
        "Bidhra operates under a signed Fiscal Sponsorship Agreement with Tech for Palestine, governed under California nonprofit law, setting out how funds are held, reported on, and used.",
        "Donations are tax-deductible, since they are processed through Tech for Palestine's US nonprofit status.",
      ],
    },
    {
      icon: "document",
      id: "funds",
      title: "How funds are used",
      points: [
        "Funds are held in a restricted fund earmarked specifically for Bidhra's project, and spent on making each business operational: tools, materials, equipment, and workspace. They are not handed over as direct cash assistance.",
        "The business owner identifies what the business needs and makes the purchases on the ground; Bidhra reviews every expense against the agreed budget categories.",
        "Tech for Palestine retains legal oversight and final discretion over the funds. Any change to how they are used requires its written approval.",
      ],
    },
    {
      icon: "check",
      id: "verification",
      title: "Project verification",
      points: [
        "Before any funding, Bidhra verifies the business owner's identity, need, and plan through direct communication, video calls, and photos.",
        "Verification focuses on the owner's real skill and experience, before funding rather than after. There are no anonymous projects.",
      ],
    },
    {
      icon: "image",
      id: "documentation",
      title: "Documentation & updates",
      points: [
        "Every project is documented with receipts and proof of purchase, photos, videos, and progress reports.",
        "Bidhra submits an annual written report to Tech for Palestine describing the programs run and funds spent, as required by the sponsorship agreement.",
      ],
    },
  ],
};
