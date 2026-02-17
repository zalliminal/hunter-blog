// ============================================================
//  categories.ts — Blog taxonomy & author config
//  Used for: post tagging · category pages · search filtering
//  Bilingual: en + fa | Colors match site's green-primary theme
// ============================================================

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────

export type LocalizedString = {
  en: string;
  fa: string;
};

export type CategoryId =
  | "digital-literacy"
  | "security-fundamentals"
  | "attack-techniques"
  | "lab-writeups";

export type AuthorId = "zal" | "parham";

export type Category = {
  id: CategoryId;
  /** Short slug used in URLs: /category/[slug] */
  slug: string;
  label: LocalizedString;
  description: LocalizedString;
  /**
   * Color tokens — uses oklch values from globals.css
   * so dark/light mode is consistent with the rest of the site.
   */
  color: {
    /** Tailwind bg class for badges / filter chips */
    bg: string;
    /** Tailwind text class */
    text: string;
    /** Raw oklch — use for inline styles (borders, charts, etc.) */
    oklch: string;
    oklchDark: string;
  };
  /** Who typically writes in this category */
  primaryAuthor: AuthorId;
};

export type Author = {
  id: AuthorId;
  name: LocalizedString;
  handle: string;
  role: LocalizedString;
  bio: LocalizedString;
  /** Path relative to /public */
  avatar: string;
  /** Zal has no real photo — use an abstract SVG avatar */
  isAnonymous: boolean;
  links: {
    twitter?: string;
    github?: string;
    hackerone?: string;
    immunefi?: string;
    telegram?: string;
  };
};

// ─────────────────────────────────────────────────────────────
//  CATEGORIES
// ─────────────────────────────────────────────────────────────

export const CATEGORIES: Record<CategoryId, Category> = {

  /**
   * Category 1 — Digital Literacy & Awareness
   * Author: Parham
   * Target: general users, complete beginners
   * Vibe: approachable, shareable, no jargon
   * Color: teal-green (chart-2 family from globals.css)
   */
  "digital-literacy": {
    id: "digital-literacy",
    slug: "digital-literacy",
    label: {
      en: "Digital Literacy",
      fa: "سواد دیجیتال",
    },
    description: {
      en: "Everyday security awareness for everyone — no prior knowledge required. How the internet works, staying safe online, and understanding threats in plain language.",
      fa: "آگاهی امنیتی روزمره برای همه — بدون نیاز به دانش قبلی. اینترنت چطور کار می‌کنه، چطور آنلاین امن بمونیم و تهدیدها رو به زبان ساده بفهمیم.",
    },
    color: {
      bg: "bg-teal-100 dark:bg-teal-950",
      text: "text-teal-700 dark:text-teal-300",
      oklch: "oklch(0.6959 0.1491 162.48)",
      oklchDark: "oklch(0.7342 0.2341 144.54)",
    },
    primaryAuthor: "parham",
  },

  /**
   * Category 2 — Security Fundamentals
   * Author: Parham (with Zal writeup references)
   * Target: students, developers entering security
   * Vibe: structured, educational, bridges theory and practice
   * Color: primary green (--primary / chart-1 from globals.css)
   */
  "security-fundamentals": {
    id: "security-fundamentals",
    slug: "security-fundamentals",
    label: {
      en: "Security Fundamentals",
      fa: "مبانی امنیت",
    },
    description: {
      en: "Structured security education — networking, cryptography, core tools, and career guidance. The bridge between curious beginner and working professional.",
      fa: "آموزش ساختارمند امنیت — شبکه، رمزنگاری، ابزارهای اصلی و مسیر شغلی. پل بین مبتدی کنجکاو و متخصص حرفه‌ای.",
    },
    color: {
      bg: "bg-green-100 dark:bg-green-950",
      text: "text-green-700 dark:text-green-300",
      oklch: "oklch(0.5638 0.1872 143.25)",
      oklchDark: "oklch(0.8686 0.2776 144.47)",
    },
    primaryAuthor: "parham",
  },

  /**
   * Category 3 — Attack Techniques & Research
   * Author: Zal
   * Target: security researchers, pentesters, bug bounty hunters
   * Vibe: technical, precise, practitioner-first
   * Color: indigo-blue (chart-3 from globals.css) — distinct, serious feel
   */
  "attack-techniques": {
    id: "attack-techniques",
    slug: "attack-techniques",
    label: {
      en: "Attack Techniques",
      fa: "تکنیک‌های حمله",
    },
    description: {
      en: "Deep-dive vulnerability research, exploitation techniques, OWASP Top 10, bug bounty methodology, and real-world attack patterns — written for practitioners.",
      fa: "تحقیق عمیق آسیب‌پذیری، تکنیک‌های اکسپلویت، OWASP Top 10، متدولوژی باگ باونتی و الگوهای حمله واقعی — برای متخصصان.",
    },
    color: {
      bg: "bg-indigo-100 dark:bg-indigo-950",
      text: "text-indigo-700 dark:text-indigo-300",
      oklch: "oklch(0.6231 0.1880 259.81)",
      oklchDark: "oklch(0.5638 0.1880 259.81)",
    },
    primaryAuthor: "zal",
  },

  /**
   * Category 4 — Lab Writeups & CTF
   * Author: Zal (links to Parham's open-source repo for solutions)
   * Target: hands-on learners, students, junior hunters
   * Vibe: practical, step-by-step, methodology over answers
   * Color: amber (chart-4 from globals.css) — "practice/lab" feel
   */
  "lab-writeups": {
    id: "lab-writeups",
    slug: "lab-writeups",
    label: {
      en: "Lab Writeups & CTF",
      fa: "حل چالش و لب",
    },
    description: {
      en: "Step-by-step solutions for PortSwigger labs, HackTheBox machines, TryHackMe rooms, and CTF challenges — with methodology and thought process, not just answers. Full code solutions in Parham's open-source repo.",
      fa: "حل قدم‌به‌قدم لب‌های PortSwigger، ماشین‌های HackTheBox، TryHackMe و چالش‌های CTF — با متدولوژی و روند تفکر، نه فقط جواب. تمام کدها در ریپوی open-source پرهام.",
    },
    color: {
      bg: "bg-amber-100 dark:bg-amber-950",
      text: "text-amber-700 dark:text-amber-300",
      oklch: "oklch(0.7686 0.1647 70.08)",
      oklchDark: "oklch(0.7686 0.1647 70.08)",
    },
    primaryAuthor: "zal",
  },

} as const;

// ─────────────────────────────────────────────────────────────
//  AUTHORS
// ─────────────────────────────────────────────────────────────

export const AUTHORS: Record<AuthorId, Author> = {

  zal: {
    id: "zal",
    name: {
      en: "Zal",
      fa: "زال",
    },
    handle: "@zal",
    role: {
      en: "Blockchain Security Researcher · Bug Bounty Hunter",
      fa: "محقق امنیت بلاکچین · باگ باونتی هانتر",
    },
    bio: {
      en: "Anonymous security researcher focused on blockchain and smart contract vulnerabilities. Hunting bugs in DeFi protocols and web applications. Collaborates with Parham on developer-focused breakdowns of real findings.",
      fa: "محقق امنیت ناشناس با تمرکز روی آسیب‌پذیری‌های بلاکچین و قراردادهای هوشمند. شکار باگ در پروتکل‌های DeFi و اپلیکیشن‌های وب. با پرهام روی تحلیل‌های Developer-focused از یافته‌های واقعی همکاری می‌کنم.",
    },
    avatar: "/profiles/zal_profile.png",
    isAnonymous: false,
    links: {
      twitter: "https://x.com/zal_handle",       // replace with real handle
      hackerone: "https://hackerone.com/zal",     // replace with real profile
      immunefi: "https://immunefi.com/profile/zal",
    },
  },

  parham: {
    id: "parham",
    name: {
      en: "Parham",
      fa: "پرهام",
    },
    handle: "@parham",
    role: {
      en: "Security Educator · Developer",
      fa: "مدرس امنیت · توسعه‌دهنده",
    },
    bio: {
      en: "Security educator and developer who loves teaching — from programming basics to smart contract security. Collaborates with Zal to write developer-focused analyses of real vulnerabilities. All challenge solutions are open-source on GitHub.",
      fa: "مدرس امنیت و توسعه‌دهنده‌ای که آموزش دادن رو دوست داره — از مبانی برنامه‌نویسی تا امنیت قراردادهای هوشمند. با زال همکاری می‌کنم تا تحلیل‌های Developer-focused از آسیب‌پذیری‌های واقعی بنویسم. تمام جواب چالش‌ها open-source هستن.",
    },
    avatar: "/profiles/parhamf_profile.png",
    isAnonymous: false,
    links: {
      twitter: "https://x.com/parham_handle",      // replace with real handle
      github: "https://github.com/parham",          // replace with real username
      telegram: "https://t.me/parham_channel",      // replace with real channel
    },
  },

} as const;

// ─────────────────────────────────────────────────────────────
//  ORDERED LISTS  (use these for rendering, not Object.values)
// ─────────────────────────────────────────────────────────────

export const CATEGORY_IDS: CategoryId[] = [
  "digital-literacy",
  "security-fundamentals",
  "attack-techniques",
  "lab-writeups",
];

export const AUTHOR_IDS: AuthorId[] = ["zal", "parham"];

// ─────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────

export function getCategory(id: CategoryId): Category {
  return CATEGORIES[id];
}

export function getAuthor(id: AuthorId): Author {
  return AUTHORS[id];
}

export function getAllCategories(): Category[] {
  return CATEGORY_IDS.map((id) => CATEGORIES[id]);
}

export function getAllAuthors(): Author[] {
  return AUTHOR_IDS.map((id) => AUTHORS[id]);
}

/** Returns categories where the primary author matches */
export function getCategoriesByAuthor(authorId: AuthorId): Category[] {
  return getAllCategories().filter((c) => c.primaryAuthor === authorId);
}

/**
 * Type guard — safe to use when reading `category` from MDX frontmatter.
 *
 * @example
 * const raw = frontmatter.category  // string | undefined
 * if (isCategoryId(raw)) {
 *   const cat = getCategory(raw)  // fully typed
 * }
 */
export function isCategoryId(value: unknown): value is CategoryId {
  return typeof value === "string" && value in CATEGORIES;
}

export function isAuthorId(value: unknown): value is AuthorId {
  return typeof value === "string" && value in AUTHORS;
}

/**
 * Localized category label — for rendering in nav/filters.
 *
 * @example
 * getCategoryLabel("attack-techniques", "fa") // "تکنیک‌های حمله"
 */
export function getCategoryLabel(
  id: CategoryId,
  locale: "en" | "fa"
): string {
  return CATEGORIES[id].label[locale];
}

export function getCategoryDescription(
  id: CategoryId,
  locale: "en" | "fa"
): string {
  return CATEGORIES[id].description[locale];
}

export function getAuthorRole(id: AuthorId, locale: "en" | "fa"): string {
  return AUTHORS[id].role[locale];
}

export function getAuthorName(id: AuthorId, locale: "en" | "fa"): string {
  return AUTHORS[id].name[locale];
}

export function getAuthorBio(id: AuthorId, locale: "en" | "fa"): string {
  return AUTHORS[id].bio[locale];
}