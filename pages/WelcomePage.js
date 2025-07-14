import BottomBar from "../components/BottomBar.js";
import TopBar from "../components/TopBar.js";
import { config } from "../store.js";
import NavigationMenu from "../components/Sidebar.js";

export default {
  components: {
    TopBar,
    BottomBar,
  },
  template: `
    <div class="mpai-theme-background">


<!-- Welcome Section -->
<section class="welcome-section d-flex align-items-stretch" style="height: 90vh; background-color: var(--mpai-theme-dark);">
  <div class="container-fluid">
    <div class="row h-100">
      
      <!-- Left Column: Vertically Centered -->
      <div class="col-lg-6 d-flex align-items-center">
        <div class="text-white ms-lg-5">
          <h1>MPAi</h1>
          <p>The Māori Pronunciation Aid Tool</p>
          <p class="small-text">The first tool designed to improve your Maori Pronunciation. Click to get started!<p>
        </div>
      </div>
      
      <!-- Right Column: Fully Centered -->
      <div class="col-lg-6 d-flex align-items-center justify-content-center">
        <div class="buttons">
          <a href="#" class="dashing-fill" style="text-size:36px;">Begin</a>
    <!-- Header -->
    <!-- Change on scroll -->
    <NavigationMenu :speakerOptionEnabled="false" />

    <header class="d-flex flex-row-reverse py-3 h-20">
      <p> Acknowledgements </p>
    </header>

    <!-- Title Page -->
    <!-- Change on scroll -->
    <div>
      <h1 class="text-center">MPAi</h1>
      <p class="text-center"> Māori Pronunciation Aid</p>
    </div>

    <!-- Two Columns -->
    <div class="container px-4">
      <div class="row gx-5">
        <div class="text-center col">
        <button class="p-3 border bg-light" @click="nextPageScience()">Science of Speaking</button>
        </div>
        <div class="text-center col">
        <button class="p-3 border bg-light" @click="nextPagePlayground()">MPAi Playground</button>
        </div>
      </div>

    </div>
  </div>
</section>




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

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    nextPageScience() {
      this.$router.push({ name: "science-of-speaking" });
    },
    nextPagePlayground() {
      this.$router.push({
        name: "audiopermission",
        query: { redirectTo: "menu" },
      });
      this.$router.push({ name: "science-of-speaking" });
    },
  },
};
