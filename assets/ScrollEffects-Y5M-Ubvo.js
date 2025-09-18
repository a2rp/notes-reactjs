import{j as e}from"./index-BExKNf87.js";import{S as s}from"./styled-DkbIlqiw.js";const n=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Scroll Effects"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Scroll effects"})," are visual changes that depend on how far the user has scrolled (e.g., fade-in sections, parallax, sticky headers). Use them to guide attention without harming performance or accessibility."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Key Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Viewport:"})," the visible area of the page in the browser window."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scroll position (scrollY):"})," the number of pixels the document has been scrolled vertically."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Threshold:"})," a scroll point (or ratio) at which an effect should start/stop."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parallax:"})," a depth illusion where background layers move slower than foreground content."]}),e.jsxs("li",{children:[e.jsx("b",{children:"IntersectionObserver (IO):"})," a browser API that tells you when an element enters/leaves the viewport."]}),e.jsxs("li",{children:[e.jsx("b",{children:"requestAnimationFrame (rAF):"})," schedules code to run right before the next browser paint for smooth animation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Passive listener:"})," a scroll/touch listener that never calls ",e.jsx(s.InlineCode,{children:"preventDefault()"}),", allowing the browser to keep scrolling fluid (",e.jsx(s.InlineCode,{children:"{ passive: true }"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transform/Opacity properties:"})," GPU-friendly CSS properties (",e.jsx(s.InlineCode,{children:"transform"}),", ",e.jsx(s.InlineCode,{children:"opacity"}),") that animate without forcing layout."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"When to Use Scroll Effects"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Progressive reveal: bring sections in as the user reaches them."}),e.jsx("li",{children:"Context feedback: shrink or blur a header after scrolling past a hero section."}),e.jsx("li",{children:"Storytelling: parallax or pinned panels for long-form articles."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"CSS-Only Building Blocks"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Sticky header:"})," ",e.jsx(s.InlineCode,{children:"position: sticky; top: 0;"})," keeps an element pinned within its container."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scroll snapping:"})," ",e.jsx(s.InlineCode,{children:"scroll-snap-type"})," and ",e.jsx(s.InlineCode,{children:"scroll-snap-align"})," align sections on scroll."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reduced motion:"})," honor ",e.jsx(s.InlineCode,{children:"@media (prefers-reduced-motion: reduce)"})," to minimize motion for sensitive users."]})]}),e.jsx(s.Pre,{children:`/* Sticky header */
.header { position: sticky; top: 0; backdrop-filter: blur(6px); }

/* Scroll snapping sections */
.container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
.section { height: 100vh; scroll-snap-align: start; }

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-in { transition: none; animation: none; }
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Reveal on Scroll with IntersectionObserver"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"What:"})," IO notifies when an element enters the viewport, ideal for “fade-in as you see it.”"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," avoids running code every pixel of scroll; very efficient."]}),e.jsxs("li",{children:[e.jsx("b",{children:"How:"})," toggle a class when visibility crosses a threshold (e.g., 0.2 = 20% visible)."]})]}),e.jsx(s.Pre,{children:`// React example: toggle "in-view" class when a card enters the viewport
function Card({ children }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("in-view");
        else el.classList.remove("in-view");
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className="card animate-in">{children}</div>;
}

/* CSS: start hidden, fade & rise when .in-view is added */
.card.animate-in { transform: translateY(16px); opacity: 0; transition: transform .5s, opacity .5s; }
.card.animate-in.in-view { transform: translateY(0); opacity: 1; }`})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Scroll-Linked Transforms with ",e.jsx("code",{children:"requestAnimationFrame"})]}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Pattern:"})," read ",e.jsx(s.InlineCode,{children:"window.scrollY"})," (or section offset) and map it to a transform/opacity."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Performance:"})," update using rAF; animate only ",e.jsx(s.InlineCode,{children:"transform"})," or ",e.jsx(s.InlineCode,{children:"opacity"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Passive scroll listener:"})," ",e.jsx(s.InlineCode,{children:"window.addEventListener('scroll', onScroll, { passive: true })"}),"."]})]}),e.jsx(s.Pre,{children:`function ParallaxHero() {
  const ref = React.useRef(null);
  const tickingRef = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const offset = y * 0.3; // slower than scroll = parallax
        el.style.transform = \`translateY(\${-offset}px)\`;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={ref} className="hero-layer">Parallax Layer</div>;
}

/* Hint: for smoother transforms you can hint the GPU */
.hero-layer { will-change: transform; }`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Using Framer Motion (Optional)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"What:"})," a React animation library with hooks for scroll progress and easy springs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hook:"})," ",e.jsx(s.InlineCode,{children:"useScroll()"})," returns ",e.jsx(s.InlineCode,{children:"scrollYProgress"})," (0-1 based on a target)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Map:"})," ",e.jsx(s.InlineCode,{children:"useTransform()"})," maps progress to style values."]})]}),e.jsx(s.Pre,{children:`// import { motion, useScroll, useTransform } from "framer-motion";
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return <motion.div style={{ position: "fixed", top: 0, left: 0, height: 4, width, background: "#09f" }} />;
}`}),e.jsx(s.Small,{children:"You can keep the library as a future enhancement; the core ideas work with vanilla IO and rAF, too."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Accessibility & UX"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Reduced motion:"})," if ",e.jsx(s.InlineCode,{children:"prefers-reduced-motion: reduce"})," is set, minimize or disable animations."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus order:"})," ensure scroll effects don't trap focus or hide focused elements."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Meaning:"})," effects should support content understanding, not distract."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Performance Tips"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Animate ",e.jsx("b",{children:"transform"})," and ",e.jsx("b",{children:"opacity"}),"; avoid layout-triggering properties (top/left/width/height)."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"IntersectionObserver"})," for reveals; avoid heavy work on each scroll event."]}),e.jsxs("li",{children:["Batch DOM writes inside ",e.jsx("b",{children:"requestAnimationFrame"}),"."]}),e.jsxs("li",{children:["Add ",e.jsx(s.InlineCode,{children:"will-change: transform"})," only to elements that truly animate."]}),e.jsx("li",{children:"Unobserve / remove listeners when components unmount."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," start with CSS where possible (sticky, snap) before adding JS."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," gate animations behind IO thresholds for efficiency."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," run expensive calculations on every scroll tick."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," animate layout properties—use transforms instead."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Reflow/Layout:"})," browser recalculates element positions/sizes. Costly; avoid forcing it in scroll handlers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Paint:"})," browser fills pixels after layout. Animating transforms often skips expensive layout."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Jank:"})," stutter caused by frames missing the 16.7ms budget (at 60fps)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pinning:"})," keeping a section fixed (via sticky/positioning) while other content scrolls."]})]})]}),e.jsx(s.Callout,{children:"Summary: Pick the simplest tool that fits—CSS for structure (sticky/snap), IO for reveals, rAF for continuous transforms, and a library only if it adds real value. Animate transforms and opacity, respect reduced motion, and keep the main thread free of heavy work."})]});export{n as default};
