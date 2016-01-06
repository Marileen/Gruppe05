
function deleteContact() {

    //todo

}


function initContacts(){
    console.log('5a: init Contact Change Component!');

    requestContacts = makeAjaxGetRequest('contacts.php');

    requestContacts.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (requestContacts.readyState == 4 && requestContacts.status == 200)
        {
            var contactItems = document.querySelector('[data-component="change_contacts"]');

            /*
             <div class="contact-entry ">
             <h2>Karl Tester</h2>
             <div class="description">
             <a class="icon-cross"></a>
             </div>
             </div>            *
            */

            entries = {};
            entries = JSON.parse(requestContacts.responseText);
            entries.contacts.forEach(function (elem) {


                var newElement = document.createElement('div');
                newElement.classList.add('contact-entry');

                var inner = "<h2>"+ elem.name  +"</h2><div class='description'><a data-id='"+ elem.id +"' class='icon-cross'></a></div>";
                newElement.innerHTML =  inner;
                contactItems.appendChild(newElement);

            });

            //on click listener für die a's, damit man kontakte löschen kann
            document.querySelector('.contact-entry a').addEventListener('click', deleteContact);

        }
    }


    if (document.querySelector('.component[data-component="header"] .login a.button.login')) {
        document.querySelector('.component[data-component="header"] .login a.button.login').addEventListener('click', userLogin);
    }

    //Username welcome oben rechts anzeigen
    if (document.querySelector('.welcomeUserMsg')) {
        //Hole Userdaten from php
        request = makeAjaxGetRequest('user-data.php');


        request.onreadystatechange = function ()
        { //Call a function when the state changes.

            if (request.readyState == 4 && request.status == 200)
            {
             document.querySelector('.welcomeUserMsg').innerHTML = "Hallo " + request.responseText;
            }
        }
    }

    //Kontakte laden
    if (document.querySelector('[data-component="contacts"] .content ul')){
        loadContacts();
        //auf allen Seiten wo auch die Kontakte angezeigt werden, wird der online-Status des Useres überprüft
        //das ist vielleicht nicht das sinnvollste, eigentlich sollte der OnlineStatus überprüft werden
        //solange der User eingeloggt ist, aber wenn nicht, dann eben auch nicht, daher machen wir das jetzt
        //an der Kontaktliste fest erstmal ...
        watchOnlineStatus();
    }

}


window.addEventListener('load', initContacts);
