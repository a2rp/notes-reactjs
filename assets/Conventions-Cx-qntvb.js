import{j as e}from"./index-DqLKwkYK.js";import{S as s}from"./styled-DnvSmQrW.js";const r=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Conventions"}),e.jsx(s.Lead,{children:"Conventions are the shared rules your team follows—how you name files, organize folders, write commits/PRs, version releases, and document changes. Good conventions reduce confusion, make reviews faster, and keep the codebase predictable for everyone."}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why Conventions Matter"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Consistency:"})," similar problems look similar across the repo, so you find things faster."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Speed:"})," less time bikeshedding in PRs, more time shipping features."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Onboarding:"})," new contributors understand the project layout and expectations quickly."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Directory & File Naming"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Kebab-case for routes and folders:"})," ",e.jsx(s.InlineCode,{children:"src/pages/docs"}),", ",e.jsx(s.InlineCode,{children:"src/pages/topics/dom-events"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"PascalCase for React components:"})," ",e.jsx(s.InlineCode,{children:"NavList.jsx"}),", ",e.jsx(s.InlineCode,{children:"ScrollToTop.jsx"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Styled module colocated:"})," ",e.jsx(s.InlineCode,{children:"ComponentName.styled.js"})," or a section-level ",e.jsx(s.InlineCode,{children:"styled.js"}),"."]})]}),e.jsx(s.Pre,{children:`// Example layout
src/
  components/
    Breadcrumbs.jsx
    Footer.jsx
  pages/
    topics/
      docs/
        Conventions.jsx
        styled.js
      dom-events/
        SyntheticEvents.jsx
        styled.js`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Imports & Module Boundaries"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Public vs private modules:"})," expose a minimal API from index files; keep helpers private."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Absolute imports (optional):"})," set ",e.jsx(s.InlineCode,{children:"vite.config.js"})," aliases (e.g., ",e.jsx(s.InlineCode,{children:"@/components"}),") to avoid ",e.jsx("em",{children:"../../../"})," chains."]})]}),e.jsx(s.Pre,{children:`// vite.config.js (alias example)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } }
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Code Style (Readable by Default)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Single responsibility:"})," one component does one job; extract sub-components when JSX grows noisy."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Naming:"})," prefer descriptive names (",e.jsx(s.InlineCode,{children:"useUserProfile"})," over ",e.jsx(s.InlineCode,{children:"useData"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Side effects:"})," keep effects explicit; document cleanup in a comment if non-obvious."]})]}),e.jsx(s.Pre,{children:`// Good: descriptive and focused
function PriceTag({ value, currency = "INR" }) {
  return <span aria-label="price">{currency} {value.toLocaleString()}</span>;
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Commit Messages (Conventional Commits)"}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Conventional Commits"})," is a simple standard for commit titles like",e.jsx(s.InlineCode,{children:"feat: add search box"}),". It makes changelogs and releases automatic."]}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Format:"})," ",e.jsx(s.InlineCode,{children:"<type>(<scope>): <short summary>"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Types:"})," ",e.jsx(s.InlineCode,{children:"feat"})," (new feature), ",e.jsx(s.InlineCode,{children:"fix"})," (bug fix), ",e.jsx(s.InlineCode,{children:"docs"}),", ",e.jsx(s.InlineCode,{children:"refactor"}),", ",e.jsx(s.InlineCode,{children:"test"}),", ",e.jsx(s.InlineCode,{children:"chore"}),", ",e.jsx(s.InlineCode,{children:"perf"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Breaking change:"})," add ",e.jsx(s.InlineCode,{children:"!"})," (e.g., ",e.jsx(s.InlineCode,{children:"feat!: drop Node 16"}),") or include ",e.jsx(s.InlineCode,{children:"BREAKING CHANGE:"})," in the body."]})]}),e.jsx(s.Pre,{children:`// Examples
feat(router): add lazy routes for docs section
fix(dom-events): stop propagation bug on card click
docs(conventions): clarify commit types

// With a body
feat(search): debounce input by 150ms

Explain the why, not the what. Link issues if relevant (#123).`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Branching Strategy"}),e.jsxs(s.Small,{children:["A ",e.jsx("b",{children:"branching strategy"})," is an agreed way to name and merge branches. Two common choices:"]}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Trunk-based:"})," one main branch (",e.jsx(s.InlineCode,{children:"main"}),"), small PRs, frequent merges; use feature branches like ",e.jsx(s.InlineCode,{children:"feat/search-box"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Gitflow (heavier):"})," long-lived ",e.jsx(s.InlineCode,{children:"develop"})," plus release/hotfix branches—better for packaged releases."]})]}),e.jsx(s.Pre,{children:`// Naming
feat/analytics-dashboard
fix/login-redirect
docs/contributing-guide`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Pull Requests & Reviews"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Small is king:"})," aim for PRs under ~300 lines; reviewers can give better feedback."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Checklist:"})," tests updated, screenshots (for UI), notes on risks, migration steps if any."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Respectful feedback:"}),` propose; don't demand. Ask "what do you think about...".`]})]}),e.jsx(s.Pre,{children:`# PR title
feat: add keyboard navigation to sidebar

## Summary
- Arrow keys move focus through nav items
- Home/End jump to first/last
- Adds aria-current usage

## Screenshots
[attach before/after GIFs]

## Risks
- None (behind a flag)`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Versioning & Releases (SemVer)"}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Semantic Versioning (SemVer)"})," uses ",e.jsx("b",{children:"MAJOR.MINOR.PATCH"}),": increase MAJOR for breaking changes, MINOR for new features, PATCH for fixes."]}),e.jsx(s.Pre,{children:`// Examples
1.4.2  // fix only
1.5.0  // new features, no breaking
2.0.0  // breaking changes`}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Tag releases (",e.jsx(s.InlineCode,{children:"v1.5.0"}),") and generate changelogs from commits."]}),e.jsx("li",{children:"Document migrations in the release notes if anything breaks."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Docs & ADRs"}),e.jsxs(s.Small,{children:["An ",e.jsx("b",{children:"ADR (Architecture Decision Record)"})," captures an important decision, the options considered, and the rationale. It prevents repeating the same discussions later."]}),e.jsx(s.Pre,{children:`# docs/adrs/0001-routing-strategy.md
## Context
We need stable deep links for GitHub Pages.

## Decision
Use BrowserRouter with basename and only kebab-case slugs.

## Alternatives
HashRouter (pros: simple; cons: ugly URLs)

## Consequences
Cleaner links; need 404 redirect rule on host.`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep conventions short and specific—people will follow them."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," automate where possible (linters, formatters, commit hooks)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," write examples in docs so beginners can copy-paste safely."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," create rules nobody enforces; remove or automate them."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mix unrelated changes in one PR (hard to review, hard to revert)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Conventional Commits:"})," a human- and machine-readable commit message standard."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SemVer:"})," semantic versioning scheme ",e.jsx(s.InlineCode,{children:"MAJOR.MINOR.PATCH"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ADR:"})," a short document recording a significant architectural decision."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Trunk-based:"})," branching model with frequent merges to ",e.jsx(s.InlineCode,{children:"main"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Gitflow:"})," branching model with long-lived ",e.jsx(s.InlineCode,{children:"develop"})," and release branches."]})]})]}),e.jsx(s.Callout,{children:"Summary: agree on a few practical rules—names, layout, commits, PRs, and releases—then automate them. The goal is to help humans read, review, and maintain the project long after the first version ships."})]});export{r as default};
