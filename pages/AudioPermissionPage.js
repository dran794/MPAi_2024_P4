import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
// import TikiMessage from "../components/TikiMessage.js";
import { updateAnalysers, initAudio, updateInputSource } from "../audio.js";
import { config, resources } from "../store.js";

export default {
  components: { Header, Footer },

  template: `
  <Header />

  <div class="container-fluid full-vh d-flex flex-column">

    <!--Empty space for header-->
    <div class="row" style="height: 15vh;"></div>
  
    <!-- Main Content -->
    <div class="row flex-grow-1">
      
      <!-- LHS -->
      <div class="col-6">
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>      
      </div>

      <!-- RHS -->
      <div class="col-6">
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
      </div>
    </div>
  </div>

  <Footer />

        
    `,
  methods: {
    prevClicked() {
      this.$router.replace("/");
    },
    nextClick() {
      const target = this.$route.query.redirectTo;
      if (this.$route.redirectedFrom) {
        this.$router.push(this.$route.redirectedFrom);
      } else if (target && this.$router.hasRoute(target)) {
        this.$router.push({ name: target });
      } else {
        this.$router.push({ name: "taa-record" });
      }
    },
    analyserVisibilityChanged(element) {
      if (!element) {
        return;
      }
      updateAnalysers(element);
    },
    // async getMicPermission() {
    //     await initAudio().then(() => {
    //         this.hasGrantedPermission = true;
    //         config.hasMicPermission = true;
    //         navigator.mediaDevices.enumerateDevices().then((devices) => {
    //             // Save a list of input devices to display.
    //             this.inputDevices = devices.filter(device => device.kind === "audioinput");
    //             // Sets default device to be the initial selected device.
    //             const defaultDevice = this.inputDevices.find(device => device.deviceId === "default")
    //             this.config.audioInput = defaultDevice ? "default" : this.inputDevices[0].deviceId;
    //         }, () => { console.log("Failed to enumerate devices.") });
    //     }, () => {
    //         this.hasGrantedPermission = false;
    //         config.hasMicPermission = false;
    //     });
    //     return this.hasGrantedPermission;
    // },

    async getMicPermission() {
      try {
        await initAudio(); // returns cached promise if already done
        this.hasGrantedPermission = true;
        config.hasMicPermission = true;
        this.isContinueEnabled = true;

        if (!this.inputDevices?.length) {
          const devices = await navigator.mediaDevices.enumerateDevices();
          this.inputDevices = devices.filter((d) => d.kind === "audioinput");
          const defaultDevice = this.inputDevices.find(
            (d) => d.deviceId === "default"
          );
          this.config.audioInput = defaultDevice
            ? "default"
            : this.inputDevices[0]?.deviceId;
        }
      } catch (err) {
        console.error("Mic init failed:", err);
        this.hasGrantedPermission = false;
        config.hasMicPermission = false;
      }
      return this.hasGrantedPermission;
    },
    audioInputChanged(newInputId) {
      updateInputSource(newInputId);
      this.config.audioInput = newInputId;
    },
  },
  data() {
    return {
      hasCheckedPermission: false,
      hasGrantedPermission: null,
      inputDevices: [],
      config,
    };
  },
  mounted() {},
};

/**
 * <TopBar/>
        <div class="flex-grow-1 ">
            <TikiMessage>
                <template v-if="!hasGrantedPermission">Before we go on, I need to be able to hear you.</template>
                <template v-if="hasGrantedPermission">Ka pai. Try saying something.</template>
            </TikiMessage>
            <p class="text-center" v-if="!hasGrantedPermission">Your microphone is used to listen to your pronunciation so analysis and comparison can happen. Your voice is processed on your device and no data is collected. If you are participating in one of our research studies, you can choose to record and send audio samples.</p>
            <p class="text-center" v-if="hasGrantedPermission">If nothing is showing on the monitor when you say something, try changing the microphone below.</p>
            <div class="mt-3 d-flex flex-column gap-2 col-lg-6 justify-content-center mx-auto">
            <a class="btn btn-secondary" @click="getMicPermission()" :class="{'d-none': hasGrantedPermission}">Grant microphone permission</a>
                <template v-if="hasGrantedPermission">
                    <canvas id="analyser" style="background-color: lightgray;" :ref="analyserVisibilityChanged"></canvas>
                    <h2 class="fs-6 mb-0 mt-3">Choose a Microphone</h2>
                    <ul class="list-group">
                        <li class="list-group-item" v-for="device in inputDevices" >
                            <input class="form-check-input me-1" type="radio" :checked="device.deviceId === config.audioInput" @change="audioInputChanged(device.deviceId)" :value="device.deviceId" :id="'audioinputcb-' + device.deviceId">
                            <label class="form-check-label" :for="'audioinputcb-' + device.deviceId">{{device.label}}</label>
                        </li>
                    </ul>
                    <!--<select @change="audioInputChanged($event)">
                        <option v-for="device in inputDevices" 
                            :value="device.deviceId" 
                            :selected="device.deviceId === config.audioInput">
                            {{device.label}}
                        </option>
                    </select> -->
                </template>
            </div>
        </div>
        <BottomBar @continue-click="nextClick()" :isContinueEnabled="hasGrantedPermission" />
 */

/*

    <TopBar />
    <section class="container-fluid full-vh d-flex flex-column">

      <!-- Optional Top Row -->
      <div class="row justify-content-center align-content-center shadow" style="height: 15vh; background-color: var(--mpai-theme);">
        <!-- Header content if needed -->
        Hi
      </div>

      <!-- 2x2 Grid Content -->
      <div class="row flex-grow-1">

        <!-- Top-Left Cell -->
        <div class="col-md-6 d-flex flex-column justify-content-center p-4 bg-black">
          <h1 class="ms-3 text-white">We can't hear you!</h1>
          <p class="ms-3 text-white">Please enable your microphone so that we can hear you out</p>
        </div>

        <!-- Top-Right Cell -->
        <div class="col-md-6 d-flex flex-column align-items-center justify-content-start p-4">
          <template v-if="hasGrantedPermission">
            <canvas 
              id="analyser" 
              style="background-color: lightgray;" 
              :ref="analyserVisibilityChanged">
            </canvas>

            <h2 class="fs-6 mb-0 mt-3">Choose a Microphone</h2>
            <ul class="list-group w-100">
              <li class="list-group-item" v-for="device in inputDevices" :key="device.deviceId">
                <input 
                  class="form-check-input me-1" 
                  type="radio"
                  :checked="device.deviceId === config.audioInput"
                  @change="audioInputChanged(device.deviceId)"
                  :value="device.deviceId"
                  :id="'audioinputcb-' + device.deviceId">
                <label 
                  class="form-check-label" 
                  :for="'audioinputcb-' + device.deviceId">
                  {{ device.label }}
                </label>
              </li>
            </ul>
          </template>
        </div>

        <!-- Bottom-Left Cell -->
        <div class="col-md-6 d-flex justify-content-center align-items-center p-4 bg-black">
          <a 
            class="btn btn-secondary"
            @click="getMicPermission()"
            :class="{ 'd-none': hasGrantedPermission }">
            Grant microphone permission
          </a>
          </a>
        </div>

        <!-- Bottom-Right Cell -->
        <div class="col-md-6 d-flex justify-content-center align-items-center p-4">
          <div class="d-grid col-12 col-lg-6 mx-auto mb-4">
  <a
    @click.prevent="nextClick"
    id="btn-continue"
    class="btn btn-primary"
    :class="{ disabled: !isContinueEnabled || isLoadingNextPage }"
    :aria-disabled="!isContinueEnabled || isLoadingNextPage"
  >
    <template v-if="!isLoadingNextPage">
      Continue
    </template>
    <template v-else>
      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span class="visually-hidden" role="status">Loading...</span>
    </template>
  </a>
</div>

  
      </div>
      <BottomBar />
    </section>
*/
