// TODO: document.getElementsByClassName("btn-secondary")[i].classList.remove("disabled") where i indicates contact.active

// Disable edit contact and enable update contact,
// then send form information when "update contact" is clicked.

function doUpdate(index) {
  let xhr = new XMLHttpRequest();
  let url = window.urlBase + "/update." + window.extension;
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  let [firstName, lastName] = window.document
    .getElementById(`name${index}`)
    .value.trim()
    .split(" ");
  let phone = window.document.getElementById(`phone${index}`).value.trim();
  let email = window.document.getElementById(`email${index}`).value.trim();
  let jsonPayload =
    '{"FirstName" : "' +
    firstName +
    '", "LastName" : "' +
    lastName +
    '", "Phone" : "' +
    phone +
    '", "Email" : "' +
    email +
    '", "ID" : "' +
    window.cardsArray[index] +
    '"}';

  xhr.send(jsonPayload);
  console.log(xhr.responseText);

  window.doSearch();
}
