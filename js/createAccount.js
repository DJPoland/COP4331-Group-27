document.getElementById('createAccount').addEventListener('click', doSignup);

function sendSignupPayload(jsonPayload, url) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.send(jsonPayload);
    let jsonObject = JSON.parse(xhr.responseText);
    if (jsonObject.error) {
        throw jsonObject.error;
    }
}

function doSignup() {
    let user = document.getElementById("createUsername").value;
    let password = document.getElementById("createPassword").value;
    let confirmPassword = document.getElementById("createConfirmPassword").value;
    let modalHeader =  document.getElementById("modalHeader");
    let jsonPayload = '{"Login" : "' + user + '", "Password" : "' + password + '"}';
    let url = urlBase + '/signup.' + extension;
    let warningHtml = undefined;

    if (password !== confirmPassword) {
        warningHtml = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                Password combinations differ. Please try again.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
        modalHeader.insertAdjacentHTML('afterend', warningHtml);
    } else if ( user.length > 64 || password.length > 64 ) {
        warningHtml = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                Password is too long. Please use no more than 16 characters.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
        modalHeader.insertAdjacentHTML('afterend', warningHtml);
    } else if ( user.length < 8 || password.length < 8 ) {
        warningHtml = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                Password is too short. Please use 8 or more characters.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
        modalHeader.insertAdjacentHTML('afterend', warningHtml);
    } else {
        try {
            sendSignupPayload(jsonPayload, url);
            warningHtml = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                    User and password is successfully created.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>`;
            modalHeader.insertAdjacentHTML('afterend', warningHtml);
        } catch (err) {
            warningHtml = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Error with signup due to: ${err}.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>`;
            modalHeader.insertAdjacentHTML('afterend', warningHtml);
        }
    }

}