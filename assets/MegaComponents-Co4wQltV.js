import{j as e}from"./index-BRArnZ3i.js";import{S as t}from"./styled-7VbwKvaZ.js";const i=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Anti-Pattern: Mega Components"}),e.jsxs(t.Lead,{children:["A ",e.jsx("b",{children:"mega component"})," is a single React component that tries to do “everything” — too many responsibilities, too many states, and too much markup. It becomes hard to read, test, reuse, and change without breaking things."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"What is a Mega Component?"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Definition:"})," A component that ",e.jsx("em",{children:"combines multiple responsibilities"})," (data fetching, business logic, state machines, layout, and rendering) into one large file."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why it's a problem:"})," It increases ",e.jsx("i",{children:"cognitive load"})," (hard to understand), introduces ",e.jsx("i",{children:"change risk"})," (one change breaks another), and blocks ",e.jsx("i",{children:"reuse"})," and"," ",e.jsx("i",{children:"testing"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Single Responsibility Principle (SRP):"})," Each component should have one clear reason to change. If a file changes for many reasons, it's a smell."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Smell Checklist (quick self-check)"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"File length > 300-400 lines; nested JSX is hard to fit on screen."}),e.jsxs("li",{children:["Too many ",e.jsx(t.InlineCode,{children:"useState"})," / ",e.jsx(t.InlineCode,{children:"useEffect"})," hooks managing unrelated concerns."]}),e.jsxs("li",{children:["Component both ",e.jsx("b",{children:"fetches data"})," and ",e.jsx("b",{children:"renders complex UI"})," and ",e.jsx("b",{children:"handles global app state"}),"."]}),e.jsx("li",{children:"Prop list keeps growing; you pass the same props deep down many layers."}),e.jsx("li",{children:"Small changes require editing multiple distant parts of the same file."})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example: A Mega Dashboard Component (Anti-Pattern)"}),e.jsx(t.Pre,{children:`function Dashboard() {
  // 1) Fetching, error, loading
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [stats, setStats] = React.useState(null);

  // 2) Local UI state
  const [filter, setFilter] = React.useState("");
  const [tab, setTab] = React.useState("overview");
  const [modalOpen, setModalOpen] = React.useState(false);

  // 3) Effects for fetching + subscriptions
  React.useEffect(() => {
    let cancel = false;
    setLoading(true);
    fetch("/api/stats")
      .then(r => r.json())
      .then(data => { if (!cancel) { setStats(data); setLoading(false); }})
      .catch(err => { if (!cancel) { setError(err); setLoading(false); }});
    // pretend we also attach window listeners here...
    return () => { cancel = true; /* remove listeners */ };
  }, []);

  // 4) Huge render tree
  if (loading) return <Spinner/>;
  if (error) return <div role="alert">Failed to load</div>;

  return (
    <div className="dashboard">
      <header>
        <input
          placeholder="Filter…"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <nav>
          <button onClick={() => setTab("overview")}>Overview</button>
          <button onClick={() => setTab("reports")}>Reports</button>
          <button onClick={() => setTab("settings")}>Settings</button>
        </nav>
        <button onClick={() => setModalOpen(true)}>New report</button>
      </header>

      {tab === "overview" && (
        <section className="cards">
          {/* 100+ lines of cards, charts, tables… */}
        </section>
      )}
      {tab === "reports" && (
        <section className="reports">
          {/* 100+ lines of reports list, pagination, actions… */}
        </section>
      )}
      {tab === "settings" && (
        <section className="settings">
          {/* 100+ lines of forms, toggles, validation… */}
        </section>
      )}

      {modalOpen && (
        <div className="modal">
          {/* 100+ lines of complex form… */}
          <button onClick={() => setModalOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}`}),e.jsx(t.Small,{children:"One file is doing fetching, global layout, filter logic, tab system, modal, and large render trees. Hard to test and reuse."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Refactor Strategy (step by step)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Extract UI pieces"})," into small presentational components (pure props in, JSX out)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Extract stateful logic"})," into ",e.jsx(t.InlineCode,{children:"custom hooks"})," ","(",e.jsx("i",{children:"data fetching"}),", ",e.jsx("i",{children:"filters"}),", ",e.jsx("i",{children:"tabs"}),", ",e.jsx("i",{children:"modal"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Introduce composition"}),": the parent orchestrates; children render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Add boundaries"}),": separate data layer (hooks) from view layer (components)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Co-locate"})," state with the component that truly owns it; lift only when required."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example: Split into Hooks + Components"}),e.jsx(t.Pre,{children:`// 1) Logic hooks (reusable, testable)
function useStats() {
  const [state, set] = React.useState({ status: "loading", data: null, error: null });
  React.useEffect(() => {
    let cancel = false;
    fetch("/api/stats")
      .then(r => r.json())
      .then(data => !cancel && set({ status: "success", data, error: null }))
      .catch(error => !cancel && set({ status: "error", data: null, error }));
    return () => { cancel = true; };
  }, []);
  return state; // {status, data, error}
}

function useTabs(initial = "overview") {
  const [tab, setTab] = React.useState(initial);
  return { tab, setTab };
}

function useModal(initial = false) {
  const [open, setOpen] = React.useState(initial);
  return { open, openModal: () => setOpen(true), closeModal: () => setOpen(false) };
}

// 2) Presentational pieces (small, focused)
function Header({ filter, onFilter, tab, setTab, onNew }) {
  return (
    <header>
      <input placeholder="Filter…" value={filter} onChange={e => onFilter(e.target.value)} />
      <nav>
        <button onClick={() => setTab("overview")} aria-pressed={tab==="overview"}>Overview</button>
        <button onClick={() => setTab("reports")} aria-pressed={tab==="reports"}>Reports</button>
        <button onClick={() => setTab("settings")} aria-pressed={tab==="settings"}>Settings</button>
      </nav>
      <button onClick={onNew}>New report</button>
    </header>
  );
}

function Overview({ stats, filter }) { /* small chunks here */ return <section>…</section>; }
function Reports({ filter }) { return <section>…</section>; }
function Settings() { return <section>…</section>; }

// 3) Orchestrator (thin)
function Dashboard() {
  const stats = useStats();
  const { tab, setTab } = useTabs();
  const modal = useModal();
  const [filter, setFilter] = React.useState("");

  if (stats.status === "loading") return <Spinner/>;
  if (stats.status === "error") return <div role="alert">Failed to load</div>;

  return (
    <div className="dashboard">
      <Header
        filter={filter}
        onFilter={setFilter}
        tab={tab}
        setTab={setTab}
        onNew={modal.openModal}
      />

      {tab === "overview" && <Overview stats={stats.data} filter={filter} />}
      {tab === "reports" && <Reports filter={filter} />}
      {tab === "settings" && <Settings />}

      {modal.open && (
        <Modal onClose={modal.closeModal}>
          {/* small, scoped form component */}
          <NewReportForm onSuccess={modal.closeModal} />
        </Modal>
      )}
    </div>
  );
}`}),e.jsxs(t.Small,{children:["Notice how logic moved to hooks (",e.jsx("code",{children:"useStats"}),", ",e.jsx("code",{children:"useTabs"}),","," ",e.jsx("code",{children:"useModal"}),") and rendering is split into small components. Each piece now has one job."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Good Patterns to Prefer"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Container / Presentational"}),": a container orchestrates data; presentational components focus on markup."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Custom Hooks"}),": package stateful logic, side effects, and APIs (",e.jsx("i",{children:"fetching, tabs, modal"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Compound Components"}),": build a small “API surface” of subcomponents that work together."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Context (scoped)"}),": pass shared state where needed, but keep contexts ",e.jsx("i",{children:"narrow"})," to avoid re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Feature folders"}),": group related files (",e.jsx("i",{children:"hooks, UI, tests"}),") per feature to keep boundaries clear."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," split by responsibility: data, state, view."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," move reusable logic into hooks; move reusable UI into small components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep components short and named clearly (one purpose)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," keep adding “just one more” concern to the same file."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," export a grab-bag of unrelated callbacks and states from a single component."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Single Responsibility Principle (SRP):"})," A unit should have one reason to change."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Presentational Component:"})," Focuses on UI; receives data via props; usually stateless or with minimal local state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Container Component:"})," Orchestrates data fetching, state, and wiring; renders presentational components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Custom Hook:"})," A function beginning with ",e.jsx(t.InlineCode,{children:"use"})," that encapsulates reusable stateful logic."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Composition:"})," Building complex UIs by combining small, focused parts."]})]})]}),e.jsxs(t.Callout,{children:[e.jsx("b",{children:"Takeaway:"})," When a component grows beyond a single responsibility, split logic into custom hooks, move UI into smaller components, and keep the orchestrator thin. Future you (and your teammates) will thank you."]})]});export{i as default};
