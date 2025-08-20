import BottomBar from "../components/BottomBar.js";
import TopBar from "../components/TopBar.js";
import NavigationMenu from "../components/Sidebar.js";
import { config } from "../store.js";

export default {
  components: {
    TopBar,
    BottomBar,
    NavigationMenu,
  },

  template: `
    <div class="mpai-theme-background">

      <!-- Welcome Section -->
      <section class="welcome-section d-flex align-items-stretch">
        <div class="container-fluid">
          <div class="row h-100">
            <!-- Left Column -->
            <div class="col-lg-6 d-flex align-items-center">
              <div class="text-white ms-5">
                <h1>MPAi</h1>
                <p>The Māori Pronunciation Aid Tool</p>
                <p class="small-text">
                  The first tool designed to improve your Māori Pronunciation. Click to get started!
                </p>
              </div>
            </div>

            <!-- Right Column -->
            <div class="col-lg-6 d-flex align-items-center justify-content-center">
              <div class="buttons">
                <a class="dashing-fill" style="font-size:36px;" @click="nextPage()">Begin</a>
              </div>
            </div>
          </div>
        </div>
      </section>

                <!-- Learn More -->
          <div class="row d-flex align-items-center justify-content-center py-3 mb-5">
            <div class="col-auto">
              <p style="color: var(--text-dark)">Learn More Below</p>
            </div>
          </div>

      <!-- What We Do -->
<div class="container w-100 mb-5">
  <div class="row mb-5 align-items-center">
    <!-- Text first on small, left on large -->
    <div class="col-12 col-lg-6 order-1 order-lg-1">
      <h1 style="color: var(--text-dark)">What We Do?</h1>
      <p>We analyze the formants and spectral features of spoken Māori to provide real-time feedback on:</p>
      <ul>
        <li>Formant tracking</li>
        <li>Visual feedback (e.g., vowel space plots)</li>
        <li>Interactive pronunciation games</li>
      </ul>
    </div>

    <!-- Image second on small, right on large -->
    <div class="col-12 col-lg-6 p-0 order-2 order-lg-2">
      <img src="images/stock1.jpg" alt="Formant visualization" class="img-fluid w-100" style="object-fit: cover;" />
    </div>
  </div>
</div>

<!-- Current Research -->
<div class="w-100 mb-5">
  <div class="row g-0 align-items-center">
    <!-- Image second on small, left on large -->
    <div class="col-12 col-lg-6 p-0 order-2 order-lg-1">
      <img src="images/stock1.jpg" alt="Research visualization" class="img-fluid w-100" style="object-fit: cover;" />
    </div>

    <!-- Text first on small, right on large -->
    <div class="col-12 col-lg-6 d-flex align-items-center p-4 p-lg-5 order-1 order-lg-2 text-center text-lg-end">
      <div class="w-100">
        <h1 style="color: var(--text-dark)">Current Research</h1>
        <p>
          Our research focuses on combining phonetics, speech processing, and HCI design to support language learning.
          We are testing models of articulatory effort, perceptual mispronunciation detection, and UI feedback techniques that work well
          with both fluent and beginner learners. Check out the main website to learn more:
        </p>
        <p>
          <a href="https://speechresearch.auckland.ac.nz/" target="_blank">speechresearch.auckland.ac.nz</a>
        </p>
        <p>This includes collaborations with linguists, educators, and te reo Māori speakers.</p>
      </div>
    </div>
  </div>
</div>


      <!-- Footer -->
      <footer class="border bg-light p-3 text-center">
        <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#siteLanguage">
          Site Language
        </button>
        <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#acknowledgements">
          Acknowledgements
        </button>
        <button type="button" class="btn btn-outline-secondary" @click="toggleTheme">
          Toggle {{ isLightTheme ? 'Dark' : 'Light' }} Mode
        </button>
      </footer>


      <!-- Site Language Modal -->
      <div class="modal fade" id="siteLanguage" tabindex="-1" aria-labelledby="siteLanguageLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="siteLanguageLabel">Site Language</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Acknowledgements Modal -->
      <div class="modal fade" id="acknowledgements" tabindex="-1" aria-labelledby="acknowledgementsLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="acknowledgementsLabel">Acknowledgements</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>
                The Māori Pronunciation Aid project is led by Professor Catherine Watson, Dr Justine Hui, and Dr Peter Keegan from Waipapa Taumata Rau University of Auckland.
              </p>
              <p>
                This web app is developed at the Centre for eResearch, University of Auckland, based on Watson et al. 2017.
                WebAssembly porting and backend development by Nick Young, frontend design and development by Noel Zeng.
                Source code <a href="https://github.com/uoa-eresearch/MPAi/" target="_blank">available on GitHub</a>.
              </p>
              <p>
                This project is funded by
                <a href="https://www.mbie.govt.nz/science-and-technology/science-and-innovation/funding-information-and-opportunities/investment-funds/curious-minds" target="_blank">
                  Curious Minds He Hihiri i te Mahara
                </a> from the Ministry of Business, Innovation and Employment.
              </p>
              <p>Emotiki is created by Te Puia.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,

  data() {
    return {
      showTopBar: true,
      isLightTheme: false,
    };
  },

  mounted() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light");
      this.isLightTheme = true;
    }
  },

  methods: {
    nextPage() {
      this.$router.push({ name: "menu" });
    },

    toggleTheme() {
      this.isLightTheme = !this.isLightTheme;
      if (this.isLightTheme) {
        document.body.classList.add("light");
        localStorage.setItem("theme", "light");
      } else {
        document.body.classList.remove("light");
        localStorage.setItem("theme", "dark");
      }
    },
  },
};
