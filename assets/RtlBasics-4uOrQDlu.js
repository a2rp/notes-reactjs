import{j as e}from"./index-CDxhzYTb.js";import{S as s}from"./styled-CRAefCRT.js";const i=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"React Testing Library (RTL) — Basics"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"React Testing Library (RTL)"})," helps you test React components by interacting with them the way a user would—via the DOM. It's built on top of ",e.jsx("b",{children:"DOM Testing Library"})," and typically runs with ",e.jsx("b",{children:"Jest"})," in a",e.jsx("b",{children:" JSDOM"})," environment. Focus on ",e.jsx("i",{children:"behavior"})," and ",e.jsx("i",{children:"accessibility"}),", not implementation details."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Jest:"})," a JavaScript ",e.jsx("i",{children:"test runner"})," and ",e.jsx("i",{children:"assertion library"}),". It discovers tests, runs them, and reports results."]}),e.jsxs("li",{children:[e.jsx("b",{children:"JSDOM:"})," a Node.js-based ",e.jsx("i",{children:"browser-like"})," DOM used during tests (no real browser UI)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DOM Testing Library (DTL):"})," low-level utilities to query and assert against DOM nodes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"React Testing Library (RTL):"})," React bindings around DTL that render components and encourage user-centric tests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Unit test:"})," tests a small piece (e.g., a component) in isolation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Integration test:"})," tests how pieces work together (e.g., component + context + router)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Assertion:"})," a statement you expect to be true (e.g., ",e.jsx(s.InlineCode,{children:"expect(button).toBeDisabled()"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Matcher:"})," the function after ",e.jsx(s.InlineCode,{children:"expect(...)"})," (e.g., ",e.jsx(s.InlineCode,{children:"toBeInTheDocument()"}),")."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"First Test (happy path)"}),e.jsx(s.Pre,{children:`// Example: src/components/Greet.jsx
export default function Greet({ name }) {
  return <h1>Hello, {name ?? "stranger"}!</h1>;
}

// Example test: src/components/__tests__/Greet.test.jsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Greet from "../Greet";

test("renders greeting with provided name", () => {
  render(<Greet name="Ashish" />);                   // Render component into JSDOM
  const heading = screen.getByRole("heading", { name: /hello, ashish!/i });
  expect(heading).toBeInTheDocument();               // Assertion via jest-dom matcher
});`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"@testing-library/jest-dom"})," extends Jest with DOM-specific matchers like"," ",e.jsx(s.InlineCode,{children:"toBeInTheDocument"}),","," ",e.jsx(s.InlineCode,{children:"toHaveTextContent"}),", and"," ",e.jsx(s.InlineCode,{children:"toBeDisabled"}),"."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Queries (how you find elements)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"By role (preferred):"})," ",e.jsxs(s.InlineCode,{children:['getByRole("button", ',"{{ name: /submit/i }}",")"]})," — role + accessible name (best for a11y)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"By label text:"})," ",e.jsx(s.InlineCode,{children:'getByLabelText("Email")'})," — for form controls with ",e.jsx(s.InlineCode,{children:"<label>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"By placeholder:"})," ",e.jsx(s.InlineCode,{children:'getByPlaceholderText("Search")'})," — when no label exists (use sparingly)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"By text:"})," ",e.jsx(s.InlineCode,{children:"getByText(/hello/i)"})," — visible text content."]}),e.jsxs("li",{children:[e.jsx("b",{children:"By alt text:"})," ",e.jsx(s.InlineCode,{children:'getByAltText("User avatar")'})," — for images."]}),e.jsxs("li",{children:[e.jsx("b",{children:"By title:"})," ",e.jsx(s.InlineCode,{children:'getByTitle("tooltip")'})," — last resort for non-interactive labels."]}),e.jsxs("li",{children:[e.jsx("b",{children:"By test id (escape hatch):"})," ",e.jsx(s.InlineCode,{children:'getByTestId("sum")'})," — use only when no accessible query fits."]})]}),e.jsx(s.Pre,{children:`// getBy*: returns the element or throws if not found
// queryBy*: returns the element or null (no throw)
// findBy*: async; returns a Promise that resolves when the element appears

// Example:
screen.getByRole("button", { name: /save/i });     // throws if missing
screen.queryByText(/loading/i);                    // null if missing (good for "not present" checks)
await screen.findByText(/welcome/i);               // waits until it appears (use with async UI)`})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Interactions with ",e.jsx("code",{children:"userEvent"})]}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"userEvent:"})," simulates real user actions (typing, clicking) with proper events and timing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"fireEvent:"})," lower-level event trigger; prefer ",e.jsx(s.InlineCode,{children:"userEvent"})," for realism."]})]}),e.jsx(s.Pre,{children:`import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function Login() {
  const [email, setEmail] = React.useState("");
  return (
    <form>
      <label htmlFor="em">Email</label>
      <input id="em" value={email} onChange={e => setEmail(e.target.value)} />
      <button disabled={!email}>Submit</button>
    </form>
  );
}

test("enables submit after typing email", async () => {
  const user = userEvent.setup();                 // setup once per test
  render(<Login />);

  const input = screen.getByLabelText(/email/i);
  const button = screen.getByRole("button", { name: /submit/i });

  expect(button).toBeDisabled();

  await user.type(input, "ashish@example.com");  // async; await it
  expect(button).toBeEnabled();
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Asynchronous UI"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"findBy*"})," waits for element to appear (uses ",e.jsx(s.InlineCode,{children:"waitFor"})," under the hood)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"waitFor"})," retries an assertion until it passes or times out (use for state that settles asynchronously)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"waitForElementToBeRemoved"})," waits for a loading spinner or toast to disappear."]})]}),e.jsx(s.Pre,{children:`import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function FetchUser() {
  const [name, setName] = React.useState(null);
  async function load() {
    const data = await Promise.resolve({ name: "Ashish" }); // pretend fetch
    setName(data.name);
  }
  return (
    <div>
      <button onClick={load}>Load</button>
      {!name ? <span role="status">Loading…</span> : <p>Hello, {name}</p>}
    </div>
  );
}

test("loads and shows user", async () => {
  const user = userEvent.setup();
  render(<FetchUser />);

  await user.click(screen.getByRole("button", { name: /load/i }));
  await waitForElementToBeRemoved(() => screen.getByRole("status")); // spinner gone
  await screen.findByText(/hello, ashish/i);                          // appears
  await waitFor(() => expect(screen.queryByRole("status")).toBeNull()); // stays gone
});`})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Scoping with ",e.jsx("code",{children:"within"})," & structural queries"]}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"within(container)"})," limits queries to a subtree."]}),e.jsx("li",{children:"Use to avoid ambiguous matches in complex UIs (tables, lists, modals)."})]}),e.jsx(s.Pre,{children:`import { render, screen, within } from "@testing-library/react";

function Table() {
  return (
    <table>
      <tbody>
        <tr aria-label="row-1"><td>Item</td><td><button>Edit</button></td></tr>
        <tr aria-label="row-2"><td>Item</td><td><button>Edit</button></td></tr>
      </tbody>
    </table>
  );
}

test("clicks Edit in row-2", () => {
  render(<Table />);
  const row2 = screen.getByRole("row", { name: /row-2/i });
  const { getByRole } = within(row2);
  expect(getByRole("button", { name: /edit/i })).toBeInTheDocument();
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Accessibility-First Queries"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Role:"})," what the element ",e.jsx("i",{children:"is"})," (button, textbox, link, heading, alert, status, dialog, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Accessible name:"})," the label users hear/see (content, ",e.jsx(s.InlineCode,{children:"aria-label"}),", associated ",e.jsx(s.InlineCode,{children:"<label>"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Examples:"})," ",e.jsxs(s.InlineCode,{children:['getByRole("button", ',"{{ name: /save/i }}",")"]}),","," ",e.jsxs(s.InlineCode,{children:['getByRole("heading", ',"{{ level: 2, name: /profile/i }}",")"]})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid:"})," ",e.jsx(s.InlineCode,{children:"getByTestId"})," unless absolutely necessary."]})]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Custom ",e.jsx("code",{children:"render"})," with Providers"]}),e.jsx(s.Small,{children:"Wrap components with Router/Context/Redux in a single helper."}),e.jsx(s.Pre,{children:`// src/test-utils.jsx
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

function Providers({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

const customRender = (ui, options) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from "@testing-library/react";
export { customRender as render };`}),e.jsxs(s.Small,{children:["Then import ",e.jsx(s.InlineCode,{children:"render"})," from ",e.jsx(s.InlineCode,{children:"src/test-utils"})," in your tests."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," test ",e.jsx("i",{children:"behavior"})," and ",e.jsx("i",{children:"outcomes"})," (what the user sees/does)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer role-based queries and real interactions with ",e.jsx(s.InlineCode,{children:"userEvent"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(s.InlineCode,{children:"findBy*"})," for async UI and ",e.jsx(s.InlineCode,{children:"waitFor"})," for eventually-true assertions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," assert internal state or call component functions directly (implementation details)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," stub timers/network without reason—mock them purposefully for deterministic tests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," overuse ",e.jsx(s.InlineCode,{children:"getByTestId"}),"—it bypasses accessibility."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Role:"})," the semantic purpose of an element for assistive tech (e.g., button, dialog)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Accessible name:"})," the text label announced by screen readers (from content/label/aria-label)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Assertion:"})," a check using ",e.jsx(s.InlineCode,{children:"expect(...)"})," that must pass."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Matcher:"})," function chained off ",e.jsx(s.InlineCode,{children:"expect"})," (e.g., ",e.jsx(s.InlineCode,{children:"toHaveValue"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fixture:"})," sample component/data used in tests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mock:"})," a fake function/module used to control side effects (network, time, storage)."]})]})]}),e.jsxs(s.Callout,{children:["Summary: Write tests that reflect how users interact with your app. Query by role and accessible name, use ",e.jsx("code",{children:"userEvent"})," for realistic input, and handle async UI with ",e.jsx("code",{children:"findBy"})," and ",e.jsx("code",{children:"waitFor"}),". Favor clarity and behavior over internals—your tests will be reliable and maintainable."]})]});export{i as default};
