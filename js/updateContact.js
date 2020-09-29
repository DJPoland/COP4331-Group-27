// TODO: document.getElementsByClassName("btn-secondary")[i].classList.remove("disabled") where i indicates contact.active

// Disable edit contact and enable update contact,
// then send form information when "update contact" is clicked.

function doUpdate(index) {
  let xhr = new XMLHttpRequest();
  let url = window.urlBase + "/update." + window.extension;
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  let name = window.document.getElementById(`name${index}`).value.trim() || getPlaceholderValue(index, "name");
  let phone = window.document.getElementById(`phone${index}`).value.trim() || getPlaceholderValue(index, "phone");
  let email = window.document.getElementById(`email${index}`).value.trim() || getPlaceholderValue(index, "email");


  let [firstName, lastName] = name.split(" ");
  lastName = isEmpty(lastName) ? "" : lastName;
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
  window.doSearch();
}

function getPlaceholderValue(index, type) {
  return window.document.getElementById(`${type}${index}`).getAttribute("placeholder");
}
