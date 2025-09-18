import{R as n,j as e,r as d}from"./index-UhLb6G-I.js";import{S as i}from"./styled-DbLDy_un.js";const x=()=>{const s=n.useCallback((o,t,l,r,a,c)=>{console.log(`[Profiler:${o}]`,{phase:t,actualDuration:l,baseDuration:r,startTime:a,commitTime:c})},[]);return e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Profiler"}),e.jsxs(i.Lead,{children:["The React ",e.jsx("b",{children:"<Profiler>"})," measures render performance for a part of your component tree. Wrap a subtree with it and React will call your ",e.jsx(i.InlineCode,{children:"onRender"})," callback after each ",e.jsx("em",{children:"commit"})," with precise timings. Use it to locate slow renders and validate optimizations (like memoization or list virtualization)."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core definitions"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Render phase:"})," React calculates what the UI ",e.jsx("em",{children:"should"})," look like (reconciliation, diffing)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Commit phase:"})," React applies changes to the real DOM and runs layout effects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Commit:"})," One batch of DOM updates applied as a result of rendering; Profiler reports per-commit."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Subtree:"})," The part of the component tree wrapped by ",e.jsx(i.InlineCode,{children:"<Profiler>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"actualDuration:"})," Time (ms) it took to render the wrapped subtree for ",e.jsx("em",{children:"this"})," commit."]}),e.jsxs("li",{children:[e.jsx("b",{children:"baseDuration:"})," Estimated time (ms) to render the entire subtree ",e.jsx("em",{children:"without"})," memoization/short-circuits (a baseline to compare against)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"phase:"})," ",e.jsx(i.InlineCode,{children:'"mount"'})," for first paint, ",e.jsx(i.InlineCode,{children:'"update"'})," for subsequent re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"startTime / commitTime:"})," High-resolution timestamps (ms) for when rendering started and when the DOM changes were committed."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Basic usage"}),e.jsx(i.Pre,{children:`import React, { Profiler as ReactProfiler } from "react";

function App() {
  const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    console.log(\`[Profiler:\${id}] \${phase} took \${actualDuration.toFixed(2)}ms (base \${baseDuration.toFixed(2)}ms)\`);
  };

  return (
    <ReactProfiler id="SearchArea" onRender={onRender}>
      <SearchArea />
    </ReactProfiler>
  );
}`}),e.jsxs(i.Small,{children:["Give each Profiler a unique ",e.jsx(i.InlineCode,{children:"id"}),". Keep"," ",e.jsx(i.InlineCode,{children:"onRender"})," extremely small-log, then exit."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Example: measuring a filter box (mount vs update)"}),e.jsx(i.Pre,{children:`function SlowList({ items, query }) {
  // Simulate heavy work: expensive filtering + formatting.
  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    // worst-case O(n)
    const out = items.filter(x => x.name.toLowerCase().includes(q));
    // pretend formatting work
    for (let i = 0; i < 20000; i++) {} // CPU spin to make slowness visible
    return out;
  }, [items, query]);

  return (
    <ul>{visible.map(it => <li key={it.id}>{it.name}</li>)}</ul>
  );
}

function SearchArea() {
  const [q, setQ] = React.useState("");
  const items = React.useMemo(() => Array.from({length: 2000}, (_, i) =>
    ({ id: i, name: "Item " + i })), []);

  return (
    <>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Type to filter…"
      />
      <SlowList items={items} query={q} />
    </>
  );
}

function Page() {
  const onRender = (id, phase, actualDuration, baseDuration) => {
    console.log(\`[\${id}] \${phase} actual=\${actualDuration.toFixed(1)}ms base=\${baseDuration.toFixed(1)}ms\`);
  };

  return (
    <React.Profiler id="FilterProfiler" onRender={onRender}>
      <SearchArea />
    </React.Profiler>
  );
}`}),e.jsxs(i.Small,{children:["Observe the console while typing: ",e.jsx("b",{children:"mount"})," vs ",e.jsx("b",{children:"update"})," timings differ. Optimizations (memoization, virtualization) should reduce ",e.jsx("em",{children:"actualDuration"})," while ",e.jsx("em",{children:"baseDuration"})," remains a reference of raw work."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Aggregating results"}),e.jsx(i.Pre,{children:`function useProfilerSummary() {
  const storeRef = React.useRef(new Map()); // id -> { commits, total, worst }

  const onRender = React.useCallback((id, phase, actualDuration) => {
    const s = storeRef.current.get(id) ?? { commits: 0, total: 0, worst: 0 };
    s.commits += 1;
    s.total += actualDuration;
    s.worst = Math.max(s.worst, actualDuration);
    storeRef.current.set(id, s);
  }, []);

  const summary = React.useMemo(() => {
    return Array.from(storeRef.current, ([id, s]) => ({
      id, commits: s.commits,
      avg: s.total / s.commits,
      worst: s.worst
    }));
  }, [storeRef.current.size]); // read on demand or expose a getter

  return { onRender, summary };
}

function ProfiledArea() {
  const { onRender, summary } = useProfilerSummary();
  return (
    <>
      <React.Profiler id="HeavyWidget" onRender={onRender}>
        <HeavyWidget />
      </React.Profiler>
      {/* You could render summary in a table, or send it to analytics */}
    </>
  );
}`}),e.jsxs(i.Small,{children:["Aggregate per-id stats to spot hot components (highest ",e.jsx("em",{children:"worst"})," or ",e.jsx("em",{children:"avg"}),"). Keep aggregation cheap."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"React DevTools Profiler (GUI)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Open the ",e.jsx("b",{children:"Profiler"})," tab in React DevTools."]}),e.jsxs("li",{children:["Click ",e.jsx("b",{children:"Start profiling"}),", interact with the app, then ",e.jsx("b",{children:"Stop"}),"."]}),e.jsxs("li",{children:["Inspect the ",e.jsx("b",{children:"Flamegraph"})," (time per component) or ",e.jsx("b",{children:"Ranked"})," (slowest first)."]}),e.jsxs("li",{children:["Look at “",e.jsx("b",{children:"Why did this render?"}),"” to see state/props causing re-renders."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"Commit"})," dropdown to analyze each commit. Aim to reduce the slowest commits first."]})]}),e.jsxs(i.Small,{children:["DevTools Profiler is best for visual analysis; the ",e.jsx(i.InlineCode,{children:"<Profiler>"})," component is best for custom logging and CI experiments."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Patterns & best practices"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Wrap narrowly:"})," Target specific subtrees (lists, charts) rather than the whole app."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keep onRender tiny:"})," Logging only. Heavy work will distort timings."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Compare actual vs base:"})," If ",e.jsx("em",{children:"actual"})," ≈ ",e.jsx("em",{children:"base"}),", memoization isn't helping; revisit keys, ",e.jsx(i.InlineCode,{children:"React.memo"}),", or state placement."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Profile real scenarios:"})," Use production builds locally (",e.jsx(i.InlineCode,{children:"vite build && vite preview"}),")-development has extra checks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Measure before/after:"})," Take a baseline, apply an optimization (memoization, virtualization), re-measure."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," profile user-critical paths (typing, scrolling, opening modals)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use small, well-named ",e.jsx(i.InlineCode,{children:"id"}),"s to differentiate areas."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," run expensive code inside ",e.jsx(i.InlineCode,{children:"onRender"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," assume micro-benchmarks represent real UX-profile end-to-end interactions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," forget to remove test-only CPU spins or debug logs after investigation."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Profiler:"})," React component that measures render timings for a subtree."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Flamegraph:"})," Visualization in DevTools showing where time is spent per component."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Ranked view:"})," List of components sorted by time spent rendering."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reconciliation:"})," Process of comparing previous and next virtual trees to compute changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Virtual DOM:"})," In-memory representation of UI used by React to compute updates."]})]})]}),e.jsxs(i.Callout,{children:["Summary: wrap performance-sensitive areas with ",e.jsx(i.InlineCode,{children:"<Profiler>"}),", keep the callback lightweight, and use the numbers (and DevTools) to guide optimizations like memoization and list virtualization-measure, don't guess."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Inline demo (optional)"}),e.jsxs(i.Small,{children:["This page also wraps a small demo subtree to show ",e.jsx("em",{children:"mount"}),"/",e.jsx("em",{children:"update"})," timings in your console."]}),e.jsx(d.Profiler,{id:"ProfilerPageDemo",onRender:s,children:e.jsx(h,{})})]})]})};function h(){const[s,o]=n.useState(0),t=n.useMemo(()=>Array.from({length:1e3},(r,a)=>a),[]),l=n.useMemo(()=>t.map(r=>r*2+s),[t,s]);return e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:()=>o(r=>r+1),children:["Re-render demo (",s,")"]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(10, 1fr)",gap:4},children:l.slice(0,100).map(r=>e.jsx("span",{children:r},r))})]})}export{x as default};
