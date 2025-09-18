import{j as e}from"./index-B_XJRlzM.js";import{S as t}from"./styled-BlBf1w3h.js";const s=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"useContext"}),e.jsxs(t.Lead,{children:[e.jsx(t.InlineCode,{children:"useContext"})," reads a value from the nearest matching"," ",e.jsx("b",{children:"Context.Provider"})," above the component. Use context to share data across a subtree without prop drilling (theme, auth, i18n, config, form group state, etc.)."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Terminology (precise)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Context object:"})," the value from ",e.jsx(t.InlineCode,{children:"React.createContext(defaultValue)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Provider:"})," ",e.jsx(t.InlineCode,{children:"<MyContext.Provider value={...}>"})," making a value available to descendants."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Consumer:"})," any component calling ",e.jsx(t.InlineCode,{children:"useContext(MyContext)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prop drilling:"})," passing props through many intermediate components that do not use them."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Value identity:"})," reference of the object/array passed to ",e.jsx(t.InlineCode,{children:"value"}),". A new identity re-renders all consumers."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Basic pattern"}),e.jsx(t.Pre,{children:`// context.js
import React from "react";
export const ThemeContext = React.createContext("light"); // default used if no Provider

// App.jsx
import { ThemeContext } from "./context";
function App() {
  const [theme, setTheme] = React.useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
      <button onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}>
        Toggle Theme
      </button>
    </ThemeContext.Provider>
  );
}

// Toolbar.jsx (consumer)
import { ThemeContext } from "./context";
function Toolbar() {
  const theme = React.useContext(ThemeContext);
  return <div className={theme === "dark" ? "dark" : "light"}>Toolbar</div>;
}`}),e.jsxs(t.Small,{children:["Consumers re-render whenever the provider’s ",e.jsx("em",{children:"value"})," changes (by ",e.jsx("b",{children:"identity"}),")."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Safer custom hook (enforce provider)"}),e.jsx(t.Pre,{children:`// Strict context pattern
const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const value = React.useMemo(() => ({ user, setUser }), [user]); // memoize identity
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (ctx === null) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}

// Consumer
function Profile() {
  const { user } = useAuth();
  return <p>{user ? "Signed in" : "Guest"}</p>;
}`}),e.jsx(t.Small,{children:"Throwing when missing helps catch misconfiguration early in development."})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Memoize the provider ",e.jsx("code",{children:"value"})]}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Passing ",e.jsx(t.InlineCode,{children:"{ user, setUser }"})," inline creates a new object every render → all consumers re-render."]}),e.jsxs("li",{children:["Wrap in ",e.jsx(t.InlineCode,{children:"useMemo"})," so the identity changes only when dependencies change."]})]}),e.jsx(t.Pre,{children:`// Good: value is stable until 'user' changes
const value = React.useMemo(() => ({ user, setUser }), [user]);`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Split contexts: state vs dispatch"}),e.jsx(t.Pre,{children:`const CountStateContext = React.createContext(0);
const CountDispatchContext = React.createContext(null);

function CountProvider({ children }) {
  const [count, setCount] = React.useState(0);
  return (
    <CountStateContext.Provider value={count}>
      <CountDispatchContext.Provider value={setCount}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
}

function useCount() { return React.useContext(CountStateContext); }
function useSetCount() { return React.useContext(CountDispatchContext); }

// Consumers only re-render for the part they read.
function Increment() {
  const setCount = useSetCount();
  return <button onClick={() => setCount(c => c + 1)}>+</button>;
}
function Display() {
  const count = useCount();
  return <p>{count}</p>;
}`}),e.jsx(t.Small,{children:"Splitting avoids re-rendering components that only need the dispatcher when state changes."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Selector-like pattern"}),e.jsx(t.Pre,{children:`// Provide a single object but memoize slices before passing to children
const StoreContext = React.createContext(null);

function StoreProvider({ children }) {
  const [state, setState] = React.useState({ items: [], filter: "" });
  const api = React.useMemo(() => ({ state, setState }), [state]);
  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

// Custom hook selects a slice; memoize derived value to keep reference stable
function useStoreSelector(selector) {
  const { state } = React.useContext(StoreContext);
  return React.useMemo(() => selector(state), [state, selector]);
}

// Consumer
function CountLabel() {
  const count = useStoreSelector(s => s.items.length);
  return <span>Count: {count}</span>;
}`}),e.jsx(t.Small,{children:"This keeps the selected value referentially stable for children relying on memo/effect deps, though all consumers still re-render when the provider’s value identity changes. For very large apps, consider context-selector libraries or state stores."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Context vs props vs global store"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Props"}),": best for local, one-direction data flow; simplest and most explicit."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Context"}),": cross-cutting concerns shared by many components (theme, locale, auth, form group, feature flags)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State libraries"}),": complex/global state with fine-grained subscriptions or DevTools (when context granularity is insufficient)."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Dynamic / scoped providers"}),e.jsx(t.Pre,{children:`// Each subtree can have its own "scope"
function Section({ accent, children }) {
  return (
    <ThemeColor.Provider value={accent}>
      {children}
    </ThemeColor.Provider>
  );
}
function Button() {
  const color = React.useContext(ThemeColor);
  return <button style={{ background: color }}>Click</button>;
}`}),e.jsx(t.Small,{children:"Nested providers override parent values—useful for theming and localized overrides."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Common pitfalls"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Creating a new ",e.jsx(t.InlineCode,{children:"value"})," object every render → re-renders all consumers. Memoize it."]}),e.jsx("li",{children:"Overusing context for values only needed by a couple of siblings—prefer lifting state or props."}),e.jsx("li",{children:"Putting side effects in render based on context; use effects instead."}),e.jsx("li",{children:"Storing frequently changing, high-frequency values in a top-level context (e.g., keystrokes) → many re-renders. Colocate or split providers."}),e.jsx("li",{children:"Forgetting default/required provider checks; use a strict custom hook to throw when missing."})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do / Don’t"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use context to remove painful prop drilling for shared concerns."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," memoize provider values and consider splitting state/dispatch."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," pair context with custom hooks for clean APIs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," use context as a default for all state; start with props/local state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," pass huge, frequently changing objects as context values at the app root."]})]})]}),e.jsxs(t.Callout,{children:["Summary: ",e.jsx(t.InlineCode,{children:"useContext"})," is ideal for sharing state/config across a subtree. Memoize provider values, split concerns when useful (state vs dispatch), and reach for props or local state when sharing is not required. Keep updates scoped to avoid unnecessary re-renders."]})]});export{s as default};
