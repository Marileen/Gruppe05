
/*
 * Eventdaten Details holen
 *
 * **/

function initMapDetail () {

    //Karte
    var mapElement = document.getElementById('Map');
    var map, marker;

    //hole coords
    getEventData(function (entries) {
        console.log('Eventdaten von Map Aufruf:' + entries);

        var coords = entries.MapLink.split('#');

        map = new google.maps.Map(mapElement, {
        center: { lat: parseFloat(coords[0]), lng: parseFloat(coords[1]) },
//            center: { lat: 53.737811, lng: 10.2493119 },
            zoom: 11
        });

        marker = new google.maps.Marker({
            position: new google.maps.LatLng( parseFloat(coords[0]), parseFloat(coords[1])),
            map: map,
            title: ''
        });
    })
}

function getDetailEventData(entries)
{
    console.log("Response Event Daten: " + entries);

    /* Eventdaten */
    try {

        document.getElementById('Owner').innerHTML = entries.Owner;
        document.getElementById('Title').innerHTML = entries.title;
        document.getElementById('Description').innerHTML = '' + entries.description + ' ';
        document.getElementById('DateTime').innerHTML = entries.date;
        document.getElementById('timeInfo').innerHTML = entries.timeInfo;
        document.getElementById('Address').innerHTML = entries.street + ' ' + entries.nr + ', ' + entries.postcode + ' ' + entries.city;
        document.getElementById('Map').setAttribute('src', entries.MapLink);

        /* Teilnehmer und Items (Mitbringsel) */
        var attendees = document.querySelector('table.attendees');


    }
    catch(err) {
        //
    }

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

    } else {
        if (document.querySelector('.item-list')) {
            document.querySelector('.item-list').classList.add('hide');
        }
        if (document.querySelector('#attend span')) {
            document.querySelector('#attend span').classList.add('hide');
        }
    }


    //zeige edit und delete button nur bei eigenen events:
    if (entries.isMine != "1") {
        document.getElementById('edit').classList.add('hide');
        document.getElementById('delete').classList.add('hide');

        //wenn man schon teilnimmt, Button nicht mehr zeigen
        console.log(entries.isAttending);
        if (entries.isAttending == "1") {
            document.querySelector('.message.attend').classList.add('show');
            document.querySelector('.attendEvent form').classList.add('hide');
        }
    } else
    {
        document.querySelector('.attendEvent legend').innerHTML = "Offene Dinge zu deinem Event";  //und teilnehmen Option nur bei Fremd-Events
        document.querySelector('.attendEvent').classList.add('own');  //und teilnehmen Option nur bei Fremd-Events

    }



}


function attendToEvent(e)
{

    e.preventDefault();

    //gucken welche checkboxen angeklickt sind
    var items = document.querySelectorAll('.item-list .item');
    var data = "id=" + QueryString.id + "&";

    Array.prototype.forEach.call(items, function (elem, idx)
    {
        if (elem.querySelector('input').checked) {
            data = data + "item" + elem.querySelector('label').id + "=" + elem.querySelector('label').id + "&"
        }
    });

    console.log('daten zu den Items:' + data);

    //daten wegschicken
    attendEventRequest = makeAjaxPostRequest('attend-event.php', data);

    attendEventRequest.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (attendEventRequest.readyState == 4 && attendEventRequest.status == 200) {
            console.log('zurück von attend-event.php: ' + attendEventRequest.responseText);
            //meldung event gelöscht
            if (attendEventRequest.responseText.indexOf('success') > -1) {
                document.querySelector('.message.attend').classList.add('show');
                document.querySelector('.attendEvent form').classList.add('hide');

            } else{
                if (document.querySelector('.errormessage.attendevent')) {
                    document.querySelector('.errormessage.attendevent').classList.add('show');
                }
            }
        }
    }

}

/*
 * Event löschen, dann wieder die Übersicht anzeigen
 *
 * **/
function deleteEvent(e)
{


    e.preventDefault();

    console.log('delete event');

    var deleteConfirm = confirm("Wirklich löschen?");
    if (deleteConfirm == true) {
        console.log('delete event bestätigt');

        deleteEventRequest = makeAjaxPostRequest('delete-event.php', 'id=' + QueryString.id);

        console.log('what i sent:');
        console.log('id=' + QueryString.id);

        deleteEventRequest.onreadystatechange = function ()
        { //Call a function when the state changes.

            if (deleteEventRequest.readyState == 4 && deleteEventRequest.status == 200) {
                console.log('zurück von delete-event.php: ' + deleteEventRequest.responseText);
                //meldung event gelöscht
                if (deleteEventRequest.responseText.indexOf('success') > -1) {
                    window.location.href = '02_overview.html';

                } else{
                    //Meldung anzeigen, dass der Login fehlgeschlagen ist
                    document.querySelector('.errormessage.event').classList.add('show');
                }
            }
        }

    } else{
        //
    }

}

function editEvent(e) {

    //new Event Formular Seite aufrufen mit Event id übergeben
    e.preventDefault();
    window.location.href = '03_new.html?id=' + QueryString.id;

}

function initEventDetail()
{
    console.log('3: init Events Detail Component');

    getEventData(getDetailEventData);

    if (document.querySelector('button#delete')) {
        document.querySelector('button#delete').addEventListener('click', deleteEvent);
    }

    if (document.querySelector('button#edit')) {
        document.querySelector('button#edit').addEventListener('click', editEvent);
    }

    if (document.querySelector('.button.attend')) {
        document.querySelector('.button.attend').addEventListener('click', attendToEvent);
    }

}

window.addEventListener('load', initEventDetail);
