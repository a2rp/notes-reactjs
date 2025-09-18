import{j as e}from"./index-C1_RbWbm.js";import{S as n}from"./styled-4jn-LFbN.js";const t=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Uncontrolled Inputs"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Uncontrolled inputs"})," let the browser manage the input’s current value, while React reads that value only when needed (e.g., on submit). You don’t pass a"," ",e.jsx(n.InlineCode,{children:"value"})," prop; instead you use"," ",e.jsx(n.InlineCode,{children:"defaultValue"})," /"," ",e.jsx(n.InlineCode,{children:"defaultChecked"})," for initial state and read the value via a ",e.jsx(n.InlineCode,{children:"ref"}),", the event target, or"," ",e.jsx(n.InlineCode,{children:"FormData"}),"."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Controlled input:"})," React holds the source of truth in state and sets"," ",e.jsx(n.InlineCode,{children:"value"})," each render; user edits call"," ",e.jsx(n.InlineCode,{children:"setState"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled input:"})," the browser holds the current value; React only"," ",e.jsx("em",{children:"reads"})," it when necessary (submit, validation, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Initial value:"})," use ",e.jsx(n.InlineCode,{children:"defaultValue"})," (text-like) and ",e.jsx(n.InlineCode,{children:"defaultChecked"})," (checkbox/radio) to set the starting value for uncontrolled fields."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Ref:"})," a handle to a DOM node created with"," ",e.jsx(n.InlineCode,{children:"React.useRef()"})," or a callback ref; lets you access"," ",e.jsx(n.InlineCode,{children:"input.value"}),","," ",e.jsx(n.InlineCode,{children:"files"}),", call"," ",e.jsx(n.InlineCode,{children:"focus()"}),","," ",e.jsx(n.InlineCode,{children:"form.reset()"}),", etc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"FormData:"})," browser API that collects values from a"," ",e.jsx(n.InlineCode,{children:"<form>"})," using each field’s"," ",e.jsx(n.InlineCode,{children:"name"}),"."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Basic Example (ref + defaultValue)"}),e.jsx(n.Pre,{children:`function SignupForm() {
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);

  function onSubmit(e) {
    e.preventDefault();
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    console.log({ name, email }); // send to API
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" defaultValue="Ash" ref={nameRef} />

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" ref={emailRef} />

      <button type="submit">Create account</button>
    </form>
  );
}`}),e.jsxs(n.Small,{children:["The browser keeps the current value. React only reads it on submit via"," ",e.jsx(n.InlineCode,{children:"ref.current.value"}),"."]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Reading Values with ",e.jsx("code",{children:"FormData"})]}),e.jsx(n.Pre,{children:`function ContactForm() {
  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget); // e.currentTarget is the <form>
    const data = Object.fromEntries(fd.entries());
    // data: { name: "...", email: "...", message: "..." }
    console.log(data);
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="name" placeholder="Full name" />
      <input name="email" type="email" placeholder="Email" />
      <textarea name="message" placeholder="Message" />
      <button>Send</button>
    </form>
  );
}`}),e.jsxs(n.Small,{children:["Works great for many fields. Ensure every field has a unique"," ",e.jsx(n.InlineCode,{children:"name"}),"."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Checkboxes & Radios (Uncontrolled)"}),e.jsx(n.Pre,{children:`function Options() {
  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    console.log(fd.get("newsletter"));  // "on" if checked, otherwise null
    console.log(fd.get("plan"));        // "pro" | "basic" from the selected radio
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        <input type="checkbox" name="newsletter" defaultChecked />
        Subscribe to newsletter
      </label>

      <fieldset>
        <legend>Plan</legend>
        <label><input type="radio" name="plan" value="basic" defaultChecked /> Basic</label>
        <label><input type="radio" name="plan" value="pro" /> Pro</label>
      </fieldset>

      <button>Save</button>
    </form>
  );
}`}),e.jsxs(n.Small,{children:["Use ",e.jsx(n.InlineCode,{children:"defaultChecked"})," for the initial checked state."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"File Inputs"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["File inputs are ",e.jsx("em",{children:"best"})," kept uncontrolled; read files via"," ",e.jsx(n.InlineCode,{children:"inputRef.current.files"})," or"," ",e.jsx(n.InlineCode,{children:"FormData"}),"."]}),e.jsxs("li",{children:["For multiple files use ",e.jsx(n.InlineCode,{children:"multiple"})," and iterate over"," ",e.jsx(n.InlineCode,{children:"FileList"}),"."]})]}),e.jsx(n.Pre,{children:`function AvatarUpload() {
  const fileRef = React.useRef(null);

  function onSubmit(e) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("avatar", file);
    // fetch("/upload", { method: "POST", body: fd })
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="file" name="avatar" accept="image/*" ref={fileRef} />
      <button>Upload</button>
    </form>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Resetting Uncontrolled Forms"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Call ",e.jsx(n.InlineCode,{children:"formRef.current.reset()"})," to revert fields to their initial ",e.jsx(n.InlineCode,{children:"default*"})," values."]}),e.jsxs("li",{children:["Alternatively, change a ",e.jsx(n.InlineCode,{children:"key"})," on the form to force a remount (re-applies defaults)."]})]}),e.jsx(n.Pre,{children:`function ResettableForm() {
  const formRef = React.useRef(null);

  function onResetClick() {
    formRef.current?.reset(); // back to defaults
  }

  return (
    <form ref={formRef}>
      <input name="title" defaultValue="Hello" />
      <textarea name="body" defaultValue="Write something..." />
      <button type="button" onClick={onResetClick}>Reset</button>
    </form>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"When to Use Uncontrolled Inputs"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Simple forms submitted as whole units (read values only on submit)."}),e.jsx("li",{children:"Performance-sensitive UIs where per-keystroke React updates are unnecessary."}),e.jsx("li",{children:"File inputs and large text areas not needing live validation."}),e.jsx("li",{children:"Integrations with non-React code (vanilla widgets) where DOM owns the value."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Pitfalls & Gotchas"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Mixing modes:"})," Don’t switch an input from uncontrolled to controlled (or vice versa). If you set a ",e.jsx(n.InlineCode,{children:"value"})," prop after initial render, React warns. Pick one approach."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Wrong prop:"})," For uncontrolled, use"," ",e.jsx(n.InlineCode,{children:"defaultValue"})," /"," ",e.jsx(n.InlineCode,{children:"defaultChecked"}),", not"," ",e.jsx(n.InlineCode,{children:"value"})," /"," ",e.jsx(n.InlineCode,{children:"checked"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Validation timing:"})," Without React state, you can’t show real-time “as-you-type” errors easily. Use native HTML5 validation or validate on submit/blur."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parsing:"})," ",e.jsx(n.InlineCode,{children:'type="number"'})," still yields"," ",e.jsx("em",{children:"strings"})," from ",e.jsx(n.InlineCode,{children:"value"}),". Cast as needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Names required:"})," ",e.jsx(n.InlineCode,{children:"FormData"})," only includes elements with a ",e.jsx(n.InlineCode,{children:"name"}),"."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Helpful Patterns"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Hybrid read-only:"})," Keep input uncontrolled but read"," ",e.jsx(n.InlineCode,{children:"onBlur"})," to sync into React state if/when needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Native validation:"})," Use ",e.jsx(n.InlineCode,{children:"required"}),","," ",e.jsx(n.InlineCode,{children:"minLength"}),","," ",e.jsx(n.InlineCode,{children:"pattern"})," and read"," ",e.jsx(n.InlineCode,{children:"form.checkValidity()"})," or rely on browser UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Accessibility:"})," Always pair inputs with ",e.jsx(n.InlineCode,{children:"<label>"}),", use"," ",e.jsx(n.InlineCode,{children:"id"})," + ",e.jsx(n.InlineCode,{children:"htmlFor"}),", group radios in"," ",e.jsx(n.InlineCode,{children:"<fieldset>"}),"/",e.jsx(n.InlineCode,{children:"<legend>"}),", and set"," ",e.jsx(n.InlineCode,{children:"aria-invalid"})," on errors."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"defaultValue/defaultChecked:"})," initial value for uncontrolled inputs, applied on mount."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ref (DOM ref):"})," handle to a DOM element; access value, files, call methods."]}),e.jsxs("li",{children:[e.jsx("b",{children:"FormData:"})," API that reads values from named controls in a form."]}),e.jsxs("li",{children:[e.jsx("b",{children:"reset():"})," resets a form’s controls to their default values."]})]})]}),e.jsxs(n.Callout,{children:["Summary: Use uncontrolled inputs when you don’t need per-keystroke React state. Initialize with ",e.jsx("i",{children:"default*"})," props, read values via refs or FormData, lean on native validation, and avoid switching between controlled and uncontrolled modes."]})]});export{t as default};
