import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";

/**
 * Academy promo — KAV Labs Academy (https://academy.kavlabs.ir)
 *
 * Flat poster panel: the academy's near-black ground with neon-green accent,
 * dropped as a solid dark field on the (light) homepage so the card is the
 * most dominant element in view. Subtle matrix-rain background (CSS-only).
 * Two type sizes only (display headline + small body).
 *
 * Content model (user decision): labs = hands-on OWASP-style security
 * practice, challenges = programming questions — kept explicitly separate.
 *
 * Farsi-only (user decision), lang="fa" dir="rtl" so it renders correctly
 * on both /fa and /en. Server component, zero JS, fully crawlable.
 * Copy is sourced from the academy's own published landing-page copy.
 */
const ACADEMY_URL =
  "https://academy.kavlabs.ir/?utm_source=hunter-blog&utm_medium=homepage_card";

const features = [
  {
    title: "لب‌های امنیتی",
    description: "تمرین عملی OWASP؛ از حمله تا دفاع، همه داخل مرورگر.",
  },
  {
    title: "چالش‌های برنامه‌نویسی",
    description: "سوال‌های کدنویسی واقعی با سیستم جاج استاندارد.",
  },
  {
    title: "رایگان شروع کن",
    description: "دوره‌های رایگان و تمرین‌ها، بدون هیچ پرداختی.",
  },
  {
    title: "یادگیری گیمیفای شده",
    description: "با هر تمرینی که تمام می‌کنید امتیاز و سطح می‌سازید.",
  },
] as const;

const stats = [
  { value: "۵+", label: "ساعت محتوای عملی" },
  { value: "۱۰+", label: "لب عملی" },
  { value: "۲۰+", label: "چالش مهارتی" },
] as const;

/* Matrix rain — deterministic columns (server-rendered, no hydration risk) */
const GLYPHS = "01<>{}/;=$+#*";
const RAIN_COLUMNS = [
  { left: "4%", duration: "13s", delay: "0s", opacity: 0.07 },
  { left: "14%", duration: "17s", delay: "-6s", opacity: 0.1 },
  { left: "26%", duration: "11s", delay: "-3s", opacity: 0.06 },
  { left: "38%", duration: "19s", delay: "-11s", opacity: 0.09 },
  { left: "52%", duration: "14s", delay: "-7s", opacity: 0.06 },
  { left: "64%", duration: "16s", delay: "-2s", opacity: 0.1 },
  { left: "76%", duration: "12s", delay: "-9s", opacity: 0.07 },
  { left: "88%", duration: "18s", delay: "-5s", opacity: 0.09 },
] as const;

function RainColumn({
  left,
  duration,
  delay,
  opacity,
  seed,
}: (typeof RAIN_COLUMNS)[number] & { seed: number }) {
  const glyphs = Array.from({ length: 64 }, (_, i) => GLYPHS[(i * 7 + seed * 13) % GLYPHS.length]);
  const strip = (key: string) => (
    <span key={key} className="flex flex-col items-center leading-5">
      {glyphs.map((g, i) => (
        <span key={i}>{g}</span>
      ))}
    </span>
  );
  return (
    <div
      className="academy-rain absolute -top-1/2 flex flex-col font-mono text-xs text-[#00ff41]"
      style={{ left, animationDuration: duration, animationDelay: delay, opacity }}
      aria-hidden="true"
    >
      {/* duplicated strip → seamless loop (translateY -50% → 0) */}
      {strip("a")}
      {strip("b")}
    </div>
  );
}

export default function AcademyCard() {
  return (
    <section aria-labelledby="academy-card-title" lang="fa" dir="rtl">
      <div className="relative overflow-hidden rounded-2xl bg-[oklch(0.1684_0_0)] px-6 py-10 md:px-12 md:py-14 dark:bg-[oklch(0.245_0_0)]">
        {/* Matrix rain — behind content, never blocks reading, no pointer events */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
        >
          {RAIN_COLUMNS.map((col, i) => (
            <RainColumn key={col.left} {...col} seed={i} />
          ))}
        </div>

        <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16">
          {/* ——— Pitch ——— */}
          <div>
            <h2
              id="academy-card-title"
              className="text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl"
            >
              کنجکاوی کافیست
            </h2>

            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              آکادمی کاولبز جاییه برای ساختن، آزمایش کردن و عمیق یاد گرفتن؛ از
              برنامه‌نویسی تا امنیت سایبری.
            </p>

            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Link
                href={ACADEMY_URL}
                target="_blank"
                rel="noopener"
                aria-label="شروع رایگان یادگیری در آکادمی کاولبز (در تب جدید باز می‌شود)"
                className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-[oklch(0.8686_0.2776_144.4661)] px-6 py-3 text-sm font-bold text-[oklch(0.1448_0_0)] transition duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.8686_0.2776_144.4661)]"
              >
                رایگان شروع کن
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>

              <p className="text-xs leading-relaxed text-white/60">
                هر وقت خواستی حامی شو — از{" "}
                <span className="font-semibold text-white">۲۴۰ نومیسما</span> در
                ماه (هر نومیسما = ۱,۰۰۰ تومان)؛ بدون تمدید خودکار.
              </p>
            </div>
          </div>

          {/* ——— Proof: labs vs challenges, clearly separated ——— */}
          <div>
            <ul className="space-y-4">
              {features.map(({ title, description }) => (
                <li key={title} className="flex items-start gap-3">
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-[oklch(0.8686_0.2776_144.4661)]"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-white/70">
                    <span className="font-bold text-white">{title}</span>
                    {" — "}
                    {description}
                  </p>
                </li>
              ))}
            </ul>

            {/* Current, honest numbers */}
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <dd className="text-2xl font-black text-white">{value}</dd>
                  <dt className="mt-0.5 text-xs text-white/60">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
