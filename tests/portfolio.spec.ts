import { expect, test, type Page } from '@playwright/test';
import { profile } from '../src/data/profile';
import { projects } from '../src/data/projects';

const { email, linkedin, github, resumeUrl } = profile.contact;

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'process', label: 'My Process' },
  { id: 'projects', label: 'Projects' },
  { id: 'home', label: 'Home' },
];

/** Scroll the whole page so every scroll-reveal element becomes visible. */
async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
}

/**
 * Wait until the section's top has scrolled to just under the sticky navbar —
 * or, for the last section, until the page can't scroll any further.
 */
async function expectInView(page: Page, id: string) {
  await expect
    .poll(
      async () =>
        page.locator(`#${id}`).evaluate((el) => {
          const top = el.getBoundingClientRect().top;
          const atBottom =
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 && top < window.innerHeight;
          return top < 120 || atBottom;
        }),
      { message: `#${id} should be scrolled into view` },
    )
    .toBe(true);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('hero shows the QualityLab identity and capability cards', async ({ page }) => {
  await expect(page).toHaveTitle('Bryan Laserna | Software QA Team Lead');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Bryan Santiago Laserna/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText("Hi, I'm BryanLaserna.");
  const hero = page.locator('#home');
  await expect(hero.getByText('Software Quality Assurance Team Lead', { exact: true })).toBeVisible();
  await expect(hero.getByText("Quality isn't a phase. It's the foundation.")).toBeVisible();
  await expect(hero.getByText(profile.hero.intro, { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'BRYAN.QA — back to top' })).toBeVisible();
  const capabilities = page.getByRole('list', { name: 'Core capabilities' });
  await expect(capabilities.getByRole('listitem')).toHaveCount(4);
  for (const title of ['Test Strategy', 'Quality Assurance', 'QA Leadership', 'Automation & AI']) {
    await expect(capabilities.getByRole('heading', { name: title, exact: true })).toBeVisible();
  }
});

test('name is the dominant hero element and does not collide with the illustration', async ({ page }) => {
  await page.evaluate(() => document.fonts.ready);
  const h1 = page.getByRole('heading', { level: 1 });
  const slogan = page.locator('#home').getByText("Quality isn't a phase. It's the foundation.");
  const size = (el: typeof h1) => el.evaluate((n) => parseFloat(getComputedStyle(n).fontSize));
  expect(await size(h1)).toBeGreaterThan((await size(slogan)) * 1.4);

  // Each name line fits on a single row (no awkward wrapping).
  const lineHeights = await h1.locator('span').evaluateAll((spans) =>
    spans.map((s) => s.getBoundingClientRect().height / parseFloat(getComputedStyle(s).lineHeight)),
  );
  for (const rows of lineHeights) expect(rows).toBeLessThan(1.5);

  // The headline never overlaps the workflow illustration.
  const a = await h1.boundingBox();
  const b = await page.locator('#home figure').boundingBox();
  const overlap = a && b && a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
  expect(overlap).toBeFalsy();
});

test('no VS Code interface or fabricated results remain', async ({ page }) => {
  await scrollThrough(page);
  const text = await page.locator('body').innerText();
  expect(text).not.toMatch(/\.spec\.ts|explorer|\bpassed\b|\bfailed\b|\bPASS\b/i);
  await expect(page.getByRole('tab')).toHaveCount(0);
  await expect(page.getByRole('menu')).toHaveCount(0);
});

test('every section is present in order with a dynamic footer year', async ({ page }) => {
  const ids = await page.locator('main > section').evaluateAll((els) => els.map((el) => el.id));
  expect(ids).toEqual(['home', 'about', 'journey', 'expertise', 'process', 'projects', 'contact']);
  await expect(page.locator('footer')).toContainText(`© ${new Date().getFullYear()}`);
});

test('hero buttons scroll to their sections', async ({ page }) => {
  await page.getByRole('link', { name: 'Explore My Expertise' }).click();
  await expect(page).toHaveURL(/#expertise$/);
  await expectInView(page, 'expertise');
  await page.goto('/');
  await page.getByRole('link', { name: 'Get in Touch' }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expectInView(page, 'contact');
});

test('deep links open at the right section', async ({ page }) => {
  await page.goto('/#journey');
  await expectInView(page, 'journey');
});

test('projects section is always present, in the nav, after My Process', async ({ page }) => {
  const section = page.locator('#projects');
  await expect(section.getByText('Selected Work')).toBeAttached();
  await expect(section.getByRole('heading', { name: 'Projects & Tools', level: 2 })).toBeAttached();
  await expect(section.getByText(/A collection of QA tools, automation solutions/)).toBeAttached();

  // Read the desktop nav directly: below 1024px it is hidden in favour of the menu.
  const navLabels = await page.locator('nav[aria-label="Primary"] a').allTextContents();
  expect(navLabels.map((t) => t.trim())).toEqual(['Home', 'About', 'Journey', 'Expertise', 'My Process', 'Projects']);
});

// Data-driven: checks the empty state now, and every card + detail page once projects are added.
test('projects grid matches src/data/projects.ts', async ({ page }) => {
  const section = page.locator('#projects');
  await section.scrollIntoViewIfNeeded();
  const empty = section.getByText(
    "Projects are being prepared. Check back soon to explore the tools and solutions I've built.",
  );
  if (projects.length === 0) {
    await expect(empty).toBeVisible();
    await expect(section.getByRole('link', { name: /View Details/ })).toHaveCount(0);
    return;
  }
  await expect(empty).toHaveCount(0);
  await expect(section.getByRole('article')).toHaveCount(projects.length);
  for (const p of projects) {
    const card = section.getByRole('article').filter({ hasText: p.title });
    await expect(card.getByRole('link', { name: `View Details about ${p.title}` })).toHaveAttribute(
      'href',
      `#/projects/${encodeURIComponent(p.slug)}`,
    );
    for (const tech of p.technologies) await expect(card.getByText(tech, { exact: true })).toBeAttached();
  }
});

test('featured projects are listed first', async ({ page }) => {
  test.skip(!projects.some((p) => p.featured), 'no featured project');
  const firstCard = page.locator('#projects').getByRole('article').first();
  await expect(firstCard.getByText('Featured')).toBeVisible();
  await expect(firstCard.getByRole('heading', { level: 3 })).toHaveText(projects.find((p) => p.featured)!.title);
});

test('every project image path loads', async ({ request }) => {
  const paths = projects.flatMap((p) => [p.thumbnail?.src, ...(p.caseStudy?.screenshots ?? []).map((s) => s.src)]);
  for (const src of paths.filter((x): x is string => Boolean(x))) {
    const res = await request.get(src);
    expect(res.status(), src).toBe(200);
    expect(res.headers()['content-type'], src).toMatch(/^image\//);
  }
});

test('case-study images render and have alt text', async ({ page }) => {
  for (const p of projects) {
    await page.goto(`/#/projects/${encodeURIComponent(p.slug)}`);
    const images = page.locator('main img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveAttribute('alt', /\S/);
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    }
  }
});

test('case-study page has no horizontal overflow', async ({ page }) => {
  for (const p of projects) {
    await page.goto(`/#/projects/${encodeURIComponent(p.slug)}`);
    await scrollThrough(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
  }
});

test.describe('case-study contents', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, 'the contents sidebar is shown from 1024px');

  test('sidebar scrolls to a section without changing the route', async ({ page }) => {
    test.skip(projects.length === 0, 'no projects published yet');
    const p = projects[0];
    await page.goto(`/#/projects/${encodeURIComponent(p.slug)}`);
    const toc = page.getByRole('navigation', { name: 'On this page' });
    const last = toc.getByRole('button').last();
    const label = (await last.textContent())!.trim();
    await last.click();
    await expect(page).toHaveURL(new RegExp(`#/projects/${encodeURIComponent(p.slug)}$`));
    await expect(page.getByRole('heading', { level: 2, name: new RegExp(label) })).toBeInViewport();
    await expect(last).toHaveAttribute('aria-current', 'location');
  });
});

test('each project detail page opens and returns to the Projects section', async ({ page }) => {
  test.skip(projects.length === 0, 'no projects published yet');
  for (const p of projects) {
    await page.goto('/#projects');
    const card = page.locator('#projects').getByRole('article').filter({ hasText: p.title });
    await card.scrollIntoViewIfNeeded();
    await card.getByRole('link', { name: `View Details about ${p.title}` }).click();
    await expect(page).toHaveURL(new RegExp(`#/projects/${encodeURIComponent(p.slug)}$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(p.title);
    await expect(page).toHaveTitle(`${p.title} | Bryan Laserna`);
    await expect(page.locator('#home')).toHaveCount(0);

    // Exactly the case-study sections that have content are rendered, in order.
    const c = p.caseStudy ?? {};
    const expected = [
      ['Overview', c.overview?.length],
      ['The Problem', c.problem?.length],
      ['The Approach', c.approach?.length],
      ['See It Working', c.screenshots?.length],
      ['How It Works', c.howItWorks?.length],
      ['Core Features', c.features?.length],
      ['What It Offers QA Testers', c.forTesters?.length],
      ['Technical Architecture', c.architecture],
      ['Engineering Challenges and Decisions', c.decisions?.length],
      ['Testing and Verification', c.testing],
      ['Lessons Learned', c.lessons?.length],
      ['Current Status and Roadmap', c.status],
      ['Project Availability', c.availability?.length],
    ]
      .filter(([, present]) => Boolean(present))
      .map(([title]) => title);
    const shown = (await page.locator('main section > h2').allTextContents()).map((t) => t.replace(/^\d+/, ''));
    expect(shown).toEqual(expected);

    await page.getByRole('link', { name: 'Back to Projects' }).first().click();
    await expect(page).toHaveURL(/#projects$/);
    await expectInView(page, 'projects');
  }
});

test('unknown project links show a not-found page with a way back', async ({ page }) => {
  await page.goto('/#/projects/does-not-exist');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Project not found');
  await expect(page).toHaveTitle('Project not found | Bryan Laserna');
  await page.getByRole('link', { name: 'Back to Projects' }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expectInView(page, 'projects');
  await expect(page).toHaveTitle('Bryan Laserna | Software QA Team Lead');
  // Browser back returns to the detail route.
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Project not found');
});

test('journey lists both roles without invented dates', async ({ page }) => {
  const journey = page.locator('#journey');
  await expect(journey.getByRole('heading', { name: 'Software Quality Assurance Team Lead' })).toBeAttached();
  await expect(journey.getByRole('heading', { name: 'Junior Software Quality Assurance Engineer' })).toBeAttached();
  await expect(journey.getByText('Current role')).toHaveCount(1);
  expect(await journey.textContent()).not.toMatch(/\b(19|20)\d{2}\b/);
});

test('expertise separates proven skills from those being explored', async ({ page }) => {
  const expertise = page.locator('#expertise');
  await expect(expertise.getByText('Proven experience')).toHaveCount(3);
  await expect(expertise.getByText('Currently exploring')).toHaveCount(1);
  const exploring = expertise.locator('article').filter({ hasText: 'Currently exploring' });
  await expect(exploring.getByText('Playwright')).toBeAttached();
  expect(await expertise.textContent()).not.toMatch(/\d+\s?%/);
});

test('process stages reveal their details when selected', async ({ page }) => {
  const process = page.locator('#process');
  const stages = process.getByRole('button');
  await expect(stages).toHaveCount(7);
  await expect(stages.first()).toHaveAttribute('aria-pressed', 'true');

  const defects = process.getByRole('button', { name: /Defect Management/ });
  await defects.scrollIntoViewIfNeeded();
  await defects.click();
  await expect(defects).toHaveAttribute('aria-pressed', 'true');
  await expect(stages.first()).toHaveAttribute('aria-pressed', 'false');
  await expect(process.getByText('Stage 05').locator('visible=true')).toBeVisible();
  await expect(process.getByText(/Log reproducible defects/).locator('visible=true')).toBeVisible();
});

// These tests read profile.contact, so they stay valid as details are added or removed.
test('contact shows exactly the configured channels', async ({ page }) => {
  const contact = page.locator('#contact');
  await contact.scrollIntoViewIfNeeded();
  await expect(contact.getByRole('heading', { name: "Let's build better software." })).toBeVisible();

  const expected: [string, string | null][] = [
    ['a[href^="mailto:"]', email ? `mailto:${email}` : null],
    ['a[href*="linkedin.com"]', linkedin],
    ['a[href*="github.com"]', github],
    ['a[download]', resumeUrl],
  ];
  for (const [selector, href] of expected) {
    if (href) {
      await expect(contact.locator(selector)).toHaveAttribute('href', href);
      if (!selector.includes('download')) {
        await expect(page.locator('footer').locator(selector)).toHaveAttribute('href', href);
      }
    } else {
      await expect(page.locator(selector)).toHaveCount(0);
    }
  }
  if (linkedin) await expect(contact.locator('a[href*="linkedin.com"]')).toHaveAttribute('target', '_blank');

  const anything = email || linkedin || github || resumeUrl;
  await expect(contact.getByText('Contact details will be published here shortly.')).toHaveCount(anything ? 0 : 1);
  await expect(contact.locator('form')).toHaveCount(email ? 1 : 0);
});

test('message form validates and hands off to the email app without claiming it was sent', async ({ page }) => {
  test.skip(!email, 'the form only appears when an email is configured');
  const form = page.locator('#contact form');
  await form.scrollIntoViewIfNeeded();
  await expect(form.getByText(/doesn't send messages from the site/)).toBeVisible();

  await form.getByRole('button', { name: 'Open in email app' }).click();
  await expect(form.getByText('Please enter your name.')).toBeVisible();
  await expect(form.getByText('Please enter your email address.')).toBeVisible();
  await expect(form.getByLabel('Name', { exact: true })).toBeFocused();

  await form.getByLabel('Name', { exact: true }).fill('Test Visitor');
  await form.getByLabel('Email', { exact: true }).fill('not-an-email');
  await form.getByLabel('Message', { exact: true }).fill('Hello Bryan, testing the form.');
  await form.getByRole('button', { name: 'Open in email app' }).click();
  await expect(form.getByText('Please enter a valid email address.')).toBeVisible();

  // The mailto: hand-off shows up as a (failed) request in headless browsers; capture it.
  await form.getByLabel('Email', { exact: true }).fill('visitor@example.com');
  const handoff = page.waitForEvent('request', (r) => r.url().startsWith('mailto:'));
  await form.getByRole('button', { name: 'Open in email app' }).click();
  const mailto = decodeURIComponent((await handoff).url());
  expect(mailto).toContain(`mailto:${email}?subject=Portfolio enquiry from Test Visitor`);
  expect(mailto).toContain('Hello Bryan, testing the form.');
  expect(mailto).toContain('visitor@example.com');
  await expect(form.getByText(/only sent once you send it from there/)).toBeVisible();
  await expect(page.getByText(/message (has been|was) sent/i)).toHaveCount(0);
});

test('theme toggle switches theme and persists across reload', async ({ page }) => {
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(html).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
});

test('navbar turns solid after scrolling', async ({ page }) => {
  const header = page.getByRole('banner');
  await expect(header).toHaveClass(/bg-transparent/);
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }));
  await expect(header).not.toHaveClass(/bg-transparent/);
});

test('no horizontal overflow anywhere on the page', async ({ page }) => {
  await scrollThrough(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBe(0);
});

test('content is visible immediately with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#process');
  await expect(page.locator('#contact .reveal').first()).toHaveCSS('opacity', '1');
});

test.describe('desktop navigation', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, 'desktop nav links are hidden below 1024px');

  test('nav links scroll to sections and mark the active one', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Primary' });
    for (const item of NAV) {
      const link = nav.getByRole('link', { name: item.label, exact: true });
      await link.click();
      await expect(page).toHaveURL(new RegExp(`#${item.id}$`));
      await expectInView(page, item.id);
      await expect(link).toHaveAttribute('aria-current', 'location');
    }
    await page.getByRole('banner').getByRole('link', { name: 'Contact' }).click();
    await expectInView(page, 'contact');
  });

  test('skip link and nav are reachable by keyboard', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'BRYAN.QA — back to top' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Home' })).toBeFocused();
  });
});

test.describe('mobile menu', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) >= 1024, 'the hamburger menu is used below 1024px');

  test('opens, closes with Escape, and navigates', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Open menu' });
    await toggle.click();
    const menu = page.getByRole('navigation', { name: 'Mobile' });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link', { name: /Projects/ })).toBeVisible();
    await expect(menu.getByRole('link').first()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();

    await toggle.click();
    await menu.getByRole('link', { name: /Journey/ }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#journey$/);
    await expectInView(page, 'journey');

    await page.getByRole('button', { name: 'Open menu' }).click();
    await menu.getByRole('link', { name: /Projects/ }).click();
    await expect(page).toHaveURL(/#projects$/);
    await expectInView(page, 'projects');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(menu.getByRole('link', { name: /Projects/ })).toHaveAttribute('aria-current', 'location');
  });
});

test('capture screenshots for visual review', async ({ page }, info) => {
  await scrollThrough(page);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `test-results/screens/${info.project.name}-hero.png` });
  await page.screenshot({ path: `test-results/screens/${info.project.name}-full.png`, fullPage: true });
});
