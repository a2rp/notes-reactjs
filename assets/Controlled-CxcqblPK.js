import{j as e}from"./index-DXTGIo8z.js";import{S as n}from"./styled-Bt8Wn9mH.js";const s=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Controlled Inputs"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Controlled inputs"})," are form elements whose value is driven by React state via a"," ",e.jsx(n.InlineCode,{children:"value"})," (or ",e.jsx(n.InlineCode,{children:"checked"}),") prop and an"," ",e.jsx(n.InlineCode,{children:"onChange"})," handler. The UI becomes a pure function of state, enabling validation, formatting, and predictable behavior."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Definition & Purpose"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Controlled input:"})," React state is the ",e.jsx("i",{children:"source of truth"}),". Render with"," ",e.jsx(n.InlineCode,{children:"value"}),"/",e.jsx(n.InlineCode,{children:"checked"}),", update with"," ",e.jsx(n.InlineCode,{children:"onChange"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled input:"})," the DOM keeps the value internally; you read it via"," ",e.jsx(n.InlineCode,{children:"ref"})," (covered later)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why controlled?"})," Real-time validation, masking/formatting, single source of truth, easy reset, deterministic UI, testability."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Core Pattern"}),e.jsx(n.Pre,{children:`function NameField() {
  const [name, setName] = React.useState(""); // keep text in React state
  return (
    <label>
      Name
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
    </label>
  );
}`}),e.jsxs(n.Small,{children:["The input renders ",e.jsx(n.InlineCode,{children:"value"})," from state; typing triggers"," ",e.jsx(n.InlineCode,{children:"onChange"}),", which updates state—and React re-renders."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Text & Number Inputs (strings, parsing, formatting)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Inputs are ",e.jsx("b",{children:"string-based"}),". For numeric fields, store the raw string to keep editing natural (allowing"," ",e.jsx(n.InlineCode,{children:'""'}),", leading zeros, etc.) and parse on submit."]}),e.jsxs("li",{children:["Keep ",e.jsx("b",{children:"empty string"})," (",e.jsx(n.InlineCode,{children:'""'}),") as the controlled “no value” state to avoid controlled/uncontrolled warnings."]}),e.jsxs("li",{children:["Do lightweight ",e.jsx("b",{children:"formatting"})," (e.g., uppercase) in ",e.jsx(n.InlineCode,{children:"onChange"}),"; heavy formatting can cause caret jumps—prefer formatting on blur or on submit."]})]}),e.jsx(n.Pre,{children:`function AgeField() {
  const [age, setAge] = React.useState(""); // keep as string
  function onChange(e) {
    const v = e.target.value;
    // accept only digits or empty string
    if (v === "" || /^\\d+$/.test(v)) setAge(v);
  }
  function onSubmit(e) {
    e.preventDefault();
    const ageNum = age === "" ? null : Number(age); // parse when needed
    console.log({ ageNum });
  }
  return (
    <form onSubmit={onSubmit}>
      <label>
        Age
        <input inputMode="numeric" value={age} onChange={onChange} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Checkboxes"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Single checkbox:"})," use ",e.jsx(n.InlineCode,{children:"checked"})," +"," ",e.jsx(n.InlineCode,{children:"onChange(e => setChecked(e.target.checked))"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Group:"})," store an array of selected values and toggle membership."]})]}),e.jsx(n.Pre,{children:`function TermsCheckbox() {
  const [agree, setAgree] = React.useState(false);
  return (
    <label>
      <input
        type="checkbox"
        checked={agree}
        onChange={(e) => setAgree(e.target.checked)}
      />
      I agree to the terms
    </label>
  );
}

function ToppingsGroup() {
  const [toppings, setToppings] = React.useState(["cheese"]);
  const all = ["cheese", "pepperoni", "mushroom"];
  const toggle = (v) =>
    setToppings((xs) => (xs.includes(v) ? xs.filter((x) => x !== v) : [...xs, v]));
  return (
    <fieldset>
      <legend>Toppings</legend>
      {all.map((v) => (
        <label key={v}>
          <input
            type="checkbox"
            checked={toppings.includes(v)}
            onChange={() => toggle(v)}
          />
          {v}
        </label>
      ))}
      <pre>{JSON.stringify(toppings)}</pre>
    </fieldset>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Radio Group"}),e.jsx(n.List,{children:e.jsxs("li",{children:["Store the selected value; all radios share the same ",e.jsx(n.InlineCode,{children:"name"}),"."]})}),e.jsx(n.Pre,{children:`function SizeRadios() {
  const [size, setSize] = React.useState("m");
  const sizes = ["s", "m", "l"];
  return (
    <fieldset>
      <legend>Size</legend>
      {sizes.map((s) => (
        <label key={s}>
          <input
            type="radio"
            name="size"
            value={s}
            checked={size === s}
            onChange={(e) => setSize(e.target.value)}
          />
          {s.toUpperCase()}
        </label>
      ))}
    </fieldset>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Select (single & multiple)"}),e.jsx(n.Pre,{children:`function CountrySelect() {
  const [country, setCountry] = React.useState("in");
  return (
    <label>
      Country
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="in">India</option>
        <option value="us">USA</option>
        <option value="de">Germany</option>
      </select>
    </label>
  );
}

function LanguagesMulti() {
  const [langs, setLangs] = React.useState(["js"]);
  const onChange = (e) =>
    setLangs(Array.from(e.target.selectedOptions, (o) => o.value));
  return (
    <label>
      Languages (multi)
      <select multiple value={langs} onChange={onChange}>
        <option value="js">JavaScript</option>
        <option value="ts">TypeScript</option>
        <option value="py">Python</option>
      </select>
    </label>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Textarea"}),e.jsx(n.Pre,{children:`function BioTextarea() {
  const [bio, setBio] = React.useState("");
  return (
    <label>
      Bio
      <textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
    </label>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Putting It Together (submit, validate, reset)"}),e.jsx(n.Pre,{children:`function ProfileForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) e.email = "Email is invalid";
    if (!agree) e.agree = "Please accept the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    // submit data { name, email, agree }
    console.log({ name, email, agree });
    // reset
    setName(""); setEmail(""); setAgree(false); setErrors({});
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)}
               aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
        {errors.name && <div id="err-name" role="alert">{errors.name}</div>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" value={email} onChange={(e) => setEmail(e.target.value)}
               aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
        {errors.email && <div id="err-email" role="alert">{errors.email}</div>}
      </div>

      <label>
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        I agree to the terms
      </label>
      {errors.agree && <div role="alert">{errors.agree}</div>}

      <button type="submit">Create profile</button>
    </form>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility Essentials"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use ",e.jsx(n.InlineCode,{children:"<label htmlFor>"})," with matching"," ",e.jsx(n.InlineCode,{children:"id"}),". Screen readers announce labels."]}),e.jsxs("li",{children:["For groups, wrap in ",e.jsx(n.InlineCode,{children:"<fieldset>"})," with a"," ",e.jsx(n.InlineCode,{children:"<legend>"}),"."]}),e.jsxs("li",{children:["Mark invalid fields with ",e.jsx(n.InlineCode,{children:"aria-invalid"})," and link errors via"," ",e.jsx(n.InlineCode,{children:"aria-describedby"}),"."]}),e.jsxs("li",{children:["Keep the ",e.jsx(n.InlineCode,{children:"name"})," attribute for native form submit and autofill."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common Pitfalls"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Switching controlled ↔ uncontrolled:"})," Don’t render an input with"," ",e.jsx(n.InlineCode,{children:"undefined"})," and later with a string. Initialize with"," ",e.jsx(n.InlineCode,{children:'""'})," (text) or ",e.jsx(n.InlineCode,{children:"false"})," (checkbox)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Number inputs:"})," the value is still a string. Parse on submit; allow empty string while typing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"File inputs:"})," the ",e.jsx(n.InlineCode,{children:"value"})," is read-only for security. Treat file uploads as ",e.jsx("i",{children:"uncontrolled"})," (cover later)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Caret jump:"})," aggressive formatting in ",e.jsx(n.InlineCode,{children:"onChange"})," can move the cursor. Prefer formatting on blur or use careful algorithms."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Performance:"})," every keystroke re-renders. Keep handlers light; expensive logic should be debounced (covered in Debounced Inputs)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep a single source of truth in state for controlled fields."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," validate early and show clear errors linked to inputs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," parse/normalize on submit; be gentle while typing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mix ",e.jsx(n.InlineCode,{children:"value"})," with ",e.jsx(n.InlineCode,{children:"defaultValue"})," on the same input."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," block typing with heavy logic inside ",e.jsx(n.InlineCode,{children:"onChange"}),"."]})]})]}),e.jsxs(n.Callout,{children:["Summary: With controlled inputs, state drives the UI. Use"," ",e.jsx(n.InlineCode,{children:"value/checked"})," + ",e.jsx(n.InlineCode,{children:"onChange"}),", keep text fields as strings, parse on submit, mind accessibility, and avoid switching between controlled and uncontrolled."]})]});export{s as default};
