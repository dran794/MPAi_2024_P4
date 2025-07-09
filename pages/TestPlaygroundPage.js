import TopBar from "../components/TopBar.js";
import TikiMessage from "../components/TikiMessage.js";
import BottomBar from "../components/BottomBar.js";
import {
  initialiseTimeline,
  initScatterplot,
  startRecording,
  stopRecording,
  updateAnnotations,
  uploadAudioBlob,
} from "../audio.js";
import { config, resources } from "../store.js";

export default {
  data() {
    return {
      config,
      resources,
      graphDisplayed: "dotplot",
      isRecording: false,
      isTimelineInitialised: false,
    };
  },
  components: { TopBar, TikiMessage, BottomBar },
  template: `
<!-- Link to your custom stylesheet -->
<link rel="stylesheet" href="style.css">

<TopBar/>

<!-- Main background container -->
<div class="w-100 bg-cream py-4 mt-5">
  <!-- Header row -->
  <div class="container my-3">
    <div class="row">
      <div class="col">
        <a class="p-3 border bg-light d-inline-block" @click="prevPage()" style="cursor:pointer;">Back</a>
      </div>
      <div class="col">
        <h1 class="text-center">Test Playground</h1>
      </div>
    </div>
  </div>

  <!-- Main content row -->
  <div class="container py-5">
    <div class="row align-items-stretch full-height-row">
      
      <!-- Left column (letter buttons) -->
      <div class="col-4 d-flex flex-column justify-content-center align-items-center h-100">
        <div class="d-flex flex-column justify-content-between align-items-center h-100">
          <div class="row row-cols-2 g-3">
            <div span class="col"><button class="btn flex-row btn-danger fw-bold" @click="aaClick">ā</button></div>
            <div span class="col"><button class="btn btn-danger fw-bold" @click="ooClick">ō</button></div>
            <div class="col"><button class="btn btn-danger fw-bold" @click="aClick">a</button></div>
            <div class="col"><button class="btn btn-danger fw-bold" @click="oClick">o</button></div>
            <div class="col"><button class="btn btn-danger fw-bold" @click="eClick">e</button></div>
            <div class="col"><button class="btn btn-danger fw-bold" @click="uClick">u</button></div>
            <div class="col"><button class="btn btn-danger fw-bold" @click="aeClick">ae</button></div>
            <div class="col"><button class="btn btn-danger fw-bold" @click="euClick">eu</button></div>
            <div class="col"><button class="btn btn-danger fw-bold" @click="aiClick">ai</button></div>
            <div class="col"><button class="btn btn-danger fw-bold" @click="auClick">au</button></div>
          </div>
        </div>
      </div>

      <!-- Right column (graph + record button) -->
      <div class="col-8 d-flex flex-column justify-content-between h-100">
        <div class="d-lg-flex flex-column flex-grow-1">
          <div id="playground-dotplot" class="d-lg-block js-plotly-plot" :class="{'d-none': graphDisplayed === 'timeline'}" ref="dotplot"></div>
          <div id="playground-timeline" class="d-lg-block js-plotly-plot" :class="{'d-none': graphDisplayed === 'dotplot'}" ref="timeline"></div>
        </div>
        <div class="text-center my-3">
          <button 
            id="record"
            @mousedown.prevent="handleRecordPressed"
            @touchstart.prevent="handleRecordPressed"
            @mouseup.prevent="handleRecordReleased"
            @touchend.prevent="handleRecordReleased"
            :class="{recording: isRecording}"
            class="btn btn-primary">
            <i class="bi bi-mic"></i> Record
          </button>
        </div>
      </div>

    </div>
  </div>
</div>

    `,

  methods: {
    prevPage() {
      this.$router.push({ name: "welcome" });
    },
    aaClick() {
      this.$router.push({
        name: "audiopermission",
        query: { redirectTo: "taa-record" },
      });
    },
    aClick() {
      this.$router.push({ name: "ta-record" });
    },
    oClick() {
      this.$router.push({ name: "to-record" });
    },
    eClick() {
      this.$router.push({ name: "te-record" });
    },
    uClick() {
      this.$router.push({ name: "tu-record" });
    },
    aeClick() {
      this.$router.push({ name: "tae-record" });
    },
    euClick() {
      this.$router.push({ name: "teu-record" });
    },
    aiClick() {
      this.$router.push({ name: "tai-record" });
    },
    auClick() {
      this.$router.push({ name: "tau-record" });
    },
    nextClick() {
      this.$router.push({ name: "model-speaker" });
    },
    handleRecordPressed() {
      console.log("Record button pressed");
      if (!this.isRecording) {
        this.isRecording = true;
        startRecording();
        console.log("Recording started");
      }
    },
    handleRecordReleased() {
      console.log("Record button released");
      if (this.isRecording) {
        this.isRecording = false;
        stopRecording();
        console.log("Recording stopped");
      }
    },
    handleSpacePressed(event) {
      if (event.code === "Space" && !this.isRecording) {
        this.isRecording = true;
        startRecording();
      }
    },
    async handleSpaceReleased(event) {
      if (event.code === "Space" && this.isRecording) {
        this.isRecording = false;
        stopRecording();
      }
    },

    changeDisplayedGraph(graphName) {
      this.graphDisplayed = graphName;
      // Trigger plotly's responsive handler to resize graphs to fit.
      this.$nextTick(function () {
        // Initialise timeline
        if (graphName === "timeline" && !this.isTimelineInitialised) {
          initialiseTimeline(this.$refs.timeline);
          this.isTimelineInitialised = true;
        }
        window.dispatchEvent(new Event("resize"));
      });
    },
  },

  mounted() {
    const allFormants = this.resources.speakerFormants;
    const gender = this.config.modelSpeaker.gender;
    const formants = allFormants.filter(
      (r) => r.length == "long" && r.speaker == gender
    );
    initScatterplot(this.$refs.dotplot);
    // updateFormantEllipses(this.$refs.dotplot, formants, this.vowel);
    updateAnnotations(this.$refs.dotplot, this.config.language);
    // When initialising a plotly graph set to autosize, if the graph is not visible, it will be set to 450px.
    // On mobile view, timeline is hidden by default so it will be set to 450px, and thus larger than viewport.
    // This bit of logic checks if the timeline is visible (i.e. on a larger screen). If it is, initialise it. Otherwise,
    // wait until it is visible to initialise it.
    const isTimelineVisible =
      window
        .getComputedStyle(this.$refs.timeline)
        .getPropertyValue("display") !== "none";
    if (isTimelineVisible) {
      initialiseTimeline(this.$refs.timeline);
      this.isTimelineInitialised = true;
    }
    window.addEventListener("keydown", this.handleSpacePressed);
    window.addEventListener("keyup", this.handleSpaceReleased);
  },
  unmounted() {
    window.removeEventListener("keydown", this.handleSpacePressed);
    window.removeEventListener("keyup", this.handleSpaceReleased);
  },
};
