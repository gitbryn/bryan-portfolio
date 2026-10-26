import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}

/** Fades content in the first time it scrolls into view. Disabled by prefers-reduced-motion in CSS. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
