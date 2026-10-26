import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  align?: 'left' | 'center';
}

/** Numbered eyebrow + heading used at the top of each section. */
export function SectionHeading({ id, index, label, title, children, align = 'left' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <Reveal className={`mb-12 max-w-2xl md:mb-14 ${centered ? 'mx-auto text-center' : ''}`}>
      <p
        className={`flex items-center gap-3 font-mono text-[12px] font-medium tracking-[0.18em] text-accent uppercase ${
          centered ? 'justify-center' : ''
        }`}
      >
        <span className="text-subtle">{index}</span>
        <span className="h-px w-8 bg-accent-line" aria-hidden="true" />
        {label}
      </p>
      <h2
        id={`${id}-title`}
        className="mt-4 font-display text-3xl leading-tight font-bold tracking-tight text-fg sm:text-4xl"
      >
        {title}
      </h2>
      {children && <div className="mt-4 text-[16px] leading-relaxed text-muted">{children}</div>}
    </Reveal>
  );
}
