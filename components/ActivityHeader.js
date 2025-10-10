import Navigation from './Sidebar.js';

export default {
  components: { Navigation },
  template: `
<div class="position-fixed container-fluid d-flex flex-column w-100" style="height: 16vh; z-index: 1010; background-color: var(--off-black);">
    <div class="row w-100" style="height: 95%">
        <!--Section for Sidebar Button-->
        <div class="col-1 d-flex align-items-center">
          <Navigation />
        </div>

        <!-- Last Activity Button -->
        <div class="col-2 d-flex justify-content-end align-items-center">
          <button @click="lastActivityClick" class="btn btn-primary">Last Activity</button>
        </div>
        
        <!-- Center: Title -->
        <div class="col-7 d-flex justify-content-center align-items-center">
            <h1 @click="menuClick" class="text-white mb-0" style="cursor: pointer;">MPAi</h1>
        </div>

        <!-- Next Activity Button -->
        <div class="col-2 d-flex justify-content-end align-items-center">
          <button @click="nextActivityClick" class="btn btn-primary">Next Activity</button>
        </div>
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
    
    nextActivityClick() {
      const current = this.$route.name;
    
      switch (current) {
        case "activity-one":
          this.$router.push({ name: "activity-two" });
          break;
    
        case "activity-two":
          this.$router.push({ name: "activity-three" });
          break;
    
        case "activity-three":
          this.$router.push({ name: "activity-three-playground" });
          break;

        case "activity-three-playground":
          this.$router.push({ name: "activity-four" });
          break;
    
        case "activity-four":
          this.$router.push({ name: "test-playground" });
          break;
      }
    },

    lastActivityClick() {
      const current = this.$route.name;
    
      switch (current) {
        case "activity-one":
          this.$router.push({ name: "science-of-speaking" });
          break;
          
        case "activity-two":
          this.$router.push({ name: "activity-one" });
          break;

        case "activity-three":
          this.$router.push({ name: "activity-two" });
          break;

        case "activity-three-playground":
          this.$router.push({ name: "activity-three" });
          break;

        case "activity-four":
          this.$router.push({ name: "activity-three-playground" });
          break;
      }
    },
  },
};
