import{j as e}from"./index-CEhT6f_w.js";import{S as r}from"./styled-fmHaAB_i.js";const l=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"File Uploads"}),e.jsxs(r.Lead,{children:["Learn how to let users pick files, validate them, and upload safely using"," ",e.jsx("b",{children:"FormData"}),", show ",e.jsx("b",{children:"progress"}),", and even upload directly to cloud storage with"," ",e.jsx("b",{children:"pre-signed URLs"}),". Well cover definitions, best practices, and pitfalls so beginners can build this confidently."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"What is a file upload? Why does it need care?"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Definition:"})," Sending user-selected files from the browser to a server or cloud bucket over HTTP."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why care:"})," Files can be large, untrusted, and varied. You must validate type/size, show progress, handle errors, and protect your server."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Main approaches:"})," (1) Upload to ",e.jsx("i",{children:"your backend"})," (proxy) or (2) upload ",e.jsx("i",{children:"directly to cloud"})," via a ",e.jsx("b",{children:"pre-signed URL"}),"."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Basic file picker + client-side validation"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"accept:"})," Hint to limit selectable types (e.g., ",e.jsx(r.InlineCode,{children:"image/*"})," or ",e.jsx(r.InlineCode,{children:".pdf,.docx"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"multiple:"})," Allow selecting more than one file."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Note:"})," ",e.jsx("i",{children:"accept"})," is not security; always re-validate on the server."]})]}),e.jsx(r.Pre,{children:`function BasicPicker() {
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState("");

  function onChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;

    // Basic checks (example: images up to 5 MB)
    if (!f.type.startsWith("image/")) {
      setError("Only images are allowed.");
      setFile(null);
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("Max size is 5 MB.");
      setFile(null);
      return;
    }

    setError("");
    setFile(f);

    // Preview (for images)
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
  }

  React.useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  return (
    <>
      <input type="file" accept="image/*" onChange={onChange} />
      {error && <p style={{color:"tomato"}}>{error}</p>}
      {previewUrl && <img alt="preview" src={previewUrl} style={{maxWidth: 240}} />}
      {file && <p>Ready to upload: {file.name} ({Math.round(file.size/1024)} KB)</p>}
    </>
  );
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Upload to your backend (FormData + fetch)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"FormData:"})," Build a ",e.jsx("b",{children:"multipart/form-data"})," request that carries the file and fields."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Headers:"})," Dont set ",e.jsx(r.InlineCode,{children:"Content-Type"})," manually; the browser adds the correct boundary."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Progress:"})," ",e.jsx(r.InlineCode,{children:"fetch"})," does not expose upload progress; use XHR (next section) if you need it."]})]}),e.jsx(r.Pre,{children:`async function uploadToBackend(file) {
  const fd = new FormData();
  fd.append("avatar", file);          // field name 'avatar' matches backend expectation
  fd.append("userId", "123");         // example extra fields

  const res = await fetch("/api/upload", {
    method: "POST",
    body: fd,                         // no explicit headers for Content-Type
    credentials: "include",           // if you need cookies/session
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json();                  // backend returns JSON with file URL, etc.
}`}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"Server-side (sketch):"})," Read ",e.jsx("i",{children:"multipart/form-data"}),", validate ",e.jsx("i",{children:"type/size"}),", scan if needed, store (disk/cloud), return a URL/ID."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Show upload progress (XHR)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Progress events:"})," Use ",e.jsx(r.InlineCode,{children:"xhr.upload.onprogress"})," to get ",e.jsx("i",{children:"loaded"}),"/",e.jsx("i",{children:"total"})," bytes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"When to use:"})," Large files, UX polish, or multiple concurrent uploads."]})]}),e.jsx(r.Pre,{children:`function uploadWithProgress(file, onProgress) {
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    fd.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;
      const pct = Math.round((e.loaded / e.total) * 100);
      onProgress?.(pct);
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try { resolve(JSON.parse(xhr.responseText)); }
        catch { resolve({ ok: true }); }
      } else reject(new Error("Upload failed"));
    };
    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send(fd);
  });
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Drag & Drop + Multiple uploads"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Drag events:"})," Prevent default in ",e.jsx(r.InlineCode,{children:"onDragOver"})," to allow dropping."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DataTransfer.files:"})," Access dropped files from ",e.jsx(r.InlineCode,{children:"e.dataTransfer.files"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Concurrency:"})," Upload sequentially (simple) or in parallel (faster, watch server limits)."]})]}),e.jsx(r.Pre,{children:`function DropZone({ onFiles }) {
  function onDragOver(e) { e.preventDefault(); }
  function onDrop(e) {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    onFiles?.(files);
  }
  return (
    <div onDragOver={onDragOver} onDrop={onDrop} style={{padding:24, border:"2px dashed #888"}}>
      Drop files here or click the picker
      <input type="file" multiple onChange={(e)=> onFiles?.(Array.from(e.target.files||[]))} />
    </div>
  );
}

async function uploadAll(files) {
  for (const f of files) {
    // await uploadToBackend(f)            // simple sequential
    // or run Promise.all(...) carefully for parallel uploads
  }
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Direct upload to cloud (Pre-Signed URL)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Flow:"})," Ask your backend for a ",e.jsx("b",{children:"pre-signed URL"})," → upload file ",e.jsx("i",{children:"directly"})," to cloud (S3/GCS/etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," Offloads bandwidth from your server and can be faster/cheaper."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CORS:"})," Must allow your sites origin to PUT/POST to the bucket."]})]}),e.jsx(r.Pre,{children:`async function directToS3(file) {
  // 1) Ask backend to create a pre-signed URL for this file
  const meta = await fetch(\`/api/uploads/presign?name=\${encodeURIComponent(file.name)}&type=\${encodeURIComponent(file.type)}\`)
    .then(r => r.json()); // { url, method: "PUT" | "POST", fields? }

  // 2) Upload directly
  if (meta.method === "PUT") {
    // PUT style
    const res = await fetch(meta.url, {
      method: "PUT",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body: file,
    });
    if (!res.ok) throw new Error("Cloud upload failed");
  } else {
    // POST style (S3 form fields)
    const fd = new FormData();
    Object.entries(meta.fields || {}).forEach(([k, v]) => fd.append(k, v));
    fd.append("file", file);
    const res = await fetch(meta.url, { method: "POST", body: fd });
    if (!res.ok) throw new Error("Cloud upload failed");
  }

  // 3) Store final URL/ID in your DB via backend if needed
  // await fetch("/api/uploads/confirm", { method:"POST", body: JSON.stringify({ key: meta.key }) })
}`}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"Security:"})," Pre-signed URLs should expire quickly and be scoped to the exact key and size/type constraints you expect."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Resumable / chunked uploads (concept)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Resumable:"})," Split large files into chunks. If the network drops, continue from the last confirmed chunk."]}),e.jsxs("li",{children:[e.jsx("b",{children:"When:"})," Very large files (videos, archives) or unstable networks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"How:"})," Use a library or a server protocol (e.g., tus, S3 multipart) that coordinates chunk indexes and ETags."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Security & Validation (must do)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Validate on server:"})," Enforce allowed ",e.jsx("i",{children:"MIME types"})," and ",e.jsx("i",{children:"size limits"}),". Never trust the client."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Sanitize filenames:"})," Generate your own safe keys; dont store user filenames directly as paths."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scan if needed:"})," For public/user-visible content, consider antivirus scanning."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rate/size limits:"})," Apply per-user limits and maximum body sizes to avoid abuse/DoS."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Serve safely:"})," For images/docs, set appropriate ",e.jsx("i",{children:"Content-Type"})," and consider ",e.jsx("i",{children:"Content-Disposition: attachment"})," for untrusted files."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Dont"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," show progress and clear errors; large files feel broken without feedback."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," compress or resize images on the client (Canvas/OffscreenCanvas) when appropriate."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," consider ",e.jsx("i",{children:"pre-signed URLs"})," to reduce backend load."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dont"})," rely on ",e.jsx("i",{children:"accept"})," or client checks for security—always re-validate server-side."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dont"})," set ",e.jsx("i",{children:"Content-Type"})," manually on FormData requests; let the browser set the boundary."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"FormData:"})," Browser API to build multipart/form-data bodies conveniently."]}),e.jsxs("li",{children:[e.jsx("b",{children:"multipart/form-data:"})," HTTP encoding composed of parts separated by boundaries; used for files."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pre-signed URL:"})," Short-lived URL granting permission to upload directly to a storage bucket."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CORS:"})," Rules a browser uses to allow/block cross-origin requests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Progress event:"})," Event exposing bytes loaded versus total; available on ",e.jsx("i",{children:"XHR"})," uploads."]})]})]}),e.jsxs(r.Callout,{children:["Summary: Pick files, validate, upload via ",e.jsx("b",{children:"FormData"}),", show ",e.jsx("b",{children:"progress"}),", and prefer",e.jsx("b",{children:" direct-to-cloud"})," with ",e.jsx("b",{children:"pre-signed URLs"})," for scale. Always re-validate on the server and handle errors gracefully."]})]});export{l as default};
