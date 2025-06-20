import WelcomePage from './pages/WelcomePage.js';
import { config, resources } from './store.js';
import FinishPage from './pages/FinishPage.js';
import ModelSpeakerPage from './pages/ModelSpeakerPage.js';
// import translate from './translate.js';
import PlaygroundExplanationPage from './pages/PlaygroundExplanationPage.js';

window.config = config;


/**
 * Navigation guard to ensure audio permission is obtained and default audio device is selected.
 * @param {object} to Path to navigate to
 * @param {object} from Path to navigate from
 * @returns If check succeeds, returns true, otherwise returns audio permission route.
 */
async function checkAudioPermission(to, from) {
    // if (navigator.permissions) {
    //     const audioPermStatus = await navigator.permissions.query({name: "microphone"});
    //     if (audioPermStatus.state == 'granted') {

    //     }
    // }
    if (!config.audioInput) {
        return { name: 'audiopermission' };
    }
    return true;
}

const appRoutes = [
    { name: 'welcome', path: '/', component: WelcomePage },
    { name: 'audiopermission', path: '/audiopermission', component: () => import("./pages/AudioPermissionPage.js") },
    { name: 'playground-explanation', path: '/playground-explanation', component: PlaygroundExplanationPage },
    { name: 'menu', path: '/menu', component: () => import("./pages/MenuPage.js") },
    { name: 'playgroundOnly', path: '/playgroundOnly', component: () => import("./pages/PlaygroundOnlyPage.js"), beforeEnter: checkAudioPermission },
    { name: 'playgroundTimelineOnly', path: '/playgroundTimelineOnly', component: () => import("./pages/PlaygroundTimelineOnlyPage.js"), beforeEnter: checkAudioPermission },
    { name: "model-speaker", path: "/model-speaker", component: ModelSpeakerPage },
    { name: 'target', path: '/target', component: () => import("./pages/TargetPage.js"), beforeEnter: checkAudioPermission },
    { name: 'taa-record', path: '/taa-record', component: () => import("./pages/TaaRecordPage.js"), beforeEnter: checkAudioPermission },
    { name: 'hee-record', path: '/hee-record', component: () => import("./pages/HeeRecordPage.js"), beforeEnter: checkAudioPermission },
    { name: 'hii-record', path: '/hii-record', component: () => import("./pages/HiiRecordPage.js"), beforeEnter: checkAudioPermission },
    { name: 'po-record', path: '/poo-record', component: () => import("./pages/PooRecordPage.js"), beforeEnter: checkAudioPermission },
    { name: 'tuu-record', path: '/tuu-record', component: () => import("./pages/TuuRecordPage.js"), beforeEnter: checkAudioPermission },
    { name: 'finish', path: '/finish', component: FinishPage }
];


const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: appRoutes
});

// Grab participant id and password, put into config.
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("participant_id")) {
    console.log(`Participant ID ${urlParams.get('participant_id')} and password in URL, saving.`)
    config.studyParticipantId = urlParams.get('participant_id');
    config.studyParticipantPassword = urlParams.get('password');
}
if (urlParams.has("attemptsAllowed")) {
    config.attemptsAllowed = urlParams.get('attemptsAllowed');
    console.log(`Setting attempts allowed for recording to ${config.attemptsAllowed}`);
}

function fetchKaumatuaFormants() {
    return new Promise(function (resolve, reject) {
        Papa.parse("kaumatua_monoVowel_formantData.csv", {
            header: true,
            download: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: function (results) {
                resolve(results.data);
            }
        });
    });
}

// Fetch model speakers and select the first one as default.
resources.modelSpeakerOptions = await (await fetch("samples/samples.json")).json();
resources.speakerFormants = await fetchKaumatuaFormants();
// Set model speaker to default to first in options.
config.modelSpeaker = resources.modelSpeakerOptions[0];

const app = Vue.createApp({});
app.use(router);
// app.use(translate);
app.mount("#doc");