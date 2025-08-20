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
      graphDisplayed: "dotplot", // 'dotplot' | 'heatmap' | 'timeline'
      isRecording: false,
      isTimelineInitialised: false,
      tongueMesh: null,
    };
  },
  components: { TopBar, TikiMessage, BottomBar },
  template: `
    <TopBar/>

    <!-- Main Content - full width -->
    <div class="container-fluid full-vh d-flex flex-column">
      <div class="row" style="height:15%;"></div>

      <div class="row my-5 align-items-stretch">
        <!-- Left column: 3D model -->
        <div class="col-12 col-lg-6 mb-4 mb-lg-0">
          <div id="three-container" style="width: 100%; height: 300px;"></div>
        </div>

        <!-- Right column: graphs + controls -->
        <div class="col-12 col-lg-6 d-flex flex-column justify-content-between h-85">
          <div class="d-lg-flex flex-column flex-grow-1">
            <!-- Dotplot -->
            <div id="playground-dotplot" class="d-lg-block js-plotly-plot"
                 :class="{'d-none': graphDisplayed !== 'dotplot'}"
                 ref="dotplot"></div>

            <!-- Heatmap (if you wire it up later) -->
            <div id="playground-heatmap" class="d-lg-block js-plotly-plot"
                 :class="{'d-none': graphDisplayed !== 'heatmap'}"
                 ref="heatmap"></div>

            <!-- Timeline -->
            <div id="playground-timeline" class="d-lg-block js-plotly-plot"
                 :class="{'d-none': graphDisplayed !== 'timeline'}"
                 ref="timeline"></div>
          </div>

          <!-- View toggles -->
          <div class="text-center my-2">
            <button class="btn btn-outline-dark me-2" :class="{'active': graphDisplayed === 'dotplot'}" @click="changeDisplayedGraph('dotplot')">Token View</button>
            <button class="btn btn-outline-dark me-2" :class="{'active': graphDisplayed === 'heatmap'}" @click="changeDisplayedGraph('heatmap')">Heatmap View</button>
            <button class="btn btn-outline-dark" :class="{'active': graphDisplayed === 'timeline'}" @click="changeDisplayedGraph('timeline')">Timeline View</button>
          </div>

          <!-- Record controls -->
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

      <div class="row" style="height:10%;"></div>
    </div>
  `,

  methods: {
    prevPage() {
      this.$router.push({ name: "welcome" });
    },
    handleRecordPressed() {
      if (!this.isRecording) {
        this.isRecording = true;
        startRecording();
      }
    },
    handleRecordReleased() {
      if (this.isRecording) {
        this.isRecording = false;
        stopRecording();
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
        if (
          graphName === "timeline" &&
          !this.isTimelineInitialised &&
          this.$refs.timeline
        ) {
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

      // --- Lighting: added ambient + hemisphere, kept directional
      const amb = new THREE.AmbientLight(0xffffff, 0.35);
      scene.add(amb);

      const hemi = new THREE.HemisphereLight(0xffffff, 0x404040, 0.6);
      hemi.position.set(0, 1, 0);
      scene.add(hemi);

      const dir = new THREE.DirectionalLight(0xffffff, 0.8);
      dir.position.set(1, 1, 1).normalize();
      scene.add(dir);
      // ---

      // Load face.glb model
      const loader = new GLTFLoader();
      loader.load(
        "../assets/face.glb",
        (gltf) => {
          const model = gltf.scene;
          this.tongueMesh = model.getObjectByName("Jaw"); // ensure this name in Blender
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

    // Initialise dotplot first
    if (this.$refs.dotplot) {
      initScatterplot(this.$refs.dotplot);
      updateAnnotations(this.$refs.dotplot, this.config.language);
    }

    // If the timeline is visible by default, init it
    if (this.$refs.timeline) {
      const style = window.getComputedStyle(this.$refs.timeline);
      const isTimelineVisible = style.getPropertyValue("display") !== "none";
      if (isTimelineVisible && !this.isTimelineInitialised) {
        initialiseTimeline(this.$refs.timeline);
        this.isTimelineInitialised = true;
      }
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
