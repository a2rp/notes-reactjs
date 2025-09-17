import{j as e}from"./index-c1-mK4-g.js";import{S as s}from"./styled-y_Pw0uvl.js";const n=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Derived State"}),e.jsxs(s.Lead,{children:["Derived state is any value that can be ",e.jsx("b",{children:"computed"})," from existing state/props/context instead of being stored separately. Prefer ",e.jsx("b",{children:"compute"}),"(and optionally memoize) over duplicating data."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Terminology (precise)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Source state:"})," the minimal, authoritative state that is actually stored (e.g., ",e.jsx(s.InlineCode,{children:"items"}),", ",e.jsx(s.InlineCode,{children:"query"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Derived state:"})," a value computed from source state/props (e.g., ",e.jsx("em",{children:"filtered items"}),", ",e.jsx("em",{children:"total price"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memoization:"})," caching the result of a computation while inputs are the same; in React, use ",e.jsx(s.InlineCode,{children:"useMemo"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Referential equality:"})," whether two references point to the exact same object/array/function in memory. Important for ",e.jsx(s.InlineCode,{children:"React.memo"})," and dependency arrays."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Selector:"})," a pure function that takes state and returns a derived value (e.g., ",e.jsx(s.InlineCode,{children:"selectVisible(items, query)"}),")."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Rule of thumb: store the minimum, derive the rest"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Store ",e.jsx("b",{children:"only"})," what users or the system can change directly."]}),e.jsxs("li",{children:["Do ",e.jsx("b",{children:"not"})," store duplicates like ",e.jsx("em",{children:"sorted"})," or ",e.jsx("em",{children:"filtered"})," arrays—compute them from the source."]}),e.jsx("li",{children:"Store IDs and raw records; derive views (counts, sums, selections) at render time."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Compute during render (most cases)"}),e.jsx(s.Pre,{children:`function Products({ items, query }) {
  const q = query.trim().toLowerCase();
  const visible = items.filter(p => p.name.toLowerCase().includes(q)); // derived
  const total = visible.reduce((sum, p) => sum + p.price, 0);          // derived
  return (
    <>
      <p>Showing {visible.length} items. Total: ₹{total}</p>
      <ul>{visible.map(p => <li key={p.id}>{p.name}</li>)}</ul>
    </>
  );
}`}),e.jsxs(s.Small,{children:["Correctness does ",e.jsx("b",{children:"not"})," require memoization. Compute inline unless it’s expensive or the reference must be stable."]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["When to use ",e.jsx("code",{children:"useMemo"})]}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["The computation is ",e.jsx("b",{children:"expensive"})," (e.g., large sorts, heavy transforms)."]}),e.jsxs("li",{children:["A ",e.jsx("b",{children:"stable reference"})," is needed to avoid re-rendering a memoized child or to keep effect deps steady."]})]}),e.jsx(s.Pre,{children:`function ProductsMemo({ items, query }) {
  const q = query.trim().toLowerCase();
  const visible = React.useMemo(() => {
    // heavy filter + sort
    const list = items.filter(p => p.name.toLowerCase().includes(q));
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [items, q]); // include all inputs

  return <List items={visible} />;
}`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Important:"})," ",e.jsx(s.InlineCode,{children:"useMemo"})," is a performance hint, not a guarantee. It may recompute; never rely on it for correctness."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Anti-pattern: duplicated state"}),e.jsx(s.Pre,{children:`// ❌ Wrong: stores both 'items' and 'visible', which can go out of sync
const [items, setItems] = React.useState([]);
const [visible, setVisible] = React.useState([]);

function onQueryChange(q) {
  setVisible(items.filter(p => p.name.includes(q))); // risks desync when items later change
}

// ✅ Right: store minimal state and derive
const [items, setItems] = React.useState([]);
const [query, setQuery] = React.useState("");
const visible = React.useMemo(
  () => items.filter(p => p.name.includes(query)),
  [items, query]
);`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Derived from props vs local copies"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Prefer computing directly from props each render."}),e.jsx("li",{children:"Avoid copying props to state just to render them (stale data risk)."}),e.jsx("li",{children:"If initialization from a prop is needed for an editable local copy, initialize once or sync intentionally."})]}),e.jsx(s.Pre,{children:`// ❌ Stale copy
function Price({ value }) {
  const [v] = React.useState(value); // won't update if 'value' changes
  return <span>₹{v}</span>;
}

// ✅ Compute directly
function Price({ value }) {
  return <span>₹{value}</span>;
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Referential stability (children & effects)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Passing a ",e.jsx("b",{children:"new array/object"})," each render can re-render memoized children."]}),e.jsxs("li",{children:["Wrap derived arrays/objects in ",e.jsx(s.InlineCode,{children:"useMemo"})," when they are props to ",e.jsx(s.InlineCode,{children:"React.memo"})," children or used in effect deps."]})]}),e.jsx(s.Pre,{children:`const cols = React.useMemo(
  () => [{ key: "name" }, { key: "price" }],
  []
);
// Safe to pass to memoized <Table columns={cols} />`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Selectors & data normalization"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Create small ",e.jsx("b",{children:"selector"})," functions for reusable derivations (e.g., ",e.jsx(s.InlineCode,{children:"selectVisible"}),")."]}),e.jsx("li",{children:"Normalize data for fast lookups (maps by ID), and derive views (arrays, counts) when rendering."})]}),e.jsx(s.Pre,{children:`const byId = React.useMemo(() => {
  const map = new Map();
  for (const p of items) map.set(p.id, p);
  return map;
}, [items]);

function selectVisible(items, q) {
  const s = q.trim().toLowerCase();
  return items.filter(p => p.name.toLowerCase().includes(s));
}
const visible = React.useMemo(() => selectVisible(items, query), [items, query]);`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Effects & dependencies (avoid stale or infinite loops)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Effects depend on the ",e.jsx("b",{children:"inputs"}),", not on the memoization wrapper."]}),e.jsxs("li",{children:["Do not place derived ",e.jsx("em",{children:"results"})," into state to satisfy deps; derive inside the effect or memoize and depend on inputs."]})]}),e.jsx(s.Pre,{children:`function useTotals(items) {
  const total = React.useMemo(
    () => items.reduce((s, p) => s + p.price, 0),
    [items]
  );
  React.useEffect(() => {
    // side effect when total changes
    console.log("Total changed:", total);
  }, [total]);
  return total;
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"UI booleans, classes, labels (derive tiny facts)"}),e.jsx(s.Pre,{children:`const isEmpty = items.length === 0;          // boolean derived
const label   = isEmpty ? "No items" : "Items";
const cls     = ["btn", disabled && "btn--muted"].filter(Boolean).join(" ");`}),e.jsx(s.Small,{children:"Small derived values rarely need memoization; compute inline."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common pitfalls"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Storing filtered/sorted data in state → gets out of sync; derive instead."}),e.jsxs("li",{children:["Using ",e.jsx(s.InlineCode,{children:"useMemo"})," to “prevent re-renders” universally—memo is not a magic shield; measure first."]}),e.jsxs("li",{children:["Missing dependencies in ",e.jsx(s.InlineCode,{children:"useMemo"}),"/",e.jsx(s.InlineCode,{children:"useEffect"})," → stale results. Include all inputs."]}),e.jsxs("li",{children:["Creating new arrays/objects every render and passing them to memoized children → avoid with ",e.jsx(s.InlineCode,{children:"useMemo"}),"."]}),e.jsxs("li",{children:["Keeping both ",e.jsx("em",{children:"raw"})," and ",e.jsx("em",{children:"derived"})," copies in state → bugs during updates."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do / Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," store minimal state; derive the rest each render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," memoize expensive computations or props needing stable references."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," write small selector functions for reuse and tests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," copy props to state just to render them."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," misuse ",e.jsx(s.InlineCode,{children:"useMemo"})," as a correctness tool; it’s for performance."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," forget dependencies; stale derivations cause subtle bugs."]})]})]}),e.jsxs(s.Callout,{children:["Summary: keep a single, minimal source of truth. Derive everything else during render, and use ",e.jsx("b",{children:"useMemo"}),"only for expensive work or stable references. Fewer stored copies → fewer sync bugs."]})]});export{n as default};
