import{j as e}from"./index-wTxrXa3i.js";import{S as r}from"./styled-CmnHbB2d.js";const n=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Immutable Updates"}),e.jsxs(r.Lead,{children:["Treat React state as ",e.jsx("b",{children:"immutable"}),": never modify existing objects/arrays in place. Always create a ",e.jsx("b",{children:"new"})," object/array with the desired changes. React relies on",e.jsx("b",{children:" referential equality"})," to detect updates and re-render efficiently."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Terminology (precise)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Mutation:"})," changing an existing object/array in place (same reference, different contents)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Immutability:"})," once created, a value is not changed; updates produce a new value."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Referential equality:"})," ",e.jsx(r.InlineCode,{children:"a === b"})," checks if two references point to the same object."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Structural sharing:"})," a new object reuses unchanged parts of the old structure (e.g., spreading and changing one field)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shallow copy:"})," copies only the top level (e.g., ",e.jsx(r.InlineCode,{children:"{ ...obj }"}),", ",e.jsx(r.InlineCode,{children:"[...arr]"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Deep copy:"})," recursively copies nested data (use sparingly; often unnecessary and expensive)."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Why immutability matters"}),e.jsxs(r.List,{children:[e.jsx("li",{children:"React decides to re-render based on identity changes. Mutating in place keeps the same identity → React may not re-render."}),e.jsxs("li",{children:["Pure optimizations (",e.jsx(r.InlineCode,{children:"React.memo"}),", dependency arrays, ",e.jsx(r.InlineCode,{children:"useMemo"}),") compare references; immutable updates keep these comparisons cheap."]}),e.jsx("li",{children:"Time-travel debugging, undo/redo, and predictable updates are simpler with immutable data."})]}),e.jsx(r.Pre,{children:`// ❌ Mutating in place (no new reference)
const [user, setUser] = React.useState({ name: "Ada", points: 0 });
function addPointBad() {
  user.points += 1;     // mutation
  setUser(user);        // same object reference → React may skip re-render
}

// ✅ Immutable update (new reference)
function addPointGood() {
  setUser(prev => ({ ...prev, points: prev.points + 1 }));
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Object update recipes"}),e.jsx(r.Pre,{children:`// Replace a field
setUser(prev => ({ ...prev, name: "Grace" }));

// Add/remove a field
setUser(prev => {
  const { temp, ...rest } = prev;     // remove 'temp'
  return { ...rest, nick: "g.hopper" }; // add 'nick'
});

// Update nested object (one level)
setState(prev => ({
  ...prev,
  profile: { ...prev.profile, bio: "Debugger pioneer" }
}));

// Deeply nested (consider normalizing or a reducer)
setState(prev => ({
  ...prev,
  company: {
    ...prev.company,
    address: { ...prev.company.address, city: "London" }
  }
}));`}),e.jsxs(r.Small,{children:["For deeply nested updates, consider ",e.jsx("b",{children:"normalizing"})," shape (store by ID) or using a reducer/Immer for ergonomics."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Array update recipes"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Mutation methods:"})," push, pop, shift, unshift, splice, sort, reverse."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Immutable alternatives:"})," concat, slice, map, filter, reduce, toSorted, toReversed, with."]})]}),e.jsx(r.Pre,{children:`const [todos, setTodos] = React.useState([
  { id: 1, text: "Read", done: false },
  { id: 2, text: "Code", done: false },
]);

// Add
setTodos(prev => [...prev, { id: 3, text: "Sleep", done: false }]);
// or: prev.concat(newItem)

// Remove by id
setTodos(prev => prev.filter(t => t.id !== 2));

// Update by id
setTodos(prev => prev.map(t => t.id === 1 ? { ...t, done: true } : t));

// Insert at index
setTodos(prev => {
  const next = prev.slice();
  next.splice(1, 0, { id: 9, text: "Snack", done: false });
  return next;
});

// Sort without mutating the original
setTodos(prev => [...prev].sort((a, b) => a.text.localeCompare(b.text)));
// Modern (if available): prev.toSorted((a, b) => a.text.localeCompare(b.text));

// Reverse without mutation
setTodos(prev => [...prev].reverse());
// Modern: prev.toReversed();

// Replace a single index (ECMAScript 2023 'with')
setTodos(prev => prev.with(0, { ...prev[0], done: true }));`}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"Array.sort"})," and ",e.jsx("b",{children:"Array.reverse"})," mutate in place. Copy first (or use ",e.jsx("b",{children:"toSorted"}),"/",e.jsx("b",{children:"toReversed"})," in modern runtimes)."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Maps, Sets, Dates (mutable types)"}),e.jsx(r.Pre,{children:`// Map/Set: create a new container to change contents
const [ids, setIds] = React.useState(() => new Set([1, 2]));

function addId(id) {
  setIds(prev => {
    const next = new Set(prev); // copy
    next.add(id);               // mutate the copy
    return next;                // new reference
  });
}

// Date: store timestamp (number) instead of mutating a Date object
setState(prev => ({ ...prev, lastSeen: Date.now() }));`}),e.jsx(r.Small,{children:"Avoid mutating objects created once and reused across renders. Store primitives or new copies to preserve identity."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Avoid deep cloning by default"}),e.jsxs(r.List,{children:[e.jsx("li",{children:"Deep clones are slow and unnecessary for most updates—only the changed paths need new objects."}),e.jsxs("li",{children:[e.jsx(r.InlineCode,{children:"JSON.parse(JSON.stringify(...))"})," drops functions, ",e.jsx(r.InlineCode,{children:"undefined"}),", Dates, Maps/Sets."]}),e.jsxs("li",{children:["Prefer ",e.jsx("b",{children:"structural sharing"})," (spread on each level being changed)."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Reducers or Immer (optional ergonomics)"}),e.jsx(r.Pre,{children:`// useReducer centralizes updates
function reducer(state, action) {
  switch (action.type) {
    case "toggle":
      return {
        ...state,
        items: state.items.map(x => x.id === action.id ? { ...x, done: !x.done } : x)
      };
    default:
      return state;
  }
}
const [state, dispatch] = React.useReducer(reducer, { items: [] });

// Immer (if installed): write "mutations", produce immutably
// import { produce } from "immer";
// setState(prev => produce(prev, draft => { draft.count += 1; }));`}),e.jsx(r.Small,{children:"Immer handles structural sharing automatically; use it for complex nested updates or reducers."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Effects, memo, and referential equality"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Passing ",e.jsx("b",{children:"new"})," objects/arrays every render makes memoized children re-render. Memoize derived props with ",e.jsx(r.InlineCode,{children:"useMemo"})," when needed."]}),e.jsx("li",{children:"Dependency arrays compare references; ensure stable references for values that should not retrigger effects."})]}),e.jsx(r.Pre,{children:`const columns = React.useMemo(() => [{ key: "name" }, { key: "done" }], []); // stable
// <Table columns={columns} />`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Debugging accidental mutations"}),e.jsxs(r.List,{children:[e.jsx("li",{children:"Watch for state updates that do nothing—often due to mutating then setting the same reference."}),e.jsxs("li",{children:["Freeze development data (",e.jsx(r.InlineCode,{children:"Object.freeze"}),") to catch mutations early (dev-only)."]}),e.jsxs("li",{children:["Check array helpers that mutate (",e.jsx(r.InlineCode,{children:"sort"}),", ",e.jsx(r.InlineCode,{children:"reverse"}),", ",e.jsx(r.InlineCode,{children:"splice"}),")."]})]}),e.jsx(r.Pre,{children:`// Dev helper to catch mutations (throwing early)
const dev = process.env.NODE_ENV !== "production";
const initial = dev ? Object.freeze({ name: "Ada" }) : { name: "Ada" };`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Common pitfalls"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Calling ",e.jsx(r.InlineCode,{children:"push"}),"/",e.jsx(r.InlineCode,{children:"sort"}),"/",e.jsx(r.InlineCode,{children:"reverse"})," directly on state arrays."]}),e.jsx("li",{children:"Mutating nested objects without creating new parents, leading to missed re-renders."}),e.jsx("li",{children:"Storing both raw and derived copies in state (drift). Derive instead."}),e.jsx("li",{children:"Deep cloning everything for “safety” (slow); prefer targeted shallow copies on changed paths."})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do / Don’t"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," create new objects/arrays for updates; use spread or helpers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," copy only the levels you change (structural sharing)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," memoize derived props passed to memoized children."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mutate in place and then call the setter with the same reference."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," sort/reverse arrays without copying first."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," deep clone by default; it’s slow and often unnecessary."]})]})]}),e.jsx(r.Callout,{children:"Summary: immutable updates keep React predictable and performant. Update by returning new objects/arrays, copy only what’s changed, avoid mutating helpers, and rely on structural sharing and memoization when needed."})]});export{n as default};
