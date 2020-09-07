// Attach event listener to button
const button = document.getElementById('enterButton');
button.addEventListener('click', doLogin);

let urlBase = 'http://contactlist27.com/LAMPAPI';
let extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";


function doLogin() {

    let spinnerHtml = `<div id="spinnerHtml"><div class="spinner-border" role="status"></div><br/><br/><br/><span>Verifying...</span><br/><br/></div>`;

    userId = 0;
    firstName = "";
    lastName = "";

    let login = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // TODO: Implement hashing....
    // md5();

    let jsonPayload = '{"Login" : "' + login + '", "Password" : "' + password + '"}';
    let url = urlBase + '/Login.' + extension;

    // Connect to API.
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    // Hide the button and display spinner.
    button.style.display = "none";
    let loginForm = document.getElementById("loginForm");
    loginForm.innerHTML += spinnerHtml;

    try {
        xhr.send(jsonPayload);

        let jsonObject = JSON.parse(xhr.responseText);

        userId = jsonObject.id;
        if (userId < 1) {
            throw jsonObject.error;
        }

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        saveCookie();

        document.getElementById("spinnerHtml").style.display = "none";
        loginForm.innerHTML += `<br/><br/><span> User found. Redirecting to Contact Manager...</span><br/><br/>`;

        // TODO: Create logged in contactManager.html
        window.setTimeout(() => window.location.href = "contactManager.html", 5000);
    } catch (err) {
        console.log("error!");
        document.getElementById("spinnerHtml").style.display = "none";
        loginForm.innerHTML += `<br/><br/><span> User not found. <span/><br/><span> Please try using another Username/Password. </span><br/><br/>`;

        window.setTimeout(() => location.reload(), 5000);
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