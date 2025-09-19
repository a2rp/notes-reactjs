import{j as e}from"./index-t22nWg0v.js";import{S as n}from"./styled-fXjr1UBq.js";const r=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Lint Rules"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Lint rules"})," are automatic checks that scan your code for mistakes, risky patterns, and style inconsistencies—before bugs reach production. A ",e.jsx("b",{children:"linter"})," (like ESLint) reads your files and reports ",e.jsx("i",{children:"problems"})," (errors/warnings) using a set of ",e.jsx("b",{children:"rules"}),". Good rules act like seatbelts: you barely notice them, but they save you when it matters."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"What are lint rules? Why use them?"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Rule:"})," a single check (e.g., ",e.jsx(n.InlineCode,{children:"no-unused-vars"}),") that the linter applies to every file. It can be configured as ",e.jsx("i",{children:"off"}),", ",e.jsx("i",{children:"warn"}),", or ",e.jsx("i",{children:"error"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Preset / Config:"})," a curated bundle of rules (e.g.,"," ",e.jsx(n.InlineCode,{children:"eslint:recommended"})," or"," ",e.jsx(n.InlineCode,{children:"plugin:react/recommended"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Plugin:"})," an add-on that introduces new rules (e.g.,"," ",e.jsx(n.InlineCode,{children:"eslint-plugin-react"}),","," ",e.jsx(n.InlineCode,{children:"eslint-plugin-jsx-a11y"}),","," ",e.jsx(n.InlineCode,{children:"eslint-plugin-react-hooks"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," catch bugs early, keep code consistent across teammates, improve readability, and reduce code review nitpicks (style is automated)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Rule categories you'll use in React projects"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Possible Errors:"})," rules that prevent bugs in logic (e.g.,"," ",e.jsx(n.InlineCode,{children:"eqeqeq"}),","," ",e.jsx(n.InlineCode,{children:"no-undef"}),","," ",e.jsx(n.InlineCode,{children:"no-console"})," in production)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Best Practices:"})," rules that steer you to safer patterns (e.g.,"," ",e.jsx(n.InlineCode,{children:"curly"}),","," ",e.jsx(n.InlineCode,{children:"no-param-reassign"}),","," ",e.jsx(n.InlineCode,{children:"no-implicit-coercion"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stylistic:"})," spacing, quotes, semicolons—usually delegated to ",e.jsx("b",{children:"Prettier"}),", while ESLint focuses on correctness."]}),e.jsxs("li",{children:[e.jsx("b",{children:"React:"})," component/JSX rules (e.g.,"," ",e.jsx(n.InlineCode,{children:"react/jsx-key"}),","," ",e.jsx(n.InlineCode,{children:"react/no-array-index-key"}),","," ",e.jsx(n.InlineCode,{children:"react/jsx-no-target-blank"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"React Hooks:"})," enforce the ",e.jsx("b",{children:"Rules of Hooks"})," (e.g.,"," ",e.jsx(n.InlineCode,{children:"react-hooks/rules-of-hooks"})," and"," ",e.jsx(n.InlineCode,{children:"react-hooks/exhaustive-deps"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Accessibility (a11y):"})," assistive-tech friendly UI (e.g.,"," ",e.jsx(n.InlineCode,{children:"jsx-a11y/alt-text"}),","," ",e.jsx(n.InlineCode,{children:"jsx-a11y/label-has-associated-control"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Imports / Module hygiene:"})," dead code, order, duplicates (e.g.,"," ",e.jsx(n.InlineCode,{children:"import/no-unresolved"}),","," ",e.jsx(n.InlineCode,{children:"import/order"}),")."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Minimal React ESLint + Prettier setup"}),e.jsxs(n.Small,{children:["Idea: let ",e.jsx("b",{children:"Prettier"})," handle formatting; let ",e.jsx("b",{children:"ESLint"})," handle correctness and React-specific rules. The config below disables any ESLint rules that conflict with Prettier."]}),e.jsx(n.Pre,{children:`// .eslintrc.cjs (example)
module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    // Keep this last to disable conflicting styling rules:
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true }
  },
  settings: {
    react: { version: "detect" }
  },
  rules: {
    // Common practical tweaks:
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "eqeqeq": ["error", "always"],   // use === / !==
    "curly": ["error", "all"],       // always use braces
    "no-implicit-coercion": "warn",

    // React specifics:
    "react/jsx-key": "error",
    "react/jsx-no-target-blank": ["error", { allowReferrer: true, enforceDynamicLinks: "always" }],
  }
};`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Note:"})," Prefer ",e.jsx(n.InlineCode,{children:"plugin:prettier/recommended"})," (which turns on"," ",e.jsx(n.InlineCode,{children:"eslint-config-prettier"}),") over"," ",e.jsx(n.InlineCode,{children:"eslint-plugin-prettier"})," in most setups—simpler and faster."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Must-know hooks rules"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"react-hooks/rules-of-hooks:"})," Only call hooks at the top level of React functions; never in loops, conditions, or nested functions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"react-hooks/exhaustive-deps:"})," Verify effect dependency arrays so your effect runs when its inputs change—avoids stale values and infinite loops."]})]}),e.jsx(n.Pre,{children:`// BAD: conditional hook call
function Example({ enabled }) {
  if (enabled) {
    React.useEffect(() => {
      console.log("runs only when enabled? This breaks the Rules of Hooks.");
    }, []);
  }
  return null;
}

// GOOD: call hook unconditionally, branch inside
function Example({ enabled }) {
  React.useEffect(() => {
    if (!enabled) return;
    console.log("safe");
  }, [enabled]);
  return null;
}`}),e.jsx(n.Pre,{children:`// Exhaustive deps: include everything used inside the effect that comes from outside
function Search({ query, onResult }) {
  React.useEffect(() => {
    let alive = true;
    fetch("/api?q=" + encodeURIComponent(query))
      .then(r => r.json())
      .then(data => { if (alive) onResult(data); });
    return () => { alive = false; };
  }, [query, onResult]); // include both query and onResult
  return null;
}`}),e.jsxs(n.Small,{children:["If you intentionally omit deps, comment why. Better: stabilize callbacks with"," ",e.jsx(n.InlineCode,{children:"useCallback"})," when identity matters."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common React/JSX rules"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"react/jsx-key:"})," Every list child needs a ",e.jsx(n.InlineCode,{children:"key"})," for stable identity."]}),e.jsxs("li",{children:[e.jsx("b",{children:"react/no-array-index-key:"})," Avoid using the array index as key when list order can change—it breaks state retention."]}),e.jsxs("li",{children:[e.jsx("b",{children:"react/jsx-no-target-blank:"})," When using ",e.jsx(n.InlineCode,{children:'target="_blank"'}),", add"," ",e.jsx(n.InlineCode,{children:'rel="noopener noreferrer"'})," for security."]})]}),e.jsx(n.Pre,{children:`// OK
{items.map((todo) => (
  <li key={todo.id}>{todo.title}</li>
))}

// RISKY (index key) — reordering can cause weird UI bugs
{items.map((todo, i) => (
  <li key={i}>{todo.title}</li>
))}

// Links — safe external link
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Docs</a>`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility rules (jsx-a11y) you should keep"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"jsx-a11y/alt-text:"})," Images need meaningful ",e.jsx(n.InlineCode,{children:"alt"})," text (or empty ",e.jsx(n.InlineCode,{children:'alt=""'})," if purely decorative)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"jsx-a11y/label-has-associated-control:"})," Form inputs must be associated with labels."]}),e.jsxs("li",{children:[e.jsx("b",{children:"jsx-a11y/click-events-have-key-events:"})," If an element is clickable (non-button), ensure it's keyboard operable too."]})]}),e.jsx(n.Pre,{children:`// Good: labeled input
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Good: image with alt text
<img src="/logo.png" alt="Company logo" />

// If you must use a non-button clickable element:
<div
  role="button"
  tabIndex={0}
  onClick={onOpen}
  onKeyDown={(e) => e.key === "Enter" && onOpen()}
/>`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"General JS rules that quietly save hours"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"no-unused-vars:"})," remove dead variables—signals incomplete refactors or typos."]}),e.jsxs("li",{children:[e.jsx("b",{children:"no-undef:"})," prevents references to variables that don't exist."]}),e.jsxs("li",{children:[e.jsx("b",{children:"eqeqeq:"})," use strict equality ",e.jsx(n.InlineCode,{children:"==="})," to avoid coercion traps."]}),e.jsxs("li",{children:[e.jsx("b",{children:"curly:"})," always use braces around blocks—keeps diffs/bugs small."]}),e.jsxs("li",{children:[e.jsx("b",{children:"import/order:"})," consistent, readable import grouping."]})]}),e.jsx(n.Pre,{children:`// no-unused-vars
function greet(name) {
  // 'unused' will trigger a warning
  const unused = 123;
  return "Hello " + name;
}

// eqeqeq
if (count === 0) { /* ... */ } // strict check — good

// curly
if (ok) { doThing(); } else { doOther(); }

// import/order (groups: builtin, external, internal)
import fs from "node:fs";
import React from "react";
import MyWidget from "@/components/MyWidget";`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep rules actionable—too many warnings become noise."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," let Prettier handle formatting; keep ESLint for correctness and React specifics."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," fix warnings regularly; don't let them pile up."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," disable a rule globally just to fix one file—prefer local ",e.jsx(n.InlineCode,{children:"// eslint-disable-next-line"})," with a reason."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," ignore hooks rules—most “random” bugs come from incorrect effects or stale closures."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Linter:"})," a tool that analyzes code to find problems automatically."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rule:"})," a single check that reports an error/warning when violated."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Plugin:"})," an add-on that provides rules for a specific ecosystem (React, a11y)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Preset (extends):"})," a bundle of recommended rules you can apply at once."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Formatter:"})," a tool (Prettier) that rewrites code style automatically—spacing, quotes, etc."]})]})]}),e.jsx(n.Callout,{children:"Summary: keep ESLint focused on correctness and React rules; let Prettier format. Enforce hooks and accessibility rules, add a few high-impact JS rules, and you'll prevent the most common bugs—without slowing anyone down."})]});export{r as default};
