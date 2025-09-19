import{j as e}from"./index-CAccbg1x.js";import{S as i}from"./styled-BMFq26at.js";const r=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Container Queries"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"Container Queries"})," let components style themselves based on the ",e.jsx("i",{children:"size of their nearest container"})," instead of the ",e.jsx("i",{children:"viewport"}),". This makes UI pieces truly reusable across sidebars, cards, modals, and dashboards without brittle viewport breakpoints."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Definition & Purpose"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["A ",e.jsx("b",{children:"container"})," is an element that establishes a query context using"," ",e.jsx(i.InlineCode,{children:"container-type"})," (or shorthand"," ",e.jsx(i.InlineCode,{children:"container"}),")."]}),e.jsxs("li",{children:["An ",e.jsx("b",{children:"@container query"})," applies styles when the container meets conditions like"," ",e.jsx(i.InlineCode,{children:"(min-width: 480px)"}),"."]}),e.jsxs("li",{children:["Use when a component should adapt to its ",e.jsx("i",{children:"allocated space"})," (e.g., a Card that lays out media and text differently when wider)."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Enable a Container"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Inline-size"})," is the most common: queries respond to the element’s inline axis (width in LTR/RTL languages)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Size"})," tracks both inline and block axes (width & height). Slightly heavier; use when height matters."]}),e.jsxs("li",{children:["You can also give the container a ",e.jsx("b",{children:"name"})," to target it explicitly."]})]}),e.jsx(i.Pre,{children:`/* Plain CSS */
.card { 
  container-type: inline-size;      /* or: size */
  container-name: card;
  /* shorthand: container: card / inline-size; */
}

/* styled-components */
const Card = styled.div\`
  container: card / inline-size;
  padding: 16px;
\`;`}),e.jsxs(i.Small,{children:["Without ",e.jsx(i.InlineCode,{children:"container-type"}),", @container rules won’t match."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Write an @container Query"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Syntax mirrors media queries, but it targets the ",e.jsx("i",{children:"nearest ancestor container"}),"."]}),e.jsxs("li",{children:["You can query by ",e.jsx(i.InlineCode,{children:"width"}),","," ",e.jsx(i.InlineCode,{children:"inline-size"}),", and when using"," ",e.jsx(i.InlineCode,{children:"container-name"}),", you can scope with the name."]})]}),e.jsx(i.Pre,{children:`/* Target any nearest container */
@container (min-width: 380px) {
  .card__title { font-size: 1.125rem; }
}

/* Target a specific named container */
@container card (min-width: 520px) {
  .card__grid { grid-template-columns: 1fr 2fr; gap: 16px; }
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Example: Adaptive Card"}),e.jsx(i.Pre,{children:`/* CSS/SCSS */
.card { 
  container: card / inline-size; 
  display: grid; 
  gap: 12px; 
}

.card__media { aspect-ratio: 16/9; background: var(--surface-2); }
.card__title { font-size: 1rem; font-weight: 600; }
.card__meta { color: var(--text-2); }

@container card (min-width: 420px) {
  .card { grid-template-columns: 160px 1fr; align-items: center; }
  .card__title { font-size: 1.125rem; }
}

@container card (min-width: 640px) {
  .card__title { font-size: 1.25rem; }
  .card__meta { display: grid; grid-auto-flow: column; gap: 12px; }
}`}),e.jsxs(i.Small,{children:["Drop the same ",e.jsx(i.InlineCode,{children:".card"})," into narrow sidebars or wide content areas—styles adapt to its container width automatically."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Container Query Units"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:"cqw / cqh"}),": 1% of container width/height."]}),e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:"cqi / cqb"}),": 1% of container inline/block size (writing-mode aware)."]}),e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:"cqmin / cqmax"}),": min/max of inline/block sizes."]})]}),e.jsx(i.Pre,{children:`/* Make the badge always ~20% of the container's inline-size */
.card__badge { width: 20cqi; height: 20cqi; border-radius: 50%; }`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Named Containers & Nesting"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Use ",e.jsx(i.InlineCode,{children:"container-name"})," to avoid accidentally matching a higher ancestor container."]}),e.jsxs("li",{children:["Nested components can each establish their own containers; queries always resolve against the",e.jsx("i",{children:" nearest matching"})," container."]})]}),e.jsx(i.Pre,{children:`/* Two levels: a Section and inner Card containers */
.section { container: section / inline-size; padding: 24px; }
.card { container: card / inline-size; }

/* This query targets the nearest 'card' container only */
@container card (min-width: 560px) {
  .card__actions { justify-content: flex-end; }
}

/* A broader layout change for the section container */
@container section (min-width: 900px) {
  .section__grid { grid-template-columns: 2fr 1fr; }
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Patterns: Container vs Media Queries"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Keep ",e.jsx("b",{children:"global layout"})," (header/sidebar presence, app shell) with ",e.jsx("b",{children:"media queries"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"container queries"})," inside components (cards, tiles, toolbars, list items) to adapt per-slot."]}),e.jsx("li",{children:"This separation prevents “one-size-fits-all” viewport breakpoints from breaking isolated components."})]}),e.jsx(i.Pre,{children:`/* Media for global shells */
@media (min-width: 1024px) {
  .app { grid-template-columns: 280px 1fr; }
}

/* Container for components */
.widget { container: widget / inline-size; }
@container widget (min-width: 480px) { .widget__row { display: grid; grid-template-columns: 1fr 1fr; } }`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Style Queries (Advanced)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Style queries test a ",e.jsx("i",{children:"custom property"})," on the container, enabling mode/variant-based styling without extra classes."]}),e.jsx("li",{children:"Guard usage based on your target browsers and progressive enhancement needs."})]}),e.jsx(i.Pre,{children:`/* Container with a custom property that toggles variant */
.card { 
  container: card / inline-size; 
  --variant: "compact"; 
}

/* Apply styles when the container exposes a matching custom property value */
@container style(--variant: "compact") {
  .card__meta { display: none; }
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Performance & Gotchas"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Be selective"}),": making every element a container increases evaluation work. Choose key wrappers (cards, widgets, sections)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Min-content size"}),": set ",e.jsx(i.InlineCode,{children:"min-width: 0"})," on grid/flex children to allow shrinking, or queries may not trigger as expected."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Overflow and borders"})," affect measured size; account for padding/border when designing thresholds."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Nesting"}),": queries resolve to the nearest matching container—name them to avoid surprises."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don’t"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," establish containers on reusable components (cards, widgets, panels)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(i.InlineCode,{children:"inline-size"})," for most cases; switch to"," ",e.jsx(i.InlineCode,{children:"size"})," only when height is relevant."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep breakpoint values semantic (e.g., 28rem, 40rem) aligned with design tokens."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," replace every media query; split responsibilities: layout (media) vs component (container)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," forget ",e.jsx(i.InlineCode,{children:"min-width: 0"})," in flex/grid items to allow shrinking."]})]})]}),e.jsxs(i.Callout,{children:["Summary: define ",e.jsx("i",{children:"containers"})," on components, then write ",e.jsx("i",{children:"@container"})," rules to adapt layout and type as space changes. Use container query units for fluid sizing, keep performance in mind, and reserve global media queries for the app shell."]})]});export{r as default};
