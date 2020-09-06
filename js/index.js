let extension = 'php';

function doLogin() {
    // TODO: Set up hashing and login with API endpoint.
}

function saveCookie()
{
    // TODO: Save cookie to remind user logged in.
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
