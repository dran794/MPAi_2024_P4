import TopBar from "../components/TopBar.js";
import BottomBar from "../components/BottomBar.js";
import TikiMessage from "../components/TikiMessage.js";
import { updateAnalysers, initAudio, updateInputSource } from "../audio.js";
import { config, resources } from "../store.js";

export default {
  components: { TopBar, BottomBar, TikiMessage },

  template: `
        <TopBar @prev-click="prevClicked()" />
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
    `,
  methods: {
    prevClicked() {
      this.$router.replace("/");
    },
    nextClick() {
      const target = this.$route.query.redirectTo || "playground-explanation";
      if (this.$route.redirectedFrom) {
        this.$router.push(this.$route.redirectedFrom);
      } else {
        this.$router.push({ name: target });
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
        console.error("Mic init failed:", err); // erm, optional
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
