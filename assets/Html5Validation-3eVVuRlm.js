import{j as e}from"./index-t22nWg0v.js";import{S as i}from"./styled-Bft7oH_0.js";const t=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"HTML5 Validation (Constraint Validation)"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"HTML5 form validation"})," (a.k.a. ",e.jsx("i",{children:"Constraint Validation"}),") is the browser’s built-in system that checks input values against constraints like ",e.jsx(i.InlineCode,{children:"required"}),",",e.jsx(i.InlineCode,{children:"type"}),", ",e.jsx(i.InlineCode,{children:"pattern"}),",",e.jsx(i.InlineCode,{children:"min"}),"/",e.jsx(i.InlineCode,{children:"max"}),", etc. It shows native error UI, sets CSS states (",e.jsx(i.InlineCode,{children:":invalid"}),", ",e.jsx(i.InlineCode,{children:":valid"}),"), and exposes a JS API (",e.jsx(i.InlineCode,{children:"checkValidity()"}),", ",e.jsx(i.InlineCode,{children:"reportValidity()"}),", ",e.jsx(i.InlineCode,{children:"setCustomValidity()"}),"). In React, you still rely on the browser engine—React just wires events to your handlers."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"What is it & why use it?"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Definition:"})," A standard that lets the browser validate form controls based on declarative constraints."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Benefits:"})," Zero-JS for common checks, consistent keyboard and screen-reader behavior, instant feedback."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Limits:"})," Native messages & UI vary by browser/locale; complex rules often need custom logic or a library."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core Constraints (Attributes)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"required"})," — value must be non-empty."]}),e.jsxs("li",{children:[e.jsx("b",{children:"type"})," — built-in checks for ",e.jsx(i.InlineCode,{children:"email"}),", ",e.jsx(i.InlineCode,{children:"url"}),", ",e.jsx(i.InlineCode,{children:"number"}),", ",e.jsx(i.InlineCode,{children:"date"}),", etc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"min / max / step"})," — numeric/range/date limits (and step granularity)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"minLength / maxLength"})," — string length bounds."]}),e.jsxs("li",{children:[e.jsx("b",{children:"pattern"})," — regex that the value must match (anchors implied for the whole value)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"multiple"})," — allows comma-separated emails/files to be multiple (where supported)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"accept"})," (file) — hint for allowed MIME types/extensions (not strict validation)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"autocomplete"})," — improves UX; not a validator but impacts native autofill."]})]}),e.jsx(i.Pre,{children:`// Examples of declarative constraints
<input type="email" required />
<input type="number" min="1" max="10" step="2" />
<input type="text" minLength={3} maxLength={12} />
<input type="text" pattern="^[a-z][a-z0-9_-]{2,15}$" title="3–16 chars, start with a letter." />`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Form-level Flags"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"noValidate"})," — disable native validation UI on submit (React prop: ",e.jsx(i.InlineCode,{children:"noValidate"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"formNoValidate"})," — per-button opt-out (React prop on a submit button)."]})]}),e.jsx(i.Pre,{children:`// React form that disables native validation popups
<form noValidate onSubmit={handleSubmit}>...</form>

// A submit button that skips validation just for that click
<button type="submit" formNoValidate>Save Draft</button>`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Styling with Pseudo-classes"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:":invalid / :valid"})," — overall validity."]}),e.jsxs("li",{children:[e.jsx("b",{children:":required / :optional"})," — presence of ",e.jsx(i.InlineCode,{children:"required"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:":in-range / :out-of-range"})," — numbers/dates relative to ",e.jsx(i.InlineCode,{children:"min"}),"/",e.jsx(i.InlineCode,{children:"max"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:":placeholder-shown"})," — useful to avoid showing errors when nothing typed yet."]})]}),e.jsx(i.Pre,{children:`/* Example */
input:invalid { outline: 2px solid red; }
input:valid { outline: 2px solid green; }
input:required:placeholder-shown { outline-color: transparent; }`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Constraint Validation API"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"checkValidity()"})," — returns ",e.jsx(i.InlineCode,{children:"true/false"})," without showing messages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"reportValidity()"})," — like ",e.jsx(i.InlineCode,{children:"checkValidity()"})," but shows native messages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"setCustomValidity(msg)"})," — set/clear (",e.jsx("i",{children:"empty string clears"}),") a custom error on a control."]}),e.jsxs("li",{children:[e.jsx("b",{children:"validity"})," — a ",e.jsx("i",{children:"ValidityState"})," object: ",e.jsx(i.InlineCode,{children:"valueMissing"}),", ",e.jsx(i.InlineCode,{children:"typeMismatch"}),", ",e.jsx(i.InlineCode,{children:"tooShort"}),", ",e.jsx(i.InlineCode,{children:"tooLong"}),", ",e.jsx(i.InlineCode,{children:"patternMismatch"}),", ",e.jsx(i.InlineCode,{children:"rangeUnderflow"}),", ",e.jsx(i.InlineCode,{children:"rangeOverflow"}),", ",e.jsx(i.InlineCode,{children:"stepMismatch"}),", ",e.jsx(i.InlineCode,{children:"badInput"}),", ",e.jsx(i.InlineCode,{children:"customError"}),", ",e.jsx(i.InlineCode,{children:"valid"}),"."]})]}),e.jsx(i.Pre,{children:`// Checking a single control
const ok = inputRef.current.checkValidity();

// Showing messages for the whole form
formRef.current.reportValidity();

// Custom message
if (emailRef.current.validity.typeMismatch) {
  emailRef.current.setCustomValidity("Please enter a valid email like name@example.com");
  emailRef.current.reportValidity();
} else {
  emailRef.current.setCustomValidity(""); // clear
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"React Patterns & Events"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"onInvalid"})," — fires when a control becomes invalid (bubble); great place to set custom messages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"onInput / onChange"})," — clear custom errors as the user types (",e.jsx(i.InlineCode,{children:'setCustomValidity("")'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled vs. Uncontrolled:"})," Either approach works with native validation. Don’t fight the browser—use the attributes."]})]}),e.jsx(i.Pre,{children:`function EmailField() {
  const ref = React.useRef(null);

  function handleInvalid(e) {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity("Email is required");
    } else if (e.target.validity.typeMismatch) {
      e.target.setCustomValidity("That doesn't look like an email");
    }
  }

  function handleInput(e) {
    // Clear any previous custom message once the user changes the value
    e.target.setCustomValidity("");
  }

  return (
    <label>
      Email
      <input
        ref={ref}
        type="email"
        required
        onInvalid={handleInvalid}
        onInput={handleInput}
        aria-describedby="email-help"
      />
      <small id="email-help">We’ll never share your email.</small>
    </label>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Examples"}),e.jsx(i.H3,{children:"Basic: required + email + minLength"}),e.jsx(i.Pre,{children:`function BasicForm() {
  function onSubmit(e) {
    // Let the browser validate first; if invalid, it will block submit
    if (!e.currentTarget.checkValidity()) {
      e.preventDefault();
      e.currentTarget.reportValidity();
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Email
        <input type="email" required minLength={5} placeholder="name@example.com" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}`}),e.jsx(i.H3,{children:"Username with pattern + custom message"}),e.jsx(i.Pre,{children:`function Username() {
  function onInvalid(e) {
    if (e.target.validity.patternMismatch) {
      e.target.setCustomValidity("3–16 chars, letters first, letters/numbers/_/- allowed.");
    } else if (e.target.validity.valueMissing) {
      e.target.setCustomValidity("Please choose a username.");
    }
  }
  function onInput(e){ e.target.setCustomValidity(""); }

  return (
    <label>
      Username
      <input
        type="text"
        required
        pattern="^[a-zA-Z][a-zA-Z0-9_-]{2,15}$"
        onInvalid={onInvalid}
        onInput={onInput}
        aria-describedby="uhelp"
      />
      <small id="uhelp">Allowed: letters, numbers, _ and - (3–16 chars).</small>
    </label>
  );
}`}),e.jsx(i.H3,{children:"Opting out of native UI (custom flow)"}),e.jsx(i.Pre,{children:`function CustomValidationForm() {
  const [errors, setErrors] = React.useState({});

  function validate(form) {
    const errs = {};
    const name = form.elements.name;
    if (!name.value.trim()) errs.name = "Name is required";
    const age = form.elements.age;
    const n = Number(age.value);
    if (!Number.isFinite(n) || n < 18) errs.age = "Age must be 18+";
    return errs;
  }

  function onSubmit(e) {
    e.preventDefault(); // opt-out
    const form = e.currentTarget;
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // proceed (send to server)
    }
  }

  return (
    <form noValidate onSubmit={onSubmit}>
      <label>
        Name
        <input name="name" aria-invalid={!!errors.name} aria-describedby="name-err" />
      </label>
      {errors.name && <div id="name-err" role="alert">{errors.name}</div>}

      <label>
        Age
        <input name="age" inputMode="numeric" aria-invalid={!!errors.age} aria-describedby="age-err" />
      </label>
      {errors.age && <div id="age-err" role="alert">{errors.age}</div>}

      <button type="submit">Save</button>
    </form>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Accessibility & UX"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Always pair"})," ",e.jsx(i.InlineCode,{children:"<label htmlFor>"})," with ",e.jsx(i.InlineCode,{children:"id"})," (or wrap input inside label)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Describe errors"})," near the field; connect with ",e.jsx(i.InlineCode,{children:"aria-describedby"})," and mark invalid with ",e.jsx(i.InlineCode,{children:"aria-invalid"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t rely on color alone"}),". Include text or icons with ",e.jsx(i.InlineCode,{children:'role="alert"'})," for screen readers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t block submit preemptively"}),". Let users attempt submit and then show errors (better flow)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Localize"})," custom messages; native messages are auto-localized by the browser."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don’t"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," start with native attributes; add JS only when necessary."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(i.InlineCode,{children:"onInvalid"}),"/",e.jsx(i.InlineCode,{children:"onInput"})," to manage custom messages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," consider ",e.jsx(i.InlineCode,{children:"noValidate"})," if using a custom validator/library."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," use ",e.jsx(i.InlineCode,{children:"pattern"})," when ",e.jsx(i.InlineCode,{children:"type"})," already covers the case (e.g., emails)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," hide errors off-screen or only in toasts; associate errors with fields."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Constraint:"})," a rule the value must satisfy (required, pattern, min/max, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ValidityState:"})," the object describing which constraint failed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Native UI:"})," the browser’s built-in error popup/tooltip and focus behavior."]})]})]}),e.jsxs(i.Callout,{children:["Summary: Use HTML5’s constraints for fast, accessible validation. Style with pseudo-classes, customize messages with ",e.jsx("i",{children:"Constraint Validation API"}),", and opt out (",e.jsx(i.InlineCode,{children:"noValidate"}),") when rolling your own or using libraries (React Hook Form, Formik, Yup/Zod)."]})]});export{t as default};
