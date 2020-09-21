// TODO: Connect to create API and update UI accordingly.
window.document
    .getElementById("createContact")
    .addEventListener("click", doCreateContact);

// Create contact with modal. ez

function doCreateContact() {
    let xhr = new XMLHttpRequest();
    let url = window.urlBase + "/create." + window.extension;
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    let name = window.document.getElementById("createName").value.trim();
    let phone = window.document.getElementById("createPhoneNumber").value.trim();
    let email = window.document.getElementById("createEmail").value.trim();

    if (isEmpty(name) || isEmpty(phone) || isEmpty(email)) {
        // TODO: indicate with alert that some fields are empty.
    }
    let [firstName, lastName] = name.split(" ");
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
    console.log(xhr.responseText);

    // Successful if it's empty.
    if (isEmpty(xhr.responseText)) {

    } else {
        // TODO: indicate with alert that there's an error.
    }
}
