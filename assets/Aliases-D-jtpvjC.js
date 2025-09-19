import{j as e}from"./index-BUVRD3Bm.js";import{S as i}from"./styled-BID83fT8.js";const n=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Aliases (Import Path Aliases)"}),e.jsxs(i.Lead,{children:["An ",e.jsx("b",{children:"import path alias"})," is a short, memorable path (like ",e.jsx(i.InlineCode,{children:"@/components"}),") that maps to a real directory (like ",e.jsx(i.InlineCode,{children:"src/components"}),"). Aliases improve readability, avoid brittle ",e.jsx("i",{children:"../../../"})," imports, and make refactors easier."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Definitions — start here"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Module:"})," a JS/TS file that can import/export values."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Module resolution:"})," how a tool (Vite/Node/TS) figures out what file an import points to."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Relative import:"})," path starting with ",e.jsx(i.InlineCode,{children:"./"})," or ",e.jsx(i.InlineCode,{children:"../"})," (e.g., ",e.jsx(i.InlineCode,{children:"../../utils/format"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Absolute import:"})," path that doesn't depend on the current file's location (e.g., ",e.jsx(i.InlineCode,{children:"src/utils/format"})," or an alias like ",e.jsx(i.InlineCode,{children:"@/utils/format"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Alias:"})," a custom prefix (e.g., ",e.jsx(i.InlineCode,{children:"@"}),") mapped to a specific folder (e.g., ",e.jsx(i.InlineCode,{children:"src"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DX (Developer Experience):"})," how easy and pleasant it is to develop—good DX saves time and reduces errors."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Why aliases?"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Readability:"})," ",e.jsx(i.InlineCode,{children:"@/components/Button"})," is clearer than deep relative paths."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Refactors:"})," Move folders around without rewriting long chains of ",e.jsx(i.InlineCode,{children:"../"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Consistency:"})," The same path works anywhere in your project."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Vite setup (JavaScript)"}),e.jsx(i.Pre,{children:`// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
    },
  },
});`}),e.jsxs(i.Small,{children:["Use ",e.jsx(i.InlineCode,{children:"fileURLToPath(new URL(..., import.meta.url))"})," for reliable, cross-platform absolute paths."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Vite setup (TypeScript) + TypeScript paths"}),e.jsx(i.Pre,{children:`// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});`}),e.jsx(i.Pre,{children:`// tsconfig.json (or jsconfig.json for JS projects)
{
  "compilerOptions": {
    "baseUrl": ".",                    // allow absolute-like paths from project root
    "paths": {
      "@/*": ["src/*"],               // keep this in sync with Vite
      "@components/*": ["src/components/*"],
      "@pages/*": ["src/pages/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Important:"})," Vite's ",e.jsx(i.InlineCode,{children:"resolve.alias"})," must match ",e.jsx(i.InlineCode,{children:"paths"})," in ",e.jsx("i",{children:"tsconfig/jsconfig"}),", otherwise your editor and build may disagree."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Using aliases in code"}),e.jsx(i.Pre,{children:`// Before (brittle)
import Button from "../../components/Button.jsx";
import { formatDate } from "../../utils/dates.js";

// After (stable, clear)
import Button from "@components/Button.jsx";
import { formatDate } from "@utils/dates.js";

// Common: use "@" to point to /src
import Home from "@/pages/Home.jsx";`}),e.jsx(i.Small,{children:"You can mix both styles, but prefer aliases for anything outside the current folder."})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Editor & ESLint integration"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"VS Code:"})," ensure ",e.jsx(i.InlineCode,{children:"tsconfig.json"})," or ",e.jsx(i.InlineCode,{children:"jsconfig.json"})," exists with matching ",e.jsx(i.InlineCode,{children:"paths"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ESLint:"}),` configure the import resolver so "unresolved import" errors don't appear.`]})]}),e.jsx(i.Pre,{children:`// .eslintrc.js (example)
module.exports = {
  settings: {
    "import/resolver": {
      // If using TypeScript:
      typescript: {
        project: "./tsconfig.json"
      },
      // Or the generic alias resolver:
      alias: {
        map: [
          ["@", "./src"],
          ["@components", "./src/components"],
          ["@pages", "./src/pages"],
          ["@utils", "./src/utils"]
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Testing (Vitest / Jest)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Vitest:"}),' it uses your Vite config, so aliases generally "just work".']}),e.jsxs("li",{children:[e.jsx("b",{children:"Jest:"})," map aliases manually via ",e.jsx(i.InlineCode,{children:"moduleNameMapper"}),"."]})]}),e.jsx(i.Pre,{children:`// vitest.config.ts (only if you need custom test-level aliases)
import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) }
  },
  test: { environment: "jsdom" }
});`}),e.jsx(i.Pre,{children:`// jest.config.js (if using Jest)
module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1"
  }
};`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Storybook"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Vite builder:"})," Storybook can merge Vite aliases."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Webpack builder:"})," set ",e.jsx(i.InlineCode,{children:"webpackFinal.resolve.alias"})," to mirror your Vite/TS config."]})]}),e.jsx(i.Pre,{children:`// .storybook/main.ts (Vite builder)
import { fileURLToPath, URL } from "node:url";
export default {
  framework: { name: "@storybook/react-vite", options: {} },
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  viteFinal(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": fileURLToPath(new URL("../src", import.meta.url)),
    };
    return config;
  },
};`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Monorepos (pnpm / yarn workspaces)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Prefer importing ",e.jsx("b",{children:"workspace packages by name"})," (via their ",e.jsx(i.InlineCode,{children:"package.json"}),e.jsx("i",{children:"name"}),")."]}),e.jsxs("li",{children:["For shared internal libs, expose proper ",e.jsx(i.InlineCode,{children:"exports"})," and set project-wide TS ",e.jsx(i.InlineCode,{children:"paths"})," only for local apps."]}),e.jsxs("li",{children:["Keep aliases consistent across ",e.jsx(i.InlineCode,{children:"vite.config.*"})," and ",e.jsx(i.InlineCode,{children:"tsconfig*"})," files within each package."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," choose a single root alias (commonly ",e.jsx(i.InlineCode,{children:"@"}),") and stick to it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep Vite ",e.jsx(i.InlineCode,{children:"resolve.alias"})," in sync with TS/JS ",e.jsx(i.InlineCode,{children:"paths"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," organize a few clear aliases (",e.jsx(i.InlineCode,{children:"@"}),", ",e.jsx(i.InlineCode,{children:"@components"}),", ",e.jsx(i.InlineCode,{children:"@utils"}),"), not dozens."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mix many relative and alias paths in the same folder—pick one style for consistency."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," forget editor/ESLint/test configs—otherwise imports may work in build but show red squiggles or fail tests."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Alias:"})," custom prefix that maps to a folder."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Base URL:"})," the root used for resolving non-relative paths in TS/JS configs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Resolver:"})," a plugin or rule set that turns an import string into a file on disk."]})]})]}),e.jsxs(i.Callout,{children:["Summary: define aliases in ",e.jsx("i",{children:"vite.config.*"})," and mirror them in ",e.jsx("i",{children:"tsconfig/jsconfig"}),". Use them consistently for cleaner imports, easier refactors, and better DX. Keep ESLint, tests, and Storybook in sync to avoid surprises."]})]});export{n as default};
