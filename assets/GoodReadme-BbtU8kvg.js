import{j as e}from"./index-DqLKwkYK.js";import{S as s}from"./styled-DnvSmQrW.js";const r=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Good README"}),e.jsxs(s.Lead,{children:["A ",e.jsx("b",{children:"README"})," is the front door to your project. It explains ",e.jsx("i",{children:"what"})," the project is,",e.jsx("i",{children:"why"})," it exists, and ",e.jsx("i",{children:"how"})," to use, build, and contribute to it—without making anyone dig through the code."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Key Terms (Plain English)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"README:"})," A Markdown file (usually ",e.jsx(s.InlineCode,{children:"README.md"}),") that tells users what the project is and how to get started."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Markdown (.md):"})," A lightweight text format that supports headings, code blocks, links, images, and lists."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Badge:"})," A small image (often from ",e.jsx(s.InlineCode,{children:"shields.io"}),") showing status like build passing, version, or license."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Semantic Versioning (SemVer):"})," Version scheme ",e.jsx(s.InlineCode,{children:"MAJOR.MINOR.PATCH"})," (breaking/new/bugfix)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Changelog:"})," A chronological list of changes in each release (new features, fixes, breaking changes)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"License:"})," Legal text stating how others can use, modify, and distribute your code (MIT, Apache-2.0, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Contributing Guide:"})," Steps and rules for people who want to help (branching, PR flow, commit style)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Code of Conduct:"})," Community rules for respectful communication and behavior."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ADR (Architecture Decision Record):"})," A short note capturing an important technical decision and its context."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why a Good README Matters"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"First impressions:"})," Recruiters/teammates decide in seconds if the repo is worth their time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Less friction:"}),` Clear install/run steps reduce "it doesn't work on my machine."`]}),e.jsxs("li",{children:[e.jsx("b",{children:"Faster collaboration:"})," New contributors don't need to ask basics on chat repeatedly."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Minimum Sections Every README Should Have"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Project name + one-line value prop"})," (what it is and why it exists)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Screenshots/GIF"})," showing the UI or output."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Quickstart"}),": install → run in 3-5 commands."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Configuration"}),": environment variables and defaults."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scripts"})," (dev, build, test, lint, format)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tech stack"})," with links."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Contributing"})," + ",e.jsx("b",{children:"License"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"FAQ/Troubleshooting"})," for the top 3-5 issues."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Example: Lean, Effective README Skeleton"}),e.jsx(s.Pre,{children:`# Project Name
> One line: what problem it solves and for whom.

[![build](https://img.shields.io/badge/build-passing-brightgreen)]()
[![license](https://img.shields.io/badge/license-MIT-blue)]()
[![version](https://img.shields.io/badge/version-1.0.0-informational)]()

## Demo
- Live: https://example.com
- Code: https://github.com/owner/repo
- Screenshot/GIF:
  ![Demo](./docs/demo.gif)

## Features
- ✅ Feature A
- ✅ Feature B
- ✅ Feature C

## Quickstart
\`\`\`bash
# 1) Clone
git clone https://github.com/owner/repo && cd repo

# 2) Install
npm i

# 3) Run dev
npm run dev
\`\`\`

## Configuration
Create a \`.env\` with:
\`\`\`ini
VITE_API_URL=http://localhost:3000
VITE_ANALYTICS_KEY=dev-123
\`\`\`
Defaults live in \`.env.example\`.

## Scripts
- \`npm run dev\` — start dev server
- \`npm run build\` — production build
- \`npm run preview\` — preview prod build
- \`npm run test\` — run tests
- \`npm run lint\`, \`npm run format\` — code quality

## Tech Stack
- Vite, React 18, styled-components
- React Router, React Query
- ESLint, Prettier, Vitest/RTL

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) and our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Roadmap
- [ ] Feature X
- [ ] i18n
- [ ] Dark mode polish

## FAQ
**Q:** Build fails on Node 16  
**A:** Use Node 18+ (see \`.nvmrc\`).

## License
MIT © Your Name
`}),e.jsx(s.Small,{children:"Copy this as a starting point, then adjust to your project."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Badges (When They Help)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Good:"})," build status, version, license, coverage, bundle size, downloads."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid clutter:"})," 4-6 meaningful badges are enough."]})]}),e.jsx(s.Pre,{children:`[![build](https://img.shields.io/github/actions/workflow/status/owner/repo/ci.yml)]()
[![coverage](https://img.shields.io/codecov/c/github/owner/repo)]()
[![license](https://img.shields.io/badge/license-MIT-blue)]()
`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Screenshots & GIFs"}),e.jsxs(s.List,{children:[e.jsx("li",{children:'Show the "aha!" moment—home screen, key workflow, before/after.'}),e.jsx("li",{children:"Export short, focused GIFs (2-8s). Add a caption if needed."}),e.jsxs("li",{children:["Keep media under ",e.jsx("b",{children:"docs/"})," and reference with relative paths."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Troubleshooting (Top Issues)"}),e.jsx(s.Pre,{children:"### Node version mismatch\nUse Node 18+ (see .nvmrc). Reinstall deps after switching: `rm -rf node_modules && npm i`.\n\n### Vite port already in use\nStop the existing process or run: `npm run dev -- --port=5174`.\n\n### Env not loaded\nEnsure you have `.env` or `.env.local`. Restart dev server after changes.\n"})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Contributing & Commit Style (Beginner-Friendly)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Fork → branch → PR:"})," small, focused branches like ",e.jsx(s.InlineCode,{children:"feat/search-box"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Conventional Commits:"})," ",e.jsx(s.InlineCode,{children:"feat:"})," new feature, ",e.jsx(s.InlineCode,{children:"fix:"})," bug, ",e.jsx(s.InlineCode,{children:"docs:"})," docs, ",e.jsx(s.InlineCode,{children:"refactor:"})," internal change, etc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"PR Template:"}),' include "what/why/how," screenshots, tests, and checklists.']})]}),e.jsx(s.Pre,{children:`# .github/pull_request_template.md
## What
Short summary of the change.

## Why
Motivation, linked issue/ADR.

## How
Key implementation points.

## Screenshots
(optional)

## Checklist
- [ ] Tests added/updated
- [ ] Docs updated
- [ ] No breaking changes
`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Link to Decisions (ADRs)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:['When you decide something significant (e.g., "Use React Query over Redux"), create an ',e.jsx("b",{children:"ADR"})," and link it in the README."]}),e.jsx("li",{children:"Format: context → decision → consequences → alternatives."})]}),e.jsx(s.Pre,{children:`# docs/adrs/0001-use-react-query.md
- Context: server state management needed
- Decision: adopt React Query
- Consequences: caching, retries, less boilerplate
- Alternatives: Redux Toolkit Query, SWR`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep the top clean: name, one-liner, badges, demo links."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," write copy for humans. Short sentences. Bulleted instructions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," show a working command sequence (copy-paste friendly)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," bury install steps below long philosophy sections."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," flood with 20 badges or 10 screenshots—curate."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Pre-Publish Checklist"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"✅ One-line value prop is crystal clear."}),e.jsx("li",{children:"✅ Quickstart works on a clean machine."}),e.jsx("li",{children:"✅ Env vars documented with defaults."}),e.jsx("li",{children:"✅ License chosen and included."}),e.jsx("li",{children:"✅ Link to contributing, CoC, and ADRs (if any)."}),e.jsx("li",{children:"✅ At least one screenshot or GIF."}),e.jsx("li",{children:"✅ Changelog or Releases page exists."})]})]}),e.jsx(s.Callout,{children:"A good README respects your reader's time. Lead with clarity, show the value quickly, and make the first run path effortless. Everything else is a bonus."})]});export{r as default};
