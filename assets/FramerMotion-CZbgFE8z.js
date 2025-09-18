import{j as e}from"./index-BExKNf87.js";import{S as i}from"./styled-DkbIlqiw.js";const r=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Framer Motion"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"Framer Motion"})," is a React animation library that provides ",e.jsx("b",{children:"motion components"}),", declarative ",e.jsx("b",{children:"props"})," for animation (",e.jsx(i.InlineCode,{children:"initial"}),", ",e.jsx(i.InlineCode,{children:"animate"}),", ",e.jsx(i.InlineCode,{children:"exit"}),"), reusable ",e.jsx("b",{children:"variants"}),", physics-based ",e.jsx("b",{children:"springs"}),", timeline-style ",e.jsx("b",{children:"tweens"}),", and utilities for",e.jsx("b",{children:" gestures"}),", ",e.jsx("b",{children:"layout animations"}),", and ",e.jsx("b",{children:"scroll-linked effects"}),"."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core Concepts (Definitions)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Motion component:"})," a wrapped HTML/SVG element (e.g., ",e.jsx(i.InlineCode,{children:"motion.div"}),") with animation props."]}),e.jsxs("li",{children:[e.jsx("b",{children:"initial:"})," the starting visual state before the first render animation begins."]}),e.jsxs("li",{children:[e.jsx("b",{children:"animate:"})," the target visual state to animate to. Can be an object, variant name, or keyframes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"exit:"})," the state to animate to when the component leaves the tree (requires ",e.jsx(i.InlineCode,{children:"AnimatePresence"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"transition:"})," how the animation runs (type, duration, easing or spring parameters)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"variants:"})," a named map of states (e.g., ",e.jsx(i.InlineCode,{children:"hidden"}),", ",e.jsx(i.InlineCode,{children:"show"}),") that parent/children can share and coordinate."]}),e.jsxs("li",{children:[e.jsx("b",{children:"gesture props:"})," transient states like ",e.jsx(i.InlineCode,{children:"whileHover"}),", ",e.jsx(i.InlineCode,{children:"whileTap"}),", ",e.jsx(i.InlineCode,{children:"drag"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"layout / layoutId:"})," automatic layout-aware animations and shared-element transitions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useScroll / useTransform:"})," hooks for scroll progress and mapping motion values."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Quick Start Example"}),e.jsx(i.Pre,{children:`import { motion } from "framer-motion";

export default function Hello() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    >
      Hello, Motion!
    </motion.div>
  );
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Tip:"})," Prefer animating ",e.jsx(i.InlineCode,{children:"transform"})," and ",e.jsx(i.InlineCode,{children:"opacity"})," for smoother, GPU-accelerated results."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Variants (Coordinated Animations)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," cleanly reuse states, coordinate parent/child timing (",e.jsx(i.InlineCode,{children:"staggerChildren"}),", ",e.jsx(i.InlineCode,{children:"delayChildren"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"How:"})," put named states in an object; on parent set ",e.jsx(i.InlineCode,{children:"initial"}),"/",e.jsx(i.InlineCode,{children:"animate"})," to variant names; children reference the same keys."]})]}),e.jsx(i.Pre,{children:`import { motion } from "framer-motion";

const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};
const item = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0 }
};

function StaggeredList({ items }) {
  return (
    <motion.ul variants={list} initial="hidden" animate="show">
      {items.map((txt) => (
        <motion.li key={txt} variants={item}>{txt}</motion.li>
      ))}
    </motion.ul>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Gestures: Hover, Tap, Drag"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"whileHover / whileTap:"})," temporary states while hovering/pressing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"drag:"})," make elements draggable; constrain with ",e.jsx(i.InlineCode,{children:"dragConstraints"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Elasticity:"})," control feel with ",e.jsx(i.InlineCode,{children:"dragElastic"})," (0–1)."]})]}),e.jsx(i.Pre,{children:`import { motion } from "framer-motion";

function DraggableCard() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -80, right: 80, top: -40, bottom: 40 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ width: 160, height: 100, borderRadius: 12 }}
    />
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"AnimatePresence (Mount/Unmount Animations)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"What:"})," a wrapper enabling ",e.jsx("b",{children:"exit"})," animations when components are removed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"When:"})," modals, toasts, dropdowns, route transitions, conditional UI."]})]}),e.jsx(i.Pre,{children:`import { AnimatePresence, motion } from "framer-motion";

function Modal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="backdrop"
          onClick={onClose}
        >
          <motion.section
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            Modal content
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Note:"})," Exit animations run only inside ",e.jsx(i.InlineCode,{children:"<AnimatePresence />"}),"."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Layout Animations"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"layout:"})," smoothly animates between size/position changes caused by React layout updates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"layoutId:"})," creates shared-element transitions between two components with the same id."]})]}),e.jsx(i.Pre,{children:`import { motion } from "framer-motion";

function Expandable({ open }) {
  return (
    <motion.div layout style={{ borderRadius: 12 }}>
      {open && <motion.div layout style={{ height: 120 }} />}
    </motion.div>
  );
}

// Shared element example:
// <motion.img layoutId="avatar" .../>  // on page A
// <motion.img layoutId="avatar" .../>  // on page B
// Transition between A↔B animates the shared element.
`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Scroll-Linked Effects"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"useScroll:"})," returns a ",e.jsx("b",{children:"motion value"})," that tracks page or element scroll progress (0 → 1)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useTransform:"})," maps one motion value into another range (e.g., progress → scale/opacity)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"whileInView / viewport:"})," trigger animations as elements enter the viewport."]})]}),e.jsx(i.Pre,{children:`import { motion, useScroll, useTransform } from "framer-motion";

function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return <motion.div style={{ position: "fixed", top: 0, left: 0, height: 4, width }} />;
}

function FadeInSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      Content
    </motion.div>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Transitions: Tween & Spring (Definitions)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Tween:"})," time-based animation. Key options: ",e.jsx(i.InlineCode,{children:"duration"}),",",e.jsx(i.InlineCode,{children:"delay"}),", ",e.jsx(i.InlineCode,{children:"repeat"}),", ",e.jsx(i.InlineCode,{children:"ease"})," (e.g., ",e.jsx(i.InlineCode,{children:'"easeInOut"'})," or cubic-bezier)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Spring:"})," physics-based animation. Key options: ",e.jsx(i.InlineCode,{children:"stiffness"})," (restoring force),",e.jsx(i.InlineCode,{children:"damping"})," (friction), ",e.jsx(i.InlineCode,{children:"mass"})," (inertia),",e.jsx(i.InlineCode,{children:"bounce"})," (overshoot), ",e.jsx(i.InlineCode,{children:"velocity"})," (initial speed)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keyframes:"})," set an array of values in ",e.jsx(i.InlineCode,{children:"animate"})," to play a sequence."]})]}),e.jsx(i.Pre,{children:`<motion.div
  animate={{ x: [0, 20, -10, 0] }}
  transition={{ duration: 0.6, times: [0, 0.5, 0.8, 1], ease: "easeInOut" }}
/>

<motion.div
  animate={{ scale: 1 }}
  initial={{ scale: 0.8 }}
  transition={{ type: "spring", stiffness: 300, damping: 22 }}
/>`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Accessibility & Performance"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Reduced motion:"})," respect user preference. Avoid large parallax/auto-moving effects when ",e.jsx(i.InlineCode,{children:"prefers-reduced-motion"})," is set."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Properties:"})," animate ",e.jsx(i.InlineCode,{children:"transform"})," and ",e.jsx(i.InlineCode,{children:"opacity"})," for best performance; avoid ",e.jsx(i.InlineCode,{children:"width/height/top/left"})," where possible."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Conflicts:"})," do not animate the same property with CSS transitions and Framer Motion simultaneously."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mount cost:"})," keep ",e.jsx(i.InlineCode,{children:"AnimatePresence"})," groups small; unmount what you don't need."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," centralize timings/variants for consistency across your app."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(i.InlineCode,{children:"whileInView"})," for one-off reveal animations on long pages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer ",e.jsx(i.InlineCode,{children:"layout"})," for size/position changes from state updates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," over-animate; keep motion purposeful and subtle."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," forget exit states—UI should feel complete when elements leave."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Motion value:"})," a reactive, subscribable value used by Framer Motion (e.g., ",e.jsx(i.InlineCode,{children:"scrollYProgress"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Easing:"})," the curve that maps time → progress (linear, easeInOut, cubic-bezier)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stagger:"})," offsetting child animations over time for a cascade effect."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shared element:"})," a visual element that appears to move seamlessly between screens (via ",e.jsx(i.InlineCode,{children:"layoutId"}),")."]})]})]}),e.jsxs(i.Callout,{children:["Summary: Start with ",e.jsx(i.InlineCode,{children:"motion.div"}),", use ",e.jsx("i",{children:"variants"})," for coordinated groups, add ",e.jsx("i",{children:"AnimatePresence"})," for exit states, leverage ",e.jsx("i",{children:"layout"})," for automatic size/position transitions, and use ",e.jsx("i",{children:"useScroll"})," & ",e.jsx("i",{children:"useTransform"})," for scroll-linked motion."]})]});export{r as default};
