export default {
  template: `
    <footer class="fixed-bottom container-fluid d-flex flex-column w-100" style="height: 7.5vh; z-index: 1010;">
      <div class="row">

        <!-- Information Button -->
        <div class="col justify-content-center align-items-center d-flex">
          <button type="button" class="btn footer-btn rounded-pill" data-bs-toggle="modal" data-bs-target="#infoModal">
            <i class="bi bi-info-circle"></i>
            <span class="footer-text"> About Us</span>
          </button></div>

        <!-- Acknowledgement Button -->
        <div class="col justify-content-center align-items-center d-flex"><button type="button" class="btn footer-btn rounded-pill" data-bs-toggle="modal" data-bs-target="#acknowledgementModal"><i class="bi bi-award"></i>
  <span class="footer-text"> Acknowledgements</span></button></div>

        <!-- Night-->
        <div class="col justify-content-center align-items-center d-flex"><button type="button" class="btn footer-btn rounded-pill"><i class="bi bi-moon-stars"></i>
  <span class="footer-text"> Night Mode</span></button></div>

        <!-- Language Button -->
        <div class="col justify-content-center align-items-center d-flex"><button type="button" class="btn footer-btn rounded-pill" data-bs-toggle="modal" data-bs-target="#languageSelectModal"><i class="bi bi-translate"></i>
  <span class="footer-text"> Language Select</span></button></div>
    </footer>


    <!-- Modals Here -->
    <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="infoModal">Modal title</h1>
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

    <div class="modal fade" id="acknowledgementModal" tabindex="-1" aria-labelledby="acknowledgementModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="acknowledgementModal">Modal title</h1>
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

    <div class="modal fade" id="languageSelectModal" tabindex="-1" aria-labelledby="languageSelectModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="languageSelectModal">Modal title</h1>
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
    `,
};
