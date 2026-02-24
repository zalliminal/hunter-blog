export type ChangelogType = "feat" | "fix" | "patch" | "chore" | "rebrand";

export type ChangelogEntry = {
  date: string;
  type: ChangelogType;
  title: { en: string; fa: string };
  description?: { en: string; fa: string };
  author: string;
  important?: boolean;
};

// Only feat, fix, rebrand are shown by default — patch/chore are filtered out in the UI.
export const CHANGELOG_DATA: ChangelogEntry[] = [
  // ── Feb 24, 2026 ──────────────────────────────────────────────────────────
  {
    date: "2026-02-24",
    type: "feat",
    title: { en: "Changelog Page", fa: "صفحه تغییرات" },
    description: {
      en: "Dedicated changelog page to track all updates and improvements.",
      fa: "صفحه اختصاصی برای پیگیری همه به‌روزرسانی‌ها و بهبودها.",
    },
    author: "zalliminal",
    important: true,
  },
  {
    date: "2026-02-24",
    type: "feat",
    title: { en: "Not Found Page", fa: "صفحه ۴۰۴" },
    description: {
      en: "Custom 404 not found page with better UX.",
      fa: "صفحه ۴۰۴ سفارشی با تجربه کاربری بهتر.",
    },
    author: "zalliminal",
  },
  {
    date: "2026-02-24",
    type: "feat",
    title: { en: "MDX Callout Components", fa: "کامپوننت‌های Callout برای MDX" },
    description: {
      en: "Note, Tip, Warning, Danger, Info, Legal and AI callout blocks for articles.",
      fa: "بلاک‌های Note، Tip، Warning، Danger، Info، Legal و AI برای مقالات.",
    },
    author: "zalliminal",
    important: true,
  },
  {
    date: "2026-02-24",
    type: "feat",
    title: { en: "Glossary Difficulty Colors", fa: "رنگ‌بندی سطح دشواری واژه‌نامه" },
    description: {
      en: "Different color coding for beginner, intermediate and advanced glossary terms.",
      fa: "رنگ‌بندی متفاوت برای اصطلاحات مبتدی، متوسط و پیشرفته در واژه‌نامه.",
    },
    author: "zalliminal",
  },

  // ── Feb 23, 2026 ──────────────────────────────────────────────────────────
  {
    date: "2026-02-23",
    type: "feat",
    title: { en: "Glossary Page", fa: "صفحه واژه‌نامه" },
    description: {
      en: "Security glossary with essential terms, search, filters and drawer detail view.",
      fa: "واژه‌نامه امنیتی با اصطلاحات پایه، جستجو، فیلتر و نمای جزئیات drawer.",
    },
    author: "zalliminal",
    important: true,
  },

  // ── Feb 21, 2026 ──────────────────────────────────────────────────────────
  {
    date: "2026-02-21",
    type: "fix",
    title: { en: "Authors Page & URL Fixes", fa: "صفحه نویسندگان و رفع URL‌ها" },
    description: {
      en: "Added main authors page, fixed broken URLs, fixed TOC and back-to-top overlap on mobile.",
      fa: "صفحه اصلی نویسندگان اضافه شد، URL‌های معیوب رفع شد، تداخل TOC و دکمه بازگشت به بالا در موبایل برطرف شد.",
    },
    author: "zalliminal",
    important: true,
  },
  {
    date: "2026-02-21",
    type: "fix",
    title: { en: "Search Dialog Responsive", fa: "واکنش‌گرا شدن دیالوگ جستجو" },
    description: {
      en: "Search dialog now works correctly on all screen sizes.",
      fa: "دیالوگ جستجو اکنون روی همه اندازه‌های صفحه درست کار می‌کند.",
    },
    author: "zalliminal",
  },

  // ── Feb 20, 2026 ──────────────────────────────────────────────────────────
  {
    date: "2026-02-20",
    type: "feat",
    title: { en: "Author Profile Pages", fa: "صفحات پروفایل نویسندگان" },
    description: {
      en: "Dedicated profile pages for each author with bio, background and their published posts.",
      fa: "صفحات پروفایل اختصاصی برای هر نویسنده با بیو، پس‌زمینه و پست‌های منتشرشده.",
    },
    author: "zalliminal",
    important: true,
  },
  {
    date: "2026-02-20",
    type: "fix",
    title: { en: "Farsi UI Polish", fa: "بهبود رابط فارسی" },
    description: {
      en: "Enhanced Farsi content in UI, improved RTL layout consistency across pages.",
      fa: "محتوای فارسی در رابط کاربری بهبود یافت، ثبات چیدمان RTL در صفحات ارتقا پیدا کرد.",
    },
    author: "zalliminal",
  },

  // ── Feb 19, 2026 ──────────────────────────────────────────────────────────
  {
    date: "2026-02-19",
    type: "rebrand",
    title: { en: "Brand Update & Team Cards", fa: "به‌روزرسانی برند و کارت‌های تیم" },
    description: {
      en: "New brand identity, team cards on homepage, updated social icons.",
      fa: "هویت برند جدید، کارت‌های تیم در صفحه اصلی، آیکون‌های شبکه اجتماعی به‌روز شدند.",
    },
    author: "zalliminal",
    important: true,
  },

  // ── Feb 18, 2026 ──────────────────────────────────────────────────────────
  {
    date: "2026-02-18",
    type: "feat",
    title: { en: "Loading Animations", fa: "انیمیشن‌های بارگذاری" },
    description: {
      en: "Page transition animations, skeleton loaders on blog slug, redesigned search dialog.",
      fa: "انیمیشن انتقال صفحه، skeleton loader روی صفحه پست، بازطراحی دیالوگ جستجو.",
    },
    author: "zalliminal",
  },
  {
    date: "2026-02-18",
    type: "patch",
    title: { en: "Metadata & Build Fixes", fa: "رفع metadata و build" },
    description: {
      en: "Updated metadata, fixed build error for search params, sitemap and RSS now use env URL.",
      fa: "metadata به‌روز شد، خطای build برای search params رفع شد، sitemap و RSS از env URL استفاده می‌کنند.",
    },
    author: "zalliminal",
  },

  // ── Feb 17, 2026 ──────────────────────────────────────────────────────────
  {
    date: "2026-02-17",
    type: "feat",
    title: { en: "Advanced Search & Categories", fa: "جستجوی پیشرفته و دسته‌بندی‌ها" },
    description: {
      en: "Advanced search page with filters by category, tags and authors. Four main categories added. Navbar redesigned with dropdown for search, categories and tags.",
      fa: "صفحه جستجوی پیشرفته با فیلتر دسته‌بندی، تگ‌ها و نویسندگان. چهار دسته‌بندی اصلی اضافه شد. navbar با dropdown برای جستجو، دسته‌بندی‌ها و تگ‌ها بازطراحی شد.",
    },
    author: "zalliminal",
    important: true,
  },
  {
    date: "2026-02-17",
    type: "fix",
    title: { en: "Search Race Condition", fa: "رفع race condition جستجو" },
    description: {
      en: "Fixed search input race condition and added proper Suspense boundary.",
      fa: "race condition ورودی جستجو رفع شد و Suspense boundary مناسب اضافه شد.",
    },
    author: "zalliminal",
  },

  // ── Feb 16, 2026 ──────────────────────────────────────────────────────────
  {
    date: "2026-02-16",
    type: "fix",
    title: { en: "Terminal Layout Shift", fa: "رفع جابجایی چیدمان ترمینال" },
    description: {
      en: "Responsive terminal height to prevent layout shift on mobile.",
      fa: "ارتفاع واکنش‌گرای ترمینال برای جلوگیری از جابجایی چیدمان در موبایل.",
    },
    author: "zalliminal",
  },

  // ── Feb 15, 2026 ──────────────────────────────────────────────────────────
  {
    date: "2026-02-15",
    type: "feat",
    title: { en: "Goal Section", fa: "بخش اهداف" },
    description: {
      en: "New goal section with 4 layout variants and improved contact UX.",
      fa: "بخش اهداف جدید با ۴ حالت چیدمان و بهبود تجربه تماس.",
    },
    author: "zalliminal",
  },

  // ── Feb 13, 2026 ──────────────────────────────────────────────────────────
  {
    date: "2026-02-13",
    type: "feat",
    title: { en: "About Card", fa: "کارت درباره ما" },
    description: {
      en: "Added about card to homepage, cleanup and CI mirror workflow.",
      fa: "کارت درباره ما به صفحه اصلی اضافه شد، پاکسازی کد و راه‌اندازی CI mirror.",
    },
    author: "zalliminal",
  },

  // ── Feb 12, 2026 ──────────────────────────────────────────────────────────
  {
    date: "2026-02-12",
    type: "feat",
    title: { en: "MVP Release", fa: "انتشار MVP" },
    description: {
      en: "Full MVP launch of the KavLabs hunter-blog platform.",
      fa: "راه‌اندازی کامل MVP پلتفرم بلاگ هانتر KavLabs.",
    },
    author: "zalliminal",
    important: true,
  },
  {
    date: "2026-02-12",
    type: "patch",
    title: { en: "Dependency Updates", fa: "به‌روزرسانی وابستگی‌ها" },
    description: {
      en: "Updated next-mdx-remote to latest, disabled ESLint during build.",
      fa: "next-mdx-remote به آخرین نسخه به‌روز شد، ESLint در زمان build غیرفعال شد.",
    },
    author: "zalliminal",
  },

  // ── Feb 11, 2026 ──────────────────────────────────────────────────────────
  {
    date: "2026-02-11",
    type: "chore",
    title: { en: "Initial Commit", fa: "کامیت اولیه" },
    description: {
      en: "Project initialization with Create Next App.",
      fa: "راه‌اندازی پروژه با Create Next App.",
    },
    author: "parhamf6",
  },
];

// Visual config per type — single source of truth
export const TYPE_CONFIG: Record<
  ChangelogType,
  {
    label: { en: string; fa: string };
    pill: string;
    dot: string;
    icon: string;
    /** Whether to show this type in the public filter bar */
    public: boolean;
  }
> = {
  feat: {
    label: { en: "Feature", fa: "ویژگی" },
    pill: "bg-primary/10 text-primary border-primary/30",
    dot: "border-primary bg-primary/20",
    icon: "Sparkles",
    public: true,
  },
  fix: {
    label: { en: "Fix", fa: "رفع باگ" },
    pill: "bg-red-500/10 text-red-500 border-red-500/30 dark:text-red-400 dark:border-red-400/30 dark:bg-red-400/10",
    dot: "border-red-500 bg-red-500/20 dark:border-red-400",
    icon: "Wrench",
    public: true,
  },
  rebrand: {
    label: { en: "Rebrand", fa: "تغییر برند" },
    pill: "bg-accent text-accent-foreground border-accent-foreground/20",
    dot: "border-accent-foreground bg-accent",
    icon: "Palette",
    public: true,
  },
  patch: {
    label: { en: "Patch", fa: "وصله" },
    pill: "bg-blue-500/10 text-blue-500 border-blue-500/30 dark:text-blue-400",
    dot: "border-blue-500 bg-blue-500/20",
    icon: "GitCommitHorizontal",
    public: false,
  },
  chore: {
    label: { en: "Chore", fa: "کارهای جانبی" },
    pill: "bg-muted text-muted-foreground border-border",
    dot: "border-border bg-muted",
    icon: "Settings2",
    public: false,
  },
};

// Backward compat
export const TYPE_COLORS: Record<ChangelogType, string> = Object.fromEntries(
  Object.entries(TYPE_CONFIG).map(([k, v]) => [k, v.pill])
) as Record<ChangelogType, string>;

export const TYPE_LABELS: Record<ChangelogType, { en: string; fa: string }> =
  Object.fromEntries(
    Object.entries(TYPE_CONFIG).map(([k, v]) => [k, v.label])
  ) as Record<ChangelogType, { en: string; fa: string }>;