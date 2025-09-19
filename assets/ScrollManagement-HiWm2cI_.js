import{j as e}from"./index-DqLKwkYK.js";import{S as n}from"./styled-NpApT-CL.js";const s=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Scroll Management"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Scroll management"})," is the practice of reading, controlling, and restoring scroll positions in a way that’s smooth, accessible, and predictable. It involves knowing the difference between the ",e.jsx("b",{children:"document"})," scroll and an ",e.jsx("b",{children:"element"})," scroll container, handling route changes, locking background scroll for modals, and optimizing listeners."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Terminology & Anatomy"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Scroll container:"})," An element (or the document) whose content overflows and can be scrolled."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scrollport / viewport:"})," The visible area of a scroll container."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Document scrolling element:"})," Usually ",e.jsx(n.InlineCode,{children:"document.documentElement"})," (HTML); ",e.jsx(n.InlineCode,{children:"window.scrollY"})," reads the same vertical offset."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Key metrics:"})," ",e.jsx(n.InlineCode,{children:"scrollTop"}),", ",e.jsx(n.InlineCode,{children:"scrollLeft"}),", ",e.jsx(n.InlineCode,{children:"scrollHeight"}),", ",e.jsx(n.InlineCode,{children:"clientHeight"}),"."]})]}),e.jsx(n.Pre,{children:`// Window/document vs element scroll
const winY = window.scrollY; // or document.documentElement.scrollTop
const elY  = el.scrollTop;   // for a specific scrollable element`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Reading Scroll Positions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Window:"})," use ",e.jsx(n.InlineCode,{children:"window.scrollY"})," / ",e.jsx(n.InlineCode,{children:"scrollX"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Element:"})," use ",e.jsx(n.InlineCode,{children:"el.scrollTop"})," / ",e.jsx(n.InlineCode,{children:"scrollLeft"})," and size metrics."]}),e.jsxs("li",{children:[e.jsx("b",{children:"At bottom check:"})," ",e.jsx(n.InlineCode,{children:"el.scrollTop + el.clientHeight >= el.scrollHeight - tolerance"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Progress:"})," compute percentage scrolled for reading-progress bars."]})]}),e.jsx(n.Pre,{children:`function getScrollProgress() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const max = scrollHeight - clientHeight;
  return max > 0 ? Math.min(1, scrollTop / max) : 0;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Programmatic Scrolling"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Smooth scroll (window):"})," ",e.jsxs(n.InlineCode,{children:["window.scrollTo(",'{ top, left, behavior: "smooth" }',")"]}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Element scroll:"})," ",e.jsx(n.InlineCode,{children:"el.scrollTo()"}),", ",e.jsx(n.InlineCode,{children:"el.scrollBy()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Into view:"})," ",e.jsxs(n.InlineCode,{children:["el.scrollIntoView(",'{ block: "start", inline: "nearest", behavior: "smooth" }',")"]}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hash/anchors:"})," give targets an ",e.jsx(n.InlineCode,{children:"id"})," and scroll to them on route change."]})]}),e.jsx(n.Pre,{children:`// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Scroll a container
function scrollContainerTo(el, y) {
  el?.scrollTo({ top: y, behavior: "smooth" });
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Efficient Scroll Listeners"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Avoid heavy work on every event:"})," throttle via ",e.jsx(n.InlineCode,{children:"requestAnimationFrame"})," or a light throttle."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Passive listeners:"})," for native ",e.jsx(n.InlineCode,{children:'addEventListener("scroll", ...)'})," on window/element, use ",e.jsx(n.InlineCode,{children:"{ passive: true }"})," when you won’t call ",e.jsx(n.InlineCode,{children:"preventDefault()"}),"."]})]}),e.jsx(n.Pre,{children:`// rAF-based scroll handler (window)
React.useEffect(() => {
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        // read scrollY and update state just once per frame
        // setProgress(getScrollProgress());
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Infinite Scroll with IntersectionObserver"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Place a ",e.jsx("b",{children:"sentinel"})," div at the end of the list; when it becomes visible, load more."]}),e.jsxs("li",{children:["IO runs off the main thread and is more efficient than manual ",e.jsx("i",{children:"at-bottom"})," checks."]})]}),e.jsx(n.Pre,{children:`function useInfiniteScroll(ref, onReachEnd) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(entries => {
      if (entries.some(en => en.isIntersecting)) onReachEnd();
    }, { root: null, rootMargin: "0px", threshold: 0.1 });

    io.observe(el);
    return () => io.disconnect();
  }, [ref, onReachEnd]);
}

// Usage:
// const endRef = React.useRef(null);
// useInfiniteScroll(endRef, () => fetchMore());`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Locking Background Scroll (Modals/Drawers)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["When a modal opens, prevent page scroll and ",e.jsx("b",{children:"preserve layout"})," (avoid content shift due to scrollbar removal)."]}),e.jsx("li",{children:"Save the current scroll position; restore it when unlocking."})]}),e.jsx(n.Pre,{children:`function lockBodyScroll() {
  const { body, documentElement: html } = document;
  const scrollBarWidth = window.innerWidth - html.clientWidth;
  const top = -window.scrollY;
  body.style.position = "fixed";
  body.style.top = \`\${top}px\`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.overflow = "hidden";
  if (scrollBarWidth > 0) body.style.paddingRight = \`\${scrollBarWidth}px\`;
  return () => {
    const y = Math.abs(parseInt(body.style.top || "0", 10));
    body.removeAttribute("style");
    window.scrollTo({ top: y, behavior: "auto" });
  };
}`}),e.jsxs(n.Small,{children:["Alternative: apply ",e.jsx(n.InlineCode,{children:"overflow: hidden"})," to ",e.jsx("i",{children:"html"})," and ",e.jsx("i",{children:"body"}),", adding right padding equal to scrollbar width."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Restoring Scroll on Route Change"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["On ",e.jsx("b",{children:"forward nav"}),", ",e.jsx("i",{children:"scroll to top"})," (content-first reading)."]}),e.jsxs("li",{children:["On ",e.jsx("b",{children:"back/forward"})," (history navigation), ",e.jsx("i",{children:"restore the previous position"}),"."]}),e.jsx("li",{children:"Store positions per pathname (and optional hash) in a map."})]}),e.jsx(n.Pre,{children:`// Pseudo-hook for scroll restoration (React Router v6)
import { useLocation, useNavigationType } from "react-router-dom";

function useScrollRestoration() {
  const positions = React.useRef(new Map());
  const { pathname, hash } = useLocation();
  const navType = useNavigationType(); // POP = back/forward

  // Save position before unmount
  React.useEffect(() => {
    return () => {
      positions.current.set(pathname + hash, window.scrollY);
    };
  }, [pathname, hash]);

  // Restore or reset after nav
  React.useEffect(() => {
    const key = pathname + hash;
    const y = navType === "POP" ? positions.current.get(key) ?? 0 : 0;

    if (hash) {
      // If there's a hash, try to scroll to the target id
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    }
    window.scrollTo({ top: y, behavior: "auto" });
  }, [pathname, hash, navType]);
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"CSS Helpers: Sticky, Snap, Overscroll"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Sticky headers:"})," ",e.jsx(n.InlineCode,{children:"position: sticky; top: 0;"})," keeps bars visible while scrolling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scroll snap:"})," create carousels/timelines with ",e.jsx(n.InlineCode,{children:"scroll-snap-type"})," + ",e.jsx(n.InlineCode,{children:"scroll-snap-align"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Overscroll:"})," control boundary effects with ",e.jsx(n.InlineCode,{children:"overscroll-behavior"})," (e.g., prevent scroll chaining)."]})]}),e.jsx(n.Pre,{children:`/* Sticky header */
.header { position: sticky; top: 0; }

/* Horizontal snap carousel */
.scroller { overflow-x: auto; scroll-snap-type: x mandatory; }
.slide   { scroll-snap-align: start; }

/* Prevent parent scroll chaining (useful for modals/sheets) */
.modal { overscroll-behavior: contain; }`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility & UX"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Prefer focus-first:"})," when navigating to a new page/section, move focus to the main heading and then(optional) scroll."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Skip links:"})," provide ",e.jsx(n.InlineCode,{children:'<a href="#main">Skip to content</a>'})," and ensure ",e.jsx(n.InlineCode,{children:"#main"})," exists."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Respect reduced motion:"})," turn off smooth animations for users with ",e.jsx(n.InlineCode,{children:"prefers-reduced-motion"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Announce dynamic loads:"})," when infinite-loading, provide live region updates (e.g., “Loaded 20 more items”)."]})]}),e.jsx(n.Pre,{children:`/* Turn off smooth scroll for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," throttle or rAF-wrap scroll handlers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use IntersectionObserver for infinite lists when possible."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," restore scroll on history navigation and jump to anchors on hash."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," attach many per-item listeners—delegate when feasible."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," block scroll without restoring the original position on unlock."]})]})]}),e.jsx(n.Callout,{children:"Summary: Treat scrolling as state—read it efficiently, change it deliberately, restore it on navigation, and keep it accessible. Prefer sticky/snap/overscroll CSS where possible and IO for performant infinite loading."})]});export{s as default};
