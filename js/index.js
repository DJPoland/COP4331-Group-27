window.urlBase = 'http://contactlist27.com/LAMPAPI';
window.extension = 'php';
window.userId = 0;
window.firstName = "";
window.lastName = "";
window.password = undefined;
window.button = document.getElementById('enterButton');

// Attach event listener to enter button.
window.button.addEventListener('click', doLogin);

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

    saveCookie();

    window.setTimeout(() => {
        window.document.getElementById("spinnerHtml").style.display = "none";
        window.password.insertAdjacentHTML('afterend',`<br/><br/><span> User found. Redirecting to Contact Manager...</span>`);
        window.setTimeout(() => window.location.href = "contactManager.html" , 5000);
    }, 1000);
}

function doLogin() {

    window.userId = 0;
    window.firstName = "";
    window.lastName = "";

    let spinnerHtml = `<br/><br/><div id="spinnerHtml"><div class="spinner-border" role="status"></div><br/><span>Verifying...</span><br/><br/></div>`;
    let loginUser = document.getElementById("username").value;
    let loginPassword = document.getElementById("password").value;
    // TODO: Implement hashing....
    let jsonPayload = '{"Login" : "' + loginUser + '", "Password" : "' + loginPassword + '"}';
    let url = window.urlBase + '/Login.' + window.extension;

    // Hide the button and display spinner.
    window.button.style.display = "none";

    window.password = document.getElementById("password");
    window.password.insertAdjacentHTML('afterend', spinnerHtml);
    window.setTimeout(() => undefined, 100000);
    try {
        sendLoginPayload(jsonPayload, url);
    } catch (err) {
        window.setTimeout(() => {
            window.document.getElementById("spinnerHtml").style.display = "none";
            window.password.insertAdjacentHTML('afterend',`<br/><br/><span> User not found. <span/><br/><span> Please try using another Username/Password. </span>`);
            window.setTimeout(() => location.reload(), 5000);
        }, 1000);
    }
}

function saveCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    window.document.cookie = "firstName=" + window.firstName + ",lastName=" + window.lastName + ",userId=" + window.userId + ";expires=" + date.toGMTString();
}

function readCookie() {
	userId = -1;
	let cookieValues = document.cookie.split(",");
	for (let i = 0; i < splits.length; i++) {
		let cookie = cookieValues[i].trim();
		let [key, value] = cookie.split("=");
		if (key == "firstName")
		{
			firstName = value;
		}
		else if (key == "lastName")
		{
			lastName = value;
		}
		else if( key == "userId" )
		{
			userId = parseInt( value.trim() );
		}
	}
    // TODO: uncomment when finished with testing.
	// if( userId < 0 ) {
	// 	window.location.href = "index.html";
	// }
	// else {
	// 	document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	// }
}

function doLogout() {
	window.userId = 0;
	window.firstName = "";
	window.lastName = "";
	window.document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
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