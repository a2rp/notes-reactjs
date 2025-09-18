import{j as e}from"./index-DVAje__H.js";import{S as r}from"./styled-kcIcb3Od.js";const i=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"React Hook Form (RHF)"}),e.jsxs(r.Lead,{children:[e.jsx("b",{children:"React Hook Form"})," is a lightweight form library that favors ",e.jsx("b",{children:"uncontrolled inputs"}),", minimizes re-renders, and gives you a simple API for validation, errors, and submission. It works great with native inputs and UI libraries via ",e.jsx(r.InlineCode,{children:"Controller"}),"."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Definition & Why RHF"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled inputs:"})," the browser owns the input value; React reads it when needed. This reduces re-renders vs fully controlled forms."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Register pattern:"})," connect inputs with ",e.jsx(r.InlineCode,{children:"register(name, rules)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Validation:"})," use built-in rules or plug-in a ",e.jsx("em",{children:"resolver"})," (Zod/Yup) for schema validation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Performance:"})," fewer renders, field-level updates, and cheap form state tracking."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Core Concepts & API"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsxs(r.InlineCode,{children:["useForm(","defaultValues, mode",")"]})," initializes the form."]}),e.jsxs("li",{children:[e.jsx(r.InlineCode,{children:"register(name, rules)"})," wires an input."]}),e.jsxs("li",{children:[e.jsx(r.InlineCode,{children:"handleSubmit(onValid, onInvalid)"})," handles submit flow."]}),e.jsxs("li",{children:[e.jsx(r.InlineCode,{children:"formState"})," exposes ",e.jsx(r.InlineCode,{children:"errors, isDirty, isValid, isSubmitting, touchedFields"}),", etc."]}),e.jsxs("li",{children:[e.jsx(r.InlineCode,{children:"watch(names)"})," subscribe to field values; ",e.jsx(r.InlineCode,{children:"reset, setValue, trigger"})," control form programmatically."]}),e.jsxs("li",{children:[e.jsx(r.InlineCode,{children:"Controller"})," integrates ",e.jsx("em",{children:"controlled"})," components (e.g., custom selects, date pickers)."]}),e.jsxs("li",{children:[e.jsx(r.InlineCode,{children:"useFieldArray"})," manages dynamic lists (addresses, phones, etc.)."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Basic Form (required, patterns, numbers)"}),e.jsx(r.Pre,{children:`import { useForm } from "react-hook-form";

function SignupForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } =
    useForm({
      mode: "onTouched",                 // when to validate: onChange | onBlur | onTouched | onSubmit
      defaultValues: { name: "", email: "", age: "", terms: false }
    });

  async function onSubmit(data) {
    // simulate async submit
    await new Promise(r => setTimeout(r, 600));
    console.log("submitted", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label>
        Name
        <input
          type="text"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Name must be at least 2 characters" }
          })}
          aria-invalid={!!errors.name}
        />
      </label>
      {errors.name && <span role="alert">{errors.name.message}</span>}

      <label>
        Email
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, message: "Enter a valid email" }
          })}
          aria-invalid={!!errors.email}
        />
      </label>
      {errors.email && <span role="alert">{errors.email.message}</span>}

      <label>
        Age
        <input
          type="number"
          {...register("age", {
            valueAsNumber: true,
            min: { value: 13, message: "You must be at least 13" },
            max: { value: 120, message: "Enter a realistic age" }
          })}
          aria-invalid={!!errors.age}
        />
      </label>
      {errors.age && <span role="alert">{errors.age.message}</span>}

      <label>
        <input type="checkbox" {...register("terms", { required: "Please accept the terms" })} />
        I accept the terms
      </label>
      {errors.terms && <span role="alert">{errors.terms.message}</span>}

      <button type="submit" disabled={isSubmitting || !isValid}>Create account</button>
    </form>
  );
}`}),e.jsxs(r.Small,{children:["Notes: use ",e.jsx(r.InlineCode,{children:"noValidate"})," to bypass native HTML popups and show custom messages.",e.jsx(r.InlineCode,{children:"valueAsNumber"})," converts the input string to a number for you."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Schema Validation (Zod via Resolver)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["A ",e.jsx("b",{children:"resolver"})," adapts your schema library to RHF. Popular choices: Zod, Yup."]}),e.jsx("li",{children:"Centralizes rules, gives typed data (if you use TypeScript), and consistent error messages."})]}),e.jsx(r.Pre,{children:`import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "At least 8 characters"),
  confirm: z.string()
}).refine((data) => data.password === data.confirm, {
  message: "Passwords must match",
  path: ["confirm"]
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(schema), defaultValues: { email: "", password: "", confirm: "" } });

  async function onSubmit(values) {
    // submit to server
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <input placeholder="Email" {...register("email")} aria-invalid={!!errors.email} />
      {errors.email && <span role="alert">{errors.email.message}</span>}

      <input type="password" placeholder="Password" {...register("password")} aria-invalid={!!errors.password} />
      {errors.password && <span role="alert">{errors.password.message}</span>}

      <input type="password" placeholder="Confirm password" {...register("confirm")} aria-invalid={!!errors.confirm} />
      {errors.confirm && <span role="alert">{errors.confirm.message}</span>}

      <button disabled={isSubmitting}>Login</button>
    </form>
  );
}`})]}),e.jsxs(r.Section,{children:[e.jsxs(r.H2,{children:["Using Controlled Components with ",e.jsx("code",{children:"Controller"})]}),e.jsxs(r.List,{children:[e.jsx("li",{children:"Use when a component manages its own value/changes (e.g., UI library Select, DatePicker, custom Toggle)."}),e.jsxs("li",{children:[e.jsx(r.InlineCode,{children:"Controller"})," bridges RHF and your component by mapping ",e.jsx("em",{children:"value"})," and ",e.jsx("em",{children:"onChange"}),"."]})]}),e.jsx(r.Pre,{children:`import { useForm, Controller } from "react-hook-form";

function PreferencesForm() {
  const { control, handleSubmit } = useForm({ defaultValues: { theme: "dark", notifications: true } });

  function onSubmit(v) { console.log(v); }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Custom Select example */}
      <Controller
        name="theme"
        control={control}
        rules={{ required: "Pick a theme" }}
        render={({ field, fieldState }) => (
          <>
            <MySelect
              value={field.value}
              onChange={field.onChange}
              options={["light", "dark", "system"]}
            />
            {fieldState.error && <span role="alert">{fieldState.error.message}</span>}
          </>
        )}
      />

      {/* Custom Toggle example */}
      <Controller
        name="notifications"
        control={control}
        render={({ field }) => <MyToggle checked={field.value} onChange={field.onChange} />}
      />

      <button>Save</button>
    </form>
  );
}`}),e.jsxs(r.Small,{children:["Tip: pass ",e.jsx(r.InlineCode,{children:"rules"})," to ",e.jsx(r.InlineCode,{children:"Controller"})," for validation. Read errors via ",e.jsx(r.InlineCode,{children:"fieldState.error"}),"."]})]}),e.jsxs(r.Section,{children:[e.jsxs(r.H2,{children:["Dynamic Fields with ",e.jsx("code",{children:"useFieldArray"})]}),e.jsx(r.Pre,{children:`import { useForm, useFieldArray } from "react-hook-form";

function SkillsForm() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: { skills: [{ name: "" }] }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  function onSubmit(values) { console.log(values); }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((f, i) => (
        <div key={f.id}>
          <input placeholder="Skill" {...register(\`skills.\${i}.name\`, { required: "Required" })} />
          <button type="button" onClick={() => remove(i)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "" })}>Add skill</button>
      <button type="submit">Save</button>
    </form>
  );
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Form State, Watch, Reset & Server Errors"}),e.jsx(r.Pre,{children:`import { useForm } from "react-hook-form";

function ProfileForm() {
  const { register, handleSubmit, formState, watch, reset, setError, clearErrors } =
    useForm({ defaultValues: { username: "" }, mode: "onChange" });

  const liveUser = watch("username"); // live value

  async function onSubmit(v) {
    const ok = await fakeCheckAvailability(v.username);
    if (!ok) {
      setError("username", { type: "server", message: "Username already taken" });
      return;
    }
    clearErrors("username");
    // ...save...
    reset({ username: "" }); // clear after save
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", { required: "Enter a username" })} />
      {formState.errors.username && <span role="alert">{formState.errors.username.message}</span>}
      <div>Preview: {liveUser}</div>
      <button disabled={formState.isSubmitting || !formState.isValid}>Save</button>
    </form>
  );
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"File Upload (Basics)"}),e.jsx(r.Pre,{children:`import { useForm } from "react-hook-form";

function AvatarForm() {
  const { register, handleSubmit, watch } = useForm();
  const fileList = watch("avatar"); // FileList or undefined
  const file = fileList?.[0];

  function onSubmit(data) {
    const fd = new FormData();
    if (file) fd.append("avatar", file);
    // fetch("/upload", { method: "POST", body: fd })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" accept="image/*" {...register("avatar", { required: "Pick an image" })} />
      {file && <p>Selected: {file.name} ({Math.round(file.size / 1024)} KB)</p>}
      <button>Upload</button>
    </form>
  );
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don’t"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," set ",e.jsx(r.InlineCode,{children:"defaultValues"})," for stable initial state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(r.InlineCode,{children:"mode"})," intentionally (",e.jsx(r.InlineCode,{children:"onChange"})," for live feedback, ",e.jsx(r.InlineCode,{children:"onTouched"})," for gentler UX)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," mark errors accessibly: ",e.jsx(r.InlineCode,{children:"aria-invalid"})," on inputs and ",e.jsx(r.InlineCode,{children:'role="alert"'})," for messages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mix controlled and uncontrolled patterns on the same input (e.g., changing ",e.jsx(r.InlineCode,{children:"value"})," from undefined to string)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," forget to pass ",e.jsx(r.InlineCode,{children:"name"})," and register each field—RHF needs it to track values."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," rely only on client-side validation; re-validate on the server and display server errors via ",e.jsx(r.InlineCode,{children:"setError"}),"."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled input:"})," the DOM holds the value; React reads it (via refs/events) when needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled input:"})," value lives in React state; every change triggers a re-render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Resolver:"})," adapter that lets RHF validate using a schema library like Zod/Yup."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controller:"})," wrapper that binds a controlled component to RHF’s ",e.jsx("em",{children:"value/onChange"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Field array:"})," a repeatable set of fields managed with ",e.jsx(r.InlineCode,{children:"useFieldArray"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mode:"})," when validation runs (",e.jsx(r.InlineCode,{children:"onSubmit"}),", ",e.jsx(r.InlineCode,{children:"onBlur"}),", ",e.jsx(r.InlineCode,{children:"onChange"}),", ",e.jsx(r.InlineCode,{children:"onTouched"}),")."]})]})]}),e.jsxs(r.Callout,{children:["Summary: Prefer uncontrolled inputs + ",e.jsx("b",{children:"register"})," for performance, reach for ",e.jsx("b",{children:"Controller"})," when a component ",e.jsx("i",{children:"must"})," be controlled, use a schema ",e.jsx("b",{children:"resolver"})," for robust validation, and present accessible error messages. Keep server validation in the loop."]})]});export{i as default};
