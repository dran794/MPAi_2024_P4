import Footer from "../components/Footer.js";
import Header from "../components/ActivityHeader.js";

export default {
  components: { Header, Footer },
  data() {
    return {
      images: [
        "images/ScienceOfSpeaking/p1.png",
        "images/ScienceOfSpeaking/p2.png",
        "images/ScienceOfSpeaking/p3.png",
      ],
    };
  },
  template: `
    <Header />
    <div class="container-fluid d-flex flex-column vh-100">
      <div class="row" style="height:15%"></div>
      
      <!-- Main Content Row -->
      <div class="row flex-grow-1 position-relative">
        <div class="col p-0">
          <iframe 
            src="https://www.canva.com/design/DAG1DdWFiyE/fH0Ani_qwo8QtyyLonch9Q/view?embed"
            style="width: 100%; height: 100%; margin: 0;" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>

    `,
};

