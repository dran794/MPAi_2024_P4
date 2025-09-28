import Footer from "../components/Footer.js";
import NavigationMenu from "../components/Sidebar.js";
import { config } from "../store.js";

export default {
  components: {
    Footer,
    NavigationMenu,
  },

  template: `
<div class="container-fluid min-vh-100 d-flex flex-column">

  <!-- Top little text - Kia Ora, Nau Mai Ki -->
  <div class="row d-flex align-items-center justify-content-center" style="height:7.5vh;">
    <div class="col-auto text-center">
      <h3 class="m-0">Kia Ora, Nau Mai Ki</h3>
    </div>
  </div>
  
  <!--Main Card-->
  <div class="row main-card" style="height: 37.5vh;">
    
    <!-- MPAi Text -->
    <div class="col-4 d-flex align-items-center justify-content-center">
        <h1 class="title">MPAi</h1>
    </div>

    <!-- MPAi full -->
    <div class="col-2 d-flex align-items-center justify-content-center">
      <h3 class="bold text-white">
        <span style="color: var(--orange);">M</span>aori<br>
        <span style="color: var(--orange);">P</span>ronunciation<br>
        <span style="color: var(--orange);">Ai</span>d Tool
      </h3>
    </div>

    <!-- Begin Button -->
    <div class="col-6 d-flex align-items-center justify-content-center">
      <div class="buttons d-flex align-items-center justify-content-center">
        <a class="dashing-fill bold text-white" @click="nextPage()">Begin</a>
      </div>
    </div>
  </div>

  <!--Red Line below main card w/ Shadow-->
  <div class="row bg-danger" style="height: 2.5vh;"></div>

  <!--Short description of MPAi-->
  <div class="row flex-grow-1 my-5 mx-5">
    <div class="col-8">
      <p class="text" >
      MPAi can help compare your pronunciation of Te Reo Maori vowels to
      sounds produced by Kaumatua and Kuia (elder) speakers
      </p>
    </div>
    <!-- Empty Space-->
    <div class="col-4"></div>
  </div>

  <!--Footer-->
  <Footer />



  </div>
  `,

  data() {
    return {
      showTopBar: true,
      isLightTheme: false,
    };
  },

  mounted() {},

  methods: {
    nextPage() {
      this.$router.push({ name: "menu" });
    },

    // toggleTheme() {
    //   this.isLightTheme = !this.isLightTheme;
    //   if (this.isLightTheme) {
    //     document.body.classList.add("light");
    //     localStorage.setItem("theme", "light");
    //   } else {
    //     document.body.classList.remove("light");
    //     localStorage.setItem("theme", "dark");
    //   }
    // },
  },
};

/*

  <div class="container-fluid" style="height: 100vh; display: flex; flex-direction: column;">

    <!-- Kia Ora, Nau Mai Ki -->
    <div class="row" style="height: 15vh;">
      <div class="col">
        <p>Kia Ora, Nau Mai Ki</p>
      </div>
    </div>

    <!-- Main MPAi card -->
    <div class="row main-card" style="height: 37.5vh;">
      <div class="col-4 d-flex align-items-center justify-content-center">
        <p class="title">MPAi</p>
      </div>
      <div class="col-4 d-flex align-items-center justify-content-center">
        <div class="bold">
          <span style="color: var(--orange);">M</span>aori<br>
          <span style="color: var(--orange);">P</span>ronunciation<br>
          <span style="color: var(--orange);">A</span>id Tool
        </div>
      </div>
      <div class="col-4">
        <div class="buttons">
          <a class="dashing-fill bold" style="font-size:36px;" @click="nextPage()">Begin</a>
        </div>
      </div>
    </div>

    <!-- Description of MPAi -->
    <div class="row flex-grow-1 my-5">
      <div class="col-8">
        <p class="text">
          MPAi can help compare your pronunciation of Te Reo Maori vowels to
          sounds produced by Kaumatua and Kuia (elder) speakers
        </p>
      </div>
    </div>

    <!-- Bottom row of buttons -->
    <div class="row d-flex align-items-center" style="height: 10vh;">
      <div class="col-1">
        <div class="footer-btn rounded-circle circle-btn d-flex align-items-center justify-content-center">
          <!-- Inline SVG for the Moon icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g id="Environment / Moon">
              <path id="Vector" d="M9 6C9 10.9706 13.0294 15 18 15C18.9093 15 19.787 14.8655 20.6144 14.6147C19.4943 18.3103 16.0613 20.9999 12 20.9999C7.02944 20.9999 3 16.9707 3 12.0001C3 7.93883 5.69007 4.50583 9.38561 3.38574C9.13484 4.21311 9 5.09074 9 6Z" 
                stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
          </svg>
        </div>
      </div>
      <div class="col-1">
        <div class="footer-btn rounded-circle circle-btn d-flex align-items-center justify-content-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g id="UI / Megaphone">
            <!-- Megaphone body -->
            <path d="M4 10V14C4 14.55 4.45 15 5 15H7L13 18V6L7 9H5C4.45 9 4 9.45 4 10Z" 
              stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Handle -->
            <path d="M7 15V18C7 18.55 7.45 19 8 19H9C9.55 19 10 18.55 10 18V16" 
              stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Sound waves -->
            <path d="M16 9C17.2 10.2 17.2 13.8 16 15" 
              stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 7.5C20.5 9.5 20.5 14.5 18.5 16.5" 
              stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
        </svg>


        </div>      
      </div>
      <div class="col-1">
        <div class="footer-btn rounded-circle circle-btn d-flex align-items-center justify-content-center">
          <!-- Inline SVG for the Moon icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g id="Environment / Moon">
              <path id="Vector" d="M9 6C9 10.9706 13.0294 15 18 15C18.9093 15 19.787 14.8655 20.6144 14.6147C19.4943 18.3103 16.0613 20.9999 12 20.9999C7.02944 20.9999 3 16.9707 3 12.0001C3 7.93883 5.69007 4.50583 9.38561 3.38574C9.13484 4.21311 9 5.09074 9 6Z" 
                stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
          </svg>
        </div>
      </div>
      <div class="col-1">
        <div class="footer-btn rounded-circle circle-btn d-flex align-items-center justify-content-center">
          <svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
 <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> 
 <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-204.000000, -671.000000)" fill="#ffffff"> <path d="M231.596,694.829 C229.681,694.192 227.622,693.716 225.455,693.408 C225.75,691.675 225.907,689.859 225.957,688 L233.962,688 C233.783,690.521 232.936,692.854 231.596,694.829 L231.596,694.829 Z M223.434,700.559 C224.1,698.95 224.645,697.211 225.064,695.379 C226.862,695.645 228.586,696.038 230.219,696.554 C228.415,698.477 226.073,699.892 223.434,700.559 L223.434,700.559 Z M220.971,700.951 C220.649,700.974 220.328,701 220,701 C219.672,701 219.352,700.974 219.029,700.951 C218.178,699.179 217.489,697.207 216.979,695.114 C217.973,695.027 218.98,694.976 220,694.976 C221.02,694.976 222.027,695.027 223.022,695.114 C222.511,697.207 221.822,699.179 220.971,700.951 L220.971,700.951 Z M209.781,696.554 C211.414,696.038 213.138,695.645 214.936,695.379 C215.355,697.211 215.9,698.95 216.566,700.559 C213.927,699.892 211.586,698.477 209.781,696.554 L209.781,696.554 Z M208.404,694.829 C207.064,692.854 206.217,690.521 206.038,688 L214.043,688 C214.093,689.859 214.25,691.675 214.545,693.408 C212.378,693.716 210.319,694.192 208.404,694.829 L208.404,694.829 Z M208.404,679.171 C210.319,679.808 212.378,680.285 214.545,680.592 C214.25,682.325 214.093,684.141 214.043,686 L206.038,686 C206.217,683.479 207.064,681.146 208.404,679.171 L208.404,679.171 Z M216.566,673.441 C215.9,675.05 215.355,676.789 214.936,678.621 C213.138,678.356 211.414,677.962 209.781,677.446 C211.586,675.523 213.927,674.108 216.566,673.441 L216.566,673.441 Z M219.029,673.049 C219.352,673.027 219.672,673 220,673 C220.328,673 220.649,673.027 220.971,673.049 C221.822,674.821 222.511,676.794 223.022,678.886 C222.027,678.973 221.02,679.024 220,679.024 C218.98,679.024 217.973,678.973 216.979,678.886 C217.489,676.794 218.178,674.821 219.029,673.049 L219.029,673.049 Z M223.954,688 C223.9,689.761 223.74,691.493 223.439,693.156 C222.313,693.058 221.168,693 220,693 C218.832,693 217.687,693.058 216.562,693.156 C216.26,691.493 216.1,689.761 216.047,688 L223.954,688 L223.954,688 Z M216.047,686 C216.1,684.239 216.26,682.507 216.562,680.844 C217.687,680.942 218.832,681 220,681 C221.168,681 222.313,680.942 223.438,680.844 C223.74,682.507 223.9,684.239 223.954,686 L216.047,686 L216.047,686 Z M230.219,677.446 C228.586,677.962 226.862,678.356 225.064,678.621 C224.645,676.789 224.1,675.05 223.434,673.441 C226.073,674.108 228.415,675.523 230.219,677.446 L230.219,677.446 Z M231.596,679.171 C232.936,681.146 233.783,683.479 233.962,686 L225.957,686 C225.907,684.141 225.75,682.325 225.455,680.592 C227.622,680.285 229.681,679.808 231.596,679.171 L231.596,679.171 Z M220,671 C211.164,671 204,678.163 204,687 C204,695.837 211.164,703 220,703 C228.836,703 236,695.837 236,687 C236,678.163 228.836,671 220,671 L220,671 Z" id="globe" sketch:type="MSShapeGroup"> </path> </g> </g> </g>
</svg>
        </div>
      </div>
    </div>

  </div>
 */
