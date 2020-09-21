// TODO: Connect to create API and update UI accordingly.

// Create contact with modal. ez

function doCreateContact() {
    let xhr = new XMLHttpRequest();
    let url = window.urlBase + '/create.' + window.extension;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
}