import{j as e}from"./index-DUO2rjrc.js";import{S as n}from"./styled-BVnyC97j.js";const r=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Drawer (Slide-in Panel)"}),e.jsxs(n.Lead,{children:["A ",e.jsx("b",{children:"Drawer"})," is a panel that ",e.jsx("i",{children:"slides in"})," from an edge and can be dismissed. It should be ",e.jsx("b",{children:"controlled"})," with state (",e.jsx(n.InlineCode,{children:"isOpen"}),") and be",e.jsx("b",{children:" accessible"})," with focus management, keyboard support, and proper ARIA attributes."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Key Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Drawer:"})," A temporary panel that enters from an edge to show secondary content without navigating away."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Overlay (scrim):"})," A semi-transparent layer behind the panel that visually separates the drawer from the page and captures outside clicks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled component:"})," The open/close state is owned by React state and passed in as props (",e.jsx(n.InlineCode,{children:"isOpen"}),", ",e.jsx(n.InlineCode,{children:"onOpenChange"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus trap:"})," Keeps keyboard focus inside the drawer while it is open, so tabbing does not escape to the page behind."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ARIA labeling:"})," Use ",e.jsx(n.InlineCode,{children:'role="dialog"'}),", plus either"," ",e.jsx(n.InlineCode,{children:"aria-label"})," or ",e.jsx(n.InlineCode,{children:"aria-labelledby"})," ","(and optionally ",e.jsx(n.InlineCode,{children:"aria-describedby"}),") to describe the drawer to assistive tech."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scroll locking:"})," Prevent body scroll while the drawer is open to avoid background content shifting."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Anatomy"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Trigger:"})," Button or icon to open the drawer."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Root container:"})," An app-level container that renders overlay + panel."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Overlay:"})," Click to dismiss; covers the viewport."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Panel:"})," The sliding content area; contains header, content, and close control."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Close affordances:"}),' an explicit "Close" button, Esc key, and overlay click.']})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Controlled Pattern (recommended)"}),e.jsx(n.Pre,{children:`function useDrawer(initial = false) {
  const [isOpen, setOpen] = React.useState(initial);
  const open = React.useCallback(() => setOpen(true), []);
  const close = React.useCallback(() => setOpen(false), []);
  const toggle = React.useCallback(() => setOpen(o => !o), []);
  return { isOpen, open, close, toggle, setOpen };
}

function DrawerExample() {
  const { isOpen, open, close } = useDrawer();
  return (
    <>
      <button onClick={open} aria-haspopup="dialog" aria-expanded={isOpen}>
        Open Filters
      </button>
      <DrawerRoot isOpen={isOpen} onOpenChange={set => set ? open() : close()}>
        <DrawerOverlay onClick={close} />
        <DrawerPanel
          role="dialog"
          aria-modal="true"
          aria-labelledby="filters-title"
          aria-describedby="filters-desc"
        >
          <header>
            <h2 id="filters-title">Filters</h2>
            <p id="filters-desc">Refine the product list by category and price.</p>
            <button onClick={close} aria-label="Close">✕</button>
          </header>
          {/* content */}
        </DrawerPanel>
      </DrawerRoot>
    </>
  );
}`}),e.jsxs(n.Small,{children:["The component is controlled by ",e.jsx(n.InlineCode,{children:"isOpen"}),". The root renders overlay and panel."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Non-Portal Rendering (fits your preference)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["You prefer not to use portals. Render the drawer at the end of the app tree and ensure it visually overlays content using ",e.jsx(n.InlineCode,{children:"position: fixed"})," and a high"," ",e.jsx(n.InlineCode,{children:"z-index"}),"."]}),e.jsxs("li",{children:["Make sure background content becomes inert for screen readers. A practical approach is adding"," ",e.jsx(n.InlineCode,{children:'aria-hidden="true"'})," to the app container when the drawer is open (except the drawer subtree). Keep the DOM order logical for tabbing and reading order."]})]}),e.jsx(n.Pre,{children:`// Pseudocode styling idea (not the actual styled.js):
const DrawerRootStyle = {
  position: "fixed", inset: 0, display: "grid",
  gridTemplateAreas: "'overlay' 'panel'",
  zIndex: 50, // above app content
};

const DrawerOverlayStyle = {
  position: "fixed", inset: 0, background: "hsl(0 0% 0% / 0.5)"
};

const DrawerPanelStyle = {
  position: "fixed", top: 0, bottom: 0, right: 0, width: "min(420px, 90vw)",
  transform: "translateX(0)", transition: "transform 200ms ease",
  background: "var(--panel-bg)", outline: 0
};`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility Essentials"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Role & labeling:"})," Use ",e.jsx(n.InlineCode,{children:'role="dialog"'})," and label it with"," ",e.jsx(n.InlineCode,{children:"aria-label"})," or ",e.jsx(n.InlineCode,{children:"aria-labelledby"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Initial focus:"})," Move focus into the drawer on open (e.g., to the first interactive element or the drawer header)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus trap:"})," Keep focus within the drawer. On close, return focus to the trigger that opened it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keyboard support:"})," Esc closes; Tab cycles within; Shift+Tab reverses."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Announcements:"})," Dynamic changes (like filters applied) may need live region updates if not obvious."]})]}),e.jsx(n.Pre,{children:`// Initial focus & Esc handling (sketch)
function useDrawerA11y({ isOpen, onClose, panelRef, triggerRef }) {
  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement;
    const panel = panelRef.current;
    panel?.focus();

    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      // restore focus
      if (triggerRef.current) triggerRef.current.focus();
      else if (prev instanceof HTMLElement) prev.focus();
    };
  }, [isOpen, onClose, panelRef, triggerRef]);
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Scroll Locking"}),e.jsx(n.List,{children:e.jsxs("li",{children:["Prevent background scroll while open to avoid layout shifts. A simple approach is toggling"," ",e.jsx(n.InlineCode,{children:'document.body.style.overflow = "hidden"'})," on open and restoring it on close."]})}),e.jsx(n.Pre,{children:`function useScrollLock(active) {
  React.useEffect(() => {
    const { overflow } = document.body.style;
    if (active) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [active]);
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Placement & Sizing"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Placement:"})," right/left for navigation and filters; bottom for mobile actions; top for global banners."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Sizing:"})," fixed width (e.g., 360–480px) or responsive (e.g., ",e.jsx(n.InlineCode,{children:"min(420px, 90vw)"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Motion:"})," slide in/out with ",e.jsx(n.InlineCode,{children:"transform"})," transitions; avoid animating"," ",e.jsx(n.InlineCode,{children:"width"})," for performance."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Example: Simple Controlled Drawer (Non-Portal)"}),e.jsx(n.Pre,{children:`function SimpleDrawer() {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef(null);
  const panelRef = React.useRef(null);

  // a11y & scroll lock helpers
  useScrollLock(open);
  useDrawerA11y({ isOpen: open, onClose: () => setOpen(false), panelRef, triggerRef });

  return (
    <div data-app-root aria-hidden={open ? "true" : undefined}>
      <button ref={triggerRef} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
        Open Drawer
      </button>

      {open && (
        <>
          <div
            role="presentation"
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, background: "hsl(0 0% 0% / 0.5)" }}
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Sample drawer"
            tabIndex={-1}
            style={{
              position: "fixed", top: 0, bottom: 0, right: 0,
              width: "min(420px, 90vw)", background: "var(--panel-bg, #111)",
              transform: "translateX(0)", transition: "transform 200ms ease",
              outline: "none", padding: "16px", boxShadow: "0 0 0 1px hsl(0 0% 100% / 0.08)"
            }}
          >
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Filters</h2>
              <button onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </header>

            <div style={{ marginTop: 12 }}>
              {/* Drawer content */}
              <label>
                Category
                <select><option>All</option><option>Books</option><option>Electronics</option></select>
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}`}),e.jsxs(n.Small,{children:["This sketch demonstrates the core behavior. In your codebase, you'd style via"," ",e.jsx(n.InlineCode,{children:"styled-components"})," and reuse tokens."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common Interactions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Open via click/keyboard:"})," Trigger should be reachable by Tab and Enter/Space."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Close:"}),' via Esc, overlay click, or dedicated "Close" button.']}),e.jsxs("li",{children:[e.jsx("b",{children:"Route change:"})," auto-close on navigation so UI state matches the new page."]})]}),e.jsx(n.Pre,{children:`// Close on route change (example idea)
import { useLocation } from "react-router-dom";
function useCloseOnRouteChange(isOpen, close) {
  const location = useLocation();
  React.useEffect(() => { if (isOpen) close(); /* when pathname changes */ }, [location.pathname]);
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," manage it as a controlled component with a single source of truth."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," provide keyboard/ARIA support (Esc, focus trap, labeled dialog)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," lock background scroll while open."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," trap users by removing all visible ways to close."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," place essential, primary flows in drawers—keep them for secondary tasks."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Dialog:"})," An interactive UI layer that requires user attention; drawers are a type of dialog."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Modal:"})," Blocks interaction with the rest of the app until dismissed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Non-modal:"})," Allows interacting with other parts of the UI while open (drawers are usually modal)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Inert:"})," Background content that is temporarily made uninteractable and hidden to AT while a modal is open."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Portal:"})," Rendering children into a DOM node outside the parent hierarchy. Useful for stacking; you prefer avoiding it, so the examples stay non-portal."]})]})]}),e.jsx(n.Callout,{children:"Summary: A Drawer is a controlled, accessible, dismissible panel. Prioritize keyboard support, ARIA labeling, focus management, and scroll locking. Keep it secondary in your UX hierarchy."})]});export{r as default};
