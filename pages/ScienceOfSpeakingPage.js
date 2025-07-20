import TopBar from "../components/TopBar.js";

export default {
  components: { TopBar },
  data() {
    return {
      images: [
        "images/ScienceOfSpeaking/p1.png",
        "images/ScienceOfSpeaking/p2.png",
        "images/ScienceOfSpeaking/p3.png",
      ],
    };
  },
  template: `
    <TopBar />
    <div class="container-fluid d-flex flex-column vh-100">
      <div class="row" style="height:15%"></div>
      
      <!-- Main Content Row -->
      <div class="row flex-grow-1 position-relative">
        <div class="col p-0">
          <iframe 
            src="https://www.canva.com/design/DAGGkZnYEBo/4lT1haX4lenGwclLl2VdRA/view?embed" 
            style="width: 100%; height: 100%; margin: 0;" 
            allowfullscreen>
          </iframe>
        </div>
      </div>

      <!-- Footer Row -->
      <div class="row" style="height: 5%;">
        <div class="col text-center align-self-center">
          <p>Acknowledgements</p>
        </div>
      </div>
    </div>

    `,
};

`
  <div id="carousel" class="carousel slide" data-bs-ride="carousel">
        <!-- Carousel indicators -->
        <div class="carousel-indicators">
          <button
            v-for="(image, index) in images"
            :key="'indicator-' + index"
            type="button"
            data-bs-target="#carousel"
            :data-bs-slide-to="index"
            :class="{ active: index === 0 }"
            :aria-current="index === 0 ? 'true' : null"
            :aria-label="'Slide ' + (index + 1)">
          </button>
        </div>
  
        <!-- Carousel slides -->
        <div class="carousel-inner">
          <div
            v-for="(image, index) in images"
            :key="'slide-' + index"
            :class="['carousel-item', { active: index === 0 }]">
            <img :src="image" class="d-block w-100" alt="Slide image">
          </div>
        </div>
  
        <!-- Carousel controls -->
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
  `;
