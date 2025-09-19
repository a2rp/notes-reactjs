import{j as e}from"./index-BRArnZ3i.js";import{S as t}from"./styled-7VbwKvaZ.js";const s=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Derived State Pitfalls"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"Derived state"})," is any piece of state you store that can be calculated from",e.jsx("i",{children:" something you already have"})," (props, other state). Keeping both the computed value and its inputs often creates ",e.jsx("b",{children:"drift"})," (they fall out of sync), ",e.jsx("b",{children:"bugs"}),", and",e.jsx("b",{children:"unnecessary re-renders"}),". Prefer ",e.jsx("b",{children:"compute on the fly"})," or memoize instead of storing."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Definitions"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Derived state:"})," a stored value that can be calculated from existing data (e.g., ",e.jsx(t.InlineCode,{children:'fullName = first + " " + last'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Source of truth:"})," the single, authoritative place a piece of data lives (a prop, a state variable, a store). Everything else should derive from it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Drift:"})," when two representations of the same data stop matching (e.g., cached total doesn't reflect updated items)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memoization:"})," caching the ",e.jsx("i",{children:"result"})," of a calculation (using ",e.jsx(t.InlineCode,{children:"useMemo"}),") so it recomputes only when inputs change."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled vs Uncontrolled (forms):"})," controlled inputs mirror state and update on every change; uncontrolled inputs let the DOM keep the value and you read it when needed (via refs/defaultValue)."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"1) Anti-pattern: Copying props into state"}),e.jsx(t.Small,{children:"If a value comes from props, don't mirror it into local state just to read it. You'll have two sources that can disagree."}),e.jsx(t.Pre,{children:`// ❌ Anti-pattern: local state duplicates a prop
function PriceTag({ price }) {
  const [displayPrice, setDisplayPrice] = React.useState(price); // duplicated

  // Parent updates price → displayPrice may not update correctly
  // unless we add synchronization logic... which is fragile.

  return <span>{displayPrice.toFixed(2)}</span>;
}

// ✅ Prefer deriving directly from props (no extra state)
function PriceTagFixed({ price }) {
  const formatted = price.toFixed(2);
  return <span>{formatted}</span>;
}`}),e.jsxs(t.Small,{children:["Storing ",e.jsx("i",{children:"displayPrice"})," adds drift risk. Compute the formatted number each render."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"2) Anti-pattern: Storing filtered or computed collections"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Don't store ",e.jsx("i",{children:"filteredItems"}),", ",e.jsx("i",{children:"sortedItems"}),", ",e.jsx("i",{children:"total"})," if you can compute them."]}),e.jsxs("li",{children:["Use ",e.jsx(t.InlineCode,{children:"useMemo"})," if the computation is heavy."]})]}),e.jsx(t.Pre,{children:`// ❌ Anti-pattern: keep a filtered copy in state
function List({ items, query }) {
  const [filtered, setFiltered] = React.useState([]);

  React.useEffect(() => {
    setFiltered(items.filter(i => i.name.includes(query)));
  }, [items, query]);

  return filtered.map(i => <div key={i.id}>{i.name}</div>);
}

// ✅ Compute on the fly (memoize if needed)
function ListFixed({ items, query }) {
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(i => i.name.toLowerCase().includes(q));
  }, [items, query]);

  return filtered.map(i => <div key={i.id}>{i.name}</div>);
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"3) Forms: The valid exception — “local draft”"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["You often need a ",e.jsx("b",{children:"draft"})," copy of incoming data for editing. This is okay because the user is intentionally diverging from the source until they save."]}),e.jsxs("li",{children:["Initialize once when the ",e.jsx("b",{children:"entity identity"})," changes (e.g., ",e.jsx(t.InlineCode,{children:"user.id"}),"). Avoid re-initializing on every prop change."]}),e.jsx("li",{children:"The draft becomes the new source of truth after save; or you discard it on cancel."})]}),e.jsx(t.Pre,{children:`// ✅ Pattern: reset draft when the entity (user.id) changes
function ProfileEditor({ user }) {
  const [draft, setDraft] = React.useState(user);

  // Reset only when switching to a different user
  React.useEffect(() => {
    setDraft(user);
  }, [user.id]); // key: depend on identity, not the entire object

  function onChange(e) {
    const { name, value } = e.target;
    setDraft(d => ({ ...d, [name]: value }));
  }

  return (
    <form>
      <input name="name" value={draft.name} onChange={onChange} />
      <input name="email" value={draft.email} onChange={onChange} />
      {/* Save/Cancel buttons */}
    </form>
  );
}

// 🔁 Alternative: key the subtree to force a full re-mount when the id changes
// <ProfileEditorInner key={user.id} user={user} />`}),e.jsxs(t.Small,{children:["Depend on ",e.jsx("b",{children:"identity"})," (like ",e.jsx("i",{children:"user.id"}),"), not the entire object, to avoid ping-pong resets."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"4) Totals/Counters: compute, don't store"}),e.jsx(t.Pre,{children:`// ❌ Anti-pattern: storing total invites drift
function Cart({ items }) {
  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    setTotal(items.reduce((sum, it) => sum + it.price * it.qty, 0));
  }, [items]);
  // Any missed dependency or manual updates can desync total.
  return <div>Total: {total.toFixed(2)}</div>;
}

// ✅ Derive when rendering (memo if expensive)
function CartFixed({ items }) {
  const total = React.useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );
  return <div>Total: {total.toFixed(2)}</div>;
}`})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["5) “Syncing” with ",e.jsx("code",{children:"useEffect"}),": handle with care"]}),e.jsxs(t.List,{children:[e.jsx("li",{children:"If you're writing an effect just to keep a duplicated value in sync, that's a smell. Remove the duplication instead."}),e.jsxs("li",{children:["Use effects for ",e.jsx("b",{children:"side effects"})," (network calls, subscriptions, DOM APIs), not for mirroring data."]})]}),e.jsx(t.Pre,{children:`// ❌ Smell: effect used to keep duplicate in sync
function Badge({ count }) {
  const [shown, setShown] = React.useState(count);
  React.useEffect(() => setShown(count), [count]); // why duplicate at all?
  return <span>{shown}</span>;
}

// ✅ Just render from the prop
function BadgeFixed({ count }) {
  return <span>{count}</span>;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"6) When is storing derived state acceptable?"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Snapshots:"})," you must freeze a value at a moment in time (e.g., log the price user saw when they clicked “Buy”). Use a ",e.jsx(t.InlineCode,{children:"ref"})," or store once."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Heavy computation with external triggers only:"})," usually solved with",e.jsx(t.InlineCode,{children:"useMemo"}),". If you truly need to ",e.jsx("i",{children:"manually"})," recompute on specific triggers, store and update ",e.jsx("i",{children:"deliberately"})," with clear invariants."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Bridging controlled ↔ uncontrolled:"})," temporarily hold a draft for form UX, as shown above."]})]}),e.jsx(t.Pre,{children:`// Example: snapshot with ref (doesn't cause re-render)
function Checkout({ currentPrice }) {
  const clickedPriceRef = React.useRef(null);

  function onBuy() {
    if (clickedPriceRef.current == null) {
      clickedPriceRef.current = currentPrice; // snapshot once
    }
    // send clickedPriceRef.current to server...
  }

  return <button onClick={onBuy}>Buy</button>;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Checklist"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Can this value be computed from existing data? → ",e.jsx("b",{children:"Don't store it."})]}),e.jsxs("li",{children:["Is there one clear source of truth? → ",e.jsx("b",{children:"Keep it single."})]}),e.jsxs("li",{children:["Is the value expensive to compute? → Use ",e.jsx("b",{children:"useMemo"}),"."]}),e.jsxs("li",{children:["Do you need a user-editable draft? → Store a ",e.jsx("b",{children:"draft"}),", reset by ",e.jsx("b",{children:"identity"}),"."]}),e.jsx("li",{children:"Are you writing effects only to sync duplicates? → Remove the duplicate."})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," compute display-only values at render time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," memoize heavy calculations with ",e.jsx(t.InlineCode,{children:"useMemo"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep drafts for editing flows; reset by ID or component key."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," copy props to state “just in case.”"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," maintain totals/counters separately—derive them."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Derived state:"})," stored duplicate of computable data (avoid)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Source of truth:"})," the authoritative holder of a value."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Drift:"})," mismatch between duplicates over time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memoization:"})," caching a computation result until its inputs change."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Identity:"})," stable attribute that uniquely identifies an entity (e.g., ",e.jsx("i",{children:"user.id"}),")."]})]})]}),e.jsxs(t.Callout,{children:["Rule of thumb: If you can ",e.jsx("i",{children:"calculate"})," it, don't ",e.jsx("i",{children:"store"})," it. Keep state minimal, avoid duplicates, and your UI will be simpler, faster, and less buggy."]})]});export{s as default};
