export default {
  props: ["isContinueEnabled"],
  data() {
    return {
      isLoadingNextPage: false,
      isContinueEnabled: false, // <-- ADD THIS
    };
  },
  methods: {
    continueClicked() {
      this.$emit("continue-click");
      // On slow page loads, we show a loading spinner on the button
      // after a short delay, to indicate the page is working.
      setTimeout(() => {
        this.isLoadingNextPage = true;
      }, 100);
    },
  },
  template: `
    <div class="position-fixed justify-content-center align-items-center" style="bottom: 0; width: 100vw;">
    <!-- Footer -->
    <footer class="border bg-light p-3 text-center">
        <div class="container">
        <div class="row justify-content-center gap-3">
            <div class="col-5">
            <span class="pointer text-primary" data-bs-toggle="modal" data-bs-target="#siteLanguage">
                Site Language
            </span>
            </div>
            <div class="col-5">
            <span class="pointer text-primary" data-bs-toggle="modal" data-bs-target="#acknowledgements">
                Acknowledgements
            </span>
            </div>
        </div>
        </div>
    </footer>
    </div>


    <!-- Modal -->
    <div class="modal fade" id="siteLanguage" tabindex="-1" aria-labelledby="siteLanguageLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="acknowledgements" tabindex="-1" aria-labelledby="acknowledgementsLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>
              The Māori Pronunciation Aid project is led by Professor Catherine Watson, Dr Justine Hui, and Dr Peter Keegan from Waipapa Taumata Rau University of Auckland.
            </p>
            <p>
              This web app is developed at the Centre for eResearch, University of Auckland, based on Watson et al. 2017.
              WebAssembly porting and backend development by Nick Young, frontend design and development by Noel Zeng.
              Source code <a href="https://github.com/uoa-eresearch/MPAi/">available on GitHub</a>.
            </p>
            <p>
              This project is funded by
              <a href="https://www.mbie.govt.nz/science-and-technology/science-and-innovation/funding-information-and-opportunities/investment-funds/curious-minds">
                Curious Minds He Hihiri i te Mahara
              </a>
              from the Ministry of Business, Innovation and Employment.
            </p>
            <p></p>
            <p>Emotiki is created by Te Puia.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `,
};

// <footer id="bottom-controls" class="mb-3 d-grid col-12 col-lg-6 mx-auto">
//     <a @click.prevent="continueClicked"
//     id="btn-continue"
//     class="d-block btn btn-primary"
//     :class="{disabled: !isContinueEnabled || isLoadingNextPage}"
//     :aria-disabled="!isContinueEnabled || isLoadingNextPage">
//     <template v-if="!isLoadingNextPage">
//         Continue
//     </template>
//     <template v-else>
//         <!-- Loading indicator while next route lazily loads. -->
//         <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
//         <span class="visually-hidden" role="status">Loading...</span>
//     </template>
//     </a>
// </footer>
