// TODO: Connect to delete API and update UI accordingly.

// Go to parent from clicked button that has class "deleteButton",
// and delete the associated ID.

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
    '"}';

  xhr.send(jsonPayload);
  console.log(xhr.responseText);
}
