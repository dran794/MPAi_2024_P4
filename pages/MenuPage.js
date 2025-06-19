export default {
    template: `
      <div class="container text-center mt-5">
        <h2 class="mb-4">Choose a Page</h2>
        <div class="d-grid gap-3">
          <button class="btn btn-primary" @click="goTo('/playground-explanation')">Activity 1</button>
          <button class="btn btn-secondary" @click="goTo('/playgroundOnly')">Activity 2 Only</button>
          <button class="btn btn-success" @click="goTo('/target')">Activity 3</button>
          <button class="btn btn-warning" @click="goTo('/model-speaker')">Activity 4</button>
          <button class="btn btn-danger" @click="goTo('/finish')">Activity 5</button>
        </div>
      </div>
    `,
    methods: {
      goTo(path) {
        this.$router.push(path);
      }
    }
  };
  