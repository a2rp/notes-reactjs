import{j as e}from"./index-CLbx3UkF.js";import{S as n}from"./styled-D0T59gVv.js";const s=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"TSX Basics (TypeScript + React)"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"TSX"})," is “TypeScript flavored JSX.” You write React components in ",e.jsx("b",{children:".tsx"})," files and annotate values with types so the compiler can catch mistakes ",e.jsx("i",{children:"before"})," runtime."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"What is TSX? Why use it?"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"JSX:"})," a JavaScript syntax extension that looks like HTML but compiles to"," ",e.jsx(n.InlineCode,{children:"React.createElement"})," calls (or the automatic JSX transform)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"TS:"})," a typed superset of JavaScript that adds ",e.jsx("i",{children:"static types"})," (checked at build time)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"TSX:"})," JSX syntax inside TypeScript files (",e.jsx(n.InlineCode,{children:".tsx"}),") so you can type props, state, refs, events, etc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Benefits:"})," autocomplete, safer refactors, API self-documentation, fewer runtime bugs."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Project setup (at a glance)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use ",e.jsx("b",{children:".tsx"})," for React components. Non-JSX TypeScript can live in ",e.jsx("b",{children:".ts"}),"."]}),e.jsxs("li",{children:["In ",e.jsx(n.InlineCode,{children:"tsconfig.json"}),", ensure"," ",e.jsx(n.InlineCode,{children:'"jsx": "react-jsx"'})," (or ",e.jsx(n.InlineCode,{children:'"react-jsxdev"'}),")."]}),e.jsxs("li",{children:["You can mix .js and .tsx in one project, but prefer consistent ",e.jsx("b",{children:".tsx"})," for components in TS sections."]})]}),e.jsx(n.Pre,{children:`// tsconfig.json (minimal bits)
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "Bundler",
    "skipLibCheck": true
  }
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Core React types you'll meet"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"React.ReactNode"}),": anything renderable (string, number, JSX, array, fragments, portals, etc.)."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"React.ElementType"}),": any component or intrinsic tag (like"," ",e.jsx(n.InlineCode,{children:'"button"'}),")."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:'React.ComponentProps<"button">'}),": props for a native element or component."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"React.ChangeEvent<HTMLInputElement>"}),","," ",e.jsx(n.InlineCode,{children:"React.MouseEvent<HTMLButtonElement>"}),": typed events."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"React.RefObject<T>"}),","," ",e.jsx(n.InlineCode,{children:"React.MutableRefObject<T>"}),": refs and their current values."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Typing props in a function component"}),e.jsx(n.Pre,{children:`// Button.tsx
type ButtonProps = {
  /** Visible label on the button */
  label: string;
  /** Optional click handler; receives a typed MouseEvent */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Visual style variant with a union type */
  variant?: "primary" | "secondary" | "ghost";
  /** Disabled state */
  disabled?: boolean;
};

export default function Button({ label, onClick, variant = "primary", disabled = false }: ButtonProps) {
  return (
    <button
      className={\`btn \${variant}\`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {label}
    </button>
  );
}

// Usage (TSX)
<Button label="Save" onClick={(e) => console.log(e.currentTarget)} variant="secondary" />`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Union types"}),' (e.g., "primary" | "secondary" | "ghost") give you intellisense for allowed values.']})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Typing state and refs"}),e.jsx(n.Pre,{children:`// Counter.tsx
import React from "react";

export default function Counter() {
  // Type argument makes intent explicit (number)
  const [count, setCount] = React.useState<number>(0);

  // A ref to a DOM node
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  function inc() { setCount((c) => c + 1); }
  function focusButton() { btnRef.current?.focus(); }

  return (
    <>
      <p>Count: {count}</p>
      <button ref={btnRef} onClick={inc}>Increment</button>
      <button onClick={focusButton}>Focus the increment button</button>
    </>
  );
}`}),e.jsxs(n.Small,{children:["If the initial state makes the type obvious (e.g., ",e.jsx(n.InlineCode,{children:"useState(0)"}),"), TS infers it; for ",e.jsx("i",{children:"null"})," or unions, pass a generic (e.g., ",e.jsx(n.InlineCode,{children:"useState<string | null>(null)"}),")."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Controlled inputs and event types"}),e.jsx(n.Pre,{children:`// TextInput.tsx
type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function TextInput({ value, onChange, placeholder }: TextInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value); // e is fully typed
  }
  return <input value={value} onChange={handleChange} placeholder={placeholder} />;
}
`}),e.jsxs(n.Small,{children:["Use ",e.jsx(n.InlineCode,{children:"React.ChangeEvent<HTMLInputElement>"})," for inputs,"," ",e.jsx(n.InlineCode,{children:"React.FormEvent<HTMLFormElement>"})," for forms,",e.jsx(n.InlineCode,{children:"React.MouseEvent<HTMLButtonElement>"})," for buttons, etc."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Children and composition (quick intro)"}),e.jsx(n.Pre,{children:`// Card.tsx
type CardProps = {
  title: string;
  children: React.ReactNode; // anything renderable
};

export default function Card({ title, children }: CardProps) {
  return (
    <section className="card">
      <h3>{title}</h3>
      <div className="content">{children}</div>
    </section>
  );
}

// Usage
<Card title="Profile"><strong>Ashish</strong> — MERN Developer</Card>`}),e.jsxs(n.Small,{children:["We'll go deeper in ",e.jsx("b",{children:"Typing Children"}),", but for now know that"," ",e.jsx(n.InlineCode,{children:"React.ReactNode"})," is the usual type for ",e.jsx("i",{children:"anything"})," you render."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Forwarding native props (preview)"}),e.jsx(n.Pre,{children:`// IconButton.tsx — combine your props with native <button> props
type IconButtonProps = {
  icon: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function IconButton({ icon, children, ...buttonProps }: IconButtonProps) {
  return (
    <button {...buttonProps}>
      <span aria-hidden>{icon}</span>
      {children}
    </button>
  );
}

// Usage gets full button props autocomplete:
<IconButton icon={<svg />} onClick={() => {}} disabled>Save</IconButton>`}),e.jsxs(n.Small,{children:["Using ",e.jsx(n.InlineCode,{children:"& React.ButtonHTMLAttributes<HTMLButtonElement>"})," merges your API with all valid button attributes (accessible, flexible)."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," enable ",e.jsx(n.InlineCode,{children:'"strict": true'})," in tsconfig."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer explicit unions for finite options (e.g., variants, sizes)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," type events precisely (",e.jsx(n.InlineCode,{children:"ChangeEvent<HTMLInputElement>"}),", etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," use ",e.jsx(n.InlineCode,{children:"any"})," by default—reach for ",e.jsx(n.InlineCode,{children:"unknown"})," or proper generics later."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," overuse ",e.jsx(n.InlineCode,{children:"React.FC"}),"; a plain typed function is usually clearer and avoids implicit ",e.jsx(n.InlineCode,{children:"children"}),"."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary (quick definitions)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Type annotation:"})," a declared type for a variable, parameter, or return value."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Interface vs type alias:"})," both name shapes of objects; interfaces are extendable via declaration merging; type aliases can use unions/intersections."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Union type:"})," a value that can be ",e.jsx("i",{children:"one of several"})," types (e.g., ",e.jsx(n.InlineCode,{children:'"sm" | "md" | "lg"'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Generic:"})," a reusable type parameter (e.g., ",e.jsx(n.InlineCode,{children:"Array<T>"}),")—covered in the “Generics” topic."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Intrinsic element:"})," a built-in HTML tag like ",e.jsx(n.InlineCode,{children:'"div"'})," or ",e.jsx(n.InlineCode,{children:'"button"'}),"."]})]})]}),e.jsx(n.Callout,{children:"Summary: TSX lets you write React with types—start by typing props, state, refs, and events. Prefer strict mode, precise event types, and small, composable components."})]});export{s as default};
