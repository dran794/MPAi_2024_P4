export default {
  template: `
  <div class="position-fixed container-fluid justify-content-center align-items-center w-100" style="height: 15%; background-color: var(--mpai-theme-dark);">
    <div class="row" style="height: 100%">
      <div class="col-2 d-flex justify-content-center align-items-center">
        <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">Sidebar</a>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
            Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
          </div>
          <div class="dropdown mt-3">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
              Dropdown button
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div>
        </div>
        </div>
      <div class="col-8 d-flex justify-content-center align-items-center">
        <h1 class="text-white mb-0">MPAi</h1>
      </div>
      <div class="col-2"></div>
    </div>
  </div>

  `,

  methods: {
    menuClick() {
      this.$router.push({ name: "welcome" });
    },
  },
};

// export default {
//   template: `
//     <div class="position-fixed top-0 start-0 w-100 bg-charcoal shadow p-3 text-center text-white" style="z-index: 9999; min-height:30vh;">
//       <div class="d-flex justify-content-center flex-column align-items-center">
//       <h1 class="m-0">MPAi</h1>
//       <h5 class ="m-0">The Maori Pronunciation Aid Tool</h3>
//     </div>
//     </div>
//   `,
// };

// import { config, resources } from "../store.js";

// export default {
//   props: ['speakerOptionEnabled'],
//   data() {
//     return {
//       speakers: [],
//       config,
//       resources
//     }
//   },
//   methods: {
//     speakerChanged(name) {
//       const speakers = this.resources.modelSpeakerOptions;
//       this.config.modelSpeaker = speakers.find(speaker => speaker.name === name);
//     }

//   },
//   template: `
//     <header class="d-flex justify-content-between py-3">
//     <a href="#" @click.prevent="$emit('prev-click')" class="icon-link">
//       <svg role="img" aria-label="Back to previous screen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left text-secondary" viewBox="0 0 16 16">
//         <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
//       </svg>
//       </a>
//     <div class="dropdown">
//       <button v-if="speakerOptionEnabled" class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//         Speaker: {{config.modelSpeaker.displayName}}
//       </button>
//       <ul class="dropdown-menu" role="menu">
//         <li role="menuitemradio" v-for="speaker in resources.modelSpeakerOptions" class="dropdown-item" @click="speakerChanged(speaker.name)">
//         <input class="form-check-input me-1" type="radio" :checked="speaker.name == config.modelSpeaker.name" :value="speaker.name" :id="'speaker-' + speaker.name">
//         <label class="form-check-label" :for="'speaker-' + speaker.name">{{speaker.displayName}}</label>
//         </li>
//         <li><hr class="dropdown-divider"></li>
//         <li role="menuitemcheckbox" class="w-100 dropdown-item" @click="config.echo = !config.echo">
//           <div class="d-flex">
//           <input class="form-check-input me-1" type="checkbox" :checked="config.echo" id="echo-option-checkbox">
//             <div>
//             <label class="form-check-label" for="echo-option-checkbox">Echo</label>
//             <p class="fw-light">Play back your pronunciation.</p>
//             </div>
//           </div>
//         </li>
//       </ul>
//     </div>
//     </header>
//     `,

// }
