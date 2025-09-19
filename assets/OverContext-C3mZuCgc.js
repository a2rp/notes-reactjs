import{j as e}from"./index-BRArnZ3i.js";import{S as t}from"./styled-7VbwKvaZ.js";const r=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Over-Context (Anti-Pattern)"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"Over-Context"})," is the habit of pushing too much state into React Context—especially",e.jsx("i",{children:"fast-changing"})," or ",e.jsx("i",{children:"local-only"})," state. Context is best for ",e.jsx("b",{children:"globally relevant, stable"})," data (theme, auth session, i18n, feature flags). Using it as a global store for everything triggers extra re-renders and tight coupling."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Definitions"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"React Context:"})," a mechanism to pass values to many descendants without prop drilling. Created via"," ",e.jsx(t.InlineCode,{children:"React.createContext(defaultValue)"}),", read with"," ",e.jsx(t.InlineCode,{children:"useContext(MyContext)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Provider:"})," the component that supplies a value to a Context tree:"," ",e.jsx(t.InlineCode,{children:"<MyContext.Provider value={...}>...</MyContext.Provider>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Consumer:"})," any descendant calling ",e.jsx(t.InlineCode,{children:"useContext"})," to read the Provider's value."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Re-render blast radius:"})," when a Context value changes, ",e.jsx("i",{children:"all"})," components reading that context re-render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Ephemeral UI state:"})," short-lived, local component state (e.g., toggling a modal, input text, hover)."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Use Context for the right things"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Stable, app-wide"})," values: theme (light/dark), locale, date-format rules, feature flags."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Session-like"})," values: authenticated user profile, access token (read-mostly)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cross-cutting"})," concerns: analytics client, error/reporting clients, config objects (rarely change)."]})]}),e.jsx(t.Small,{children:"If a value changes many times per second, or only a few components need it, Context may be the wrong fit."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Smells & Symptoms"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Putting ",e.jsx("b",{children:"every"})," piece of state into a single “GlobalContext”."]}),e.jsxs("li",{children:["Storing ",e.jsx("b",{children:"fast-changing"})," values (keystrokes, scroll position) in Context."]}),e.jsxs("li",{children:["Context value is a ",e.jsx("b",{children:"huge object"})," with dozens of fields and callbacks."]}),e.jsx("li",{children:"Unrelated UI re-renders whenever any part of the Context value changes."}),e.jsx("li",{children:"Hard to test: components depend on a giant Provider even for trivial behavior."})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Anti-example: one giant context"}),e.jsx(t.Pre,{children:`// ❌ One giant, fast-changing context
const AppContext = React.createContext(null);

function AppProvider({ children }) {
  const [query, setQuery] = React.useState("");        // changes on every keystroke
  const [cart, setCart] = React.useState([]);          // changes frequently
  const [theme, setTheme] = React.useState("dark");    // rarely changes

  const value = { query, setQuery, cart, setCart, theme, setTheme };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Any consumer of ANY field re-renders whenever query/cart/theme changes:
function HeaderSearch() {
  const { query, setQuery } = React.useContext(AppContext);
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}

function FooterThemeToggle() {
  const { theme, setTheme } = React.useContext(AppContext);
  return <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>
    Theme: {theme}
  </button>;
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Problem:"})," Header and Footer are now coupled—typing in the header forces the footer to re-render."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Refactor: split by stability & audience"}),e.jsx(t.Pre,{children:`// ✅ Separate stable and volatile concerns
const ThemeContext = React.createContext(null);   // stable-ish
const CartContext  = React.createContext(null);   // volatile but scoped
const SearchContext = React.createContext(null);  // very volatile; scope it narrowly

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState("dark");
  const value = React.useMemo(() => ({ theme, setTheme }), [theme]); // stable identity
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function CartProvider({ children }) {
  const [cart, setCart] = React.useState([]);
  const add = React.useCallback(item => setCart(c => [...c, item]), []);
  const value = React.useMemo(() => ({ cart, add }), [cart, add]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Narrow scope: only wrap the subtree that needs live search state
function SearchProvider({ children }) {
  const [query, setQuery] = React.useState("");
  const value = React.useMemo(() => ({ query, setQuery }), [query]);
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Why it helps:"})," unrelated consumers stop re-rendering; Providers can be placed close to where state is needed, reducing blast radius."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Avoid “god objects” as context values"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Expose the ",e.jsx("b",{children:"minimal shape"})," consumers need (e.g., only ",e.jsx(t.InlineCode,{children:"theme"})," + setter)."]}),e.jsxs("li",{children:["Use ",e.jsx(t.InlineCode,{children:"useMemo"})," to keep the provided object identity stable across renders."]}),e.jsxs("li",{children:["Prefer ",e.jsx("b",{children:"multiple small contexts"})," over one mega object."]})]}),e.jsx(t.Pre,{children:`// ❌ Mega object (new identity every render)
<MyContext.Provider value={{ a, b, c, doX, doY, doZ }} />

// ✅ Memoized minimal object
const value = React.useMemo(() => ({ theme, setTheme }), [theme]);
<ThemeContext.Provider value={value} />`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Fast-changing state: keep local or use a store"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Local first:"})," UI-only state (hover, input text) should live in the component via ",e.jsx(t.InlineCode,{children:"useState"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shared but hot:"})," for values that update many times per second (e.g., cursor, scroll), consider a lightweight state library that supports ",e.jsx("b",{children:"selectors"})," to update only interested components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Derive when possible:"})," compute values from source state in the component with ",e.jsx(t.InlineCode,{children:"useMemo"})," instead of storing them in Context."]})]}),e.jsx(t.Pre,{children:`// Local UI-only state (good)
function SearchBox() {
  const [q, setQ] = React.useState("");
  return <input value={q} onChange={(e) => setQ(e.target.value)} />;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Selector pattern (advanced)"}),e.jsxs(t.Lead,{children:["Context does not natively support selectors, but you can ",e.jsx("i",{children:"manually"})," expose smaller contexts or custom hooks that subscribe to slices. Keep it simple unless you truly need it."]}),e.jsx(t.Pre,{children:`// Split read paths using multiple contexts:
const CartItemsContext = React.createContext([]);
const CartActionsContext = React.createContext({ add: () => {} });

function CartProvider({ children }) {
  const [items, setItems] = React.useState([]);
  const add = React.useCallback((item) => setItems((xs) => [...xs, item]), []);
  return (
    <CartItemsContext.Provider value={items}>
      <CartActionsContext.Provider value={{ add }}>
        {children}
      </CartActionsContext.Provider>
    </CartItemsContext.Provider>
  );
}

function useCartItems() { return React.useContext(CartItemsContext); }
function useCartActions() { return React.useContext(CartActionsContext); }`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Benefit:"})," components that only need actions don't re-render when items change—and vice versa."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep ephemeral state local; lift it only when multiple siblings truly need it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," split contexts by concern and stability; memoize provided objects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," wrap the smallest subtree that needs the value; avoid app-wide providers for hot state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," store every keystroke / scroll offset in Context."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," expose a giant, ever-changing object as the context value."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," use Context as a substitute for thoughtful component design and state co-location."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Decision checklist"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Is the value globally relevant and read across distant parts of the tree?"}),e.jsx("li",{children:"How frequently does it change? (Slow & stable → Context. Fast & hot → keep local/store.)"}),e.jsx("li",{children:"Can I split this into smaller, focused contexts?"}),e.jsx("li",{children:"Can consumers derive what they need instead of storing everything?"})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Prop drilling:"})," passing props through many layers just so deep children can read them."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Co-location:"})," keeping state near the components that use it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Selector:"})," a function that reads a slice of state to minimize re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Blast radius:"})," the number of components affected by a state change."]})]})]}),e.jsxs(t.Callout,{children:["Summary: Use Context ",e.jsx("b",{children:"sparingly and purposefully"}),". Keep hot, local state out of global providers; split by concern, memoize values, and prefer co-location. Smaller contexts and stable shapes make your app faster and easier to reason about."]})]});export{r as default};
