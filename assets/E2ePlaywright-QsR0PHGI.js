import{j as e}from"./index-BExKNf87.js";import{S as s}from"./styled-BgXCY-8I.js";const r=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"E2E Testing with Playwright"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"End-to-End (E2E) tests"})," verify the app as a user would: open a browser, visit pages, click/typing, network calls, and UI results. ",e.jsx("b",{children:"Playwright"})," is a modern E2E framework that launches real browsers (Chromium, Firefox, WebKit), gives stable ",e.jsx("i",{children:"locators"}),",",e.jsx("i",{children:"auto-waiting"}),", and an integrated ",e.jsx("i",{children:"test runner"}),", ",e.jsx("i",{children:"tracing"}),", and",e.jsx("i",{children:"parallelism"}),"."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"What is Playwright?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Playwright Test Runner:"})," built-in test framework to define tests, fixtures, reporters, retries, parallel workers, and CI integration."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Browsers:"})," controls ",e.jsx("i",{children:"Chromium"}),", ",e.jsx("i",{children:"Firefox"}),", and ",e.jsx("i",{children:"WebKit"})," (Safari engine)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Auto-waiting:"})," Playwright waits for elements to be ready (attached, visible, stable) before actions (",e.jsx(s.InlineCode,{children:"click"}),","," ",e.jsx(s.InlineCode,{children:"fill"}),") and assertions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Locators:"})," handles finding elements reliably (by role, label, test id, text, CSS)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tracing & screenshots:"})," capture recordings and debug failures with a visual timeline."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Core Concepts & Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Headless vs Headed:"})," ",e.jsx("i",{children:"Headless"})," runs without UI (faster); ",e.jsx("i",{children:"Headed"})," shows the real browser window for debugging."]}),e.jsxs("li",{children:[e.jsx("b",{children:"BrowserContext:"})," an isolated browser state (cookies/localStorage). Use a fresh context per test to avoid leakage."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Page:"})," a single tab within a context. Tests typically drive one or more pages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Locator:"})," a Playwright object that lazily finds elements and auto-waits for actions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fixture:"})," reusable test setup/teardown or shared utilities injected into tests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Trace:"})," a debug artifact (screenshots, DOM snapshots, network, console) viewable in the Trace Viewer."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Flakiness:"})," unstable tests that pass/fail randomly; minimize with auto-waiting, proper locators, and retries."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Install & Project Scripts"}),e.jsx(s.Small,{children:"Add as dev dependencies and wire scripts. (If your project already has Playwright, keep only what you need.)"}),e.jsx(s.Pre,{children:`# dev deps (JS)
npm i -D @playwright/test

# run once to download browsers
npx playwright install

# package.json scripts (example)
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:ui": "playwright test --ui",            // visual test runner
    "test:e2e:debug": "playwright test --debug",      // time travel debugger
    "test:e2e:update-snap": "playwright test --update-snapshots",
    "test:e2e:report": "playwright show-report"
  }
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Minimal Configuration"}),e.jsx(s.Pre,{children:`// playwright.config.js
// JS config; if using TS, name it playwright.config.ts
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',               // where your *.spec files live
  timeout: 30_000,                // per-test timeout
  retries: 1,                     // retry flaky tests once in CI
  use: {
    baseURL: 'http://localhost:5173',  // vite dev or preview URL
    trace: 'on-first-retry',           // collect trace on retry
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'WebKit',   use: { ...devices['Desktop Safari'] } },
  ],
});`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"projects"})," let you run the same tests across browsers/devices. ",e.jsx("b",{children:"baseURL"})," avoids repeating full URLs."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Your First Test"}),e.jsx(s.Pre,{children:`// e2e/home.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Home', () => {
  test('loads and shows the main heading', async ({ page }) => {
    await page.goto('/');  // resolves against baseURL
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/react/i);
  });

  test('navigates via sidebar link', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /jsx basics/i }).click();
    await expect(page).toHaveURL(/\\/jsx\\/basics/i);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/jsx basics/i);
  });
});`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"getByRole"})," uses ARIA roles—great for accessibility and stability. Assertions auto-wait until they pass or time out."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Locators: Stable Selectors"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"By role:"})," ",e.jsxs(s.InlineCode,{children:["getByRole('button', ","{ '{'} name: /save/i {'}'}",")"]})," — prefer semantic roles."]}),e.jsxs("li",{children:[e.jsx("b",{children:"By label:"})," ",e.jsx(s.InlineCode,{children:"getByLabel('Email')"})," — matches form labels."]}),e.jsxs("li",{children:[e.jsx("b",{children:"By placeholder:"})," ",e.jsx(s.InlineCode,{children:"getByPlaceholder('Search')"})," — quick for inputs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"By test id:"})," ",e.jsx(s.InlineCode,{children:"getByTestId('cart-count')"})," — add ",e.jsx(s.InlineCode,{children:"data-testid"})," only when needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Filter & nth:"})," ",e.jsxs(s.InlineCode,{children:["locator('.row').filter(","{ '{'}} hasText: 'Total' {{ '}'}",").nth(0)"]}),"."]})]}),e.jsx(s.Pre,{children:`// e2e/locators.spec.js
const { test, expect } = require('@playwright/test');

test('uses robust locators', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /save/i }).click();
  await page.getByLabel('Email').fill('demo@example.com');
  await page.getByPlaceholder('Search').fill('hooks');

  // test id example
  await expect(page.getByTestId('cart-count')).toHaveText('0');
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Test Lifecycle, Fixtures & Auth"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Hooks:"})," ",e.jsx(s.InlineCode,{children:"beforeAll"}),","," ",e.jsx(s.InlineCode,{children:"beforeEach"}),","," ",e.jsx(s.InlineCode,{children:"afterEach"}),","," ",e.jsx(s.InlineCode,{children:"afterAll"})," manage setup/cleanup."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fixtures:"})," reusable context (e.g., logged-in page). Use"," ",e.jsx(s.InlineCode,{children:"test.use"})," or custom fixtures."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Storage state:"})," save login cookies/localStorage to skip UI login in every test."]})]}),e.jsx(s.Pre,{children:`// e2e/auth.setup.js (global setup to create storage state)
const { chromium } = require('@playwright/test');
module.exports = async config => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/login');
  await page.fill('[name=email]', 'demo@example.com');
  await page.fill('[name=password]', 'pass1234');
  await page.click('button[type=submit]');
  await page.waitForURL('**/dashboard');
  await page.context().storageState({ path: 'e2e/.auth/state.json' });
  await browser.close();
};

// playwright.config.js (add)
globalSetup: require.resolve('./e2e/auth.setup.js'),
use: {
  baseURL: 'http://localhost:5173',
  storageState: 'e2e/.auth/state.json'
};`}),e.jsxs(s.Small,{children:["With ",e.jsx("b",{children:"storageState"}),", tests start already authenticated—fast and consistent."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Network Mocking"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," make tests fast, deterministic, and avoid hitting real APIs for known flows."]}),e.jsxs("li",{children:[e.jsx("b",{children:"How:"})," use ",e.jsx(s.InlineCode,{children:"page.route()"})," to"," ",e.jsx("i",{children:"fulfill"})," (mock) or ",e.jsx("i",{children:"continue"})," (pass through) requests."]})]}),e.jsx(s.Pre,{children:`// e2e/mock.spec.js
const { test, expect } = require('@playwright/test');

test('uses mocked products API', async ({ page }) => {
  await page.route('**/api/products', async route => {
    const body = [{ id: 1, name: 'Mock Phone', price: 199 }];
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(body)
    });
  });

  await page.goto('/products');
  await expect(page.getByText('Mock Phone')).toBeVisible();
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Visual & Accessibility Checks"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Visual snapshot:"})," ",e.jsx(s.InlineCode,{children:"await expect(page).toHaveScreenshot()"})," captures a baseline image to detect unexpected UI changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"a11y smoke:"})," integrate an accessibility scanner (e.g., axe) in E2E for quick regressions."]})]}),e.jsx(s.Pre,{children:`// e2e/visual.spec.js
const { test, expect } = require('@playwright/test');

test('homepage visual snapshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('home.png'); // run once with --update-snapshots
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Debugging Failures"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Trace Viewer:"})," open with"," ",e.jsx(s.InlineCode,{children:"npx playwright show-report"})," and click a failed test → ",e.jsx("i",{children:"Trace"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Debug mode:"})," ",e.jsx(s.InlineCode,{children:"npx playwright test --debug"})," pauses before actions; use ",e.jsx(s.InlineCode,{children:"page.pause()"})," to drop into the inspector."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Headed run:"})," ",e.jsx(s.InlineCode,{children:"npx playwright test --headed --project=Chromium"})," to see the browser."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Parallelism, Retries & Timeouts"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Workers:"})," number of parallel processes. Balance speed vs. server load.",e.jsx(s.InlineCode,{children:"workers: 4"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Retries:"})," re-run failing tests to reduce flakiness in CI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Expect timeout:"})," per-assertion timeout (default ~5s) can be tweaked per test if needed."]})]}),e.jsx(s.Pre,{children:`// in playwright.config.js
retries: process.env.CI ? 2 : 0,
workers: process.env.CI ? 2 : undefined,
use: { actionTimeout: 10_000, expect: { timeout: 5_000 } }`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"CI Example (GitHub Actions)"}),e.jsx(s.Pre,{children:`# .github/workflows/e2e.yml
name: E2E
on: [push, pull_request]
jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps
      # Start your app (vite preview or dev). Example with preview:
      - run: npm run build && npm run preview & npx wait-on http://localhost:4173
      - run: npx playwright test
      - run: npx playwright show-report || true`}),e.jsx(s.Small,{children:"In CI, serve a built preview (fast, production-like). Use wait-on to ensure the server is ready before tests."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use role/label based locators first; add ",e.jsx(s.InlineCode,{children:"data-testid"})," only when necessary."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep tests independent; reset backend state or mock network per test."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," capture traces/screenshots on failures to debug quickly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," sleep with fixed timeouts—let Playwright auto-wait or assert on UI state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," log in via UI for every test—reuse ",e.jsx("b",{children:"storageState"})," to speed up suites."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Quick Reference"}),e.jsx(s.Pre,{children:`// actions
await page.goto('/settings');
await page.getByRole('button', { name: /save/i }).click();
await page.fill('[name="email"]', 'user@example.com');

// assertions
await expect(page).toHaveURL(/\\/settings/);
await expect(page.getByText('Saved')).toBeVisible();

// debug
await page.pause();  // with: npx playwright test --debug`})]}),e.jsx(s.Callout,{children:"Summary: Playwright gives reliable, fast E2E tests with smart waiting, strong locators, and first-class debugging. Start small (one happy path), reuse authentication via storage state, mock critical APIs for determinism, and scale with projects, retries, and CI."})]});export{r as default};
