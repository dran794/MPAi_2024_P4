import BottomBar from "../components/BottomBar.js";
import TopBar from "../components/TopBar.js";

export default {
  components: {
    TopBar,
    BottomBar,
  },
  template: `
    <div class="full-screen bg-cream">

      <!-- BIG HEADER (only visible when !showTopBar) -->
      <div
        v-if="!showTopBar"
        class="position-fixed top-0 start-0 w-100 bg-charcoal shadow p-3 text-center text-white"
        style="z-index: 9999; min-height:30vh;"
      >
        <div class="d-flex justify-content-center flex-column align-items-center">
          <h1 class="m-0">MPAi</h1>
          <h5 class="m-0">The Māori Pronunciation Aid Tool</h5>
        </div>
      </div>

      <!-- COMPACT TOPBAR (appears on scroll) -->
      <TopBar/>

      <!-- Science of Speaking / MPAi Playground -->
      <div class="container-fluid" style="margin-top: 100px; min-height: 75vh;">
        <div class="row gx-5 h-100">
          <div class="col d-flex justify-content-center align-items-center">
            <button class="p-3 rounded-3 border border-danger w-100 bg-danger fs-2 fw-bolder text-white" 
                    style="height: 300px;" 
                    @click="nextPageScience()">Science of Speaking</button>
          </div>
          <div class="col d-flex justify-content-center align-items-center">
            <button class="p-3 rounded-3 border border-success w-100 bg-success fs-2 fw-bolder text-white" 
                    style="height: 300px;"
                    @click="nextPagePlayground()">MPAi Playground</button>
          </div>
        </div>
      </div>

      <!-- Learn More Section -->
      <h5 class="text-center my-5">Learn more</h5>

      <!-- What we do -->
      <div class="container my-5">
        <h1>What We Do?</h1>
        <p>
          We analyze the formants and spectral features of spoken Māori to provide real-time feedback.
          This helps learners see how close they are to native-like pronunciation, and track their improvement over time.
        </p>
        <ul>
          <li>Formant tracking</li>
          <li>Visual feedback (e.g., vowel space plots)</li>
          <li>Interactive pronunciation games</li>
          <li>Context-sensitive coaching</li>
        </ul>
      </div>

      <!-- Research Section -->
      <div class="container my-5">
        <h1 class="text-end">Current Research</h1>
        <p class="text-end">
          Our research focuses on combining phonetics, speech processing, and HCI design to support Indigenous language learning.
          We are testing models of articulatory effort, perceptual mispronunciation detection, and UI feedback techniques that work well
          with both fluent and beginner learners.
        </p>
        <p class="text-end">
          This includes collaborations with linguists, educators, and te reo Māori speakers.
        </p>
      </div>

      <!-- Filler Section for Scroll Test -->
      <div class="container my-5">
        <h2>Extra Content</h2>
        <p v-for="n in 30" :key="n">
          This is line {{ n }} of extra filler content to test scrolling. Keep going...
        </p>
      </div>

      <!-- Footer -->
      <footer class="border bg-light p-3 text-center">
        <p>Site Language</p>
      </footer>

    </div>
  `,

  data() {
    return {
      showTopBar: true,
    };
  },

  mounted() {
    this.handleScroll = () => {
      const y = window.scrollY;
      this.showTopBar = y > 500;
      console.log("showTopBar:", this.showTopBar);
    };
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    nextPageScience() {
      this.$router.push({
        name: "audiopermission",
        query: { redirectTo: "science-of-speaking" },
      });
    },
    nextPagePlayground() {
      this.$router.push({
        name: "audiopermission",
        query: { redirectTo: "test-playground" },
      });
    },
  },
};
