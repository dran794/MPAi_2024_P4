import TopBar from "../components/TopBar.js";
import BottomBar from "../components/BottomBar.js";

export default {
  components: { TopBar, BottomBar },
  template: `
    <TopBar />
    
    <section class="container-fluid full-vh d-flex flex-column">

      <div class="row" style="height: 15vh;"></div>
      <!-- Middle Row (fills remaining space) -->
      <div class="row flex-grow-1">
        <div class="col-md-6 dashing-fill d-flex justify-content-center align-items-center .h-100 pointer" style="--dash-color-1: #2ecc71; --dash-color-2: #a8e6cf4d;"  @click="nextPageScience()">
          <a>Science of Speaking</a>
        </div>
        <div class="col-md-6 dashing-fill d-flex justify-content-center align-items-center pointer" style="--dash-color-1: #14532d; --dash-color-2: #bef264;" @click="nextPagePlayground()">
          <a>MPAi Playground</a>
        </div>
      </div>
    </section>

    <BottomBar />
  `,
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    nextPageScience() {
      this.$router.push({ name: "science-of-speaking" });
    },
    nextPagePlayground() {
      this.$router.push({
        name: "audiopermission",
        query: { redirectTo: "test-playground" },
      });
    },
  },
};

/**
   *  <div class="container text-center mt-5">
        <h2 class="mb-4">Choose a Page</h2>
        <div class="d-grid gap-3">
          <button class="btn one" @click="goTo('/test-playground')">Test Playground</button>
          <button class="btn two" @click="goTo('/playgroundOnly')">Activity 2</button>
          <button class="btn three" @click="goTo('/target')">Activity 3</button>
          <button class="btn four" @click="goTo('/model-speaker')">Activity 4</button>
          <button class="btn five" @click="goTo('/finish')">Activity 5</button>
        </div>
      </div>
   * 
   * 
   */
