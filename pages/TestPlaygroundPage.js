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
    
    <button class="p-3 border bg-light" @click="prevPage()">Science of Speaking</button>

    <div class="container">
        <div class="row">
            <div class="col-6">
                <div class="container text-center">
                    <div class="row row-cols-2 g-2">
                    // <div class="col">
                    //     <button class="btn btn-success" @click="aaClick">ā</button>
                    // </div>
                    <div class="col">ō</div>
                    <div class="col">a</div>
                    <div class="col">o</div>
                    <div class="col">e</div>
                    <div class="col">u</div>
                    <div class="col">ae</div>
                    <div class="col">eu</div>
                    <div class="col">ai</div>
                    <div class="col">au</div>
                    </div>
                </div>
            </div>
            </div>
            <div class="col-6">
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
                        class="btn btn-primary"><i class="bi bi-mic"></i>Record
                    </button>
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
      this.$router.push({ name: "taa-record" });
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
