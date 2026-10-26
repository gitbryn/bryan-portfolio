import { Check, TrendingUp } from 'lucide-react';
import { profile } from '../data/profile';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

export function Journey() {
  const roles = profile.experience;
  return (
    <section id="journey" aria-labelledby="journey-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="journey" index="02" label="Professional Journey" title="Growing from tester to QA lead.">
          <p>Each role built on the last — from executing tests to owning how quality is planned, tracked, and signed off.</p>
        </SectionHeading>

        <ol className="relative mx-auto max-w-4xl">
          {/* Timeline rail */}
          <span
            className="absolute top-3 bottom-3 left-[11px] w-px bg-gradient-to-b from-accent via-line to-line md:left-[15px]"
            aria-hidden="true"
          />
          {roles.map((role, i) => {
            const meta = [role.organization, role.period].filter(Boolean).join(' · ');
            const isLast = i === roles.length - 1;
            return (
              <li key={role.title} className={`relative pl-10 md:pl-14 ${isLast ? '' : 'pb-12'}`}>
                <span
                  className={`absolute top-1.5 left-0 grid size-[23px] place-items-center rounded-full border-2 md:size-[31px] ${
                    role.current ? 'border-accent bg-bg' : 'border-line bg-bg'
                  }`}
                  aria-hidden="true"
                >
                  <span className={`size-2 rounded-full md:size-2.5 ${role.current ? 'bg-accent' : 'bg-subtle'}`} />
                </span>

                <Reveal>
                  <article className="rounded-2xl border border-line bg-surface p-6 shadow-card transition-colors hover:border-accent-line sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      {role.current && (
                        <span className="rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 font-mono text-[10.5px] font-medium tracking-wider text-accent uppercase">
                          Current role
                        </span>
                      )}
                      {meta && <span className="font-mono text-[12px] text-subtle">{meta}</span>}
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">{role.title}</h3>
                    <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-muted">{role.summary}</p>

                    <ul className="mt-6 grid gap-x-8 gap-y-3 md:grid-cols-2">
                      {role.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-[14.5px] leading-relaxed text-muted">
                          <Check className="mt-1 size-4 shrink-0 text-accent" strokeWidth={2.4} aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <ul aria-label="Focus areas" className="mt-6 flex flex-wrap gap-2 border-t border-line-soft pt-5">
                      {role.tags.map((t) => (
                        <li key={t} className="rounded-lg bg-surface-2 px-3 py-1 text-[13px] font-medium text-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>

                {!isLast && (
                  <p className="mt-5 -mb-6 flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-subtle uppercase">
                    <TrendingUp className="size-3.5 text-accent" aria-hidden="true" />
                    Progressed from
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
