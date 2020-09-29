window.button = document.getElementById("enterButton");
window.button.addEventListener("click", doLogin);

function sendLoginPayload(jsonPayload, url) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(jsonPayload);

  let jsonObject = JSON.parse(xhr.responseText);
  window.userId = jsonObject.id;
  if (window.userId < 1) {
    throw jsonObject.error;
  }
  window.firstName = jsonObject.firstName;
  window.lastName = jsonObject.lastName;
  window.saveCookie();
  window.setTimeout(() => {
    window.document.getElementById("spinnerHtml").style.display = "none";
    window.password.insertAdjacentHTML(
      "afterend",
      `<br/><br/><span> User found. Redirecting to Contact Manager...</span>`
    );
    window.setTimeout(
      () => (window.location.href = "contactManager.html"),
      5000
    );
  }, 1000);
}

function doLogin() {
  window.userId = 0;
  window.firstName = "";
  window.lastName = "";

  let spinnerHtml = `<br/><br/><div id="spinnerHtml"><div class="spinner-border" role="status"></div><br/><span>Verifying...</span><br/><br/></div>`;
  let loginUser = document.getElementById("username").value.trim();
  let loginPassword = md5(document.getElementById("password").value.trim());
  let jsonPayload =
    '{"Login" : "' + loginUser + '", "Password" : "' + loginPassword + '"}';
  let url = window.urlBase + "/Login." + window.extension;

  // Hide the button and display spinner.
  window.button.style.display = "none";

  window.password = document.getElementById("password");
  window.password.insertAdjacentHTML("afterend", spinnerHtml);
  try {
    sendLoginPayload(jsonPayload, url);
  } catch (err) {
    window.setTimeout(() => {
      window.document.getElementById("spinnerHtml").style.display = "none";
      window.password.insertAdjacentHTML(
        "afterend",
        `<br/><br/><span> User not found. <span/><br/><span> Please try using another Username/Password. </span>`
      );
      window.setTimeout(() => location.reload(), 5000);
    }, 1000);
  }
}
