window.urlBase = "http://contactlist27.com/LAMPAPI";
window.extension = "php";
window.userId = 0;
window.firstName = "";
window.lastName = "";
window.password = undefined;

function saveCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  window.document.cookie =
    "firstName=" +
    window.firstName +
    ",lastName=" +
    window.lastName +
    ",userId=" +
    window.userId +
    ";expires=" +
    date.toGMTString();
}

function readCookie() {
  window.userId = -1;
  let cookieValues = document.cookie.split(",");

  cookieValues.map((cookieValue) => {
    let cookie = cookieValue.trim();
    let [key, value] = cookie.split("=");
    if (key == "firstName") {
      window.firstName = value;
    } else if (key == "lastName") {
      window.lastName = value;
    } else if (key == "userId") {
      window.userId = parseInt(value.trim());
    }
  });
  if (userId < 0) {
    window.location.href = "index.html";
  }
}

function doLogout() {
  window.userId = 0;
  window.firstName = "";
  window.lastName = "";
  window.document.cookie =
    "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}

// Below functions make textboxes smoother to use.
function clearText(obj, str) {
  if (obj.value == str) {
    obj.value = "";
  }
}

function regenerateText(obj, str) {
  if (obj.value == "") {
    obj.value = str;
  }
}

function isEmpty(value) {
  return value === undefined || value === null || value.length === 0;
}
