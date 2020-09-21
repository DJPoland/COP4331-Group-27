// TODO: document.getElementsByClassName("btn-secondary")[i].classList.remove("disabled") where i indicates contact.active


// Disable edit contact and enable update contact, 
// then send form information when "update contact" is clicked.

function doUpdate() {
    let xhr = new XMLHttpRequest();
    let url = window.urlBase + '/update.' + window.extension;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
}