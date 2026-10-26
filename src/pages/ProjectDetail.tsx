import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, Code, ExternalLink, SearchX } from 'lucide-react';
import { findProject, projects, type Project } from '../data/projects';
import { httpsUrl } from '../lib/links';
import { projectHref } from '../lib/routes';
import { CategoryLabel, ProjectThumbnail, StatusBadge, TechBadges } from '../components/ProjectBits';

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

function DetailSection({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line-soft pt-10 first:border-t-0 first:pt-0">
      <h2 className="flex items-baseline gap-3 font-display text-2xl font-bold tracking-tight text-fg">
        <span className="font-mono text-[13px] font-medium text-accent">{String(index).padStart(2, '0')}</span>
        {title}
      </h2>
      <div className="mt-4 text-[16px] leading-[1.8] text-muted">{children}</div>
    </section>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check className="mt-1.5 size-4 shrink-0 text-accent" strokeWidth={2.4} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const has = (v: string | unknown[] | undefined) => (Array.isArray(v) ? v.length > 0 : Boolean(v && v.trim()));

/** Builds the list of detail sections that actually have content, in the documented order. */
function buildSections(project: Project): { title: string; body: ReactNode }[] {
  const d = project.details ?? {};
  const out: { title: string; body: ReactNode }[] = [];

  if (has(d.overview)) out.push({ title: 'Project Overview', body: <p>{d.overview}</p> });
  if (has(d.problem)) out.push({ title: 'Problem Being Solved', body: <p>{d.problem}</p> });
  if (has(d.solution)) out.push({ title: 'Solution and Approach', body: <p>{d.solution}</p> });
  if (has(d.features)) out.push({ title: 'Key Features', body: <CheckList items={d.features!} /> });
  if (has(project.technologies)) {
    out.push({ title: 'Technologies Used', body: <TechBadges items={project.technologies} /> });
  }
  if (has(d.screenshots)) {
    out.push({
      title: 'Screenshots and Demonstrations',
      body: (
        <div className="grid gap-5 sm:grid-cols-2">
          {d.screenshots!.map((shot) => (
            <figure key={shot.src} className="overflow-hidden rounded-xl border border-line bg-surface">
              <a href={shot.src} target="_blank" rel="noopener noreferrer" className="block">
                <img src={shot.src} alt={shot.alt} loading="lazy" className="w-full" />
                <span className="sr-only">(open full size in a new tab)</span>
              </a>
              {shot.caption && <figcaption className="border-t border-line px-4 py-3 text-[14px]">{shot.caption}</figcaption>}
            </figure>
          ))}
        </div>
      ),
    });
  }
  if (has(d.architecture?.summary) || has(d.architecture?.steps)) {
    out.push({
      title: 'Architecture or Workflow',
      body: (
        <>
          {d.architecture?.summary && <p>{d.architecture.summary}</p>}
          {has(d.architecture?.steps) && (
            <ol className={`space-y-3 ${d.architecture?.summary ? 'mt-5' : ''}`}>
              {d.architecture!.steps!.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-accent-line bg-accent-soft font-mono text-[12px] font-semibold text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          )}
        </>
      ),
    });
  }
  if (has(d.testing?.summary) || has(d.testing?.items)) {
    out.push({
      title: 'Testing and Verification',
      body: (
        <>
          {d.testing?.summary && <p>{d.testing.summary}</p>}
          {has(d.testing?.items) && (
            <div className={d.testing?.summary ? 'mt-5' : ''}>
              <CheckList items={d.testing!.items!} />
            </div>
          )}
        </>
      ),
    });
  }
  if (has(d.challenges) || has(d.lessons)) {
    out.push({
      title: 'Challenges and Lessons Learned',
      body: (
        <div className="grid gap-6 md:grid-cols-2">
          {has(d.challenges) && (
            <div className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-mono text-[11.5px] tracking-[0.14em] text-subtle uppercase">Challenges</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">
                {d.challenges!.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          )}
          {has(d.lessons) && (
            <div className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-mono text-[11.5px] tracking-[0.14em] text-subtle uppercase">Lessons learned</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">
                {d.lessons!.map((l) => <li key={l}>{l}</li>)}
              </ul>
            </div>
          )}
        </div>
      ),
    });
  }
  if (has(d.futureImprovements)) {
    out.push({
      title: 'Future Improvements',
      body: (
        <ul className="list-disc space-y-2 pl-5 marker:text-accent">
          {d.futureImprovements!.map((f) => <li key={f}>{f}</li>)}
        </ul>
      ),
    });
  }
  return out;
}

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
    <article className="relative overflow-hidden pt-28 pb-24 sm:pt-32 md:pb-32">
      <div className="grid-pattern pointer-events-none absolute inset-x-0 top-0 h-[32rem]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {!project ? (
          <NotFound />
        ) : (
          <ProjectBody project={project} />
        )}
      </div>
    </article>
  );
}

function ProjectBody({ project }: { project: Project }) {
  const github = httpsUrl(project.links?.github);
  const demo = httpsUrl(project.links?.demo);
  const sections = buildSections(project);
  const d = project.details ?? {};
  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;

  const facts: [string, ReactNode][] = [
    ['Category', project.category],
    ['Status', <StatusBadge key="s" status={project.status} />],
    ...(d.role ? ([['Role', d.role]] as [string, ReactNode][]) : []),
    ...(d.timeline ? ([['Timeline', d.timeline]] as [string, ReactNode][]) : []),
  ];

  return (
    <>
      <BackLink />

      <header className="mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <CategoryLabel category={project.category} />
          <StatusBadge status={project.status} />
        </div>
        <h1 className="mt-4 font-display text-4xl leading-tight font-extrabold tracking-tight text-fg sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-[18px] leading-relaxed text-muted">{project.description}</p>
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
      </header>

      {project.thumbnail && (
        <div className="mt-12 overflow-hidden rounded-2xl border border-line shadow-card">
          <ProjectThumbnail project={project} />
        </div>
      )}

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
        <div className="min-w-0 space-y-10">
          {sections.length > 0 ? (
            sections.map((s, i) => (
              <DetailSection key={s.title} index={i + 1} title={s.title}>
                {s.body}
              </DetailSection>
            ))
          ) : (
            <p className="text-[16px] text-muted">A full write-up for this project is coming soon.</p>
          )}
        </div>

        <aside aria-label="Project facts" className="lg:sticky lg:top-24 lg:self-start">
          <dl className="divide-y divide-line-soft rounded-2xl border border-line bg-surface">
            {facts.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <dt className="font-mono text-[11.5px] tracking-[0.12em] text-subtle uppercase">{label}</dt>
                <dd className="text-right text-[14px] font-medium text-fg">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <nav aria-label="More projects" className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-8">
        <BackLink />
        <div className="flex flex-wrap gap-3">
          {prev && (
            <a href={projectHref(prev.slug)} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-[14px] font-medium text-muted hover:border-accent-line hover:text-fg">
              <ArrowLeft className="size-4" aria-hidden="true" />
              {prev.title}
            </a>
          )}
          {next && (
            <a href={projectHref(next.slug)} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-[14px] font-medium text-muted hover:border-accent-line hover:text-fg">
              {next.title}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </nav>
    </>
  );
}
