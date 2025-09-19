import{j as e}from"./index-CAccbg1x.js";import{S as i}from"./styled-etCu7VF7.js";const l=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Modal (Reusable Component)"}),e.jsxs(i.Lead,{children:["A ",e.jsx("b",{children:"modal"})," is a UI surface that appears on top of the app and",e.jsx("i",{children:" requires "})," the user to interact with it before returning to the underlying content. In HTML semantics, a modal is a ",e.jsx("b",{children:"dialog"}),". It must be ",e.jsx("b",{children:"accessible"}),", trap focus while open, and return focus to the trigger when closed."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Key Terms (Clear Definitions)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Dialog:"})," A surface for short, focused tasks or messages. In ARIA, the dialog role is ",e.jsx(i.InlineCode,{children:'role="dialog"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Modal:"})," A dialog that blocks interaction with the rest of the page until it's dismissed (",e.jsx(i.InlineCode,{children:'aria-modal="true"'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Backdrop / Overlay:"})," The dimmed layer behind the dialog that visually separates it and intercepts clicks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus Trap:"})," The requirement that keyboard focus stays inside the dialog while it is open (Tab / Shift+Tab cycle)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Labelling:"})," A programmatic title and description for assistive tech via ",e.jsx(i.InlineCode,{children:"aria-labelledby"})," and"," ",e.jsx(i.InlineCode,{children:"aria-describedby"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Initial Focus:"})," The element that receives focus when the modal opens (e.g., the dialog itself or the first interactive control)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus Return:"})," When the modal closes, focus should return to the button (trigger) that opened it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scroll Lock:"})," Prevent the background page from scrolling while the modal is open (commonly via"," ",e.jsx(i.InlineCode,{children:'document.body.style.overflow = "hidden"'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stacking Context:"})," A browser concept that affects layering and"," ",e.jsx(i.InlineCode,{children:"z-index"}),"; ensure the modal sits above other content."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Minimal Anatomy (Non-Portal Example)"}),e.jsx(i.Pre,{children:`function ModalExample() {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef(null);
  const dialogRef = React.useRef(null);
  const titleId = "modal-title";
  const descId = "modal-desc";

  function openModal() {
    triggerRef.current = document.activeElement;
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
    // Return focus to trigger
    triggerRef.current?.focus?.();
  }

  // Initial focus + basic focus trap (Tab / Shift+Tab)
  React.useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Initial focus
    const focusables = dialog.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    (focusables[0] || dialog).focus();

    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeModal();
        return;
      }
      if (e.key === "Tab") {
        const list = Array.from(focusables);
        if (list.length === 0) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // Scroll lock

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = prevOverflow; // Restore scroll
    };
  }, [open]);

  return (
    <div>
      <button onClick={openModal}>Open modal</button>

      {open && (
        <div
          aria-hidden="false"
          style={{
            position: "fixed", inset: 0, display: "grid",
            placeItems: "center", zIndex: 1000
          }}
        >
          {/* Backdrop */}
          <div
            onClick={closeModal}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.5)"
            }}
          />

          {/* Dialog */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            ref={dialogRef}
            style={{
              position: "relative",
              maxWidth: 520, width: "90%",
              background: "white",
              padding: "1rem",
              borderRadius: 12,
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
            }}
          >
            <h2 id={titleId}>Confirm action</h2>
            <p id={descId}>Are you sure you want to proceed?</p>

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button onClick={closeModal}>Cancel</button>
              <button onClick={() => { /* do action */ closeModal(); }}>
                Confirm
              </button>
            </div>

            {/* Close (X) button */}
            <button
              onClick={closeModal}
              aria-label="Close"
              style={{ position: "absolute", top: 8, right: 8 }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`}),e.jsxs(i.Small,{children:["This is a teaching example: focuses on semantics + keyboard behavior without any styling library. In your real component library, you'll tie this to your design tokens and shared ",e.jsx(i.InlineCode,{children:"Styled"})," primitives."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Accessibility Checklist"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use"})," ",e.jsx(i.InlineCode,{children:'role="dialog"'})," ","+ ",e.jsx(i.InlineCode,{children:'aria-modal="true"'}),"."]}),e.jsxs("li",{children:["Provide a programmatic ",e.jsx("b",{children:"label"})," and ",e.jsx("b",{children:"description"})," via"," ",e.jsx(i.InlineCode,{children:"aria-labelledby"})," /"," ",e.jsx(i.InlineCode,{children:"aria-describedby"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Trap focus"})," while open and ",e.jsx("b",{children:"return focus"})," to the trigger when closed."]}),e.jsxs("li",{children:["Support ",e.jsx("b",{children:"Escape"})," to close and an obvious ",e.jsx("b",{children:"Close"})," button."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scroll lock"})," the background and prevent content shifting (consider scrollbar compensation)."]}),e.jsx("li",{children:"Keep reading order logical (title → content → actions)."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Common Patterns & Variants"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Alert Dialog:"})," a modal that interrupts the app for critical decisions. Ensure focused, clear copy and a safe default action."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Form Dialog:"})," short forms with a clear primary action. Validate inline."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Blocking vs Non-blocking:"})," true modals block the page; lightweight panels can be non-modal (see Drawer/Popover)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Non-portal vs Portal:"})," you prefer non-portal. If stacking conflicts arise, consider a single top-level modal root. Portals can simplify layering but require care for focus management and CSS containment."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep content short and focused; long flows deserve a dedicated page."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use descriptive button texts (e.g., “Delete file” instead of “OK”)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prevent background scroll and ensure focus trap works on all browsers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," hide important information only inside the modal title; repeat key info in body text."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," place destructive actions too close to dismiss; separate and emphasize safely."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"API Design Tips (for your component lib)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Provide both ",e.jsx("b",{children:"controlled"})," (",e.jsx(i.InlineCode,{children:"open"}),"/"," ",e.jsx(i.InlineCode,{children:"onOpenChange"}),") and ",e.jsx("b",{children:"uncontrolled"})," modes."]}),e.jsxs("li",{children:["Accept ",e.jsx(i.InlineCode,{children:"initialFocusRef"}),","," ",e.jsx(i.InlineCode,{children:"returnFocus"}),", and"," ",e.jsx(i.InlineCode,{children:"closeOnOverlayClick"})," props."]}),e.jsxs("li",{children:["Compose with subcomponents:"," ",e.jsx(i.InlineCode,{children:"<Modal><Modal.Overlay/><Modal.Content/><Modal.Title/><Modal.Description/><Modal.Close/></Modal>"}),"."]}),e.jsx("li",{children:"Provide sensible defaults that match your tokens (spacing, radius, shadows)."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Testing Notes"}),e.jsxs(i.List,{children:[e.jsx("li",{children:"Assert that focus moves inside on open and returns to trigger on close."}),e.jsx("li",{children:"Pressing Escape calls the close handler and removes content from the DOM."}),e.jsx("li",{children:"Overlay click closes the modal if your UX requires it (and it isn't an alert dialog)."}),e.jsx("li",{children:"Snapshot test the open/closed states and verify aria attributes."})]})]}),e.jsxs(i.Callout,{children:["Summary: A modal is more than a box with a backdrop. It's a ",e.jsx("b",{children:"focus-managed, accessible"})," dialog with keyboard support, clear labelling, scroll lock, and predictable close behavior. Get the fundamentals right and the rest is styling."]})]});export{l as default};
