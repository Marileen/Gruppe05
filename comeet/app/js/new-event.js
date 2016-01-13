function saveEvent(event)
{
    event.preventDefault();
    var Title = document.getElementById('Title');
    var dateTime = document.getElementById('dateTime');
    var city = document.getElementById('city');
    if (Title.value.lenght>2 && dateTime.value.lenght>2 &&city.value.lenght>2)
        {
    //Formulardaten holen
    var data = "";
    var inputFields = document.querySelectorAll('[data-component="new-event"] input');
    Array.prototype.forEach.call(inputFields, function (elem)
    {
        data = data + elem.name + "=" + elem.value + "&";
    });

    if (QueryString.id) {
        data = data + 'id=' + QueryString.id + '&'
    }

    //und noch das textarea
    var description = document.getElementById('description');
    data = data + "description=" + description.value;

    console.log(data);

    //Formulardaten senden
    RegistrationRequest = makeAjaxPostRequest('save-event.php', data);


    RegistrationRequest.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (RegistrationRequest.readyState == 4 && RegistrationRequest.status == 200) {
            console.log(RegistrationRequest.responseText);
            window.location.href = "02_overview.html";
        }
    }

  }
}

function addItems(event)
{

    console.log('Add Funktion geht im Firefox nicht, bitte Chrome benutzen');

    if (event.target.getAttribute('data-helper') != '1' && event.target.value.length > 2) {
        event.target.setAttribute('data-helper', '1');       //data-helper auf 1 setzen, da es nur ein neue elem pro elem geben darf

        itemCount++;

        //Hier wollen wir ein neues Element hinzufügen, ein text input
        var newElement = document.createElement('div');
        newElement.innerHTML = "<input type='text' name='item_" + itemCount + "' />";

        //das neue Element bekommt auch wieder diesen Event Listener, damit man dann noch eins hinzufügen kann
        newElement.addEventListener('input', addItems);
        if (document.querySelector('.item-container')) {
            document.querySelector('.item-container').appendChild(newElement);
        }

        //checken ob welche leer sind:
        if (document.querySelectorAll('.item-container div').length > 9) {
            console.log('leere - ausser dem untersten - löschen'); //TODO
        }

    }

}

function getEventDataToEdit (entries)
{

    /* Eventdaten */
    document.querySelector('h1').innerHTML = "Event bearbeiten"
    document.getElementById('Title').value = entries.title;
    document.getElementById('description').value = entries.description;
    document.getElementById('dateTime').value = entries.date;
    document.getElementById('street').value = entries.street;
    document.getElementById('nr').value = entries.nr;
    document.getElementById('postcode').value = entries.postcode;
    document.getElementById('city').value = entries.city;
    document.getElementById('mapLink').value = entries.MapLink;

    /* Teilnehmer und Items (Mitbringsel) */
    if (entries.attendees) {

        var container = document.querySelector('.item-contacts');
        var newElement = document.createElement('label');
        newElement.innerHTML = "Diese Dinge bringen Deine Gäste bereits mit, du kannst sie nicht mehr ändern:";
        container.appendChild(newElement);

        newElement = document.createElement('span');
        var itemsFound = false;
        newElement.innerHTML = "<br>"

        entries.attendees.forEach(function (elem)
        {
            if (elem.items) {
                newElement.innerHTML = newElement.innerHTML + "- " + elem.items;
                itemsFound = true;
            }
        });

        if (itemsFound == false) {
            newElement.innerHTML = "- keine -"
        }

        container.appendChild(newElement);

    }

    //offene Items anzeigen
    if (entries.openItems)
    {
        var itemContainer = document.querySelector('.item-container');
        var baseItem = document.querySelector('.item-container input');

        entries.openItems.forEach(function (elem)
        {
            //Basisitem aus html kopieren (es muss dort immer die klasse .item haben und sich in einem container mit der klasse.item-list befinden)

            var newItem = baseItem.cloneNode(true);

            newItem.value = elem.name;
            newItem.setAttribute('id', elem.id);

            itemContainer.appendChild(newItem);

        });

        itemContainer.lastChild.addEventListener('keydown', addItems);

        //Basisitem löschen
        itemContainer.removeChild(baseItem);

    }
}

function initEvent()
{

    //User Session Variable abfragen
    CheckupRequest = makeAjaxPostRequest('new-event.php', "userCheckup=yes");
    CheckupRequest.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (CheckupRequest.readyState == 4 && CheckupRequest.status == 200) {

            console.log(CheckupRequest.responseText);

            if (CheckupRequest.responseText.indexOf('success') > -1) {
                document.querySelector('[data-component="new-event"] form').classList.add('show');
            } else{
                document.querySelector('.errormessage').classList.add('show');
            }

        }
    }

    //Anhand der übergebenen ID prüfen ob ein Event bearbeitet werden soll
    //im php auch prüfen ob event id zu user id gehört (ob er es bearbeiten darf)
    if (QueryString.id) {
        console.log('Event soll bearbeitet werden');
        //Eventdaten holen (wenn User das Event bearbeiten darf)
        //todo php vorher noch fragen ob user berechtigt ist dieses Event zu bearbeiten
        getEventData(getEventDataToEdit);
    }


    console.log('3: init new Event - erstelle jetzt ein neues Event');
    if (document.querySelector('#saveEvent')) {
        document.querySelector('#saveEvent').addEventListener('click', saveEvent);
        document.querySelector('#saveEvent').focus();
    }

    if (document.querySelector('.item-container input[name="item_0"]')) {
        document.querySelector('.item-container input[name="item_0"]').addEventListener('keydown', addItems);
    }

}

var itemCount = 0;

window.addEventListener('load', initEvent);
