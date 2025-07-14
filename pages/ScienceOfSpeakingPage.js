export default {
    data() {
      return {
        images: [
            'images/ScienceOfSpeaking/p1.png',
            'images/ScienceOfSpeaking/p2.png',
            'images/ScienceOfSpeaking/p3.png'
        ]
      };
    },
    template: `
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
    `
  };
  