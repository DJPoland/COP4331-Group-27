window.document
  .getElementById("createContact")
  .addEventListener("click", doCreateContact);

function doCreateContact() {
  let xhr = new XMLHttpRequest();
  let url = window.urlBase + "/create." + window.extension;
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  let name = window.document.getElementById("createName").value.trim();
  let phone = window.document.getElementById("createPhoneNumber").value.trim();
  let email = window.document.getElementById("createEmail").value.trim();

  if (isEmpty(name) || isEmpty(phone) || isEmpty(email)) {
    createModalWithMessage(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
          The name, email, or phone field(s) are empty.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
      </div>`);
      return;
  }

  let [firstName, lastName] = name.split(" ");
  firstName = firstName || "";
  lastName = lastName || "";

  let jsonPayload =
    '{"FirstName" : "' +
    firstName +
    '", "LastName" : "' +
    lastName +
    '", "Phone" : "' +
    phone +
    '", "Email" : "' +
    email +
    '", "UserID" : "' +
    window.userId +
    '"}';
  xhr.send(jsonPayload);

  if (isEmpty(xhr.responseText)) {
    createModalWithMessage(`
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            Contact successfully created. 
            The contact can now be searched. 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>`);
        window.doSearch();
  } else {
      createModalWithMessage(`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            Error with creating contact. Please try again. 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>`);
  }
}

function createModalWithMessage(message) {
  document
    .getElementById("modalHeader")
    .insertAdjacentHTML("afterend", message);
}
