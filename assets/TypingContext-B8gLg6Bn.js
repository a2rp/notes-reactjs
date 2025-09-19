import{j as e}from"./index-DXTGIo8z.js";import{S as t}from"./styled-Xb9qjV0Q.js";const i=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Typing Context (TypeScript)"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"React Context"})," lets you share values (state, settings, services) with any descendant without prop drilling. With ",e.jsx("b",{children:"TypeScript"}),", we give that context a precise type so consumers get autocompletion and compile-time safety."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Key Terms — clear definitions"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Context:"})," a React mechanism created via"," ",e.jsx(t.InlineCode,{children:"createContext"})," to pass a ",e.jsx("em",{children:"value"})," through the component tree."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Provider:"})," the component that makes the context value available to its descendants:"," ",e.jsx(t.InlineCode,{children:"<MyContext.Provider value={...}>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Consumer:"})," any descendant that reads the context via"," ",e.jsx(t.InlineCode,{children:"useContext(MyContext)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Value type:"})," the exact shape of the data placed into the context (e.g.,"," ",e.jsx(t.InlineCode,{children:"{ user: User | null, login(): Promise<void> }"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Union type:"})," a type that can be one of several options (e.g.,"," ",e.jsx(t.InlineCode,{children:"string | null"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Generic:"})," a type parameter that lets us write reusable, type-safe helpers (e.g.,",e.jsx(t.InlineCode,{children:"createStrictContext<T>()"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reducer / Dispatch:"})," state update pattern via"," ",e.jsx(t.InlineCode,{children:"useReducer"}),";"," ",e.jsx(t.InlineCode,{children:"Dispatch<Action>"})," is a function that sends an"," ",e.jsx(t.InlineCode,{children:"Action"})," to the reducer."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Minimal Typed Context"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Start by defining a ",e.jsx("b",{children:"Value type"}),". Then type"," ",e.jsx(t.InlineCode,{children:"createContext<ValueType | undefined>(undefined)"})," ","to force consumers to handle missing providers in dev."]}),e.jsxs("li",{children:["Provide a ",e.jsx("b",{children:"custom hook"})," to read the context and throw a clear error if used outside a provider."]})]}),e.jsx(t.Pre,{children:`// Value shape for the theme feature
type Theme = "light" | "dark";
interface ThemeCtx {
  theme: Theme;
  setTheme(next: Theme): void;
}

// Context is either the value or undefined before a Provider is mounted
const ThemeContext = React.createContext<ThemeCtx | undefined>(undefined);

// Safe consumer hook
export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

// Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState<Theme>("light");
  // Memoize the value object to keep reference stable and reduce re-renders
  const value = React.useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}`}),e.jsxs(t.Small,{children:["Using ",e.jsx(t.InlineCode,{children:"undefined"})," as the default and guarding inside"," ",e.jsx(t.InlineCode,{children:"useTheme"})," prevents silent fallbacks."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Pattern: Split Value & Dispatch"}),e.jsx(t.List,{children:e.jsxs("li",{children:["For ",e.jsx("b",{children:"reducer-based state"}),", split into two contexts: one for ",e.jsx("em",{children:"state"})," and one for ",e.jsx("em",{children:"dispatch"}),". Consumers that only dispatch do not re-render when state changes."]})}),e.jsx(t.Pre,{children:`interface CounterState { count: number }
type CounterAction = { type: "inc" } | { type: "dec" } | { type: "set"; payload: number };

const CounterStateContext = React.createContext<CounterState | undefined>(undefined);
const CounterDispatchContext = React.createContext<React.Dispatch<CounterAction> | undefined>(undefined);

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "inc": return { count: state.count + 1 };
    case "dec": return { count: state.count - 1 };
    case "set": return { count: action.payload };
    default: return state;
  }
}

export function CounterProvider({ children }) {
  const [state, dispatch] = React.useReducer(counterReducer, { count: 0 });
  return (
    <CounterStateContext.Provider value={state}>
      <CounterDispatchContext.Provider value={dispatch}>
        {children}
      </CounterDispatchContext.Provider>
    </CounterStateContext.Provider>
  );
}

// Consumer hooks (with helpful errors)
export function useCounterState() {
  const v = React.useContext(CounterStateContext);
  if (!v) throw new Error("useCounterState must be used within <CounterProvider>");
  return v;
}
export function useCounterDispatch() {
  const d = React.useContext(CounterDispatchContext);
  if (!d) throw new Error("useCounterDispatch must be used within <CounterProvider>");
  return d;
}`})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Generic Helper: ",e.jsx("code",{children:"createStrictContext<T>"})]}),e.jsx(t.List,{children:e.jsx("li",{children:"Avoid repeating boilerplate by creating a helper that returns a typed hook and Provider."})}),e.jsx(t.Pre,{children:`// Reusable helper
function createStrictContext<T>(name: string) {
  const Ctx = React.createContext<T | undefined>(undefined);
  function useCtx() {
    const v = React.useContext(Ctx);
    if (v === undefined) throw new Error(\`\${name} must be used within its Provider\`);
    return v;
  }
  return [useCtx, Ctx.Provider] as const;
}

// Usage
type AuthCtx = { user: { id: string } | null; login(): Promise<void>; logout(): void };
const [useAuth, AuthProvider] = createStrictContext<AuthCtx>("useAuth");

function AppProviders({ children }) {
  const [user, setUser] = React.useState<{ id: string } | null>(null);
  const login = async () => { /* ... */ setUser({ id: "u1" }); };
  const logout = () => setUser(null);
  const value = React.useMemo(() => ({ user, login, logout }), [user]);
  return <AuthProvider value={value}>{children}</AuthProvider>;
}

// Later in any component
function ProfileButton() {
  const { user, logout } = useAuth();
  return user ? <button onClick={logout}>Logout</button> : null;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Typing Provider Props & Children"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Children:"})," use ",e.jsx(t.InlineCode,{children:"React.ReactNode"})," (or"," ",e.jsx(t.InlineCode,{children:"PropsWithChildren"}),") to type the"," ",e.jsx(t.InlineCode,{children:"children"})," prop."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Provider value:"})," its type must match the context value type exactly (no extra keys, no missing keys)."]})]}),e.jsx(t.Pre,{children:`import type { PropsWithChildren } from "react";

type Settings = { locale: string; setLocale(l: string): void };
const SettingsContext = React.createContext<Settings | undefined>(undefined);

export function SettingsProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = React.useState("en");
  const value = React.useMemo<Settings>(() => ({ locale, setLocale }), [locale]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Handling Async or Optional Values"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Use a ",e.jsx("b",{children:"Maybe"})," union for values that may not exist yet (e.g., before fetching):"," ",e.jsx(t.InlineCode,{children:"type Maybe<T> = T | null"}),"."]}),e.jsxs("li",{children:["Prefer explicit states (",e.jsx("em",{children:"idle"}),", ",e.jsx("em",{children:"loading"}),", ",e.jsx("em",{children:"ready"}),", ",e.jsx("em",{children:"error"}),") for clarity."]})]}),e.jsx(t.Pre,{children:`type Maybe<T> = T | null;
type Profile = { id: string; name: string };

type ProfileCtx = {
  status: "idle" | "loading" | "ready" | "error";
  data: Maybe<Profile>;
  refetch(): Promise<void>;
};`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," type your context with exact shapes (no ",e.jsx(t.InlineCode,{children:"any"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use a ",e.jsx("b",{children:"custom hook"})," that errors if the provider is missing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," ",e.jsx("b",{children:"memoize"})," provider values (objects/functions) to reduce re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," split value/dispatch for reducer contexts when perf matters."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," provide a real default value unless you truly want consumers to work without a Provider."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," put rapidly changing values in a single giant context—split into smaller contexts."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary (recap)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Context"}),": Tree-wide value channel created by ",e.jsx(t.InlineCode,{children:"createContext"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Provider"}),": Component that supplies the value to descendants."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Consumer"}),": Code calling ",e.jsx(t.InlineCode,{children:"useContext"})," to read the value."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Union"}),": A type composed of alternatives (e.g., ",e.jsx(t.InlineCode,{children:"T | null"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Generic"}),": Parametric type used to build reusable, strongly-typed helpers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dispatch"}),": Function returned by ",e.jsx(t.InlineCode,{children:"useReducer"})," to send actions."]})]})]}),e.jsxs(t.Callout,{children:["Summary: Define a precise value type, create a strict context (",e.jsx(t.InlineCode,{children:"T | undefined"}),"), expose a safe hook that throws when unprovided, memoize values, and split contexts for performance. Your consumers get perfect IntelliSense and early error detection."]})]});export{i as default};
