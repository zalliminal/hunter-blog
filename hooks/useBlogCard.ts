import type { Locale } from "@/lib/i18n";

export function useBlogCard(locale: Locale) {
  const isRTL = locale === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const textAlign = isRTL ? "text-right" : "text-left";
  const readMoreText = locale === "fa" ? "ادامه مطلب" : "Read more";
  const newText = locale === "fa" ? "🔥 جدید" : "🔥 NEW";
  const minReadText = locale === "fa" ? "دقیقه خواندن" : "min read";

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const isNew = (dateString: string) => {
    const diffDays =
      (Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  return { isRTL, dir, textAlign, readMoreText, newText, minReadText, formatDate, isNew };
}