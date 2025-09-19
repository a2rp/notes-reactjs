import{j as e}from"./index-DUO2rjrc.js";import{S as s}from"./styled-DrjUGoXE.js";const r=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Zustand (Global State Management)"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Zustand"}),' (German for "state") is a tiny, unopinionated state-management library for React. It exposes a ',e.jsx("b",{children:"store"})," (an object that holds your global state and actions) and a hook to read/select parts of that state. It avoids boilerplate and re-renders only the components that select changed data."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why & When to use Zustand"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Simple API:"})," one ",e.jsx(s.InlineCode,{children:"create"})," call defines state + actions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Selective subscriptions:"})," components subscribe to ",e.jsx("i",{children:"just"})," what they need via selectors."]}),e.jsxs("li",{children:[e.jsx("b",{children:"No Provider needed:"})," you can import the store hook anywhere without wrapping trees."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scales up:"})," add slices, middleware (devtools, persistence, immer) as your app grows."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use it when"})," Context gets chatty/complex, or you want a lighter alternative to Redux."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Core Concepts & Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Store:"})," the source of truth created by Zustand; it holds state and actions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Action:"})," a function in the store that updates state (usually calls ",e.jsx(s.InlineCode,{children:"set"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Selector:"})," a function that picks a ",e.jsx("i",{children:"slice"})," of state to subscribe to, e.g. ",e.jsx(s.InlineCode,{children:"(s) => s.count"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shallow compare:"})," an equality check that compares top-level fields of an object to reduce re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Middleware:"})," pluggable features (e.g., ",e.jsx(s.InlineCode,{children:"persist"}),", ",e.jsx(s.InlineCode,{children:"devtools"}),", ",e.jsx(s.InlineCode,{children:"immer"}),", ",e.jsx(s.InlineCode,{children:"subscribeWithSelector"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Slice:"})," a modular piece of store state + actions; you can merge multiple slices."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Vanilla store:"})," a store that works outside React (useful for non-React code/tests); you can bind it to React later."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Installation"}),e.jsx(s.Pre,{children:`# with npm
npm i zustand

# with pnpm / yarn
pnpm add zustand
yarn add zustand`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Smallest Possible Store"}),e.jsx(s.Pre,{children:`// store/counter.js
import { create } from "zustand";

export const useCounterStore = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
  dec: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Component usage:
function Counter() {
  const count = useCounterStore((s) => s.count);        // selector
  const inc = useCounterStore((s) => s.inc);
  return <button onClick={inc}>Count: {count}</button>;
}`}),e.jsxs(s.Small,{children:["Only components that use ",e.jsx(s.InlineCode,{children:"count"})," re-render when",e.jsx(s.InlineCode,{children:"count"})," changes."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Select Multiple Fields Efficiently"}),e.jsx(s.List,{children:e.jsxs("li",{children:["Selectors returning objects create a new object on each render; use ",e.jsx("b",{children:"shallow"})," compare to avoid extra renders."]})}),e.jsx(s.Pre,{children:`import { useCounterStore } from "./store/counter";
import { shallow } from "zustand/shallow";

function Stats() {
  const { count, hasMore } = useCounterStore(
    (s) => ({ count: s.count, hasMore: s.count < 10 }),
    shallow
  );
  return <div>{count} {hasMore ? "(room to grow)" : "(maxed)"}</div>;
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Async Actions (Fetching data)"}),e.jsx(s.Pre,{children:`// store/todos.js
import { create } from "zustand";

export const useTodosStore = create((set, get) => ({
  todos: [],
  status: "idle", // "idle" | "loading" | "error" | "success"
  error: null,

  fetchTodos: async () => {
    set({ status: "loading", error: null });
    try {
      const res = await fetch("/api/todos");
      const data = await res.json();
      set({ todos: data, status: "success" });
    } catch (err) {
      set({ error: String(err), status: "error" });
    }
  },
}));`}),e.jsxs(s.Small,{children:["Actions can be synchronous or asynchronous. You can read current state via ",e.jsx(s.InlineCode,{children:"get()"}),"."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Organizing with Slices"}),e.jsx(s.Pre,{children:`// store/index.js
import { create } from "zustand";

// slice creators receive (set, get, api)
const createCounterSlice = (set, get) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
});

const createUserSlice = (set, get) => ({
  user: null,
  setUser: (u) => set({ user: u }),
});

export const useStore = create((...args) => ({
  ...createCounterSlice(...args),
  ...createUserSlice(...args),
}));`}),e.jsx(s.Small,{children:"Slices keep logic focused and scalable. Add more slices as features grow."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Middleware: Devtools, Persistence, Immer"}),e.jsx(s.Pre,{children:`// store/app.js
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer"; // optional

export const useAppStore = create(
  devtools(
    persist(
      immer((set, get) => ({
        theme: "dark",
        user: null,
        setTheme: (t) => set({ theme: t }),
        updateUserName: (name) =>
          set((s) => { s.user ??= {}; s.user.name = name; }), // with immer you can "mutate"
      })),
      {
        name: "app-storage",
        storage: createJSONStorage(() => localStorage),
        // partialize: (s) => ({ theme: s.theme }), // persist only some fields
      }
    )
  )
);`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"devtools:"})," inspect actions/state in Redux DevTools. ",e.jsx("b",{children:"persist:"})," save to storage.",e.jsx("b",{children:"immer:"}),' write immutable updates using "mutating" syntax.']})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Vanilla Store (Outside React)"}),e.jsx(s.Pre,{children:`// store/vanilla.js
import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";

export const counterStore = createStore((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}));

// Bind vanilla store to a React hook:
export const useCounter = useStore(counterStore);`}),e.jsx(s.Small,{children:"Useful for tests, non-React code, or integrating with other frameworks."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Patterns & Best Practices"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Keep actions in the store:"})," define update logic once; reuse everywhere."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use fine-grained selectors:"})," subscribe to the smallest slice you need to minimize re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memoize derived values in selectors:"})," compute simple derived data inline, but for heavy work, memoize in the store or components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shallow compare object selections:"})," use ",e.jsx(s.InlineCode,{children:"shallow"})," when selecting multiple fields."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Persist intentionally:"})," whitelist fields via ",e.jsx(s.InlineCode,{children:"partialize"}),"; handle migrations when schema changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Testing:"})," import the store, call ",e.jsx(s.InlineCode,{children:"setState"}),"/",e.jsx(s.InlineCode,{children:"getState"}),", and assert outputs. For React behavior, render a small component using the hook."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common Pitfalls (and fixes)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Selecting the whole state:"})," causes frequent re-renders. ",e.jsx("i",{children:"Fix:"})," select only needed fields."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Returning new objects each render:"})," use ",e.jsx(s.InlineCode,{children:"shallow"})," or split into multiple selectors."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Persisting everything by default:"})," can bloat storage. ",e.jsx("i",{children:"Fix:"})," persist only what you need."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SSR hydration mismatch:"})," when using persistence. ",e.jsx("i",{children:"Fix:"})," gate rendering until hydration finishes or load initial state carefully."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Overusing global state:"})," keep local UI state in components; lift to global only when shared or cross-page."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Context vs Zustand vs Redux Toolkit (Quick View)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Context:"})," great for static-ish values; not optimized for high-frequency updates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Zustand:"})," minimal API, selective subscriptions, easy to scale with middleware/slices."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Redux Toolkit:"})," batteries-included patterns, strong tooling, more structure/boilerplate than Zustand."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"set:"})," Zustand’s function to update state; can take an object or recipe function (",e.jsxs(s.InlineCode,{children:["(s) => (","...","))"]}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"get:"})," reads current state inside actions (",e.jsx(s.InlineCode,{children:"get().user"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"subscribe:"})," low-level API to listen for state changes (useful outside components)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"derived state:"})," values computed from existing state, not stored independently."]}),e.jsxs("li",{children:[e.jsx("b",{children:"optimistic update:"})," update UI first, reconcile with server response later."]})]})]}),e.jsxs(s.Callout,{children:[e.jsx("b",{children:"Summary:"})," Zustand is a lightweight, pragmatic way to manage global state. Start small (single store + actions), select narrowly for performance, and add middleware (devtools, persist, immer) as needed. Use slices to scale and keep domain logic clean."]})]});export{r as default};
