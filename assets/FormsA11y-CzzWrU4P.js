import{j as e}from"./index-CNzueKa1.js";import{S as i}from"./styled-CnI5DDiN.js";const r=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Forms Accessibility (A11y)"}),e.jsxs(i.Lead,{children:["Accessible forms ensure that ",e.jsx("b",{children:"everyone"})," (including keyboard and screen-reader users) can find fields, understand purpose, fix errors, and submit successfully. The core ideas:",e.jsx("b",{children:"label every control"}),", ",e.jsx("b",{children:"group related controls"}),", ",e.jsx("b",{children:"announce errors"}),", and",e.jsx("b",{children:"manage focus"})," thoughtfully."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Foundations: Name, Role, Value"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Accessible name"}),": how AT (screen readers) refer to a control (usually via ",e.jsx(i.InlineCode,{children:"<label htmlFor>"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Role"}),": the control type (textbox, button, combobox). Native HTML gives this for free."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Value"}),": the current state (text entered, option selected, checked/unchecked)."]})]}),e.jsxs(i.Small,{children:["Prefer ",e.jsx("b",{children:"native HTML controls"})," with proper attributes; add ARIA only when necessary."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Label Every Control"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Use an explicit label: ",e.jsx(i.InlineCode,{children:'<label htmlFor="email">'})," + ",e.jsx(i.InlineCode,{children:'id="email"'}),"."]}),e.jsx("li",{children:"If you must hide the label visually, keep it in the DOM (visually hidden), not removed."}),e.jsx("li",{children:"Don’t rely on placeholders as labels; they disappear and are not consistently announced."})]}),e.jsx(i.Pre,{children:`function EmailField() {
  return (
    <div>
      <label htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" autoComplete="email" required />
    </div>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Help Text & Descriptions"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Use ",e.jsx(i.InlineCode,{children:"aria-describedby"})," to point to helper text or error text elements."]}),e.jsx("li",{children:"Keep help text visible or discoverable; don’t rely on hover only."})]}),e.jsx(i.Pre,{children:`function PasswordField() {
  const helpId = "pwd-help";
  return (
    <div>
      <label htmlFor="pwd">Password</label>
      <input id="pwd" name="password" type="password" aria-describedby={helpId} required />
      <div id={helpId}>At least 8 characters, include a number.</div>
    </div>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Errors: Announce Clearly"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Mark invalid fields with ",e.jsx(i.InlineCode,{children:'aria-invalid="true"'})," when they fail validation."]}),e.jsxs("li",{children:["Associate the error with the input via ",e.jsx(i.InlineCode,{children:"aria-describedby"}),"."]}),e.jsxs("li",{children:["Use an ",e.jsx(i.InlineCode,{children:"aria-live"})," region (or ",e.jsx(i.InlineCode,{children:'role="alert"'}),") to announce new errors."]})]}),e.jsx(i.Pre,{children:`function EmailWithError({ error }) {
  const errId = "email-error";
  const isInvalid = Boolean(error);
  return (
    <div>
      <label htmlFor="email2">Email address</label>
      <input
        id="email2"
        name="email"
        type="email"
        aria-invalid={isInvalid || undefined}
        aria-describedby={isInvalid ? errId : undefined}
        required
      />
      {isInvalid && (
        <div id={errId} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}`}),e.jsxs(i.Small,{children:["Prefer ",e.jsx("b",{children:"clear text"})," over color alone. If you use an asterisk for required, keep the actual ",e.jsx(i.InlineCode,{children:"required"})," attribute on the field."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Group Related Controls"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Wrap radio/checkbox groups in ",e.jsx(i.InlineCode,{children:"<fieldset>"})," with a meaningful ",e.jsx(i.InlineCode,{children:"<legend>"}),"."]}),e.jsx("li",{children:"Each control still needs its own label."})]}),e.jsx(i.Pre,{children:`function ContactPref() {
  return (
    <fieldset>
      <legend>Preferred contact method</legend>
      <div>
        <input type="radio" id="c-email" name="contact" value="email" />
        <label htmlFor="c-email">Email</label>
      </div>
      <div>
        <input type="radio" id="c-sms" name="contact" value="sms" />
        <label htmlFor="c-sms">SMS</label>
      </div>
    </fieldset>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Keyboard First"}),e.jsxs(i.List,{children:[e.jsx("li",{children:"Tab order follows DOM order—structure your markup logically."}),e.jsxs("li",{children:["Use ",e.jsx(i.InlineCode,{children:'<button type="submit">'})," for submits; avoid clickable ",e.jsx(i.InlineCode,{children:"<div>"}),"s."]}),e.jsxs("li",{children:["Avoid ",e.jsx(i.InlineCode,{children:"tabIndex > 0"}),"; it breaks natural flow. Use ",e.jsx(i.InlineCode,{children:"tabIndex=0"})," only for custom interactive elements."]})]}),e.jsx(i.Pre,{children:`function SubmitBar() {
  return (
    <div>
      <button type="submit">Save</button>
      <button type="button">Cancel</button>
    </div>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Managing Focus on Submit"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["After validation, move focus to the ",e.jsx("b",{children:"first invalid field"})," so users can fix it quickly."]}),e.jsxs("li",{children:["Use refs or query for ",e.jsx(i.InlineCode,{children:'[aria-invalid="true"]'}),"."]})]}),e.jsx(i.Pre,{children:`function onSubmitFocusFirstInvalid(e) {
  e.preventDefault();
  // ... run validation; mark fields aria-invalid="true" and set error text ...
  const firstInvalid = e.currentTarget.querySelector('[aria-invalid="true"]');
  if (firstInvalid) firstInvalid.focus();
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"File Upload & Drag–Drop (A11y Pattern)"}),e.jsxs(i.List,{children:[e.jsx("li",{children:"Keep the native file input for accessibility; trigger it from a custom button if needed."}),e.jsx("li",{children:"For drop zones, provide a keyboard path (Enter/Space) and announce selection results."})]}),e.jsx(i.Pre,{children:`function FilePicker() {
  const inputRef = React.useRef(null);
  const [fileName, setFileName] = React.useState("");
  const liveId = "file-live";

  function openPicker() { inputRef.current?.click(); }
  function onChange(e) {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
  }
  function onDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    setFileName(file ? file.name : "");
  }
  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") openPicker();
  }

  return (
    <div>
      <label>Resume (PDF)</label>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
        onChange={onChange}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={onKeyDown}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        aria-describedby={liveId}
      >
        Click to choose or drag & drop a PDF
      </div>
      <div id={liveId} aria-live="polite">
        {fileName ? \`Selected: \${fileName}\` : "No file selected"}
      </div>
    </div>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Autocomplete & Input Types"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Use semantic types: ",e.jsx(i.InlineCode,{children:"email"}),", ",e.jsx(i.InlineCode,{children:"tel"}),", ",e.jsx(i.InlineCode,{children:"url"}),", ",e.jsx(i.InlineCode,{children:"number"}),", ",e.jsx(i.InlineCode,{children:"date"}),"."]}),e.jsxs("li",{children:["Add ",e.jsx(i.InlineCode,{children:"autoComplete"})," with real tokens: ",e.jsx(i.InlineCode,{children:"name"}),", ",e.jsx(i.InlineCode,{children:"email"}),", ",e.jsx(i.InlineCode,{children:"username"}),", ",e.jsx(i.InlineCode,{children:"new-password"}),", ",e.jsx(i.InlineCode,{children:"one-time-code"}),", etc."]})]}),e.jsx(i.Pre,{children:`<input type="text" name="fullName" autoComplete="name" />
<input type="email" name="email" autoComplete="email" />
<input type="password" name="newPassword" autoComplete="new-password" />`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don’t"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use labels, fieldset/legend, and clear help/error text."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," move focus to the first error after submit."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," ensure color contrast and don’t use color alone to convey meaning."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," remove labels or rely on placeholders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," trap focus in modals without a proper focus trap."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," disable focus outlines; style them to match your theme."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Accessible name"}),": text AT uses to refer to a control."]}),e.jsxs("li",{children:[e.jsx("b",{children:"aria-describedby"}),": links a control to additional descriptive/help/error text."]}),e.jsxs("li",{children:[e.jsx("b",{children:"aria-invalid"}),": marks a control as failing validation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Live region"}),": area announced automatically when its content changes (",e.jsx(i.InlineCode,{children:"aria-live"}),")."]})]})]}),e.jsx(i.Callout,{children:"Summary: label everything, group related inputs, announce errors, and guide focus. Start with semantic HTML and add ARIA only to fill gaps."})]});export{r as default};
