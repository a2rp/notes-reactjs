import{j as e}from"./index-CLbx3UkF.js";import{S as t}from"./styled-t3TDkLF3.js";const r=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Async Tests (React Testing Library + Jest)"}),e.jsxs(t.Lead,{children:["In UI tests, “async” means the UI changes ",e.jsx("b",{children:"later"})," (after a timer, a network call, a state transition, or the browser's event loop). We use ",e.jsx(t.InlineCode,{children:"await"})," ","with helpers like ",e.jsx(t.InlineCode,{children:"findBy*"})," and"," ",e.jsx(t.InlineCode,{children:"waitFor"})," to ",e.jsx("em",{children:"wait"})," for the UI to settle before asserting."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Key Terms (Plain English)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Promise:"})," an object that represents a value that will be ready later. It can ",e.jsx("i",{children:"resolve"})," (succeed) or ",e.jsx("i",{children:"reject"})," (fail)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"async/await:"})," syntax to pause until a Promise finishes, making async code read like sync."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Event loop:"})," the browser/runtime scheduler that runs tasks. Two key queues:",e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Microtasks:"})," run ASAP after the current code (e.g., ",e.jsx(t.InlineCode,{children:"Promise.then"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Macrotasks:"})," run later (e.g., ",e.jsx(t.InlineCode,{children:"setTimeout"}),", timers, I/O)."]})]})]}),e.jsxs("li",{children:[e.jsx("b",{children:"React Testing Library (RTL):"})," testing helpers focused on user behavior and accessible queries."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Jest fake timers:"})," a Jest feature that lets tests ",e.jsx("i",{children:"fast-forward time"})," instead of waiting in real time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"findBy*"}),": RTL queries that ",e.jsx("i",{children:"wait"})," until an element appears, then return it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"waitFor(fn)"}),": repeatedly runs ",e.jsx("i",{children:"fn"})," until its assertions pass (or timeout)."]}),e.jsxs("li",{children:[e.jsx("b",{children:e.jsx("code",{children:"act(...)"})}),": wraps updates so React can flush state/effects. RTL usually does this for you, but with manual timer jumps you may still need it."]})]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Pattern 1 — Use ",e.jsx("code",{children:"findBy*"})," to wait for UI after fetch"]}),e.jsx(t.Pre,{children:`// Component: loads users on mount
function Users() {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    fetch("/api/users").then(r => r.json()).then(setUsers);
  }, []);
  return (
    <ul aria-label="users">
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}

// Test: mock fetch, then await the list item
import { render, screen } from "@testing-library/react";

test("loads and renders users", async () => {
  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    json: async () => [{ id: 1, name: "Ada" }],
  });

  render(<Users />);
  const item = await screen.findByText("Ada"); // waits until it appears
  expect(item).toBeInTheDocument();

  global.fetch.mockRestore();
});`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Why:"})," The list item doesn't exist immediately; ",e.jsx("code",{children:"findBy*"})," waits for it."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Pattern 2 — Use ",e.jsx("code",{children:"waitFor"})," when there's no single “findable” element"]}),e.jsx(t.Pre,{children:`// Component: button enabled after async validation
function Form() {
  const [value, setValue] = React.useState("");
  const [valid, setValid] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    if (!value) return setValid(false);
    Promise.resolve().then(() => {  // pretend async validation
      if (!cancelled) setValid(value.length >= 3);
    });
    return () => { cancelled = true; };
  }, [value]);

  return (
    <form>
      <input
        aria-label="name"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button disabled={!valid}>Submit</button>
    </form>
  );
}

// Test
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("enables submit after async validation", async () => {
  render(<Form />);
  await userEvent.type(screen.getByLabelText("name"), "Ash"); // 3 chars

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /submit/i })).toBeEnabled();
  });
});`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Why:"})," There isn't a “loading → done” element to ",e.jsx("code",{children:"findBy"}),"; instead, wait for the ",e.jsx("i",{children:"state"})," (button enabled) to become true."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Pattern 3 — Debounced logic with ",e.jsx("code",{children:"jest.useFakeTimers()"})]}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Debounce:"})," delay running a function until input “goes quiet” for N ms."]}),e.jsx("li",{children:"Use Jest fake timers to jump time forward instantly (no real waiting)."})]}),e.jsx(t.Pre,{children:`// Component: debounced echo
function Debounced({ delay = 300 }) {
  const [text, setText] = React.useState("");
  const [echo, setEcho] = React.useState("");

  React.useEffect(() => {
    const id = setTimeout(() => setEcho(text), delay);
    return () => clearTimeout(id);
  }, [text, delay]);

  return (
    <>
      <input aria-label="search" value={text} onChange={(e) => setText(e.target.value)} />
      <p role="status">{echo}</p>
    </>
  );
}

// Test: advance timers instead of waiting
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

test("updates after debounce", async () => {
  jest.useFakeTimers(); // turn on fake timers

  render(<Debounced delay={300} />);
  await userEvent.type(screen.getByLabelText("search"), "hi");

  act(() => { jest.advanceTimersByTime(300); }); // flush the timeout
  expect(screen.getByRole("status")).toHaveTextContent("hi");

  jest.useRealTimers(); // cleanup
});`}),e.jsxs(t.Small,{children:[e.jsxs("b",{children:["Why ",e.jsx("code",{children:"act"}),"?"]})," Jumping timers causes React updates; wrapping in ",e.jsx("code",{children:"act"})," lets React flush them."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Pattern 4 — Assert loading and error states"}),e.jsx(t.Pre,{children:`function Loader() {
  const [state, setState] = React.useState({ status: "idle", data: null, error: null });
  React.useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });
    fetch("/api/item")
      .then(r => r.json())
      .then(data => !cancelled && setState({ status: "success", data, error: null }))
      .catch(error => !cancelled && setState({ status: "error", data: null, error }));
    return () => { cancelled = true; };
  }, []);

  if (state.status === "loading") return <p role="status">Loading…</p>;
  if (state.status === "error") return <p role="alert">Something went wrong</p>;
  return <p>{state.data.name}</p>;
}

// Test the 3 states
test("shows loading, then data", async () => {
  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    json: async () => ({ name: "Widget" }),
  });

  render(<Loader />);
  expect(screen.getByRole("status")).toHaveTextContent(/loading/i);
  expect(await screen.findByText("Widget")).toBeInTheDocument();

  global.fetch.mockRestore();
});

test("shows error on failure", async () => {
  jest.spyOn(global, "fetch").mockRejectedValueOnce(new Error("network"));

  render(<Loader />);
  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(await screen.findByRole("alert")).toHaveTextContent(/wrong/i);

  global.fetch.mockRestore();
});`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do / Don't (Async Tests)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer ",e.jsx(t.InlineCode,{children:"findBy*"})," for elements that appear later."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(t.InlineCode,{children:"waitFor"})," for conditions (enabled/disabled, counts, styles)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," mock network I/O; real servers make tests flaky. (Use ",e.jsx("i",{children:"MSW"})," for realistic mocks.)"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer ",e.jsx(t.InlineCode,{children:"userEvent"})," over ",e.jsx(t.InlineCode,{children:"fireEvent"})," to simulate real user behavior."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use Jest fake timers for debounce/throttle/interval tests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," sprinkle arbitrary ",e.jsx(t.InlineCode,{children:"setTimeout"})," in tests; they slow and flake."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," assert immediately after an async action—",e.jsx("i",{children:"wait"})," for the UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," over-mock React internals; test visible behavior, not implementation details."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Resolution:"})," a Promise finishing successfully."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rejection:"})," a Promise finishing with an error."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Flaky test:"})," sometimes passes, sometimes fails—often due to real time or network."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Deterministic:"})," same input → same output every time (goal of good tests)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MSW:"})," Mock Service Worker; intercepts requests and returns mock responses like a real server."]})]})]}),e.jsxs(t.Callout,{children:["Summary: Async tests wait for the UI to reflect reality—use ",e.jsx("i",{children:"findBy*"})," for elements,",e.jsx("i",{children:" waitFor"})," for conditions, and fake timers for time-based logic. Keep tests deterministic by mocking I/O and avoiding real delays."]})]});export{r as default};
