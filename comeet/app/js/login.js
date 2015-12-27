/*
 * Es wird ein post request abgeschickt zum überprüfen der Userdaten
 * und wenn der erfolgreich war zur Event Overview Seite weitergeleitet
 * wenn nicht, dann wird eine Meldung angezeigt
 *
 * **/

function userLogin (e) {

    e.preventDefault();

    //Formulardaten holen - username und pw
    var data = "";
    var inputFields = document.querySelectorAll('[data-component="header"] .login input');
    Array.prototype.forEach.call(inputFields, function (elem)
    {
        data = data + elem.name + "=" + elem.value + "&";
    });

    //GET User Data from Backend
    loginRequest = makeAjaxPostRequest('login.php', data);


    loginRequest.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (loginRequest.readyState == 4 && loginRequest.status == 200)
        {
            console.log(loginRequest.responseText);
            document.querySelector('.login .message').classList.remove('show');

            if (loginRequest.responseText.indexOf('success') > -1)
            {
                console.log('login ok');
                window.location.href = '02_overview.html';
            } else
            {
                //Meldung anzeigen, dass der Login fehlgeschlagen ist
                document.querySelector('.login .message').classList.add('show');
            }

        }
    }
}

function initLogin()
{
    console.log('1: init Login Component - you can login now!');
    if (document.querySelector('.component[data-component="header"] .login a.button.login')) {
        document.querySelector('.component[data-component="header"] .login a.button.login').addEventListener('click', userLogin);
    }
}

window.addEventListener('load', initLogin);
