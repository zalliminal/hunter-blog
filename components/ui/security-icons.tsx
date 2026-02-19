// ── HackerOne Icon ─────────────────────────────────────────────────────────
export function HackerOneIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.5 8l-3.5 3.5L8.5 8h-2l4 4-4 4h2l3.5-3.5 3.5 3.5h2l-4-4 4-4h-2z" />
    </svg>
  );
}

// ── Immunefi Icon ──────────────────────────────────────────────────────────
export function ImmunefiIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l9 3v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-3zm0 2.18l-7 2.33v3.49c0 4.47 2.88 8.74 7 9.82 4.12-1.08 7-5.35 7-9.82V7.51l-7-2.33z" />
    </svg>
  );
}
