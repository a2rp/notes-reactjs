import{j as e}from"./index-CDxhzYTb.js";import{S as s}from"./styled-BysIgpTf.js";const l=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Slots (Composition with Named Areas)"}),e.jsxs(s.Lead,{children:["A ",e.jsx("b",{children:"slot"})," is a placeholder area inside a component that callers can fill with their own UI. Slots let you customize parts of a component without forking or tightly coupling to its internals."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Key Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Slot:"})," a named placeholder inside a component (e.g.,"," ",e.jsx(s.InlineCode,{children:"header"}),","," ",e.jsx(s.InlineCode,{children:"actions"}),","," ",e.jsx(s.InlineCode,{children:"footer"}),") that the consumer can supply."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Default slot:"})," the unnamed/primary area for general content, usually passed as ",e.jsx(s.InlineCode,{children:"children"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Named slot:"})," a specific area exposed via a prop like"," ",e.jsx(s.InlineCode,{children:"header"})," or"," ",e.jsx(s.InlineCode,{children:"footer"})," that accepts a React node or a render function."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Render prop:"})," a function prop (e.g.,"," ",e.jsx(s.InlineCode,{children:"(ctx) => ReactNode"}),") that the component calls to render a slot with access to internal state or helpers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Headless component:"})," a component that provides logic/state but no fixed visuals; visuals are provided via slots/render props."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Compound components:"})," a related pattern where you provide subcomponents like ",e.jsx(s.InlineCode,{children:"<Card.Header />"}),"; slots often feel similar but are passed via props instead of child types."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why Use Slots?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Flexibility:"})," callers can inject any UI (buttons, menus, badges) where the component expects it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Separation of concerns:"})," parent owns structure, behavior, and accessibility; consumers own visuals for specific areas."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reusability:"})," one component adapts to many use cases via its slots."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Example 1 — Named Slots as Nodes"}),e.jsx(s.Pre,{children:`// Card exposes three slots: header, children (default), footer
function Card({ header, children, footer }) {
  return (
    <section className="card">
      {header && <header className="card__header">{header}</header>}
      <div className="card__body">{children}</div>
      {footer && <footer className="card__footer">{footer}</footer>}
    </section>
  );
}

// Usage
<Card
  header={<h3>User Profile</h3>}
  footer={<small>Last updated 2m ago</small>}
>
  <p>Content goes here...</p>
</Card>`}),e.jsxs(s.Small,{children:["Here ",e.jsx(s.InlineCode,{children:"children"})," is the default slot; ",e.jsx(s.InlineCode,{children:"header"})," and"," ",e.jsx(s.InlineCode,{children:"footer"})," are named slots."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Example 2 — Slots as Render Props"}),e.jsx(s.List,{children:e.jsxs("li",{children:["Use a render prop when the slot needs ",e.jsx("b",{children:"access to internal state"})," ","or actions (e.g., open/close, selection)."]})}),e.jsx(s.Pre,{children:`function Disclosure({ header, children, footer }) {
  const [open, setOpen] = React.useState(false);
  const ctx = {
    open,
    toggle: () => setOpen(o => !o),
    close: () => setOpen(false),
    openFn: () => setOpen(true),
  };

  const render = (slot) =>
    typeof slot === "function" ? slot(ctx) : slot ?? null;

  return (
    <section className="disclosure">
      <header>{render(header)}</header>
      {open && <div className="disclosure__panel">{render(children)}</div>}
      <footer>{render(footer)}</footer>
    </section>
  );
}

// Usage with render props
<Disclosure
  header={({ open, toggle }) => (
    <button onClick={toggle}>
      {open ? "Hide details" : "Show details"}
    </button>
  )}
  footer={({ open }) => (open ? <small>Open</small> : <small>Closed</small>)}
>
  {() => <p>Secret content...</p>}
</Disclosure>`}),e.jsxs(s.Small,{children:["The consumer provides functions that receive"," ",e.jsx(s.InlineCode,{children:"ctx"})," to render dynamic UI."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Example 3 — Mixing Slots & Compound Components"}),e.jsx(s.List,{children:e.jsxs("li",{children:["Some teams use ",e.jsx("b",{children:"slots for quick injection"})," and"," ",e.jsx("b",{children:"compound components"})," for larger structures."]})}),e.jsx(s.Pre,{children:`function Panel({ title, actions, children }) {
  return (
    <section className="panel">
      <div className="panel__bar">
        <h4 className="panel__title">{title}</h4>
        <div className="panel__actions">{actions}</div>
      </div>
      <div className="panel__content">{children}</div>
    </section>
  );
}

// Usage
<Panel
  title="Settings"
  actions={<><button>Save</button><button>Reset</button></>}
>
  <form>{/* fields */}</form>
</Panel>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Accessibility (A11y) with Slots"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Parent should own the ",e.jsx("b",{children:"semantic structure"})," (landmarks, headings, roles, aria attributes)."]}),e.jsxs("li",{children:["If a slot is meant for an ",e.jsx("b",{children:"interactive control"})," (e.g., actions), document the expectation so consumers pass focusable elements."]}),e.jsxs("li",{children:["For collapsible/expandable sections, manage"," ",e.jsx(s.InlineCode,{children:"aria-expanded"}),","," ",e.jsx(s.InlineCode,{children:"aria-controls"}),", and keyboard interactions at the parent level."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"API Design Tips"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Prefer ",e.jsx("b",{children:"node slots"})," (simple React nodes) when state access is not required."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"render props"})," for slots that need access to internal state or helpers."]}),e.jsxs("li",{children:["Keep slot names ",e.jsx("b",{children:"descriptive"})," (e.g.,"," ",e.jsx(s.InlineCode,{children:"header"}),","," ",e.jsx(s.InlineCode,{children:"actions"}),","," ",e.jsx(s.InlineCode,{children:"footer"}),")."]}),e.jsxs("li",{children:["Support a ",e.jsx("b",{children:"default slot"})," via"," ",e.jsx(s.InlineCode,{children:"children"}),"."]}),e.jsx("li",{children:"If slots must be optional, document defaults and null handling."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep the parent responsible for layout, behavior, and accessibility; let slots focus on visuals/content."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," memoize heavy slot content or pass stable handlers when rendering large lists."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," leak internal DOM structure; avoid requiring consumers to target inner selectors."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," overuse render props when a simple node slot works just fine (simpler is better)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Children:"})," the default slot content between opening/closing tags of a component."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Node slot:"})," slot prop that accepts any React node (element, string, fragment)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Render prop slot:"})," slot prop that is a function called with context to produce UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Context:"})," a React mechanism to share values with descendants; sometimes used with headless/slot patterns."]})]})]}),e.jsx(s.Callout,{children:"Summary: Slots let components expose flexible, named areas that consumers can fill with custom UI. Start with node slots for simple customization; upgrade to render-prop slots when consumers need access to internal state or actions."})]});export{l as default};
