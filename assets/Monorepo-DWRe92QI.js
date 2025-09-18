import{j as e}from"./index-CEhT6f_w.js";import{S as s}from"./styled-CwawnrAn.js";const r=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Monorepo"}),e.jsxs(s.Lead,{children:["A ",e.jsx("b",{children:"monorepo"})," is a single repository that contains multiple packages/apps managed together (shared tooling, shared CI, shared versioning). It improves code sharing and developer experience (DX) when you have related projects."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Definitions (start here)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Monorepo:"})," one Git repo hosting many packages/apps."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Polyrepo:"})," one repo per package/app (many repos)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Workspace:"})," a tool feature (npm/pnpm/yarn) that treats subfolders as installable packages with shared node_modules at the root."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Workspace root:"})," the top-level folder with the main ",e.jsx(s.InlineCode,{children:"package.json"})," (and configs like ",e.jsx(s.InlineCode,{children:"turbo.json"}),", ",e.jsx(s.InlineCode,{children:"pnpm-workspace.yaml"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Package:"})," a folder with its own ",e.jsx(s.InlineCode,{children:"package.json"})," (library or app)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hoisting:"})," placing dependencies at the root ",e.jsx(s.InlineCode,{children:"node_modules"})," so multiple packages share them."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Symlink:"})," a file-system link connecting workspace packages so they can import each other locally."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Peer dependency:"})," a dependency expected to be provided by the consumer (avoid duplicates across packages)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why use a monorepo?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Shared code:"})," publish and reuse internal libraries without version drift."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Unified tooling:"})," one ESLint/Prettier/TS config; consistent scripts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Atomic changes:"})," update app + lib in one PR and one CI run."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Faster builds:"})," task caching/“affected” graph skips unrelated work."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Tooling (pick a combo)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Workspaces:"})," npm, pnpm, or yarn (manages install/linking)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Orchestration:"})," Turborepo or Nx (pipelines, caching, affected graph)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Releases:"})," Changesets or semantic-release (versioning + publishing)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Registry:"})," npmjs or private registry (GitHub Packages, Verdaccio, etc.)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Example folder structure"}),e.jsx(s.Pre,{children:`my-workspace/
  package.json           // workspaces + scripts
  pnpm-workspace.yaml    // (pnpm) which folders are workspaces
  turbo.json             // (turborepo) pipeline + cache
  .eslintrc.cjs, .prettierrc
  apps/
    web/                 // Vite React app
      package.json
      src/
    admin/               // Another app
      package.json
      src/
  packages/
    ui/                  // Shared UI library
      package.json
      src/
    utils/               // Shared utilities
      package.json
      src/`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Workspaces setup (npm / pnpm / yarn)"}),e.jsx(s.List,{children:e.jsxs("li",{children:[e.jsx("b",{children:"npm"})," (Node 16+): add ",e.jsx(s.InlineCode,{children:'"workspaces"'})," to root ",e.jsx(s.InlineCode,{children:"package.json"}),"."]})}),e.jsx(s.Pre,{children:`// package.json (root)
{
  "name": "my-workspace",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev --parallel",
    "lint": "turbo run lint",
    "test": "turbo run test"
  }
}`}),e.jsx(s.List,{children:e.jsxs("li",{children:[e.jsx("b",{children:"pnpm"}),": declare folders in ",e.jsx(s.InlineCode,{children:"pnpm-workspace.yaml"}),"."]})}),e.jsx(s.Pre,{children:`# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"`}),e.jsx(s.List,{children:e.jsxs("li",{children:[e.jsx("b",{children:"yarn"}),": similar to npm; add ",e.jsx(s.InlineCode,{children:'"workspaces"'})," (Berry adds more features)."]})})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Link packages together"}),e.jsx(s.Pre,{children:`// packages/ui/package.json
{
  "name": "@acme/ui",
  "version": "0.1.0",
  "main": "dist/index.js",
  "module": "dist/index.mjs"
}

// apps/web/package.json
{
  "name": "web",
  "version": "0.1.0",
  "dependencies": {
    "@acme/ui": "workspace:*"   // use the local workspace version
  }
}

// packages/ui/src/index.ts
export const Button = () => "button";  // example

// apps/web/src/main.tsx
import { Button } from "@acme/ui";`}),e.jsxs(s.Small,{children:["Use ",e.jsx(s.InlineCode,{children:'"workspace:*"'})," (pnpm/yarn) or a bare version like ",e.jsx(s.InlineCode,{children:'"*" '})," in npm to link locally. Workspaces create symlinks so changes in ",e.jsx("i",{children:"ui"})," are instantly available in ",e.jsx("i",{children:"web"}),"."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Build pipelines & caching (Turborepo)"}),e.jsx(s.Pre,{children:`// turbo.json (root)
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {}
  }
}

// packages/ui/package.json
{
  "scripts": {
    "build": "tsup src/index.ts --dts --format cjs,esm",
    "lint": "eslint .",
    "test": "vitest"
  }
}

// apps/web/package.json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "vitest"
  }
}`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:'dependsOn "^build"'})," means: build all dependencies first (topological order). Turborepo caches task outputs so unchanged packages are skipped on subsequent runs."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Alternative: Nx"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Project graph:"})," Nx analyzes imports to know which projects depend on which."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Affected:"})," run tasks only for projects impacted by the latest changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Remote cache:"})," share build results across CI and dev machines."]})]}),e.jsx(s.Pre,{children:`// package.json (root)
{
  "scripts": {
    "build": "nx run-many -t build",
    "dev": "nx run-many -t dev --parallel",
    "lint": "nx run-many -t lint",
    "test": "nx run-many -t test"
  }
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Versioning & releases (Changesets)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Fixed versions:"})," all packages share one version (easier to reason about)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Independent versions:"})," each package versions separately (less churn)."]})]}),e.jsx(s.Pre,{children:`// .changeset/config.json
{
  "$schema": "https://unpkg.com/@changesets/config/schema.json",
  "changelog": ["@changesets/changelog-github", { "repo": "acme/my-workspace" }],
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch"
}

// Create a changeset
# npx changeset
# npx changeset version   // updates versions + changelogs
# npm publish -w @acme/ui // publish a single package
# npm publish --workspaces // publish all (be careful)`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Publishing & registry tips"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Set ",e.jsx(s.InlineCode,{children:'"private": false'})," for packages you want to publish."]}),e.jsxs("li",{children:["Use a scope (",e.jsx(s.InlineCode,{children:"@acme/*"}),") to group your libraries."]}),e.jsxs("li",{children:["CI: inject ",e.jsx(s.InlineCode,{children:"NPM_TOKEN"})," for authenticated publishing."]}),e.jsxs("li",{children:["Private registries (GitHub Packages) need ",e.jsx(s.InlineCode,{children:".npmrc"})," setup."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common gotchas"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Peer deps:"})," libraries exporting React components should ",e.jsx("i",{children:"peer"}),"-depend on ",e.jsx(s.InlineCode,{children:"react"}),"/",e.jsx(s.InlineCode,{children:"react-dom"})," to avoid duplicates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hoisting differences:"})," npm/pnpm/yarn hoist differently; lock to one tool."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Circular deps:"})," avoid package A → B and B → A; break cycles with extraction."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Path imports:"})," don't import source via relative paths (e.g., ",e.jsx(s.InlineCode,{children:"../../other/src"}),"); import the package name."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Build outputs:"})," keep compiled files in ",e.jsx(s.InlineCode,{children:"dist/"})," and mark as ",e.jsx(s.InlineCode,{children:'"files"'})," in ",e.jsx(s.InlineCode,{children:"package.json"}),"."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," centralize ESLint/Prettier/TS configs at the root."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use a task runner (Turborepo/Nx) for caching and affected runs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep packages ",e.jsx("i",{children:"small & focused"})," with clean public APIs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," commit ",e.jsx(s.InlineCode,{children:"dist/"})," unless you have a reason (prefer CI builds)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mix workspace managers (e.g., pnpm + yarn) in one repo."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary (quick ref)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Affected graph:"})," the set of projects impacted by a change (used to skip unrelated builds)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Remote cache:"})," store/reuse task results across machines/CI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Workspace protocol:"})," ",e.jsx(s.InlineCode,{children:'"workspace:*"'})," pins to local packages during development."]})]})]}),e.jsx(s.Callout,{children:"Summary: Pick one workspace tool (npm/pnpm/yarn), add Turborepo or Nx for caching + affected runs, use Changesets for releases, and keep packages modular with clean APIs."})]});export{r as default};
