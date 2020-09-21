window.document.getElementById('createAccount').addEventListener('click', doSearch);

function doSearch() {

    let xhr = new XMLHttpRequest();
    let url = window.urlBase + '/search.' + window.extension;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    let search = window.document.getElementById("textbox").value;


    // TODO: Obtain userID from cookie.

    // Test using existing ID.
    let userID = "1";
    let jsonPayload = '{"Search" : "' + search + '", "UserID" : "' + userID + '"}';
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                console.log("Successfully retrieved JSON from search");
                let jsonObject = JSON.parse( xhr.responseText );
                console.log(jsonObject);
				
				// for (let i=0; i<jsonObject.results.length; i++) {
				// 	colorList += jsonObject.results[i];
				// 	if(i < jsonObject.results.length - 1) {
				// 		colorList += "<br />\r\n";
				// 	}
				// }
				
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

