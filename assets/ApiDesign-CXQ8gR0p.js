import{j as e}from"./index-BrPsnAZM.js";import{S as n}from"./styled-CuRkp1el.js";const r=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"API Design (Components, Hooks & Utilities)"}),e.jsxs(n.Lead,{children:["In React apps, “API design” means shaping the way other code ",e.jsx("b",{children:"uses"})," your components, hooks, and utility functions: the names, props/parameters, return values, events, and guarantees you provide. Good APIs are ",e.jsx("b",{children:"consistent, predictable, explicit, minimal,"})," and ",e.jsx("b",{children:"composable"}),"."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Scope & Key Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"API surface:"})," The public things consumers can import or use (component props, hook parameters/returns, function signatures)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DX (Developer Experience):"})," How easy it is to understand, discover, and use your API correctly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Breaking change:"})," A change that forces consumers to modify their code (e.g., rename a prop or change a return shape)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Backward compatibility:"})," New versions continue to work with old consumer code (no breaks)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Affordance:"})," A name/shape that hints at correct usage (e.g., ",e.jsx(n.InlineCode,{children:"onSelect"})," clearly expects a selection action)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Composability:"})," The ability to combine small APIs like Lego blocks to build larger behavior."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"First Principles"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Consistency:"})," Use the same names and shapes across your codebase (e.g., always return ",e.jsx(n.InlineCode,{children:"{ status, data, error }"})," from async hooks)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Predictability:"})," Avoid “sometimes returns X, sometimes Y.” Keep inputs/outputs stable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Explicitness:"})," Prefer clear options over hidden behavior. Document defaults."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Minimal surface:"})," Start small. Add props/params only when proven necessary."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Composability:"})," Prefer small building blocks vs one giant “god component” with 20 props."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Progressive disclosure:"})," Offer sensible defaults; allow advanced customization when needed."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Component API Design"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Props naming:"})," Use verbs for actions (",e.jsx(n.InlineCode,{children:"onSubmit"}),"), nouns for values (",e.jsx(n.InlineCode,{children:"value"}),"), and adjectives for booleans (",e.jsx(n.InlineCode,{children:"disabled"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Booleans vs enums:"})," Replace many booleans with a single ",e.jsx(n.InlineCode,{children:"variant"})," enum when states are mutually exclusive."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled vs uncontrolled:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Controlled:"})," Parent owns state via ",e.jsx(n.InlineCode,{children:"value"})," + ",e.jsx(n.InlineCode,{children:"onChange"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled:"})," Component manages internal state via ",e.jsx(n.InlineCode,{children:"defaultValue"}),"."]}),e.jsxs("li",{children:["Support both when practical: ",e.jsx(n.InlineCode,{children:"value? onChange? defaultValue?"})]})]})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Event signatures:"})," Prefer ",e.jsx(n.InlineCode,{children:"onChange(nextValue, event)"})," (value first, event second) for ergonomics."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Children & slots:"})," Use ",e.jsx(n.InlineCode,{children:"children"})," for simple content; use ",e.jsx("b",{children:"compound components"})," or a ",e.jsx("b",{children:"slots"})," prop for structured content."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pass-through props:"})," Spread unrecognized props to the root element to aid accessibility (",e.jsx(n.InlineCode,{children:"<div {...rest} />"}),") when safe."]})]}),e.jsx(n.Pre,{children:`// Example: Button with consistent, small API
function Button({ variant = "primary", disabled = false, onClick, children, ...rest }) {
  // variant: "primary" | "secondary" | "ghost"
  return (
    <button
      data-variant={variant}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

// Usage
<Button onClick={() => alert("Saved!")} variant="secondary">Save</Button>`}),e.jsxs(n.Small,{children:["Keep ",e.jsx("em",{children:"value"}),"/",e.jsx("em",{children:"defaultValue"})," semantics clear; document whether the component is controlled, uncontrolled, or supports both."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Hook API Design"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Naming:"})," Hooks start with ",e.jsx(n.InlineCode,{children:"use"})," and describe ",e.jsx("em",{children:"what"}),", not ",e.jsx("em",{children:"how"})," (e.g., ",e.jsx(n.InlineCode,{children:"useDisclosure"}),", not ",e.jsx(n.InlineCode,{children:"useBooleanToggle"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Inputs:"})," Prefer a single ",e.jsx("b",{children:"options object"})," for flexibility and defaults."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Outputs:"})," Return either a tuple (",e.jsx(n.InlineCode,{children:"[value, actions]"}),") or an object (named fields). Keep identity stability with ",e.jsx(n.InlineCode,{children:"useCallback"}),"/",e.jsx(n.InlineCode,{children:"useMemo"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Async hooks:"})," Return ",e.jsx(n.InlineCode,{children:"{ status, data, error }"})," + actions (e.g., ",e.jsx(n.InlineCode,{children:"refetch"}),"). Support cancellation when possible."]})]}),e.jsx(n.Pre,{children:`// Example: useDisclosure (show/hide pattern)
export function useDisclosure(initial = false) {
  const [open, setOpen] = React.useState(!!initial);
  const openPanel = React.useCallback(() => setOpen(true), []);
  const closePanel = React.useCallback(() => setOpen(false), []);
  const toggle = React.useCallback(() => setOpen(v => !v), []);
  return { open, openPanel, closePanel, toggle };
}

// Example: useRequest with AbortController
export function useRequest(options) {
  const { url, init, auto = true } = options;
  const [state, setState] = React.useState({ status: "idle", data: null, error: null });

  const run = React.useCallback(async () => {
    const ctrl = new AbortController();
    setState({ status: "loading", data: null, error: null });
    try {
      const res = await fetch(url, { ...init, signal: ctrl.signal });
      const data = await res.json();
      setState({ status: "success", data, error: null });
      return data;
    } catch (err) {
      if (err.name !== "AbortError") setState({ status: "error", data: null, error: err });
      throw err;
    }
  }, [url, init]);

  React.useEffect(() => { if (auto) run(); }, [auto, run]);

  return { ...state, run };
}`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Cancellation:"})," The ability to stop an in-flight async operation (e.g., via ",e.jsx(n.InlineCode,{children:"AbortController"}),") to avoid race conditions and memory leaks."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Utility Function API Design"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Purity:"})," Prefer pure functions (no side effects) for predictability and testability."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parameter order:"})," Put the ",e.jsx("em",{children:"data"})," first, ",e.jsx("em",{children:"options"})," last. For many optional params, use an options object."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Return values:"})," Return data, not booleans that force extra lookups, unless the function's goal ",e.jsx("em",{children:"is"})," a boolean check."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Errors:"})," Throw on truly exceptional cases; return ",e.jsx(n.InlineCode,{children:"null"}),"/",e.jsx(n.InlineCode,{children:"undefined"})," for “not found” when it's a valid state."]})]}),e.jsx(n.Pre,{children:`// Example: clamp utility (pure, deterministic)
export function clamp(n, { min = -Infinity, max = Infinity } = {}) {
  return Math.min(max, Math.max(min, n));
}

// Example: parseQuery (returns data or null)
export function parseQuery(qs) {
  try {
    const params = new URLSearchParams(qs);
    return Object.fromEntries(params.entries());
  } catch {
    return null;
  }
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Provider & Context APIs"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Provider pattern:"})," Place shared state in a context provider; expose a ",e.jsx(n.InlineCode,{children:"useXxx()"})," hook that throws if used outside the provider (clear failure mode)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shape stability:"})," Keep the context value stable with ",e.jsx(n.InlineCode,{children:"useMemo"})," to avoid unnecessary re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Granularity:"})," Split contexts (e.g., state vs actions) when consumers need different subsets."]})]}),e.jsx(n.Pre,{children:`const ThemeContext = React.createContext(null);

export function ThemeProvider({ children, initial = "dark" }) {
  const [theme, setTheme] = React.useState(initial);
  const value = React.useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Versioning & Evolution"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Semantic Versioning (SemVer):"})," ",e.jsx("em",{children:"MAJOR.MINOR.PATCH"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"PATCH:"})," bug fixes only (no API changes)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MINOR:"})," add features in backward-compatible ways."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MAJOR:"})," breaking changes; provide a migration guide."]})]})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Deprecation path:"})," Introduce new APIs, warn on old ones, then remove in the next major release."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Changelogs:"})," Document what changed, why, and how to migrate."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," provide sensible defaults; allow overrides via an options object."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep names short and precise (",e.jsx(n.InlineCode,{children:"onChange"}),", ",e.jsx(n.InlineCode,{children:"variant"}),", ",e.jsx(n.InlineCode,{children:"size"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," document return shapes and event signatures."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," return different types for the same function depending on inputs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," overload with many booleans (",e.jsx(n.InlineCode,{children:"primary"}),", ",e.jsx(n.InlineCode,{children:"danger"}),", ",e.jsx(n.InlineCode,{children:"ghost"}),"); prefer a ",e.jsx(n.InlineCode,{children:"variant"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," hide side effects; make them explicit (e.g., “persists to localStorage”)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"API Review Checklist"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Is the name clear and consistent with similar APIs?"}),e.jsx("li",{children:"Are inputs/outputs minimal and stable? Defaults documented?"}),e.jsx("li",{children:"Is it composable with existing pieces?"}),e.jsx("li",{children:"Are error states and async/cancellation covered?"}),e.jsx("li",{children:"Any breaking changes? If yes, migration notes prepared?"})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Options object:"})," A single parameter that holds named fields (",e.jsx(n.InlineCode,{children:"fn(data, { min, max })"}),") for flexibility and defaults."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Return shape:"})," The structure and types of the value a function/hook returns."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Identity stability:"})," A value or function keeps the same reference across renders (via ",e.jsx(n.InlineCode,{children:"useMemo"}),"/",e.jsx(n.InlineCode,{children:"useCallback"}),"), enabling memoization."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cancellation:"})," Stopping an in-flight async task to avoid stale updates (e.g., ",e.jsx(n.InlineCode,{children:"AbortController"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Compound components:"})," A pattern where related components share context (e.g., ",e.jsx(n.InlineCode,{children:"Tabs"}),", ",e.jsx(n.InlineCode,{children:"Tabs.List"}),", ",e.jsx(n.InlineCode,{children:"Tabs.Panel"}),")."]})]})]}),e.jsx(n.Callout,{children:"Summary: Design APIs for clarity and stability. Prefer options objects, stable return shapes, consistent event signatures, and explicit defaults. Start minimal, evolve carefully, and document changes."})]});export{r as default};
