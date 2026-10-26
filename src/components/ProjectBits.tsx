import { Bot, Box, Globe, ShieldCheck, Smartphone, Webhook, type LucideIcon, type LucideProps } from 'lucide-react';
import { projectStatusLabel, type Project, type ProjectStatus } from '../data/projects';

const categoryIcons: Record<string, LucideIcon> = {
  'QA Tool': ShieldCheck,
  Automation: Bot,
  'API Testing': Webhook,
  'Web Application': Globe,
  'Mobile Application': Smartphone,
};

function CategoryIcon({ category, ...props }: { category: string } & LucideProps) {
  const Icon = categoryIcons[category] ?? Box;
  return <Icon aria-hidden="true" {...props} />;
}

const statusStyle: Record<ProjectStatus, { badge: string; dot: string }> = {
  live: { badge: 'border-accent-line bg-accent-soft text-accent', dot: 'bg-accent animate-pulse' },
  completed: { badge: 'border-line bg-surface-2 text-fg', dot: 'bg-accent' },
  'in-development': { badge: 'border-explore-line bg-explore-soft text-explore', dot: 'bg-explore' },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const s = statusStyle[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] font-medium tracking-wider uppercase ${s.badge}`}
    >
      <span className={`size-1.5 rounded-full motion-reduce:animate-none ${s.dot}`} aria-hidden="true" />
      {projectStatusLabel[status]}
    </span>
  );
}

export function CategoryLabel({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] tracking-[0.08em] text-subtle uppercase">
      <CategoryIcon category={category} className="size-3.5 text-accent" />
      {category}
    </span>
  );
}

export function TechBadges({ items, label = 'Technologies' }: { items: string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-[12.5px] font-medium text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

/**
 * Real screenshot when provided; otherwise a neutral branded panel (clearly not a
 * screenshot) showing the project's category icon.
 */
export function ProjectThumbnail({ project, className = '' }: { project: Project; className?: string }) {
  if (project.thumbnail) {
    return (
      <img
        src={project.thumbnail.src}
        alt={project.thumbnail.alt}
        loading="lazy"
        className={`aspect-[16/9] w-full object-cover ${className}`}
      />
    );
  }
  return (
    <div className={`relative grid aspect-[16/9] w-full place-items-center overflow-hidden bg-bg-2 ${className}`} aria-hidden="true">
      <div className="grid-pattern absolute inset-0" />
      <span className="relative grid size-16 place-items-center rounded-2xl border border-accent-line bg-accent-soft text-accent">
        <CategoryIcon category={project.category} className="size-7" strokeWidth={1.6} />
      </span>
    </div>
  );
}
