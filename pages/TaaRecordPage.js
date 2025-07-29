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
      tongueMesh: null,
    };
  },
  components: { TopBar, TikiMessage, BottomBar },
  template: `
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

    <div class="container py-5">
      <div class="row align-items-start">
        <!-- Replaces the static image with 3D model -->
        <div class="col-6">
          <div id="three-container" style="width: 100%; height: 300px;"></div>
        </div>
        <!-- The graph area -->
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
      this.$nextTick(function () {
        if (graphName === "timeline" && !this.isTimelineInitialised) {
          initialiseTimeline(this.$refs.timeline);
          this.isTimelineInitialised = true;
        }
        window.dispatchEvent(new Event("resize"));
      });
    },
    updateTongueModel(f1, f2) {
      if (!this.tongueMesh || !this.tongueMesh.morphTargetInfluences) return;
      const openness = THREE.MathUtils.clamp((f1 - 2) / 7, 0, 1);
      const frontness = THREE.MathUtils.clamp((f2 - 5.5) / 11, 0, 1);
      this.tongueMesh.morphTargetInfluences[0] = openness; // Shape key: Open
      this.tongueMesh.morphTargetInfluences[1] = frontness; // Shape key: Front
    },
    initThreeModel() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(300, 300);
      document
        .getElementById("three-container")
        .appendChild(renderer.domElement);

      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(1, 1, 1).normalize();
      scene.add(light);

      // Load face.glb model
      const loader = new GLTFLoader();
      loader.load(
        "/assets/face.glb",
        (gltf) => {
          const model = gltf.scene;
          this.tongueMesh = model.getObjectByName("Tongue"); // Optional: rename in Blender if needed
          scene.add(model);
        },
        undefined,
        (error) => {
          console.error("Failed to load model:", error);
        }
      );

      camera.position.z = 2;

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    },
  },

  mounted() {
    const allFormants = this.resources.speakerFormants;
    const gender = this.config.modelSpeaker.gender;
    const formants = allFormants.filter(
      (r) => r.length == "long" && r.speaker == gender
    );
    initScatterplot(this.$refs.dotplot);
    updateAnnotations(this.$refs.dotplot, this.config.language);

    const isTimelineVisible =
      window
        .getComputedStyle(this.$refs.timeline)
        .getPropertyValue("display") !== "none";
    if (isTimelineVisible) {
      initialiseTimeline(this.$refs.timeline);
      this.isTimelineInitialised = true;
    }
    this.initThreeModel();
    window.vueRef = this;
    window.addEventListener("keydown", this.handleSpacePressed);
    window.addEventListener("keyup", this.handleSpaceReleased);
  },

  unmounted() {
    window.removeEventListener("keydown", this.handleSpacePressed);
    window.removeEventListener("keyup", this.handleSpaceReleased);
  },
};
