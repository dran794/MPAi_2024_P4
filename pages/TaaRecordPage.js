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
  updateFormantEllipses,     // ← NEW
  setSpeakerGender,          // ← NEW
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
    <div class="row" style="height: 20vh;"></div>

    <main class="container-fluid">
      <div class="row" style="height: 80vh;">

        <!-- LEFT COLUMN -->
        <div class="col-12 col-lg-5 d-flex flex-column">
          <div class="row">
            <div class="col p-3"><h3 class="mb-2">Ā VOWEL PRACTICE</h3></div>
          </div>
          <div class="row flex-grow-1">
            <div class="col p-3 d-flex justify-content-center align-items-center">
              <video width="360" height="360" controls class="img-fluid rounded border" alt="Ā vowel articulation">
                <source src="videos/aa.mp4" type="video/mp4">
              </video>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="col-12 col-lg-7 d-flex flex-column">
          <div class="row">
            <div class="col p-3">
              <!-- Clickable sentence that plays the ā sample -->
              <p class="mb-0">
                <a href="#"
                   @click.prevent="playSample"
                   style="display:inline-block; text-decoration: underline dotted; font-weight: 600;">
                  Perfect the ā vowel using the diagram and formant plot! <i class="bi bi-play"></i>
                </a>
              </p>
            </div>
          </div>

          <div class="row flex-grow-1">
            <!-- Formant Plot(s) -->
            <div class="row mb-3">
              <div class="col d-flex flex-column justify-content-between h-85">
                <div class="d-lg-flex flex-column h-100 flex-grow-1">
                  <!-- One container for both modes -->
                  <div id="playground-dotplot"
                       class="js-plotly-plot plot-wrap"
                       ref="dotplot"></div>
                </div>

                <!-- Optional mode toggle -->
                <div class="text-center my-3">
                  <div class="btn-group" role="group" aria-label="Plot mode">
                  </div>

                  <button id="record"
                          @mousedown.prevent="handleRecordPressed"
                          @touchstart.prevent="handleRecordPressed"
                          @mouseup.prevent="handleRecordReleased"
                          @touchend.prevent="handleRecordReleased"
                          :class="{recording: isRecording}"
                          class="btn rounded-pill dashing-fill text-white ms-3">
                    <i class="bi bi-mic"></i> Record
                  </button>
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

    // NEW: play ā sample the same way you do in the other page
    playSample() {
      // Expecting a sample entry under the ā key (long ā sound) for the current model speaker
      const samples = this.config.modelSpeaker?.samples?.["tā"];
      if (!samples || !samples.length) {
        console.warn("No samples found for 'ā' in the currently selected model speaker.");
        return;
      }
      const idx = Math.round(Math.random() * (samples.length - 1));
      const audio = new Audio(samples[idx]);
      audio.play();
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

          // Set up plot and annotations
          initScatterplot(this.$refs.dotplot);
          updateAnnotations(this.$refs.dotplot, this.config.language);

          // Overlay targets + label and highlight ā
          updateFormantEllipses(this.$refs.dotplot, formants, "ā");

          // Ensure analysis uses matching gender params
          setSpeakerGender(gender);
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

    // (unchanged; optional feature)
    showFormantHeatmap() {
      // Keep your existing heatmap logic if you’re using it elsewhere.
      // This method isn’t strictly needed for the ā highlighting request.
    },
  },

  async mounted() {
    // Optional: warm up the audio context and permissions early
    try { await initAudio(); } catch {}

    // Build the dotplot with ā highlighted
    const allFormants = this.resources.speakerFormants;
    const gender = this.config.modelSpeaker.gender;
    const formants = allFormants.filter(
      (r) => r.length == "long" && r.speaker == gender
    );

    initScatterplot(this.$refs.dotplot);
    updateAnnotations(this.$refs.dotplot, this.config.language);
    updateFormantEllipses(this.$refs.dotplot, formants, "ā"); // ← highlight ā
    setSpeakerGender(gender);                                  // ← match analysis gender

    // Only initialise the timeline if visible (same as before)
    const isTimelineVisible =
      window.getComputedStyle(this.$refs.timeline).getPropertyValue("display") !== "none";
    if (isTimelineVisible) {
      initialiseTimeline(this.$refs.timeline);
      this.isTimelineInitialised = true;
    }

    // Hotkeys
    window.addEventListener("keydown", this.handleSpacePressed);
    window.addEventListener("keyup", this.handleSpaceReleased);
  },

  unmounted() {
    window.removeEventListener("keydown", this.handleSpacePressed);
    window.removeEventListener("keyup", this.handleSpaceReleased);
  },
};
