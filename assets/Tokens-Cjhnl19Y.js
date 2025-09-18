import{j as e}from"./index-B_XJRlzM.js";import{S as s}from"./styled-CKLFtHI_.js";const t=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Design Tokens"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Design tokens"})," are the single source of truth for visual/style values (colors, spacing, radii, typography, motion, elevation, breakpoints, z-index). They replace “magic numbers” with named values that are easy to theme, audit, and reuse."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"What are tokens & why use them?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Definition:"})," named style values consumed by code & design tools."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Consistency:"})," one change updates every component using that token."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Theming:"})," light/dark/brand themes swap token values, not component code."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cross-platform:"})," same tokens can feed web, mobile, docs, and design files."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Token categories"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Color:"})," text, background, borders, states (hover/active), semantic (success, danger)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Typography:"})," font families, sizes, weights, line-heights, letter-spacing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Spacing:"})," scale for margins/padding/gaps (e.g., 0, 2, 4, 8, 12, 16...)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Radii:"})," corners (none, sm, md, lg, pill, full)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Elevation:"})," shadows (elev-1…elev-5), overlays."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Motion:"})," durations, easing curves, spring configs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Breakpoints & layout:"})," sm/md/lg/xl, container widths, gutters."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Z-index:"})," base → dropdown → sticky → modal → toast → tooltip."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Naming & scales"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Base (primitives):"})," neutral-0…neutral-1000, brand-500, spacing-0…spacing-96."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Alias (semantic):"})," text-muted, bg-default, border-subtle, success-bg."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scales:"})," prefer predictable steps (8px base or fluid with ",e.jsx(s.InlineCode,{children:"clamp()"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Case:"})," kebab-case for CSS variables (",e.jsx(s.InlineCode,{children:"--color-bg-default"}),")."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Example: token objects (JS)"}),e.jsx(s.Pre,{children:`// primitives (base)
const primitives = {
  color: {
    neutral: { 0:"#0b0b0c", 50:"#151518", 100:"#1f1f23", 200:"#2a2a30", 300:"#35353d",
               400:"#4a4a55", 500:"#6b6b78", 600:"#8f90a6", 700:"#b3b6c6", 800:"#d7d9e6", 900:"#f2f3f8" },
    brand:   { 400:"#5390ff", 500:"#3b82f6", 600:"#2c6bec" },
    red:     { 500:"#ef4444" }, green:{ 500:"#22c55e" }, yellow:{ 500:"#eab308" }
  },
  space:   { 0:0, 1:2, 2:4, 3:8, 4:12, 5:16, 6:20, 7:24, 8:32, 9:40, 10:48, 11:64 },
  radius:  { none:0, sm:4, md:8, lg:12, xl:16, pill:999, full:9999 },
  z:       { base:0, dropdown:1000, sticky:1100, modal:1200, toast:1300, tooltip:1400 },
  elev:    { 1:"0 1px 2px rgba(0,0,0,.24)", 2:"0 4px 12px rgba(0,0,0,.28)" },
  motion:  { fast:"120ms", normal:"200ms", slow:"320ms", ease:"cubic-bezier(.2,.6,.2,1)" },
  type:    { font:"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
             size:{ xs:"12px", sm:"14px", md:"16px", lg:"18px", xl:"20px", 2: "clamp(24px, 2.8vw, 36px)" },
             weight:{ regular:400, medium:500, semibold:600, bold:700 }, line:{ tight:1.2, normal:1.5 } }
};

// aliases (semantic) reference primitives
const semantic = {
  color: {
    text: { default: primitives.color.neutral[800], muted: primitives.color.neutral[600], inverse:"#ffffff" },
    bg:   { default: primitives.color.neutral[900], elevated: primitives.color.neutral[800], inverse:"#111318" },
    border:{ default: primitives.color.neutral[400], subtle: primitives.color.neutral[300] },
    brand:{ default: primitives.color.brand[500], hover: primitives.color.brand[600] },
    status:{ success: primitives.color.green[500], danger: primitives.color.red[500], warning: primitives.color.yellow[500] }
  }
};`}),e.jsx(s.Small,{children:"Keep primitives stable; let semantic tokens vary by theme/brand."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Expose tokens as CSS variables"}),e.jsx(s.Pre,{children:`/* in a global stylesheet or a Theme component */
:root {
  --color-text-default: #0b0b0c;
  --color-text-muted:   #4a4a55;
  --color-bg-default:   #ffffff;
  --color-bg-elevated:  #f7f8fb;

  --space-0: 0px; --space-1: 2px; --space-2: 4px; --space-3: 8px; --space-4: 12px; --space-5: 16px;
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px; --radius-pill: 999px;
  --elev-1: 0 1px 2px rgba(0,0,0,.12);
  --motion-fast: 120ms; --motion-ease: cubic-bezier(.2,.6,.2,1);
  --font-sans: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}

/* dark theme override */
html[data-theme="dark"] {
  --color-text-default: #e9eaf3;
  --color-text-muted:   #b3b6c6;
  --color-bg-default:   #111318;
  --color-bg-elevated:  #1a1c22;
  --elev-1: 0 1px 2px rgba(0,0,0,.32);
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Use tokens in components"}),e.jsx(s.Pre,{children:`// example: Button using CSS variables
import styled from "styled-components";

const Button = styled.button\`
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-subtle, #2a2a30);
  color: var(--color-text-default);
  background: var(--color-bg-elevated);
  box-shadow: var(--elev-1);
  transition: box-shadow var(--motion-fast) var(--motion-ease), transform var(--motion-fast) var(--motion-ease);

  &:hover { transform: translateY(-1px); }
\`;
`}),e.jsx(s.Small,{children:"Prefer tokens over hard-coded values. If a token doesn’t exist yet, add it—don’t inline numbers."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Theme switching"}),e.jsx(s.Pre,{children:`// attribute-based theming
function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
}

// auto respecting system color-scheme
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
if (prefersDark.matches) document.documentElement.setAttribute("data-theme", "dark");
`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Responsive & fluid tokens"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Expose ",e.jsx("b",{children:"breakpoints"})," as tokens and use them consistently."]}),e.jsxs("li",{children:["Use ",e.jsx(s.InlineCode,{children:"clamp(min, vw, max)"})," for fluid type/spacing."]})]}),e.jsx(s.Pre,{children:`/* breakpoint tokens */
:root { --bp-sm: 640px; --bp-md: 768px; --bp-lg: 1024px; --bp-xl: 1280px; }

/* fluid type token */
:root { --font-fluid-2: clamp(24px, 2.8vw, 36px); }

@media (min-width: 768px) {
  .card { padding: var(--space-6); }
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Motion & elevation tokens"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Motion:"})," durations & easing curves standardize interactions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Elevation:"})," consistent shadow ladder avoids arbitrary blur/spread values."]})]}),e.jsx(s.Pre,{children:`:root {
  --motion-fast: 120ms;
  --motion-normal: 200ms;
  --ease-standard: cubic-bezier(.2,.6,.2,1);
  --elev-1: 0 1px 2px rgba(0,0,0,.16);
  --elev-2: 0 4px 12px rgba(0,0,0,.20);
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Accessibility & contrast"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Create ",e.jsx("b",{children:"contrast tokens"})," that pass WCAG (AA/AAA) for text on background."]}),e.jsx("li",{children:"Define state tokens (hover/active/focus) that keep contrast above 3:1 for UI elements."})]}),e.jsx(s.Pre,{children:`/* example semantic contrast pair */
:root {
  --color-text-on-brand: #0b1221; /* on brand-500 */
  --color-brand-500: #3b82f6;
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," store every repeated value as a token (color, spacing, radius, shadow, z-index)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx("i",{children:"semantic"})," tokens in components (e.g., ",e.jsx(s.InlineCode,{children:"bg-default"}),") not raw primitives."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," centralize tokens and avoid overrides scattered across components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," hard-code “random” pixel values—extend the scale instead."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," invent new colors for each feature—map to the palette."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," couple tokens to a component’s internal class names."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Primitive token:"})," low-level base value (e.g., neutral-800)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Semantic token:"})," context-specific alias (e.g., text-muted)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scale:"})," ordered steps for spacing/type/radius (e.g., 0, 2, 4, 8...)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Theming:"})," swapping token values (not component code) per theme/brand."]})]})]}),e.jsx(s.Callout,{children:"Summary: Put every visual decision behind a named token. Use primitives for the palette and scales, semantic tokens in components, and CSS variables to theme instantly across the app."})]});export{t as default};
