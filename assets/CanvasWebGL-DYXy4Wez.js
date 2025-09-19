import{j as e}from"./index-DUO2rjrc.js";import{S as s}from"./styled-EwTbSdcd.js";const i=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Canvas & WebGL"}),e.jsxs(s.Lead,{children:["The HTML ",e.jsx(s.InlineCode,{children:"<canvas>"})," gives you a drawable bitmap for pixels (2D) and a GPU-backed surface (WebGL) for fast graphics. Use Canvas for programmatic drawing (charts, games, effects) and WebGL/WebGL2 when you need hardware acceleration, 3D, or massive 2D throughput."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Core Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Canvas element:"})," an HTML element that exposes a ",e.jsx("em",{children:"drawing surface"}),". You get a"," ",e.jsx(s.InlineCode,{children:"context"})," from it to draw."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Bitmap:"})," a 2D grid of pixels held by the canvas. Drawing changes pixel values."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Context:"})," the API you draw with. Common types:"," ",e.jsx(s.InlineCode,{children:'"2d"'})," (Canvas 2D) and"," ",e.jsx(s.InlineCode,{children:'"webgl"'}),"/",e.jsx(s.InlineCode,{children:'"webgl2"'})," (GPU)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Immediate-mode vs retained-mode:"})," Canvas is ",e.jsx("em",{children:"immediate-mode"}),"—you manually redraw each frame. SVG is ",e.jsx("em",{children:"retained-mode"}),"—the browser keeps objects in a scene."]}),e.jsxs("li",{children:[e.jsx("b",{children:"WebGL:"})," a browser's JavaScript binding to OpenGL ES 2.0/3.0. You write small GPU programs (",e.jsx("em",{children:"shaders"}),") to control how vertices and pixels are processed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shader:"})," a tiny GPU program. ",e.jsx("em",{children:"Vertex shader"})," positions geometry;"," ",e.jsx("em",{children:"fragment shader"})," colors pixels. Passed as GLSL source strings."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Buffer:"})," GPU memory storing vertex data. ",e.jsx("b",{children:"Attribute:"})," per-vertex input."," ",e.jsx("b",{children:"Uniform:"})," constant-per-draw input (e.g., color, time)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Canvas 2D: Setup & First Draw"}),e.jsx(s.Pre,{children:`// HTML
<canvas id="c" width="600" height="300"></canvas>

// JS (put in a useEffect in React)
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

// Fill background
ctx.fillStyle = '#0d1117';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw a rectangle with stroke
ctx.fillStyle = '#58a6ff';
ctx.fillRect(20, 20, 160, 90);
ctx.lineWidth = 2;
ctx.strokeStyle = '#c9d1d9';
ctx.strokeRect(20, 20, 160, 90);

// Text
ctx.fillStyle = '#c9d1d9';
ctx.font = '16px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
ctx.fillText('Canvas 2D — Hello Pixels', 20, 140);`}),e.jsxs(s.Small,{children:["The canvas's ",e.jsx("em",{children:"display"})," size (CSS) and ",e.jsx("em",{children:"drawing buffer"})," size (width/height attributes) are different. For crisp lines on high-DPI screens, scale the buffer by"," ",e.jsx(s.InlineCode,{children:"devicePixelRatio"})," (see below)."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"High-DPI (Retina) Scaling"}),e.jsx(s.Pre,{children:`function resizeCanvasForDPR(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;
  canvas.width = Math.round(displayWidth * dpr);
  canvas.height = Math.round(displayHeight * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // scale drawing to CSS pixels
  return ctx;
}

// Usage:
// <canvas id="c" style="width:600px; height:300px"></canvas>
// const ctx = resizeCanvasForDPR(document.getElementById('c'));`}),e.jsx(s.Small,{children:"Always set CSS size (layout) and scale the backing store to avoid blurriness on retina screens."})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Animation with ",e.jsx("code",{children:"requestAnimationFrame"})]}),e.jsx(s.Pre,{children:`let raf = 0;
let t0 = performance.now();

function loop() {
  const t = performance.now() - t0; // ms since start
  // clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw a moving circle
  const x = 50 + Math.sin(t * 0.002) * 30;
  ctx.beginPath();
  ctx.arc(100 + x, 80, 24, 0, Math.PI * 2);
  ctx.fillStyle = '#3fb950';
  ctx.fill();

  raf = requestAnimationFrame(loop);
}
raf = requestAnimationFrame(loop);

// later: cancelAnimationFrame(raf)`}),e.jsxs(s.Small,{children:["In React, start/stop this loop in ",e.jsx(s.InlineCode,{children:"useEffect"})," and clean it up on unmount to avoid hanging animations."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"WebGL: Minimal Triangle"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Context:"})," ",e.jsx(s.InlineCode,{children:"canvas.getContext('webgl')"})," or"," ",e.jsx(s.InlineCode,{children:"'webgl2'"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pipeline:"})," create shaders → link program → upload vertex buffer → set attributes → draw."]})]}),e.jsx(s.Pre,{children:`const gl = canvas.getContext('webgl');
if (!gl) throw new Error('WebGL not supported');

// GLSL shaders
const vs = \`
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}\`;

const fs = \`
precision mediump float;
uniform vec3 u_color;
void main() { gl_FragColor = vec4(u_color, 1.0); }
\`;

// Compile & link
function compile(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(s));
  return s;
}
const prog = gl.createProgram();
gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
gl.linkProgram(prog);
if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
  throw new Error(gl.getProgramInfoLog(prog));
gl.useProgram(prog);

// Triangle data
const vertices = new Float32Array([
  0,  0.7,    // top
 -0.7, -0.7,  // left
  0.7, -0.7   // right
]);
const vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Hook up a_pos
const a_pos = gl.getAttribLocation(prog, 'a_pos');
gl.enableVertexAttribArray(a_pos);
gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);

// Uniform color
const u_color = gl.getUniformLocation(prog, 'u_color');
gl.uniform3f(u_color, 0.35, 0.67, 1.0);

// Clear & draw
gl.clearColor(0.05, 0.07, 0.09, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 3);`}),e.jsxs(s.Small,{children:["WebGL coordinates in clip space go from ",e.jsx("code",{children:"-1"})," to ",e.jsx("code",{children:"+1"})," on both axes. The vertex shader maps your inputs into that space."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"WebGL Glossary (plain words)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Clip space:"})," a normalized coordinate system where the GPU expects final positions (",e.jsx("code",{children:"-1..1"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Draw call:"})," a single command (e.g.,"," ",e.jsx(s.InlineCode,{children:"gl.drawArrays"}),") asking the GPU to render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Attribute:"})," per-vertex data stream (position, UV, normal)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uniform:"})," a single value (or small struct) used by all vertices/fragments in one draw (e.g., color)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"VBO/IBO:"})," vertex/index buffers stored on GPU for speed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Texture:"})," an image or data grid sampled in the fragment shader for colors or lookups."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"React Patterns for Canvas/WebGL"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Refs:"})," store the canvas node in ",e.jsx(s.InlineCode,{children:"useRef"})," and initialize contexts in ",e.jsx(s.InlineCode,{children:"useEffect"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Imperative islands:"})," isolate drawing logic so React reconciliation stays fast and you control the render loop explicitly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cleanup:"})," cancel animation frames and free WebGL resources (buffers, textures, programs) on unmount."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Data in, pixels out:"})," keep props/state as ",e.jsx("em",{children:"inputs"}),"; the effect translates them into drawing commands."]})]}),e.jsx(s.Pre,{children:`function ChartCanvas({ data }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvas = ref.current;
    const ctx = resizeCanvasForDPR(canvas);
    // draw based on "data"
    // ...
    return () => {
      // cleanup if you started loops/listeners
    };
  }, [data]);

  return <canvas ref={ref} style={{ width: 600, height: 300 }} />;
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common Pitfalls"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Forgetting DPR scaling:"})," leads to blurry graphics on high-DPI screens."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Redrawing in render:"})," never draw in the component body; use"," ",e.jsx(s.InlineCode,{children:"useEffect"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memory leaks:"})," not cancelling ",e.jsx(s.InlineCode,{children:"requestAnimationFrame"})," or not deleting WebGL resources."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Overdraw:"})," clearing/painting entire screen with expensive effects every frame unnecessarily—measure first."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Blocking the main thread:"})," heavy CPU loops will stutter rendering. Consider moving CPU work to Web Workers (and ",e.jsx("em",{children:"optionally"})," OffscreenCanvas)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," set CSS size and scale the drawing buffer for retina clarity."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," isolate drawing as an imperative effect and keep React state minimal."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," precompute geometry/text metrics outside the hot loop where possible."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mutate React DOM during drawing—draw to the canvas only."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," start multiple RAF loops for the same canvas; centralize the timeline."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Accessibility & Fallback"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Canvas has no semantic structure:"})," provide off-screen text or ARIA live regions for important information (e.g., chart summaries)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keyboard access:"})," if the canvas is interactive, mirror interactions with standard controls or manage focus and key handlers yourself."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallback:"})," include helpful fallback content between"," ",e.jsx(s.InlineCode,{children:"<canvas>...fallback...</canvas>"}),"."]})]})]}),e.jsx(s.Callout,{children:"Summary: Use Canvas 2D for pixel-level control and WebGL/WebGL2 when you need GPU power. In React, treat the canvas like an imperative island—initialize once, draw per frame, and clean up diligently."})]});export{i as default};
