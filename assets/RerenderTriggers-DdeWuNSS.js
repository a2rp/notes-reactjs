import{j as e}from"./index-DqLKwkYK.js";import{S as n}from"./styled-DaTlZWAW.js";const r=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Rerender Triggers"}),e.jsxs(n.Lead,{children:["A ",e.jsx("b",{children:"render"})," is when React calls your component function to compute UI. A ",e.jsx("b",{children:"re-render"})," happens when React calls it again because something changed. Understanding ",e.jsx("i",{children:"what"})," triggers re-renders helps you keep the app fast and predictable."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Rendering Mental Model"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Render phase:"})," React calls your component to create elements (a description of UI)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Commit phase:"})," React applies minimal DOM changes based on the render result (",e.jsx("i",{children:"reconciliation"})," diff)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Re-render:"})," React calls your component again when inputs change (state/props/context/key/etc.)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"What Triggers a Re-render?"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"State change:"})," calling ",e.jsx(n.InlineCode,{children:"setState"})," / ",e.jsx(n.InlineCode,{children:"dispatch"})," with a ",e.jsx("i",{children:"different"})," value (compares via ",e.jsx(n.InlineCode,{children:"Object.is"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parent re-render:"})," when a parent renders, each child renders too (unless memoized and props are shallow-equal)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Context value change:"})," any consumer re-renders when its Provider's ",e.jsx(n.InlineCode,{children:"value"})," changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Key change:"})," changing a component's ",e.jsx(n.InlineCode,{children:"key"})," remounts it (unmount → mount)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"External store updates:"})," via ",e.jsx(n.InlineCode,{children:"useSyncExternalStore"})," or libraries (e.g., Redux, Zustand)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Suspense boundaries:"})," resolving/rejecting data can cause re-renders as fallbacks switch."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"1) State Changes"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Calling ",e.jsx(n.InlineCode,{children:"setX(next)"})," re-renders ",e.jsx("i",{children:"if"})," ",e.jsx(n.InlineCode,{children:"next"})," is not ",e.jsx(n.InlineCode,{children:"Object.is"}),"-equal to the current state."]}),e.jsxs("li",{children:["Setting the ",e.jsx("i",{children:"same"})," value is a no-op (no re-render)."]})]}),e.jsx(n.Pre,{children:`function Counter() {
  const [n, setN] = React.useState(0);

  function inc() { setN(v => v + 1); }          // triggers re-render
  function same() { setN(n); }                   // no re-render (same value)
  function swapObj() {
    // For objects, identity matters:
    setN({ ...n }); // if n was an object, new identity triggers re-render
  }

  return (
    <div>
      <p>{n}</p>
      <button onClick={inc}>+1</button>
      <button onClick={same}>set same</button>
    </div>
  );
}`}),e.jsx(n.Small,{children:"Tip: For objects/arrays, avoid recreating new identities unless the contents actually changed."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"2) Parent Re-render"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"When a parent renders, all children render by default."}),e.jsxs("li",{children:["Use ",e.jsx(n.InlineCode,{children:"React.memo(Child)"})," to skip rendering if props are shallow-equal."]}),e.jsx("li",{children:"Be careful with inline objects/functions—new identity ≠ shallow-equal."})]}),e.jsx(n.Pre,{children:`const Child = React.memo(function Child({ label, onClick }) {
  console.log("Child render:", label);
  return <button onClick={onClick}>{label}</button>;
});

function Parent() {
  const [count, setCount] = React.useState(0);

  // BAD: new function identity each render breaks memo
  // const handle = () => setCount(c => c + 1);

  // GOOD: stable identity
  const handle = React.useCallback(() => setCount(c => c + 1), []);

  return <Child label={"Count: " + count} onClick={handle} />;
}`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Shallow equality:"})," compares primitive values and object references; it doesn't deep-compare."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"3) Context Value Changes"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Any consumer re-renders when Provider's ",e.jsx(n.InlineCode,{children:"value"})," changes identity."]}),e.jsx("li",{children:"Memoize object values to avoid accidental changes every render."})]}),e.jsx(n.Pre,{children:`const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [mode, setMode] = React.useState("dark");

  // BAD: new object each render causes all consumers to re-render
  // const value = { mode, toggle: () => setMode(m => m === "dark" ? "light" : "dark") };

  // GOOD: stable object reference
  const toggle = React.useCallback(() => setMode(m => m === "dark" ? "light" : "dark"), []);
  const value = React.useMemo(() => ({ mode, toggle }), [mode, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"4) Key Changes (Remount)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Changing ",e.jsx(n.InlineCode,{children:"key"})," forces React to treat it as a new component (throw away state, run effects again)."]}),e.jsx("li",{children:"Useful to reset internal state; risky if accidental."})]}),e.jsx(n.Pre,{children:`function Editor({ id }) {
  // When key changes, component resets (fresh state)
  return <TextArea key={id} />;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"5) External Store Updates"}),e.jsx(n.List,{children:e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"useSyncExternalStore"})," (or libs) subscribe to external data; store changes trigger re-renders of subscribers."]})}),e.jsx(n.Pre,{children:`// Pseudo-example:
const value = useSyncExternalStore(store.subscribe, store.getSnapshot);
// Whenever store snapshot changes, this component re-renders.`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Identity Pitfalls (Objects & Functions)"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Every render creates new object/function literals unless you memoize them."}),e.jsxs("li",{children:["Memoized children (",e.jsx(n.InlineCode,{children:"React.memo"}),") will still re-render if a prop's identity changes."]})]}),e.jsx(n.Pre,{children:`function List({ items }) {
  // BAD: new filter every render
  // const filter = { active: true };

  // GOOD: stable identity
  const filter = React.useMemo(() => ({ active: true }), []);

  return <ItemsView items={items} filter={filter} />;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Tools to Control Re-renders"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"React.memo(Component)"}),": skips re-render if props are shallow-equal."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useMemo(fn, deps)"}),": memoize an expensive computation's ",e.jsx("i",{children:"result"})," between renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useCallback(fn, deps)"}),": memoize a ",e.jsx("i",{children:"function identity"})," between renders."]})]}),e.jsx(n.Pre,{children:`const Expensive = React.memo(function Expensive({ data }) {
  const total = React.useMemo(() => heavySum(data), [data]); // compute once per data change
  return <div>Total: {total}</div>;
});`}),e.jsx(n.Small,{children:"Measure first; memoization adds complexity. Prefer clear code, then optimize hot paths."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Note: Strict Mode (Dev Only)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"StrictMode"})," intentionally invokes certain functions twice in development to surface unsafe patterns."]}),e.jsx("li",{children:"This looks like “extra” renders only in dev; production renders once."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," lift state thoughtfully; colocate where it's used to avoid cascading parent re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," memoize context ",e.jsx(n.InlineCode,{children:"value"})," objects and event handlers passed deep."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(n.InlineCode,{children:"React.memo"})," for pure presentational children that receive stable props."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," store derived data in state—derive with ",e.jsx(n.InlineCode,{children:"useMemo"})," instead."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," over-memoize blindly; profile first."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Reconciliation:"})," React's diffing of previous vs next tree to compute minimal DOM updates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shallow equality:"})," compares primitives by value and objects by reference (no deep compare)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Identity:"})," whether two references point to the exact same object/function in memory."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Remount:"})," unmount + mount cycle, often caused by a ",e.jsx(n.InlineCode,{children:"key"})," change."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Quick Checklist"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Did state actually change? Avoid setting the same value."}),e.jsx("li",{children:"Are you passing new object/function props every render? Memoize if needed."}),e.jsxs("li",{children:["Does your context ",e.jsx(n.InlineCode,{children:"value"})," change identity unnecessarily?"]}),e.jsx("li",{children:"Are keys stable? Avoid accidental remounts."}),e.jsx("li",{children:"Measure with the React Profiler before and after changes."})]})]}),e.jsxs(n.Callout,{children:["Summary: Re-renders are normal and healthy. Optimize the ",e.jsx("i",{children:"triggers"})," you control (state, props identity, context value, keys) and measure with the Profiler to make sure your changes actually help."]})]});export{r as default};
