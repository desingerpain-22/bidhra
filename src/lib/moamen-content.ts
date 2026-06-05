import type { Locale } from "@/i18n/routing";

type Localized = Record<Locale, string>;

type RichLine = { plain: string; accent: string };
type RichLocalized = Record<Locale, RichLine>;

type Chapter = {
  numeral: string;
  label: RichLocalized;
  title: RichLocalized;
  paragraphs: Record<Locale, string[]>;
};

export const moamenContent: {
  projectNo: string;
  navMeta: Localized;
  hero: {
    eyebrow: Localized;
    title: RichLocalized;
    metaLabel: Localized;
    metaValue: Localized;
    metaTag: Localized;
    metaTagValue: Localized;
  };
  deck: { label: Localized; text: RichLocalized };
  profile: {
    portraitLabel: Localized;
    name: Localized;
    role: Localized;
    rows: { label: Localized; value: Localized }[];
    verified: Localized;
  };
  chapters: Chapter[];
  pullQuote: { body: RichLocalized; cite: Localized };
  fullBleed: { eyebrow: Localized; caption: Localized };
  workGrid: { eyebrow: RichLocalized; meta: Localized };
  feasibilityStudy: {
    eyebrow: string;
    title: string;
    source: string;
    overview: string;
    stats: { value: string; label: string }[];
    sections: { title: string; items: string[] }[];
    conclusion: string;
  };
  ask: {
    eyebrow: Localized;
    amount: string;
    body: Localized;
    items: { label: Localized; body: Localized }[];
    cta: Localized;
    secondary: Localized;
  };
  closing: { headline: RichLocalized; signature: Localized };
} = {
  projectNo: "001",
  navMeta: {
    en: "Deir Al-Balah · Gaza",
    ar: "دير البلح · غزة",
  },
  hero: {
    eyebrow: {
      en: "Project No. 001 · The First Story",
      ar: "المشروع رقم 001 · القصة الأولى",
    },
    title: {
      en: {
        plain: "He spent half his life shaping children.",
        accent: "Now he's shaping Gaza.",
      },
      ar: {
        plain: "أمضى نصف عمره يصنع جيلًا.",
        accent: "اليوم يصنع غزة.",
      },
    },
    metaLabel: { en: "Project No. 001", ar: "المشروع رقم 001" },
    metaValue: { en: "The First Story", ar: "القصة الأولى" },
    metaTag: { en: "Verified", ar: "موثّق" },
    metaTagValue: { en: "Fully documented", ar: "موثّق بالكامل" },
  },
  deck: {
    label: { en: "The Story", ar: "القصة" },
    text: {
      en: {
        plain:
          "The war took his home in Shejaiya. The schools rejected him despite 16 years of teaching. So he taught himself a new craft.",
        accent: "With his own hands.",
      },
      ar: {
        plain:
          "الحرب أخذت بيته في الشجاعية. والمدارس رفضته رغم 16 سنة من التدريس. فعلّم نفسه حرفة جديدة.",
        accent: "بيديه هو.",
      },
    },
  },
  profile: {
    portraitLabel: { en: "Portrait · Moamen · Close-up", ar: "بورتريه · مؤمن · لقطة قريبة" },
    name: { en: "Moamen Naim\nWasfi Mushtaha", ar: "مؤمن نعيم\nوصفي مشتهى" },
    role: {
      en: "Teacher · Carpenter · Father of Five",
      ar: "معلّم · نجّار · أب لخمسة",
    },
    rows: [
      {
        label: { en: "Age", ar: "العمر" },
        value: { en: "39 years", ar: "39 سنة" },
      },
      {
        label: { en: "Origin", ar: "من" },
        value: { en: "Shejaiya, North Gaza", ar: "الشجاعية، شمال غزة" },
      },
      {
        label: { en: "Displaced to", ar: "نزح إلى" },
        value: { en: "Deir Al-Balah", ar: "دير البلح" },
      },
      {
        label: { en: "Family", ar: "العائلة" },
        value: { en: "5 members", ar: "5 أفراد" },
      },
      {
        label: { en: "Experience", ar: "الخبرة" },
        value: { en: "16 yrs teaching", ar: "16 سنة تدريس" },
      },
      {
        label: { en: "Education", ar: "الدراسة" },
        value: { en: "B.A. Basic Education", ar: "بكالوريوس تعليم أساسي" },
      },
    ],
    verified: {
      en: "Verified Project · Bidhra 001",
      ar: "مشروع موثّق · بذرة 001",
    },
  },
  chapters: [
    {
      numeral: "I",
      label: {
        en: { plain: "Chapter One · Displacement", accent: "" },
        ar: { plain: "الفصل الأول · النزوح", accent: "" },
      },
      title: {
        en: {
          plain: "The war took his house.",
          accent: "It didn't take his hands.",
        },
        ar: {
          plain: "الحرب أخذت بيته.",
          accent: "لم تأخذ يديه.",
        },
      },
      paragraphs: {
        en: [
          "Moamen has five family members to take care of. The war took his house in the north of Gaza, in Shejaiya. He is now displaced to the south, in Deir Al-Balah.",
          "Like every Palestinian in Gaza, Moamen needed furniture and basic things for his tent. But instead of crying, instead of waiting for the aid, instead of waiting for the conditions to become easier, he built his own things with his own hands.",
          "He built tents for his family. Then for his relatives. And through this, Moamen became an engineer in woodworking. He gained the experience the only way he could: by doing it.",
        ],
        ar: [
          "مؤمن يعيل خمسة أفراد من عائلته. الحرب أخذت بيته في شمال غزة، في الشجاعية. واليوم نزح إلى الجنوب، إلى دير البلح.",
          "ومثل أي فلسطيني في غزة، احتاج مؤمن أثاثًا وأساسيات لخيمته. لكن بدل أن يبكي، بدل أن ينتظر المساعدات، بدل أن ينتظر أن تخفّ الظروف، صنع ما يحتاجه بيديه.",
          "بنى خيامًا لعائلته. ثم لأقاربه. ومن خلال هذا، صار مؤمن مهندسًا في النجارة. اكتسب الخبرة بالطريقة الوحيدة الممكنة: بأن يفعلها.",
        ],
      },
    },
    {
      numeral: "II",
      label: {
        en: { plain: "Chapter Two · Rejection", accent: "" },
        ar: { plain: "الفصل الثاني · الرفض", accent: "" },
      },
      title: {
        en: {
          plain: "Rejected. Not for lack of skill.",
          accent: "For lack of connections.",
        },
        ar: {
          plain: "رُفِض. ليس لقلّة المهارة.",
          accent: "بل لغياب الواسطة.",
        },
      },
      paragraphs: {
        en: [
          "Moamen tried many times to go back to teaching. He was rejected every time. Not because of his skills. Not because of his experience.",
          "He was rejected because he didn't know the right people. In a broken system, connections decide who works and who doesn't. Not talent, not years of service. In a Gaza that has lost so many teachers, Moamen should have been the first to be hired, not the last.",
          "So he made a decision. If the system wouldn't use his mind, he would use his hands.",
        ],
        ar: [
          "حاول مؤمن أكثر من مرّة أن يعود إلى التدريس. ورُفِض في كل مرّة. ليس لقلّة مهارته. ولا لقلّة خبرته.",
          "رُفِض لأنه لا يعرف الناس المناسبين. في نظام مكسور، الواسطة هي التي تقرّر من يعمل ومن لا يعمل. لا الموهبة، ولا سنوات الخدمة. وفي غزة التي فقدت معلّمين كثرًا، كان يجب أن يكون مؤمن أول من يُوظَّف، لا آخر من يُستبعد.",
          "فاتّخذ قرارًا. إن لم يستخدم النظام عقله، فسيستخدم هو يديه.",
        ],
      },
    },
    {
      numeral: "III",
      label: {
        en: { plain: "Chapter Three · The Plan", accent: "" },
        ar: { plain: "الفصل الثالث · الخطّة", accent: "" },
      },
      title: {
        en: {
          plain: "A woodworking shop.",
          accent: "For tents, homes, shops, weddings.",
        },
        ar: {
          plain: "ورشة نجارة.",
          accent: "للخيام، للبيوت، للمحلات، للأعراس.",
        },
      },
      paragraphs: {
        en: [
          "Moamen decided to open a woodworking shop.",
          "Because the lives of Gazans have become lives in tents. And wood is the only thing they can use to make furniture for their tents, for the homes they are trying to rebuild, for shops, for wedding furniture.",
          "The need is urgent. The need is everywhere.",
          "And Moamen doesn't want to do this alone. He wants to hire skilled Palestinians to work with him, to give them what no one gave him: a chance based on skill, not connections.",
        ],
        ar: [
          "قرّر مؤمن أن يفتح ورشة نجارة.",
          "لأن حياة أهل غزة أصبحت حياة في خيام. والخشب هو الشيء الوحيد الذي يستطيعون استخدامه لصناعة أثاث خيامهم، وللبيوت التي يحاولون إعادة بنائها، وللمحلات، ولأعراسهم.",
          "الحاجة عاجلة. الحاجة في كل مكان.",
          "ومؤمن لا يريد أن يفعل هذا وحده. يريد أن يوظّف فلسطينيين مهرة يعملون معه، ليمنحهم ما لم يمنحه له أحد: فرصة على أساس المهارة، لا الواسطة.",
        ],
      },
    },
  ],
  pullQuote: {
    body: {
      en: {
        plain:
          "In a system where Gaza has lost so many experienced teachers, to the war, to the conditions we live in, a man like him should be treated as ",
        accent: "valuable gold.",
      },
      ar: {
        plain:
          "في نظام فقدت فيه غزة معلّمين بخبرات كبيرة، بسبب الحرب، بسبب الظروف التي نعيشها، رجل مثله يجب أن يُعامل كـ",
        accent: "ذهب ثمين.",
      },
    },
    cite: {
      en: "On Moamen · 16 years of teaching experience",
      ar: "عن مؤمن · 16 سنة خبرة في التدريس",
    },
  },
  fullBleed: {
    eyebrow: { en: "Chapter Three · The Plan", ar: "الفصل الثالث · الخطّة" },
    caption: {
      en: "A woodworking shop for tents, homes, shops, weddings.",
      ar: "ورشة نجارة للخيام، للبيوت، للمحلات، للأعراس.",
    },
  },
  workGrid: {
    eyebrow: {
      en: { plain: "The ", accent: "work" },
      ar: { plain: "", accent: "العمل" },
    },
    meta: {
      en: "Verified Footage · Deir Al-Balah",
      ar: "تصوير موثّق · دير البلح",
    },
  },
  feasibilityStudy: {
    eyebrow: "Brief Feasibility Study",
    title: "Moamen Woodworking Project - Deir Al-Balah",
    source: "English study excerpt",
    overview:
      "The project aims to establish a small woodworking workshop specializing in the production of wooden furniture and products needed by people in Gaza, such as chairs, tables, cabinets, home furniture, and school furniture. The project focuses on practical and affordable products that meet the current needs of families and institutions.",
    stats: [
      {
        value: "1,500 NIS",
        label:
          "minimum expected profit from regular local furniture sales, approximately $520 USD",
      },
      {
        value: "$2,000+",
        label:
          "possible profit when contracts are secured with schools or institutions",
      },
      {
        value: "12 people",
        label:
          "expected direct and indirect impact through workers and their families",
      },
    ],
    sections: [
      {
        title: "Key requirements",
        items: [
          "A suitable rented workshop or workspace with access to reliable electricity.",
          "Essential equipment including a circular saw, table saw, electric drill, sanding machine, measuring tools, screwdrivers, hammers, and hand tools.",
          "Raw materials including available wood, wooden planks, nails, screws, wood glue, hinges, furniture accessories, paints, and varnish.",
        ],
      },
      {
        title: "Expected products and services",
        items: [
          "Wooden chairs, home tables, school tables, cabinets, and shelves.",
          "Custom woodworking services based on local demand.",
          "School desks and benches, with potential work furnishing facilities and institutions when contract opportunities become available.",
        ],
      },
      {
        title: "Social impact",
        items: [
          "The workshop is expected to create direct employment opportunities for at least two people alongside Moamen.",
          "It helps move families away from long-term dependence on aid by creating sustainable income opportunities.",
          "A portion of future profits will be allocated to support other small community projects.",
        ],
      },
      {
        title: "Current need",
        items: [
          "Because of the destruction and ongoing challenges in Gaza, many families are turning to wooden furniture as a practical alternative for tents and temporary living conditions.",
          "The workshop can produce chairs, school desks, cabinets, and other furniture that directly improves daily living conditions.",
        ],
      },
    ],
    conclusion:
      "Moamen Woodworking Project is a practical and sustainable small business that combines economic and social impact. It provides a stable source of income, creates employment opportunities, and produces essential furniture needed by the local community.",
  },
  ask: {
    eyebrow: { en: "The Ask · Project No. 001", ar: "المطلوب · المشروع رقم 001" },
    amount: "4,500",
    body: {
      en: "Moamen already has some of the tools and equipment. This is what he needs to fully open the shop, support his family, and start hiring skilled Palestinians.",
      ar: "مؤمن يملك بعض الأدوات والمعدات فعلًا. هذا هو ما يحتاجه ليفتتح الورشة بالكامل، ويعيل عائلته، ويبدأ بتوظيف فلسطينيين مهرة.",
    },
    items: [
      {
        label: { en: "Equipment", ar: "المعدّات" },
        body: {
          en: "Additional machines for serious production capacity.",
          ar: "مكائن إضافية لقدرة إنتاج جدّية.",
        },
      },
      {
        label: { en: "Raw Material", ar: "المادة الخام" },
        body: {
          en: "Wooden pallets sourced locally in Deir Al-Balah.",
          ar: "طبليات خشبية محلية من دير البلح.",
        },
      },
      {
        label: { en: "A Place", ar: "المكان" },
        body: {
          en: "Rent for a piece of land.",
          ar: "إيجار قطعة أرض.",
        },
      },
      {
        label: { en: "Electricity", ar: "الكهرباء" },
        body: {
          en: "Power connection for the workshop.",
          ar: "توصيل كهرباء للورشة.",
        },
      },
    ],
    cta: { en: "Fund this project", ar: "موّل هذا المشروع" },
    secondary: {
      en: "Share Moamen's story →",
      ar: "شارك قصة مؤمن →",
    },
  },
  closing: {
    headline: {
      en: {
        plain: "Moamen rebuilt his life with his own hands.",
        accent: "Now he's ready to do it for others.",
      },
      ar: {
        plain: "مؤمن أعاد بناء حياته بيديه.",
        accent: "والآن جاهز ليفعلها لغيره.",
      },
    },
    signature: {
      en: "Bidhra · Project No. 001 · Deir Al-Balah · Gaza",
      ar: "بذرة · المشروع رقم 001 · دير البلح · غزة",
    },
  },
};
