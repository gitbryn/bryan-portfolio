/**
 * Projects & Tools. To publish a project, add ONE object to `projects` below —
 * the grid card and its case-study page (#/projects/<slug>) are generated from it.
 *
 * Images go in /public/projects/<slug>/ and are referenced as '/projects/<slug>/<file>.png'.
 * Only real content: leave optional fields out rather than using placeholders.
 * Case-study sections without content are not shown.
 */

export type ProjectStatus = 'in-development' | 'completed' | 'live';

/** Suggested categories; any other string is also allowed. */
export type ProjectCategory =
  | 'Desktop QA Automation Tool'
  | 'QA Tool'
  | 'Automation'
  | 'API Testing'
  | 'Web Application'
  | 'Mobile Application'
  | (string & {});

export interface ProjectImage {
  /** Path under /public, e.g. '/projects/my-tool/screen.png'. */
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic pixel size; reserves space so the page doesn't jump while images load. */
  width?: number;
  height?: number;
}

export interface CaseStudy {
  /** Short key/value facts shown in the page hero, e.g. Version, Platform, Source. */
  facts?: { label: string; value: string }[];
  /** 1. Overview — paragraphs. */
  overview?: string[];
  /** 2. The Problem — paragraphs. */
  problem?: string[];
  /** 3. The Approach — paragraphs. */
  approach?: string[];
  /** 4. See It Working — real screenshots only. */
  screenshots?: ProjectImage[];
  /** 5. How It Works — ordered workflow stages. */
  howItWorks?: { title: string; description: string }[];
  /** 6. Core Features — grouped lists. */
  features?: { title: string; items: string[] }[];
  /** 7. What It Offers to QA Testers. */
  forTesters?: { title: string; description: string }[];
  /** 8. Technical Architecture — nodes are drawn left to right, joined by `links`. */
  architecture?: {
    summary?: string;
    nodes?: { name: string; tech: string; points: string[] }[];
    /** Labels for the connections between consecutive nodes (nodes.length - 1). */
    links?: string[];
    notes?: string[];
  };
  /** 9. Engineering Challenges and Decisions. */
  decisions?: { title: string; challenge: string; decision: string }[];
  /** 10. Testing and Verification — only results that were actually run. */
  testing?: {
    summary?: string;
    results?: { suite: string; scope: string; result: string; version?: string }[];
    notAutomated?: string[];
  };
  /** 11. Lessons Learned — in your own words. */
  lessons?: string[];
  /** 12. Current Status and Roadmap. */
  status?: {
    summary?: string;
    verified?: string[];
    awaitingManual?: string[];
    planned?: string[];
    limitations?: string[];
  };
  /** 13. Project Availability — paragraphs. */
  availability?: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  /** Featured projects are listed first and shown as a wide card. */
  featured?: boolean;
  description: string;
  technologies: string[];
  thumbnail?: ProjectImage;
  /** Absolute https:// URLs only; invalid links are not shown. */
  links?: { github?: string; demo?: string };
  caseStudy?: CaseStudy;
}

export const projectStatusLabel: Record<ProjectStatus, string> = {
  'in-development': 'In Development',
  completed: 'Completed',
  live: 'Live',
};

const allProjects: Project[] = [
  {
    slug: 'veriqa-studio',
    title: 'VeriQA Studio',
    category: 'Desktop QA Automation Tool',
    status: 'in-development',
    featured: true,
    description:
      'A desktop-based web automation studio that captures browser interactions and transforms them into structured, reviewable testing workflows.',
    technologies: ['Electron', 'React', 'TypeScript', 'Playwright', 'SQLite', 'Zod', 'Vite', 'Vitest'],
    thumbnail: {
      src: '/projects/veriqa/test-case-steps.png',
      width: 1366,
      height: 768,
      alt: 'VeriQA Studio test case view: a passed 12-step login test with navigate, fill, click and verify steps, recorded against the built-in demo app',
    },
    caseStudy: {
      facts: [
        { label: 'Version', value: '0.7.2' },
        { label: 'Platform', value: 'Windows desktop' },
        { label: 'Started', value: 'Oct 2026' },
        { label: 'Source', value: 'Private' },
      ],

      overview: [
        'VeriQA Studio is a Windows desktop application I built for web test automation. I record a flow in a real browser, and VeriQA turns it into structured, editable test steps that I can replay with Playwright, verify with assertions and back up with evidence — without writing test code.',
        "It's a desktop app built with Electron, not a browser extension. Everything runs on the PC: there's no backend, no telemetry and no cloud service, and the browser under test always starts with a fresh temporary profile, so my own browser data is never touched.",
      ],

      problem: [
        "Record-and-playback is a quick way to capture a test, but a replayable script isn't enough for QA work. A run that turns green only because every click completed hasn't verified anything. A locator that quietly matches the wrong element — or several elements — makes results hard to trust. And recordings and screenshots can easily capture passwords and other sensitive values.",
        'The work around a run matters just as much to a QA team: evidence, defect reports, requirement coverage and a sign-off decision. Those usually live in separate tools, disconnected from the test that produced them.',
      ],

      approach: [
        "I built VeriQA around a simple rule: a result is only as strong as what was actually checked. A run is marked PASS only when every step passed and at least one assertion was evaluated. A run that completed its actions without any checks is reported as “Completed · Not verified”.",
        "Instead of generating test code, VeriQA stores each step as structured data — a command, a target with ranked locator candidates, and a value — so steps can be read, edited and replayed predictably. Replay never acts on an ambiguous element, and sensitive values are masked inside the page before they ever reach the app.",
        'Around the recorder I built the QA workflow that follows a run: screenshots with masking and review, defects pre-filled from failed steps, requirements traceability, regression suites, QA sign-off, and exports to the formats teams already use.',
      ],

      screenshots: [
        {
          src: '/projects/veriqa/live-recording.png',
      width: 1366,
      height: 768,
          alt: 'VeriQA recording a test case live, with Pause, Stop, Add assertion and Assert URL controls and the recording log',
          caption: 'Recording live in an isolated Chrome profile. Assertions can be added while recording.',
        },
        {
          src: '/projects/veriqa/evidence-masking.png',
      width: 1366,
      height: 768,
          alt: 'Failure screenshot of a demo login page in which the password field is blacked out',
          caption:
            'Failure evidence: the password field is blacked out at capture, and a screenshot has to be reviewed before it goes into a report.',
        },
        {
          src: '/projects/veriqa/defect-report.png',
      width: 1366,
      height: 768,
          alt: 'Defect DEF-0001 pre-filled with steps to reproduce, expected and actual results, environment and evidence',
          caption: 'A defect pre-filled from a failed step: steps to reproduce, expected vs. actual, environment and evidence.',
        },
        {
          src: '/projects/veriqa/traceability.png',
      width: 1366,
      height: 768,
          alt: 'Requirements and traceability matrix showing one covered, passing requirement and one requirement not yet covered',
          caption: 'Requirements traceability: coverage and the latest status of the linked test cases.',
        },
      ],

      howItWorks: [
        {
          title: 'Record',
          description:
            "Start a recording from a test case. VeriQA opens the browser with a fresh profile and captures clicks, typing, selections and navigation — on the project's authorized sites only.",
        },
        {
          title: 'Review and edit',
          description:
            'Steps appear live. Keystrokes merge into one Fill, and navigations attach to the step that caused them. Locators can be changed and checked against the open page; the original recording stays read-only.',
        },
        {
          title: 'Verify',
          description:
            'Add checks by clicking an element while recording, in the replay browser, or by typing a locator: element state, text, input value, URL or a downloaded file.',
        },
        {
          title: 'Replay',
          description:
            'Run everything in a clean browser, run from a step, or run one step. Each step waits until its element is ready, reports a result, and suggests a repair when a locator no longer matches.',
        },
        {
          title: 'Report',
          description:
            'Review evidence, raise a defect from a failed step, check requirement coverage, sign off, and export the results.',
        },
      ],

      features: [
        {
          title: 'Recording',
          items: [
            "Installed Chrome or Edge, or Playwright's Firefox and WebKit builds, always with a fresh temporary profile",
            "Records only on the project's authorized sites",
            'Navigate, click, fill, clear, select, check, radio, submit, hover, upload, drag and drop, scroll',
            'New tabs and popups, iframes, alert/confirm/prompt dialogs and downloads',
            'Ranked locator candidates with stability scores, re-checked with Playwright',
          ],
        },
        {
          title: 'Playback and checks',
          items: [
            'Run all, run from a step or run one step, with pause, resume and stop',
            'Alternative locators used only when the main one matches nothing; ambiguous matches are blocked',
            'Repair suggestions when a locator no longer matches',
            'Checks for element exists / does not exist / visible / enabled, text, input value, URL and downloaded files',
            'Regression suites, with up to 4 browsers in parallel',
          ],
        },
        {
          title: 'Evidence and QA process',
          items: [
            'Screenshots on failure, on every step or off, with sensitive fields blacked out',
            'Screenshot review, notes and redaction; only reviewed screenshots go into reports by default',
            'Defects (DEF-0001…) pre-filled from failed steps',
            'Requirements and a traceability matrix',
            "QA sign-off that's kept separate from the automated result and can't be edited afterwards",
            'HTML, PDF, Word, Excel, CSV and JSON exports, and project packages to move work between PCs',
          ],
        },
        {
          title: 'Assistant (suggestions only)',
          items: [
            "Suggested checks for test cases that can't pass yet",
            "Documentation drafts and likely causes of failed runs, each listing the facts it's based on",
            'Similar test cases and possible duplicate defects',
            'An optional local language model — off by default and limited to the same PC',
          ],
        },
      ],

      forTesters: [
        {
          title: 'No test code to write',
          description: 'Steps are plain commands and targets that can be read, edited and reordered in the app.',
        },
        {
          title: 'Results that mean something',
          description: "PASS requires real checks, and VeriQA won't click when a locator matches more than one element.",
        },
        {
          title: 'Safe with sensitive data',
          description:
            'Passwords become ${variables} that are entered at run time and never stored, and sensitive fields are blacked out in screenshots.',
        },
        {
          title: 'Evidence ready for review',
          description: 'Every run keeps its exact steps, results and screenshots, ready for a defect or an HTML/PDF report.',
        },
        {
          title: 'Traceability and sign-off',
          description:
            "Link test cases to requirements, see coverage, and record a sign-off — with a written reason when the result isn't a clean PASS.",
        },
        {
          title: 'Local and offline',
          description: 'No accounts, no cloud and no telemetry. Projects live in a local database on the PC.',
        },
      ],

      architecture: {
        summary:
          "VeriQA is split into separate processes, so untrusted web pages and browser hangs can't reach the UI or the database directly.",
        nodes: [
          {
            name: 'Desktop UI',
            tech: 'React · sandboxed renderer',
            points: ['No Node.js or file access', 'Calls the main process through an allow-list of typed channels'],
          },
          {
            name: 'Main process',
            tech: 'Electron · Zod · SQLite',
            points: ['Validates every message', 'The only writer to the local database', 'Runs, evidence and exports'],
          },
          {
            name: 'Automation process',
            tech: 'Electron utility process · Playwright',
            points: ['Drives recording and replay', 'A hung browser never freezes the app'],
          },
          {
            name: 'Browser under test',
            tech: 'Chrome · Edge · Firefox · WebKit',
            points: ['Fresh temporary profile', 'In-page recorder captures and masks events'],
          },
        ],
        links: ['Typed IPC', 'Validated messages', 'Playwright'],
        notes: [
          "Recording uses only Playwright's public APIs: a script installed in the page plus a binding, with every candidate locator re-counted by Playwright.",
          'Storage is a local SQLite database with versioned migrations and an automatic backup before each upgrade. Database triggers make finished recordings, runs and sign-offs read-only.',
        ],
      },

      decisions: [
        {
          title: 'How to record',
          challenge:
            'I needed recordings as structured steps with alternative locators and masked values, not as generated code.',
          decision:
            "I built a custom recorder on Playwright's public APIs. I ruled out parsing codegen output (code text, plaintext values), Playwright's private recorder API (unstable), raw CDP (Chromium-only) and embedding the site inside Electron (recording and replay would differ).",
        },
        {
          title: 'Keeping the order right',
          challenge: 'A click that navigates can unload the page before its events are delivered.',
          decision:
            'The in-page recorder listens in the capture phase and sends each event synchronously, so steps arrive in the order they happened — including the last ones before a navigation.',
        },
        {
          title: 'Never guessing during replay',
          challenge: 'A locator that matches several elements might act on the wrong one.',
          decision:
            'Replay blocks ambiguous matches. Recorded alternatives are tried only when the main locator matches nothing, and only one that matches exactly one element is used — and the result says so.',
        },
        {
          title: 'Keeping secrets out of everything',
          challenge: 'Recordings, logs, results and screenshots can all capture passwords.',
          decision:
            'Sensitive values are masked inside the page, so they never reach the app. The database refuses to store values for sensitive variables, and screenshots black out sensitive fields. The tests check this down to raw file bytes and screenshot pixels.',
        },
        {
          title: 'Defending against hostile pages',
          challenge:
            'A security review showed that a page could redirect to a look-alike site while replay was waiting, and receive the typed value.',
          decision:
            'Actions now run on an element handle after checking that the page and every frame around it are on authorized sites, so a redirect makes the step fail instead. A regression test performs the attack.',
        },
        {
          title: 'Using installed browsers',
          challenge: "Playwright's managed browsers are a large download.",
          decision:
            'VeriQA uses the installed Chrome or Edge by default. Firefox and WebKit are optional Playwright builds (about 195 MB), added only when needed.',
        },
      ],

      testing: {
        summary:
          'I test VeriQA in layers, from pure logic up to the packaged desktop app. These are the latest recorded results (27 Oct 2026).',
        results: [
          { suite: 'Unit', scope: 'Locators, masking, schemas, storage, step rules', result: '284 / 284 passed', version: '0.7.2' },
          {
            suite: 'Integration',
            scope: 'Real recorder and replay in headless Chrome, Edge, Firefox and WebKit',
            result: '65 / 65 passed',
            version: '0.7.2',
          },
          { suite: 'UI review', scope: 'The built app opened on real recorded data', result: '1 / 1 passed', version: '0.7.1' },
          {
            suite: 'Desktop smoke',
            scope: 'Built app: record, assert, pause, stop, run → PASS',
            result: '11 / 11 checks',
            version: '0.7.1',
          },
          {
            suite: 'Portable build',
            scope: 'Run from a freshly unzipped copy',
            result: '11 / 11 checks',
            version: '0.7.1',
          },
        ],
        notAutomated: [
          'Human mouse interaction in the visible browser window (integration tests use real input in headless browsers)',
          'Native file dialogs for export, import and attachments',
          'Opening the Word and Excel exports in Microsoft Office (the files are structurally validated instead)',
          'Moving project packages between two real PCs',
          'Display scaling other than 100% and resolutions below 1366×768',
        ],
      },

      status: {
        summary:
          'VeriQA is at version 0.7.2. Seven development phases are complete and covered by automated tests; the manual verification checklists are still to be done.',
        verified: [
          'Recording, editing and replay in Chrome, Edge, Firefox and WebKit',
          'Assertions and the PASS rule',
          'Masking of sensitive values in recordings, results and screenshots',
          'Suites, parallel runs, defects, traceability and sign-off',
          'Reports and exports (file structure validated)',
          'Portable Windows build (0.7.1)',
        ],
        awaitingManual: [
          'The manual checklists for each module',
          'Hover menus and drag and drop with a real mouse',
          'Native file dialogs, and opening exports in Word and Excel',
          'Project packages moved between two PCs',
        ],
        planned: [
          'Windows installer (configured, not yet built)',
          'Recording drag and drop for libraries that use mouse events',
          'Picking elements inside iframes and other tabs',
        ],
        limitations: [
          "Picking elements works in the first tab's main page only",
          'Hover is recorded only for menus that reveal the next clicked item',
          'Downloads are checked by name and size, not content',
          "WebKit on Windows approximates Safari; it isn't Safari",
          'Sensitive-field detection is heuristic, so screenshots still need review',
          'The app is unsigned, so Windows SmartScreen shows a warning',
        ],
      },

      availability: [
        "VeriQA Studio is a personal project and isn't publicly available. The source code is private, and there's no public download or installer.",
        "The screenshots on this page come from VeriQA's own automated UI tests, which run against its built-in demo application with dummy data.",
      ],
    },
  },
];

/** Featured projects first; otherwise the order above. */
export const projects: Project[] = [
  ...allProjects.filter((p) => p.featured),
  ...allProjects.filter((p) => !p.featured),
];

export function findProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
