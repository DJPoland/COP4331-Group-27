// This should probably be moved to Util/globals, but i'll keep it here for now.
readCookie();

window.document
  .getElementById("searchContact")
  .addEventListener("click", doSearch);
window.document
  .getElementById("logoutBtn")
  .addEventListener("click", doLogout);
window.document
  .getElementById("insertP")
  .insertAdjacentHTML(
    "beforeend",
    `<p>Logged in as: <b>${window.firstName} ${window.lastName}</b></p>`
  );
window.cardsArray = [];

function generateContactCard(contact, idx) {
  let contactHtml = `<div id="contact${idx}" class="col mb-4">
	<div class="card">
	<button href="#model${idx}" type="button" class="close deleteButton noSelect" data-toggle="modal" data-target="#model${idx}" aria-label="Close">
	<span aria-hidden="true">&times;</span>
	</button>
		<div class="card-body">
			<form>
				<div class="form-group row">
					<label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Contact</label>
					<div class="col-sm-10">
						<input id="name${idx}" type="email" class="form-control form-control-sm" placeholder="${contact.firstName} ${contact.lastName}" disabled>
					</div>
				</div>
				<div class="form-group row">
					<label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Email</label>
					<div class="col-sm-10">
						<input id="email${idx}" type="email" class="form-control form-control-sm" placeholder="${contact.email}" disabled>
					</div>
				</div>
				<div class="form-group row">
					<label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Phone</label>
					<div class="col-sm-10">
						<input id="phone${idx}" type="email" class="form-control form-control-sm" placeholder="${contact.phone}" disabled>
					</div>
				</div>
			</form>
		</div>
		<div>
			<a id="editContact${idx}" href="#" class="btn btn-primary btn-lg" tabindex="-1" role="button" aria-disabled="true">Edit Contact</a>
			<a id="updateContact${idx}" href="#" class="btn btn-secondary btn-lg disabled" tabindex="-1" role="button" aria-disabled="true">Update Contact</a>
		</div>
	</div>
  </div>
  <div id="model${idx}" class="modal center" tabindex="-1">
  <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
          <h5 class="modal-title">Are You Sure?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="modal-body">
          <p class="colorBlack">By clicking confirm, you will permanently delete this contact.</p>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button id="deleteButton${idx}" type="button" class="btn btn-primary" data-dismiss="modal">Confirm</button>
      </div>
      </div>
  </div>
  </div>
  `;

  window.document
    .getElementById("cardsPlaceholder")
    .insertAdjacentHTML("beforeend", contactHtml);
  window.document.getElementById(`deleteButton${idx}`).onclick = function () {
    window.doDelete(idx);
  };
  window.document.getElementById(`updateContact${idx}`).onclick = function () {
    window.doUpdate(idx);
  };
  window.document.getElementById(`editContact${idx}`).onclick = function () {
    window.doEdit(idx);
  };

  window.cardsArray.push(contact.ID);
}

function doSearch() {
  window.document.getElementById("cardsPlaceholder").innerHTML = "";
  window.cardsArray = [];

  let xhr = new XMLHttpRequest();
  let url = window.urlBase + "/search." + window.extension;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  if (!window.userId) {
    throw "User ID doesn't exist";
  }
  let search = window.document.getElementById("textbox").value.trim();
  let userID = window.userId;
  let jsonPayload =
    '{"Search" : "' + search + '", "UserID" : "' + userID + '"}';
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        if (!jsonObject.results) {
          return;
        }
        window.numberOfCards = jsonObject.results.length;
        jsonObject.results.map((obj, idx) => {
          generateContactCard(obj, idx);
        });
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log("Theres an error!:" + err);

    // TODO: Warn that there's an error.
  }
}

function doEdit(idx) {
  window.document.getElementById(`name${idx}`).removeAttribute("disabled");
  window.document.getElementById(`email${idx}`).removeAttribute("disabled");
  window.document.getElementById(`phone${idx}`).removeAttribute("disabled");
  window.document
    .getElementById(`updateContact${idx}`)
    .classList.remove("disabled");
}
