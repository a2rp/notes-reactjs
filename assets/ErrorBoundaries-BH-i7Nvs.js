import{j as r}from"./index-CDxhzYTb.js";import{S as e}from"./styled-BduBoJuN.js";const i=()=>r.jsxs(e.Page,{children:[r.jsx(e.Title,{children:"Error Boundaries"}),r.jsxs(e.Lead,{children:["An ",r.jsx("b",{children:"Error Boundary"})," is a special React component that ",r.jsx("i",{children:"catches JavaScript errors"}),"anywhere in its ",r.jsx("b",{children:"child component tree"})," during ",r.jsx("b",{children:"render"}),", in ",r.jsx("b",{children:"lifecycle methods"}),", and in ",r.jsx("b",{children:"constructors of child components"}),", then renders a ",r.jsx("b",{children:"fallback UI"})," instead of crashing the whole app. It can also ",r.jsx("b",{children:"log"})," the error for monitoring."]}),r.jsxs(e.Section,{children:[r.jsx(e.H2,{children:"Definition & Purpose"}),r.jsxs(e.List,{children:[r.jsxs("li",{children:[r.jsx("b",{children:"Error Boundary:"})," A class component implementing"," ",r.jsx(e.InlineCode,{children:"static getDerivedStateFromError"})," and/or"," ",r.jsx(e.InlineCode,{children:"componentDidCatch"})," to catch errors below it and show a fallback."]}),r.jsxs("li",{children:[r.jsx("b",{children:"Fallback UI:"})," A safe, friendly screen (e.g., “Something went wrong.”) that replaces the crashed subtree."]}),r.jsxs("li",{children:[r.jsx("b",{children:"Scope:"})," Boundaries only protect their ",r.jsx("i",{children:"descendants"}),". Wrap risky islands (charts, widgets, 3P components) so the rest of the page keeps working."]})]})]}),r.jsxs(e.Section,{children:[r.jsx(e.H2,{children:"What Error Boundaries Catch (and Don't)"}),r.jsxs(e.List,{children:[r.jsxs("li",{children:[r.jsx("b",{children:"Catches:"})," Errors thrown while ",r.jsx("i",{children:"rendering"})," a child, in a child's"," ",r.jsx("i",{children:"constructor"}),", or in a child's ",r.jsx("i",{children:"lifecycle"})," (class) / render phase (function)."]}),r.jsxs("li",{children:[r.jsx("b",{children:"Does NOT catch:"})," Errors in ",r.jsx("i",{children:"event handlers"}),", ",r.jsx("i",{children:"async"})," code (timers, promises), ",r.jsx("i",{children:"server-side rendering"})," errors, or ",r.jsx("i",{children:"outside React"})," (e.g., global script). Handle those with try/catch, promise ",r.jsx(e.InlineCode,{children:".catch"}),", or server error middleware."]})]}),r.jsxs(e.Small,{children:[r.jsx("b",{children:"Terms:"})," ",r.jsx("i",{children:"Render phase"})," = computing what to show; ",r.jsx("i",{children:"Commit phase"})," = applying to the DOM; ",r.jsx("i",{children:"Event handler"})," = user-initiated callback (click, keydown, etc.) which doesn't bubble to Error Boundaries."]})]}),r.jsxs(e.Section,{children:[r.jsx(e.H2,{children:"Minimal Error Boundary (Drop-in)"}),r.jsx(e.Pre,{children:`// A small, reusable boundary.
// Usage: <ErrorBoundary fallback={<Fallback />}> <Risky /> </ErrorBoundary>
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Switch to fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Optional: send to monitoring service
    if (typeof this.props.onError === "function") {
      this.props.onError(error, errorInfo);
    }
    this.setState({ errorInfo });
    // errorInfo.componentStack includes a readable stack of component names
  }

  render() {
    if (this.state.hasError) {
      // Render provided fallback or a default
      return this.props.fallback ?? (
        <div role="alert">
          <h3>Something went wrong.</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error?.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
`}),r.jsxs(e.Small,{children:[r.jsx("b",{children:"getDerivedStateFromError(error)"})," sets state to display the fallback.",r.jsx("br",{}),r.jsx("b",{children:"componentDidCatch(error, info)"})," is for side effects (logging, telemetry)."]})]}),r.jsxs(e.Section,{children:[r.jsx(e.H2,{children:"Basic Usage"}),r.jsx(e.Pre,{children:`function Fallback() {
  return (
    <div role="alert" style={{ padding: 16 }}>
      <h3>We hit a snag.</h3>
      <p>Try again or contact support if it persists.</p>
    </div>
  );
}

function ProblemChild() {
  // Simulate a render-time crash
  throw new Error("Render failed in ProblemChild");
  // return <div>OK</div>;
}

export default function Widget() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <ProblemChild />
    </ErrorBoundary>
  );
}`})]}),r.jsxs(e.Section,{children:[r.jsx(e.H2,{children:"Granularity & Placement"}),r.jsxs(e.List,{children:[r.jsxs("li",{children:["Wrap ",r.jsx("b",{children:"risky islands"})," (charts, maps, heavy widgets, 3rd-party) to contain failures."]}),r.jsxs("li",{children:["Use ",r.jsx("b",{children:"multiple boundaries"})," so one broken card doesn't take down the whole page."]})]}),r.jsx(e.Pre,{children:`function Page() {
  return (
    <>
      <Header />
      <main>
        <ErrorBoundary fallback={<CardFallback />}>
          <ChartCard />
        </ErrorBoundary>

        <ErrorBoundary fallback={<CardFallback />}>
          <CommentsCard />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}`})]}),r.jsxs(e.Section,{children:[r.jsx(e.H2,{children:"Resetting the Boundary"}),r.jsx(e.List,{children:r.jsxs("li",{children:["Boundaries don't auto-recover. To reset, change a ",r.jsx("b",{children:"key"})," on the boundary or manage a",r.jsx("b",{children:" reset token"})," in state (e.g., after “Try again”)."]})}),r.jsx(e.Pre,{children:`function ReloadableWidget() {
  const [resetKey, setResetKey] = React.useState(0);
  return (
    <div>
      <button onClick={() => setResetKey(k => k + 1)}>Try again</button>
      <ErrorBoundary key={resetKey} fallback={<Fallback />}>
        <RiskyWidget />
      </ErrorBoundary>
    </div>
  );
}`})]}),r.jsxs(e.Section,{children:[r.jsxs(e.H2,{children:["Escalating ",r.jsx("i",{children:"Data Errors"})," to a Boundary"]}),r.jsx(e.List,{children:r.jsxs("li",{children:["Async fetch errors aren't caught automatically. Catch them and ",r.jsx("b",{children:"throw during render"})," ","to let the nearest boundary show its fallback."]})}),r.jsx(e.Pre,{children:`function UserPanel({ id }) {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let on = true;
    fetch("/api/users/" + id)
      .then(r => r.ok ? r.json() : Promise.reject(new Error("HTTP " + r.status)))
      .then(data => { if (on) setUser(data); })
      .catch(err => { if (on) setError(err); });
    return () => { on = false; };
  }, [id]);

  if (error) throw error;     // <-- escalates to nearest ErrorBoundary
  if (!user) return <Spinner />;
  return <ProfileCard user={user} />;
}`}),r.jsxs(e.Small,{children:[r.jsx("b",{children:"Pattern:"})," keep ",r.jsx(e.InlineCode,{children:"error"})," in state; if present,",r.jsx(e.InlineCode,{children:"throw error"})," during render. The boundary handles UI; you keep logic local."]})]}),r.jsxs(e.Section,{children:[r.jsx(e.H2,{children:"Event Handler Errors (Not Caught)"}),r.jsx(e.List,{children:r.jsxs("li",{children:["Use ",r.jsx("b",{children:"try/catch"})," inside handlers, or set an error state and render a controlled fallback."]})}),r.jsx(e.Pre,{children:`function SaveButton() {
  const [error, setError] = React.useState(null);

  async function onClick() {
    try {
      await saveData();
      // toast.success("Saved");
    } catch (e) {
      setError(e);               // or toast.error(e.message)
    }
  }

  if (error) return <InlineError message={error.message} />;
  return <button onClick={onClick}>Save</button>;
}`})]}),r.jsxs(e.Section,{children:[r.jsx(e.H2,{children:"Logging & Monitoring"}),r.jsxs(e.List,{children:[r.jsxs("li",{children:["Send ",r.jsx(e.InlineCode,{children:"error"})," and"," ",r.jsx(e.InlineCode,{children:"errorInfo.componentStack"})," to a service (Sentry, LogRocket, Rollbar) inside ",r.jsx(e.InlineCode,{children:"componentDidCatch"}),"."]}),r.jsxs("li",{children:["Include ",r.jsx("b",{children:"user/session"})," context and ",r.jsx("b",{children:"app version"})," to group issues and track regressions."]})]}),r.jsx(e.Pre,{children:`function reportError(error, info) {
  // Example stub: wire to your telemetry here
  console.log("[reportError]", error.message, info?.componentStack);
}

// <ErrorBoundary onError={reportError} fallback={<Fallback />}>...</ErrorBoundary>
`})]}),r.jsxs(e.Section,{children:[r.jsx(e.H2,{children:"Do & Don't"}),r.jsxs(e.List,{children:[r.jsxs("li",{children:[r.jsx("b",{children:"Do"})," place boundaries around risky, isolated UI islands."]}),r.jsxs("li",{children:[r.jsx("b",{children:"Do"})," offer recovery (retry button) by resetting the boundary."]}),r.jsxs("li",{children:[r.jsx("b",{children:"Do"})," log errors with component stacks for debugging."]}),r.jsxs("li",{children:[r.jsx("b",{children:"Don't"})," expect boundaries to catch handler/async/server errors—handle those directly."]}),r.jsxs("li",{children:[r.jsx("b",{children:"Don't"})," swallow errors silently; always surface a helpful message."]})]})]}),r.jsxs(e.Section,{children:[r.jsx(e.H2,{children:"Glossary"}),r.jsxs(e.List,{children:[r.jsxs("li",{children:[r.jsx("b",{children:"Fallback UI:"})," Replacement UI shown when a subtree errors."]}),r.jsxs("li",{children:[r.jsx("b",{children:"Component stack:"})," Pretty-printed list of components involved when the error occurred."]}),r.jsxs("li",{children:[r.jsx("b",{children:"Boundary scope:"})," The child subtree protected by the boundary."]}),r.jsxs("li",{children:[r.jsx("b",{children:"Resetting:"})," Forcing the boundary to re-mount (e.g., by changing its key)."]})]})]}),r.jsx(e.Callout,{children:"Summary: Error Boundaries protect users from blank screens, keep unaffected UI alive, and give you a place to log and recover. Use several small boundaries, provide a friendly fallback, and wire up monitoring."})]});export{i as default};
