import{j as e}from"./index-BRArnZ3i.js";import{S as s}from"./styled-CfmB2akQ.js";const i=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Custom Validation"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Custom validation"})," means implementing your own rules and messages (in addition to or instead of the browser’s built-in HTML5 validation). You decide ",e.jsx("i",{children:"what"})," is valid, ",e.jsx("i",{children:"when"})," to validate (change/blur/submit), and ",e.jsx("i",{children:"how"})," to show errors—while keeping the server as the final authority."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Definition & Purpose"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Constraint validation API:"})," native browser checks (e.g., ",e.jsx(s.InlineCode,{children:"required"}),", ",e.jsx(s.InlineCode,{children:"minLength"}),", ",e.jsx(s.InlineCode,{children:'type="email"'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Custom validation:"})," app-defined rules (sync/async) that go beyond HTML5 (e.g., password strength, business rules, reserved names)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Client vs server:"})," client improves UX; the server must re-validate for security/integrity."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Strategies"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Controlled"})," (state driven): inputs mirror React state; run validators on change/blur/submit and render errors from state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled"})," (ref driven): read values from the DOM; use native validity or ",e.jsx(s.InlineCode,{children:"setCustomValidity"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hybrid:"})," use native constraints for simple cases; layer custom checks for complex rules."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Example: Small Validator Library (sync)"}),e.jsx(s.Pre,{children:`// validators.js (concept)
export const required = (msg = "This field is required") => (v) =>
  (v ?? "").toString().trim() ? null : msg;

export const minLen = (n, msg) => (v) =>
  (v ?? "").length >= n ? null : (msg || \`Must be at least \${n} characters\`);

export const pattern = (re, msg = "Invalid format") => (v) =>
  re.test((v ?? "").toString()) ? null : msg;

export const compose = (...rules) => (value) => {
  for (const rule of rules) {
    const err = rule(value);
    if (err) return err; // return the first error
  }
  return null;
};

// Usage:
// const usernameRules = compose(required(), pattern(/^[a-z0-9_-]{3,16}$/i, "3-16 letters, digits, _ or -"));`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Controlled Form with Custom Rules"}),e.jsx(s.Pre,{children:`import React from "react";
import { required, minLen, pattern, compose } from "./validators";

const usernameRules = compose(
  required(),
  pattern(/^[a-z0-9_-]{3,16}$/i, "3-16 letters, digits, _ or -")
);

const passwordRules = compose(
  required(),
  minLen(8),
  pattern(/[A-Z]/, "Must include an uppercase letter"),
  pattern(/[0-9]/, "Must include a number"),
  pattern(/[^\\w\\s]/, "Must include a symbol")
);

export default function ExampleControlled() {
  const [values, setValues] = React.useState({ username: "", password: "" });
  const [touched, setTouched] = React.useState({ username: false, password: false });
  const [errors, setErrors] = React.useState({ username: null, password: null });

  function validateField(name, value) {
    const rule = name === "username" ? usernameRules : passwordRules;
    return rule(value);
  }

  function onChange(e) {
    const { name, value } = e.target;
    setValues((s) => ({ ...s, [name]: value }));
    if (touched[name]) {
      setErrors((s) => ({ ...s, [name]: validateField(name, value) }));
    }
  }

  function onBlur(e) {
    const { name, value } = e.target;
    setTouched((s) => ({ ...s, [name]: true }));
    setErrors((s) => ({ ...s, [name]: validateField(name, value) }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const nextErrors = {
      username: validateField("username", values.username),
      password: validateField("password", values.password),
    };
    setErrors(nextErrors);

    const firstInvalid = Object.entries(nextErrors).find(([, err]) => err);
    if (firstInvalid) {
      const [name] = firstInvalid;
      const el = e.currentTarget.querySelector(\`[name="\${name}"]\`);
      el?.focus();
      return;
    }

    // safe to submit to server now
    console.log("submit", values);
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="custom-title">
      <h4 id="custom-title">Create account</h4>

      <label>
        Username
        <input
          name="username"
          value={values.username}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!errors.username}
          aria-describedby={errors.username ? "err-username" : undefined}
          autoComplete="username"
        />
      </label>
      {errors.username && (
        <div id="err-username" role="alert" aria-live="polite">{errors.username}</div>
      )}

      <label>
        Password
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "err-password" : undefined}
          autoComplete="new-password"
        />
      </label>
      {errors.password && (
        <div id="err-password" role="alert" aria-live="polite">{errors.password}</div>
      )}

      <button type="submit">Sign up</button>
    </form>
  );
}`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Key ideas:"})," show errors after ",e.jsx("i",{children:"blur"})," (touched) or on submit; focus the first invalid; render messages with ",e.jsx(s.InlineCode,{children:'role="alert"'})," and ",e.jsx(s.InlineCode,{children:"aria-invalid"}),"."]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Uncontrolled Inputs with Native ",e.jsx("code",{children:"setCustomValidity"})]}),e.jsx(s.Pre,{children:`function ExampleUncontrolled() {
  const ref = React.useRef(null);

  function check(e) {
    const el = e.currentTarget;
    const value = el.value.trim();

    // Your custom rule
    if (value.includes("admin")) {
      el.setCustomValidity("“admin” is reserved");
    } else {
      el.setCustomValidity("");
    }
  }

  function onSubmit(e) {
    if (!ref.current?.checkValidity()) {
      e.preventDefault();
      // browser will show tooltip/outline unless form has noValidate
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input ref={ref} name="username" required onInput={check} />
      <button>Submit</button>
    </form>
  );
}`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Tip:"})," ",e.jsx(s.InlineCode,{children:"onInvalid"})," runs when a field fails validity—use it to customize messages or styling. Use ",e.jsx(s.InlineCode,{children:"noValidate"})," on the form to fully control UX yourself."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Async Checks (Concept)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"When:"})," username/email availability, coupon validity, OTP verification."]}),e.jsxs("li",{children:[e.jsx("b",{children:"How:"})," debounce the request, show ",e.jsx("i",{children:"pending"})," state, cancel stale calls, and surface server error messages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallback:"})," always re-validate on the server after submit."]})]}),e.jsx(s.Pre,{children:`// pseudo: async validator (debounced elsewhere)
export const isAvailable = async (value) => {
  const res = await fetch(\`/api/check-username?u=\${encodeURIComponent(value)}\`);
  const json = await res.json();
  return json.ok ? null : "Username is taken";
};`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"UX & Accessibility"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Validate on ",e.jsx("b",{children:"blur"})," for first reveal, and on ",e.jsx("b",{children:"change"})," thereafter for quick feedback."]}),e.jsx("li",{children:"Keep messages clear and actionable (“Include at least one number”), not generic (“Invalid”)."}),e.jsxs("li",{children:["Link messages via ",e.jsx(s.InlineCode,{children:"aria-describedby"}),"; mark fields with ",e.jsx(s.InlineCode,{children:"aria-invalid"})," when errors exist."]}),e.jsxs("li",{children:["On submit, ",e.jsx("b",{children:"focus the first invalid field"})," and optionally show a summary (",e.jsx(s.InlineCode,{children:'role="alert"'}),", ",e.jsx(s.InlineCode,{children:'aria-live="assertive"'}),")."]}),e.jsxs("li",{children:["Do not block typing with aggressive rules; ",e.jsx("b",{children:"validate, don’t police"})," (except for hard constraints like maxLength)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," centralize rules and reuse them across fields/pages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep client and server rules aligned (same shape/messages where possible)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," handle i18n for messages early if you plan to localize."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," depend solely on client validation; the server must re-validate."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," show errors ",e.jsx("i",{children:"while typing"})," before first blur—this feels hostile."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Touched:"})," a field that has received and then lost focus at least once."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dirty:"})," a field whose value changed from its initial value."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Validity state:"})," the native flags like ",e.jsx(s.InlineCode,{children:"valueMissing"}),", ",e.jsx(s.InlineCode,{children:"typeMismatch"}),", ",e.jsx(s.InlineCode,{children:"tooShort"}),", etc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Custom error:"})," an error you set with ",e.jsx(s.InlineCode,{children:"setCustomValidity"}),"."]})]})]}),e.jsx(s.Callout,{children:"Summary: pair small, reusable validators with thoughtful UX. Validate on blur, update on change, focus the first invalid on submit, keep messages helpful, and always re-check on the server."})]});export{i as default};
