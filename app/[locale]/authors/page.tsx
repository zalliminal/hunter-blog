// app/[locale]/authors/page.tsx
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import TeamSectionClient from "@/components/hero/TeamSectionClient";
import { GitFork, Heart, Users, MailIcon, Mail } from "lucide-react";
import { SiGithub, SiMaildotcom } from "react-icons/si";

type PageParams = { locale: Locale };

// Context section component (Server Component - no motion)
function CollaborationInvite({ isFa }: { isFa: boolean }) {
  const copy = {
    title: isFa ? "به ما بپیوندید" : "Join Us",
    description: isFa 
      ? "ما به دنبال همکاری با افرادی هستیم که به امنیت، یادگیری و اشتراک‌گذاری دانش علاقه‌مند هستند. پروژه‌های متن‌باز ما در GitHub منتشر می‌شوند و منتظر کمک شما هستیم."
      : "We're looking to collaborate with people passionate about security, learning, and knowledge sharing. Our open-source projects are published on GitHub and we welcome your contributions.",
    stats: [
      { 
        icon: GitFork, 
        label: isFa ? "متن‌باز" : "Open Source",
        desc: isFa ? "همه چیز آزاد و قابل استفاده" : "Everything free & reusable"
      },
      { 
        icon: Users, 
        label: isFa ? "جامعه" : "Community",
        desc: isFa ? "محیطی برای رشد مشترک" : "A space to grow together"
      },
      { 
        icon: Heart, 
        label: isFa ? "مشارکت" : "Contribute",
        desc: isFa ? "هر کمکی ارزشمند است" : "Every contribution matters"
      },
    ],
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card/90 via-background/70 to-background/40 p-6 shadow-lg backdrop-blur-md md:p-8">
      {/* Background gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight md:text-xl">
            {copy.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
            {copy.description}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid gap-4 sm:grid-cols-3">
          {copy.stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-4 backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <stat.icon size={18} className="text-primary" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-foreground">
                  {stat.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const isFa = locale === "fa";

  return (
    <div className="space-y-10">
      {/* Team Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {isFa ? "تیم ما" : "Our Team"}
          </h2>
        </div>
        <TeamSectionClient locale={locale} isFa={isFa} />
      </section>

      {/* Collaboration Invite */}
      <section className="space-y-4">
        <CollaborationInvite isFa={isFa} />
      </section>
    </div>
  );
}