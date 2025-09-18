import{j as e}from"./index-UhLb6G-I.js";import{S as t}from"./styled-r13ExFbq.js";const r=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"useSyncExternalStore"}),e.jsxs(t.Lead,{children:[e.jsx(t.InlineCode,{children:"useSyncExternalStore"})," connects React to an ",e.jsx("b",{children:"external store"}),"(anything that lives outside React: singleton state, browser APIs, Redux/Zustand stores, WebSocket caches). It provides ",e.jsx("b",{children:"concurrent-safe"})," subscriptions and snapshot reads to avoid tearing."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Signature & terminology"}),e.jsx(t.Pre,{children:`const value = useSyncExternalStore(
  subscribe,          // (listener) => unsubscribe
  getSnapshot,        // () => current value (client)
  getServerSnapshot?  // () => value for SSR hydration (optional)
);`}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"subscribe(listener)"}),": registers a callback and returns an ",e.jsx("em",{children:"unsubscribe"})," function."]}),e.jsxs("li",{children:[e.jsx("b",{children:"getSnapshot()"}),": returns the store’s current value. React uses ",e.jsx(t.InlineCode,{children:"Object.is"})," to decide re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"getServerSnapshot()"}),": value used during SSR so hydration matches the client’s first snapshot."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tearing"}),": different components rendering from different store versions; this hook prevents it."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Minimal external store (vanilla JS)"}),e.jsx(t.Pre,{children:`// counterStore.js (outside React)
const listeners = new Set();
let state = { count: 0 };

export const counterStore = {
  getState: () => state,
  setState(patch) {
    state = { ...state, ...patch }; // immutable update
    listeners.forEach(l => l());
  },
  subscribe(l) {
    listeners.add(l);
    return () => listeners.delete(l);
  }
};

// Component using the store
import { useSyncExternalStore } from "react";
import { counterStore } from "./counterStore";

function CounterView() {
  const count = useSyncExternalStore(
    counterStore.subscribe,
    () => counterStore.getState().count, // return a primitive → stable equality checks
    () => 0 // SSR fallback
  );

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => counterStore.setState({ count: count + 1 })}>+1</button>
    </>
  );
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Equality note:"})," returning a ",e.jsx("em",{children:"primitive"})," (number/boolean/string) or the ",e.jsx("em",{children:"same object reference"})," when unchanged keeps renders efficient."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Stable snapshots (avoid unnecessary re-renders)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["If ",e.jsx(t.InlineCode,{children:"getSnapshot()"})," returns a ",e.jsx("b",{children:"new object"})," every time, React will re-render on each store ping."]}),e.jsxs("li",{children:["Return primitives or memoized objects; React compares with ",e.jsx(t.InlineCode,{children:"Object.is"}),"."]})]}),e.jsx(t.Pre,{children:`// ❌ Returns a new object → re-renders each change even if the slice is the same
() => ({ count: counterStore.getState().count })

// ✅ Return primitive/same object
() => counterStore.getState().count

// ✅ Memoize a slice (simple cache)
function selectCountSnapshot() {
  let prevState, prevSel;
  return () => {
    const s = counterStore.getState();
    if (s === prevState) return prevSel;
    prevState = s;
    prevSel = s.count; // if selecting object, memoize shallow-equal result
    return prevSel;
  };
}
const getCount = selectCountSnapshot();
useSyncExternalStore(counterStore.subscribe, getCount);`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Browser APIs as “stores”"}),e.jsx(t.Pre,{children:`// Online/offline status
function useOnline() {
  const subscribe = React.useCallback((notify) => {
    window.addEventListener("online", notify);
    window.addEventListener("offline", notify);
    return () => {
      window.removeEventListener("online", notify);
      window.removeEventListener("offline", notify);
    };
  }, []);

  const getSnapshot = React.useCallback(
    () => navigator.onLine, // boolean primitive
    []
  );

  return React.useSyncExternalStore(subscribe, getSnapshot, () => true);
}

// Media query
function useMediaQuery(query) {
  const subscribe = React.useCallback((notify) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", notify);
    return () => mql.removeEventListener("change", notify);
  }, [query]);

  const getSnapshot = React.useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}`}),e.jsx(t.Small,{children:"Return booleans for stable equality; server fallbacks ensure hydration safety."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Selector utility (read a slice)"}),e.jsx(t.Pre,{children:`// Generic selector hook
function useStoreSelector(store, selector, getServerSnapshot) {
  // Cache selected value; return previous reference if equal
  let lastSnap, lastSel;
  const getSnapshot = () => {
    const snap = store.getState();
    if (snap === lastSnap) return lastSel;
    const nextSel = selector(snap);
    lastSnap = snap;
    // If equal to previous (Object.is), return old ref to keep memoized children stable
    if (lastSel !== undefined && Object.is(nextSel, lastSel)) return lastSel;
    lastSel = nextSel;
    return nextSel;
  };
  return React.useSyncExternalStore(
    store.subscribe,
    getSnapshot,
    getServerSnapshot ? () => selector(getServerSnapshot()) : undefined
  );
}

// Usage
const count = useStoreSelector(counterStore, s => s.count);`}),e.jsx(t.Small,{children:"For full-featured selector semantics (with custom equality), consider a dedicated state library. This simple cache illustrates the idea."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"SSR & hydration"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Provide ",e.jsx(t.InlineCode,{children:"getServerSnapshot"})," so the server’s value matches the client’s first value."]}),e.jsxs("li",{children:["For time-based or environment values (e.g., ",e.jsx("em",{children:"online"}),", ",e.jsx("em",{children:"viewport"}),"), choose a safe default and revalidate on mount."]})]}),e.jsx(t.Pre,{children:`// Example: theme store with SSR
const themeStore = {
  _theme: "light",
  listeners: new Set(),
  getState() { return this._theme; },
  setState(t) { this._theme = t; this.listeners.forEach(l => l()); },
  subscribe(l) { this.listeners.add(l); return () => this.listeners.delete(l); }
};

function useThemeSSR(initial) {
  return React.useSyncExternalStore(
    (l) => themeStore.subscribe(l),
    () => themeStore.getState(),
    () => initial // server value injected from request
  );
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Integrating with state libraries"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Modern Redux, Zustand, Jotai, etc. expose bindings that internally use ",e.jsx(t.InlineCode,{children:"useSyncExternalStore"}),"."]}),e.jsx("li",{children:"Prefer the library’s hook if available; only write custom wiring for bespoke stores."})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Common pitfalls"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Returning fresh objects from ",e.jsx(t.InlineCode,{children:"getSnapshot"})," → unnecessary re-renders; return primitives or memoized objects."]}),e.jsx("li",{children:"Mutating store state in place; React won’t detect changes if the same reference is returned."}),e.jsxs("li",{children:["Forgetting to unsubscribe in ",e.jsx(t.InlineCode,{children:"subscribe"}),"; always return a cleanup function."]}),e.jsxs("li",{children:["Using ",e.jsx(t.InlineCode,{children:"useEffect"})," to read store values; it can tear under concurrency—use this hook instead."]}),e.jsxs("li",{children:["Mismatched SSR/client snapshots causing hydration warnings; supply ",e.jsx(t.InlineCode,{children:"getServerSnapshot"}),"."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do / Don’t"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep store updates immutable and notify listeners on change."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," return primitives or previously memoized objects from ",e.jsx(t.InlineCode,{children:"getSnapshot"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," provide ",e.jsx(t.InlineCode,{children:"getServerSnapshot"})," for SSR."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," compute heavy derived data in ",e.jsx(t.InlineCode,{children:"getSnapshot"})," every time; memoize inside the store or with selectors."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," rely on effects for subscription; this hook is designed for concurrent-safe reads."]})]})]}),e.jsxs(t.Callout,{children:["Summary: ",e.jsx(t.InlineCode,{children:"useSyncExternalStore"})," is the ",e.jsx("em",{children:"correct"})," way to read from and subscribe to data sources outside React. Expose ",e.jsx("code",{children:"subscribe/getState"})," on the store, return stable snapshots, and provide SSR fallbacks to keep hydration consistent."]})]});export{r as default};
