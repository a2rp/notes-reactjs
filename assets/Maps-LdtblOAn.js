import{j as e}from"./index-DqLKwkYK.js";import{S as r}from"./styled-BG7i0Uaq.js";const n=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Maps (External Integrations)"}),e.jsx(r.Lead,{children:"In React apps, “maps” usually means embedding an interactive web map (pan/zoom, markers, popups) from a mapping library or API. You'll often combine a map with data (e.g., store locations), geocoding (find coordinates for an address), and UI (filters, search, clustering)."}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"What is a web map integration?"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Web map:"})," An interactive 2D (or 3D) map rendered in the browser. Users can pan, zoom, and interact with layers/markers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Integration:"})," Connecting React components to a mapping library (e.g., Leaflet, MapLibre GL, Google Maps) and data sources (tiles, GeoJSON, APIs)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Typical uses:"})," location finder, delivery tracking, heatmaps, territory overlays, store/ATM locator, route visualizations."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary (plain-English)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Tile:"})," A square image (usually 256×256 px) that is one piece of the map. Many tiles form the full map at a given zoom."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tile server:"})," A server that provides map tiles. Can serve ",e.jsx("i",{children:"raster"})," (PNG/JPEG) or",e.jsx("i",{children:" vector"})," tiles (PBF)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Raster vs vector tiles:"})," Raster tiles are pre-rendered images. Vector tiles are raw geometry styled in the browser (crisper labels, dynamic styling)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CRS / Projection:"})," Mathematical way to flatten Earth onto a 2D map. Most web maps use Web Mercator (EPSG:3857)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Slippy map:"})," The common pan/zoom map UX with tiles loading as you move."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Layer:"})," A visual set of features (e.g., roads, buildings, your markers) drawn on top of the base map."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Marker:"})," A point on the map (e.g., a pin). Often clickable to show details."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Popup / InfoWindow:"})," A small panel attached to a marker or coordinate that shows info."]}),e.jsxs("li",{children:[e.jsx("b",{children:"GeoJSON:"})," A JSON format for geographic data (Points, LineStrings, Polygons)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Geocoding:"})," Convert an address/place name → coordinates. ",e.jsx("b",{children:"Reverse geocoding:"}),"coordinates → human-readable address."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rate limit:"})," The maximum calls per time window allowed by an API provider."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Clustering:"})," Group nearby markers into one symbol at lower zooms to improve performance/clarity."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Popular Libraries & When to Use"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Leaflet:"})," Lightweight, raster-first mapping. Simple API, huge plugin ecosystem. Great for quick store locators and simple overlays."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MapLibre GL:"})," Open-source vector maps (Mapbox GL fork). Crisp labels, dynamic styling, 3D buildings, good for modern vector tile pipelines."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Google Maps JS API:"})," Familiar basemap + built-in extras (Places, Directions). Commercial terms and billing apply; easy geocoding/places search."]}),e.jsxs("li",{children:[e.jsx("b",{children:"OpenLayers:"})," Powerful GIS-focused toolkit if you need advanced projections and heavy analysis layers."]})]}),e.jsxs(r.Small,{children:["Rule of thumb: ",e.jsx("i",{children:"Leaflet"})," for simple, ",e.jsx("i",{children:"MapLibre GL"})," for vector style control,",e.jsx("i",{children:" Google Maps"})," for Places/Directions integration."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Environment & API Keys (Vite)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Use ",e.jsx("b",{children:".env"})," files and Vite's ",e.jsx(r.InlineCode,{children:"import.meta.env"})," to store keys. Prefix public keys with ",e.jsx(r.InlineCode,{children:"VITE_"}),"."]}),e.jsx("li",{children:"Never hardcode secrets in the repo. For server-only secrets (e.g., paid geocoding), proxy via your backend."}),e.jsxs("li",{children:["Respect provider ",e.jsx("b",{children:"usage caps"})," and ",e.jsx("b",{children:"rate limits"}),"; cache where possible."]})]}),e.jsx(r.Pre,{children:`// .env
VITE_MAPTILES_URL="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
VITE_GOOGLE_MAPS_API_KEY="your_public_key"`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Example: Minimal Leaflet (conceptual)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"What it shows:"})," init map, add tile layer, place a marker, attach popup."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Install (outside of notes):"})," ",e.jsx(r.InlineCode,{children:"npm i leaflet"})," and include the Leaflet CSS."]})]}),e.jsx(r.Pre,{children:`import L from "leaflet";
import React from "react";

export function LeafletNote() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current).setView([12.9716, 77.5946], 12);
    L.tileLayer(import.meta.env.VITE_MAPTILES_URL, { maxZoom: 19 }).addTo(map);

    const marker = L.marker([12.9716, 77.5946]).addTo(map);
    marker.bindPopup("Bengaluru");

    return () => map.remove();
  }, []);

  return <div ref={ref} style={{ height: 360, borderRadius: 12 }} />;
}`}),e.jsx(r.Small,{children:"Leaflet works great with raster tiles (OpenStreetMap). For many markers, consider a clustering plugin to avoid slowdowns."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Example: MapLibre GL (vector tiles)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"What it shows:"})," vector basemap and a symbol layer from GeoJSON."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Install (outside notes):"})," ",e.jsx(r.InlineCode,{children:"npm i maplibre-gl"})]})]}),e.jsx(r.Pre,{children:`import maplibregl from "maplibre-gl";
import React from "react";

export function MapLibreNote() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const map = new maplibregl.Map({
      container: ref.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [77.5946, 12.9716],
      zoom: 11
    });

    map.on("load", () => {
      map.addSource("stores", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            { type: "Feature", geometry: { type: "Point", coordinates: [77.6, 12.97] }, properties: { name: "Store A" } },
            { type: "Feature", geometry: { type: "Point", coordinates: [77.59, 12.98] }, properties: { name: "Store B" } }
          ]
        }
      });

      map.addLayer({
        id: "stores-layer",
        type: "symbol",
        source: "stores",
        layout: { "icon-image": "marker-15", "text-field": ["get", "name"], "text-offset": [0, 1.2], "text-anchor": "top" }
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={ref} style={{ height: 360, borderRadius: 12 }} />;
}`}),e.jsx(r.Small,{children:"Vector tiles allow dynamic styling and crisp rendering at any zoom level. Use a style JSON URL (self-hosted or provider-hosted)."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Example: Google Maps JS API (minimal)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"What it shows:"})," loading the script, creating a map, and adding a marker."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Billing:"})," Google Maps requires a billing-enabled project; watch quotas and costs."]})]}),e.jsx(r.Pre,{children:`// Load script in index.html with your key:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY" async defer><\/script>

import React from "react";

export function GoogleMapsNote() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !window.google) return;
    const map = new window.google.maps.Map(ref.current, {
      center: { lat: 12.9716, lng: 77.5946 },
      zoom: 12,
      disableDefaultUI: true
    });

    new window.google.maps.Marker({
      position: { lat: 12.9716, lng: 77.5946 },
      map,
      title: "Bengaluru"
    });
  }, []);

  return <div ref={ref} style={{ height: 360, borderRadius: 12 }} />;
}`}),e.jsx(r.Small,{children:"Prefer environment variables for keys. For places search/directions, consider server-side proxies to protect quotas and enforce business rules."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"React State → Markers (data-driven)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Keep ",e.jsx("b",{children:"location data"})," in React state. When the state changes, update markers on the map."]}),e.jsx("li",{children:"For many markers, throttle updates (e.g., on drag/zoom) and/or cluster to keep frame rates smooth."})]}),e.jsx(r.Pre,{children:`// Pseudocode pattern (library-agnostic)
function useVisibleStores(bounds, allStores) {
  // bounds: current map view box; filter stores within bounds
  return React.useMemo(
    () => allStores.filter(s => bounds.contains([s.lng, s.lat])),
    [bounds, allStores]
  );
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Accessibility & UX"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Keyboard:"})," Expose non-map controls (filters, list, “Zoom to my location”). Don't lock users inside the canvas only."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Announcements:"})," When a marker is selected, update off-screen text for screen readers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallback:"})," Provide a list/table view for users on low-power devices or with JS disabled."]}),e.jsxs("li",{children:[e.jsx("b",{children:"No portals?"})," If you avoid React portals, render map popups using the library's native popup system, and keep React for surrounding UI."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Performance Tips"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Cluster markers"})," at low zooms; draw individual points only when zoomed in."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Debounce/throttle"})," heavy work (fetching, filtering) during ",e.jsx("i",{children:"move"})," and ",e.jsx("i",{children:"zoom"})," events."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memoize"})," derived data (visible points, styled features) to avoid recomputing on every render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dispose"})," maps on unmount to prevent memory leaks."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don't"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," store keys in ",e.jsx(r.InlineCode,{children:".env"})," and use ",e.jsx(r.InlineCode,{children:"import.meta.env"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," read provider T&Cs for attribution and usage limits."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," provide graceful fallbacks (errors, no-data, offline)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," push secret keys to the client—proxy sensitive calls via backend."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," render thousands of DOM markers—cluster or use canvas/WebGL layers."]})]})]}),e.jsx(r.Callout,{children:"Summary: Pick the right library for your use case, keep data in React state, update the map from state changes, and watch keys/quotas. Start simple with Leaflet, move to MapLibre GL for vector styling, or choose Google Maps when you need Places/Directions out of the box."})]});export{n as default};
