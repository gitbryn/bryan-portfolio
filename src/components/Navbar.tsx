import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { navItems, type SectionId } from '../data/navigation';
import type { Theme } from '../hooks/useTheme';
import { Wordmark } from './BrandMark';

interface NavbarProps {
  active: SectionId;
  scrolled: boolean;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Navbar({ active, scrolled, theme, onToggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu if the viewport grows to desktop width.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const closeMenu = (restoreFocus: boolean) => {
    setMenuOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  };

  const onMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu(true);
      return;
    }
    if (e.key !== 'Tab') return;
    const focusable = [
      toggleRef.current,
      ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a, button') ?? []),
    ].filter((el): el is HTMLElement => el !== null);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const solid = scrolled || menuOpen;
  const themeLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        solid
          ? 'border-line-soft bg-bg/90 shadow-[0_8px_24px_-16px_rgb(0_0_0/0.5)] backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
      onKeyDown={menuOpen ? onMenuKeyDown : undefined}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8">
        <a href="#home" className="shrink-0 rounded-md" aria-label="BRYAN.QA — back to top" onClick={() => closeMenu(false)}>
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.id === active;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative block rounded-md px-3.5 py-2 text-[14px] font-medium transition-colors ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-accent transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="grid size-10 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-fg"
          >
            {theme === 'dark' ? <Sun className="size-[18px]" aria-hidden="true" /> : <Moon className="size-[18px]" aria-hidden="true" />}
          </button>
          <a
            href="#contact"
            aria-current={active === 'contact' ? 'location' : undefined}
            className="hidden items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[14px] font-semibold text-on-accent transition-colors hover:bg-accent-strong sm:inline-flex"
          >
            Contact
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-lg border border-line text-fg transition-colors hover:bg-surface lg:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        hidden={!menuOpen}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line-soft bg-bg lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
          <ul className="space-y-1">
            {[...navItems, { id: 'contact' as const, label: 'Contact' }].map((item, i) => {
              const isActive = item.id === active;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => closeMenu(false)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-xl font-semibold transition-colors ${
                      isActive ? 'bg-surface text-fg' : 'text-muted hover:bg-surface hover:text-fg'
                    }`}
                  >
                    {item.label}
                    <span className="font-mono text-[12px] text-subtle">{String(i + 1).padStart(2, '0')}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
