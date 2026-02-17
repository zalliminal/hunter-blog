export const LOCALES = ["en", "fa"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "fa" ? "rtl" : "ltr";
}

export type NavDictionary = {
  homeIntroTitle: string;
  homeIntroSubtitle: string;
  homeIntroSubtitleFa: string;
  navBlog: string;
  navTags: string;
  navHome: string;
  navSearch: string;
  navTheme: string;
  navLanguage: string;
  navMore:string;
  navCategories: string;
  navAdvancedSearch: string;
  // Add descriptions for navigation items
  tagsDescription: string;
  categoriesDescription: string;
  advancedSearchDescription: string;
  latestPosts: string;
  viewAllPosts: string;
  blogIndexTitle: string;
  blogIndexDescription: string;
};


export type Dictionaries = {
  nav: NavDictionary;
};

const en: Dictionaries = {
  nav: {
    homeIntroTitle: "Bug bounty notes & real-world security writeups.",
    homeIntroSubtitle:
      "Minimal, practical logs from hunting, breaking and hardening systems.",
    homeIntroSubtitleFa:
      "یادداشت‌های روزانهٔ باگ باونتی و رِسِرچ امنیتی؛ کوتاه، قابل اجرا، بدون حاشیه.",
    navBlog: "Blog",
    navTags: "Tags",
    navHome: "Home",
    navSearch: "Search",
    navTheme: "Theme",
    navLanguage: "Language",
    navMore:"More",
    navCategories: "Categories",
    navAdvancedSearch: "Advanced Search",
    tagsDescription: "Browse content by tags and topics",
    categoriesDescription: "Explore posts organized by categories",
    advancedSearchDescription: "Search with advanced filters and options",
    latestPosts: "Latest posts",
    viewAllPosts: "View all posts",
    blogIndexTitle: "All posts",
    blogIndexDescription:
      "Deep dives, quick notes and writeups from the field.",
  },
};

const fa: Dictionaries = {
  nav: {
    homeIntroTitle: "یادداشت‌ها و رایت‌آپ‌های یک باگ باونتی هانتر.",
    homeIntroSubtitle:
      "مینیمال، کاربردی، فقط چیزهایی که در مسیر هک و دفاع واقعاً به درد می‌خورند.",
    homeIntroSubtitleFa:
      "Minimal notes and writeups from real bug bounty and security research.",
    navBlog: "بلاگ",
    navTags: "تگ‌ها",
    navHome: "خانه",
    navSearch: "جستجو",
    navTheme: "تم",
    navLanguage: "زبان",
    navMore:"بیشتر",
    navCategories: "دسته‌بندی‌ها",
    navAdvancedSearch: "جستجوی پیشرفته",
    tagsDescription: "مرور محتوا بر اساس تگ‌ها و موضوعات",
    categoriesDescription: "کاوش پست‌های سازمان‌یافته بر اساس دسته‌بندی‌ها",
    advancedSearchDescription: "جستجو با فیلترها و گزینه‌های پیشرفته",
    latestPosts: "آخرین پست‌ها",
    viewAllPosts: "نمایش همهٔ پست‌ها",
    blogIndexTitle: "همهٔ پست‌ها",
    blogIndexDescription:
      "رایت‌آپ‌ها، یادداشت‌های کوتاه و نکته‌های دنیای واقعی امنیت.",
  },
};

export async function getDictionary(locale: Locale): Promise<Dictionaries> {
  return locale === "fa" ? fa : en;
}