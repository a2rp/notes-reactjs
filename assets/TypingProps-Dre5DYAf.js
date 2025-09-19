import{j as e}from"./index-CDxhzYTb.js";import{S as n}from"./styled-DdnDEmQm.js";const s=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Typing Props (TypeScript)"}),e.jsxs(n.Lead,{children:["In TypeScript, ",e.jsx("b",{children:"props"})," are typed so that components receive the",e.jsx("i",{children:" right shape of data"})," at compile time. You typically define a"," ",e.jsx("b",{children:"Props"})," type (or interface) and annotate the component with it. This catches mistakes early and makes usage self-documenting."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Core Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Prop:"})," A value passed from a parent component to a child component. Props are ",e.jsx("i",{children:"read-only"})," inside the child."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Type alias:"})," A named type using"," ",e.jsx(n.InlineCode,{children:"type"}),". Great for unions, intersections, and mapped types."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Interface:"})," A named structural contract using"," ",e.jsx(n.InlineCode,{children:"interface"}),". Can be extended and merged (declaration merging)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Optional property:"})," Marked with"," ",e.jsx(n.InlineCode,{children:"?"}),"; may be omitted or"," ",e.jsx(n.InlineCode,{children:"undefined"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Union type:"})," A value that can be one of several types (e.g.",e.jsx(n.InlineCode,{children:'"primary" | "ghost"'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Intersection type:"})," Combine multiple object types into one with ",e.jsx(n.InlineCode,{children:"&"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Discriminated union:"})," A union of objects that share a common discriminator field (e.g. ",e.jsx(n.InlineCode,{children:"kind"}),"), enabling safe switches."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Basic Props: Required vs Optional"}),e.jsx(n.Pre,{children:`// interface or type — both are fine
interface BadgeProps {
  label: string;           // required
  count?: number;          // optional
  showDot?: boolean;       // optional boolean
}

// Recommended: annotate the function parameter
function Badge({ label, count = 0, showDot = false }: BadgeProps) {
  return (
    <div className="badge">
      {label} {count > 0 ? \`(\${count})\` : null} {showDot && "•"}
    </div>
  );
}

// Usage (TS checks shape and types)
<Badge label="Notifications" count={3} />
<Badge label="Inbox" showDot />
// Error examples:
// <Badge />                  // Property 'label' is missing
// <Badge label={42} />       // 'number' not assignable to 'string'`}),e.jsxs(n.Small,{children:["Use default values in the ",e.jsx("i",{children:"destructuring"})," to avoid"," ",e.jsx(n.InlineCode,{children:"defaultProps"})," (not recommended for function components)."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Variants with Literal Unions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Constrain strings to a small set of allowed values (e.g."," ",e.jsx(n.InlineCode,{children:'"primary" | "secondary"'}),")."]}),e.jsxs("li",{children:["This improves autocomplete and prevents typos like"," ",e.jsx(n.InlineCode,{children:'"primray"'}),"."]})]}),e.jsx(n.Pre,{children:`type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button({ variant = "primary", size = "md", ...rest }: ButtonProps) {
  return <button data-variant={variant} data-size={size} {...rest} />;
}

<Button variant="ghost" size="sm" />;
<Button variant="primary" onClick={(e) => console.log(e.currentTarget)} />;
// <Button variant="big" />            // Error: not assignable to 'ButtonSize'`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Function Props & Event Types"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use React's event types:"," ",e.jsx(n.InlineCode,{children:"React.MouseEvent<HTMLButtonElement>"}),","," ",e.jsx(n.InlineCode,{children:"React.ChangeEvent<HTMLInputElement>"}),","," ",e.jsx(n.InlineCode,{children:"React.FormEvent<HTMLFormElement>"}),"."]}),e.jsxs("li",{children:["For callbacks without DOM events, write plain function types, e.g."," ",e.jsx(n.InlineCode,{children:"(value: string) => void"}),"."]})]}),e.jsx(n.Pre,{children:`type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

function Search({ value, onChange, onSubmit }: SearchProps) {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)} // ChangeEvent<HTMLInputElement>
      />
      <button type="submit">Go</button>
    </form>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Extending Native Element Props (Polymorphism-lite)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use ",e.jsx(n.InlineCode,{children:"React.ComponentProps"})," (or"," ",e.jsx(n.InlineCode,{children:"ComponentPropsWithoutRef"}),") to inherit props from an intrinsic element (e.g.,"," ",e.jsx(n.InlineCode,{children:'"button"'}),","," ",e.jsx(n.InlineCode,{children:'"a"'}),")."]}),e.jsxs("li",{children:["Omit conflicting fields with"," ",e.jsx(n.InlineCode,{children:'Omit<..., "propName">'}),"."]})]}),e.jsx(n.Pre,{children:`type NativeButtonProps = React.ComponentPropsWithoutRef<"button">;

type IconButtonProps = Omit<NativeButtonProps, "children"> & {
  label: string;                     // accessible name
  icon: React.ReactNode;             // renderable icon
};

function IconButton({ label, icon, ...rest }: IconButtonProps) {
  return (
    <button aria-label={label} {...rest}>
      {icon}
    </button>
  );
}

// Now IconButton accepts 'onClick', 'disabled', 'type', etc., with correct types.`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Exclusive Props with Discriminated Unions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Create “either/or” APIs (e.g., a Button that behaves like a link",e.jsx("i",{children:"or"})," a button) using a shared discriminator."]}),e.jsx("li",{children:"Consumers get compile-time errors if they pass incompatible combinations."})]}),e.jsx(n.Pre,{children:`type LinkLike = { kind: "link"; href: string; target?: "_blank" | "_self" };
type ButtonLike = { kind: "button"; onClick?: () => void; type?: "button" | "submit" };

type SmartButtonProps = (LinkLike | ButtonLike) & {
  children: React.ReactNode;
};

function SmartButton(props: SmartButtonProps) {
  if (props.kind === "link") {
    return <a href={props.href} target={props.target}>{props.children}</a>;
  }
  return <button type={props.type ?? "button"} onClick={props.onClick}>{props.children}</button>;
}

// Usage:
// <SmartButton kind="link" href="/docs">Docs</SmartButton>
// <SmartButton kind="button" onClick={() => ...}>Click</SmartButton>
// <SmartButton kind="link" onClick={() => ...} />
//    ^ Error: 'onClick' doesn't exist on 'LinkLike'`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Patterns & Best Practices"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Prefer ",e.jsx(n.InlineCode,{children:"type Props = {...}"})," or"," ",e.jsx(n.InlineCode,{children:"interface Props {...}"})," ","on function components. Avoid ",e.jsx(n.InlineCode,{children:"React.FC"})," in libraries because it implicitly adds ",e.jsx(n.InlineCode,{children:"children"})," and can hide errors."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"literal unions"})," for variants (e.g., color, size) to improve autocomplete and avoid typos."]}),e.jsxs("li",{children:["Use ",e.jsx(n.InlineCode,{children:"Omit"})," /"," ",e.jsx(n.InlineCode,{children:"Pick"})," when extending native element props."]}),e.jsxs("li",{children:["Prefer ",e.jsx("b",{children:"explicit"})," function prop types over ",e.jsx(n.InlineCode,{children:"any"}),". If unsure, use ",e.jsx(n.InlineCode,{children:"unknown"})," and narrow inside."]}),e.jsxs("li",{children:["Keep props minimal and cohesive. If a prop drives multiple behaviors, consider",e.jsx("b",{children:" splitting"})," it or using a discriminated union."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common Pitfalls"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Using ",e.jsx(n.InlineCode,{children:"any"})," for props: lose type safety and IntelliSense. Type confidently, even if broad."]}),e.jsxs("li",{children:["Relying on ",e.jsx(n.InlineCode,{children:"defaultProps"})," for function components: prefer default values in parameter destructuring."]}),e.jsx("li",{children:"Making everything optional: this weakens the API. Decide what's truly required."}),e.jsxs("li",{children:["Overusing boolean flags: prefer enums/unions (e.g.,"," ",e.jsx(n.InlineCode,{children:"variant"}),")."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Structural typing:"})," TypeScript checks that the ",e.jsx("i",{children:"shape"})," matches, not the name."]}),e.jsxs("li",{children:[e.jsx("b",{children:"PropsWithChildren<T>:"})," Utility that adds"," ",e.jsx(n.InlineCode,{children:"children?: React.ReactNode"})," to a props type (we cover children in a separate topic)."]}),e.jsxs("li",{children:[e.jsx("b",{children:'ComponentProps<"tag">:'})," Gets the props type of an intrinsic element like"," ",e.jsx(n.InlineCode,{children:'"button"'})," or ",e.jsx(n.InlineCode,{children:'"a"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Declaration merging:"})," Interfaces with the same name can merge shapes (advanced pattern—use sparingly)."]})]})]}),e.jsxs(n.Callout,{children:["Summary: Define a clear ",e.jsx("b",{children:"Props"})," type, mark optional fields with"," ",e.jsx(n.InlineCode,{children:"?"}),", use literal unions for variants, and lean on"," ",e.jsx(n.InlineCode,{children:"ComponentProps"})," to extend native attributes. Prefer explicit callback/event types and keep the API minimal and predictable."]})]});export{s as default};
