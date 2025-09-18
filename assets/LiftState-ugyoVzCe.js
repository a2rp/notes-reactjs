import{j as e}from"./index-C4jUa9lD.js";import{S as t}from"./styled-CkbfcukM.js";const i=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Lift State"}),e.jsxs(t.Lead,{children:["Lift state to the ",e.jsx("b",{children:"nearest common parent"})," when multiple components need to read or update the same data. Keep a ",e.jsx("b",{children:"single source of truth"}),"and pass values down (props) with changes flowing up (callbacks)."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Terminology (precise)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Source of truth:"})," the single place where a piece of state lives. Every rendered view derives from it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lift state:"})," move state up to a parent so siblings (or deeper children) can share it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Nearest common parent:"})," the lowest ancestor that contains all components needing the state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled child:"})," child renders from a ",e.jsx("em",{children:"value"})," prop and notifies changes via an ",e.jsx("em",{children:"onChange"})," callback."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prop drilling:"})," passing props through multiple layers that do not use them directly (consider context when deep)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Derived state:"})," a computed value based on other state/props (do not duplicate; compute or memoize)."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"When to lift state"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Two or more components must stay in sync (search box ↔ filtered list, tabs ↔ panel)."}),e.jsx("li",{children:"A parent needs to decide how children behave based on shared data."}),e.jsx("li",{children:"Multiple children update the same data (form sections editing one draft object)."})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Workflow (step-by-step)"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Identify the minimal state you actually need (avoid duplicates)."}),e.jsx("li",{children:"Find the nearest common parent that needs or coordinates that state."}),e.jsxs("li",{children:["Create state in that parent with ",e.jsx(t.InlineCode,{children:"useState"}),"."]}),e.jsx("li",{children:"Pass the value down; pass callbacks down for updates."}),e.jsxs("li",{children:["Compute ",e.jsx("em",{children:"derived"})," data from that state instead of storing copies."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example: Search box controlling a list"}),e.jsx(t.Pre,{children:`const ALL = [
  { id: "1", name: "Ada" },
  { id: "2", name: "Linus" },
  { id: "3", name: "Grace" },
];

function Products() {
  const [query, setQuery] = React.useState("");

  // Derived state: compute, do not store duplicates
  const filtered = React.useMemo(() => {
    const q = query.toLowerCase();
    return ALL.filter(p => p.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <SearchBox value={query} onChange={setQuery} />
      <List items={filtered} />
    </>
  );
}

function SearchBox({ value, onChange }) {
  return (
    <input
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function List({ items }) {
  if (!items.length) return <p>No results</p>;
  return (
    <ul>
      {items.map(x => <li key={x.id}>{x.name}</li>)}
    </ul>
  );
}`}),e.jsxs(t.Small,{children:["The parent owns ",e.jsx("code",{children:"query"}),". ",e.jsx("code",{children:"SearchBox"})," is a controlled child. ",e.jsx("code",{children:"filtered"})," is ",e.jsx("em",{children:"derived"})," (recomputed), not stored."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example: two fields mirroring each other (C ↔ F)"}),e.jsx(t.Pre,{children:`function toCelsius(f) { return (f - 32) * 5 / 9; }
function toFahrenheit(c) { return (c * 9 / 5) + 32; }

function TemperatureConverter() {
  // Single source of truth: value + scale
  const [scale, setScale] = React.useState("C"); // "C" or "F"
  const [value, setValue] = React.useState("");

  const c = scale === "C" ? value : (value === "" ? "" : String(Math.round(toCelsius(Number(value)))));
  const f = scale === "F" ? value : (value === "" ? "" : String(Math.round(toFahrenheit(Number(value)))));

  return (
    <div>
      <TempInput
        label="Celsius"
        value={c}
        onChange={(v) => { setScale("C"); setValue(v); }}
      />
      <TempInput
        label="Fahrenheit"
        value={f}
        onChange={(v) => { setScale("F"); setValue(v); }}
      />
    </div>
  );
}

function TempInput({ label, value, onChange }) {
  return (
    <label>
      {label}:{" "}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode="numeric"
      />
    </label>
  );
}`}),e.jsxs(t.Small,{children:["The parent holds ",e.jsx("code",{children:"value"})," and ",e.jsx("code",{children:"scale"}),". Each input is controlled by props and updates the shared state."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Lifting vs colocation (balance)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Colocate"})," state where it is used if only one component cares about it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lift"})," only when multiple components must share or coordinate the value."]}),e.jsx("li",{children:"Over-lifting creates long prop chains and unnecessary renders; lift just enough."})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Deep trees: avoid prop drilling with context"}),e.jsx(t.Pre,{children:`const ThemeContext = React.createContext("light");

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState("light");
  const value = React.useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function ThemeToggle() {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const next = theme === "light" ? "dark" : "light";
  return <button onClick={() => setTheme(next)}>Theme: {theme}</button>;
}`}),e.jsxs(t.Small,{children:["Context is an alternative to lifting through many layers. Keep the ",e.jsx("em",{children:"source of truth"})," single; share it via a provider."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Performance notes"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Lifting state causes the parent to re-render; children re-render by default. Optimize only if it shows up as a hotspot."}),e.jsxs("li",{children:["Stabilize callbacks with ",e.jsx(t.InlineCode,{children:"useCallback"})," when passing to memoized children (avoid unnecessary child renders)."]}),e.jsx("li",{children:"For very broad sharing, use context selectors or split providers to avoid re-rendering large trees."})]}),e.jsx(t.Pre,{children:"const onChange = React.useCallback((v) => setQuery(v), []); // stable ref for memoized SearchBox"})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Common pitfalls"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Duplicating state in multiple places (two sources of truth) → inconsistent UI. Keep one source and derive the rest."}),e.jsx("li",{children:"Storing derived data (filtered arrays, totals) as state → can go stale. Compute during render or memoize."}),e.jsx("li",{children:"Over-lifting when only one component uses the value → unnecessary prop chains; colocate instead."}),e.jsx("li",{children:"Passing internal design flags down to DOM (leaks) when forwarding props; filter non-DOM props."})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do / Don’t"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep a single source of truth for shared data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," pass controlled props (value, onChange) to children that display/edit the data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," derive values instead of duplicating state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," consider context when prop chains get deep."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," lift state higher than necessary."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," keep independent copies of the same data in multiple siblings."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," store filtered/sorted versions as separate state unless there is a proven need."]})]})]}),e.jsx(t.Callout,{children:"Summary: lift state to the nearest common parent to synchronize UIs, keep one source of truth, pass value and onChange down to controlled children, and compute derivatives instead of duplicating state. Use context to avoid long prop chains when sharing broadly."})]});export{i as default};
