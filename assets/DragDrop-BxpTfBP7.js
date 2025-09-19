import{j as e}from"./index-CDxhzYTb.js";import{S as r}from"./styled-D1rG1Lfw.js";const t=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Drag & Drop (Forms)"}),e.jsxs(r.Lead,{children:[e.jsx("b",{children:"Drag & Drop (DnD)"})," lets users move items or drop files into a form. In React you can use the native ",e.jsx(r.InlineCode,{children:"HTML5 Drag and Drop API"})," (mouse/trackpad), or build custom interactions with Pointer/Touch events. For accessibility, always provide a keyboard-friendly alternative (buttons or inputs)."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Definition & Purpose"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Drag source:"})," element the user picks up (e.g., a list item)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Drop target:"})," element that accepts the item or files (e.g., a dropzone)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DataTransfer:"})," the object that carries data during a drag (",e.jsx(r.InlineCode,{children:"event.dataTransfer"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use cases in forms:"})," file upload (dropzone), reordering items (e.g., form sections), moving chips/tags between lists."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Native HTML5 DnD — fundamentals"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Make a thing draggable with ",e.jsx(r.InlineCode,{children:"draggable"})," and handle ",e.jsx(r.InlineCode,{children:"onDragStart"}),"."]}),e.jsxs("li",{children:["Allow dropping by calling ",e.jsx(r.InlineCode,{children:"e.preventDefault()"})," in ",e.jsx(r.InlineCode,{children:"onDragOver"}),"."]}),e.jsxs("li",{children:["Complete the drop in ",e.jsx(r.InlineCode,{children:"onDrop"})," (read ",e.jsx(r.InlineCode,{children:"dataTransfer"})," or ",e.jsx(r.InlineCode,{children:"files"}),")."]}),e.jsx("li",{children:"Mobile/touch: native DnD has limited support — consider Pointer events or a library."})]}),e.jsx(r.Pre,{children:`// Minimal pattern:
function Draggable() {
  function onDragStart(e) {
    // carry some identifier
    e.dataTransfer.setData("text/plain", "item-123");
    e.dataTransfer.effectAllowed = "move";
  }
  return <div draggable onDragStart={onDragStart}>Drag me</div>;
}

function DropTarget() {
  function onDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }
  function onDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    console.log("Dropped:", id);
  }
  return <div onDragOver={onDragOver} onDrop={onDrop}>Drop here</div>;
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Example: Reorder list (mouse, native DnD)"}),e.jsxs(r.Small,{children:["Reordering using ",e.jsx("code",{children:"draggable"}),". Also provide buttons for keyboard users (see a11y)."]}),e.jsx(r.Pre,{children:`import React from "react";

export function ReorderList() {
  const [items, setItems] = React.useState(["Alpha", "Bravo", "Charlie", "Delta"]);
  const dragIndexRef = React.useRef(null);

  function onDragStart(e, index) {
    dragIndexRef.current = index;
    e.dataTransfer.effectAllowed = "move";
    // Optional ghost image, else browser uses a snapshot
    // const img = new Image(); img.src = "data:image/svg+xml,..."; e.dataTransfer.setDragImage(img, 0, 0);
  }

  function onDragOver(e) {
    e.preventDefault(); // MUST have this to allow drop
  }

  function onDrop(e, dropIndex) {
    e.preventDefault();
    const from = dragIndexRef.current;
    if (from == null || from === dropIndex) return;
    setItems(prev => {
      const copy = [...prev];
      const [moved] = copy.splice(from, 1);
      copy.splice(dropIndex, 0, moved);
      return copy;
    });
    dragIndexRef.current = null;
  }

  return (
    <ul onDragOver={onDragOver}>
      {items.map((label, i) => (
        <li
          key={label}
          draggable
          onDragStart={(e) => onDragStart(e, i)}
          onDrop={(e) => onDrop(e, i)}
          style={{ padding: 8, border: "1px solid hsl(0 0% 100% / 0.14)", marginBottom: 6, borderRadius: 8, cursor: "grab" }}
          aria-grabbed="false"
        >
          {label}
        </li>
      ))}
    </ul>
  );
}`}),e.jsxs(r.Small,{children:["Note: Keep drag visuals subtle; avoid heavy reflows in ",e.jsx("code",{children:"onDragOver"}),"."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Example: File Dropzone (with click-to-select)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Users can ",e.jsx("b",{children:"drop files"})," or ",e.jsx("b",{children:"click"})," to open the file picker."]}),e.jsxs("li",{children:["Read files from ",e.jsx(r.InlineCode,{children:"e.dataTransfer.files"})," on drop."]}),e.jsx("li",{children:"Validate type/size before accepting."})]}),e.jsx(r.Pre,{children:`import React from "react";

export function FileDropzone({ accept = ["image/png", "image/jpeg"], maxSizeMB = 5 }) {
  const [files, setFiles] = React.useState([]);
  const [isActive, setIsActive] = React.useState(false);
  const inputRef = React.useRef(null);
  const maxBytes = maxSizeMB * 1024 * 1024;

  function openPicker() { inputRef.current?.click(); }

  function validate(list) {
    const accepted = [];
    const errors = [];
    for (const f of list) {
      if (accept.length && !accept.includes(f.type)) errors.push(\`Unsupported type: \${f.name}\`);
      else if (f.size > maxBytes) errors.push(\`Too large (> \${maxSizeMB} MB): \${f.name}\`);
      else accepted.push(f);
    }
    return { accepted, errors };
  }

  function onInputChange(e) {
    const { accepted, errors } = validate(e.target.files);
    if (errors.length) alert(errors.join("\\n"));
    if (accepted.length) setFiles(prev => [...prev, ...accepted]);
  }

  function onDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = "copy"; }
  function onDragEnter(e) { e.preventDefault(); setIsActive(true); }
  function onDragLeave(e) { e.preventDefault(); setIsActive(false); }

  function onDrop(e) {
    e.preventDefault();
    setIsActive(false);
    const { accepted, errors } = validate(e.dataTransfer.files);
    if (errors.length) alert(errors.join("\\n"));
    if (accepted.length) setFiles(prev => [...prev, ...accepted]);
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openPicker()}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        aria-label="File dropzone: click or drop files"
        style={{
          padding: 24,
          border: "2px dashed hsl(0 0% 100% / 0.25)",
          borderRadius: 16,
          outline: isActive ? "4px solid hsl(200 80% 60% / 0.35)" : "none",
        }}
      >
        <p><b>Drop files here</b> or click to choose (PNG/JPEG, up to {maxSizeMB} MB each)</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept.join(",")}
          onChange={onInputChange}
          style={{ display: "none" }}
        />
      </div>

      {files.length > 0 && (
        <ul style={{ marginTop: 12 }}>
          {files.map((f, i) => (
            <li key={i}>{f.name} — {(f.size / 1024).toFixed(0)} KB</li>
          ))}
        </ul>
      )}
    </div>
  );
}`}),e.jsxs(r.Small,{children:["For server upload, append to ",e.jsx("code",{children:"FormData"})," and POST; for previews, render object URLs via ",e.jsx("code",{children:"URL.createObjectURL"}),"."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Accessibility: keyboard & screen readers"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Always offer a button alternative"})," to reorder (Move Up/Down) and a visible “Browse files” control."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Announce changes"})," with ",e.jsx(r.InlineCode,{children:"aria-live"})," (e.g., “Moved Bravo to position 2”)."]}),e.jsxs("li",{children:["Avoid deprecated ARIA like ",e.jsx(r.InlineCode,{children:"aria-dropeffect"}),". Use clear labels and instructions instead."]}),e.jsx("li",{children:"Ensure focus is never trapped while dragging; keep tab order predictable."})]}),e.jsx(r.Pre,{children:`// Simple keyboard fallback for reordering:
function ReorderWithButtons() {
  const [items, setItems] = React.useState(["Alpha", "Bravo", "Charlie"]);
  const liveRef = React.useRef(null);

  function move(i, dir) {
    setItems(prev => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const copy = [...prev];
      const [m] = copy.splice(i, 1);
      copy.splice(j, 0, m);
      // Announce
      queueMicrotask(() => {
        liveRef.current.textContent = \`\${m} moved to position \${j + 1}\`;
      });
      return copy;
    });
  }

  return (
    <>
      <ul>
        {items.map((label, i) => (
          <li key={label}>
            {label}
            <button onClick={() => move(i, -1)} aria-label={"Move " + label + " up"}>↑</button>
            <button onClick={() => move(i, +1)} aria-label={"Move " + label + " down"}>↓</button>
          </li>
        ))}
      </ul>
      <div aria-live="polite" ref={liveRef} style={{position:"absolute",left:-9999}} />
    </>
  );
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Patterns, Pitfalls, Tips"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Drag enter/leave flicker:"})," they fire when entering/leaving children. Track a ",e.jsx("em",{children:"counter"})," or use ",e.jsx(r.InlineCode,{children:"pointerenter/leave"})," for custom pointer DnD."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prevent default on dragover:"})," otherwise dropping won’t work."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Security:"})," do not inject dropped HTML; treat strings as untrusted."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mobile:"})," prefer Pointer events or a library (e.g., dnd-kit) for robust touch support."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State updates:"})," keep them minimal during drag to avoid jank (no heavy work in ",e.jsx("code",{children:"onDragOver"}),")."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Integrating with Form Libraries"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"react-hook-form:"})," use ",e.jsx(r.InlineCode,{children:"Controller"})," or ",e.jsx(r.InlineCode,{children:"setValue"})," to register dropped files (",e.jsx(r.InlineCode,{children:"File[]"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Formik:"})," call ",e.jsx(r.InlineCode,{children:'setFieldValue("files", files)'})," inside drop handler."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Schema (Yup/Zod):"})," validate file count, MIME, size in a custom test."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"draggable:"})," boolean attribute enabling native DnD on an element."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DataTransfer:"})," carries data/files during drag (",e.jsx("code",{children:"setData/getData/files"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"dropEffect/effectAllowed:"})," hint the allowed operation (copy/move/link/none)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pointer events:"})," input model that unifies mouse/touch/pen; useful for custom DnD."]})]})]}),e.jsx(r.Callout,{children:"Summary: start with native DnD for mouse + a keyboard fallback. For touch and complex layouts, prefer Pointer events or a well-supported library. Always validate files and keep forms accessible."})]});export{t as default};
