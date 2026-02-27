// app/[locale]/loading.tsx
// This file enables Next.js streaming for the [locale] segment.
// It renders instantly while the server fetches posts and dict data.
// The skeleton matches the exact shape of the homepage sections to prevent layout shift.

export default function HomeLoading() {
  return (
    <div className="space-y-10" aria-hidden="true">
      {/* ── Hero skeleton ─────────────────────────────────────────────── */}
      <HeroSkeleton />

      {/* ── Pinned posts skeleton ──────────────────────────────────────── */}
      <PostsSkeleton />

      {/* ── Terminal / Goals skeleton ──────────────────────────────────── */}
      <TerminalSkeleton />

      {/* ── About skeleton ────────────────────────────────────────────── */}
      <AboutSkeleton />

      {/* ── Team skeleton ─────────────────────────────────────────────── */}
      <TeamSkeleton />
    </div>
  );
}

// ── Pulse atom ────────────────────────────────────────────────────────────────
function Pulse({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`animate-pulse rounded bg-border/40 ${className}`}
      style={style}
    />
  );
}

// ── Scanline texture (reused across cards) ────────────────────────────────────
function Scanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.018] rounded-[inherit]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, currentColor 3px, currentColor 4px)",
      }}
    />
  );
}

// ── Blinking cursor dot ───────────────────────────────────────────────────────
function Cursor() {
  return (
    <span
      className="inline-block h-[0.85em] w-1.5 bg-primary/50 align-middle"
      style={{ animation: "blink 1.1s step-end infinite" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────
function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background/60 to-background/40 p-6 shadow-lg">
      <Scanlines />

      {/* decorative orb — matches real component */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-56 w-56 rounded-full bg-gradient-to-tr from-primary/15 to-transparent blur-3xl"
      />

      <div className="relative z-10 grid gap-6 md:grid-cols-2">
        {/* left column */}
        <div className="space-y-4">
          {/* headline with fake cursor */}
          <div className="flex items-center gap-2 pb-3">
            <Pulse className="h-5 w-48" />
            <Cursor />
          </div>

          {/* body lines */}
          <div className="space-y-2 max-w-xl">
            <Pulse className="h-3.5 w-full" />
            <Pulse className="h-3.5 w-5/6" />
            <Pulse className="h-3.5 w-4/6" />
          </div>

          {/* buttons */}
          <div className="flex flex-wrap gap-3 pt-6">
            <Pulse className="h-9 w-28 rounded-md" />
            <Pulse className="h-9 w-32 rounded-md" />
          </div>
        </div>

        {/* right column — KavLabsCard shape */}
        <Pulse className="h-40 rounded-2xl" />
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pinned posts
// ─────────────────────────────────────────────────────────────────────────────
function PostsSkeleton() {
  return (
    <section className="space-y-4">
      {/* section header */}
      <div className="flex items-center justify-between gap-2">
        <Pulse className="h-3 w-24" />
        <Pulse className="h-3 w-20" />
      </div>

      {/* two blog card skeletons */}
      <div className="grid gap-4 md:grid-cols-2">
        {[0, 1].map((i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 space-y-3">
      <Scanlines />
      {/* tag + date row */}
      <div className="flex items-center gap-2">
        <Pulse className="h-4 w-16 rounded-full" />
        <Pulse className="h-3 w-20" />
      </div>
      {/* title */}
      <div className="space-y-1.5">
        <Pulse className="h-4 w-full" />
        <Pulse className="h-4 w-3/4" />
      </div>
      {/* description */}
      <div className="space-y-1.5">
        <Pulse className="h-3 w-full" />
        <Pulse className="h-3 w-5/6" />
      </div>
      {/* author + reading time */}
      <div className="flex items-center gap-3 pt-1">
        <Pulse className="h-6 w-6 rounded-full" />
        <Pulse className="h-3 w-24" />
        <Pulse className="h-3 w-16 ml-auto" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Terminal / Goals  — matches the exact visual weight of GoalSectionClient
// ─────────────────────────────────────────────────────────────────────────────
function TerminalSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/50 shadow-lg">
      <Scanlines />

      {/* title bar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/35" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/35" />
        <div className="ml-auto flex items-center gap-1.5">
          <Pulse className="h-2.5 w-40" />
          <Cursor />
        </div>
      </div>

      {/* terminal body — three goal blocks */}
      <div className="p-5 space-y-5 md:p-6 md:space-y-6">
        {/* comment line */}
        <Pulse className="h-3 w-72" />

        {[0, 1, 2].map((i) => (
          <TerminalGoalSkeleton key={i} />
        ))}

        {/* idle prompt */}
        <div className="flex items-center gap-1.5">
          <Pulse className="h-3 w-3" />
          <Cursor />
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}

function TerminalGoalSkeleton() {
  return (
    <div className="space-y-1.5">
      {/* $ command line */}
      <div className="flex items-center gap-2">
        <Pulse className="h-3 w-3 shrink-0" />
        <Pulse className="h-3 w-64" />
      </div>
      {/* › status line */}
      <div className="flex items-center gap-1.5 pl-4">
        <Pulse className="h-2.5 w-2.5 shrink-0" />
        <Pulse className="h-2.5 w-48" />
      </div>
      {/* progress bar + ok */}
      <div className="flex items-center gap-2 pl-4 pt-1">
        <Pulse className="h-2 w-12 rounded-full" />
        <Pulse className="h-1.5 w-16 rounded-full" />
        <Pulse className="h-2 w-8 rounded-full" />
      </div>
      {/* body text */}
      <div className="pl-4 space-y-1.5 pt-0.5">
        <Pulse className="h-3 w-full" />
        <Pulse className="h-3 w-5/6" />
        <Pulse className="h-3 w-4/6" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// About section  — matches AboutSectionClient layout
// ─────────────────────────────────────────────────────────────────────────────
function AboutSkeleton() {
  return (
    <section className="space-y-4">
      {/* section heading */}
      <Pulse className="h-3 w-40" />

      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card/90 via-background/70 to-background/40 p-6 shadow-xl md:p-8">
        <div className="relative z-10 grid gap-5 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.2fr)]">

          {/* main about card */}
          <div className="space-y-4 rounded-2xl border border-border/70 bg-card/80 p-5 md:p-6">
            <Pulse className="h-2.5 w-32" />
            <Pulse className="h-5 w-3/4" />
            <div className="space-y-1.5">
              <Pulse className="h-3.5 w-full" />
              <Pulse className="h-3.5 w-5/6" />
            </div>
            <div className="space-y-1.5">
              <Pulse className="h-3 w-full" />
              <Pulse className="h-3 w-4/5" />
              <Pulse className="h-3 w-3/5" />
            </div>
            {/* skills chips */}
            <div className="pt-3 space-y-2">
              <Pulse className="h-2.5 w-40" />
              <div className="grid gap-2 sm:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <Pulse key={i} className="h-16 rounded-xl" />
                ))}
              </div>
            </div>
          </div>

          {/* side column */}
          <div className="space-y-4 flex flex-col justify-between">
            <Pulse className="h-52 rounded-2xl" />
            <Pulse className="h-28 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Team section
// ─────────────────────────────────────────────────────────────────────────────
function TeamSkeleton() {
  return (
    <section className="space-y-4">
      <Pulse className="h-3 w-24" />
      <div className="grid gap-6 md:grid-cols-2">
        {[0, 1].map((i) => (
          <TeamCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

function TeamCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/20 p-5 md:p-6 space-y-5">
      {/* avatar + name */}
      <div className="flex items-center gap-4">
        <Pulse className="h-14 w-14 rounded-xl shrink-0" />
        <div className="space-y-1.5 flex-1">
          <Pulse className="h-4 w-32" />
          <Pulse className="h-3 w-24" />
        </div>
      </div>
      {/* role badge */}
      <Pulse className="h-6 w-28 rounded-full" />
      {/* bio */}
      <div className="space-y-1.5">
        <Pulse className="h-3 w-full" />
        <Pulse className="h-3 w-5/6" />
        <Pulse className="h-3 w-4/6" />
      </div>
      {/* footer */}
      <div className="border-t border-border/60 pt-4 flex justify-between items-center">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <Pulse key={i} className="h-9 w-9 rounded-lg" />
          ))}
        </div>
        <Pulse className="h-8 w-32 rounded-full" />
      </div>
    </div>
  );
}