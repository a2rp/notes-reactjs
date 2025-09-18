import{j as e}from"./index-C1_RbWbm.js";import{S as n}from"./styled-4jn-LFbN.js";const r=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"File Upload"}),e.jsxs(n.Lead,{children:["A file upload lets users pick files from their device and send them to your app or server. In the browser you’ll work with the ",e.jsx("b",{children:"File"}),", ",e.jsx("b",{children:"FileList"}),", and ",e.jsx("b",{children:"FormData"})," APIs and React handlers to validate, preview, and upload files. File inputs are effectively ",e.jsx("b",{children:"uncontrolled"})," in React."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Core Concepts & Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"File input:"})," ",e.jsx(n.InlineCode,{children:'<input type="file">'})," opens the OS picker. Use ",e.jsx(n.InlineCode,{children:"multiple"})," to allow more than one file and"," ",e.jsx(n.InlineCode,{children:"accept"})," to hint allowed types (e.g."," ",e.jsx(n.InlineCode,{children:'accept="image/*,.pdf"'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"File:"})," an object representing a user-selected file with"," ",e.jsx(n.InlineCode,{children:"name"}),", ",e.jsx(n.InlineCode,{children:"type"})," (MIME),",e.jsx(n.InlineCode,{children:"size"})," (bytes), and ",e.jsx(n.InlineCode,{children:"lastModified"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"FileList:"})," array-like collection of ",e.jsx(n.InlineCode,{children:"File"})," from",e.jsx(n.InlineCode,{children:"e.target.files"})," or ",e.jsx(n.InlineCode,{children:"DataTransfer.files"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"FormData:"})," a key/value payload for uploads:"," ",e.jsx(n.InlineCode,{children:'form.append("file", file)'})," then send via ",e.jsx("i",{children:"XHR"})," or ",e.jsx("i",{children:"fetch"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled:"})," you can’t “set” an input’s file list via React state. Read via refs or change handlers, and clear by setting ",e.jsx(n.InlineCode,{children:'inputRef.current.value = ""'}),"."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Basic File Input (Single/Multiple)"}),e.jsx(n.Pre,{children:`function BasicFileInput() {
  const inputRef = React.useRef(null);
  const [files, setFiles] = React.useState([]);

  function onChange(e) {
    const picked = Array.from(e.target.files || []);
    setFiles(picked);
  }

  function clear() {
    setFiles([]);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="resume">Upload files</label>
      <input
        id="resume"
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,.pdf"
        onChange={onChange}
      />
      <ul>
        {files.map((f) => (
          <li key={f.name}>{f.name} — {(f.size/1024).toFixed(1)} KB — {f.type || "unknown"}</li>
        ))}
      </ul>
      <button type="button" onClick={clear}>Clear</button>
    </form>
  );
}`}),e.jsxs(n.Small,{children:["Use ",e.jsx(n.InlineCode,{children:"accept"})," as a hint only—always validate on the client ",e.jsx("i",{children:"and"})," the server."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Client-Side Validation (Type, Size, Extension)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"MIME type:"})," use ",e.jsx(n.InlineCode,{children:"file.type"})," (e.g., ",e.jsx("i",{children:"image/png"}),") — not 100% trustworthy."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Extension:"})," check ",e.jsx(n.InlineCode,{children:"file.name"})," endings (",e.jsx("i",{children:".png, .jpg"}),") — can be spoofed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Size:"})," enforce a max in bytes (e.g., 5 MB = 5 * 1024 * 1024)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Server must re-validate."})," Client checks are UX niceties, not security."]})]}),e.jsx(n.Pre,{children:`const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = ["image/jpeg", "image/png", "application/pdf"];
const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".pdf"];

function validateFiles(files) {
  const errors = [];
  const ok = [];

  for (const file of files) {
    const ext = (file.name.match(/\\.[^.]+$/)?.[0] || "").toLowerCase();
    if (!ALLOWED_MIME.includes(file.type) || !ALLOWED_EXT.includes(ext)) {
      errors.push(\`Type not allowed: \${file.name}\`);
      continue;
    }
    if (file.size > MAX_BYTES) {
      errors.push(\`Too large (&gt;5MB): \${file.name}\`);
      continue;
    }
    ok.push(file);
  }
  return { ok, errors };
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Image Previews (Object URLs)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use ",e.jsx(n.InlineCode,{children:"URL.createObjectURL(file)"})," for a fast local preview."," ","Always call ",e.jsx(n.InlineCode,{children:"URL.revokeObjectURL(url)"})," in cleanup to avoid leaks."]}),e.jsxs("li",{children:["Alternatively, ",e.jsx(n.InlineCode,{children:"FileReader.readAsDataURL"})," yields base64 strings (slower for large files)."]})]}),e.jsx(n.Pre,{children:`function ImagePreview({ file, alt = "" }) {
  const [src, setSrc] = React.useState("");
  React.useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  if (!file) return null;
  return <img src={src} alt={alt || file.name} style={{ maxWidth: 200, height: "auto" }} />;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Drag & Drop Zone"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Add ",e.jsx(n.InlineCode,{children:"onDragOver"})," (prevent default) and ",e.jsx(n.InlineCode,{children:"onDrop"})," on a container."]}),e.jsxs("li",{children:["Retrieve files from ",e.jsx(n.InlineCode,{children:"e.dataTransfer.files"}),"."]}),e.jsx("li",{children:"Keep the hidden input for keyboard and screen reader accessibility."})]}),e.jsx(n.Pre,{children:`function Dropzone({ onFiles }) {
  const inputRef = React.useRef(null);

  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
  }
  function onClick() {
    inputRef.current?.click();
  }
  function onChange(e) {
    onFiles(Array.from(e.target.files || []));
  }
  function onDragOver(e) {
    e.preventDefault(); // allow drop
  }
  function onDrop(e) {
    e.preventDefault();
    onFiles(Array.from(e.dataTransfer.files || []));
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
      aria-label="Upload files by clicking or dragging and dropping"
      style={{
        border: "2px dashed #555",
        padding: 16,
        borderRadius: 12,
        textAlign: "center",
      }}
    >
      <p>Click or drag files here to upload</p>
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={onChange}
        accept="image/*,.pdf"
        style={{ display: "none" }}
      />
    </div>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Uploading with Progress & Cancel"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Progress:"})," use ",e.jsx(n.InlineCode,{children:"XMLHttpRequest"})," for reliable"," ",e.jsx(n.InlineCode,{children:"upload.onprogress"})," events. (Standard ",e.jsx("i",{children:"fetch"})," lacks upload progress.)"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cancel:"})," call ",e.jsx(n.InlineCode,{children:"xhr.abort()"}),". You can wire a"," ",e.jsx(n.InlineCode,{children:"signal"})," from ",e.jsx(n.InlineCode,{children:"AbortController"})," to coordinate."]})]}),e.jsx(n.Pre,{children:`function uploadFiles({ url, files, onProgress, signal }) {
  return Promise.all(
    files.map((file) => new Promise((resolve, reject) => {
      const form = new FormData();
      form.append("file", file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);

      xhr.upload.addEventListener("progress", (e) => {
        if (!e.lengthComputable) return;
        const pct = Math.round((e.loaded / e.total) * 100);
        onProgress?.(file.name, pct);
      });

      xhr.onload = () => {
        const ok = xhr.status >= 200 && xhr.status < 300;
        if (ok) resolve({ file, response: xhr.responseText });
        else reject(new Error(\`Upload failed (\${xhr.status}) for \${file.name}\`));
      };

      xhr.onerror = () => reject(new Error("Network error"));
      signal?.addEventListener("abort", () => xhr.abort());

      xhr.send(form);
    }))
  );
}

// Usage
function UploadWithProgress({ files }) {
  const [progress, setProgress] = React.useState({});
  const ac = React.useRef(null);

  function start() {
    ac.current = new AbortController();
    uploadFiles({
      url: "/api/upload",
      files,
      signal: ac.current.signal,
      onProgress: (name, pct) => setProgress((p) => ({ ...p, [name]: pct })),
    }).catch(console.error);
  }
  function cancel() {
    ac.current?.abort();
  }

  return (
    <div>
      <button onClick={start}>Upload</button>
      <button onClick={cancel}>Cancel</button>
      <ul>
        {files.map(f => (
          <li key={f.name}>{f.name}: {progress[f.name] ?? 0}%</li>
        ))}
      </ul>
    </div>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility (A11y)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Always pair inputs with a ",e.jsx(n.InlineCode,{children:'<label htmlFor="file">'}),"."]}),e.jsxs("li",{children:["Use a visible button or dropzone with keyboard support (",e.jsx(n.InlineCode,{children:'role="button"'}),", ",e.jsx(n.InlineCode,{children:"tabIndex=0"}),", Enter/Space)."]}),e.jsxs("li",{children:["Announce constraints (types, size) via helper text linked by ",e.jsx(n.InlineCode,{children:"aria-describedby"}),"."]}),e.jsx("li",{children:"Show validation errors inline, near the control, with clear text."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," validate type/size on the client for UX; ",e.jsx("b",{children:"also do"})," re-validate on the server."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," preview images with object URLs and revoke them on cleanup."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," show progress and allow cancel on long uploads."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," trust ",e.jsx(n.InlineCode,{children:"accept"})," alone; it’s only a hint."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," read massive files fully into memory unless necessary; stream or chunk on the server."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," block keyboard-only users—always keep a hidden real input with a label."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Security & Server Notes"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Sanitize filenames and store server-generated names. Never execute uploaded content."}),e.jsx("li",{children:"Check MIME type server-side and (ideally) sniff file signatures for critical types."}),e.jsx("li",{children:"Limit size and number of files server-side; rate limit abusive clients."}),e.jsx("li",{children:"Serve user uploads from a separate domain or with strict Content-Type/Disposition headers."})]})]}),e.jsx(n.Callout,{children:"Summary: treat file inputs as uncontrolled, validate early, preview safely, upload with feedback and cancelation, and always re-validate on the server. Favor accessibility and security at every step."})]});export{r as default};
