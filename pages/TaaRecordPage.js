// ./pages/TaaRecordPage.js
// Fixes: audio init fallback, safe timeline ref, proper grid nesting, plot container height.

import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import {
  initialiseTimeline,
  initScatterplot,
  startRecording,
  stopRecording,
  updateAnnotations,
  initAudio,
} from "../audio.js";
import { config, resources } from "../store.js";

export default {
  name: "TaaRecordPage",
  components: { Header, Footer },

  data() {
    return {
      config,
      resources,
      graphDisplayed: "dotplot",
      isRecording: false,
      isTimelineInitialised: false,
    };
  },

  template: `
    <Header />
    <div class="row" style="height: 15vh;"></div>

    <main class="container-fluid">
      <div class="row" style="height: 85vh;">

        <!-- LEFT COLUMN -->
        <div class="col-12 col-lg-5 d-flex flex-column">
          <div class="row">
            <div class="col p-3"><h3 class="mb-2">Ā VOWEL PRACTICE</h3></div>
          </div>
          <div class="row flex-grow-1">
            <div class="col p-3">
              <img src="images/test_image.png" class="img-fluid rounded border" alt="Ā vowel articulation">
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="col-12 col-lg-7 d-flex flex-column">
          <div class="row">
            <div class="col p-3">
              <p class="mb-0">Perfect the ā vowel using the diagram and formant plot!</p>
            </div>
          </div>

          <div class="row flex-grow-1">
            <div class="col p-3 d-flex flex-column">

              <div class="flex-grow-1 d-flex flex-column">
                <div
                  id="playground-dotplot"
                  ref="dotplot"
                  class="js-plotly-plot border rounded"
                  style="min-height: 320px; height: 100%; background: #f7f7f7;"
                  :class="{'d-none': graphDisplayed === 'heatmap'}">
                </div>
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

                <div class="text-center my-2">
                  <button class="btn btn-outline-dark me-2" :class="{'active': graphDisplayed === 'dotplot'}" @click="changeDisplayedGraph('dotplot')">Token View</button>
                  <button class="btn btn-outline-dark" :class="{'active': graphDisplayed === 'heatmap'}" @click="changeDisplayedGraph('heatmap')">Heatmap View</button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>

    <div ref="timeline" class="d-none"></div>
    <Footer />
  `,

  methods: {
    prevPage() { this.$router.push({ name: "welcome" }); },
    nextClick() { this.$router.push({ name: "model-speaker" }); },

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

      this.$nextTick(() => {
        if (graphName === "dotplot") {
          const allFormants = this.resources.speakerFormants;
          const gender = this.config.modelSpeaker.gender;
          const formants = allFormants.filter(
            (r) => r.length == "long" && r.speaker == gender
          );
          initScatterplot(this.$refs.dotplot);
          updateAnnotations(this.$refs.dotplot, this.config.language);
          // Optionally show ellipses or bubbles
          // updateFormantEllipses(this.$refs.dotplot, formants);
        }

        if (graphName === "heatmap") {
          this.showFormantHeatmap();
        }

        if (graphName === "timeline" && !this.isTimelineInitialised) {
          initialiseTimeline(this.$refs.timeline);
          this.isTimelineInitialised = true;
        }

        window.dispatchEvent(new Event("resize"));
      });
    },
    showFormantHeatmap() {
      const allFormants = this.resources.speakerFormants;
      const gender = this.config.modelSpeaker.gender;
      const formants = allFormants.filter(
        (r) => r.length == "long" && r.speaker == gender
      );

      // Example binning
      const f1Bins = Array.from({ length: 15 }, (_, i) => 2.5 + i * 0.5); // Bark scale
      const f2Bins = Array.from({ length: 15 }, (_, i) => 5.5 + i * 0.5);

      const heatmapData = Array(f1Bins.length)
        .fill()
        .map(() => Array(f2Bins.length).fill(0));

      formants.forEach((f) => {
        const f1 = hzToBark(f.F1_mean);
        const f2 = hzToBark(f.F2_mean);

        const f1Idx = Math.floor((f1 - 2.5) / 0.5);
        const f2Idx = Math.floor((f2 - 5.5) / 0.5);

        if (heatmapData[f1Idx] && heatmapData[f1Idx][f2Idx] !== undefined) {
          heatmapData[f1Idx][f2Idx] += 1;
        }
      });

      const trace = {
        x: f2Bins,
        y: f1Bins,
        z: heatmapData,
        type: "heatmap",
        colorscale: "YlOrRd",
        hovertemplate: "F1: %{y}<br>F2: %{x}<br>Count: %{z}<extra></extra>",
      };

      const layoutCopy = { ...layout };
      layoutCopy.title = "Formant Intensity Map";

      Plotly.react(this.$refs.dotplot, [trace], layoutCopy);
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
