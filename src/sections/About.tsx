import { ArrowDown, FlaskConical, Handshake, Sparkles, Workflow, type LucideIcon } from 'lucide-react';
import { profile } from '../data/profile';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

const highlightIcons: Record<string, LucideIcon> = {
  'hands-on': FlaskConical,
  workflow: Workflow,
  collaboration: Handshake,
  modern: Sparkles,
};

export function About() {
  const { about } = profile;
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line-soft bg-bg-2 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading id="about" index="01" label="About" title={about.heading} />
            <Reveal className="-mt-4 space-y-5 text-[16.5px] leading-[1.8] text-muted">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>

          <div className="space-y-4 lg:pt-14">
            <Reveal className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <p className="font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">Career path</p>
              <ol className="mt-4 space-y-2">
                {about.path.map((step, i) => {
                  const last = i === about.path.length - 1;
                  return (
                    <li key={step}>
                      <div
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                          last ? 'border-accent-line bg-accent-soft' : 'border-line bg-bg-2'
                        }`}
                      >
                        <span
                          className={`size-2 shrink-0 rounded-full ${last ? 'bg-accent' : 'bg-subtle'}`}
                          aria-hidden="true"
                        />
                        <span className={`text-[15px] font-semibold ${last ? 'text-fg' : 'text-muted'}`}>{step}</span>
                        {last && (
                          <span className="ml-auto font-mono text-[10.5px] tracking-wider text-accent uppercase">Now</span>
                        )}
                      </div>
                      {!last && <ArrowDown className="mx-auto my-1 size-4 text-subtle" aria-hidden="true" />}
                    </li>
                  );
                })}
              </ol>
            </Reveal>

            <ul className="grid gap-4 sm:grid-cols-2">
              {about.highlights.map((h, i) => {
                const Icon = highlightIcons[h.id] ?? Sparkles;
                return (
                  <Reveal as="li" key={h.id} delay={i * 70} className="rounded-2xl border border-line bg-surface p-5">
                    <Icon className="size-5 text-accent" strokeWidth={1.8} aria-hidden="true" />
                    <h3 className="mt-3 font-display text-[15.5px] font-bold text-fg">{h.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{h.description}</p>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
