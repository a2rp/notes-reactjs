import{j as e}from"./index-CAccbg1x.js";import{S as s}from"./styled-BMFq26at.js";const n=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Global CSS"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Global CSS"})," styles apply to the entire document. Use it for browser resets, base typography, color tokens/variables, and element defaults. Keep component-specific styles local to avoid cascade conflicts."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Definition & Purpose"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Global CSS:"})," styles that affect the whole app (not scoped to a component)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use cases:"})," reset/normalize, base elements (",e.jsx(s.InlineCode,{children:"html, body, a, button, input"}),"), CSS variables, typography scale, dark/light theme roots."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Goal:"})," consistent foundation + predictable defaults across pages."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Where to Define Global CSS"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Vite + React:"})," import a single ",e.jsx(s.InlineCode,{children:"index.css"})," in ",e.jsx(s.InlineCode,{children:"main.jsx"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"styled-components:"})," add global rules via ",e.jsx(s.InlineCode,{children:"createGlobalStyle"})," if you prefer JS-controlled theming."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CSS Variables:"})," define tokens on ",e.jsx(s.InlineCode,{children:":root"})," (and on ",e.jsx(s.InlineCode,{children:'[data-theme="dark"]'})," for dark mode)."]})]}),e.jsx(s.Pre,{children:`/* src/index.css (imported once in main.jsx) */
:root{
  --bg: #0b0b0b;
  --fg: #eaeaea;
  --muted: #b4b4b4;
  --accent: #6ea8fe;
  --radius: 12px;
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-6: 24px;
  --font-body: system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji","Segoe UI Emoji";
}

@media (prefers-color-scheme: dark){
  :root{ color-scheme: dark; }
}

* { box-sizing: border-box; }
html, body, #root { height: 100%; }
body{
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-body);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a{
  color: var(--accent);
  text-decoration: none;
}
a:hover{ text-decoration: underline; }

button, input, select, textarea{
  font: inherit;
  color: inherit;
}

img, svg, video{ display:block; max-width:100%; }

/* Utility examples */
.container{ width: min(1120px, 100% - 32px); margin-inline: auto; }
.visually-hidden{
  position:absolute !important; width:1px; height:1px; margin:-1px; border:0; padding:0;
  clip: rect(0 0 0 0); clip-path: inset(50%); overflow:hidden; white-space:nowrap;
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Global with styled-components"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Use ",e.jsx(s.InlineCode,{children:"createGlobalStyle"})," for theme-aware globals (tokens switch with theme)."]}),e.jsxs("li",{children:["Render the component once near the root (e.g., inside ",e.jsx(s.InlineCode,{children:"<App />"}),")."]})]}),e.jsx(s.Pre,{children:`// theme.js
export const light = { bg:"#ffffff", fg:"#0b0b0b", accent:"#1a73e8" };
export const dark  = { bg:"#0b0b0b", fg:"#eaeaea", accent:"#6ea8fe" };

// GlobalStyle.jsx
import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle\`
  :root { color-scheme: \${({ theme }) => (theme === "dark" ? "dark" : "light")}; }
  body {
    margin:0; background:\${({ theme }) => theme.bg}; color:\${({ theme }) => theme.fg};
    font-family: system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans";
  }
  a { color:\${({ theme }) => theme.accent}; }
\`;

// App.jsx
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
function App(){
  const [mode,setMode] = React.useState("dark");
  const theme = mode === "dark" ? dark : light;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      {/* routes, layout, etc. */}
    </ThemeProvider>
  );
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Reset vs Normalize"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Reset:"})," aggressively strips browser styles (all margins, headings, lists). You add back what you need."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Normalize:"})," makes default rendering consistent across browsers while keeping sensible defaults."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tip:"})," Prefer a light normalize and explicit base styles for readability."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Tokens & CSS Variables"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Keep colors, spacing, radii, shadows as variables on ",e.jsx(s.InlineCode,{children:":root"}),"."]}),e.jsxs("li",{children:["Switch themes by toggling a class/attribute on ",e.jsx(s.InlineCode,{children:"html"})," or ",e.jsx(s.InlineCode,{children:"body"}),"."]})]}),e.jsx(s.Pre,{children:`/* Toggle attribute for theme switching */
html[data-theme="dark"]{
  --bg:#0b0b0b; --fg:#eaeaea; --accent:#6ea8fe;
}
html[data-theme="light"]{
  --bg:#ffffff; --fg:#0b0b0b; --accent:#1a73e8;
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common Pitfalls"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Overreaching selectors:"})," broad rules (e.g., ",e.jsx(s.InlineCode,{children:"* "}),") can slow rendering and cause side effects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Global component classes:"})," avoid naming that collides with local CSS Modules/styled components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hard-coded colors:"})," prefer variables so dark/light themes and branding are easy."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Inconsistent box model:"})," always set ",e.jsx(s.InlineCode,{children:"box-sizing: border-box"})," globally."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," define global tokens (colors, spacing, fonts) once."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," normalize base elements and set consistent typography."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer variables + theme toggles over duplicating styles."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," put component-specific styles in global CSS."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," rely solely on resets—add meaningful base styles."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Global scope:"})," CSS that applies application-wide (not scoped to a component)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Normalize:"})," a thin stylesheet to make browsers render elements more consistently."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tokens:"})," named design values (color, space, radius) reused across the UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Custom properties:"})," CSS variables defined with ",e.jsx(s.InlineCode,{children:"--name"}),"."]})]})]}),e.jsx(s.Callout,{children:"Summary: keep globals lean and purposeful—reset/normalize, tokens, base typography, and accessibility helpers. Everything else should live in component-scoped styles."})]});export{n as default};
