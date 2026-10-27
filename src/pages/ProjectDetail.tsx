import { useMemo, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  Code,
  Compass,
  ExternalLink,
  Hourglass,
  Lock,
  SearchX,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react';
import { findProject, projects, type CaseStudy, type Project } from '../data/projects';
import { httpsUrl } from '../lib/links';
import { projectHref } from '../lib/routes';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { CategoryLabel, FeaturedBadge, ProjectThumbnail, StatusBadge, TechBadges } from '../components/ProjectBits';

/* ---------------------------------------------------------------------------
   Small building blocks
   --------------------------------------------------------------------------- */

function BackLink() {
  return (
    <a
      href="#projects"
      className="inline-flex items-center gap-2 rounded-lg text-[14px] font-semibold text-muted transition-colors hover:text-accent"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Back to Projects
    </a>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="max-w-3xl space-y-4">
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function CheckList({ items, icon: Icon = Check, iconClass = 'text-accent' }: { items: string[]; icon?: LucideIcon; iconClass?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon className={`mt-1 size-4 shrink-0 ${iconClass}`} strokeWidth={2.2} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function MonoLabel({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[11px] tracking-[0.14em] text-subtle uppercase">{children}</p>;
}

/* ---------------------------------------------------------------------------
   Section renderers
   --------------------------------------------------------------------------- */

function Screenshots({ shots }: { shots: NonNullable<CaseStudy['screenshots']> }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {shots.map((shot, i) => (
        <figure key={shot.src} className={i === 0 ? 'sm:col-span-2' : ''}>
          <a
            href={shot.src}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-xl border border-line bg-bg-2 shadow-card transition-colors hover:border-accent-line"
          >
            <img
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              loading="lazy"
              className="h-auto w-full"
            />
            <span className="sr-only">(open full size in a new tab)</span>
          </a>
          {shot.caption && <figcaption className="mt-3 text-[14px] leading-relaxed text-muted">{shot.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function HowItWorks({ stages }: { stages: NonNullable<CaseStudy['howItWorks']> }) {
  return (
    <ol className="relative grid gap-0 lg:grid-cols-5 lg:gap-4">
      <span className="absolute top-5 right-[10%] left-[10%] hidden h-px bg-line lg:block" aria-hidden="true" />
      {stages.map((stage, i) => {
        const last = i === stages.length - 1;
        return (
          <li key={stage.title} className={`relative flex gap-4 lg:block ${last ? '' : 'pb-6 lg:pb-0'}`}>
            {!last && <span className="absolute top-10 bottom-0 left-5 w-px bg-line lg:hidden" aria-hidden="true" />}
            <span className="relative grid size-10 shrink-0 place-items-center rounded-xl border border-accent-line bg-surface font-mono text-[13px] font-semibold text-accent lg:mx-auto">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 lg:mt-4 lg:text-center">
              <h3 className="font-display text-[16px] font-bold text-fg">{stage.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{stage.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Features({ groups }: { groups: NonNullable<CaseStudy['features']> }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {groups.map((g) => (
        <div key={g.title} className="rounded-2xl border border-line bg-surface p-6">
          <h3 className="font-display text-[16px] font-bold text-fg">{g.title}</h3>
          <div className="mt-4 text-[14.5px] leading-relaxed">
            <CheckList items={g.items} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ForTesters({ items }: { items: NonNullable<CaseStudy['forTesters']> }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((b) => (
        <li key={b.title} className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent-line">
          <span className="block h-0.5 w-8 rounded-full bg-accent" aria-hidden="true" />
          <h3 className="mt-4 font-display text-[15.5px] font-bold text-fg">{b.title}</h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{b.description}</p>
        </li>
      ))}
    </ul>
  );
}

function Architecture({ arch }: { arch: NonNullable<CaseStudy['architecture']> }) {
  const nodes = arch.nodes ?? [];
  return (
    <>
      {arch.summary && <p className="max-w-3xl">{arch.summary}</p>}
      {nodes.length > 0 && (
        <figure
          className="mt-6 rounded-2xl border border-line bg-bg-2 p-4 sm:p-6"
          aria-label={`Architecture: ${nodes.map((n) => n.name).join(', then ')}`}
        >
          <ol>
            {nodes.map((node, i) => (
              <li key={node.name}>
                <div className="grid gap-3 rounded-xl border border-line bg-surface p-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6 sm:p-5">
                  <div>
                    <p className="font-display text-[15.5px] font-bold text-fg">{node.name}</p>
                    <p className="mt-1 font-mono text-[11.5px] text-accent">{node.tech}</p>
                  </div>
                  <ul className="space-y-1.5 text-[14px] leading-snug text-muted">
                    {node.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="mt-[7px] size-1 shrink-0 rounded-full bg-subtle" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < nodes.length - 1 && (
                  <div className="flex items-center gap-3 py-1.5 pl-8" aria-hidden="true">
                    <span className="h-7 w-px bg-accent-line" />
                    <span className="rounded-full border border-line bg-bg px-2.5 py-0.5 font-mono text-[10.5px] tracking-wide text-subtle">
                      {arch.links?.[i]}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </figure>
      )}
      {arch.notes && arch.notes.length > 0 && (
        <div className="mt-6 text-[15px]">
          <CheckList items={arch.notes} />
        </div>
      )}
    </>
  );
}

function Decisions({ items }: { items: NonNullable<CaseStudy['decisions']> }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((d) => (
        <article key={d.title} className="flex flex-col rounded-2xl border border-line bg-surface p-6">
          <h3 className="font-display text-[16px] font-bold text-fg">{d.title}</h3>
          <div className="mt-4 space-y-4 text-[14.5px] leading-relaxed">
            <div>
              <MonoLabel>Challenge</MonoLabel>
              <p className="mt-1">{d.challenge}</p>
            </div>
            <div className="border-l-2 border-accent-line pl-4">
              <MonoLabel>Decision</MonoLabel>
              <p className="mt-1 text-fg">{d.decision}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function Testing({ testing }: { testing: NonNullable<CaseStudy['testing']> }) {
  return (
    <>
      {testing.summary && <p className="max-w-3xl">{testing.summary}</p>}
      {testing.results && testing.results.length > 0 && (
        <>
        <ul className="mt-6 space-y-3 sm:hidden">
          {testing.results.map((r) => (
            <li key={r.suite} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-fg">{r.suite}</p>
                {r.version && <span className="font-mono text-[12px] text-subtle">v{r.version}</span>}
              </div>
              <p className="mt-1 text-[14px] leading-snug text-muted">{r.scope}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[13px] text-accent">
                <CircleCheck className="size-3.5" aria-hidden="true" />
                {r.result}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-line sm:block">
          <table className="w-full min-w-[36rem] text-left text-[14px]">
            <thead className="bg-surface-2 font-mono text-[11px] tracking-[0.12em] text-subtle uppercase">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">Suite</th>
                <th scope="col" className="px-5 py-3 font-medium">What it covers</th>
                <th scope="col" className="px-5 py-3 font-medium">Result</th>
                <th scope="col" className="px-5 py-3 font-medium">Version</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft bg-surface">
              {testing.results.map((r) => (
                <tr key={r.suite}>
                  <th scope="row" className="px-5 py-3.5 font-semibold text-fg">{r.suite}</th>
                  <td className="px-5 py-3.5 text-muted">{r.scope}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[12.5px] text-accent">
                      <CircleCheck className="size-3.5" aria-hidden="true" />
                      {r.result}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[12.5px] text-subtle">{r.version ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}
      {testing.notAutomated && testing.notAutomated.length > 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-line p-6">
          <MonoLabel>Not covered by automation yet</MonoLabel>
          <div className="mt-3 text-[14.5px] leading-relaxed">
            <CheckList items={testing.notAutomated} icon={Hourglass} iconClass="text-subtle" />
          </div>
        </div>
      )}
    </>
  );
}

const statusGroups: { key: 'verified' | 'awaitingManual' | 'planned' | 'limitations'; title: string; icon: LucideIcon; tone: string }[] = [
  { key: 'verified', title: 'Implemented and verified by automated tests', icon: CircleCheck, tone: 'text-accent' },
  { key: 'awaitingManual', title: 'Implemented, awaiting manual verification', icon: Hourglass, tone: 'text-explore' },
  { key: 'planned', title: 'Planned', icon: Compass, tone: 'text-muted' },
  { key: 'limitations', title: 'Known limitations', icon: TriangleAlert, tone: 'text-subtle' },
];

function Status({ status }: { status: NonNullable<CaseStudy['status']> }) {
  return (
    <>
      {status.summary && <p className="max-w-3xl">{status.summary}</p>}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {statusGroups
          .filter((g) => (status[g.key] ?? []).length > 0)
          .map(({ key, title, icon: Icon, tone }) => (
            <div key={key} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className={`flex items-center gap-2 font-display text-[15.5px] font-bold ${tone}`}>
                <Icon className="size-[18px] shrink-0" aria-hidden="true" />
                <span className="text-fg">{title}</span>
              </h3>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[14.5px] leading-relaxed marker:text-subtle">
                {(status[key] ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </>
  );
}

function Availability({ items, project }: { items: string[]; project: Project }) {
  const github = httpsUrl(project.links?.github);
  return (
    <div className="flex gap-4 rounded-2xl border border-line bg-surface p-6">
      {!github && (
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-muted">
          <Lock className="size-[18px]" aria-hidden="true" />
        </span>
      )}
      <Paragraphs items={items} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Section list — fixed order; sections without content are skipped
   --------------------------------------------------------------------------- */

interface Section {
  id: string;
  title: string;
  body: ReactNode;
}

const has = (v: unknown[] | undefined) => Array.isArray(v) && v.length > 0;

function buildSections(project: Project): Section[] {
  const c = project.caseStudy ?? {};
  const s: Section[] = [];
  const add = (id: string, title: string, when: boolean, body: () => ReactNode) => {
    if (when) s.push({ id: `cs-${id}`, title, body: body() });
  };

  add('overview', 'Overview', has(c.overview), () => <Paragraphs items={c.overview!} />);
  add('problem', 'The Problem', has(c.problem), () => <Paragraphs items={c.problem!} />);
  add('approach', 'The Approach', has(c.approach), () => <Paragraphs items={c.approach!} />);
  add('screenshots', 'See It Working', has(c.screenshots), () => <Screenshots shots={c.screenshots!} />);
  add('how', 'How It Works', has(c.howItWorks), () => <HowItWorks stages={c.howItWorks!} />);
  add('features', 'Core Features', has(c.features), () => <Features groups={c.features!} />);
  add('testers', 'What It Offers QA Testers', has(c.forTesters), () => <ForTesters items={c.forTesters!} />);
  add(
    'architecture',
    'Technical Architecture',
    Boolean(c.architecture && (c.architecture.summary || has(c.architecture.nodes) || has(c.architecture.notes))),
    () => <Architecture arch={c.architecture!} />,
  );
  add('decisions', 'Engineering Challenges and Decisions', has(c.decisions), () => <Decisions items={c.decisions!} />);
  add(
    'testing',
    'Testing and Verification',
    Boolean(c.testing && (c.testing.summary || has(c.testing.results) || has(c.testing.notAutomated))),
    () => <Testing testing={c.testing!} />,
  );
  add('lessons', 'Lessons Learned', has(c.lessons), () => (
    <div className="max-w-3xl text-[15.5px]">
      <CheckList items={c.lessons!} />
    </div>
  ));
  add(
    'status',
    'Current Status and Roadmap',
    Boolean(
      c.status &&
        (c.status.summary || has(c.status.verified) || has(c.status.awaitingManual) || has(c.status.planned) || has(c.status.limitations)),
    ),
    () => <Status status={c.status!} />,
  );
  add('availability', 'Project Availability', has(c.availability), () => <Availability items={c.availability!} project={project} />);
  return s;
}

/* ---------------------------------------------------------------------------
   Page
   --------------------------------------------------------------------------- */

function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-line bg-surface text-subtle">
        <SearchX className="size-6" aria-hidden="true" />
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold text-fg">Project not found</h1>
      <p className="mt-3 text-[16px] text-muted">This project doesn't exist or isn't published yet.</p>
      <div className="mt-8">
        <BackLink />
      </div>
    </div>
  );
}

export function ProjectDetail({ slug }: { slug: string }) {
  const project = findProject(slug);
  return (
    <article className="relative overflow-x-clip pt-28 pb-24 sm:pt-32 md:pb-32">
      <div className="grid-pattern pointer-events-none absolute inset-x-0 top-0 h-[36rem]" aria-hidden="true" />
      <div className="hero-halo pointer-events-none absolute inset-x-0 top-0 h-[36rem]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">{project ? <CaseStudyBody project={project} /> : <NotFound />}</div>
    </article>
  );
}

function CaseStudyBody({ project }: { project: Project }) {
  const github = httpsUrl(project.links?.github);
  const demo = httpsUrl(project.links?.demo);
  const sections = useMemo(() => buildSections(project), [project]);
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);
  const { active } = useScrollSpy(sectionIds);
  const facts = project.caseStudy?.facts ?? [];

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;

  // Scroll without touching the URL hash, which holds the route.
  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ block: 'start' });
    el.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
  };

  return (
    <>
      <BackLink />

      {/* Hero */}
      <header className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <CategoryLabel category={project.category} />
            {project.featured && <FeaturedBadge />}
            <StatusBadge status={project.status} />
          </div>
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-fg sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-muted">{project.description}</p>
          <div className="mt-6">
            <TechBadges items={project.technologies} />
          </div>
          {(github || demo) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-[15px] font-semibold text-on-accent transition-colors hover:bg-accent-strong"
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                  Live demo
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-[15px] font-semibold text-fg transition-colors hover:border-accent-line"
                >
                  <Code className="size-4" aria-hidden="true" />
                  View on GitHub
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          )}
        </div>

        {facts.length > 0 && (
          <dl aria-label="Project facts" className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {facts.map((f) => (
              <div key={f.label} className="bg-surface px-4 py-3.5">
                <dt className="font-mono text-[10.5px] tracking-[0.14em] text-subtle uppercase">{f.label}</dt>
                <dd className="mt-1 text-[14.5px] font-semibold text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      {project.thumbnail && (
        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-bg-2 shadow-card">
          <ProjectThumbnail project={project} className="aspect-auto!" />
        </div>
      )}

      {/* Body: sticky contents + sections */}
      <div className="mt-16 grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
        {sections.length > 1 && (
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="font-mono text-[11px] tracking-[0.14em] text-subtle uppercase">On this page</p>
              <ul className="mt-4 space-y-1 border-l border-line">
                {sections.map((s) => {
                  const isActive = s.id === active;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => goTo(s.id)}
                        aria-current={isActive ? 'location' : undefined}
                        className={`-ml-px block w-full border-l-2 py-1 pl-4 text-left text-[13.5px] transition-colors ${
                          isActive ? 'border-accent font-semibold text-fg' : 'border-transparent text-muted hover:text-fg'
                        }`}
                      >
                        {s.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        )}

        <div className={`min-w-0 space-y-16 ${sections.length > 1 ? '' : 'lg:col-span-2'}`}>
          {sections.length > 0 ? (
            sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24">
                <h2
                  id={`${s.id}-title`}
                  tabIndex={-1}
                  className="flex items-baseline gap-3 font-display text-2xl font-bold tracking-tight text-fg outline-none sm:text-[1.75rem]"
                >
                  <span className="font-mono text-[13px] font-medium text-accent">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                <div className="mt-6 text-[16px] leading-[1.8] text-muted">{s.body}</div>
              </section>
            ))
          ) : (
            <p className="text-[16px] text-muted">A full write-up for this project is coming soon.</p>
          )}
        </div>
      </div>

      <nav aria-label="More projects" className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-8">
        <BackLink />
        <div className="flex flex-wrap gap-3">
          {prev && (
            <a
              href={projectHref(prev.slug)}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-[14px] font-medium text-muted hover:border-accent-line hover:text-fg"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {prev.title}
            </a>
          )}
          {next && (
            <a
              href={projectHref(next.slug)}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-[14px] font-medium text-muted hover:border-accent-line hover:text-fg"
            >
              {next.title}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </nav>
    </>
  );
}
