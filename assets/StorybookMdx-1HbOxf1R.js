import{j as e}from"./index-DqLKwkYK.js";import{S as s}from"./styled-DnvSmQrW.js";const t=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Storybook MDX"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Storybook"})," is a development tool to build and preview UI components in isolation.",e.jsx("b",{children:" MDX"})," (Markdown + JSX) lets you write rich documentation pages alongside stories—mixing prose, code samples, and live components in a single file."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"What is Storybook? What is MDX?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Storybook:"})," a workbench for UI components. You load components, pass them props, and view each state (“",e.jsx("em",{children:"story"}),"”) without running the whole app."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Story:"})," a named example of a component with specific props (e.g., “Button / Primary”). Stories are small, focused scenarios for development, testing, and docs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CSF (Component Story Format):"})," the standard JavaScript/TS format for stories (e.g., ",e.jsx("code",{children:"Button.stories.jsx"}),"). Great for interactive stories."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MDX:"})," a file format that combines Markdown and JSX. In Storybook,",e.jsx("b",{children:" MDX stories"})," let you write documentation with headings, lists, code blocks, and also import and render React components inline."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Docs mode:"})," Storybook's documentation view that renders MDX pages and auto-generated controls/props tables for your components."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"MDX vs CSF: When to use which?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use CSF"})," for day-to-day component states and playground stories (fast to create, code-first)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use MDX"})," when you need teaching-quality docs: introductions, guidelines, “Do & Don't,” accessibility notes, and multiple related components on one page."]}),e.jsxs("li",{children:["You can ",e.jsx("em",{children:"mix"}),": keep your CSF stories, then import and reference them inside MDX docs."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Getting Storybook (conceptual setup)"}),e.jsxs(s.Small,{children:["In a typical React + Vite project, you add Storybook with a CLI, which scaffolds a ",e.jsx("code",{children:".storybook/"})," config and example stories. MDX works out of the box in modern Storybook versions. (Use official docs for the exact CLI command & versions.)"]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Basic MDX Anatomy"}),e.jsx(s.Pre,{children:`/* File: Button.stories.mdx */
import { Meta, Story, Canvas, ArgsTable } from '@storybook/blocks';
import { Button } from './Button';

<Meta title="Components/Button" of={Button} />

# Button
Use **Button** for primary actions. Keep labels short (1–3 words).

## Basic usage
<Canvas>
  <Story name="Primary">
    <Button variant="primary">Save</Button>
  </Story>
</Canvas>

## Props
<ArgsTable of={Button} />`}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"<Meta />"}),": declares metadata—",e.jsx("code",{children:"title"})," (sidebar name) and the component (",e.jsx("code",{children:"of"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"<Canvas />"}),": renders live stories (an interactive preview surface)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"<Story />"}),": a single story example. Give it a ",e.jsx("code",{children:"name"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"<ArgsTable />"}),": auto-generates a props table from component metadata/controls."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Args & Controls (interactive props)"}),e.jsx(s.List,{children:e.jsxs("li",{children:[e.jsx("b",{children:"Args:"})," a story's inputs (props) expressed as plain data. Controls auto-build sliders, selects, text fields in the Storybook UI so teammates can tweak props live."]})}),e.jsx(s.Pre,{children:`/* Button.stories.mdx with args */
import { Meta, Canvas, Story, ArgsTable } from '@storybook/blocks';
import { Button } from './Button';

<Meta title="Components/Button" of={Button} />

## Playground
<Canvas>
  <Story
    name="Playground"
    args={{ variant: 'primary', disabled: false, children: 'Click Me' }}
  >
    {({ variant, disabled, children }) => (
      <Button variant={variant} disabled={disabled}>{children}</Button>
    )}
  </Story>
</Canvas>

<ArgsTable of={Button} />`}),e.jsxs(s.Small,{children:["In MDX, you can write a function child inside ",e.jsx("code",{children:"<Story>"})," to map args to JSX."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Reusing Existing CSF Stories in MDX"}),e.jsx(s.Pre,{children:`/* Import CSF stories and show them in docs */
import * as ButtonStories from './Button.stories'; // CSF file (e.g., default export + named stories)
import { Meta, Canvas, Story, ArgsTable } from '@storybook/blocks';

<Meta of={ButtonStories} />

# Button (Docs)
<Canvas>
  <Story of={ButtonStories.Primary} />
  <Story of={ButtonStories.Secondary} />
</Canvas>

<ArgsTable of={ButtonStories} />`}),e.jsx(s.Small,{children:"This pattern keeps one source of truth for stories (CSF) and composes docs with MDX."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"How to Structure a Good MDX Doc"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Start with a short ",e.jsx("b",{children:"purpose statement"}),": When to use the component, when not to."]}),e.jsxs("li",{children:["Follow with ",e.jsx("b",{children:"usage examples"})," covering key variants and states."]}),e.jsxs("li",{children:["Include ",e.jsx("b",{children:"Accessibility"})," (focus order, keyboard interactions, ARIA where applicable)."]}),e.jsxs("li",{children:["Add ",e.jsx("b",{children:"Do & Don't"})," to communicate conventions quickly."]}),e.jsxs("li",{children:["End with an ",e.jsx("b",{children:"API/Props"})," table and links to design tokens if relevant."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep stories focused: one clear scenario per story."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," show edge cases: long labels, loading, disabled, error."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," document accessibility expectations (keyboard, screen readers)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," hide critical behavior behind complex setups—prefer minimal, readable examples."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," duplicate stories across MDX and CSF; import CSF into MDX when possible."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common Pitfalls & How to Avoid Them"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Out-of-sync props:"})," When refactoring a component, update MDX docs and CSF stories together."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Too many knobs:"})," Overloaded controls confuse readers. Keep args limited to meaningful props."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Missing context:"})," If a component requires providers (Theme, Router), add decorators so stories work in isolation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Monolithic pages:"})," Break large docs into sections. Use headings and short paragraphs."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Decorators & Theming (Concept)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Decorator:"})," a wrapper that adds context to all stories (e.g., ThemeProvider, BrowserRouter)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Global decorator:"})," applied via ",e.jsx("code",{children:".storybook/preview"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Per-story decorator:"})," applied to a single story or docs page for specific needs."]})]}),e.jsx(s.Pre,{children:`// Conceptual example: .storybook/preview (JS/TS)
// export const decorators = [
//   (Story) => (
//     <ThemeProvider theme={theme}>
//       <Story />
//     </ThemeProvider>
//   ),
// ];`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Story:"})," a named, interactive example of a component."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CSF:"})," JavaScript/TypeScript module that exports a component's stories."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MDX:"})," Markdown with JSX. In Storybook, used for docs pages that can also render stories."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Args:"})," props expressed as a serializable object that controls a story."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controls:"})," auto-generated UI to tweak args live."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Decorators:"})," wrappers to provide shared context to stories."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Docs mode:"})," Storybook's documentation view that renders MDX pages and auto-docs."]})]})]}),e.jsx(s.Callout,{children:"Summary: Use MDX when you want narrative documentation with live examples. Keep stories focused, wire up controls for key props, and import CSF stories to avoid duplication. Treat docs as part of the component—update them with the code."})]});export{t as default};
