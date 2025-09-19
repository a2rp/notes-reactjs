import{j as e}from"./index-CAccbg1x.js";import{S as s}from"./styled-BJ30T1Q4.js";const r=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Sanitize HTML"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Sanitizing HTML"})," means taking ",e.jsx("i",{children:"untrusted HTML"})," and transforming it into a",e.jsx("b",{children:" safe subset"})," by ",e.jsx("em",{children:"removing or fixing"})," dangerous tags, attributes, and URLs. React ",e.jsx("b",{children:"escapes text by default"}),", so plain strings are safe. Sanitization is only needed when you must render HTML with ",e.jsx(s.InlineCode,{children:"dangerouslySetInnerHTML"}),"(e.g., CMS content, Markdown output)."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why sanitize? (XSS threat)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"XSS (Cross-Site Scripting):"})," an attacker injects script into a page so it runs in the victim's browser. Types include:",e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Stored XSS:"})," malicious content saved on the server (e.g., comments)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reflected XSS:"})," payload bounces off a request (e.g., query param)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DOM-based XSS:"})," injection via client-side JS manipulating the DOM."]})]})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Untrusted HTML:"})," any HTML you didn't generate yourself (user input, third-party, CMS, Markdown-to-HTML output)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Goal of sanitization:"})," allow only a minimal, known-good (allowlist) set of tags, attributes, and URL schemes."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"React defaults: text is safe, raw HTML is not"}),e.jsx(s.Pre,{children:`function SafeText({ userText }) {
  // React auto-escapes: "<img onerror=...>" will be rendered as text, not executed.
  return <p>{userText}</p>;
}

function UnsafeHtml({ html }) {
  // Risky if 'html' is untrusted. Only do this with sanitized HTML.
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Rule:"})," Prefer rendering text. Only use"," ",e.jsx(s.InlineCode,{children:"dangerouslySetInnerHTML"})," with sanitized content."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"What makes HTML dangerous?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Inline handlers:"})," ",e.jsx(s.InlineCode,{children:"onclick"}),","," ",e.jsx(s.InlineCode,{children:"onerror"}),", etc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dangerous URLs:"})," ",e.jsx(s.InlineCode,{children:"javascript:"}),","," ",e.jsx(s.InlineCode,{children:"data:"})," in"," ",e.jsx(s.InlineCode,{children:"href/src"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Executable contexts:"})," ",e.jsx(s.InlineCode,{children:"<script>"}),","," ",e.jsx(s.InlineCode,{children:"<iframe>"}),","," ",e.jsx(s.InlineCode,{children:"<style>"})," with harmful CSS,"," ",e.jsx(s.InlineCode,{children:"<svg>"})," with event handlers."]})]}),e.jsx(s.Pre,{children:`// Common XSS payloads (do NOT render these without sanitization)
<a href="javascript:alert(1)">Click</a>
<img src=x onerror="alert(1)">
<svg onload="alert(1)"></svg>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Allowlist vs Blocklist"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Allowlist (recommended):"})," explicitly permit safe tags/attributes; remove everything else."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Blocklist (unsafe):"})," trying to list all bad things is brittle—new vectors appear."]})]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Libraries: ",e.jsx("code",{children:"sanitize-html"})," (Node/SSR) & DOMPurify (browser)"]}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"sanitize-html:"})," popular for Node/SSR and also usable in the browser; highly configurable allowlists and URL scheme checks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DOMPurify:"})," small, fast client-side sanitizer that integrates well in the browser."]})]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Example: ",e.jsx("code",{children:"sanitize-html"})," configuration"]}),e.jsx(s.Pre,{children:`import sanitizeHtml from "sanitize-html";

const config = {
  allowedTags: [
    "b","i","em","strong","a","p","br","ul","ol","li","code","pre","blockquote"
  ],
  allowedAttributes: {
    a: ["href","name","target","rel"],
    "*": ["title"]
  },
  // Only allow safe URL schemes
  allowedSchemes: ["http","https","mailto","tel"],
  // Optional: restrict iframe hosts if you allow iframes
  allowedIframeHostnames: ["www.youtube.com","player.vimeo.com"],
  transformTags: {
    // Enforce safe anchor behavior
    "a": sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" })
  },
  // Disallow style and event handlers entirely
  disallowedTagsMode: "discard"
};

export function toSafeHtml(untrustedHtml) {
  return sanitizeHtml(untrustedHtml, config);
}

// Usage in a component:
function Article({ htmlFromCMS }) {
  const clean = toSafeHtml(htmlFromCMS);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Tip:"})," keep the allowlist minimal. Add tags only when truly needed."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Example: DOMPurify (browser-side)"}),e.jsx(s.Pre,{children:`import DOMPurify from "dompurify";

function SafeBlock({ html }) {
  const clean = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },     // base safe HTML profile
    ALLOWED_URI_REGEXP: /^(https?:|mailto:|tel:)/i
  });
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}`}),e.jsx(s.Small,{children:"DOMPurify strips event handlers and dangerous URLs. You can extend allowlists if needed."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Markdown → HTML → Sanitize"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["If you convert Markdown to HTML (remark/rehype/marked), ",e.jsx("b",{children:"still sanitize"})," the output."]}),e.jsxs("li",{children:["Prefer a ",e.jsx("b",{children:"strict allowlist"})," (e.g., text formatting, lists, code) and ban raw HTML in Markdown if possible."]})]}),e.jsx(s.Pre,{children:`// Pseudo-pipeline
const html = markdownToHtml(userMarkdown);
const safe = sanitizeHtml(html, config);
render(<div dangerouslySetInnerHTML={{ __html: safe }} />);`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"URLs, Iframes, and Schemes"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Only allow ",e.jsx("b",{children:"http"}),", ",e.jsx("b",{children:"https"}),", ",e.jsx("b",{children:"mailto"}),", ",e.jsx("b",{children:"tel"}),". Reject"," ",e.jsx(s.InlineCode,{children:"javascript:"})," and unrestricted"," ",e.jsx(s.InlineCode,{children:"data:"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Iframes:"})," avoid if you can. If necessary, allow only specific hostnames and apply"," ",e.jsx(s.InlineCode,{children:"sandbox"}),","," ",e.jsx(s.InlineCode,{children:"allow"})," attributes."]})]}),e.jsx(s.Pre,{children:`// Example: allowing only YouTube embeds (sanitize-html)
const config = {
  allowedTags: ["iframe"],
  allowedAttributes: { iframe: ["src","width","height","allow","allowfullscreen","frameborder"] },
  allowedIframeHostnames: ["www.youtube.com"]
};`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"CSS risks & style attributes"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Avoid ",e.jsx("b",{children:"inline styles"})," in untrusted HTML. Some CSS can aid data exfiltration or UI redress attacks."]}),e.jsxs("li",{children:["Strip ",e.jsx(s.InlineCode,{children:"style"})," attributes (default in strict configs)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Defense in Depth"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"CSP (Content-Security-Policy):"})," an HTTP header that restricts where scripts/styles can load from and can disallow ",e.jsx(s.InlineCode,{children:"unsafe-inline"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Trusted Types:"})," a browser policy that forces you to create HTML via vetted functions, preventing DOM XSS sinks (where supported)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Escape everywhere else:"})," for attributes, URLs, and text—escape/encode appropriately even if you sanitize."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Testing & QA"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Fuzz with known payloads (",e.jsx(s.InlineCode,{children:"<img onerror>"}),", ",e.jsx(s.InlineCode,{children:"javascript:"})," links, SVG)."]}),e.jsx("li",{children:"Snapshot sanitized output for representative inputs."}),e.jsx("li",{children:"Pin library versions and review changelogs for security fixes."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep an allowlist small; add only necessary tags/attributes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," sanitize on the server (SSR) and/or at render time (client) depending on flow."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use CSP + Trusted Types where possible for extra protection."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," render untrusted HTML as raw; never trust user input."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," rely on a blocklist or regex to “filter XSS.” Use a real sanitizer."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Sanitization:"})," structurally removing/rewriting unsafe HTML parts to a safe subset."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Allowlist:"})," only the explicitly permitted items are allowed; best practice."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scheme:"})," the protocol of a URL (e.g., ",e.jsx("i",{children:"https"}),", ",e.jsx("i",{children:"mailto"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CSP:"})," HTTP policy that limits resource loading and script execution."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Trusted Types:"})," browser feature that blocks unsafe DOM sinks unless vetted."]})]})]}),e.jsxs(s.Callout,{children:[e.jsx("b",{children:"Summary:"})," Render text by default. If you must render HTML, sanitize with a strict allowlist using ",e.jsx("i",{children:"sanitize-html"})," (Node/SSR) or DOMPurify (browser), lock down URLs and iframes, and add CSP/Trusted Types for defense in depth."]})]});export{r as default};
