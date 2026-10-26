import { ArrowUp } from 'lucide-react';
import { profile } from '../data/profile';
import { channels } from '../lib/links';
import { Wordmark } from './BrandMark';
import { ChannelIcon } from './ChannelIcon';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line-soft bg-bg-2">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Wordmark compact />
          <p className="mt-3 text-[14px] text-muted">
            {profile.name} · {profile.title}
          </p>
          <p className="mt-1 text-[13px] text-subtle">
            © {year} {profile.name}. {profile.brand.siteName}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {channels.length > 0 && (
            <ul className="flex items-center gap-2" aria-label="Social links">
              {channels.map((c) => (
                <li key={c.kind}>
                  <a
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener noreferrer' : undefined}
                    aria-label={c.external ? `${c.label} (opens in a new tab)` : c.label}
                    className="grid size-10 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent-line hover:text-accent"
                  >
                    <ChannelIcon kind={c.kind} className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          )}
          <a
            href="#home"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-3.5 py-2 text-[13.5px] font-medium text-muted transition-colors hover:border-accent-line hover:text-fg"
          >
            Back to top
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
