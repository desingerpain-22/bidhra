import type { Locale } from "@/i18n/routing";

export type LocalizedString = Record<Locale, string>;

export type SupportType = "funding" | "knowledge" | "both";

export type Project = {
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  story: LocalizedString;
  owner: string;
  location: LocalizedString;
  category: LocalizedString;
  supportType: SupportType;
  goal: number;
  raised: number;
  supporters: number;
  daysLeft: number;
  skillsNeeded: LocalizedString[];
  verified: boolean;
  cover?: string;
};

export const projects: Project[] = [
  {
    slug: "moamen-woodworking-deir-al-balah",
    title: {
      en: "Moamen's Woodworking Shop in Deir Al-Balah",
      ar: "ورشة نجارة مؤمن في دير البلح",
    },
    summary: {
      en: "Moamen taught for 16 years before displacement pushed him to rebuild with his hands. He now wants to open a woodworking shop for tents, homes, small businesses, and weddings in Deir Al-Balah.",
      ar: "مؤمن معلم منذ 16 سنة، وبعد النزوح اضطر أن يعيد بناء حياته بيديه. اليوم يريد فتح ورشة نجارة تخدم الخيام والبيوت والمحلات والأعراس في دير البلح.",
    },
    story: {
      en: "Displacement\n\nThe war destroyed Moamen's home in Shejaiya, in north Gaza. He moved south to Deir Al-Balah with five family members who rely on him.\n\nLike most people in Gaza right now, he needed furniture and basic supplies for their tent. Aid was slow and conditions kept getting harder, so he started making what they needed himself. He built tents for his family, then for relatives. Over time, neighbors began asking him for help with wooden work. He didn't train for it in a classroom; he learned by doing the work every day.\n\nTeaching didn't work out\n\nMoamen tried more than once to go back to teaching. He has sixteen years of experience. Each time he was turned down, not because he lacked skill, but because he didn't have the right connections. In a broken hiring system, who you know often matters more than what you can do. Gaza has already lost so many teachers. Moamen should not have been last in line.\n\nWhen the school door kept closing, he put his full effort into the trade he was already practicing.\n\nThe shop\n\nMoamen wants to open a proper woodworking shop. Many families in Gaza are living in tents while they try to rebuild. Wood is still one of the few materials people can use for tent furniture, home repairs, shop fixtures, and wedding pieces. The demand is steady and local.\n\nHe already has some tools and equipment. He needs more machines, wooden pallets for raw material, and a rented workspace so he can run the shop properly, support his family, and bring on other skilled Palestinians. He wants to hire people the way he wished he had been hired: on ability, not connections.\n\nWhat he needs: $4,500\n\nThat would cover the remaining machines, pallets, and rent so he can open fully and create work for others.",
      ar: "النزوح\n\nالحرب دمرت بيت مؤمن في حي الشجاعية شمال غزة. انتقل جنوبًا إلى دير البلح، ومعه خمسة أفراد من عائلته يعولهم.\n\nمثل كثير من الناس في غزة اليوم، احتاج أثاثًا وأساسيات لخيمتهم. المساعدات بطيئة والظروف تزداد صعوبة، فبدأ يصنع ما يحتاجونه بنفسه. بنى خيامًا لعائلته ثم لأقاربه. مع الوقت بدأ الجيران يطلبون منه أعمالًا خشبية. لم يتعلمها في معهد، بل تعلمها بالعمل يومًا بعد يوم.\n\nالعودة للتدريس لم تنجح\n\nحاول مؤمن أكثر من مرة العودة للتدريس، وهو معلم منذ 16 سنة. في كل مرة رُفِض، ليس لقلة مهارته بل لأنه لا يملك الواسطة المناسبة. في نظام توظيف مكسور، كثيرًا ما يحسم الأمر بمن تعرف لا بما تستطيع. غزة فقدت أصلًا عددًا كبيرًا من معلميها، ومؤمن لم يكن يجب أن يكون آخر من يُستبعد.\n\nعندما أُغلقت أمامه فرص التدريس، قرر أن يكرس جهده للنجارة التي كان يمارسها فعلًا.\n\nالورشة\n\nيريد مؤمن فتح ورشة نجارة حقيقية. كثير من العائلات في غزة تعيش في خيام وهي تحاول إعادة البناء. الخشب ما زال من المواد القليلة التي يمكن صنع بها أثاث الخيام، وإصلاح البيوت، وتجهيز المحلات، وقطع الأعراس. الطلب موجود ومستمر.\n\nلديه بعض الأدوات والمعدات. يحتاج مكائن إضافية، وطبليات خشبية كمادة خام، ومكانًا مستأجرًا ليعمل بشكل منظم، ويعيل عائلته، ويوظف فلسطينيين مهرة. يريد أن يمنحهم فرصة على أساس المهارة، لا الواسطة.\n\nالمبلغ المطلوب: 4,500 دولار\n\nيغطي المكائن المتبقية والطبليات والإيجار حتى يفتتح الورشة بالكامل ويوفر عملًا لغيره.",
    },
    owner: "Moamen Naim Wasfi Mushtaha",
    location: { en: "Deir Al-Balah, Gaza", ar: "دير البلح، غزة" },
    category: { en: "Carpentry", ar: "نجارة" },
    supportType: "funding",
    goal: 4500,
    raised: 0,
    supporters: 0,
    daysLeft: 60,
    skillsNeeded: [],
    verified: true,
    cover: "/projects/moamen-woodworking-deir-al-balah.png",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
