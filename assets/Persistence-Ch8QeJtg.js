import{j as e}from"./index-Der9nZEc.js";import{S as s}from"./styled-BuOdSR0Z.js";const i=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Persistence (State Management)"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Persistence"})," means saving app state so it survives a page reload, tab close, or going offline, and then ",e.jsx("i",{children:"restoring"})," it when the app starts again. You usually persist to browser storage (",e.jsx(s.InlineCode,{children:"localStorage"}),", ",e.jsx(s.InlineCode,{children:"IndexedDB"}),", etc.) with safe ",e.jsx("b",{children:"serialization"})," and a repeatable ",e.jsx("b",{children:"hydration"})," process."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary (precise terms)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Storage driver:"})," the underlying place where bytes are kept (e.g., ",e.jsx(s.InlineCode,{children:"localStorage"}),", ",e.jsx(s.InlineCode,{children:"sessionStorage"}),", ",e.jsx(s.InlineCode,{children:"IndexedDB"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Serialization:"})," turning in-memory values into a storable string/bytes (often JSON). Functions, class instances, Symbols don't serialize cleanly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hydration / Rehydration:"})," loading saved bytes, parsing them, and applying the values to your state on startup."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Versioning:"})," tagging persisted data with a version so you can run ",e.jsx("b",{children:"migrations"})," when your schema changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"TTL (time-to-live):"})," an expiry window after which data is considered stale and removed/ignored."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Partial persistence:"})," persisting only safe subsets (e.g., user preferences) instead of the entire store."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cross-tab sync:"})," keeping multiple tabs consistent using the ",e.jsx(s.InlineCode,{children:"storage"})," event."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"What to Persist (and What to Avoid)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Good candidates:"})," theme, language, sidebar open/close, form drafts, filters/sorts, onboarding flags, cart (if size is small), last visited screen."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use caution:"})," large lists, server caches, or anything that becomes stale quickly—prefer refetch or short TTL."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do not persist:"})," secrets (access tokens), sensitive PII, passwords. Store tokens in ",e.jsx("i",{children:"httpOnly cookies"})," via the server, not in JavaScript storage."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Storage Drivers"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"localStorage:"})," simple key-value strings, synchronous API, ~5MB per origin (varies). Great for small prefs. Blocks main thread on large reads/writes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"sessionStorage:"})," like localStorage but per-tab and cleared when the tab closes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"IndexedDB:"})," async, larger quotas, structured data. Use tiny helpers like ",e.jsx(s.InlineCode,{children:"localForage"})," or ",e.jsx(s.InlineCode,{children:"idb-keyval"})," for convenience."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cookies:"})," for server reads only; keep size tiny; avoid storing sensitive data on the client. Prefer httpOnly server-set cookies for tokens."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Core Pattern: Save → Load → Migrate → Expire"}),e.jsx(s.Pre,{children:`// Pseudocode showing a safe persistence lifecycle
const KEY = "app:prefs";
const VERSION = 2; // bump when schema changes

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { v, data, savedAt } = JSON.parse(raw);
    if (v !== VERSION) return migrate(v, data);
    if (Date.now() - savedAt > 1000 * 60 * 60 * 24 * 7) return null; // TTL 7d
    return data;
  } catch { return null; }
}

function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: VERSION, savedAt: Date.now(), data }));
  } catch { /* storage full or blocked */ }
}

function migrate(oldV, oldData) {
  // stepwise migrations
  let d = oldData;
  if (oldV < 2) {
    d.theme = d.theme || "system";
  }
  return d;
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Cross-Tab Sync"}),e.jsx(s.Pre,{children:`// Keep tabs consistent with the 'storage' event
React.useEffect(() => {
  function onStorage(e) {
    if (e.key === "app:prefs") {
      try {
        const next = JSON.parse(e.newValue);
        // apply to state...
      } catch {}
    }
  }
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}, []);`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Library Recipes"}),e.jsxs(s.H3,{children:["Redux Toolkit + ",e.jsx("code",{children:"redux-persist"})]}),e.jsx(s.Pre,{children:`import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // localStorage
import { persistReducer, persistStore } from "redux-persist";
import { api } from "./services/api"; // RTK Query api slice
import prefsReducer from "./features/prefsSlice";

const rootReducer = combineReducers({
  prefs: prefsReducer,
  [api.reducerPath]: api.reducer, // optional: persist cache sparingly
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["prefs"], // persist only prefs; avoid huge or sensitive slices
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (gdm) => gdm().concat(api.middleware),
});

// In app root, use <PersistGate> to delay UI until rehydration
// <Provider store={store}><PersistGate loading={...} persistor={persistStore(store)}><App/></PersistGate></Provider>`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Tip:"})," If you do persist RTK Query cache, use short TTL and rely on its refetch-on-focus/reconnect behavior."]}),e.jsxs(s.H3,{children:["Zustand + ",e.jsx("code",{children:"persist"})," middleware"]}),e.jsx(s.Pre,{children:`import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(persist(
  (set, get) => ({
    theme: "system",
    setTheme: (t) => set({ theme: t }),
    cart: [],
    addToCart: (item) => set({ cart: [...get().cart, item] }),
  }),
  {
    name: "app:store",
    version: 2,
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ theme: state.theme, cart: state.cart }), // only these keys
    migrate: (persistedState, version) => {
      if (version < 2) persistedState.theme = persistedState.theme || "system";
      return persistedState;
    },
  }
));`}),e.jsxs(s.H3,{children:["Jotai + ",e.jsx("code",{children:"atomWithStorage"})]}),e.jsx(s.Pre,{children:`import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const themeAtom = atomWithStorage("app:theme", "system"); // localStorage by default
export const cartAtom = atomWithStorage("app:cart", []);

// Use like normal atoms in components.`}),e.jsx(s.H3,{children:"Recoil (community persist)"}),e.jsx(s.Pre,{children:`// Recoil doesn't ship a built-in persistence API.
// A common approach is 'recoil-persist' (community).
// Example (conceptual):
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist({ key: "app:recoil", storage: localStorage });

export const themeState = atom({ key: "theme", default: "system", effects_UNSTABLE: [persistAtom] });`}),e.jsx(s.Small,{children:"Community packages vary; ensure they support versioning, partial persistence, and SSR guards."}),e.jsx(s.H3,{children:"XState (save machine context)"}),e.jsx(s.Pre,{children:`// Persist machine 'context' or last known state snapshot yourself.
import { useInterpret } from "@xstate/react";
import { myMachine } from "./machine";

function App() {
  const service = useInterpret(myMachine, {
    snapshot: loadSnapshot(), // load from storage
  });

  React.useEffect(() => {
    const sub = service.subscribe((state) => {
      // Save the minimal, serializable data you need
      saveSnapshot({ value: state.value, context: state.context });
    });
    return () => sub.unsubscribe();
  }, [service]);

  return /* UI */;
}`}),e.jsxs(s.Small,{children:["Persist only serializable parts (machine ",e.jsx("i",{children:"value"})," and ",e.jsx("i",{children:"context"}),"). Restore carefully during initialization."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Performance, Safety & SSR"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Debounce writes:"})," batch frequent changes (e.g., form drafts) to avoid blocking the main thread."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Size limits:"})," keep payloads small. Prefer IndexedDB for large data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SSR guard:"})," check ",e.jsx(s.InlineCode,{children:'typeof window !== "undefined"'})," before touching browser storage."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Security:"})," nothing in web storage is truly private—assume attackers with XSS can read it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Migrations:"})," always include a version and migration path to keep old users working."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," persist only what you must; keep it minimal and structured."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," add ",e.jsx("i",{children:"version"}),", ",e.jsx("i",{children:"migrate"}),", and optional ",e.jsx("i",{children:"TTL"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," test hydration paths and corrupted data handling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," persist secrets or huge, rapidly changing server data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," forget cross-tab sync if the UX needs it."]})]})]}),e.jsx(s.Callout,{children:"Summary: Pick a storage driver that matches your data size and volatility, serialize safely, hydrate deterministically, version & migrate data, and be selective about what you persist."})]});export{i as default};
