import{j as e}from"./index-C1_RbWbm.js";import{S as i}from"./styled-DEX5p2OQ.js";const t=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"RTL Support (Right-to-Left)"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"RTL"})," (right-to-left) languages like Arabic, Hebrew, and Persian are written and read from right to left. Good RTL support means your UI ",e.jsx("i",{children:"and"})," content adapt without hacks. This page explains the concepts and shows safe, production-ready patterns."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core Definitions"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"LTR / RTL:"})," ",e.jsx("i",{children:"Left-to-right"})," vs ",e.jsx("i",{children:"right-to-left"})," text direction. English/Hindi are LTR; Arabic/Hebrew are RTL."]}),e.jsxs("li",{children:[e.jsx("b",{children:"dir attribute:"})," HTML attribute that controls direction. Common values:"," ",e.jsx(i.InlineCode,{children:"ltr"}),", ",e.jsx(i.InlineCode,{children:"rtl"}),","," ",e.jsx(i.InlineCode,{children:"auto"}),". Example:"," ",e.jsx(i.InlineCode,{children:'<html dir="rtl" lang="ar">'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Bidi (bi-directional) text:"})," Text containing both RTL and LTR segments (e.g., Arabic sentence with an English product code). Browsers apply the ",e.jsx("i",{children:"Unicode Bidirectional Algorithm"})," to order characters correctly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scripts:"})," Writing systems (Latin, Arabic, Hebrew). Some scripts require"," ",e.jsx("b",{children:"glyph shaping"})," (context-dependent character forms), handled by the font engine."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mirroring:"})," Certain symbols (e.g., parentheses, arrows) visually mirror in RTL contexts. UI icons may also need ",e.jsx("i",{children:"manual"})," mirroring (e.g., chevrons)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Logical properties:"})," CSS properties that reference ",e.jsx("i",{children:"inline/block"})," flow instead of physical ",e.jsx("i",{children:"left/right/top/bottom"}),". They automatically adapt in RTL. Example: ",e.jsx(i.InlineCode,{children:"margin-inline-start"}),"."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Enable RTL at the Right Level"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Document-wide:"})," set once on ",e.jsx(i.InlineCode,{children:"<html>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"App/Container-only:"})," set ",e.jsx(i.InlineCode,{children:"dir"})," on the app root when you need per-app control inside a larger page."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Per-component:"})," only for special cases (e.g., an embedded RTL widget inside an LTR page)."]})]}),e.jsx(i.Pre,{children:`// Document-wide (index.html)
// <html dir="rtl" lang="ar"> ... </html>

// App-level (React)
function AppRoot({ dir = "ltr", lang = "en" }) {
  React.useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", dir);    // "rtl" or "ltr"
    html.setAttribute("lang", lang);  // e.g., "ar", "he", "en"
  }, [dir, lang]);

  return <div id="app">{/* ... */}</div>;
}`}),e.jsxs(i.Small,{children:["Prefer setting ",e.jsx(i.InlineCode,{children:"dir"})," on"," ",e.jsx(i.InlineCode,{children:"<html>"})," (or a single high-level container) to avoid conflicting nested directions."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Use CSS Logical Properties (Avoid left/right)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Inline vs Block:"})," ",e.jsx("i",{children:"Inline"})," flows horizontally (start→end), ",e.jsx("i",{children:"Block"})," vertically (before→after). In RTL, inline start is the right side; in LTR, it's the left side."]}),e.jsxs("li",{children:["Replace ",e.jsx(i.InlineCode,{children:"margin-left/right"})," with"," ",e.jsx(i.InlineCode,{children:"margin-inline-start/end"}),"."]}),e.jsxs("li",{children:["Replace ",e.jsx(i.InlineCode,{children:"padding-left/right"})," with"," ",e.jsx(i.InlineCode,{children:"padding-inline-start/end"}),"."]}),e.jsxs("li",{children:["Replace ",e.jsx(i.InlineCode,{children:"left/right"})," (positioning) with"," ",e.jsx(i.InlineCode,{children:"inset-inline-start/end"}),"."]}),e.jsxs("li",{children:["Borders & radius: use ",e.jsx(i.InlineCode,{children:"border-inline-start"}),","," ",e.jsx(i.InlineCode,{children:"border-inline-end"}),","," ",e.jsx(i.InlineCode,{children:"border-start-start-radius"}),","," ",e.jsx(i.InlineCode,{children:"border-start-end-radius"}),", etc."]}),e.jsxs("li",{children:["Text alignment: use ",e.jsx(i.InlineCode,{children:"text-align: start | end"})," instead of left/right."]})]}),e.jsx(i.Pre,{children:`/* BAD: breaks in RTL */
.card {
  padding-left: 16px;
  border-left: 4px solid var(--accent);
}

/* GOOD: adapts automatically */
.card {
  padding-inline-start: 16px;
  border-inline-start: 4px solid var(--accent);
}

/* Positioning */
.badge {
  position: absolute;
  right: 8px; /* BAD */
}
.badge {
  position: absolute;
  inset-inline-end: 8px; /* GOOD */
}

/* Text */
.title { text-align: start; } /* start -> left in LTR, right in RTL */`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Icons, Arrows, and Chevrons"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Semantics over shape:"})," name icons by meaning (",e.jsx("i",{children:"previous / next"}),") not by side (",e.jsx("i",{children:"left / right"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Auto-mirror:"})," flip with CSS under RTL, or swap the icon component."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do not"})," mirror numerals or text icons; only direction-dependent symbols."]})]}),e.jsx(i.Pre,{children:`/* CSS auto flip based on direction */
[dir="rtl"] .chevron { transform: scaleX(-1); }
[dir="ltr"] .chevron { transform: none; }

/* React swap by direction */
function Chevron({ dir = document?.documentElement?.dir || "ltr" }) {
  return dir === "rtl" ? <span aria-hidden>›</span> : <span aria-hidden>‹</span>;
}

// Usage in nav buttons:
function Pager({ dir }) {
  return (
    <div className="pager">
      <button><Chevron dir={dir} /> <span>Previous</span></button>
      <button><span>Next</span> <Chevron dir={dir} /></button>
    </div>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Forms & Inputs"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Use ",e.jsx(i.InlineCode,{children:"text-align: start"})," for inputs to align with the reading direction."]}),e.jsxs("li",{children:["For codes/IDs/URLs inside RTL UIs, wrap in ",e.jsx(i.InlineCode,{children:"<bdi>"})," to isolate direction."]}),e.jsxs("li",{children:["Use ",e.jsx(i.InlineCode,{children:'dir="auto"'})," for user-generated content so the browser chooses direction per string."]})]}),e.jsx(i.Pre,{children:`// Mixed content isolation
<p>
  Order ID: <bdi>AB-42-X1</bdi>
</p>

// Input aligned to direction
input[type="text"] { text-align: start; }`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Mixed Direction Content: Isolate or Override"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:"<bdi>"})," (Bi-Directional Isolation): isolates a span so surrounding text doesn't reorder it."]}),e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:'<bdo dir="rtl|ltr">'})," (Bi-Directional Override): forces a direction for that span."]}),e.jsxs("li",{children:["CSS ",e.jsx(i.InlineCode,{children:"direction"})," and"," ",e.jsx(i.InlineCode,{children:"unicode-bidi"})," can force/override direction, but prefer semantic HTML first."]})]}),e.jsx(i.Pre,{children:`// Example: force a LTR code snippet inside an RTL paragraph
<p dir="rtl">
  لتثبيت الحزمة، شغّل:
  <bdo dir="ltr"><code>npm install my-lib</code></bdo>
</p>`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Hooking Direction to Locale"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["When a user switches language, update ",e.jsx(i.InlineCode,{children:"dir"})," and"," ",e.jsx(i.InlineCode,{children:"lang"})," on ",e.jsx(i.InlineCode,{children:"<html>"}),"."]}),e.jsxs("li",{children:["Many i18n libs expose a ",e.jsx(i.InlineCode,{children:"dir()"})," helper that returns"," ",e.jsx(i.InlineCode,{children:'"rtl"'})," or ",e.jsx(i.InlineCode,{children:'"ltr"'}),"."]})]}),e.jsx(i.Pre,{children:`// Example with an i18n manager exposing dir() and language
function useHtmlDirection(i18n) {
  React.useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", i18n.dir());       // "rtl" or "ltr"
    html.setAttribute("lang", i18n.language);   // e.g., "ar"
  }, [i18n]);
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Layout Tips & Performance"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Prefer logical properties over flipping entire layouts with"," ",e.jsx(i.InlineCode,{children:"flex-direction: row-reverse"}),". Use reverse only when truly needed."]}),e.jsxs("li",{children:["Grids work great with logical gaps and ",e.jsx(i.InlineCode,{children:"justify-content"})," values; avoid hardcoded left/right offsets."]}),e.jsxs("li",{children:["Carousels/steppers: base “previous/next” on ",e.jsx("i",{children:"start/end"})," semantics, not left/right."]}),e.jsxs("li",{children:["Avoid setting ",e.jsx(i.InlineCode,{children:"direction: rtl"})," on scroll containers just to “flip” scrolling; it can invert wheel/keyboard behavior unexpectedly."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," set ",e.jsx(i.InlineCode,{children:"dir"})," on ",e.jsx(i.InlineCode,{children:"<html>"})," (or one app root) when switching locales."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use CSS logical properties and ",e.jsx(i.InlineCode,{children:"text-align: start|end"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," isolate mixed text with ",e.jsx(i.InlineCode,{children:"<bdi>"})," and use ",e.jsx(i.InlineCode,{children:'dir="auto"'})," for user content."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," hardcode left/right offsets, paddings, borders, or icon directions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," rely on global ",e.jsx(i.InlineCode,{children:"row-reverse"})," to “make things RTL”. Fix styles at the property level."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"dir:"})," HTML attribute that sets direction for an element's descendants."]}),e.jsxs("li",{children:[e.jsx("b",{children:"lang:"})," Language tag used for fonts, spellcheck, screen readers, hyphenation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Inline start/end:"})," Logical left/right depending on direction (start = left in LTR, right in RTL)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Block start/end:"})," Logical top/bottom following writing mode (usually top/bottom)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"bdi / bdo:"})," Elements for isolating or overriding bidirectional text behavior."]})]})]}),e.jsxs(i.Callout,{children:["Summary: Set ",e.jsx("b",{children:"dir"})," at the document or app root, adopt ",e.jsx("b",{children:"CSS logical properties"}),", mirror icons by direction, and isolate mixed-direction text. These patterns keep your UI correct and maintainable in both LTR and RTL."]})]});export{t as default};
