import{j as e}from"./index-Der9nZEc.js";import{S as t}from"./styled-CzXY6NXN.js";const i=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Router Tests"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"Goal:"})," Verify that your UI renders the ",e.jsx("i",{children:"right screens"})," for a URL,",e.jsx("i",{children:"navigates"})," on user actions, and ",e.jsx("i",{children:"guards"})," private pages. We'll use"," ",e.jsx(t.InlineCode,{children:"@testing-library/react"})," with a"," ",e.jsx(t.InlineCode,{children:"MemoryRouter"}),"."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Key Terms (Router Testing)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Router:"})," The system that matches the current URL to a component tree."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Route:"})," A URL pattern (e.g., ",e.jsx(t.InlineCode,{children:'"/users/:id"'}),") mapped to a UI element."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MemoryRouter:"})," A router that keeps history in memory (ideal for tests). Configure start URLs using ",e.jsx(t.InlineCode,{children:"initialEntries"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"initialEntries:"})," An array of starting locations for ",e.jsx(t.InlineCode,{children:"MemoryRouter"})," (e.g., ",e.jsx(t.InlineCode,{children:'["/login"]'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Navigate:"})," A component that redirects (e.g., to ",e.jsx(t.InlineCode,{children:'"/login"'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Outlet:"})," Placeholder where ",e.jsx("em",{children:"child route"})," elements render inside a layout route."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useParams:"})," Hook to read dynamic segments like ",e.jsx(t.InlineCode,{children:":id"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useSearchParams:"})," Hook to read/write query string (e.g., ",e.jsx(t.InlineCode,{children:"?q=react"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Location state:"})," Arbitrary state passed via navigation (e.g., ",e.jsx(t.InlineCode,{children:'<Link to="/details" state={{ from: "home" }}/>'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Screen queries:"})," Testing Library functions (e.g., ",e.jsx(t.InlineCode,{children:"screen.getByRole"}),") to assert what the user sees."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Minimal Setup for Router Tests"}),e.jsx(t.Pre,{children:`// __tests__/router/minimal.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <h1>Home</h1>
      <Link to="/about">About</Link>
    </main>
  );
}
function About() { return <h1>About</h1>; }

test("renders Home on '/' and navigates to About", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </MemoryRouter>
  );

  // Assert initial route
  expect(screen.getByRole("heading", { name: /home/i })).toBeInTheDocument();

  // Navigate by clicking the link
  await screen.findByRole("link", { name: /about/i }).then((link) => link.click());

  // Now the About page should be visible
  expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();
});`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Why MemoryRouter?"})," It lets you simulate URLs without affecting the browser.",e.jsx("b",{children:"Why role-based queries?"})," They mirror how assistive tech identifies elements."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Testing Route Params with ",e.jsx("code",{children:"useParams"})]}),e.jsx(t.Pre,{children:`// __tests__/router/params.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useParams } from "react-router-dom";

function User() {
  const { id } = useParams();        // read ":id"
  return <h1>User #{id}</h1>;
}

test("reads :id from the URL", () => {
  render(
    <MemoryRouter initialEntries={["/users/42"]}>
      <Routes>
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: /user #42/i })).toBeInTheDocument();
});`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Definition:"})," ",e.jsx(t.InlineCode,{children:"useParams()"})," returns an object mapping route tokens (e.g., ",e.jsx(t.InlineCode,{children:":id"}),") to strings."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Testing Search Params with ",e.jsx("code",{children:"useSearchParams"})]}),e.jsx(t.Pre,{children:`// __tests__/router/search-params.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useSearchParams } from "react-router-dom";

function Search() {
  const [params] = useSearchParams();         // read query string
  const q = params.get("q") ?? "";
  return <h1>Results for "{q}"</h1>;
}

test("reads ?q= from the URL", () => {
  render(
    <MemoryRouter initialEntries={["/search?q=react"]}>
      <Routes>
        <Route path="/search" element={<Search />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: /results for "react"/i })).toBeInTheDocument();
});`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Definition:"})," ",e.jsx(t.InlineCode,{children:"useSearchParams()"})," is URLSearchParams backed by the router."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Testing Redirects with ",e.jsx("code",{children:"<Navigate />"})]}),e.jsx(t.Pre,{children:`// __tests__/router/redirects.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Navigate } from "react-router-dom";

function Protected({ isAuthed }) {
  if (!isAuthed) return <Navigate to="/login" replace />;
  return <h1>Dashboard</h1>;
}
function Login() { return <h1>Login</h1>; }

test("redirects unauthenticated users to /login", () => {
  render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <Routes>
        <Route path="/dashboard" element={<Protected isAuthed={false} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
});`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Definition:"})," ",e.jsx(t.InlineCode,{children:"Navigate"})," imperatively changes the current location (a redirect). ",e.jsx(t.InlineCode,{children:"replace"})," avoids adding an extra history entry."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Testing Protected Routes with Context"}),e.jsx(t.Pre,{children:`// __tests__/router/protected-context.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

const AuthCtx = React.createContext({ isAuthed: false });

function RequireAuth({ children }) {
  const { isAuthed } = React.useContext(AuthCtx);
  return isAuthed ? children : <Navigate to="/login" replace />;
}

function Dashboard() { return <h1>Dashboard</h1>; }
function Login() { return <h1>Login</h1>; }

function withAuth(ui, value) {
  return <AuthCtx.Provider value={value}>{ui}</AuthCtx.Provider>;
}

test("shows Dashboard when authed, else Login", () => {
  // Unauthed -> Login
  const unauth = withAuth(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <Routes>
        <Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </MemoryRouter>,
    { isAuthed: false }
  );
  render(unauth);
  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();

  // Authed -> Dashboard
  const authed = withAuth(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <Routes>
        <Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </MemoryRouter>,
    { isAuthed: true }
  );
  render(authed);
  expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
});`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Why Context?"})," It mirrors your app's real auth provider so tests stay realistic."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Testing 404 (Catch-all Route)"}),e.jsx(t.Pre,{children:`// __tests__/router/not-found.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

function NotFound() { return <h1>404 - Not Found</h1>; }

test("unknown paths render NotFound", () => {
  render(
    <MemoryRouter initialEntries={["/does-not-exist"]}>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: /404 - not found/i })).toBeInTheDocument();
});`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Definition:"})," The ",e.jsx(t.InlineCode,{children:'"*"'})," path matches anything not handled by earlier routes."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Testing Location State"}),e.jsx(t.Pre,{children:`// __tests__/router/location-state.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Link, useLocation } from "react-router-dom";

function Home() {
  return (
    <Link to="/details" state={{ from: "home" }}>
      Go to details
    </Link>
  );
}
function Details() {
  const { state } = useLocation();   // { from: "home" }
  return <h1>Details from: {state?.from}</h1>;
}

test("passes location state via Link", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </MemoryRouter>
  );

  screen.getByRole("link", { name: /go to details/i }).click();
  expect(screen.getByRole("heading", { name: /details from: home/i })).toBeInTheDocument();
});`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Definition:"})," ",e.jsx(t.InlineCode,{children:"useLocation()"})," exposes"," ",e.jsx(t.InlineCode,{children:"location.state"})," set by navigation."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Nested Routes & ",e.jsx("code",{children:"<Outlet />"})]}),e.jsx(t.Pre,{children:`// __tests__/router/nested-outlet.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav><Link to="/app/profile">Profile</Link></nav>
      <Outlet />
    </div>
  );
}
function Dashboard() { return <h1>Dashboard</h1>; }
function Profile() { return <h1>Profile</h1>; }

test("renders child route inside Outlet", () => {
  render(
    <MemoryRouter initialEntries={["/app"]}>
      <Routes>
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  // Index route at /app
  expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();

  // Navigate to child route
  screen.getByRole("link", { name: /profile/i }).click();
  expect(screen.getByRole("heading", { name: /profile/i })).toBeInTheDocument();
});`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Definition:"})," ",e.jsx(t.InlineCode,{children:"Outlet"})," renders the matched child route's element inside a layout."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(t.InlineCode,{children:"MemoryRouter"})," with ",e.jsx(t.InlineCode,{children:"initialEntries"})," to control the starting URL."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," assert by ",e.jsx("b",{children:"visible UI"})," (headings, links, buttons) - not internals."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," test both happy paths (authed) and edge paths (redirects, 404)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mock router hooks unless necessary - prefer real routing via ",e.jsx(t.InlineCode,{children:"MemoryRouter"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," tie tests to implementation details (e.g., specific component names)."]})]})]}),e.jsx(t.Callout,{children:"Summary: Treat the router as the user does - by URL and clicks. Use MemoryRouter to start at any path, assert the rendered screen, and verify redirects, params, search params, 404s, and nested layouts. That's reliable, maintainable router testing."})]});export{i as default};
