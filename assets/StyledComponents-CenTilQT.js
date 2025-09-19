import{j as e}from"./index-BUVRD3Bm.js";import{S as s}from"./styled-CwejGvqc.js";const t=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"styled-components"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"styled-components"})," is a CSS-in-JS library for React that lets you write actual CSS in JavaScript. Styles are scoped to components, support dynamic props, and integrate with themes. You get predictable class names, automatic vendor prefixes, and co-located styles."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Definition & Purpose"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Component-scoped styles:"})," each styled component renders a unique class name, so CSS doesn’t leak or collide."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dynamic styling:"})," compute styles from props or context (theme) without juggling class name strings."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Theming:"})," a single ",e.jsx(s.InlineCode,{children:"ThemeProvider"})," supplies shared tokens (colors, spacing, radii, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Developer UX:"})," real CSS syntax, nesting via ",e.jsx(s.InlineCode,{children:"&"}),", media queries, keyframes, and composition."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Basic Usage"}),e.jsx(s.Pre,{children:`import styled from "styled-components";

const Button = styled.button\`
  padding: 10px 16px;
  border: 1px solid transparent;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  background: \${({ theme }) => theme.colors.primary};
  color: \${({ theme }) => theme.colors.onPrimary};
  &:hover { filter: brightness(1.05); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 3px \${({ theme }) => theme.colors.focus}; }
\`;

export default function Example() {
  return <Button>Save</Button>;
}`}),e.jsxs(s.Small,{children:["Styles are real CSS inside a template literal. Theme values are accessed via"," ",e.jsxs(s.InlineCode,{children:["(","{ theme }",") => ..."]}),"."]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Theming with ",e.jsx("code",{children:"ThemeProvider"})]}),e.jsx(s.Pre,{children:`import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#4f46e5",
    onPrimary: "white",
    focus: "hsl(240 100% 60% / 0.35)",
    surface: "#0b0b0c",
    text: "hsl(0 0% 98%)"
  },
  space: (n) => \`\${n * 4}px\`,
  radius: { sm: "8px", md: "12px", xl: "20px" }
};

export function AppRoot() {
  return (
    <ThemeProvider theme={theme}>
      {/* your app */}
    </ThemeProvider>
  );
}`}),e.jsxs(s.Small,{children:["Keep token names stable (",e.jsx(s.InlineCode,{children:"colors.primary"}),","," ",e.jsx(s.InlineCode,{children:"space(2)"}),") to make refactors easy."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Variants & Transient Props"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Use ",e.jsx("b",{children:"transient props"})," (prefix with ",e.jsx(s.InlineCode,{children:"$"}),") to avoid leaking design props to the DOM."]}),e.jsxs("li",{children:["Build variants with the ",e.jsx(s.InlineCode,{children:"css"})," helper and a small map."]})]}),e.jsx(s.Pre,{children:`import styled, { css } from "styled-components";

const VARIANTS = {
  primary: css\`
    background: \${({ theme }) => theme.colors.primary};
    color: \${({ theme }) => theme.colors.onPrimary};
  \`,
  ghost: css\`
    background: transparent;
    border: 1px solid hsl(0 0% 100% / 0.14);
    color: \${({ theme }) => theme.colors.text};
  \`,
};

const SIZES = {
  sm: css\`padding: 6px 10px; font-size: 14px;\`,
  md: css\`padding: 10px 16px; font-size: 15px;\`,
  lg: css\`padding: 14px 20px; font-size: 16px;\`,
};

export const Button = styled.button\`
  border-radius: \${({ theme }) => theme.radius.md};
  border: 1px solid transparent;
  cursor: pointer;
  \${({ $variant = "primary" }) => VARIANTS[$variant]}
  \${({ $size = "md" }) => SIZES[$size]}
\`;

// Usage:
// <Button $variant="ghost" $size="sm">Cancel</Button>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Extending & Composing Styles"}),e.jsx(s.Pre,{children:`import styled from "styled-components";

export const Button = styled.button\`
  padding: 10px 16px;
  border-radius: 10px;
\`;

export const IconButton = styled(Button)\`
  padding: 8px;
  display: inline-grid;
  place-items: center;
  width: 36px; height: 36px;
\`;`}),e.jsx(s.Small,{children:"Extending keeps variants consistent and avoids duplicating base rules."})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Polymorphic Rendering (",e.jsx("code",{children:"as"})," prop)"]}),e.jsx(s.Pre,{children:'<Button as="a" href="/pricing">View Pricing</Button>'}),e.jsxs(s.Small,{children:["Use semantic elements when possible (e.g., render as"," ",e.jsx(s.InlineCode,{children:"<a>"})," for links)."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"attrs() for Defaults & Accessibility"}),e.jsx(s.Pre,{children:`const Submit = styled(Button).attrs({ type: "submit" })\`
  width: 100%;
\`;

// Renders <button type="submit">...`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Keyframes & Animation"}),e.jsx(s.Pre,{children:`import styled, { keyframes } from "styled-components";

const pulse = keyframes\`
  from { transform: scale(1); }
  50%  { transform: scale(1.03); }
  to   { transform: scale(1); }
\`;

export const PulsingCard = styled.div\`
  border-radius: 16px;
  padding: 16px;
  animation: \${pulse} 2.2s ease-in-out infinite;
\`;`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Global Styles (sparingly)"}),e.jsx(s.List,{children:e.jsxs("li",{children:["Use ",e.jsx(s.InlineCode,{children:"createGlobalStyle"})," for resets and app-wide variables; keep most styling component-scoped."]})}),e.jsx(s.Pre,{children:`import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle\`
  :root {
    --radius-xl: \${({ theme }) => theme.radius.xl};
  }
  body {
    background: \${({ theme }) => theme.colors.surface};
    color: \${({ theme }) => theme.colors.text};
  }
\`;

// In root:
// <ThemeProvider theme={theme}>
//   <GlobalStyles />
//   <App />
// </ThemeProvider>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Styling 3rd-Party Components"}),e.jsx(s.Pre,{children:`import Select from "react-select";
import styled from "styled-components";

const StyledSelect = styled(Select)\`
  .react-select__control {
    border-radius: 12px;
    background: #121316;
  }
\`;`}),e.jsx(s.Small,{children:"Inspect the library’s DOM to target proper class names, or prefer libraries exposing style APIs."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep tokens in the theme (",e.jsx(s.InlineCode,{children:"colors"}),","," ",e.jsx(s.InlineCode,{children:"space"}),", ",e.jsx(s.InlineCode,{children:"radius"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx("b",{children:"transient props"})," (",e.jsx(s.InlineCode,{children:"$variant"}),","," ",e.jsx(s.InlineCode,{children:"$size"}),") to avoid React DOM warnings."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," create ",e.jsx("b",{children:"base primitives"})," (Button, Card, Input) and extend them across the app."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," create styled components ",e.jsx("i",{children:"inside"})," render—define them once at module scope."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," overuse global styles; prefer local, component-scoped styles."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mix ad-hoc inline styles and styled-components for the same element without a reason—prefer one source of truth."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Transient props:"})," props prefixed with ",e.jsx(s.InlineCode,{children:"$"})," that styled-components strips from the DOM."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx("code",{children:"css"})," helper:"]})," lets you build reusable style blocks or variant maps."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Theme:"})," shared design tokens available via"," ",e.jsx(s.InlineCode,{children:"ThemeProvider"}),"."]}),e.jsxs("li",{children:[e.jsxs("b",{children:["Polymorphic ",e.jsx("code",{children:"as"}),":"]})," render the same styles as a different semantic tag."]})]})]}),e.jsxs(s.Callout,{children:["Summary: Use ",e.jsx("i",{children:"styled-components"})," to co-locate real CSS with your React components, driven by a theme and transient props. Build a small set of base primitives, add variants with"," ",e.jsx("code",{children:"css"}),", and keep most styles component-scoped for clarity and reuse."]})]});export{t as default};
