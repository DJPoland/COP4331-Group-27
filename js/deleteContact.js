// TODO: Connect to delete API and update UI accordingly.

// Go to parent from clicked button that has class "deleteButton", 
// and delete the associated ID.

function doDelete() {
    let xhr = new XMLHttpRequest();
    let url = window.urlBase + '/delete.' + window.extension;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
}