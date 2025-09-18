import{j as e}from"./index-DVAje__H.js";import{S as r}from"./styled-DsZ667q7.js";const i=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"CSS Variables (Custom Properties)"}),e.jsxs(r.Lead,{children:[e.jsx("b",{children:"CSS Variables"})," (a.k.a. ",e.jsx("b",{children:"custom properties"}),") are dynamic, runtime-evaluated values you define with names like ",e.jsx(r.InlineCode,{children:"--brand"})," and read with"," ",e.jsx(r.InlineCode,{children:"var(--brand)"}),". Unlike preprocessor variables (Sass/Less), they participate in the ",e.jsx("b",{children:"cascade"}),", ",e.jsx("b",{children:"inherit"})," by default, can change at runtime (e.g., themes), and work inside ",e.jsx(r.InlineCode,{children:"calc()"}),", gradients, etc."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Definition & Why They Matter"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Custom property:"})," a CSS variable defined on a selector (often ",e.jsx(r.InlineCode,{children:":root"}),") and read via ",e.jsx(r.InlineCode,{children:"var(--name, fallback)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Runtime & dynamic:"})," updates via class/data-attr toggle without recompiling CSS/JS."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cascade-aware:"})," values can be overridden per component/section for precise theming and contextual tweaks."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Syntax Basics"}),e.jsx(r.Pre,{children:`/* Declare (usually at :root for global defaults) */
:root {
  --brand: #6c5ce7;
  --bg: #0b0b0f;
  --fg: #e7e7ea;
  --radius: 14px;
  --space-3: 12px;
}

/* Use with var() and optional fallback */
.button {
  background: var(--brand, rebeccapurple);
  color: var(--fg, white);
  border-radius: var(--radius, 8px);
  padding: var(--space-3);
}`}),e.jsxs(r.Small,{children:["The ",e.jsx("b",{children:"fallback"})," is used only if the variable is ",e.jsx("i",{children:"unset or invalid"})," at computed time."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Inheritance & Scope"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Custom properties ",e.jsx("b",{children:"inherit"}),"—children see the value from their nearest ancestor unless overridden."]}),e.jsx("li",{children:"Override locally on any container to create contextual themes without extra classes on each child."})]}),e.jsx(r.Pre,{children:`.card {
  background: var(--card-bg, #111);
  color: var(--card-fg, #eee);
}
/* This section re-themes cards inside it only */
.section-alt {
  --card-bg: #0d1224;
  --card-fg: #e6edff;
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Theming Patterns (Light/Dark & More)"}),e.jsx(r.Pre,{children:`/* Defaults */
:root {
  --bg: #0b0b0f;
  --fg: #e7e7ea;
  --brand: #6c5ce7;
}
/* Dark / Light via data attribute on <html> */
:root[data-theme="light"] {
  --bg: #ffffff;
  --fg: #111318;
  --brand: #5b4beb;
}

/* Component CSS */
.page {
  background: var(--bg);
  color: var(--fg);
}
.button {
  background: var(--brand);
  color: var(--bg);
}

/* Optional: follow OS preference as default */
@media (prefers-color-scheme: light) {
  :root { --bg: #ffffff; --fg: #111318; }
}`}),e.jsx(r.Pre,{children:`// React (theme toggle without re-rendering styled-components)
// e.g., in a ThemeToggle component:
function setTheme(next) {
  document.documentElement.setAttribute("data-theme", next); // "light" | "dark"
}`}),e.jsxs(r.Small,{children:["Toggling the attribute updates styles ",e.jsx("b",{children:"instantly"})," without re-mounting components."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Design Tokens with CSS Variables"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Primitive tokens:"})," base scales (e.g., ",e.jsx(r.InlineCode,{children:"--blue-500"}),",",e.jsx(r.InlineCode,{children:"--space-3"}),", ",e.jsx(r.InlineCode,{children:"--radius-2"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Semantic tokens:"})," intent-based (",e.jsx(r.InlineCode,{children:"--btn-bg"}),",",e.jsx(r.InlineCode,{children:"--panel-bg"}),") that map to primitives per theme."]})]}),e.jsx(r.Pre,{children:`:root {
  /* primitives */
  --space-1: 4px; --space-2: 8px; --space-3: 12px;
  --blue-500: #5b8def; --red-500: #ff6b6b; --gray-900: #0d0f14;

  /* semantics */
  --btn-bg: var(--blue-500);
  --btn-fg: white;
  --panel-bg: var(--gray-900);
}

:root[data-theme="light"] {
  --gray-900: #eef1f6; /* semantics adjust automatically */
}`})]}),e.jsxs(r.Section,{children:[e.jsxs(r.H2,{children:["Computed Values with ",e.jsx("code",{children:"calc()"})," & Color Functions"]}),e.jsx(r.Pre,{children:`:root {
  --base: 16px;
  --gap: calc(var(--base) * 1.25);     /* 20px */
  --shadow: 0 8px 30px hsl(220 40% 2% / 0.35);
  --brand-h: 258; --brand-s: 75%; --brand-l: 62%;
  --brand: hsl(var(--brand-h) var(--brand-s) var(--brand-l));
}
.card { box-shadow: var(--shadow); margin: var(--gap); }
.button { background: var(--brand); }`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Using CSS Variables in styled-components"}),e.jsx(r.Pre,{children:`// Keep visual tokens in CSS; styled-components reads them like normal CSS
// Button.jsx
import styled from "styled-components";
export const Button = styled.button\`
  background: var(--btn-bg);
  color: var(--btn-fg);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius, 12px);
  transition: background 120ms ease;
\`;
`}),e.jsx(r.Small,{children:"This avoids prop-drilling design values and reduces re-renders on theme changes."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Performance & Constraints"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["CSS variables update at ",e.jsx("b",{children:"computed value"})," time—generally fast, even at scale."]}),e.jsxs("li",{children:["You ",e.jsx("b",{children:"cannot"})," use ",e.jsx(r.InlineCode,{children:"var()"})," for property names, selectors, or to define media queries. Use them for ",e.jsx("i",{children:"values"}),"."]}),e.jsx("li",{children:"Prefer scoping overrides at reasonable container boundaries to avoid excessive repaint areas on theme toggles."})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don’t"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," put defaults at ",e.jsx(r.InlineCode,{children:":root"}),"; override per section as needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," split primitives vs semantics; map semantics per theme."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(r.InlineCode,{children:"var(--x, fallback)"})," for resilience."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," rely on placeholders or hard-coded colors that break theme contrast."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," overuse variables for one-off values; keep them for reusable tokens."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Custom property:"})," any CSS property whose name starts with ",e.jsx(r.InlineCode,{children:"--"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"var()"}),": function to read a custom property with an optional fallback."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cascade:"})," rules merging mechanism; nearest match wins, then specificity/source order."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Inheritance:"})," passing values from parent to child when not overridden."]})]})]}),e.jsxs(r.Callout,{children:["Summary: Use CSS variables as your **design token layer**—define defaults at ",e.jsx("i",{children:":root"}),", map semantic tokens per theme, override locally for context, and plug them directly into styled-components."]})]});export{i as default};
