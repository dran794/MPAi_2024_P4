import BottomBar from "../components/BottomBar.js";
import { config } from "../store.js";
import NavigationMenu from "../components/Sidebar.js";

export default {
  template: `

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

    <!-- Learn More Section -->
    <!-- Change on Scroll to disappear -->
    <div>
      <h1 class="text-center">Learn More</h1>
    </div>

    <!-- What we do -->
    <div>
      <h1>What We Do?</h1>
    </div>

    <!-- Literally link to the speech and acoustics page -->
    <div>
      <h1 class="text-end">Current Research</h1>
      <p class="text-end">Filler information here for now. <br>Hello.</p>
    </div>
    
    <!-- Footer Section -->
    <footer class="border bg-light">
      <p>Site Language</p>
    </footer>

    `,
  
  mounted() {
    new bootstrap.Popover(this.$refs.maoriToggle);
  },
  methods: {
    // changeLanguage(lang) {
    //   config.language = lang;
    // },
    nextPageScience() {
      this.$router.push({ name: "science-of-speaking" });
    },
    nextPagePlayground() {
      this.$router.push({ name : "menu"})
    },
},
};
