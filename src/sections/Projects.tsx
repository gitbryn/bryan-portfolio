import { ArrowRight, Code, ExternalLink, Hammer } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { httpsUrl } from '../lib/links';
import { projectHref } from '../lib/routes';
import { CategoryLabel, FeaturedBadge, ProjectThumbnail, StatusBadge, TechBadges } from '../components/ProjectBits';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

function ProjectCard({ project }: { project: Project }) {
  const github = httpsUrl(project.links?.github);
  const demo = httpsUrl(project.links?.demo);
  const detailHref = projectHref(project.slug);
  // Featured: image beside the text on large screens; stacked elsewhere.
  const wide = project.featured;
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-surface shadow-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent-line ${
        wide ? 'border-accent-line lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]' : 'border-line'
      }`}
    >
      <a
        href={detailHref}
        tabIndex={-1}
        aria-hidden="true"
        className={`block overflow-hidden border-line ${wide ? 'border-b lg:border-r lg:border-b-0' : 'border-b'}`}
      >
        <ProjectThumbnail
          project={project}
          className={`object-left-top transition-transform duration-500 group-hover:scale-[1.02] ${wide ? 'lg:h-full' : ''}`}
        />
      </a>
      <div className={`flex flex-1 flex-col ${wide ? 'p-6 sm:p-8' : 'p-6'}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CategoryLabel category={project.category} />
          <span className="flex flex-wrap items-center gap-2">
            {project.featured && <FeaturedBadge />}
            <StatusBadge status={project.status} />
          </span>
        </div>
        <h3 className={`mt-4 font-display font-bold tracking-tight text-fg ${wide ? 'text-2xl sm:text-[1.7rem]' : 'text-xl'}`}>
          <a href={detailHref} className="hover:text-accent">
            {project.title}
          </a>
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.description}</p>
        <div className="mt-5 flex-1">
          <TechBadges items={project.technologies} />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line-soft pt-5">
          <a
            href={detailHref}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-[14px] font-semibold text-on-accent transition-colors hover:bg-accent-strong"
          >
            View Details
            <ArrowRight className="size-4" aria-hidden="true" />
            <span className="sr-only">about {project.title}</span>
          </a>
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted hover:text-accent">
              <Code className="size-4" aria-hidden="true" />
              GitHub
              <span className="sr-only">repository for {project.title} (opens in a new tab)</span>
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted hover:text-accent">
              <ExternalLink className="size-4" aria-hidden="true" />
              Live demo
              <span className="sr-only">of {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <Reveal className="relative overflow-hidden rounded-2xl border border-dashed border-line bg-surface/60 px-6 py-16 text-center sm:py-20">
      <div className="grid-pattern pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-md">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-accent-line bg-accent-soft text-accent">
          <Hammer className="size-6" strokeWidth={1.7} aria-hidden="true" />
        </span>
        <p className="mt-6 font-display text-lg font-bold text-fg">In the workshop</p>
        <p className="mt-2 text-[15.5px] leading-relaxed text-muted">
          Projects are being prepared. Check back soon to explore the tools and solutions I've built.
        </p>
      </div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-line-soft bg-bg-2 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="projects" index="05" label="Selected Work" title="Projects & Tools">
          <p>
            A collection of QA tools, automation solutions, and software projects I've developed to explore better ways
            of testing, improving workflows, and solving practical engineering challenges.
          </p>
        </SectionHeading>

        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 2) * 90} className={p.featured ? 'md:col-span-2' : ''}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
