import{j as e}from"./index-DqLKwkYK.js";import{S as i}from"./styled-BvR44Kc4.js";const r=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Responsive Design"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"Responsive design"})," means your UI ",e.jsx("i",{children:"adapts fluidly"})," to different screen sizes, orientations, and input types—without breaking layout, readability, or usability. Core ideas: ",e.jsx("b",{children:"mobile-first"}),", ",e.jsx("b",{children:"fluid layouts"}),", sensible ",e.jsx("b",{children:"breakpoints"}),", and",e.jsx("b",{children:"progressive enhancement"}),"."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"What & Why"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Responsive"}),": layout/content reflow to fit any viewport (phone → ultra-wide)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mobile-first"}),": start with a solid small-screen layout, then enhance for larger screens via ",e.jsx(i.InlineCode,{children:"@media (min-width: ...)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fluid"}),": avoid rigid pixels; prefer percentages, ",e.jsx(i.InlineCode,{children:"rem"}),", and ",e.jsx(i.InlineCode,{children:"vw/vh"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Breakpoint"}),": the viewport width where layout changes meaningfully (content-driven, not device-driven)."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Viewport Meta (index.html)"}),e.jsxs(i.Small,{children:["Ensure this exists once in ",e.jsx(i.InlineCode,{children:"index.html"})," so CSS pixels map to device pixels correctly."]}),e.jsx(i.Pre,{children:`<!-- index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1" />`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Units & Fluid Scales"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Typography:"})," base on ",e.jsx(i.InlineCode,{children:"rem"})," so users’ OS zoom/accessibility settings scale text."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Layout:"})," use percentages and ",e.jsx(i.InlineCode,{children:"min()"}),"/",e.jsx(i.InlineCode,{children:"max()"}),"/",e.jsx(i.InlineCode,{children:"clamp()"})," for fluid constraints."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Viewport units:"})," ",e.jsx(i.InlineCode,{children:"vw"}),"/",e.jsx(i.InlineCode,{children:"vh"})," for large sections; consider dynamic units ",e.jsx(i.InlineCode,{children:"dvh"}),"/",e.jsx(i.InlineCode,{children:"dvw"})," to avoid mobile URL bar issues."]})]}),e.jsx(i.Pre,{children:`/* Fluid type scale with bounds */
:root { --step-0: clamp(14px, 0.9rem + 0.2vw, 16px); }
h1 { font-size: clamp(1.8rem, 1.2rem + 2vw, 3rem); }`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Breakpoints (Content-First)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Choose breakpoints where your layout ",e.jsx("i",{children:"needs"})," to change (e.g., cards wrap from 1 → 2 → 3 columns)."]}),e.jsxs("li",{children:["Prefer ",e.jsx(i.InlineCode,{children:"min-width"})," queries (mobile-first)."]}),e.jsx("li",{children:"Keep the set small and meaningful (e.g., 480, 768, 1024, 1280)."})]}),e.jsx(i.Pre,{children:`/* Mobile-first media queries */
.container { padding: 16px; max-width: 720px; margin: 0 auto; }
@media (min-width: 768px)  { .container { max-width: 960px; } }
@media (min-width: 1024px) { .container { max-width: 1120px; } }
@media (min-width: 1280px) { .container { max-width: 1280px; } }`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Layout Patterns: Flex & Grid"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Flexbox"})," for 1-D alignment (rows/columns, nav bars, toolbars)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Grid"})," for 2-D layouts; ",e.jsx(i.InlineCode,{children:"auto-fit"})," + ",e.jsx(i.InlineCode,{children:"minmax"})," gives magic responsive cards."]})]}),e.jsx(i.Pre,{children:`/* Responsive card grid (no explicit breakpoints) */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}`}),e.jsx(i.Small,{children:"This grid expands from 1 column on mobile to as many columns as fit the container."})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"styled-components Examples"}),e.jsx(i.Pre,{children:`// tokens.js
export const bp = { sm: 480, md: 768, lg: 1024, xl: 1280 };

// Component.styled.js
import styled from "styled-components";
import { bp } from "../tokens";

export const Wrapper = styled.div\`
  padding: 16px;
  max-width: 720px;
  margin: 0 auto;

  @media (min-width: \${bp.md}px)  { max-width: 960px; }
  @media (min-width: \${bp.lg}px)  { max-width: 1120px; }
  @media (min-width: \${bp.xl}px)  { max-width: 1280px; }
\`;

export const Cards = styled.div\`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
\`;

export const Hero = styled.section\`
  min-height: 60dvh;
  display: grid;
  place-items: center;
  padding: clamp(24px, 4vw, 64px);
\`;`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Images & Media"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Make media flexible: ",e.jsxs(i.InlineCode,{children:["img, video ","{ max-width: 100%; height: auto; }"]}),"."]}),e.jsxs("li",{children:["Use ",e.jsx(i.InlineCode,{children:"srcset"})," + ",e.jsx(i.InlineCode,{children:"sizes"})," to send the right resolution; add ",e.jsx(i.InlineCode,{children:'loading="lazy"'})," for below-the-fold."]}),e.jsxs("li",{children:["Contain or cover using ",e.jsx(i.InlineCode,{children:"object-fit"})," to preserve aspect ratios."]})]}),e.jsx(i.Pre,{children:`<img
  src="hero-800.jpg"
  srcSet="hero-480.jpg 480w, hero-800.jpg 800w, hero-1280.jpg 1280w"
  sizes="(min-width: 1024px) 960px, 100vw"
  alt="Product screenshot"
  loading="lazy"
/>`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Nav & Touch Targets"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Minimum target size ~44×44px (or equivalent in ",e.jsx(i.InlineCode,{children:"rem"}),")."]}),e.jsxs("li",{children:["Use ",e.jsx(i.InlineCode,{children:"@media (hover: none)"})," / ",e.jsx(i.InlineCode,{children:"(pointer: coarse)"})," to adjust hover-only UI for touch devices."]})]}),e.jsx(i.Pre,{children:`/* Hover alternatives for touch */
@media (hover: none) {
  .nav .menu:hover .dropdown { /* don't rely on hover */ }
  .nav .menu .dropdown { /* show via click/tap JS or always visible */ }
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Motion & Accessibility"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Respect users who prefer less motion: ",e.jsx(i.InlineCode,{children:"@media (prefers-reduced-motion: reduce)"}),"."]}),e.jsx("li",{children:"Prevent layout shift (CLS): reserve space for images/media; avoid late font swaps, or use font loading strategies."})]}),e.jsx(i.Pre,{children:`@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Tables & Overflow"}),e.jsxs(i.List,{children:[e.jsx("li",{children:"Allow horizontal scrolling on small screens; add sticky headers if needed."}),e.jsx("li",{children:"Alternative: convert rows into card blocks on narrow viewports."})]}),e.jsx(i.Pre,{children:`.table-wrap { overflow-x: auto; }
table { border-collapse: collapse; min-width: 640px; }`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don’t"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," start mobile-first; scale up with ",e.jsx(i.InlineCode,{children:"min-width"})," queries."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use fluid containers and a small, consistent breakpoint set."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," test on real devices and DevTools device emulation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," hardcode fixed widths everywhere or rely solely on pixels."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," hide content on small screens if it’s core; reflow or stack it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," make hover-only interactions without touch alternatives."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Breakpoint"}),": viewport width where layout rules change."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mobile-first"}),": default styles target small screens; larger screens add enhancements."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fluid"}),": sizes scale with container/viewport; opposite of rigid fixed layouts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Container query"}),": style based on ",e.jsx("i",{children:"container"})," width (covered in the next topic)."]})]})]}),e.jsx(i.Callout,{children:"Summary: design small → scale up, use fluid sizes, keep breakpoints meaningful, and ensure accessible interactions across touch, mouse, and keyboard."})]});export{r as default};
