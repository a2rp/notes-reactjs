import{j as e}from"./index-DqLKwkYK.js";import{S as t}from"./styled-C01vZN1s.js";const i=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Layout Routes"}),e.jsxs(t.Lead,{children:["A ",e.jsx("b",{children:"layout route"})," is a parent route that renders shared UI (header, sidebar, footer, wrappers) plus an ",e.jsx(t.InlineCode,{children:"<Outlet />"})," where child routes appear. Use it to keep persistent chrome while switching inner pages."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Key Definitions"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Route:"})," a mapping from a URL ",e.jsx("i",{children:"path"})," to a React ",e.jsx("i",{children:"element"})," (component)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Nested route:"})," a child route defined inside a parent route; it renders inside the parent's layout via ",e.jsx(t.InlineCode,{children:"<Outlet />"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Layout route:"})," a parent route whose element provides shared UI and renders"," ",e.jsx(t.InlineCode,{children:"<Outlet />"})," for children."]}),e.jsxs("li",{children:[e.jsx("b",{children:"<Outlet />:"})," a placeholder in the parent layout where the matched child route's element is inserted."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Index route:"})," the default child route for a parent; in v6 you write"," ",e.jsx(t.InlineCode,{children:"<Route index element={...} />"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pathless route:"})," a parent route with ",e.jsx("i",{children:"no"})," ",e.jsx(t.InlineCode,{children:"path"}),"; used to apply a layout/guard/grouping without affecting the URL."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Minimal Layout Route"}),e.jsx(t.Pre,{children:`import { Routes, Route, Outlet, NavLink } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/dashboard/reports">Reports</NavLink>
        </nav>
      </header>

      <main>
        {/* Child routes render here */}
        <Outlet />
      </main>

      <footer>© 2025</footer>
    </>
  );
}

function DashboardHome() { return <h2>Dashboard Home</h2>; }
function Reports() { return <h2>Reports</h2>; }

export default function AppRoutes() {
  return (
    <Routes>
      {/* Parent provides the layout */}
      <Route path="/dashboard" element={<AppLayout />}>
        {/* Default (index) child at /dashboard */}
        <Route index element={<DashboardHome />} />
        {/* Nested child at /dashboard/reports */}
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* Other top-level routes... */}
    </Routes>
  );
}`}),e.jsxs(t.Small,{children:["The layout route is ",e.jsx(t.InlineCode,{children:'path="/dashboard"'}),". Its children mount into ",e.jsx(t.InlineCode,{children:"<Outlet />"}),"."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Pathless Layout (Grouping Without URL Segment)"}),e.jsx(t.Lead,{children:"Use a pathless parent to share layout/logic without changing the URL."}),e.jsx(t.Pre,{children:`function SectionLayout() {
  return (
    <div className="section">
      <h1>Settings</h1>
      <Outlet />
    </div>
  );
}

<Routes>
  {/* No "path" prop here → pathless */}
  <Route element={<SectionLayout />}>
    <Route path="/profile" element={<Profile />} />
    <Route path="/security" element={<Security />} />
  </Route>
</Routes>`}),e.jsxs(t.Small,{children:["The ",e.jsx("i",{children:"URL"})," stays ",e.jsx(t.InlineCode,{children:"/profile"})," or"," ",e.jsx(t.InlineCode,{children:"/security"}),", but both share the same layout."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Multiple Layout Levels"}),e.jsx(t.Pre,{children:`function RootLayout() { return (<div><TopBar /><Outlet /></div>); }
function AdminLayout() { return (<div className="admin"><SideNav /><Outlet /></div>); }

<Routes>
  <Route element={<RootLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/pricing" element={<Pricing />} />

    {/* Nested layout under /admin */}
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminOverview />} />
      <Route path="users" element={<Users />} />
      <Route path="settings" element={<AdminSettings />} />
    </Route>
  </Route>
</Routes>`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"RootLayout"})," wraps the whole app; ",e.jsx("b",{children:"AdminLayout"})," wraps only the ",e.jsx("i",{children:"/admin"})," ","branch. Each layout renders its own ",e.jsx(t.InlineCode,{children:"<Outlet />"}),"."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Index Route vs. Child Path"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Index route"})," renders at the parent's path exactly (e.g., ",e.jsx("i",{children:"/admin"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Child path"})," renders at a subpath (e.g., ",e.jsx("i",{children:"/admin/users"}),")."]})]}),e.jsx(t.Pre,{children:`<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminOverview />} />       {/* /admin */}
  <Route path="users" element={<Users />} />        {/* /admin/users */}
</Route>`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Common Patterns"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Persistent chrome:"})," header/sidebar goes in the layout; inner pages in"," ",e.jsx(t.InlineCode,{children:"<Outlet />"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Guards at the layout level:"})," put auth/role checks in the layout so all children are protected; redirect if unauthorized."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pathless route for shared wrappers:"})," apply a wrapper (e.g., container, theme, analytics) to multiple unrelated paths without changing their URLs."]})]}),e.jsx(t.Pre,{children:`function ProtectedLayout() {
  const isAuthed = useAuth();
  if (!isAuthed) return <Navigate to="/login" replace />;
  return <Outlet />;
}

<Routes>
  <Route element={<ProtectedLayout />}>
    <Route path="/billing" element={<Billing />} />
    <Route path="/orders" element={<Orders />} />
  </Route>
</Routes>`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don’t"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," render exactly one ",e.jsx(t.InlineCode,{children:"<Outlet />"})," in a layout where children should appear."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(t.InlineCode,{children:"index"})," for a default page under a layout."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep ",e.jsx("i",{children:"layout"})," components focused on structure and orchestration (not page logic)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," nest ",e.jsx(t.InlineCode,{children:"<BrowserRouter>"})," inside layouts; the app should have a single router at the root."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," forget ",e.jsx(t.InlineCode,{children:"<Outlet />"}),"—without it, children will never render."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Element:"})," the React component associated with a route (",e.jsx(t.InlineCode,{children:"element={<Component />}"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Relative path:"})," a child route’s path appended to the parent’s path (e.g.,",e.jsx("i",{children:' "users"'})," under ",e.jsx("i",{children:'"/admin"'})," becomes ",e.jsx("i",{children:'"/admin/users"'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Navigate:"})," a component that performs imperative redirects in React Router."]})]})]}),e.jsxs(t.Callout,{children:[e.jsx("b",{children:"Summary:"})," Use layout routes to share persistent chrome and structure. Place"," ",e.jsx(t.InlineCode,{children:"<Outlet />"})," where children should mount, use"," ",e.jsx(t.InlineCode,{children:"index"})," for a default page, and apply guards/wrappers at the layout level for entire sections."]})]});export{i as default};
