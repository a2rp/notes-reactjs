import{j as e}from"./index-BRArnZ3i.js";import{S as n}from"./styled-7VbwKvaZ.js";const t=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Anti-Pattern: Over-Memoization (OverMemo)"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Over-memoization"})," is the habit of sprinkling ",e.jsx(n.InlineCode,{children:"useMemo"}),","," ",e.jsx(n.InlineCode,{children:"useCallback"}),", and ",e.jsx(n.InlineCode,{children:"React.memo"}),' everywhere "just in case". Memoization is a tool to avoid expensive recalculations or rerenders—',e.jsx("i",{children:"not"})," a default setting."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Key Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Memoization:"})," Caching the result of a computation so that when the same inputs occur again, we reuse the cached result instead of recomputing. In React, common tools are"," ",e.jsx(n.InlineCode,{children:"useMemo"})," (cache a value),"," ",e.jsx(n.InlineCode,{children:"useCallback"})," (cache a function identity), and"," ",e.jsx(n.InlineCode,{children:"React.memo"})," (skip re-render if props are shallow-equal)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Re-render:"})," When a component function runs again to produce UI. Renders are cheap by design; React reconciles actual DOM changes efficiently."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shallow equality:"})," A quick check comparing object references and primitive values at one level (not deep compare). Used by ",e.jsx(n.InlineCode,{children:"React.memo"}),' to decide if props "changed".']}),e.jsxs("li",{children:[e.jsx("b",{children:"Referential equality:"})," Two references point to the exact same object/function in memory (",e.jsx(n.InlineCode,{children:"a === b"}),"). Many memo strategies depend on this."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:'Why "OverMemo" Hurts'}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Extra work:"})," Memoization itself costs CPU (dependency comparison + cache maintenance). If the computation is cheap, the memo layer can cost more than recomputing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Complexity:"})," It spreads dependency arrays and identity rules all over your code, increasing cognitive load and bug surface (e.g., stale values)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Illusion of speed:"}),' It can feel "optimized" while making the app harder to change and sometimes slower.']})]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["When Memoization ",e.jsx("i",{children:"Does"})," Help"]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Expensive computations:"})," Sorting/formatting large lists, heavy data transforms, complex layout math."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stable identities for Pure children:"})," If a child is wrapped in ",e.jsx(n.InlineCode,{children:"React.memo"})," ","or uses referential equality in effects, pass memoized objects/functions to prevent unnecessary updates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Event handlers passed deep:"})," Memoize with ",e.jsx(n.InlineCode,{children:"useCallback"})," when a stable identity avoids avoidable renders."]})]}),e.jsx(n.Small,{children:"Rule of thumb: Do it because you measured a bottleneck or a child truly benefits—not by default."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Anti-Example: Gratuitous Memoization"}),e.jsx(n.Pre,{children:`function PriceTag({ price }) {
  // ❌ Unnecessary: formatting is trivial
  const formatted = React.useMemo(() => Intl.NumberFormat().format(price), [price]);

  // ❌ Unnecessary: local inline callback won't be passed to memoized child
  const onClick = React.useCallback(() => {
    console.log("clicked");
  }, []);

  return <button onClick={onClick}>₹{formatted}</button>;
}`}),e.jsx(n.Small,{children:"Here, both memoizations add cost and noise with no measurable benefit. Just compute directly and inline the handler."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Good Example: Real Work & Stable Props"}),e.jsx(n.Pre,{children:`const List = React.memo(function List({ rows }) {
  // Re-renders only if rows reference changes (shallow).
  return rows.map(r => <div key={r.id}>{r.label}</div>);
});

function Dashboard({ data }) {
  // ✅ Heavy transform: worth memoizing
  const rows = React.useMemo(() => {
    // simulate expensive work
    const out = [];
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      out.push({ id: d.id, label: d.name.toUpperCase() });
    }
    return out;
  }, [data]);

  return <List rows={rows} />;
}`}),e.jsxs(n.Small,{children:["We memoize a ",e.jsx("i",{children:"heavy"})," transform to keep ",e.jsx(n.InlineCode,{children:"rows"})," stable for a memoized child."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common Pitfalls"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Stale values:"})," A memoized value/handler may capture old state/props if dependencies are incomplete. Always include everything the callback/value uses in the dependency array."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Unstable dependencies:"})," If a dependency changes every render (e.g., inline object), your memo never hits. Stabilize the dependency itself or restructure the code."]}),e.jsxs("li",{children:[e.jsx("b",{children:'Memo "pinball":'})," Adding ",e.jsx(n.InlineCode,{children:"useMemo"})," causes you to add"," ",e.jsx(n.InlineCode,{children:"useCallback"}),", then"," ",e.jsx(n.InlineCode,{children:"React.memo"}),', and so on, to "make it work." Step back—measure first.']})]}),e.jsx(n.Pre,{children:`function Filters({ onChange }) {
  // ❌ New object each render -> breaks memo downstream
  const query = { limit: 20, sort: "date" };

  // ✅ Stabilize with useMemo if identity matters
  // const query = React.useMemo(() => ({ limit: 20, sort: "date" }), []);

  React.useEffect(() => {
    onChange(query); // dependency should include query if used
  }, [onChange, query]);

  return null;
}`})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:[e.jsx("code",{children:"useCallback"}),": Identity vs Behavior"]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Identity stability:"})," The main reason to use ",e.jsx(n.InlineCode,{children:"useCallback"})," is to keep the function reference the same across renders (for memoized children or dependency arrays)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Behavior freshness:"}),' The callback must still "see" the latest state/props. Ensure all referenced values are in the dependency list, or use an approach like ',e.jsx(n.InlineCode,{children:"useEvent"})," (stable identity that calls the latest handler)."]})]}),e.jsx(n.Pre,{children:`function Counter() {
  const [n, setN] = React.useState(0);

  // ✅ Correct: includes setN (stable) and n (changes), so identity changes with n.
  const inc = React.useCallback(() => setN(n + 1), [n]);

  return <button onClick={inc}>Count: {n}</button>;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Measure Before Optimizing"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"React DevTools Profiler:"})," Record interactions and see which components re-render and why."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Console timings:"})," Wrap expensive sections with ",e.jsx(n.InlineCode,{children:"performance.now()"})," ","or ",e.jsx(n.InlineCode,{children:"console.time"}),"/",e.jsx(n.InlineCode,{children:"timeEnd"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Realistic data:"})," Test with production-like list sizes and real interaction patterns."]})]}),e.jsx(n.Pre,{children:`// quick micro-measure
const t0 = performance.now();
const result = heavyTransform(data);
const t1 = performance.now();
console.log("heavyTransform took", (t1 - t0).toFixed(2), "ms");`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," start simple; optimize only identified hotspots."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," memoize heavy computations or props passed to memoized children."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep dependency arrays complete to avoid stale values."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," memoize trivial computations (formatting a single number, small maps)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," force ",e.jsx(n.InlineCode,{children:"React.memo"})," everywhere—props often change legitimately."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," chase referential equality at the cost of clarity and correctness."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Quick Checklist"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Is the computation expensive or the list large?"}),e.jsxs("li",{children:["Is a child ",e.jsx(n.InlineCode,{children:"React.memo"})," component re-rendering pointlessly?"]}),e.jsx("li",{children:"Did profiling show a real bottleneck?"}),e.jsx("li",{children:"Are dependency arrays complete and stable?"})]})]}),e.jsx(n.Callout,{children:"Summary: Memoization is powerful when targeted at real costs (heavy work, stable props for memoized children). Used everywhere, it adds overhead and complexity. Profile first, optimize where it matters, and keep code clear."})]});export{t as default};
