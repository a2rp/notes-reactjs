import{j as e}from"./index-BRArnZ3i.js";import{S as n}from"./styled-B9Www9HH.js";const i=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Migrating Legacy React → Modern React"}),e.jsxs(n.Lead,{children:['"Legacy React" usually means class components, old lifecycles, legacy context, manual side-effect wiring, and assumptions from ReactDOM.render. "Modern React" centers on ',e.jsx("b",{children:"function components + hooks"}),", ",e.jsx("b",{children:"strict mode"}),", ",e.jsx("b",{children:"concurrent features"})," (automatic batching, transitions), and ",e.jsx("b",{children:"Suspense-first data"}),". This guide gives clear steps, definitions, and examples so you can migrate with confidence."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary (Quick Definitions)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Class component:"})," An older React component defined with ",e.jsx(n.InlineCode,{children:"class X extends React.Component"})," using lifecycle methods and ",e.jsx(n.InlineCode,{children:"this.state"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Function component:"})," A component defined as a function. With ",e.jsx(n.InlineCode,{children:"hooks"})," it manages state, effects, refs, etc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hooks:"})," Functions like ",e.jsx(n.InlineCode,{children:"useState"}),", ",e.jsx(n.InlineCode,{children:"useEffect"}),", ",e.jsx(n.InlineCode,{children:"useMemo"}),", etc., that add React features to function components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Strict Mode:"})," A development-only wrapper that highlights unsafe patterns and surfaces side-effect bugs earlier."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Concurrent Features:"})," Capabilities introduced around React 18 that improve responsiveness (e.g., ",e.jsx(n.InlineCode,{children:"startTransition"}),", automatic batching)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Automatic Batching:"})," React 18 batches multiple state updates within the same tick across async boundaries to reduce re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transition:"})," An update marked as non-urgent (like filtering a big list) so urgent updates (typing/clicking) stay snappy."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Suspense for Data:"})," A pattern where components ",e.jsx("i",{children:"suspend"})," while data loads, allowing React to orchestrate loading states and streaming."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Legacy Context:"})," The old context API (",e.jsx(n.InlineCode,{children:"childContextTypes"}),", ",e.jsx(n.InlineCode,{children:"contextTypes"}),"), replaced by ",e.jsx(n.InlineCode,{children:"createContext()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"UNSAFE_ lifecycles:"})," Deprecated methods like ",e.jsx(n.InlineCode,{children:"UNSAFE_componentWillMount"})," that should be removed or refactored."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Migration Map (Bird's-eye View)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Step 1:"})," Upgrade to React 18+ and switch from ",e.jsx(n.InlineCode,{children:"ReactDOM.render"})," to ",e.jsx(n.InlineCode,{children:"createRoot"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Step 2:"})," Turn on ",e.jsx(n.InlineCode,{children:"<React.StrictMode>"})," in development."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Step 3:"})," Convert class components to function components with hooks (state, effects, refs)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Step 4:"})," Replace legacy context with ",e.jsx(n.InlineCode,{children:"createContext()"})," and ",e.jsx(n.InlineCode,{children:"useContext"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Step 5:"})," Remove deprecated/UNSAFE lifecycles and ",e.jsx(n.InlineCode,{children:"findDOMNode"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Step 6:"})," Adopt concurrent-aware patterns: automatic batching, ",e.jsx(n.InlineCode,{children:"startTransition"}),", and ",e.jsx(n.InlineCode,{children:"useDeferredValue"})," where appropriate."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Step 7:"})," Plan for Suspense-friendly data (gradual; not required on day one)."]})]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Step 1 - Root Bootstrap: ",e.jsx("code",{children:"createRoot"})]}),e.jsx(n.Pre,{children:`// BEFORE (legacy)
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));`}),e.jsx(n.Pre,{children:`// AFTER (modern)
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Why:"})," ",e.jsx(n.InlineCode,{children:"createRoot"})," enables React 18 features (automatic batching, transitions, new SSR). ",e.jsx("b",{children:"StrictMode"})," only runs in dev and helps you catch side-effect issues early."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Step 2 - Class → Function with Hooks"}),e.jsxs(n.Pre,{children:[`// BEFORE: Class component with state + lifecycle
class Counter extends React.Component {
  state = { value: 0 };

  componentDidMount() {
    document.title = "Count: " + this.state.value;
  }

  componentDidUpdate() {
    document.title = "Count: " + this.state.value;
  }

  increment = () => this.setState(({ value }) => ({ value: value + 1 }));

  render() {
    return <button onClick={this.increment}>Count: {this.state.value}</button>;
  }
}`,"        "]}),e.jsxs(n.Pre,{children:[`// AFTER: Function component with hooks
function Counter() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    document.title = "Count: " + value; // runs after mount + on value changes
  }, [value]);

  const increment = React.useCallback(() => {
    setValue(v => v + 1);
  }, []);

  return <button onClick={increment}>Count: {value}</button>;
}`,"        "]}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Rule of Hooks:"})," Call hooks at the top level of the component (not inside loops/conditions). Migrate lifecycle work to ",e.jsx(n.InlineCode,{children:"useEffect"})," (side effects),",e.jsx(n.InlineCode,{children:"useMemo"})," (expensive computations), and",e.jsx(n.InlineCode,{children:"useRef"})," (instance-like mutable values)."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Step 3 - Replace Legacy Lifecycles"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:e.jsx("code",{children:"componentWillMount"})})," / ",e.jsx("b",{children:e.jsx("code",{children:"UNSAFE_componentWillMount"})}),": Move logic into the component body (for pure setup) or ",e.jsx(n.InlineCode,{children:"useEffect"})," (for side effects)."]}),e.jsxs("li",{children:[e.jsx("b",{children:e.jsx("code",{children:"componentWillReceiveProps"})})," / ",e.jsx("b",{children:e.jsx("code",{children:"UNSAFE_…"})}),": Usually becomes a derived value via ",e.jsx(n.InlineCode,{children:"useMemo"})," or explicit effect reacting to a prop."]}),e.jsxs("li",{children:[e.jsx("b",{children:e.jsx("code",{children:"componentWillUpdate"})})," / ",e.jsx("b",{children:e.jsx("code",{children:"UNSAFE_…"})}),": Use ",e.jsx(n.InlineCode,{children:"useEffect"}),"/",e.jsx(n.InlineCode,{children:"useLayoutEffect"})," as needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:e.jsx("code",{children:"getSnapshotBeforeUpdate"})}),": Typically ",e.jsx(n.InlineCode,{children:"useLayoutEffect"})," with refs to read layout before paint."]}),e.jsxs("li",{children:[e.jsx("b",{children:e.jsx("code",{children:"componentDidCatch"})}),": Use an ",e.jsx("b",{children:"error boundary"})," (still a class today) or a thin class wrapper around your app until function-based error boundaries are standard."]})]}),e.jsxs(n.Pre,{children:[`// Example: reacting to a prop (old willReceiveProps)
function Price({ amount, currency }) {
  const label = React.useMemo(() => {
    // compute derived label when inputs change
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
  }, [amount, currency]);
  return <span>{label}</span>;
}`,"        "]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Step 4 - Legacy Context → ",e.jsx("code",{children:"createContext"})]}),e.jsxs(n.Pre,{children:[`// BEFORE: legacy context (childContextTypes/contextTypes) - avoid
// AFTER: modern context
const ThemeContext = React.createContext("light");

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState("light");
  const value = React.useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function UseThemeButton() {
  const { theme, setTheme } = React.useContext(ThemeContext);
  return <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme}</button>;
}`,"        "]}),e.jsxs(n.Small,{children:["Modern context is explicit and type-safe. Combine with ",e.jsx(n.InlineCode,{children:"useMemo"})," to keep the provided value stable and avoid extra renders."]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Step 5 - Remove ",e.jsx("code",{children:"findDOMNode"}),", Prefer Refs + ",e.jsx("code",{children:"forwardRef"})]}),e.jsxs(n.Pre,{children:[`// BEFORE
class Legacy extends React.Component {
  componentDidMount() {
    // Anti-pattern; findDOMNode is deprecated for strict/concurrent react
    const el = ReactDOM.findDOMNode(this);
    // ...
  }
  render() { return <div />; }
}

// AFTER
const Modern = React.forwardRef(function Modern(props, ref) {
  return <div ref={ref} {...props} />;
});

// Usage:
const ref = React.useRef(null);
// <Modern ref={ref} />`,"        "]}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Why:"})," ",e.jsx(n.InlineCode,{children:"findDOMNode"})," breaks with portals/strict mode and isn't future-proof. Use ",e.jsx(n.InlineCode,{children:"ref"})," + ",e.jsx(n.InlineCode,{children:"forwardRef"}),"."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Step 6 - Embrace Automatic Batching & Transitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Automatic batching:"})," Multiple state updates in time-close handlers/effects are applied in one render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transitions:"})," Mark non-urgent updates so typing/hovering remains immediate."]})]}),e.jsxs(n.Pre,{children:[`import { startTransition } from "react";

function Search({ allItems }) {
  const [text, setText] = React.useState("");
  const [results, setResults] = React.useState(allItems);

  function onChange(e) {
    const q = e.target.value;
    setText(q); // urgent (reflect input immediately)
    startTransition(() => {
      // non-urgent (filter a large list)
      const next = allItems.filter(x => x.name.toLowerCase().includes(q.toLowerCase()));
      setResults(next);
    });
  }

  return (
    <>
      <input value={text} onChange={onChange} placeholder="Type to search..." />
      <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>
    </>
  );
}`,"        "]}),e.jsx(n.Small,{children:"If you can't restructure immediately, start by using transitions around heavy computations (filtering, sorting, large list virtualization)."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:'Step 7 - Think "Suspense-Friendly" (Gradual)'}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Suspense:"}),' A mechanism where components can "pause" rendering while data loads.']}),e.jsxs("li",{children:[e.jsx("b",{children:"Benefit:"}),' Cleaner loading states, less prop-drilling of "isLoading", and better streaming SSR.']}),e.jsxs("li",{children:[e.jsx("b",{children:"Migration approach:"})," Start at feature boundaries; wrap slow trees in ",e.jsx(n.InlineCode,{children:'<Suspense fallback="…"/>'}),"."]})]}),e.jsxs(n.Pre,{children:[`// Sketch (client)
import { Suspense } from "react";

function ProductPage() {
  return (
    <Suspense fallback={<div>Loading product…</div>}>
      <ProductDetails /> {/* reads product via a data layer that supports suspense */}
    </Suspense>
  );
}`,"        "]}),e.jsx(n.Small,{children:"You don't have to go all-in on day one. Design new features to be compatible with Suspense to avoid future rewrites."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Step 8 - Small but Important Modernizations"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Function defaults:"})," Prefer parameter defaults over ",e.jsx(n.InlineCode,{children:"Component.defaultProps"})," for function components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"PropTypes (optional):"})," Keep for runtime checking if useful; otherwise rely on TypeScript or JSDoc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keys & lists:"})," Ensure stable ",e.jsx(n.InlineCode,{children:"key"}),"s (don't use indexes for re-orderable lists)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Effects hygiene:"})," Keep side effects inside ",e.jsx(n.InlineCode,{children:"useEffect"})," and return cleanups."]})]}),e.jsxs(n.Pre,{children:[`// Default props - modern way
function Avatar({ size = 40, src, alt = "avatar" }) {
  return <img width={size} height={size} src={src} alt={alt} />;
}`,"        "]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common Pitfalls & How to Avoid Them"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Effect over-firing:"})," In StrictMode dev, React mounts/effects twice to catch bugs. Ensure effects are idempotent and clean up properly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stale closures:"})," When using async callbacks, depend on the right values or use patterns like a ref + ",e.jsx(n.InlineCode,{children:"useEvent"})," (stable callback to latest implementation)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Derived state anti-pattern:"})," Don't mirror props in state unless you have a real reason; compute with ",e.jsx(n.InlineCode,{children:"useMemo"})," instead."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled → controlled jumps:"})," Initialize inputs correctly to avoid warnings. Use explicit ",e.jsx(n.InlineCode,{children:"value"})," or ",e.jsx(n.InlineCode,{children:"defaultValue"}),"."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Practical Checklist"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["✅ Replace ",e.jsx(n.InlineCode,{children:"ReactDOM.render"})," with ",e.jsx(n.InlineCode,{children:"createRoot"}),"."]}),e.jsxs("li",{children:["✅ Enable ",e.jsx(n.InlineCode,{children:"<StrictMode>"})," in dev."]}),e.jsx("li",{children:"✅ Convert classes to functions + hooks (start with leaf components)."}),e.jsxs("li",{children:["✅ Replace legacy context with ",e.jsx(n.InlineCode,{children:"createContext"}),"."]}),e.jsxs("li",{children:["✅ Remove ",e.jsx(n.InlineCode,{children:"findDOMNode"})," and UNSAFE lifecycles."]}),e.jsxs("li",{children:["✅ Consider ",e.jsx(n.InlineCode,{children:"startTransition"})," or ",e.jsx(n.InlineCode,{children:"useDeferredValue"})," for heavy updates."]}),e.jsx("li",{children:"✅ Plan a path toward Suspense-first data (new features use it by design)."})]})]}),e.jsxs(n.Callout,{children:[e.jsx("b",{children:"Mindset shift:"})," Think in terms of dataflow + effects + composition. Favor small function components, clean effects, and context where needed. Adopt concurrent-friendly patterns so performance scales with features."]})]});export{i as default};
