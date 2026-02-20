"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  SiX, 
  SiGithub, 
  SiTelegram, 
  SiBugcrowd, 
  SiEthereum 
} from "react-icons/si";
import { 
  ShieldCheck, 
  Code2, 
  ExternalLink, 
  User, 
  ArrowRight 
} from "lucide-react";
import { getAuthor, type AuthorId, type Locale } from "@/lib/categories_and_authors";

type Props = {
  locale: Locale;
  isFa: boolean;
};

// ── Icon Mapping (Memoized) ───────────────────────────────────────────────────
const SocialIcon = ({ platform, className }: { platform: string; className: string }) => {
  switch (platform) {
    case "twitter": return <SiX className={className} />;
    case "github": return <SiGithub className={className} />;
    case "telegram": return <SiTelegram className={className} />;
    case "hackerone": return <SiBugcrowd className={className} />;
    case "immunefi": return <SiEthereum className={className} />;
    default: return <ExternalLink className={className} />;
  }
};

// ── CSS-only Animated Orbs (No JS Re-renders) ─────────────────────────────────
function TeamBackgroundOrbs({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <style jsx>{`
        @keyframes enter-primary {
          0% { 
            transform: scale(0); 
            opacity: 0; 
          }
          100% { 
            transform: scale(1.02); 
            opacity: 0.2; 
          }
        }

        @keyframes float-primary {
          0%, 100% { transform: translate(-4px, -4px) scale(1.02); }
          50% { transform: translate(4px, -4px) scale(1.02); }
        }

        @keyframes float-secondary {
          0%, 100% { transform: translate(4px, 4px) scale(0.98); }
          50% { transform: translate(-4px, 4px) scale(0.98); }
        }
      `}</style>
      
      {/* Primary Orb */}
      <div
        className="absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl"
        style={{ 
          backgroundColor: primary,
          animation: `
            enter-primary 600ms ease-out forwards,
            float-primary 4s ease-in-out 600ms infinite
          `
        }}
      />

      {/* Secondary Orb */}
      <div
        className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full blur-3xl"
        style={{ 
          backgroundColor: secondary, 
          opacity: 0.12,
          animation: 'float-secondary 10s ease-in-out infinite' 
        }}
      />
    </div>
  );
}

// ── Framer Variants (Entrance Only) ───────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" } 
  },
};

// ══════════════════════════════════════════════════════════════════════════════
//  TEAM CARD (Optimized: CSS Hover instead of State)
// ══════════════════════════════════════════════════════════════════════════════
function TeamCard({ 
  authorId, 
  locale, 
  isFa 
}: { 
  authorId: AuthorId; 
  locale: Locale; 
  isFa: boolean;
}) {
  const author = getAuthor(authorId);
  const colors = author.signature.colors;
  const name = author.name[locale];
  const role = author.role[locale];
  const bio = author.bio[locale];

  const primaryColor = colors.primary.oklch || colors.primary.hex;
  const secondaryColor = colors.secondary.oklch || colors.secondary.hex;

  const ctaCopy = {
    label: isFa ? "مشاهده پروفایل" : "View Profile",
  };

  return (
    <motion.div
      variants={cardVariants}
      // Use 'group' class to enable group-hover in children
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/20 p-5 shadow-lg backdrop-blur-xl md:p-6 transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1"
      style={{
        // Dynamic border color on hover using CSS variables or inline style logic
        // We use a trick here: CSS handles the transition, inline style sets the hover color via class logic if needed, 
        // but for simplest performance, we let CSS handle opacity/border and use style for the specific color.
        borderColor: `color-mix(in srgb, ${primaryColor} 20%, var(--border))`,
      }}
    >
      {/* Inline style for hover border override via group-hover class in CSS would be complex with dynamic colors.
          Instead, we use a style tag or just accept the base border and let the shadow do the work. 
          To keep it exact to your request but lighter, we will use a style block for the dynamic hover border. */}
      <style jsx>{`
        .team-card-${authorId}:hover {
          border-color: ${primaryColor}50 !important;
          box-shadow: 0 0 20px -8px ${primaryColor}20 !important;
        }
        .team-card-${authorId} .role-badge {
          border-color: var(--border);
          color: var(--muted-foreground);
        }
        .team-card-${authorId}:hover .role-badge {
          border-color: ${primaryColor}40;
          color: ${primaryColor};
        }
        .team-card-${authorId} .cta-btn {
          border-color: var(--border);
          color: var(--foreground);
        }
        .team-card-${authorId}:hover .cta-btn {
          border-color: ${primaryColor}60;
          color: ${primaryColor};
        }
        .team-card-${authorId} .social-icon {
          color: var(--muted-foreground);
        }
        .team-card-${authorId}:hover .social-icon {
          color: ${primaryColor};
        }
      `}</style>

      <div className={`team-card-${authorId} absolute inset-0 rounded-3xl pointer-events-none`} />

      {/* Animated Background Orbs */}
      <TeamBackgroundOrbs primary={primaryColor} secondary={secondaryColor} />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-1 flex-col">
        
        {/* Header: Avatar + Name */}
        <div className="mb-5 flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border/60 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Image
              src={author.avatar}
              alt={name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold tracking-tight text-foreground md:text-lg">
              {name}
            </h3>
            <span className="text-[11px] text-muted-foreground font-mono">
              {author.handle}
            </span>
          </div>
        </div>

        {/* Body: Role Badge + Bio */}
        <div className="mb-6 flex-1">
          <div className="role-badge mb-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-200 bg-background">
            {authorId === 'zal' ? <ShieldCheck size={12} /> : <Code2 size={12} />}
            {role}
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
            {bio}
          </p>
        </div>

        {/* Footer: Social Links + CTA Button */}
        <div className="mt-auto border-t border-border/60 pt-4 flex justify-between items-center gap-4">
          {/* Social Links Row */}
          <div className="flex items-center gap-2">
            {Object.entries(author.links).map(([key, url]) => (
              url && (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon group/icon flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/40 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:bg-background/80"
                  aria-label={key}
                >
                  <span className="transition-transform duration-200 group-hover/icon:scale-110">
                    <SocialIcon platform={key} className="h-4 w-4" />
                  </span>
                </a>
              )
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href={isFa ? `/fa/authors/${authorId}` : `/en/authors/${authorId}`}
            className="cta-btn group/btn inline-flex items-center justify-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-4 py-2 text-[11px] font-medium shadow-sm transition-all duration-200 hover:border-primary/60 hover:bg-primary/10 hover:shadow-md"
          >
            <User size={12} strokeWidth={2} />
            <span>{ctaCopy.label}</span>
            <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1 rtl:group-hover/btn:rotate-180">
              <ArrowRight size={12} strokeWidth={2} />
            </span>
          </Link>
        </div>
      </div>

      {/* Subtle shine effect (CSS Only) */}
      <style jsx>{`
        .team-card-${authorId}::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          background: linear-gradient(105deg, transparent 35%, ${primaryColor}10 50%, transparent 65%);
          transform: translateX(-100%);
          transition: transform 0.6s ease-out;
          pointer-events: none;
        }
        .team-card-${authorId}:hover::after {
          transform: translateX(100%);
        }
      `}</style>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  MAIN SECTION
// ══════════════════════════════════════════════════════════════════════════════
export default function TeamSectionClient({ locale, isFa }: Props) {
  const dir = isFa ? "rtl" : "ltr";

  return (
    <section className="relative w-full py-2 md:py-4" dir={dir}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-6 md:grid-cols-2"
      >
        <TeamCard authorId="parhamf" locale={locale} isFa={isFa} />
        <TeamCard authorId="zal" locale={locale} isFa={isFa} />
      </motion.div>
    </section>
  );
}