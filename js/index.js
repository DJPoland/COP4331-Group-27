
let urlBase = 'http://contactlist27.com/LAMPAPI';
let extension = 'php';
let userId = 0;
let firstName = "";
let lastName = "";
let password = undefined;
let button = document.getElementById('enterButton');

// Attach event listener to enter button.
button.addEventListener('click', doLogin);

function sendLoginPayload(jsonPayload, url) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.send(jsonPayload);
    let jsonObject = JSON.parse(xhr.responseText);
    userId = jsonObject.id;
    if (userId < 1) {
        throw jsonObject.error;
    }
    firstName = jsonObject.firstName;
    lastName = jsonObject.lastName;
    saveCookie();
    window.setTimeout(() => {
        document.getElementById("spinnerHtml").style.display = "none";
        password.insertAdjacentHTML('afterend',`<br/><br/><span> User found. Redirecting to Contact Manager...</span>`);
        window.setTimeout(() => window.location.href = "contactManager.html", 5000);
    }, 1000);
}

function doLogin() {

    let spinnerHtml = `<br/><br/><div id="spinnerHtml"><div class="spinner-border" role="status"></div><br/><span>Verifying...</span><br/><br/></div>`;

    userId = 0;
    firstName = "";
    lastName = "";

    // TODO: Implement hashing....
    // md5();
    let loginUser = document.getElementById("username").value;
    let loginPassword = document.getElementById("password").value;
    let jsonPayload = '{"Login" : "' + loginUser + '", "Password" : "' + loginPassword + '"}';
    let url = urlBase + '/Login.' + extension;

    // Hide the button and display spinner.
    button.style.display = "none";

    password = document.getElementById("password");
    password.insertAdjacentHTML('afterend', spinnerHtml);
    window.setTimeout(() => undefined, 100000);
    try {
        sendLoginPayload(jsonPayload, url);
    } catch (err) {
        window.setTimeout(() => {
            document.getElementById("spinnerHtml").style.display = "none";
            password.insertAdjacentHTML('afterend',`<br/><br/><span> User not found. <span/><br/><span> Please try using another Username/Password. </span>`);
            window.setTimeout(() => location.reload(), 5000);
        }, 1000);
    }
}

function saveCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() {
    // TODO: Read possible cookie.
}

function doLogout() {
    // TODO: Setup logout functionality.
}

// Below functions make textboxes smoother to use.
function clearText(obj, str) {
    if (obj.value == str) {
        obj.value = "";
    }
}

function regenerateText(obj, str) {
    if (obj.value == '') {
        obj.value = str;
    }
}