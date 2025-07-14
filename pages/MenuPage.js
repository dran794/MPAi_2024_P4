export default {
    template: `
      <div class="container text-center mt-5">
        <h2 class="mb-4">Choose a Page</h2>
        <div class="d-grid gap-3">
          <button class="btn one" @click="goTo('/test-playground')">Test Playground</button>
          <button class="btn two" @click="goTo('/playgroundOnly')">Activity 2</button>
          <button class="btn three" @click="goTo('/target')">Activity 3</button>
          <button class="btn four" @click="goTo('/model-speaker')">Activity 4</button>
          <button class="btn five" @click="goTo('/finish')">Activity 5</button>
        </div>
      </div>
    `,
    methods: {
      goTo(path) {
        this.$router.push(path);
      }
    }
  };
  