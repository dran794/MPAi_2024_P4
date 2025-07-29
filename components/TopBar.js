export default {
  template: `
  <div class="position-fixed container-fluid d-flex justify-content-center align-items-center w-100"
       style="height: 15%; background-color: var(--mpai-theme-dark); z-index: 1060;">
    <div class="row w-100 h-100">

      <!-- Left: SVG Menu Icon -->
      <div class="col-2 d-flex justify-content-center align-items-center">
        <div @click="openSidebar" style="cursor: pointer;">
          <svg id="menu-icon"
               :class="{ rotated: isRotated }"
               width="75px" height="75px"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>
        </div>

        <!-- Sidebar (Offcanvas) -->
        <div class="offcanvas offcanvas-start"
             id="sideBar"
             tabindex="-1"
             aria-labelledby="sideBarLabel"
             data-bs-backdrop="false"
             style="z-index: 1040;">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="sideBarLabel">Menu</h5>
            <button type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
          </div>
          <div class="offcanvas-body p-0">
  <div class="pointer p-3 text-white text-center" 
       style="background: var(--primary);" 
       @click="openScienceofSpeaking">
    Science of Speaking
  </div>
  <div class="pointer p-3 text-white text-center" 
       style="background: var(--secondary);" 
       @click="openPlayground">
    MPAi Playground
  </div>
</div>

        </div>
      </div>

      <!-- Center: Title -->
      <div class="col-8 d-flex justify-content-center align-items-center">
        <h1 @click="menuClick" class="text-white mb-0 pointer">MPAi</h1>
      </div>

      <!-- Right: Empty space -->
      <div class="col-2"></div>

    </div>
  </div>
  `,

  data() {
    return {
      isRotated: false,
    };
  },

  mounted() {
    const sidebar = document.getElementById("sideBar");
    sidebar.addEventListener("hidden.bs.offcanvas", () => {
      this.isRotated = false;
    });
  },

  methods: {
    openSidebar() {
      this.isRotated = true;
      const sidebar = document.getElementById("sideBar");
      const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(sidebar);
      bsOffcanvas.show();
    },
    openScienceofSpeaking() {
      this.$router.push({ name: "science-of-speaking" });
    },
    openPlayground() {
      this.$router.push({
        name: "audiopermission",
        query: { redirectTo: "test-playground" },
      });
    },
    menuClick() {
      this.$router.push({ name: "welcome" });
    },
  },
};
