import{j as e}from"./index-DqLKwkYK.js";import{S as n}from"./styled-BDjAuSxJ.js";const r=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Accessibility (A11y) Tests"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Accessibility (A11y)"})," means your UI can be used by ",e.jsx("i",{children:"everyone"}),", including people using assistive tech (screen readers, switch devices), keyboard-only navigation, or high-contrast modes. A11y tests verify ",e.jsx("b",{children:"roles"}),", ",e.jsx("b",{children:"names"}),", ",e.jsx("b",{children:"states"}),", keyboard access, focus management, color/contrast (partly), and the presence of meaningful landmarks and labels."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"What & Why"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Role:"})," the semantic type of an element (e.g., ",e.jsx(n.InlineCode,{children:"button"}),",",e.jsx(n.InlineCode,{children:"checkbox"}),", ",e.jsx(n.InlineCode,{children:"navigation"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Accessible name:"})," the label announced by assistive tech (from text content,"," ",e.jsx(n.InlineCode,{children:"aria-label"}),", associated ",e.jsx(n.InlineCode,{children:"<label>"}),", or"," ",e.jsx(n.InlineCode,{children:"aria-labelledby"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State/Property:"})," dynamic attributes like ",e.jsx(n.InlineCode,{children:"aria-checked"}),","," ",e.jsx(n.InlineCode,{children:"aria-expanded"}),", ",e.jsx(n.InlineCode,{children:"disabled"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Landmarks:"})," document regions like ",e.jsx(n.InlineCode,{children:"header"}),","," ",e.jsx(n.InlineCode,{children:"nav"}),", ",e.jsx(n.InlineCode,{children:"main"}),","," ",e.jsx(n.InlineCode,{children:"footer"})," that help navigation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus management:"})," how keyboard focus moves and what gets focused after actions (open/close modals, route changes)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Recommended Tools (Unit/Component & E2E)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"React Testing Library (RTL):"})," query the DOM ",e.jsx("i",{children:"like a user"}),"(e.g., ",e.jsx(n.InlineCode,{children:"getByRole"}),","," ",e.jsx(n.InlineCode,{children:"getByLabelText"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"@testing-library/jest-dom:"})," matchers such as"," ",e.jsx(n.InlineCode,{children:"toBeInTheDocument"}),","," ",e.jsx(n.InlineCode,{children:"toHaveAccessibleName"}),","," ",e.jsx(n.InlineCode,{children:"toHaveAccessibleDescription"}),","," ",e.jsx(n.InlineCode,{children:"toHaveFocus"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"jest-axe / axe-core:"})," automated a11y rules (WCAG) checks for common issues."]}),e.jsxs("li",{children:[e.jsx("b",{children:"user-event:"})," simulate real keyboard and mouse interactions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"E2E (Cypress or Playwright) + axe:"})," run a11y checks and keyboard flows in a real browser."]})]}),e.jsx(n.Small,{children:"Note: Automated tools don't catch everything (e.g., focus order logic, meaningful labels). Combine with RTL role/label queries and manual checks (contrast, zoom, screen reader smoke tests)."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Semantics: Roles & Names"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Prefer ",e.jsx("b",{children:"semantic HTML"})," (",e.jsx(n.InlineCode,{children:"<button>"}),",",e.jsx(n.InlineCode,{children:"<nav>"}),",",e.jsx(n.InlineCode,{children:"<main>"}),") so roles are automatic."]}),e.jsxs("li",{children:["Query by ",e.jsx("b",{children:"role + name"})," to mirror assistive tech behavior."]})]}),e.jsx(n.Pre,{children:`// Example: Button with a clear accessible name
import { render, screen } from "@testing-library/react";

function CloseButton() {
  return (
    <button aria-label="Close dialog">
      <span aria-hidden>×</span>
    </button>
  );
}

test("has role=button and name 'Close dialog'", () => {
  render(<CloseButton />);
  const btn = screen.getByRole("button", { name: /close dialog/i });
  expect(btn).toBeInTheDocument();
});`})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Labels: ",e.jsx("code",{children:"getByLabelText"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Associate labels via ",e.jsx(n.InlineCode,{children:"<label for>"})," or wrapping, or use ",e.jsx(n.InlineCode,{children:"aria-labelledby"}),"."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"getByLabelText"})," finds form fields by their visual/announced label."]})]}),e.jsx(n.Pre,{children:`import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function Login() {
  return (
    <form>
      <label htmlFor="email">Email address</label>
      <input id="email" type="email" />
      <button>Submit</button>
    </form>
  );
}

test("email is labeled and usable by keyboard", async () => {
  render(<Login />);
  const email = screen.getByLabelText(/email address/i);
  await userEvent.type(email, "dev@example.com");
  expect(email).toHaveValue("dev@example.com");
});`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Keyboard Navigation & Focus"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Tab order:"})," pressing ",e.jsx("kbd",{children:"Tab"})," moves focus through interactive elements in visual order."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus trap:"})," keeps keyboard focus inside a modal/dialog until it's closed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Roving tabindex:"})," only one item in a composite widget has ",e.jsx(n.InlineCode,{children:"tabIndex=0"})," at a time; arrow keys move the active item."]})]}),e.jsx(n.Pre,{children:`import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function Toolbar() {
  return (
    <div role="toolbar" aria-label="Text formatting">
      <button>Bold</button>
      <button>Italic</button>
      <button>Underline</button>
    </div>
  );
}

test("toolbar buttons are reachable via Tab and focus is visible", async () => {
  render(<Toolbar />);
  await userEvent.tab();
  expect(screen.getByRole("button", { name: /bold/i })).toHaveFocus();
  await userEvent.tab();
  expect(screen.getByRole("button", { name: /italic/i })).toHaveFocus();
});`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"States & ARIA"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use ",e.jsx("b",{children:"native elements"})," first; add ARIA only when needed. ARIA should ",e.jsx("i",{children:"enhance"}),", not replace, semantics."]}),e.jsxs("li",{children:["Test dynamic states like ",e.jsx(n.InlineCode,{children:"aria-expanded"}),","," ",e.jsx(n.InlineCode,{children:"aria-checked"}),","," ",e.jsx(n.InlineCode,{children:"disabled"}),"."]})]}),e.jsx(n.Pre,{children:`import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function Accordion() {
  const [open, setOpen] = React.useState(false);
  return (
    <section>
      <button
        aria-expanded={open}
        aria-controls="panel"
        onClick={() => setOpen(v => !v)}
      >
        Details
      </button>
      <div id="panel" hidden={!open}>
        Hidden content
      </div>
    </section>
  );
}

test("accordion toggles aria-expanded and visibility", async () => {
  render(<Accordion />);
  const btn = screen.getByRole("button", { name: /details/i });
  expect(btn).toHaveAttribute("aria-expanded", "false");
  await userEvent.click(btn);
  expect(btn).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByText(/hidden content/i)).toBeInTheDocument();
});`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Landmarks & Structure"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Pages should have a single ",e.jsx(n.InlineCode,{children:"main"})," region, optional"," ",e.jsx(n.InlineCode,{children:"header"}),"/",e.jsx(n.InlineCode,{children:"footer"}),", and"," ",e.jsx(n.InlineCode,{children:"nav"})," areas."]}),e.jsxs("li",{children:["Provide a ",e.jsx("b",{children:"skip link"})," to jump to ",e.jsx(n.InlineCode,{children:"main"}),"."]})]}),e.jsx(n.Pre,{children:`import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header>Header</header>
      <nav aria-label="Primary">...</nav>
      <main id="main">Article</main>
      <footer>Footer</footer>
    </>
  );
}

test("landmarks exist and skip link works", async () => {
  render(<Layout />);
  expect(screen.getByRole("banner")).toBeInTheDocument();       // header
  expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
  expect(screen.getByRole("main")).toBeInTheDocument();

  const skip = screen.getByRole("link", { name: /skip to content/i });
  await userEvent.click(skip);
  // In many apps, clicking the skip link moves focus to <main> or first heading inside it.
  // Here, assert that main exists; in real code you'd also manage focus.
  expect(screen.getByRole("main")).toBeInTheDocument();
});`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Live Regions & Announcements"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Live region:"})," an area that announces changes automatically to screen readers (e.g., ",e.jsx(n.InlineCode,{children:'aria-live="polite"'})," for toasts/status)."]}),e.jsx("li",{children:"Use for async status (“Saved”), validation summaries, or dynamic counts."})]}),e.jsx(n.Pre,{children:`import { render, screen } from "@testing-library/react";

function Status({ message }) {
  return <div role="status" aria-live="polite">{message}</div>;
}

test("status region is present and readable", () => {
  render(<Status message="Saved successfully" />);
  expect(screen.getByRole("status")).toHaveTextContent(/saved successfully/i);
});`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Automated Checks (axe)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"axe-core / jest-axe:"})," runs WCAG rules to catch common issues (missing labels, invalid ARIA, contrast hints)."]}),e.jsxs("li",{children:["Automated checks are a ",e.jsx("i",{children:"safety net"}),", not a replacement for semantic queries and keyboard tests."]})]}),e.jsx(n.Pre,{children:`// Example (Jest):
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

test("component has no obvious a11y violations", async () => {
  const { container } = render(<Layout />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});`}),e.jsxs(n.Small,{children:["In E2E, use ",e.jsx(n.InlineCode,{children:"cypress-axe"})," or"," ",e.jsx(n.InlineCode,{children:"@axe-core/playwright"})," to scan real pages."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Images & Media"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Meaningful image:"})," must have ",e.jsx(n.InlineCode,{children:"alt"})," text that describes the purpose."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Decorative image:"})," empty alt (",e.jsx(n.InlineCode,{children:'alt=""'}),") so screen readers skip it."]}),e.jsxs("li",{children:["Prefer ",e.jsx("b",{children:"captions"})," and transcripts for audio/video."]})]}),e.jsx(n.Pre,{children:`import { render, screen } from "@testing-library/react";

function Avatar() {
  return <img src="/me.png" alt="Ashish Ranjan" />;
}

test("image has accessible name via alt", () => {
  render(<Avatar />);
  const img = screen.getByRole("img", { name: /ashish ranjan/i });
  expect(img).toBeInTheDocument();
});`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use semantic HTML and query by role/label in tests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," ensure all interactions are keyboard accessible and focus is visible."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," manage focus on dialogs, route changes, and after async actions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," rely only on snapshots—use behavior-focused assertions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," overuse ARIA; prefer native controls."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary (Terms Used Here)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"WCAG:"})," Web Content Accessibility Guidelines—industry standards for web accessibility."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Assistive technology (AT):"})," software/hardware that helps people interact with UIs (e.g., screen readers)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Accessible name:"})," the label announced by AT; derived from visible text, labels, or ARIA."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Role:"})," semantic type of an element (button, link, main, navigation, dialog)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State/Property:"})," dynamic attributes like checked/expanded/disabled that AT reads."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Landmark:"})," structural region (header, nav, main, footer) used for quick navigation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus trap:"})," keeps keyboard focus inside a component (e.g., a modal)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Roving tabindex:"})," technique for composite widgets where only one item is tabbable at a time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Live region:"})," area that announces updates automatically (role=status, aria-live)."]})]})]}),e.jsxs(n.Callout,{children:["Summary: Write tests that mirror how people use your app—by role, name, and keyboard. Combine RTL queries, ",e.jsx("i",{children:"user-event"}),", and ",e.jsx("i",{children:"axe"})," checks. Prefer semantic elements, manage focus, label every control, and verify landmarks and status messages."]})]});export{r as default};
