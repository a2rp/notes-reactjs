import{j as e}from"./index-BRArnZ3i.js";import{S as n}from"./styled-GV5M46KG.js";const s=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Composition"}),e.jsxs(n.Lead,{children:["Composition builds complex UIs by combining small components. Instead of inheritance, React favors composing behavior and layout through props,",e.jsx(n.InlineCode,{children:"children"}),", slots, and context."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Terminology"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Composition:"})," assembling components together so each focuses on one job and the combination delivers the feature."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Containment:"})," a component that renders arbitrary content via ",e.jsx(n.InlineCode,{children:"children"})," (e.g., a card or layout shell)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Specialization:"})," a component that renders a more specific variant of another by passing props/children (no inheritance)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Slot:"})," a placeholder region in a component. Default slot is ",e.jsx(n.InlineCode,{children:"children"}),"; named slots are explicit props like ",e.jsx(n.InlineCode,{children:"header"}),", ",e.jsx(n.InlineCode,{children:"footer"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Render prop:"})," a prop whose value is a function returning JSX; the child calls it to let the parent decide presentation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Compound components:"})," coordinated components under one parent (e.g., ",e.jsx(n.InlineCode,{children:"Tabs"}),", ",e.jsx(n.InlineCode,{children:"Tabs.List"}),", ",e.jsx(n.InlineCode,{children:"Tabs.Panel"}),"), usually wired via context."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Headless component:"})," a component that provides behavior/state but no styling; callers compose the UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Context provider:"})," supplies values to descendants to avoid prop drilling; consumers subscribe via ",e.jsx(n.InlineCode,{children:"useContext"}),"."]})]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Containment with ",e.jsx("code",{children:"children"})]}),e.jsx("p",{children:"Use a wrapper to provide structure; callers provide the inner content."}),e.jsx(n.Pre,{children:`function Card({ title, children }) {
  return (
    <section className="card">
      <h3>{title}</h3>
      <div className="card__body">{children}</div>
    </section>
  );
}

// Usage
<Card title="Profile">
  <Avatar />
  <p>Intro text...</p>
</Card>`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Named slots (structured regions)"}),e.jsx("p",{children:"Expose distinct areas when layout has fixed regions."}),e.jsx(n.Pre,{children:`function Panel({ header, children, footer }) {
  return (
    <section className="panel">
      {header && <header className="panel__hd">{header}</header>}
      <div className="panel__bd">{children}</div>
      {footer && <footer className="panel__ft">{footer}</footer>}
    </section>
  );
}

// Usage
<Panel
  header={<h4>Settings</h4>}
  footer={<button>Save</button>}
>
  <Form />
</Panel>`}),e.jsxs(n.Small,{children:["Prefer slots when the structure is known; prefer a single ",e.jsx("code",{children:"children"})," for free-form content."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Specialization (without inheritance)"}),e.jsx("p",{children:"Create specialized variants by composing and pre-filling props."}),e.jsx(n.Pre,{children:`function Button({ variant = "primary", ...rest }) {
  return <button className={\`btn btn--\${variant}\`} {...rest} />;
}

function PrimaryButton(props) {
  return <Button variant="primary" {...props} />;
}
function DangerButton(props) {
  return <Button variant="danger" {...props} />;
}

// Usage
<PrimaryButton onClick={...}>Save</PrimaryButton>`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Render props & function-as-children"}),e.jsx("p",{children:"Expose state/behavior and delegate rendering to callers."}),e.jsx(n.Pre,{children:`function Toggle({ children }) {
  const [on, setOn] = React.useState(false);
  const api = { on, toggle: () => setOn(o => !o) };
  return <>{typeof children === "function" ? children(api) : children}</>;
}

// Usage (FaC)
<Toggle>
  {({ on, toggle }) => (
    <button aria-pressed={on} onClick={toggle}>
      {on ? "On" : "Off"}
    </button>
  )}
</Toggle>`}),e.jsx(n.Small,{children:"Use render props when callers must fully control markup; otherwise, favor simpler slot props."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Compound components (context-powered)"}),e.jsx("p",{children:"Coordinate pieces with shared state via context for a clean, declarative API."}),e.jsx(n.Pre,{children:`const TabsContext = React.createContext(null);

function Tabs({ value, onChange, children }) {
  const ctx = React.useMemo(() => ({ value, onChange }), [value, onChange]);
  return <TabsContext.Provider value={ctx}>{children}</TabsContext.Provider>;
}

function TabsList({ children }) {
  return <div role="tablist">{children}</div>;
}

function Tab({ value, children }) {
  const ctx = React.useContext(TabsContext);
  const selected = ctx.value === value;
  return (
    <button role="tab" aria-selected={selected} onClick={() => ctx.onChange?.(value)}>
      {children}
    </button>
  );
}

function TabPanel({ value, children }) {
  const ctx = React.useContext(TabsContext);
  if (ctx.value !== value) return null;
  return <div role="tabpanel">{children}</div>;
}

// Usage
<Tabs value={active} onChange={setActive}>
  <TabsList>
    <Tab value="a">A</Tab>
    <Tab value="b">B</Tab>
  </TabsList>
  <TabPanel value="a">Panel A</TabPanel>
  <TabPanel value="b">Panel B</TabPanel>
</Tabs>`}),e.jsx(n.Small,{children:"This avoids prop drilling and keeps markup expressive."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Headless components (behavior only)"}),e.jsx("p",{children:"Provide logic/state with zero styling; callers render UI."}),e.jsx(n.Pre,{children:`function ListFilter({ items, children }) {
  const [q, setQ] = React.useState("");
  const filtered = React.useMemo(
    () => items.filter(x => x.toLowerCase().includes(q.toLowerCase())),
    [items, q]
  );
  return children({ q, setQ, filtered });
}

// Usage
<ListFilter items={["Ada", "Linus", "Grace"]}>
  {({ q, setQ, filtered }) => (
    <>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" />
      <ul>{filtered.map(x => <li key={x}>{x}</li>)}</ul>
    </>
  )}
</ListFilter>`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Provider composition (cross-cutting concerns)"}),e.jsx("p",{children:"Compose app-wide concerns (theme, router, auth) with provider trees."}),e.jsx(n.Pre,{children:`function AppProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router}>{children}</RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// index.jsx
<AppProviders>
  <App />
</AppProviders>`}),e.jsx(n.Small,{children:"Order matters: inner providers can read values from outer ones."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Polymorphic components & refs"}),e.jsx("p",{children:"Let callers change the underlying tag while preserving behavior and refs."}),e.jsx(n.Pre,{children:`const Box = React.forwardRef(function Box({ as: Comp = "div", className, ...rest }, ref) {
  return <Comp ref={ref} className={["box", className].filter(Boolean).join(" ")} {...rest} />;
});`}),e.jsxs(n.Small,{children:["Ensure semantics and a11y when switching roles (e.g., ",e.jsx("code",{children:"a"})," vs ",e.jsx("code",{children:"button"}),")."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Anti-patterns & pitfalls"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Inheritance:"})," React favors composition. Avoid class hierarchies; prefer wrapping and prop forwarding."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Deep prop drilling:"})," passing props through many layers. Use context/compound patterns."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Leaking internal flags to DOM:"})," filter non-DOM props (",e.jsx(n.InlineCode,{children:"variant"}),", ",e.jsx(n.InlineCode,{children:"size"}),") before spreading."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Over-cloning children:"})," ",e.jsx(n.InlineCode,{children:"cloneElement"})," couples parent/child tightly; prefer context or explicit props."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rigid “God components”:"})," huge components that do everything. Extract smaller pieces; accept slots/children."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do / Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," compose via children/slots for flexible layouts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use context for shared state and compound components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," favor headless components when callers must control markup."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep pieces small and focused; pass behavior via callbacks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," inherit from other components; specialize by composing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," drill props deeply; lift or use context instead."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," hardcode tags where flexibility is needed—offer an ",e.jsx(n.InlineCode,{children:"as"})," prop carefully."]})]})]}),e.jsx(n.Callout,{children:"Summary: composition is the core design tool in React. Prefer children/slots for structure, render props or headless components for customization, and context for shared state. Avoid inheritance, deep prop drilling, and tight coupling via cloning."})]});export{s as default};
