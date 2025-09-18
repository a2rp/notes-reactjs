import{j as e}from"./index-BExKNf87.js";import{S as i}from"./styled-DZaESytJ.js";const l=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"useId"}),e.jsxs(i.Lead,{children:[e.jsx(i.InlineCode,{children:"useId()"})," returns a ",e.jsx("b",{children:"stable, unique ID string per component instance"}),", consistent across server and client. Use it to wire up accessible relationships (",e.jsx("em",{children:"label ↔ input"}),",",e.jsx("em",{children:"aria-describedby"}),", ",e.jsx("em",{children:"aria-labelledby"}),", SVG defs, etc.). Not for list keys or persistence."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Signature & terminology"}),e.jsx(i.Pre,{children:'const id = useId(); // -> string like ":r1:", stable for this instance'}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Stable per instance:"})," the value stays the same for the lifetime of the component."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SSR-safe:"})," React ensures the same ID on server and client to avoid hydration mismatches."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Derived IDs:"})," create multiple related IDs from one base (e.g., ",e.jsxs(i.InlineCode,{children:["\\`\\$","id","-label\\`"]}),")."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Form labels (accessible association)"}),e.jsx(i.Pre,{children:`import { useId } from "react";

function EmailField() {
  const id = useId();                    // base
  const inputId = id + "-input";         // derived
  const helpId  = id + "-help";          // derived

  return (
    <div>
      <label htmlFor={inputId}>Email</label>
      <input id={inputId} type="email" aria-describedby={helpId} />
      <small id={helpId}>We'll never share your email.</small>
    </div>
  );
}`}),e.jsxs(i.Small,{children:["One call to ",e.jsx("code",{children:"useId"})," can safely drive multiple IDs for related elements."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Multiple related IDs (memoize the bundle)"}),e.jsx(i.Pre,{children:`function PriceInput() {
  const base = React.useId();
  const ids = React.useMemo(() => ({
    label: base + "-label",
    input: base + "-input",
    hint:  base + "-hint",
  }), [base]);

  return (
    <div>
      <label id={ids.label} htmlFor={ids.input}>Price</label>
      <input id={ids.input} aria-labelledby={ids.label} aria-describedby={ids.hint} inputMode="decimal" />
      <small id={ids.hint}>Numbers only, no currency symbol.</small>
    </div>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Using ",e.jsx("code",{children:"useId"})," in lists"]}),e.jsx(i.Pre,{children:`function TodoItem({ todo }) {
  const id = React.useId();
  const checkboxId = id + "-chk";
  return (
    <li>
      <input id={checkboxId} type="checkbox" defaultChecked={todo.done} />
      <label htmlFor={checkboxId}>{todo.text}</label>
    </li>
  );
}

function TodoList({ items }) {
  return <ul>{items.map(t => <TodoItem key={t.id} todo={t} />)}</ul>;
}`}),e.jsxs(i.Small,{children:["Safe to call inside each item component. ",e.jsx("b",{children:"Do not"})," use ",e.jsx("code",{children:"useId"})," for React ",e.jsx("code",{children:"key"}),"s; use stable data keys (e.g., database IDs)."]})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["SVG ",e.jsx("code",{children:"<defs>"})," IDs (no collisions)"]}),e.jsx(i.Pre,{children:`function Avatar({ src }) {
  const id = React.useId();
  const clipId = id + "-clip";
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" role="img" aria-label="Avatar">
      <defs>
        <clipPath id={clipId}>
          <circle cx="24" cy="24" r="22" />
        </clipPath>
      </defs>
      <image href={src} width="48" height="48" clipPath={"url(#" + clipId + ")"} />
    </svg>
  );
}`}),e.jsx(i.Small,{children:"Each instance gets unique IDs, preventing clashes when multiple avatars render on the same page."})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"SSR & hydration notes"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Consistent IDs:"})," ",e.jsx("code",{children:"useId"})," avoids mismatches between server-rendered markup and client hydration."]}),e.jsx("li",{children:"Ensure hooks are called in the same order on server and client; conditional hooks can break stability."}),e.jsxs("li",{children:["Do not serialize ",e.jsx("code",{children:"useId"})," values to store in databases or URLs; they are instance-local, not durable."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Patterns & recipes"}),e.jsx(i.Pre,{children:`// 1) Fieldset with described-by and error id
function Field({ label, error, children }) {
  const id = React.useId();
  const inputId = id + "-input";
  const errId   = id + "-error";
  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      {React.cloneElement(children, { id: inputId, "aria-describedby": error ? errId : undefined })}
      {error && <div id={errId} role="alert">{error}</div>}
    </div>
  );
}

// 2) Tabs (aria-controls, aria-labelledby)
function Tab({ idBase, isActive, onSelect, children }) {
  const tabId = idBase + "-tab";
  const panelId = idBase + "-panel";
  return (
    <>
      <button id={tabId} aria-controls={panelId} aria-selected={isActive} onClick={onSelect}>
        {children}
      </button>
      {isActive && <div id={panelId} role="tabpanel" aria-labelledby={tabId}>Panel</div>}
    </>
  );
}
function Tabs() {
  const base = React.useId();
  // pass base down to derive related ids in a stable way
  return <Tab idBase={base} isActive onSelect={() => {}}>First</Tab>;
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Common pitfalls"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Using ",e.jsx("code",{children:"useId"})," for ",e.jsx("b",{children:"React keys"})," — keys must come from data, not generated per render."]}),e.jsxs("li",{children:["Expecting ",e.jsx("code",{children:"useId"})," to be stable across sessions or page loads — it is not a persistent identifier."]}),e.jsx("li",{children:"Calling hooks conditionally and changing the order → breaks stability (and violates the Rules of Hooks)."}),e.jsxs("li",{children:["Generating a new object for ",e.jsx("code",{children:"value"})," on every render when passing IDs via context; memoize bundles if needed."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do / Don’t"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx("code",{children:"useId"})," to connect form controls and ARIA relationships."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," derive multiple related IDs from a single base and memoize if bundling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use it for SSR-safe uniqueness (forms, SVG defs, aria attributes)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," use it for list keys, database IDs, or anything that must persist outside the component."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," call it conditionally; keep hook order consistent."]})]})]}),e.jsxs(i.Callout,{children:["Summary: ",e.jsx(i.InlineCode,{children:"useId"})," provides SSR-safe unique IDs for accessibility and DOM associations. Derive related IDs from one base, avoid using it for keys or persistence, and keep hook order consistent."]})]});export{l as default};
