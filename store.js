// store.js
export const config = Vue.reactive({
  audioInput: null,
  hasMicPermission: false,
  modelSpeaker: null,
  studyParticipantId: null,
  studyPassword: null,
  attemptsAllowed: 5,
  echo: true,
  language: "en",
});

export const resources = Vue.reactive({
  modelSpeakerOptions: [],
  speakerFormants: [],
  micDevices: [],
});

// On first grant we’ll also persist it so a reload still skips the page:
export function rememberMicPermission() {
  localStorage.setItem("micPermission", "granted");
}

export function loadMicPermission() {
  if (localStorage.getItem("micPermission") === "granted") {
    config.hasMicPermission = true;
  }
}
