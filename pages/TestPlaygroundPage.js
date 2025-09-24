import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
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
  components: { Header, Footer },
  template: `
<Header />
<section class="container-fluid full-vh d-flex flex-column">

  <!-- Empty space for header -->
  <div class="row" style="height: 15vh;"></div>
  
  <div class="row" style="height: 85vh">
    <!-- LHS -->
    <div class="col">
      
      <!-- Back Button / Info -->
      <div class="row mb-3">
        <div class="col-6 d-flex align-items-center">
          <button type="button" class="btn btn-danger">Back</button>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-end">
          <!-- Info icon trigger (could be a popover or modal) -->
          <button type="button" class="btn btn-outline-secondary" 
                  data-bs-toggle="modal" 
                  data-bs-target="#infoModal">
            Info
          </button>
        </div>
      </div>

      <!-- Vowels -->
      <div class="row gy-2">
        <div class="col-12 d-grid">
          <button type="button" class="btn btn-primary" @click="aaClick()">Long A</button>
        </div>
        <div class="col-12 d-grid">
          <button type="button" class="btn btn-primary" @click="eeClick()">Long E</button>
        </div>
        <div class="col-12 d-grid">
          <button type="button" class="btn btn-primary" @click="iiClick()">Long I</button>
        </div>
        <div class="col-12 d-grid">
          <button type="button" class="btn btn-primary" @click="ooClick()">Long O</button>
        </div>
        <div class="col-12 d-grid">
          <button type="button" class="btn btn-primary" @click="uuClick()">Long U</button>
        </div>
      </div>
    </div>

    <!-- RHS -->
    <div class="col">
      
      <!-- Formant Plot(s) -->
      <div class="row mb-3">
        <!-- Put chart/plot canvas here -->
        <!-- Right column (graph + record button) -->
      <div class="col d-flex flex-column justify-content-between h-85">
        <div class="d-lg-flex flex-column flex-grow-1">
          <div id="playground-dotplot" class="d-lg-block js-plotly-plot" :class="{'d-none': graphDisplayed === 'heatmap'}" ref="dotplot"></div>
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

      <!-- Microphone Button -->
      <div class="row">
        <div class="col d-flex justify-content-center">
        </div>
      </div>
    </div>
  </div>
</section>

<Footer />

<!-- Info Modal -->
<div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="infoModalLabel">Information</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Here you can provide instructions or details about the exercise.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
    eeClick() {
      this.$router.push({
        name: "audiopermission",
        query: { redirectTo: "hee-record" },
      });
    },
    iiClick() {
      this.$router.push({
        name: "audiopermission",
        query: { redirectTo: "hii-record" },
      });
    },
    ooClick() {
      this.$router.push({
        name: "audiopermission",
        query: { redirectTo: "poo-record" },
      });
    },
    uuClick() {
      this.$router.push({
        name: "audiopermission",
        query: { redirectTo: "tuu-record" },
      });
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

/*
<div class="container-fluid full-vh flex-column">
  <div class="row" style="height:15%;"></div>
  <div class="row my-5 align-items-stretch">
    <!-- Right column (graph + record button) -->
      <div class="col d-flex flex-column justify-content-between h-85">
        <div class="d-lg-flex flex-column flex-grow-1">
          <div id="playground-dotplot" class="d-lg-block js-plotly-plot" :class="{'d-none': graphDisplayed === 'heatmap'}" ref="dotplot"></div>
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
  <div class="row">
    <div class="btn-toolbar justify-content-center align-items-center d-flex" role="toolbar" aria-label="Toolbar with button groups">
      <div class="btn-group me-2" role="group" aria-label="a">
        <button type="button" class="btn btn-primary">a</button>
        <button type="button" class="btn btn-primary" @click="aaClick()">ā</button>
      </div>
      <div class="btn-group me-2" role="group" aria-label="e">
        <button type="button" class="btn btn-primary">e</button>
        <button type="button" class="btn btn-primary">ē</button>
      </div>
      <div class="btn-group me-2" role="group" aria-label="i">
        <button type="button" class="btn btn-primary">i</button>
        <button type="button" class="btn btn-primary">ī</button>
      </div>
      <div class="btn-group me-2" role="group" aria-label="o">
        <button type="button" class="btn btn-primary">o</button>
        <button type="button" class="btn btn-primary">ō</button>
      </div>
      <div class="btn-group me-2" role="group" aria-label="u">
        <button type="button" class="btn btn-primary">u</button>
        <button type="button" class="btn btn-primary">ū</button>
      </div>

    </div>


  </div>

</div>


  <div class="row" style="height: 10%;"></div>
</section>
*/
