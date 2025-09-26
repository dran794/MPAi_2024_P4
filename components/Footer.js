export default {
  data() {
    return {
      isDark: false,
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

    <div class="modal fade" id="acknowledgementModal" tabindex="-1" aria-labelledby="acknowledgementModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="acknowledgementModal">Modal title</h1>
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

    <div class="modal fade" id="languageSelectModal" tabindex="-1" aria-labelledby="languageSelectModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="languageSelectModal">Modal title</h1>
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
    `,
};
