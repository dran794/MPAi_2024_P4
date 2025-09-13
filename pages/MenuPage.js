import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

export default {
  components: { Header, Footer },
  template: `
    <Header />
    <section class="container-fluid full-vh d-flex flex-column">

      <!--Empty space for header-->
      <div class="row" style="height: 15vh;"></div>
      
      <div class="row" style="height: 85vh">
        
        <!-- Science  of Speaking Menu -->
        <div class="col-md-6 dashing-fill d-flex justify-content-center align-items-center .h-100 pointer"  @click="nextPageScience()">
          <a>Science of Speaking</a>
        </div>

        <!-- MPAi Menu -->
        <div class="col-md-6 dashing-fill d-flex justify-content-center align-items-center pointer" @click="nextPagePlayground()">
          <a>MPAi Playground</a>
        </div>
      </div>
    </section>
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
