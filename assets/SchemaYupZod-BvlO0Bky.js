import{j as e}from"./index-BExKNf87.js";import{S as r}from"./styled-V67Gftrd.js";const o=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Schema Validation (Yup & Zod)"}),e.jsxs(r.Lead,{children:[e.jsx("b",{children:"Schema validation"})," describes the expected ",e.jsx("i",{children:"shape"})," and ",e.jsx("i",{children:"rules"})," of data (types, ranges, formats) in a single source of truth. In React forms, schemas validate user input before you submit, show useful errors, and keep logic centralized and testable."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Key Definitions"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Schema:"})," a declarative model of what valid data looks like (fields, types, constraints)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Validation:"})," checking input against the schema; returns success or a structured error list."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Refinement:"})," custom rule layered on top of a base type (e.g., “endDate >= startDate”)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transformation:"})," safely converting values (e.g., string to number, trimming whitespace) during parse."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Resolver (RHForm):"})," a bridge that lets ",e.jsx(r.InlineCode,{children:"react-hook-form"})," call your schema on every validate step."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Yup vs Zod — When to Choose What"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Yup:"})," mature, widely used with Formik; builder-style API (",e.jsxs(r.InlineCode,{children:["yup.object(","...",")"]}),"). Great if your stack already uses Formik or Yup."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Zod:"})," modern, composable; powerful ",e.jsx("i",{children:"refine"}),"/",e.jsx("i",{children:"transform"}),", unions/discriminated unions, and first-class TypeScript inference."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Both"})," support sync/async checks, nested objects/arrays, custom messages, and integration with popular form libs."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Minimal Examples"}),e.jsx(r.H3,{children:"Yup — login schema"}),e.jsx(r.Pre,{children:`import * as yup from "yup";

const loginYup = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Min 8 chars").required("Password is required"),
});`}),e.jsx(r.H3,{children:"Zod — login schema"}),e.jsx(r.Pre,{children:`import { z } from "zod";

const loginZod = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 chars"),
});`})]}),e.jsxs(r.Section,{children:[e.jsxs(r.H2,{children:["Using with ",e.jsx("code",{children:"react-hook-form"})]}),e.jsx(r.H3,{children:"Zod + RHF via resolver"}),e.jsx(r.Pre,{children:`import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = loginZod;

function LoginFormZod() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur", // validate on blur; change to "onChange" if needed
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log("ok", data))}>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register("password")} placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button>Login</button>
    </form>
  );
}`}),e.jsx(r.H3,{children:"Yup + RHF via resolver"}),e.jsx(r.Pre,{children:`import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = loginYup;

function LoginFormYup() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log("ok", data))}>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register("password")} placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button>Login</button>
    </form>
  );
}`}),e.jsxs(r.Small,{children:["The resolver adapts schema errors to RHF’s ",e.jsx(r.InlineCode,{children:"errors"})," object."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Using with Formik"}),e.jsx(r.Pre,{children:`import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const profileYup = yup.object({
  name: yup.string().required("Name is required"),
  age: yup.number().min(18, "18+ only").required("Age is required"),
});

function ProfileFormik() {
  return (
    <Formik
      initialValues={{ name: "", age: "" }}
      validationSchema={profileYup}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Field name="name" placeholder="Full name" />
        <ErrorMessage name="name" component="span" />

        <Field name="age" type="number" placeholder="Age" />
        <ErrorMessage name="age" component="span" />

        <button>Save</button>
      </Form>
    </Formik>
  );
}`}),e.jsx(r.Small,{children:"Formik pairs most commonly with Yup."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Cross-Field Rules & Refinements"}),e.jsx(r.H3,{children:"Zod — confirm password & date range"}),e.jsx(r.Pre,{children:`import { z } from "zod";

const account = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirm: z.string(),
  start: z.coerce.date(), // accept string, coerce to Date
  end: z.coerce.date(),
}).superRefine((val, ctx) => {
  if (val.password !== val.confirm) {
    ctx.addIssue({ path: ["confirm"], code: z.ZodIssueCode.custom, message: "Passwords must match" });
  }
  if (val.end < val.start) {
    ctx.addIssue({ path: ["end"], code: z.ZodIssueCode.custom, message: "End must be after start" });
  }
});`}),e.jsx(r.H3,{children:"Yup — confirm password"}),e.jsx(r.Pre,{children:`import * as yup from "yup";

const accountYup = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirm: yup.string().oneOf([yup.ref("password")], "Passwords must match").required(),
});`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Transformations & Coercion"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Zod:"})," ",e.jsx(r.InlineCode,{children:"z.coerce.number()"})," or ",e.jsx(r.InlineCode,{children:"z.string().transform(...)"})," to coerce/clean."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Yup:"})," ",e.jsx(r.InlineCode,{children:"transform()"})," to massage values before validation."]})]}),e.jsx(r.H3,{children:"Zod transform"}),e.jsx(r.Pre,{children:`const amount = z.string()
  .transform((s) => s.trim())
  .refine((s) => /^\\d+(\\.\\d{1,2})?$/.test(s), "Money format 0.00")
  .transform((s) => Number(s)); // final type: number`}),e.jsx(r.H3,{children:"Yup transform"}),e.jsx(r.Pre,{children:`const amountYup = yup
  .string()
  .transform((s) => (typeof s === "string" ? s.trim() : s))
  .test("money", "Money format 0.00", (s) => /^\\d+(\\.\\d{1,2})?$/.test(String(s)));`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Validating Files"}),e.jsx(r.H3,{children:"Zod — file type/size"}),e.jsx(r.Pre,{children:`const fileZod = z.object({
  avatar: z.instanceof(File, { message: "Please select a file" })
    .refine((f) => f.size <= 2 * 1024 * 1024, "Max 2MB")
    .refine((f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type), "JPG/PNG/WEBP only"),
});`}),e.jsx(r.H3,{children:"Yup — file type/size"}),e.jsx(r.Pre,{children:`const fileYup = yup.object({
  avatar: yup
    .mixed()
    .required("Please select a file")
    .test("size", "Max 2MB", (f) => f && f.size <= 2 * 1024 * 1024)
    .test("type", "JPG/PNG/WEBP only", (f) => f && ["image/jpeg", "image/png", "image/webp"].includes(f.type)),
});`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Manual Validation (no form library)"}),e.jsx(r.H3,{children:"Zod — safeParse"}),e.jsx(r.Pre,{children:`const res = account.safeParse(formValues);
if (!res.success) {
  // res.error.format() -> field-level messages
  console.log(res.error.flatten());
} else {
  // res.data is typed (TS) and transformed
  console.log(res.data);
}`}),e.jsx(r.H3,{children:"Yup — validate / try/catch"}),e.jsx(r.Pre,{children:`try {
  const ok = await accountYup.validate(formValues, { abortEarly: false });
  console.log(ok);
} catch (err) {
  // err is a Yup ValidationError: err.inner has per-field errors
  console.log(err.errors);
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don’t"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep one schema per form (or per step) as the single source of truth."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use cross-field rules for dates, password confirm, totals, etc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," normalize inputs (trim/coerce) inside the schema where sensible."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," duplicate rules in both UI and schema; UI can hint, but schema must be authoritative."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," hide errors; show clear field-level messages and disable submit while invalid/processing."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"abortEarly:"})," stop at first error (default in some libs). Prefer collecting all errors (",e.jsx("i",{children:"abortEarly: false"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"coercion:"})," convert raw inputs into intended types (string → number/Date)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"discriminated union (Zod):"})," variant object shapes selected by a literal tag field."]}),e.jsxs("li",{children:[e.jsx("b",{children:"resolver:"})," plugin adapter that connects a schema to a form library."]})]})]}),e.jsx(r.Callout,{children:"Summary: pick a schema library (Yup or Zod), define all rules in one place, connect it via a resolver (RHF/Formik), and prefer cross-field refinements for real-world rules. Normalize early, surface clear errors, and keep UI logic thin."})]});export{o as default};
