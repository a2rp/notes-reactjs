import{j as e}from"./index-DUO2rjrc.js";import{S as i}from"./styled-EwTbSdcd.js";const n=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Media / Audio / Video"}),e.jsxs(i.Lead,{children:["This page covers working with ",e.jsx("b",{children:"<audio>"})," and ",e.jsx("b",{children:"<video>"})," in React: how to load media, control playback, add captions, handle autoplay, record from mic/camera, and when to reach for the Web Audio API or streaming (HLS/DASH)."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core Definitions"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"HTMLMediaElement:"})," The DOM interface implemented by ",e.jsx(i.InlineCode,{children:"<audio>"})," and ",e.jsx(i.InlineCode,{children:"<video>"})," providing properties like ",e.jsx(i.InlineCode,{children:"currentTime"}),", ",e.jsx(i.InlineCode,{children:"paused"}),", ",e.jsx(i.InlineCode,{children:"volume"}),", and methods such as ",e.jsx(i.InlineCode,{children:"play()"}),"/",e.jsx(i.InlineCode,{children:"pause()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Source selection:"})," Using multiple ",e.jsx(i.InlineCode,{children:'<source type="...; codecs=...">'})," allows the browser to pick a playable format. Check support with ",e.jsx(i.InlineCode,{children:"canPlayType()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Autoplay policy:"})," Most browsers block autoplay with sound. Use ",e.jsx(i.InlineCode,{children:"muted"})," + user gesture or show an obvious “Play” button."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tracks:"})," Subtitles/captions via ",e.jsx(i.InlineCode,{children:'<track kind="subtitles" ... />'})," (e.g., WebVTT files)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Web Audio API:"})," Low-level audio graph for effects, analysis (spectrum), mixing, and visualization."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MSE / HLS / DASH:"})," For long videos or live streams, use a streaming protocol and a player library (e.g., hls.js for HLS in browsers without native support)."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Audio: Minimal Player"}),e.jsx(i.Pre,{children:`function AudioPlayer() {
  const ref = React.useRef(null);

  function play() {
    // play() returns a Promise that may reject if autoplay is disallowed
    ref.current?.play().catch(() => {
      // Show UI asking the user to click Play
    });
  }
  function pause() { ref.current?.pause(); }

  return (
    <div>
      <audio
        ref={ref}
        controls
        preload="metadata"
        src="/media/lofi.mp3"
      />
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
      </div>
    </div>
  );
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Tip:"})," Use ",e.jsx(i.InlineCode,{children:'preload="metadata"'})," to load only duration/metadata—faster initial paint."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Video: Sources, Poster, and Captions"}),e.jsx(i.Pre,{children:`function VideoLesson() {
  return (
    <video
      controls
      playsInline
      poster="/media/intro-poster.jpg"
      width={800}
      preload="metadata"
      // If you must attempt autoplay, set muted and still handle rejections.
      // muted
      // autoPlay
    >
      <source src="/media/intro-720.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
      <source src="/media/intro-720.webm" type='video/webm; codecs="vp9, vorbis"' />
      <track
        kind="subtitles"
        srcLang="en"
        src="/media/intro.en.vtt"
        label="English"
        default
      />
      {/* Fallback text for very old browsers */}
      Your browser does not support HTML5 video.
    </video>
  );
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Captions:"})," Use WebVTT (",e.jsx(i.InlineCode,{children:".vtt"}),") files. Toggle via the built-in “CC” control or JS APIs."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Programmatic Control (Refs)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Common props:"})," ",e.jsx(i.InlineCode,{children:"controls"}),", ",e.jsx(i.InlineCode,{children:"loop"}),", ",e.jsx(i.InlineCode,{children:"muted"}),", ",e.jsx(i.InlineCode,{children:"playsInline"}),", ",e.jsx(i.InlineCode,{children:"controlsList"})," (e.g., ",e.jsx(i.InlineCode,{children:"nodownload"}),"), ",e.jsx(i.InlineCode,{children:"crossOrigin"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Useful methods:"})," ",e.jsx(i.InlineCode,{children:"play()"}),", ",e.jsx(i.InlineCode,{children:"pause()"}),", ",e.jsx(i.InlineCode,{children:"load()"})," and setting ",e.jsx(i.InlineCode,{children:"currentTime"}),", ",e.jsx(i.InlineCode,{children:"playbackRate"}),", ",e.jsx(i.InlineCode,{children:"volume"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Events:"})," ",e.jsx(i.InlineCode,{children:"onLoadedMetadata"}),", ",e.jsx(i.InlineCode,{children:"onTimeUpdate"}),", ",e.jsx(i.InlineCode,{children:"onEnded"}),", ",e.jsx(i.InlineCode,{children:"onError"}),"."]})]}),e.jsx(i.Pre,{children:`function ScrubExample() {
  const ref = React.useRef(null);
  const [time, setTime] = React.useState(0);

  function onTimeUpdate() {
    setTime(ref.current?.currentTime ?? 0);
  }
  function seek(e) {
    const t = Number(e.target.value);
    if (ref.current) ref.current.currentTime = t;
  }

  return (
    <div>
      <video ref={ref} src="/media/clip.mp4" onTimeUpdate={onTimeUpdate} controls />
      <input
        type="range"
        min={0}
        max={60}
        value={time}
        onChange={seek}
        aria-label="Scrub playback position"
      />
    </div>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Autoplay Policy & Good UX"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Most browsers block autoplay with sound. If you must, set ",e.jsx(i.InlineCode,{children:"muted"})," and start playback after a user gesture (click/tap)."]}),e.jsx("li",{children:"Always render a visible Play control; tell users why playback didn't start if it's blocked."}),e.jsx("li",{children:"Respect user settings (reduced motion, prefers-reduced-data if available)."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Picture-in-Picture & Fullscreen"}),e.jsx(i.Pre,{children:`async function togglePip(video) {
  // Some browsers require a direct user gesture for PiP
  if (document.pictureInPictureElement) {
    await document.exitPictureInPicture();
  } else if (video && document.pictureInPictureEnabled) {
    await video.requestPictureInPicture();
  }
}

async function toggleFullscreen(el) {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else {
    await el?.requestFullscreen();
  }
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Note:"})," Safari/iOS may have differences; test across devices."]})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Capture from Mic/Camera (",e.jsx("code",{children:"getUserMedia"}),")"]}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"getUserMedia:"})," Asks for permission to use the microphone/camera and returns a ",e.jsx("b",{children:"MediaStream"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MediaStream:"})," A stream of audio/video tracks; you can assign it to ",e.jsx(i.InlineCode,{children:"video.srcObject"}),"."]})]}),e.jsx(i.Pre,{children:`function CameraPreview() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    let stream;
    async function setup() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (ref.current) ref.current.srcObject = stream;
      } catch (err) {
        console.error("Permission or device error:", err);
      }
    }
    setup();
    return () => {
      stream?.getTracks().forEach(t => t.stop());
    };
  }, []);

  return <video ref={ref} autoPlay playsInline />;
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Security:"})," Requires HTTPS (or localhost) and explicit user permission."]})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Recording (",e.jsx("code",{children:"MediaRecorder"}),")"]}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"MediaRecorder:"})," Encodes a ",e.jsx("b",{children:"MediaStream"})," to chunks (e.g., WebM) you can save or upload."]}),e.jsxs("li",{children:["Works well with ",e.jsx(i.InlineCode,{children:"getUserMedia"})," streams."]})]}),e.jsx(i.Pre,{children:`function MicRecorder() {
  const [rec, setRec] = React.useState(null);
  const [url, setUrl] = React.useState("");

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];
    recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      setUrl(URL.createObjectURL(blob));
      stream.getTracks().forEach(t => t.stop());
    };
    recorder.start();
    setRec(recorder);
  }

  function stop() { rec?.stop(); }

  return (
    <div>
      <button onClick={start} disabled={!!rec}>Start</button>
      <button onClick={stop} disabled={!rec}>Stop</button>
      {url && <audio controls src={url} />}
    </div>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Web Audio API (At a Glance)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"AudioContext:"})," The engine. Create nodes (sources, gains, filters, analyzers) and connect them into a graph."]}),e.jsxs("li",{children:[e.jsx("b",{children:"AnalyserNode:"})," Real-time frequency/time-domain data for visualizations (e.g., canvas bars/waveforms)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use cases:"})," Volume normalization, effects, mixing multiple audio sources, visualizers."]})]}),e.jsx(i.Pre,{children:`async function basicWebAudio(bufferArrayBuffer) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const buffer = await ctx.decodeAudioData(bufferArrayBuffer);
  const src = ctx.createBufferSource();
  src.buffer = buffer;

  const gain = ctx.createGain();
  gain.gain.value = 0.8; // 80% volume

  src.connect(gain).connect(ctx.destination);
  src.start();
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Streaming Overview (HLS/DASH)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Why streaming:"})," Better startup time, adaptive bitrate, seeking without pre-downloading the entire file."]}),e.jsxs("li",{children:[e.jsx("b",{children:"HLS:"})," Widely used; Safari supports natively. For other browsers, use a JS player (e.g., hls.js) + a simple ",e.jsx(i.InlineCode,{children:"<video>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DASH:"})," Similar idea with different packaging; use dash.js or a commercial player."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MSE:"})," Media Source Extensions allow JavaScript to feed media segments to the video element."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Performance & Delivery"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Preload wisely:"})," ",e.jsx(i.InlineCode,{children:'preload="none"'})," when media shouldn't load until user interacts; ",e.jsx(i.InlineCode,{children:"metadata"})," for duration/size only."]}),e.jsxs("li",{children:[e.jsx("b",{children:"File size:"})," Compress audio (AAC/Opus) and video (H.264/VP9/AV1). Provide reasonable resolutions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Caching/CDN:"})," Serve via CDN with proper cache headers. Use ",e.jsx(i.InlineCode,{children:"crossOrigin"})," when drawing frames to ",e.jsx(i.InlineCode,{children:"<canvas>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Seekability:"})," For long MP4 files, ensure a ",e.jsx("i",{children:"fast start"})," (moov atom at the beginning) so the browser can seek without downloading the whole file."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Accessibility"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Always provide captions/subtitles for spoken content (",e.jsx(i.InlineCode,{children:'<track kind="subtitles">'}),")."]}),e.jsx("li",{children:"Ensure controls are keyboard operable; labels should be clear and visible."}),e.jsxs("li",{children:["Respect ",e.jsx("b",{children:"reduced motion"})," preferences on heavy visualizations."]}),e.jsx("li",{children:"Provide transcripts for audio-only content when possible."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use multiple sources and check ",e.jsx(i.InlineCode,{children:"canPlayType()"})," if formats vary."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," handle ",e.jsx(i.InlineCode,{children:"play()"})," promise rejections (autoplay/permissions)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," clean up streams (",e.jsx(i.InlineCode,{children:"getTracks().forEach(t => t.stop())"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," hide controls without offering equivalent custom controls."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," rely on autoplay with sound; it will likely be blocked."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"MediaStream:"})," Live stream of audio/video tracks (from camera/mic or screen)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MediaRecorder:"})," API to record a ",e.jsx("b",{children:"MediaStream"})," into encoded chunks (e.g., WebM)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"WebVTT:"})," Text format for captions/subtitles in web video (",e.jsx(i.InlineCode,{children:".vtt"})," files)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"HLS/DASH:"})," Adaptive streaming protocols delivering media in small segments at multiple bitrates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MSE:"})," Media Source Extensions—JS feeds segments directly to the media element for custom streaming."]})]})]}),e.jsxs(i.Callout,{children:["Summary: Start with native ",e.jsx("b",{children:"<audio>"}),"/",e.jsx("b",{children:"<video>"}),", add captions, control playback via refs, and handle autoplay/permissions gracefully. For real-time input, use ",e.jsx("b",{children:"getUserMedia"})," and",e.jsx("b",{children:" MediaRecorder"}),". For complex audio work, try the ",e.jsx("b",{children:"Web Audio API"}),". For long or live video, use a streaming protocol and a player library."]})]});export{n as default};
