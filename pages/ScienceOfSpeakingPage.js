import Footer from "../components/Footer.js";
import Header from "../components/Header.js";

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
            // src="https://www.canva.com/design/DAGGkZnYEBo/4lT1haX4lenGwclLl2VdRA/view?embed" 
            src="https://www.canva.com/design/DAG0Zks6y6c/cGd90RTWpqJ_Rq5hc8oIqQ/view?utm_content=DAG0Zks6y6c&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h146e7f6655" 
            style="width: 100%; height: 100%; margin: 0;" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>

    `,
};

