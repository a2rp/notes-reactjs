import{j as e}from"./index-BExKNf87.js";import{S as n}from"./styled-DKnHlrih.js";const l=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"JSX Basics"}),e.jsxs(n.Lead,{children:["JSX is a syntax extension for JavaScript that looks like HTML and describes UI. It compiles to ",e.jsx(n.InlineCode,{children:"React.createElement"})," calls."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Why JSX is useful"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"UI structure and JavaScript logic live together (components)."}),e.jsx("li",{children:"Conditional blocks and loops become plain JavaScript expressions."}),e.jsx("li",{children:"Static analysis and type checking work better than template strings."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Returning JSX from a component"}),e.jsx(n.Pre,{children:e.jsx("code",{children:`function Welcome() {
  return <h2>Welcome to React</h2>;
}

// Usage: <Welcome />`})}),e.jsxs(n.Small,{children:["Component names start with a capital letter (",e.jsx(n.InlineCode,{children:"Welcome"}),")."]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Embedding JavaScript with ","{}"]}),e.jsxs("p",{children:["Curly braces evaluate a JavaScript ",e.jsx("b",{children:"expression"})," (not statements) and insert the result."]}),e.jsx(n.Pre,{children:e.jsx("code",{children:`const user = { first: "Ada", last: "Lovelace" };
const full = \`\${user.first} \${user.last}\`;

function Card() {
  const year = new Date().getFullYear();
  return (
    <div>
      <h3>{full}</h3>
      <p>Year: {year}</p>
      <p>Upper: {"hello".toUpperCase()}</p>
    </div>
  );
}`})}),e.jsxs(n.Small,{children:["Valid: values, function calls, ternaries. Invalid: ",e.jsx("em",{children:"statements"})," like ",e.jsx("code",{children:"if"}),","," ",e.jsx("code",{children:"for"})," (use expressions instead)."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Attributes & differences from HTML"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Names are ",e.jsx("b",{children:"camelCased"}),":"," ",e.jsx(n.InlineCode,{children:"className"}),","," ",e.jsx(n.InlineCode,{children:"htmlFor"}),","," ",e.jsx(n.InlineCode,{children:"tabIndex"}),","," ",e.jsx(n.InlineCode,{children:"autoFocus"}),"."]}),e.jsxs("li",{children:["Strings can be written as ",e.jsx(n.InlineCode,{children:'"text"'})," or in braces:"," ",e.jsx(n.InlineCode,{children:'title={"Hello"}'}),"."]}),e.jsxs("li",{children:["Booleans: presence means ",e.jsx("em",{children:"true"}),"; use braces for false/expressions."]}),e.jsx("li",{children:"Inline styles use a JS object with camelCased CSS properties."}),e.jsxs("li",{children:["Event handlers use ",e.jsx(n.InlineCode,{children:"onClick"}),","," ",e.jsx(n.InlineCode,{children:"onChange"})," and expect a ",e.jsx("b",{children:"function"}),", not the result of calling one."]})]}),e.jsx(n.Pre,{children:e.jsx("code",{children:`<button
  className="primary"
  disabled={false}
  style={{ backgroundColor: "teal", padding: "8px 12px" }}
  onClick={() => console.log("clicked")}
>
  Click
</button>`})})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"One parent element (root) per return"}),e.jsxs("p",{children:["JSX must return a single root node. Wrap siblings in a parent element or a fragment (",e.jsx(n.InlineCode,{children:"<>...</>"}),"). A dedicated page covers fragments in detail."]}),e.jsx(n.Pre,{children:e.jsx("code",{children:`function Panel() {
  return (
    <>
      <h4>Title</h4>
      <p>Content</p>
    </>
  );
}`})})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Conditional snippets (quick taste)"}),e.jsx("p",{children:"A full page covers conditional rendering, but the two most common patterns are:"}),e.jsx(n.Pre,{children:e.jsx("code",{children:`// 1) Ternary
{isLoading ? <Spinner /> : <List />}

// 2) Logical AND (renders right side when truthy)
{error && <p className="error">{error.message}</p>}`})})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Rendering lists (quick taste)"}),e.jsx("p",{children:"A full page covers lists & keys. Keys must be stable and unique among siblings."}),e.jsx(n.Pre,{children:e.jsx("code",{children:`const users = [{id: 1, name: "Ada"}, {id: 2, name: "Linus"}];

<ul>
  {users.map(u => <li key={u.id}>{u.name}</li>)}
</ul>`})})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Self-closing and nesting rules"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Self-close tags with no children: ",e.jsx(n.InlineCode,{children:"<img />"}),", ",e.jsx(n.InlineCode,{children:"<input />"}),"."]}),e.jsxs("li",{children:["Use a closing tag for custom components: ",e.jsx(n.InlineCode,{children:"<Card></Card>"})," or ",e.jsx(n.InlineCode,{children:"<Card />"}),"."]}),e.jsx("li",{children:"Lowercase tag names are treated as DOM elements; Capitalized names refer to React components."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common pitfalls"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Using ",e.jsx(n.InlineCode,{children:"class"})," instead of ",e.jsx(n.InlineCode,{children:"className"}),"."]}),e.jsxs("li",{children:["Calling an event handler instead of passing a function:"," ",e.jsx(n.InlineCode,{children:"onClick={handle()}"})," ❌ →"," ",e.jsx(n.InlineCode,{children:"onClick={handle}"})," ✅"]}),e.jsx("li",{children:"Mixing statements inside braces. Use expressions (e.g., ternary) or move logic above."}),e.jsxs("li",{children:["Rendering objects directly (shows ",e.jsx("em",{children:"[object Object]"}),"). Convert or stringify."]})]}),e.jsx(n.Pre,{children:e.jsx("code",{children:`// Good: stringify or pick a field
<p>{JSON.stringify(user)}</p>
<p>{user.name}</p>`})})]}),e.jsxs(n.Callout,{children:["Summary: JSX is an expression-friendly way to describe UI with HTML-like syntax. Remember camelCased attributes, one root node, functions for events, and expressions inside ","{}","."]})]});export{l as default};
