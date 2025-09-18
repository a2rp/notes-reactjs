import{j as e}from"./index-wTxrXa3i.js";import{S as t}from"./styled-Cquib5Xy.js";const i=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Jotai (Atom-based State Management)"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"Jotai"})," is a minimal state management library for React built around small, composable units of state called ",e.jsx("b",{children:"atoms"}),". Components subscribe to only the atoms they use, enabling fine-grained updates without re-rendering whole subtrees."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary (precise definitions)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Atom:"})," the smallest unit of state in Jotai. An atom can be ",e.jsx("em",{children:"primitive"}),"(holds a value) or ",e.jsx("em",{children:"derived"})," (computes from other atoms)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Primitive atom:"})," an atom with an initial value (e.g., ",e.jsx(t.InlineCode,{children:"atom(0)"}),"). You read/write it directly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Derived atom (read-only):"})," an atom defined by a function of other atoms (via ",e.jsx(t.InlineCode,{children:"get"}),"). It has no independent storage."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Writable derived atom:"})," a derived atom that also defines a ",e.jsx("em",{children:"write"})," function (via ",e.jsx(t.InlineCode,{children:"(get, set)"}),") to update source atoms."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Provider:"})," React context provider that creates an isolated Jotai ",e.jsx("em",{children:"store"}),". Components inside read/write atoms from that store."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Store:"})," the internal registry of atom states for a Provider. You can create multiple stores to isolate state between parts of your app or tests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Subscription:"})," when a component reads an atom via a hook, it subscribes to it and re-renders only when that atom (or what it depends on) changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Selector:"})," a read view of an atom's value (e.g., via ",e.jsx(t.InlineCode,{children:"selectAtom"}),") to limit re-renders to the selected slice."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Persistence:"})," saving atom state to storage (e.g., localStorage) via helpers like",e.jsx(t.InlineCode,{children:"atomWithStorage"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Atom family:"})," a function that returns atoms keyed by a parameter (useful for lists or per-id state)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Split atom:"})," turn an array atom into individual item atoms, enabling granular updates."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Quick start: primitive, derived, and writable derived atoms"}),e.jsx(t.Pre,{children:`// atoms.ts / atoms.js
import { atom } from "jotai";

// 1) Primitive atom (holds its own value)
export const countAtom = atom(0);

// 2) Derived read-only atom (computes from others)
export const doubleAtom = atom((get) => get(countAtom) * 2);

// 3) Writable derived atom (computes + updates source atoms)
export const incAtom = atom(null, (get, set) => set(countAtom, get(countAtom) + 1));
export const decAtom = atom(null, (get, set) => set(countAtom, get(countAtom) - 1));`}),e.jsx(t.Pre,{children:`// Counter.jsx
import React from "react";
import { useAtom, useSetAtom } from "jotai";
import { countAtom, doubleAtom, incAtom, decAtom } from "./atoms";

export default function Counter() {
  const [count, setCount] = useAtom(countAtom);   // subscribe to countAtom
  const [double] = useAtom(doubleAtom);           // derived, read-only
  const inc = useSetAtom(incAtom);                // stable write-only hooks
  const dec = useSetAtom(decAtom);

  return (
    <div>
      <p>count: {count} | double: {double}</p>
      <button onClick={dec}>-</button>
      <button onClick={inc}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Key idea:"})," components re-render only when the atoms they read change (fine-grained updates)."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Provider & store isolation"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Wrap your app (or a subtree) with ",e.jsx(t.InlineCode,{children:"<Provider>"})," ","to create an isolated store. Each Provider has its own atom values."]}),e.jsx("li",{children:"Use multiple Providers to render independent copies (e.g., side-by-side sandboxes or tests)."})]}),e.jsx(t.Pre,{children:`import React from "react";
import { Provider } from "jotai";
import Counter from "./Counter";

export default function App() {
  return (
    <>
      <Provider><Counter /></Provider>
      <Provider><Counter /></Provider>
      {/* These two counters do NOT share state */}
    </>
  );
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Async atoms & Suspense"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["If a derived atom's read function returns a ",e.jsx("em",{children:"Promise"}),", React can suspend while it resolves (use a ",e.jsx(t.InlineCode,{children:"<Suspense>"})," fallback)."]}),e.jsxs("li",{children:["For explicit status handling (idle/loading/error), use ",e.jsx(t.InlineCode,{children:"loadable"})," helper."]})]}),e.jsx(t.Pre,{children:`// asyncAtoms.js
import { atom } from "jotai";

// Suspense-friendly async derived atom
export const userAtom = atom(async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  if (!res.ok) throw new Error("Failed to load user");
  return res.json();
});`}),e.jsx(t.Pre,{children:`// UserCard.jsx
import React, { Suspense } from "react";
import { useAtom } from "jotai";
import { userAtom } from "./asyncAtoms";

export default function UserCard() {
  const [user] = useAtom(userAtom); // will suspend while loading
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}

// usage
// <Suspense fallback={<div>Loading…</div>}><UserCard /></Suspense>`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Selectors: subscribe to just a slice"}),e.jsx(t.List,{children:e.jsxs("li",{children:["Use ",e.jsx(t.InlineCode,{children:"selectAtom(baseAtom, selector)"})," to derive a view that only re-renders when the selected slice changes."]})}),e.jsx(t.Pre,{children:`import { atom } from "jotai";
import { selectAtom } from "jotai/utils";

export const cartAtom = atom([{ id: 1, price: 100 }, { id: 2, price: 250 }]);

export const totalAtom = selectAtom(cartAtom, (items) =>
  items.reduce((sum, it) => sum + it.price, 0)
);`}),e.jsx(t.Pre,{children:`import { useAtom } from "jotai";
import { totalAtom } from "./cart";

function CartTotal() {
  const [total] = useAtom(totalAtom); // re-renders only when total changes
  return <b>Total: ₹{total}</b>;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Persistence (localStorage)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx(t.InlineCode,{children:"atomWithStorage(key, initial)"})," syncs an atom to",e.jsx("em",{children:"localStorage"})," by default."]}),e.jsxs("li",{children:["It's JSON-serialized. Guard for SSR (no ",e.jsx(t.InlineCode,{children:"window"}),")."]})]}),e.jsx(t.Pre,{children:`import { atomWithStorage } from "jotai/utils";

export const themeAtom = atomWithStorage("theme", "dark");

// Usage:
import { useAtom } from "jotai";
import { themeAtom } from "./theme";

function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Theme: {theme}
    </button>
  );
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Atom family & splitAtom"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Atom family:"})," generate atoms on demand keyed by a parameter (e.g., item id)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"splitAtom:"})," produce one atom per item from an array atom to isolate re-renders."]})]}),e.jsx(t.Pre,{children:`import { atom } from "jotai";
import { atomFamily, splitAtom } from "jotai/utils";

// Family: per-id counter
export const counterFamily = atomFamily((id) => atom(0));

// Split: array -> item atoms
export const todosAtom = atom([
  { id: 1, text: "Learn Jotai", done: false },
  { id: 2, text: "Build something", done: true },
]);

export const todoAtomsAtom = splitAtom(todosAtom); // returns atom of atoms`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Patterns, Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep atoms small and focused (one responsibility)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer derived atoms for computed values instead of recalculating in components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," colocate atoms near features; export them via an index for discoverability."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mutate objects in place; update immutably so Jotai can detect changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," overuse a single “global” atom; many small atoms scale better."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Jotai vs others (when to choose)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Context:"})," simple but coarse; any change triggers re-renders below the Provider. Jotai re-renders only subscribers to changed atoms."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Redux Toolkit:"})," batteries-included global store with actions/reducers/devtools/middleware. Choose when you need strict flows, time-travel, or enterprise patterns. Jotai is lighter."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Zustand:"})," minimal store with selectors and immer-friendly updates; great for centralized stores. Jotai encourages many small atoms and composition."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Recoil:"})," also atom/selector-based; Jotai's core API is smaller and closer to React hooks ergonomics."]}),e.jsxs("li",{children:[e.jsx("b",{children:"XState:"})," statecharts for complex flows; choose when you need explicit finite states and transitions."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Testing"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Wrap components under test with a Jotai ",e.jsx(t.InlineCode,{children:"Provider"}),"."]}),e.jsx("li",{children:"Create separate stores per test for isolation; initialize atom values as needed."}),e.jsx("li",{children:"Test behavior via rendered output rather than internal atom details."})]})]}),e.jsxs(t.Callout,{children:[e.jsx("b",{children:"Summary:"})," Jotai manages state via small atoms and fine-grained subscriptions. Start with primitive atoms, derive computed state declaratively, persist when needed, and keep atoms focused. Reach for Jotai when you want lightweight, composable state without reducers or boilerplate."]})]});export{i as default};
