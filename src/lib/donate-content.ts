// Copy for the How to Donate page (/how-to-donate). Statements about T4P
// mirror the FAQ (src/lib/faq.ts) and the About pages; keep them in step.

// The official Chuffed campaign. It takes both one-time and monthly
// donations; replace if the campaign moves.
export const CHUFFED_URL =
  "https://chuffed.org/donate/bidhra-project-turning-aid-into-palestinian-businesses-for-economic-recovery";

export const donatePage = {
  ways: {
    eyebrow: "Ways to Give",
    title: "Choose how you want to support.",
    options: [
      {
        icon: "gift",
        title: "Give once",
        body: "A one-time gift of any amount.",
      },
      {
        icon: "calendar",
        title: "Give monthly",
        body: "Monthly support helps us plan ahead and move from one business to the next.",
        recommended: "Recommended",
      },
    ],
    secure: "Payments are processed securely by Chuffed, our official donation platform.",
    panel: {
      step: "Choose your donation",
      amountLegend: "Donation amount",
      currencyLabel: "You’re donating in",
      amounts: [100, 300, 500, 1000],
      customLabel: "Other amount in US dollars",
      customPlaceholder: "Enter amount",
      frequencyLegend: "How often",
      once: "One-off",
      monthly: "Monthly",
      summaryOnce: "You’re giving {amount} once.",
      summaryMonthly: "You’re giving {amount} every month.",
      summaryEmpty: "Choose or enter an amount.",
      continue: "Continue to Chuffed",
      confirmNote: "Chuffed opens in a new tab, where you confirm your amount, choose One-off or Monthly again, and pay securely.",
    },
  },
  trust: {
    eyebrow: "How to Donate",
    title: "One official place to donate.",
    body: "Bidhra receives donations through our official Chuffed campaign. Bidhra is a Tech for Palestine project, with T4P providing fiscal sponsorship and financial oversight.",
    points: [
      { icon: "shield", title: "Bidhra official campaign", body: "Donate through our official Chuffed campaign." },
      { icon: "people", title: "Fiscal sponsorship through T4P", body: "Bidhra is a Tech for Palestine project." },
      { icon: "document", title: "Clear financial oversight", body: "Your support is managed with transparency and care." },
    ],
    cta: "Go to the official campaign",
    // Body copy with its two inline links.
    bodyParts: [
      "Bidhra receives donations through our official ",
      { text: "Chuffed campaign", href: "chuffed" },
      ". ",
      { text: "Bidhra is a Tech for Palestine project", href: "/about/transparency" },
      ", with T4P providing fiscal sponsorship and financial oversight.",
    ] as Array<string | { text: string; href: string }>,
    handNote: "Tools today. Brighter tomorrow.",
    image: {
      src: "/donate/jerusalem.jpg",
      alt: "The Dome of the Rock and the Old City of Jerusalem at sunset",
    },
  },
  organizations: {
    eyebrow: "For Organizations",
    titleLines: ["Interested in supporting", "Bidhra at a larger scale?"],
    body: "We welcome conversations with foundations, nonprofits, companies, and organizations interested in supporting Palestinian businesses, funding future projects, or exploring a longer-term partnership.",
    form: {
      name: { label: "Name", placeholder: "Your name" },
      organization: { label: "Organization", placeholder: "Your organization" },
      email: { label: "Email", placeholder: "you@organization.org" },
      message: {
        label: "How would you like to support Bidhra?",
        placeholder: "Tell us about your interest or ideas…",
      },
      submit: "Partner with Bidhra",
      submitting: "Sending…",
      success: "Thank you. We’ve received your message and will be in touch.",
      error: "Please fill in your name, a valid email, and a short message.",
    },
    handNote: "Stronger businesses. Stronger communities.",
  },
};
