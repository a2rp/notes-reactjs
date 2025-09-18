import{j as e}from"./index-CLbx3UkF.js";import{S as i}from"./styled-C2A5MFrn.js";const r=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Icons"}),e.jsxs(i.Lead,{children:["Icons should be ",e.jsx("b",{children:"crisp"}),", ",e.jsx("b",{children:"themed"}),", and ",e.jsx("b",{children:"accessible"}),". In React, prefer SVG-based approaches for sharp rendering, easy coloring via ",e.jsx(i.InlineCode,{children:"currentColor"}),", and small bundles through tree-shaking."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Why icons & when to use"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Communicate fast:"})," reinforce text labels (don’t replace them by default)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scalable & sharp:"})," SVGs stay crisp at any size and DPI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Theme-friendly:"})," use ",e.jsx(i.InlineCode,{children:"currentColor"})," or CSS variables to match dark/light themes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"A11y first:"})," icon-only controls must have an accessible name via ",e.jsx(i.InlineCode,{children:"aria-label"}),"."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Common strategies in React"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Inline SVG component"})," — maximum control, zero runtime dependency."]}),e.jsxs("li",{children:[e.jsx("b",{children:"react-icons"})," — curated packs (Feather, Material, etc.) with tree-shaking."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SVG sprite <use>"})," — reference by id; great for many small icons."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Icon fonts"})," — avoid for a11y/coloring; use SVG instead."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Raster images (PNG/JPG)"})," — avoid for UI icons; not scalable."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Inline SVG component (recommended)"}),e.jsx(i.Pre,{children:`// Reusable icon that inherits color/size from CSS (1em)
export function IconCheck(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M20 6L9 17l-5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Usage: inherits font-size and color
// <IconCheck style={{ fontSize: 18, color: "var(--accent)" }} />`}),e.jsxs(i.Small,{children:["Tip: Use ",e.jsx("b",{children:"1em"})," sizing so icons scale with text, and color via ",e.jsx("b",{children:"currentColor"}),"."]})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Using ",e.jsx("code",{children:"react-icons"})," (tree-shaken packs)"]}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Import from the ",e.jsx("b",{children:"pack subpath"})," (e.g., ",e.jsx(i.InlineCode,{children:'"react-icons/fi"'}),") to keep bundles small."]}),e.jsxs("li",{children:["Pass ",e.jsx(i.InlineCode,{children:"size"})," (px) or use CSS to control ",e.jsx(i.InlineCode,{children:"font-size"}),"."]})]}),e.jsx(i.Pre,{children:`import { FiSearch, FiTrash2 } from "react-icons/fi";

function Toolbar() {
  return (
    <div className="toolbar">
      {/* Icon-only button must have an accessible name */}
      <button type="button" aria-label="Search">
        <FiSearch size={18} aria-hidden="true" />
      </button>

      {/* Icon + text: hide icon from AT */}
      <button type="button">
        <FiTrash2 aria-hidden="true" />
        <span>Delete</span>
      </button>
    </div>
  );
}`}),e.jsxs(i.Small,{children:["Importing from ",e.jsx("b",{children:'"react-icons"'})," root can bloat bundles; prefer pack subpaths."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"SVG sprite (<symbol> + <use>)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Define symbols once (e.g., in ",e.jsx(i.InlineCode,{children:"index.html"})," or a bundled sprite file)."]}),e.jsxs("li",{children:["Reference by id; styles still apply via ",e.jsx(i.InlineCode,{children:"currentColor"}),"."]})]}),e.jsx(i.Pre,{children:`<!-- index.html -->
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-plus" viewBox="0 0 24 24">
    <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" />
  </symbol>
</svg>`}),e.jsx(i.Pre,{children:`// In React:
function AddButton() {
  return (
    <button type="button" aria-label="Add item">
      <svg width="1em" height="1em" role="img" focusable="false">
        <use href="#icon-plus" />
      </svg>
    </button>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Theming & coloring"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Keep ",e.jsx(i.InlineCode,{children:"fill"}),"/",e.jsx(i.InlineCode,{children:"stroke"})," as ",e.jsx("b",{children:"currentColor"}),"; set color via CSS (tokens/variables)."]}),e.jsx("li",{children:"Respect dark mode by deriving from text color or a dedicated token."})]}),e.jsx(i.Pre,{children:`/* tokens.css (example) */
:root { --icon: hsl(220 10% 40%); --iconAccent: hsl(200 90% 50%); }
.dark { --icon: hsl(0 0% 90%); }

/* usage */
.icon { color: var(--icon); }
.iconAccent { color: var(--iconAccent); }`}),e.jsx(i.Pre,{children:`// <IconCheck className="icon" />
// <IconCheck className="iconAccent" style={{ fontSize: 20 }} />`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Sizing & alignment"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Use ",e.jsx("b",{children:"1em"})," width/height so icons align with text and scale with font size."]}),e.jsxs("li",{children:["Vertically align with text using ",e.jsx(i.InlineCode,{children:"vertical-align: middle"})," on the SVG."]}),e.jsxs("li",{children:["For icon buttons, use a touch target of at least ",e.jsx("b",{children:"40×40px"}),"."]})]}),e.jsx(i.Pre,{children:`/* example */
svg { vertical-align: middle; }`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Accessibility patterns"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Decorative"})," icons: add ",e.jsx(i.InlineCode,{children:'aria-hidden="true"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Icon-only buttons:"})," provide ",e.jsx(i.InlineCode,{children:"aria-label"})," or associate visible text."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Meaning + text:"})," prefer icon + label; don’t rely on icon alone for critical actions."]})]}),e.jsx(i.Pre,{children:`// Icon-only
<button type="button" aria-label="Close">
  <svg width="1em" height="1em" aria-hidden="true" focusable="false">...</svg>
</button>

// Icon + text
<button type="button">
  <svg width="1em" height="1em" aria-hidden="true" focusable="false">...</svg>
  <span>Close</span>
</button>`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Performance tips"}),e.jsxs(i.List,{children:[e.jsx("li",{children:"Tree-shake by importing specific icons (or build-time SVGO to strip metadata)."}),e.jsxs("li",{children:["Prefer a ",e.jsx("b",{children:"shared"})," sprite or small inline components over large icon bundles."]}),e.jsx("li",{children:"Memoize heavy, animated SVGs if they re-render often."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don’t"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use SVG with ",e.jsx(i.InlineCode,{children:"currentColor"})," and ",e.jsx("b",{children:"1em"})," sizing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," include accessible names for icon-only controls."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep imports granular to avoid bundle bloat."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," rely on icon fonts for critical UI (a11y/ligature issues)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," ship bitmap icons for UI; they won’t scale cleanly."]})]})]}),e.jsxs(i.Callout,{children:["Summary: default to SVG, color via ",e.jsx("i",{children:"currentColor"})," (theme-ready), keep imports granular, and ensure icon-only controls have accessible names."]})]});export{r as default};
