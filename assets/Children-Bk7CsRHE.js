import{j as e}from"./index-DXTGIo8z.js";import{S as n}from"./styled-CxXgeYHv.js";const r=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Children"}),e.jsxs(n.Lead,{children:["The ",e.jsx(n.InlineCode,{children:"children"})," prop is whatever JSX appears between a component’s opening and closing tags. It enables composition: parents wrap structure; callers supply content."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Terminology"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"children (prop):"})," implicit prop containing nested JSX/content inside"," ",e.jsx(n.InlineCode,{children:"<Component> ... </Component>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Slot:"})," a place where content is inserted. In React, ",e.jsx("em",{children:"default slot"})," is"," ",e.jsx(n.InlineCode,{children:"children"}),"; ",e.jsx("em",{children:"named slots"})," are explicit props like"," ",e.jsx(n.InlineCode,{children:"header"}),", ",e.jsx(n.InlineCode,{children:"footer"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Render prop:"})," a prop whose value is a function that returns JSX, called by the child to render part of its UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Function-as-children (FaC):"})," using ",e.jsx(n.InlineCode,{children:"children"})," as a function (a specific render-prop style)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Compound components:"})," a set of components that work together under one parent (e.g.,"," ",e.jsx(n.InlineCode,{children:"Tabs"})," with ",e.jsx(n.InlineCode,{children:"Tabs.List"}),","," ",e.jsx(n.InlineCode,{children:"Tabs.Panel"}),") often coordinated via context."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cloning children:"})," using ",e.jsx(n.InlineCode,{children:"React.cloneElement"})," to inject props into direct children (use sparingly; prefer context)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Basics: receiving and rendering children"}),e.jsx(n.Pre,{children:`function Card({ title, children }) {
  return (
    <section className="card">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

// Usage
<Card title="Hello">
  <p>Body text</p>
  <button>Action</button>
</Card>`}),e.jsxs(n.Small,{children:["Children can be text, elements, arrays of elements, ",e.jsx(n.InlineCode,{children:"null"}),", or"," ",e.jsx(n.InlineCode,{children:"false"}),". ",e.jsx("em",{children:"Falsy"})," values (except 0) render nothing."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Named slots (multiple content areas)"}),e.jsx("p",{children:"Use explicit props for distinct regions (header/body/footer) instead of overloading one children block."}),e.jsx(n.Pre,{children:`function Panel({ header, children, footer }) {
  return (
    <section className="panel">
      {header && <header>{header}</header>}
      <div>{children}</div>
      {footer && <footer>{footer}</footer>}
    </section>
  );
}

// Usage
<Panel
  header={<h4>Title</h4>}
  footer={<small>© Company</small>}
>
  <p>Body</p>
</Panel>`}),e.jsxs(n.Small,{children:["Pick named slots when layout has fixed regions. Use default"," ",e.jsx(n.InlineCode,{children:"children"})," when only one free-form region is needed."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Render props & function-as-children"}),e.jsx("p",{children:"A render prop lets the parent supply a function to generate part of the UI, often using state exposed by the child."}),e.jsx(n.Pre,{children:`// Render prop via named prop
function Toggle({ children, render }) {
  const [on, setOn] = React.useState(false);
  const api = { on, toggle: () => setOn(o => !o) };
  return <>{render ? render(api) : children?.(api)}</>;
}

// As 'render'
<Toggle render={({ on, toggle }) => (
  <button aria-pressed={on} onClick={toggle}>
    {on ? "On" : "Off"}
  </button>
)} />

// Function-as-children (FaC)
<Toggle>
  {({ on, toggle }) => (
    <label>
      <input type="checkbox" checked={on} onChange={toggle} />
      {on ? "Enabled" : "Disabled"}
    </label>
  )}
</Toggle>`}),e.jsxs(n.Small,{children:["Render props give control to callers. Prefer them when the parent must decide ",e.jsx("em",{children:"how"})," to render using data from the child."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Compound components (coordinated via context)"}),e.jsx("p",{children:"Let callers compose pieces while the parent coordinates state via context."}),e.jsx(n.Pre,{children:`const TabsContext = React.createContext(null);

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
    <button
      role="tab"
      aria-selected={selected}
      onClick={() => ctx.onChange?.(value)}
    >
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
</Tabs>`}),e.jsx(n.Small,{children:"This pattern avoids prop drilling and keeps a clean, declarative API."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Cloning children (advanced)"}),e.jsxs("p",{children:[e.jsx(n.InlineCode,{children:"React.cloneElement"})," injects extra props into a direct child. Prefer context or explicit props first."]}),e.jsx(n.Pre,{children:`function Toolbar({ children, size = "md" }) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, { "data-size": size });
  });
}

// Usage
<Toolbar size="lg">
  <button>Save</button>
  <button>Export</button>
</Toolbar>`}),e.jsx(n.Small,{children:"Cloning ties the parent to child element types; avoid deep magic. Never pass internal flags to the DOM accidentally."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"React.Children utilities"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"Children.map(children, fn)"})," — safe map over possibly-single or array children."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"Children.toArray(children)"})," — flattens and adds keys where needed."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"Children.only(children)"})," — asserts exactly one child."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"Children.count(children)"})," — counts children."]})]}),e.jsx(n.Pre,{children:`const items = React.Children.toArray(children);
// useful when expecting multiple and need stable keys`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Passing components vs elements"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Element"})," (e.g., ",e.jsx(n.InlineCode,{children:"<Icon />"}),"): already created. The receiver renders it directly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Component type"})," (e.g., ",e.jsx(n.InlineCode,{children:"Icon"}),"): a function; the receiver can choose props and when to render."]})]}),e.jsx(n.Pre,{children:`function Box({ icon: Icon, children }) {   // component type
  return <div className="box">{Icon && <Icon size={16} />}{children}</div>;
}

// <Box icon={StarIcon}>Starred</Box>`}),e.jsx(n.Small,{children:"Choose element when the caller controls the instance; choose component type when the receiver should control props/placement."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility notes"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Do not wrap required list/table semantics with generic elements; use fragments where wrappers would be invalid."}),e.jsxs("li",{children:["When conditionally revealing children, manage focus and announce updates (",e.jsx(n.InlineCode,{children:"aria-live"}),") where appropriate."]}),e.jsxs("li",{children:["Named slots like ",e.jsx(n.InlineCode,{children:"header"}),"/",e.jsx(n.InlineCode,{children:"footer"})," should render semantic"," ",e.jsx(n.InlineCode,{children:"<header>"}),"/",e.jsx(n.InlineCode,{children:"<footer>"})," when meaningful."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common pitfalls"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Assuming ",e.jsx(n.InlineCode,{children:"children"})," is an array—single child is not an array. Use ",e.jsx(n.InlineCode,{children:"Children"})," helpers."]}),e.jsx("li",{children:"Overusing cloning to force behavior—prefer context or explicit props."}),e.jsx("li",{children:"Leaking internal flags to DOM elements when cloning/spreading."}),e.jsx("li",{children:"Using functions as children everywhere—keep APIs simple unless customization is required."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do / Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(n.InlineCode,{children:"children"})," for free-form content areas."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," add named slots when layout has distinct regions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use render props/FaC when the caller must control rendering using state from the child."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use context for compound components to avoid prop drilling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," rely on cloning by default; prefer clearer data flow."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," assume ",e.jsx(n.InlineCode,{children:"children"})," is always an array; handle singletons safely."]})]})]}),e.jsxs(n.Callout,{children:["Summary: ",e.jsx(n.InlineCode,{children:"children"})," powers composition. Use it for flexible content, add named slots for structure, reach for render props when customization is needed, and prefer context over cloning for compound patterns."]})]});export{r as default};
