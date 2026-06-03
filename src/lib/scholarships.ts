import type { Locale } from "@/i18n/routing";

export type LocalizedString = Record<Locale, string>;

export type ScholarshipSupportType = "funding" | "guidance" | "both";

export type Scholarship = {
  slug: string;
  studentName: string;
  age: number;
  location: LocalizedString;
  university: LocalizedString;
  fieldOfStudy: LocalizedString;
  year: LocalizedString;
  story: LocalizedString;
  summary: LocalizedString;
  supportType: ScholarshipSupportType;
  goal: number;
  raised: number;
  supporters: number;
  daysLeft: number;
  verified: boolean;
  guidanceAsk?: LocalizedString;
};

export const scholarships: Scholarship[] = [
  {
    slug: "yara-medicine-cairo",
    studentName: "Yara Al-Najjar",
    age: 19,
    location: { en: "Cairo (from Khan Younis)", ar: "القاهرة (من خان يونس)" },
    university: { en: "Cairo University, Faculty of Medicine", ar: "جامعة القاهرة، كلية الطب" },
    fieldOfStudy: { en: "Medicine", ar: "الطب" },
    year: { en: "First year", ar: "السنة الأولى" },
    summary: {
      en: "Top-of-class graduate from Khan Younis accepted to medical school in Cairo. Needs full-year tuition + housing to keep her seat.",
      ar: "خريجة الأولى على الفوج من خان يونس وحصلت على قبول في كلية الطب بالقاهرة. تحتاج رسوم سنة كاملة وسكنًا للحفاظ على مقعدها.",
    },
    story: {
      en: "I'm Yara, 19, from Khan Younis. I graduated top of my class in 2024 with 98.6% under conditions you can imagine. After we lost our home in November 2023, I studied for the tawjihi by candlelight in a tent. My uncle in Egypt managed to help me leave through Rafah, and I received an acceptance to Cairo University Faculty of Medicine. The seat is mine. But I will lose it if I cannot pay first-year tuition (~$2,400) and dorm fees (~$1,200). My family has no income; my mother sells what she can in the market. I want to become a pediatrician and one day return to treat children in Gaza. Every dollar that lets me stay in this seat is a dollar that becomes years of medical care for kids who deserved better.",
      ar: "أنا يارا، 19 سنة، من خان يونس. تخرّجت الأولى على فوجي في 2024 بمعدل 98.6% تحت ظروف لا تخفى عليكم. بعد فقدان بيتنا في نوفمبر 2023، درست للتوجيهي على ضوء الشموع في خيمة. ساعدني عمّي في مصر على الخروج عبر معبر رفح، وحصلت على قبول في كلية الطب بجامعة القاهرة. المقعد لي، لكنني سأفقده إن لم أدفع رسوم السنة الأولى (~2,400$) ورسوم السكن (~1,200$). عائلتي بلا دخل؛ أمي تبيع ما تستطيع في السوق. أحلم أن أكون طبيبة أطفال وأن أعود يومًا لأعالج أطفال غزة. كل دولار يبقيني في هذا المقعد يتحوّل إلى سنوات من الرعاية الصحية لأطفال يستحقون أفضل من هذا.",
    },
    supportType: "funding",
    goal: 3600,
    raised: 1240,
    supporters: 38,
    daysLeft: 42,
    verified: true,
  },
  {
    slug: "ibrahim-cs-amman",
    studentName: "Ibrahim Khalil",
    age: 21,
    location: { en: "Amman (from Gaza City)", ar: "عمّان (من مدينة غزة)" },
    university: { en: "University of Jordan, Computer Science", ar: "الجامعة الأردنية، علوم الحاسوب" },
    fieldOfStudy: { en: "Computer Science", ar: "علوم الحاسوب" },
    year: { en: "Second year", ar: "السنة الثانية" },
    summary: {
      en: "Second-year CS student. Tuition covered. Needs a senior backend engineer to map out a freelance roadmap.",
      ar: "طالب علوم حاسوب في سنته الثانية. الرسوم مغطّاة. يحتاج مهندس باك-إند خبير لرسم خارطة طريق للعمل الحر.",
    },
    story: {
      en: "I'm Ibrahim, 21. I had finished first year of CS at the Islamic University of Gaza when the war started. The campus was destroyed in October 2023. I left through Rafah in early 2024 and the University of Jordan accepted me to continue my degree, validating my first-year credits. My second-semester tuition was covered last month by a Jordanian alumni grant, al-hamdulillah. What I cannot find is direction. I want to start taking on remote freelance work in parallel with my studies so I can pay for years three and four myself, but I have no idea where to start: which stack to specialize in, how to build a portfolio that gets noticed, how to price work, which platforms are worth the time. I need a senior backend engineer who's been remote-employed for a few years to walk me through a realistic 3-month roadmap.",
      ar: "أنا إبراهيم، 21 سنة. أنهيت السنة الأولى في علوم الحاسوب بالجامعة الإسلامية في غزة قبل اندلاع الحرب. دُمّر الحرم الجامعي في أكتوبر 2023. غادرت عبر معبر رفح في بداية 2024، وقبلتني الجامعة الأردنية لإكمال دراستي مع اعتماد الساعات. غطّت منحة من خرّيجين أردنيين رسوم الفصل الثاني الشهر الماضي، والحمد لله. ما لا أجده هو الاتجاه. أريد أن أبدأ بالعمل الحر عن بُعد بالتوازي مع دراستي لأموّل السنتين الثالثة والرابعة بنفسي، لكنني لا أعرف من أين أبدأ: أيّ مجال أتخصّص فيه، كيف أبني معرضًا يلفت الأنظار، كيف أحدّد سعري، أيّ منصّات تستحق الوقت. أحتاج مهندس باك-إند خبير عمل عن بُعد لسنوات ليأخذني عبر خارطة طريق واقعية لمدة 3 أشهر.",
    },
    supportType: "guidance",
    goal: 0,
    raised: 0,
    supporters: 0,
    daysLeft: 0,
    verified: true,
    guidanceAsk: {
      en: "Senior backend engineer with several years of remote freelance/employment experience. ~3 sessions over 3 months.",
      ar: "مهندس باك-إند خبير بسنوات من العمل الحر أو التوظيف عن بُعد. ~3 جلسات على مدى 3 أشهر.",
    },
  },
  {
    slug: "leen-engineering-ramallah",
    studentName: "Leen Saadeh",
    age: 18,
    location: { en: "Ramallah", ar: "رام الله" },
    university: {
      en: "Birzeit University, Civil Engineering",
      ar: "جامعة بيرزيت، الهندسة المدنية",
    },
    fieldOfStudy: { en: "Civil Engineering", ar: "الهندسة المدنية" },
    year: { en: "First year", ar: "السنة الأولى" },
    summary: {
      en: "Top of her class in Ramallah, accepted to Birzeit Civil Engineering. Family lost income. She needs first-year tuition.",
      ar: "الأولى على فوجها في رام الله وحصلت على قبول في الهندسة المدنية ببيرزيت. خسرت العائلة دخلها وتحتاج رسوم السنة الأولى.",
    },
    story: {
      en: "I'm Leen, 18, from Ramallah. I scored 96.4% in tawjihi and was accepted to Civil Engineering at Birzeit. My father owned a small construction supply shop; the closures and economic collapse over the past two years have left him with no income and debt. I tutor younger students for a small fee but it's not enough. First-year tuition at Birzeit is around $2,200. I want to be a structural engineer who designs schools and hospitals that stand. This is the year I cannot let go.",
      ar: "أنا لين، 18 سنة، من رام الله. حصلت على 96.4% في التوجيهي وقُبلت في الهندسة المدنية ببيرزيت. كان والدي يملك محل مواد بناء صغير، لكن الإغلاقات والانهيار الاقتصادي خلال السنتين الماضيتين أنهكا دخله وأثقلاه بالديون. أعطي دروسًا خصوصية لطلاب أصغر سنًا لكنه لا يكفي. رسوم السنة الأولى في بيرزيت حوالي 2,200$. أحلم أن أكون مهندسة إنشائية تصمم مدارس ومستشفيات صامدة. هذه السنة لا يمكنني أن أفرّط بها.",
    },
    supportType: "funding",
    goal: 2200,
    raised: 480,
    supporters: 19,
    daysLeft: 60,
    verified: true,
  },
  {
    slug: "omar-architecture-istanbul",
    studentName: "Omar Hassan",
    age: 22,
    location: { en: "Istanbul (from Jenin)", ar: "إسطنبول (من جنين)" },
    university: {
      en: "Istanbul Technical University, Architecture",
      ar: "جامعة إسطنبول التقنية، الهندسة المعمارية",
    },
    fieldOfStudy: { en: "Architecture", ar: "الهندسة المعمارية" },
    year: { en: "Final year", ar: "السنة الأخيرة" },
    summary: {
      en: "Final-year architecture student documenting threatened West Bank villages. Needs a senior architect to mentor his thesis and a heritage practice plan.",
      ar: "طالب هندسة معمارية في سنته الأخيرة يوثّق قرى مهددة في الضفة. يبحث عن مهندس معماري خبير لإرشاد رسالته وخطة افتتاح مكتب تراث.",
    },
    story: {
      en: "I'm Omar, 22, from Jenin. I'm in my final year of Architecture at ITU. My thesis documents the architectural heritage of seven Palestinian villages in the northern West Bank that are at risk of demolition: measured drawings, oral histories, photogrammetry. ITU's emergency aid covered my final-semester tuition. What I now need is a teacher: a senior architect who has worked on heritage documentation and can review my thesis arguments before the jury, then help me sketch a viable plan to bring this archive home and start a small heritage practice in Jenin after graduation.",
      ar: "أنا عمر، 22 سنة، من جنين. في سنتي الأخيرة من الهندسة المعمارية في جامعة إسطنبول التقنية. رسالتي توثّق التراث المعماري لسبع قرى فلسطينية في شمال الضفة معرضة للهدم: رسومات بالقياس، تاريخ شفوي، تصوير فوتوغرامتري. غطّت منحة الطوارئ من الجامعة رسوم الفصل الأخير. ما أحتاجه الآن هو معلّم: مهندس معماري خبير عمل في توثيق التراث، يراجع حجج الرسالة قبل اللجنة، ثم يساعدني في رسم خطة عملية لنقل هذا الأرشيف إلى الوطن وافتتاح مكتب تراث صغير في جنين بعد التخرّج.",
    },
    supportType: "guidance",
    goal: 0,
    raised: 0,
    supporters: 0,
    daysLeft: 0,
    verified: true,
    guidanceAsk: {
      en: "Senior architect with heritage documentation experience. Thesis review + heritage-practice planning, ~4 sessions.",
      ar: "مهندس معماري خبير في توثيق التراث. مراجعة الرسالة والتخطيط لافتتاح مكتب تراث، ~4 جلسات.",
    },
  },
  {
    slug: "salma-law-beirut",
    studentName: "Salma Issa",
    age: 23,
    location: { en: "Beirut (from Hebron)", ar: "بيروت (من الخليل)" },
    university: { en: "Saint Joseph University, Faculty of Law", ar: "جامعة القديس يوسف، كلية الحقوق" },
    fieldOfStudy: { en: "International Law", ar: "القانون الدولي" },
    year: { en: "Final year", ar: "السنة الأخيرة" },
    summary: {
      en: "Final-year law student on a full scholarship. No tuition needed. Looking for a Palestinian human-rights lawyer to mentor her thesis.",
      ar: "طالبة حقوق في سنتها الأخيرة بمنحة كاملة. لا تحتاج إلى رسوم. تبحث عن محامٍ فلسطيني في حقوق الإنسان لإرشادها في رسالتها.",
    },
    story: {
      en: "I'm Salma, 23, from Hebron. I'm in my final year of International Law at USJ Beirut on a full merit scholarship. Tuition is covered. What I cannot find here is a Palestinian human-rights lawyer to mentor my thesis on the legal framing of forced displacement under the Rome Statute. I need someone who has worked on actual cases at the ICC, ICJ, or UN special procedures, who can read my drafts, push back on my arguments, and tell me which sources to take seriously. Money is not the bottleneck. I need a teacher. One hour a week for two months would change the quality of this work.",
      ar: "أنا سلمى، 23 سنة، من الخليل. في سنتي الأخيرة من القانون الدولي في جامعة القديس يوسف ببيروت بمنحة استحقاق كاملة. الرسوم مغطّاة. ما لا أجده هنا هو محامٍ فلسطيني في حقوق الإنسان يرشدني في رسالتي حول التأطير القانوني للتهجير القسري وفق نظام روما الأساسي. أحتاج شخصًا اشتغل على قضايا حقيقية في المحكمة الجنائية الدولية أو محكمة العدل الدولية أو الإجراءات الخاصة للأمم المتحدة، يقرأ مسوّداتي ويناقش حججي ويوجّهني إلى المراجع الجادّة. المال ليس العقبة. أحتاج معلّمًا. ساعة أسبوعيًا لشهرين تكفي لتغيير جودة هذا العمل.",
    },
    supportType: "guidance",
    goal: 0,
    raised: 0,
    supporters: 0,
    daysLeft: 0,
    verified: true,
    guidanceAsk: {
      en: "International humanitarian law mentor, ideally with ICC/ICJ case experience. ~1 hour/week for 2 months.",
      ar: "مرشد في القانون الدولي الإنساني، يفضّل من له خبرة في قضايا أمام المحكمة الجنائية أو محكمة العدل الدولية. ساعة أسبوعيًا لمدة شهرين.",
    },
  },
  {
    slug: "mariam-pharmacy-tunis",
    studentName: "Mariam Tafesh",
    age: 20,
    location: { en: "Tunis (from Beit Lahia)", ar: "تونس (من بيت لاهيا)" },
    university: {
      en: "University of Monastir, Faculty of Pharmacy",
      ar: "جامعة المنستير، كلية الصيدلة",
    },
    fieldOfStudy: { en: "Pharmacy", ar: "الصيدلة" },
    year: { en: "Third year", ar: "السنة الثالثة" },
    summary: {
      en: "Third-year pharmacy student. Foundation grant ended after the war. Needs the next year of tuition to keep her seat.",
      ar: "طالبة صيدلة في سنتها الثالثة. انتهت منحة المؤسسة الداعمة بعد الحرب. تحتاج رسوم السنة القادمة للحفاظ على مقعدها.",
    },
    story: {
      en: "I'm Mariam, 20, from Beit Lahia. I came to Tunis in 2022 on a small foundation grant to study pharmacy. The foundation closed its scholarship program in late 2024 after their main donor pulled out, and I've been working two part-time jobs at a pharmacy and a Tunisian Arabic language school to cover rent and food. The year-three tuition is $2,800 and is due in six weeks. I have $400 saved. I need the rest to keep my seat and finish. I have one and a half years left. After graduation I want to work in humanitarian pharmacy programs in the Levant.",
      ar: "أنا مريم، 20 سنة، من بيت لاهيا. وصلت تونس عام 2022 بمنحة من مؤسسة صغيرة لدراسة الصيدلة. أوقفت المؤسسة برنامج المنح أواخر 2024 بعد انسحاب الممول الرئيسي، وأعمل منذ ذلك الحين في وظيفتين بدوام جزئي في صيدلية ومدرسة لغة تونسية لتغطية الإيجار والطعام. رسوم السنة الثالثة 2,800$ وتستحق خلال 6 أسابيع. ادّخرت 400$ فقط. أحتاج المتبقي للحفاظ على مقعدي وإكمال السنة والنصف المتبقّيتين. بعد التخرّج أريد العمل في برامج صيدلة إنسانية في بلاد الشام.",
    },
    supportType: "funding",
    goal: 2400,
    raised: 620,
    supporters: 22,
    daysLeft: 42,
    verified: true,
  },
];

export function getScholarship(slug: string): Scholarship | undefined {
  return scholarships.find((s) => s.slug === slug);
}
