import{j as e}from"./index-BRArnZ3i.js";import{S as s}from"./styled-BhNhJnsx.js";const i=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Feature Folders"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Feature Folders"})," organize your app by ",e.jsx("i",{children:"features"})," (vertical slices) rather than by file type. Each feature folder co-locates components, hooks, state, styles, tests, and assets that belong to that feature. This improves change locality, reduces cross-folder hopping, and scales better for teams."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Core Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Feature:"})," A business capability or user-facing slice (e.g., ",e.jsx(s.InlineCode,{children:"auth"}),","," ",e.jsx(s.InlineCode,{children:"cart"}),", ",e.jsx(s.InlineCode,{children:"profile"}),"). Think “what the user does,” not “how we implement.”"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Feature Folder:"})," A directory that contains everything needed to implement the feature (UI, hooks, state management, services, tests, styles)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Vertical Slice:"})," A unit that spans UI → state → data for one capability. Contrast with horizontal layers (components/, hooks/, utils/)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Co-location:"})," Keep closely related files next to each other to improve discoverability and refactoring safety."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Public API (barrel):"})," An ",e.jsx(s.InlineCode,{children:"index.js"}),"/",e.jsx(s.InlineCode,{children:"index.ts"})," that re-exports the feature's intended surface (components, hooks) while hiding internals."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why Feature Folders?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Change locality:"})," Most edits live inside one folder → faster dev loops, fewer regressions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Ownership:"})," Teams can own features without stepping on each other's toes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scalability:"})," New features add new folders, not new global categories."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Refactor-friendly:"})," Rename, move, or split features with predictable blast radius."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Example Structures"}),e.jsx(s.Small,{children:"Start simple; add depth only when needed."}),e.jsx(s.Pre,{children:`// Small app (2-5 features)
src/
  features/
    auth/
      LoginForm.jsx
      useLogin.js
      auth.api.js
      auth.types.js
      index.js            // public barrel (export what others may import)
    profile/
      ProfilePage.jsx
      useProfile.js
      profile.api.js
      index.js
  app/
    routes.jsx
    store.js
  ui/                     // truly shared primitives (buttons, modals)

// Medium app (more internal structure per feature)
src/
  features/
    cart/
      components/
        CartIcon.jsx
        CartSheet.jsx
      hooks/
        useCart.js
      state/
        cart.slice.js     // redux/zustand/xstate, etc.
        selectors.js
      services/
        cart.api.js
        cart.mappers.js
      tests/
        cart.spec.jsx
      index.js
    products/
      components/
      hooks/
      state/
      services/
      index.js
  ui/
  app/
    routes.jsx
    providers.jsx         // QueryClientProvider, ThemeProvider, etc.`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Public API (Barrel)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Purpose:"})," Control what the rest of the app can import from a feature. Hide internals to keep boundaries clean."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Benefit:"})," Allows internal refactors without breaking consumers."]})]}),e.jsx(s.Pre,{children:`// features/cart/index.js
export { default as CartIcon } from "./components/CartIcon";
export { default as CartSheet } from "./components/CartSheet";
export { useCart } from "./hooks/useCart";

// Avoid exporting internal helpers:
// export * from "./services/cart.mappers" // ❌ keep private if not needed outside`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Naming & Boundaries"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Feature folder names:"})," nouns (auth, cart, orders, profile). Keep them lowercase-kebab or lowercase."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shared UI:"})," keep generic, reusable primitives under ",e.jsx(s.InlineCode,{children:"src/ui"})," (buttons, inputs, modal), not inside features."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cross-feature utilities:"})," keep under ",e.jsx(s.InlineCode,{children:"src/lib"})," (date, number, fetch wrappers) or ",e.jsx(s.InlineCode,{children:"src/shared"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"No leaks:"})," a feature should not reach into another feature's internals; import from its barrel."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Routing & Code-Splitting"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Route per feature:"})," Lazy-load feature screens to reduce initial bundle size."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Nested routes:"})," Keep routing files close to the feature pages/screens."]})]}),e.jsx(s.Pre,{children:`// app/routes.jsx (example)
import { lazy } from "react";
const ProfilePage = lazy(() => import("../features/profile/ProfilePage"));
const CartSheet   = lazy(() => import("../features/cart/components/CartSheet"));

<Route path="/profile" element={<ProfilePage />} />
<Route path="/cart" element={<CartSheet />} />`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"State Management Inside a Feature"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Local state first:"})," use ",e.jsx(s.InlineCode,{children:"useState"}),"/",e.jsx(s.InlineCode,{children:"useReducer"})," within components when scope is small."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Feature store:"})," if state spans multiple components, co-locate a slice (Redux/Zustand/XState) in ",e.jsx(s.InlineCode,{children:"state/"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Server state:"})," co-locate queries/mutations (React Query) under ",e.jsx(s.InlineCode,{children:"services/"})," or ",e.jsx(s.InlineCode,{children:"api/"}),"."]})]}),e.jsx(s.Pre,{children:`// features/cart/state/cart.slice.js (zustand example)
import { create } from "zustand";
export const useCartStore = create((set) => ({
  items: [],
  add: (item) => set((s) => ({ items: [...s.items, item] })),
  remove: (id) => set((s) => ({ items: s.items.filter(i => i.id !== id) })),
  clear: () => set({ items: [] }),
}));`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Testing Strategy"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Unit tests:"})," co-locate near code (",e.jsx(s.InlineCode,{children:"*.spec.jsx"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Integration tests:"})," test feature flows (render UI + store + api mocks)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Contract tests:"})," validate the feature's public API (barrel exports)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," co-locate everything a feature needs (UI, state, tests, styles, assets)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," expose a clear public API via ",e.jsx(s.InlineCode,{children:"index.js"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep shared primitives in ",e.jsx(s.InlineCode,{children:"src/ui"})," to avoid duplication."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," create mega “shared/utils” dumping grounds—organize by domain."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," let features import each other's deep internals—use barrels."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Migration: From Layered to Feature Folders"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Step 1:"})," Identify top 3 features (auth, products, cart). Create folders under ",e.jsx(s.InlineCode,{children:"src/features"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Step 2:"})," Move feature pages/components + nearby hooks into each feature. Add a barrel that re-exports official surface."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Step 3:"})," Move services/api/state into the feature; update imports throughout the app to use the barrel."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Step 4:"})," Wire lazy routes to each feature page for code-splitting."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Step 5:"})," Delete dead paths in old layered folders; keep ",e.jsx(s.InlineCode,{children:"src/ui"})," truly generic."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Barrel (index file):"})," Re-exports selected modules to form a public API for the folder."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Domain/Feature:"})," A business concept (orders, billing) with its own data and UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Co-location:"})," Storing related files together to minimize context switching."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Vertical Slice:"})," A feature's end-to-end implementation across layers (UI → state → data)."]})]})]}),e.jsxs(s.Callout,{children:["Summary: Feature Folders scale by ",e.jsx("b",{children:"co-locating"})," everything a feature needs, exposing a small",e.jsx("b",{children:" public API"}),", and keeping boundaries clean. Start small, slice by business capability, and let your structure evolve as features grow."]})]});export{i as default};
