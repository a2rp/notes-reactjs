import{j as e}from"./index-BrPsnAZM.js";import{S as t}from"./styled-IrCRHbBz.js";const o=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Recoil (State Management)"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"Recoil"})," is a lightweight state-management library for React. It models app state as small, composable units called ",e.jsx("b",{children:"atoms"})," and computes derived values with ",e.jsx("b",{children:"selectors"}),". It integrates with React via hooks and a top-level ",e.jsx(t.InlineCode,{children:"<RecoilRoot />"}),"."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Why Recoil?"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Simple mental model:"})," atoms are pieces of state; selectors are pure functions derived from atoms."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Granular updates:"})," only components that use a specific atom/selector re-render when it changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Async built-in:"})," selectors can be ",e.jsx("i",{children:"async"})," and work with Suspense or loadables."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Co-located and scalable:"})," define atoms/selectors near features, grow as your app grows."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary (Plain English)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Global state:"})," data shared by multiple components (e.g., auth user, theme, cart)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Local state:"})," data owned by one component via ",e.jsx(t.InlineCode,{children:"useState"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Atom:"})," a named, subscribable unit of state. Components read/write atoms."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Selector:"})," a pure function that derives state from atoms/selectors. Can be async."]}),e.jsxs("li",{children:[e.jsx("b",{children:"RecoilRoot:"})," React provider that enables Recoil in your component tree."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hooks:"})," ",e.jsx(t.InlineCode,{children:"useRecoilState"}),", ",e.jsx(t.InlineCode,{children:"useRecoilValue"}),", ",e.jsx(t.InlineCode,{children:"useSetRecoilState"}),", ",e.jsx(t.InlineCode,{children:"useResetRecoilState"}),", ",e.jsx(t.InlineCode,{children:"useRecoilValueLoadable"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Loadable:"})," an object wrapper for async selector state: ",e.jsx("i",{children:"hasValue / loading / hasError"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Families:"})," ",e.jsx(t.InlineCode,{children:"atomFamily"})," / ",e.jsx(t.InlineCode,{children:"selectorFamily"})," generate parameterized atoms/selectors (e.g., per id)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Atom effects:"})," lifecycle hooks for an atom (initialize, persist, react to changes)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transaction:"})," an atomic read/write batch via ",e.jsx(t.InlineCode,{children:"useRecoilCallback"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Derived state:"})," data computed from other state (e.g., totals, filters)."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Install & Setup"}),e.jsx(t.Pre,{children:`# Install
npm i recoil

// index.jsx
import { RecoilRoot } from "recoil";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);`}),e.jsxs(t.Small,{children:["All Recoil hooks must be used under ",e.jsx(t.InlineCode,{children:"<RecoilRoot/>"}),"."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Atoms & Selectors (First Example)"}),e.jsx(t.Pre,{children:`// state/counter.js
import { atom, selector } from "recoil";

export const counterState = atom({
  key: "counterState",       // unique key in the whole app
  default: 0,                // initial value
});

export const doubleCountState = selector({
  key: "doubleCountState",
  get: ({ get }) => get(counterState) * 2,  // derived state
});`}),e.jsx(t.Pre,{children:`// Counter.jsx
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { counterState, doubleCountState } from "./state/counter";

export default function Counter() {
  const [count, setCount] = useRecoilState(counterState);
  const double = useRecoilValue(doubleCountState);

  return (
    <div>
      <p>Count: {count} | Double: {double}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={() => setCount(c => c - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Atom"})," is the source of truth. ",e.jsx("b",{children:"Selector"})," derives values. Only components using these nodes re-render when they change."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Reading vs Writing Hooks"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx(t.InlineCode,{children:"useRecoilValue(node)"})," → read only."]}),e.jsxs("li",{children:[e.jsx(t.InlineCode,{children:"useSetRecoilState(atom)"})," → write only."]}),e.jsxs("li",{children:[e.jsx(t.InlineCode,{children:"useRecoilState(atom)"})," → read + write tuple."]}),e.jsxs("li",{children:[e.jsx(t.InlineCode,{children:"useResetRecoilState(atom)"})," → reset to default."]})]}),e.jsx(t.Pre,{children:`function ReadWriteExample() {
  const value = useRecoilValue(counterState);
  const set = useSetRecoilState(counterState);
  const reset = useResetRecoilState(counterState);
  return (
    <>
      <p>Value: {value}</p>
      <button onClick={() => set(v => v + 10)}>+10</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Async Selectors"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"What:"})," a selector whose ",e.jsx(t.InlineCode,{children:"get"})," returns a Promise."]}),e.jsxs("li",{children:[e.jsx("b",{children:"How it renders:"})," with Suspense → fallback UI during loading; or use a ",e.jsx("b",{children:"Loadable"})," to avoid Suspense."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache-aware:"})," caches by dependencies; re-fetches when deps change or cache invalidates."]})]}),e.jsx(t.Pre,{children:`// state/user.js
import { atom, selector } from "recoil";

export const userIdState = atom({
  key: "userIdState",
  default: 1,
});

export const userQuery = selector({
  key: "userQuery",
  get: async ({ get }) => {
    const id = get(userIdState);
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
    if (!res.ok) throw new Error("Network error");
    return res.json();
  },
});`}),e.jsx(t.Pre,{children:`// Using Suspense
function UserCard() {
  const user = useRecoilValue(userQuery); // Suspends while loading
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}

// App subtree
<Suspense fallback={<div>Loading user…</div>}>
  <UserCard />
</Suspense>`}),e.jsx(t.Pre,{children:`// Without Suspense: Loadable API
import { useRecoilValueLoadable } from "recoil";

function UserCardNoSuspense() {
  const loadable = useRecoilValueLoadable(userQuery);
  if (loadable.state === "loading") return <p>Loading…</p>;
  if (loadable.state === "hasError") return <p>Error: {String(loadable.contents)}</p>;
  return <pre>{JSON.stringify(loadable.contents, null, 2)}</pre>;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Families (Parameterized State)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"atomFamily:"})," creates a set of atoms keyed by a parameter (e.g., ",e.jsx("i",{children:"todo by id"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"selectorFamily:"})," creates parameterized selectors that derive per-key values."]})]}),e.jsx(t.Pre,{children:`import { atomFamily, selectorFamily, useRecoilState } from "recoil";

const todoState = atomFamily({
  key: "todoState",
  default: (id) => ({ id, title: "", done: false }),
});

const todoTitleLen = selectorFamily({
  key: "todoTitleLen",
  get: (id) => ({ get }) => get(todoState(id)).title.length,
});

function TodoItem({ id }) {
  const [todo, setTodo] = useRecoilState(todoState(id));
  return (
    <div>
      <input
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <span>Length: <b>{useRecoilValue(todoTitleLen(id))}</b></span>
    </div>
  );
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Persistence (localStorage) via Atom Effects"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Atom effect:"})," a function to initialize and subscribe to an atom's lifecycle."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Common use:"})," hydrate from storage and persist on change."]})]}),e.jsx(t.Pre,{children:`import { atom } from "recoil";

const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  if (typeof window !== "undefined") {
    const saved = window.localStorage.getItem(key);
    if (saved != null) setSelf(JSON.parse(saved));
    onSet((newValue) => {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    });
  }
};

export const themeState = atom({
  key: "themeState",
  default: "dark",
  effects: [localStorageEffect("themeState")],
});`}),e.jsxs(t.Small,{children:["Effects run once on mount for each atom instance. Avoid side-effects inside selectors; use ",e.jsx("b",{children:"atom effects"})," instead."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Transactions (Advanced)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"useRecoilCallback:"})," read/write multiple atoms/selectors in a single batched callback."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," keep complex updates consistent and avoid intermediate renders."]})]}),e.jsx(t.Pre,{children:`import { useRecoilCallback } from "recoil";
import { counterState } from "./state/counter";

function BulkActions() {
  const addTen = useRecoilCallback(({ set, snapshot }) => async () => {
    const current = await snapshot.getPromise(counterState);
    set(counterState, current + 10);
  }, []);
  return <button onClick={addTen}>+10 (transaction)</button>;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," give every atom/selector a globally unique ",e.jsx(t.InlineCode,{children:"key"})," (prefix by feature)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep selectors ",e.jsx("i",{children:"pure"})," (no side-effects). Use async ",e.jsx(t.InlineCode,{children:"get"})," for fetching."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," colocate atoms/selectors with the feature using them (modular design)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mutate objects in place; create new objects (immutability helps predictable updates)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," over-centralize—Recoil is great for ",e.jsx("i",{children:"shared"})," state; use ",e.jsx(t.InlineCode,{children:"useState"})," for truly local concerns."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Troubleshooting"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"“Invalid hook call / missing RecoilRoot”:"})," Wrap your tree with ",e.jsx(t.InlineCode,{children:"<RecoilRoot/>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Duplicate key error:"})," Keys must be unique. Use clear feature-based prefixes (e.g., ",e.jsx("i",{children:"cart/…"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Infinite loops:"})," Avoid setting an atom within a selector computed from that atom."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Async stall:"})," Handle loading/errors via Suspense or ",e.jsx(t.InlineCode,{children:"useRecoilValueLoadable"}),"."]})]})]}),e.jsxs(t.Callout,{children:["Summary: Start with atoms for sources of truth, compute with selectors, initialize under",e.jsx(t.InlineCode,{children:"  <RecoilRoot/> "}),", and persist with atom effects when needed. Prefer small, focused atoms and pure selectors for a clear and scalable model."]})]});export{o as default};
