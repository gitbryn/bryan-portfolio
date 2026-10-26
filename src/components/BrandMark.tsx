import { profile } from '../data/profile';

/** Shield-and-check mark used in the navbar, footer, and favicon. */
export function BrandMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9" className="fill-accent-soft stroke-accent-line" strokeWidth="1" />
      <path
        d="M16 6.5 24 9.6v6.1c0 4.7-3.3 8.4-8 9.8-4.7-1.4-8-5.1-8-9.8V9.6Z"
        fill="none"
        className="stroke-accent"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m12.4 16.1 2.6 2.6 4.8-5.3"
        fill="none"
        className="stroke-accent"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <BrandMark className="size-8" />
      <span className="font-display text-[17px] font-extrabold tracking-tight text-fg">
        {profile.brand.wordmark}
        <span className="text-accent">{profile.brand.accent}</span>
      </span>
      {!compact && (
        <span className="hidden border-l border-line pl-2.5 font-mono text-[11px] tracking-[0.14em] text-subtle uppercase xl:inline">
          {profile.brand.siteName}
        </span>
      )}
    </span>
  );
}
