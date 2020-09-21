window.document.getElementById('createAccount').addEventListener('click', doSearch);

// TODO: Iterate over search API array and create contacts.
let contactHtml = `<div id="contact1" class="col mb-4">
<div class="card">
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
	<div class="card-body">
		<form>
			<div class="form-group row">
				<label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Contact</label>
				<div class="col-sm-10">
					<input type="email" class="form-control form-control-sm" placeholder="col-form-label-sm" disabled>
				</div>
			</div>
			<div class="form-group row">
				<label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Email</label>
				<div class="col-sm-10">
					<input type="email" class="form-control form-control-sm" placeholder="col-form-label-sm" disabled>
				</div>
			</div>
			<div class="form-group row">
				<label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Phone</label>
				<div class="col-sm-10">
					<input type="email" class="form-control form-control-sm" placeholder="col-form-label-sm" disabled>
				</div>
			</div>
		</form>
	</div>
	<div>
		<a href="#" class="btn btn-primary btn-lg center" tabindex="-1" role="button" aria-disabled="true">Edit Contact</a>
		<a href="#" class="btn btn-secondary btn-lg disabled center" tabindex="-1" role="button" aria-disabled="true">Update Contact</a>
	</div>
</div>
</div>`;

function doSearch() {

    let xhr = new XMLHttpRequest();
    let url = window.urlBase + '/search.' + window.extension;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    let search = window.document.getElementById("textbox").value;

	// TODO: Remove once confirmed cookies work as expected.
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

