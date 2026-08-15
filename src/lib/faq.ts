export type FaqEntry = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  entries: FaqEntry[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: "model",
    title: "About the Model",
    entries: [
      {
        question: "How does Bidhra actually work?",
        answer:
          "A Palestinian business owner applies, Bidhra verifies their need and ability to run the business, then supporters fund the practical things the business needs — tools, materials, equipment, workspace. As the business grows, it creates income and jobs, and once it's stable and profitable, it gives back a share so the next Palestinian business can start.",
      },
      {
        question: "What's the 20% profit-share about?",
        answer:
          "Once a supported business becomes profitable and stable, it gives back up to 20% of net profit — not immediately, and not as a loan or investment. This isn't money taken from the owner; it's how one funded business helps fund the next.",
      },
      {
        question: "What happens if the business doesn't succeed?",
        answer:
          "Like any real business, there's some risk it won't work out — that's exactly why verification focuses on the owner's real skill and experience before funding, not after. There's no repayment obligation if a business struggles; the give-back only ever comes from actual profit, never from the owner's pocket.",
      },
    ],
  },
  {
    id: "trust",
    title: "Money, Trust & Verification",
    entries: [
      {
        question: "Is Bidhra a registered charity?",
        answer:
          "Bidhra runs as a Tech for Palestine (T4P) Project, with T4P acting as fiscal sponsor for this campaign — donations are received and overseen through that relationship.",
      },
      {
        question: "Is my donation tax-deductible?",
        answer:
          "Yes — donations made through this campaign are 100% tax-deductible, since they're processed through Tech for Palestine's US nonprofit status.",
      },
      {
        question: "How do you know the money reaches Moamen?",
        answer:
          "Before funding, Bidhra verifies the business owner's identity, need, and plan through direct communication, video calls, and photos. Every project is documented afterward with receipts, photos, videos, and progress reports.",
      },
      {
        question: "Why $30,000 if Moamen's project is $4,500?",
        answer:
          "Moamen's workshop is the first approved project and proof of concept, but this campaign funds Bidhra's first cohort of businesses. The remaining funds support additional Palestinian businesses approved through the same process, each documented separately.",
      },
    ],
  },
  {
    id: "legal",
    title: "Legal Structure & Oversight",
    entries: [
      {
        question: "Who legally receives my donation?",
        answer:
          "Tech for Palestine — a California nonprofit public benefit corporation recognized under IRC Section 501(c)(3) as a public charity — receives all donations to this campaign. Funds are held in a restricted fund earmarked specifically for Bidhra's project.",
      },
      {
        question: "Does that mean Tech for Palestine controls how the money is used?",
        answer:
          "Tech for Palestine retains legal oversight and final discretion over the funds — this is a standard, required safeguard in any fiscal sponsorship so the sponsor can guarantee donations are used for legitimate charitable purposes. In practice, funds are directed to the project Bidhra proposed, and any change to that use requires Tech for Palestine's written approval.",
      },
      {
        question: "Is there a formal agreement behind this?",
        answer:
          "Yes — Bidhra operates under a signed Fiscal Sponsorship Agreement with Tech for Palestine, governed under California nonprofit law, setting out how funds are held, reported on, and used.",
      },
      {
        question: "Does Bidhra have to report on how it spends the money?",
        answer:
          "Yes. Bidhra submits an annual written report to Tech for Palestine describing the programs run and funds spent, as required by the sponsorship agreement.",
      },
    ],
  },
];
