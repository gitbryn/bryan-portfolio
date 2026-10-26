import { Bot, ClipboardCheck, FlaskConical, Wrench, type LucideIcon } from 'lucide-react';
import { profile, type SkillStatus } from '../data/profile';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

const groupIcons: Record<string, LucideIcon> = {
  testing: FlaskConical,
  quality: ClipboardCheck,
  tools: Wrench,
  automation: Bot,
};

const statusStyle: Record<SkillStatus, { label: string; className: string; dot: string }> = {
  proven: {
    label: 'Proven experience',
    className: 'border-accent-line bg-accent-soft text-accent',
    dot: 'bg-accent',
  },
  exploring: {
    label: 'Currently exploring',
    className: 'border-explore-line bg-explore-soft text-explore',
    dot: 'bg-explore',
  },
};

function StatusBadge({ status }: { status: SkillStatus }) {
  const s = statusStyle[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] font-medium tracking-wider uppercase ${s.className}`}
    >
      <span className={`size-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
      {s.label}
    </span>
  );
}

export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="border-y border-line-soft bg-bg-2 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="expertise" index="03" label="Expertise" title="What I bring to a team.">
          <p>
            Grouped by how I use them. Skills marked <em className="not-italic text-fg">proven</em> come from real
            project work; <em className="not-italic text-fg">exploring</em> marks what I'm actively learning.
          </p>
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-2">
          {profile.skillGroups.map((group, i) => {
            const Icon = groupIcons[group.id] ?? FlaskConical;
            const hasNotes = group.skills.some((s) => s.note);
            return (
              <Reveal
                as="article"
                key={group.id}
                delay={(i % 2) * 90}
                className={`flex flex-col rounded-2xl border bg-surface p-6 shadow-card sm:p-7 ${
                  group.status === 'exploring' ? 'border-dashed border-explore-line' : 'border-line'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
                    <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <StatusBadge status={group.status} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-fg">{group.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{group.description}</p>

                {hasNotes ? (
                  <dl className="mt-5 divide-y divide-line-soft border-t border-line-soft">
                    {group.skills.map((s) => (
                      <div key={s.name} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:gap-4">
                        <dt className="text-[14.5px] font-semibold text-fg sm:w-44 sm:shrink-0">{s.name}</dt>
                        <dd className="text-[13.5px] text-muted">{s.note}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <li
                        key={s.name}
                        className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[13.5px] font-medium text-fg transition-colors hover:border-accent-line"
                      >
                        {s.name}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
