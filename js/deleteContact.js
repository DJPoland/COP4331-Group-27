function doDelete(index) {
  let xhr = new XMLHttpRequest();
  let url = window.urlBase + "/delete." + window.extension;
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  let [firstName, lastName] = window.document
    .getElementById(`name${index}`)
    .getAttribute("placeholder")
    .split(" ");

  let jsonPayload =
    '{"FirstName" : "' +
    firstName +
    '", "LastName" : "' +
    lastName +
    '", "UserID" : "' +
    window.userId +
    '", "ID" : "' +
    window.cardsArray[index] +
    '"}';

  xhr.send(jsonPayload);

  window.doSearch();
}
