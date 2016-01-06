
function findContacts () {
    //Formulardaten holen
    var data = "";
    var inputFields = document.querySelectorAll('#findContact input');
    Array.prototype.forEach.call(inputFields, function (elem)
    {
        data = data + elem.name + "=" + elem.value + "&";
    });

    //Formulardaten senden
    console.log('js schickt folgende suchanfrage: ' + data)
    FindContactRequest = makeAjaxPostRequest('find-contact.php', data);


    FindContactRequest.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (FindContactRequest.readyState == 4 && FindContactRequest.status == 200)
        {

            console.log(FindContactRequest.responseText);

            var newContactItems = document.querySelector('.new_contacts');

            //todo: erst alle löschen!

            entries = {};
            entries = JSON.parse(FindContactRequest.responseText);
            entries.results.forEach(function (elem) {

                var newElement = document.createElement('div');
                newElement.classList.add('contact-entry');

                var inner = "<h2>"+ elem.firstname + " " +  elem.lastname +"</h2><div class='description'><a data-id='"+ elem.id +"' class='icon-plus'></a></div>";
                newElement.innerHTML =  inner;
                newContactItems.appendChild(newElement);

                //TODO --> die ID hinzufügen
            });

        }
    }
}

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
            var contactItems = document.querySelector('[data-component="change_contacts"] .contacts');

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
    };

    //Button Handler
    if (document.querySelector('#search')) {
        document.querySelector('#search').addEventListener('click', function (e)
        {
            e.preventDefault();

            findContacts();

        });
    }

}


window.addEventListener('load', initContacts);
