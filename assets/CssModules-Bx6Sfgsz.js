import{j as e}from"./index-DqLKwkYK.js";import{S as s}from"./styled-BvR44Kc4.js";const n=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"CSS Modules"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"CSS Modules"})," scope your styles to the component by default. You write plain CSS in a file named ",e.jsx(s.InlineCode,{children:"*.module.css"}),", import it in your component, and use generated class names from the imported ",e.jsx(s.InlineCode,{children:"styles"})," object. This avoids global collisions and makes styles easy to reason about."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Definition & Purpose"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"What:"})," A build-time technique that ",e.jsx("i",{children:"localizes"})," class names from CSS files so they don’t leak into the global scope."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," Prevents naming conflicts, enables component-level styling, and keeps styles maintainable in large apps."]}),e.jsxs("li",{children:[e.jsx("b",{children:"How:"})," Import a module file (",e.jsx(s.InlineCode,{children:'import styles from "./Button.module.css"'}),") and use",e.jsx(s.InlineCode,{children:"styles.className"})," on elements."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"File Naming & Import"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Name files ",e.jsx(s.InlineCode,{children:"*.module.css"})," (e.g.,",e.jsx(s.InlineCode,{children:"Button.module.css"}),")."]}),e.jsxs("li",{children:["Import in the component and reference classes via the ",e.jsx("b",{children:"exported object"}),"."]})]}),e.jsx(s.Pre,{children:`/* Button.module.css */
.button {
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid hsl(0 0% 100% / 0.12);
  background: hsl(220 15% 16%);
  color: white;
}
.primary {
  background: hsl(220 90% 56%);
  border-color: hsl(220 90% 56%);
}
.button:hover { filter: brightness(1.05); }`}),e.jsx(s.Pre,{children:`// Button.jsx
import React from "react";
import styles from "./Button.module.css";

export default function Button({ children, primary, ...props }) {
  const className = [
    styles.button,
    primary ? styles.primary : null
  ].filter(Boolean).join(" ");

  return <button className={className} {...props}>{children}</button>;
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Multiple & Conditional Classes"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Combine classes by joining strings or use a helper like ",e.jsx("b",{children:"clsx"})," (optional dependency)."]}),e.jsxs("li",{children:["Keep logic in JS; the module only provides ",e.jsx("em",{children:"scoped"})," class names."]})]}),e.jsx(s.Pre,{children:`// With a tiny helper:
const cx = (...xs) => xs.filter(Boolean).join(" ");

// Usage:
<button className={cx(styles.button, isActive && styles.active)} />`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Pseudo-classes, Media Queries & Assets"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Write normal CSS: ",e.jsx(s.InlineCode,{children:":hover"}),", ",e.jsx(s.InlineCode,{children:":focus"}),", ",e.jsx(s.InlineCode,{children:"@media"}),"."]}),e.jsxs("li",{children:["Assets via ",e.jsx(s.InlineCode,{children:"url()"})," work through the bundler (Vite)."]})]}),e.jsx(s.Pre,{children:`/* Card.module.css */
.card {
  padding: 16px;
  border-radius: 12px;
  background: url("./paper-texture.png");
}
.card:focus-within { outline: 2px solid hsl(200 90% 60%); }
@media (width < 640px) {
  .card { padding: 12px; }
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Local vs Global Selectors"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Classes are ",e.jsx("b",{children:"local by default"}),". To reach global markup (e.g., 3rd-party widgets), use ",e.jsx(s.InlineCode,{children:":global(...)"})," carefully."]}),e.jsx("li",{children:"Avoid overusing globals; they defeat the purpose of modules."})]}),e.jsx(s.Pre,{children:`/* Search.module.css */
.wrapper { display: grid; gap: 8px; }

/* target a library's global class safely */
:global(.rc-virtual-list) {
  max-height: 320px;
}
`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Composition & Reuse"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Reuse rules with ",e.jsx(s.InlineCode,{children:"composes"})," to avoid duplication."]}),e.jsxs("li",{children:["Compose from the ",e.jsx("i",{children:"same"})," file or another module file."]})]}),e.jsx(s.Pre,{children:`/* mixins.module.css */
.baseButton {
  font: 600 14px/1 system-ui, sans-serif;
  border-radius: 10px;
  padding: 10px 14px;
}

/* Button.module.css */
.primary {
  composes: baseButton from "./mixins.module.css";
  background: hsl(220 90% 56%);
  color: white;
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Data Attributes & State Styling"}),e.jsx(s.List,{children:e.jsxs("li",{children:["Prefer ",e.jsx(s.InlineCode,{children:"data-*"})," attributes for variant/state hooks instead of creating many class permutations."]})}),e.jsx(s.Pre,{children:`/* Switch.module.css */
.switch { padding: 6px 10px; border-radius: 999px; }
.switch[data-state="on"]  { background: hsl(142 70% 45%); color: white; }
.switch[data-state="off"] { background: hsl(0 0% 20%);  color: white; }`}),e.jsx(s.Pre,{children:`// Switch.jsx
import styles from "./Switch.module.css";
export function Switch({ on, ...props }) {
  return (
    <button
      className={styles.switch}
      data-state={on ? "on" : "off"}
      {...props}
    >
      {on ? "On" : "Off"}
    </button>
  );
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"CSS Variables with Modules (Themes & Tokens)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Keep ",e.jsx("b",{children:"design tokens"})," as CSS variables (global or at a theme wrapper). Modules read them just like normal CSS."]}),e.jsxs("li",{children:["Switch themes by toggling a parent class or ",e.jsx(s.InlineCode,{children:"data-theme"}),"."]})]}),e.jsx(s.Pre,{children:`/* globals.css (not a module) */
:root { --btn-bg: hsl(220 15% 16%); --btn-fg: white; }
[data-theme="dark"]  { --btn-bg: hsl(220 15% 16%); }
[data-theme="light"] { --btn-bg: hsl(0 0% 95%);  --btn-fg: black; }`}),e.jsx(s.Pre,{children:`/* Button.module.css */
.button { background: var(--btn-bg); color: var(--btn-fg); }`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Animations (Note)"}),e.jsx(s.List,{children:e.jsxs("li",{children:["Keyframe names are global. Use distinctive names or wrap with"," ",e.jsx(s.InlineCode,{children:":global"})," if needed to avoid collisions."]})}),e.jsx(s.Pre,{children:`/* Tag.module.css */
@keyframes tagPulse { from { opacity: 0.7; } to { opacity: 1; } }
.tag { animation: tagPulse 1s ease-in-out infinite alternate; }`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep module files small and co-located with their component."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(s.InlineCode,{children:"data-*"})," attributes for state/variants."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer composition over deep selector chains."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," overuse ",e.jsx(s.InlineCode,{children:":global"}),"—it defeats scoping."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," rely on class name strings; always reference via ",e.jsx(s.InlineCode,{children:"styles.name"}),"."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common Pitfalls"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Forgetting the .module.css suffix:"})," then the file is treated as global CSS and"," ",e.jsx(s.InlineCode,{children:"import styles"})," won’t work."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mismatched class names:"})," using ",e.jsx(s.InlineCode,{children:"styles.Button"})," ","when the CSS defines ",e.jsx(s.InlineCode,{children:".button"})," (case matters)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Leaky globals:"})," sprinkling ",e.jsx(s.InlineCode,{children:":global"})," everywhere reintroduces global collisions—use sparingly."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Local scope:"})," classes get unique names (hashed) so they don’t collide app-wide."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Composition:"})," reusing rules across classes with ",e.jsx(s.InlineCode,{children:"composes"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Module object:"})," the imported JS object mapping local class names to hashed strings."]})]})]}),e.jsx(s.Callout,{children:"Summary: CSS Modules give you component-scoped, collision-free styles with plain CSS. Co-locate styles, compose for reuse, keep globals rare, and leverage CSS variables for themes."})]});export{n as default};
