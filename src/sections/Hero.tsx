import { ArrowRight, Bot, ShieldCheck, Target, Users, type LucideIcon } from 'lucide-react';
import { profile } from '../data/profile';
import { PipelineVisual } from '../components/PipelineVisual';
import { Reveal } from '../components/Reveal';

const capabilityIcons: Record<string, LucideIcon> = {
  strategy: Target,
  assurance: ShieldCheck,
  leadership: Users,
  automation: Bot,
};

export function Hero() {
  const { hero, capabilities } = profile;
  return (
    <section id="home" aria-labelledby="home-title" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 md:pb-28">
      <div className="hero-halo pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-pattern pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 font-mono text-[10.5px] font-medium tracking-[0.1em] text-muted min-[360px]:whitespace-nowrap uppercase sm:text-[11.5px] sm:tracking-[0.16em]">
              <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {hero.eyebrow}
            </p>
            {/* Name is the dominant element; size follows the viewport so each line stays on one row. */}
            <h1
              id="home-title"
              className="mt-6 font-display text-[clamp(2.5rem,11vw,4.75rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-fg lg:text-[clamp(3.5rem,5.4vw,4.75rem)]"
            >
              <span className="block">{hero.greeting}</span>
              <span className="block text-accent">{hero.nameAccent}</span>
            </h1>
            <p className="mt-6 font-display text-[1.45rem] leading-snug font-bold tracking-[-0.015em] text-balance text-fg sm:text-[1.75rem]">
              {hero.sloganLead} <span className="text-accent">{hero.sloganAccent}</span>
            </p>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.7] text-muted sm:text-lg">{hero.intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#expertise"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-[15px] font-semibold text-on-accent transition-colors hover:bg-accent-strong"
              >
                Explore My Expertise
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/60 px-5 py-3.5 text-[15px] font-semibold text-fg transition-colors hover:border-accent-line hover:bg-surface"
              >
                Get in Touch
              </a>
            </div>
          </Reveal>

          <Reveal delay={150} className="mx-auto w-full max-w-lg lg:max-w-none">
            <PipelineVisual />
          </Reveal>
        </div>

        <ul aria-label="Core capabilities" className="mt-20 grid gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {capabilities.map((c, i) => {
            const Icon = capabilityIcons[c.id] ?? ShieldCheck;
            return (
              <Reveal as="li" key={c.id} delay={i * 80}>
                <article className="group h-full rounded-2xl border border-line bg-surface p-6 shadow-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent-line">
                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-accent-line bg-accent-soft text-accent">
                      <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    {c.exploring && (
                      <span className="rounded-full border border-explore-line bg-explore-soft px-2.5 py-0.5 font-mono text-[10.5px] font-medium tracking-wider text-explore uppercase">
                        Exploring
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-[17px] font-bold text-fg">{c.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{c.description}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
