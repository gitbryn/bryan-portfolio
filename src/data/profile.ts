/**
 * All personal content lives here. Edit this file to update the site —
 * components read from it and never hard-code profile details.
 */

export interface Role {
  title: string;
  /** Employer name. Leave undefined until you want it shown. */
  organization?: string;
  /** Free-form date range, e.g. "Mar 2023 — Present". Hidden when undefined. */
  period?: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  tags: string[];
}

export type SkillStatus = 'proven' | 'exploring';

export interface SkillGroup {
  id: string;
  title: string;
  /** "proven" = used in real project work; "exploring" = actively learning. */
  status: SkillStatus;
  description: string;
  skills: { name: string; note?: string }[];
}

export interface ProcessStage {
  id: string;
  title: string;
  summary: string;
  details: string;
  outputs: string[];
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  exploring?: boolean;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
}

export interface Profile {
  name: string;
  displayName: string;
  title: string;
  brand: { wordmark: string; accent: string; siteName: string };
  hero: {
    /** Small label above the name. */
    eyebrow: string;
    /** Main headline: first line in off-white, second line in the accent colour. */
    greeting: string;
    nameAccent: string;
    /** Secondary headline below the name. */
    sloganLead: string;
    sloganAccent: string;
    intro: string;
  };
  about: {
    heading: string;
    paragraphs: string[];
    highlights: Highlight[];
    path: string[];
  };
  /**
   * Contact details. `null` means "not configured" and the item is not shown.
   * `resumeUrl` can be a file in /public (e.g. '/Bryan-Laserna-Resume.pdf').
   */
  contact: {
    email: string | null;
    linkedin: string | null;
    github: string | null;
    resumeUrl: string | null;
  };
  capabilities: Capability[];
  process: ProcessStage[];
  experience: Role[];
  skillGroups: SkillGroup[];
}

// Projects live in ./projects.ts.

export const profile: Profile = {
  name: 'Bryan Santiago Laserna',
  displayName: 'Bryan Laserna',
  title: 'Software Quality Assurance Team Lead',
  brand: { wordmark: 'BRYAN', accent: '.QA', siteName: 'QualityLab' },

  hero: {
    eyebrow: 'Software Quality Assurance Team Lead',
    greeting: "Hi, I'm Bryan",
    nameAccent: 'Laserna.',
    sloganLead: "Quality isn't a phase.",
    sloganAccent: "It's the foundation.",
    intro:
      'I specialize in delivering reliable, high-quality software through structured testing, risk-based validation, and continuous improvement. With experience across web, mobile, and API testing, I work throughout the software development lifecycle—from requirements analysis and test planning to test execution, defect investigation, and release readiness. As a QA Team Lead, I combine hands-on technical expertise with team coordination, process optimization, and a growing focus on test automation and AI-driven quality engineering.',
  },

  about: {
    heading: 'From hands-on testing to leading quality.',
    paragraphs: [
      'I started my career as a Junior Software Quality Assurance Engineer, gaining hands-on experience in manual testing, test case design, and defect identification and reporting across web and mobile applications. That foundation continues to shape my approach to software quality today.',
      'Now, as a QA Team Lead, I oversee quality assurance activities across multiple projects, ensuring that test planning, test design, execution, and documentation align with established QA standards. My responsibilities include reviewing QA deliverables, monitoring test coverage and defect resolution, mentoring team members, and supporting release readiness and sign-off. Beyond these leadership responsibilities, I remain actively involved in hands-on testing, technical problem-solving, and continuous QA process improvement.',
      "I collaborate closely with developers, project managers, and other stakeholders to identify risks early, address testing blockers, and maintain clear communication throughout the software development lifecycle. I'm also expanding my expertise in test automation and AI-assisted QA workflows, exploring ways to make testing more efficient, repeatable, and reliable.",
    ],
    highlights: [
      {
        id: 'hands-on',
        title: 'Hands-on testing',
        description: 'Functional, integration, regression, and API testing across web and mobile.',
      },
      {
        id: 'workflow',
        title: 'Better QA workflows',
        description: 'Clearer documentation, review processes, and testing standards.',
      },
      {
        id: 'collaboration',
        title: 'Team collaboration',
        description: 'Working with developers and project teams to unblock releases.',
      },
      {
        id: 'modern',
        title: 'Modern quality practices',
        description: 'Exploring automation and AI-assisted ways of testing.',
      },
    ],
    path: ['Junior Software QA Engineer', 'Software QA Team Lead'],
  },

  contact: {
    email: 'brynlsrn@gmail.com', // e.g. 'brynlsrn@gmail.com'
    linkedin: 'https://www.linkedin.com/in/bryan-laserna/', // e.g. 'https://www.linkedin.com/in/bryan-laserna/'
    github: null, // e.g. 'https://github.com/your-handle'
    resumeUrl: null, // e.g. '/Bryan-Laserna-Resume.pdf' (place the file in /public)
  },

  capabilities: [
    {
      id: 'strategy',
      title: 'Test Strategy',
      description: 'Requirements analysis, test planning, and test coverage.',
    },
    {
      id: 'assurance',
      title: 'Quality Assurance',
      description: 'Functional, integration, regression, web, mobile, and API testing.',
    },
    {
      id: 'leadership',
      title: 'QA Leadership',
      description: 'Test management, QA process improvement, test script reviews, team mentoring, and cross-functional collaboration.',
    },
    {
      id: 'automation',
      title: 'Automation & AI',
      description: 'Exploring automation frameworks and AI-assisted QA workflows.',
      exploring: true,
    },
  ],

  process: [
    {
      id: 'requirements',
      title: 'Requirements Analysis',
      summary: 'Understand what is being built and where the risk sits.',
      details:
        'Review requirements, user stories, and acceptance criteria. Raise ambiguities early and identify testable conditions before any testing starts.',
      outputs: ['Clarifying questions', 'Testable conditions', 'Risk areas'],
    },
    {
      id: 'planning',
      title: 'Test Planning',
      summary: 'Decide scope, priorities, and environments.',
      details:
        'Define what will be tested, which test types apply, the environments and data needed, and how effort is prioritised against risk and the release timeline.',
      outputs: ['Scope', 'Priorities', 'Environments & data'],
    },
    {
      id: 'design',
      title: 'Test Case Design',
      summary: 'Write cases that trace back to requirements.',
      details:
        'Design test cases covering positive, negative, and edge scenarios, each traceable to the requirement it verifies, so coverage gaps are visible.',
      outputs: ['Test cases', 'Test data', 'Traceability'],
    },
    {
      id: 'execution',
      title: 'Test Execution',
      summary: 'Run tests and capture evidence.',
      details:
        'Execute functional, integration, and system tests across web, mobile, and API layers, recording results and evidence as testing progresses.',
      outputs: ['Execution results', 'Evidence'],
    },
    {
      id: 'defects',
      title: 'Defect Management',
      summary: 'Report clearly and follow through.',
      details:
        'Log reproducible defects with steps, expected vs. actual results, environment, severity, and evidence — then track them with developers through to resolution.',
      outputs: ['Bug reports', 'Severity triage', 'Defect tracking'],
    },
    {
      id: 'regression',
      title: 'Regression Testing',
      summary: 'Verify fixes without breaking what works.',
      details:
        'Retest fixed defects, then run regression on affected areas so a fix in one place does not introduce problems elsewhere.',
      outputs: ['Verified fixes', 'Regression results'],
    },
    {
      id: 'signoff',
      title: 'QA Sign-off',
      summary: 'Give the team a clear release picture.',
      details:
        'Summarise coverage, results, and known open risks so the team can make an informed release decision.',
      outputs: ['Test summary', 'Known risks', 'Release recommendation'],
    },
  ],

  experience: [
    {
      title: 'Software Quality Assurance Team Lead',
      organization: undefined,
      period: undefined,
      current: true,
      summary:
        'Leading QA across concurrent web and mobile projects, balancing hands-on testing with coordination and process improvement.',
      highlights: [
        'Coordinate QA activities across multiple web and mobile projects.',
        'Oversee test planning and execution to keep coverage aligned with requirements.',
        'Review test scripts and support consistent QA practices.',
        'Track defects through to resolution and communicate testing blockers.',
        'Improve QA documentation, standards, and testing workflows.',
        'Support release readiness and QA sign-off.',
        'Explore automation and AI-assisted improvements.',
      ],
      tags: ['QA coordination', 'Script review', 'Release sign-off', 'Process improvement'],
    },
    {
      title: 'Junior Software Quality Assurance Engineer',
      organization: undefined,
      period: undefined,
      summary:
        'Built a hands-on testing foundation across web and mobile applications, working directly with developers.',
      highlights: [
        'Execute manual tests for web and mobile applications.',
        'Create and execute test cases, and maintain testing documentation.',
        'Validate functionality against requirements.',
        'Support regression and integration testing.',
        'Report and verify defects with clear reproduction steps.',
        'Collaborate with developers to reproduce and resolve issues.',
      ],
      tags: ['Manual testing', 'Test cases', 'Regression', 'Defect reporting'],
    },
  ],

  skillGroups: [
    {
      id: 'testing',
      title: 'Testing & Validation',
      status: 'proven',
      description: 'The testing work I do across web, mobile, and API projects.',
      skills: [
        { name: 'Functional Testing' },
        { name: 'Regression Testing' },
        { name: 'Integration Testing' },
        { name: 'System Testing' },
        { name: 'UAT' },
        { name: 'API Testing' },
        { name: 'Web Testing' },
        { name: 'Mobile Testing' },
      ],
    },
    {
      id: 'quality',
      title: 'Quality Engineering',
      status: 'proven',
      description: 'How testing is planned, documented, and brought to a release decision.',
      skills: [
        { name: 'Test Planning' },
        { name: 'Test Case Design' },
        { name: 'Defect Management' },
        { name: 'QA Sign-off' },
        { name: 'QA Documentation' },
        { name: 'Process Improvement' },
      ],
    },
    {
      id: 'tools',
      title: 'Tools & Technologies',
      status: 'proven',
      description: 'Tools I use for testing, tracking, and investigation.',
      skills: [
        { name: 'Postman', note: 'API requests, collections, and response checks' },
        { name: 'Swagger', note: 'Exploring and validating API endpoints' },
        { name: 'ClickUp', note: 'Task and defect tracking' },
        { name: 'Jira', note: 'Issue and defect tracking' },
        { name: 'SQL Fundamentals', note: 'Querying data to verify results' },
        { name: 'Browser Developer Tools', note: 'Network, console, and DOM inspection' },
      ],
    },
    {
      id: 'automation',
      title: 'Automation & AI',
      status: 'exploring',
      description: 'Areas I am actively learning to move repeatable checks toward automation.',
      skills: [{ name: 'Playwright' }, { name: 'Python' }, { name: 'AI-assisted QA workflows' }],
    },
  ],
};
