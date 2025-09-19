import{j as e}from"./index-BUVRD3Bm.js";import{S as o}from"./styled-DJM-L2iW.js";const s=()=>e.jsxs(o.Page,{children:[e.jsx(o.Title,{children:"Scroll Restore"}),e.jsxs(o.Lead,{children:[e.jsx("b",{children:"Scroll restoration"})," means putting the page (or a scrollable container) back to the expected scroll position after navigation. Users expect ",e.jsx("i",{children:"new pages to start at the top"}),", and when they hit ",e.jsx("b",{children:"Back/Forward"})," they expect to ",e.jsx("i",{children:"return to where they left"}),"."]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Definition & Purpose"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Scroll position:"})," the current X/Y offset of a scrollable area (e.g., window or a div)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scroll restoration:"})," restoring that offset after navigation so content is where the user expects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why it matters:"})," without restoration, users lose context—lists jump to top, long docs reset, etc."]})]})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Key Terms (clearly defined)"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Viewport:"})," the visible area of the page inside the browser window."]}),e.jsxs("li",{children:[e.jsx("b",{children:"PUSH / REPLACE / POP:"})," navigation types. ",e.jsx("i",{children:"PUSH"})," adds a new entry, ",e.jsx("i",{children:"REPLACE"})," updates the current entry, ",e.jsx("i",{children:"POP"})," is Back/Forward."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hash / Anchor:"})," the ",e.jsx(o.InlineCode,{children:"#id"})," part of a URL that targets an element by its ",e.jsx(o.InlineCode,{children:"id"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Layout shift:"})," content movement after render (e.g., images loading), which can offset scroll positions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scrollable container:"})," any element with overflow that scrolls (not just ",e.jsx(o.InlineCode,{children:"window"}),")."]})]})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Quick Win: Scroll to Top on Route Change"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:["Use this when you want every ",e.jsx("i",{children:"new"})," route to start at the top."]}),e.jsxs("li",{children:["It should ",e.jsx("b",{children:"not"})," run on Back/Forward if you plan to restore position (see next section)."]})]}),e.jsx(o.Pre,{children:`// ScrollToTop.jsx — keep it simple and SSR-safe
import React from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"

  React.useEffect(() => {
    // Only force-top on PUSH/REPLACE (new navigations), not on POP (back/forward)
    if (navType === "PUSH" || navType === "REPLACE") {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    }
  }, [pathname, navType]);

  return null;
}`}),e.jsxs(o.Small,{children:["Mount ",e.jsx(o.InlineCode,{children:"<ScrollToTop />"})," once inside your router layout."]})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Restore on Back/Forward (remember positions)"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:["Save the scroll position per ",e.jsx("b",{children:"location.key"})," before leaving a page."]}),e.jsxs("li",{children:["On ",e.jsx("b",{children:"POP"})," (Back/Forward), restore that saved position."]}),e.jsxs("li",{children:["On ",e.jsx("b",{children:"PUSH/REPLACE"}),", usually start at the top (fresh page)."]})]}),e.jsx(o.Pre,{children:`// ScrollRestorer.jsx — window-level restoration
import React from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Map of location.key -> { x, y }
const positions = new Map();

export default function ScrollRestorer() {
  const location = useLocation();
  const navType = useNavigationType();

  // Save current position before route changes (on unmount)
  React.useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        positions.set(location.key, { x: window.scrollX, y: window.scrollY });
      }
    };
  }, [location]);

  // Restore after navigation
  React.useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    if (navType === "POP") {
      // Back/Forward — try to restore
      const pos = positions.get(location.key);
      if (pos) {
        window.scrollTo({ left: pos.x, top: pos.y, behavior: "auto" });
        return;
      }
    }
    // New page — start at top
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location, navType]);

  return null;
}`}),e.jsxs(o.Small,{children:["Use ",e.jsx(o.InlineCode,{children:"useLayoutEffect"})," to restore before paint, reducing flicker."]})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Restore a Scrollable Container (not the window)"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:["Some layouts scroll a ",e.jsx(o.InlineCode,{children:"<div>"})," instead of the window."]}),e.jsxs("li",{children:["Store and restore ",e.jsx(o.InlineCode,{children:"el.scrollTop"}),"/",e.jsx(o.InlineCode,{children:"el.scrollLeft"})," for that element."]})]}),e.jsx(o.Pre,{children:`// useScrollMemory.js — per-element restoration hook
import React from "react";

export function useScrollMemory(ref, key) {
  const store = React.useRef(new Map()); // key -> { left, top }

  // Save on unmount
  React.useEffect(() => {
    return () => {
      const el = ref.current;
      if (el) {
        store.current.set(key, { left: el.scrollLeft, top: el.scrollTop });
      }
    };
  }, [key, ref]);

  // Restore on mount
  React.useLayoutEffect(() => {
    const el = ref.current;
    const pos = store.current.get(key);
    if (el && pos) {
      el.scrollTo({ left: pos.left, top: pos.top, behavior: "auto" });
    }
  }, [key, ref]);
}`}),e.jsxs(o.Small,{children:["Call ",e.jsx(o.InlineCode,{children:"useScrollMemory"})," in the component that owns the scroll container."]})]}),e.jsxs(o.Section,{children:[e.jsxs(o.H2,{children:["Hash / Anchor Scroll (e.g., ",e.jsx("code",{children:"/guide#install"}),")"]}),e.jsxs(o.List,{children:[e.jsxs("li",{children:["When the URL has a ",e.jsx("b",{children:"hash"}),", scroll to the element with that ",e.jsx(o.InlineCode,{children:"id"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx(o.InlineCode,{children:"useEffect"})," on ",e.jsx("b",{children:"location.hash"}),". Handle missing targets gracefully."]})]}),e.jsx(o.Pre,{children:`// HashScroll.jsx — smooth scroll to anchors
import React from "react";
import { useLocation } from "react-router-dom";

export default function HashScroll() {
  const { hash } = useLocation();

  React.useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [hash]);

  return null;
}`})]}),e.jsxs(o.Section,{children:[e.jsxs(o.H2,{children:["Browser API: ",e.jsx("code",{children:"history.scrollRestoration"})]}),e.jsxs(o.List,{children:[e.jsxs("li",{children:[e.jsx(o.InlineCode,{children:"window.history.scrollRestoration"})," is a hint to the browser:",e.jsx(o.InlineCode,{children:'"auto"'})," (default) lets the browser try restoring on Back/Forward;",e.jsx(o.InlineCode,{children:'"manual"'})," tells it you’ll handle it."]}),e.jsx("li",{children:"In SPA routing, manual control is common for predictable behavior."})]}),e.jsx(o.Pre,{children:`// Usually set once at app start
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}`})]}),e.jsxs(o.Section,{children:[e.jsxs(o.H2,{children:["React Router ",e.jsx("code",{children:"<ScrollRestoration />"})," (Data Router)"]}),e.jsxs(o.List,{children:[e.jsxs("li",{children:["If you use ",e.jsx("b",{children:"Data Router"})," (e.g., ",e.jsx(o.InlineCode,{children:"createBrowserRouter"}),"), React Router offers a built-in ",e.jsx(o.InlineCode,{children:"<ScrollRestoration />"}),"."]}),e.jsx("li",{children:"It saves positions on navigation and restores on Back/Forward automatically."}),e.jsxs("li",{children:["If your app uses classic ",e.jsx(o.InlineCode,{children:"<BrowserRouter>"}),", use the custom patterns above."]})]}),e.jsx(o.Pre,{children:`// Example (Data Router only)
import { ScrollRestoration } from "react-router-dom";

function RootLayout() {
  return (
    <>
      {/* ...header / outlet... */}
      <ScrollRestoration />
    </>
  );
}`})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Patterns, Gotchas & Testing"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Images causing layout shift:"})," reserve space with width/height or aspect-ratio to avoid jumpy restores."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Virtualized lists:"})," ensure the same item heights on re-render or the restored position will feel off."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Modal routes:"})," if overlaying content, avoid auto-scrolling the page beneath."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Testing:"})," simulate navigation types; assert ",e.jsx(o.InlineCode,{children:"window.scrollY"})," or container ",e.jsx(o.InlineCode,{children:"scrollTop"}),"."]})]})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Do & Don’t"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," restore on Back/Forward; ",e.jsx("b",{children:"Do"})," start at top on fresh navigations."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer ",e.jsx(o.InlineCode,{children:"useLayoutEffect"})," for restoration to reduce flicker."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," fight the browser: set ",e.jsx(o.InlineCode,{children:'history.scrollRestoration = "manual"'})," only if you manage it yourself."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," forget inner scroll containers—restore them too if your layout uses them."]})]})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Glossary"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"POP navigation:"})," user presses Back/Forward (history stack moves)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"PUSH navigation:"})," app navigates to a new URL (history length increases)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"REPLACE navigation:"})," app replaces the current URL (history length same)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Anchor link:"})," URL with ",e.jsx(o.InlineCode,{children:"#section-id"})," that targets an element by id."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Flicker:"})," visible jump when scrolling happens after paint; minimized with ",e.jsx(o.InlineCode,{children:"useLayoutEffect"}),"."]})]})]}),e.jsxs(o.Callout,{children:["Summary: Start new pages at the top, restore positions on Back/Forward, handle hash anchors, and include inner scroll containers when needed. Choose manual patterns or the built-in",e.jsx("i",{children:" ScrollRestoration "})," (if you use Data Router)."]})]});export{s as default};
