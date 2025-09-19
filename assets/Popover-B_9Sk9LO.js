import{j as e}from"./index-CAccbg1x.js";import{S as i}from"./styled-etCu7VF7.js";const t=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Popover"}),e.jsxs(i.Lead,{children:["A ",e.jsx("b",{children:"popover"})," is a small, contextual panel that appears on user action (click/press) and contains ",e.jsx("i",{children:"interactive content"}),"—buttons, links, inputs, or short forms. It is different from a ",e.jsx("b",{children:"tooltip"})," (which is passive text, usually on hover/focus) and from a ",e.jsx("b",{children:"dropdown menu"}),"(which is a list of options/commands). Think “mini card with actions,” anchored to a trigger."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Definitions"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Trigger:"})," the UI element that opens the popover (e.g., a button). It controls the",e.jsx("i",{children:"open/close"})," state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Anchor:"})," the reference rectangle (usually the trigger) used to position the popover."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Placement:"})," where the popover appears relative to the anchor (top, bottom, left, right, with start/end alignment)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dismissal:"})," how the popover closes—pressing Escape, clicking outside, blurring focus, selecting an action, or programmatically."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus containment:"})," keeping keyboard focus inside the popover while it's open, then returning focus to the trigger when it closes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ARIA attributes:"})," attributes that connect trigger ↔ panel and announce semantics to assistive tech, e.g. ",e.jsx(i.InlineCode,{children:'aria-haspopup="dialog"'}),", ",e.jsx(i.InlineCode,{children:"aria-controls"}),",",e.jsx(i.InlineCode,{children:"aria-expanded"}),", and a labelled panel region."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"When to Use / When Not to Use"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use"})," for short, contextual tasks (quick filters, tiny forms, confirmations, link lists)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use"})," when the content needs interaction (buttons, inputs). If it's just explanatory text, use a tooltip."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't use"})," for long or critical flows (multi-step forms) — prefer a modal dialog or a dedicated page."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't use"})," if the panel risks being clipped by scrolling containers; consider layout changes or an inline modal pattern."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Anatomy"}),e.jsx(i.Pre,{children:`// Trigger (button) + Popover (panel)
// Notes: We avoid portals. Ensure the popover is NOT inside a container that clips overflow.
function ExamplePopover() {
  // state: open/close
  // handlers: onOpen, onClose, onToggle, onKeyDown (Escape), onClickOutside
  // positioning: compute top/left from trigger.getBoundingClientRect()
}`}),e.jsx(i.Small,{children:"Keep the popover next to the trigger in the DOM to simplify keyboard and focus management— but watch out for clipping and stacking context."})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Accessibility Essentials"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Trigger"}),": a ",e.jsx(i.InlineCode,{children:"<button>"})," with"," ",e.jsx(i.InlineCode,{children:'aria-haspopup="dialog"'})," (or ",e.jsx(i.InlineCode,{children:"menu"}),"),",e.jsx(i.InlineCode,{children:"aria-expanded"})," (true/false), and"," ",e.jsx(i.InlineCode,{children:"aria-controls"})," pointing to the panel id."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Panel"}),": treat as a small dialog: give it a role (",e.jsx(i.InlineCode,{children:'role="dialog"'}),"), a label (",e.jsx(i.InlineCode,{children:"aria-label"})," or ",e.jsx(i.InlineCode,{children:"aria-labelledby"}),"), and make it focusable (focus the first interactive element or panel itself on open)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus return"}),": when closing, move focus back to the trigger to avoid focus loss."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Escape to close"})," and ",e.jsx("b",{children:"click outside to close"})," for predictable dismissal."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Patterns: State & API Design"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Controlled vs Uncontrolled:"})," expose ",e.jsx("i",{children:"open"})," and ",e.jsx("i",{children:"onOpenChange"})," when reusing as a library component; keep internal state for simple local use."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stable handlers:"})," memoize callbacks passed to deep children to avoid re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Aria wiring:"})," keep ",e.jsx(i.InlineCode,{children:"id"})," stable for ",e.jsx(i.InlineCode,{children:"aria-controls"}),"."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Example: Minimal Popover Skeleton (Notes)"}),e.jsx(i.Pre,{children:`function PopoverSkeleton() {
  // Imagine:
  // const [open, setOpen] = React.useState(false);
  // const triggerRef = React.useRef(null);
  // const panelRef = React.useRef(null);

  // Positioning idea:
  // const rect = triggerRef.current?.getBoundingClientRect();
  // const style = rect ? { position: "absolute", top: rect.bottom + 8, left: rect.left } : {};

  return (
    <div className="popover">
      <button
        // ref={triggerRef}
        aria-haspopup="dialog"
        aria-expanded={false /* open */}
        aria-controls="pop-panel-1"
        onClick={() => {/* setOpen(v => !v) */}}
      >
        Open popover
      </button>

      {/* open && */ true && (
        <div
          id="pop-panel-1"
          role="dialog"
          aria-label="Quick actions"
          // ref={panelRef}
          // style={style}
          tabIndex={-1}
        >
          <div className="pop-header">Quick actions</div>
          <div className="pop-body">
            <button>Copy link</button>
            <button>Share…</button>
            <button>Settings</button>
          </div>
          <div className="pop-footer">
            <button /* onClick={() => setOpen(false)} */>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}`}),e.jsx(i.Small,{children:"This snippet shows the essential structure and ARIA. In production, add focus management, Escape handling, outside-click dismissal, and placement logic."})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Positioning (Without Portals)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Avoid clipping:"})," don't nest the popover inside containers with"," ",e.jsx(i.InlineCode,{children:"overflow: hidden/auto"})," unless you want it clipped."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Layering:"})," use a dedicated stacking context (e.g., an app-level layout with"," ",e.jsx(i.InlineCode,{children:"position: relative"}),") and a high"," ",e.jsx(i.InlineCode,{children:"z-index"})," for the popover layer."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Smart placement:"})," compute placement from"," ",e.jsx(i.InlineCode,{children:"getBoundingClientRect()"})," and flip when there's no space."]})]}),e.jsx(i.Pre,{children:`// Sketch: computing a basic placement (no libs)
// const rect = triggerRef.current?.getBoundingClientRect();
// const vw = window.innerWidth, vh = window.innerHeight;
// let top = rect.bottom + 8, left = rect.left;
// if (top + panelHeight > vh) top = rect.top - 8 - panelHeight; // flip to top
// if (left + panelWidth > vw) left = vw - panelWidth - 8;       // shift into viewport`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Keyboard & Focus Behavior"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Open"}),": focus the panel (or the first focusable) so screen readers announce it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Escape"}),": close and return focus to the trigger."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tab/Shift+Tab"}),": keep focus inside the panel (basic focus trap)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Enter/Space on trigger"}),": open/close like a button."]})]}),e.jsx(i.Pre,{children:`// onKeyDown example (notes):
// if (e.key === "Escape") close();
// if (e.key === "Tab") trapFocus(e, panelRef);`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use a real ",e.jsx(i.InlineCode,{children:"<button>"})," as a trigger (keyboard + semantics)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," label the panel with ",e.jsx(i.InlineCode,{children:"aria-label"})," or ",e.jsx(i.InlineCode,{children:"aria-labelledby"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," close on outside click and Escape by default; users expect it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," trap the user—always provide a clear close action."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," rely on hover to open popovers that contain interactive controls (hover is fragile on touch)."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Popover vs Tooltip vs Dropdown"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Tooltip:"})," passive text on hover/focus; ",e.jsx("i",{children:"no interactive content"}),"; often delays;",e.jsx(i.InlineCode,{children:'role="tooltip"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dropdown menu:"})," list of commands/options; arrow-key navigation;"," ",e.jsx(i.InlineCode,{children:'role="menu"'})," / ",e.jsx(i.InlineCode,{children:"menuitem"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Popover:"})," general purpose interactive panel (forms, actions);"," ",e.jsx(i.InlineCode,{children:'role="dialog"'}),"."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Stacking context:"})," how the browser calculates which element appears on top; impacted by position/transform/z-index."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus trap:"})," technique to loop focus within a modal-like surface until it closes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Outside click:"})," click that happens outside the panel; commonly used to dismiss transient UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Flip/Shift:"})," reposition strategies used when the preferred placement has no space."]})]})]}),e.jsx(i.Callout,{children:"Summary: A popover is a compact, interactive panel anchored to a trigger. Build it with clear ARIA wiring, reliable dismissal (Escape/outside click), solid keyboard behavior, and careful placement. Avoid portals here by designing layout layers that prevent clipping."})]});export{t as default};
