/**
 * Projects & Tools. To publish a project, add ONE object to `projects` below —
 * the grid card and its detail page (#/projects/<slug>) are generated from it.
 *
 * Images go in /public/projects/ and are referenced as '/projects/<file>.png'.
 * Only real content: leave optional fields out rather than using placeholders.
 * Detail-page sections without content are not shown.
 *
 * Example:
 *
 *   {
 *     slug: 'api-contract-checker',            // URL-safe, unique
 *     title: 'API Contract Checker',
 *     category: 'API Testing',
 *     status: 'in-development',
 *     description: 'One or two sentences shown on the card.',
 *     technologies: ['Python', 'Postman'],
 *     thumbnail: { src: '/projects/api-checker.png', alt: 'Checker results screen' },
 *     links: { github: 'https://github.com/…', demo: 'https://…' },
 *     details: {
 *       overview: '…',
 *       problem: '…',
 *       solution: '…',
 *       features: ['…'],
 *       screenshots: [{ src: '/projects/api-checker-2.png', alt: '…', caption: '…' }],
 *       architecture: { summary: '…', steps: ['…'] },
 *       testing: { summary: '…', items: ['…'] },
 *       challenges: ['…'],
 *       lessons: ['…'],
 *       futureImprovements: ['…'],
 *     },
 *   },
 */

export type ProjectStatus = 'in-development' | 'completed' | 'live';

/** Suggested categories; any other string is also allowed. */
export type ProjectCategory =
  | 'QA Tool'
  | 'Automation'
  | 'API Testing'
  | 'Web Application'
  | 'Mobile Application'
  | (string & {});

export interface ProjectImage {
  /** Path under /public, e.g. '/projects/my-tool.png'. */
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectDetails {
  /** Your role, e.g. 'Solo developer'. */
  role?: string;
  /** Free-form, e.g. 'Mar 2026 — present'. */
  timeline?: string;
  overview?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  screenshots?: ProjectImage[];
  architecture?: { summary?: string; steps?: string[] };
  testing?: { summary?: string; items?: string[] };
  challenges?: string[];
  lessons?: string[];
  futureImprovements?: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  description: string;
  technologies: string[];
  thumbnail?: ProjectImage;
  /** Absolute https:// URLs only; invalid links are not shown. */
  links?: { github?: string; demo?: string };
  details?: ProjectDetails;
}

export const projectStatusLabel: Record<ProjectStatus, string> = {
  'in-development': 'In Development',
  completed: 'Completed',
  live: 'Live',
};

export const projects: Project[] = [];

export function findProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
