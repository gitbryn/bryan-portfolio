import { useState } from 'react';
import {
  Bug,
  ClipboardList,
  FileSearch,
  PenTool,
  Play,
  RefreshCcw,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { profile, type ProcessStage } from '../data/profile';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

const stageIcons: Record<string, LucideIcon> = {
  requirements: FileSearch,
  planning: ClipboardList,
  design: PenTool,
  execution: Play,
  defects: Bug,
  regression: RefreshCcw,
  signoff: ShieldCheck,
};

const num = (i: number) => String(i + 1).padStart(2, '0');

function StageDetail({ stage, index }: { stage: ProcessStage; index: number }) {
  return (
    <>
      <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">Stage {num(index)}</p>
      <h3 className="mt-2 font-display text-xl font-bold text-fg">{stage.title}</h3>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">{stage.details}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] tracking-[0.14em] text-subtle uppercase">Outputs</span>
        {stage.outputs.map((o) => (
          <span key={o} className="rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-[13px] text-fg">
            {o}
          </span>
        ))}
      </div>
    </>
  );
}

/**
 * Desktop: horizontal workflow with a shared detail panel below.
 * Mobile: vertical timeline where the selected stage expands inline.
 */
export function Process() {
  const stages = profile.process;
  const [selected, setSelected] = useState(0);

  return (
    <section id="process" aria-labelledby="process-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="process" index="04" label="My Quality Process" title="How a feature earns its release.">
          <p>
            Seven stages I work through from requirements to sign-off — select one for detail. The depth of each stage
            adapts to the project's risk, timeline, and requirements.
          </p>
        </SectionHeading>

        <Reveal>
          <ol className="relative lg:grid lg:grid-cols-7 lg:gap-3">
            <span className="absolute top-[27px] right-[7%] left-[7%] hidden h-px bg-line lg:block" aria-hidden="true" />
            {stages.map((stage, i) => {
              const Icon = stageIcons[stage.id] ?? ShieldCheck;
              const isSelected = i === selected;
              const isLast = i === stages.length - 1;
              return (
                <li key={stage.id} className={`relative ${isLast ? '' : 'pb-6 lg:pb-0'}`}>
                  {!isLast && (
                    <span className="absolute top-14 bottom-0 left-[27px] w-px bg-line lg:hidden" aria-hidden="true" />
                  )}
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-pressed={isSelected}
                    className="group relative flex w-full gap-4 rounded-2xl text-left lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                  >
                    <span
                      className={`grid size-14 shrink-0 place-items-center rounded-2xl border transition-colors ${
                        isSelected
                          ? 'border-accent bg-accent text-on-accent'
                          : 'border-line bg-surface text-accent group-hover:border-accent-line'
                      }`}
                    >
                      <Icon className="size-[22px]" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 pt-1 lg:pt-4">
                      <span className="block font-mono text-[11px] tracking-[0.14em] text-subtle">{num(i)}</span>
                      <span
                        className={`mt-1 block font-display text-[15.5px] leading-snug font-bold transition-colors lg:text-[14.5px] ${
                          isSelected ? 'text-accent' : 'text-fg group-hover:text-accent'
                        }`}
                      >
                        {stage.title}
                      </span>
                      <span className="mt-1.5 block text-[14px] leading-relaxed text-muted lg:text-[13px]">
                        {stage.summary}
                      </span>
                    </span>
                  </button>
                  {isSelected && (
                    <div className="mt-4 ml-[72px] rounded-2xl border border-accent-line bg-surface p-5 lg:hidden">
                      <StageDetail stage={stage} index={i} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          <div
            aria-live="polite"
            className="mt-12 hidden rounded-2xl border border-accent-line bg-surface p-8 shadow-card lg:block"
            data-testid="process-detail"
          >
            <StageDetail stage={stages[selected]} index={selected} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
