import "https://cdn.plot.ly/plotly-2.35.1.min.js";
import "./forest.js";
import "./ksvF0.js";
import "./recorder.js";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

/**
 * @typedef {Object} FormantScatterplot
 * @property {string} element
 * @property {object[]} traces
 * @property {object} layout
 */

var audioContext = null;
var audioInput = null,
  realAudioInput = null,
  inputPoint = null,
  audioRecorder = null;
var rafID = null;
var analyserContext = null;
var analyserNode = null;
var canvasWidth, canvasHeight;
var recIndex = 0;
var speaker = "female";
var lastRecording;
var traces = [];
var layout = {};
var scatterplotElement;
var timelineElement;

let plotMode = 'scatter';          // 'scatter' | 'heatmap'
let lastPoints = { xs: [], ys: [] };

function renderFromCache() {
  if (!scatterplotElement) return;

  // keep vowel label layer if present
  const labelLayer = (traces.length && traces[traces.length - 1].mode === 'text')
    ? [traces[traces.length - 1]]
    : [];

  // if you added plotTheme() earlier, use it; otherwise hardcode a color
  const tAccent = (typeof plotTheme === 'function') ? plotTheme().accent : '#d2782a';

  if (plotMode === 'heatmap') {
    const heat = {
      type: 'histogram2d',
      x: lastPoints.xs, y: lastPoints.ys,
      nbinsx: 28, nbinsy: 16,
      colorscale: [
        [0.0, 'rgba(0,0,0,0)'],
        [0.2, 'rgba(255,255,255,0.15)'],
        [0.5, 'rgba(255,180,100,0.6)'],
        [1.0, tAccent],
      ],
      showscale: false,
      zsmooth: 'best',
    };
    Plotly.react(scatterplotElement, [heat, ...labelLayer], layout);
  } else {
    const scatter = {
      type: 'scatter', mode: 'markers',
      x: lastPoints.xs, y: lastPoints.ys,
      marker: { size: 6, line: { width: 0 } },
      hoverinfo: 'none', opacity: 1,
    };
    Plotly.react(scatterplotElement, [scatter, ...labelLayer], layout);
  }
}

/* -------------------- THEME HELPERS -------------------- */
function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
function plotTheme() {
  return {
    text:   cssVar('--text')        || '#444',
    main:   cssVar('--main-text')   || '#111',
    border: cssVar('--border')      || '#777',
    bg:     cssVar('--menu-bg')     || '#fff',
    plotBg: cssVar('--button-bg')   || '#f7f7f7',
    accent: cssVar('--orange')      || '#d2782a',
    faint:  'rgba(0,0,0,0.12)',
    font:   cssVar('--ff')          || 'Montserrat, system-ui, sans-serif',
  };
}

/* keep last formants so we can re-tint shapes on theme change */
let lastFormants = null;
let lastHighlighted = null;

/* observe data-theme changes set by your Night Mode toggle */
function observeThemeChanges() {
  const obs = new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'attributes' && m.attributeName === 'data-theme') {
        applyPlotTheme();
      }
    }
  });
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // also respect system scheme changes if you rely on prefers-color-scheme
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyPlotTheme);
  } catch {}
}

function applyPlotTheme() {
  if (!scatterplotElement) return;
  const t = plotTheme();

  // Update colours on axes, fonts, backgrounds
  const relayout = {
    plot_bgcolor: t.plotBg,
    paper_bgcolor: 'rgba(0,0,0,0)',
    'font.family': t.font,
    'font.color':  t.main,
    'xaxis.color': t.text, 'yaxis.color': t.text,
    'xaxis.gridcolor': t.faint, 'yaxis.gridcolor': t.faint,
    'xaxis.titlefont.color': t.main, 'yaxis.titlefont.color': t.main,
  };

  // Rebuild shapes with new theme if we have formants cached
  if (lastFormants) {
    layout.shapes = lastFormants.flatMap((f) =>
      createFormantShape(f, lastHighlighted ? f.vowel === lastHighlighted : false, t)
    );
  }

  // Ensure label text matches theme
  if (traces.length && traces[traces.length - 1].mode === 'text') {
    traces[traces.length - 1].textfont = { ...(traces[traces.length - 1].textfont || {}), color: t.main };
  }

  Plotly.react(scatterplotElement, traces, { ...layout, ...relayout });
}

/* -------------------- TIMELINE (unchanged) -------------------- */
const timelineLayout = {
  dragmode: false,
  xaxis: { title: "Time (s)", minallowed: 0 },
  yaxis: { showgrid: false, title: "Bark scale frequency", range: [1, 24] },
  autosize: true,
  hovermode: "x",
  plot_bgcolor: "#84a830ff",
  margin: { l: 50, r: 50, b: 50, t: 20 },
  colorway: ["#a4c2f4", "#ea9999", "#f3cec9", "#ffd966"],
};

function hzToBark(freqHz) {
  return 26.81 / (1 + 1960 / freqHz) - 0.53; // Traunmüller (1990)
}

export function initialiseTimeline(timelineEl) {
  timelineElement = timelineEl;
  Plotly.newPlot(timelineEl, [], timelineLayout, {
    displayModeBar: false,
    doubleClick: false,
    staticPlot: true,
    responsive: true,
  });
}

export function setSpeakerGender(val) { speaker = val; }
export function getLastRecording() { return new Audio(URL.createObjectURL(lastRecording)); }

/* -------------------- SCATTER / HEATMAP MODE -------------------- */
export function setPlotMode(mode) {
  plotMode = (mode === 'heatmap') ? 'heatmap' : 'scatter';
  renderFromCache(); // <- immediate re-render from cached points
}


/* -------------------- SCATTERPLOT INIT -------------------- */
export function initScatterplot(plotElement) {
  scatterplotElement = plotElement;
  const t = plotTheme();

  layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: t.plotBg,
    font: { family: t.font, color: t.main },
    annotations: [
      { xref: "paper", yref: "paper", x: 0,   xanchor: "right", y: 1, yanchor: "bottom", text: "Closed", showarrow: false },
      { xref: "paper", yref: "paper", x: 0,   xanchor: "right", y: 0, yanchor: "bottom", text: "Open",   showarrow: false },
      { xref: "paper", yref: "paper", x: 0,   xanchor: "left",  y: 0, yanchor: "top",    text: "Front",  showarrow: false },
      { xref: "paper", yref: "paper", x: 1,   xanchor: "left",  y: 0, yanchor: "top",    text: "Back",   showarrow: false },
    ],
    dragmode: false,
    hoverinfo: "none",
    hovermode: "x",
    clickmode: "event",
    xaxis: {
      showticklabels: false, zeroline: false, range: [16.5, 5.5],
      title: "Tongue Position (F2)", color: t.text, gridcolor: t.faint, titlefont: { color: t.main }
    },
    yaxis: {
      showticklabels: false, zeroline: false, range: [9, 2],
      title: "Mouth Openness (F1)", color: t.text, gridcolor: t.faint, titlefont: { color: t.main }
    },
    autosize: true,
    margin: { l: 50, r: 50, b: 50, t: 20 },
    showlegend: false,
  };

  Plotly.newPlot(plotElement, null, layout, {
    displayModeBar: false,
    doubleClick: false,
    staticPlot: true,
    responsive: true,
  });

  observeThemeChanges(); // auto-update when Night Mode toggles
}

/* -------------------- LABELS + ELLIPSES -------------------- */
export function updateAnnotations(plotElement, lang) {
  const annotations = [
    { xref: "paper", yref: "paper", x: 0, xanchor: "right", y: 1, yanchor: "bottom", text: lang === "en" ? "Closed" : "Kati",     showarrow: false },
    { xref: "paper", yref: "paper", x: 0, xanchor: "right", y: 0, yanchor: "bottom", text: lang === "en" ? "Open"   : "Tuwhera",  showarrow: false },
    { xref: "paper", yref: "paper", x: 0, xanchor: "left",  y: 0, yanchor: "top",    text: lang === "en" ? "Front"  : "Mua",      showarrow: false },
    { xref: "paper", yref: "paper", x: 1, xanchor: "left",  y: 0, yanchor: "top",    text: lang === "en" ? "Back"   : "Muri",     showarrow: false },
  ];
  layout.annotations = annotations;
  layout.xaxis.title = (lang === "en" ? "Tongue Position (F2)" : "Takoto o te arero (F2)");
  layout.yaxis.title = (lang === "en" ? "Mouth Openness (F1)" : "Tuwhera o te waha (F1)");
  Plotly.relayout(plotElement, layout);
}

export function updateFormantEllipses(plotElement, formants, highlightedVowel) {
  const t = plotTheme();
  lastFormants = formants;
  lastHighlighted = highlightedVowel || null;

  const shapes = formants.flatMap((f) =>
    createFormantShape(f, highlightedVowel ? f.vowel == highlightedVowel : false, t)
  );

  traces = [
    {
      x: formants.map((r) => hzToBark(r["F2_mean"])),
      y: formants.map((r) => hzToBark(r["F1_mean"])),
      text: formants.map((r) => r.vowel),
      mode: "text",
      type: "scatter",
      hoverinfo: "none",
      textfont: { size: 20, color: t.main },
    },
  ];

  layout.shapes = shapes;
  Plotly.react(plotElement, traces, layout);
}

export function clearFormantTraces() { traces.length = 0; }

function createFormantShape(formant, isHighlighted, t = plotTheme()) {
  const shapes = [];
  const step = 0.05;
  for (let i = 0; i <= 1; i += step) {
    shapes.push({
      type: "circle", xref: "x", yref: "y",
      x0: hzToBark(formant["F2_mean"] - formant["F2_sd"] * i),
      y0: hzToBark(formant["F1_mean"] - formant["F1_sd"] * i),
      x1: hzToBark(formant["F2_mean"] + formant["F2_sd"] * i),
      y1: hzToBark(formant["F1_mean"] + formant["F1_sd"] * i),
      opacity: step / 2,
      fillcolor: isHighlighted ? t.accent : 'rgba(128,128,128,0.35)',
      line: { width: 0 },
    });
  }
  return shapes;
}

/* -------------------- ANALYSER (unchanged) -------------------- */
export function updateAnalysers(analyserElement) {
  if (!analyserContext) {
    canvasWidth = analyserElement.width;
    canvasHeight = analyserElement.height;
    analyserContext = analyserElement.getContext("2d");
  }
  var data = new Uint8Array(analyserNode.frequencyBinCount);
  analyserNode.getByteFrequencyData(data);
  analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
  analyserContext.fillStyle = "#F6D565";
  analyserContext.lineCap = "round";
  for (var x = 0; x < canvasWidth; x++) {
    var y = data[x];
    var hue = (x * 360) / canvasWidth;
    analyserContext.fillStyle = `hsl(${hue}, 100%, 50%)`;
    analyserContext.fillRect(x, canvasHeight, 1, -y);
  }
  rafID = window.requestAnimationFrame(updateAnalysers.bind(this, analyserElement));
}

async function gotStream(stream) {
  audioContext = new AudioContext();
  audioInput = audioContext.createMediaStreamSource(stream);
  analyserNode = audioContext.createAnalyser();
  analyserNode.fftSize = 2048;
  audioInput.connect(analyserNode);
  audioRecorder = new Recorder(audioInput);
}

function onError(e) { console.log(e); }

export function updateInputSource(inputId) {
  navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: { exact: inputId },
        autoGainControl: true,
        echoCancellation: true,
        noiseSuppression: true,
      },
    })
    .then(gotStream, onError);
}

/* -------------------- AUDIO INIT / RECORD -------------------- */
export function initAudio() {
  function resumePlayback() {
    if (audioContext.state == "suspended")
      audioContext.resume().then(() => { console.log("Playback resumed successfully"); });
  }
  window.addEventListener("mousedown", resumePlayback);
  window.addEventListener("keydown", resumePlayback);
  window.addEventListener("touchstart", resumePlayback);

  if (!navigator.cancelAnimationFrame)
    navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
  if (!navigator.requestAnimationFrame)
    navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

  const userMediaResult = navigator.mediaDevices.getUserMedia({
    audio: { autoGainControl: true, echoCancellation: true, noiseSuppression: true },
  });
  userMediaResult.then(gotStream, onError);
  return userMediaResult;
}

export function startRecording() {
  audioRecorder.clear();
  audioRecorder.record();
}

/* -------------------- WASM CACHE -------------------- */
window.ksvF0({ arguments: ["-X"] });
window.forest({ arguments: ["-X"] });

/* -------------------- PARSERS (unchanged) -------------------- */
function parse_FMS(fms) {
  var lines = fms.split("\n");
  var results = [];
  for (var line of lines) {
    if (!line) continue;
    var bits = line.split("\t");
    var result = {};
    result["time"] = parseFloat(bits[0].trim());
    var formants = bits[1].split(" ");
    for (var i = 0; i < formants.length; i++) { result[`F${i + 1}(Hz)`] = parseInt(formants[i]); }
    var bandwidths = bits[2].split(" ");
    for (var i = 0; i < bandwidths.length; i++) { result[`B${i + 1}(Hz)`] = parseInt(bandwidths[i]); }
    results.push(result);
  }
  return results;
}

function parse_F0(xassp) {
  var lines = xassp.split("\n");
  var results = [];
  for (var i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    var bits = lines[i].split("\t");
    var result = {};
    result["time"] = parseFloat(bits[0].trim());
    result["F0(Hz)"] = parseFloat(bits[1]);
    results.push(result);
  }
  return results;
}

/* -------------------- DONE ENCODING -> PLOT -------------------- */
async function doneEncoding(blob, post = true) {
  if (post) lastRecording = blob;

  let content = await blob.arrayBuffer();
  content = new Uint8Array(content);
  const start = performance.now();

  window.ksvF0({ noInitialRun: true }).then(async function (Module) {
    Module.FS.writeFile("1.wav", content);
    const argsF0 = ["1.wav", "-oA", (speaker === "female" ? "-g=f" : "-g=m")];
    Module.callMain(argsF0);
    const pitch_results = parse_F0(Module.FS.readFile("1.f0", { encoding: "utf8" }));

    window.forest({ noInitialRun: true }).then(async function (Module) {
      Module.FS.writeFile("1.wav", content);
      const argsFormants = ["1.wav", "-oA", "-n=2"];
      if (speaker === "female") argsFormants.push("-f");
      Module.callMain(argsFormants);

      let results = parse_FMS(Module.FS.readFile("1.fms", { encoding: "utf8" }));
      for (let i = 0; i < results.length; i++) {
        results[i]["F0(Hz)"] = pitch_results[i]["F0(Hz)"];
      }
      results = results.filter(r => r["F0(Hz)"] > 0 && r["F1(Hz)"] > 0 && r["F2(Hz)"] > 0);
      if (!results.length) {
        console.warn("No formants detected");
        return;
      }

      console.log(`Time taken: ${performance.now() - start}ms`);

      const xs = results.map(r => hzToBark(r["F2(Hz)"]));
      const ys = results.map(r => hzToBark(r["F1(Hz)"]));
      lastPoints = { xs, ys };   // cache for toggling

      if (plotMode === 'scatter') {
        // keep fading-history behavior
        const new_trace = {
          x: xs, y: ys, opacity: 1, type: "scatter", mode: "markers",
          marker: { size: 6, line: { width: 0 } },
          hoverinfo: "none"
        };
        for (let i = 0; i < traces.length - 1; i++) {
          traces[i].opacity = Math.max(0, traces[i].opacity - 0.3);
        }
        traces.splice(Math.max(0, traces.length - 1), 0, new_trace); // insert before label layer
        Plotly.react(scatterplotElement, traces, layout);
      } else {
        // heatmap mode: rebuild from cache
        renderFromCache();
      }

      // --- timeline debug plots (unchanged) ---
      const keys = Object.keys(results[0]).filter(k => k.startsWith("F1") || k.startsWith("F2"));
      const debug_traces = keys.map(k => ({
        x: results.map(r => r.time),
        y: results.map(r => hzToBark(r[k])),
        name: k.replace("(Hz)", "(Bark)")
      }));

      if (timelineElement) {
        Plotly.react(timelineElement, debug_traces, timelineLayout);
        timelineElement.addEventListener("plotly_hover", function (data) {
          const time = data.points[0].x;
          const index = results.findIndex(r => r.time === time);
          if (plotMode === 'scatter') {
            const lastScatter = traces.find(tr => tr.type === 'scatter' && tr.mode === 'markers');
            if (lastScatter) {
              lastScatter.marker = lastScatter.marker || {};
              lastScatter.marker.line = {
                width: lastScatter.x.map((_, i) => (i === index ? 2 : 0))
              };
              Plotly.react(scatterplotElement, traces, layout);
            }
          }
        }, { once: true });
      }
    });
  });
}


/* -------------------- EXPORT WAV -------------------- */
function gotBuffers(buffers) {
  console.log(buffers);
  return new Promise(function (resolve, reject) {
    audioRecorder.exportMonoWAV(function (blob) {
      resolve(blob);
      doneEncoding(blob);
    });
  });
}

export async function stopRecording() {
  const sampleRate = audioContext.sampleRate;
  audioRecorder.stop();
  const buffers = await new Promise(function (resolve, reject) {
    audioRecorder.getBuffers(resolve);
  });
  return await gotBuffers(buffers);
}

/* -------------------- UPLOAD -------------------- */
export async function uploadAudioBlob(participant_id, password, vowel, blob) {
  if (blob && password && participant_id && vowel) {
    var form = new FormData();
    form.append("file", blob);
    return fetch(
      `https://api-proxy.auckland-cer.cloud.edu.au/MPAi_API/?password=${password}&participant_id=${participant_id}_${vowel}`,
      { method: "POST", body: form }
    ).then((r) => r.json()).then((r) => { console.log(r); return r; });
  }
}
