export default {
  data() {
    return {
      isDark: false,
      selectedLanguage: "en", // default to English
    };
  },
  mounted() {
    // Restore saved theme, or fall back to system preference
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      this.setTheme(saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.setTheme(prefersDark ? "dark" : "light");
    }

    // Restore saved language
    const lang = localStorage.getItem("language");
    if (lang) {
      this.setLanguage(lang);
    }
  },
  methods: {
    setTheme(theme) {
      this.isDark = theme === "dark";
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    },
    toggleTheme() {
      this.setTheme(this.isDark ? "light" : "dark");
    },

    setLanguage(lang) {
      this.selectedLanguage = lang;
      document.documentElement.setAttribute("lang", lang); // <html lang="en">
      localStorage.setItem("language", lang);
    },
    applyLanguage() {
      this.setLanguage(this.selectedLanguage);
    },
  },
  template: `
<footer class="fixed-bottom container-fluid d-flex flex-column w-100 footer-bar" style="height:7.5vh;">
  <div class="row">

    <!-- Information -->
    <div class="col d-flex justify-content-center align-items-center">
      <button type="button" class="btn footer-btn raised rounded-pill"
              data-bs-toggle="modal" data-bs-target="#infoModal">
        <i class="bi bi-info-circle"></i>
        <span class="footer-text"> About Us</span>
      </button>
    </div>

    <!-- Acknowledgements -->
    <div class="col d-flex justify-content-center align-items-center">
      <button type="button" class="btn footer-btn raised rounded-pill"
              data-bs-toggle="modal" data-bs-target="#acknowledgementModal">
        <i class="bi bi-award"></i>
        <span class="footer-text"> Acknowledgements</span>
      </button>
    </div>

    <!-- Night Mode (toggle) -->
    <div class="col d-flex justify-content-center align-items-center">
      <button type="button" class="btn footer-btn raised rounded-pill"
              @click="toggleTheme" :aria-pressed="isDark ? 'true' : 'false'">
        <i :class="isDark ? 'bi bi-brightness-high' : 'bi bi-moon-stars'"></i>
        <span class="footer-text">{{ isDark ? 'Light Mode' : 'Night Mode' }}</span>
      </button>
    </div>

    <!-- Language -->
    <div class="col d-flex justify-content-center align-items-center">
      <button type="button" class="btn footer-btn raised rounded-pill"
              data-bs-toggle="modal" data-bs-target="#languageSelectModal">
        <i class="bi bi-translate"></i>
        <span class="footer-text"> Language Select</span>
      </button>
    </div>

  </div>
</footer>



    <!-- Modals Here -->
    <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="infoModal">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" style="color: black;">
              MPAi helps learners compare their pronunciation of Te Reo Māori vowels
              with recordings from Kaumātua and Kuia (elder speakers). 
              It provides visual feedback and practice exercises. 
              You can find out more about this project here: https://www.mpai.auckland.ac.nz/
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="acknowledgementModal" tabindex="-1" aria-labelledby="acknowledgementModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="acknowledgementModal">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" style="color: black;">
            This version of MPAi was developed by the MPAi team at the University of Auckland, New Zealand. You can find out more here: https://www.mpai.auckland.ac.nz/
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="languageSelectModal" tabindex="-1" aria-labelledby="languageSelectModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="languageSelectModal">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <select v-model="selectedLanguage" class="form-select">
              <option value="en">English</option>
              <option value="mi">Te Reo Māori</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="applyLanguage" data-bs-dismiss="modal">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    `,
};
