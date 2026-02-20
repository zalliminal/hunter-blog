// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────

export type LocalizedString = {
  en: string;
  fa: string;
};

export const LOCALES = ["en", "fa"] as const;
export type Locale = (typeof LOCALES)[number];

export type CategoryId =
  | "digital-literacy"
  | "security-fundamentals"
  | "attack-techniques"
  | "lab-writeups";

export type AuthorId = "zal" | "parhamf";

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

export type ColorToken = {
  hex: string;
  tailwind?: string;
  /** optional OKLCH string if you want to use inline styles consistent with globals */
  oklch?: string;
};

export type AuthorSignature = {
  colors: {
    primary: ColorToken;   // main brand color (Parham: yellow, Zal: green)
    secondary: ColorToken; // accent / supporting color (choose complement)
    neutral: ColorToken;   // neutral (both asked to include black)
  };
  /** optional small tagline (localized) used on cards / hero */
  tagline?: LocalizedString;
};

export type Author = {
  id: AuthorId;
  name: LocalizedString;
  handle: string;
  role: LocalizedString;
  bio: LocalizedString;
  /** Path relative to /public */
  avatar: string;
  isAnonymous: boolean;
  links: {
    twitter?: string;
    github?: string;
    hackerone?: string;
    immunefi?: string;
    telegram?: string;
  };
  /** i18n-friendly short tagline (one-liner) and signature colors */
  signature: AuthorSignature;
};

// ─────────────────────────────────────────────────────────────
//  CATEGORIES (unchanged except comments)
// ─────────────────────────────────────────────────────────────

export const CATEGORIES: Record<CategoryId, Category> = {
  "digital-literacy": {
    id: "digital-literacy",
    slug: "digital-literacy",
    label: {
      en: "Digital Literacy",
      fa: "سواد دیجیتال",
    },
    description: {
      en: "Everyday security awareness for everyone — no prior knowledge required. How the internet works, staying safe online, and understanding threats in plain language.",
      fa: "آگاهی امنیتی روزمره برای همه — بدون نیاز به دانش قبلی. از اینترنت چطور کار می‌کند و چطور آنلاین امن بمانیم تا تهدیدها را به زبان ساده بفهمیم.",
    },
    color: {
      bg: "bg-teal-100 dark:bg-teal-950",
      text: "text-teal-700 dark:text-teal-300",
      oklch: "oklch(0.6959 0.1491 162.48)",
      oklchDark: "oklch(0.7342 0.2341 144.54)",
    },
    primaryAuthor: "parhamf",
  },

  "security-fundamentals": {
    id: "security-fundamentals",
    slug: "security-fundamentals",
    label: {
      en: "Security Fundamentals",
      fa: "مبانی امنیت",
    },
    description: {
      en: "Structured security education — networking, cryptography, core tools, and career guidance. The bridge between curious beginner and working professional.",
      fa: "آموزش ساختارمند امنیت — وب، شبکه، رمزنگاری، ابزارهای اصلی و مسیر راه. پل بین مبتدی کنجکاو و متخصص حرفه‌ای.",
    },
    color: {
      bg: "bg-green-100 dark:bg-green-950",
      text: "text-green-700 dark:text-green-300",
      oklch: "oklch(0.5638 0.1872 143.25)",
      oklchDark: "oklch(0.8686 0.2776 144.47)",
    },
    primaryAuthor: "parhamf",
  },

  "attack-techniques": {
    id: "attack-techniques",
    slug: "attack-techniques",
    label: {
      en: "Attack Techniques",
      fa: "تکنیک‌های حمله",
    },
    description: {
      en: "Deep-dive vulnerability research, exploitation techniques, OWASP Top 10, bug bounty methodology, and real-world attack patterns — written for practitioners.",
      fa: "تحقیق عمیق آسیب‌پذیری، تکنیک‌های اکسپلویت، OWASP Top 10، متدولوژی باگ باونتی و الگوهای حمله واقعی — برای یادگیری تخصصی.",
    },
    color: {
      bg: "bg-indigo-100 dark:bg-indigo-950",
      text: "text-indigo-700 dark:text-indigo-300",
      oklch: "oklch(0.6231 0.1880 259.81)",
      oklchDark: "oklch(0.5638 0.1880 259.81)",
    },
    primaryAuthor: "zal",
  },

  "lab-writeups": {
    id: "lab-writeups",
    slug: "lab-writeups",
    label: {
      en: "Lab Writeups & CTF",
      fa: "حل چالش و لب",
    },
    description: {
      en: "Step-by-step solutions for PortSwigger labs, HackTheBox machines, TryHackMe rooms, and CTF challenges — with methodology and thought process, not just answers. Full code solutions in Parham's open-source repo.",
      fa: "حل قدم‌به‌قدم لب‌های PortSwigger، ماشین‌های HackTheBox، TryHackMe و چالش‌های CTF و هر نوع چالشی که ارزش داره — با متدولوژی و روند تفکر، نه فقط جواب با کد و یادگیری کامل.",
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
//  AUTHORS — now with localized taglines & signature color tokens
// ─────────────────────────────────────────────────────────────

export const AUTHORS: Record<AuthorId, Author> = {
  zal: {
    id: "zal",
    name: {
      en: "Zalliminal",
      fa: "زال‌لیمینال",
    },
    handle: "@zal",
    role: {
      en: "Security Researcher · Bug Bounty Hunter",
      fa: "محقق امنیت بلاکچین · باگ باونتی هانتر",
    },
    bio: {
      en: "Anonymous security researcher focused on blockchain and smart contract vulnerabilities. Hunting bugs in DeFi protocols and web applications. Collaborates with Parham on developer-focused breakdowns of real findings.",
      fa: "من یه محقق امنیت ساده با تمرکز روی آسیب‌پذیری‌های بلاکچین و قراردادهای هوشمند. شکار باگ در پروتکل‌های DeFi و اپلیکیشن‌های وب. با پرهام روی تحلیل‌های Developer-focused از یافته‌های واقعی همکاری می‌کنم.",
    },
    avatar: "/profiles/zal_profile.png",
    isAnonymous: false,
    links: {
      twitter: "https://x.com/kavlabs",
      github: "https://github.com/zalliminal",
      telegram: "https://t.me/kavlabs",
    },
    signature: {
      tagline: {
        en: "Blockchain security & exploitation research",
        fa: "تحقیق در امنیت بلاکچین و اکسپلویت",
      },
      colors: {
        primary: {
          hex: "#16A34A", // green  (tailwind emerald/green-ish)
          tailwind: "text-green-600 bg-green-50 dark:bg-green-900",
          oklch: "oklch(0.5638 0.1872 143.25)",
        },
        secondary: {
          hex: "#8B5CF6", // violet / purple accent
          tailwind: "text-violet-600",
          oklch: "oklch(0.5000 0.2000 280.00)",
        },
        neutral: {
          hex: "#0B0F11", // near-black neutral
          tailwind: "text-black",
          oklch: "oklch(0.1500 0.0100 50.00)",
        },
      },
    },
  },

  parhamf: {
    id: "parhamf",
    name: {
      en: "ParhamF",
      fa: "پرهام",
    },
    handle: "@parham",
    role: {
      en: "Security Researcher · Developer",
      fa: "محقق امنیت · توسعه‌دهنده",
    },
    bio: {
      en: "Security Researcher and developer who loves teaching — from programming basics to smart contract security. Collaborates with Zal to write developer-focused analyses of real vulnerabilities. All challenge solutions and tools are open-source on GitHub.",
      fa: "محقق امنیت و توسعه‌دهنده‌ای که آموزش دادن و یاد گرفتن و ساختن رو دوست داره — از مبانی برنامه‌نویسی تا امنیت قراردادهای هوشمند. با زال همکاری می‌کنم تا تحلیل‌های Developer-focused از آسیب‌پذیری‌های واقعی بنویسیم. تمام جواب‌ها و ابزار های شخصی open-source هستند.",
    },
    avatar: "/profiles/parhamf_profile.png",
    isAnonymous: false,
    links: {
      twitter: "https://x.com/kavlabs",
      github: "https://github.com/parhamf6",
      telegram: "https://t.me/kavlabs",
    },
    signature: {
      tagline: {
        en: "Security Researcher, write-ups & tooling",
        fa: "محقق امنیت، write-up و ابزار",
      },
      colors: {
        primary: {
          hex: "#FFC857", // yellow
          tailwind: "text-amber-600 bg-amber-50 dark:bg-amber-900",
          oklch: "oklch(0.7700 0.1600 85.00)",
        },
        secondary: {
          hex: "#3B82F6", // blue accent
          tailwind: "text-blue-600",
          oklch: "oklch(0.5400 0.2000 250.00)",
        },
        neutral: {
          hex: "#0B0F11", // near-black neutral (same as Zal's neutral)
          tailwind: "text-black",
          oklch: "oklch(0.1500 0.0100 50.00)",
        },
      },
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

export const AUTHOR_IDS: AuthorId[] = ["zal", "parhamf"];

// ─────────────────────────────────────────────────────────────
//  HELPERS (i18n-friendly helpers added)
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
 */
export function isCategoryId(value: unknown): value is CategoryId {
  return typeof value === "string" && value in CATEGORIES;
}

export function isAuthorId(value: unknown): value is AuthorId {
  return typeof value === "string" && value in AUTHORS;
}

/**
 * Localized category label — for rendering in nav/filters.
 */
export function getCategoryLabel(id: CategoryId, locale: Locale): string {
  return CATEGORIES[id].label[locale];
}

export function getCategoryDescription(id: CategoryId, locale: Locale): string {
  return CATEGORIES[id].description[locale];
}

export function getAuthorRole(id: AuthorId, locale: Locale): string {
  return AUTHORS[id].role[locale];
}

export function getAuthorName(id: AuthorId, locale: Locale): string {
  return AUTHORS[id].name[locale];
}

export function getAuthorBio(id: AuthorId, locale: Locale): string {
  return AUTHORS[id].bio[locale];
}

/** New: get localized small tagline for author (use on cards / hero) */
export function getAuthorTagline(id: AuthorId, locale: Locale): string | undefined {
  return AUTHORS[id].signature?.tagline?.[locale];
}

/** New: returns AuthorSignature.colors for styling UI components */
export function getAuthorSignatureColors(id: AuthorId): AuthorSignature["colors"] {
  return AUTHORS[id].signature.colors;
}
