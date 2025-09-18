import{j as e}from"./index-BExKNf87.js";import{S as i}from"./styled-V67Gftrd.js";const s=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Formik"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"Formik"})," is a small library that helps you manage ",e.jsx("i",{children:"form state"}),", ",e.jsx("i",{children:"validation"}),", and",e.jsx("i",{children:" submission"})," in React. It centralizes values, errors, and touched state, and gives you helpers to build robust forms without hand-rolling the same boilerplate over and over."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Definition & Purpose"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Form state:"})," central source of truth for input values (",e.jsx(i.InlineCode,{children:"values"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Validation:"})," either with a function (",e.jsx(i.InlineCode,{children:"validate"}),") or a schema (",e.jsx(i.InlineCode,{children:"validationSchema"}),", typically Yup/Zod)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Submission:"})," standardized ",e.jsx(i.InlineCode,{children:"onSubmit(values, helpers)"})," with helpers like ",e.jsx(i.InlineCode,{children:"setSubmitting"}),", ",e.jsx(i.InlineCode,{children:"resetForm"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Events & flags:"})," ",e.jsx(i.InlineCode,{children:"touched"}),", ",e.jsx(i.InlineCode,{children:"errors"}),", ",e.jsx(i.InlineCode,{children:"dirty"}),", ",e.jsx(i.InlineCode,{children:"isValid"}),", ",e.jsx(i.InlineCode,{children:"isSubmitting"})," for UI control."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core Concepts & Terms"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"initialValues:"})," the starting object for your form (keys must match each input’s ",e.jsx(i.InlineCode,{children:"name"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"handleChange / handleBlur:"})," event handlers Formik gives you to wire inputs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"touched:"})," fields the user has interacted with (used to decide when to show errors)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"errors:"})," an object mirroring ",e.jsx(i.InlineCode,{children:"values"})," with validation messages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"validate:"})," function returning an ",e.jsx(i.InlineCode,{children:"errors"})," object."]}),e.jsxs("li",{children:[e.jsx("b",{children:"validationSchema:"})," a schema (Yup/Zod) that describes valid ",e.jsx(i.InlineCode,{children:"values"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Field / Form / ErrorMessage:"})," Formik components that reduce boilerplate for wiring inputs, form tag, and errors."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useFormik / useField / useFormikContext:"})," hooks for full control or field-level wiring."]}),e.jsxs("li",{children:[e.jsx("b",{children:"FieldArray:"})," helpers for dynamic lists (add/remove items)."]})]})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Quick Start: Component API (",e.jsx("code",{children:"<Formik />"}),")"]}),e.jsx(i.Pre,{children:`import { Formik, Form, Field, ErrorMessage } from "formik";

function Signup() {
  return (
    <Formik
      initialValues={{ name: "", email: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.name.trim()) errors.name = "Name is required";
        if (!values.email) errors.email = "Email is required";
        else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email)) errors.email = "Invalid email";
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          // await api(values);
          console.log("Submitting", values);
          resetForm();
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form noValidate>
          <label>
            Name
            <Field name="name" type="text" />
          </label>
          <ErrorMessage name="name" component="div" className="error" />

          <label>
            Email
            <Field name="email" type="email" />
          </label>
          <ErrorMessage name="email" component="div" className="error" />

          <button type="submit" disabled={isSubmitting || !dirty || !isValid}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
}`}),e.jsxs(i.Small,{children:["The render-prop gives you flags like ",e.jsx(i.InlineCode,{children:"isSubmitting"}),","," ",e.jsx(i.InlineCode,{children:"isValid"}),", and ",e.jsx(i.InlineCode,{children:"dirty"})," to control the UI."]})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Hook API: ",e.jsx("code",{children:"useFormik"})]}),e.jsx(i.Pre,{children:`import { useFormik } from "formik";

function Login() {
  const formik = useFormik({
    initialValues: { email: "", password: "", remember: false },
    validate(values) {
      const errors = {};
      if (!values.email) errors.email = "Email is required";
      if (!values.password) errors.password = "Password is required";
      return errors;
    },
    onSubmit(values, helpers) {
      console.log(values);
      helpers.setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <label>
        Email
        <input
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={!!(formik.touched.email && formik.errors.email) || undefined}
        />
      </label>
      {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}

      <label>
        Password
        <input
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>
      {formik.touched.password && formik.errors.password && <div className="error">{formik.errors.password}</div>}

      <label>
        <input
          name="remember"
          type="checkbox"
          checked={formik.values.remember}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        Remember me
      </label>

      <button type="submit" disabled={formik.isSubmitting}>Login</button>
    </form>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Schema Validation with Yup"}),e.jsx(i.Pre,{children:`import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Min 8 characters").required("Required"),
});

function SchemaExample() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => { console.log(values); setSubmitting(false); }}
    >
      {({ isSubmitting }) => (
        <Form noValidate>
          <label>Email <Field name="email" type="email" /></label>
          <ErrorMessage name="email" component="div" className="error" />

          <label>Password <Field name="password" type="password" /></label>
          <ErrorMessage name="password" component="div" className="error" />

          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  );
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Yup"})," is the most common pairing. For ",e.jsx("b",{children:"Zod"}),", use an adapter to convert a Zod schema to a Formik-compatible validation function or schema-like wrapper."]})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Custom Inputs with ",e.jsx("code",{children:"useField"})]}),e.jsx(i.Pre,{children:`import { useField } from "formik";

function TextInput({ label, ...props }) {
  const [field, meta] = useField(props); // name, type, etc. in props
  return (
    <label>
      {label}
      <input {...field} {...props} aria-invalid={meta.touched && meta.error ? true : undefined} />
      {meta.touched && meta.error ? <span className="error">{meta.error}</span> : null}
    </label>
  );
}`}),e.jsxs(i.Small,{children:[e.jsx(i.InlineCode,{children:"useField"})," wires value/checked/change/blur automatically for the given"," ",e.jsx(i.InlineCode,{children:"name"}),"."]})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Dynamic Lists with ",e.jsx("code",{children:"FieldArray"})]}),e.jsx(i.Pre,{children:`import { FieldArray, Formik, Form, Field } from "formik";

function Todos() {
  return (
    <Formik
      initialValues={{ todos: [""] }}
      onSubmit={(v) => console.log(v)}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="todos">
            {({ push, remove }) => (
              <>
                {values.todos.map((_, i) => (
                  <div key={i}>
                    <Field name={\`todos.\${i}\`} placeholder={\`Todo \${i+1}\`} />
                    <button type="button" onClick={() => remove(i)}>Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => push("")}>Add Todo</button>
              </>
            )}
          </FieldArray>
          <button type="submit">Save</button>
        </Form>
      )}
    </Formik>
  );
}`}),e.jsxs(i.Small,{children:["Use dotted paths (e.g., ",e.jsx(i.InlineCode,{children:"todos.0"}),") for arrays and nested objects."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Files & Special Inputs"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Files:"})," set via ",e.jsx(i.InlineCode,{children:"setFieldValue(name, file)"}),"—don’t rely on default change."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Checkbox groups:"})," manage arrays with ",e.jsx(i.InlineCode,{children:"FieldArray"})," or custom logic."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Selects:"})," make sure the ",e.jsx(i.InlineCode,{children:"value"})," matches an option; for multi-select use arrays."]})]}),e.jsx(i.Pre,{children:`// File input example with setFieldValue
import { useFormik } from "formik";

function AvatarForm() {
  const formik = useFormik({
    initialValues: { avatar: null },
    onSubmit: (v) => console.log(v),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="avatar"
        type="file"
        accept="image/*"
        onChange={(e) => formik.setFieldValue("avatar", e.currentTarget.files?.[0] ?? null)}
      />
      <button type="submit">Upload</button>
    </form>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Configuration Knobs"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:"validateOnChange"})," / ",e.jsx(i.InlineCode,{children:"validateOnBlur"}),": control when validation runs."]}),e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:"validateOnMount"}),": run validation immediately on first render."]}),e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:"enableReinitialize"}),": allow ",e.jsx(i.InlineCode,{children:"initialValues"})," to update from props (resets dirty state)."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don’t"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep ",e.jsx(i.InlineCode,{children:"initialValues"})," stable (memoize if derived) to avoid unwanted resets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," align each input’s ",e.jsx(i.InlineCode,{children:"name"})," with a key in ",e.jsx(i.InlineCode,{children:"values"})," (including dotted paths)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," show errors when a field is both ",e.jsx("i",{children:"touched"})," and has an ",e.jsx("i",{children:"error"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mix uncontrolled patterns (",e.jsx(i.InlineCode,{children:"defaultValue"}),") with Formik-controlled inputs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mutate ",e.jsx(i.InlineCode,{children:"values"})," directly—use Formik helpers (",e.jsx(i.InlineCode,{children:"setFieldValue"}),", ",e.jsx(i.InlineCode,{children:"setValues"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," block the main thread in ",e.jsx(i.InlineCode,{children:"onSubmit"}),"; mark async work and use ",e.jsx(i.InlineCode,{children:"setSubmitting(false)"})," in ",e.jsx("i",{children:"finally"}),"."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Accessibility Notes"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Always bind ",e.jsx(i.InlineCode,{children:'<label htmlFor="id">'})," to the input’s ",e.jsx(i.InlineCode,{children:"id"}),"."]}),e.jsxs("li",{children:["Set ",e.jsx(i.InlineCode,{children:"aria-invalid"})," when a field has an error and was touched."]}),e.jsxs("li",{children:["Announce errors near inputs (e.g., with ",e.jsx(i.InlineCode,{children:'aria-live="polite"'})," on the error container)."]}),e.jsxs("li",{children:["Use the native ",e.jsx(i.InlineCode,{children:'button type="submit"'})," and keyboard-friendly controls."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"dirty:"})," ",e.jsx(i.InlineCode,{children:"true"})," if values differ from ",e.jsx(i.InlineCode,{children:"initialValues"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"isValid:"})," no validation errors currently present."]}),e.jsxs("li",{children:[e.jsx("b",{children:"isSubmitting:"})," ",e.jsx(i.InlineCode,{children:"true"})," while ",e.jsx(i.InlineCode,{children:"onSubmit"})," is running."]}),e.jsxs("li",{children:[e.jsx("b",{children:"setFieldValue(name, value):"})," programmatically set a field."]}),e.jsxs("li",{children:[e.jsx("b",{children:"setTouched / setErrors:"})," programmatically mark touch states or errors."]})]})]}),e.jsx(i.Callout,{children:"Summary: Formik centralizes form state, validation, and submission. Use component or hook APIs, pair with Yup/Zod for schemas, keep names aligned with values, and surface errors only after touch."})]});export{s as default};
