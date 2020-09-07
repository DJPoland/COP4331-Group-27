// Attach event listener to button
const button = document.getElementById('enterButton');
button.addEventListener('click', doLogin);

let urlBase = 'http://contactlist27.com/LAMPAPI';
let extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";


function doLogin() {
    userId = 0;
    firstName = "";
    lastName = "";

    let login = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    // TODO: Implement hashing....
    // md5();

    // document.getElementById("enterButton");

	let jsonPayload = '{"Login" : "' + login + '", "Password" : "' + password + '"}';
    let url = urlBase + '/Login.' + extension;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try 
    {
        console.log(jsonPayload);
        xhr.send(jsonPayload);

        let responseText = xhr.responseText;
        let jsonObject = JSON.parse(responseText);
        console.log(jsonObject);

        userId = jsonObject.id;
        if ( userId < 1 )
        {
            document.getElementById("enterButton")
                .innerHTML = "User/Password combination incorrect";
            return;
        }

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        saveCookie();

        // TODO: Create logged in contactManager.html
        // window.location.href = "contactManager.html";
    } 
    catch (err) 
    {
        document.getElementById("enterButton").innerHTML = err.message;
    }
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() 
{
    // TODO: Read possible cookie.
}

function doLogout() 
{
    // TODO: Setup logout functionality.
}

// Below functions make textboxes smoother to use.
function clearText(obj, str)
{
  if (obj.value == str) 
  {
      obj.value = "";
  }
}
function regenerateText(obj, str)
{
  if (obj.value == '')
  {
      obj.value = str;
  }
}
