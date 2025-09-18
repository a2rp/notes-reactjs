import{j as e}from"./index-CEhT6f_w.js";import{S as t}from"./styled-D1IQzh9o.js";const r=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Context vs Store (State Management)"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"Context"})," fixes ",e.jsx("i",{children:"prop drilling"})," by letting you read a value anywhere in the tree. A ",e.jsx("b",{children:"store"})," (Redux Toolkit, Zustand, Jotai, Recoil, XState) manages ",e.jsx("i",{children:"application state"}),"with tools for updates, derivations, performance, and debugging. Use Context for ",e.jsx("em",{children:"sharing"}),"; use a Store for ",e.jsx("em",{children:"managing"})," complex, frequently-changing state."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Core Definitions"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"State:"})," data that changes over time and drives UI rendering."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prop drilling:"})," passing props through many intermediate components that don't use them."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Context:"})," a React feature to make a value available to any descendant without passing props."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Provider:"})," the component that supplies a context ",e.jsx("em",{children:"value"})," to its subtree."]}),e.jsxs("li",{children:[e.jsxs("b",{children:["Consumer / ",e.jsx(t.InlineCode,{children:"useContext"}),":"]})," code that reads the current context value."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Store:"})," a centralized state container with APIs to read, update, and derive state efficiently."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Action:"})," a description of a change (e.g., ",e.jsx(t.InlineCode,{children:'{ type: "cart/add", payload: item }'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reducer:"})," a pure function computing next state from current state + action."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Selector:"})," a function that reads/derives a ",e.jsx("em",{children:"slice"})," of state (helps performance)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Immutability:"})," update by creating new objects/arrays instead of mutating (enables change detection)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Derivation:"})," computed values from base state (totals, filtered lists)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Effects/Middleware:"})," logic that runs on updates (logging, persistence, async, devtools)."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"What Context Solves (and What It Doesn't)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Solves:"})," sharing stable values across the tree: theme, locale, current user, feature flags, router."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Doesn't solve:"})," performance for fast-changing, large state; debugging; time-travel; middleware; caching."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Re-render note:"})," when a Provider's ",e.jsx("em",{children:"value"})," changes, ",e.jsx("u",{children:"all"})," descendants that read the context re-render."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"When to Choose a Store"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Frequent updates (typing, drag, live filters) or large trees reading small slices."}),e.jsx("li",{children:"Need selectors, devtools, middleware, persistence, SSR hydration, undo/redo."}),e.jsx("li",{children:"Caching server data (see RTK Query) or graph-like dependencies (Recoil/Jotai atoms)."}),e.jsxs("li",{children:["Complex workflows needing explicit ",e.jsx("em",{children:"states"})," and ",e.jsx("em",{children:"events"})," (XState finite state machines)."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example: Context for Theme (stable value)"}),e.jsx(t.Pre,{children:`import React from "react";

const ThemeContext = React.createContext("light"); // default

export function ThemeProvider({ initial = "light", children }) {
  const [mode, setMode] = React.useState(initial);
  const value = React.useMemo(() => ({ mode, setMode }), [mode]); // stable identity
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

// Usage:
// const { mode, setMode } = useTheme(); setMode(prev => (prev === "light" ? "dark" : "light"));
`}),e.jsxs(t.Small,{children:["Context shines when the value is ",e.jsx("i",{children:"read often"})," but ",e.jsx("i",{children:"changes infrequently"}),", and the entire subtree should react to changes (theme, locale)."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example: Context + Reducer (split state/dispatch)"}),e.jsx(t.Pre,{children:`import React from "react";

const StateCtx = React.createContext(null);
const DispatchCtx = React.createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, items: [...state.items, action.item] };
    case "remove":
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, { items: [] });
  // stable references so consumers don't rerender unnecessarily
  const stateValue = React.useMemo(() => state, [state]);
  return (
    <StateCtx.Provider value={stateValue}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </StateCtx.Provider>
  );
}

export function useCart() {
  const s = React.useContext(StateCtx);
  if (s === null) throw new Error("useCart must be inside CartProvider");
  return s;
}
export function useCartDispatch() {
  const d = React.useContext(DispatchCtx);
  if (!d) throw new Error("useCartDispatch must be inside CartProvider");
  return d;
}

// Usage:
// const { items } = useCart();
// const dispatch = useCartDispatch();
// dispatch({ type: "add", item });
`}),e.jsxs(t.Small,{children:["Splitting ",e.jsx("b",{children:"state"})," and ",e.jsx("b",{children:"dispatch"})," contexts reduces re-renders: components that only dispatch won't re-render when state changes."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Context Pitfalls"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Putting large, fast-changing objects in a single context → causes widespread re-renders."}),e.jsxs("li",{children:["Computing heavy ",e.jsx("em",{children:"derived values"})," inside the Provider value → recalculates for every change."]}),e.jsx("li",{children:"Using one “mega context” for everything → hard to maintain; split by concern."}),e.jsxs("li",{children:["Needing granular subscriptions/selectors → plain Context can't subscribe to ",e.jsx("em",{children:"parts"})," of a value."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"What a Store Adds (Quick Tour)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Redux Toolkit (RTK):"})," opinionated Redux with ",e.jsx("i",{children:"slices"}),", immutable updates, middleware, DevTools, and RTK Query for server cache."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Zustand:"})," tiny store with ",e.jsx("i",{children:"selectors"}),", ",e.jsx("i",{children:"shallow"})," comparison, minimal boilerplate, and easy persistence."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Jotai:"})," state as small ",e.jsx("i",{children:"atoms"}),"; components subscribe to only the atoms they use (fine-grained updates)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Recoil:"})," atoms + selectors with a dependency graph; good for complex derivations across branches."]}),e.jsxs("li",{children:[e.jsx("b",{children:"XState:"})," finite state machines/statecharts; explicit ",e.jsx("i",{children:"states"}),", ",e.jsx("i",{children:"events"}),", and ",e.jsx("i",{children:"transitions"})," for complex flows."]}),e.jsxs("li",{children:[e.jsx("b",{children:"RTK Query:"})," data fetching/cache layer; auto deduping, invalidation, retries (pairs well with RTK stores)."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Decision Guide"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use Context"})," for theme, locale, user, feature flags, router objects, and other low-frequency shared values."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use a Store"})," when many components read small slices, updates are frequent, or you need selectors/devtools/middleware."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mix"}),": Context can provide the ",e.jsx("i",{children:"store instance"})," (e.g., RTK store) while components subscribe via library hooks."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," memoize Provider values with ",e.jsx(t.InlineCode,{children:"useMemo"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," split contexts by concern or split state/dispatch to reduce re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," compute heavy derivations in consumers or memoize them."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," use Context as a ",e.jsx("i",{children:"global event bus"})," or for extremely dynamic state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," create a single app-wide “god context.”"]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Mini Peeks (Store Flavors)"}),e.jsx(t.Pre,{children:`// Redux Toolkit (slice)
import { createSlice, configureStore } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    add: (s, a) => { s.items.push(a.payload); }, // Immer lets us "mutate" immutably
    remove: (s, a) => { s.items = s.items.filter(i => i.id !== a.payload); },
  },
});
export const { add, remove } = cartSlice.actions;
export const store = configureStore({ reducer: { cart: cartSlice.reducer } });

// Zustand (selector-based)
import { create } from "zustand";
export const useCartStore = create(set => ({
  items: [],
  add: (item) => set(s => ({ items: [...s.items, item] })),
  remove: (id) => set(s => ({ items: s.items.filter(i => i.id !== id) })),
}));
// const items = useCartStore(s => s.items);

// Jotai (atoms)
import { atom, useAtom } from "jotai";
export const itemsAtom = atom([]);
export function useItems() {
  const [items, setItems] = useAtom(itemsAtom);
  return { items, add: (it) => setItems(a => [...a, it]) };
}
`}),e.jsx(t.Small,{children:"These libraries minimize re-renders by subscribing to slices (selectors/atoms) instead of a whole context value."})]}),e.jsxs(t.Callout,{children:["Summary: Context is for ",e.jsx("b",{children:"sharing"})," values across the tree; stores are for ",e.jsx("b",{children:"managing"})," complex, frequently-changing state with performance and tooling. Start with Context for simple needs; move to a store as complexity and update frequency grow."]})]});export{r as default};
