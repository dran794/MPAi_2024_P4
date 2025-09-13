export default {
  template: `
    <footer class="fixed-bottom container-fluid d-flex flex-column w-100" style="height: 7.5vh; z-index: 1010;">
      <div class="row">

        <!-- Information Button -->
        <div class="col"><button type="button" class="btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">About Us</button></div>

        <!-- Acknowledgement Button -->
        <div class="col"><button type="button" class="btn-primary">Acknowledgements</button></div>

        <!-- Night Mode Button -->
        <div class="col"><button type="button" class="btn-primary">Night Mode</button></div>

        <!-- Language Button -->
        <div class="col"><button type="button" class="btn-primary">Language Select</button></div>
    </footer>


    <!-- Modals Here -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    `,
};
