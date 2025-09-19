import{j as e}from"./index-CAccbg1x.js";import{S as s}from"./styled-Cq2i5DdL.js";const n=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"End-to-End (E2E) Testing with Cypress"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"E2E testing"})," verifies your app the way a real user would—by driving the browser and asserting on the final UI and network side-effects. ",e.jsx("b",{children:"Cypress"})," is a test runner that runs inside the browser, giving ",e.jsx("em",{children:"automatic waiting"}),", ",e.jsx("em",{children:"time-travel debugging"}),", and a simple command API."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Key Definitions (clear & precise)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"End-to-End (E2E) Test:"})," A test that exercises the app through the UI and browser APIs, from user action to final effect (UI or network)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Spec file:"})," A test file (e.g., ",e.jsx(s.InlineCode,{children:"*.cy.js/ts"}),") containing suites and tests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Suite:"})," A group of tests created with ",e.jsx(s.InlineCode,{children:"describe()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Test:"})," An individual case created with ",e.jsx(s.InlineCode,{children:"it()"})," or ",e.jsx(s.InlineCode,{children:"test()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Assertion:"})," A check that must be true (e.g., ",e.jsx(s.InlineCode,{children:"cy.contains('Welcome')"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Selector:"})," A way to find elements (e.g., ",e.jsx(s.InlineCode,{children:'[data-cy="submit"]'}),") in the DOM."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Command queue:"})," Cypress schedules commands (e.g., ",e.jsx(s.InlineCode,{children:"cy.get()"}),") and runs them with built-in retries and waits."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Automatic waiting:"})," Cypress retries commands/assertions until they pass or time out—no manual ",e.jsx(s.InlineCode,{children:"sleep()"})," needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fixture:"})," A static file (JSON, etc.) used as test data (",e.jsx(s.InlineCode,{children:"cypress/fixtures"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stub/Spy:"})," Test doubles—stubs replace a function/endpoint; spies observe calls."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Intercept:"})," Cypress API (",e.jsx(s.InlineCode,{children:"cy.intercept()"}),") to observe or mock network requests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Flaky test:"})," A test that sometimes passes and sometimes fails without code changes (usually timing or selector issues)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why Cypress?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Runs in the browser:"})," See the app and test side-by-side, with ",e.jsx("i",{children:"time-travel"})," snapshots."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Automatic waiting & retries:"})," Less manual timing code; fewer flakes when used correctly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Great DX:"})," Live reloading, readable failures, and helpful screenshots/videos in CI."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Project Structure (typical)"}),e.jsx(s.Pre,{children:`cypress/
  e2e/
    home.cy.js
    login.cy.js
  fixtures/
    user.json
  support/
    e2e.js          // global hooks & custom commands
cypress.config.js   // baseUrl, viewport, retries, etc.`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Spec files"})," live in ",e.jsx(s.InlineCode,{children:"cypress/e2e"}),". Put reusable helpers in"," ",e.jsx(s.InlineCode,{children:"cypress/support"}),"."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Your First Test (smoke)"}),e.jsx(s.Pre,{children:`// cypress/e2e/home.cy.js
describe('Home Page', () => {
  it('loads and shows the title', () => {
    cy.visit('/');                               // baseUrl + '/'
    cy.findByRole('heading', { name: /react notes/i }); // if using @testing-library/cypress
    // or: cy.contains('React Notes');           // minimal assertion
  });
});`}),e.jsxs(s.Small,{children:["Prefer ",e.jsx("b",{children:"role-based queries"})," (via ",e.jsx(s.InlineCode,{children:"@testing-library/cypress"}),") for accessibility. Otherwise use a stable ",e.jsx(s.InlineCode,{children:"data-cy"})," attribute."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Stable Selectors"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do:"})," add ",e.jsx(s.InlineCode,{children:"data-cy"})," attributes to important elements."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't:"})," rely on CSS classes or text that frequently changes."]})]}),e.jsx(s.Pre,{children:`// in your app markup
<button data-cy="nav-home">Home</button>

// in the test
cy.get('[data-cy="nav-home"]').click();`})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Network: Observe or Mock with ",e.jsx("code",{children:"cy.intercept()"})]}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Observe:"})," let the real request happen, make assertions on it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mock:"})," return fixture data to test edge cases deterministically."]})]}),e.jsx(s.Pre,{children:`// Observe a real GET
cy.intercept('GET', '/api/notes').as('getNotes');
cy.visit('/notes');
cy.wait('@getNotes').its('response.statusCode').should('eq', 200);

// Mock a GET with fixture
cy.intercept('GET', '/api/notes', { fixture: 'notes.json' }).as('getNotesMock');
cy.visit('/notes');
cy.wait('@getNotesMock');
cy.contains('My First Note');`}),e.jsxs(s.Small,{children:["Use ",e.jsx("b",{children:"fixtures"})," for predictable tests. Keep separate specs for “real API” smoke vs “mocked” flows."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Custom Commands (reuse flows)"}),e.jsx(s.Pre,{children:`// cypress/support/e2e.js
Cypress.Commands.add('login', (email, password) => {
  cy.session([email], () => {
    cy.visit('/login');
    cy.get('[data-cy="email"]').type(email);
    cy.get('[data-cy="password"]').type(password, { log: false });
    cy.get('[data-cy="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});

// usage in spec
cy.login('user@example.com', 'Secret#123');`}),e.jsxs(s.Small,{children:[e.jsx(s.InlineCode,{children:"cy.session()"})," caches auth between tests for speed and stability."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Fixtures & Environment Variables"}),e.jsx(s.Pre,{children:`// cypress/fixtures/user.json
{ "email": "demo@site.com", "name": "Demo User" }

// in spec
cy.fixture('user').then((u) => {
  cy.get('[data-cy="email"]').type(u.email);
});

// cypress.config.js (snippet)
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    env: { API_URL: 'http://localhost:4000' },
  },
});`}),e.jsxs(s.Small,{children:["Access env via ",e.jsx(s.InlineCode,{children:"Cypress.env('API_URL')"}),". Keep secrets in CI, not in git."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Reducing Flaky Tests"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Assert UI that users see:"})," text, roles, visible elements—not internal state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid fixed waits:"})," don't use ",e.jsx(s.InlineCode,{children:"cy.wait(1000)"}),". Prefer query + assertion; Cypress will retry."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use stable selectors:"})," ",e.jsx(s.InlineCode,{children:"data-cy"})," everywhere critical."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Control network:"})," mock or seed test data for deterministic scenarios."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reset state:"})," use ",e.jsx(s.InlineCode,{children:"cy.session"})," and seed/cleanup hooks if your app stores auth or data."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep E2E specs small and focused on critical user flows."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer semantic/role queries for accessibility."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," isolate “mocked” vs “real API” specs to make failures meaningful."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," test implementation details (classes, internals)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," stack multiple unrelated assertions in one test—failures become hard to debug."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Example Flow: Create Note (mocked)"}),e.jsx(s.Pre,{children:`// cypress/e2e/notes-create.cy.js
describe('Notes - Create', () => {
  it('creates a note and shows it in the list', () => {
    cy.intercept('GET', '/api/notes', { fixture: 'notes-empty.json' }).as('getNotes');
    cy.intercept('POST', '/api/notes', (req) => {
      expect(req.body).to.have.keys(['title', 'content']);
      req.reply({ id: 'n_123', ...req.body });
    }).as('createNote');

    cy.visit('/notes');
    cy.wait('@getNotes');
    cy.get('[data-cy="new-note"]').click();
    cy.get('[data-cy="note-title"]').type('E2E with Cypress');
    cy.get('[data-cy="note-content"]').type('This is reliable and fast.');
    cy.get('[data-cy="save-note"]').click();

    cy.wait('@createNote').its('response.statusCode').should('eq', 200);
    cy.contains('E2E with Cypress'); // appears in the list
  });
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"CI & Headless Runs"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Headless:"})," ",e.jsx(s.InlineCode,{children:"cypress run"})," (no GUI) for CI. Artifacts: screenshots/videos on failure."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parallelization:"})," Split specs across CI workers to speed up suites."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Retries:"})," Configure test retries in ",e.jsx(s.InlineCode,{children:"cypress.config.js"})," (use judiciously; fix root causes)."]})]}),e.jsx(s.Pre,{children:`// cypress.config.js (retry & video example)
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    retries: 1,          // one retry on CI
    video: true,         // keep videos for failures
    screenshotOnRunFailure: true,
  },
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary (quick recall)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Base URL:"})," Root address used by ",e.jsx(s.InlineCode,{children:"cy.visit()"})," (set in config)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Viewport:"})," Browser window size controlled via ",e.jsx(s.InlineCode,{children:"cy.viewport()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fixture:"})," Static test data loaded via ",e.jsx(s.InlineCode,{children:"cy.fixture()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Intercept:"})," Network observation/mocking via ",e.jsx(s.InlineCode,{children:"cy.intercept()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Flaky:"})," Unreliable test due to timing/selector/env issues."]})]})]}),e.jsx(s.Callout,{children:"Summary: Use Cypress to automate real user flows with stable selectors, minimal mocking where needed, and assertions on user-visible results. Keep specs focused, control network deterministically, and avoid timing hacks to build a fast, reliable E2E suite."})]});export{n as default};
