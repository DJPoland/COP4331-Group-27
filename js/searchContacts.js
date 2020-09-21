window.document.getElementById('createAccount').addEventListener('click', doSearch);

function doSearch() {

    let xhr = new XMLHttpRequest();
    let url = window.urlBase + '/search.' + window.extension;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    let search = window.document.getElementById("textbox").value;


	// TODO: Remov
	console.log(window.userId);

	if (!window.userID) {
		throw "User ID doesn't exist";
	}

    let userID = window.userId;
    let jsonPayload = '{"Search" : "' + search + '", "UserID" : "' + userID + '"}';
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                console.log("Successfully retrieved JSON from search");
                let jsonObject = JSON.parse( xhr.responseText );
                console.log(jsonObject);
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
        console.log("Theres an error!:" + err)
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
}

