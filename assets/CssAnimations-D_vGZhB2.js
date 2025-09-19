import{j as e}from"./index-CAccbg1x.js";import{S as n}from"./styled-C1dyAdz9.js";const r=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"CSS Animations"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"CSS Animations"})," let you animate properties over time using named ",e.jsx("b",{children:"@keyframes"}),". Unlike transitions (which react to a change), animations can ",e.jsx("i",{children:"run by themselves"}),",",e.jsx("i",{children:"loop"}),", and ",e.jsx("i",{children:"sequence"})," multiple stages."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Definition & Purpose"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"@keyframes:"})," a timeline that defines how properties change at specific percentages (from 0% to 100%)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Animation:"})," applying a keyframes timeline to an element with control over ",e.jsx(n.InlineCode,{children:"duration"}),", ",e.jsx(n.InlineCode,{children:"timing-function"}),", ",e.jsx(n.InlineCode,{children:"delay"}),", ",e.jsx(n.InlineCode,{children:"iteration-count"}),", ",e.jsx(n.InlineCode,{children:"direction"}),", ",e.jsx(n.InlineCode,{children:"fill-mode"}),", and ",e.jsx(n.InlineCode,{children:"play-state"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"When to use:"})," looping effects, attention cues, complex multi-stage changes, or when no JS is needed."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Animations vs. Transitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Transition:"})," runs ",e.jsx("i",{children:"only when a property changes"})," (e.g., on hover). No inherent loop or multi-step timeline."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Animation:"})," runs ",e.jsx("i",{children:"automatically"})," (optionally loops), supports multi-step timelines via ",e.jsx(n.InlineCode,{children:"@keyframes"}),"."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Minimal Example"}),e.jsx(n.Pre,{children:`/* 1) Define keyframes */
@keyframes pop {
  0%   { transform: scale(1);   opacity: 0.6; }
  50%  { transform: scale(1.15); opacity: 1;   }
  100% { transform: scale(1);   opacity: 0.9; }
}

/* 2) Apply animation */
.badge {
  animation-name: pop;
  animation-duration: 600ms;
  animation-timing-function: ease-out;
  animation-iteration-count: 1;
  animation-fill-mode: both; /* keep end-state briefly visible */
}`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"@keyframes"})," defines stages; the element uses ",e.jsx("b",{children:"animation-*"})," properties to run them."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Core Properties (Glossary)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"animation-name:"})," which ",e.jsx(n.InlineCode,{children:"@keyframes"})," to use."]}),e.jsxs("li",{children:[e.jsx("b",{children:"animation-duration:"})," total time for one cycle (e.g., ",e.jsx(n.InlineCode,{children:"500ms"}),", ",e.jsx(n.InlineCode,{children:"2s"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"animation-timing-function:"})," speed curve over time (",e.jsx(n.InlineCode,{children:"ease"}),", ",e.jsx(n.InlineCode,{children:"linear"}),", ",e.jsx(n.InlineCode,{children:"ease-in"}),", ",e.jsx(n.InlineCode,{children:"ease-out"}),", ",e.jsx(n.InlineCode,{children:"ease-in-out"}),", ",e.jsx(n.InlineCode,{children:"cubic-bezier()"}),", ",e.jsx(n.InlineCode,{children:"steps()"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"animation-delay:"})," wait time before the first cycle starts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"animation-iteration-count:"})," number of repeats or ",e.jsx(n.InlineCode,{children:"infinite"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"animation-direction:"})," ",e.jsx(n.InlineCode,{children:"normal"}),", ",e.jsx(n.InlineCode,{children:"reverse"}),", ",e.jsx(n.InlineCode,{children:"alternate"}),", ",e.jsx(n.InlineCode,{children:"alternate-reverse"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"animation-fill-mode:"})," how styles apply ",e.jsx("i",{children:"before"}),"/",e.jsx("i",{children:"after"})," the run (",e.jsx(n.InlineCode,{children:"none"}),", ",e.jsx(n.InlineCode,{children:"forwards"}),", ",e.jsx(n.InlineCode,{children:"backwards"}),", ",e.jsx(n.InlineCode,{children:"both"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"animation-play-state:"})," ",e.jsx(n.InlineCode,{children:"running"})," or ",e.jsx(n.InlineCode,{children:"paused"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"animation (shorthand):"})," combines the above. ",e.jsx("u",{children:"Tip:"})," the ",e.jsx("i",{children:"first"})," time value is duration, the ",e.jsx("i",{children:"second"})," time value is delay; the rest can be in any order."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Shorthand & Multiple Animations"}),e.jsx(n.Pre,{children:`@keyframes float   { from { transform: translateY(0) } to { transform: translateY(-10px) } }
@keyframes shimmer { 0% { opacity: 0.5 } 50% { opacity: 1 } 100% { opacity: 0.5 } }

/* Shorthand: duration timing delay count direction fill timing can be mixed
   (only rule: first time = duration, second time = delay) */
.card {
  animation: float 2s ease-in-out infinite alternate,
             shimmer 1.5s linear 0.25s infinite both;
}`})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Keyframe Staging & ",e.jsx("code",{children:"steps()"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Keyframe staging:"})," use percentages (e.g., 0%, 30%, 60%, 100%) or ",e.jsx(n.InlineCode,{children:"from"}),"/",e.jsx(n.InlineCode,{children:"to"})," (aliases for 0%/100%)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"steps(n, jump-*)"}),": creates discrete steps (useful for sprite sheets/typewriter effects)."]})]}),e.jsx(n.Pre,{children:`@keyframes type {
  from { width: 0ch; }
  to   { width: 24ch; }
}
.typing {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid currentColor;
  animation: type 3s steps(24, end) 0s 1 both;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Using CSS Animations in React"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Toggle with class:"})," add/remove a class to start/stop an animation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Restart an animation:"})," remove the class, force reflow (read ",e.jsx(n.InlineCode,{children:"offsetWidth"}),"), then re-add class; or change a unique ",e.jsx(n.InlineCode,{children:"key"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Listen to events:"})," React exposes ",e.jsx(n.InlineCode,{children:"onAnimationStart"}),", ",e.jsx(n.InlineCode,{children:"onAnimationIteration"}),", ",e.jsx(n.InlineCode,{children:"onAnimationEnd"}),"."]})]}),e.jsx(n.Pre,{children:`function SaveButton() {
  const [run, setRun] = React.useState(false);
  return (
    <button
      className={run ? "pulse" : ""}
      onClick={() => setRun(r => !r)}
      onAnimationEnd={() => setRun(false)}
    >
      Save
    </button>
  );
}

// CSS
@keyframes pulse { from { transform: scale(1) } 50% { transform: scale(1.06) } to { transform: scale(1) } }
.pulse { animation: pulse 400ms ease-out 1 both; }`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Performance Basics"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Animate transforms & opacity:"})," these can be GPU-accelerated and avoid layout thrash."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid layout properties:"})," animating ",e.jsx(n.InlineCode,{children:"width/height/top/left"})," forces layout and paint → jank."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use"})," ",e.jsx(n.InlineCode,{children:"will-change: transform, opacity;"})," sparingly to hint the browser (remove it when idle)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keep durations short:"})," 150-400ms for micro-interactions; longer only for meaningful transitions."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility: prefers-reduced-motion"}),e.jsx(n.Pre,{children:`/* Respect users who prefer less motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
}`}),e.jsx(n.Small,{children:"Provide alternatives or soften animations for motion-sensitive users."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," animate ",e.jsx(n.InlineCode,{children:"transform"})," and ",e.jsx(n.InlineCode,{children:"opacity"})," for smoothness."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," name keyframes clearly and keep timelines simple."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," listen for ",e.jsx(n.InlineCode,{children:"onAnimationEnd"})," when chaining UI state changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," animate layout properties unless necessary."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," ignore users' ",e.jsx(n.InlineCode,{children:"prefers-reduced-motion"})," setting."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Quick Reference"}),e.jsx(n.Pre,{children:`/* Keyframes */
@keyframes name { 0% { /* ... */ } 100% { /* ... */ } }

/* Apply (longhand) */
.el {
  animation-name: name;
  animation-duration: 500ms;              /* first time value in shorthand */
  animation-delay: 0s;                    /* second time value in shorthand */
  animation-timing-function: ease-out;
  animation-iteration-count: 1;           /* or 'infinite' */
  animation-direction: normal;            /* reverse | alternate | alternate-reverse */
  animation-fill-mode: none;              /* forwards | backwards | both */
  animation-play-state: running;          /* or 'paused' */
}

/* Apply (shorthand, multiple) */
.el { animation: name 500ms ease-out 0s 1 normal both; }   /* +, another  ... */`})]}),e.jsxs(n.Callout,{children:["Summary: Define motion with ",e.jsx("b",{children:"@keyframes"}),", apply via ",e.jsx("b",{children:"animation"})," properties, animate ",e.jsx("b",{children:"transform/opacity"})," for performance, respect ",e.jsx("b",{children:"reduced motion"}),", and prefer concise, purpose-driven effects that serve UX."]})]});export{r as default};
