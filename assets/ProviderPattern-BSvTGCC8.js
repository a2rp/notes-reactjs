import{j as e}from"./index-Der9nZEc.js";import{S as t}from"./styled-gMmaYldB.js";const s=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Provider Pattern"}),e.jsxs(t.Lead,{children:["The ",e.jsx("b",{children:"Provider Pattern"})," shares state and functions with deeply nested components using React's ",e.jsx(t.InlineCode,{children:"Context"}),". A top-level"," ",e.jsx(t.InlineCode,{children:"<Provider>"})," makes a value available to"," ","any descendant, so you avoid ",e.jsx("em",{children:"prop drilling"})," (passing props through many layers that don't use them)."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Core Definitions"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Context:"})," A React mechanism for passing data through the component tree without manually passing props at every level. Created with"," ",e.jsx(t.InlineCode,{children:"React.createContext(defaultValue)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Provider:"})," A special component on a Context (",e.jsx(t.InlineCode,{children:"MyContext.Provider"}),") that supplies a"," ",e.jsx(t.InlineCode,{children:"value"})," to all descendants."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Consumer:"})," Any component that reads context via"," ",e.jsx(t.InlineCode,{children:"useContext(MyContext)"})," (or the legacy"," ",e.jsx(t.InlineCode,{children:"<MyContext.Consumer>"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prop drilling:"})," Passing props through intermediate components that don't directly need them, just to reach a deep child."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Re-render:"})," When a component renders again because its props/state/context changed. Context value changes propagate re-renders to all consumers."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Minimal Example: Theme Provider"}),e.jsx(t.Pre,{children:`// theme-context.js
import * as React from "react";

export const ThemeContext = React.createContext({ mode: "light", toggle: () => {} });

export function ThemeProvider({ children, initial = "light" }) {
  const [mode, setMode] = React.useState(initial);

  // Keep the object identity stable to avoid re-rendering all consumers unnecessarily
  const value = React.useMemo(() => ({
    mode,
    toggle: () => setMode((m) => (m === "light" ? "dark" : "light")),
  }), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// useTheme.js
export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

// Any component:
function ThemeButton() {
  const { mode, toggle } = useTheme();
  return <button onClick={toggle}>Current: {mode} — Toggle</button>;
}`}),e.jsxs(t.Small,{children:["The ",e.jsx(t.InlineCode,{children:"value"})," is memoized so consumer components don't re-render unless ",e.jsx(t.InlineCode,{children:"mode"})," actually changes."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Realistic Example: Auth Provider (state + actions)"}),e.jsx(t.Pre,{children:`// auth-context.js
import * as React from "react";

const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  const login = React.useCallback(async (credentials) => {
    // fake API
    const fakeUser = { id: 1, name: "Ashish" };
    setUser(fakeUser);
    return fakeUser;
  }, []);

  const logout = React.useCallback(() => setUser(null), []);

  const value = React.useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

// usage
function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav>
      {user ? (
        <>
          <span>Hello, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : <span>Guest</span>}
    </nav>
  );
}`}),e.jsxs(t.Small,{children:["The provider exposes both ",e.jsx("em",{children:"state"})," (",e.jsx("code",{children:"user"}),") and ",e.jsx("em",{children:"actions"})," ","(",e.jsx("code",{children:"login"}),", ",e.jsx("code",{children:"logout"}),") as a stable, memoized value."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Design Choices & Patterns"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Split contexts by concern:"})," If one context value changes frequently (like input text), separate it from rarely changing pieces to limit re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stable identity:"})," Wrap provider ",e.jsx(t.InlineCode,{children:"value"})," in"," ",e.jsx(t.InlineCode,{children:"useMemo"}),"; wrap actions in"," ",e.jsx(t.InlineCode,{children:"useCallback"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Selectors (advanced):"})," Instead of exposing a large object, expose small hooks like ",e.jsx(t.InlineCode,{children:"useAuthUser()"})," or use a selector pattern so consumers only re-render for what they read."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Provider Composer:"})," When multiple providers are needed (Theme, Auth, I18n), compose them with a ",e.jsx("em",{children:"Providers"})," wrapper for clean root code."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Default values:"})," Give meaningful defaults for SSR/tests but still guard with an invariant (throw if used outside the provider) to catch mistakes early."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Provider Composer (nesting made tidy)"}),e.jsx(t.Pre,{children:`function Providers({ children }) {
  return (
    <ThemeProvider initial="dark">
      <AuthProvider>
        {/* add more providers here (I18nProvider, QueryClientProvider, etc.) */}
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}

// Root:
// ReactDOM.createRoot(...).render(<Providers><App/></Providers>)`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use the Provider Pattern to avoid prop drilling for truly shared state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," memoize the provider value and callbacks to reduce consumer re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," split large contexts into multiple, smaller contexts by change frequency."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," put every piece of state into context—prefer local state unless multiple distant components need it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," read context in hot, frequently re-rendering components if it causes performance issues—consider selectors or lifting logic."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Common Pitfalls"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Unstable values:"})," Returning a new object each render causes all consumers to re-render. Fix: wrap with ",e.jsx(t.InlineCode,{children:"useMemo"}),"/",e.jsx(t.InlineCode,{children:"useCallback"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Over-contextualization:"})," Context everywhere leads to unnecessary coupling and renders. Start local; move to context when clearly needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Using outside provider:"})," Accessing a context without the provider—guard with an explicit error."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Context value:"})," The object or primitive provided by the provider."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Consumer:"})," A component that calls ",e.jsx(t.InlineCode,{children:"useContext"})," to read the context."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memoization:"})," Caching a computed value by dependencies to keep reference stable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Selector pattern:"})," A technique to read only a slice of context to reduce re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prop drilling:"})," Passing props through components that don't directly need them."]})]})]}),e.jsx(t.Callout,{children:"Summary: Use the Provider Pattern to share cross-cutting state and actions without prop drilling. Keep provider values stable, split contexts by change frequency, and compose providers cleanly at the root."})]});export{s as default};
