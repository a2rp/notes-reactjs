import{j as e}from"./index-BUVRD3Bm.js";import{S as n}from"./styled-D6Sol--9.js";const t=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Typing Children (TypeScript)"}),e.jsxs(n.Lead,{children:["In React, ",e.jsx("b",{children:"children"})," are the nested contents between a component's opening and closing tags. In TypeScript, we explicitly type them for clarity, safety, and good DX. Most of the time you'll use ",e.jsx(n.InlineCode,{children:"ReactNode"}),", but there are important cases for ",e.jsx(n.InlineCode,{children:"ReactElement"}),", render-prop functions, and even restricting children to specific component types."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary (precise definitions)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Child / Children:"})," Anything nested inside a component: text, numbers, elements, fragments, portals, ",e.jsx("i",{children:"false"}),", ",e.jsx("i",{children:"null"}),", etc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ReactNode:"})," A union type that represents anything React can render: elements, strings, numbers, fragments, portals, booleans, ",e.jsx("i",{children:"null/undefined"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ReactElement:"})," A concrete element object created by JSX (e.g. ",e.jsx(n.InlineCode,{children:"<div />"}),"). Usually you'll use",e.jsx(n.InlineCode,{children:"ReactElement<Props, Type>"})," or the simpler ",e.jsx(n.InlineCode,{children:"JSX.Element"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"JSX.Element:"}),' Alias for a React element produced by JSX. Think "a single element instance."']}),e.jsxs("li",{children:[e.jsx("b",{children:"PropsWithChildren<P>:"})," TS utility that adds ",e.jsx(n.InlineCode,{children:"children?: ReactNode"})," to your props."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Render prop:"})," A pattern where ",e.jsx(n.InlineCode,{children:"children"})," is a ",e.jsx("i",{children:"function"})," that returns ReactNode, letting parents control rendering."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Slot / asChild:"})," A pattern where a component expects exactly one element child and injects props into it (via ",e.jsx(n.InlineCode,{children:"cloneElement"}),")."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"When to use ReactNode vs ReactElement"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use ReactNode"}),' for general "anything renderable" content (text, elements, fragments...). This is the default for layout components like Card, Stack, ModalBody.']}),e.jsxs("li",{children:[e.jsx("b",{children:"Use ReactElement"})," when you require an actual element instance (e.g., you need to ",e.jsx("i",{children:"cloneElement"})," it or enforce a certain element/component type)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use JSX.Element"}),' interchangeably with ReactElement for "a single element result."']}),e.jsxs("li",{children:[e.jsx("b",{children:"Use a function type"})," like ",e.jsx(n.InlineCode,{children:"(args) => ReactNode"})," for render-prop children."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Optional vs Required Children"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"PropsWithChildren"})," makes children ",e.jsx("i",{children:"optional"})," by default: ",e.jsx(n.InlineCode,{children:"children?: ReactNode"}),"."]}),e.jsxs("li",{children:["If your component ",e.jsx("b",{children:"requires"})," children, declare ",e.jsx(n.InlineCode,{children:"children: ReactNode"})," yourself instead of using PropsWithChildren."]})]}),e.jsx(n.Pre,{children:`// ✅ Optional children (common)
type BoxProps = React.PropsWithChildren<{ padding?: number }>;

function Box({ padding = 8, children }: BoxProps) {
  return <div style={{ padding }}>{children}</div>;
}

// ✅ Required children (declare explicitly)
type CardProps = { title: string; children: React.ReactNode };

function Card({ title, children }: CardProps) {
  return (
    <section>
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"General Case: children as ReactNode"}),e.jsx(n.Pre,{children:`type StackProps = {
  direction?: "row" | "column";
  gap?: number;
  children?: React.ReactNode;     // optional
};

function Stack({ direction = "column", gap = 8, children }: StackProps) {
  const style = {
    display: "flex",
    flexDirection: direction,
    gap,
  } as const;
  return <div style={style}>{children}</div>;
}

// Usage:
// <Stack gap={12}><Button/>Hello <strong>World</strong></Stack>`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"ReactNode"})," lets callers pass text, elements, or fragments—great for flexible layouts."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Restricting Children to a Specific Type"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Sometimes a component should only accept certain children (e.g., only ",e.jsx(n.InlineCode,{children:"<MenuItem/>"})," inside ",e.jsx(n.InlineCode,{children:"<Menu/>"}),")."]}),e.jsxs("li",{children:["Use ",e.jsx(n.InlineCode,{children:"ReactElement<typeof Component>"})," (and arrays) to enforce this at type level."]})]}),e.jsx(n.Pre,{children:`function MenuItem(props: { value: string; children: React.ReactNode }) {
  return <button role="menuitem" data-value={props.value}>{props.children}</button>;
}

type MenuProps = {
  // one or many MenuItem elements
  children:
    | React.ReactElement<typeof MenuItem>
    | React.ReactElement<typeof MenuItem>[];
};

function Menu({ children }: MenuProps) {
  return <div role="menu">{children}</div>;
}

// ✅ OK
// <Menu>
//   <MenuItem value="new">New</MenuItem>
//   <MenuItem value="open">Open…</MenuItem>
// </Menu>

// ❌ Type error: <div/> is not a MenuItem
// <Menu><div>Oops</div></Menu>`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Slot / asChild Pattern (Injecting Props)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Expect exactly one element child, then inject props (e.g., ",e.jsx(n.InlineCode,{children:"className"}),", ",e.jsx(n.InlineCode,{children:"onClick"}),") using ",e.jsx(n.InlineCode,{children:"cloneElement"}),"."]}),e.jsxs("li",{children:["Type children as ",e.jsx(n.InlineCode,{children:"ReactElement"}),"; optionally guard with ",e.jsx(n.InlineCode,{children:"isValidElement"})," at runtime."]})]}),e.jsx(n.Pre,{children:`type SlotProps = {
  children: React.ReactElement; // exactly one element
  onPress?: () => void;
};

function Slot({ children, onPress }: SlotProps) {
  if (!React.isValidElement(children)) {
    // Runtime guard (TypeScript already restricts this at compile time).
    throw new Error("Slot expects a single React element child.");
  }
  return React.cloneElement(children, {
    onClick: onPress,
    // merge className, aria, etc. as needed
  });
}

// Usage:
// <Slot onPress={() => console.log("pressed")}>
//   <button>Click me</button>
// </Slot>`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Render-Prop Children (Function as Child)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Define ",e.jsx(n.InlineCode,{children:"children"})," as a function that returns ",e.jsx(n.InlineCode,{children:"ReactNode"}),"."]}),e.jsx("li",{children:'Great for "data → UI" patterns, where parent controls the render.'})]}),e.jsx(n.Pre,{children:`type CounterProps = {
  initial?: number;
  children: (args: { count: number; inc: () => void; dec: () => void }) => React.ReactNode;
};

function Counter({ initial = 0, children }: CounterProps) {
  const [count, set] = React.useState(initial);
  const inc = () => set((c) => c + 1);
  const dec = () => set((c) => c - 1);
  return <>{children({ count, inc, dec })}</>;
}

// Usage:
// <Counter initial={5}>
//   {({ count, inc, dec }) => (
//     <div>
//       <button onClick={dec}>-</button>
//       <span>{count}</span>
//       <button onClick={inc}>+</button>
//     </div>
//   )}
// </Counter>`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Runtime Helpers & Guards"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"React.isValidElement(x)"}),": true if ",e.jsx(n.InlineCode,{children:"x"})," is a valid React element."]}),e.jsxs("li",{children:[e.jsx("b",{children:"React.Children.only(children)"}),": asserts exactly one child; throws otherwise."]}),e.jsxs("li",{children:[e.jsx("b",{children:"React.Children.map / toArray"}),": iterate/normalize children lists safely."]})]}),e.jsx(n.Pre,{children:`function OnlyChild({ children }: { children: React.ReactElement }) {
  // Extra safety at runtime:
  const only = React.Children.only(children);
  return <div className="only-child">{only}</div>;
}

function List({ children }: { children: React.ReactNode }) {
  return (
    <ul>
      {React.Children.map(children, (child, i) => (
        <li key={i}>{child}</li>
      ))}
    </ul>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(n.InlineCode,{children:"ReactNode"})," for flexible, general children."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(n.InlineCode,{children:"ReactElement"})," when you must clone or enforce element type."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," type render-prop children as functions returning ",e.jsx(n.InlineCode,{children:"ReactNode"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," assume children are always elements—text and ",e.jsx("i",{children:"null"})," are valid."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," accept ",e.jsx(n.InlineCode,{children:"any"})," for children; it defeats type safety."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"}),' forget runtime guards when you rely on "exactly one element" semantics.']})]})]}),e.jsxs(n.Callout,{children:["Summary: Default to ",e.jsx("b",{children:"ReactNode"}),". Use ",e.jsx("b",{children:"ReactElement"})," when you need an actual element instance (cloning or type-restricting). For render-prop patterns, type children as a function returning ",e.jsx("b",{children:"ReactNode"}),". Make children required only when it's semantically necessary."]})]});export{t as default};
