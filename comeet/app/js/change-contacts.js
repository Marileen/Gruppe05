
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

            //erst alle löschen!
            var list = document.querySelectorAll(".new_contacts .contact-entry");
            for(var i = list.length - 1; 0 <= i; i--)
                if(list[i] && list[i].parentElement)
                    list[i].parentElement.removeChild(list[i]);


            entries = {};
            entries = JSON.parse(FindContactRequest.responseText);
            entries.results.forEach(function (elem) {

                var newElement = document.createElement('div');
                newElement.classList.add('contact-entry');

                var inner = "<h2 id='"+ elem.id +"'>"+ elem.firstname + " " +  elem.lastname +"</h2><div class='description'><span class='icon-plus'></span></div>";
                newElement.innerHTML =  inner;
                newContactItems.appendChild(newElement);

            });
            if (entries.results.length < 1) {
                document.querySelector('.noResults').classList.add('show');
            } else {
                document.querySelector('.noResults').classList.remove('show');
            }

            //Add Click Listener to add Contacts
            var newContacts = document.querySelectorAll('.new_contacts .contact-entry span')
            for(var i = newContacts.length - 1; 0 <= i; i--)
            {
                newContacts[i].addEventListener('click', addContact);

            }


        }
    }
}

function deleteContact() {

    //todo
    console.log('jetzt den Kontakt löschen');

}

function addContact() {

    //todo
    console.log('jetzt den Kontakt hinzufügen');

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

                var inner = "<h2>"+ elem.name  +"</h2><div class='description'><span data-id='"+ elem.id +"' class='icon-cross'></span></div>";
                newElement.innerHTML =  inner;
                contactItems.appendChild(newElement);

            });

            //Add Click Listener to add Contacts
            var Contacts = document.querySelectorAll('.contacts .contact-entry span')
            for(var i = Contacts.length - 1; 0 <= i; i--)
            {
                Contacts[i].addEventListener('click', deleteContact);
            }

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
