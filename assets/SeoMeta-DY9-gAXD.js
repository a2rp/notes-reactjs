import{j as e}from"./index-BUVRD3Bm.js";import{S as t}from"./styled-CR0EH59L.js";const s=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"SEO & Metadata (SSR & RSC Concepts)"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"SEO (Search Engine Optimization)"})," is the practice of making your site discoverable and understandable to search engines and social platforms. ",e.jsx("b",{children:"Metadata"})," lives in the HTML"," ",e.jsx(t.InlineCode,{children:"<head>"})," (title, description, canonical, Open Graph, JSON-LD, etc.) and describes your page so crawlers and link unfurlers know what it is."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"What is Metadata?"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Title"}),": the page’s name shown in tabs and search results."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Meta description"}),": summary under the title in results; not a ranking factor, but impacts CTR."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Robots directives"}),": hints for indexing (e.g., ",e.jsx(t.InlineCode,{children:"index"}),","," ",e.jsx(t.InlineCode,{children:"noindex"}),", ",e.jsx(t.InlineCode,{children:"follow"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Canonical URL"}),": the “official” URL for duplicate/variant content."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Open Graph & Twitter Cards"}),": control link previews on social media."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Structured Data (JSON-LD)"}),": machine-readable facts (articles, products, breadcrumbs)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Viewport"}),": how the page scales on mobile; critical for Core Web Vitals."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Why SSR/SSG/ISR help SEO"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"SSR (Server-Side Rendering)"}),": server sends complete HTML (including meta and content) so crawlers and users see meaningful content on first response."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SSG (Static Site Generation)"}),": HTML is prebuilt at build time; fastest delivery for mostly static pages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ISR (Incremental Static Regeneration)"}),": selectively re-generates pages after deploy on a schedule or on demand."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hydration"}),": client JS attaches interactivity to server/SSG HTML; meta is already present in the HTML."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Streaming"}),": server sends HTML in chunks; head/meta should be ready early for quick discovery."]})]}),e.jsx(t.Small,{children:"SPA (client-only) can still rank, but SSR/SSG/ISR make metadata and content available without waiting on JS."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Core Head Tags (minimum viable SEO)"}),e.jsx(t.Pre,{children:`<!-- index.html (global defaults) -->
<title>Site Name</title>
<meta name="description" content="Default site description." />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="canonical" href="https://example.com/" />
<meta name="robots" content="index,follow" />`}),e.jsx(t.Small,{children:"Set sensible defaults globally; override per-route when needed."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Social Cards: Open Graph & Twitter"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Open Graph"})," (",e.jsx(t.InlineCode,{children:"og:"}),") controls previews on platforms like Facebook, LinkedIn, Slack, etc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Twitter Cards"})," control previews on X (Twitter)."]}),e.jsxs("li",{children:["Recommended ",e.jsx("b",{children:"og:image"}),": 1200×630 (aspect ~1.91:1), static URL, ≤5MB."]})]}),e.jsx(t.Pre,{children:`<meta property="og:title" content="React Notes — SEO & Metadata" />
<meta property="og:description" content="A guide to SEO tags in React." />
<meta property="og:url" content="https://example.com/ssr-rsc/seo-meta" />
<meta property="og:type" content="article" />
<meta property="og:image" content="https://example.com/og/seo-meta.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="React Notes — SEO & Metadata" />
<meta name="twitter:description" content="A guide to SEO tags in React." />
<meta name="twitter:image" content="https://example.com/og/seo-meta.png" />`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Structured Data (JSON-LD)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Add ",e.jsx("b",{children:"JSON-LD"})," inside a ",e.jsx(t.InlineCode,{children:'<script type="application/ld+json">'})," tag."]}),e.jsxs("li",{children:["Common types: ",e.jsx("b",{children:"Article"}),", ",e.jsx("b",{children:"BreadcrumbList"}),", ",e.jsx("b",{children:"Product"}),", ",e.jsx("b",{children:"Organization"}),", ",e.jsx("b",{children:"FAQPage"}),"."]}),e.jsx("li",{children:"Helps with rich results (stars, breadcrumbs, sitelinks)."})]}),e.jsx(t.Pre,{children:`<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"Article",
  "headline":"SEO & Metadata in React",
  "author":{"@type":"Person","name":"Ashish Ranjan"},
  "datePublished":"2025-09-17",
  "image":"https://example.com/og/seo-meta.png"
}
<\/script>`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"SPA: Per-Route Meta (no extra library)"}),e.jsx(t.Pre,{children:`// In a route component (CSR with Vite + React Router)
import React from "react";

function useMeta({ title, description, canonical, robots }) {
  React.useEffect(() => {
    if (title) document.title = title;

    const set = (selector, attr, value, createTag) => {
      if (!value) return;
      let el = document.head.querySelector(selector);
      if (!el && createTag) {
        el = document.createElement(createTag);
        if (createTag === "meta") el.setAttribute("name", selector.match(/name="(.+?)"/)[1]);
        document.head.appendChild(el);
      }
      if (el) el.setAttribute(attr, value);
    };

    set('meta[name="description"]', "content", description, "meta");
    // canonical link
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.setAttribute("rel", "canonical"); document.head.appendChild(link); }
    if (canonical) link.setAttribute("href", canonical);
    // robots
    set('meta[name="robots"]', "content", robots, "meta");
  }, [title, description, canonical, robots]);
}

export default function SeoMetaPage() {
  useMeta({
    title: "SEO & Metadata — React Notes",
    description: "Guide to head tags, social cards, and JSON-LD.",
    canonical: "https://example.com/ssr-rsc/seo-meta",
    robots: "index,follow"
  });
  return <div>...</div>;
}`}),e.jsxs(t.Small,{children:["Simple and library-free. Note: This updates ",e.jsx("i",{children:"after"})," JS runs, which is fine for SPAs but not as strong as SSR/SSG."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["SPA: Per-Route Meta with ",e.jsx("code",{children:"react-helmet-async"})]}),e.jsx(t.List,{children:e.jsx("li",{children:"A head manager that works in CSR and SSR. For CSR only, it simplifies setting tags per route."})}),e.jsx(t.Pre,{children:`// 1) install: npm i react-helmet-async
// 2) wrap app: <HelmetProvider><App/></HelmetProvider>
// 3) in a page:
import { Helmet } from "react-helmet-async";

export function SeoMetaHelmet() {
  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>SEO & Metadata — React Notes</title>
        <meta name="description" content="Guide to head tags, social cards, JSON-LD." />
        <link rel="canonical" href="https://example.com/ssr-rsc/seo-meta" />
        <meta name="robots" content="index,follow" />
        {/* Open Graph */}
        <meta property="og:title" content="SEO & Metadata — React Notes" />
        <meta property="og:description" content="Guide to head tags, social cards, JSON-LD." />
        <meta property="og:image" content="https://example.com/og/seo-meta.png" />
        <meta property="og:type" content="article" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <main>...</main>
    </>
  );
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Canonical, Duplicates & Internationalization"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Use a ",e.jsx("b",{children:"canonical"})," link to declare the preferred URL when the same content exists at multiple addresses (filters, UTMs, trailing slashes)."]}),e.jsxs("li",{children:["For multiple languages/regions, add ",e.jsx("b",{children:"hreflang"})," links to indicate alternates."]})]}),e.jsx(t.Pre,{children:`<link rel="canonical" href="https://example.com/ssr-rsc/seo-meta" />
<link rel="alternate" href="https://example.com/en/seo-meta" hreflang="en" />
<link rel="alternate" href="https://example.com/hi/seo-meta" hreflang="hi" />`})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Performance Hints in ",e.jsx("code",{children:"<head>"})]}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"preconnect"}),": warm up connections to critical origins (fonts, APIs, CDN)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"preload"}),": fetch a critical asset early (hero image, font); use carefully."]}),e.jsxs("li",{children:[e.jsx("b",{children:"dns-prefetch"}),": lightweight hint for future origins."]})]}),e.jsx(t.Pre,{children:`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" href="/hero-desktop.jpg" as="image" imagesrcset="/hero-desktop.jpg 1x, /hero-desktop@2x.jpg 2x" />
<link rel="dns-prefetch" href="//cdn.example.com" />`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Robots & Sitemaps"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"robots.txt"}),": high-level crawl rules per user-agent."]}),e.jsxs("li",{children:[e.jsx("b",{children:"XML sitemap"}),": list of canonical URLs to help discovery (update on deploy)."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"noindex"})," on thin/private pages; ",e.jsx("b",{children:"index"})," on canonical content."]})]}),e.jsx(t.Pre,{children:`# robots.txt (example)
User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml

<!-- Per-page override -->
<meta name="robots" content="noindex,follow" />`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don’t"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," write unique ",e.jsx("i",{children:"title"}),"/",e.jsx("i",{children:"description"})," per page; match the main content."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," provide a stable, absolute ",e.jsx("i",{children:"canonical"})," URL for each page."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," host ",e.jsx("i",{children:"og:image"})," at a permanent, crawlable URL; keep it under ~5MB."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," stuff keywords; keep copy human and accurate."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," switch canonical per user (UTMs, sort order)—pick one canonical."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," block JS/CSS in robots unless you know the impact; crawlers render pages."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Hydration"}),": attaching React event listeners to existing server/SSG HTML."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Streaming"}),": sending HTML in chunks; head can be sent early."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Canonical"}),": the single URL you want indexed for a page."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Open Graph"}),": meta spec for rich link previews."]}),e.jsxs("li",{children:[e.jsx("b",{children:"JSON-LD"}),": JSON syntax for structured data in a script tag."]})]})]}),e.jsxs(t.Callout,{children:["Summary: Ship accurate ",e.jsx("i",{children:"title"}),", ",e.jsx("i",{children:"description"}),", ",e.jsx("i",{children:"canonical"}),", social cards, and JSON-LD. Prefer SSR/SSG/ISR when SEO matters so crawlers get metadata and content in the initial HTML. In SPAs, set per-route meta on mount or use a head manager like react-helmet-async."]})]});export{s as default};
