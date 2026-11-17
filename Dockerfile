# syntax=docker/dockerfile:1

FROM node:22-alpine AS base

# ---------------------------------------------------------------------------
# deps — install with pnpm (matches pnpm-lock.yaml)
# ---------------------------------------------------------------------------
FROM base AS deps
RUN corepack enable && corepack prepare pnpm@12.11.2 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ---------------------------------------------------------------------------
# builder — NEXT_PUBLIC_SITE_URL is inlined at build time (sitemap, canonical
# URLs, RSS links), so it must be a build arg
# ---------------------------------------------------------------------------
FROM base AS builder
RUN corepack enable && corepack prepare pnpm@12.11.2 --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
RUN pnpm run build

# ---------------------------------------------------------------------------
# runner — standalone output, no node_modules
# ---------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
# content/ (MDX posts + glossary) is read from process.cwd() at RUNTIME by
# lib/blog.ts and lib/glossary.ts (search API routes, RSS revalidate=600),
# so it must ship alongside the standalone server.
COPY --from=builder /app/content ./content
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
