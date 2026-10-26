import { defineConfig, devices } from '@playwright/test';

/**
 * Smoke/regression suite for the portfolio. Uses the locally installed
 * Microsoft Edge by default; set PW_CHANNEL=chromium after running
 * `npx playwright install chromium` to use Playwright's bundled browser.
 */
const channel = process.env.PW_CHANNEL ?? 'msedge';
const browser = channel === 'chromium' ? {} : { channel };

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4317',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run build && npm run preview -- --port 4317 --strictPort',
    url: 'http://localhost:4317',
    // Always build and serve fresh so tests never hit a stale preview server.
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], ...browser, viewport: { width: 1440, height: 900 } } },
    { name: 'tablet', use: { ...devices['Desktop Chrome'], ...browser, viewport: { width: 820, height: 1180 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'], ...browser } },
  ],
});
