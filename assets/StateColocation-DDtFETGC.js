import{j as e}from"./index-UhLb6G-I.js";import{S as t}from"./styled-DLzus0mp.js";const n=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"State Colocation"}),e.jsxs(t.Lead,{children:["State colocation means putting state ",e.jsx("b",{children:"as close as possible"})," to the components that read and update it. Start local, then lift only when multiple components must share it. Less surface area → fewer renders, fewer props, fewer bugs."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Terminology (precise)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Colocation:"})," storing a piece of state in the smallest component that needs it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Owner:"})," the component that holds a state value and decides how it changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scope:"})," the subtree that can “see” a piece of state (owner + descendants via props/context)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shared state:"})," a value needed by more than one component → lift to their nearest common parent."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Derived state:"})," a computed value from other state/props. Don’t store duplicates; compute or memoize."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Global/app state:"})," cross-cutting concerns (auth, theme, feature flags). Use context or state libs, sparingly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"URL/route state:"})," state encoded in the address bar (page, tab, filters) so it’s linkable and restorable."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Heuristics: where should this state live?"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Who reads it?"})," Put state where the ",e.jsx("em",{children:"closest common"})," reader lives."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Who writes it?"})," Place state where updates originate; lift when multiple writers exist."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Is it navigational?"})," If it should persist in the URL (shareable/back-button), store it in route params/query."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Is it expensive to propagate?"})," High-frequency updates (typing, drag) should be colocated to avoid re-rendering large trees."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Is it derived?"})," Don’t store—compute during render; memoize if costly or if stable reference is required."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example: Modal open/close"}),e.jsx(t.Pre,{children:`// ✅ Colocate: only Button+Modal care about 'open'
function DeleteDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Delete</button>
      {open && (
        <div role="dialog" aria-modal="true">
          <p>Confirm delete?</p>
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button onClick={() => { /* delete */ setOpen(false); }}>Confirm</button>
        </div>
      )}
    </>
  );
}

// ❌ Anti-pattern: lifting to App when no one else needs it → prop drilling & extra renders`}),e.jsx(t.Small,{children:"Lift only if multiple siblings need to coordinate the same dialog state."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example: Search + List"}),e.jsx(t.Pre,{children:`// Case A — local: Search owns query, filters its own list (simple component)
function SearchList({ items }) {
  const [q, setQ] = React.useState("");
  const visible = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter(it => it.name.toLowerCase().includes(s));
  }, [items, q]);

  return (
    <>
      <input placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
      <ul>{visible.map(it => <li key={it.id}>{it.name}</li>)}</ul>
    </>
  );
}

// Case B — shared: search affects multiple components (list + stats + pager)
function ProductsPage({ items }) {
  const [q, setQ] = React.useState(""); // lifted to the nearest common parent
  const visible = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter(it => it.name.toLowerCase().includes(s));
  }, [items, q]);

  return (
    <>
      <SearchBox value={q} onChange={setQ} />
      <Stats count={visible.length} />
      <ProductList items={visible} />
    </>
  );
}`}),e.jsx(t.Small,{children:"Start with A. Move to B only when multiple components need the same query."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example: Form editing"}),e.jsx(t.Pre,{children:`// ✅ Colocate: field state near the inputs; submit passes data upward
function ProfileForm({ onSubmit }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  function submit(e) {
    e.preventDefault();
    onSubmit({ name, email }); // parent owns server mutation, not each keystroke
  }
  return (
    <form onSubmit={submit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
}

// Lift only if siblings must validate/preview the same draft simultaneously.`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Route/URL as state (shareable & restorable)"}),e.jsx(t.Pre,{children:`// keep tab in the URL so refresh/back-button works
import { useSearchParams } from "react-router-dom";

function TabsWithUrl() {
  const [sp, setSp] = useSearchParams();
  const tab = sp.get("tab") || "info";

  function select(next) {
    const nextSp = new URLSearchParams(sp);
    nextSp.set("tab", next);
    setSp(nextSp, { replace: true });
  }

  return (
    <>
      <nav>
        <button aria-pressed={tab === "info"} onClick={() => select("info")}>Info</button>
        <button aria-pressed={tab === "reviews"} onClick={() => select("reviews")}>Reviews</button>
      </nav>
      {tab === "info" ? <Info /> : <Reviews />}
    </>
  );
}`}),e.jsx(t.Small,{children:"Use URL for navigational state (tab, page, filters) that users expect to share and revisit."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Performance & render boundaries"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"High-frequency updates (typing, drag) should be colocated to avoid re-rendering distant parents."}),e.jsxs("li",{children:["Split large components; pass only the data children need. Consider ",e.jsx("b",{children:"React.memo"})," for pure leaves."]}),e.jsx("li",{children:"Memoize derived arrays/objects you pass down so memoized children keep referential equality."})]}),e.jsx(t.Pre,{children:`// Split & memoize to reduce re-renders
const List = React.memo(function List({ items }) {
  return <ul>{items.map(it => <li key={it.id}>{it.name}</li>)}</ul>;
});

function Parent({ items }) {
  const visible = React.useMemo(() => items.slice(0, 100), [items]);
  return <List items={visible} />;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Anti-patterns & pitfalls"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Over-lifting:"})," pushing state to the top “just in case” → prop drilling, extra renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Premature global state:"})," using context/store for local concerns; keep things local unless truly shared."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Duplicated state:"})," storing raw and derived copies (e.g., items and filteredItems) → drift; derive instead."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Module-level mutable singletons:"})," storing mutable runtime data outside components prevents reactive updates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Leaking internal flags:"})," forwarding non-DOM props to DOM elements; filter them out."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Checklist"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Can another component see this state? If not → colocate."}),e.jsx("li",{children:"Do multiple siblings need it? Lift to the nearest common parent."}),e.jsx("li",{children:"Is it purely derived? Don’t store; compute (memoize if heavy)."}),e.jsx("li",{children:"Should it survive refresh/share? Put it in the URL."}),e.jsx("li",{children:"Are renders too broad? Split components, memoize boundaries."})]})]}),e.jsx(t.Callout,{children:"Summary: keep state close to where it’s used; lift only when sharing is necessary. Use URL for navigational state, compute derived values, and avoid premature global state. Smaller scopes mean simpler props, fewer re-renders, and clearer code."})]});export{n as default};
