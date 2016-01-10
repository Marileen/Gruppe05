function saveEvent(event)
{
    event.preventDefault();

    //Formulardaten holen
    var data = "";
    var inputFields = document.querySelectorAll('[data-component="new-event"] input');
    Array.prototype.forEach.call(inputFields, function (elem)
    {
        data = data + elem.name + "=" + elem.value + "&";
    });

    //und noch das textarea
    var description = document.getElementById('description');
    data = data + "description=" + description.value;

    console.log(data);

    //Formulardaten senden
    RegistrationRequest = makeAjaxPostRequest('new-event.php', data);


    RegistrationRequest.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (RegistrationRequest.readyState == 4 && RegistrationRequest.status == 200) {
            console.log(RegistrationRequest.responseText);
            console.log('neues Event eingefügt');
            window.location.href = "02_overview.html";
        }
    }
}

function addItems(event)
{

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

function getEventDataToEdit ()
{
    var entries = getEventData();

    /* Eventdaten */
    document.getElementById('Title').value = entries.title;
    document.getElementById('description').value = entries.description;
    document.getElementById('dateTime').value = entries.date;
    document.getElementById('street').value = entries.street;
    document.getElementById('nr').value = entries.nr;
    document.getElementById('postcode').value = entries.postcode;
    document.getElementById('city').value = entries.city;
    document.getElementById('MapLink').value = entries.MapLink;

    /* Teilnehmer und Items (Mitbringsel) */
    var attendees = document.querySelector('table.attendees');
    if (entries.attendees) {
        entries.attendees.forEach(function (elem)
        {
            var newElement = document.createElement('tr');
            var innerHTMLString = "<td>" + elem.Name + "</td>";
            if (elem.items) {
                innerHTMLString = innerHTMLString + "<td>" + elem.items + "</td>"
            }
            newElement.innerHTML = innerHTMLString;
            attendees.appendChild(newElement);
        });

    }

    //offene Items anzeigen (todo: nur wenn man noch nicht teilnimmt ODER wenn es das eigene Event ist, dann aber ohne checkboxen)
    if (entries.openItems)
    {
        console.log('todo - offene items verarbeiten: ' + entries.openItems);
        var itemContainer = document.querySelector('.item-list');
        var baseItem = document.querySelector('.item-list .item');

        entries.openItems.forEach(function (elem)
        {
            //Basisitem aus html kopieren (es muss dort immer die klasse .item haben und sich in einem container mit der klasse.item-list befinden)

            var newItem = baseItem.cloneNode(true);

            newItem.querySelector('input').setAttribute('name', elem.id);
            newItem.querySelector('input').setAttribute('id', elem.id);
            newItem.querySelector('label').setAttribute('id', elem.id);
            newItem.querySelector('label').innerHTML = elem.name;

            itemContainer.appendChild(newItem);

        });

        //Basisitem löschen
        itemContainer.removeChild(baseItem);

    }


    //zeige edit und delete button nur bei eigenen events:
    console.log('ismine: ' + entries.isMine);
    if (entries.isMine != "1") {
        document.getElementById('edit').classList.add('hide');
        document.getElementById('delete').classList.add('hide');
    } else
    {
        document.querySelector('.attendEvent legend').innerHTML = "Offene Dinge zu deinem Event";  //und teilnehmen Option nur bei Fremd-Events
        document.querySelector('.attendEvent').classList.add('own');  //und teilnehmen Option nur bei Fremd-Events
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
        getEventDataToEdit();
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
