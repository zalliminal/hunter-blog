"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  Pin,
  Lightbulb,
  TriangleAlert,
  OctagonX,
  Info,
  Scale,
  Sparkles,
} from "lucide-react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type CalloutVariant =
  | "note"
  | "tip"
  | "warning"
  | "danger"
  | "info"
  | "legal"
  | "ai";

interface CalloutProps {
  children: React.ReactNode;
  /** Optional custom title — overrides the default label */
  title?: string;
}

type LucideIcon = React.FC<React.SVGProps<SVGSVGElement> & { size?: number }>;

// ─────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────

const CONFIG: Record<
  CalloutVariant,
  {
    label: { en: string; fa: string };
    Icon: LucideIcon;
    container: string;
    bar: string;
    iconClass: string;
    labelClass: string;
  }
> = {
  note: {
    label: { en: "Note", fa: "نکته" },
    Icon: Pin as LucideIcon,
    container:
      "bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/40",
    bar: "bg-blue-500 dark:bg-blue-400",
    iconClass: "text-blue-500 dark:text-blue-400",
    labelClass: "text-blue-700 dark:text-blue-300",
  },
  tip: {
    label: { en: "Tip", fa: "نکته حرفه‌ای" },
    Icon: Lightbulb as LucideIcon,
    container:
      "bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40",
    bar: "bg-emerald-500 dark:bg-emerald-400",
    iconClass: "text-emerald-500 dark:text-emerald-400",
    labelClass: "text-emerald-700 dark:text-emerald-300",
  },
  warning: {
    label: { en: "Warning", fa: "هشدار" },
    Icon: TriangleAlert as LucideIcon,
    container:
      "bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40",
    bar: "bg-amber-500 dark:bg-amber-400",
    iconClass: "text-amber-500 dark:text-amber-400",
    labelClass: "text-amber-700 dark:text-amber-300",
  },
  danger: {
    label: { en: "Danger", fa: "خطر" },
    Icon: OctagonX as LucideIcon,
    container:
      "bg-red-50/60 dark:bg-red-950/20 border border-red-200/60 dark:border-red-800/40",
    bar: "bg-red-500 dark:bg-red-400",
    iconClass: "text-red-500 dark:text-red-400",
    labelClass: "text-red-700 dark:text-red-300",
  },
  info: {
    label: { en: "Info", fa: "اطلاعات" },
    Icon: Info as LucideIcon,
    container:
      "bg-slate-50/60 dark:bg-slate-900/30 border border-slate-200/60 dark:border-slate-700/40",
    bar: "bg-slate-400 dark:bg-slate-500",
    iconClass: "text-slate-500 dark:text-slate-400",
    labelClass: "text-slate-600 dark:text-slate-400",
  },
  legal: {
    label: { en: "Legal", fa: "نکته قانونی" },
    Icon: Scale as LucideIcon,
    container:
      "bg-violet-50/60 dark:bg-violet-950/20 border border-violet-200/60 dark:border-violet-800/40",
    bar: "bg-violet-500 dark:bg-violet-400",
    iconClass: "text-violet-500 dark:text-violet-400",
    labelClass: "text-violet-700 dark:text-violet-300",
  },
  ai: {
    label: { en: "AI Assisted", fa: "با کمک هوش مصنوعی" },
    Icon: Sparkles as LucideIcon,
    container:
      "bg-fuchsia-50/50 dark:bg-fuchsia-950/15 border border-fuchsia-200/50 dark:border-fuchsia-800/30",
    bar: "bg-gradient-to-b from-fuchsia-400 to-violet-500",
    iconClass: "text-fuchsia-500 dark:text-fuchsia-400",
    labelClass: "text-fuchsia-700 dark:text-fuchsia-300",
  },
};

// ─────────────────────────────────────────────
// Base Callout
// ─────────────────────────────────────────────

function Callout({
  variant,
  title,
  children,
}: CalloutProps & { variant: CalloutVariant }) {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const cfg = CONFIG[variant];

  const resolvedTitle = title ?? cfg.label[locale === "fa" ? "fa" : "en"];

  return (
    <div
      className={`relative my-6 flex gap-0 overflow-hidden rounded-xl ${cfg.container}`}
      role={variant === "danger" || variant === "warning" ? "alert" : "note"}
    >
      {/* Left accent bar */}
      <div className={`w-1 shrink-0 rounded-l-xl ${cfg.bar}`} />

      <div className="flex flex-col gap-1.5 px-4 py-3.5 w-full min-w-0">
        {/* Header */}
        <div className="flex items-center gap-2">
          <cfg.Icon
            size={14}
            className={`shrink-0 ${cfg.iconClass}`}
            aria-hidden
          />
          <span
            className={`text-[11px] font-semibold uppercase tracking-widest ${cfg.labelClass}`}
          >
            {resolvedTitle}
          </span>
        </div>

        {/* Content */}
        <div className="text-sm leading-relaxed text-foreground/80 [&>p]:mt-0 [&>p:not(:last-child)]:mb-2 [&>ul]:mt-1 [&>ol]:mt-1">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Named exports — used directly in MDX
// ─────────────────────────────────────────────

export const Note = (props: CalloutProps) => <Callout variant="note" {...props} />;
export const Tip = (props: CalloutProps) => <Callout variant="tip" {...props} />;
export const Warning = (props: CalloutProps) => <Callout variant="warning" {...props} />;
export const Danger = (props: CalloutProps) => <Callout variant="danger" {...props} />;
export const InfoBox = (props: CalloutProps) => <Callout variant="info" {...props} />;
export const Legal = (props: CalloutProps) => <Callout variant="legal" {...props} />;

/**
 * AI callout — use when a section was written, edited, or reviewed with AI assistance.
 *
 * @example
 * <AI title="این بخش با کمک Claude ویرایش شده">...</AI>
 * <AI title="AI-generated summary, reviewed by author">...</AI>
 */
export const AI = (props: CalloutProps) => <Callout variant="ai" {...props} />;