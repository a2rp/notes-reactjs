import{j as e}from"./index-XTJb1MLF.js";import{S as s}from"./styled-CeRf_91w.js";const i=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Themes"}),e.jsxs(s.Lead,{children:["A ",e.jsx("b",{children:"theme"})," is a set of visual decisions (colors, spacing, typography, radii, shadows) applied consistently across the UI. Good theming separates ",e.jsx("i",{children:"design tokens"})," from components, supports ",e.jsx("b",{children:"light/dark"}),", respects ",e.jsx("b",{children:"system preference"}),", and keeps ",e.jsx("b",{children:"contrast & a11y"})," in check."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Definition & Goals"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Theme:"})," a structured object or set of CSS variables representing your design system."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Goals:"})," consistent look, single source of truth, quick brand changes, easy dark mode."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scope:"})," colors, typography scale, spacing, radii, shadows, elevations, motion prefs."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Building Blocks: Tokens → Theme"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Design tokens:"})," atomic values (e.g., ",e.jsx(s.InlineCode,{children:"--color-bg"}),", ",e.jsx(s.InlineCode,{children:"--radius-md"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Theme object:"})," a JS structure grouping tokens (for styled-components)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CSS variables:"})," great for runtime switching + interoperability with plain CSS."]})]}),e.jsx(s.Pre,{children:`// Tokens organized into a theme object (styled-components)
export const lightTheme = {
  name: "light",
  colors: {
    bg:   "#0b0d10", // example dark shell with high-contrast cards (tweak per brand)
    card: "#111418",
    text: "#EAEFF6",
    muted:"#B7C2CE",
    primary: "#5B9DFF",
    ring: "hsla(210, 100%, 60%, 0.35)",
  },
  space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
  radii: { sm: 6, md: 12, lg: 20 },
  shadow: { sm: "0 1px 2px hsl(210 8% 10% / 0.3)", md: "0 8px 24px hsl(210 8% 10% / 0.35)" },
};

export const darkTheme = {
  ...lightTheme,
  name: "dark",
  colors: {
    bg:   "#0a0c0f",
    card: "#0f1216",
    text: "#E9EEF4",
    muted:"#AAB6C2",
    primary: "#6FB1FF",
    ring: "hsla(210, 100%, 60%, 0.40)",
  },
};`}),e.jsxs(s.Small,{children:["Keep token names ",e.jsx("b",{children:"semantic"})," (",e.jsx("i",{children:"bg, text, primary"}),") rather than raw (",e.jsx("i",{children:"blue-500"}),"), so brand changes don’t break your components."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Pattern: ThemeProvider (styled-components)"}),e.jsx(s.Pre,{children:`import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { lightTheme, darkTheme } from "./theme"; // tokens above

const Global = createGlobalStyle\`
  :root { color-scheme: \${({ theme }) => theme.name}; }
  body {
    margin: 0;
    background: \${({ theme }) => theme.colors.bg};
    color: \${({ theme }) => theme.colors.text};
  }
  *:focus-visible { outline: 3px solid \${({ theme }) => theme.colors.ring}; outline-offset: 2px; }
\`;

export function AppShell({ children }) {
  const [mode, setMode] = React.useState("dark"); // "light" | "dark"
  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Global />
      <button onClick={() => setMode(m => (m === "dark" ? "light" : "dark"))}>
        Toggle theme
      </button>
      {children}
    </ThemeProvider>
  );
}`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"ThemeProvider"})," injects the theme into styled components via context. Use ",e.jsx(s.InlineCode,{children:"createGlobalStyle"})," for globals like background, fonts, focus rings."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Pattern: CSS Variables (data-theme)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Attach ",e.jsx(s.InlineCode,{children:'data-theme="light|dark"'})," on ",e.jsx(s.InlineCode,{children:"<html>"})," or a root wrapper."]}),e.jsx("li",{children:"Define variables per theme and consume them in CSS or styled-components."}),e.jsx("li",{children:"Works well with plain CSS, third-party CSS, and non-React islands."})]}),e.jsx(s.Pre,{children:`/* globals.css */
:root[data-theme="light"] {
  --bg: #ffffff;
  --text: #131722;
  --primary: #2563eb;
  --ring: 0 0 0 3px rgba(37, 99, 235, 0.35);
}
:root[data-theme="dark"] {
  --bg: #0b0d10;
  --text: #e9eef4;
  --primary: #60a5fa;
  --ring: 0 0 0 3px rgba(96, 165, 250, 0.40);
}
/* usage */
.page { background: var(--bg); color: var(--text); }`}),e.jsx(s.Pre,{children:`// JS toggle (keeps styled-components optional)
function useHtmlTheme() {
  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const system = mql.matches ? "dark" : "light";
    const saved = localStorage.getItem("theme") || system;
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const setTheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  };
  return { setTheme };
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"System Preference & Persistence"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Respect ",e.jsx(s.InlineCode,{children:"prefers-color-scheme"})," on first load."]}),e.jsxs("li",{children:["Persist user choice to ",e.jsx(s.InlineCode,{children:"localStorage"})," and apply it before paint (inline script or minimal hydration flash)."]}),e.jsx("li",{children:"Expose an explicit toggle (users may override system for your app)."})]}),e.jsx(s.Pre,{children:`// Minimal inline script (index.html) to avoid flash:
<script>
  (function() {
    try {
      const key = "theme";
      const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      const saved = localStorage.getItem(key) || system;
      document.documentElement.setAttribute("data-theme", saved);
    } catch (e) {}
  })();
<\/script>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Contrast & Accessibility"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Ensure text contrast ratio ≥ ",e.jsx("b",{children:"4.5:1"})," (body) and ≥ ",e.jsx("b",{children:"3:1"})," (large text/icons)."]}),e.jsxs("li",{children:["Use ",e.jsx(s.InlineCode,{children:"color-scheme"})," to hint UA form controls for dark/light."]}),e.jsx("li",{children:"Provide visible focus styles that work on both themes; don’t remove outlines."}),e.jsxs("li",{children:["Respect ",e.jsx(s.InlineCode,{children:"prefers-reduced-motion"})," for theme transition animations."]})]}),e.jsx(s.Pre,{children:`/* Focus & reduced motion */
*:focus-visible { outline: 3px solid var(--primary); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .theme-fade { transition: none !important; }
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Animating Theme Changes"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Fade backgrounds and text with short transitions (150–250ms). Avoid animating layout."}),e.jsx("li",{children:"Opt-out when users prefer reduced motion."})]}),e.jsx(s.Pre,{children:".theme-fade { transition: background-color 180ms ease, color 180ms ease, border-color 180ms ease; }"})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," centralize tokens and reference them everywhere."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," respect system preference on first load and let users override."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep sufficient contrast and strong focus indicators."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," hardcode colors inside components; pull from theme/tokens."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," animate large areas heavily during theme toggles."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Design token:"})," a named, reusable design value (color, size, radius) independent of implementation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Theme object:"})," a JS representation of tokens consumed by a theming system."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CSS variable:"})," a custom property accessible at runtime via ",e.jsx(s.InlineCode,{children:"var(--token)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Color scheme:"})," user agent hint for default form control styling in light/dark."]})]})]}),e.jsxs(s.Callout,{children:["Summary: define semantic tokens, wire them through a ThemeProvider ",e.jsx("i",{children:"or"})," CSS variables, respect system preference, persist user choice, and bake in a11y (contrast & focus) from day one."]})]});export{i as default};
