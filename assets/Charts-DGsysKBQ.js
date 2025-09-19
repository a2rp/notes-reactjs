import{j as e}from"./index-BRArnZ3i.js";import{S as s}from"./styled-JpMxu384.js";const a=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Charts (External Integrations)"}),e.jsxs(s.Lead,{children:["Charts help us ",e.jsx("b",{children:"visualize data"})," so patterns, comparisons, and trends become obvious. In React, you can use ready-made libraries (Chart.js, Recharts, ECharts) or wire D3 directly. This page explains the ecosystem, key terms, how to pick a library, and shows simple React-friendly patterns."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"What is a Chart Integration & Why it matters"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Chart integration:"})," Using a visualization library inside a React app to render graphs (line, bar, pie, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," Communicate data clearly, enable interactivity (hover, zoom), and support decision-making."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Approaches:"})," ",e.jsx("i",{children:"Declarative"})," (React components like Recharts) vs ",e.jsx("i",{children:"Imperative"})," (Chart.js/D3 APIs)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Key Terms (plain English)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Series:"})," A sequence of related data points (e.g., daily temperature)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Axis:"})," The reference line for values/categories; ",e.jsx("i",{children:"x-axis"})," (horizontal) and ",e.jsx("i",{children:"y-axis"})," (vertical)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scale:"})," Function that maps data values to pixels (linear, time, log)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Domain:"})," Input range of a scale (e.g., min/max data values)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Range:"})," Output range of a scale (e.g., 0→width in pixels)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Legend:"})," A guide explaining colors/markers for each series."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tooltip:"})," A small overlay showing details on hover/focus."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Canvas vs SVG vs WebGL:"})," Rendering technologies. ",e.jsx("i",{children:"SVG"})," is DOM-based (great for small/medium data, crisp text); ",e.jsx("i",{children:"Canvas"})," is pixel-based (faster when many points); ",e.jsx("i",{children:"WebGL"})," is GPU-accelerated (huge datasets)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Popular Libraries & When to Use"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Recharts (React + SVG, declarative):"})," Easy, composable components, great defaults; best for dashboards and typical charts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Chart.js (Canvas, imperative; with react-chartjs-2 wrapper):"})," Simple API, polished defaults; good for quick results, many chart types."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ECharts (Canvas; React wrapper):"})," Feature-rich (zoom, brush, map), themeable; good for analytics dashboards."]}),e.jsxs("li",{children:[e.jsx("b",{children:"D3 (low-level toolkit):"})," Full control of scales, layouts, interactions; steeper learning curve; often paired with React for custom visuals."]}),e.jsxs("li",{children:[e.jsx("b",{children:"VisX/Nivo/Victory:"})," React-first ecosystems with strong theming and components."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"How to choose (quick guide)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Just need dashboards fast?"})," Start with ",e.jsx("b",{children:"Recharts"})," or ",e.jsx("b",{children:"Nivo"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Familiar with Chart.js?"})," Use ",e.jsx("b",{children:"react-chartjs-2"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Advanced interactions / huge data?"})," Consider ",e.jsx("b",{children:"ECharts"})," or ",e.jsx("b",{children:"WebGL-backed"})," libs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Custom, bespoke visuals?"})," Use ",e.jsx("b",{children:"D3 + React"})," pattern."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Data Preparation (the foundation)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Normalize your data: consistent keys (e.g., ",e.jsx("code",{children:"{ date, value }"}),")."]}),e.jsxs("li",{children:["Parse dates up front (",e.jsx("i",{children:"not"})," in the render loop)."]}),e.jsx("li",{children:"Sort by x-axis (time or category) to avoid jagged lines."}),e.jsxs("li",{children:["Handle ",e.jsx("b",{children:"missing values"})," (nulls): drop, interpolate, or show gaps."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"React Integration Patterns"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Controlled props:"})," Chart gets all its data/size via props; parent owns state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Resize handling:"})," Observe container size (e.g., ",e.jsx("i",{children:"ResizeObserver"}),") and re-render chart."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memoization:"})," Use ",e.jsx("code",{children:"useMemo"}),"/",e.jsx("code",{children:"useCallback"})," for derived data and event handlers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled refs (D3/imperative):"})," Mount chart into an empty ",e.jsx("code",{children:"<svg>"}),"/",e.jsx("code",{children:"<canvas>"})," via ",e.jsx("code",{children:"useEffect"}),"."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Example 1 — Recharts (declarative, SVG)"}),e.jsx(s.Pre,{children:`// Install: npm i recharts
// A simple responsive line chart (monthly sales)
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 980 },
  { month: "Mar", sales: 1320 },
  // ...
];

function SalesLineChart() {
  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Declarative:"})," You compose charts using React components. ",e.jsx("b",{children:"ResponsiveContainer"})," listens to parent size."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Example 2 — Chart.js via react-chartjs-2 (Canvas)"}),e.jsx(s.Pre,{children:`// Install: npm i chart.js react-chartjs-2
// Quick bar chart (product counts)
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const labels = ["A", "B", "C", "D"];
const dataset = [12, 19, 8, 15];

const data = {
  labels,
  datasets: [
    { label: "Products", data: dataset, borderWidth: 1 }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { beginAtZero: true } }
};

function ProductBarChart() {
  return (
    <div style={{ width: "100%", height: 280 }}>
      <Bar data={data} options={options} />
    </div>
  );
}`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Canvas:"})," Faster with larger datasets. ",e.jsx("b",{children:"options"})," controls scales, tooltips, legends, etc."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Example 3 — D3 + React (custom SVG)"}),e.jsx(s.Pre,{children:`// Install: npm i d3
// Pattern: useRef + useEffect; D3 draws inside <svg>
import * as d3 from "d3";

function TinyLine({ data, width = 320, height = 160, margin = 24 }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !data?.length) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // clear

    const innerW = width - margin * 2;
    const innerH = height - margin * 2;

    const x = d3.scalePoint()
      .domain(data.map(d => d.label))
      .range([0, innerW]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .nice()
      .range([innerH, 0]);

    const g = svg.append("g").attr("transform", \`translate(\${margin},\${margin})\`);

    const line = d3.line()
      .x(d => x(d.label))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 2)
      .attr("d", line);

    g.append("g").attr("transform", \`translate(0,\${innerH})\`).call(d3.axisBottom(x));
    g.append("g").call(d3.axisLeft(y));
  }, [data, width, height, margin]);

  return <svg ref={ref} width={width} height={height} role="img" aria-label="Trend line chart" />;
}

// Usage:
// <TinyLine data={[{label:'Jan', value:12}, {label:'Feb', value:18}]} />
`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Imperative:"})," D3 manipulates the SVG directly. Great for custom visuals and full control."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Accessibility (must-have)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Provide text alternatives:"})," ",e.jsx("code",{children:"aria-label"})," on the SVG/canvas and a short paragraph summary of the insight."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keyboard:"})," Ensure focusable elements for legend toggles, zoom controls, and tooltips (if interactive)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Color:"})," High contrast, avoid relying only on color; use different markers/patterns for series."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Data table fallback:"})," Provide a small table link for screen readers if the chart is critical."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Performance Tips"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Downsample large data:"})," show fewer points or aggregated buckets (e.g., daily → weekly)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memoize derived values:"})," ",e.jsx("code",{children:"useMemo"})," for scales, sorted arrays, computed series."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Throttle interactions:"})," debounce hover/brush handlers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Choose Canvas/WebGL"})," for 10k+ points or heavy animations."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," label axes and units (e.g., “Sales (₹)”)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," pick correct chart type: line for trends, bar for comparisons, area for cumulative feel, pie/donut sparingly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," show tooltips/legends clearly and keep the chart readable on mobile."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," overload with effects; clarity beats decoration."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," re-compute heavy transforms in every render."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common Pitfalls"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Mixing controlled React state with imperative chart mutations (pick one source of truth)."}),e.jsx("li",{children:"Forgetting to clean up listeners on unmount (zoom/resize). "}),e.jsx("li",{children:"Parsing dates inside render (do it once when data loads)."}),e.jsx("li",{children:"Unreadable labels (overlap, tiny fonts, poor contrast)."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Declarative chart:"})," You describe ",e.jsx("i",{children:"what"})," to draw (components/props), library draws it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Imperative chart:"})," You manually tell the library ",e.jsx("i",{children:"how"})," to draw (functions that mutate)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Responsive chart:"})," Resizes with its container while keeping proportions readable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Outliers:"})," Data points far from most values; may require special handling (clip/annotate)."]})]})]}),e.jsx(s.Callout,{children:"Summary: Pick a library that matches your needs and team skills. Keep data tidy, label clearly, ensure accessibility, and optimize for performance. Start simple, then add interactivity."})]});export{a as default};
