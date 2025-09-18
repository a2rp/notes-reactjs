import{j as e}from"./index-CEhT6f_w.js";import{S as n}from"./styled-Afn5Zkt9.js";const t=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Controlled vs Uncontrolled"}),e.jsxs(n.Lead,{children:["Form inputs can be handled in two ways: ",e.jsx("b",{children:"controlled"})," (React state is the source of truth) or ",e.jsx("b",{children:"uncontrolled"})," (the DOM input keeps its own value and React reads it when needed). Pick deliberately based on validation, UX, and performance needs."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Terminology (precise)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Controlled input:"})," an input whose displayed value comes from React state via"," ",e.jsx(n.InlineCode,{children:"value"}),"/",e.jsx(n.InlineCode,{children:"checked"}),". Changes are handled by"," ",e.jsx(n.InlineCode,{children:"onChange"})," which updates state. React state is the ",e.jsx("em",{children:"source of truth"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled input:"})," an input that manages its own value internally. Initial value is set with"," ",e.jsx(n.InlineCode,{children:"defaultValue"}),"/",e.jsx(n.InlineCode,{children:"defaultChecked"}),". Read the value via the DOM (refs) or form submission."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Source of truth:"})," where the canonical value lives—React state for controlled, the DOM for uncontrolled."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Ref:"})," an object with ",e.jsx(n.InlineCode,{children:".current"})," used to imperatively access a DOM node or component instance."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Validation:"})," checking user input rules (required, pattern, min/max) either with native HTML attributes or custom logic."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hydration mismatch (SSR):"})," when server-rendered markup/values differ from the first client render, React warns. Consistent controlled/uncontrolled choice avoids this."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Controlled inputs (basic)"}),e.jsx(n.Pre,{children:`import { useState } from "react";

function SignupControlled() {
  const [name, setName] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    console.log({ name, newsletter }); // values from React state
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
      />

      <label>
        <input
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
        />
        Subscribe
      </label>

      <button type="submit">Create</button>
    </form>
  );
}`}),e.jsx(n.Small,{children:"Benefits: real-time validation, conditional UI, masking/formatting, single place (state) to read/modify values."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Uncontrolled inputs (basic)"}),e.jsx(n.Pre,{children:`import { useRef } from "react";

function SignupUncontrolled() {
  const nameRef = useRef(null);
  const newsRef = useRef(null);

  function onSubmit(e) {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,           // read from DOM
      newsletter: newsRef.current.checked    // read from DOM
    };
    console.log(payload);
    e.target.reset(); // native reset clears uncontrolled inputs
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" defaultValue="" ref={nameRef} autoComplete="name" />
      <label>
        <input type="checkbox" defaultChecked={false} ref={newsRef} />
        Subscribe
      </label>
      <button type="submit">Create</button>
    </form>
  );
}`}),e.jsx(n.Small,{children:"Benefits: minimal state wiring, good for large/rarely-validated forms or simple “read on submit” flows. Native browser features (autofill, undo) work naturally."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"When to choose which"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Choose controlled"})," when UI reacts to every keystroke: live validation, formatting (masks), conditional enable/disable, character counters, instant previews, search-as-you-type, multi-field dependencies."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Choose uncontrolled"})," when reading values only on submit, for large forms with simple rules, performance-sensitive inputs that don’t need per-keystroke logic, or special inputs like file pickers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hybrid"}),": uncontrolled for keystrokes, but sync to state on ",e.jsx(n.InlineCode,{children:"onBlur"})," or submit. Another hybrid is controlled value plus debounced side effects."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Edge cases & practical patterns"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Number inputs:"})," input values are strings; convert safely (allow empty). Use ",e.jsx(n.InlineCode,{children:'inputMode="numeric"'})," and/or ",e.jsx(n.InlineCode,{children:"pattern"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Checkbox/Radio:"})," controlled via ",e.jsx(n.InlineCode,{children:"checked"})," (not ",e.jsx(n.InlineCode,{children:"value"}),"), read ",e.jsx(n.InlineCode,{children:"e.target.checked"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Select:"})," controlled via ",e.jsx(n.InlineCode,{children:"value"}),"; multiple select uses an ",e.jsx(n.InlineCode,{children:"array"})," of selected values."]}),e.jsxs("li",{children:[e.jsx("b",{children:"File inputs:"})," keep ",e.jsx("em",{children:"uncontrolled"}),". Access files via ",e.jsx(n.InlineCode,{children:"e.target.files"})," or a ref. Browsers restrict programmatic setting for security."]}),e.jsxs("li",{children:[e.jsx("b",{children:"IME/composition"})," (e.g., Chinese/Japanese): avoid blocking updates; let the browser complete composition before formatting text."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Debouncing:"})," keep input controlled but debounce expensive effects (search/filter) rather than keystroke updates themselves."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus management:"})," use refs to focus/scroll to invalid fields on submit."]})]}),e.jsx(n.Pre,{children:`// Number input: allow empty string; parse only when non-empty
const [age, setAge] = React.useState("");
function onAgeChange(e) {
  const v = e.target.value;         // string
  if (v === "" || /^[0-9]+$/.test(v)) setAge(v);
}
const ageNum = age === "" ? undefined : Number(age);`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Avoid switching controlled ↔ uncontrolled"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"React warns if an input changes from uncontrolled to controlled (or back). Keep the mode consistent."}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled rule:"})," always pass ",e.jsx(n.InlineCode,{children:"value"}),"/",e.jsx(n.InlineCode,{children:"checked"}),". Use ",e.jsx(n.InlineCode,{children:'""'})," (empty string) rather than ",e.jsx(n.InlineCode,{children:"undefined"})," for text inputs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled rule:"})," don’t pass ",e.jsx(n.InlineCode,{children:"value"}),"; set only ",e.jsx(n.InlineCode,{children:"defaultValue"}),"."]})]}),e.jsx(n.Pre,{children:`// ❌ Bad: sometimes undefined, sometimes string → switches mode
<input value={maybeUndefined} onChange={...} />

// ✅ Good controlled: always a string ("" for empty)
<input value={text} onChange={e => setText(e.target.value)} />

// ✅ Good uncontrolled: use defaultValue once; read via ref
<input defaultValue="initial" ref={ref} />`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Validation patterns"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Native:"})," use ",e.jsx(n.InlineCode,{children:"required"}),", ",e.jsx(n.InlineCode,{children:"minLength"}),", ",e.jsx(n.InlineCode,{children:"pattern"}),". Read"," ",e.jsx(n.InlineCode,{children:"input.validity"})," for details and show messages in an"," ",e.jsx(n.InlineCode,{children:'aria-live="polite"'})," region."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled custom:"})," validate on change/blur and set ",e.jsx(n.InlineCode,{children:"aria-invalid"}),", link help text with"," ",e.jsx(n.InlineCode,{children:"aria-describedby"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Forms at scale:"})," consider form libraries (react-hook-form, Formik, React Aria components, etc.) that handle touched, errors, and performance."]})]}),e.jsx(n.Pre,{children:`function Field({ value, onChange, label, id, error }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? id + "-err" : undefined}
      />
      {error && <small id={id + "-err"} aria-live="polite">{error}</small>}
    </div>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Hybrid patterns"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Blur commit:"})," uncontrolled during typing, commit to state on ",e.jsx(n.InlineCode,{children:"onBlur"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keyed reset:"})," uncontrolled field where resetting is done by changing a ",e.jsx(n.InlineCode,{children:"key"})," on the input."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Debounced effects:"})," controlled value but side effects (API calls) are debounced/throttled."]})]}),e.jsx(n.Pre,{children:`// Blur commit example
function BlurCommit() {
  const ref = React.useRef(null);
  const [committed, setCommitted] = React.useState("");
  return (
    <>
      <input defaultValue="" ref={ref} onBlur={() => setCommitted(ref.current.value)} />
      <p>Committed: {committed}</p>
    </>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"SSR & hydration notes"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Keep the mode and initial value consistent on server and client."}),e.jsx("li",{children:"For controlled text inputs, ensure the client’s initial state matches the HTML or React will warn."}),e.jsxs("li",{children:["For uncontrolled, prefer ",e.jsx(n.InlineCode,{children:"defaultValue"})," so the DOM owns the initial value on both sides."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do / Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," pick one mode per field and stick to it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use controlled for live validation/formatting and complex interactions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep controlled values as strings (parse later); for checkboxes use ",e.jsx(n.InlineCode,{children:"checked"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep file inputs uncontrolled and read via ",e.jsx(n.InlineCode,{children:"files"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," switch controlled ↔ uncontrolled mid-lifecycle."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," use ",e.jsx(n.InlineCode,{children:"value"})," without an ",e.jsx(n.InlineCode,{children:"onChange"})," handler (field becomes read-only)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," eagerly coerce to numbers; allow empty strings to avoid jitter and cursor bugs."]})]})]}),e.jsx(n.Callout,{children:"Summary: controlled inputs give full, immediate control and visibility; uncontrolled inputs are simple and performant when values are only needed at specific times. Choose based on UX, validation, and scale, and keep the mode consistent to avoid warnings and subtle bugs."})]});export{t as default};
