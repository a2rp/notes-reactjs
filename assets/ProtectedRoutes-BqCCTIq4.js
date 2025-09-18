import{j as e}from"./index-BExKNf87.js";import{S as t}from"./styled-DvGndQe2.js";const i=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Protected Routes"}),e.jsxs(t.Lead,{children:["A ",e.jsx("b",{children:"Protected Route"})," is a route users can access ",e.jsx("i",{children:"only after"})," meeting a condition (usually being ",e.jsx("b",{children:"authenticated"}),", sometimes with specific ",e.jsx("b",{children:"roles/permissions"}),"). In React Router, protection is implemented with a tiny ",e.jsx("b",{children:"guard component"})," that decides whether to render the route content or ",e.jsx("b",{children:"redirect"})," to another page (e.g., ",e.jsx("i",{children:"Login"}),")."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Key Terms"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Authentication (AuthN):"})," verifying ",e.jsx("em",{children:"who"})," a user is (login)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Authorization (AuthZ):"})," verifying ",e.jsx("em",{children:"what"})," a user can do (roles/permissions)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Protected Route:"})," a route hidden behind a check (auth/role/feature flag)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Guard component:"})," a wrapper that runs the check and either renders children or redirects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Redirect:"})," sending the user to another route (e.g., from ",e.jsx("code",{children:"/dashboard"})," to ",e.jsx("code",{children:"/login"}),")."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx("code",{children:"<Outlet />"}),":"]})," placeholder that renders the matched child route inside a layout/guard."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx("code",{children:"useLocation()"}),":"]})," hook to read the current route (useful to remember “where user was”)."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx("code",{children:"<Navigate />"}),":"]})," element that performs the redirect in React Router."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Auth State (minimal example)"}),e.jsx(t.Pre,{children:`// src/context/AuthContext.js (example shape)
import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, role } or null
  const isAuthenticated = !!user;

  const login = (fakeUser) => setUser(fakeUser);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);`}),e.jsxs(t.Small,{children:["Any source of truth works (cookies, localStorage, server session). The guard only needs a reliable ",e.jsx("code",{children:"isAuthenticated"}),"."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Guard Component: ",e.jsx("code",{children:"RequireAuth"})]}),e.jsx(t.Pre,{children:`// src/routes/guards/RequireAuth.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login and remember where we came from
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // read this in Login to go back after success
      />
    );
  }
  return <Outlet />; // Render the protected child route(s)
}`}),e.jsxs(t.Small,{children:[e.jsxs("b",{children:["Why ",e.jsx("code",{children:"replace"}),"?"]})," It prevents stacking “/login” in history if guards run multiple times.",e.jsxs("b",{children:["Why ",e.jsx("code",{children:"state.from"}),"?"]})," So you can send users back to the page they originally wanted."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Router Wiring (Nested Protected Routes)"}),e.jsx(t.Pre,{children:`// src/AppRoutes.jsx (illustrative)
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./routes/guards/RequireAuth";
import Dashboard from "./pages/app/Dashboard";
import Settings from "./pages/app/Settings";
import Login from "./pages/auth/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />

      {/* All routes below require auth */}
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}`}),e.jsxs(t.Small,{children:["Place ",e.jsx("code",{children:"<RequireAuth />"})," above routes you want to protect; children render via ",e.jsx("code",{children:"<Outlet />"}),"."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Redirect Back After Login"}),e.jsx(t.Pre,{children:`// src/pages/auth/Login.jsx (snippet)
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  async function handleSubmit(e) {
    e.preventDefault();
    // ...validate, call API, receive user...
    login({ id: "1", name: "Ashish", role: "user" });
    navigate(from, { replace: true }); // go back to intent
  }

  return <form onSubmit={handleSubmit}>/* fields */</form>;
}`}),e.jsxs(t.Small,{children:["Read ",e.jsx("code",{children:"state.from"})," set by the guard and send the user back post-login."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Role-Based Guards (",e.jsx("code",{children:"RequireRole"}),")"]}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Role:"})," a label on the user (e.g., ",e.jsx("code",{children:'"admin"'}),", ",e.jsx("code",{children:'"manager"'}),", ",e.jsx("code",{children:'"user"'}),") that controls access."]}),e.jsxs("li",{children:[e.jsx("b",{children:"RBAC:"})," Role-Based Access Control—authorize by checking roles/permissions."]})]}),e.jsx(t.Pre,{children:`// src/routes/guards/RequireRole.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RequireRole({ allow = [] }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const ok = allow.includes(user?.role);
  return ok ? <Outlet /> : <Navigate to="/403" replace />;
}

// Router usage:
// <Route element={<RequireRole allow={["admin"]} />}>
//   <Route path="/admin" element={<AdminPanel />} />
// </Route>`}),e.jsxs(t.Small,{children:["For more granular control, check explicit permission flags instead of a single ",e.jsx("code",{children:"role"})," string."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Guest-Only Routes (",e.jsx("code",{children:"RequireGuest"}),")"]}),e.jsx(t.List,{children:e.jsxs("li",{children:[e.jsx("b",{children:"Guest route:"})," a route accessible only when ",e.jsx("em",{children:"not"})," authenticated (e.g., Login/Register)."]})}),e.jsx(t.Pre,{children:`// src/routes/guards/RequireGuest.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RequireGuest() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

// Usage:
// <Route element={<RequireGuest />}>
//   <Route path="/login" element={<Login />} />
//   <Route path="/register" element={<Register />} />
// </Route>`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Persisted Sessions & “Checking…” State"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["On refresh, you may need to ",e.jsx("b",{children:"restore"})," the session (e.g., verify a token) before deciding access."]}),e.jsxs("li",{children:["Wrap protected routes in a ",e.jsx("b",{children:"PersistLogin"})," component that shows a spinner while checking."]})]}),e.jsx(t.Pre,{children:`// src/routes/guards/PersistLogin.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PersistLogin() {
  const { isAuthenticated } = useAuth();
  const [checking, setChecking] = React.useState(true);

  React.useEffect(() => {
    // e.g., call /refresh or read cookie/localStorage
    (async () => {
      // await restoreSession();
      setChecking(false);
    })();
  }, []);

  if (checking) return <div>Checking session…</div>;
  return <Outlet />;
}

// Router nesting:
// <Route element={<PersistLogin />}>
//   <Route element={<RequireAuth />}>
//     <Route path="/dashboard" element={<Dashboard />} />
//   </Route>
// </Route>`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don’t"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep guards tiny and pure—just read auth state and return ",e.jsx("code",{children:"<Outlet />"})," or ",e.jsx("code",{children:"<Navigate />"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx("code",{children:"replace"})," on redirects to avoid history spam."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," preserve intent with ",e.jsx("code",{children:"state.from"})," and redirect back after login."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mutate the DOM or use ",e.jsx("code",{children:"window.location"})," for navigation—use React Router APIs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," fetch on every render inside guards. If needed, show a lightweight “checking session…” state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mix role checks and heavy data fetching inside the guard; keep responsibilities separate."]})]})]}),e.jsxs(t.Callout,{children:["Summary: Build a small ",e.jsx("b",{children:"RequireAuth"})," guard, nest protected routes under it, remember the user’s intent with ",e.jsx("code",{children:"state.from"}),", and use additional guards (",e.jsx("b",{children:"RequireRole"}),", ",e.jsx("b",{children:"RequireGuest"}),", ",e.jsx("b",{children:"PersistLogin"}),") for a complete, predictable routing experience."]})]});export{i as default};
