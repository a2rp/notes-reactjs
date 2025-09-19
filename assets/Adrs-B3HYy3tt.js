import{j as e}from"./index-DqLKwkYK.js";import{S as i}from"./styled-DnvSmQrW.js";const r=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Architecture Decision Records (ADRs)"}),e.jsxs(i.Lead,{children:["An ",e.jsx("b",{children:"Architecture Decision Record (ADR)"})," is a short, versioned document that captures a",e.jsx("i",{children:" single, significant technical decision"}),", its context, options, consequences, and status. ADRs help teams remember ",e.jsx("em",{children:"why"})," something was chosen, not just ",e.jsx("em",{children:"what"})," was built."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Why ADRs?"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Shared memory:"})," preserves context & trade-offs for current and future teammates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Decision hygiene:"})," forces clear problem framing and explicit alternatives."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Change audit:"})," decisions can be ",e.jsx("em",{children:"reconsidered"}),", ",e.jsx("em",{children:"deprecated"}),", or ",e.jsx("em",{children:"superseded"})," with a trace."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lightweight:"})," each ADR is small (1-2 pages), living alongside code in the repo."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Key Terms (Beginner Friendly)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Context:"})," the background facts/constraints driving the decision (requirements, risks, deadlines)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Options (Alternatives):"})," feasible paths you considered, not strawmen—each with pros/cons."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Decision:"})," the chosen option and the reasons it wins ",e.jsx("i",{children:"now"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Consequences:"})," follow-on effects of the decision (cost, complexity, lock-in, team workflows)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Status:"})," lifecycle of the ADR: ",e.jsx(i.InlineCode,{children:"Proposed"}),", ",e.jsx(i.InlineCode,{children:"Accepted"}),", ",e.jsx(i.InlineCode,{children:"Deprecated"}),", ",e.jsx(i.InlineCode,{children:"Superseded"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Superseded by:"})," link to the ADR that replaced this one when direction changed."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Minimal ADR Structure"}),e.jsx(i.Pre,{children:`# ADR N: <Short title>
Date: YYYY-MM-DD
Status: Proposed | Accepted | Deprecated | Superseded by ADR M

## Context
What problem are we solving? What constraints matter (time, budget, skills, scale, compliance)?

## Decision
What option did we choose? Why this over others? Summarize the reasoning.

## Alternatives
- Option A — Pros / Cons
- Option B — Pros / Cons
- Option C — Pros / Cons

## Consequences
Positive and negative outcomes. New risks introduced. Cost of reversal. Operational impact.

## References
Links to tickets, docs, benchmarks, PRs, spikes.`}),e.jsx(i.Small,{children:"Keep it short. One ADR per decision. Link related ADRs instead of cramming everything into one."})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Example ADR — “Adopt React Query for Server State”"}),e.jsx(i.Pre,{children:`# ADR 7: Adopt React Query for Server State
Date: 2025-09-18
Status: Accepted

## Context
We fetch list/detail pages and need caching, retries, pagination, and background refresh.
Existing useEffect + fetch is duplicated and error-prone.

## Decision
Use React Query for all server-state (HTTP) concerns in the SPA.
Reasoning: batteries-included caching, stale-while-revalidate, pagination helpers, devtools.

## Alternatives
- Keep custom hooks (fetch + useEffect)
  + No new dependency
  - Reimplement caching/retries; higher maintenance
- SWR
  + Simple API, good caching
  - Fewer built-in pagination/mutation patterns for our needs

## Consequences
+ Faster iteration; less boilerplate
+ Predictable cache invalidation via keys
- Team must learn query/mutation mental model
- Vendor lock-in risk is acceptable

## References
- Spike PR #142 showing migration on /products
- Perf profile before/after`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Numbering, Naming, and Location"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Folder:"})," keep ADRs in the repo, e.g., ",e.jsx(i.InlineCode,{children:"/docs/adrs/"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"File name:"})," prefix with a sequence and kebab title, e.g., ",e.jsx(i.InlineCode,{children:"0007-adopt-react-query.md"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Index:"})," maintain a simple ",e.jsx(i.InlineCode,{children:"README.md"})," (table of ADRs with status/links)."]})]}),e.jsx(i.Pre,{children:`/docs
  /adrs
    0001-choose-monorepo.md
    0002-auth-strategy-jwt-vs-session.md
    0003-ui-library-choice.md
    0007-adopt-react-query.md
  README.md  # index of ADRs`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"When to Write an ADR"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Irreversible-ish choice:"})," database, auth model, state library, build system."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cross-team impact:"})," conventions, CI/CD, folder structure, error handling patterns."]}),e.jsxs("li",{children:[e.jsx("b",{children:"External dependencies:"})," paid SaaS, SDKs, licenses, hosting providers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Security/compliance:"})," data retention, PII handling, audit trails."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Writing Tips (Do / Don't)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep ADRs concise (1-2 pages). Link out to detail/PRs/benchmarks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," record ",e.jsx("em",{children:"real alternatives"})," you actually compared, with honest trade-offs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," timestamp and set ",e.jsx(i.InlineCode,{children:"Status"}),"; update when reality changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," write after-the-fact fiction—ADRs are not marketing copy."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," cram multiple big decisions into one ADR—split them and cross-link."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Team Workflow (Lightweight)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Create ADR as ",e.jsx("b",{children:"Proposed"})," in a PR. Ask for targeted review (architect, lead, QA/security as needed)."]}),e.jsxs("li",{children:["Merge as ",e.jsx("b",{children:"Accepted"})," (or ",e.jsx("b",{children:"Rejected"}),") with reviewer sign-offs in the PR."]}),e.jsxs("li",{children:["If direction changes, open a new ADR and mark the old one ",e.jsx("b",{children:"Superseded"})," with a link."]}),e.jsx("li",{children:"Reference ADR numbers in commits/PR descriptions to keep the chain of evidence."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Copy-Paste ADR Template"}),e.jsx(i.Pre,{children:`# ADR N: <Short title>
Date: <YYYY-MM-DD>
Status: Proposed

## Context
<Background, constraints, goals, non-goals>

## Decision
<Chosen option and the reasoning>

## Alternatives
- <Option A> — Pros / Cons
- <Option B> — Pros / Cons
- <Option C> — Pros / Cons

## Consequences
<Positive/negative outcomes, risks, migration, ops impact>

## References
<Tickets, PRs, docs, benchmarks>`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Tooling (Optional)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"adr-tools:"})," small CLI to create/number ADRs with a consistent template."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Docs site:"})," render ADRs with your existing notes site or Storybook docs tab."]}),e.jsxs("li",{children:[e.jsx("b",{children:"PR checks:"})," lint for ",e.jsx(i.InlineCode,{children:"/docs/adrs/"})," presence when specific labels are used (e.g., “architecture”)."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Decision record:"})," a log entry documenting a technical choice and its rationale."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Supersede:"})," replace a previous decision with a newer, accepted one."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Trade-off:"})," a compromise between competing goals (cost vs speed, simplicity vs flexibility)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reversible decision:"})," a choice that can be changed cheaply later; often doesn't need an ADR."]})]})]}),e.jsx(i.Callout,{children:"Summary: ADRs are your team's collective memory for important technical choices. Keep them small, honest, and current—one decision per record, with clear context, real alternatives, and explicit consequences."})]});export{r as default};
