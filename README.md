# QualityLab — Bryan Santiago Laserna

Personal portfolio of Bryan Santiago Laserna, Software Quality Assurance Team Lead, branded **BRYAN.QA / QualityLab**.

It's a single page with smooth scrolling between sections: Home, About, Professional Journey, Expertise, My Quality Process, Projects & Tools and Contact. Each project also gets its own detail page at `#/projects/<slug>`.

Built with React 19, TypeScript, Vite, Tailwind CSS v4 and Lucide icons.

## Requirements

- Node.js 20.19+ (developed on Node 24)
- npm

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

> **Windows PowerShell:** if you see "running scripts is disabled on this system", either use `npm.cmd run dev`, or allow local scripts once with
> `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`.

## Scripts

| Command             | What it does                                             |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                               |
| `npm run build`     | Type-check and build to `dist/`                          |
| `npm run preview`   | Serve the production build locally                       |
| `npm run typecheck` | TypeScript project check                                 |
| `npm run lint`      | ESLint                                                   |
| `npm run test:e2e`  | Playwright end-to-end tests (desktop / tablet / mobile)  |

The e2e tests build the site and serve it on port 4317. They use the locally installed **Microsoft Edge**. To use Playwright's bundled Chromium instead:

```bash
npx playwright install chromium
PW_CHANNEL=chromium npm run test:e2e
```

## Editing content

All personal content is in **`src/data/profile.ts`**. Components never hard-code profile details.

| What                   | Where in `profile.ts`                       | Notes                                                                                     |
| ---------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Email                  | `contact.email`                             | Shows an Email link and a message form that opens the visitor's email app. Nothing is sent from the site. |
| LinkedIn / GitHub      | `contact.linkedin`, `contact.github`        | Full `https://` URLs. Shown in Contact and in the footer.                                  |
| Résumé download        | `contact.resumeUrl`                         | Put the PDF in `public/` and use e.g. `'/Bryan-Laserna-Resume.pdf'`.                      |
| Employment dates / employer | `experience[].period`, `experience[].organization` | Hidden while undefined.                                                           |
| Skills                 | `skillGroups`                               | `status: 'proven'` or `'exploring'`.                                                      |
| Process stages         | `process`                                   |                                                                                           |

Anything left `null` is **not shown**. The site never displays placeholder links. When no contact details are configured, the Contact section shows a short "coming soon" note.

### Adding a project

Projects live in **`src/data/projects.ts`**. Adding one object to the list creates both the card in the Projects & Tools grid and its case-study page at `#/projects/<slug>`. You don't need to touch any component. VeriQA Studio in that file is a complete example.

```ts
{
  slug: 'my-tool',                      // unique, used in the URL
  title: 'My Tool',
  category: 'QA Tool',                  // Desktop QA Automation Tool | QA Tool | Automation | API Testing | … or any text
  status: 'in-development',             // 'in-development' | 'completed' | 'live'
  featured: true,                       // optional: listed first, shown as a wide card
  description: 'One or two sentences shown on the card and the page hero.',
  technologies: ['TypeScript', 'Playwright'],
  thumbnail: { src: '/projects/my-tool/main.png', alt: '…', width: 1366, height: 768 },
  links: { github: 'https://github.com/…', demo: 'https://…' },   // optional, https only
  caseStudy: {                          // optional; every section is optional and hidden when empty
    facts: [{ label: 'Version', value: '1.0' }],
    overview: ['paragraph', '…'],
    problem: ['…'],
    approach: ['…'],
    screenshots: [{ src: '/projects/my-tool/flow.png', alt: '…', caption: '…', width: 1366, height: 768 }],
    howItWorks: [{ title: 'Record', description: '…' }],
    features: [{ title: 'Recording', items: ['…'] }],
    forTesters: [{ title: '…', description: '…' }],
    architecture: { summary: '…', nodes: [{ name: '…', tech: '…', points: ['…'] }], links: ['…'], notes: ['…'] },
    decisions: [{ title: '…', challenge: '…', decision: '…' }],
    testing: { summary: '…', results: [{ suite: 'Unit', scope: '…', result: '10 / 10 passed', version: '1.0' }], notAutomated: ['…'] },
    lessons: ['…'],
    status: { summary: '…', verified: ['…'], awaitingManual: ['…'], planned: ['…'], limitations: ['…'] },
    availability: ['…'],
  },
}
```

- **Images:** put them in `public/projects/<slug>/`. Include `width` and `height` (the image's real pixel size) so the page doesn't jump while images load.
- **Screenshots:** use real screenshots only. Without a `thumbnail`, the card shows a plain panel with the category icon.
- **Empty list:** while there are no projects, the section shows a "Projects are being prepared" message.

## Project structure

```
src/
  data/        profile.ts (personal content), projects.ts (projects), navigation.ts (nav order)
  lib/         links.ts (validates contact links, résumé URL), routes.ts (#/projects/<slug> routing)
  hooks/       useRoute, useScrollSpy (active section), useTheme (dark/light)
  components/  Navbar, Footer, BrandMark/Wordmark, PipelineVisual, SectionHeading, Reveal, ChannelIcon, ProjectBits
  sections/    Hero, About, Journey, Expertise, Process, Projects, Contact
  pages/       ProjectDetail
  index.css    design tokens (colours, fonts), patterns, motion
tests/         Playwright e2e suite
```

**Design tokens** are CSS variables at the top of `src/index.css`. The dark palette is the default and a light palette is also included. Animations are turned off for visitors who have "reduce motion" set in their system settings.

## Deployment (Vercel)

It's a static Vite site, so there's no server config. Routing uses in-page `#anchors`.

1. Push the project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repo.
3. Vercel detects **Vite**: build command `npm run build`, output directory `dist`.
4. Deploy. After you have a domain, consider adding `<link rel="canonical">` and `og:url` to `index.html`.

Netlify and Cloudflare Pages work the same way (build `npm run build`, publish `dist`). For GitHub Pages, set `base: '/<repo-name>/'` in `vite.config.ts` first.
