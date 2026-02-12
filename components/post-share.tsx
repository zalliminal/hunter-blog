"use client";

import { useState, useEffect } from "react";
import { Share2, Copy, Check } from "lucide-react";

type Props = {
  title: string;
  /** Current locale – used for translations (default: 'en') */
  locale?: string;
};

export function PostShare({ title, locale = "en" }: Props) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  const isRtl = locale === "fa";

  // Translations
  const t = {
    share: isRtl ? "اشتراک‌گذاری" : "Share",
    copyLink: isRtl ? "کپی لینک" : "Copy link",
    copied: isRtl ? "کپی شد!" : "Copied!",
    ariaShare: isRtl ? "اشتراک‌گذاری این نوشته" : "Share this post",
    ariaCopy: isRtl ? "کپی لینک" : "Copy link",
  };

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ title, url });
    } catch {
      // user cancelled
    }
  };

  const handleCopy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // silent fallback
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Share button – only if Web Share API is supported */}
      {typeof navigator !== "undefined" && navigator.share && (
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground hover:bg-muted"
          aria-label={t.ariaShare}
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>{t.share}</span>
        </button>
      )}

      {/* Copy link button – always visible */}
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground hover:bg-muted"
        aria-label={t.ariaCopy}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        <span>{copied ? t.copied : t.copyLink}</span>
      </button>
    </div>
  );
}