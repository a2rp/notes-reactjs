import{j as e}from"./index-CAccbg1x.js";import{S as t}from"./styled-Cq2i5DdL.js";const n=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Hooks Tests"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"Hooks tests"})," verify the ",e.jsx("i",{children:"behavior"})," of React hooks (built-in or custom) in isolation. You don't render real UI - you execute the hook and assert its ",e.jsx("b",{children:"returned values"}),",",e.jsx("b",{children:"effects"}),", and ",e.jsx("b",{children:"side-effects"}),". The goal is to test ",e.jsx("em",{children:"observable outcomes"}),", not implementation details."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"What is a Hook Test?"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Hook:"})," a function like ",e.jsx(t.InlineCode,{children:"useState"}),", ",e.jsx(t.InlineCode,{children:"useEffect"}),", or a ",e.jsx("i",{children:"custom hook"})," (e.g., ",e.jsx(t.InlineCode,{children:"useCounter"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hook test:"})," run the hook in a controlled test harness and assert its outputs (state, returned API) and effects (timers, storage, network)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Unit vs Integration:"})," a unit hook test isolates the hook; an integration test renders a component that uses the hook."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Essential Tools & Terms"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(t.InlineCode,{children:"renderHook"}),":"]})," utility from ",e.jsx(t.InlineCode,{children:"@testing-library/react"})," that lets you execute a hook and returns a test handle:",e.jsx(t.InlineCode,{children:"{ result, rerender, unmount }"}),". ",e.jsxs("i",{children:["(Older setups used ",e.jsx(t.InlineCode,{children:"@testing-library/react-hooks"}),".)"]})]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(t.InlineCode,{children:"act"}),":"]})," batches React updates in tests. Wrap any state-changing operation (e.g., calling a returned setter) so assertions see the final state."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(t.InlineCode,{children:"waitFor"}),":"]})," retries an assertion until it passes or times out - useful for async effects (fetch, timers)."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(t.InlineCode,{children:"wrapper"}),":"]})," an optional React component that provides context/providers while the hook runs (e.g., ",e.jsx(t.InlineCode,{children:"ThemeProvider"}),", ",e.jsx(t.InlineCode,{children:"Router"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mocking:"})," replacing real modules/APIs (fetch, storage, timers) with controllable test doubles. In Jest use ",e.jsx(t.InlineCode,{children:"jest.fn()"}),"/",e.jsx(t.InlineCode,{children:"jest.mock()"}),". In Vitest use ",e.jsx(t.InlineCode,{children:"vi.fn()"}),"/",e.jsx(t.InlineCode,{children:"vi.mock()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cleanup:"})," releasing resources (listeners, timers) on ",e.jsx(t.InlineCode,{children:"unmount"})," and verifying no leaks remain."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Anatomy of a Hook Test"}),e.jsx(t.Pre,{children:`import { renderHook, act, waitFor } from "@testing-library/react";
// (Jest shown; in Vitest replace 'jest' with 'vi')

describe("useSomething", () => {
  it("returns initial state and updates on action", () => {
    const { result } = renderHook(() => useSomething(/* initial options */));
    expect(result.current.value).toBe(/* initial */);

    act(() => {
      result.current.actions.doThing(); // triggers a state update
    });
    expect(result.current.value).toBe(/* updated */);
  });
});`})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Example: ",e.jsx("code",{children:"useCounter"})," (state & actions)"]}),e.jsxs(t.Small,{children:["We test initial state, actions, and clamping logic. We also verify ",e.jsx("i",{children:"stable function identities"})," across re-renders when promised."]}),e.jsx(t.Pre,{children:`// hook (for reference)
/*
function useCounter({ initial = 0, step = 1, min = -Infinity, max = Infinity } = {}) {
  const [count, setCount] = React.useState(initial);
  const clamp = React.useCallback(n => Math.min(max, Math.max(min, n)), [min, max]);
  const inc = React.useCallback(() => setCount(c => clamp(c + step)), [step, clamp]);
  const dec = React.useCallback(() => setCount(c => clamp(c - step)), [step, clamp]);
  const set = React.useCallback(n => setCount(() => clamp(n)), [clamp]);
  const reset = React.useCallback(() => setCount(initial), [initial]);
  return { count, inc, dec, set, reset };
}
*/

import { renderHook, act } from "@testing-library/react";

describe("useCounter", () => {
  it("initializes and updates correctly", () => {
    const { result } = renderHook(() => useCounter({ initial: 1, step: 2, min: 0, max: 10 }));

    expect(result.current.count).toBe(1);

    act(() => result.current.inc());
    expect(result.current.count).toBe(3);

    act(() => result.current.dec());
    expect(result.current.count).toBe(1);

    act(() => result.current.set(100));
    expect(result.current.count).toBe(10); // clamped to max

    act(() => result.current.reset());
    expect(result.current.count).toBe(1);
  });

  it("returns stable action references", () => {
    const { result, rerender } = renderHook(() => useCounter());

    const { inc, dec, set, reset } = result.current;
    rerender();

    expect(result.current.inc).toBe(inc);
    expect(result.current.dec).toBe(dec);
    expect(result.current.set).toBe(set);
    expect(result.current.reset).toBe(reset);
  });
});`})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Example: ",e.jsx("code",{children:"useLocalStorage"})," (effects & browser APIs)"]}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Arrange:"})," mock ",e.jsx(t.InlineCode,{children:"localStorage"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Act:"})," update the value via the hook setter."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Assert:"})," storage was read/written; updates reflect in state."]})]}),e.jsx(t.Pre,{children:`// test-time localStorage double
const store = new Map();
const localStorageMock = {
  getItem: jest.fn((k) => (store.has(k) ? store.get(k) : null)),
  setItem: jest.fn((k, v) => store.set(k, v)),
  removeItem: jest.fn((k) => store.delete(k)),
  clear: jest.fn(() => store.clear()),
};

beforeEach(() => {
  store.clear();
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
});

import { renderHook, act } from "@testing-library/react";

describe("useLocalStorage", () => {
  it("reads initial and persists updates", () => {
    store.set("theme", JSON.stringify("dark"));

    const { result } = renderHook(() => useLocalStorage("theme", "light"));
    expect(result.current[0]).toBe("dark");

    act(() => result.current[1]("light"));
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", JSON.stringify("light"));
    expect(result.current[0]).toBe("light");
  });
});`})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Example: ",e.jsx("code",{children:"useAsync"})," (async + cancellation)"]}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Async state machine:"})," ",'{ status: "idle" | "loading" | "success" | "error", data, error }',"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cancellation:"})," ignore late results after unmount."]})]}),e.jsx(t.Pre,{children:`import { renderHook, waitFor } from "@testing-library/react";

const ok = () => Promise.resolve({ user: "Ashish" });
const fail = () => Promise.reject(new Error("Nope"));

describe("useAsync", () => {
  it("resolves happy path", async () => {
    const { result, rerender } = renderHook(({ fn }) => useAsync(fn, [fn]), { initialProps: { fn: ok }});
    expect(result.current.status).toBe("loading");

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.data).toEqual({ user: "Ashish" });

    // change deps (simulate new request)
    rerender({ fn: fail });
    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it("ignores late resolution after unmount (cancellation)", async () => {
    let resolve;
    const p = new Promise((r) => (resolve = r));
    const { unmount, result } = renderHook(() => useAsync(() => p, []));

    expect(result.current.status).toBe("loading");
    unmount();
    resolve("late");

    // no throw and no state update after unmount → test passes by not crashing
  });
});`})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Example: Context-Dependent Hook (using ",e.jsx("code",{children:"wrapper"}),")"]}),e.jsxs(t.Small,{children:["Use the ",e.jsx("b",{children:"wrapper"})," option to supply providers that your hook needs."]}),e.jsx(t.Pre,{children:`import { renderHook } from "@testing-library/react";

// suppose useTheme() reads React context
/*
const ThemeContext = React.createContext("light");
function useTheme() {
  return React.useContext(ThemeContext);
}
*/
function ThemeProvider({ children }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>;
}

it("reads theme from context", () => {
  const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });
  expect(result.current).toBe("dark");
});`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Cleanup: listeners & timers"}),e.jsx(t.Pre,{children:`/*
function useWindowResize(handler) {
  const latest = React.useRef(handler);
  React.useEffect(() => { latest.current = handler; });
  React.useEffect(() => {
    const onResize = () => latest.current();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
}
*/
it("attaches and cleans up the listener", () => {
  const add = jest.spyOn(window, "addEventListener");
  const rem = jest.spyOn(window, "removeEventListener");

  const handler = jest.fn();
  const { unmount } = renderHook(() => useWindowResize(handler));

  expect(add).toHaveBeenCalledWith("resize", expect.any(Function));
  unmount();
  expect(rem).toHaveBeenCalledWith("resize", expect.any(Function));

  add.mockRestore(); rem.mockRestore();
});`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," assert ",e.jsx("i",{children:"outputs and externally visible effects"})," (returned values, calls to storage/network, timers)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(t.InlineCode,{children:"act"})," around state updates; use ",e.jsx(t.InlineCode,{children:"waitFor"})," for async."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use a ",e.jsx(t.InlineCode,{children:"wrapper"})," for context-dependent hooks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," test private implementation details (internal variable names, setState calls)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," rely on exact timing; prefer logical outcomes over millisecond precision."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," forget cleanup assertions for listeners/timers."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Test double:"})," a generic replacement for a real dependency (mock, stub, or spy)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mock:"})," a programmable fake with expectations (e.g., ",e.jsx(t.InlineCode,{children:"jest.fn()"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Spy:"})," records calls to real or fake functions (e.g., ",e.jsx(t.InlineCode,{children:"jest.spyOn()"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stub:"})," preprogrammed fake that returns fixed data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"act:"})," helper that ensures React processes updates before assertions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"renderHook:"})," executes a hook and returns a handle to inspect results and lifecycle."]}),e.jsxs("li",{children:[e.jsx("b",{children:"wrapper:"})," provider component to supply context while the hook runs."]})]})]}),e.jsxs(t.Callout,{children:["Summary: Test hooks by exercising their public API - returned values and actions - simulate effects with mocks, wait for async outcomes, and verify cleanup. Prefer",e.jsx("i",{children:"behavior"})," over implementation details for durable tests."]})]});export{n as default};
