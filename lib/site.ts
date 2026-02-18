export function getSiteUrl(): string {
  // Custom env var you set manually in Vercel dashboard (most reliable)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  // Vercel's production URL env var (no protocol, so we add https)
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  // Fallback for local dev
  return "http://localhost:3000";
}

