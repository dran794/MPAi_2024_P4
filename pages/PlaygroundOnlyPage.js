import Sidebar from "../components/Sidebar.js";
import TopBar from "../components/TopBar.js";
import TikiMessage from "../components/TikiMessage.js";
import BottomBar from "../components/BottomBar.js";
import { initScatterplot, startRecording, stopRecording, updateAnnotations, uploadAudioBlob, clearFormantTraces } from "../audio.js";
import { config, resources } from '../store.js'


export default {
    data() {
        return {
            config,
            resources,
            graphDisplayed: "dotplot",
            isRecording: false
        }
    },
    components: { Sidebar, TopBar, TikiMessage, BottomBar },
    template: `
  <div>
    <Sidebar/>

    <!-- Your existing layout -->
    <TopBar @prev-click="prevClicked()" />
    <TikiMessage>Try record yourself pronouncing a vowel.</TikiMessage>
    <p class="text-center">Experiment with different vowels...</p>

    <div class="d-flex justify-content-center flex-grow-1">
      <div class="d-block" ref="dotplot" style="width:100%; height: 100%;"></div>
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

    <div class="text-center my-3">
      <button 
        id="clear"
        @mousedown.prevent="handleClearPressed"
        class="btn btn-primary">
        Clear
      </button>
    </div>
  </div>
    `,
    methods: {
        prevClicked() {
            this.$router.replace("/playground-explanation")
        },
        nextClick() {
            this.$router.push({ name: "model-speaker" });
        },        
        handleClearPressed() {
            console.log("Clear button pressed");
            this.initialiseGraph();
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
            if (event.code === 'Space' && !this.isRecording) {
                this.isRecording = true;
                startRecording();
            }
        },
        async handleSpaceReleased(event) {
            if (event.code === 'Space' && this.isRecording) {
                this.isRecording = false;
                stopRecording();
            }
        },

        changeDisplayedGraph(graphName) {
            this.graphDisplayed = graphName;
            // Trigger plotly's responsive handler to resize graphs to fit.
            this.$nextTick(function () {
                // Initialise timeline
                // if (graphName === "timeline" && !this.isTimelineInitialised) {
                //     initialiseTimeline(this.$refs.timeline);
                //     this.isTimelineInitialised = true;
                // }
                window.dispatchEvent(new Event('resize'));
            });
        },
        initialiseGraph() {
            const allFormants = this.resources.speakerFormants;
            const gender = this.config.modelSpeaker.gender;
            const formants = allFormants.filter(r => r.length == "long" && r.speaker == gender);
            initScatterplot(this.$refs.dotplot);
            
            clearFormantTraces();
            //updateFormantEllipses(this.$refs.dotplot, formants, this.vowel);
            updateAnnotations(this.$refs.dotplot, this.config.language);
            //setSpeakerGender(gender);
            // When initialising a plotly graph set to autosize, if the graph is not visible, it will be set to 450px.
            // On mobile view, timeline is hidden by default so it will be set to 450px, and thus larger than viewport. 
            // This bit of logic checks if the timeline is visible (i.e. on a larger screen). If it is, initialise it. Otherwise,
            // wait until it is visible to initialise it.
            // const isTimelineVisible = window.getComputedStyle(this.$refs.timeline).getPropertyValue('display') !== "none";
            // if (isTimelineVisible) {
            //     initialiseTimeline(this.$refs.timeline);
            //     this.isTimelineInitialised = true;
            // }
        }
    },
    mounted() {
        this.initialiseGraph();
        //const allFormants = this.resources.speakerFormants;
        //const gender = this.config.modelSpeaker.gender;
        //const formants = allFormants.filter(r => r.length == "long" && r.speaker == gender);
        //initScatterplot(this.$refs.dotplot);
        // updateFormantEllipses(this.$refs.dotplot, formants, this.vowel);
        //updateAnnotations(this.$refs.dotplot, this.config.language);


        window.addEventListener('keydown', this.handleSpacePressed);
        window.addEventListener('keyup', this.handleSpaceReleased);
    },
    unmounted() {
        window.removeEventListener('keydown', this.handleSpacePressed);
        window.removeEventListener('keyup', this.handleSpaceReleased);
    }
};