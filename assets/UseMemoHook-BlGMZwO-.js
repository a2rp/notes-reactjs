import{j as e}from"./index-Cqwa5lnP.js";import{S as s}from"./styled-BUNlEv5j.js";const t=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"useMemo"}),e.jsxs(s.Lead,{children:[e.jsx(s.InlineCode,{children:"useMemo"})," memoizes the ",e.jsx("b",{children:"result of a computation"}),". It returns a cached value while the dependency list stays equal, and recomputes when dependencies change. It is a ",e.jsx("b",{children:"performance hint"}),"—never required for correctness."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Signature & terminology"}),e.jsx(s.Pre,{children:"const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Memoized value:"})," the cached result returned by ",e.jsx(s.InlineCode,{children:"useMemo"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dependencies:"})," reactive inputs for the computation; when any changes, React recomputes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Referential equality:"})," children using ",e.jsx(s.InlineCode,{children:"React.memo"})," or effect dependencies often need a ",e.jsx("b",{children:"stable reference"})," (same object/array) — ",e.jsx(s.InlineCode,{children:"useMemo"})," helps."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pure computation:"})," the callback must be side-effect free and deterministic for the given inputs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hint, not guarantee:"})," React may discard caches; do not rely on memo for correctness."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Use for expensive computations"}),e.jsx(s.Pre,{children:`function HeavyList({ items, query }) {
  const q = query.trim().toLowerCase();

  // Assume this filter + sort is heavy for large lists
  const visible = React.useMemo(() => {
    const filtered = items.filter(it => it.name.toLowerCase().includes(q));
    // heavy sort (localeCompare over many items)
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [items, q]);

  return <ul>{visible.map(it => <li key={it.id}>{it.name}</li>)}</ul>;
}`}),e.jsxs(s.Small,{children:["Without ",e.jsx(s.InlineCode,{children:"useMemo"}),", sorting runs every render. With it, sorting runs only when ",e.jsx(s.InlineCode,{children:"items"})," or ",e.jsx(s.InlineCode,{children:"q"})," changes."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Provide stable props to memoized children"}),e.jsx(s.Pre,{children:`const Table = React.memo(function Table({ columns, rows }) {
  // re-renders only if columns/rows references change
  return (
    <table>
      <thead><tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}</tr></thead>
      <tbody>{rows.map(r => <tr key={r.id}>{columns.map(c => <td key={c.key}>{r[c.key]}</td>)}</tr>)}</tbody>
    </table>
  );
});

function ProductsTable({ products }) {
  // Stable columns: without useMemo this array would be recreated every render
  const columns = React.useMemo(() => ([
    { key: "name",  label: "Name"  },
    { key: "price", label: "Price" },
  ]), []); // no deps → same reference forever

  return <Table columns={columns} rows={products} />;
}`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"When to memoize arrays/objects:"})," when they are passed to ",e.jsx(s.InlineCode,{children:"React.memo"})," children or used as effect dependencies and should remain stable."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Derive values; don’t store duplicates"}),e.jsx(s.Pre,{children:`// ❌ Anti-pattern: storing derived copies in state
// const [total, setTotal] = useState(0); // goes stale

// ✅ Derive and memoize only if expensive or for stable reference
function Cart({ items }) {
  const total = React.useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );
  return <p>Total: {total}</p>;
}`}),e.jsxs(s.Small,{children:["Compute during render; add ",e.jsx(s.InlineCode,{children:"useMemo"})," only when the work is heavy or the result must be referentially stable."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"useMemo vs useCallback"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"useMemo"})," memoizes a ",e.jsx("em",{children:"value"})," (object/array/number/string)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useCallback"})," memoizes a ",e.jsx("em",{children:"function"}),"—equivalent to ",e.jsx(s.InlineCode,{children:"useMemo(() => fn, deps)"}),"."]}),e.jsxs("li",{children:["If a child needs a stable ",e.jsx("em",{children:"function"})," prop, use ",e.jsx(s.InlineCode,{children:"useCallback"}),"; for stable data props, use ",e.jsx(s.InlineCode,{children:"useMemo"}),"."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Dependency rules"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Include ",e.jsx("b",{children:"all"})," reactive inputs used inside the compute callback (props, state, context)."]}),e.jsx("li",{children:"Do not depend on values that change every render (unless intended). If needed, restructure or memoize inputs."}),e.jsxs("li",{children:["It is safe to omit ",e.jsx(s.InlineCode,{children:"setState"})," functions (they’re stable)."]})]}),e.jsx(s.Pre,{children:`// Good: include all inputs
const filtered = React.useMemo(() => {
  return items.filter(it => it.type === filter.type);
}, [items, filter.type]);`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"No side effects inside useMemo"}),e.jsx(s.Pre,{children:`// ❌ Bad: side effects during render
const value = React.useMemo(() => {
  console.log("fetching...");      // side effect
  // fetch(...);                    // do not fetch here
  return compute();
}, [deps]);

// ✅ Do effects in useEffect
React.useEffect(() => {
  // fetch / subscribe / timers here
}, [deps]);`}),e.jsxs(s.Small,{children:[e.jsx(s.InlineCode,{children:"useMemo"})," runs during render. Keep it pure and synchronous."]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Cost model: when ",e.jsx("em",{children:"not"})," to use useMemo"]}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Memo has overhead (tracking deps, extra function call). If the computation is cheap, memoization can be slower."}),e.jsxs("li",{children:["Start without ",e.jsx(s.InlineCode,{children:"useMemo"}),". Add it for demonstrable hotspots or to stabilize references that matter."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Patterns & recipes"}),e.jsx(s.Pre,{children:`// 1) Stable style/props object to avoid re-render of memoized child
const style = React.useMemo(() => ({ padding: 8, borderRadius: 12 }), []);

// 2) Sorting + slicing large data
const top10 = React.useMemo(() => {
  return [...items].sort((a, b) => b.score - a.score).slice(0, 10);
}, [items]);

// 3) Normalization cache (Map by id)
const byId = React.useMemo(() => {
  const map = new Map();
  for (const it of items) map.set(it.id, it);
  return map;
}, [items]);`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common pitfalls"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Missing dependencies → stale results. Always include every input used inside."}),e.jsxs("li",{children:["Using ",e.jsx(s.InlineCode,{children:"useMemo"})," to “prevent re-renders” globally—memoizing values does not stop parent renders."]}),e.jsxs("li",{children:["Placing side effects (fetch, DOM writes) inside ",e.jsx(s.InlineCode,{children:"useMemo"}),"."]}),e.jsx("li",{children:"Memoizing everything by default—adds complexity with little gain."}),e.jsx("li",{children:"Relying on memo for correctness—React may drop caches; logic must still be correct without memo."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do / Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," memoize expensive computations."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," memoize arrays/objects passed to memoized children or used in effect deps."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep the compute function pure and include all dependencies."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," perform side effects in ",e.jsx(s.InlineCode,{children:"useMemo"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," overuse it for trivial work; measure first."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," treat memo as a guarantee of caching—it’s a hint."]})]})]}),e.jsxs(s.Callout,{children:["Summary: ",e.jsx(s.InlineCode,{children:"useMemo"})," caches ",e.jsx("b",{children:"values"})," to avoid repeated heavy work and to keep references stable for children and effects. Use it selectively for real hotspots and stable props, keep computations pure, and include all dependencies."]})]});export{t as default};
