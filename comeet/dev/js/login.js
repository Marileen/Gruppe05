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

        if (loginRequest.readyState == 4 && loginRequest.status == 200) {
            document.querySelector('.login .message').classList.remove('show');

            if (loginRequest.responseText.indexOf('success') > -1) {
                window.location.href = '02_overview.html';

            } else{
                //Meldung anzeigen, dass der Login fehlgeschlagen ist
                document.querySelector('.login .message').classList.add('show');


            }

        }

        if (loginRequest.readyState == 4 && loginRequest.status > 400) {
            window.location.reload();
        }
    }
}

function loadContacts () {

    requestContacts = makeAjaxGetRequest('contacts.php');

    requestContacts.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (requestContacts.readyState == 4 && requestContacts.status == 200)
        {
            var friendList = document.querySelector('[data-component="contacts"] .content ul');

            if (requestContacts.responseText.indexOf("failed") < 0) {

                entries = {};
                entries = JSON.parse(requestContacts.responseText);
                entries.contacts.forEach(function (elem)
                {
                    var newElement = document.createElement('li');

                    //online Status
                    if (elem.status.toLowerCase().indexOf('online') > -1) {
                        newElement.classList.add('online');
                    }

                    newElement.innerHTML = elem.name;
                    friendList.appendChild(newElement);

                });
            }

        }
    }
}

function userLogout () {

    requestLogout = makeAjaxGetRequest('logout.php');

    requestLogout.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (requestLogout.readyState == 4 && requestLogout.status == 200)
        {
            window.location.href = "/";
        }
    }

}

var RefreshOnlineStatus;
function watchOnlineStatus()
{

    if (RefreshOnlineStatus) {
        clearTimeout(RefreshOnlineStatus);
    }

    RefreshOnlineStatus = setTimeout(function(){

        userLogout();
        console.log("du wurdest durch einen Timeout ausgeloggt");

    },600000)  //1 min   //5min = 300000

}

function initLogin(){
    console.log('1: init Login Component - you can login now!');
    if (document.querySelector('.component[data-component="header"] .login .button.login')) {
        document.querySelector('.component[data-component="header"] .login .button.login').addEventListener('click', userLogin);
    }

    //Username welcome oben rechts anzeigen
//    if (document.querySelector('.welcomeUserMsg')) {
        //Hole Userdaten from php
    requestUD = makeAjaxGetRequest('user-data.php');


    requestUD.onreadystatechange = function ()
        { //Call a function when the state changes.

            if (requestUD.readyState == 4 && requestUD.status == 200 && requestUD.responseText.length > 2)
            {
                if (document.querySelector('[data-component="header"]')) {
                    document.querySelector('[data-component="header"]').classList.remove('show');
                    document.querySelector('[data-component="header"]').classList.add('hide');
                }
                if (document.querySelector('[data-component="header"].logged-in')) {
                    document.querySelector('[data-component="header"].logged-in').classList.remove('hide');
                    document.querySelector('[data-component="header"].logged-in').classList.add('show');

                    document.querySelector('.welcomeUserMsg').innerHTML = "Hallo " + requestUD.responseText;
                }

                if (document.querySelector('[data-component="aside-nav"]')) {
                    document.querySelector('[data-component="aside-nav"]').classList.remove('hide');
                }

            }
        }
//    }

    //Kontakte laden
    if (document.querySelector('[data-component="contacts"] .content ul')){
        loadContacts();
        //auf allen Seiten wo auch die Kontakte angezeigt werden, wird der online-Status des Useres überprüft
        //das ist vielleicht nicht das sinnvollste, eigentlich sollte der OnlineStatus überprüft werden
        //solange der User eingeloggt ist, aber wenn nicht, dann eben auch nicht, daher machen wir das jetzt
        //an der Kontaktliste fest erstmal ...
        watchOnlineStatus();
    }


    document.querySelector('[data-component="header"]').classList.add('show');

    //LOGOUT
    if (document.querySelector('.component[data-component="header"] #logoutButton')) {
        document.querySelector('.component[data-component="header"] #logoutButton').addEventListener('click', function(e) {
            e.preventDefault();
            userLogout();
        });
    }

}


window.addEventListener('load', initLogin);
