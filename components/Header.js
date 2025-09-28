export default {
  template: `
<div class="position-fixed container-fluid d-flex flex-column w-100" style="height: 16vh; z-index: 1010; background-color: var(--off-black);">
    <div class="row w-100" style="height: 95%">
        <!--Section for Sidebar Button-->
        <div class="col-2"></div>
        
        <!-- Center: Title -->
        <div class="col-8 d-flex justify-content-center align-items-center">
            <h1 @click="menuClick" class="text-white mb-0" style="cursor: pointer;">MPAi</h1>
        </div>

        <!-- Right: Empty space (Equal length as 1st section) -->
        <div class="col-2"></div>
    </div>

    <!-- Bottom Red Bar -->
    <div class="row bg-danger" style="height: 5%;"></div>
</div>

  `,

  data() {},

  methods: {
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
