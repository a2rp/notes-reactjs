import{j as e}from"./index-BExKNf87.js";import{S as i}from"./styled-C0VyYXNz.js";const l=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Image Optimization (ImageOptim)"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"Image optimization"})," is the practice of delivering the ",e.jsx("i",{children:"smallest, correctly-sized, and right-format"})," image for a device so pages load fast and look sharp. Well-optimized images reduce data usage, improve ",e.jsx(i.InlineCode,{children:"LCP"}),", and prevent layout jank."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Goals"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Small transfer size:"})," compress and choose efficient formats."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Correct dimensions:"})," send just enough pixels for the display/device."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Predictable layout:"})," reserve space to avoid ",e.jsx(i.InlineCode,{children:"CLS"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fast display:"})," decode/paint quickly; prioritize hero images for ",e.jsx(i.InlineCode,{children:"LCP"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Accessible content:"})," always include meaningful ",e.jsx(i.InlineCode,{children:"alt"})," text."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Choose the right format"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"JPEG/JPG:"})," lossy, great for ",e.jsx("i",{children:"photos"}),". Small and widely supported."]}),e.jsxs("li",{children:[e.jsx("b",{children:"PNG:"})," lossless, supports transparency (",e.jsx(i.InlineCode,{children:"alpha"}),"); good for ",e.jsx("i",{children:"UI/flat graphics"}),", screenshots, logos (when vector not possible)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"WebP:"})," modern lossy/lossless; usually smaller than JPEG/PNG at similar quality."]}),e.jsxs("li",{children:[e.jsx("b",{children:"AVIF:"})," newer, often ",e.jsx("i",{children:"smallest files"})," for photos; supports HDR/alpha; decoding can be slower on some devices."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SVG:"})," vector graphics; sharp at any size; ideal for logos/icons/illustrations."]})]}),e.jsx(i.Small,{children:"Rule of thumb: SVG for logos/icons; AVIF/WebP for photos; PNG when you need crisp lossless with transparency."})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Compression types"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Lossy:"})," throws away some detail (e.g., JPEG, WebP, AVIF). Tuned via ",e.jsx("i",{children:"quality"})," (e.g., 40-80). Much smaller."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lossless:"})," preserves exact pixels (e.g., PNG, WebP-lossless, AVIF-lossless). Larger; best for UI/diagrams."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Reserve space to prevent CLS"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Set ",e.jsx(i.InlineCode,{children:"width"})," and ",e.jsx(i.InlineCode,{children:"height"})," attributes on"," ",e.jsx(i.InlineCode,{children:"<img>"}),". Browsers compute the aspect ratio and reserve space before the file loads."]}),e.jsxs("li",{children:["Or use CSS ",e.jsx(i.InlineCode,{children:"aspect-ratio"})," on a wrapper. Keep dimensions consistent across breakpoints."]})]}),e.jsx(i.Pre,{children:`/* HTML with intrinsic size */
<img
  src="/images/hero.avif"
  width="1200"
  height="800"
  alt="Team working at a whiteboard"
/>

/* Or CSS aspect ratio */
.figure {
  aspect-ratio: 3 / 2;   /* 1200x800 */
  overflow: hidden;
}
.figure > img { width: 100%; height: 100%; object-fit: cover; }`})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Responsive images: ",e.jsx("code",{children:"srcset"})," & ",e.jsx("code",{children:"sizes"})]}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(i.InlineCode,{children:"srcset"})," (width descriptors):"]})," provide multiple widths; the browser picks the best file for the viewport and"," ",e.jsx(i.InlineCode,{children:"DPR"}),"."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(i.InlineCode,{children:"sizes"}),":"]})," tell the browser how wide the image will ",e.jsx("i",{children:"render"})," at various breakpoints (CSS-like hints)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DPR (Device Pixel Ratio):"}),' ratio of device pixels to CSS pixels (e.g., 2x "Retina"). Higher DPR needs more source pixels for sharpness.']})]}),e.jsx(i.Pre,{children:`<!-- Image renders ~100vw on phones, ~50vw on tablets, 33vw on desktops -->
<img
  src="/images/card-800.avif"
  srcSet="/images/card-400.avif 400w,
          /images/card-800.avif 800w,
          /images/card-1200.avif 1200w"
  sizes="(max-width: 600px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
  width="1200" height="800"
  alt="Product teaser"
/>`})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Format fallback & art direction with ",e.jsx("code",{children:"<picture>"})]}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Format fallback:"})," offer AVIF/WebP first, then JPEG/PNG fallback via"," ",e.jsx(i.InlineCode,{children:'<source type="image/avif">'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Art direction:"})," swap ",e.jsx("i",{children:"different crops"})," per breakpoint (e.g., tight portrait on mobile, wide landscape on desktop)."]})]}),e.jsx(i.Pre,{children:`<picture>
  <!-- Prefer AVIF, then WebP, then fallback -->
  <source type="image/avif"
          srcSet="/hero-800.avif 800w, /hero-1200.avif 1200w, /hero-1600.avif 1600w" />
  <source type="image/webp"
          srcSet="/hero-800.webp 800w, /hero-1200.webp 1200w, /hero-1600.webp 1600w" />
  <img
    src="/hero-1200.jpg"
    srcSet="/hero-800.jpg 800w, /hero-1200.jpg 1200w, /hero-1600.jpg 1600w"
    sizes="(max-width: 600px) 100vw, 80vw"
    width="1600" height="900"
    alt="Hero team collaborating"
/>
</picture>`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Loading strategy & priority"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(i.InlineCode,{children:'loading="lazy"'}),":"]})," defer off-screen images until scrolled into view (saves data)."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(i.InlineCode,{children:'decoding="async"'}),":"]})," decode off the main thread when possible; improves responsiveness."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(i.InlineCode,{children:"fetchpriority"}),":"]})," hint priority (",e.jsx(i.InlineCode,{children:'"high"'})," for the LCP/hero)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Preload hero:"})," in ",e.jsx(i.InlineCode,{children:"<head>"})," you can"," ",e.jsx(i.InlineCode,{children:'<link rel="preload" as="image">'})," a critical image."]})]}),e.jsx(i.Pre,{children:`<!-- Head: preload the hero (exact URL you will use) -->
<link rel="preload" as="image" href="/images/hero-1200.avif" imagesrcset="/images/hero-800.avif 800w, /images/hero-1200.avif 1200w, /images/hero-1600.avif 1600w" imagesizes="100vw" />

<!-- Body: mark hero as high priority -->
<img
  src="/images/hero-1200.avif"
  width="1200" height="800"
  fetchpriority="high"
  alt="Hero"
/>

<!-- Lazy-load below-the-fold images -->
<img src="/images/gallery-1.webp" width="800" height="600" loading="lazy" decoding="async" alt="Gallery item" />`})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Background images & ",e.jsx("code",{children:"image-set()"})]}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Backgrounds:"})," use when the image is decorative. Don't hide content that needs ",e.jsx(i.InlineCode,{children:"alt"}),"."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(i.InlineCode,{children:"image-set()"}),":"]})," provide multiple resolutions/formats in CSS for DPR and format support."]})]}),e.jsx(i.Pre,{children:`.hero {
  background-image: image-set(
    url("/bg.avif") type("image/avif") 1x,
    url("/bg@2x.avif") type("image/avif") 2x,
    url("/bg.webp") type("image/webp") 1x
  );
  background-size: cover;
  background-position: center;
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Placeholders (blur-up)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Blur-up:"})," show a tiny blurred image first, then swap to the full image (perceived speed)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Solid/gradient:"})," fast lightweight placeholder that matches dominant colors."]})]}),e.jsx(i.Pre,{children:`/* Example concept: tiny blurred data URL as placeholder */
<img
  src="/images/photo-800.avif"
  width="800" height="600"
  style={{ background: "url('data:image/jpeg;base64,/9j/4AAQ...') center/cover no-repeat" }}
  alt="Landscape"
/>`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"CDN transforms & caching"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Image CDN:"})," services (e.g., Cloudinary/Imgix/etc.) can auto-convert, resize, and compress on the fly via URL params."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Caching:"})," fingerprint filenames (e.g., ",e.jsx(i.InlineCode,{children:"hero.abc123.avif"}),") and set long ",e.jsx(i.InlineCode,{children:"Cache-Control"})," headers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Client Hints:"})," some CDNs use DPR/Width hints to serve optimal sizes automatically."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Accessibility basics"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Alt text:"})," describe the image's purpose; if purely decorative, use ",e.jsx(i.InlineCode,{children:'alt=""'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do not"})," bake text into images for essential content—use real HTML text."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Testing & auditing"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Use Lighthouse/Pagespeed to check ",e.jsx(i.InlineCode,{children:"LCP"}),"/",e.jsx(i.InlineCode,{children:"CLS"})," and image hints."]}),e.jsxs("li",{children:["Spot-check actual file sizes and chosen candidates in DevTools (",e.jsx("i",{children:"Network"})," + ",e.jsx("i",{children:"Elements"})," → ",e.jsx("code",{children:"CurrentSrc"}),")."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," supply ",e.jsx(i.InlineCode,{children:"width"}),"/",e.jsx(i.InlineCode,{children:"height"})," (or aspect-ratio) to avoid CLS."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(i.InlineCode,{children:"srcset"}),"/",e.jsx(i.InlineCode,{children:"sizes"})," for responsive images."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," pick modern formats (AVIF/WebP) with JPEG/PNG fallbacks when needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," ship a single giant 4K image to all devices."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," use background images for meaningful content that needs ",e.jsx(i.InlineCode,{children:"alt"}),"."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"LCP (Largest Contentful Paint):"})," time until the largest element (often the hero image) is visible."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CLS (Cumulative Layout Shift):"})," score of visual movement after load; images without reserved space cause shifts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DPR (Device Pixel Ratio):"})," device pixels per CSS pixel (1x, 2x, 3x...). Higher DPR needs higher-res sources."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Art direction:"})," delivering ",e.jsx("i",{children:"different crops"})," of the same asset for different screens."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Intrinsic size:"})," the natural pixel width/height of the source image."]})]})]}),e.jsxs(i.Callout,{children:["Summary: pick a modern format, provide multiple sizes with ",e.jsx("i",{children:"srcset/sizes"}),", reserve space with width/height or aspect-ratio, and lazy-load non-critical images. Prioritize the hero image for fast LCP."]})]});export{l as default};
