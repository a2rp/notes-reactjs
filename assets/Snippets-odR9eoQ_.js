import{j as e}from"./index-DqLKwkYK.js";import{S as s}from"./styled-DJJBmlUr.js";const r=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Snippets (VS Code)"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Snippets"})," are short triggers (like ",e.jsx(s.InlineCode,{children:"rfc"}),") that expand into larger code blocks (like a React component). They reduce typing, keep code consistent, and prevent copy-paste errors. In VS Code you can create your own snippets in JSON, scope them to specific languages, and share them per project."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Definition & Purpose"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Snippet:"})," a reusable code template expanded by a short ",e.jsx("em",{children:"prefix"}),". In VS Code, snippets live in JSON files and can be global or language-specific."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Goals:"})," speed up repetitive code, enforce team conventions, and guide beginners with pre-filled best practices."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scope:"})," make a snippet available in all files or limit it to languages (e.g.,",e.jsx(s.InlineCode,{children:"javascriptreact"}),","," ",e.jsx(s.InlineCode,{children:"typescriptreact"}),")."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Creating Snippets in VS Code"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Open the ",e.jsx("b",{children:"Command Palette"})," →"," ",e.jsx(s.InlineCode,{children:"Preferences: Configure User Snippets"}),"."]}),e.jsxs("li",{children:["Choose ",e.jsx("b",{children:"New Global Snippets file"})," (applies everywhere) or a language like"," ",e.jsx(s.InlineCode,{children:"javascriptreact"})," (React JSX),"," ",e.jsx(s.InlineCode,{children:"typescriptreact"}),", etc."]}),e.jsxs("li",{children:["VS Code creates a ",e.jsx(s.InlineCode,{children:".code-snippets"})," JSON file where you add entries."]})]}),e.jsx(s.Pre,{children:`// Example: ~/.config/Code/User/snippets/react-snippets.code-snippets (path varies by OS)
{
  "React Function Component": {
    "scope": "javascriptreact,typescriptreact",
    "prefix": "rfc",
    "description": "React function component (named, with default export)",
    "body": [
      "import React from 'react';",
      "",
      "export default function \${TM_FILENAME_BASE/[^a-zA-Z0-9]+/ /g}() {",
      "  return (",
      "    <div>\${1:Component content}</div>",
      "  );",
      "}"
    ]
  }
}`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"TM_FILENAME_BASE"})," is a VS Code variable that inserts the current file name without extension. The regex cleans non-alphanumerics to spaces."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Snippet Anatomy (Terms You'll See)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"prefix"}),": the trigger you type (e.g., ",e.jsx(s.InlineCode,{children:"rfc"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"body"}),": the array of lines to insert. Supports ",e.jsx("em",{children:"tabstops"}),","," ",e.jsx("em",{children:"placeholders"}),", ",e.jsx("em",{children:"choices"}),", and ",e.jsx("em",{children:"variables"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"scope"}),": comma-separated language IDs (e.g.,"," ",e.jsx(s.InlineCode,{children:"javascriptreact"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"description"}),": shown in IntelliSense."]})]}),e.jsx(s.H3,{children:"Tabstops & Placeholders"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Tabstop"}),": cursor stops you can jump through with Tab —"," ",e.jsx(s.InlineCode,{children:"$1"}),", ",e.jsx(s.InlineCode,{children:"$2"}),", … and ",e.jsx(s.InlineCode,{children:"$0"})," (final position)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Placeholder"}),": default text inside a tabstop —"," ",e.jsxs(s.InlineCode,{children:["\\$","{1:Button}"]}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Choice"}),": limited options —"," ",e.jsxs(s.InlineCode,{children:["\\$","{1|primary,secondary,ghost|}"]}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Variable"}),": editor data —"," ",e.jsxs(s.InlineCode,{children:["\\$","{TM_FILENAME_BASE}"]}),","," ",e.jsxs(s.InlineCode,{children:["\\$","{CURRENT_YEAR}"]}),","," ",e.jsxs(s.InlineCode,{children:["\\$","{CLIPBOARD}"]}),"."]})]}),e.jsx(s.Pre,{children:`{
  "Styled Component": {
    "scope": "javascriptreact,typescriptreact",
    "prefix": "stc",
    "description": "Create a styled-component block",
    "body": [
      "import styled from 'styled-components';",
      "",
      "export const \${1:Wrapper} = styled.\${2:div}\`",
      "  display: \${3:flex};",
      "  gap: \${4:12px};",
      "\`;",
      "",
      "$0"
    ]
  }
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Practical React Snippets (You Can Copy)"}),e.jsx(s.H3,{children:"1) Component + Props + Prop Defaults"}),e.jsx(s.Pre,{children:`{
  "React Component with Props": {
    "scope": "javascriptreact,typescriptreact",
    "prefix": "rcp",
    "description": "Component with props and sensible defaults",
    "body": [
      "import React from 'react';",
      "",
      "export default function \${1:\${TM_FILENAME_BASE}}({ \${2:title} = '\${3:Title}', \${4:items} = [] }) {",
      "  return (",
      "    <section>",
      "      <h2>{\${2:title}}</h2>",
      "      <ul>",
      "        {\${4:items}.map((it, i) => <li key={i}>{it}</li>)}",
      "      </ul>",
      "    </section>",
      "  );",
      "}"
    ]
  }
}`}),e.jsx(s.H3,{children:"2) useState pattern (with setter)"}),e.jsx(s.Pre,{children:`{
  "useState Boilerplate": {
    "scope": "javascriptreact,typescriptreact",
    "prefix": "us",
    "description": "State + setter with initial value",
    "body": [
      "const [\${1:value}, set\${1/(^.)/\${1:/upcase}/}] = React.useState(\${2:null});",
      "$0"
    ]
  }
}`}),e.jsxs(s.Small,{children:["The regex ",e.jsx(s.InlineCode,{children:"/(^.)/"})," +"," ",e.jsxs(s.InlineCode,{children:["\\$","{1:/upcase}"]})," uppercases the first letter for the setter name (e.g., ",e.jsx("i",{children:"value → setValue"}),")."]}),e.jsx(s.H3,{children:"3) useEffect with cleanup"}),e.jsx(s.Pre,{children:`{
  "useEffect with Cleanup": {
    "scope": "javascriptreact,typescriptreact",
    "prefix": "uec",
    "description": "Effect + cleanup + deps",
    "body": [
      "React.useEffect(() => {",
      "  \${1:// side-effect}",
      "  return () => {",
      "    \${2:// cleanup}",
      "  };",
      "}, [\${3:deps}]);",
      "$0"
    ]
  }
}`}),e.jsx(s.H3,{children:"4) Form handler + preventDefault"}),e.jsx(s.Pre,{children:`{
  "Form Submit Handler": {
    "scope": "javascriptreact,typescriptreact",
    "prefix": "hfs",
    "description": "Handle form submit w/ preventDefault",
    "body": [
      "function \${1:onSubmit}(e) {",
      "  e.preventDefault();",
      "  \${2:// TODO: validate & submit}",
      "}",
      "$0"
    ]
  }
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"How to Use (Step by Step)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Type the ",e.jsx("b",{children:"prefix"})," (e.g., ",e.jsx(s.InlineCode,{children:"rfc"}),") and accept from IntelliSense or press ",e.jsx("b",{children:"Tab"}),"."]}),e.jsxs("li",{children:["Press ",e.jsx("b",{children:"Tab"})," to jump through ",e.jsx("b",{children:"tabstops"})," (",e.jsx(s.InlineCode,{children:"$1"}),", ",e.jsx(s.InlineCode,{children:"$2"})," …, finish at ",e.jsx(s.InlineCode,{children:"$0"}),")."]}),e.jsxs("li",{children:["For ",e.jsx("b",{children:"choices"}),", use arrow keys or type to filter options."]}),e.jsxs("li",{children:["For ",e.jsx("b",{children:"placeholders"}),", simply type to replace the suggested value."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Team Workflow & Sharing"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Project snippets:"})," add"," ",e.jsx(s.InlineCode,{children:".vscode/your-project.code-snippets"})," to the repo so everyone shares the same triggers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Settings Sync:"})," VS Code can sync user snippets across machines."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid collisions:"})," pick unique prefixes (",e.jsx(s.InlineCode,{children:"ar-rcp"})," instead of"," ",e.jsx(s.InlineCode,{children:"rcp"}),") to avoid overlap with extensions."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Popular Extension: ES7+ React/Redux Snippets"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"What it is:"})," an extension that ships many React/Redux prefixes (e.g.,"," ",e.jsx(s.InlineCode,{children:"rafce"})," → arrow function component with export)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pros:"})," quick start, well-known prefixes, broad coverage."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cons:"})," can conflict with your own style; you may prefer custom snippets matching your architecture (e.g., styled-components, hooks-first)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," encode your best practices (semantics, accessibility, state patterns) into snippets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx("b",{children:"tabstops"})," and ",e.jsx("b",{children:"placeholders"})," to guide the next actions (e.g., focus on props, deps arrays)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep prefixes short but ",e.jsx("em",{children:"unambiguous"})," (",e.jsx(s.InlineCode,{children:"stc"})," for styled component)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," overfit: snippets should be starting points, not rigid templates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," forget accessibility—bake ARIA/labels into UI snippets."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Prefix:"})," the trigger text you type to expand a snippet."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tabstop:"})," numbered cursor positions you jump through with Tab (",e.jsx(s.InlineCode,{children:"$1"}),", ",e.jsx(s.InlineCode,{children:"$0"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Placeholder:"})," default content inside a tabstop (",e.jsxs(s.InlineCode,{children:["\\$","{1:default}"]}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Choice:"})," placeholder with predefined options (",e.jsxs(s.InlineCode,{children:["\\$","{1|red,green,blue|}"]}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Variable:"})," dynamic value from the editor (",e.jsxs(s.InlineCode,{children:["\\$","{TM_FILENAME_BASE}"]}),","," ",e.jsxs(s.InlineCode,{children:["\\$","{CURRENT_YEAR}"]}),")."]})]})]}),e.jsxs(s.Callout,{children:[e.jsx("b",{children:"Summary:"})," start with a few high-impact prefixes (",e.jsx("i",{children:"rfc"}),", ",e.jsx("i",{children:"us"}),", ",e.jsx("i",{children:"uec"}),","," ",e.jsx("i",{children:"stc"}),"), share them via a project snippets file, and evolve them as your patterns mature. Snippets should feel like a friendly nudge toward good React code."]})]});export{r as default};
