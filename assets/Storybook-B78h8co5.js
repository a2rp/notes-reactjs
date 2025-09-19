import{j as e}from"./index-BUVRD3Bm.js";import{S as o}from"./styled-BID83fT8.js";const r=()=>e.jsxs(o.Page,{children:[e.jsx(o.Title,{children:"Storybook"}),e.jsxs(o.Lead,{children:[e.jsx("b",{children:"Storybook"})," is a “frontend workshop” that lets you build, test, and document UI components in isolation—outside your app—so you can develop faster and catch edge cases early. It integrates tightly with Vite and React for zero-config local DX."]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Definition & Purpose"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Storybook:"})," a tool that runs a separate UI for ",e.jsx("i",{children:"components in isolation"})," with live examples (“stories”)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Isolation:"})," render a component without your app's routing/data so you can focus on UI states."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DX (Developer Experience):"})," the overall feel/speed/clarity of dev workflows; Storybook boosts DX via fast previews, docs, and testing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CDD (Component-Driven Development):"})," build UI bottom-up from small, tested components to screens."]})]})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Glossary"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Story:"})," a named example of a component in a specific state (e.g., “Button/Primary”)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CSF (Component Story Format):"})," the standard JS/TS module format where you ",e.jsx("i",{children:"export"})," a default ",e.jsx(o.InlineCode,{children:"meta"})," and named stories."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Args:"})," a serializable object that configures story props; connected to the UI controls panel."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controls:"})," an addon panel that lets you change args (like props) visually at runtime."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Decorators:"})," wrapper functions that provide context to all stories (e.g., theme, layout)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parameters:"})," per-story/per-project settings (docs, actions, a11y, layout, backgrounds, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Play function:"})," a snippet that runs ",e.jsx("i",{children:"after"})," a story renders to simulate user interactions (click/type/hover) and make assertions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Addons:"})," plug-ins (Essentials, Interactions, A11y, etc.) that add features to Storybook."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Framework & Builder:"})," for React+Vite you use ",e.jsx(o.InlineCode,{children:"@storybook/react-vite"})," powered by the Vite builder."]})]})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Install & Run (React + Vite)"}),e.jsx(o.Pre,{children:`# From your project root
npx storybook@latest init

# Start Storybook on a dev server (defaults to http://localhost:6006)
npm run storybook

# Build a static Storybook (output: storybook-static/)
npm run build-storybook`}),e.jsxs(o.Small,{children:["The initializer detects Vite and configures the ",e.jsx(o.InlineCode,{children:"@storybook/react-vite"})," framework automatically."]})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Files you'll see (.storybook/)"}),e.jsx(o.Pre,{children:`.storybook/
  main.ts    // "main config": stories globs, framework, addons, vite tweaks
  preview.ts // global parameters + decorators (wrap all stories)
src/
  components/Button.jsx
  components/Button.stories.jsx // your first CSF file
`}),e.jsx(o.Pre,{children:`// .storybook/main.ts (JS is fine too)
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: { name: "@storybook/react-vite", options: {} },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",     // actions, controls, docs, backgrounds, viewport, etc.
    "@storybook/addon-interactions",    // play function panel + test helpers
    "@storybook/addon-a11y"             // accessibility checks
  ],
  // Optional: customize Vite for Storybook only
  viteFinal: async (config) => {
    // e.g., add aliases or plugins here, return config
    return config;
  },
};
export default config;`}),e.jsx(o.Pre,{children:`// .storybook/preview.ts
import type { Preview } from "@storybook/react";
import React from "react";

export const decorators = [
  (Story) => (
    <div style={{ padding: 24 }}>
      <Story />
    </div>
  ),
];

export const parameters: Preview["parameters"] = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true, matchers: { color: /color/i } },
  layout: "centered",
};`})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Write Your First Story (CSF)"}),e.jsx(o.Pre,{children:`// src/components/Button.jsx
export default function Button({ label = "Click", variant = "solid", ...props }) {
  const styles = {
    solid:  { padding: "8px 14px", border: "none", background: "#4f46e5", color: "white", borderRadius: 8 },
    outline:{ padding: "8px 14px", border: "2px solid #4f46e5", background: "white", color: "#4f46e5", borderRadius: 8 },
    ghost:  { padding: "8px 14px", border: "none", background: "transparent", color: "#4f46e5", borderRadius: 8 },
  };
  return <button style={styles[variant]} {...props}>{label}</button>;
}`}),e.jsx(o.Pre,{children:`// src/components/Button.stories.jsx (CSF 3)
import Button from "./Button";
import { userEvent, within, expect } from "@storybook/test";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],                 // enables auto-generated Docs
  args: { label: "Click me", variant: "solid" },
  argTypes: {
    variant: { control: { type: "radio" }, options: ["solid", "outline", "ghost"] },
    onClick: { action: "clicked" },  // Actions addon: logs events
  },
  parameters: {
    docs: {
      description: {
        component: "A simple button with solid/outline/ghost variants.",
      },
    },
  },
};
export default meta;

// Minimal stories (args-only)
export const Primary = {};
export const Outline = { args: { variant: "outline" } };
export const Ghost = { args: { variant: "ghost" } };

// Interaction test using the play function
export const Clickable = {
  args: { label: "Press" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.findByRole("button", { name: /press/i });
    await userEvent.click(btn);
    await expect(btn).toBeInTheDocument();
  },
};`}),e.jsxs(o.Small,{children:[e.jsx("b",{children:"CSF:"})," export a default ",e.jsx(o.InlineCode,{children:"meta"})," and named stories. ",e.jsx("b",{children:"Args"})," feed both the component and the Controls panel. The ",e.jsx("b",{children:"play function"})," runs after render to simulate interactions and assert outcomes."]})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Args & Controls"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Args:"})," serializable props for stories; change them live from the Controls panel."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ArgTypes:"})," metadata that defines how Controls render (e.g., radio vs select), plus descriptions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Actions:"})," auto-detect handlers like ",e.jsx(o.InlineCode,{children:"onClick"})," or declare them in ",e.jsx(o.InlineCode,{children:"argTypes"})," to log events."]})]}),e.jsx(o.Pre,{children:`argTypes: {
  variant: {
    control: { type: "radio" },
    options: ["solid", "outline", "ghost"],
    description: "Visual style of the button"
  },
  onClick: { action: "clicked", description: "Click handler (Actions panel)" },
}`})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Decorators & Parameters"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Decorators:"})," wrap all or some stories with providers/layout (theme, i18n, router mocks)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parameters:"})," control docs rendering, backgrounds, a11y options, layout, viewports, and more."]})]}),e.jsx(o.Pre,{children:`// Global decorator (preview.ts) provides padding
export const decorators = [(Story) => <div style={{ padding: 24 }}><Story /></div>];

// Per-story parameters
export const Primary = {
  parameters: {
    backgrounds: { default: "light" },
    layout: "centered",
  },
};`})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Docs: MDX & Autodocs"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Autodocs:"})," generate docs from CSF automatically when you add ",e.jsx(o.InlineCode,{children:'tags: ["autodocs"]'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MDX:"})," hand-crafted docs pages combining markdown + JSX-like blocks (",e.jsx(o.InlineCode,{children:"<Story/>"}),", ",e.jsx(o.InlineCode,{children:"<Controls/>"}),")."]})]}),e.jsx(o.Pre,{children:`// src/components/Button.mdx (optional)
import { Meta, Story, Controls } from "@storybook/blocks";
import * as ButtonStories from "./Button.stories";

<Meta of={ButtonStories} />
# Button
<Story name="Primary">{ButtonStories.Primary}</Story>
<Controls />`})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Accessibility & QA"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"A11y addon:"})," runs checks (ARIA roles, contrast, labels) in the ",e.jsx("i",{children:"Accessibility"})," panel."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Interactions panel:"})," step through your ",e.jsx(o.InlineCode,{children:"play"})," interactions visually and debug failures."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Static build:"})," publish docs/UI states to share with teammates or recruiters."]})]})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Vite Builder Notes"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:["Storybook reuses your ",e.jsx(o.InlineCode,{children:"vite.config"}),"; project-specific overrides can live in ",e.jsx(o.InlineCode,{children:"viteFinal"})," inside ",e.jsx(o.InlineCode,{children:".storybook/main.ts"}),"."]}),e.jsx("li",{children:"Prefer setting aliases/tsconfig paths in your main Vite config so both app and Storybook share them."})]})]}),e.jsxs(o.Section,{children:[e.jsx(o.H2,{children:"Do & Don't"}),e.jsxs(o.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," create stories for ",e.jsx("i",{children:"all"})," important states: loading, error, empty, long text, RTL."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," write small ",e.jsx(o.InlineCode,{children:"play"})," tests for core interactions (click, type, focus)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," wrap stories with the same theme/provider the app uses (via decorators)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," couple stories to live APIs; use mock data and pure props."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," skip accessibility—enable the a11y addon and fix warnings early."]})]})]}),e.jsxs(o.Callout,{children:["Summary: Storybook accelerates development with isolated rendering, live controls, docs, and interaction tests. Use CSF stories with args/controls, add decorators for context, and write small ",e.jsx("i",{children:"play"})," tests to lock in behavior."]})]});export{r as default};
